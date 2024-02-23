const _rai_SceneBoot_loadGameFonts = Scene_Boot.prototype.loadGameFonts

Scene_Boot.prototype.loadGameFonts = function() {
    _rai_SceneBoot_loadGameFonts.call(this, ...arguments)
    FontManager.load("rmmz-mainfont", "ChauPhilomeneOne.ttf");
    FontManager.load("rmmz-numberfont", "ChauPhilomeneOne.ttf");
    FontManager.load("GameFont", "ChauPhilomeneOne.ttf");
    
    FontManager.load("Chau Philomene One", "ChauPhilomeneOne.ttf");
    FontManager.load("GRENZE ExtraBold", "Grenze-SemiBold.ttf");
    FontManager.load("Inria Sans", "InriaSans-Regular.ttf");
    FontManager.load("Nord", "Nord.ttf");
    FontManager.load("Overpass", "Overpass-Medium.ttf");
    FontManager.load("Karantina", "Karantina-Regular.ttf");
};

//-----------------------------------------------------------------------------
// Scene_Main Menu
//
// The scene class of the menu screen.

function Scene_Main_Menu() {
    this.initialize.apply(this, arguments);
}

Scene_Main_Menu.prototype = Object.create(Scene_Base.prototype);
Scene_Main_Menu.prototype.constructor = Scene_Main_Menu;

Scene_Main_Menu.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    SceneManager.clearStack();
};

//-----------------------------------------------------------------------------
// Function : createTip
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.createTip = function () {
    this.tipText = new PIXI.Text(new String(), { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0xffffff, align: 'left', dropShadow: true, dropShadowBlur: 4, dropShadowDistance: 2 });
    this.addChild(this.tipText)
    this.tipText.text = IAVRA.I18N.localize("#{DuelVocab.MenuText.tip03}")
    this.tipText.y = 1000
    this.tipText.x = Graphics.width / 2 - this.tipText.width / 2
    this.tipMovement = false
    this.tipText.alpha = 0
}

//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    AudioManager.playBgm({ name: $dataKamigami.TitleMusic, pan: 0, pitch: 100, volume: 100 });
    this.createVariables();
    this.createBackground();
    this.create_fake_center();
    this.add_back_gods();
    this.create_gods();
    this.create_displacement();
    this.createBackground2();
    this.create_displacement_bg();
    this.createMenuBack();
    this.createMenuLight();
    this.createMenuOptions();
    this.createlogo();
    this.createGodsInfo();
    this.createarcs();
    this.createWarningMessage();
    this.createOptionMenu();
    if ($dataKamigami.failedSteamInfo) {
        $dataKamigami.failedSteamInfo = false
        this.warningText.text = IAVRA.I18N.localize("#{DuelVocab.MenuText.title3}")
        this.warningText.alpha = 4
    }
    this.createTip();
};
//-----------------------------------------------------------------------------
// Function : createWarningMessage
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.createWarningMessage = function () {
    this.warningText = new PIXI.Text(IAVRA.I18N.localize("#{DuelVocab.MenuText.title1}"), { fontFamily: 'Chau Philomene One', fontSize: 60, fill: 0xc22424, align: 'left', stroke: "#000000", strokeThickness: 3 });
    this.addChild(this.warningText)
    this.warningText.x = Graphics.width / 2
    this.warningText.y = Graphics.height / 2
    this.warningText.anchor.x = 0.5
    this.warningText.alpha = 0;
};


//-----------------------------------------------------------------------------
// Function : add_back_gods
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.add_back_gods = function () {
    this._tsukiMoon = new Sprite(ImageManager.loadTitle1("tsukuyomiMoon"));
    this.addChild(this._tsukiMoon);
    this._tsukiMoon.x = 300;
    this._tsukiMoon.opacity = 0;
};
//-----------------------------------------------------------------------------
// Function : create_displacement
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.create_displacement_bg = function () {
    this._displacement3 = new Sprite();
    this._displacement3.bitmap = ImageManager.loadDisplacement("map7");
    this._displacement3.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this._displacement3.scale.set(2);
    this._displacement3.anchor.set(0.5);
    this.addChild(this._displacement3);
    this.displacementFilter3 = new PIXI.filters.DisplacementFilter(this._displacement3);
    this.filters = [this.displacementFilter3];
    this.displacementFilter3.scale.x = 0;
    this.displacementFilter3.scale.y = 0;
    this.tl3 = new TimelineMax({ paused: true });
    this.tl3.to(this.displacementFilter3.scale, 8, { x: 0, y: -10000, ease: Expo.easeInOut });
    this.tl3.timeScale(6);
};
//-----------------------------------------------------------------------------
// Function : create_displacement
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.create_displacement = function () {

    this.addChild(this.container);
    this._displacement = new Sprite();
    this._displacement.bitmap = ImageManager.loadDisplacement("map8");
    this._displacement.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this._displacement.scale.set(1.5);
    this._displacement.anchor.set(0.5);
    this.container.addChild(this._displacement);
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this._displacement);
    this.container.filters = [this.displacementFilter];
    this.displacementFilter.scale.x = 0;
    this.displacementFilter.scale.y = 0;
    this.tl = new TimelineMax({ paused: true });
    this.tl.to(this.displacementFilter.scale, 8, { x: 0, y: 3000, ease: Expo.easeInOut });
    this.tl.timeScale(200);
    this.tl.play();

    this.addChild(this.container2);
    this._displacement2 = new Sprite();
    this._displacement2.bitmap = ImageManager.loadDisplacement("map8");
    this._displacement2.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this._displacement2.scale.set(1.5);
    this._displacement2.anchor.set(0.5);
    this.container2.addChild(this._displacement2);
    this.displacementFilter2 = new PIXI.filters.DisplacementFilter(this._displacement2);
    this.container2.filters = [this.displacementFilter2];
    this.displacementFilter2.scale.x = 0;
    this.displacementFilter2.scale.y = 0;
    this.tl2 = new TimelineMax({ paused: true });
    this.tl2.to(this.displacementFilter2.scale, 8, { x: 0, y: 3000, ease: Expo.easeInOut });
    this.tl2.timeScale(200);
    this.tl2.play();

    this.displacementFilterShockBG = new PIXI.filters.ShockwaveFilter();
    this.addChild(this.container4);
    //this.addChild(this._backSprite);
    this.container4.filters = [this.displacementFilterShockBG];
    this.displacementFilterShockBG.time = 0;
    this.displacementFilterShockBG.center = [960, 540];
    this.displacementFilterShockBG.brightness = 0.9;
    this.displacementFilterShockBG.wavelength = 350;
};
//-----------------------------------------------------------------------------
// Function : createVariables
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.createVariables = function () {
    this.kamigami_frame_count = 0;
    this.phase = 0;
    this.old_cursor = 0;
    this.kamigamiGodAnimationCount = 0;
};

//-----------------------------------------------------------------------------
// Function : createBackground
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.createBackground = function () {
    this._background = new Sprite(ImageManager.loadTitle1("Title_bg"));
    this.addChild(this._background);
};


//-----------------------------------------------------------------------------
// Function : createBackground2
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.createBackground2 = function () {
    this._background2 = new Sprite(ImageManager.loadTitle1("Title_bg2"));
    this.addChild(this._background2);
};

