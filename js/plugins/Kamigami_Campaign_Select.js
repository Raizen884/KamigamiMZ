
function Scene_Kamigami_CampaignSelect() {
    this.initialize.apply(this, arguments);
}

Scene_Kamigami_CampaignSelect.prototype = Object.create(Scene_Base.prototype);
Scene_Kamigami_CampaignSelect.prototype.constructor = Scene_Kamigami_CampaignSelect;

Scene_Kamigami_CampaignSelect.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    this.createVariables();
    this.createButtonRect();
    this.createBackMap();
    this.createBackFade();
    this.createGod();
    this.createBackOptions();
    this.createButtons();
    this.createDescriptions();
    this.createSelectionButtons();
    this.changeHue(this.configHue[this.index])
};
//-----------------------------------------------------------------------------
// Function : updates - updates process
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.createVariables = function () {
    this.index = 3;
    this.phase = 0;
    this.countFrame = 0;
    this.configHue = [0, 260, 40, 90, 310];
    this.currentHue = 0;
    this.mythTexts = ["greek", "egypt", "norse", "japan", "brazil"]
    this.configureLightColor = [0x19FF47, 0xFFD800, 0x00FFE9, 0xFF00F2, 0x00FF26]
    this.mapList = ["GreekCampaign", "EgyptCampaign", "NorseCampaign", "JapanCampaign", "BrazilCampaign"]
    this.choiceInput = 0

}
//-----------------------------------------------------------------------------
// Function : updates - updates process
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.createButtonRect = function () {
    this.rectButtons = new Array();
    this.rectButtons[0] = new Rectangle(440, 300, 150, 300)
    this.rectButtons[1] = new Rectangle(450, 700, 300, 300)
    this.rectButtons[2] = new Rectangle(800, 925, 320, 150)
    this.rectButtons[3] = new Rectangle(1190, 700, 300, 300)
    this.rectButtons[4] = new Rectangle(1350, 300, 150, 300)
}
//-----------------------------------------------------------------------------
// Function : updates - updates process
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.createBackMap = function () {

    this._backMap = new Array();
    this._backMap = new Sprite();
    this._backMap.bitmap = ImageManager.loadCampaign(this.mapList[this.index]);
    this.addChild(this._backMap);
    this._backMap.scale.y = this._backMap.scale.x = 0.5
    this._backMap.opacity = 0;

}

//-----------------------------------------------------------------------------
// Function : updates - updates process
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.createGod = function () {
    this.container = new PIXI.Container();
    this.addChild(this.container);
    this._displacement = new Sprite();
    this._displacement.bitmap = ImageManager.loadDisplacement("map8");
    this._displacement.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this._displacement.scale.set(1.5);
    this._displacement.anchor.set(0.5);
    this.container.addChild(this._displacement);
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this._displacement);
    this.overlayColorGod = new PIXI.filters.ColorOverlayFilter([1, 0, 0], [0, 0, 1], 0.001)
    this.container.filters = [this.displacementFilter, this.overlayColorGod];
    this.container.filters[1].color = "#FFFFFF";
    this.container.filters[1].enabled = !$dataKamigami.unlockedDuels[this.index]
    this.displacementFilter.scale.x = 0;
    this.displacementFilter.scale.y = 0;
    this.tl = new TimelineMax({ paused: true });
    this.tl.to(this.displacementFilter.scale, 8, { x: 0, y: 3000, ease: Expo.easeInOut });
    this.tl.timeScale(4);
    this.tl.gotoAndStop(100);
    this.tl.reverse();
    this._bigGod = new Sprite();
    this.loadRandomGod();

    this.container.addChild(this._bigGod);
}
//-----------------------------------------------------------------------------
// Function : createGod
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.loadRandomGod = function () {
    let greekGods = ["ZeusF"]
    let egyptGods = ["IsisF"]
    let norseGods = ["ThorF"]
    let japanGods = ["IzanamiF"]
    let brazilGods = ["AnhangaF"]
    let chosenGod = ""
    switch (this.index) {
        case 0:
            chosenGod = greekGods[Math.floor(Math.random() * greekGods.length)]
            break;
        case 1:
            chosenGod = egyptGods[Math.floor(Math.random() * egyptGods.length)]
            break;
        case 2:
            chosenGod = norseGods[Math.floor(Math.random() * norseGods.length)]
            break;
        case 3:
            chosenGod = japanGods[Math.floor(Math.random() * japanGods.length)]
            break;
        case 4:
            chosenGod = brazilGods[Math.floor(Math.random() * brazilGods.length)]
            break;
    }
    this._bigGod.bitmap = ImageManager.loadFace(chosenGod);
}
//-----------------------------------------------------------------------------
// Function : createGod
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.createBackFade = function () {
    this._backFade = new Array();
    this._backFade = new Sprite();
    this._backFade.bitmap = ImageManager.loadCampaign("frontEffect");
    this.addChild(this._backFade);
    this._backFade.opacity = 0;
}

