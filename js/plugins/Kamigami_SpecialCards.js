ImageManager.loadSpecialCards = function (filename, hue) {
    return this.loadBitmap('img/special_cards/', filename, hue, true);
};

var _specialCards_initialize = Scene_Kamigami_Duel.prototype.initialize;
//-----------------------------------------------------------------------------
// Function : initialize - initiates the graphics
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.initialize = function () {
    _specialCards_initialize.call(this);

};
//-----------------------------------------------------------------------------
// Function : createSpecialGodCard
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createSpecialGodCard = function () {
    this._big_card_front = new SpriteGod();
    //this._big_card_front.configureGod("big_zeus", 58);
    //this._big_card_front.x = Graphics.width / 2;
    //this._big_card_front.y = Graphics.height / 2;
    this._big_card_front.anchor.x = this._big_card_front.anchor.y = 0.5;

    this.specialCardCamera.addChild(this._big_card_front)
    this._big_card_front.convertTo3d()
};


//-----------------------------------------------------------------------------
// Function : createSpecialCard3d
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createSpecialCard3d = function () {
    this.specialCardCamera = new PIXI.projection.Camera3d();
    this.specialCardCamera.position.set(Graphics.width / 2, Graphics.height / 2);
    this.specialCardCamera.setPlanes(1400, 180, 10000, false);
    //this.specialCardCamera.euler.x = Math.PI / 5.5;
    this.addChild(this.specialCardCamera);
};

//-----------------------------------------------------------------------------
// Sprite_Cards
//
// The sprite for displaying a card in triple triad.

function SpriteGod(godName) {
    this.initialize.apply(this, arguments);
}
SpriteGod.prototype = Object.create(Sprite_Card.prototype);
SpriteGod.prototype.constructor = SpriteGod;

//-----------------------------------------------------------------------------
// Function : SpriteGod
//-----------------------------------------------------------------------------
SpriteGod.prototype.initialize = function () {
    Sprite_Card.prototype.initialize.call(this);
    this.maskInside = new PIXI.Graphics();
    this.maskInside.beginFill();
    this.maskInside.convertTo3d();
    this.maskInside.drawPolygon(-190, -220, 0, -250, 190, -220, 190, 250, -190, 250)
    //this.maskInside.drawRect(-180, -250, 380, 500);
    this.maskInside.endFill();
    this.loadBackLayer(this.maskInside)
    this.backSprite = new Sprite();
    this.addChild(this.backSprite)
    this.backSprite.mask = this.maskInside;
    this.loadGodLayer(this.maskInside)
    this.frontSprite = new Sprite();
    this.addChild(this.frontSprite)
    this.frontSprite.mask = this.maskInside;
    this.loadCardLayer()

    this.children.forEach(child => {
        child.convertTo3d();
    });
    this.maskInside.convertTo3d()
    this.countFrames = 0;
    this.motionType = 0;
    this.setWidthHeight()
    this.artist = new Sprite()
    this.createInfo();

};


//-----------------------------------------------------------------------------
// Function : closeAllImages
//-----------------------------------------------------------------------------
SpriteGod.prototype.setWidthHeight = function () {
    this.width = 440
    this.height = 668
};
//-----------------------------------------------------------------------------
// Function : closeAllImages
//-----------------------------------------------------------------------------
SpriteGod.prototype.closeAllImages = function () {
    this.imageLayerBack.bitmap = ImageManager.loadSpecialCards("");
    this.imageLayerCard.bitmap = ImageManager.loadSpecialCards("");
    this.imageBaseLayer.bitmap = ImageManager.loadSpecialCards("");
    this._big_card_front.bitmap = ImageManager.loadSpecialCards("");
    this._big_card_front.opacity = 255;
    this.frontSprite.opacity = 0;
    if (this.godLayers)
        for (let n = 0; n < this.godLayers.length; n++) {
            this.godLayers[n].bitmap = ImageManager.loadSpecialCards("");
            this.removeChild(this.godLayers[n])
        }
    this.backSprite.opacity = 0;
    if (this.emitter) {
        this.emitter.stop()
        this.emitter2.stop()
        this.emitter = null;
        this.emitter2 = null;
    }
    this.imageValues.forEach(element => {
        element.opacity = 0;
    });
};
//-----------------------------------------------------------------------------
// Function : loadCardValues
//-----------------------------------------------------------------------------
SpriteGod.prototype.loadCardValues = function (id) {
    let numSize = [23, 16, 21, 21, 26, 20, 23, 22, 23, 23]
    let costDevotion = Game_Kamigami.convertedCardList[id].costDevotion
    let addDevotion = Game_Kamigami.convertedCardList[id].addDevotion
    let cardType = Game_Kamigami.convertedCardList[id].cardType
    if (cardType == 2) {
        this.imageValues[3].x = 130
        this.imageValues[3].y = -326
        this.imageValues[3].opacity = 0;
        this.removeChild(this.imageValues[3])
        this.addChild(this.imageValues[3])
    } else if (cardType == 0) {
        this.imageValues[3].x = 144
        this.imageValues[3].y = -292
        this.imageValues[3].opacity = 255;
        this.removeChild(this.imageValues[3])
        this.addChild(this.imageValues[3])
    }
    if (cardType != 2) {
        this.imageValues[2].bitmap = ImageManager.loadSpecialCards("card_numbers_small")
        this.setSmallNumberFrame(this.imageValues[2], addDevotion % 10)
        this.imageValues[2].opacity = 255;
        this.imageValues[2].x = -170
        this.imageValues[2].y = -278
        this.removeChild(this.imageValues[2])
        this.addChild(this.imageValues[2])
        if (addDevotion <= 9) {
            this.imageValues[2].x -= 10
        }
    }
    if (costDevotion > 9) {
        this.imageValues[0].bitmap = ImageManager.loadSpecialCards("card_numbers_small")
        this.setSmallNumberFrame(this.imageValues[0], Math.floor(costDevotion / 10))
        this.imageValues[0].opacity = 255;
        this.removeChild(this.imageValues[0])
        this.addChild(this.imageValues[0])
        this.imageValues[0].x = 178
        this.imageValues[0].y = -278
    }
    if (cardType != 0) {
        this.imageValues[1].bitmap = ImageManager.loadSpecialCards("card_numbers_small")
        this.setSmallNumberFrame(this.imageValues[1], costDevotion % 10)
        this.imageValues[1].opacity = 255;
        this.imageValues[1].x = 178
        this.imageValues[1].y = -278
        this.removeChild(this.imageValues[1])
        this.addChild(this.imageValues[1])
        if (costDevotion <= 9) {
            this.imageValues[1].x -= 10
        }
    }
};

