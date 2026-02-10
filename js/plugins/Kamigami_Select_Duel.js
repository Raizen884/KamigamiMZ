ImageManager.loadKamiDuelMenu = function (filename, hue) {
    return this.loadBitmap('img/duel_menu/', filename, hue, true);
};

//-----------------------------------------------------------------------------
// Scene_Main Menu
//
// The scene class of the menu screen.

function Scene_Kamigami_Select_Duel() {
    this.initialize.apply(this, arguments);
}

Scene_Kamigami_Select_Duel.prototype = Object.create(Scene_Base.prototype);
Scene_Kamigami_Select_Duel.prototype.constructor = Scene_Kamigami_Select_Duel;

Scene_Kamigami_Select_Duel.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    this.createContainerBack();
    this.createBackground();
    this.createFakeCenter();
    this.createContainer();

    this.createDeityImage();
    this.createBackgroundOver();

    this.createButtonReturn();
    this.createButtonDuel();
    this.createInfoDuel();
    this.createDuelistOptions();
    this.createScrollBar();
    this.createDificulties();
    this.createVariables();
    this.startingPositions();
};
//-----------------------------------------------------------------------------
// Function : startingPositions
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Duel.prototype.startingPositions = function () {
    //this.imgBackgroundOver.opacity = 0;
    let movement = 435
    this.returnBack.x -= movement
    this.returnText.x -= movement
    this.returnTextLight.x -= movement
    this.returnBack.opacity = 0;
    this.duelBack.x += movement
    this.duelTextLight.x += movement
    this.duelText.x += movement

    this.duelBack.opacity = 0

    this.infoBackText.alpha -= 0.58;
    this.infoValuesText.alpha -= 0.58;

    this.infoBack.opacity = 0
    this.infoBack.x -= movement
    this.infoBackName.x -= movement
    this.infoBackText.x -= movement

    this.infoValuesText.x -= movement
    this.difficultySlider.x -= movement
    this.difficultyButtons[0].x -= movement
    this.difficultyButtons[1].x -= movement
    this.difficultyButtons[2].x -= movement
    this.difficultyBack.x -= movement
    this.duelistChoices.x += movement
    this.duelistChoices.opacity = 0
    this.scrollBar.x += movement
    this.scrollBack.x += movement
    return

};


//-----------------------------------------------------------------------------
// Function : createFakeCenter
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Duel.prototype.createFakeCenter = function () {
    this._center_sprite = new Sprite_Card();
    this._center_sprite.bitmap = ImageManager.loadTitle1("center_effects");
    this.addChild(this._center_sprite);
    this._center_sprite.x = Graphics.width / 2;
    this._center_sprite.y = Graphics.height / 2;
    this._center_sprite.anchor.x = 0.5;
    this._center_sprite.anchor.y = 0.5;
    //this.emitter = fx.getParticleEmitter('EndGameText');
    //this.emitter.init(this._center_sprite, true, 2);
    this._center_sprite.opacity = 0
};
//-----------------------------------------------------------------------------
// Function : createContainerBack
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Duel.prototype.createContainerBack = function () {
    this.containerBack = new PIXI.Container();
    this.addChild(this.containerBack);
    this._displacementBack = new Sprite();
    this._displacementBack.bitmap = ImageManager.loadDisplacement("map7");
    this._displacementBack.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this._displacementBack.scale.set(2);
    this._displacementBack.anchor.set(0.5);
    this.containerBack.addChild(this._displacementBack);
    this.displacementFilterBack = new PIXI.filters.DisplacementFilter(this._displacementBack);
    this.containerBack.filters = [this.displacementFilterBack];
    this.displacementFilterBack.scale.x = 0;
    this.displacementFilterBack.scale.y = 0;
    this.tlBack = new TimelineMax({ paused: true });
    this.tlBack.to(this.displacementFilterBack.scale, 8, { x: 0, y: -10000, ease: Expo.easeInOut });
    //this.tl.to(this.camera, 0, { autoAlpha: 1, ease: Expo.easeInOut }, "+=1");
    this.tlBack.timeScale(1000)
    this.tlBack.gotoAndPlay(100);
};
//-----------------------------------------------------------------------------
// Function : createContainer
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Duel.prototype.createContainer = function () {
    this.container = new PIXI.Container();
    this.addChild(this.container);
    this._displacement = new Sprite();
    this._displacement.bitmap = ImageManager.loadDisplacement("map14");
    this._displacement.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this._displacement.scale.set(2);
    this._displacement.anchor.set(0.5);
    this.container.addChild(this._displacement);
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this._displacement);
    this.container.filters = [this.displacementFilter, new PIXI.filters.ColorOverlayFilter([1, 0, 0], [0, 0, 1], 0.001)];
    this.container.filters[1].color = "#FFFFFF"
    this.displacementFilter.scale.x = 0;
    this.displacementFilter.scale.y = 0;
    this.tl = new TimelineMax({ paused: true });
    this.tl.to(this.displacementFilter.scale, 8, { x: 10000, y: 0, ease: Expo.easeInOut });
    //this.tl.to(this.camera, 0, { autoAlpha: 1, ease: Expo.easeInOut }, "+=1");
    this.tl.timeScale(5)
};

