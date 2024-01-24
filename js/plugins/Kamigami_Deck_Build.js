ImageManager.loadDeckBuild = function (filename, hue) {
    return this.loadBitmap('img/deck_build/', filename, hue, true);
};

//-----------------------------------------------------------------------------
// Scene_Kamigami_Deck_Build Menu
//
// The scene class of the menu screen.

function Scene_Kamigami_Deck_Build() {
    this.initialize.apply(this, arguments);
}

Scene_Kamigami_Deck_Build.prototype = Object.create(Scene_Base.prototype);
Scene_Kamigami_Deck_Build.prototype.constructor = Scene_Kamigami_Deck_Build;

Scene_Kamigami_Deck_Build.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    //this.testing() //DELETE
    this.createVariables();
    this.createBackGround();
    this.createAllCardOptionsDeck();
    this.createAllCardOptions();
    this.createSpecialCard3d();
    this.createSpecialGodCard();
    this.createTypeButtons();
    this.createCivilizationButtons();
    this.createRankButtons();
    this.createScrollBar();
    this.createScrollBarDeck();
    this.applyFilter();
    this.createExtraButtons();
    this.createEditName();
    this.createDeckNum();
    this.createDeckInfo();
    this.createMissingGod();
    this.loadDeck();

    this.resetAllItems();
    this.createParticles();
    this.createNameInput();
    this.moveInitialPositions();

};
Scene_Kamigami_Deck_Build.prototype.resetAllItems = function () {
    this.children.forEach(child => {
        child.alpha = 0;
    });
    this.imgBackground.alpha = 1;
    this.cardOptionsDeck.alpha = 1;
};

Scene_Kamigami_Deck_Build.prototype.createMissingGod = function () {
    let text = IAVRA.I18N.localize("#{DuelVocab.MenuText.deckbuild2}")
    this.missingGodText = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 28, fill: 0xFF7A7A, align: 'center' });
    this.missingGodText.x = 55
    this.missingGodText.y = 100
    this.addChild(this.missingGodText)
    this.missingGodText.alpha = 0

    if ($dataKamigami.chosenDeck == $dataKamigami.selectedDeck) {
        this.missingGodText.text = IAVRA.I18N.localize("#{DuelVocab.MenuText.deckbuild14}")
    }
}


Scene_Kamigami_Deck_Build.prototype.createDeckNum = function () {
    let total = "0 / 40"
    this.deckTotal = new PIXI.Text(total, { fontFamily: 'Chau Philomene One', fontSize: 30, fill: 0xffffff, align: 'center' });
    this.deckTotal.x = 235
    this.deckTotal.y = 200
    this.addChild(this.deckTotal)

    total = "0"
    this.deitiesTotal = new PIXI.Text(total, { fontFamily: 'Chau Philomene One', fontSize: 18, fill: 0xffffff, align: 'center' });
    this.deitiesTotal.x = 102
    this.deitiesTotal.y = 150
    this.addChild(this.deitiesTotal)

    total = "0"
    this.creaturesTotal = new PIXI.Text(total, { fontFamily: 'Chau Philomene One', fontSize: 18, fill: 0xffffff, align: 'center' });
    this.creaturesTotal.x = 235
    this.creaturesTotal.y = 150
    this.addChild(this.creaturesTotal)

    total = "0"
    this.miraclesTotal = new PIXI.Text(total, { fontFamily: 'Chau Philomene One', fontSize: 18, fill: 0xffffff, align: 'center' });
    this.miraclesTotal.x = 355
    this.miraclesTotal.y = 150
    this.addChild(this.miraclesTotal)

    total = "0"
    this.monumentTotal = new PIXI.Text(total, { fontFamily: 'Chau Philomene One', fontSize: 18, fill: 0xffffff, align: 'center' });
    this.monumentTotal.x = 495
    this.monumentTotal.y = 150
    this.addChild(this.monumentTotal)
};


Scene_Kamigami_Deck_Build.prototype.createDeckInfo = function () {
    let initPos = [35]
    let text
    text = IAVRA.I18N.localize("#{DuelVocab.MenuText.deckSelectMenu1}")
    let posCorrection = []
    let nameText = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 18, fill: 0x998f8a, align: 'center' });
    nameText.x = initPos[0]
    nameText.y = 150
    posCorrection[0] = nameText.width
    this.addChild(nameText)

    text = IAVRA.I18N.localize("#{DuelVocab.MenuText.deckSelectMenu2}")
    nameText = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 18, fill: 0x998f8a, align: 'center' });
    nameText.x = initPos[0] + posCorrection[0] + 30
    nameText.y = 150
    posCorrection[1] = nameText.width
    this.addChild(nameText)
    initPos[1] = nameText.x

    text = IAVRA.I18N.localize("#{DuelVocab.MenuText.deckSelectMenu3}")
    nameText = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 18, fill: 0x998f8a, align: 'center' });
    nameText.x = initPos[1] + posCorrection[1] + 30
    nameText.y = 150
    posCorrection[2] = nameText.width
    this.addChild(nameText)
    initPos[2] = nameText.x

    text = IAVRA.I18N.localize("#{DuelVocab.MenuText.deckSelectMenu4}")
    nameText = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 18, fill: 0x998f8a, align: 'center' });
    nameText.x = initPos[2] + posCorrection[2] + 30
    nameText.y = 150
    posCorrection[3] = nameText.width
    this.addChild(nameText)
    initPos[3] = nameText.x

    //this.deckTotal.x = 1635
    this.deitiesTotal.x = initPos[0] + posCorrection[0] + 5
    this.creaturesTotal.x = initPos[1] + posCorrection[1] + 5
    this.miraclesTotal.x = initPos[2] + posCorrection[2] + 5
    this.monumentTotal.x = initPos[3] + posCorrection[3] + 5
};