//-----------------------------------------------------------------------------
// Function : create_gods
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.create_gods = function () {
    this.container = new PIXI.Container();
    this.container2 = new PIXI.Container();
    this.container4 = new PIXI.Container();
    this._gods = ['HadesF', 'PoseidonF', 'ZeusF', 'IsisF', 'RaF', 'SetF', 'LokiF', 'HelF', 'OdinF', 'ThorF', 'IzanagiF', 'IzanamiF', 'AmaterasuF', 'TsukuyomiF'];
    //this._gods = ['HelF', 'HelF', 'HelF', 'HelF', 'HelF', 'HelF', 'HelF', 'HelF', 'HelF', 'HelF', 'HelF', 'HelF', 'HelF', 'HelF'];
    this.randomGod = Math.floor(Math.random() * this._gods.length);
    this._godPic1 = new Sprite();
    this._godPic1.bitmap = ImageManager.loadFace(this._gods[this.randomGod]);
    this.container.addChild(this._godPic1);
    this._godPic1.opacity = 0;
    this._godLoki = new Sprite();
    this._godLoki.bitmap = ImageManager.loadFace('LokiF');
    this.container4.addChild(this._godLoki);
    this._godLoki.opacity = 0;
    this.randomGod2 = Math.floor(Math.random() * this._gods.length);
    if (this.randomGod2 == this.randomGod) {
        this.randomGod2++;
        if (this.randomGod2 > 13)
            this.randomGod2 = 0;
    }
    this._godPic2 = new Sprite();
    this._godPic2.bitmap = ImageManager.loadFace(this._gods[this.randomGod2]);
    this.container2.addChild(this._godPic2);
    this._godPic2.opacity = 0;

};
//-----------------------------------------------------------------------------
// Function : createlogo
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.createlogo = function () {
    this._logo1 = new Sprite_Card();
    this._logo1.bitmap = ImageManager.loadTitle1("logo1");
    this.addChild(this._logo1);
    this._logo2 = new Sprite(ImageManager.loadTitle1("logo2"));
    this.addChild(this._logo2);
    this._logo1.anchor.x = 0.5;
    this._logo1.anchor.y = 1;
    this._logo2.anchor.x = 0.5;
    this._logo2.anchor.y = 0;
    this._logo1.scale.y = 0.6;
    this._logo2.scale.y = 0.6;
    this._logo1.scale.x = 0.6;
    this._logo2.scale.x = 0.6;
    this._logo1.x = 400;
    this._logo2.x = 400;
    this._logo1.y = 240;
    this._logo2.y = 240;
};
Scene_Main_Menu.prototype.create_fake_center = function () {
    this._center_sprite = new Sprite_Card();
    this._center_sprite.bitmap = ImageManager.loadTitle1("center_effects");
    this.addChild(this._center_sprite);
    this._center_sprite.x = Graphics.width / 2;

};

//-----------------------------------------------------------------------------
// Function : create_fake_center
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.createarcs = function () {
    this._centerArc = new Sprite(ImageManager.loadTitle1("menu_arc"));
    this.addChild(this._centerArc);
    this.centerSprite(this._centerArc);
    this._centerCursor = new Sprite(ImageManager.loadTitle1("cursor"));
    this.addChild(this._centerCursor);
    this.centerSprite(this._centerCursor);
    this._centerArc.rotation += Math.PI * 3 / 4;
    this._centerArc.opacity = 0;
    this._centerCursor.opacity = 0;
};

//-----------------------------------------------------------------------------
// Function : createMenuBack
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.createMenuBack = function () {
    this._backData = new Sprite(ImageManager.loadTitle1("title_data_bg"));
    this.addChild(this._backData);
    this._backStore = new Sprite(ImageManager.loadTitle1("title_store_bg"));
    this.addChild(this._backStore);
    this._backBooster = new Sprite(ImageManager.loadTitle1("title_boosters_bg"));
    this.addChild(this._backBooster);
    this._backDeck = new Sprite(ImageManager.loadTitle1("title_deck_bg"));
    this.addChild(this._backDeck);
    this._backDuel = new Sprite(ImageManager.loadTitle1("title_duel_bg"));
    this.addChild(this._backDuel);
    this._backCampaign = new Sprite(ImageManager.loadTitle1("title_campaign_bg"));
    this.addChild(this._backCampaign);
    this._backExit = new Sprite();
    this._backExit.bitmap = ImageManager.loadTitle1("title_exit_bg")
    this.addChild(this._backExit);
    this._backDeck.anchor.y = 0.5;
    this._backExit.x = -475;
    this._backExit.y = Graphics.height / 2 - 150;
    this._backData.x = -475;
    this._backData.y = Graphics.height - 497;
    this._backStore.x = 1931; this._backStore.y = Graphics.height - 257;
    this._backBooster.x = 2205; this._backBooster.y = Graphics.height / 2 + 97;
    this._backDeck.x = 2265; this._backDeck.y = Graphics.height / 2;
    this._backDuel.x = 2205; this._backDuel.y = Graphics.height / 2 - 275;
    this._backCampaign.x = 1931; this._backCampaign.y = 0;
    this._backData.opacity = this._backStore.opacity = this._backBooster.opacity = this._backDeck.opacity = this._backDuel.opacity = this._backCampaign.opacity = 0;
};
//-----------------------------------------------------------------------------
// Function : createMenuOptions
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.createMenuLight = function () {

    this._textLightCampaign = new Sprite_Kami_ButtonLight(1, "mainmenu2", -70, 0x19FF47);
    this.addChild(this._textLightCampaign);
    this._textLightCampaign.x = 1420;
    this._textLightBooster = new Sprite_Kami_ButtonLight(1, "mainmenu5", -70, 0x19FF47);
    this.addChild(this._textLightBooster);
    this._textLightBooster.x = 1420;
    this._textLightStore = new Sprite_Kami_ButtonLight(1, "mainmenu6", -70, 0x19FF47);
    this.addChild(this._textLightStore);
    this._textLightStore.x = 1420;
    this._textLightDeck = new Sprite_Kami_ButtonLight(1, "mainmenu4", -70, 0x19FF47);
    this.addChild(this._textLightDeck);
    this._textLightDeck.x = 1420;
    this._textLightDuel = new Sprite_Kami_ButtonLight(1, "mainmenu3", -70, 0x19FF47);
    this.addChild(this._textLightDuel);
    this._textLightDuel.x = 1420;
    this._textOnlineLight = new Sprite_Kami_ButtonLight(1, "mainmenu7", -40, 0x19FF47);
    this.addChild(this._textOnlineLight);
    this._textOnlineLight.x = 1420;
    this._textOfflineLight = new Sprite_Kami_ButtonLight(1, "mainmenu8", -40, 0x19FF47);
    this.addChild(this._textOfflineLight);
    this._textOfflineLight.x = 1420;
    this._textReturnLight = new Sprite_Kami_ButtonLight(1, "mainmenu9", -40, 0x19FF47);
    this.addChild(this._textReturnLight);
    this._textReturnLight.x = 1420;
    this._textExitLight = new Sprite_Kami_ButtonLight(0, "mainmenu1", 70, 0x19FF47);
    this._textExitLight.y = 390;
    this.addChild(this._textExitLight);
    this._textExitLight.opacity = this._textReturnLight.opacity = this._textOnlineLight.opacity = this._textOfflineLight.opacity = this._textLightDuel.opacity = this._textLightDeck.opacity = this._textLightStore.opacity = this._textLightBooster.opacity = this._textLightCampaign.opacity = 0;
};