//-----------------------------------------------------------------------------
// Function : configureGod
//-----------------------------------------------------------------------------
SpriteGod.prototype.configureGod = function (godName, id = -1, noAnimation = false) {
    this._buttonCheckNeed = noAnimation || id == -1;
    if (this.oldGodname == godName && this.oldId == id) {
        return;
    }
    this.oldGodname = godName
    this.oldId = id

    if (!$dataKamigami.gameOptions.cardEffects) {
        noAnimation = true
    }
    if (this.text) {
        this.text.text = ""
    }
    if (this.textHeader && this.textHeader.bitmap) {
        this.textHeader.bitmap = null
    }

    if (this.artist.bitmap) {
        this.removeChild(this.artist)
        this.artist.bitmap.clear()
    }
    this.godName = godName;
    let specialCards = []
    specialCards = ["big_set", "big_hades", "big_hel", "big_loki", "big_odin", "big_ra", "big_thor", "big_isis", "big_izanami", "big_poseidon", "big_izanagi", "big_amaterasu", "big_zeus", "big_tsukiyomi"]
    this.closeAllImages();
    this.godLayers = []
    if (id >= 0) {
        //this.rankText.alpha = 1;
        let rank = ["rankS", "rankA", "rankB"]
        //this.rankSprite.bitmap = ImageManager.loadSpecialCards(rank[Math.floor(id / 150)])
    }

    if ((!specialCards.includes(godName) || id >= 150) || noAnimation || this.staticCard) {
        this.reorderCardLayer();
        this.loadGodBasicLayers(godName, id)
        if (id != -1) {
            this.loadCardValues(id)
            this.loadCardRealValues(id)
            this.writeCardText(id)
            this.writeArtistName(id)
            this.reloadInfoText()
        }
        return;
    }
    this.loadCardValues(id)
    this.loadCardRealValues(id)
    if (this.displacementFilterShockBG)
        this.displacementFilterShockBG.time = 2;
    this.containerBack.y = 0;
    this.containerBack.filters = []
    this.container.filters = []
    this._big_card_front.scale.y = 1;
    this.tl.to(this.displacementFilter.scale, 8, { x: 0, y: -3, ease: Expo.easeInOut });
    switch (godName) {
        case "big_set":
            this.setCard();
            break;
        case "big_hades":
            this.hadesCard();
            break;
        case "big_thor":
            this.thorCard();
            break;
        case "big_zeus":
            this.zeusCard();
            break;
        case "big_izanami":
            this.izanamiCard();
            break;
        case "big_poseidon":
            this.poseidonCard();
            break;
        case "big_izanagi":
            this.izanagiCard();
            break;
        case "big_amaterasu":
            this.amaterasuCard();
            break;
        case "big_tsukiyomi":
            this.tsukiyomiCard();
            break;
        case "big_isis":
            this.isisCard();
            break;
        case "big_ra":
            this.raCard();
            break;
        case "big_odin":
            this.odinCard();
            break;
        case "big_loki":
            this.lokiCard();
            break
        case "big_hel":
            this.helCard();
            break
        default:
            break;
    }
    for (let n = 0; n < 14; n++) {
        this.removeChild(this.imageValues[n])
        this.addChild(this.imageValues[n])
    }
    SceneManager._scene.removeChild(this.maskInside)
    SceneManager._scene.addChild(this.maskInside)
    this.countFrames = 0;
    this.writeCardText(id)
    this.writeArtistName(id)
    this.reloadInfoText()
};
//-----------------------------------------------------------------------------
// Function : loadGodBasicLayers
//-----------------------------------------------------------------------------
SpriteGod.prototype.loadGodBasicLayers = function (godName, id) {
    if (id != -1) {
        let card = new KamigamiCard()
        card.loadCardData(id, 0)
        let rank = ["_s", "_a", "_b"]
        let cardTemplate = ""
        let rankNum = rank[Math.floor(id / 150)]
        //this.rankSprite.bitmap = ImageManager.loadSpecialCards(rank[Math.floor(id / 150)])
        switch (card.cardType) {
            case 0:
                cardTemplate = "card_base_goddess"
                break;
            case 1:
                if (card.isDeity) {
                    cardTemplate = "card_base_deity"
                } else {
                    cardTemplate = "card_base_creature"
                }
                break;
            case 2:
                cardTemplate = "card_base_miracle"
                break;
            case 3:
                cardTemplate = "card_base_monument"
                break;
        }
        this.imageBaseLayer.bitmap = ImageManager.loadKamigami(cardTemplate + rankNum)
    }
    this.imageLayerCard.bitmap = ImageManager.loadKamigami(godName)
}

//-----------------------------------------------------------------------------
// Function : setCard
//-----------------------------------------------------------------------------
SpriteGod.prototype.setCard = function () {
    let godName = "Set"
    this.frontSprite.opacity = 150;
    this.backSprite.opacity = 255;
    this.imageLayerBack.bitmap = ImageManager.loadSpecialCards(godName + "_layer2")
    this.imageLayerCard.bitmap = ImageManager.loadKamigami("big_template_goddess")
    this._big_card_front.bitmap = ImageManager.loadSpecialCards(godName + "_god2")
    this.loadGodLayerExtras(this.maskInside, "Set_god")
    this.loadGodLayerExtras(this.maskInside, "Set_god1")
    this.removeChild(this.frontSprite)
    this.addChild(this.frontSprite)
    this.removeChild(this.imageLayerCard)
    this.addChild(this.imageLayerCard)
    this.createParticlesFront(godName);
    this.createParticlesBack(godName);
    this._displacement.bitmap = ImageManager.loadDisplacement("Heart");
    this._displacement.scale.set(1);
    this._displacement.anchor.set(0.5);
    this.tl.timeScale(0.1);
};

//-----------------------------------------------------------------------------
// Function : hadesCard
//-----------------------------------------------------------------------------
SpriteGod.prototype.hadesCard = function () {
    let godName = "Hades"
    this.frontSprite.opacity = 160;
    this.backSprite.opacity = 255;
    this.imageLayerBack.bitmap = ImageManager.loadSpecialCards(godName + "_layer2")
    this.imageLayerCard.bitmap = ImageManager.loadKamigami("big_template_god")
    this._big_card_front.bitmap = ImageManager.loadSpecialCards(godName + "_layer3")
    this.loadGodLayerExtras(this.maskInside, "hades_god")
    this.removeChild(this.frontSprite)
    this.addChild(this.frontSprite)
    this.removeChild(this.imageLayerCard)
    this.addChild(this.imageLayerCard)
    this.createParticlesFront(godName);
    this.createParticlesBack(godName);
    this._displacement.bitmap = ImageManager.loadDisplacement("Heart");
    this._displacement.scale.set(1);
    this._displacement.anchor.set(0.5);
    this.container.filters = [this.displacementFilter];
    this.tl.timeScale(0.1);
    this.tl.gotoAndPlay(0);
};
//-----------------------------------------------------------------------------
// Function : helCard
//-----------------------------------------------------------------------------
SpriteGod.prototype.helCard = function () {
    let godName = "Hel"
    this.frontSprite.opacity = 200;
    this.backSprite.opacity = 255;
    this.imageLayerBack.bitmap = ImageManager.loadSpecialCards(godName + "_layer2")
    this.imageLayerCard.bitmap = ImageManager.loadKamigami("big_template_goddess")
    this._big_card_front.bitmap = ImageManager.loadSpecialCards(godName + "_god")
    this.loadGodLayerExtras(this.maskInside, "Hel_god2")
    this.removeChild(this.container)
    this.addChild(this.container)
    //this.loadGodLayerExtras(this.maskInside, "Thor_god2")
    this.removeChild(this.frontSprite)
    this.addChild(this.frontSprite)
    this.loadGodLayerExtras(this.maskInside, "Hel_god1")
    this.removeChild(this.imageLayerCard)
    this.addChild(this.imageLayerCard)
    this.createParticlesFront(godName);
    this.createParticlesBack(godName);
    this._displacement.bitmap = ImageManager.loadDisplacement("map7");
    this.tl.to(this.displacementFilter.scale, 8, { x: -10, y: -250, ease: Expo.easeInOut });
    this.tl.timeScale(0.1)
    this.tl.gotoAndPlay(0)
    this._displacement.scale.set(1);
    this._displacement.anchor.set(0.5);
    this.container.filters = [this.displacementFilter];
};

//-----------------------------------------------------------------------------
// Function : lokiCard
//-----------------------------------------------------------------------------
SpriteGod.prototype.lokiCard = function () {
    let godName = "Loki"
    this.frontSprite.opacity = 160;
    this.backSprite.opacity = 255;
    this.imageLayerBack.bitmap = ImageManager.loadSpecialCards(godName + "_layer2")
    this.imageLayerCard.bitmap = ImageManager.loadKamigami("big_template_goddess")
    this._big_card_front.bitmap = ImageManager.loadSpecialCards(godName + "_god")
    this.createParticlesFront(godName);
    this.createParticlesBack(godName);
    this._displacement.bitmap = ImageManager.loadDisplacement("Heart");
    this._displacement.scale.set(1);
    this._displacement.anchor.set(0.5);
    this.tl.timeScale(0.1);
    this.displacementFilterShockBG = new ShockwaveFilter();
    //this.addChild(this._backSprite);
    this.container.filters = [this.displacementFilterShockBG];
    this.displacementFilterShockBG.time = 0;
    this.displacementFilterShockBG.center = [200, 200];
    this.displacementFilterShockBG.brightness = 0.9;
    this.displacementFilterShockBG.wavelength = 80;
    this.containerBack.filters = [this.displacementFilterBack];
    this.containerBack.y = 20;
};

//-----------------------------------------------------------------------------
// Function : odinCard
//-----------------------------------------------------------------------------
SpriteGod.prototype.odinCard = function () {
    let godName = "Odin"
    this.frontSprite.opacity = 160;
    this.backSprite.opacity = 255;
    this.imageLayerBack.bitmap = ImageManager.loadSpecialCards(godName + "_layer2")
    this.imageLayerCard.bitmap = ImageManager.loadKamigami("big_template_god")
    this._big_card_front.bitmap = ImageManager.loadSpecialCards(godName + "_god")
    this.createParticlesFront(godName);
    this.createParticlesBack(godName);
    this._displacement.bitmap = ImageManager.loadDisplacement("Heart");
    this._displacement.scale.set(1);
    this._displacement.anchor.set(0.5);
    this.container.filters = [this.displacementFilter];
    this.tl.timeScale(0.1)
    this.tl.gotoAndPlay(0)
};
//-----------------------------------------------------------------------------
// Function : raCard
//-----------------------------------------------------------------------------
SpriteGod.prototype.raCard = function () {
    let godName = "Ra"
    this.frontSprite.opacity = 150;
    this.backSprite.opacity = 255;
    this.imageLayerBack.bitmap = ImageManager.loadSpecialCards(godName + "_layer2")
    this.imageLayerCard.bitmap = ImageManager.loadKamigami("big_template_goddess")
    this._big_card_front.bitmap = ImageManager.loadSpecialCards(godName + "_god")
    this.createParticlesFront(godName);
    this.createParticlesBack(godName);
    this._displacement.bitmap = ImageManager.loadDisplacement("Heart");
    this._displacement.scale.set(1);
    this._displacement.anchor.set(0.5);
    this.container.filters = [this.displacementFilter];
    this.tl.timeScale(0.1)
    this.tl.gotoAndPlay(0)
};

