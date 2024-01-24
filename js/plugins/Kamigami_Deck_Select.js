
//-----------------------------------------------------------------------------
// Scene_Kamigami_Deck_Select Menu
//
// The scene class of the menu screen.

function Scene_Kamigami_Deck_Select() {
    this.initialize.apply(this, arguments);
}

Scene_Kamigami_Deck_Select.prototype = Object.create(Scene_Kamigami_Deck_Build.prototype);
Scene_Kamigami_Deck_Select.prototype.constructor = Scene_Kamigami_Deck_Select;

Scene_Kamigami_Deck_Select.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    this.create_displacement();
    //this.testing() //DELETE
    this.createVariables();
    this.createBackGround();
    this.createAllCardOptionsDeck();
    this.createAllDeckOptions();
    this.createSpecialCard3d();
    this.createSpecialGodCard();
    this.createScrollBar();
    this.createScrollBarDeck();
    this.createDeckNum();
    this.createDeckInfo();
    this.createMissingGod();
    this.loadDeck();
    this.createDeckButtons();
    this.createExtraButtons();
    this.createInfoMessage();
    //this.resetAllItems();
    this.createParticles();
    this.moveInitialPositions();

};
Scene_Kamigami_Deck_Select.prototype.createVariables = function () {
    this.selectedCard = -1;
    this.phase = -1;
    this.countFrames = 0;
    this.createFilter();
};
//-----------------------------------------------------------------------------
// Function : create_displacement
//-----------------------------------------------------------------------------
Scene_Kamigami_Deck_Select.prototype.create_displacement = function () {
    this.container = new PIXI.Container();
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
};

Scene_Kamigami_Deck_Select.prototype.moveInitialPositions = function () {
    this.children.forEach(child => {
        child.alpha = 0;
    });
    //this.imgBackground.alpha = 1;
    //this.cardOptionsDeck.alpha = 1;
    this._big_card_front.y += 280.5

    this.deckChoices.x -= 280.5

    if ($dataKamigami.transitionType != 0) {
        this.phase = 0;
        this.container.alpha = 1;
        this.cardOptionsDeck.alpha = 1;
    } else {
        this.cardOptionsDeck.x += 280.5
        this.tl.timeScale(100);
        this.tl.play();
    }
};

Scene_Kamigami_Deck_Select.prototype.createExtraButtons = function () {
    this.btnReturn = new Sprite_Clickable();
    this.btnReturn.bitmap = ImageManager.loadDeckBuild("button3")
    this.addChild(this.btnReturn)
    this.btnReturn.x = 860
    this.btnReturn.y = 990
    let text = IAVRA.I18N.localize(`#{DuelVocab.MenuOptions.deckSelectButton4}`)
    let nameText = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 30, fill: 0xffffff, align: 'center' });
    nameText.x = 40
    nameText.y = 13
    this.btnReturn.addChild(nameText)
};
Scene_Kamigami_Deck_Select.prototype.createBackGround = function () {
    this.imgBackground = new Sprite();
    this.imgBackground.bitmap = ImageManager.loadDeckBuild("imgBackground");
    this.container.addChild(this.imgBackground)
    this.imgBackground2 = new Sprite();
    this.imgBackground2.bitmap = ImageManager.loadDeckBuild("imgBackgroundSelect");
    this.container.addChild(this.imgBackground2)

    let text
    text = IAVRA.I18N.localize("#{DuelVocab.MenuText.deckSelectInfo1}")
    this.mainUpperText = new PIXI.Text(text, { fontFamily: 'GameFont', fontSize: 80, fill: 0xFFFFFF, align: 'center' });
    this.mainUpperText.x = Graphics.width / 2 - this.mainUpperText.width / 2
    this.mainUpperText.y = 30
    this.container.addChild(this.mainUpperText)

    text = IAVRA.I18N.localize("#{DuelVocab.MenuText.deckSelectInfo2}")
    this.reminderSelectText = new PIXI.Text(text, { fontFamily: 'GameFont', fontSize: 16, fill: 0xFFFFFF, align: 'center' });
    this.reminderSelectText.x = 80
    this.reminderSelectText.y = 1010
    this.container.addChild(this.reminderSelectText)
};

