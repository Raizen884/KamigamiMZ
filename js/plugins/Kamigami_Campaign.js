
ImageManager.loadCampaign = function (filename, hue) {
    return this.loadBitmap('img/campaign/', filename, hue, true);
};


//-----------------------------------------------------------------------------
// Scene_CampaignMap 
//
// The scene class of the campaign map.

function Scene_CampaignMap() {
    this.initialize.apply(this, arguments);
}

Scene_CampaignMap.prototype = Object.create(Scene_Base.prototype);
Scene_CampaignMap.prototype.constructor = Scene_CampaignMap;
//////////////////////////// MAIN START //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : initialize - initiates the graphics
//-----------------------------------------------------------------------------
Scene_CampaignMap.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    this.createVariables();
    this.createBackGods();
    this.createMapButtons();
    this.createSprites();
    this.createMouseSprites();
    this.createFade();
    this.createButtons();
    this.createButtonText();
    this.createBackFrames();
    this.createGodTexts();
    this.createGodImage();
    AudioManager.playBgm({ name: "Onward!! 2", pan: 0, pitch: 100, volume: 100 });


};
Scene_CampaignMap.prototype.createBackGods = function () {
    this._backGods = new Sprite();
    this._backGods.bitmap = ImageManager.loadCampaign("back_Greek")
    this._backGods.x = 1728
    this.addChild(this._backGods)
}


Scene_CampaignMap.prototype.createMapButtons = function () {
    this._backOptions = new Array(3)
    for (let index = 0; index < 3; index++) {
        this._backOptions[index] = new Sprite();
        this._backOptions[index].bitmap = ImageManager.loadTitle1("title_deck_bg")
        this.addChild(this._backOptions[index])
        this._backOptions[index].x = 1600
        this._backOptions[index].y = index * 320 + 100
    }
    this._backOptionsText = new Array(3)
    for (let index = 0; index < this._backOptionsText.length; index++) {
        this._backOptionsText[index] = new Sprite_Kami_Button(0, `campaignDuelMenu${index + 1}`, 5, 40);
        this.addChild(this._backOptionsText[index])
        this._backOptionsText[index].x = 1728
        this._backOptionsText[index].y = index * 320 + 100
    }

    this._backOptionsLight = new Array(3)
    for (let index = 0; index < this._backOptionsLight.length; index++) {
        this._backOptionsLight[index] = new Sprite_Kami_ButtonLight(0, `campaignDuelMenu${index + 1}`, 5, 0x00FFF6, 40);
        this.addChild(this._backOptionsLight[index])
        this._backOptionsLight[index].x = 1728
        this._backOptionsLight[index].y = index * 320 + 100
        this._backOptionsLight[index].opacity = 0;
    }

};
Scene_CampaignMap.prototype.createVariables = function () {
    this.phase = 2;
    this.godName = "";
    this.countFrames = 0;

};

Scene_CampaignMap.prototype.createMouseSprites = function () {
    this._mouseSprite = new SpriteMouseCampaign()
    this.addChild(this._mouseSprite)
    this._mouseSprite.x = 700
    this._mouseSprite.y = 20
};

Scene_CampaignMap.prototype.createSprites = function () {
    this._mainMap = new SpriteCampaign();
    this.addChild(this._mainMap)
};

Scene_CampaignMap.prototype.createFade = function () {
    this._fade = new Sprite();
    this._fade.bitmap = ImageManager.loadKamigami("shop_fade")
    this.addChild(this._fade)
    this._fade.opacity = 0;
}

Scene_CampaignMap.prototype.createButtons = function () {
    this._cancelButtonBack = new Sprite();
    this._cancelButtonBack.bitmap = ImageManager.loadCampaign("cancelDuel")
    this.addChild(this._cancelButtonBack)
    this._cancelButtonBack.x = -820

    this._duelButtonBack = new Sprite();
    this._duelButtonBack.bitmap = ImageManager.loadCampaign("chooseDuel")
    this.addChild(this._duelButtonBack)
    this._duelButtonBack.y = 1080 - 257
    this._duelButtonBack.x = -820
}