//-----------------------------------------------------------------------------
// Function : thorCard
//-----------------------------------------------------------------------------
SpriteGod.prototype.thorCard = function () {
    let godName = "Thor"
    this.frontSprite.opacity = 100;
    this.backSprite.opacity = 55;
    this.imageLayerBack.bitmap = ImageManager.loadSpecialCards(godName + "_layer2")
    this.imageLayerCard.bitmap = ImageManager.loadKamigami("big_template_goddess")
    this._big_card_front.bitmap = ImageManager.loadSpecialCards(godName + "_god2")
    this.loadGodLayerExtras(this.maskInside, "Thor_god")
    this.loadGodLayerExtras(this.maskInside, "Thor_god1")
    //this.loadGodLayerExtras(this.maskInside, "Thor_god2")
    this.removeChild(this.frontSprite)
    this.addChild(this.frontSprite)
    this.removeChild(this.imageLayerCard)
    this.addChild(this.imageLayerCard)
    this.createParticlesFront(godName);
    this.createParticlesBack(godName);
    this._displacement.bitmap = ImageManager.loadDisplacement("map15");
    this._displacement.scale.set(6);
    this._displacement.anchor.set(0.5);
    this.tl.to(this.displacementFilter.scale, 8, { x: -10, y: -250, ease: Expo.easeInOut });
    this.tl.timeScale(1000)
    this.tl.gotoAndPlay(0)
    this.container.filters = [this.displacementFilter];
};
//-----------------------------------------------------------------------------
// Function : isisCard
//-----------------------------------------------------------------------------
SpriteGod.prototype.isisCard = function () {
    let godName = "Isis"
    this.frontSprite.opacity = 150;
    this.backSprite.opacity = 255;
    this.imageLayerBack.bitmap = ImageManager.loadSpecialCards(godName + "_layer2")
    this.imageLayerCard.bitmap = ImageManager.loadKamigami("big_template_goddess")
    this._big_card_front.bitmap = ImageManager.loadSpecialCards(godName + "_layer4")
    this.loadGodLayerExtras(this.maskInside, "Isis_god")
    let n = this.godLayers.length
    this.godLayers.push(new Sprite())
    this.godLayers[n].bitmap = ImageManager.loadSpecialCards("Isis_layer3")
    this.godLayers[n].anchor.x = 0.5;
    this.godLayers[n].anchor.y = 0.5;
    this.godLayers[n].mask = this.maskInside
    this.addChild(this.godLayers[n])
    this.removeChild(this.frontSprite)
    this.addChild(this.frontSprite)
    this.removeChild(this.imageLayerCard)
    this.addChild(this.imageLayerCard)
    this.createParticlesFront(godName);
    this.createParticlesBack(godName);
    this._displacement.bitmap = ImageManager.loadDisplacement("map15");
    this._displacement.scale.set(8);
    this._displacement.anchor.set(0.5);
    this.tl.to(this.displacementFilter.scale, 8, { x: -200, y: -10, ease: Expo.easeInOut });
    this.tl.timeScale(1000)
    this.tl.gotoAndPlay(0)
    this.container.filters = [this.displacementFilter];
};

//-----------------------------------------------------------------------------
// Function : tsukiyomiCard
//-----------------------------------------------------------------------------
SpriteGod.prototype.tsukiyomiCard = function () {
    let godName = "Tsukiyomi"
    this.frontSprite.opacity = 150;
    this.backSprite.opacity = 255;
    this.imageLayerBack.bitmap = ImageManager.loadSpecialCards(godName + "_layer2")
    this.imageLayerCard.bitmap = ImageManager.loadKamigami("big_template_goddess")
    this._big_card_front.bitmap = ImageManager.loadSpecialCards(godName + "_god")
    this.createParticlesFront(godName);
    this.createParticlesBack(godName);
    this._displacement.bitmap = ImageManager.loadDisplacement("Heart");
    this._displacement.scale.set(1);
    this._displacement.anchor.set(0.5);
    this.container.filters = [this.displacementFilter];
    this.tl.timeScale(0.1)
    this.tl.gotoAndPlay(0)
    this.containerBack.y = 20;
};

//-----------------------------------------------------------------------------
// Function : zeusCard
//-----------------------------------------------------------------------------
SpriteGod.prototype.zeusCard = function () {
    let godName = "Zeus"
    this.frontSprite.opacity = 50;
    this.backSprite.opacity = 255;
    this.imageLayerBack.bitmap = ImageManager.loadSpecialCards(godName + "_layer2")
    this.imageLayerCard.bitmap = ImageManager.loadKamigami("big_template_goddess")
    this._big_card_front.bitmap = ImageManager.loadSpecialCards(godName + "_god4")
    this.loadGodLayerExtras(this.maskInside, "Zeus_god3")
    this.loadGodLayerExtras(this.maskInside, "Zeus_god2")
    this.loadGodLayerExtras(this.maskInside, "Zeus_god1")
    this.removeChild(this.frontSprite)
    this.addChild(this.frontSprite)
    this.removeChild(this.imageLayerCard)
    this.addChild(this.imageLayerCard)
    this.createParticlesFront(godName);
    this.createParticlesBack(godName);
    this._displacement.bitmap = ImageManager.loadDisplacement("map15");
    this._displacement.scale.set(6);
    this._displacement.anchor.set(0.5);
    this.tl.to(this.displacementFilter.scale, 8, { x: -10, y: -250, ease: Expo.easeInOut });
    this.tl.timeScale(1000)
    this.tl.gotoAndPlay(0)
    this.container.filters = [this.displacementFilter];
};

//-----------------------------------------------------------------------------
// Function : amaterasuCard
//-----------------------------------------------------------------------------
SpriteGod.prototype.amaterasuCard = function () {
    let godName = "Amaterasu"
    this.frontSprite.opacity = 255;
    this.backSprite.opacity = 255;
    this.imageLayerBack.bitmap = ImageManager.loadSpecialCards(godName + "_layer2")
    this.imageLayerCard.bitmap = ImageManager.loadKamigami("big_template_goddess")
    this._big_card_front.bitmap = ImageManager.loadSpecialCards(godName + "_god")
    this.createParticlesFront(godName);
    this.createParticlesBack(godName);
    this._displacement.bitmap = ImageManager.loadDisplacement("Heart");
    this._displacement.scale.set(1);
    this._displacement.anchor.set(0.5);
    this.container.filters = [this.displacementFilter];
    this.tl.timeScale(0.1)
    this.tl.gotoAndPlay(0)
};

//-----------------------------------------------------------------------------
// Function : izanamiCard
//-----------------------------------------------------------------------------
SpriteGod.prototype.izanamiCard = function () {
    let godName = "Izanami"
    this.frontSprite.opacity = 255;
    this.backSprite.opacity = 50;
    this.imageLayerBack.bitmap = ImageManager.loadSpecialCards(godName + "_layer2")
    this.imageLayerCard.bitmap = ImageManager.loadKamigami("big_template_goddess")
    this._big_card_front.bitmap = ImageManager.loadSpecialCards(godName + "_god")
    this.createParticlesFront(godName);
    this.createParticlesBack(godName);
};

//-----------------------------------------------------------------------------
// Function : poseidonCard
//-----------------------------------------------------------------------------
SpriteGod.prototype.poseidonCard = function () {
    let godName = "Poseidon"
    this.frontSprite.opacity = 255;
    this.backSprite.opacity = 255;
    this.imageLayerBack.bitmap = ImageManager.loadSpecialCards(godName + "_layer2")
    this.imageLayerCard.bitmap = ImageManager.loadKamigami("big_template_goddess")
    this._big_card_front.bitmap = ImageManager.loadSpecialCards(godName + "_god")
    this.createParticlesFront(godName);
    this.createParticlesBack(godName);
    this._displacement.bitmap = ImageManager.loadDisplacement("12");
    this._displacement.scale.set(10);
    this._displacement.anchor.set(0.5);
    this.container.filters = [this.displacementFilter];
    this.tl.timeScale(0.1)
    this.tl.gotoAndPlay(0)
};