Scene_Kamigami_Deck_Select.prototype.createInfoMessage = function () {
    let text = ""
    this.infoText = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 28, fill: 0xFF7A7A, align: 'center' });
    this.infoText.x = 55
    this.infoText.y = 100
    this.addChild(this.infoText)
}

Scene_Kamigami_Deck_Select.prototype.createMissingGod = function () {
    Scene_Kamigami_Deck_Build.prototype.createMissingGod.call(this);
    this.missingGodText.x = 1420
    this.missingGodText.text = ""
}

Scene_Kamigami_Deck_Select.prototype.createDeckButtons = function () {
    this.deckButtons = new Array()
    this.deckButtonNames = new Array()
    let buttonNames
    
    for (let n = 0; n < 3; n++) {
        this.deckButtons.push(new Sprite_Clickable())
        this.deckButtons[n].bitmap = ImageManager.loadDeckBuild("button3")
        this.deckButtons[n].x = 50 + n * 200
        this.deckButtons[n].y = 150
        this.addChild(this.deckButtons[n])

        if (n == 2) {
            this.delButton = new Sprite_Clickable()
            this.delButton.bitmap = ImageManager.loadDeckBuild("button3_del")
            this.delButton.x = 50 + n * 200
            this.delButton.y = 150
            this.addChild(this.delButton)
            this.delButton.scale.x = 0;
            this.delButton.opacity = 150;
        }
        buttonNames = IAVRA.I18N.localize(`#{DuelVocab.MenuOptions.deckSelectButton${n + 1}}`)
        let nameText = new PIXI.Text(buttonNames, { fontFamily: 'Chau Philomene One', fontSize: 30, fill: 0xffffff, align: 'center' });
        nameText.x = 90 - buttonNames.length * 8
        nameText.y = 15
        this.deckButtons[n].addChild(nameText)
    }
};

Scene_Kamigami_Deck_Select.prototype.createAllDeckOptions = function () {
    this.deckChoices = new SpriteDeckChoices();
    this.addChild(this.deckChoices)
    this.deckChoices.x = 60
    this.deckSelected = $dataKamigami.selectedDeck;
    //this.deckChoices.deckSelected = this.deckSelected;
};

Scene_Kamigami_Deck_Select.prototype.createDeckNum = function () {
    Scene_Kamigami_Deck_Build.prototype.createDeckNum.call(this);
};

Scene_Kamigami_Deck_Select.prototype.createDeckInfo = function () {
    let text
    text = IAVRA.I18N.localize("#{DuelVocab.MenuText.deckSelectMenu1}")
    let posCorrection = []
    let initPos = [1415]
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

    this.deckTotal.x = 1635
    this.deitiesTotal.x = initPos[0] + posCorrection[0] + 5
    this.creaturesTotal.x = initPos[1] + posCorrection[1] + 5
    this.miraclesTotal.x = initPos[2] + posCorrection[2] + 5
    this.monumentTotal.x = initPos[3] + posCorrection[3] + 5
};


Scene_Kamigami_Deck_Select.prototype.createScrollBarDeck = function () {
    Scene_Kamigami_Deck_Build.prototype.createScrollBarDeck.call(this);
    this.scrollBackDeck.x = 1895
    this.scrollBackDeck.y = 595
    this.scrollBarDeck.x = 1895
    this.scrollBarDeck.y = 595
};

Scene_Kamigami_Deck_Select.prototype.createAllCardOptionsDeck = function () {
    Scene_Kamigami_Deck_Build.prototype.createAllCardOptionsDeck.call(this);
    this.cardOptionsDeck.x = 1400
    this.cardOptionsDeck.mask.x = 1350;
};