Scene_Kamigami_Deck_Build.prototype.createExtraButtons = function () {
    this.btnSort = new Sprite_Clickable();
    this.btnSort.bitmap = ImageManager.loadDeckBuild("button1_on")
    this.addChild(this.btnSort)
    this.btnSort.x = 60
    this.btnSort.y = 200

    let nameText = new PIXI.Text(IAVRA.I18N.localize("#{DuelVocab.MenuText.deckbuild7}"), { fontFamily: 'Chau Philomene One', fontSize: 20, fill: 0xffffff, align: 'center' });
    nameText.x = this.btnSort.x - (nameText.width - 119) / 2
    nameText.y = 210
    this.addChild(nameText)

    this.btnReturn = new Sprite_Clickable();
    this.btnReturn.bitmap = ImageManager.loadDeckBuild("button3")
    this.addChild(this.btnReturn)
    this.btnReturn.x = 860
    this.btnReturn.y = 990

    nameText = new PIXI.Text(IAVRA.I18N.localize("#{DuelVocab.MenuText.deckbuild8}"), { fontFamily: 'Chau Philomene One', fontSize: 30, fill: 0xffffff, align: 'center' });
    nameText.x = (179 - nameText.width) / 2
    nameText.y = 13
    this.btnReturn.addChild(nameText)
};
Scene_Kamigami_Deck_Build.prototype.createEditName = function () {
    this.btnEdit = new Sprite_Clickable();
    this.btnEdit.bitmap = ImageManager.loadDeckBuild("button2_off")
    this.addChild(this.btnEdit)
    this.btnEdit.x = 70
    this.btnEdit.y = 30

    let btnEditIcon = new Sprite_Clickable();
    btnEditIcon.bitmap = ImageManager.loadDeckBuild("pencil")
    this.btnEdit.addChild(btnEditIcon)

    let name = $dataKamigami.decks[$dataKamigami.selectedDeck][0]
    this.deckName = new PIXI.Text(name, { fontFamily: 'Chau Philomene One', fontSize: 40, fill: 0xffffff, align: 'center' });
    this.deckName.x = 360
    this.deckName.y = 30
    this.addChild(this.deckName)

};

Scene_Kamigami_Deck_Build.prototype.loadDeck = function () {
    let deck = $dataKamigami.decks[$dataKamigami.selectedDeck][1];
    for (let n = 0; n < deck.length; n++) {
        this.cardOptionsDeck.addCard(deck[n], 1)
    }
    this.cardOptions.cardSelected = -1;
    this.cardOptionsDeck.cardSelected = -1;
    this.scrollBarDeck.scale.y = Math.min(1, 700 / (this.cardOptionsDeck.selectedCardOptions.length * 50))
    this.updateDeckNum();
};
Scene_Kamigami_Deck_Build.prototype.testing = function () {
    $dataKamigami.allCards = new Array(450);
    for (let n = 0; n < 450; n++) {
        $dataKamigami.allCards[n] = Math.randomInt(6) + 4;
    }
};

Scene_Kamigami_Deck_Build.prototype.createVariables = function () {
    this.selectedCard = -1;
    this.phase = 0;
    this.countFrames = 0;
    this.createFilter();
};

Scene_Kamigami_Deck_Build.prototype.createFilter = function () {
    this.filter = {
        civilization: [true, true, true, true, true],
        rank: [true, true, true],
        type: [true, true, true, true, true, false]
    }
};

Scene_Kamigami_Deck_Build.prototype.createBackGround = function () {
    this.imgBackground = new Sprite();
    this.imgBackground.bitmap = ImageManager.loadDeckBuild("imgBackground");
    this.addChild(this.imgBackground)
    this.imgBackground2 = new Sprite();
    this.imgBackground2.bitmap = ImageManager.loadDeckBuild("imgBackgroundBuild");
    this.addChild(this.imgBackground2)


    let text
    text = IAVRA.I18N.localize("#{DuelVocab.MenuText.deckBuildInfo1}")
    this.mainUpperText = new PIXI.Text(text, { fontFamily: 'GameFont', fontSize: 80, fill: 0xFFFFFF, align: 'center' });
    this.mainUpperText.x = Graphics.width / 2 - this.mainUpperText.width / 2
    this.mainUpperText.y = 30
    this.addChild(this.mainUpperText)

    text = IAVRA.I18N.localize("#{DuelVocab.MenuText.deckBuildInfo2}")
    this.reminderSelectText = new PIXI.Text(text, { fontFamily: 'GameFont', fontSize: 16, fill: 0xFFFFFF, align: 'center' });
    this.reminderSelectText.x = 80
    this.reminderSelectText.y = 1010
    this.addChild(this.reminderSelectText)

    text = IAVRA.I18N.localize("#{DuelVocab.MenuText.deckBuildInfo3}")
    this.reminderSelectText2 = new PIXI.Text(text, { fontFamily: 'GameFont', fontSize: 16, fill: 0xFFFFFF, align: 'center' });
    this.reminderSelectText2.x = 335
    this.reminderSelectText2.y = 1010
    this.addChild(this.reminderSelectText2)
};

Scene_Kamigami_Deck_Build.prototype.createAllCardOptionsDeck = function () {
    this.cardOptionsDeck = new SpriteCardOptionsDeck();
    this.addChild(this.cardOptionsDeck)
    this.cardOptionsDeck.x = 60
};

Scene_Kamigami_Deck_Build.prototype.createAllCardOptions = function () {
    this.cardOptions = new SpriteCardOptions();
    this.addChild(this.cardOptions)
    this.cardOptions.x = 1400
};

Scene_Kamigami_Deck_Build.prototype.createSpecialCard3d = function () {
    this.specialCardCamera = new PIXI.projection.Camera3d();
    this.specialCardCamera.position.set(Graphics.width / 2, Graphics.height / 2);
    this.specialCardCamera.setPlanes(1400, 180, 10000, false);
    this.addChild(this.specialCardCamera);
};

Scene_Kamigami_Deck_Build.prototype.createSpecialGodCard = function () {
    this._big_card_front = new SpriteGod();
    this._big_card_front.configureGod("Back_Card");
    this._big_card_front.anchor.x = this._big_card_front.anchor.y = 0.5;
    this.specialCardCamera.addChild(this._big_card_front)
    this._big_card_front.convertTo3d()

};