//-----------------------------------------------------------------------------
// Function : izanagiCard
//-----------------------------------------------------------------------------
SpriteGod.prototype.izanagiCard = function () {
    let godName = "Izanagi"
    this.frontSprite.opacity = 255;
    this.backSprite.opacity = 80;
    this.imageLayerBack.bitmap = ImageManager.loadSpecialCards(godName + "_layer2")
    this.imageLayerCard.bitmap = ImageManager.loadKamigami("big_template_goddess")
    this._big_card_front.bitmap = ImageManager.loadSpecialCards(godName + "_god2")
    this.loadGodLayerExtras(this.maskInside, "Izanagi_god")
    this.loadGodLayerExtras(this.maskInside, "Izanagi_god1")
    this.removeChild(this.frontSprite)
    this.addChild(this.frontSprite)
    this.removeChild(this.imageLayerCard)
    this.addChild(this.imageLayerCard)
    this.createParticlesFront(godName);
    this.createParticlesBack(godName);
    this._displacement.bitmap = ImageManager.loadDisplacement("12");
    this._displacement.scale.set(10);
    this._displacement.anchor.set(0.5);
    this.container.filters = [this.displacementFilter];
    this.tl.timeScale(0.1)
    this.tl.gotoAndPlay(0)
};

//-----------------------------------------------------------------------------
// Function : createParticlesFront
//-----------------------------------------------------------------------------
SpriteGod.prototype.createParticlesFront = function (godName) {
    switch (godName) {
        case "Set":
            this.emitter = fx.getEffectSequence('duel-egypt-card');
            this.emitter.init(this.frontSprite, true, 0.2);
            this.emitter.y = 0;
            this.emitter.x = -200;
            break;
        case "Hel":
            this.emitter = fx.getParticleEmitter('top-hel');
            this.emitter.init(this.frontSprite, true, 1.5);
            this.emitter.y = 75;
            this.emitter.x = 20;
            break;
        case "Hades":
            this.emitter = fx.getParticleEmitter('Hades-card2');
            this.emitter.init(this.frontSprite, true, 4);
            this.emitter.y = 65;
            this.emitter.x = -70;
            this.frontSprite.opacity = 100
            break;
        case "Odin":
            this.emitter = fx.getParticleEmitter('odin-card');
            this.emitter.init(this.frontSprite, true, 1);
            this.emitter.y = -200;
            this.frontSprite.opacity = 255
            break;
        case "Izanagi":
            this.emitter = fx.getEffectSequence('duel-japanese-card');
            this.emitter.init(this.frontSprite, true, 0.5);
            this.emitter.y = -300;
            break;
        case "Zeus":
            this.emitter = fx.getParticleEmitter('magic-comet');
            this.emitter.init(this.frontSprite, true, 2);
            this.emitter.y = 150;
            break;
        case "Izanami":
            this.emitter = fx.getParticleEmitter('Skulls');
            this.emitter.init(this.frontSprite, true, 1);
            this.emitter.y = 100;
            break;
        case "Poseidon":
            this.emitter = fx.getParticleEmitter('fairy-dust-sub2');
            this.emitter.init(this.frontSprite, true, 1);
            this.emitter.y = -80;
            break;
        case "Amaterasu":
            this.emitter = fx.getParticleEmitter('side-torch');
            this.emitter.init(this.frontSprite, true, 2);
            this.emitter.y = 250;
            break;
        case "Isis":
            this.emitter = fx.getParticleEmitter('bubbles');
            this.emitter.init(this.frontSprite, true, 1);
            this.emitter.y = 100;
            break;
        case "Tsukiyomi":
            this.emitter = fx.getParticleEmitter('grenade-continuos');
            this.emitter.init(this.frontSprite, true, 1);
            this.emitter.y = 70;
            this.emitter.x = 200;
            break;
        case "Thor":
            this.emitter = fx.getParticleEmitter('plasma-sphere');
            this.emitter.init(this.frontSprite, true, 2);
            this.emitter.y = -50;
            this.emitter.x = 0;
            break;
        case "Ra":
            this.emitter = fx.getParticleEmitter('side-teleporter-field-loop');
            this.emitter.init(this.frontSprite, true, 2);
            this.emitter.y = 0;
            this.emitter.x = 0;
            this.emitter.rotation = Math.PI / 4
            break;
        case "Loki":
            this.emitter = fx.getParticleEmitter('plasma-sphere');
            this.emitter.init(this.frontSprite, true, 2);
            this.emitter.y = -50;
            this.emitter.x = 0;
            break;
        default:
            break;
    }
};

//-----------------------------------------------------------------------------
// Function : createParticlesBack
//-----------------------------------------------------------------------------
SpriteGod.prototype.createParticlesBack = function (godName) {
    switch (godName) {
        case "Set":
            this.emitter2 = fx.getEffectSequence('duel-egypt-card');
            this.emitter2.init(this.backSprite, true, 0.2);
            this.emitter2.y = 0;
            this.emitter2.x = -200;
            break;
        case "Hel":
            this.emitter2 = fx.getParticleEmitter('Hel-card');
            this.emitter2.init(this.backSprite, true, 1);
            this.emitter2.y = -100;
            this.emitter2.x = -100;
            break;
        case "Loki":
            this.emitter2 = fx.getParticleEmitter('EndGameText');
            this.emitter2.init(this.backSprite, true, 1);
            this.emitter2.y = -70;
            break;
        case "Thor":
            this.emitter2 = fx.getParticleEmitter('thor');
            this.emitter2.init(this.backSprite, true, 1);
            this.emitter2.y = 0;

            break;
        case "Odin":
            this.emitter2 = fx.getParticleEmitter('odin-card-2');
            this.emitter2.init(this.backSprite, true, 1.7);
            this.emitter2.y = -70
            break;
        case "Isis":
            this.emitter2 = fx.getParticleEmitter('Isis-card');
            this.emitter2.init(this.backSprite, true, 1);
            this.emitter2.y = -300;
            break;
        case "Izanami":
            this.emitter2 = fx.getParticleEmitter('plasma-sphere');
            this.emitter2.init(this.backSprite, true, 2.5);
            this.emitter2.y = 0;
            break;
        case "Izanagi":
            this.emitter2 = fx.getParticleEmitter('Izanagi-card');
            this.emitter2.init(this.backSprite, true, 1);
            this.emitter2.y = 0;
            break;
        case "Zeus":
            this.emitter2 = fx.getParticleEmitter('Zeus-card');
            this.emitter2.init(this.backSprite, true, 1);
            this.emitter2.y = -100;
            break;
        case "Poseidon":
            this.emitter2 = fx.getParticleEmitter('Poseidon-card');
            this.emitter2.init(this.backSprite, true, 2);
            this.emitter2.y = 0;
            break;
        case "Amaterasu":
            this.emitter2 = fx.getParticleEmitter('full-fire-arc');
            this.emitter2.init(this.backSprite, true, 0.7);
            this.emitter2.y = -40;
            break;
        case "Tsukiyomi":
            this.emitter2 = fx.getParticleEmitter('side-teleporter-field-loop');
            this.emitter2.init(this.backSprite, true, 5);
            this.emitter2.y = -40;
            break;
        case "Ra":
            this.emitter2 = fx.getParticleEmitter('Lighteeeee');
            this.emitter2.init(this.backSprite, true, 1);
            this.emitter2.y = -130;
            break;
        case "Hades":
            this.emitter2 = fx.getParticleEmitter('top-spaceship-engine');
            this.emitter2.init(this.backSprite, true, 4);
            this.emitter2.y = 85;
            this.emitter2.x = -70;
            break;
        default:
            break;
    }
};

//-----------------------------------------------------------------------------
// Function : changeEuler
//-----------------------------------------------------------------------------
SpriteGod.prototype.changeEuler = function (cameraX, cameraY) {
    //this._buttonCheckNeed = true
    let x = cameraX - TouchInput.x
    let y = TouchInput.y - cameraY
    this.euler.y = x / 3000
    this.euler.x = y / 1920
    this.maskInside.euler.y = this.euler.y
    //this.maskInside.euler.x = this.euler.x
};
//-----------------------------------------------------------------------------
// Function : changeEuler
//-----------------------------------------------------------------------------
SpriteGod.prototype.changeEulerSmooth = function (cameraX, cameraY) {
    let x = cameraX - TouchInput.x
    let y = TouchInput.y - cameraY
    let eulerChange = [x / 3000 - this.euler.y, y / 1920 - this.euler.x]
    if (eulerChange[0] > 0.03) {
        eulerChange[0] = 0.03
    }
    if (eulerChange[1] > 0.03) {
        eulerChange[1] = 0.03
    }
    if (eulerChange[0] < -0.03) {
        eulerChange[0] = -0.03
    }
    if (eulerChange[1] < -0.03) {
        eulerChange[1] = -0.03
    }
    this.euler.y += eulerChange[0]
    this.euler.x += eulerChange[1]

    this.maskInside.euler.y = this.euler.y
};