Scene_CampaignMap.prototype.createButtonText = function () {

    this.cancelText = new Sprite_Kami_Button(0, "cancelDuelMenu1", 70, 100);
    this.addChild(this.cancelText)
    this.cancelText.y = 0
    this.cancelText.x = -820
    this.cancelText.opacity = 170

    this.cancelTextLight = new Sprite_Kami_ButtonLight(0, "cancelDuelMenu1", 70, 0x02FF61, 100);
    this.addChild(this.cancelTextLight)
    this.cancelTextLight.x = 0
    this.cancelTextLight.y = 0
    this.cancelTextLight.opacity = 0

    this.duelText = new Sprite_Kami_Button(0, "selectDuelMenu2", 70, 100);
    this.addChild(this.duelText)
    this.duelText.y = 840
    this.duelText.x = -820
    this.duelText.opacity = 170

    this.duelTextLight = new Sprite_Kami_ButtonLight(0, "selectDuelMenu2", 70, 0x02FF61, 100);
    this.addChild(this.duelTextLight)
    this.duelTextLight.x = 0
    this.duelTextLight.y = 840
    this.duelTextLight.opacity = 0
}
Scene_CampaignMap.prototype.createBackFrames = function () {
    this._transitionPics = new Array();
    for (let n = 0; n < 3; n++) {
        this._transitionPics[n] = new Sprite();
        this._transitionPics[n].bitmap = ImageManager.loadCampaign(`transition${1}`)
        this.addChild(this._transitionPics[n])
        this._transitionPics[n].x = Graphics.width - 1133 + n * 150 + 1275
    }
    this._transitionDescription = new Sprite();
    this._transitionDescription.bitmap = ImageManager.loadCampaign(`transition2`)
    this.addChild(this._transitionDescription)
    this._transitionDescription.x = -861
    this._transitionDescription.y = 300
}
Scene_CampaignMap.prototype.createGodTexts = function () {
    let text = "";//IAVRA.I18N.localize("#{DuelVocab.LGodsDescription.giveup}")
    this._godName = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 76, fill: 0xFFFFFF });
    this.addChild(this._godName)
    this._godName.anchor.x = 0.5
    this._godName.x = 300
    this._godName.y = 320
    this._godName.alpha = 0.9

    text = ""
    this._godDescription = new PIXI.Text(text, {
        fontFamily: 'Chau Philomene One', fontSize: 32, fill: 0xFFFFFF,
        lineHeight: 40,
        wordWrap: true,
        wordWrapWidth: 700
    });
    this.addChild(this._godDescription)
    this._godDescription.anchor.x = 0
    this._godDescription.x = 50
    this._godDescription.y = 400
    this._godDescription.alpha = 0.9
}


Scene_CampaignMap.prototype.createGodImage = function () {
    this.createContainer();
    this.deityImage = new Sprite();
    this.container.addChild(this.deityImage)
    this.deityImage.x = Graphics.width / 4
    this.tl.play()
}

//-----------------------------------------------------------------------------
// Function : createContainer
//-----------------------------------------------------------------------------
Scene_CampaignMap.prototype.createContainer = function () {
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


//-----------------------------------------------------------------------------
// Function : updates - updates process
//-----------------------------------------------------------------------------
Scene_CampaignMap.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    this.countFrames++;

    switch (this.phase) {
        case 2:
            this.updateButtons();
            this.updateButtonsHover();
            break;
        case 3:
            this.updateChallengerEntering();
            break;
        case 4:
            this.updateChallengerButtons()
            break
        case 5:
            this.updateChallengerReturn()
            break
        case 6:
            this.updateScene();
            break;
        case 7:
            this.updateChallengerAccept()
            break
    }

};
//-----------------------------------------------------------------------------
// Function : updateScene
//-----------------------------------------------------------------------------
Scene_CampaignMap.prototype.updateScene = function () {
    switch (this.btnChoice) {
        case 0:
            SceneManager.goto(Scene_Main_Menu)
            break;
        case 1:
            SceneManager.push(Scene_Kamigami_Deck_Select)
            break;
        case 2:
            SceneManager.push(Scene_Ignis_Shop)
            break;
    }
}
//-----------------------------------------------------------------------------
// Function : updateButtonsHover
//-----------------------------------------------------------------------------
Scene_CampaignMap.prototype.updateButtonsHover = function () {
    if (this._mainMap.isMapZoomed()) return;
    let choice = -1;
    for (let i = 0; i < 3; i++) {
        if (this._backOptionsText[i].isBeingTouched()) {
            this._backOptionsLight[i].opacity += 20;
            if (this._backOptionsLight[i].opacity == 20) {
                AudioManager.playSe({ name: "menu_select", pan: 0, pitch: 100, volume: 100 });
            }
            choice = i;
        } else {
            this._backOptionsLight[i].opacity -= 20;
        }
    }
    if (TouchInput.isTriggered() && choice != -1) {
        this.btnChoice = choice;
        this.phase = 6;
    }
}