Scene_Kamigami_Deck_Build.prototype.createTypeButtons = function () {
    this.deityButtonsOn = new Array()
    this.deityButtonsOff = new Array()
    let typeNames = []
    for (let n = 0; n < 5; n++) {
        typeNames[n] = IAVRA.I18N.localize("#{DuelVocab.MenuText.deckbuild" + (n + 9) + "}")
        this.deityButtonsOn.push(new Sprite_Clickable())
        this.deityButtonsOn[n].bitmap = ImageManager.loadDeckBuild("button1_on")
        this.deityButtonsOn[n].x = 1290 + n * 123
        this.deityButtonsOn[n].y = 100
        this.addChild(this.deityButtonsOn[n])
        this.deityButtonsOff.push(new Sprite_Clickable())
        this.deityButtonsOff[n].bitmap = ImageManager.loadDeckBuild("button1_off")
        this.deityButtonsOff[n].x = 1290 + n * 123
        this.deityButtonsOff[n].y = 100
        this.addChild(this.deityButtonsOff[n])
        this.deityButtonsOff[n].opacity = 0;
        let nameText = new PIXI.Text(typeNames[n], { fontFamily: 'Chau Philomene One', fontSize: 20, fill: 0xffffff, align: 'center' });
        nameText.x = 1290 + n * 123 - (nameText.width - 119) / 2
        nameText.y = 110
        this.addChild(nameText)
    }
    this.createOwnedCardsButton()

};
Scene_Kamigami_Deck_Build.prototype.createOwnedCardsButton = function () {
    let name = IAVRA.I18N.localize("#{DuelVocab.MenuText.deckbuild15}")
    this.deityButtonsOn.push(new Sprite_Clickable())
    this.deityButtonsOn[5].bitmap = ImageManager.loadDeckBuild("button3_on")
    this.deityButtonsOn[5].x = 1290 + 2 * 123
    this.deityButtonsOn[5].y = 150
    this.addChild(this.deityButtonsOn[5])
    this.deityButtonsOff.push(new Sprite_Clickable())
    this.deityButtonsOff[5].bitmap = ImageManager.loadDeckBuild("button3_off")
    this.deityButtonsOff[5].x = 1290 + 2 * 123
    this.deityButtonsOff[5].y = 150
    this.addChild(this.deityButtonsOff[5])
    let nameText = new PIXI.Text(name, { fontFamily: 'Chau Philomene One', fontSize: 20, fill: 0xffffff, align: 'center' });
    nameText.x = 1290 + 2 * 123 - (nameText.width - 180) / 2
    nameText.y = 160
    this.addChild(nameText)
}


Scene_Kamigami_Deck_Build.prototype.createCivilizationButtons = function () {
    this.civilizationButtonsOn = new Array()
    this.civilizationButtonsOff = new Array()
    let civilizationNames = ["Greek", "Egypt", "Norse", "Japan", "Brazil"]
    for (let n = 0; n < 5; n++) {
        this.civilizationButtonsOn.push(new Sprite_Clickable())
        this.civilizationButtonsOn[n].bitmap = ImageManager.loadDeckBuild("button2_on")
        this.civilizationButtonsOn[n].x = 1420 + n * 50
        this.civilizationButtonsOn[n].y = 50
        this.addChild(this.civilizationButtonsOn[n])
        this.civilizationButtonsOff.push(new Sprite_Clickable())
        this.civilizationButtonsOff[n].bitmap = ImageManager.loadDeckBuild("button2_off")
        this.civilizationButtonsOff[n].x = 1420 + n * 50
        this.civilizationButtonsOff[n].y = 50
        this.addChild(this.civilizationButtonsOff[n])
        this.civilizationButtonsOff[n].opacity = 0;
        let civilizationIcon = new Sprite()
        civilizationIcon.bitmap = ImageManager.loadDeckBuild(civilizationNames[n])
        civilizationIcon.x = 1420 + n * 50
        civilizationIcon.y = 50
        this.addChild(civilizationIcon)

    };
};

Scene_Kamigami_Deck_Build.prototype.createRankButtons = function () {
    this.rankButtonsOn = new Array()
    this.rankButtonsOff = new Array()
    let rankNames = ["S", "A", "B"]
    for (let n = 0; n < 3; n++) {
        this.rankButtonsOn.push(new Sprite_Clickable())
        this.rankButtonsOn[n].bitmap = ImageManager.loadDeckBuild("button2_on")
        this.rankButtonsOn[n].x = 1760 + n * 50
        this.rankButtonsOn[n].y = 50
        this.addChild(this.rankButtonsOn[n])
        this.rankButtonsOff.push(new Sprite_Clickable())
        this.rankButtonsOff[n].bitmap = ImageManager.loadDeckBuild("button2_off")
        this.rankButtonsOff[n].x = 1760 + n * 50
        this.rankButtonsOff[n].y = 50
        this.addChild(this.rankButtonsOff[n])
        this.rankButtonsOff[n].opacity = 0;
        let nameText = new PIXI.Text(rankNames[n], { fontFamily: 'Chau Philomene One', fontSize: 20, fill: 0xffffff, align: 'center' });
        nameText.x = 1775 + n * 50
        nameText.y = 60
        this.addChild(nameText)
    };
};

Scene_Kamigami_Deck_Build.prototype.createScrollBar = function () {
    this.scrollBack = new Sprite_Card()
    this.scrollBack.bitmap = ImageManager.loadDeckBuild("scrollLine")
    this.addChild(this.scrollBack)
    this.scrollBack.anchor.x = this.scrollBack.anchor.y = 0.5
    this.scrollBack.x = 1895
    this.scrollBack.y = 595
    this.scrollBar = new Sprite_Card()
    this.scrollBar.bitmap = ImageManager.loadDeckBuild("scrollBar")
    this.addChild(this.scrollBar)
    this.scrollBar.anchor.x = this.scrollBar.anchor.y = 0.5
    this.scrollBar.x = 1895
    this.scrollBar.y = 595
};