//-----------------------------------------------------------------------------
// Function : SpriteGod
//-----------------------------------------------------------------------------
SpriteGod.prototype.update = function (cameraX = SceneManager._scene.specialCardCamera.x, cameraY = SceneManager._scene.specialCardCamera.y) {
    Sprite_Card.prototype.update.call(this);

    this.countFrames++;
    if (this.countFrames > 1200) {
        this.countFrames -= 1200
    }
    this.maskInside.x = cameraX;
    this.maskInside.y = cameraY;
    this._displacement.y = Math.sin(this.countFrames * Math.PI / 600) * 300
    this._displacement.x = Math.cos(this.countFrames * Math.PI / 600) * 300
    if (this.oldId < 120)
        this.updateGodMovement();
    this.updateCheckButton();
};
//-----------------------------------------------------------------------------
// Function : updateGodMovement
//-----------------------------------------------------------------------------
SpriteGod.prototype.updateGodMovement = function () {
    let scaleGods = ["big_hades", "big_odin", "big_amaterasu", "big_tsukiyomi", "big_ra"]
    let scaleGodsBack = ["big_zeus", "big_tsukiyomi", "big_loki", "big_isis"]
    if (scaleGods.includes(this.godName)) {
        this.moveGodScaleLayer(this._big_card_front);
    }
    if (this.godName == "big_hel") {
        this.playSpecialHelCard();
        this.moveGodScaleLayer(this.godLayers[0], this.godLayers[1]);
    }
    if (this.godName == "big_thor") {
        this.moveGodScaleLayer(this.godLayers[0]);
    }
    if (scaleGodsBack.includes(this.godName)) {
        this.moveBackDisplacement();
    }
    if (this.godName == "big_loki") {
        this.playShockwaveGod();
    }
    if (this.godName == "big_zeus" || this.godName == "big_thor") {
        this.playSpecialZeusCard();
    }
    if (this.godName == "big_izanagi") {
        this.playSpecialIzanagiCard();
    }
    if (this.godName == "big_set") {
        this.playSpecialSetCard();
    }

    if (this.godName == "big_hades") {
        this.playSpecialHadesCard();
    }
    if (this.godName == "big_isis") {
        this.playSpecialIsisCard();
    }
};
//-----------------------------------------------------------------------------
// Function : playSpecialHelCard
//-----------------------------------------------------------------------------
SpriteGod.prototype.playSpecialHelCard = function () {
    if (!this.godLayers[0]) {
        return;
    }
    if (this.countFrames == 550 || this.countFrames == 1150) {
        let animation = $dataAnimations[138];
        this.godLayers[0].startAnimation(animation, false, 0);
    }

    if (this.countFrames > 0 && this.countFrames < 27) {
        this.godLayers[1].opacity -= 10;
        this.godLayers[0].opacity -= 10;
    }

    if (this.countFrames > 600 && this.countFrames < 627) {
        this.godLayers[1].opacity += 10;
        this.godLayers[0].opacity += 10;
    }
}

//-----------------------------------------------------------------------------
// Function : playSpecialIsisCard
//-----------------------------------------------------------------------------
SpriteGod.prototype.playSpecialIsisCard = function () {
    let frame = this.countFrames % 120;
    if (this.emitter2)
        this.emitter2.rotation = (1 - frame / 60) / 2;
};

//-----------------------------------------------------------------------------
// Function : playSpecialHadesCard
//-----------------------------------------------------------------------------
SpriteGod.prototype.playSpecialHadesCard = function () {
    if (this.countFrames % 120 < 60) {
        this._big_card_front.opacity -= 5
    } else {
        this._big_card_front.opacity += 5
    }
};

//-----------------------------------------------------------------------------
// Function : playSpecialZeusCard
//-----------------------------------------------------------------------------
SpriteGod.prototype.playSpecialZeusCard = function () {
    this.countFrames += 2
    if (this.countFrames % 15 == 0 && this.godLayers != [] && this.godLayers[1] != undefined)
        if (this.godLayers[1].opacity == 255) {
            this.godLayers[1].opacity = 100
        } else {
            this.godLayers[1].opacity = 255
        }
};
//-----------------------------------------------------------------------------
// Function : playSpecialIzanagiCard
//-----------------------------------------------------------------------------
SpriteGod.prototype.playSpecialIzanagiCard = function () {
    this.countFrames += 2
    if (this.countFrames < 600 && this.godLayers != [] && this.godLayers[1] != undefined) {
        this._big_card_front.opacity += 3
        this.godLayers[1].opacity += 3
    }
    if (this.countFrames > 600 && this.godLayers != [] && this.godLayers[1] != undefined) {
        this._big_card_front.opacity -= 3
        this.godLayers[1].opacity -= 3
    }
    if (this.godLayers[0])
        switch (this.motionType) {
            case 0:
                this.godLayers[0].scale.y += 0.0002;
                if (this.godLayers[0].scale.y > 1.02) {
                    this.motionType = 1
                }
                break;
            case 1:
                this.godLayers[0].scale.y -= 0.0002;
                if (this.godLayers[0].scale.y <= 1) {
                    this.motionType = 0
                }
                break;
        }
};

//-----------------------------------------------------------------------------
// Function : playSpecialSetCard
//-----------------------------------------------------------------------------
SpriteGod.prototype.playSpecialSetCard = function () {
    this.countFrames += 9
    if (this.countFrames % 50 == 0)
        if (this._big_card_front.opacity == 145) {
            this._big_card_front.opacity = 70
        } else {
            this._big_card_front.opacity = 145
        }
    if (this.countFrames < 600 && this.godLayers != [] && this.godLayers[1] != undefined) {
        this.godLayers[1].opacity += 5
    }
    if (this.countFrames > 600 && this.godLayers != [] && this.godLayers[1] != undefined) {
        this.godLayers[1].opacity -= 5
    }
    if (this.godLayers[0])
        switch (this.motionType) {
            case 0:
                this.godLayers[0].scale.y += 0.0002;
                if (this.godLayers[0].scale.y > 1.02) {
                    this.motionType = 1
                }
                break;
            case 1:
                this.godLayers[0].scale.y -= 0.0002;
                if (this.godLayers[0].scale.y <= 1.0) {
                    this.motionType = 0
                }
                break;
        }
};

//-----------------------------------------------------------------------------
// Function : moveBackDisplacement
//-----------------------------------------------------------------------------
SpriteGod.prototype.playShockwaveGod = function () {
    if (this.displacementFilterShockBG)
        switch (this.motionType) {
            case 0:
                this.displacementFilterShockBG.time += 0.03 * Math.random();
                if (this.displacementFilterShockBG.time > 1) {
                    this.motionType = 1
                }
                break;
            case 1:
                this.displacementFilterShockBG.time -= 0.03 * Math.random();
                if (this.displacementFilterShockBG.time <= 0) {
                    this.motionType = 0
                }
                break;
            default:
                break;
        }
};

//-----------------------------------------------------------------------------
// Function : moveBackDisplacement
//-----------------------------------------------------------------------------
SpriteGod.prototype.moveBackDisplacement = function () {
    if (this.addMotionBack) {
        this._displacementBack.x++;
        if (this._displacementBack.x >= 0) {
            this.addMotionBack = false;
        }
    } else {
        this._displacementBack.x--;
        if (this._displacementBack.x <= -200) {
            this.addMotionBack = true;
        }
    }
};

//-----------------------------------------------------------------------------
// Function : moveGodScaleLayer
//-----------------------------------------------------------------------------
SpriteGod.prototype.moveGodScaleLayer = function (sprite, sprite2 = false) {
    if (!sprite) { return }
    switch (this.motionType) {
        case 0:
            sprite.scale.y += 0.0002;
            if (sprite2) { sprite2.y += 0.1; }
            if (sprite.scale.y > 1.02) {
                this.motionType = 1
            }
            break;
        case 1:
            sprite.scale.y -= 0.0002;
            if (sprite2) { sprite2.y -= 0.1; }
            if (sprite.scale.y <= 1) {
                this.motionType = 0
            }
            break;
        default:
            break;
    }
};

//-----------------------------------------------------------------------------
// Function : loadBackLayer
//-----------------------------------------------------------------------------
SpriteGod.prototype.loadBackLayer = function (mask) {
    this.containerBack = new PIXI.Container();
    this.imageLayerBack = new Sprite()
    this.imageLayerBack.mask = mask;
    this.imageLayerBack.anchor.x = this.imageLayerBack.anchor.y = 0.5;
    this.containerBack.addChild(this.imageLayerBack)
    this._displacementBack = new Sprite();
    this._displacementBack.bitmap = ImageManager.loadDisplacement("1");
    this._displacementBack.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this._displacementBack.scale.set(1);
    this._displacementBack.anchor.set(0.5);
    this.containerBack.addChild(this._displacementBack);
    this.displacementFilterBack = new PIXI.filters.DisplacementFilter(this._displacementBack);
    this.containerBack.filters = [];
    this.displacementFilterBack.scale.x = 1;
    this.displacementFilterBack.scale.y = 1;
    this.tlBack = new TimelineMax({ paused: true });
    this.tlBack.to(this.displacementFilterBack.scale, 8, { x: 0, y: -80, ease: Expo.easeInOut });
    this.tlBack.timeScale(50);
    this.tlBack.play();
    this.addMotionBack = true;
    this.addChild(this.containerBack)
}