Scene_CampaignMap.prototype.updateButtons = function () {
    if (TouchInput.isTriggered()) {
        if (this._mainMap.isMapZoomed()) {
            this.checkButtonTrigger();

        } else {
            if (TouchInput.x > 1728) {
                return
            }
            this._mainMap.zoomMap(true, TouchInput.x, TouchInput.y)
            this._mouseSprite.swapButtons(1)
        }

    }
    if (TouchInput.isRightPressed()) {
        this._mainMap.zoomMap(false)
        this._mouseSprite.swapButtons(0)
    }
}

Scene_CampaignMap.prototype.checkButtonTrigger = function () {
    let name = this._mainMap.checkButtonTrigger();
    if (name != "") {
        this.phase = 3
        this.godName = name;
        this.godDescriptionText = IAVRA.I18N.localize(`#{DuelVocab.LGodsDescription.${name}}`);
        this.countFrames = -1;
        this.deityImage.bitmap = ImageManager.loadFace(this.godName)
        this.container.filters[1].enabled = false

    }

}


Scene_CampaignMap.prototype.updateChallengerEntering = function () {
    if (this._fade.opacity < 180) {
        this._fade.opacity += 3
    }
    if (this.countFrames < 40) {
        this._cancelButtonBack.x += (40 - this.countFrames)
        this._duelButtonBack.x += (40 - this.countFrames)
        this.duelText.x = this.cancelText.x = this._cancelButtonBack.x
    }

    for (let n = 0; n < 3; n++) {
        let m = n + 1
        if (this.countFrames < 80 && this.countFrames >= m * 10 && (50 - (this.countFrames - (m * 10))) > 0) {
            this._transitionPics[n].x -= (50 - (this.countFrames - (m * 10)))
        }
    }
    if (this.countFrames > 38 && this.countFrames <= 80) {
        this._transitionDescription.x += (80 - this.countFrames)
    }

    if (this.countFrames > 50) {
        this.updateDescriptionTexts(this.countFrames - 50);
    }
    this.tl.reverse()
    if (this.countFrames == 110) {
        this.phase = 4
    }

}
Scene_CampaignMap.prototype.updateDescriptionTexts = function (position) {
    this._godName.text = this.godName.substring(0, position)
    if (position > 5) {
        this._godDescription.text = this.godDescriptionText.substring(0, (position) * 5)
    }

}


Scene_CampaignMap.prototype.updateChallengerButtons = function () {
    if (TouchInput.isRightPressed()) {
        this.phase = 5;
        this.countFrames = -1;
    }
    if (this.cancelTextLight.isBeingTouched()) {
        this.cancelTextLight.opacity += 20
        if (TouchInput.isTriggered()) {
            this.phase = 5;
            this.countFrames = -1;
        }
    } else {
        this.cancelTextLight.opacity -= 20
    }
    if (this.duelTextLight.isBeingTouched()) {
        if (TouchInput.isTriggered()) {
            this.phase = 7;
            this.countFrames = -1;
        }
        this.duelTextLight.opacity += 20
    } else {
        this.duelTextLight.opacity -= 20
    }
}


Scene_CampaignMap.prototype.updateChallengerReturn = function () {
    this.updateExitImages();
    this.tl.play()
    if (this.countFrames == 80) {
        this.phase = 2
    }

}