//-----------------------------------------------------------------------------
// Function : createMenuOptions
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.createMenuOptions = function () {
    this._textStore = new Sprite_Kami_Button(1, "mainmenu6", -70);
    this.addChild(this._textStore);
    this._textBooster = new Sprite_Kami_Button(1, "mainmenu5", -70);
    this.addChild(this._textBooster);
    this._textDeck = new Sprite_Kami_Button(1, "mainmenu4", -70);
    this.addChild(this._textDeck);
    this._textDuel = new Sprite_Kami_Button(1, "mainmenu3", -70);
    this.addChild(this._textDuel);
    this._textCampaign = new Sprite_Kami_Button(1, "mainmenu2", -70);
    this.addChild(this._textCampaign);
    this._textOnline = new Sprite_Kami_Button(1, "mainmenu7", -40);
    this.addChild(this._textOnline);
    this._textOffline = new Sprite_Kami_Button(1, "mainmenu8", -40);
    this.addChild(this._textOffline);
    this._textReturn = new Sprite_Kami_Button(1, "mainmenu9", -40);
    this.addChild(this._textReturn);

    this._textExit = new Sprite_Kami_Button(0, "mainmenu1", 70);
    this.addChild(this._textExit);
    this._textExit.y = 390;
    this._textExit.x = -400;
    this._textStore.x = 1920; this._textStore.y = 810;
    this._textReturn.x = this._textBooster.x = 1920; this._textReturn.y = this._textBooster.y = 625;
    this._textOffline.x = this._textDeck.x = 1920; this._textOffline.y = this._textDeck.y = 440;
    this._textOnline.x = this._textDuel.x = 1920; this._textOnline.y = this._textDuel.y = 260;
    this._textOffline.opacity = this._textReturn.opacity = this._textOnline.opacity = 0;
    this._textCampaign.x = 1920; this._textCampaign.y = 60;
    this._textExit.opacity = 0; this._textStore.opacity = 0; this._textBooster.opacity = 0; this._textDeck.opacity = 0; this._textDuel.opacity = 0; this._textCampaign.opacity = 0;
    this._textOfflineLight.y = this._textOffline.y;
    this._textOnlineLight.y = this._textOnline.y;
    this._textReturnLight.y = this._textReturn.y;
};
//-----------------------------------------------------------------------------
// Function : createGodsInfo
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.createGodsInfo = function () {
    this._godsInfo = new Sprite();
    this._godsText = new PIXI.Container();
    this._descriptionGod = new PIXI.Text("", { fontFamily: 'GameFont', fontSize: 26, fill: 0xffffff, align: 'left', bold: true });
    this._descriptionGodName = new PIXI.Text("", { fontFamily: 'GameFont', fontSize: 48, fill: 0xffffff, align: 'left', bold: true });
    this._descriptionGodValues = new PIXI.Text("", { fontFamily: 'GameFont', fontSize: 36, fill: 0xffffff, align: 'left', bold: true });



    this.updateGodsInfo(this.randomGod)
    this.addChild(this._godsInfo);
    this.addChild(this._godsText);

    this._godsText.addChild(this._descriptionGodName)
    this._godsText.addChild(this._descriptionGod)
    this._godsText.addChild(this._descriptionGodValues)
    this._godsInfo.y = Graphics.height - 497;
    this._godsInfo.opacity = 0;
    this._godsInfo.x = -212;
    this._godsText.x = -112;
    this._godsText.alpha = 0
    this._descriptionGod.y = this._godsInfo.y + 100
    this._descriptionGodName.y = this._godsInfo.y + 35
    this._descriptionGodValues.y = this._godsInfo.y + 390
    this._descriptionGodValues.x = 44

};
//-----------------------------------------------------------------------------
// Function : createGodsInfo
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.updateGodsInfo = function (godIndex) {
    this._godsInfo.bitmap = ImageManager.loadTitle1("InfoF")
    this._descriptionGod.text = IAVRA.I18N.localize("#{DuelVocab.GodsDescription." + this._gods[godIndex] + "}")
    let godName = this._gods[godIndex].substring(0, this._gods[godIndex].length - 1)
    this._descriptionGodName.text = godName.toUpperCase()
    let values = ""
    let cardId = this.getCardId(godName)


    let card = new KamigamiCard()
    card.loadCardData(cardId, 0)
    values += card.attack + "              " + card.addDevotion + "              " + card.mhp

    this._descriptionGodValues.text = values

}
//-----------------------------------------------------------------------------
// Function : getCardId
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.getCardId = function (godName) {
    let cardIndex = -1
    Game_Kamigami.convertedCardList.forEach(function returnCardId(element, index, array) {
        if (element.name == godName && cardIndex == -1) {
            cardIndex = index;
        }
    })
    return cardIndex
}


//-----------------------------------------------------------------------------
// Function : centerSprite
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.centerSprite = function (sprite) {
    sprite.x = Graphics.width / 2;
    sprite.y = Graphics.height / 2;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
};



//-----------------------------------------------------------------------------
// Function : update
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    this.rotateGear();
    this.updateTipMovement();
    this.kamigami_frame_count++;
    this.kamigamiGodAnimationCount++;
    if (this.warningText.alpha > 0) {
        this.warningText.alpha -= 0.02
    }
    switch (this.phase) {
        case 0:
            this.updateOpacity();
            this.updateGodAnimation();
            break;
        case 1:
            this.updateGodAnimation();
            this.updateOptions();

            break;
        case 2:
            this.setGodsMovement();
            this.updateDecision();
            break;
        case 3:
            this.closeMenu();
            break;
        case 4:
            this.onlineBattle();
            this.updateGodAnimation();
            break;
        case 5:
            this.updateGodAnimation();
            this.updateOptionsDuel();
            break;
        case 6:
            this.updateDuelDecision();
            this.setGodsMovement();
            break;

    }
};