Scene_Kamigami_Select_Duel.prototype.createVariables = function () {
    this.duelistSelected = $dataKamigami.selectedDuelist
    this.duelistChoices.duelistSelected = $dataKamigami.selectedDuelist
    this.godTimeLine = ""
    this.timeLineFrame = 0
    this.difficulty = $dataKamigami.lastDifficulty
    this.phase = 0;
    this.countFrame = -20
};

Scene_Kamigami_Select_Duel.prototype.createDificulties = function () {
    this.difficultyBack = new Sprite()
    this.difficultyBack.bitmap = ImageManager.loadKamiDuelMenu("dificultyBack")
    this.addChild(this.difficultyBack)
    this.difficultyBack.y = 950
    this.difficultyBack.x = 50
    this.difficultyBack.opacity = 170

    this.difficultySlider = new Sprite()
    this.difficultySlider.bitmap = ImageManager.loadKamiDuelMenu("slider")
    this.addChild(this.difficultySlider)
    this.difficultySlider.y = 949
    this.difficultySlider.x = 50 + 140

    this.difficultyButtons = []
    let buttonNames = []
    for (let n = 0; n < 3; n++) {
        buttonNames[n] = IAVRA.I18N.localize("#{DuelVocab.MenuText.selectduel" + (n + 2) + "}")
        this.difficultyButtons[n] = new Sprite_Clickable()
        this.difficultyButtons[n].bitmap = new Bitmap(140, 50)
        this.difficultyButtons[n].bitmap.fontSize = 32
        this.difficultyButtons[n].bitmap.outlineWidth = 0
        this.difficultyButtons[n].bitmap.drawText(buttonNames[n], 0, 0, 140, 50, "center")
        this.addChild(this.difficultyButtons[n])
        this.difficultyButtons[n].y = 949
        this.difficultyButtons[n].x = 50 + n * 140
        if (n <= $dataKamigami.maxDifficulty)
            this.difficultyButtons[n].opacity = 150
        else
            this.difficultyButtons[n].opacity = 0
    }
};

Scene_Kamigami_Select_Duel.prototype.createInfoDuel = function () {
    this.infoBack = new Sprite()
    this.infoBack.bitmap = ImageManager.loadKamiDuelMenu("infoDeityBack")
    this.addChild(this.infoBack)
    this.infoBack.y = Graphics.height - 494

    let text = ""
    this.infoBackName = new PIXI.Text(text, { fontFamily: 'GameFont', fontSize: 54, fill: 0xffffff, align: 'left', bold: true });
    this.addChild(this.infoBackName)
    this.infoBackName.y = 630
    this.infoBackName.x = 50
    this.infoBackName.alpha = 0.7

    text = IAVRA.I18N.localize("#{DuelVocab.MenuText.selectduel1}")
    this.infoBackText = new PIXI.Text(text, { fontFamily: 'GameFont', fontSize: 40, fill: 0xffffff, align: 'left' });
    this.addChild(this.infoBackText)
    this.infoBackText.y = 720
    this.infoBackText.x = 50
    this.infoBackText.alpha = 0.7


    text = ""
    this.infoValuesText = new PIXI.Text(text, { fontFamily: 'GameFont', fontSize: 40, fill: 0xffffff, align: 'right' });
    this.addChild(this.infoValuesText)
    this.infoValuesText.y = 720
    this.infoValuesText.x = 420
    this.infoValuesText.anchor.x = 1
    this.infoValuesText.alpha = 0.7
};


Scene_Kamigami_Select_Duel.prototype.createButtonReturn = function () {
    this.returnBack = new Sprite()
    this.returnBack.bitmap = ImageManager.loadKamiDuelMenu("returnBack")
    this.addChild(this.returnBack)

    this.returnTextLight = new Sprite_Kami_ButtonLight(0, "selectDuelMenu1", 70, 0x00CECE, 100);
    this.addChild(this.returnTextLight)
    this.returnTextLight.opacity = 0

    this.returnText = new Sprite_Kami_Button(0, "selectDuelMenu1", 70, 100);
    this.addChild(this.returnText)
    this.returnText.opacity = 170
};