Scene_CampaignMap.prototype.updateChallengerAccept = function () {
    this.updateExitImages();
    this.tl.play()
    if (this.countFrames == 80) {
        loadDeck(this.godName)
    }

}
Scene_CampaignMap.prototype.updateExitImages = function () {
    let position = Math.max(0, (30 - this.countFrames))
    this._godName.text = this.godName.substring(0, position)
    this._godDescription.text = this.godDescriptionText.substring(0, (position) * 5)
    this.cancelTextLight.opacity -= 20
    this.duelTextLight.opacity -= 20
    this._transitionDescription.x -= this.countFrames
    if (this._transitionDescription.x < -861) 
        this._transitionDescription.x = -861
    if (this._fade.opacity > 0) {
        this._fade.opacity -= 3
    }
    if (this.countFrames <= 60 && this.countFrames >= 20) {
        let count = 60 - this.countFrames
        this._cancelButtonBack.x -= (40 - count)
        this._duelButtonBack.x -= (40 - count)
        this.duelText.x = this.cancelText.x = this._cancelButtonBack.x
    }

    for (let n = 0; n < 3; n++) {
        let m = 2 - n
        if (this.countFrames < 80 && this.countFrames >= m * 10 && (50 - (this.countFrames - (m * 10))) > 0) {
            this._transitionPics[n].x += (50 - (this.countFrames - (m * 10)))
        }
    }
}
//-----------------------------------------------------------------------------
// SpriteCampaign
//
// The sprite for displaying the main campaign Sprite.

function SpriteCampaign() {
    this.initialize.apply(this, arguments);
}

SpriteCampaign.prototype = Object.create(Sprite.prototype);
SpriteCampaign.prototype.constructor = SpriteCampaign;



//-----------------------------------------------------------------------------
// Function : SpriteCardButton
//-----------------------------------------------------------------------------
SpriteCampaign.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this.createVariables();
    this.createBackMap();
    this.createDeityButtons();
    this.createPathSprite();
};
SpriteCampaign.prototype.createVariables = function () {
    this.isZoomed = false;
    this.isZooming = false;
    this._finalXPosition = 0;
    this._finalYPosition = 0;
    this.civilization = 1;
}
SpriteCampaign.prototype.createPathSprite = function () {
    this._pathSprites = new Array()
    let x1, x2, y1, y2
    for (let n = 0; n < this.deityButtons.length; n++) {
        let req = this.deityButtons[n].getRequirements()
        if (req == "first") {
            continue
        }
        x1 = parseInt(this.deityButtons[n].x) + 23
        y1 = parseInt(this.deityButtons[n].y) + 23
        console.log(x1, y1)
        for (let m = 0; m < this.deityButtons.length; m++) {
            let name = this.deityButtons[m].getName()
            if (name == req) {
                x2 = parseInt(this.deityButtons[m].x) + 23
                y2 = parseInt(this.deityButtons[m].y) + 23
                this.createNewPath(x1, x2, y1, y2)
                break
            }
        }
    }
}
SpriteCampaign.prototype.createNewPath = function (x1, x2, y1, y2) {
    let hyp = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
    let tan = Math.atan2(y1 - y2, x1 - x2)
    let newPath = new SpriteCampaignPath(hyp, x2, y2, tan)
    this._pathSprites.push(newPath)
    this.addChild(this._pathSprites[this._pathSprites.length - 1])
}
SpriteCampaign.prototype.createDeityButtons = function () {
    let deityInfos = JSON.parse(PluginManager.parameters('KamigamiDeck')['Enemy Creation']);
    this.deityButtons = new Array();
    for (let n = 0; n < deityInfos.length; n++) {
        let civilization = this.getCivilizationByGodCard(JSON.parse(deityInfos[n])["God Card"])
        if (civilization != this.civilization) {
            continue;
        }
        let lockType = 1
        let x = JSON.parse(deityInfos[n])["X Position"]
        let y = JSON.parse(deityInfos[n])["Y Position"]
        let name = JSON.parse(deityInfos[n])["Name"]
        console.log(deityInfos[n]);
        let pathArray = JSON.parse(JSON.parse(deityInfos[n])["Requirement"])[0]
        if ($dataKamigami.duelInfo[n].wins > 0) {
            lockType = 3;
        } else if ($dataKamigami.duelInfo[n].enabled || this.checkPath(pathArray)) {
            lockType = 2;
        }
        this.deityButtons.push(new SpriteCampaignButton(this.civilization, lockType, name, x, y, pathArray))
        this.addChild(this.deityButtons[this.deityButtons.length - 1])
    }

}
SpriteCampaign.prototype.checkPath = function (pathArray) {
    for (let i = 0; i < $dataKamigami.duelInfo.length; i++) {
        if ($dataKamigami.duelInfo[i].name == pathArray && $dataKamigami.duelInfo[i].wins > 0) {
            return true;
        }
    }
    return false;
}