//-----------------------------------------------------------------------------
// Function : updateTipMovement
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.updateTipMovement = function () {
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

//////////////////////////// PHASE 0 //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : updateOpacity
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.updateOpacity = function () {
    if (this._optionGear.opacity < 140) {
        this._optionGear.opacity += 5
    }
    if (this._textCampaign.x > 1420) {
        this._textCampaign.x -= ((this._textCampaign.x - 1400) / 20);
        this._backCampaign.x -= 1.5 * ((this._textCampaign.x - 1400) / 20);
        if (this._textCampaign.opacity < 165)
            this._textCampaign.opacity += 3;
        this._backCampaign.opacity += 7;
        this.tl.timeScale(4);
        this.tl2.timeScale(4);

        this.isOnGod = true;
    }
    if (this._textDuel.x > 1420 && this.kamigami_frame_count > 15) {
        this._textDuel.x -= ((this._textDuel.x - 1400) / 20);
        this._backDuel.x -= 1.5 * ((this._textDuel.x - 1400) / 20);
        this._backDuel.opacity += 7;
        if (this._textDuel.opacity < 165)
            this._textDuel.opacity += 3;
    }

    if (this._textDeck.x > 1420 && this.kamigami_frame_count > 30) {
        this._textDeck.x -= ((this._textDeck.x - 1400) / 20);
        this._backDeck.x -= 1.5 * ((this._textDeck.x - 1400) / 20);
        if (this._textDeck.opacity < 165) {
            this._textDeck.opacity += 3;
        }

        this._backDeck.opacity += 7;

    }
    if (this._textBooster.x > 1420 && this.kamigami_frame_count > 45) {
        this._textBooster.x -= ((this._textBooster.x - 1400) / 20);
        this._backBooster.x -= 1.5 * ((this._textBooster.x - 1400) / 20);
        if (this._textBooster.opacity < 165)
            this._textBooster.opacity += 3;
        this._backBooster.opacity += 7;

    }
    if (this._textStore.x > 1420 && this.kamigami_frame_count > 60) {
        this._textExit.x += 0.8 * ((this._textStore.x - 1400) / 20);
        this._textExitLight.x = this._textExit.x;
        this._textStore.x -= ((this._textStore.x - 1400) / 20);
        this._backStore.x -= 1.5 * ((this._textStore.x - 1400) / 20);
        this._backData.x += ((this._textStore.x - 1400) / 20);
        this._backExit.x = this._backData.x
        if (this._textStore.opacity < 165) {
            this._textStore.opacity += 3;
            this._textExit.opacity += 3;
            this.tl.reverse();
            this._backData.opacity += 7;
        }
        this._backStore.opacity += 7;
    }
    if (this._centerArc.rotation > 0 && this.kamigami_frame_count > 20) {
        this._centerArc.opacity += 2.5;
        this._centerArc.rotation -= 0.02;
        if (this._centerArc.rotation <= 0) {
            this._textLightDuel.y = this._textDuel.y;
            this._textLightStore.y = this._textStore.y;
            this._textLightBooster.y = this._textBooster.y;
            this._textLightDeck.y = this._textDeck.y;
            this._textLightCampaign.y = this._textCampaign.y;
            this.phase = 1;
            this._centerArc.rotation = 0;
        }

    }
};


//////////////////////////// PHASE 1 //////////////////////////////////////

//-----------------------------------------------------------------------------
// Function : updateGodAnimation
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.updateGodAnimation = function () {
    if (this.kamigamiGodAnimationCount < 60) {
        this._tsukiMoon.opacity -= 5;
        this._center_sprite.opacity -= 5;
        this._godLoki.opacity -= 5;
        return;
    }
    this._center_sprite.opacity += 5;
    if (this.isOnGod)
        var god = this._gods[this.randomGod];
    else
        var god = this._gods[this.randomGod2];
    switch (god) {
        case "ZeusF":
            this.zeusAnimation();
            break;
        case "TsukuyomiF":
            this.tsukiAnimation();
            break;
        case "PoseidonF":
            this.poseidonAnimation();
            break;
        case "IsisF":
            this.isisAnimation();
            break;
        case "AmaterasuF":
            this.amaterasuAnimation();
            break;
        case "IzanamiF":
            this.izanamiAnimation();
            break;
        case "RaF":
            this.raAnimation();
            break;
        case "LokiF":
            this.lokiAnimation();
            break;
        case "ThorF":
            this.thorAnimation();
            break;
        case "IzanagiF":
            this.izanagiAnimation();
            break;
        case "SetF":
            this.setAnimation();
            break;
        case "OdinF":
            this.odinAnimation();
            break;
        case "HadesF":
            this.hadesAnimation();
            break;
        case "HelF":
            this.helAnimation();
            break;
    }

};
//-----------------------------------------------------------------------------
// Function : helAnimation
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.helAnimation = function () {
    if (this.kamigamiGodAnimationCount == 180) {
        this.emitter = fx.getParticleEmitter('top-hel');
        this.emitter.init(this._center_sprite, true, 5);
        this._center_sprite.x = Graphics.width / 2;
        this._center_sprite.y = Graphics.height - 50;
    }
};

//-----------------------------------------------------------------------------
// Function : lokiAnimation
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.lokiAnimation = function () {
    this._godPic1.opacity = 255;
    if (this.kamigamiGodAnimationCount == 170) {
        this.emitter2 = fx.getParticleEmitter('plasma-shield');
        this.emitter2.init(this._center_sprite, true, 3.8);
        this._center_sprite.x = Graphics.width / 2;
        this._center_sprite.y = 550;
    }
    if (this.kamigamiGodAnimationCount == 180) {
        this._godLoki.opacity = 120;
    }
    if (this.kamigamiGodAnimationCount > 180) {
        if (this._godLoki.opacity < 120)
            this._godLoki.opacity += 10;
        if (this.reverse)
            this.displacementFilterShockBG.time -= 0.08 * Math.random();
        else
            this.displacementFilterShockBG.time += 0.08 * Math.random();
        if (this.displacementFilterShockBG.time > 2) {
            this.reverse = true;
        } else if (this.displacementFilterShockBG.time < -1) {
            this.reverse = false;
        }
    } else {
        this._godLoki.opacity -= 10;
    }
};
//-----------------------------------------------------------------------------
// Function : amaterasuAnimation
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.raAnimation = function () {
    if (this.kamigamiGodAnimationCount == 180) {
        this.emitter = fx.getParticleEmitter('Lighteeeee');
        this.emitter.init(this._center_sprite, true, 2);
        this._center_sprite.x = Graphics.width / 2 + 50;
        this._center_sprite.y = Graphics.height / 6;
    }
};
//-----------------------------------------------------------------------------
// Function : odinAnimation
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.odinAnimation = function () {
    if (this.kamigamiGodAnimationCount == 180) {
        this.emitter = fx.getParticleEmitter('DuelMainNorse');
        this.emitter.init(this._center_sprite, true, 1);
        this._center_sprite.x = Graphics.width / 2 - 50;
        this._center_sprite.y = 0;
    }
};
//-----------------------------------------------------------------------------
// Function : hadesAnimation
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.hadesAnimation = function () {
    if (this.kamigamiGodAnimationCount == 180) {
        this.emitter = fx.getParticleEmitter('Hades-card2');
        this.emitter.init(this._center_sprite, true, 3);
        this._center_sprite.x = Graphics.width / 2;
        this._center_sprite.y = Graphics.height / 2;
    }
};

//-----------------------------------------------------------------------------
// Function : setAnimation
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.setAnimation = function () {
    if (this.kamigamiGodAnimationCount == 180) {
        this.emitter = fx.getEffectSequence('duel-egypt-card');
        this.emitter.init(this._center_sprite, true, 1);
        this._center_sprite.x = 300;
        this._center_sprite.y = Graphics.height / 2;
    }
};
//-----------------------------------------------------------------------------
// Function : amaterasuAnimation
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.izanagiAnimation = function () {
    if (this.kamigamiGodAnimationCount == 180) {
        this.emitter = fx.getEffectSequence('duel-japanese');
        this.emitter.init(this._center_sprite, true, 1);
        this._center_sprite.x = Graphics.width / 2;
        this._center_sprite.y = 0;
    }
};

//-----------------------------------------------------------------------------
// Function : thorAnimation
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.thorAnimation = function () {
    if (this.kamigamiGodAnimationCount == 180) {
        this.emitter = fx.getParticleEmitter('thor');
        this.emitter.init(this._center_sprite, true, 3);
        this._center_sprite.x = Graphics.width / 2;
        this._center_sprite.y = Graphics.height / 2;
    }
};


//-----------------------------------------------------------------------------
// Function : amaterasuAnimation
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.izanamiAnimation = function () {
    if (this.kamigamiGodAnimationCount == 180) {
        this.emitter = fx.getParticleEmitter('Skulls');
        this.emitter.init(this._center_sprite, true, 1);
        this._center_sprite.x = Graphics.width / 2;
        this._center_sprite.y = Graphics.height;
    }
};
//-----------------------------------------------------------------------------
// Function : amaterasuAnimation2
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.amaterasuAnimation = function () {
    if (this.kamigamiGodAnimationCount == 170) {
        this.emitter2 = fx.getParticleEmitter('full-fire-arc');
        this.emitter2.init(this._center_sprite, true, 2);
        this._center_sprite.x = Graphics.width / 2;
        this._center_sprite.y = 470;
    }
};
//-----------------------------------------------------------------------------
// Function : zeusAnimation
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.zeusAnimation = function () {
    if (this.kamigamiGodAnimationCount == 120) {
        this.emitter4 = fx.getParticleEmitter('side-clouds');
        this.emitter4.init(this._center_sprite, true, 1);
        this.emitter4.x -= 600;
        this.emitter4.y += 100;
        this.emitter = fx.getParticleEmitter('thunder');
        this.emitter.init(this._center_sprite, true, 2);
        this.emitter2 = fx.getParticleEmitter('thunder-sub2');
        this.emitter2.init(this._center_sprite, true, 2);
        this.emitter3 = fx.getParticleEmitter('thunder-sub3');
        this.emitter3.init(this._center_sprite, true, 2);
        this._center_sprite.x = Graphics.width / 2;
        this._center_sprite.y = -50;
    }
    if (this.kamigamiGodAnimationCount > 120)
        if (this.kamigamiGodAnimationCount % 120 == 0) {
            var rand = Math.floor(Math.random() * 2);
            if (rand == 0)
                AudioManager.playSe({ name: "thunderZeus", pan: 0, pitch: 100, volume: 100 });
        }


};
//-----------------------------------------------------------------------------
// Function : tsukiAnimation
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.tsukiAnimation = function () {
    if (this.kamigamiGodAnimationCount == 60) {
        this.emitter = fx.getParticleEmitter('side-clouds');
        this.emitter.init(this._center_sprite, true, 1);
        this._center_sprite.x = 0;
        this._center_sprite.y = 0;
    }
    this._tsukiMoon.opacity += 5;
};
//-----------------------------------------------------------------------------
// Function : isisAnimation
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.isisAnimation = function () {
    if (this.kamigamiGodAnimationCount == 60) {
        this.emitter2 = fx.getParticleEmitter('bubbles');
        this.emitter2.init(this._center_sprite, true, 1);
        this._center_sprite.x = 960;
        this._center_sprite.y = 1080;
    }
};
//-----------------------------------------------------------------------------
// Function : poseidonAnimation
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.poseidonAnimation = function () {
    if (this.kamigamiGodAnimationCount == 60) {
        this.emitter2 = fx.getParticleEmitter('top-ocean');
        this.emitter2.init(this._center_sprite, true, 1);
        this._center_sprite.x = 960;
        this._center_sprite.y = 540;
    }
};
//-----------------------------------------------------------------------------
// Function : updateOptions
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.updateOptions = function () {
    if (this.kamigamiGodAnimationCount == 60) {
        if (this.isOnGod)
            this.updateGodsInfo(this.randomGod)
        else
            this.updateGodsInfo(this.randomGod2)
    }
    if (this.kamigamiGodAnimationCount > 60)
        this.setGodsMovement();
    else {
        this._godsInfo.x -= 5;
        this._godsText.x = this._godsInfo.x + 60
        this._godsInfo.opacity -= 5;
        if (this._godsText.alpha > 0)
            this._godsText.alpha -= 0.02
    }
    if (this.updateOptionChoices()) {
        return;
    }
    var btn_hover = 0;
    if (this._textCampaign.isButtonHovered() || this._textCampaign.isBeingTouched())
        btn_hover = 1;
    if (this._textDuel.isButtonHovered() || this._textDuel.isBeingTouched())
        btn_hover = 2;
    if (this._textDeck.isButtonHovered() || this._textDeck.isBeingTouched())
        btn_hover = 3;
    if (this._textBooster.isButtonHovered() || this._textBooster.isBeingTouched())
        btn_hover = 4;
    if (this._textStore.isButtonHovered() || this._textStore.isBeingTouched())
        btn_hover = 5;
    if (this._textExit.isButtonHovered() || this._textExit.isBeingTouched())
        btn_hover = 6;
    switch (btn_hover) {
        case 0:
            this.move_cursor(-1.5);
            break;
        case 1:
            this._textLightCampaign.opacity += 20;
            this.move_cursor(-0.6);
            break;
        case 2:
            this._textLightDuel.opacity += 20;
            this.move_cursor(-0.3);
            break;
        case 3:
            this._textLightDeck.opacity += 20;
            this.move_cursor(0);
            break;
        case 4:
            this._textLightBooster.opacity += 20;
            this.move_cursor(0.3);
            break;
        case 5:
            this._textLightStore.opacity += 20;
            this.move_cursor(0.6);
            break;
        case 6:
            this._textExitLight.opacity += 20;
            this.move_cursor(-1.5);
            break;
    }
    this.remove_all_buttons(btn_hover);
    if (TouchInput.isTriggered()) {
        if (btn_hover == 0 && this.kamigamiGodAnimationCount > 300) {
            this.setNewGod();
        }
        if (btn_hover == 1) {
            AudioManager.playSe({ name: "success", pan: 0, pitch: 95, volume: 100 });
            this.phase = 2;
            this.btn_hover = 1;
            this.count_decision = 0;
        }
        if (btn_hover == 2) {
            if (!$dataKamigami.duelInfo[0].enabled) {
                this.warningText.text = IAVRA.I18N.localize("#{DuelVocab.MenuText.title2}")
                this.warningText.alpha = 2
                return
            }
            AudioManager.playSe({ name: "success", pan: 0, pitch: 95, volume: 100 });
            this.phase = 2;
            this.btn_hover = 2;
            this.count_decision = 0;
        }
        if (btn_hover == 3) {
            if (!$dataKamigami.hasChosenDeck) {
                this.warningText.text = IAVRA.I18N.localize("#{DuelVocab.MenuText.title1}")
                this.warningText.alpha = 2
                return
            }
            AudioManager.playSe({ name: "success", pan: 0, pitch: 95, volume: 100 });
            this.phase = 2;
            this.btn_hover = 3;
            this.count_decision = 0;
        }
        if (btn_hover == 4) {
            AudioManager.playSe({ name: "success", pan: 0, pitch: 95, volume: 100 });
            this.phase = 2;
            this.btn_hover = 4;
            this.count_decision = 0;
        }
        if (btn_hover == 5) {
            AudioManager.playSe({ name: "success", pan: 0, pitch: 95, volume: 100 });
            this.phase = 2;
            this.btn_hover = 5;
            this.count_decision = 0;
        }
        if (btn_hover == 6) {
            AudioManager.playSe({ name: "success", pan: 0, pitch: 95, volume: 100 });
            SceneManager.exit()
        }
        if (btn_hover != 2 && btn_hover != 0) {
            this.stop_animations();
        }
    }
    if (this.old_cursor != btn_hover) {
        this.old_cursor = btn_hover;
        if (this.old_cursor != 0)
            AudioManager.playSe({ name: "menu_select", pan: 0, pitch: 100, volume: 100 });
    }
};
//-----------------------------------------------------------------------------
// Function : stop_animations
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.stop_animations = function () {
    if (this.emitter)
        this.emitter.stop();
    if (this.emitter2)
        this.emitter2.stop();
    if (this.emitter3)
        this.emitter3.stop();
    if (this.emitter4)
        this.emitter4.stop();
};
//-----------------------------------------------------------------------------
// Function : remove_all_buttons
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.remove_all_buttons = function (hover) {
    if (hover != 1)
        this._textLightCampaign.opacity -= 20;
    if (hover != 2)
        this._textLightDuel.opacity -= 20;
    if (hover != 3)
        this._textLightDeck.opacity -= 20;
    if (hover != 4)
        this._textLightBooster.opacity -= 20;
    if (hover != 5)
        this._textLightStore.opacity -= 20;
    if (hover != 6)
        this._textExitLight.opacity -= 20;
};


Scene_Main_Menu.prototype.setGodsMovement = function () {
    if (this.isOnGod) {
        this._godPic1.opacity += 7;
        this._godPic2.opacity -= 20;
    } else {
        this._godPic2.opacity += 7;
        this._godPic1.opacity -= 20;
    }

    this._godsInfo.x -= (this._godsInfo.x / 20);
    this._godsText.x = this._godsInfo.x + 60
    if (this._godsInfo.opacity < 165)
        this._godsInfo.opacity += 3;
    if (this._godsText.alpha < 0.7) {
        this._godsText.alpha += 0.02
    }
}

//-----------------------------------------------------------------------------
// Function : setNewGod
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.setNewGod = function () {
    if (this.emitter)
        this.emitter.stop();
    if (this.emitter2)
        this.emitter2.stop();
    if (this.emitter3)
        this.emitter3.stop();
    if (this.emitter4)
        this.emitter4.stop();
    this.changeGodAnimation();
    this.kamigamiGodAnimationCount = 0;
};
//-----------------------------------------------------------------------------
// Function : changeGodAnimation
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.changeGodAnimationTest = function () {
    if (this.isOnGod) {
        this.tl.play();
        this.tl2.reverse();
        this.isOnGod = false;
        this.randomGod2 = this.randomGod + 1;
        if (this.randomGod2 > 13)
            this.randomGod2 = 0;
        this._godPic2.bitmap = ImageManager.loadFace(this._gods[this.randomGod2]);
    } else {
        this.tl.reverse();
        this.tl2.play();
        this.isOnGod = true;
        this.randomGod = this.randomGod2 + 1;
        if (this.randomGod > 13)
            this.randomGod = 0;
        this._godPic1.bitmap = ImageManager.loadFace(this._gods[this.randomGod]);
    }
};
//-----------------------------------------------------------------------------
// Function : changeGodAnimation
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.changeGodAnimation = function () {
    if (this.isOnGod) {
        this.tl.play();
        this.tl2.reverse();
        this.isOnGod = false;
        this.randomGod2 = Math.floor(Math.random() * this._gods.length);
        if (this.randomGod2 == this.randomGod) {
            this.randomGod2++;
            if (this.randomGod2 > 13)
                this.randomGod2 = 0;
        }
        this._godPic2.bitmap = ImageManager.loadFace(this._gods[this.randomGod2]);
    } else {
        this.tl.reverse();
        this.tl2.play();
        this.isOnGod = true;
        this.randomGod = Math.floor(Math.random() * this._gods.length);
        if (this.randomGod == this.randomGod2) {
            this.randomGod++;
            if (this.randomGod > 13)
                this.randomGod = 0;
        }
        this._godPic1.bitmap = ImageManager.loadFace(this._gods[this.randomGod]);
    }
}
//-----------------------------------------------------------------------------
// Function : move_cursor
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.move_cursor = function (arc) {
    var actual_rotation = this._centerCursor.rotation - arc;
    this._centerCursor.rotation -= actual_rotation / 10;
    if (arc < -0.6 || arc > 0.6) {
        this._centerCursor.opacity -= 20;
    } else
        this._centerCursor.opacity += 10;
};


//////////////////////////// PHASE 2 //////////////////////////////////////

//-----------------------------------------------------------------------------
// Function : updateDecision
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.updateDecision = function () {
    switch (this.btn_hover) {
        case 1:
            if (this.count_decision % 2 == 0) {
                this._textLightCampaign.opacity += 51;
                if (this._textLightCampaign.opacity == 255)
                    this.count_decision++;
            }

            else {
                this._textLightCampaign.opacity -= 51;
                if (this._textLightCampaign.opacity == 0)
                    this.count_decision++;
            }
            this.move_cursor(-0.6);
            break;
        case 2:
            this.count_decision = 15;
            this.move_cursor(-0.3);
            break;
        case 3:
            if (this.count_decision % 2 == 0) {
                this._textLightDeck.opacity += 51;
                if (this._textLightDeck.opacity == 255)
                    this.count_decision++;
            }

            else {
                this._textLightDeck.opacity -= 51;
                if (this._textLightDeck.opacity == 0)
                    this.count_decision++;
            }
            this.move_cursor(0);
            break;
        case 4:
            if (this.count_decision % 2 == 0) {
                this._textLightBooster.opacity += 51;
                if (this._textLightBooster.opacity == 255)
                    this.count_decision++;
            }

            else {
                this._textLightBooster.opacity -= 51;
                if (this._textLightBooster.opacity == 0)
                    this.count_decision++;
            }
            this.move_cursor(0.3);
            break;
        case 5:
            if (this.count_decision % 2 == 0) {
                this._textLightStore.opacity += 51;
                if (this._textLightStore.opacity == 255)
                    this.count_decision++;
            }

            else {
                this._textLightStore.opacity -= 51;
                if (this._textLightStore.opacity == 0)
                    this.count_decision++;
            }
            this.move_cursor(0.6);
            break;
    }
    if (this.count_decision == 15) {

        if (this.btn_hover == 2)
            this.phase = 4;
        else {
            this.phase = 3;
            this.tl.play();
            this.tl2.play();
        }
        this.kamigami_frame_count = 0;
    }

};

//////////////////////////// PHASE 3 //////////////////////////////////////

//-----------------------------------------------------------------------------
// Function : closeMenu
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.closeMenu = function () {
    this.move_cursor(1);
    this._textLightCampaign.opacity -= 20;
    this._textLightDuel.opacity -= 20;
    this._textLightStore.opacity -= 20;
    this._textLightBooster.opacity -= 20;
    this._textLightDeck.opacity -= 20;
    this._textOnlineLight.opacity -= 20;
    this._textOfflineLight.opacity -= 20;
    this._textReturnLight.opacity -= 20;
    if (this.kamigami_frame_count > 10) {
        this._textCampaign.opacity -= 7;
        this._backCampaign.opacity -= 7;
        this._textCampaign.x += ((this.kamigami_frame_count - 10) / 2);
        this._backCampaign.x += ((this.kamigami_frame_count - 10) / 2);
    }
    if (this.kamigami_frame_count > 20) {
        this._textDuel.opacity -= 7;
        this._backDuel.opacity -= 7;
        this._textDuel.x += ((this.kamigami_frame_count - 20) / 2);
        this._backDuel.x += ((this.kamigami_frame_count - 20) / 2);
        this._godPic1.opacity -= 10;
        this._godPic2.opacity -= 10;
        this._textOnline.x += ((this.kamigami_frame_count - 20) / 2);
        this._textOnline.opacity -= 7;
    }
    if (this.kamigami_frame_count > 30) {
        this._textDeck.opacity -= 7;
        this._backDeck.opacity -= 7;
        this._textDeck.x += ((this.kamigami_frame_count - 30) / 2);
        this._backDeck.x += ((this.kamigami_frame_count - 30) / 2);
        this._textOffline.x += ((this.kamigami_frame_count - 30) / 2);
        this._textOffline.opacity -= 7;
    }
    if (this.kamigami_frame_count > 40) {
        this._textBooster.opacity -= 7;
        this._backBooster.opacity -= 7;
        this._textBooster.x += ((this.kamigami_frame_count - 40) / 2);
        this._backBooster.x += ((this.kamigami_frame_count - 40) / 2);
        this._textReturn.x += ((this.kamigami_frame_count - 40) / 2);
        this._textReturn.opacity -= 7;
    }
    if (this.kamigami_frame_count > 50) {
        this._textStore.opacity -= 7;
        this._backStore.opacity -= 7;
        this._textStore.x += ((this.kamigami_frame_count - 50) / 2);
        this._backStore.x += ((this.kamigami_frame_count - 50) / 2);
        this._godsInfo.opacity -= 7;
        if (this._godsText.alpha > 0)
            this._godsText.alpha -= 0.06
        this._backData.opacity -= 7;
        this._godsInfo.x -= ((this.kamigami_frame_count - 50) / 2);
        this._godsText.x = this._godsInfo.x + 60
        this._backData.x -= ((this.kamigami_frame_count - 50) / 2);

    }
    if (this.kamigami_frame_count > 60) {
        this._textExit.opacity -= 7;
        this._backExit.opacity -= 7;
        this._textExit.x -= ((this.kamigami_frame_count - 60) / 2);
        this._backExit.x -= ((this.kamigami_frame_count - 60) / 2);
    }
    if (this.kamigami_frame_count > 80)
        this.tl3.play();
    if (this.kamigami_frame_count == 120)
        if (this.btn_hover == 1)
            SceneManager.push(Scene_Map)
        else if (this.duelDecision) {
            if (this.btn_hover == 2)
                SceneManager.push(Scene_Kamigami_Lobby)
            else
                SceneManager.push(Scene_Kamigami_Select_Duel)
        }
        else if (this.btn_hover == 3)
            SceneManager.push(Scene_Kamigami_Deck_Select)
        else if (this.btn_hover == 4) {
            SceneManager.push(Scene_Kamigami_Booster)
        }
            
        else if (this.btn_hover == 5)
            SceneManager.push(Scene_Ignis_Shop)

    if (this._centerArc.rotation < 3 && this.kamigami_frame_count > 20) {
        this._centerArc.opacity -= 3;
        this._centerArc.rotation += ((this.kamigami_frame_count - 20) / 2) * 0.001;
    }
};

//////////////////////////// PHASE 4 //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : returnOptions
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.returnOptions = function () {
    if (this.kamigami_frame_count >= 11 && this.kamigami_frame_count < 40) {
        this._textDuel.x -= (this.kamigami_frame_count - 10);
        this._textDeck.x -= (this.kamigami_frame_count - 10);
        this._textBooster.x -= (this.kamigami_frame_count - 10);
        this._textCampaign.x -= (this.kamigami_frame_count - 10);
        this._textStore.x -= (this.kamigami_frame_count - 10);
        if (this._textDuel.opacity < 165) {
            this._textDuel.opacity += 15;
            this._textDeck.opacity += 15;
            this._textBooster.opacity += 15;
            this._textStore.opacity += 15;
            this._textCampaign.opacity += 15;
        }
    }
    this._textReturnLight.opacity -= 15;
    this._textOfflineLight.opacity -= 15;
    this._textOnlineLight.opacity -= 15;
    if (this.kamigami_frame_count > 0 && this.kamigami_frame_count <= 20) {
        this._textOnline.opacity -= 15;
        this._textOffline.opacity -= 15;
        this._textReturn.opacity -= 15;
        this._textOnline.x += ((20 - this.kamigami_frame_count) * 2.7);
        this._textOffline.x += ((20 - this.kamigami_frame_count) * 2.7);
        this._textReturn.x += ((20 - this.kamigami_frame_count) * 2.7);
    }
    if (this.kamigami_frame_count > 40) {
        this.count_decision = 15;
    }
};
//-----------------------------------------------------------------------------
// Function : onlineBattle
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.onlineBattle = function () {
    if (this.kamigami_frame_count < 30) {
        this._textDuel.x += ((this.kamigami_frame_count));
        this._textDeck.x += ((this.kamigami_frame_count));
        this._textBooster.x += ((this.kamigami_frame_count));
        this._textCampaign.x += ((this.kamigami_frame_count));
        this._textStore.x += ((this.kamigami_frame_count));
        this._textDuel.opacity -= 15;
        this._textDeck.opacity -= 15;
        this._textBooster.opacity -= 15;
        this._textStore.opacity -= 15;
        this._textCampaign.opacity -= 15;
        this._textLightDuel.opacity -= 15;
        this._textLightCampaign.opacity -= 15;
        this._textLightStore.opacity -= 15;
        this._textLightBooster.opacity -= 15;
        this._textLightDeck.opacity -= 15;
    }
    if (this.kamigami_frame_count > 20 && this.kamigami_frame_count <= 40) {
        if (this._textOnline.opacity < 165) {
            this._textOnline.opacity += 15;
            this._textOffline.opacity += 15;
            this._textReturn.opacity += 15;
        }
        this._textOnline.x -= ((40 - this.kamigami_frame_count) * 2.7);
        this._textOffline.x -= ((40 - this.kamigami_frame_count) * 2.7);
        this._textReturn.x -= ((40 - this.kamigami_frame_count) * 2.7);
        if (this.kamigami_frame_count == 40) {
            this._textOfflineLight.x = this._textOffline.x;
            this._textOnlineLight.x = this._textOnline.x;
            this._textReturnLight.x = this._textReturn.x;

        }
    }
    if (this.kamigami_frame_count > 40) {
        this.phase = 5;
    }

};

//-----------------------------------------------------------------------------
// Function : updateOptions
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.updateOptionsDuel = function () {
    if (this.kamigamiGodAnimationCount == 60) {
        if (this.isOnGod)
            this.updateGodsInfo(this.randomGod)
        else
            this.updateGodsInfo(this.randomGod2)
    }
    if (this.kamigamiGodAnimationCount > 60)
        this.setGodsMovement();
    else {
        this._godsInfo.x -= 5;
        this._godsInfo.opacity -= 5;
        this._godsText.x = this._godsInfo.x + 60
    }
    var btn_hover = 0;
    if (this._textExit.isButtonHovered() || this._textExit.isBeingTouched())
        btn_hover = 1;
    if (this._textOnline.isButtonHovered() || this._textOnline.isBeingTouched())
        btn_hover = 2;
    if (this._textOffline.isButtonHovered() || this._textOffline.isBeingTouched())
        btn_hover = 3;
    if (this._textReturn.isButtonHovered() || this._textReturn.isBeingTouched())
        btn_hover = 4;
    switch (btn_hover) {
        case 0:
            this.move_cursor(-1.5);
            break;
        case 1:
            this._textExitLight.opacity += 20;
            this.move_cursor(-1.5);
            break;
        case 2:
            this._textOnlineLight.opacity += 20;
            this.move_cursor(-0.3);
            break;
        case 3:
            this._textOfflineLight.opacity += 20;
            this.move_cursor(0);
            break;
        case 4:
            this._textReturnLight.opacity += 20;
            this.move_cursor(0.3);
            break;
    }
    this.remove_all_duel_buttons(btn_hover);
    if (TouchInput.isTriggered()) {
        if (btn_hover == 0 && this.kamigamiGodAnimationCount > 300) {
            this.setNewGod();
        }
        if (btn_hover == 1) {
            SceneManager.exit()
        }
        if (btn_hover == 2) {
            AudioManager.playSe({ name: "success", pan: 0, pitch: 95, volume: 100 });
            this.phase = 6;
            this.btn_hover = 2;
            this.count_decision = 0;
        }
        if (btn_hover == 3) {
            AudioManager.playSe({ name: "success", pan: 0, pitch: 95, volume: 100 });
            this.phase = 6;
            this.btn_hover = 3;
            this.count_decision = 0;
        }
        if (btn_hover == 4) {
            AudioManager.playSe({ name: "success", pan: 0, pitch: 95, volume: 100 });
            this.phase = 6;
            this.btn_hover = 4;
            this.count_decision = 0;
            this.kamigami_frame_count = 0;
        }
        if (btn_hover != 0 && btn_hover != 4) {
            this.stop_animations();
        }
    }
    if (this.old_cursor != btn_hover) {
        this.old_cursor = btn_hover;
        if (this.old_cursor != 0)
            AudioManager.playSe({ name: "menu_select", pan: 0, pitch: 100, volume: 100 });
    }
};
//-----------------------------------------------------------------------------
// Function : remove_all_duel_buttons
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.remove_all_duel_buttons = function (hover) {
    if (hover != 1)
        this._textExitLight.opacity -= 20;
    if (hover != 2)
        this._textOnlineLight.opacity -= 20;
    if (hover != 3)
        this._textOfflineLight.opacity -= 20;
    if (hover != 4)
        this._textReturnLight.opacity -= 20;
};

//-----------------------------------------------------------------------------
// Function : updateDuelDecision
//-----------------------------------------------------------------------------
Scene_Main_Menu.prototype.updateDuelDecision = function () {
    switch (this.btn_hover) {
        case 2:
            if (this.count_decision % 2 == 0) {
                this._textOnlineLight.opacity += 51;
                if (this._textOnlineLight.opacity == 255)
                    this.count_decision++;
            }

            else {
                this._textOnlineLight.opacity -= 51;
                if (this._textOnlineLight.opacity == 0)
                    this.count_decision++;
            }
            this.move_cursor(-0.3);
            break;
        case 3:
            if (this.count_decision % 2 == 0) {
                this._textOfflineLight.opacity += 51;
                if (this._textOfflineLight.opacity == 255)
                    this.count_decision++;
            }

            else {
                this._textOfflineLight.opacity -= 51;
                if (this._textOfflineLight.opacity == 0)
                    this.count_decision++;
            }
            this.move_cursor(0);
            break;
        case 4:
            this.returnOptions();
            this.move_cursor(0.3);
            break;
    }
    if (this.count_decision == 15) {
        if (this.btn_hover == 4) {
            this.phase = 1;
            this.duelDecision = false;
        } else {
            this.phase = 3;
            this.tl.play();
            this.tl2.play();
            this.duelDecision = true;
        }
        this.kamigami_frame_count = 0;
    }

};
//-----------------------------------------------------------------------------
// Scene_Title
//
// The scene class of the title screen.

function Scene_Title() {
    this.initialize.apply(this, arguments);
}

Scene_Title.prototype = Object.create(Scene_Base.prototype);
Scene_Title.prototype.constructor = Scene_Title;
Graphics._paintUpperCanvas = function () {
    this._clearUpperCanvas();
    if (SceneManager._scene instanceof Scene_Title) {
        this._dsLogo = new Image();
        this._dsLogo.src = 'img/titles1/DSLogo.png';
        var context = Graphics._upperCanvas.getContext('2d');
        var dx = (Graphics._width - this._dsLogo.width) / 2;
        var dy = 100;
        var alpha = 1;
        context.save();
        context.globalAlpha = ((this._loadingCount - 20) / 30).clamp(0, 1);;
        context.drawImage(this._dsLogo, dx, dy);
        context.restore();
    }
    if (this._loadingImage && this._loadingCount >= 20) {
        var context = this._upperCanvas.getContext('2d');
        var dx = (this._width - this._loadingImage.width) / 2;
        var dy = (this._height - this._loadingImage.height) / 2;
        var alpha = ((this._loadingCount - 20) / 30).clamp(0, 1);
        context.save();
        context.globalAlpha = alpha;
        context.drawImage(this._loadingImage, dx, dy);
        context.restore();
    }
};

//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Title.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    
    //this.loadAllGameImages();
    this.createVariables();
    this.createBackground();
    this.create_displacement();
    this.createlogo();
    this.createTouch();
    this.create_fake_center();
};
//-----------------------------------------------------------------------------
// Function : createDSLogo
//-----------------------------------------------------------------------------
Scene_Boot.prototype.createDSLogo = function () {
    this._dsLogo = new Sprite();
    this._dsLogo.bitmap = ImageManager.loadTitle1("DSLogo")
    this.addChild(this._dsLogo)
    this._dsLogo.anchor.x = 0.5
    this._dsLogo.x = Graphics.width / 2
    this._dsLogo.y = 100
}