Scene_Kamigami_Deck_Select.prototype.createScrollBar = function () {
    Scene_Kamigami_Deck_Build.prototype.createScrollBar.call(this);
    this.scrollBack.x = 30
    this.scrollBack.y = 595
    this.scrollBar.x = 30
    this.scrollBar.y = 595
    this.scrollBar.scale.y = Math.min(1, 700 / (99 * 50))
};


//////////////////////////// MAIN UPDATE //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : update - updates deck building scene
//-----------------------------------------------------------------------------

Scene_Kamigami_Deck_Select.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    this._big_card_front.update();
    this._big_card_front.changeEuler(this.specialCardCamera.x, this.specialCardCamera.y);
    switch (this.phase) {
        case -1:
            this.updateTransitionOpening();
            break;
        case 0:
            this.updateOpacity();
            break;
        case 1:
            this.updateSceneSelect();
            break;
        case 2:
            this.updateTransitionBuild();
            break;
        case 3:
            this.updateReturnScene();
            break;
        default:
            break;
    }
};
Scene_Kamigami_Deck_Select.prototype.updateTransitionOpening = function () {
    this.countFrames++;
    if (this.countFrames == 1) {
        this.container.alpha = 50;
        this.imgBackground.alpha = 50;
        this.imgBackground2.alpha = 50;
        this.tl.timeScale(7);
        this.tl.reverse();
    }
    if (this.countFrames > 70) {
        this.countFrames = 0;
        this.phase = 0;
    }
};

Scene_Kamigami_Deck_Select.prototype.updateOpacity = function () {
    this.countFrames++;
    this.children.forEach(child => {
        child.alpha += 0.03;
    });
    if (this.reminderSelectText.alpha > 0.3) {
        this.reminderSelectText.alpha = 0.3
        this.mainUpperText.alpha = 0.3
    }
    this.moveObjects();
    if (this.children[4].alpha >= 1) {
        $dataKamigami.transitionType = 0;
        this.delButton.opacity = 150;
        this.phase = 1;
        AudioManager.stopBgs()
        AudioManager.playBgm({ name: $dataKamigami.selectDeckMusic, pan: 0, pitch: 100, volume: 100 });
    }

};

Scene_Kamigami_Deck_Select.prototype.moveObjects = function () {
    this._big_card_front.y -= (34 - this.countFrames) / 2
    if ($dataKamigami.transitionType == 0)
        this.cardOptionsDeck.x -= (34 - this.countFrames) / 2
    this.deckChoices.x += (34 - this.countFrames) / 2
};

Scene_Kamigami_Deck_Select.prototype.updateSceneSelect = function () {
    if (this.holdingDeletion) {
        this.updateDeletion();
    }
    this.moveSelectedCard()
    if (TouchInput.isTriggered()) {
        this.checkButtonClick()
    }
    this.checkButtonOpacity()
    if (TouchInput.x < 960) {
        this.updateScrollBar(this.scrollBar, this.deckChoices);
    }

    else
        this.updateScrollBar(this.scrollBarDeck, this.cardOptionsDeck);
    if (!TouchInput.isPressed()) this.moveScrollBar = false
};



Scene_Kamigami_Deck_Select.prototype.updateDeletion = function () {
    if (TouchInput.isReleased()) {
        this.holdingDeletion = false
        this.delButton.scale.x = 0;
        return
    }
    this.deletionTime++
    this.delButton.scale.x = this.deletionTime / 120
    if (this.deletionTime % 40 == 1) {
        AudioManager.playSe({ name: "System_paper_flip", pan: 0, pitch: 100, volume: 200 });
    }
    if (this.deletionTime >= 120) {
        AudioManager.playSe({ name: "success", pan: 0, pitch: 100, volume: 100 });
        this.delButton.scale.x = 0;
        this.holdingDeletion = false
        $dataKamigami.decks[$dataKamigami.selectedDeck] = ["??????", []];
        this.deckChoices.deckOptions[$dataKamigami.selectedDeck].configureDeck($dataKamigami.selectedDeck)
        this.infoText.text = IAVRA.I18N.localize("#{DuelVocab.MenuText.deckselect1}")
        this.cardOptionsDeck.resetDeck();
        this.loadDeck();
    }
};

