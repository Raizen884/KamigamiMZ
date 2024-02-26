//=============================================================================
// TripleTriadScene
// Description: Main System Scene
//=============================================================================


function Scene_Kamigami_Booster() {
    this.initialize.apply(this, arguments);
}

Scene_Kamigami_Booster.prototype = Object.create(Scene_Base.prototype);
Scene_Kamigami_Booster.prototype.constructor = Scene_Kamigami_Booster;

Scene_Kamigami_Booster.prototype.createSpritebase = function () {
    this._spriteset = new Spriteset_Base();
    this._spriteset._effectsContainer = this._spriteset._baseSprite;
    this.addChild(this._spriteset);
}

//-----------------------------------------------------------------------------
// Function : initialize - initiates the graphics
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    this.createVariables();
    this.createBoosterBackground();
    this.createCamera();
    this.createFadeScreen();
    this.createSecondCamera();
    this.createTable();
    this.createBoosters();
    this.createBoosterAnimatedPack();
    this.createButtons();
    this.createTableFront();
    this.createHelpText();
    this.createDisplacement();
    this.createSpecialGodCard();
    this.createWhiteFade()
    this.createCenterSprite();
    this.createTip();
    this.createSpritebase();
};
//-----------------------------------------------------------------------------
// Function : createTip
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.createTip = function () {
    this.tipText = new PIXI.Text(new String(), { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0xffffff, align: 'left', dropShadow: true, dropShadowBlur: 4, dropShadowDistance: 2 });
    this.addChild(this.tipText)
    this.tipText.text = IAVRA.I18N.localize("#{DuelVocab.MenuText.tip01}")
    this.tipText.y = 1000
    this.tipText.x = Graphics.width / 2 - this.tipText.width / 2
    this.tipMovement = false
    this.tipText.alpha = 0
}


//-----------------------------------------------------------------------------
// Function : createWhiteFade
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.createWhiteFade = function () {
    this._fadeScreenSprite = new Sprite();
    this._fadeScreenSprite.bitmap = ImageManager.loadAfterDuel("whiteFade");
    this.addChild(this._fadeScreenSprite);
    this._fadeScreenSprite.opacity = 0
}
//-----------------------------------------------------------------------------
// Function : createSpecialGodCard
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.createSpecialGodCard = function () {
    this.specialCardCamera = new PIXI.projection.Camera3d();
    this.specialCardCamera.position.set(Graphics.width / 2, Graphics.height / 2);
    this.specialCardCamera.setPlanes(1400, 180, 10000, false);
    this.addChild(this.specialCardCamera);
    //this.specialCardCamera.euler.x = 0.2


    this.specialGodCard = new SpriteGod()
    this.specialGodCard.configureGod("Back_Card");
    this.specialGodCard.anchor.x = this.specialGodCard.anchor.y = 0.5;
    this.specialCardCamera.addChild(this.specialGodCard)
    this.specialGodCard.convertTo3d()
    this.specialGodCard.opacity = 0


    this.specialGodCardFlash = new Sprite_Card()
    this.specialGodCardFlash.bitmap = ImageManager.loadKamigami("flash_card");
    this.specialGodCardFlash.anchor.x = this.specialGodCardFlash.anchor.y = 0.5;
    this.specialCardCamera.addChild(this.specialGodCardFlash)
    this.specialGodCardFlash.convertTo3d()
    this.specialGodCardFlash.opacity = 0
}


//-----------------------------------------------------------------------------
// Function : createCenterSprite
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.createCenterSprite = function () {
    this._centerSprite = new Sprite_Card();
    this._centerSprite.bitmap = ImageManager.loadTitle1("center_effects");
    this.addChild(this._centerSprite);
    this._centerSprite.x = Graphics.width / 2;
    this._centerSprite.y = Graphics.height / 2;
    this._centerSprite.anchor.x = 0.5;
    this._centerSprite.anchor.y = 0.5;
}
//-----------------------------------------------------------------------------
// Function : create_displacement
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.createDisplacement = function () {

    this._displacement = new Sprite();
    this._displacement.bitmap = ImageManager.loadDisplacement("map7");
    this._displacement.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this._displacement.scale.set(2);
    this._displacement.anchor.set(0.5);
    this.containerBack.addChild(this._displacement);
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this._displacement);
    this.containerBack.filters = [this.displacementFilter];
    this.displacementFilter.scale.x = 0;
    this.displacementFilter.scale.y = 0;
    this.tl = new TimelineMax({ paused: true });
    this.tl.to(this.displacementFilter.scale, 8, { x: 0, y: -10000, ease: Expo.easeInOut });
    this.tl.timeScale(100);
    this.tl.play();
};

//-----------------------------------------------------------------------------
// Function : createHelpText
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.createHelpText = function () {
    let defaultText = ""
    this.helpText = new PIXI.Text(defaultText, { fontFamily: 'Chau Philomene One', fontSize: 38, fill: 0xffffff, align: 'left' });
    this.addChild(this.helpText)
    this.helpText.x = Graphics.width / 2
    this.helpText.y = 50
    this.helpText.anchor.x = 0.5
    this.helpText.alpha = 0;
    this.helpText.opacityOn = true;

};


//-----------------------------------------------------------------------------
// Function : createButtons
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.createButtons = function () {
    this.backReturn = new Sprite()
    this.backReturn.bitmap = ImageManager.loadIgnisShop("backBoosterReturn");
    this.addChild(this.backReturn)
    this.backReturn.x = -590
    this.backReturn.opacity = 0;

    this.returnButton = new Sprite_Kami_Button(0, "boostermenu1", 70);
    this.addChild(this.returnButton)
    this.returnButton.y = -20;
    this.returnButton.opacity = 165
    this.returnButton.x = -590

    this.returnButtonLight = new Sprite_Kami_ButtonLight(0, "boostermenu1", 70, 0x00FF50);
    this.addChild(this.returnButtonLight)
    this.returnButtonLight.y = -20;
    this.returnButtonLight.opacity = 0

    this.backShop = new Sprite()
    this.backShop.bitmap = ImageManager.loadIgnisShop("backShop");
    this.addChild(this.backShop)
    this.backShop.x = Graphics.width - 639 + 590;
    this.backShop.opacity = 0;

    this.returnShop = new Sprite_Kami_Button(1, "boostermenu2", -70);
    this.addChild(this.returnShop)
    this.returnShop.x = Graphics.width - 500 + 590;
    this.returnShop.y = -20;
    this.returnShop.opacity = 165

    this.returnShopLight = new Sprite_Kami_ButtonLight(1, "boostermenu2", -70, 0x00FF50);
    this.addChild(this.returnShopLight)
    this.returnShopLight.x = Graphics.width - 500 - 20;
    this.returnShopLight.y = -20;
    this.returnShopLight.opacity = 0;
};