//-----------------------------------------------------------------------------
// Function : createVariables
//-----------------------------------------------------------------------------
Scene_Title.prototype.createVariables = function () {
    this.kamigami_frame_count = 0;
    this.phase = 0;
    this.up_tap = true;
};

//-----------------------------------------------------------------------------
// Function : createBackground
//-----------------------------------------------------------------------------
Scene_Title.prototype.createBackground = function () {
    this.container = new PIXI.Container();
    this._background = new Sprite(ImageManager.loadTitle1("Title_bg"));
    //this.container.addChild(this._background);
    this._background.opacity = 0;
    this._spriteset._baseSprite.addChild(this._background);
};

//-----------------------------------------------------------------------------
// Function : createBackground
//-----------------------------------------------------------------------------
Scene_Title.prototype.createlogo = function () {
    this._logo1 = new Sprite(ImageManager.loadTitle1("logo1"));
    //this.container.addChild(this._logo1);
    this._spriteset._baseSprite.addChild(this._logo1);
    this._logo2 = new Sprite(ImageManager.loadTitle1("logo2"));
    this.container.addChild(this._logo2);
    this._logo1.anchor.x = 0.5;
    this._logo1.anchor.y = 1;
    this._logo2.anchor.x = 0.5;
    this._logo2.anchor.y = 0;
    this._logo1.x = Graphics.width / 2;
    this._logo2.x = Graphics.width / 2;
    this._logo1.y = 400;
    this._logo2.y = 400;
    this._logo1.opacity = 0;
    this._logo2.opacity = 0;
};