Scene_Kamigami_Select_Duel.prototype.createButtonDuel = function () {
    this.duelBack = new Sprite()
    this.duelBack.bitmap = ImageManager.loadKamiDuelMenu("duelBack")
    this.addChild(this.duelBack)
    this.duelBack.x = Graphics.width - 649

    this.duelTextLight = new Sprite_Kami_ButtonLight(1, "selectDuelMenu2", -120, 0x00CECE, 100);
    this.addChild(this.duelTextLight)
    this.duelTextLight.x = Graphics.width - 437
    this.duelTextLight.opacity = 0

    this.duelText = new Sprite_Kami_Button(1, "selectDuelMenu2", -120, 100);
    this.addChild(this.duelText)
    this.duelText.x = Graphics.width - 437
    this.duelText.opacity = 170
};



Scene_Kamigami_Select_Duel.prototype.createScrollBar = function () {
    this.scrollBack = new Sprite_Card()
    this.scrollBack.bitmap = ImageManager.loadKamiDuelMenu("scrollLine")
    this.addChild(this.scrollBack)
    this.scrollBack.anchor.x = this.scrollBack.anchor.y = 0.5
    this.scrollBack.x = 1895
    this.scrollBack.y = 800
    this.scrollBar = new Sprite_Card()
    this.scrollBar.bitmap = ImageManager.loadKamiDuelMenu("scrollBar")
    this.addChild(this.scrollBar)
    this.scrollBar.anchor.x = this.scrollBar.anchor.y = 0.5
    this.scrollBar.x = 1895
    this.scrollBar.y = 595
    this.scrollBar.scale.y = Math.min(1, 620 / (this.duelistChoices.selectedCardOptions.length * 50))
};


Scene_Kamigami_Select_Duel.prototype.createBackground = function () {
    this.imgBackground = new Sprite();
    this.imgBackground.bitmap = ImageManager.loadKamiDuelMenu("background")
    this.containerBack.addChild(this.imgBackground)
};
Scene_Kamigami_Select_Duel.prototype.createDeityImage = function () {
    this.deityImage = new Sprite();
    this.container.addChild(this.deityImage)
};

Scene_Kamigami_Select_Duel.prototype.createBackgroundOver = function () {
    this.imgBackgroundOver = new Sprite();
    this.imgBackgroundOver.bitmap = ImageManager.loadKamiDuelMenu("background2")
    this.addChild(this.imgBackgroundOver)
    this.imgBackgroundOver.opacity = 0;
};

//////////////////////////// MAIN UPDATE //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : update - updates deck building scene
//-----------------------------------------------------------------------------

Scene_Kamigami_Select_Duel.prototype.update = function () {
    Scene_Base.prototype.update.call(this)
    switch (this.phase) {
        case 0:
            this.openingScene();
            break;
        case 1:
            this.updateScene();
            break;
        case 3:
            this.closeScene();
            break;
    };

};
//-----------------------------------------------------------------------------
// Function : openingScene
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Duel.prototype.openingScene = function () {
    this.countFrame++
    if (this.countFrame == -19) {
        this.tlBack.timeScale(5)
        this.tlBack.reverse();
    }
    if (this.countFrame < 20) {
        return
    };
    let movement = 50 - this.countFrame
    if (this.countFrame < 50 && this.countFrame > 20) {
        this.returnBack.x += movement
        this.returnText.x += movement
        this.returnBack.opacity += 10
        if (this.returnText.opacity < 170)
            this.returnText.opacity += 5
        this.returnTextLight.x += movement
        this.returnTextLight.opacity -= 10
    }

    if (this.countFrame < 70 && this.countFrame > 40) {
        movement = 70 - this.countFrame
        this.duelTextLight.x -= movement
        this.duelText.x -= movement
        if (this.duelText.opacity < 170)
            this.duelText.opacity += 5
        this.duelBack.opacity += 10
        this.duelBack.x -= movement
    }

    if (this.countFrame < 90 && this.countFrame > 60) {
        movement = -(90 - this.countFrame)
        this.infoBack.x -= movement
        this.infoBack.opacity += 10
        this.infoBackName.x -= movement
        this.infoBackName.opacity += 10
        this.infoBackText.x -= movement
        this.infoBackText.alpha += 0.02;
        this.infoValuesText.alpha += 0.02;
        this.infoValuesText.x -= movement
        this.difficultySlider.x -= movement
        this.difficultyButtons[0].x -= movement
        this.difficultyButtons[1].x -= movement
        this.difficultyButtons[2].x -= movement
        this.difficultyBack.x -= movement
    }

    if (this.countFrame < 110 && this.countFrame > 80) {
        movement = this.countFrame - 80
        this.duelistChoices.x -= movement
        this.duelistChoices.opacity += 10
        this.scrollBar.x -= movement
        this.scrollBack.x -= movement
    };
    if (this.countFrame == 110) {
        this.imgBackgroundOver.opacity = 255;
        this.phase = 1;
    }
};