//-----------------------------------------------------------------------------
// Function : createFadeScreen
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.createFadeScreen = function () {
    this.fadeScreen = new Sprite();
    this.fadeScreen.bitmap = ImageManager.loadKamigami("shop_fade");
    this.addChild(this.fadeScreen);
    this.fadeScreen.opacity = 0;
};
//-----------------------------------------------------------------------------
// Function : getTotalBoosterPacks
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.getTotalBoosterPacks = function () {
    let count = 0;
    for (let n = 0; n < 4; n++) {
        count += $dataKamigami.owned_booster_packs[n]
    }
    return count
};

//-----------------------------------------------------------------------------
// Function : createBoosters
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.createBoosters = function () {
    let num = this.getTotalBoosterPacks();
    this.boosterPacksBack = new Array(num)
    this.boosterPacks = new Array(num)
    let n = 0;
    let count = 0;

    for (let m = 0; m < 4; m++) {
        for (let boosterOwned = 0; boosterOwned < $dataKamigami.owned_booster_packs[m]; boosterOwned++) {
            this.boosterPacksBack[n] = new Sprite_Card();
            this.boosterPacksBack[n].bitmap = ImageManager.loadIgnisShop("card_packShadow");
            this.cameraBoard.addChild(this.boosterPacksBack[n])
            this.boosterPacksBack[n].convertTo3d();
            this.boosterPacksBack[n].anchor.x = this.boosterPacksBack[n].anchor.y = 0.5;

            this.boosterPacksBack[n].scale.y = 0.8;
            this.boosterPacksBack[n].scale.x = 0.8;
            this.boosterPacksBack[n].y = 300;

            this.boosterPacks[n] = new Sprite_Booster(m);
            //this.boosterPacks[n].bitmap = ImageManager.loadIgnisShop("card_pack2");
            this.cameraBoard.addChild(this.boosterPacks[n])
            this.boosterPacks[n].convertTo3d();
            this.boosterPacks[n].finalX = -Graphics.width / 2 + 100 + Math.randomInt(1600)
            this.boosterPacks[n].finalY = -300 - Math.randomInt(700)
            this.boosterPacks[n].finalRotation = Math.PI / 2 - Math.random() * Math.PI
            this.boosterPacks[n].y = 300;
            this.boosterPacks[n].scale3d.y = 0.8;
            this.boosterPacks[n].scale3d.x = 0.8;
            this.boosterPacks[n].anchor.x = this.boosterPacks[n].anchor.y = 0.5;
            this.boosterPacks[n].opacity = 0

            n++
        }
    };


    for (let n = 0; n < this.boosterPacks.length; n++) {

    };
};

//-----------------------------------------------------------------------------
// Function : createBoosterAnimatedPack
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.createBoosterAnimatedPack = function () {
    this.boosterAnimatedPack = new Sprite_Booster_Animated();
    this.cameraBooster.addChild(this.boosterAnimatedPack)
    this.boosterAnimatedPack.y = -200
    this.boosterAnimatedPack.convertTo3d()
    this.boosterAnimatedPack.x = -400;
    this.boosterAnimatedPack.scale3d.x = 0.4;
    this.boosterAnimatedPack.scale3d.y = 0.4;
    this.boosterAnimatedPack.scale3d.z = 0.4;
    this.boosterAnimatedPack.opacity = 0;
    this.boosterAnimatedPack.rotation = Math.PI / 2

};
//-----------------------------------------------------------------------------
// Function : getPackType
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.getPackType = function () {
};


//-----------------------------------------------------------------------------
// Function : createVariables
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.createVariables = function () {
    this.phase = 0;
    this.countFrame = 0;
    if (!$dataKamigami.luckyPack) {
        $dataKamigami.luckyPack = 0
    }
};

//-----------------------------------------------------------------------------
// Function : createVariables
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.createBoosterBackground = function () {
    this.containerBack = new PIXI.Container();
    this.addChild(this.containerBack);
    this.background = new Sprite();
    this.background.bitmap = ImageManager.loadIgnisShop("boosterBackground");
    this.containerBack.addChild(this.background);
    this.background.opacity = 0;
};

//-----------------------------------------------------------------------------
// Function : createCamera
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.createCamera = function () {
    this.cameraBoard = new PIXI.projection.Camera3d();
    this.cameraBoard.position.set(Graphics.width / 2, Graphics.height - 135);
    this.cameraBoard.setPlanes(1400, 180, 10000, false);
    //this.specialCardCamera.euler.x = Math.PI / 5.5;
    this.addChild(this.cameraBoard);
    this.cameraBoard.euler.x = 1.2
};

//-----------------------------------------------------------------------------
// Function : createTable
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.createTable = function () {
    this.table = new Sprite();
    this.table.bitmap = ImageManager.loadIgnisShop("boosterTable");
    this.cameraBoard.addChild(this.table)
    this.table.anchor.x = 0.5;
    this.table.anchor.y = 1;
    this.table.convertTo3d();
    this.table.opacity = 0;
};

//-----------------------------------------------------------------------------
// Function : createSecondCamera
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.createSecondCamera = function () {
    this.cameraBooster = new PIXI.projection.Camera3d();
    this.cameraBooster.position.set(Graphics.width / 2, Graphics.height);
    this.cameraBooster.setPlanes(1400, 180, 10000, false);
    this.addChild(this.cameraBooster);
    this.cameraBooster.euler.x = 0.2
};

//-----------------------------------------------------------------------------
// Function : createTableFront
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.createTableFront = function () {
    this.tableFront = new Sprite();
    this.tableFront.bitmap = ImageManager.loadIgnisShop("store_bg2");
    this.addChild(this.tableFront);
    this.tableFront.y = Graphics.height - 135;
    this.tableFront.opacity = 0;
};


//////////////////////////// MAIN UPDATE //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : update - updates deck building scene
//-----------------------------------------------------------------------------

Scene_Kamigami_Booster.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    if (this.phase > 0)
        this.updateTipMovement();
    this.updateButtonsHover();
    this.updateHelpText();
    this.specialGodCard.update();
    this.specialGodCard.changeEuler(this.specialCardCamera.x, this.specialCardCamera.y);
    for (let fastSkip = 0; fastSkip < 4; fastSkip++) {
        this.boosterAnimatedPack.update();
        switch (this.phase) {
            case 0:
                this.updateTablePosition();
                break;
            case 1:
                this.animatedBoostersOnTable();
                this.placeButtons();
                break;
            case 2:
                if (TouchInput.isTriggered())
                    this.updateButtonsClick();
                this.chooseBooster();
                break;
            case 3:
                this.bringBoosterUp();
                break;
            case 4:
                this.updateBoosterOpening();
                break;
            case 5:
                this.closeScene();
                break;
            default:
                break;
        }
        if (!TouchInput.isLongPressed() || this.boosterAnimatedPack.boosterGodS != -1) {
            break;
        }
    }

};