SpriteCampaign.prototype.checkButtonTrigger = function () {

    for (let n = 0; n < this.deityButtons.length; n++) {
        if (this.deityButtons[n].isBeingTouched() && this.deityButtons[n].lockType >= 2) {
            return this.deityButtons[n].getName();
        }
    }
    return "";
}


SpriteCampaign.prototype.getCivilizationByGodCard = function (godCard) {
    godCard = godCard % 150
    let greekCards = [0, 1, 2]
    let egyptCards = [30, 31, 32]
    let norseCards = [58, 59, 60, 61]
    let japanCards = [88, 89, 90]
    let brazilCards = [120, 121, 122, 123]
    if (greekCards.includes(godCard)) {
        return 0
    }
    if (egyptCards.includes(godCard)) {
        return 1
    }
    if (norseCards.includes(godCard)) {
        return 2
    }
}

SpriteCampaign.prototype.createBackMap = function () {
    this._bg = new Sprite()
    //this._bg.bitmap = ImageManager.loadCampaign("GreekCampaign")
    //this._bg.bitmap = ImageManager.loadCampaign("EgyptCampaign")
    //this._bg.bitmap = ImageManager.loadCampaign("NorseCampaign")
    this._bg.bitmap = ImageManager.loadCampaign("JapanCampaign")
    this.anchor.x = this.anchor.y = 0.5
    this.scale.x = this.scale.y = 0.45
    this.addChild(this._bg)
}
SpriteCampaign.prototype.zoomMap = function (zoom, x, y) {
    this.isZooming = zoom;
    if (this.isZooming && !this.isZoomed) {
        x = Math.min(1536, x)
        this._finalXPosition = x;
        this._finalYPosition = y;
    } else {
    }
}
SpriteCampaign.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if (this.isZoomingMovement()) {
        return;
    }
};

SpriteCampaign.prototype.isZoomingMovement = function () {
    if (this.isZooming) {
        return this.izZoomingIn();
    } else {
        return this.izZoomingOut();
    }
}


SpriteCampaign.prototype.izZoomingIn = function () {
    if (this.scale.x < 1) {
        this.scale.x += 0.05
        this.scale.y += 0.05
        this.x = - (this._finalXPosition * (this.scale.x - 0.45) / 0.45)
        this.y = - (this._finalYPosition * (this.scale.x - 0.45) / 0.45)
        if (this.scale.x >= 1) {
            //this.x = - this._finalXPosition
            //this.y = - this._finalYPosition
            this.scale.x = 1
            this.scale.y = 1
            this.isZoomed = true
        }
        return true;
    }
    return false;
}

SpriteCampaign.prototype.isMapZoomed = function () {
    return this.isZoomed
}
SpriteCampaign.prototype.izZoomingOut = function () {
    if (this.scale.x > 0.45) {
        this.scale.x -= 0.05
        this.scale.y -= 0.05
        this.x = - (this._finalXPosition * (this.scale.x - 0.45) / 0.45)
        this.y = - (this._finalYPosition * (this.scale.x - 0.45) / 0.45)
        if (this.scale.x < 0.45) {
            this.x = 0
            this.y = 0
            this.scale.x = 0.45
            this.scale.y = 0.45
            this.isZoomed = false
        }
        return true;
    }
    return false;
}