//-----------------------------------------------------------------------------
// Function : updateButtonsClick
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Duel.prototype.updateButtonsClick = function () {
    if (this.returnText.isBeingTouched()) {
        AudioManager.playSe({ name: "success", pan: 0, pitch: 95, volume: 100 });
        this.nextScene = 0
        this.countFrame = 0
        this.phase = 3
    }

    if (this.duelText.isBeingTouched()) {
        let duelId = this.duelistChoices.duelistOptions[this.duelistSelected].duelId;
        if ($dataKamigami.duelInfo[duelId].wins == 0) {
            AudioManager.playSe({ name: "beep", pan: 0, pitch: 100, volume: 100 });
            return;
        }
        AudioManager.playSe({ name: "success", pan: 0, pitch: 95, volume: 100 });
        this.nextScene = 1
        this.countFrame = 0
        this.phase = 3
    }
}

//-----------------------------------------------------------------------------
// Function : closeScene
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Duel.prototype.closeScene = function () {
    this.countFrame++
    if (this.countFrame == 60) {
        this.tl.timeScale(4);
        this.tl.play();
    }
    if (this.countFrame < 120) {
        if (this.nextScene == 0) {
            this.returnTextLight.opacity = this.countFrame % 10 > 4 ? 255 : 0
        } else {
            this.duelTextLight.opacity = this.countFrame % 10 > 4 ? 255 : 0
        }
        return
    }


    if (this.countFrame == 200) {
        this.imgBackgroundOver.opacity = 0;
        this.tlBack.play();
    }
    if (this.countFrame < 280) {
        let movement = this.countFrame - 120

        this.returnBack.x -= movement
        this.returnText.x -= movement
        this.returnText.opacity -= movement
        this.returnTextLight.x -= movement
        this.returnTextLight.opacity -= 5
        if (this.countFrame < 140)
            return

        movement = this.countFrame - 140
        this.duelTextLight.x += movement
        this.duelTextLight.opacity -= 5
        this.duelText.x += movement
        this.duelText.opacity -= 5
        this.duelBack.x += movement

        if (this.countFrame < 160)
            return

        movement = this.countFrame - 160
        this.infoBack.x -= movement
        this.infoBackName.x -= movement
        this.infoBackName.opacity -= 5
        this.infoBackText.x -= movement
        this.infoBackText.alpha -= 0.02;
        this.infoValuesText.alpha -= 0.02;
        this.infoValuesText.x -= movement
        this.difficultySlider.x -= movement
        this.difficultyButtons[0].x -= movement
        this.difficultyButtons[1].x -= movement
        this.difficultyButtons[2].x -= movement
        this.difficultyBack.x -= movement
        if (this.countFrame < 180)
            return
        movement = this.countFrame - 180
        this.duelistChoices.x += movement
        this.duelistChoices.opacity -= 5
        this.scrollBar.x += movement
        this.scrollBack.x += movement
        return
    }
    if (this.nextScene == 0) {
        SceneManager.goto(Scene_Main_Menu);
    } else {
        $dataKamigami.lastDifficulty = this.difficulty
        loadDeck(this.godTimeLine, this.difficulty);
    }
};

