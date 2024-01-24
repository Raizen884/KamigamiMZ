

//-----------------------------------------------------------------------------
// Sprite_Booster
//
// The sprite for displaying a card in triple triad.

function Sprite_Options_Menu() {
    this.initialize.apply(this, arguments);
}

Sprite_Options_Menu.prototype = Object.create(Sprite.prototype);
Sprite_Options_Menu.prototype.constructor = Sprite_Options_Menu;


//-----------------------------------------------------------------------------
// Function : initialize
//-----------------------------------------------------------------------------
Sprite_Options_Menu.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this, ...arguments)
    this._optionCursorToggled = false
    this.createBackMenu();
    this.createOptionsText();
    this.createOptionButtons();
    this.createParticleEffectsOption();
    this.createMusicOption();
    this.createSoundEffectsOption();
    this.createOptionsButtonsText();
}
//-----------------------------------------------------------------------------
// Function : createParticleEffectsOption
//-----------------------------------------------------------------------------
Sprite_Options_Menu.prototype.createParticleEffectsOption = function () {
    this._optionBar = new Sprite();
    this._optionBar.bitmap = ImageManager.loadTitle1("opt_bar");
    this.addChild(this._optionBar);
    this._optionBar.x = Graphics.width / 2
    this._optionBar.y = 240

    let text
    text = IAVRA.I18N.localize("#{DuelVocab.MenuText.options9}")
    this._optionBarLow = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0x19FF47, align: 'left' });
    this.addChild(this._optionBarLow)
    this._optionBarLow.y = 244
    this._optionBarLow.x = 900
    this._optionBarLow.text = text;

    text = IAVRA.I18N.localize("#{DuelVocab.MenuText.options10}")
    this._optionBarLow = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0x19FF47, align: 'left' });
    this.addChild(this._optionBarLow)
    this._optionBarLow.y = 244
    this._optionBarLow.x = 1575
    this._optionBarLow.text = text;

    this._optionBarCursor = new Sprite_Clickable();
    this._optionBarCursor.bitmap = ImageManager.loadTitle1("opt_cursor");
    this.addChild(this._optionBarCursor);
    this._optionBarCursor.x = Graphics.width / 2 + 10
    this._optionBarCursor.y = 225
    this.updateOptionCursor();
}

//-----------------------------------------------------------------------------
// Function : createMusicOption
//-----------------------------------------------------------------------------
Sprite_Options_Menu.prototype.createMusicOption = function () {
    this._optionBarMusic = new Sprite();
    this._optionBarMusic.bitmap = ImageManager.loadTitle1("opt_bar");
    this.addChild(this._optionBarMusic);
    this._optionBarMusic.x = Graphics.width / 2
    this._optionBarMusic.y = 540

    let text
    text = "0%"
    this._optionBarMusic = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0x19FF47, align: 'left' });
    this.addChild(this._optionBarMusic)
    this._optionBarMusic.y = 544
    this._optionBarMusic.x = 900
    this._optionBarMusic.text = text;

    text = "200%"
    this._optionBarMusic = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0x19FF47, align: 'left' });
    this.addChild(this._optionBarMusic)
    this._optionBarMusic.y = 544
    this._optionBarMusic.x = 1575
    this._optionBarMusic.text = text;

    this._optionBarCursorMusic = new Sprite_Clickable();
    this._optionBarCursorMusic.bitmap = ImageManager.loadTitle1("opt_cursor");
    this.addChild(this._optionBarCursorMusic);
    this._optionBarCursorMusic.x = Graphics.width / 2 + 10
    this._optionBarCursorMusic.y = 525
    this.updateOptionCursorMusic();
}