//-----------------------------------------------------------------------------
// Function : loadCardLayer
//-----------------------------------------------------------------------------
SpriteGod.prototype.loadCardTemplateLayer = function () {
    this.imageBaseLayer = new Sprite()
    this.addChild(this.imageBaseLayer)
    this.imageBaseLayer.anchor.x = this.imageBaseLayer.anchor.y = 0.5;
}

//-----------------------------------------------------------------------------
// Function : loadCardLayer
//-----------------------------------------------------------------------------
SpriteGod.prototype.loadCardLayer = function () {
    this.imageLayerCard = new Sprite()
    this.addChild(this.imageLayerCard)
    this.imageLayerCard.anchor.x = this.imageLayerCard.anchor.y = 0.5;
    this.loadCardTemplateLayer()
    this.imageValues = new Array(14);
    for (let n = 0; n < 14; n++) {
        this.imageValues[n] = new Sprite()
        this.addChild(this.imageValues[n])
        this.imageValues[n].opacity = 0;
        switch (n) {
            case 0:
                this.imageValues[n].anchor.x = 1
                break;
            case 13:
            case 12:
            case 2:
                this.imageValues[n].anchor.x = 0.5
                break;
            default:
                this.imageValues[n].anchor.x = 0
                break;
        }
    }
    this.imageValues[3] = new Sprite()
    this.imageValues[3].bitmap = ImageManager.loadSpecialCards("cardNum_null")
    this.addChild(this.imageValues[3])
    this.imageValues[3].opacity = 0
}
//-----------------------------------------------------------------------------
// Function : loadCardLayer
//-----------------------------------------------------------------------------
SpriteGod.prototype.reorderCardLayer = function () {
    this.removeChild(this.imageLayerCard)
    this.addChild(this.imageLayerCard)
    this.removeChild(this.imageBaseLayer)
    this.addChild(this.imageBaseLayer)
    for (let n = 0; n < 14; n++) {
        this.removeChild(this.imageValues[n])
        this.addChild(this.imageValues[n])
    }
}
//-----------------------------------------------------------------------------
// Function : loadGodLayer
//-----------------------------------------------------------------------------
SpriteGod.prototype.loadGodLayerExtras = function (mask, bitmap) {
    let n = this.godLayers.length
    this.godLayers.push(new Sprite())
    this.godLayers[n].bitmap = ImageManager.loadSpecialCards(bitmap)
    this.godLayers[n].anchor.x = 0.5;
    this.godLayers[n].anchor.y = 0.5;
    this.godLayers[n].mask = mask
    this.addChild(this.godLayers[n])
};
//-----------------------------------------------------------------------------
// Function : loadGodLayer
//-----------------------------------------------------------------------------
SpriteGod.prototype.loadGodLayer = function (mask) {
    this.container = new PIXI.Container();
    this._big_card_front = new Sprite()
    this.addChild(this.container)
    this._big_card_front.anchor.x = 0.5;
    this._big_card_front.anchor.y = 0.5;
    this._big_card_front.mask = mask
    this.container.addChild(this._big_card_front)
    this._displacement = new Sprite();
    this._displacement.bitmap = ImageManager.loadDisplacement("HeartB");
    this._displacement.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this._displacement.scale.set(0.25);
    this._displacement.anchor.set(0.5);
    this.container.addChild(this._displacement);
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this._displacement);
    this.container.filters = [this.displacementFilter];
    this.displacementFilter.scale.x = 1;
    this.displacementFilter.scale.y = 1;
    this.tl = new TimelineMax({ paused: true });
    this.tl.to(this.displacementFilter.scale, 8, { x: 0, y: -3, ease: Expo.easeInOut });
    //this.tl.to(this.camera, 0, { autoAlpha: 1, ease: Expo.easeInOut }, "+=1");
    this.tl.timeScale(0.8);
    this.tl.play();
    this.addMotion = true;
}
//-----------------------------------------------------------------------------
// Function : writeArtistName
//-----------------------------------------------------------------------------
SpriteGod.prototype.writeArtistName = function (id) {
    this.artist.bitmap = new Bitmap(100, 30)
    this.artist.bitmap.fontFace = "Inria Sans"
    this.artist.bitmap._baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
    this.artist.bitmap.fontSize = 16
    this.artist.bitmap.textColor = "#FFFFFF"
    this.artist.bitmap.outlineWidth = 3
    this.artist.rotation = -Math.PI / 2
    this.artist.convertTo3d()
    let artist = Game_Kamigami.convertedCardList[id].artist
    this.artist.bitmap.drawText(artist, 0, 0, 100, 30, 'left')
    this.addChild(this.artist)
    this.artist.x = 135
    this.artist.y = -25
}

//-----------------------------------------------------------------------------
// Function : writeCardText
//-----------------------------------------------------------------------------
SpriteGod.prototype.writeCardText = function (id) {
    id = id % 150
    let text = IAVRA.I18N.localize("#{DuelVocab.Cards." + id + "}").split("\n")
    if (text == "undefined") {
        return
    }
    if (this.text) {
        this.removeChild(this.text)
        this.text.destroy()
    }
    if (this.textHeader) {
        this.removeChild(this.textHeader)
        this.textHeader.destroy()
    }
    let baseText = text.length > 1 ? text[1] : text[0]
    this.text = new PIXI.Text(baseText, { fontFamily: 'Overpass', fontSize: 20, fill: 0x262130, align: 'center', wordWrap: true, wordWrapWidth: 290, lineHeight: 24 });
    this.text.anchor.x = 0.5
    this.text.y = 120 + text.length * 30
    this.text.convertTo3d()
    this.textHeader = new Sprite();
    if (text.length > 1) {
        this.textHeader.convertTo3d()
        let y = 170
        this.textHeader.anchor.x = this.textHeader.anchor.y = 0.5
        this.textHeader.bitmap = new Bitmap(400, 600)
        this.textHeader.y = 0
        this.textHeader.bitmap.fontFace = "Overpass"
        this.textHeader.bitmap.fontSize = 22
        this.textHeader.bitmap.textColor = "#262130"
        this.textHeader.bitmap.outlineWidth = 0
        this.textHeader.bitmap.drawText(text[0], 0, y, 400, 600, 'center')
    
        this.textHeader.bitmap._baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
    }

    this.addChild(this.text)
    this.addChild(this.textHeader)
}

//-----------------------------------------------------------------------------
// Function : loadCardRealValues
//-----------------------------------------------------------------------------
SpriteGod.prototype.loadCardRealValues = function (id) {

    if (id == -1) {
        return
    }
    let card = new KamigamiCard()
    card.loadCardData(id, 0);
    this.loadAttackCost(card)
    this.loadMovementCost(card)
    this.loadAttackValues(card)
    this.loadTotalHPValues(card)
    this.loadCardName(card)
    this.loadCardCivilization(card)
}
//-----------------------------------------------------------------------------
// Function : loadCardCivilization
//-----------------------------------------------------------------------------
SpriteGod.prototype.loadCardCivilization = function (card) {
    this.imageValues[13].opacity = 255
    this.imageValues[13].y = 100
    this.imageValues[13].bitmap = ImageManager.loadSpecialCards("card_icons_civ")
    this.imageValues[13].setFrame(card.specialType * 35, 0, 35, 35)
}
//-----------------------------------------------------------------------------
// Function : setSmallNumberFrame
//-----------------------------------------------------------------------------
SpriteGod.prototype.setSmallNumberFrame = function (sprite, number) {
    let numPositions = [0, 23, 39, 60, 81, 107, 127, 150, 172, 195]
    let numSize = [23, 16, 21, 21, 26, 20, 23, 22, 23, 23]
    sprite.setFrame(numPositions[number], 0, numSize[number], 40);

}
//-----------------------------------------------------------------------------
// Function : setLargeNumberFrame
//-----------------------------------------------------------------------------
SpriteGod.prototype.setLargeNumberFrame = function (sprite, number) {
    let numPositions = [0, 30, 51, 78, 105, 140, 168, 199, 229, 260]
    let numSize = [30, 21, 27, 27, 35, 28, 31, 30, 31, 30]
    sprite.setFrame(numPositions[number], 0, numSize[number], 54);

}
//-----------------------------------------------------------------------------
// Function : loadAttackCost
//-----------------------------------------------------------------------------
SpriteGod.prototype.loadAttackCost = function (card) {
    let numSize = [23, 16, 21, 21, 26, 20, 23, 22, 23, 23]
    this.imageValues[4].y = -5
    this.imageValues[5].y = -5
    if (Math.floor(card.attackCost / 10) > 0) {
        this.imageValues[4].bitmap = ImageManager.loadSpecialCards("card_numbers_small")
        this.setSmallNumberFrame(this.imageValues[4], Math.floor(card.attackCost / 10))
        this.imageValues[4].opacity = 255
        this.imageValues[4].x = -195
    } else {
        this.imageValues[4].opacity = 0
    }
    if (card.attackCost == 0) {
        this.imageValues[5].opacity = 0
    } else {
        this.imageValues[5].bitmap = ImageManager.loadSpecialCards("card_numbers_small")
        this.setSmallNumberFrame(this.imageValues[5], card.attackCost % 10)
        this.imageValues[5].opacity = 255
        this.imageValues[5].x = -195 + numSize[Math.floor(card.attackCost / 10)]
    }
    if (card.attackCost < 10) {
        this.imageValues[5].x = -188
    }
}