Scene_Kamigami_Deck_Build.prototype.createScrollBarDeck = function () {
    this.scrollBackDeck = new Sprite_Card()
    this.scrollBackDeck.bitmap = ImageManager.loadDeckBuild("scrollLine")
    this.addChild(this.scrollBackDeck)
    this.scrollBackDeck.anchor.x = this.scrollBackDeck.anchor.y = 0.5
    this.scrollBackDeck.x = 30
    this.scrollBackDeck.y = 595
    this.scrollBarDeck = new Sprite_Card()
    this.scrollBarDeck.bitmap = ImageManager.loadDeckBuild("scrollBar")
    this.addChild(this.scrollBarDeck)
    this.scrollBarDeck.anchor.x = this.scrollBarDeck.anchor.y = 0.5
    this.scrollBarDeck.x = 30
    this.scrollBarDeck.y = 595
};

Scene_Kamigami_Deck_Build.prototype.createParticles = function () {
    //this.emitter = fx.getParticleEmitter('fairy-dust');
    //this.emitter.init(this.imgBackground, true, 1);
    //this.emitter.y = 540;
    //this.emitter.x = 960;
};
//-----------------------------------------------------------------------------
// Function : createNameInput
//-----------------------------------------------------------------------------
Scene_Kamigami_Deck_Build.prototype.createNameInput = function () {
    chatInput = new PIXI.TextInput({
        input: {
            fontFamily: 'Arial',
            fontSize: '36px',
            padding: '12px',
            width: '430px',
            color: '#26272E'
        },
        box: {
            default: { fill: 0xE8E9F3, rounded: 12, stroke: { color: 0xCBCEE0, width: 3 } },
            focused: { fill: 0xE1E3EE, rounded: 12, stroke: { color: 0xABAFC6, width: 3 } },
            disabled: { fill: 0xDBDBDB, rounded: 12 }
        }
    })
    chatInput.setInputStyle('fontFamily', 'Chau Philomene One')
    chatInput.setInputStyle('fontSize', 36 + 'px')
    chatInput.setInputStyle('fontWeight', 'normal')
    chatInput.setInputStyle('padding', 14 + 'px')
    chatInput.placeholder = 'Deck Name!'
    chatInput.x = 110
    chatInput.y = 10
    chatInput.text = this.deckName.text;
    chatInput.alpha = 0;
    //chatInput.pivot.x = chatInput.width / 2
    //chatInput.pivot.y = chatInput.height / 2
    this.addChild(chatInput)
}
//////////////////////////// MAIN UPDATE //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : update - updates deck building scene
//-----------------------------------------------------------------------------

Scene_Kamigami_Deck_Build.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    this._big_card_front.update();
    this._big_card_front.changeEuler(this.specialCardCamera.x, this.specialCardCamera.y);

    switch (this.phase) {
        case 0:
            this.openingOpacity();
            break;
        case 1:
            SceneManager._cantPush = true;
            this.mainBuildUpdate();
            break;
        case 2:
            this.closingScene();
            break;
        case 3:
            this.updateNameInput();
            break;
        default:
            break;
    }

};
Scene_Kamigami_Deck_Build.prototype.openingOpacity = function () {
    this.countFrames++;
    this.children.forEach(child => {
        child.alpha += 0.03;
    });
    if (this.cardOptionsDeck.hasGodCard) {
        this.missingGodText.alpha = 0
    } else {
        this.missingGodText.alpha = 1
    }
    this.deityButtonsOff.forEach(button => {
        button.alpha = 0;
    });
    this.deityButtonsOff[5].opacity = 255;
    this.civilizationButtonsOff.forEach(button => {
        button.alpha = 0;
    });
    this.rankButtonsOff.forEach(button => {
        button.alpha = 0;
    });
    this.moveObjects();
    chatInput.alpha = 0;

    if (this.reminderSelectText.alpha > 0.7) {
        this.reminderSelectText.alpha = 0.7
        this.reminderSelectText2.alpha = 0.7
        this.mainUpperText.alpha = 0.7
    }
    if (this.children[1].alpha >= 1) {
        this.phase = 1;
    }
};
Scene_Kamigami_Deck_Build.prototype.moveObjects = function () {
    this._big_card_front.y -= (34 - this.countFrames) / 2
    this.cardOptions.x -= (34 - this.countFrames) / 2
};
Scene_Kamigami_Deck_Build.prototype.moveInitialPositions = function () {
    this._big_card_front.y += 280.5
    this.cardOptions.x += 280.5
};



Scene_Kamigami_Deck_Build.prototype.mainBuildUpdate = function () {
    this.moveSelectedCard()
    this.checkButtonOpacity();
    if (TouchInput.isTriggered()) {

        this.checkButtonClick()
        this.checkAlbumCardClick()
    }
    if (TouchInput.isCancelled()) {
        this.checkAlbumCardClick(true)
    }
    if (TouchInput.x > 960)
        this.updateScrollBar(this.scrollBar, this.cardOptions);
    else
        this.updateScrollBar(this.scrollBarDeck, this.cardOptionsDeck);
    if (!TouchInput.isPressed()) this.moveScrollBar = false
};



Scene_Kamigami_Deck_Build.prototype.checkAlbumCardClick = function (allCards = false) {
    this.scrollBarDeck.scale.y = Math.min(1, 700 / (this.cardOptionsDeck.selectedCardOptions.length * 50))
    let numCards = allCards ? Math.min(4, $dataKamigami.allCards[this.cardOptions.cardSelected]) : 1;
    if (TouchInput.y > 240 && TouchInput.x > 960 && this.cardOptions.cardSelected != -1 && $dataKamigami.allCards[this.cardOptions.cardSelected] > 0) {
        this.cardOptionsDeck.addCard(this.cardOptions.cardSelected, numCards, true);
        this.cardOptions.cardOptions[this.cardOptions.cardSelected].x = 0
    }
    numCards = allCards ? Math.min(4, $dataKamigami.allCards[this.cardOptionsDeck.cardSelected]) : 1;
    if (TouchInput.y > 240 && TouchInput.x < 960 && this.cardOptionsDeck.cardSelected != -1) {

        this.cardOptionsDeck.removeCard(this.cardOptionsDeck.cardSelected, -numCards);
    }
    this.updateDeckNum();
};