//-----------------------------------------------------------------------------
// Function : createSoundEffectsOption
//-----------------------------------------------------------------------------
Sprite_Options_Menu.prototype.createSoundEffectsOption = function () {
    this._optionBarSE = new Sprite();
    this._optionBarSE.bitmap = ImageManager.loadTitle1("opt_bar");
    this.addChild(this._optionBarSE);
    this._optionBarSE.x = Graphics.width / 2
    this._optionBarSE.y = 640

    let text
    text = "0%"
    this._optionBarSE = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0x19FF47, align: 'left' });
    this.addChild(this._optionBarSE)
    this._optionBarSE.y = 644
    this._optionBarSE.x = 900
    this._optionBarSE.text = text;

    text = "200%"
    this._optionBarSE = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0x19FF47, align: 'left' });
    this.addChild(this._optionBarSE)
    this._optionBarSE.y = 644
    this._optionBarSE.x = 1575
    this._optionBarSE.text = text;

    this._optionBarCursorSE = new Sprite_Clickable();
    this._optionBarCursorSE.bitmap = ImageManager.loadTitle1("opt_cursor");
    this.addChild(this._optionBarCursorSE);
    this._optionBarCursorSE.x = Graphics.width / 2 + 10
    this._optionBarCursorSE.y = 625
    this.updateOptionCursorSE();
}
//-----------------------------------------------------------------------------
// Function : initialize
//-----------------------------------------------------------------------------
Sprite_Options_Menu.prototype.createBackMenu = function () {
    this._optionBack = new Sprite_Card();
    this._optionBack.bitmap = ImageManager.loadTitle1("opt_backMenu");
    this.addChild(this._optionBack);
    this._optionBack.anchor.x = this._optionBack.anchor.y = 0.5
    this._optionBack.x = Graphics.width / 2
    this._optionBack.y = 400
}

//-----------------------------------------------------------------------------
// Function : createOptionsText
//-----------------------------------------------------------------------------
Sprite_Options_Menu.prototype.createOptionsText = function () {
    let text
    this._optionsTexts = new Array()
    for (let n = 0; n < 6; n++) {
        let index = (n + 1)
        if (n >= 4){
            index += 6
        }
        text = IAVRA.I18N.localize("#{DuelVocab.MenuText.options" + index + "}")
        this._optionsTexts[n] = new PIXI.Text(new String(), { fontFamily: 'Chau Philomene One', fontSize: 60, fill: 0xFFFFFF, align: 'left', stroke: "#00919F", strokeThickness: 2 });
        this.addChild(this._optionsTexts[n])
        this._optionsTexts[n].y = n * 100 + 120
        this._optionsTexts[n].x = 200
        this._optionsTexts[n].text = text;
        if (!$dataKamigami.gameOptions.tutorial && n == 0) {
            this._optionsTexts[n].alpha = 0
        }
    }
}