//-----------------------------------------------------------------------------
// Function : loadMovementCost
//-----------------------------------------------------------------------------
SpriteGod.prototype.loadMovementCost = function (card) {
    let numSize = [23, 16, 21, 21, 26, 20, 23, 22, 23, 23]
    this.imageValues[6].y = -5
    this.imageValues[7].y = -5
    if (Math.floor(card.moveCost / 10) > 0) {
        this.imageValues[6].bitmap = ImageManager.loadSpecialCards("card_numbers_small")
        this.setSmallNumberFrame(this.imageValues[6], Math.floor(card.moveCost / 10))
        this.imageValues[6].opacity = 255
        this.imageValues[6].x = 163
    } else {
        this.imageValues[6].opacity = 0
    }
    if (card.moveCost == 0) {
        this.imageValues[7].opacity = 0
    } else {
        this.imageValues[7].bitmap = ImageManager.loadSpecialCards("card_numbers_small")
        this.setSmallNumberFrame(this.imageValues[7], card.moveCost % 10)
        this.imageValues[7].opacity = 255
        this.imageValues[7].x = 163 + numSize[Math.floor(card.moveCost / 10)]
    }
    if (card.moveCost < 10) {
        this.imageValues[7].x = 168
    }
}
//-----------------------------------------------------------------------------
// Function : loadAttackValues
//-----------------------------------------------------------------------------
SpriteGod.prototype.loadAttackValues = function (card) {
    let numSize = [30, 21, 27, 27, 35, 28, 31, 30, 31, 30]
    this.imageValues[8].y = this.imageValues[9].y = 72
    if (Math.floor(card.attack / 10) > 0) {
        this.imageValues[8].bitmap = ImageManager.loadSpecialCards("card_numbers_big")
        this.setLargeNumberFrame(this.imageValues[8], Math.floor(card.attack / 10))
        this.imageValues[8].opacity = 255
        this.imageValues[8].x = -187
    } else {
        this.imageValues[8].opacity = 0
    }
    if (card.attack == 0 && card.cardType != 1) {
        this.imageValues[9].opacity = 0
    } else {
        this.imageValues[9].bitmap = ImageManager.loadSpecialCards("card_numbers_big")
        this.setLargeNumberFrame(this.imageValues[9], card.attack % 10)
        this.imageValues[9].opacity = 255
        this.imageValues[9].x = -187 + numSize[Math.floor(card.attack / 10)]
    }
    if (card.attack < 10) {
        this.imageValues[9].x = -182
    }
}

//-----------------------------------------------------------------------------
// Function : loadAttackValues
//-----------------------------------------------------------------------------
SpriteGod.prototype.loadTotalHPValues = function (card) {
    let numSize = [30, 21, 27, 27, 35, 28, 31, 30, 31, 30]
    if (card.cardType == 2) {
        this.imageValues[10].opacity = 0
        this.imageValues[11].opacity = 0
        return
    }
    this.imageValues[10].y = this.imageValues[11].y = 72
    this.imageValues[10].bitmap = ImageManager.loadSpecialCards("card_numbers_big")
    this.setLargeNumberFrame(this.imageValues[10], Math.floor(card.mhp / 10))
    this.imageValues[10].opacity = 255
    this.imageValues[10].x = 136
    this.imageValues[11].bitmap = ImageManager.loadSpecialCards("card_numbers_big")
    this.setLargeNumberFrame(this.imageValues[11], card.mhp % 10)
    this.imageValues[11].opacity = 255
    this.imageValues[11].x = 136 + numSize[Math.floor(card.mhp / 10)]

}
//-----------------------------------------------------------------------------
// Function : loadCardName
//-----------------------------------------------------------------------------
SpriteGod.prototype.loadCardName = function (card) {
    this.imageValues[12].bitmap = new Bitmap(300, 100)
    this.imageValues[12].bitmap.fontSize = 50;
    this.imageValues[12].bitmap.outlineWidth = 0;
    this.imageValues[12].bitmap.fontFace = "Karantina";
    this.imageValues[12].bitmap.textColor = "#47374A"
    this.imageValues[12].y = -348
    this.imageValues[12].bitmap.drawText(card.name.toUpperCase(), 0, 0, 300, 100, 'center')
    this.imageValues[12].opacity = 255
}

//-----------------------------------------------------------------------------
// Function : createInfo
//-----------------------------------------------------------------------------
SpriteGod.prototype.createInfo = function () {
    this._buttonCheckNeed = true
    this._buttonChoice = true
    this.leftSide = true;
    this.hasInfoButtonTouched = false
    this.createCheckInfoButtons();
    this.createInfoBars();
    this.createInfoText();
}

//-----------------------------------------------------------------------------
// Function : reloadInfoText
//-----------------------------------------------------------------------------
SpriteGod.prototype.reloadInfoText = function () {
    if (this._infoBar) {
        this.removeChild(this._infoBar)
        this.addChild(this._infoBar)
        for (let n = 0; n < 6; n++) {
            this.removeChild(this.infoText[n])
            this.addChild(this.infoText[n])
        }
    }
}

//-----------------------------------------------------------------------------
// Function : createInfoText
//-----------------------------------------------------------------------------
SpriteGod.prototype.createInfoText = function () {
    this.infoText = new Array(6)
    let text
    for (let n = 0; n < 6; n++) {
        text = IAVRA.I18N.localize("#{DuelVocab.MenuText.cardInfo0" + n + "}")
        this.infoText[n] = new PIXI.Text(text, {
            fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0xffffff, align: 'left', dropShadow: true,
            dropShadowBlur: 3,
            dropShadowDistance: 2,
            stroke: "#00332F",
            strokeThickness: 3
        });
        this.addChild(this.infoText[n])
        switch (n) {
            case 0:
                this.infoText[n].x = -90
                this.infoText[n].y = -230
                break;
            case 1:
                this.infoText[n].x = 250
                this.infoText[n].y = -323
                break;
            case 2:
                this.infoText[n].x = -60
                this.infoText[n].y = -162
                break;
            case 3:
                this.infoText[n].x = 250
                this.infoText[n].y = -13
                break;
            case 4:
                this.infoText[n].x = -25
                this.infoText[n].y = -83
                break;
            case 5:
                this.infoText[n].x = 250
                this.infoText[n].y = 77
                break;
        }
        this.infoText[n].alpha = 0
    }
}

//-----------------------------------------------------------------------------
// Function : createInfoBars
//-----------------------------------------------------------------------------
SpriteGod.prototype.createInfoBars = function () {
    this._infoBar = new Sprite();
    this._infoBar.bitmap = ImageManager.loadSpecialCards("lineInfo_1")
    this.addChild(this._infoBar)
    this._infoBar.opacity = 0
    this._infoBar.y = -325
}

//-----------------------------------------------------------------------------
// Function : createCheckInfoButtons
//-----------------------------------------------------------------------------
SpriteGod.prototype.createCheckInfoButtons = function () {
    this._buttonCheckInfoOn = new Sprite_Card();
    this._buttonCheckInfoOn.bitmap = ImageManager.loadSpecialCards("checkInfo_1")
    this.addChild(this._buttonCheckInfoOn)
    this._buttonCheckInfoOn.opacity = 0
    this._buttonCheckInfoOn.anchor.x = this._buttonCheckInfoOn.anchor.y = 0.5
    this._buttonCheckInfoOn.y = 400
    this._buttonCheckInfoOff = new Sprite_Card();
    this._buttonCheckInfoOff.bitmap = ImageManager.loadSpecialCards("checkInfo_2")
    this.addChild(this._buttonCheckInfoOff)
    this._buttonCheckInfoOff.opacity = 0
    this._buttonCheckInfoOff.anchor.x = this._buttonCheckInfoOff.anchor.y = 0.5
    this._buttonCheckInfoOff.y = 400
}