Scene_Kamigami_Deck_Build.prototype.updatecardOptionsPosition = function (cardOptions) {
    cardOptions.y -= TouchInput.wheelY;
    if (cardOptions.selectedCardOptions.length >= 14) {
        cardOptions.y = Math.min(250, cardOptions.y);
        cardOptions.y = Math.max(950 - cardOptions.selectedCardOptions.length * 50, cardOptions.y)
    } else {
        cardOptions.y = 250;
    }

};
Scene_Kamigami_Deck_Build.prototype.updateScrollBar = function (scrollBar, cardOptions) {
    if (TouchInput.isPressed() && scrollBar.isBeingTouched()) {
        this.moveScrollBar = true
    }
    if (this.moveScrollBar) {
        cardOptions.y = (-cardOptions.selectedCardOptions.length * 50) * ((TouchInput.y - 250) / 700) + 300
        scrollBar.y = TouchInput.y;
    }
    this.updatecardOptionsPosition(cardOptions);
    let totalCardOptionsHeight = cardOptions.selectedCardOptions.length * 50;
    let calculateScroll = -(cardOptions.y - 250) / totalCardOptionsHeight
    scrollBar.y = 250 + scrollBar.scale.y * scrollBar.height / 2 + calculateScroll * scrollBar.height
};


Scene_Kamigami_Deck_Build.prototype.applyFilter = function () {
    this.cardOptions.filterCards(this.filter)
    this.selectedCard = -1
    this.cardOptions.cardSelected = -1
    this._big_card_front.configureGod("Back_Card");
    this.scrollBar.scale.y = Math.min(1, 700 / (this.cardOptions.selectedCardOptions.length * 50))
};

Scene_Kamigami_Deck_Build.prototype.checkButtonOpacity = function () {
    if (this.btnEdit.isBeingTouched()) {
        this.btnEdit.opacity += 10;
    } else {
        if (this.btnEdit.opacity > 100) {
            this.btnEdit.opacity -= 10;
        }
    };
    if (this.btnReturn.isBeingTouched()) {
        this.btnReturn.opacity += 10;
    } else {
        if (this.btnReturn.opacity > 100) {
            this.btnReturn.opacity -= 10;
        }
    };
};

Scene_Kamigami_Deck_Build.prototype.checkButtonClick = function () {
    for (let n = 0; n < 6; n++) {
        let num = n;
        if (n > 2 && n != 5) {
            num--
        } else if (n == 2) {
            num = 4
        }
        if (this.deityButtonsOn[n].isBeingTouched()) {
            AudioManager.playSe({ name: "button", pan: 0, pitch: 100, volume: 250 });
            if (this.deityButtonsOff[n].opacity == 255) {
                this.deityButtonsOff[n].opacity = 0

                this.filter.type[num] = true;
            } else {
                this.deityButtonsOff[n].opacity = 255
                this.filter.type[num] = false;
            }
            this.applyFilter();

        }
    }
    for (let n = 0; n < 3; n++) {
        if (this.rankButtonsOn[n].isBeingTouched()) {
            AudioManager.playSe({ name: "button", pan: 0, pitch: 100, volume: 250 });
            if (this.rankButtonsOff[n].opacity == 255) {
                this.rankButtonsOff[n].opacity = 0
                this.filter.rank[n] = true;
            } else {
                this.rankButtonsOff[n].opacity = 255
                this.filter.rank[n] = false;
            }
            this.applyFilter();

        }
    }
    for (let n = 0; n < 5; n++) {
        if (this.civilizationButtonsOn[n].isBeingTouched()) {
            AudioManager.playSe({ name: "button", pan: 0, pitch: 100, volume: 250 });
            if (this.civilizationButtonsOff[n].opacity == 255) {
                this.civilizationButtonsOff[n].opacity = 0
                this.filter.civilization[n] = true;
            } else {
                this.civilizationButtonsOff[n].opacity = 255
                this.filter.civilization[n] = false;
            }
            this.applyFilter();

        }
    }
    if (this.btnReturn.isBeingTouched()) {
        this.updateDeckCards();
        if ($dataKamigami.chosenDeck == $dataKamigami.selectedDeck && $dataKamigami.decks[$dataKamigami.selectedDeck][1].length != 41) {
            AudioManager.playSe({ name: "Cancel1", pan: 0, pitch: 100, volume: 100 });
        } else {
            AudioManager.playSe({ name: "button", pan: 0, pitch: 100, volume: 250 });
            this.phase = 2;
            this.countFrames = 0;

        }
    }

    if (this.btnEdit.isBeingTouched()) {
        AudioManager.playSe({ name: "button", pan: 0, pitch: 100, volume: 250 });
        chatInput.select()
        chatInput.text = this.deckName.text;
        this.phase = 3;
        chatInput.alpha = 1;
    }
};
Scene_Kamigami_Deck_Build.prototype.updateDeckCards = function () {
    $dataKamigami.decks[$dataKamigami.selectedDeck][1] = []
    this.cardOptionsDeck.selectedCardOptions.forEach(card => {
        let times = card.cardQuantity;
        for (let i = 0; i < times; i++) {
            $dataKamigami.decks[$dataKamigami.selectedDeck][1].unshift(card.card.cardId)
        }

    });
};


Scene_Kamigami_Deck_Build.prototype.moveAlbumCards = function () {
    this.cardOptionsDeck.cardSelected = -1;
    if (this.cardOptions.cardSelected == -1)
        return;
    if (this.selectedCard != this.cardOptions.cardSelected) {
        this.selectedCard = this.cardOptions.cardSelected;
        let cardName = this.cardOptions.cardOptions[this.selectedCard].card.imageBig
        let cardId = this.cardOptions.cardOptions[this.selectedCard].card.cardId
        if ($dataKamigami.allCards[this.selectedCard] > 0)
            this._big_card_front.configureGod(cardName, cardId);
        else
            this._big_card_front.configureGod("Back_Card");
    }
    let card;
    for (let n = 0; n < 450; n++) {
        card = this.cardOptions.cardOptions[n]
        if (this.selectedCard == n) {
            if (card.x > -50) {
                card.x -= 5
            }
        }
        else {
            if (card.x < 0) {
                card.x += 5
            }
        }
    }
    for (let n = 0; n < 450; n++) {
        card = this.cardOptionsDeck.cardOptions[n]
        if (card.x > 0) {
            card.x -= 5
        }
    }
};