//-----------------------------------------------------------------------------
// Function : updateTipMovement
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.updateTipMovement = function () {
    if (this.tipMovement) {
        this.tipText.alpha -= 0.01
        if (this.tipText.alpha < 0.4) {
            this.tipMovement = false
        }
    } else {
        this.tipText.alpha += 0.01
        if (this.tipText.alpha > 0.8) {
            this.tipMovement = true
        }
    }
}


//-----------------------------------------------------------------------------
// Function : updateHelpText
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.updateHelpText = function () {
    if (this.helpText.opacityOn) {
        this.helpText.alpha += 0.01
        if (this.helpText.alpha > 0.7) {
            this.helpText.opacityOn = false;
        }
    } else {
        this.helpText.alpha -= 0.01
        if (this.helpText.alpha < 0.2) {
            this.helpText.opacityOn = true;
        }
    }
};

//-----------------------------------------------------------------------------
// Function : closeScene
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.closeScene = function () {
    this.countFrame++
    if (this.countFrame < 120) {
        if (this.nextScene == 0) {
            this.returnButtonLight.opacity = this.countFrame % 10 > 4 ? 255 : 0
        } else {
            this.returnShopLight.opacity = this.countFrame % 10 > 4 ? 255 : 0
        }
        return
    }
    if (this.countFrame == 120) {
        this.tl.timeScale(4);
        this.tl.play();
    }
    if (this.countFrame < 180) {
        this.tableFront.opacity -= 20;
        return
    }
    if (this.nextScene == 0) {
        SceneManager.goto(Scene_Main_Menu);
    } else {
        SceneManager.goto(Scene_Ignis_Shop);
    }
};

//-----------------------------------------------------------------------------
// Function : updateButtons
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.updateButtonsHover = function () {
    if (this.returnButton.isBeingTouched() && this.phase == 2) {
        this.returnButtonLight.opacity += 20;
        if (this.returnButtonLight.opacity == 20) {
            AudioManager.playSe({ name: "menu_select", pan: 0, pitch: 100, volume: 100 });
        }
    } else {
        this.returnButtonLight.opacity -= 20;
    }

    if (this.returnShop.isBeingTouched() && this.phase == 2) {
        this.returnShopLight.opacity += 20;
        if (this.returnShopLight.opacity == 20) {
            AudioManager.playSe({ name: "menu_select", pan: 0, pitch: 100, volume: 100 });
        }
    } else {
        this.returnShopLight.opacity -= 20;
    }
}


//-----------------------------------------------------------------------------
// Function : updateButtons
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.updateButtonsClick = function () {
    if (this.returnButton.isBeingTouched()) {
        AudioManager.playSe({ name: "success", pan: 0, pitch: 95, volume: 100 });
        this.nextScene = 0
        this.countFrame = 0
        this.phase = 5
    }

    if (this.returnShop.isBeingTouched()) {
        AudioManager.playSe({ name: "success", pan: 0, pitch: 95, volume: 100 });
        this.nextScene = 1
        this.countFrame = 0
        this.phase = 5
    }
}


//-----------------------------------------------------------------------------
// Function : placeButtons
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.placeButtons = function () {
    if (this.countFrame < 60) {
        this.backReturn.x += (60 - this.countFrame) / 3
        this.backReturn.opacity += 10;
        this.returnButton.x += (60 - this.countFrame) / 3
        return;
    }
    if (this.countFrame < 120) {
        this.backShop.x -= (120 - this.countFrame) / 3
        this.backShop.opacity += 10;
        this.returnShop.x -= (120 - this.countFrame) / 3
        return;
    }

    if (this.boosterPacks.length > 0 && this.boosterPacks[this.boosterPacks.length - 1].scale3d.x <= 0.4) {
        this.phase = 2;
        this.helpText.text = IAVRA.I18N.localize("#{DuelVocab.MenuText.booster1}")
        this.helpText.alpha = 0;
        this.countFrame = 0;
    }
    if (this.boosterPacks.length == 0) {
        this.phase = 2;
        this.helpText.text = IAVRA.I18N.localize("#{DuelVocab.MenuText.booster2}")
        this.helpText.alpha = 0;
        this.countFrame = 0;
    }
};


//-----------------------------------------------------------------------------
// Function : chooseBooster
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.chooseBooster = function () {
    let maxValue = -1
    if (TouchInput.isPressed())
        for (let n = 0; n < this.boosterPacks.length; n++) {
            if (this.boosterPacks[n].is3dMiniButtonTouched()) {
                maxValue = n;
            }
        }
    if (maxValue > -1) {
        this.setBoosterOpening(maxValue);
    }
};
//-----------------------------------------------------------------------------
// Function : setBoosterOpening
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.setBoosterOpening = function (n) {
    this.phase = 3
    this.helpText.text = ""
    this.chosenBooster = n
    this.boosterAnimatedPack.x = this.boosterPacks[n].x
    this.boosterAnimatedPack.y = this.boosterPacks[n].y
    this.boosterAnimatedPack.euler.x = this.boosterPacks[n].euler.x
    this.boosterAnimatedPack.scale3d.x = this.boosterPacks[n].scale3d.x
    this.boosterAnimatedPack.euler.y = this.boosterPacks[n].euler.y
    this.boosterAnimatedPack.scale3d.y = this.boosterPacks[n].scale3d.y
    this.boosterAnimatedPack.scale3d.z = this.boosterPacks[n].scale3d.z
    this.boosterAnimatedPack.rotation = this.boosterPacks[n].rotation
    this.boosterAnimatedPack.opacity = 255;

    let boosterType = this.boosterPacks[this.chosenBooster].boosterType
    this.boosterAnimatedPack.setRightFront(boosterType)
    this.boosterAnimatedPack.randomizeBooster(boosterType)
    if ($dataKamigami.owned_booster_packs[boosterType] > 0)
        $dataKamigami.owned_booster_packs[boosterType]--
    this.boosterPacks[n].opacity = 0;
    this.countFrame = 0
    DataManager.saveGame(1);
};


