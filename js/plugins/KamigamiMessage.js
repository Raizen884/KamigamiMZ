
Scene_Map.prototype.createMessageWindow = function () {

    this._messageWindow = new Window_Message(this.back_window, this.back_window_name, this._big_face);
    this.addWindow(this._messageWindow);
    this._messageWindow.subWindows().forEach(function (window) {
        this.addWindow(window);
    }, this);
};

Scene_Map.prototype.create_back_sprite = function () {
    this.back_window = new Sprite(ImageManager.loadFace("windowskin"));
    this.back_window.x = 960;
    this.back_window.y = Graphics.height - 150;
    this.addChild(this.back_window);
    this.back_window.anchor.x = 0.5;
    this.back_window.anchor.y = 0.5;
    this.back_window.scale.y = 0;
    this.back_window.opacity = 0;
};
Scene_Map.prototype.create_back_name = function () {
    this.back_window_name = new Sprite(ImageManager.loadFace("messageName"));
    this.back_window_name.x = 250;
    this.back_window_name.y = Graphics.height - 349;
    this.addChild(this.back_window_name);
    this.back_window_name.anchor.x = 0.5;
    this.back_window_name.anchor.y = 0.5;
    this.back_window_name.opacity = 0;
};

Scene_Map.prototype.create_back_face = function () {
    this._big_face = new Sprite();
    this._big_face.bitmap = ImageManager.loadFace("");
    this.addChild(this._big_face);
}

Scene_Map.prototype.createDisplayObjects = function () {
    this.createSpriteset();
    this.createMapNameWindow();
    this.create_back_face();
    this.create_back_name();
    this.create_back_sprite();
    this.createWindowLayer();
    this.createAllWindows();

};


//-----------------------------------------------------------------------------
// Window_Message
//
// The window for displaying text messages.

function Window_Message() {
    this.initialize.apply(this, arguments);
}

Window_Message.prototype = Object.create(Window_Base.prototype);
Window_Message.prototype.constructor = Window_Message;

Window_Message.prototype.initialize = function (back_window, back_name, big_face) {
    this._big_face = big_face;
    this._oldName = "";
    var width = this.windowWidth();
    var height = this.windowHeight();
    var x = (Graphics.boxWidth - width) / 2;
    this.back_window = back_window;
    this.back_window_name = back_name;
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this.fastForward = false
    this.openness = 0;
    this.initMembers();

    this.createSubWindows();
    this.updatePlacement();
    this.createKamiHudImages();
};

Window_Message.prototype.createKamiHudImages = function () {
    this.createBackImages()
    this.createImageLights()
    this.createButtons()
    this.createFastForward()
}

Window_Message.prototype.createFastForward = function () {
    this.btnFastForward = new Sprite_Fast_Forward()
    this.addChild(this.btnFastForward)
    this.btnFastForward.x -= this.x - Graphics.width / 2 + 250
    this.btnFastForward.y -= this.y - 40
    this.btnFastForward.opacity = 0
}


Window_Message.prototype.createBackImages = function () {
    this.backReturn = new Sprite()
    this.backReturn.bitmap = ImageManager.loadFace("backReturn");
    this.addChild(this.backReturn)
    this.backReturn.opacity = 0;
    this.backReturn.x -= this.x
    this.backReturn.y -= this.y


    this.backDeck = new Sprite()
    this.backDeck.bitmap = ImageManager.loadFace("backDeck");
    this.addChild(this.backDeck)
    this.backDeck.opacity = 0;
    this.backDeck.x -= this.x - Graphics.width
    this.backDeck.anchor.x = 1
    this.backDeck.y -= this.y
}