Scene_Kamigami_Deck_Build.prototype.moveDeckCards = function () {
    this.cardOptions.cardSelected = -1;
    if (this.cardOptionsDeck.cardSelected == -1)
        return;
    if (this.selectedCard != this.cardOptionsDeck.cardSelected) {
        this.selectedCard = this.cardOptionsDeck.cardSelected;
        let cardName = this.cardOptionsDeck.cardOptions[this.selectedCard].card.imageBig
        let cardId = this.cardOptions.cardOptions[this.selectedCard].card.cardId
        if ($dataKamigami.allCards[this.selectedCard] > 0)
            this._big_card_front.configureGod(cardName, cardId);
        else
            this._big_card_front.configureGod("Back_Card");
    }
    let card;
    for (let n = 0; n < 450; n++) {
        card = this.cardOptionsDeck.cardOptions[n]
        if (this.selectedCard == n) {
            if (card.x < 50 && card.x > -500) {
                card.x += 5
            }
        }
        else {
            if (card.x > 0) {
                card.x -= 5
            }
        }
    }
    for (let n = 0; n < 450; n++) {
        card = this.cardOptions.cardOptions[n]
        if (card.x < 0) {
            card.x += 5
        }
    }
};

Scene_Kamigami_Deck_Build.prototype.moveSelectedCard = function () {
    if (TouchInput.x > 960) {
        this.moveAlbumCards();
    } else {
        this.moveDeckCards();
    }
};

Scene_Kamigami_Deck_Build.prototype.updateDeckNum = function () {
    let total = IAVRA.I18N.localize("#{DuelVocab.MenuText.deckbuild1}")
    let countDeity = 0;
    let countCreatures = 0;
    let countMiracles = 0;
    let countMonuments = 0;

    let count = 0;
    this.cardOptionsDeck.selectedCardOptions.forEach(cardOption => {
        switch (cardOption.card.cardType) {
            case 1:
                if (cardOption.card.isDeity)
                    countDeity += cardOption.cardQuantity;
                else
                    countCreatures += cardOption.cardQuantity;
                break;
            case 2:
                countMiracles += cardOption.cardQuantity;
                break;
            case 3:
                countMonuments += cardOption.cardQuantity;
                break;
            default:
                break;
        }
    });
    this.deitiesTotal.text = countDeity
    this.creaturesTotal.text = countCreatures
    this.miraclesTotal.text = countMiracles
    this.monumentTotal.text = countMonuments

    count = countDeity + countMiracles + countCreatures + countMonuments;
    this.deckTotal.text = count + total
    if (count < 40) {
        this.deckTotal.tint = "0xFF7A7A"
    } else {
        this.deckTotal.tint = "0x82FF82"
    }
    if ($dataKamigami.chosenDeck != $dataKamigami.selectedDeck && this.cardOptionsDeck.hasGodCard) {
        this.missingGodText.alpha = 0
    } else {
        this.missingGodText.alpha = 1
    }

};
//////////////////////////// NAME INPUT UPDATE //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : update - updates deck building scene
//-----------------------------------------------------------------------------
Scene_Kamigami_Deck_Build.prototype.updateNameInput = function () {
    if (!chatInput._hasFocus()) {
        if (chatInput.text != "") {
            $dataKamigami.decks[$dataKamigami.selectedDeck][0] = chatInput.text;
            this.deckName.text = chatInput.text
        }
        chatInput.alpha = 0;
        this.phase = 1;
        return;
    }
    if (Input.isTriggered("ok")) {
        chatInput.blur()
    }
};


//////////////////////////// CLOSING UPDATE //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : update - updates deck building scene
//-----------------------------------------------------------------------------
Scene_Kamigami_Deck_Build.prototype.closingScene = function () {
    this.countFrames++;
    let distance = 0;
    let card;
    for (let n = 0; n < 450; n++) {
        card = this.cardOptionsDeck.cardOptions[n]
        if (card.x > 0) {
            card.x -= 5
        }

    }
    this.children.forEach(child => {
        distance = (1400 - this.cardOptionsDeck.x) / 20 + 2
        child.x += distance;

        child.alpha -= 0.02;
        this.imgBackground.x = 0;
        this.imgBackground.alpha = 1;
        if (this.cardOptionsDeck.x > 1400) {
            this.cardOptionsDeck.x = 1400;
        }
        this.cardOptionsDeck.mask.x = this.cardOptionsDeck.x
        this.cardOptionsDeck.alpha = 1;
    });
    if (this.cardOptionsDeck.x == 1400) {
        $dataKamigami.transitionType = 1;
        DataManager.saveGame(1)
        SceneManager.pop();
    }

};
//-----------------------------------------------------------------------------
// SpriteCardButton
//
// The sprite for displaying a card in triple triad.

function SpriteCardOptions() {
    this.initialize.apply(this, arguments);
}

SpriteCardOptions.prototype = Object.create(Sprite_Card.prototype);
SpriteCardOptions.prototype.constructor = SpriteCardOptions;