//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.createBackOptions = function () {
    this._buttonBack = new Array();
    this._buttonBack[0] = new Sprite();
    this._buttonBack[0].bitmap = ImageManager.loadCampaign("cancelDuel");
    this.addChild(this._buttonBack[0]);
    this._buttonBack[0].x = - 870
    //this._buttonBack[0].y = 1080 - 257

    this._buttonBack[1] = new Sprite();
    this._buttonBack[1].bitmap = ImageManager.loadCampaign("chooseDuel");
    this._buttonBack[1].y = 1080 - 257
    this._buttonBack[1].x = - 870

    this.addChild(this._buttonBack[1]);
    this._buttonBack[2] = new Sprite();
    this._buttonBack[2].bitmap = ImageManager.loadCampaign("campaignDesc2");

    this.addChild(this._buttonBack[2]);
    this._buttonBack[2].x = 1920 - 703 + 870

    this._buttonBack[3] = new Sprite();
    this._buttonBack[3].bitmap = ImageManager.loadCampaign("campaignDesc");

    this.addChild(this._buttonBack[3]);
    this._buttonBack[3].y = 1080 - 497
    this._buttonBack[3].x = 1920 - 703 + 870
}
//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.createButtons = function () {
    this._textReturn = new Sprite_Kami_Button(0, "selectCampaign1", 90);
    this.addChild(this._textReturn);
    this._textReturn.opacity = 180
    this._textReturn.x = -870
    //this._textReturnLight.opacity = 0
    this._textSelect = new Sprite_Kami_Button(0, "selectCampaign2", 90);
    this._textSelect.y = 1080 - 257
    this._textSelect.opacity = 0
    this._textSelect.x = -870
    //this._textSelectLight.opacity = 0
    this.addChild(this._textSelect);

    this._textUnlock = new Sprite_Kami_Button(0, "selectCampaign3", 90);
    this._textUnlock.y = 1080 - 257
    this._textUnlock.opacity = 0
    this._textUnlock.x = -870
    //this._textSelectLight.opacity = 0
    this.addChild(this._textUnlock);

    this._textReturnLight = new Sprite_Kami_ButtonLight(0, "selectCampaign1", 90, this.configureLightColor[this.index]);
    this.addChild(this._textReturnLight);
    this._textReturnLight.opacity = 0
    this._textSelectLight = new Sprite_Kami_ButtonLight(0, "selectCampaign2", 90, this.configureLightColor[this.index]);
    this._textSelectLight.y = 1080 - 257
    this._textSelectLight.opacity = 0
    this.addChild(this._textSelectLight);
    this._textUnlockLight = new Sprite_Kami_ButtonLight(0, "selectCampaign3", 90, this.configureLightColor[this.index]);
    this._textUnlockLight.y = 1080 - 257
    this._textUnlockLight.opacity = 0
    this.addChild(this._textUnlockLight);
}
//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.createDescriptions = function () {
    this._descriptionHeader1 = new PIXI.Text("", { fontFamily: 'GameFont', fontSize: 48, fill: 0xffffff, align: 'left' });
    this._descriptionHeader1.text = IAVRA.I18N.localize("#{DuelVocab.Campaign.preCampaignStory}")
    this.addChild(this._descriptionHeader1);
    this._descriptionHeader1.y = 20
    this._descriptionHeader1.x = 1920 - 340 + 870
    this._descriptionHeader1.alpha = 0.8
    this._descriptionMythology = new PIXI.Text("", {
        fontFamily: 'GameFont', fontSize: 24, fill: 0xffffff, align: 'right',
        wordWrap: true,
        wordWrapWidth: 350
    });
    this._descriptionMythology.text = IAVRA.I18N.localize(`#{DuelVocab.Campaign.${this.mythTexts[this.index]}Story}`)
    this.addChild(this._descriptionMythology);
    this._descriptionMythology.y = 100
    this._descriptionMythology.x = 1920 - 20 + 870
    this._descriptionMythology.anchor.x = 1;
    this._descriptionMythology.alpha = 0.8
    this._descriptionHeader2 = new PIXI.Text("", { fontFamily: 'GameFont', fontSize: 48, fill: 0xffffff, align: 'left' });
    this._descriptionHeader2.text = IAVRA.I18N.localize("#{DuelVocab.Campaign.preCampaignStrategy}")
    this.addChild(this._descriptionHeader2);
    this._descriptionHeader2.y = 680 - 80
    this._descriptionHeader2.x = 1920 - 340 + 870
    this._descriptionHeader2.alpha = 0.8
    this._descriptionStrategy = new PIXI.Text("", {
        fontFamily: 'GameFont', fontSize: 24, fill: 0xffffff, align: 'right',
        wordWrap: true,
        wordWrapWidth: 350
    });
    this._descriptionStrategy.text = IAVRA.I18N.localize(`#{DuelVocab.Campaign.${this.mythTexts[this.index]}Strategy}`)
    this.addChild(this._descriptionStrategy);
    this._descriptionStrategy.y = 680
    this._descriptionStrategy.x = 1920 - 20 + 870
    this._descriptionStrategy.anchor.x = 1;
    this._descriptionStrategy.alpha = 0.8
    //this._descriptionMythology.alpha = 0
}
//-----------------------------------------------------------------------------
// Function : createSelectionButtons
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.createSelectionButtons = function () {
    this._selectButtons = new Array();
    let symbols = ["Greek", "Egypt", "Norse", "Japan", "Brazil"]
    for (let n = 0; n < 5; n++) {
        this._selectButtons[n] = new Sprite_Card();
        this._selectButtons[n].bitmap = ImageManager.loadCampaign("selectedMito");
        this._selectButtons[n].anchor.x = 0.5;
        this._selectButtons[n].anchor.y = -2.5;
        this._selectButtons[n].x = Graphics.width / 2;
        this._selectButtons[n].y = Graphics.height / 2;
        //this._selectButtons[n].rotation = (2 - n) * 0.85;
        this._selectButtons[n].rotation = 2 * 0.85;
        this._selectButtons[n].opacity = 0
        this._selectButtons[n].mythoText = new PIXI.Text("", { fontFamily: 'GameFont', fontSize: 48, fill: 0xffffff, align: 'center' });
        this._selectButtons[n].mythoText.y = 420
        this._selectButtons[n].mythoText.alpha = 0.7
        this._selectButtons[n].mythoText.anchor.x = 0.5;
        this._selectButtons[n].addChild(this._selectButtons[n].mythoText)
        this._selectButtons[n].mythoText.text = IAVRA.I18N.localize(`#{DuelVocab.Campaign.mythology${n + 1}}`)
        this._selectButtons[n].mythoSymbol = new Sprite();
        this._selectButtons[n].mythoSymbol.bitmap = ImageManager.loadCampaign(symbols[n]);
        this._selectButtons[n].mythoSymbol.anchor.x = 0.5;
        this._selectButtons[n].mythoSymbol.y = 480
        this._selectButtons[n].addChild(this._selectButtons[n].mythoSymbol)
        this.addChild(this._selectButtons[n])
        this._selectButtons[n].setHue(this.configHue[n])
        if (this.index != n)
            this._selectButtons[n].setColorTone([0, 0, 0, 255])
    }
}