//-----------------------------------------------------------------------------
// Function : bringBoosterUp
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.bringBoosterUp = function () {
    this.countFrame++
    this.boosterPacksBack[this.chosenBooster].opacity -= 10;
    this.boosterPacksBack[this.chosenBooster].y = this.boosterAnimatedPack.y + this.countFrame
    this.boosterPacksBack[this.chosenBooster].x = this.boosterAnimatedPack.x
    this.boosterPacksBack[this.chosenBooster].scale3d.x += 0.05;
    this.boosterPacksBack[this.chosenBooster].scale3d.y += 0.05;
    this.boosterPacksBack[this.chosenBooster].rotation = this.boosterAnimatedPack.rotation
    if (this.fadeScreen.opacity < 150)
        this.fadeScreen.opacity += 5
    //if (!this.bringBack && this.countFrame < 60) {
    //return
    //}
    //if (!this.bringBack) {
    //this.countFrame = 0
    //this.bringBack = true
    //return
    //}

    if (this.countFrame == 1) {
        this.maxDistanceY = this.boosterAnimatedPack.y + Graphics.height / 2
        this.maxDistanceX = this.boosterAnimatedPack.x
        this.maxFrames = this.calculateMaxFrames(60)
        this.maxDistanceRotation = this.boosterAnimatedPack.rotation
    }

    if (this.countFrame < 20) {
        this.boosterAnimatedPack.scale3d.x += 0.02
        this.boosterAnimatedPack.scale3d.y += 0.02
        this.boosterAnimatedPack.scale3d.z += 0.02
        this.cameraBooster.euler.x -= 0.02
    }
    this.boosterAnimatedPack.rotation = calculateDistanceMovement(this.boosterAnimatedPack.rotation, this.maxDistanceRotation, 0, this.maxFrames, 60, this.countFrame)
    this.boosterAnimatedPack.x = calculateDistanceMovement(this.boosterAnimatedPack.x, this.maxDistanceX, 0, this.maxFrames, 60, this.countFrame)
    this.boosterAnimatedPack.y = calculateDistanceMovement(this.boosterAnimatedPack.y, this.maxDistanceY, -Graphics.height / 2, this.maxFrames, 60, this.countFrame)

    if (this.countFrame > 60) {
        this.boosterPacksBack[this.chosenBooster].y = 300
        this.boosterPacks[this.chosenBooster].y = 300
        this.boosterAnimatedPack.rotation = 0;
        this.phase = 4;
        let text
        this.helpText.text = IAVRA.I18N.localize("#{DuelVocab.MenuText.booster3}")
        this.helpText.alpha = 0;
    }
};
Scene_Kamigami_Booster.prototype.calculateMaxFrames = function (frames) {
    let count = 0
    for (let n = 0; n < frames; n++) {
        count += n;
    }
    return count
}

//-----------------------------------------------------------------------------
// Function : animatedBoostersOnTable
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.animatedBoostersOnTable = function () {
    this.countFrame++;
    for (let n = 0; n < this.boosterPacks.length; n++) {
        if (n * 10 > this.countFrame) {
            continue;
        }
        if (this.boosterPacks[n].scale3d.x <= 0.4) {
            //this.boosterPacks[n].rotation = 0;
            continue;
        }
        this.boosterPacks[n].x += (this.boosterPacks[n].finalX - this.boosterPacks[n].x) / 20
        this.boosterPacks[n].y += (this.boosterPacks[n].finalY - this.boosterPacks[n].y) / 20
        this.boosterPacks[n].rotation += this.boosterPacks[n].finalRotation / 40
        this.boosterPacks[n].scale3d.x -= 0.01;
        this.boosterPacks[n].scale3d.y -= 0.01;
        this.boosterPacksBack[n].x = this.boosterPacks[n].x
        this.boosterPacksBack[n].y = this.boosterPacks[n].y
        this.boosterPacksBack[n].rotation = this.boosterPacks[n].rotation
        this.boosterPacksBack[n].scale.x = this.boosterPacks[n].scale3d.x + (this.boosterPacks[n].scale3d.x - 0.4)
        this.boosterPacksBack[n].scale.y = this.boosterPacks[n].scale3d.y + (this.boosterPacks[n].scale3d.y - 0.4)
        this.boosterPacksBack[n].y += (this.boosterPacks[n].scale3d.y - 0.4) * 700
        this.boosterPacksBack[n].opacity = 255 - (this.boosterPacks[n].scale3d.y - 0.4) * 1000
        this.boosterPacksBack[n].x -= (this.boosterPacks[n].scale3d.x - 0.4) * 700
        if (this.boosterPacks[n].scale3d.x <= 0.4) {
            AudioManager.playSe({ name: "drop", pan: 0, pitch: 50, volume: 25 });
        };
    }
};


//-----------------------------------------------------------------------------
// Function : updateTablePosition
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.updateTablePosition = function () {
    this.countFrame++;
    if (this.countFrame > 30) {
        this.table.opacity += 5
        this.background.opacity += 5
        this.tableFront.opacity += 5
    }
    if (this.countFrame == 80) {
        AudioManager.playBgm({ name: $dataKamigami.boosterPacksMusic, pan: 0, pitch: 100, volume: 100 });
        for (let n = 0; n < this.boosterPacks.length; n++) {
            this.boosterPacks[n].opacity = 255
        };
    }
    if (this.countFrame == 1) {
        AudioManager.stopBgm();
        this.tl.timeScale(4);
        this.tl.reverse();
    }
    if (this.countFrame < 120) {
        return
    }
    this.cameraBoard.euler.x -= 1 / 60;
    this.cameraBoard.y += 135 / 60;
    this.tableFront.y += 135 / 60;
    this.background.y -= 7;
    this.background.opacity -= 15
    if (this.countFrame == 180) {
        this.phase = 1;
        this.countFrame = 0;
        this.cameraBoard.euler.x = 0.2;
        this.cameraBoard.y = Graphics.height;
    }

};
//-----------------------------------------------------------------------------
// Function : updateBoosterOpening
//-----------------------------------------------------------------------------
Scene_Kamigami_Booster.prototype.updateBoosterOpening = function () {
    if (this.boosterAnimatedPack.openingPhase < 6)
        this.boosterAnimatedPack.updateOpeningPhase()
    else {
        this.fadeScreen.opacity -= 10;
        if (this.fadeScreen.opacity == 0) {
            this.boosterAnimatedPack.opacity = 0;
            this.boosterAnimatedPack.resetAllPositions()
            this.phase = 2;
            this.helpText.text = IAVRA.I18N.localize("#{DuelVocab.MenuText.booster1}")
            this.helpText.alpha = 0;
        }
    }
};




//-----------------------------------------------------------------------------
// Sprite_Booster
//
// The sprite for displaying a card in triple triad.

function Sprite_Booster() {
    this.initialize.apply(this, arguments);
}

Sprite_Booster.prototype = Object.create(Sprite_Card.prototype);
Sprite_Booster.prototype.constructor = Sprite_Booster;