Scene_Kamigami_Deck_Select.prototype.checkButtonOpacity = function () {
    this.deckButtons.forEach(button => {
        if (button.isBeingTouched()) {
            button.opacity += 10;
        } else {
            if (button.opacity > 100) {
                button.opacity -= 10;
            }
        }
    });
    if (this.btnReturn.isBeingTouched()) {
        this.btnReturn.opacity += 10;
    } else {
        if (this.btnReturn.opacity > 100) {
            this.btnReturn.opacity -= 10;
        }
    };
};


Scene_Kamigami_Deck_Select.prototype.checkButtonClick = function () {
    this.infoText.text = "";
    if (this.deckButtons[0].isBeingTouched()) {
        if ($dataKamigami.decks[$dataKamigami.selectedDeck][1].length == 41) {
            let oldDeck = $dataKamigami.chosenDeck;
            $dataKamigami.chosenDeck = $dataKamigami.selectedDeck;
            this.deckChoices.deckOptions[oldDeck].configureDeck(oldDeck)
            this.deckChoices.deckOptions[$dataKamigami.chosenDeck].configureDeck($dataKamigami.chosenDeck)
            AudioManager.playSe({ name: "button", pan: 0, pitch: 100, volume: 250 });
            this.phase = 3;
            this.countFrames = 0;
            this.tl.timeScale(4);
            this.tl.play();
            return;
        } else {
            AudioManager.playSe({ name: "Cancel1", pan: 0, pitch: 100, volume: 100 });
            this.infoText.text = IAVRA.I18N.localize("#{DuelVocab.MenuText.deckselect5}")
        }

    }
    if (this.deckButtons[1].isBeingTouched()) {
        this.phase = 2;
        this.countFrames = 0;
        AudioManager.playSe({ name: "button", pan: 0, pitch: 100, volume: 250 });
    }
    if (this.deckButtons[2].isBeingTouched()) {
        if ($dataKamigami.chosenDeck != $dataKamigami.selectedDeck) {
            this.infoText.text = IAVRA.I18N.localize("#{DuelVocab.MenuText.deckselect3}")
            this.holdingDeletion = true;
            this.deletionTime = 0;
        } else {
            AudioManager.playSe({ name: "Cancel1", pan: 0, pitch: 100, volume: 100 });
            this.infoText.text = IAVRA.I18N.localize("#{DuelVocab.MenuText.deckselect2}")
        }


    }
    if (this.btnReturn.isBeingTouched()) {
        AudioManager.playSe({ name: "success", pan: 0, pitch: 100, volume: 250 });
        this.phase = 3;
        this.countFrames = 0;
        this.tl.timeScale(4);
        this.tl.play();
    }
};

Scene_Kamigami_Deck_Select.prototype.moveSelectedCard = function () {
    if (TouchInput.x < 960) {
        this.moveDecks();
    } else {
        this.moveDeckCards();
    }
};

Scene_Kamigami_Deck_Select.prototype.moveDecks = function () {
    if (TouchInput.y > 230 && this.deckSelected != this.deckChoices.deckSelected && TouchInput.isTriggered() && this.deckChoices.deckSelected != -1) {
        this.deckSelected = this.deckChoices.deckSelected;
        if (this.deckSelected == undefined) {
            return;
        }
        AudioManager.playSe({ name: "button", pan: 0, pitch: 100, volume: 250 });
        $dataKamigami.selectedDeck = this.deckSelected

        this._big_card_front.configureGod("Back_Card");
        this.cardOptionsDeck.resetDeck();
        this.loadDeck();
        this.selectedCard = -1
    }
    let deck;
    for (let n = 0; n < 99; n++) {
        deck = this.deckChoices.deckOptions[n]
        if (this.deckSelected == n) {
            if (deck.x < 50) {
                deck.x += 5
            }
        }
        else {
            if (deck.x > 0) {
                deck.x -= 5
            }
        }
    }
    for (let n = 0; n < 150; n++) {
        card = this.cardOptionsDeck.cardOptions[n]
        if (card.x < 0 && card.x > -500) {
            card.x += 5
        }
    }
};