//-----------------------------------------------------------------------------
// Function : updates - updates process
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.update = function () {
    switch (this.phase) {
        case 0:
            this.updateOpening()
            break;
        case 1:
            this.updateSelection()
            break;
        case 2:
            this.updateSwitchMythology();
            break;
        case 3:
            this.updateChoiceSelected();
            break;
        case 4:
            this.updateUnlockOption();
            break;
        default:
            break;
    }
}
//-----------------------------------------------------------------------------
// Function : updateOpening - updates process
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.updateOpening = function () {
    this.countFrame++;
    if (this._backMap.opacity < 255) {
        this._backMap.opacity += 10
        this._backFade.opacity += 10
        this.countFrame = 0;
        return
    }
    if ($dataKamigami.unlockedDuels[this.index]) {
        this._textSelect.opacity = 180
    } else {
        this._textUnlock.opacity = 180
    }
    if (this.countFrame < 30) {
        this._buttonBack[0].x += (30 - this.countFrame) * 2
        this._textReturn.x = this._buttonBack[0].x
    }

    if (this.countFrame > 15 && this.countFrame < 45) {
        this._buttonBack[1].x += (45 - this.countFrame) * 2
        this._textSelect.x = this._buttonBack[1].x
        this._textUnlock.x = this._buttonBack[1].x
    }
    if (this.countFrame > 30 && this.countFrame < 60) {
        this._buttonBack[2].x -= (60 - this.countFrame) * 2
        this._descriptionMythology.x -= (60 - this.countFrame) * 2
        this._descriptionHeader1.x -= (60 - this.countFrame) * 2

    }
    if (this.countFrame > 45 && this.countFrame < 75) {
        this._buttonBack[3].x -= (75 - this.countFrame) * 2
        this._descriptionStrategy.x -= (75 - this.countFrame) * 2
        this._descriptionHeader2.x -= (75 - this.countFrame) * 2
    }

    if (this.countFrame > 40) {
        if (this._selectButtons[4].rotation > -1.7)
            for (let n = 0; n < 5; n++) {
                this._selectButtons[n].opacity += 10
                this._selectButtons[n].rotation -= n * 0.025
            }
    }
    if (this.countFrame > 100) {
        this.countFrame = 0
        this.phase = 1
    }
}
//-----------------------------------------------------------------------------
// Function : updateSelection - updates process
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.updateSelection = function () {
    this.updateButtonHover();
    if (this.phase == 1)
        this.updateSwitchButtonHover();
}