//-----------------------------------------------------------------------------
// Function : initialize
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.initialize = function (boosterType) {
    Sprite_Card.prototype.initialize.call(this);
    this.boosterType = boosterType
    this.createMainContainer();
    this.createVariables();
    this.createBackImage();
    this.createUpperSprite();
    this.createDownSprite();
    this.createLeftSprite();
    this.createRightSprite();
    this.createSymbol();
    this.resetAllPositions();
    this.setRect();
};

//-----------------------------------------------------------------------------
// Function : createMainContainer
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.createMainContainer = function () {
    this.mainContainer = new SContainer();
    this.addChild(this.mainContainer)
    this.mainContainer.convertTo3d();
};



//-----------------------------------------------------------------------------
// Function : resetAllPositions
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.resetAllPositions = function () {
    this.createVariables();
    this.backImage.opacity = 255;
    this.backImage.x = 0;
    this.backImage.y = 0;
    this.upperFront.y = -340
    this.upperFront.x = 0;
    this.upperFront.opacity = 255;
    this.upperFront.euler.x = 0;
    this.upperBack.y = -330
    this.upperBack.x = 0
    this.upperBack.opacity = 0;
    this.downFront.opacity = 255;
    this.downFront.y = 340
    this.downFront.x = 0
    this.downFront.euler.x = 0;
    this.downBack.y = 330
    this.downBack.x = 0
    this.downBack.opacity = 0;
    this.leftFront.x = -242
    this.leftFront.y = 0
    this.leftFront.opacity = 255
    this.leftFront.euler.y = 0;
    this.leftBack.x = -221
    this.leftBack.y = 0
    this.leftBack.opacity = 0;
    this.rightFront.x = 242
    this.rightFront.euler.y = 0;
    this.rightFront.opacity = 255
    this.rightBack.x = 221
    this.rightBack.y = 0
    this.rightBack.opacity = 0;
    this.symbol.opacity = 255
    this.symbolShadow.opacity = 255
    this.symbol.y = 0;
    this.symbol.x = 0;
    this.symbolShadow.y = 25
    this.symbolShadow.x = 0
    this.symbol.scale3d.x = this.symbol.scale3d.y = this.symbol.scale3d.z = this.symbolShadow.scale3d.x = this.symbolShadow.scale3d.y = this.symbolShadow.scale3d.z = 1
    this.symbol.euler.x = this.symbol.euler.y = this.symbolShadow.euler.x = this.symbolShadow.euler.y = 0;
    this.symbol.rotation = this.symbolShadow.rotation = 0;

};


//-----------------------------------------------------------------------------
// Function : createLeftSprite
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.createSymbol = function () {
    this.symbolShadow = new Sprite_Card()
    this.symbolShadow.bitmap = ImageManager.loadIgnisShop("boosterPackSymbolShadow")
    this.mainContainer.addChildZ(this.symbolShadow, 3)
    this.symbolShadow.anchor.y = 0.5
    this.symbolShadow.anchor.x = 0.5
    this.symbolShadow.convertTo3d()
    this.symbol = new Sprite()


    this.symbol.bitmap = ImageManager.loadIgnisShop("boosterPackSymbol")
    this.mainContainer.addChildZ(this.symbol, 4)
    this.symbol.anchor.y = 0.5
    this.symbol.anchor.x = 0.5
    this.symbol.convertTo3d()
};

//-----------------------------------------------------------------------------
// Function : createVariables
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.createVariables = function () {
    this.openingPhase = 0;
    this.openingSpeed = 4;
    this.isOpen = false;
    this.countFrame = 0;
    this.playedSymbolAnimation = 0;
    this.boosterGodS = -1;
};


//-----------------------------------------------------------------------------
// Function : createBackImage
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.createBackImage = function () {
    this.backImage = new Sprite()
    this.backImage.bitmap = ImageManager.loadIgnisShop("boosterPartBack")
    this.mainContainer.addChildZ(this.backImage, 0)
    this.backImage.anchor.x = this.backImage.anchor.y = 0.5
    this.backImage.convertTo3d()
};
//-----------------------------------------------------------------------------
// Function : createLeftSprite
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.createUpperSprite = function () {
    this.upperFront = new Sprite()
    this.upperFront.bitmap = ImageManager.loadIgnisShop("boosterPackUpperFront")
    this.mainContainer.addChildZ(this.upperFront, 2)
    this.upperFront.anchor.y = 0
    this.upperFront.anchor.x = 0.5
    this.upperFront.convertTo3d()


    this.upperBack = new Sprite()
    this.upperBack.bitmap = ImageManager.loadIgnisShop("boosterPartUpperBack")
    this.mainContainer.addChildZ(this.upperBack, 2)
    this.upperBack.anchor.y = 1
    this.upperBack.anchor.x = 0.5
    this.upperBack.convertTo3d()


};
//-----------------------------------------------------------------------------
// Function : createLeftSprite
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.createDownSprite = function () {
    this.downFront = new Sprite()
    this.downFront.bitmap = ImageManager.loadIgnisShop("boosterPackDownFront")
    this.mainContainer.addChildZ(this.downFront, 2)
    this.downFront.anchor.y = 1
    this.downFront.anchor.x = 0.5
    this.downFront.convertTo3d()

    this.downBack = new Sprite()
    this.downBack.bitmap = ImageManager.loadIgnisShop("boosterPackDownBack")
    this.mainContainer.addChildZ(this.downBack, 2)
    this.downBack.anchor.y = 0
    this.downBack.anchor.x = 0.5
    this.downBack.convertTo3d()
};
//-----------------------------------------------------------------------------
// Function : createLeftSprite
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.createLeftSprite = function () {
    this.leftFront = new Sprite()
    this.leftFront.bitmap = ImageManager.loadIgnisShop("boosterPackLeftFront")
    this.mainContainer.addChildZ(this.leftFront, 2)
    this.leftFront.anchor.y = 0.5
    this.leftFront.anchor.x = 0
    this.leftFront.convertTo3d()

    this.leftBack = new Sprite()
    this.leftBack.bitmap = ImageManager.loadIgnisShop("boosterPackLeftBack")
    this.mainContainer.addChildZ(this.leftBack, 2)
    this.leftBack.anchor.y = 0.5
    this.leftBack.anchor.x = 1
    this.leftBack.convertTo3d()

};