Scene_Kamigami_Deck_Select.prototype.moveDeckCards = function () {
    //this.deckChoices.deckSelected = -1;
    if (this.cardOptionsDeck.cardSelected == -1)
        return;
    if (this.selectedCard != this.cardOptionsDeck.cardSelected) {
        this.selectedCard = this.cardOptionsDeck.cardSelected;
        let cardName = this.cardOptionsDeck.cardOptions[this.selectedCard].card.imageBig
        let cardId = this.cardOptionsDeck.cardOptions[this.selectedCard].card.cardId
        if ($dataKamigami.allCards[this.selectedCard] > 0)
            this._big_card_front.configureGod(cardName, cardId);
        else
            this._big_card_front.configureGod("Back_Card");
    }
    let card;
    for (let n = 0; n < 150; n++) {
        card = this.cardOptionsDeck.cardOptions[n]
        if (this.selectedCard == n) {
            if (card.x > -50) {
                card.x -= 5
            }
        }
        else {
            if (card.x < 0 && card.x > -500) {
                card.x += 5
            }
        }
    }

};

Scene_Kamigami_Deck_Select.prototype.loadDeck = function () {
    if ($dataKamigami.selectedDeck < 0) { return }
    let deck = $dataKamigami.decks[$dataKamigami.selectedDeck][1];
    for (let n = 0; n < deck.length; n++) {
        this.cardOptionsDeck.addCard(deck[n], 1)
    }
    this.cardOptionsDeck.cardSelected = -1;
    this.scrollBarDeck.scale.y = Math.min(1, 700 / (this.cardOptionsDeck.selectedCardOptions.length * 50))
    this.updateDeckNum();
};

Scene_Kamigami_Deck_Select.prototype.updateTransitionBuild = function () {
    this.countFrames++;
    let distance = 0;
    this.children.forEach(child => {
        distance = (this.cardOptionsDeck.x - 60) / 20 + 2
        child.x -= distance;

        child.alpha -= 0.02;
        this.container.x = 0;
        this.container.alpha = 1;
        if (this.cardOptionsDeck.x < 60) {
            this.cardOptionsDeck.x = 60;
        }
        this.cardOptionsDeck.mask.x = this.cardOptionsDeck.x
        this.cardOptionsDeck.alpha = 1;
    });
    if (this.cardOptionsDeck.x == 60) {
        SceneManager.push(Scene_Kamigami_Deck_Build);
    }
    //
};

Scene_Kamigami_Deck_Select.prototype.updateReturnScene = function () {
    this.countFrames++;
    let distance = 0;
    this.children.forEach(child => {
        child.y += (120 - this.countFrames) / 7;
        child.alpha -= 0.03;
    });
    this.container.y = 0;
    if (this.countFrames >= 120) {
        DataManager.saveGame(1)
        SceneManager.pop();
    }
};


//-----------------------------------------------------------------------------
// SpriteCardButton
//
// The sprite for displaying a card in triple triad.

function SpriteDeckChoices() {
    this.initialize.apply(this, arguments);
}

SpriteDeckChoices.prototype = Object.create(Sprite_Card.prototype);
SpriteDeckChoices.prototype.constructor = SpriteDeckChoices;

//-----------------------------------------------------------------------------
// Function : initialize
//-----------------------------------------------------------------------------
SpriteDeckChoices.prototype.initialize = function () {
    Sprite_Card.prototype.initialize.call(this);
    this.cardSelected = 0;
    this.cardLength = 0;
    this.createMask();
    this.createAllOptions();
};