//-----------------------------------------------------------------------------
// SpriteCampaignButton
//
// The sprite for displaying the main campaign Sprite.

function SpriteCampaignButton(civilizationType, lockType, name, x, y, requirements) {
    this.initialize.apply(this, arguments);
}

SpriteCampaignButton.prototype = Object.create(Sprite_Clickable.prototype);
SpriteCampaignButton.prototype.constructor = SpriteCampaignButton;



//-----------------------------------------------------------------------------
// Function : initialize
//-----------------------------------------------------------------------------
SpriteCampaignButton.prototype.initialize = function (civilizationType, lockType, name, x, y, requirements) {
    Sprite_Clickable.prototype.initialize.call(this);
    this.opacity = 150
    this.x = x;
    this.y = y;
    this.requirements = requirements
    this.lockType = lockType
    //this.anchor.x = this.anchor.y = 0.5
    this.createSprites(civilizationType, lockType)
    this.bitmap = new Bitmap(62, 62)
    this.name = name
    //this.createVariables();
};
SpriteCampaignButton.prototype.getName = function () {
    return this.name
}
SpriteCampaignButton.prototype.getRequirements = function () {
    return this.requirements
}
//-----------------------------------------------------------------------------
// Function : createSprites
//-----------------------------------------------------------------------------
SpriteCampaignButton.prototype.createSprites = function (civilizationType, lockType) {
    this._base = new Sprite();
    this._base.bitmap = ImageManager.loadCampaign("deityButton_" + lockType)
    this.addChild(this._base)

    this._civilization = new Sprite();
    switch (civilizationType) {
        case 0:
            this._civilization.bitmap = ImageManager.loadDeckBuild("Greek")
            break;
        case 1:
            this._civilization.bitmap = ImageManager.loadDeckBuild("Egypt")
            break;
        case 2:
            this._civilization.bitmap = ImageManager.loadDeckBuild("Norse")
            break;
        case 3:
            this._civilization.bitmap = ImageManager.loadDeckBuild("Japan")
            break;
        case 4:
            this._civilization.bitmap = ImageManager.loadDeckBuild("Brazil")
            break;
    }
    this._civilization.x = 11
    this._civilization.y = 11
    this.addChild(this._civilization)

};


//-----------------------------------------------------------------------------
// Function : update
//-----------------------------------------------------------------------------
SpriteCampaignButton.prototype.update = function () {
    Sprite_Clickable.prototype.update.call(this);
    if (this.isBeingTouched()) {
        this.opacity += 10
    } else {
        if (this.opacity > 150)
            this.opacity -= 10
    }
};

//-----------------------------------------------------------------------------
// SpriteCampaignPath
//
// The sprite for displaying the main campaign Sprite.

function SpriteMouseCampaign(length, x, y, rotation) {
    this.initialize.apply(this, arguments);
}

SpriteMouseCampaign.prototype = Object.create(Sprite.prototype);
SpriteMouseCampaign.prototype.constructor = SpriteMouseCampaign;



//-----------------------------------------------------------------------------
// Function : initialize
//-----------------------------------------------------------------------------
SpriteMouseCampaign.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this.leftClick = true
    this.direction = true
    this.createBackSprite()
    this.createButtonsSprite()
    this.createText()
}
//-----------------------------------------------------------------------------
// Function : createBackSprite
//-----------------------------------------------------------------------------
SpriteMouseCampaign.prototype.createBackSprite = function () {
    this._backSprite = new Sprite()
    this._backSprite.bitmap = ImageManager.loadCampaign("mouse")
    this.addChild(this._backSprite)
}