Window_Message.prototype.createImageLights = function () {
    this.backReturnLight = new Sprite_Kami_ButtonLight(0, `mapMenu1`, 70, 0x00FFD0, 100);
    this.addChild(this.backReturnLight)
    this.backReturnLight.x -= this.x
    this.backReturnLight.y -= this.y
    this.backReturnLight.opacity = 0

    this.backDeckLight = new Sprite_Kami_ButtonLight(1, `mapMenu2`, 30, 0x00FFD0, 100);
    this.addChild(this.backDeckLight)
    this.backDeckLight.x -= this.x - Graphics.width + 604
    this.backDeckLight.y -= this.y
    this.backDeckLight.opacity = 0
}
Window_Message.prototype.createButtons = function () {
    this.btnReturn = new Sprite_Kami_Button(0, `mapMenu1`, 70, 100);
    this.addChild(this.btnReturn)
    this.btnReturn.x -= this.x
    this.btnReturn.y -= this.y
    this.btnReturn.opacity = 0

    this.btnDeck = new Sprite_Kami_Button(1, `mapMenu2`, 30, 100);
    this.addChild(this.btnDeck)
    this.btnDeck.x -= this.x - Graphics.width + 604
    this.btnDeck.y -= this.y
    this.btnDeck.opacity = 0
}

Window_Message.prototype.initMembers = function () {
    this._imageReservationId = Utils.generateRuntimeId();
    this._background = 0;
    this._positionType = 2;
    this._waitCount = 0;
    this._faceBitmap = null;
    this._textState = null;
    this.clearFlags();
    this.hasTriggered = false
};

Window_Message.prototype.subWindows = function () {
    return [this._goldWindow, this._choiceWindow,
    this._numberWindow, this._itemWindow];
};

Window_Message.prototype.createSubWindows = function () {
    this._goldWindow = new Window_Gold(0, 0);
    this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
    this._goldWindow.openness = 0;
    this._choiceWindow = new Window_ChoiceList(this);
    this._numberWindow = new Window_NumberInput(this);
    this._itemWindow = new Window_EventItem(this);
};

Window_Message.prototype.windowWidth = function () {
    return Graphics.width - 360;
};

Window_Message.prototype.windowHeight = function () {
    return this.fittingHeight(this.numVisibleRows());
};

Window_Message.prototype.clearFlags = function () {
    this._showFast = false;
    this._lineShowFast = false;
    this._pauseSkip = false;
};

Window_Message.prototype.numVisibleRows = function () {
    return 4;
};
Window_Message.prototype.updateButtonsOpacity = function () {
    if ($dataKamigami.gameOptions.firstScene) {
        if (this.btnReturn.opacity < 150)
            this.btnReturn.opacity += 15
        this.backReturn.opacity += 15
        if (this.btnReturn.isButtonHovered()) {
            this.backReturnLight.opacity += 20;
        } else {
            this.backReturnLight.opacity -= 20;
        }
    }
    if ($dataKamigami.gameOptions.deck) {
        if (this.btnDeck.opacity < 150)
            this.btnDeck.opacity += 15
        this.backDeck.opacity += 15
        if (this.btnDeck.isButtonHovered()) {
            this.backDeckLight.opacity += 20;
        } else {
            this.backDeckLight.opacity -= 20;
        }
    }

}
Window_Message.prototype.updateFastForward = function () {
    if (this.btnFastForward.isButtonHovered()) {
        this.btnFastForward.opacity = 0
        if (TouchInput.isTriggered()) {
            this.fastForward = true
        }
    } else
        this.btnFastForward.opacity = 0
    if (!TouchInput.isPressed()) {
        this.fastForward = false
    }

    if (this.fastForward) {

    }
}