//-----------------------------------------------------------------------------
// Function : initialize
//-----------------------------------------------------------------------------
SpriteCardOptions.prototype.initialize = function () {
    Sprite_Card.prototype.initialize.call(this);
    this.cardSelected = 0;
    this.cardLength = 0;
    this.createMask();
    this.createAllOptions();
};
//-----------------------------------------------------------------------------
// Function : filterCards
//-----------------------------------------------------------------------------
SpriteCardOptions.prototype.filterCards = function (filter) {
    for (let n = 0; n < 450; n++) {
        this.selectedCardOptions[n] = this.cardOptions[n]
    }
    let realIndex = -1
    for (let n = 0; n < 450; n++) {
        realIndex++;
        if (!this.selectedCardOptions[n]) {
            break;
        }
        if (filter.type[5] && this.selectedCardOptions[n].cardQuantity == 0) {
            this.selectedCardOptions[n].x = 500;
            this.selectedCardOptions.splice(n, 1);
            n--;
            continue;
        }
        if (!filter.rank[Math.floor(realIndex / 150)]) {
            this.selectedCardOptions[n].x = 500;
            this.selectedCardOptions.splice(n, 1);
            n--;
            continue;
        }
        let actualCardType = this.getActualCardType(this.selectedCardOptions[n].card)
        if (!(filter.civilization[this.selectedCardOptions[n].card.specialType] && filter.type[actualCardType])) {
            this.selectedCardOptions[n].x = 500;
            this.selectedCardOptions.splice(n, 1);
            n--;
            continue;
        }
        this.selectedCardOptions[n].x = 0;
        this.selectedCardOptions[n].y = n * 50;
    }
};
SpriteCardOptions.prototype.getActualCardType = function (card) {
    if (card.cardType == 1) {
        if (card.isDeity) {
            return card.cardType
        } else {
            return 4
        }
    } else {
        return card.cardType
    }
}


//-----------------------------------------------------------------------------
// Function : createMask
//-----------------------------------------------------------------------------
SpriteCardOptions.prototype.createMask = function () {
    this.mask = new PIXI.Graphics();
    this.mask.beginFill();
    this.mask.x = 1400
    this.mask.y = 250;
    this.y = 250;
    //this.maskInside.anchor.x = this.maskInside.anchor.y = 0.5;
    this.mask.drawRect(-50, 0, 550, 700);
    this.mask.endFill();
};
//-----------------------------------------------------------------------------
// Function : update
//-----------------------------------------------------------------------------
SpriteCardOptions.prototype.update = function () {
    Sprite_Card.prototype.update.call(this);
    if (TouchInput.x > this.mask.x && TouchInput.y > this.mask.y && TouchInput.x < this.mask.x + 500 && TouchInput.y < this.mask.y + 700) {
        this.cardSelected = this.getCardTouch();
        if (this.cardSelected != -1 && this.oldCardSelected != this.cardSelected) {
            this.oldCardSelected = this.cardSelected
            AudioManager.playSe({ name: "menu_select", pan: 0, pitch: 70, volume: 100 });
        }

    }

};

//-----------------------------------------------------------------------------
// Function : createAllOptions
//-----------------------------------------------------------------------------
SpriteCardOptions.prototype.createAllOptions = function () {
    this.cardOptions = new Array();
    for (let n = 0; n < 450; n++) {
        this.cardOptions.push(new SpriteCardButton())
        this.cardOptions[n].configureGod(n)
        this.addChild(this.cardOptions[n])
        this.cardOptions[n].y = n * 50
        this.cardOptions[n].anchor.x = this.cardOptions[n].anchor.y = 0.5;
    }
    this.selectedCardOptions = new Array();
    for (let n = 0; n < 450; n++) {
        this.selectedCardOptions[n] = this.cardOptions[n]
    }
};

//-----------------------------------------------------------------------------
// Function : getCardTouch - Gets the card by cursor
//-----------------------------------------------------------------------------
SpriteCardOptions.prototype.getCardTouch = function () {

    for (let n = 0; n < 450; n++) {
        if (this.cardOptions[n].isMiniButtonTouched()) {
            return n;
        }
    };
    return -1;
};

//-----------------------------------------------------------------------------
// SpriteCardButton
//
// The sprite for displaying a card in triple triad.

function SpriteCardOptionsDeck() {
    this.initialize.apply(this, arguments);
}

SpriteCardOptionsDeck.prototype = Object.create(SpriteCardOptions.prototype);
SpriteCardOptionsDeck.prototype.constructor = SpriteCardOptionsDeck;

//-----------------------------------------------------------------------------
// Function : initialize
//-----------------------------------------------------------------------------
SpriteCardOptionsDeck.prototype.initialize = function () {
    SpriteCardOptions.prototype.initialize.call(this);
    for (let n = 0; n < 450; n++) {
        this.selectedCardOptions[n].x = -800
    }
    this.selectedCardOptions = new Array();
};

//-----------------------------------------------------------------------------
// Function : resetDeck
//-----------------------------------------------------------------------------
SpriteCardOptionsDeck.prototype.resetDeck = function () {
    this.selectedCardOptions.forEach(card => {
        card.x = -600;
    });
    this.selectedCardOptions = new Array();
    this.hasGodCard = false;
};

//-----------------------------------------------------------------------------
// Function : resetDeck
//-----------------------------------------------------------------------------
SpriteCardOptionsDeck.prototype.resetStaticDeck = function () {
    for (let n = 0; n < 450; n++) {
        this.selectedCardOptions[n].x = 0
    }
};
//-----------------------------------------------------------------------------
// Function : createMask
//-----------------------------------------------------------------------------
SpriteCardOptionsDeck.prototype.createMask = function () {
    this.mask = new PIXI.Graphics();
    this.mask.beginFill();
    this.mask.x = 50
    this.mask.y = 250;
    this.y = 250;
    //this.maskInside.anchor.x = this.maskInside.anchor.y = 0.5;
    this.mask.drawRect(0, 0, 600, 700);
    this.mask.endFill();
};
//-----------------------------------------------------------------------------
// Function : addCard
//-----------------------------------------------------------------------------
SpriteCardOptions.prototype.addCard = function (cardId, quantity, sound = false) {
    let count = 0
    this.selectedCardOptions.forEach(cardOption => {
        count += cardOption.cardQuantity;
    });
    if (this.hasGodCard)
        count--;
    quantity = Math.min(quantity, 40 - count);
    let hasCard = -1
    let maxQuantity = 4
    if (this.cardOptions[cardId].card.cardType == 0) {
        if (this.hasGodCard) {
            AudioManager.playSe({ name: "Cancel1", pan: 0, pitch: 100, volume: 100 });
            return;
        } else {
            quantity = 1;
            this.hasGodCard = true;
        }
    } else {
        for (let n = 0; n < 3; n++) {
            let calculatedId = cardId + 150 * n
            if (calculatedId >= 450) { calculatedId -= 450 }
            let index = this.selectedCardOptions.indexOf(this.cardOptions[calculatedId])
            if (index != -1) {
                if (n == 0) {
                    hasCard = index
                }
                maxQuantity -= this.selectedCardOptions[index].cardQuantity
            }
        }
    }
    quantity = Math.min(quantity, maxQuantity)
    if (quantity <= 0) {
        if (sound) {
            AudioManager.playSe({ name: "Cancel1", pan: 0, pitch: 100, volume: 100 });
        }
        return;
    }
    if (sound) {
        AudioManager.playSe({ name: "System_paper_flip", pan: 0, pitch: 100, volume: 100 });
    }
    if (hasCard == -1) {
        if (this.cardOptions[cardId].card.cardType == 0) {
            this.selectedCardOptions.unshift(this.cardOptions[cardId])
            this.selectedCardOptions[0].changeQuantity(1)
        } else {
            this.selectedCardOptions.push(this.cardOptions[cardId])
            this.selectedCardOptions[this.selectedCardOptions.length - 1].changeQuantity(quantity)
        }

    } else {
        this.selectedCardOptions[hasCard].addQuantity(quantity)
    }
    for (let n = 0; n < this.selectedCardOptions.length; n++) {
        this.selectedCardOptions[n].x = 0;
        this.selectedCardOptions[n].y = n * 50;
    }
};