//-----------------------------------------------------------------------------
// Function : updateScene
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Duel.prototype.updateScene = function () {
    this.updateButtonsHover();
    if (TouchInput.isTriggered())
        this.updateButtonsClick();
    if (this.godTimeLine != this.duelistChoices.currentDuelist(this.duelistSelected) || this.timeLineFrame >= 40) {
        this.updateGodChange();
    }
    this.updateDificultyChange()
    this.updateScrollBar(this.scrollBar, this.duelistChoices);
    if (!TouchInput.isPressed()) this.moveScrollBar = false
    this.moveDuelists()
};
//-----------------------------------------------------------------------------
// Function : updateButtonsHover
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Duel.prototype.updateButtonsHover = function () {
    if (this.returnText.isBeingTouched()) {
        this.returnTextLight.opacity += 20;
        if (this.returnTextLight.opacity == 20) {
            AudioManager.playSe({ name: "menu_select", pan: 0, pitch: 100, volume: 100 });
        }
    } else {
        this.returnTextLight.opacity -= 20;
    }

    if (this.duelText.isBeingTouched()) {
        this.duelTextLight.opacity += 20;
        if (this.duelTextLight.opacity == 20) {
            AudioManager.playSe({ name: "menu_select", pan: 0, pitch: 100, volume: 100 });
        }
    } else {
        this.duelTextLight.opacity -= 20;
    }
}

//-----------------------------------------------------------------------------
// Function : updateDificultyChange
//-----------------------------------------------------------------------------

Scene_Kamigami_Select_Duel.prototype.updateDificultyChange = function () {
    for (let n = 0; n < 3; n++) {
        if (n > $dataKamigami.maxDifficulty) {
            break
        }
        if (this.difficultyButtons[n].isBeingTouched() && TouchInput.isPressed()) {
            this.difficulty = n;
        }
        if (this.difficulty == n) {
            if (this.difficultyButtons[n].y > 947)
                this.difficultyButtons[n].y -= 0.25
            this.difficultyButtons[n].opacity += 5
        } else {
            if (this.difficultyButtons[n].y < 949)
                this.difficultyButtons[n].y += 0.25
            if (this.difficultyButtons[n].opacity > 90) {
                this.difficultyButtons[n].opacity -= 5
            }
        }
    }
    if (this.difficultySlider.x > 50 + 140 * this.difficulty) {
        this.difficultySlider.x -= (this.difficultySlider.x - (50 + 140 * this.difficulty)) / 20 + 1
        if (this.difficultySlider.x < 50 + 140 * this.difficulty) {
            this.difficultySlider.x = 50 + 140 * this.difficulty
        }
    }
    if (this.difficultySlider.x < 50 + 140 * this.difficulty) {
        this.difficultySlider.x -= (this.difficultySlider.x - (50 + 140 * this.difficulty)) / 20 - 1
        if (this.difficultySlider.x > 50 + 140 * this.difficulty) {
            this.difficultySlider.x = 50 + 140 * this.difficulty
        }
    }

};


//-----------------------------------------------------------------------------
// Function : updateGodChange
//-----------------------------------------------------------------------------

Scene_Kamigami_Select_Duel.prototype.updateGodChange = function () {
    this.timeLineFrame++
    if (this.timeLineFrame == 1) {
        this.tl.gotoAndPlay(1)
        AudioManager.playSe({ name: "Decision", pan: 0, pitch: 100, volume: 250 });
    }
    if (this.timeLineFrame == 40) {
        this.godTimeLine = this.duelistChoices.currentDuelist(this.duelistSelected)
        this.deityImage.bitmap = ImageManager.loadFace(this.godTimeLine)
        let duelId = this.duelistChoices.duelistOptions[this.duelistSelected].duelId;
        if (duelId == -1 || $dataKamigami.duelInfo[duelId].wins == 0) {
            this.deityImage.opacity = 130

        } else {
            this.deityImage.opacity = 255
        }
        this.container.filters[1].enabled = $dataKamigami.duelInfo[duelId].wins == 0
        this.tl.reverse();
        this.loadDeityInformation(duelId);

    }
    if (this.timeLineFrame <= 40) {
        this.infoBackName.x -= this.timeLineFrame / 2
        this.infoBackName.alpha -= 0.017
        this.infoBackText.x -= this.timeLineFrame / 2
        this.infoBackText.alpha -= 0.017
        this.infoValuesText.x -= this.timeLineFrame / 2
        this.infoValuesText.alpha -= 0.017
        this._center_sprite.opacity -= 15
    } else {
        this.infoBackName.x += (81 - this.timeLineFrame) / 2
        this.infoBackName.alpha += 0.017
        this.infoBackText.x += (81 - this.timeLineFrame) / 2
        this.infoBackText.alpha += 0.017
        this.infoValuesText.x += (81 - this.timeLineFrame) / 2
        this.infoValuesText.alpha += 0.017
        this._center_sprite.opacity += 2
    }
    if (this.timeLineFrame == 80) {
        this.infoBackName.x = 50
        this.infoBackName.alpha = 0.7
        this.infoBackText.x = 50
        this.infoBackText.alpha = 0.7
        this.infoValuesText.x = 420
        this.infoValuesText.alpha = 0.7
        //this.godTimeLine = this.duelistChoices.currentDuelist(this.duelistSelected)
        this.timeLineFrame = 0;
    }

};
Scene_Kamigami_Select_Duel.prototype.loadDeityInformation = function (duelId) {
    if ($dataKamigami.duelInfo[duelId].wins > 0)
        this.infoBackName.text = this.godTimeLine.toUpperCase()
    else
        this.infoBackName.text = "????????"
    let wins = $dataKamigami.duelInfo[duelId].wins
    let losses = $dataKamigami.duelInfo[duelId].losses
    let infos = this.duelistChoices.getDuelistInfo(this.duelistSelected)
    let type
    let civilization
    switch (infos[0]) {
        case 0:
            civilization = IAVRA.I18N.localize("#{DuelVocab.MenuText.selectduel5}")
            break;
        case 1:
            civilization = IAVRA.I18N.localize("#{DuelVocab.MenuText.selectduel6}")
            break;
        case 2:
            civilization = IAVRA.I18N.localize("#{DuelVocab.MenuText.selectduel7}")
            break;
        case 3:
            civilization = IAVRA.I18N.localize("#{DuelVocab.MenuText.selectduel8}")
            break;
        default:
            break;
    }
    switch (infos[1]) {
        case 0:
            type = IAVRA.I18N.localize("#{DuelVocab.MenuText.selectduel9}")
            break;
        default:
            type = IAVRA.I18N.localize("#{DuelVocab.MenuText.selectduel10}")
            break;
    }

    let text = wins + "\n" + losses + "\n" + type + "\n" + civilization
    this.infoValuesText.text = text
};