//-----------------------------------------------------------------------------
// Function : updateSwitchButtonHover - updates process
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.updateSwitchButtonHover = function () {
    if (this._textReturnLight.isBeingTouched()) {
        this._textReturnLight.opacity += 30
        if (TouchInput.isTriggered()) {
            this.phase = 3
            this.choiceInput = 0;
            this.countFrame = 0;
        }
    } else
        this._textReturnLight.opacity -= 30
    if (this._textSelectLight.isBeingTouched() && $dataKamigami.unlockedDuels[this.index]) {
        this._textSelectLight.opacity += 30
        if (TouchInput.isTriggered()) {
            this.phase = 3
            this.choiceInput = 1;
            this.countFrame = 0;
        }
    } else
        this._textSelectLight.opacity -= 30
    if (this._textUnlockLight.isBeingTouched() && !$dataKamigami.unlockedDuels[this.index]) {
        this._textUnlockLight.opacity += 30
        if (TouchInput.isTriggered()) {
            this.phase = 3
            this.choiceInput = 2;
            this.countFrame = 0;
        }
    } else
        this._textUnlockLight.opacity -= 30
}
//-----------------------------------------------------------------------------
// Function : updateButtonHover - updates process
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.updateButtonHover = function () {
    let hoverBtn = this.checkButtonsHover();
    if (TouchInput.isTriggered() && hoverBtn != -1) {
        this.phase = 2;
        this.oldHue = this.configHue[this.index]
        this.maxHueDif = this.configHue[hoverBtn] - this.oldHue

        if (this.maxHueDif > 180) {
            this.maxHueDif -= 360
        }
        if (this.maxHueDif < -180) {
            this.maxHueDif += 360
        }
        this.index = hoverBtn;
        this.changeLightButtonsColor()
        this.countFrame = 0;
        this.resetHover();
    }
}