Window_Message.prototype.update = function () {
    this.updateFastForward()
    this.updateButtonsOpacity();
    if (this.canStart() && this.current_name === this._oldName) {
        if (this.back_window.scale.y < 1) {

            this.back_window.opacity += 15;
            this.back_window.scale.y += 0.05;
            if (this.back_window.scale.y >= 1) {
                this.back_window.scale.y = 1
            }
            if (this.current_name != "")
                this.back_window_name.opacity += 15;
            else
                this.back_window_name.opacity = 0;
            this.back_window_name.x += 8;

            return;
        }
    } else {
        if (this.back_window.scale.y > 0) {
            if (this.back_window.scale.y == 1) {
                AudioManager.playSe({ name: "Message_Face_off", pan: 0, pitch: 100, volume: 10 });
            }
            this.current_name = false;
            this.back_window.opacity -= 15;
            this.back_window.scale.y -= 0.05;
            this.back_window_name.opacity -= 15;
            this.back_window_name.x -= 8;
            this._name_text.x -= 8;
            this._name_text.opacity -= 15;
            this._big_face.x += this._big_face.x / 15 + 5;
            this._big_face.opacity -= 15;
            this.contents.clear();
            if (this.back_window.scale.y <= 0) {
                this.back_window.scale.y = 0
            }
            return;
        }
    }
    if (this.canStart() && this._big_face.opacity > 0 && this._name_text && this._big_face.opacity < 255) {
        Window_Base.prototype.update.call(this);
        if (this.current_name != "")
            this._name_text.opacity += 5;
        else
            this._name_text.opacity = 0;
        if (this._big_face.opacity <= 7) {
            AudioManager.playSe({ name: "Message_Face", pan: 0, pitch: 100, volume: 30 });
        }
        this._big_face.x -= this._big_face.x / 15 + 5;
        this._big_face.opacity += 8;
        return;
    }
    this.checkToNotClose();
    Window_Base.prototype.update.call(this);
    while (!this.isOpening() && !this.isClosing()) {
        if (this.updateWait()) {
            return;
        } else if (this.updateLoading()) {
            return;
        } else if (this.updateInput()) {
            return;
        } else if (this.updateMessage()) {
            return;
        } else if (this.canStart()) {
            this.startMessage();
        } else {
            this.startInput();
            return;
        }
    }
};

Window_Message.prototype.checkToNotClose = function () {
    if (this.isClosing() && this.isOpen()) {
        if (this.doesContinue()) {
            this.open();
        }
    }
};

Window_Message.prototype.canStart = function () {
    return $gameMessage.hasText() && !$gameMessage.scrollMode();
};
Window_Message.prototype.wordWrapWindowMessage = function (text) {
    let pixiText = new PIXI.Text(text, { fontFamily: 'GameFont', fontSize: 28, fill: 0x000000, align: 'left', wordWrap: true, wordWrapWidth: 500});
    console.log(pixiText.text)
    this.addChild(pixiText)
    return text;
}
Window_Message.prototype.startMessage = function () {

    this._textState = {};
    this._textState.index = 0;
    this._textState.text = this.convertEscapeCharacters($gameMessage.allText());
    this._textState.text = this.wordWrapWindowMessage(this._textState.text);
    this.contents.outlineWidth = 0;
    this.newPage(this._textState);
    this.updatePlacement();
    this.updateBackground();
    this.open();
    this.opacity = 0;
    this.contentsOpacity = 170;
    if (this.current_name != $gameMessage.faceName()) {
        if (this._name_text)
            this._name_text.bitmap.clear();
        this.create_big_face();
        this.create_name_window();

    }

};
Window_Message.prototype.create_name_window = function () {
    this._name_text = new Sprite();

    this._name_text.bitmap = new Bitmap(400, 60);
    this.addChild(this._name_text);
    this._name_text.bitmap.outlineWidth = 0;
    this._name_text.bitmap.fontSize = 60;
    this.current_name = $gameMessage.faceName();
    if (this.current_name == "You" && greenworks) {
        this.current_name = greenworks.getSteamId().screenName
    }
    let name = this.current_name;
    this._oldName = name;
    this._name_text.bitmap.drawText(name, 0, 0, 400, 60, 'center');
    this._name_text.opacity = 0;
    this._name_text.x = 0;
    this._name_text.y = -120;
};
Window_Message.prototype.create_big_face = function () {
    this._big_face.bitmap = ImageManager.loadFace($gameMessage.faceName());
    this._big_face.opacity = 1;
    this._big_face.x = 650;
};

Window_Message.prototype.updatePlacement = function () {
    this._positionType = 2;
    this.x = 180;
    this.y = this._positionType * (Graphics.boxHeight - this.height) / 2;
    this._goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - this._goldWindow.height;
};

Window_Message.prototype.updateBackground = function () {
    this._background = $gameMessage.background();
    this.setBackgroundType(this._background);
};