Scene_Kamigami_Select_Duel.prototype.moveDuelists = function () {
    if (TouchInput.x > 1300 && TouchInput.y > 450 && this.duelistSelected != this.duelistChoices.duelistSelected && TouchInput.isTriggered() && this.duelistChoices.duelistSelected != -1) {
        this.duelistSelected = this.duelistChoices.duelistSelected;
        if (this.duelistSelected == undefined) {
            return;
        }
        $dataKamigami.selectedDuelist = this.duelistSelected
    }
    let duelist;
    for (let n = 0; n < this.duelistChoices.duelistOptions.length; n++) {
        duelist = this.duelistChoices.duelistOptions[n]
        if (this.duelistSelected == n) {
            duelist.opacity += 5
            if (duelist.x > -20) {
                duelist.x -= 2
            }
        }
        else {
            if (duelist.opacity > 150)
                duelist.opacity -= 5
            if (duelist.x < 0) {
                duelist.x += 2
            }
        }
    }
};


Scene_Kamigami_Select_Duel.prototype.updateScrollBar = function (scrollBar, cardOptions) {
    if (TouchInput.isPressed() && scrollBar.isBeingTouched()) {
        this.moveScrollBar = true
    }
    if (this.moveScrollBar) {
        cardOptions.y = (-cardOptions.selectedCardOptions.length * 50) * ((TouchInput.y - 550) / 475) + 700
        scrollBar.y = TouchInput.y;
    }
    this.updatecardOptionsPosition(cardOptions);
    let totalCardOptionsHeight = cardOptions.selectedCardOptions.length * 50;
    let calculateScroll = -(cardOptions.y - 550) / totalCardOptionsHeight
    scrollBar.y = 550 + scrollBar.scale.y * scrollBar.height / 2 + calculateScroll * scrollBar.height
};

Scene_Kamigami_Select_Duel.prototype.updatecardOptionsPosition = function (cardOptions) {
    cardOptions.y -= TouchInput.wheelY;
    if (cardOptions.selectedCardOptions.length >= 14) {
        cardOptions.y = Math.min(550, cardOptions.y);
        cardOptions.y = Math.max(1050 - cardOptions.selectedCardOptions.length * 50, cardOptions.y)
    } else {
        cardOptions.y = 550;
    }

};

Scene_Kamigami_Select_Duel.prototype.createDuelistOptions = function () {
    this.duelistChoices = new SpriteDuelistChoices();
    this.addChild(this.duelistChoices)
    this.addChild(this.duelistChoices.mask)
    this.duelistChoices.x = 1570
    this.duelistChoices.mask.x = 1520;
    //this.duelistChoices.duelistSelected = this.duelistSelected;
};







//-----------------------------------------------------------------------------
// SpriteCardButton
//
// The sprite for displaying a card in triple triad.