//-----------------------------------------------------------------------------
// Function : createOptionButtons
//-----------------------------------------------------------------------------
Sprite_Options_Menu.prototype.createOptionButtons = function () {
    this._tutorialPlay = new Sprite_Clickable()
    this._tutorialPlay.bitmap = ImageManager.loadTitle1("opt_tutorialButton");
    this.addChild(this._tutorialPlay)
    this._tutorialPlay.y = 115
    this._tutorialPlay.x = 800
    if ($dataKamigami.gameOptions.tutorial)
        this._tutorialPlay.opacity = 150
    else
        this._tutorialPlay.opacity = 0
    this._optionsButtonsOn = new Array()
    for (let n = 0; n < 4; n++) {
        this._optionsButtonsOn[n] = new Sprite_Clickable();
        this._optionsButtonsOn[n].bitmap = ImageManager.loadTitle1("opt_buttonOn");
        this.addChild(this._optionsButtonsOn[n])
        this._optionsButtonsOn[n].y = Math.floor(n / 2) * 100 + 325
        this._optionsButtonsOn[n].x = n % 2 * 250 + 800
    }

    this._optionsButtonsOff = new Array()
    for (let n = 0; n < 4; n++) {
        this._optionsButtonsOff[n] = new Sprite_Clickable();
        this._optionsButtonsOff[n].bitmap = ImageManager.loadTitle1("opt_buttonOff");
        this.addChild(this._optionsButtonsOff[n])
        this._optionsButtonsOff[n].y = Math.floor(n / 2) * 100 + 327
        this._optionsButtonsOff[n].x = n % 2 * 250 + 800
    }

    if ($dataKamigami.gameOptions.language == "en") {
        this._optionsButtonsOff[2].opacity = 0
    } else {
        this._optionsButtonsOff[3].opacity = 0
    }
    if ($dataKamigami.gameOptions.cardEffects) {
        this._optionsButtonsOff[0].opacity = 0
    } else {
        this._optionsButtonsOff[1].opacity = 0
    }
}
//-----------------------------------------------------------------------------
// Function : createOptionsButtonsText
//-----------------------------------------------------------------------------
Sprite_Options_Menu.prototype.createOptionsButtonsText = function () {
    let text
    this._optionsButtonsText = []
    for (let n = 0; n < 4; n++) {
        text = IAVRA.I18N.localize("#{DuelVocab.MenuText.options" + (n + 5) + "}")
        this._optionsButtonsText[n] = new PIXI.Text(new String(), { fontFamily: 'Chau Philomene One', fontSize: 30, fill: 0xFFFFFF, align: 'left', stroke: "#00919F", strokeThickness: 2 });
        this.addChild(this._optionsButtonsText[n])
        this._optionsButtonsText[n].y = Math.floor(n / 2) * 100 + 338
        this._optionsButtonsText[n].x = n % 2 * 250 + 860
        this._optionsButtonsText[n].text = text
    }
}

//-----------------------------------------------------------------------------
// Function : updateOptionCursor
//-----------------------------------------------------------------------------
Sprite_Options_Menu.prototype.updateOptionCursor = function () {
    this._optionBarCursor.x = Graphics.width / 2 + fx.maxParticles / 10
}

//-----------------------------------------------------------------------------
// Function : updateOptionCursor
//-----------------------------------------------------------------------------
Sprite_Options_Menu.prototype.updateOptionCursorMusic = function () {
    this._optionBarCursorMusic.x = Graphics.width / 2 + $dataKamigami.gameOptions.music * 3
}