//-----------------------------------------------------------------------------
// Function : removeCard
//-----------------------------------------------------------------------------
SpriteCardOptions.prototype.removeCard = function (cardId, quantity) {
    if (this.cardOptions[cardId].card.cardType == 0) {
        quantity = -1;
        this.hasGodCard = false;
    }


    let index = this.selectedCardOptions.indexOf(this.cardOptions[cardId])
    if (index != -1) {
        this.selectedCardOptions[index].addQuantity(quantity)
        if (this.selectedCardOptions[index].cardQuantity <= 0) {
            this.selectedCardOptions[index].x = - 900
            this.selectedCardOptions.splice(index, 1)
        }
        AudioManager.playSe({ name: "System_paper_flip", pan: 0, pitch: 100, volume: 100 });

    }
    for (let n = 0; n < this.selectedCardOptions.length; n++) {
        this.selectedCardOptions[n].x = 0;
        this.selectedCardOptions[n].y = n * 50;
    }

};

//-----------------------------------------------------------------------------
// SpriteCardButton
//
// The sprite for displaying a card in triple triad.

function SpriteCardButton() {
    this.initialize.apply(this, arguments);
}

SpriteCardButton.prototype = Object.create(Sprite_Card.prototype);
SpriteCardButton.prototype.constructor = SpriteCardButton;



//-----------------------------------------------------------------------------
// Function : SpriteCardButton
//-----------------------------------------------------------------------------
SpriteCardButton.prototype.initialize = function () {
    Sprite_Card.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Function : SpriteCardButton
//-----------------------------------------------------------------------------
SpriteCardButton.prototype.configureGod = function (cardId) {
    this.card = new KamigamiCard()
    this.card.loadCardData(cardId, 0)
    this.type = this.card.cardType
    this.loadBackImage(this.type)
    this.loadName(cardId, this.card.name)
    this.loadCivilization(this.card.specialType)
};

SpriteCardButton.prototype.isMiniButtonTouched = function () {
    var x = this.canvasToLocalX(TouchInput.x + parseInt((this.width / 2) * this.scale.x));
    var y = this.canvasToLocalY(TouchInput.y + parseInt((this.height / 2) * this.scale.y));
    return x >= 0 && y >= 0 && x < this.backImage.width * this.scale.x && y < this.backImage.height * this.scale.y;

};

//-----------------------------------------------------------------------------
// Function : loadBackImage
//-----------------------------------------------------------------------------
SpriteCardButton.prototype.loadBackImage = function (cardType) {
    this.backImage = new Sprite();
    if (cardType == 0) {
        this.backImage.bitmap = ImageManager.loadDeckBuild("imgBackOptionGod")
        this.backImage.y -= 4
    } else {
        this.backImage.bitmap = ImageManager.loadDeckBuild("imgBackOption")
    }
    this.addChild(this.backImage)

};

//-----------------------------------------------------------------------------
// Function : loadName
//-----------------------------------------------------------------------------
SpriteCardButton.prototype.loadName = function (cardId, name) {

    if ($dataKamigami.allCards[cardId] === 0) {
        name = "??????????"
    }
    if (Math.floor(cardId / 150) == 0) {
        name = "S - " + name
    } else if (Math.floor(cardId / 150) == 1) {
        name = "A - " + name
    } else {
        name = "B - " + name
    }
    this.nameText = new PIXI.Text(name, { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0xffffff, align: 'left' });
    this.addChild(this.nameText)
    this.nameText.x = 70
    this.nameText.y = 7
    if (this.type === 0)
        this.nameText.y += 3
    this.cardQuantity = $dataKamigami.allCards[cardId]
    this.quantity = new PIXI.Text("x" + this.cardQuantity, { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0xffffff, align: 'right' });
    this.quantity.x = 420
    this.addChild(this.quantity)
    this.quantity.y = 7
    if (this.type === 0)
        this.quantity.y += 3
};

//-----------------------------------------------------------------------------
// Function : changeQuantity
//-----------------------------------------------------------------------------
SpriteCardButton.prototype.changeQuantity = function (quantity) {
    this.quantity.text = "x" + quantity
    this.cardQuantity = quantity
};

//-----------------------------------------------------------------------------
// Function : addQuantity
//-----------------------------------------------------------------------------
SpriteCardButton.prototype.addQuantity = function (quantity) {
    this.cardQuantity += quantity
    this.cardQuantity = Math.min(this.cardQuantity, $dataKamigami.allCards[this.card.cardId], 4)
    this.quantity.text = "x" + this.cardQuantity
};

//-----------------------------------------------------------------------------
// Function : loadCivilization
//-----------------------------------------------------------------------------
SpriteCardButton.prototype.loadCivilization = function (type) {
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
    this.typeIcon.y = 0
    if (this.type === 0)
        this.typeIcon.y += 2
};