//-----------------------------------------------------------------------------
// Function : createRightSprite
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.createRightSprite = function () {
    this.rightFront = new Sprite()
    this.rightFront.bitmap = ImageManager.loadIgnisShop("boosterPackRightFront" + (this.boosterType + 1))
    this.mainContainer.addChildZ(this.rightFront, 2)
    this.rightFront.anchor.y = 0.5
    this.rightFront.anchor.x = 1
    this.rightFront.convertTo3d()

    this.rightBack = new Sprite()
    this.rightBack.bitmap = ImageManager.loadIgnisShop("boosterPackRightBack")
    this.mainContainer.addChildZ(this.rightBack, 2)
    this.rightBack.anchor.y = 0.5
    this.rightBack.anchor.x = 0
    this.rightBack.convertTo3d()
};
//-----------------------------------------------------------------------------
// Function : eulerCorrectX
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.eulerCorrectX = function (sprite) {
    return Math.sin((this.x + sprite.x) / 1400)
};

//-----------------------------------------------------------------------------
// Function : eulerCorrectX
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.eulerCorrectY = function (sprite) {
    return Math.sin((this.y + sprite.y) / 1400)
};
//-----------------------------------------------------------------------------
// Function : setRect
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.setRect = function () {
    this.width = 462 + 2
    this.height = 678 + 2
};



//-----------------------------------------------------------------------------
// Function : updateOpeningPhase
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.updateOpeningPhase = function () {

    switch (this.openingPhase) {
        case 0:
            this.openSymbol();
            break;
        case 1:
            this.updatePack();
            break;
        case 2:
            this.discardPack();
            break
        case 3:
            this.spreadCards();
            break;
        case 4:
            this.putCardsAway();
            break;
        case 5:
            this.showGodSAnimation();
            break;
        default:
            break;
    }
};
//-----------------------------------------------------------------------------
// Function : showGodSAnimation
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.showGodSAnimation = function () {
    this.countFrame++

    for (let n = 0; n < 5; n++) {
        this.boosterCards[n].changeEulerSmooth(Graphics.width / 2, Graphics.height / 2);
    };
    if (this.countFrame == 1) {
        SceneManager._scene._centerSprite.startAnimation($dataAnimations[120], false)

    }
    if (this.countFrame == 5) {
        let card = new KamigamiCard()
        card.loadCardData(this.boosterGodS, 0)
        SceneManager._scene.specialGodCard.configureGod(card.imageBig, this.boosterGodS)
        SceneManager._scene.specialGodCard._buttonCheckNeed = true
    }
    if (this.countFrame < 20) {
        SceneManager._scene._fadeScreenSprite.opacity += 20
        if (this.countFrame == 19) {
            let card = new KamigamiCard()
            card.loadCardData(this.boosterGodS, 0)
            this.boosterCards[2].configureGod(card.imageBig, this.boosterGodS)
        }
    } else if (this.countFrame < 40) {
        SceneManager._scene._fadeScreenSprite.opacity -= 20
        if (this.boosterCards[2].scale.x < 1.3) {
            this.boosterCards[2].scale.x += 0.015
            this.boosterCards[2].scale.y += 0.015
        }

    }

    if (this.countFrame > 40 && this.countFrame <= 50) {
        SceneManager._scene.specialGodCardFlash.opacity += 30
        SceneManager._scene.specialGodCardFlash.euler.x = this.boosterCards[2].euler.x
        SceneManager._scene.specialGodCardFlash.euler.y = this.boosterCards[2].euler.y
    }
    if (this.countFrame > 50 && this.countFrame <= 60) {
        SceneManager._scene.specialGodCardFlash.opacity -= 30
        SceneManager._scene.specialGodCardFlash.euler.x = this.boosterCards[2].euler.x
        SceneManager._scene.specialGodCardFlash.euler.y = this.boosterCards[2].euler.y
    }

    if (this.countFrame == 50) {
        this.boosterCards[2].opacity = 0
        SceneManager._scene.specialGodCard.opacity = 255


    }

    if (this.countFrame > 80 && !this.isSpecialCardClosing && TouchInput.isTriggered()) {
        this.isSpecialCardClosing = true
        //this.countFrame = 0
        //this.openingPhase = 4
    }





    if (this.isSpecialCardClosing) {
        if (this.boosterCards[2].opacity == 0) {
            SceneManager._scene.specialGodCardFlash.opacity += 30
            SceneManager._scene.specialGodCardFlash.euler.x = this.boosterCards[2].euler.x
            SceneManager._scene.specialGodCardFlash.euler.y = this.boosterCards[2].euler.y
            if (SceneManager._scene.specialGodCardFlash.opacity == 255) {
                this.boosterCards[2].opacity = 255
                SceneManager._scene.specialGodCard.opacity = 0
            }
            return
        }
        if (SceneManager._scene.specialGodCardFlash.opacity > 0) {
            SceneManager._scene.specialGodCardFlash.opacity -= 30
            SceneManager._scene.specialGodCardFlash.euler.x = this.boosterCards[2].euler.x
            SceneManager._scene.specialGodCardFlash.euler.y = this.boosterCards[2].euler.y
            return
        }

        if (this.boosterCards[2].scale.x > 1) {
            this.boosterCards[2].scale.x -= 0.015
            this.boosterCards[2].scale.y -= 0.015
            if (this.boosterCards[2].scale.x < 1) {
                this.boosterCards[2].scale.x = 1
                this.boosterCards[2].scale.y = 1
            }
            return
        }
        this.boosterGodS = -1
        this.countFrame = 0
        this.openingPhase = 4

    }
}


//-----------------------------------------------------------------------------
// Function : putCardsAway
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.putCardsAway = function () {
    this.countFrame++;
    if (this.countFrame == 15) {
        AudioManager.playSe({ name: "Card_Deal", pan: 0, pitch: 100, volume: 100 });
    }
    for (let n = 0; n < 5; n++) {
        if (this.countFrame < n * 15 || this.boosterCards[n].y > 1200) {
            continue;
        }

        this.boosterCards[n].x += ((this.countFrame - 15 * n) * (n - 2)) / 3
        this.boosterCards[n].y += this.countFrame - 15 * n
        this.boosterCards[n].euler.y -= 0.01
        this.boosterCards[n].euler.x -= 0.01
    };
    if (this.boosterCards[4].y > 1200) {
        this.openingPhase = 6;
    }
};