//-----------------------------------------------------------------------------
// Function : createAllOptions
//-----------------------------------------------------------------------------
SpriteDeckChoices.prototype.createAllOptions = function () {
    this.deckOptions = new Array();
    for (let n = 0; n < 99; n++) {
        this.deckOptions.push(new SpriteDeckButton())
        this.deckOptions[n].configureDeck(n)
        this.addChild(this.deckOptions[n])
        this.deckOptions[n].y = n * 50
        this.deckOptions[n].anchor.x = this.deckOptions[n].anchor.y = 0.5;
    }
    this.selectedCardOptions = { length: 99 }
};
//-----------------------------------------------------------------------------
// Function : createMask
//-----------------------------------------------------------------------------
SpriteDeckChoices.prototype.createMask = function () {
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
// Function : update
//-----------------------------------------------------------------------------
SpriteDeckChoices.prototype.update = function () {
    Sprite_Card.prototype.update.call(this);
    if (TouchInput.x > this.mask.x && TouchInput.y > this.mask.y && TouchInput.x < this.mask.x + 500 && TouchInput.y < this.mask.y + 700)
        this.deckSelected = this.getCardTouch();
};

//-----------------------------------------------------------------------------
// Function : getCardTouch - Gets the card by cursor
//-----------------------------------------------------------------------------
SpriteDeckChoices.prototype.getCardTouch = function () {
    for (let n = 0; n < 99; n++) {
        if (this.deckOptions[n].isMiniButtonTouched()) {
            return n;
        }
    };
    return -1;
};
//-----------------------------------------------------------------------------
// SpriteDeckButton
//
// The sprite for displaying a card in triple triad.

function SpriteDeckButton() {
    this.initialize.apply(this, arguments);
}

SpriteDeckButton.prototype = Object.create(Sprite_Card.prototype);
SpriteDeckButton.prototype.constructor = SpriteDeckButton;



//-----------------------------------------------------------------------------
// Function : SpriteDeckButton
//-----------------------------------------------------------------------------
SpriteDeckButton.prototype.initialize = function () {
    Sprite_Card.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Function : SpriteCardButton
//-----------------------------------------------------------------------------
SpriteDeckButton.prototype.configureDeck = function (deckId) {
    let deckInfo = $dataKamigami.decks[deckId]
    this.loadBackImage()
    this.loadName(deckInfo[0])
    if (deckId === $dataKamigami.chosenDeck) {
        let card = new KamigamiCard()
        card.loadCardData($dataKamigami.decks[$dataKamigami.chosenDeck][1][40], 0)
        this.loadCivilization(card.specialType)
    }

};

SpriteDeckButton.prototype.isMiniButtonTouched = function () {
    var x = this.canvasToLocalX(TouchInput.x + parseInt((this.width / 2) * this.scale.x));
    var y = this.canvasToLocalY(TouchInput.y + parseInt((this.height / 2) * this.scale.y));
    return x >= 0 && y >= 0 && x < this.backImage.width * this.scale.x && y < this.backImage.height * this.scale.y;

};

//-----------------------------------------------------------------------------
// Function : loadBackImage
//-----------------------------------------------------------------------------
SpriteDeckButton.prototype.loadBackImage = function (cardType) {
    this.backImage = new Sprite();
    this.backImage.bitmap = ImageManager.loadDeckBuild("imgDeckOption")
    this.addChild(this.backImage)

};

//-----------------------------------------------------------------------------
// Function : loadName
//-----------------------------------------------------------------------------
SpriteDeckButton.prototype.loadName = function (deckName) {
    this.nameText = new PIXI.Text(deckName, { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0xffffff, align: 'left' });
    this.addChild(this.nameText)
    this.nameText.x = 70
    this.nameText.y = 13
};


//-----------------------------------------------------------------------------
// Function : loadCivilization
//-----------------------------------------------------------------------------
SpriteDeckButton.prototype.loadCivilization = function (type) {
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
    this.typeIcon.y = 7
};