//-----------------------------------------------------------------------------
// Function : changeLightButtonsColor - updates process
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.changeLightButtonsColor = function () {
    this._textReturnLight.changeColor(this.configureLightColor[this.index])
    this._textSelectLight.changeColor(this.configureLightColor[this.index])
    this._textUnlockLight.changeColor(this.configureLightColor[this.index])
}
//-----------------------------------------------------------------------------
// Function : resetHover - updates process
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.resetHover = function () {
    for (let n = 0; n < 5; n++) {
        if (n == this.index) {
            continue;
        }
        this._selectButtons[n].setColorTone([0, 0, 0, 255])
    }
}


//-----------------------------------------------------------------------------
// Function : updateButtonHover - updates process
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.checkButtonsHover = function () {
    for (let n = 0; n < 5; n++) {
        if (n == this.index) {
            continue;
        }
        if (this.rectButtons[n].contains(TouchInput.x, TouchInput.y)) {
            this._selectButtons[n].setColorTone([0, 0, 0, 0])
            return n;
        } else {
            this._selectButtons[n].setColorTone([0, 0, 0, 255])

        }
    }
    return -1;
}


//
//-----------------------------------------------------------------------------
// Function : updateSwitchMythology - updates process
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.updateSwitchMythology = function () {
    this.countFrame++;
    let currentHue = 0;
    if (this.countFrame == 1) {
        this.tl.play();

    }
    if (this.countFrame < 30) {
        this._backMap.opacity -= 10
        if (this._descriptionMythology.alpha > 0) {
            this._descriptionMythology.alpha -= 0.05
            this._descriptionStrategy.alpha -= 0.05
        }
    }
    if (this.countFrame == 30) {
        this._backMap.bitmap = ImageManager.loadCampaign(this.mapList[this.index]);
        this._descriptionMythology.text = IAVRA.I18N.localize(`#{DuelVocab.Campaign.${this.mythTexts[this.index]}Story}`)
        this._descriptionStrategy.text = IAVRA.I18N.localize(`#{DuelVocab.Campaign.${this.mythTexts[this.index]}Strategy}`)
        if ($dataKamigami.unlockedDuels[this.index]) {
            this._textSelect.opacity = 180
            this._textUnlock.opacity = 0
        } else {
            this._textSelect.opacity = 0
            this._textUnlock.opacity = 180
        }


    }
    if (this.countFrame > 30) {
        this._backMap.opacity += 10
        if (this._descriptionMythology.alpha < 0.8) {
            this._descriptionMythology.alpha += 0.05
            this._descriptionStrategy.alpha += 0.05
        }
    }

    if (this.countFrame < 60) {
        currentHue = (this.countFrame / 60) * this.maxHueDif + this.oldHue
        this.changeHue(currentHue)
    }
    if (this.countFrame == 60) {
        this.changeHue(this.configHue[this.index])
        this.phase = 1;
        this.loadRandomGod();
        this.tl.reverse();
        this.container.filters[1].enabled = !$dataKamigami.unlockedDuels[this.index]
    }

    //this._buttonBack
}