//-----------------------------------------------------------------------------
// Function : spreadCards
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.spreadCards = function () {
    this.countFrame++
    if (SceneManager._scene.cameraBooster.euler.x < 0)
        SceneManager._scene.cameraBooster.euler.x += 0.005
    let soundMoments = [60, 90, 120, 150, 180]
    if (soundMoments.includes(this.countFrame)) {
        AudioManager.playSe({ name: "Card_Deal", pan: 0, pitch: 90, volume: 100 });
    }
    if (this.countFrame < 60) {

        for (let n = 0; n < 5; n++) {
            this.boosterCards[n].x += (-Graphics.width / 2 - this.boosterCards[n].x - 50) / 20 - 1
            this.boosterCards[n].euler.y += 0.01
        };
    }
    else if (this.countFrame < 90) {
        this.setCard(4)
    } else if (this.countFrame < 120) {
        this.setCard(3)
    } else if (this.countFrame < 150) {
        this.setCard(2)
    } else if (this.countFrame < 180) {
        this.setCard(1)
    } else if (this.countFrame < 210) {
        this.setCard(0)
    }
    for (let n = 0; n < 5; n++) {
        if (210 - n * 30 > this.countFrame)
            continue
        //this.boosterCards[n].update();
        this.boosterCards[n].changeEulerSmooth(Graphics.width / 2, Graphics.height / 2);
    };



    if (this.countFrame > 210 && TouchInput.isPressed()) {
        if (this.boosterGodS != -1) {
            this.isSpecialCardClosing = false
            this.openingPhase = 5;
        } else {
            this.openingPhase = 4;
        }

        this.countFrame = 0;
    }
}


//-----------------------------------------------------------------------------
// Function : setCard
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.setCard = function (cardNum) {
    let limit = 2460 - cardNum * 490
    if (this.boosterCards[cardNum].euler.y > 0) {
        this.boosterCards[cardNum].euler.y -= 0.02
        this.boosterCards[cardNum].scale.x = this.boosterCards[cardNum].scale.y -= 0.01
        if (this.boosterCards[cardNum].euler.y < 0) {
            this.boosterCards[cardNum].euler.y = 0
        }
    }

    for (let n = 0; n < cardNum; n++) {
        this.boosterCards[n].x += (-Graphics.width / 2 - this.boosterCards[n].x + limit) / 10 - 1
    };
}

//-----------------------------------------------------------------------------
// Function : discardPack
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.discardPack = function () {
    this.moveAllPack(-3, 5, 0, -20)
    if (this.boosterCards[0].scale.x < 1.1) {
        for (let n = 0; n < 5; n++) {
            this.boosterCards[n].scale.x += 0.006
            this.boosterCards[n].scale.y += 0.006
            this.boosterCards[n].euler.y -= 0.01
        };
    }
    else {
        this.openingPhase = 3;
        this.countFrame = 0;
    }

};
//-----------------------------------------------------------------------------
// Function : moveAllPack
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.moveAllPack = function (x, y, scale, opacity) {
    this.leftBack.x += x
    this.leftBack.y += y
    this.rightBack.x += x
    this.rightBack.y += y
    this.upperBack.x += x
    this.upperBack.y += y
    this.downBack.x += x
    this.downBack.y += y
    this.backImage.x += x
    this.backImage.y += y
    this.leftBack.scale.x = this.leftBack.scale.y += scale
    this.rightBack.scale.x = this.rightBack.scale.y += scale
    this.upperBack.scale.x = this.upperBack.scale.y += scale
    this.downBack.scale.x = this.downBack.scale.y += scale
    this.backImage.scale.x = this.backImage.scale.y += scale
    this.leftBack.opacity += opacity;
    this.rightBack.opacity += opacity;
    this.upperBack.opacity += opacity;
    this.downBack.opacity += opacity;
    this.backImage.opacity += opacity;
}
//-----------------------------------------------------------------------------
// Function : openSymbol
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.openSymbol = function () {
    this.countFrame++
    if (this.countFrame == 1) {
        AudioManager.playSe({ name: "System_saint", pan: 0, pitch: 100, volume: 100 });
    }
    this.symbol.rotation += 0.2
    this.symbol.scale3d.x += 0.02
    this.symbol.scale3d.y += 0.02
    this.symbol.scale3d.z += 0.02
    this.symbol.euler.x += 0.03
    this.symbol.euler.y += 0.03
    //this.symbol.opacity -= 5;
    this.symbol.y += this.countFrame
    this.symbol.x += this.countFrame / 2
    this.symbolShadow.y += this.countFrame
    this.symbolShadow.x += this.countFrame / 2

    this.symbolShadow.rotation += 0.2
    //this.symbolShadow.scale3d.x += 0.03
    //this.symbolShadow.scale3d.y += 0.03
    //this.symbolShadow.scale3d.z += 0.03
    this.symbolShadow.euler.x += 0.03
    this.symbolShadow.euler.y += 0.03
    if (this.symbol.y > 900) {
        this.openingPhase = 1;
    }
};


//-----------------------------------------------------------------------------
// Function : updatePack
//-----------------------------------------------------------------------------
Sprite_Booster.prototype.updatePack = function () {
    if (this.rightFront.opacity == 255) {
        this.rightFront.euler.y -= 0.05 * this.openingSpeed
        this.rightFront.x -= 1 * this.openingSpeed
        if (this.rightFront.euler.y < -Math.PI / 2 + this.eulerCorrectX(this.rightFront)) {
            this.rightFront.opacity = 0;
            this.rightBack.opacity = 255;
            this.rightBack.euler.y = Math.PI / 2 + this.eulerCorrectX(this.rightFront);
        }
    } else if (this.rightBack.opacity == 255 && this.rightBack.euler.y > 0) {
        this.rightBack.euler.y -= 0.05 * this.openingSpeed
    } else if (this.leftFront.opacity == 255) {
        this.leftFront.euler.y += 0.05 * this.openingSpeed
        this.leftFront.x += 1 * this.openingSpeed
        if (this.leftFront.euler.y > Math.PI / 2 + this.eulerCorrectX(this.leftFront)) {
            this.leftFront.opacity = 0;
            this.leftBack.opacity = 255;
            this.leftBack.euler.y = -Math.PI / 2 + this.eulerCorrectX(this.leftFront);
        }
    } else if (this.leftBack.opacity == 255 && this.leftBack.euler.y < 0) {
        this.leftBack.euler.y += 0.05 * this.openingSpeed
    }

    else if (this.upperFront.opacity == 255) {
        this.upperFront.euler.x -= 0.05 * this.openingSpeed
        this.upperFront.y += 0.5 * this.openingSpeed
        if (this.upperFront.euler.x < -Math.PI / 2 - this.eulerCorrectY(this.upperFront)) {
            this.upperFront.opacity = 0;
            this.upperBack.opacity = 255;
            this.upperBack.euler.x = Math.PI / 2 - this.eulerCorrectY(this.upperFront);
        }
    } else if (this.upperBack.opacity == 255 && this.upperBack.euler.x > 0) {
        this.upperBack.euler.x -= 0.05 * this.openingSpeed
    } else if (this.downFront.opacity == 255) {
        this.downFront.euler.x += 0.05 * this.openingSpeed
        this.downFront.y -= 0.5 * this.openingSpeed
        if (this.downFront.euler.x > Math.PI / 2 - this.eulerCorrectY(this.downFront)) {
            this.downFront.opacity = 0;
            this.downBack.opacity = 255;
            this.downBack.euler.x = -Math.PI / 2 - this.eulerCorrectY(this.downFront);
        }
    } else if (this.downBack.opacity == 255 && this.downBack.euler.x < 0) {
        this.downBack.euler.x += 0.05 * this.openingSpeed
    } else {
        this.mainContainer.sortChildren()
        this.openingPhase = 2;
    }
};