//-----------------------------------------------------------------------------
// Function : updateCheckButton
//-----------------------------------------------------------------------------
SpriteGod.prototype.updateCheckButton = function () {
    if (this._buttonCheckNeed) {
        this._buttonCheckInfoOn.opacity = 0
        this._buttonCheckInfoOff.opacity = 0
        this._infoBar.opacity = 0
        this.infoText.forEach(element => {
            element.alpha = 0
        });
        return
    }
    if (this._buttonChoice) {
        this.updateButtonOn()
    } else {
        this.updateButtonOff()
    }
}

//-----------------------------------------------------------------------------
// Function : updateBarInfoPosition
//-----------------------------------------------------------------------------
SpriteGod.prototype.updateBarInfoPosition = function () {
    let x = SceneManager._scene.specialCardCamera.x
    let oldSide = this.leftSide;
    if (x > Graphics.width / 2 + 300) {
        this.leftSide = false
        this._infoBar.x = 160
        this._infoBar.scale.x = -1
    } else {
        this.leftSide = true
        this._infoBar.scale.x = 1
        this._infoBar.x = -160
    }
    if (oldSide != this.leftSide) {
        this.updateAllTextPositions()
    }
}
//-----------------------------------------------------------------------------
// Function : updateAllTextPositions
//-----------------------------------------------------------------------------
SpriteGod.prototype.updateAllTextPositions = function () {
    if (this.leftSide) {
        this._infoBar.scale.x = 1
        this._infoBar.x = -160
        this.infoText[0].x = -90
        this.infoText[1].x = 250
        this.infoText[2].x = -60
        this.infoText[3].x = 250
        this.infoText[4].x = -25
        this.infoText[5].x = 250
        this.infoText[0].y = -230
        this.infoText[1].y = -323
        this.infoText[2].y = -162
        this.infoText[3].y = -13
        this.infoText[4].y = -83
        this.infoText[5].y = 77
    } else {
        this._infoBar.x = 160
        this._infoBar.scale.x = -1
        this.infoText[0].x = -250 - this.infoText[0].width
        this.infoText[1].x = 90 - this.infoText[1].width
        this.infoText[2].x = -250 - this.infoText[2].width
        this.infoText[3].x = 60 - this.infoText[3].width
        this.infoText[4].x = -250 - this.infoText[4].width
        this.infoText[5].x = 25 - this.infoText[5].width
        this.infoText[0].y = -323
        this.infoText[1].y = -230
        this.infoText[2].y = -13
        this.infoText[3].y = -162
        this.infoText[4].y = 77
        this.infoText[5].y = -83
    }
}

//-----------------------------------------------------------------------------
// Function : updateButtonOff
//-----------------------------------------------------------------------------
SpriteGod.prototype.updateButtonOff = function () {
    this.updateBarInfoPosition()
    this._buttonCheckInfoOn.opacity -= 20
    this._infoBar.opacity += 20
    this.infoText.forEach(element => {
        if (element.alpha < 1)
            element.alpha += 0.05
    });
    if (this._buttonCheckInfoOff.isBeingTouched()) {
        this._buttonCheckInfoOff.opacity += 20
        if (TouchInput.isTriggered()) {
            this._buttonChoice = true
            this.hasInfoButtonTouched = true
        }
    } else {
        if (this._buttonCheckInfoOff.opacity == 0) {
            this._buttonCheckInfoOff.opacity = 150
        }
        if (this._buttonCheckInfoOff.opacity > 150)
            this._buttonCheckInfoOff.opacity -= 20
    }
}

//-----------------------------------------------------------------------------
// Function : updateButtonOn
//-----------------------------------------------------------------------------
SpriteGod.prototype.updateButtonOn = function () {
    this._buttonCheckInfoOff.opacity -= 20
    this._infoBar.opacity -= 20
    this.infoText.forEach(element => {
        if (element.alpha > 0)
            element.alpha -= 0.05
    });
    if (this._buttonCheckInfoOn.isBeingTouched()) {
        this._buttonCheckInfoOn.opacity += 20
        if (TouchInput.isTriggered()) {
            this._buttonChoice = false
            this.hasInfoButtonTouched = true
        }
    } else {
        if (this._buttonCheckInfoOn.opacity == 0) {
            this._buttonCheckInfoOn.opacity = 150
        }
        if (this._buttonCheckInfoOn.opacity > 150)
            this._buttonCheckInfoOn.opacity -= 20
    }
}

//-----------------------------------------------------------------------------
// Sprite_Cards
//
// The sprite for displaying a card in triple triad.

function SpriteStaticGod(godName) {
    this.initialize.apply(this, arguments);
}

SpriteStaticGod.prototype = Object.create(SpriteGod.prototype);
SpriteStaticGod.prototype.constructor = SpriteStaticGod;
//-----------------------------------------------------------------------------
// Function : SpriteGod
//-----------------------------------------------------------------------------
SpriteStaticGod.prototype.update = function (cameraX = SceneManager._scene.specialCardCamera.x, cameraY = SceneManager._scene.specialCardCamera.y) {
    Sprite_Card.prototype.update.call(this, ...arguments);
};
SpriteStaticGod.prototype.destroy = function (options) {
    SpriteGod.prototype.destroy.call(this, options);
    this.imageLayerBack.destroy()
    //this.backSprite.destroy()
    //this._big_card_front.destroy()
    //this.frontSprite.destroy()
    //this.imageLayerCard.destroy()
    //this.imageBaseLayer.destroy()
    for (let n = 0; n < this.imageValues.length; n++) {
        //this.imageValues[n].destroy()
    }
}

//-----------------------------------------------------------------------------
// Function : SpriteStaticGod
//-----------------------------------------------------------------------------
SpriteStaticGod.prototype.initialize = function () {
    Sprite_Card.prototype.initialize.call(this);
    this.staticCard = true;
    this.imageLayerBack = new Sprite()
    this.backSprite = new Sprite();
    this.addChild(this.backSprite)
    this._big_card_front = new Sprite()
    this._big_card_front.anchor.x = 0.5;
    this._big_card_front.anchor.y = 0.5;
    this.addChild(this._big_card_front)
    this.frontSprite = new Sprite();
    this.addChild(this.frontSprite)
    this.loadCardLayer()
    this.setWidthHeight()
    this.artist = new Sprite()
};

//-----------------------------------------------------------------------------
// Function : changeEuler
//-----------------------------------------------------------------------------
SpriteStaticGod.prototype.changeEulerSmooth = function (cameraX, cameraY) {
    let x = cameraX - TouchInput.x
    let y = TouchInput.y - cameraY
    let eulerChange = [x / 8000 - this.euler.y, y / 6920 - this.euler.x]
    if (eulerChange[0] > 0.02) {
        eulerChange[0] = 0.02
    }
    if (eulerChange[1] > 0.02) {
        eulerChange[1] = 0.02
    }
    if (eulerChange[0] < -0.02) {
        eulerChange[0] = -0.02
    }
    if (eulerChange[1] < -0.02) {
        eulerChange[1] = -0.02
    }
    this.euler.y += eulerChange[0]
    this.euler.x += eulerChange[1]
};

exportAllImages = function () {
    let renderer = Graphics.app.renderer;
    let fs = require('fs');
    let url
    let b64
    let spr = new SpriteStaticGod()
    for (let n = 126; n < 134; n++) {
        if (Game_Kamigami.convertedCardList[n].cardType == 2 || Game_Kamigami.convertedCardList[n].cardType == 3)
            continue;
        let name = Game_Kamigami.convertedCardList[n].Image_Big
        spr.configureGod(name, n)
        url = renderer.extract.canvas(spr).toDataURL('png', 100);
        b64 = url.replace(/^data:image\/[a-z]+;base64,/, "");
        fs.writeFileSync('C:/Games/cards/deity/' + name + '.png', b64, 'base64');
    }
}
exportSpecificCardId = function (cardId) {
    let renderer = Graphics.app.renderer;
    let fs = require('fs');
    let url
    let b64
    let spr = new SpriteStaticGod()
    let name = Game_Kamigami.convertedCardList[cardId].Image_Big
    spr.configureGod(name, cardId)
    url = renderer.extract.canvas(spr).toDataURL('png', 100);
    b64 = url.replace(/^data:image\/[a-z]+;base64,/, "");
    fs.writeFileSync('C:/Games/cards/deity/' + name + '.png', b64, 'base64');
}

exportSpecificCardName = function (cardName) {
    let renderer = Graphics.app.renderer;
    let fs = require('fs');
    let url
    let b64
    let spr = new SpriteStaticGod()
    for (let n = 0; n < 150; n++) {
        if (Game_Kamigami.convertedCardList[n].name != cardName)
            continue;
        let name = Game_Kamigami.convertedCardList[n].Image_Big
        spr.configureGod(name, n)
        url = renderer.extract.canvas(spr).toDataURL('png', 100);
        b64 = url.replace(/^data:image\/[a-z]+;base64,/, "");
        fs.writeFileSync('C:/Games/cards/deity/' + name + '.png', b64, 'base64');
    }
}