//-----------------------------------------------------------------------------
// Function : changeHue - updates process
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.changeHue = function (hue) {
    for (let n = 0; n < 4; n++) {
        this._buttonBack[n].setHue(hue)
        if (!$dataKamigami.unlockedDuels[this.index]) {
            this._buttonBack[n].setColorTone([0, 0, 0, 255])
        } else {
            this._buttonBack[n].setColorTone([0, 0, 0, 0])
        }
    }
    this._backFade.setHue(hue)
    if (!$dataKamigami.unlockedDuels[this.index]) {
        this._backFade.setColorTone([0, 0, 0, 255])
        this._backMap.setColorTone([0, 0, 0, 255])
    } else {
        this._backFade.setColorTone([0, 0, 0, 0])
        this._backMap.setColorTone([0, 0, 0, 0])
    }
}
//-----------------------------------------------------------------------------
// Function : updateUnlockOption - updates process
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.updateUnlockOption = function () {
    this.countFrame++;
    let currentFrame = this.countFrame
    let colorTone = Math.max(0, (10 - currentFrame) * 25)
    if (this.countFrame < 12)
        this._buttonBack[0].setColorTone([0, 0, 0, colorTone])
    if (this.countFrame > 12 && this.countFrame < 25) {
        currentFrame = this.countFrame - 12
        colorTone = Math.max(0, (10 - currentFrame) * 25)
        this._buttonBack[1].setColorTone([0, 0, 0, colorTone])
    }
    if (this.countFrame > 24 && this.countFrame < 37) {
        currentFrame = this.countFrame - 24
        colorTone = Math.max(0, (10 - currentFrame) * 25)
        this._buttonBack[2].setColorTone([0, 0, 0, colorTone])
    }
    if (this.countFrame > 36 && this.countFrame < 49) {
        currentFrame = this.countFrame - 36
        colorTone = Math.max(0, (10 - currentFrame) * 25)
        this._buttonBack[3].setColorTone([0, 0, 0, colorTone])
    }
    if (this.countFrame > 48 && this.countFrame < 61) {
        currentFrame = this.countFrame - 48
        colorTone = Math.max(0, (10 - currentFrame) * 25)
        this._backFade.setColorTone([0, 0, 0, colorTone])

    }

    if (this.countFrame > 55 && this.countFrame < 70) {
        currentFrame = this.countFrame - 55
        colorTone = Math.max(0, (10 - currentFrame) * 25)
        this._backMap.setColorTone([0, 0, 0, colorTone])
    }
    if (this.countFrame > 40 && this.countFrame < 55) {
        this._bigGod.opacity -= 20
    }
    if (this.countFrame == 55) {
        this.container.filters[1].enabled = false
    }
    if (this.countFrame > 55) {
        this._bigGod.opacity += 20
    }

    if (this.countFrame >= 70) {
        $dataKamigami.unlockedDuels[this.index] = true

        this._textSelect.opacity = 180
        this._textUnlock.opacity = 0
        this.phase = 1
        this.countFrame = 0
    }
}

//-----------------------------------------------------------------------------
// Function : updateChoiceSelected - updates process
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.updateChoiceSelected = function () {
    this.countFrame++;
    if (this.countFrame < 60) {
        if (this.choiceInput == 0) {
            this._textReturnLight.opacity = this.countFrame % 8 * 60
        } else if (this.choiceInput == 1)
            this._textSelectLight.opacity = this.countFrame % 8 * 60
        else
            this._textUnlockLight.opacity = this.countFrame % 8 * 60
        return;
    }
    this._textReturnLight.opacity = 0
    this._textSelectLight.opacity = 0
    this._textUnlockLight.opacity = 0
    if (this.countFrame == 60 && this.choiceInput == 2) {
        this.phase = 4
        this.countFrame = 0
        this.openingWhiteFade = true
        return
    }
    if (this.countFrame == 60) {
        this.tl.play();
    }

    if (this._selectButtons[0].opacity > 0)
        for (let n = 0; n < 5; n++) {
            this._selectButtons[n].opacity -= 10
            this._selectButtons[n].rotation += n * 0.025
        }


    if (this.countFrame > 60 && this.countFrame < 90) {
        this._buttonBack[3].x += (this.countFrame - 60) * 2
        this._descriptionStrategy.x += (this.countFrame - 60) * 2
        this._descriptionHeader2.x += (this.countFrame - 60) * 2
    }
    if (this.countFrame > 75 && this.countFrame < 105) {
        this._buttonBack[2].x += (this.countFrame - 75) * 2
        this._descriptionMythology.x += (this.countFrame - 75) * 2
        this._descriptionHeader1.x += (this.countFrame - 75) * 2

    }

    if (this.countFrame > 90 && this.countFrame < 120) {
        this._buttonBack[1].x -= (this.countFrame - 90) * 2
        this._textSelect.x = this._buttonBack[1].x
    }
    if (this.countFrame > 105 && this.countFrame < 135) {
        this._buttonBack[0].x -= (this.countFrame - 105) * 2
        this._textReturn.x = this._buttonBack[0].x
    }
    if (this.countFrame > 115 && this._backMap.opacity > 0) {
        this._backMap.opacity -= 10
        this._backFade.opacity -= 10
    }
    if (this.countFrame > 140) {
        if (this.choiceInput == 0) {
            SceneManager.goto(Scene_Main_Menu)
        } else {
            SceneManager.goto(Scene_CampaignMap)
        }
    }
}