Window_Message.prototype.terminateMessage = function () {
    this.close();
    this._goldWindow.close();
    $gameMessage.clear();
};

Window_Message.prototype.updateWait = function () {
    if (this._waitCount > 0) {
        this._waitCount--;
        return true;
    } else {
        return false;
    }
};

Window_Message.prototype.updateLoading = function () {
    if (this._faceBitmap) {
        if (this._faceBitmap.isReady()) {
            //this.drawMessageFace();
            this._faceBitmap = null;
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
};


Window_Message.prototype.isAnySubWindowActive = function () {
    return (this._choiceWindow.active ||
        this._numberWindow.active ||
        this._itemWindow.active);
};

Window_Message.prototype.updateMessage = function () {
    if (this._textState) {
        while (!this.isEndOfText(this._textState)) {
            if (this.needsNewPage(this._textState)) {
                this.newPage(this._textState);
            }
            this.updateShowFast();
            this.processCharacter(this._textState);
            if (!this._showFast && !this._lineShowFast) {
                break;
            }
            if (this.pause || this._waitCount > 0) {
                break;
            }
        }
        if (this.isEndOfText(this._textState)) {
            this.onEndOfText();
        }
        return true;
    } else {
        return false;
    }
};

Window_Message.prototype.onEndOfText = function () {
    if (!this.startInput()) {
        if (!this._pauseSkip) {
            this.startPause();
        } else {
            this.terminateMessage();
        }
    }
    this._textState = null;
};

Window_Message.prototype.startInput = function () {
    if ($gameMessage.isChoice()) {
        this._choiceWindow.start();
        return true;
    } else if ($gameMessage.isNumberInput()) {
        this._numberWindow.start();
        return true;
    } else if ($gameMessage.isItemChoice()) {
        this._itemWindow.start();
        return true;
    } else {
        return false;
    }
};

Window_Message.prototype.isTriggered = function () {
    return (Input.isRepeated('ok') || Input.isRepeated('cancel') ||
        TouchInput.isRepeated());
};

Window_Message.prototype.doesContinue = function () {
    return ($gameMessage.hasText() && !$gameMessage.scrollMode() &&
        !this.areSettingsChanged());
};

Window_Message.prototype.areSettingsChanged = function () {
    return (this._background !== $gameMessage.background() ||
        this._positionType !== $gameMessage.positionType());
};

Window_Message.prototype.updateShowFast = function () {
    if (this.isTriggered()) {
        this._showFast = true;
    }
};

Window_Message.prototype.newPage = function (textState) {
    this.contents.clear();
    this.resetFontSettings();
    this.clearFlags();
    this.loadMessageFace();
    textState.x = this.newLineX();
    textState.y = 0;
    textState.left = this.newLineX();
    textState.height = this.calcTextHeight(textState, false);
};

Window_Message.prototype.loadMessageFace = function () {
    this._faceBitmap = ImageManager.reserveFace($gameMessage.faceName(), 0, this._imageReservationId);
};

Window_Message.prototype.drawMessageFace = function () {
    this.drawFace($gameMessage.faceName(), $gameMessage.faceIndex(), 0, 0);
    ImageManager.releaseReservation(this._imageReservationId);
};

Window_Message.prototype.newLineX = function () {
    return 50;
};

Window_Message.prototype.processNewLine = function (textState) {
    this._lineShowFast = false;
    Window_Base.prototype.processNewLine.call(this, textState);
    if (this.needsNewPage(textState)) {
        this.startPause();
    }
};

Window_Message.prototype.processNewPage = function (textState) {
    Window_Base.prototype.processNewPage.call(this, textState);
    if (textState.text[textState.index] === '\n') {
        textState.index++;
    }
    textState.y = this.contents.height;
    this.startPause();
};

Window_Message.prototype.isEndOfText = function (textState) {
    return textState.index >= textState.text.length;
};

Window_Message.prototype.needsNewPage = function (textState) {
    return (!this.isEndOfText(textState) &&
        textState.y + textState.height > this.contents.height);
};

Window_Message.prototype.processEscapeCharacter = function (code, textState) {
    switch (code) {
        case '$':
            this._goldWindow.open();
            break;
        case '.':
            this.startWait(15);
            break;
        case '|':
            this.startWait(60);
            break;
        case '!':
            this.startPause();
            break;
        case '>':
            this._lineShowFast = true;
            break;
        case '<':
            this._lineShowFast = false;
            break;
        case '^':
            this._pauseSkip = true;
            break;
        default:
            Window_Base.prototype.processEscapeCharacter.call(this, code, textState);
            break;
    }
};

Window_Message.prototype.startWait = function (count) {
    this._waitCount = count;
};

Window_Message.prototype.startPause = function () {
    this.startWait(10);
    this.pause = true;
};


Window_Base.prototype.lineHeight = function () {
    return 56;
};

Window_Base.prototype.standardFontFace = function () {
    if ($gameSystem.isChinese()) {
        return 'SimHei, Heiti TC, sans-serif';
    } else if ($gameSystem.isKorean()) {
        return 'Dotum, AppleGothic, sans-serif';
    } else {
        return 'GameFont';
    }
};

Window_Base.prototype.standardFontSize = function () {
    return 48;
};

Window_Message.prototype.updateInput = function () {
    if (this.isAnySubWindowActive()) {
        return true;
    }
    if (this.hasTriggered) {
        this.updateExit();
        return true;
    }
    if (this.pause) {
        if (this.isTriggered()) {
            if (TouchInput.y < 250) {
                if (this.checkButtonTrigger()) { this.hasTriggered = true }
                return true;
            }
            Input.update();
            AudioManager.playSe({ name: "Message", pan: 0, pitch: 100, volume: 100 });
            this.pause = false;
            if (!this._textState) {
                this.terminateMessage();
            }
        }
        return true;
    }
    return false;
};

Window_Message.prototype.checkButtonTrigger = function () {
    if ($dataKamigami.gameOptions.deck) {
        if (this.btnDeck.isBeingTouched()) {
            this.btnChoice = 0
            this.countFrames = 0
            AudioManager.playSe({ name: "success", pan: 0, pitch: 95, volume: 100 });
            return true
        }
    }
    if ($dataKamigami.gameOptions.firstScene) {
        if (this.btnReturn.isBeingTouched()) {
            this.btnChoice = 1
            this.countFrames = 0
            AudioManager.playSe({ name: "success", pan: 0, pitch: 95, volume: 100 });
            return true
        }
    }
    return false
}
Window_Message.prototype.updateExit = function () {
    this.countFrames++
    if (this.countFrames == 1) {
        this.fadeScreen = new Sprite();
        this.fadeScreen.bitmap = ImageManager.loadKamigami("shop_fade");
        this.addChild(this.fadeScreen);
        this.fadeScreen.opacity = 0;
        this.fadeScreen.x -= this.x
        this.fadeScreen.y -= this.y
    }
    this.fadeScreen.opacity += 10
    if (this.fadeScreen.opacity == 255) {
        this.hasTriggered = false;
        if (this.btnChoice == 0) {
            SceneManager.push(Scene_Kamigami_Deck_Select)
        } else {
            SceneManager.goto(Scene_Main_Menu)
        }
    }
}


//-----------------------------------------------------------------------------
// SpriteCardButton
//
// The sprite for displaying a card in triple triad.

function Sprite_Fast_Forward() {
    this.initialize.apply(this, arguments);
}

Sprite_Fast_Forward.prototype = Object.create(Sprite_Clickable.prototype);
Sprite_Fast_Forward.prototype.constructor = Sprite_Fast_Forward;

//-----------------------------------------------------------------------------
// Function : initialize
//-----------------------------------------------------------------------------
Sprite_Fast_Forward.prototype.initialize = function () {
    Sprite_Clickable.prototype.initialize.call(this);
    this.createFastButtons();
    this.bitmap = new Bitmap(500, 200)
}

//-----------------------------------------------------------------------------
// Function : createFastButtons
//-----------------------------------------------------------------------------
Sprite_Fast_Forward.prototype.createFastButtons = function () {
    this.buttons = []
    for (let n = 0; n < 5; n++) {
        this.buttons[n] = new Sprite()
        this.buttons[n].bitmap = ImageManager.loadTitle1("opt_tutorialButton")
        this.addChild(this.buttons[n])
        this.buttons[n].x = n * 100
    }
}

//-----------------------------------------------------------------------------
// Function : update
//-----------------------------------------------------------------------------
Sprite_Fast_Forward.prototype.update = function () {
    Sprite_Clickable.prototype.update.call(this);
    for (let n = 0; n < 5; n++) {
        this.buttons[n].x += 3
        if (this.buttons[n].x > 500) {
            this.buttons[n].x = 0
        }
        let mid = Math.abs(250 - this.buttons[n].x)
        let opacity = 255 - mid
        this.buttons[n].opacity = opacity
    }
}




Window_ChoiceList.prototype.initialize = function (messageWindow) {
    this._messageWindow = messageWindow;

    Window_Command.prototype.initialize.call(this, 0, 0);
    this.openness = 0;
    this.deactivate();
    this._background = 0;
    this.createChoiceSprites();

};

Window_ChoiceList.prototype.start = function () {
    if (this.choices) {
        for (let n = 0; n < this.choices.length; n++) {
            this.removeChild(this.choices[n])
            this.choices[n].destroy()
        }
    }
    this.updatePlacement();
    this.updateBackground();
    this.refresh();
    this.selectDefault();
    this.open();
    this.activate();

    this.opacity = 0

};

Window_ChoiceList.prototype.createChoiceSprites = function () {
    this.positiveChoices = []
    this.negativeChoices = []

    this.choices = []
    for (let n = 0; n < 3; n++) {
        this.positiveChoices[n] = new Sprite_Clickable()
        this.positiveChoices[n].bitmap = ImageManager.loadFace("choicePositive")
        this.addChild(this.positiveChoices[n])
        this.positiveChoices[n].y = n * 180
        this.positiveChoices[n].opacity = 0
    }
    for (let n = 0; n < 3; n++) {
        this.negativeChoices[n] = new Sprite_Clickable()
        this.negativeChoices[n].bitmap = ImageManager.loadFace("choiceNegative")
        this.addChild(this.negativeChoices[n])
        this.negativeChoices[n].y = n * 180
    }
}


Window_ChoiceList.prototype.selectDefault = function () {
    this.select($gameMessage.choiceDefaultType());
};

Window_ChoiceList.prototype.updatePlacement = function () {
    var positionType = $gameMessage.choicePositionType();
    var messageY = this._messageWindow.y;
    this.width = this.windowWidth();
    this.height = 500
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = 200
    this.backOpacity = 0;
    this.opacity = 0
};

Window_ChoiceList.prototype.windowWidth = function () {
    return 600
};



Window_ChoiceList.prototype.maxChoiceWidth = function () {
    var maxWidth = 96;
    var choices = $gameMessage.choices();
    for (var i = 0; i < choices.length; i++) {
        var choiceWidth = this.textWidthEx(choices[i]) + this.textPadding() * 2;
        if (maxWidth < choiceWidth) {
            maxWidth = choiceWidth;
        }
    }
    return maxWidth;
};

Window_ChoiceList.prototype.makeCommandList = function () {
    var choices = $gameMessage.choices();
    let text
    for (var i = 0; i < choices.length; i++) {
        text = IAVRA.I18N.localize(choices[i])
        text = text.replace("\\.", "")
        this.choices[i] = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 40, fill: 0xFFFFFF, align: 'left' });
        //this.addCommand(choices[i], 'choice');
        this.addChild(this.choices[i])
        this.choices[i].alpha = 0.8
        this.choices[i].y = i * 180 + 30
        this.choices[i].x = 300 - this.choices[i].width / 2
        this.positiveChoices[i].opacity = 0
    }
    if (choices.length > 0)
        for (let n = choices.length; n < 3; n++) {
            this.negativeChoices[n].opacity = 0
            this.positiveChoices[n].opacity = 0
        }
};