//-----------------------------------------------------------------------------
// Function : createTouch
//-----------------------------------------------------------------------------
Scene_Title.prototype.createTouch = function () {
    this._splash = new Sprite(ImageManager.loadTitle1("title_splash_cursor"));
    this.addChild(this._splash);
    this._tap = new Sprite(ImageManager.loadTitle1("Tap"));
    this.addChild(this._tap);
    this._tap.anchor.x = 0.5;
    this._tap.anchor.y = 0.5;
    this._splash.anchor.x = 0.5;
    this._splash.anchor.y = 0.5;
    this._tap.x = Graphics.width / 2;
    this._splash.x = Graphics.width / 2 + 510;
    this._tap.y = 850;
    this._splash.y = 850;
    this._tap.opacity = 0;
    this._splash.opacity = 0;
};


//-----------------------------------------------------------------------------
// Function : create_displacement
//-----------------------------------------------------------------------------
Scene_Title.prototype.create_displacement = function () {

    this.addChild(this.container);
    this._displacement = new Sprite();
    this._displacement.bitmap = ImageManager.loadDisplacement("map7");
    this._displacement.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this._displacement.scale.set(2);
    this._displacement.anchor.set(0.5);
    this.container.addChild(this._displacement);
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this._displacement);
    this.container.filters = [this.displacementFilter];
    this.displacementFilter.scale.x = 0;
    this.displacementFilter.scale.y = 0;
    this.tl = new TimelineMax({ paused: true });
    this.tl.to(this.displacementFilter.scale, 8, { x: 0, y: -10000, ease: Expo.easeInOut });
    //this.tl.to(this.camera, 0, { autoAlpha: 1, ease: Expo.easeInOut }, "+=1");
    this.tl.timeScale(100);
    this.tl.play();
};
//-----------------------------------------------------------------------------
// Function : update
//-----------------------------------------------------------------------------
Scene_Title.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    this.kamigami_frame_count++;
    switch (this.phase) {
        case 0:
            this.updateOpacity();
            break;
        case 1:
            this.updateWaitTap();
            break;
        case 2:
            this.proceedToMenu();
            break;
    }
};