//-----------------------------------------------------------------------------
// Function : createButtonsSprite
//-----------------------------------------------------------------------------
SpriteMouseCampaign.prototype.createButtonsSprite = function () {
    this._leftButton = new Sprite()
    this._leftButton.bitmap = ImageManager.loadCampaign("leftClick")
    this.addChild(this._leftButton)
    this._leftButton.opacity = 0
    this._rightButton = new Sprite()
    this._rightButton.bitmap = ImageManager.loadCampaign("rightClick")
    this.addChild(this._rightButton)
    this._rightButton.opacity = 0

}
//-----------------------------------------------------------------------------
// Function : createText
//-----------------------------------------------------------------------------
SpriteMouseCampaign.prototype.createText = function () {
    let text = IAVRA.I18N.localize("#{DuelVocab.Campaign.mouseText1}")
    this.mouseText = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 28, fill: 0xFFFFFF, stroke: "#001100", strokeThickness: 2 });
    this.addChild(this.mouseText)
    this.mouseText.x = 60
    this.mouseText.y = 15
}
//-----------------------------------------------------------------------------
// Function : swapButtons
//-----------------------------------------------------------------------------
SpriteMouseCampaign.prototype.swapButtons = function (button) {
    let text
    if (button == 0) {
        text = IAVRA.I18N.localize("#{DuelVocab.Campaign.mouseText1}")
        this.leftClick = true
        this.mouseText.text = text
    } else {
        text = IAVRA.I18N.localize("#{DuelVocab.Campaign.mouseText2}")
        this.leftClick = false
        this.mouseText.text = text
    }
}

//-----------------------------------------------------------------------------
// Function : update
//-----------------------------------------------------------------------------
SpriteMouseCampaign.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if (this.leftClick) {
        if (this.direction) {
            this._leftButton.opacity += 10
            if (this._leftButton.opacity == 255) {
                this.direction = false
            }
        } else {
            this._leftButton.opacity -= 10
            if (this._leftButton.opacity == 0) {
                this.direction = true
            }
        }
        this._rightButton.opacity -= 10
    } else {
        if (this.direction) {
            this._rightButton.opacity += 10
            if (this._rightButton.opacity == 255) {
                this.direction = false
            }
        } else {
            this._rightButton.opacity -= 10
            if (this._rightButton.opacity == 0) {
                this.direction = true
            }
        }
        this._leftButton.opacity -= 10
    }
}


//-----------------------------------------------------------------------------
// SpriteCampaignPath
//
// The sprite for displaying the main campaign Sprite.

function SpriteCampaignPath(length, x, y, rotation) {
    this.initialize.apply(this, arguments);
}

SpriteCampaignPath.prototype = Object.create(Sprite.prototype);
SpriteCampaignPath.prototype.constructor = SpriteCampaignPath;



//-----------------------------------------------------------------------------
// Function : initialize
//-----------------------------------------------------------------------------
SpriteCampaignPath.prototype.initialize = function (length, x, y, rotation) {
    Sprite.prototype.initialize.call(this);
    this.pathLength = Math.ceil(length / 100)
    this.totalLength = length
    this.x = x
    this.y = y
    this.rotation = rotation
    this.createMask(x, y)
    this.createBasePath()
    this.anchor.y = 0.5
}

//-----------------------------------------------------------------------------
// Function : createMask
//-----------------------------------------------------------------------------
SpriteCampaignPath.prototype.createMask = function (x, y) {
    this.mask = new PIXI.Graphics();
    this.mask.beginFill();
    this.mask.drawRect(50, 0, this.totalLength - 100, 15);
    this.mask.endFill();
    this.addChild(this.mask)
}


//-----------------------------------------------------------------------------
// Function : createBasePath
//-----------------------------------------------------------------------------
SpriteCampaignPath.prototype.createBasePath = function (length) {
    this.pathSprites = new Array()
    for (let n = 0; n < this.pathLength; n++) {
        this.pathSprites[n] = new Sprite()
        this.pathSprites[n].bitmap = ImageManager.loadCampaign("path")
        this.addChild(this.pathSprites[n])
        this.pathSprites[n].x = n * 100
    }
}

//-----------------------------------------------------------------------------
// Function : update
//-----------------------------------------------------------------------------
SpriteCampaignPath.prototype.update = function () {
    for (let n = 0; n < this.pathLength; n++) {
        this.pathSprites[n].x += 2
        if (this.pathSprites[n].x > this.pathLength * 100)
            this.pathSprites[n].x = 0
    }
}