Window_ChoiceList.prototype.updateCursor = function () {
};

var _rai_Window_ChoiceList_update = Window_ChoiceList.prototype.update
Window_ChoiceList.prototype.update = function () {
    _rai_Window_ChoiceList_update.call(this, ...arguments)
    let index = -1
    for (let n = 0; n < $gameMessage.choices().length; n++) {
        if (this.positiveChoices[n].isBeingTouched()) {
            this.positiveChoices[n].opacity += 20
            this.negativeChoices[n].opacity -= 20
            index = n
        } else {
            this.positiveChoices[n].opacity -= 20
            this.negativeChoices[n].opacity += 20
        }
    }
    if (TouchInput.isTriggered()) {
        this._index = index
        this.processOk()
    }
};

Window_ChoiceList.prototype.processOk = function () {
    if (this._index != -1) {
        this.playOkSound();
        this.updateInputData();
        this.deactivate();
        this.callOkHandler();
    } else {
        if (this.active)
            this.playBuzzerSound();
    }

};

var VividXP = VividXP || {};
 VividXP.WordWrap = {};
 VividXP.WordWrap.Parameters = PluginManager.parameters('VividXP_WordWrap');
 VividXP.WordWrap.WordWrapStyle = "break-word";

(function() {

    var _Window_Base_processNormalCharacter = Window_Base.prototype.processNormalCharacter;
    var _Window_Base_processDrawIcon = Window_Base.prototype.processDrawIcon;
    var _Window_Message_initMembers = Window_Message.prototype.initMembers;
    var _Window_Base_processNewLine  = Window_Base.prototype.processNewLine;

    Window_Message.prototype.initMembers = function() {
        this._processWordWrapBreak = false;
        _Window_Message_initMembers.call(this);
    };

    Window_Message.prototype.updateMessage = function() {
        if (this._textState && !this._processWordWrapBreak) {
            while (!this.isEndOfText(this._textState)) {
                if (this.needsNewPage(this._textState)) {
                    this.newPage(this._textState);
                }
                this.updateShowFast();
                this.processCharacter(this._textState);
                if (!this._showFast && !this._lineShowFast) {
                    break;
                }
                if (this.pause || this._waitCount > 0) {
                    break;
                }
            }
            if (this.isEndOfText(this._textState)) {
                this.onEndOfText();
            }
            return true;
        } else {
            return false;
        }
    };


    /***
     * getWordBoundaries
     * Takes the current message and does regex processing to retrieve the index
     * of the beginning of all words. Since this is javascript, unfortunately
     * the unicode support is lacking. But it should work with english
     * characters and some accented characters as well.
     * textStateText = the full message
     * returns array of indices representing the start of each word in the
     * full message
     */
    Window_Message.prototype.getWordBoundaries = function(textStateText) {
        var result = [];
        var wordRegex = /\b[\S]+\b\S*/gm;
        var wordBoundaryArr = [];
        while ((wordBoundaryArr = wordRegex.exec(textStateText)) !== null) {
            result.push(wordBoundaryArr);
        }
        result = result.map(function(match) {
            return match.index;
        });
        return result;
    };

    /***
     * startMessage
     * Overwrites Window_Message.prototype.startMessage to call getWordBoundaries
     * after escaping the text and before displaying the message
     */
    Window_Message.prototype.startMessage = function() {
        if ( this._processWordWrapBreak === false ){
            this._textState = {};
            this._textState.index = 0;
            this._textState.text = this.convertEscapeCharacters($gameMessage.allText());
            this._textState.wordBoundaries = this.getWordBoundaries(this._textState.text);
        }
        this.contents.outlineWidth = 0;
       
        this.newPage(this._textState);
        this._processWordWrapBreak = false;
        
        this.updatePlacement();
        this.updateBackground();
        this.open();

        this.opacity = 0;
        this.contentsOpacity = 170;
        if (this.current_name != $gameMessage.faceName()) {
            if (this._name_text)
                this._name_text.bitmap.clear();
            this.create_big_face();
            this.create_name_window();
    
        }
        
    };

    Window_Message.prototype.newPage = function(textState) {
        this.contents.clear();
        if (!this._processWordWrapBreak) {
            this.resetFontSettings();
        }
        this.clearFlags();
        this.loadMessageFace();
        textState.x = this.newLineX();
        textState.y = 0;
        textState.left = this.newLineX();
        textState.height = this.calcTextHeight(textState, false);
    };

    /***
     * processNormalCharacter
     * Check if word wrapping needs to take place
     * textState - contains information related to the message
     */
    Window_Message.prototype.processNormalCharacter = function(textState) {	
		this.processOverflow(textState);
		if (!this.needsNewPage(textState)){
			_Window_Base_processNormalCharacter.call(this, textState);
		}
    };

    /***
     * processDrawIcon
     * Check if word wrapping for icons needs to take place. Since icons are 
	 * images we don't need to check the WordWrapStyle setting, we just move 
	 * the icon to the next line if it doesn't fit
     * iconIndex - index corresponding to icon to be displayed
     * textState - contains information related to the message
     */
    Window_Message.prototype.processDrawIcon = function(iconIndex, textState) {
        var maxWindowWidth = this.contents.width;
        var iconWidth = Window_Base._iconWidth + 4;
        if ( textState.x >= maxWindowWidth || textState.x + iconWidth >= maxWindowWidth  ) {
            this.wrapToNewLine(textState);
        }
        _Window_Base_processDrawIcon.call(this, iconIndex, textState);
    };

    /***
     * processNewLine
     * Overrides Window_Base.prototype.processNewLine 
	 * We have to make sure to check if a new line has pushed content off the page,
	 * in the case of a message that has a mixture of manual line breaks and 
	 * word wrap.
     * textState - contains information related to the message
     */
    Window_Base.prototype.processNewLine = function(textState) {
        _Window_Base_processNewLine.call(this, textState);
        if (typeof this.needsNewPage === 'function' && this.needsNewPage(textState)) {
           this._processWordWrapBreak = true;
       }
    };

    /***
     * processOverflow
     * Used only for processing normal characters. Check if word wrapping needs
     * to occur and does it. Depending on WordWrapStyle setting, we either wrap
     * the whole word to a new line, or the current character to a new line
     * textState - contains information related to the message
     */
    Window_Message.prototype.processOverflow = function(textState) {
        var maxWindowWidth = this.contents.width;
        var w;
        switch (VividXP.WordWrap.WordWrapStyle) {
            case 'break-word':
                var lastBoundaryIndex = textState.wordBoundaries[textState.wordBoundaries.length - 1];
                var boundaryStartIndex = textState.wordBoundaries.lastIndexOf(textState.index);
                if (boundaryStartIndex !== -1) {
                    var boundaryEndIndex;
                    if ( textState.wordBoundaries[boundaryStartIndex] === lastBoundaryIndex ){
                        boundaryEndIndex = textState.text.length - 1;
                    } else {
                        boundaryEndIndex = textState.wordBoundaries[boundaryStartIndex + 1] - 1;
                    }
                    boundaryStartIndex = textState.wordBoundaries[boundaryStartIndex];
                    var word = textState.text.substring(boundaryStartIndex, boundaryEndIndex);
                    w = this.textWidth(word);
                    if ( textState.x >= maxWindowWidth || textState.x + w >= maxWindowWidth ){
                        this.wrapToNewLine(textState);
                    }
                }

                break;
            case 'break-all':
            default:
                var c = textState.text[textState.index];
                w = this.textWidth(c);
                if ( textState.x >= maxWindowWidth || textState.x + (w * 2) >= maxWindowWidth ){
                    this.wrapToNewLine(textState);
                }
                break;
        }
    };

    /***
     * wrapToNewLine
     * Wraps content to new line. If doing so pushes the rest of the message off
     * current page, then we pause and wait for user input to continue displaying
     * the message
     * textState - contains information related to the message
     */
    Window_Message.prototype.wrapToNewLine = function(textState) {
        this._lineShowFast = false;
        textState.x = this.newLineX();
        textState.y += textState.height;
        textState.height = this.calcTextHeight(textState, false);
         if (this.needsNewPage(textState)) {
            this._processWordWrapBreak = true;
            this.startPause();
        }
    };

})();