function SpriteDuelistChoices() {
    this.initialize.apply(this, arguments);
}

SpriteDuelistChoices.prototype = Object.create(Sprite_Card.prototype);
SpriteDuelistChoices.prototype.constructor = SpriteDuelistChoices;

//-----------------------------------------------------------------------------
// Function : initialize
//-----------------------------------------------------------------------------
SpriteDuelistChoices.prototype.initialize = function () {
    Sprite_Card.prototype.initialize.call(this);
    this.duelistSelected = 0;
    this.cardLength = 0;
    this.createMask();
    this.createAllOptions();
};
//-----------------------------------------------------------------------------
// Function : getDuelId
//-----------------------------------------------------------------------------
SpriteDuelistChoices.prototype.getDuelId = function (name) {
    let duelInfo = $dataKamigami.duelInfo;
    for (let n = 0; n < duelInfo.length; n++) {
        if (duelInfo[n].name == name) {
            return n
        }
    }
    return -1;
};
//-----------------------------------------------------------------------------
// Function : createAllOptions
//-----------------------------------------------------------------------------
SpriteDuelistChoices.prototype.createAllOptions = function () {
    this.duelistOptions = new Array();
    let card
    let cardId
    for (let n = 0; n < 151; n++) {
        if (n != 150) {
            card = new KamigamiCard()
            card.loadCardData(n, 0);
            if (card.cardType == 2 || card.cardType == 3 || card.name == "Phoenix Egg") 
                continue
            cardId = this.getDuelId(card.name)
            if (cardId == -1) {
                continue
            }
        } else {
            continue
            card = { name: "Dagandr", specialType: 2, cardType: 1 }
            cardId = 67
        }



        this.duelistOptions.push(new SpriteDuelistButton())
        let last = this.duelistOptions.length - 1
        this.duelistOptions[last].configureDuelist(card.name, card.specialType, n, card.cardType, cardId)
        this.duelistOptions[last].duelId = this.getDuelId(card.name)
        this.addChild(this.duelistOptions[last])
        this.duelistOptions[last].y = last * 50
        this.duelistOptions[last].anchor.x = this.duelistOptions[last].anchor.y = 0.5;
    }
    this.selectedCardOptions = { length: this.duelistOptions.length }
};
//-----------------------------------------------------------------------------
// Function : createMask
//-----------------------------------------------------------------------------
SpriteDuelistChoices.prototype.createMask = function () {
    this.mask = new PIXI.Graphics();
    this.mask.beginFill();
    this.mask.x = 50
    this.mask.y = 550;
    this.y = 550;
    //this.maskInside.anchor.x = this.maskInside.anchor.y = 0.5;
    this.mask.drawRect(0, 0, 600, 500);
    this.mask.endFill();
};
//-----------------------------------------------------------------------------
// Function : getDuelistInfo
//-----------------------------------------------------------------------------
SpriteDuelistChoices.prototype.getDuelistInfo = function (duelistId) {
    return [this.duelistOptions[duelistId].specialType, this.duelistOptions[duelistId].cardType]
}
//-----------------------------------------------------------------------------
// Function : currentDuelist
//-----------------------------------------------------------------------------
SpriteDuelistChoices.prototype.currentDuelist = function (duelistId) {
    return this.duelistOptions[duelistId].name
}

//-----------------------------------------------------------------------------
// Function : currentDuelist
//-----------------------------------------------------------------------------
SpriteDuelistChoices.prototype.currentDuelId = function (duelistId) {
    return this.duelistOptions[duelistId].duelId
}
//-----------------------------------------------------------------------------
// Function : update
//-----------------------------------------------------------------------------
SpriteDuelistChoices.prototype.update = function () {
    Sprite_Card.prototype.update.call(this);
    if (TouchInput.x > this.mask.x && TouchInput.y > this.mask.y && TouchInput.x < this.mask.x + 500 && TouchInput.y < this.mask.y + 700)
        this.duelistSelected = this.getButtonTouch();
};

//-----------------------------------------------------------------------------
// Function : getCardTouch - Gets the card by cursor
//-----------------------------------------------------------------------------
SpriteDuelistChoices.prototype.getButtonTouch = function () {
    for (let n = 0; n < this.duelistOptions.length; n++) {
        if (this.duelistOptions[n].isMiniButtonTouched()) {
            return n;
        }
    };
    return -1;
};
//-----------------------------------------------------------------------------
// SpriteDuelistButton
//
// The sprite for displaying a card in triple triad.

function SpriteDuelistButton() {
    this.initialize.apply(this, arguments);
}