//-----------------------------------------------------------------------------
// Function : updateOpacity
//-----------------------------------------------------------------------------
Scene_Title.prototype.updateOpacity = function () {
    if (this.kamigami_frame_count == 3) {
        this.tl.timeScale(7);
        this.tl.reverse();
    }

    if (this._background.opacity < 255 && this.kamigami_frame_count > 30) {
        this._background.opacity += 5;
        this._logo1.opacity += 5;
        this._logo2.opacity += 5;
    }
    if (this.kamigami_frame_count == 50) {
        this._center_sprite.opacity = 0;
        this.emitter2 = fx.getParticleEmitter('bubbles');
        this.emitter2.init(this._center_sprite, true, 1);
        this._center_sprite.y = 1080;
        AudioManager.playBgm({ name: $dataKamigami.TitleMusic, pan: 0, pitch: 100, volume: 100 });
        this.volume = 0;
    }

    if (this._splash.opacity < 255 && this.kamigami_frame_count > 60) {
        this._splash.opacity += 5;
        this._splash.x -= 10;
        this._center_sprite.opacity += 1;
    }
    if (this._splash.opacity == 255) {
        this.phase = 1;
        this.kamigami_frame_count = 0;

    }
};

//-----------------------------------------------------------------------------
// Function : updateWaitTap
//-----------------------------------------------------------------------------
Scene_Title.prototype.updateWaitTap = function () {
    if (this.up_tap) {
        this._tap.opacity += 3;
        if (this._tap.opacity >= 190) {
            this.up_tap = false;
        }
    } else {
        this._tap.opacity -= 3;
        if (this._tap.opacity <= 70) {
            this.up_tap = true;
        }
    }

    if (TouchInput.isTriggered()) {
        this.phase = 2;
        AudioManager.playSe({ name: "success", pan: 0, pitch: 95, volume: 100 });
        this.kamigami_frame_count = 0;
    }
};