//-----------------------------------------------------------------------------
// Sprite_Booster
//
// The sprite for displaying a card in triple triad.

function Sprite_Booster_Animated() {
    this.initialize.apply(this, arguments);
}

Sprite_Booster_Animated.prototype = Object.create(Sprite_Booster.prototype);
Sprite_Booster_Animated.prototype.constructor = Sprite_Booster_Animated;

//-----------------------------------------------------------------------------
// Function : initialize
//-----------------------------------------------------------------------------
Sprite_Booster_Animated.prototype.initialize = function () {
    Sprite_Card.prototype.initialize.call(this);
    this.boosterType = 1
    this.createVariables();
    this.createMainContainer()
    this.createBackImage();
    this.createBoosterCards();
    this.createUpperSprite();
    this.createDownSprite();
    this.createLeftSprite();
    this.createRightSprite();
    this.createSymbol();
    this.resetAllPositions();
    this.randomizeBooster();
};

//-----------------------------------------------------------------------------
// Function : createRightSprite
//-----------------------------------------------------------------------------
Sprite_Booster_Animated.prototype.setRightFront = function (boosterType) {
    this.rightFront.bitmap = ImageManager.loadIgnisShop("boosterPackRightFront" + (boosterType + 1))
}



//-----------------------------------------------------------------------------
// Function : resetAllPositions
//-----------------------------------------------------------------------------
Sprite_Booster_Animated.prototype.resetAllPositions = function () {
    Sprite_Booster.prototype.resetAllPositions.call(this);
    for (let n = 0; n < 5; n++) {
        this.boosterCards[n].zOrder = 1;
        this.boosterCards[n].x = 0;
        this.boosterCards[n].y = 0;
        this.boosterCards[n].scale.y = 0.9;
        this.boosterCards[n].scale.x = 0.9;
        this.boosterCards[n].euler.x = this.boosterCards[n].euler.y = 0;
    };
    this.mainContainer.sortChildren();

    for (let n = 0; n < 5; n++) {
        this.boosterCards[n].zOrder = 20;
    };
};
//-----------------------------------------------------------------------------
// Function : randomizeBooster
//-----------------------------------------------------------------------------
Sprite_Booster_Animated.prototype.randomizeBooster = function (boosterType = -1) {
    if (boosterType == -1) {
        return
    }
    let random = 0
    let cardRandom;
    for (let n = 0; n < 5; n++) {
        random = this.calculateBoosterCard(n, boosterType)

        cardRandom = new KamigamiCard()
        cardRandom.loadCardData(random, 0)
        if (this.boosterGodS != -1 && n === 2) {
            this.boosterCards[n].configureGod("Back_Card")
        } else {
            this.boosterCards[n].configureGod(cardRandom.imageBig, random)
        }

        //this.boosterCards[n].maskInside = maskInside;
    };

};
//-----------------------------------------------------------------------------
// Function : calculateLuckyPack
//-----------------------------------------------------------------------------
Sprite_Booster_Animated.prototype.calculateLuckyPack = function () {
    let luckyPack = Math.max(1, Math.floor(300 / $dataKamigami.luckyPack))
    luckyPack = Math.min(luckyPack, 10)
    return luckyPack
}


//-----------------------------------------------------------------------------
// Function : calculateBoosterCard
//-----------------------------------------------------------------------------
Sprite_Booster_Animated.prototype.calculateBoosterCard = function (position, boosterType) {
    let random = 0
    let calculateLuck = this.calculateLuckyPack()
    let randomGodCard = Math.randomInt(calculateLuck)
    let godCards = [0, 1, 2, 30, 31, 32, 58, 59, 60, 61, 90, 91, 92, 93, 120, 121, 122, 123]
    let range = []
    switch (boosterType) {
        case 0:
            range = [0, 29]
            break;
        case 1:
            range = [30, 57]
            break;
        case 2:
            range = [58, 89]
            break;
        case 3:
            range = [90, 119]
            break;
        case 4:
            range = [120, 149]
            break;
    }
    random = Math.randomInt(range[1] - range[0] + 1) + range[0]
    while (random == 41) {
        random = Math.randomInt(range[1] - range[0] + 1) + range[0]
    }
    if (randomGodCard != 0)
        while (godCards.includes(random)) {
            random = Math.randomInt(range[1] - range[0] + 1) + range[0]
        }
    random += 300
    if (position != 2 && Math.randomInt(2) == 0) {
        random -= 150
    }
    if (position == 2) {
        random -= 300
    }

    if (random >= 300 && $dataKamigami.allCards[random] >= 4) {
        random -= 150
    }
    if (random >= 150 && $dataKamigami.allCards[random] >= 4) {
        random -= 150
    }
    if (position == 2 && godCards.includes(random)) {
        this.boosterGodS = random
        $dataKamigami.luckyPack = 0
    } else if (position == 2) {
        $dataKamigami.luckyPack += 1
    }
    if ($dataKamigami.allCards[random] < 4)
        $dataKamigami.allCards[random]++
    return random
};



//-----------------------------------------------------------------------------
// Function : createBoosterCards
//-----------------------------------------------------------------------------
Sprite_Booster_Animated.prototype.createBoosterCards = function () {
    this.boosterCards = new Array();
    for (let n = 0; n < 5; n++) {
        this.boosterCards.push(new SpriteStaticGod())
        this.boosterCards[n].anchor.x = this.boosterCards[n].anchor.y = 0.5
        this.mainContainer.addChildZ(this.boosterCards[n], 20)
        this.boosterCards[n].scale.x = 0.9
        this.boosterCards[n].scale.y = 0.9
        this.boosterCards[n].y = -10 - n * 2
        this.boosterCards[n].x = - n * 3
        this.boosterCards[n].convertSubtreeTo3d()
    }

    //this._big_card_front.configureGod("big_set");
};


//-----------------------------------------------------------------------------
// Function : calculateDistanceMovement
//-----------------------------------------------------------------------------
calculateDistanceMovement = function (ownPosition, maxDistance, endPosition, maxFrames, maxCount, countFrame) {
    if (maxCount == countFrame) {
        return endPosition
    }
    ownPosition -= (maxDistance / maxFrames) * (maxCount - countFrame)
    return ownPosition
}