//-----------------------------------------------------------------------------
// Function : updateOptionCursor
//-----------------------------------------------------------------------------
Sprite_Options_Menu.prototype.updateOptionCursorSE = function () {
    this._optionBarCursorSE.x = Graphics.width / 2 + $dataKamigami.gameOptions.se * 3
}
//-----------------------------------------------------------------------------
// Function : updateOptionCursorPosition
//-----------------------------------------------------------------------------
Sprite_Options_Menu.prototype.updateOptionCursorPosition = function () {
    this._optionBarCursor.x = Math.max(Math.min(TouchInput.x, Graphics.width / 2 + 596), Graphics.width / 2 - 4)
    fx.maxParticles = Math.floor((this._optionBarCursor.x - Graphics.width / 2 + 4) * 10)
    $dataKamigami.gameOptions.maxParticles = Math.floor((this._optionBarCursor.x - Graphics.width / 2 + 4) * 10)
}
//-----------------------------------------------------------------------------
// Function : updateOptionCursorPositionMusic
//-----------------------------------------------------------------------------
Sprite_Options_Menu.prototype.updateOptionCursorPositionMusic = function () {
    this._optionBarCursorMusic.x = Math.max(Math.min(TouchInput.x, Graphics.width / 2 + 596), Graphics.width / 2 - 4)
    $dataKamigami.gameOptions.music = Math.floor((this._optionBarCursorMusic.x - Graphics.width / 2 + 4) / 3)
    AudioManager.playBgm({ name: $dataKamigami.TitleMusic, pan: 0, pitch: 100, volume: 100 });
}
//-----------------------------------------------------------------------------
// Function : updateOptionCursorPositionSE
//-----------------------------------------------------------------------------
Sprite_Options_Menu.prototype.updateOptionCursorPositionSE = function () {
    this._optionBarCursorSE.x = Math.max(Math.min(TouchInput.x, Graphics.width / 2 + 596), Graphics.width / 2 - 4)
    $dataKamigami.gameOptions.se = Math.floor((this._optionBarCursorSE.x - Graphics.width / 2 + 4) / 3)
}
//-----------------------------------------------------------------------------
// Function : updateMenu
//-----------------------------------------------------------------------------
Sprite_Options_Menu.prototype.updateMenu = function () {
    if (TouchInput.isPressed() && this._optionBarCursor.isBeingTouched() && !this._optionCursorToggled) {
        this._optionCursorToggled = true
    }
    if (TouchInput.isPressed() && this._optionBarCursorMusic.isBeingTouched() && !this._optionCursorToggledMusic) {
        this._optionCursorToggledMusic = true
    }
    if (TouchInput.isPressed() && this._optionBarCursorSE.isBeingTouched() && !this._optionCursorToggledSE) {
        this._optionCursorToggledSE = true
    }
    if (this._optionCursorToggled) {
        this.updateOptionCursorPosition()
        if (!TouchInput.isPressed()) {
            this._optionCursorToggled = false
        }
    }
    if (this._optionCursorToggledMusic) {
        this.updateOptionCursorPositionMusic()
        if (!TouchInput.isPressed()) {
            this._optionCursorToggledMusic = false
        }
    }
    if (this._optionCursorToggledSE) {
        this.updateOptionCursorPositionSE()
        if (!TouchInput.isPressed()) {
            this._optionCursorToggledSE = false
        }
    }

    if ($dataKamigami.gameOptions.tutorial) {
        this.updateTutorialButton()
        if (TouchInput.isTriggered() && this._tutorialPlay.isBeingTouched()) {
            AudioManager.playSe({ name: "success", pan: 0, pitch: 95, volume: 100 });
            loadDeck("Tutorial")
        }
    }
    if (TouchInput.isTriggered()) {
        for (let n = 0; n < 4; n++) {
            if (this._optionsButtonsOff[n].isBeingTouched()) {
                switch (n) {
                    case 0:
                        if (!$dataKamigami.gameOptions.cardEffects) {
                            this._optionsButtonsOff[0].opacity = 0
                            this._optionsButtonsOff[1].opacity = 255
                            $dataKamigami.gameOptions.cardEffects = true
                            AudioManager.playSe({ name: "button", pan: 0, pitch: 100, volume: 250 });
                        }
                        break;
                    case 1:
                        if ($dataKamigami.gameOptions.cardEffects) {
                            this._optionsButtonsOff[0].opacity = 255
                            this._optionsButtonsOff[1].opacity = 0
                            $dataKamigami.gameOptions.cardEffects = false
                            AudioManager.playSe({ name: "button", pan: 0, pitch: 100, volume: 250 });
                        }
                        break;
                    case 2:
                        if ($dataKamigami.gameOptions.language == "pt") {
                            this._optionsButtonsOff[2].opacity = 0
                            this._optionsButtonsOff[3].opacity = 255
                            $dataKamigami.gameOptions.language = "en"
                            IAVRA.I18N.language = "en"
                            AudioManager.playSe({ name: "button", pan: 0, pitch: 100, volume: 250 });
                        }
                        break;
                    case 3:
                        if ($dataKamigami.gameOptions.language == "en") {
                            this._optionsButtonsOff[2].opacity = 255
                            this._optionsButtonsOff[3].opacity = 0
                            $dataKamigami.gameOptions.language = "pt"
                            IAVRA.I18N.language = "pt"
                            AudioManager.playSe({ name: "button", pan: 0, pitch: 100, volume: 250 });
                        }
                        break;
                }
            }
        }
    }

}
//-----------------------------------------------------------------------------
// Function : updateTutorialButton
//-----------------------------------------------------------------------------
Sprite_Options_Menu.prototype.updateTutorialButton = function () {
    if (this._tutorialPlay.isBeingTouched()) {
        this._tutorialPlay.opacity += 10
    } else {
        if (this._tutorialPlay.opacity > 150)
            this._tutorialPlay.opacity -= 10
    }
}