SpriteDuelistButton.prototype = Object.create(Sprite_Card.prototype);
SpriteDuelistButton.prototype.constructor = SpriteDuelistButton;



//-----------------------------------------------------------------------------
// Function : SpriteDuelistButton
//-----------------------------------------------------------------------------
SpriteDuelistButton.prototype.initialize = function () {
    Sprite_Card.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Function : SpriteCardButton
//-----------------------------------------------------------------------------
SpriteDuelistButton.prototype.configureDuelist = function (name, specialType, id, cardType, cardId) {
    this.duelistId = id
    this.name = name
    if ($dataKamigami.duelInfo[cardId].wins == 0) {
        name = "???????"
    }
    this.specialType = specialType
    this.cardType = cardType
    this.loadBackImage()
    this.loadName(name)
    this.loadCivilization(specialType)

};

SpriteDuelistButton.prototype.isMiniButtonTouched = function () {
    var x = this.canvasToLocalX(TouchInput.x + parseInt((this.width / 2) * this.scale.x));
    var y = this.canvasToLocalY(TouchInput.y + parseInt((this.height / 2) * this.scale.y));
    return x >= 0 && y >= 0 && x < this.backImage.width * this.scale.x && y < this.backImage.height * this.scale.y;

};

//-----------------------------------------------------------------------------
// Function : loadBackImage
//-----------------------------------------------------------------------------
SpriteDuelistButton.prototype.loadBackImage = function (cardType) {
    this.backImage = new Sprite();
    this.backImage.bitmap = ImageManager.loadKamiDuelMenu("duelistBack")
    this.addChild(this.backImage)

};

//-----------------------------------------------------------------------------
// Function : loadName
//-----------------------------------------------------------------------------
SpriteDuelistButton.prototype.loadName = function (deckName) {
    this.nameText = new PIXI.Text(deckName, { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0xffffff, align: 'left' });
    this.addChild(this.nameText)
    this.nameText.x = 70
    this.nameText.y = 10
};


//-----------------------------------------------------------------------------
// Function : loadCivilization
//-----------------------------------------------------------------------------
SpriteDuelistButton.prototype.loadCivilization = function (type) {
    this.typeIcon = new Sprite();

    switch (type) {
        case 0:
            this.typeIcon.bitmap = ImageManager.loadDeckBuild("Greek")
            break;
        case 1:
            this.typeIcon.bitmap = ImageManager.loadDeckBuild("Egypt")
            break;
        case 2:
            this.typeIcon.bitmap = ImageManager.loadDeckBuild("Norse")
            break;
        case 3:
            this.typeIcon.bitmap = ImageManager.loadDeckBuild("Japan")
            break;
        case 4:
            this.typeIcon.bitmap = ImageManager.loadDeckBuild("Brazil")
            break;
        default:
            break;
    }
    this.addChild(this.typeIcon)
    this.typeIcon.x = 22;
    this.typeIcon.y = 3
};



var __filters = function (r, o, e) { "use strict"; var t = function (r, o) { return (t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (r, o) { r.__proto__ = o } || function (r, o) { for (var e in o) Object.prototype.hasOwnProperty.call(o, e) && (r[e] = o[e]) })(r, o) }; Object.create; Object.create; var n = function (r) { function o(o) { void 0 === o && (o = 0); var e = r.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec3 color;\nvoid main(void) {\n    vec4 currentColor = texture2D(uSampler, vTextureCoord);\n    vec3 colorOverlay = color * currentColor.a;\n    gl_FragColor = vec4(colorOverlay.r, colorOverlay.g, colorOverlay.b, currentColor.a);\n}\n") || this; return e._color = 0, e.uniforms.color = new Float32Array(3), e.color = o, e } return function (r, o) { function e() { this.constructor = r } t(r, o), r.prototype = null === o ? Object.create(o) : (e.prototype = o.prototype, new e) }(o, r), Object.defineProperty(o.prototype, "color", { get: function () { return this._color }, set: function (r) { var o = this.uniforms.color; "number" == typeof r ? (e.hex2rgb(r, o), this._color = r) : (o[0] = r[0], o[1] = r[1], o[2] = r[2], this._color = e.rgb2hex(o)) }, enumerable: !1, configurable: !0 }), o }(o.Filter); return r.ColorOverlayFilter = n, Object.defineProperty(r, "__esModule", { value: !0 }), r }({}, PIXI, PIXI.utils); Object.assign(PIXI.filters, __filters);
//# sourceMappingURL=filter-color-overlay.js.map