Scene_Title.prototype.create_fake_center = function () {
    this._center_sprite = new Sprite_Card();
    this._center_sprite.bitmap = ImageManager.loadTitle1("center_effects");
    this.addChild(this._center_sprite);
    this._center_sprite.x = Graphics.width / 2;
};

//-----------------------------------------------------------------------------
// Function : updateWaitTap
//-----------------------------------------------------------------------------
Scene_Title.prototype.proceedToMenu = function () {
    if (this._tap.opacity <= 190 && !this.flash_tap) {
        this.up_tap = false;
        this._tap.opacity += 3;
        this.flash_tap = true;
        this.kamigami_frame_count = 0;
        this.emitter2.stop();
        return;
    }
    if (this.kamigami_frame_count > 65) {
        this._tap.opacity -= 10;
        this._tap.x += 10;
        this._splash.opacity -= 10;
        this._logo1.x -= 14;
        this._logo1.y -= 4;
        this._logo1.scale.x -= 0.01;
        this._logo1.scale.y -= 0.01;
        this._logo2.x -= 14;
        this._logo2.y -= 4;
        this._logo2.scale.x -= 0.01;
        this._logo2.scale.y -= 0.01;
        this._center_sprite.opacity -= 5;
        if (this._logo1.scale.x <= 0.6) {
            this._logo1.scale.x = 0.6;
            this._logo1.scale.y = 0.6;
            this._logo2.scale.x = 0.6;
            this._logo2.scale.y = 0.6;
            this.phase = 3;
            SceneManager.goto(Scene_Main_Menu);
        }
        return;
    }

    if (this.up_tap) {
        this._tap.opacity += 40;
        if (this._tap.opacity >= 255) {
            this.up_tap = false;
        }
    } else {
        this._tap.opacity -= 40;
        if (this._tap.opacity <= 0) {
            this.up_tap = true;
        }
    }

};