//-----------------------------------------------------------------------------
// Function : createOptionMenu
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.createOptionMenu = function () {
    this.isOnOptions = false
    this.oldLanguageOption = $dataKamigami.gameOptions.language
    this.createFadeOptions();
    this.createGear();
    this.createOptionsMenu();

};

//-----------------------------------------------------------------------------
// Function : createFadeOptions
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.createFadeOptions = function () {
    this._optionFadeScreen = new Sprite();
    this._optionFadeScreen.bitmap = ImageManager.loadKamigami("shop_fade");
    this.addChild(this._optionFadeScreen);
    this._optionFadeScreen.opacity = 0;
}


//-----------------------------------------------------------------------------
// Function : createGear
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.createGear = function () {
    this._optionGear = new Sprite_Card();
    this._optionGear.bitmap = ImageManager.loadTitle1("opt_gear");
    this.addChild(this._optionGear);
    this._optionGear.anchor.x = this._optionGear.anchor.y = 0.5
    this._optionGear.x = 100
    this._optionGear.y = 100
    this._optionGear.opacity = 0
}

//-----------------------------------------------------------------------------
// Function : createBackMenu
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.createOptionsMenu = function () {
    this._optionsMenu = new Sprite_Options_Menu();
    this.addChild(this._optionsMenu)
    this._optionsMenu.scale.y = 0
}




//-----------------------------------------------------------------------------
// Function : updateOptionChoices
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.updateOptionChoices = function () {
    if (this.isMovingOptions()) {
        return true;
    }
    if (this._optionGear.isMiniButtonTouched()) {
        this._optionGear.opacity += 10
        if (TouchInput.isTriggered()) {
            AudioManager.playSe({ name: "button", pan: 0, pitch: 100, volume: 250 });
            this.isOnOptions = !this.isOnOptions
            DataManager.saveGame(1)
            if (!this.isOnOptions) {
                if (this.oldLanguageOption != $dataKamigami.gameOptions.language){
                    SceneManager.goto(Scene_Main_Menu)
                }
            }
        }
    } else {
        if (this._optionGear.opacity > 140)
            this._optionGear.opacity -= 10
    }
    if (this.isOnOptions) {
        this.updateOptionMenu()
    }
    return this.isOnOptions
};

//-----------------------------------------------------------------------------
// Function : isMovingOptions
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.isMovingOptions = function () {
    if (this.isOnOptions) {
        if (this._optionsMenu.scale.y < 1) {
            this._optionsMenu.scale.y += 0.05
            this._optionsMenu.opacity += 20
            if (this._optionFadeScreen.opacity < 200)
                this._optionFadeScreen.opacity += 11
            if (this._optionsMenu.scale.y >= 1) {
                this._optionsMenu.scale.y = 1

            }
            return true;
        }
        return false;
    } else {
        if (this._optionsMenu.scale.y > 0) {
            this._optionsMenu.scale.y -= 0.05
            this._optionsMenu.opacity -= 20
            this._optionFadeScreen.opacity -= 11
            if (this._optionsMenu.scale.y <= 0) {
                this._optionsMenu.scale.y = 0

            }
            return true;
        }
        return false;
    }
}


//-----------------------------------------------------------------------------
// Function : rotateGear
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.rotateGear = function () {
    this._optionGear.rotation += 0.01
    if (this._optionGear.rotation > Math.PI * 2) {
        this._optionGear.rotation -= Math.PI * 2
    }
}

//-----------------------------------------------------------------------------
// Function : updateOptionMenu
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.updateOptionMenu = function () {
    this._optionsMenu.updateMenu();
}

