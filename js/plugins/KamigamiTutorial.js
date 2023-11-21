////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// KamigamiDeck Class /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// ---------------------------------------------------------
// This class holds all basic definitions for the decks
// ---------------------------------------------------------
function KamigamiDeckTutorial() {
    this.initialize.apply(this, arguments);
}

KamigamiDeckTutorial.prototype.constructor = KamigamiDeckTutorial;

//-----------------------------------------------------------------------------
// Function : initialize
//-----------------------------------------------------------------------------
KamigamiDeckTutorial.prototype.initialize = function (cardList, turn, cardDefinitions) {
    this.cardList = cardList
    this.cardValues = []
    this.godCard = this.cardList.pop()
    this.godCardEffect = parseInt(cardDefinitions.getCardAttribute(this.godCard, "cardEffect"))
    this.godCardValues = new KamigamiCard()
    this.godCardValues.loadCardData(this.godCard, turn)
    this.loadCardValues()
}

//-----------------------------------------------------------------------------
// Function : loadCardValues
//-----------------------------------------------------------------------------
KamigamiDeckTutorial.prototype.loadCardValues = function (turn) {
    for (var n = 0; n < 40; n++) {
        this.cardValues[n] = new KamigamiCard()
        this.cardValues[n].loadCardData(this.cardList[n], turn)
    }
}
//-----------------------------------------------------------------------------
// Function : drawCard
//-----------------------------------------------------------------------------
KamigamiDeckTutorial.prototype.drawCard = function () {
    return this.cardList.shift()
}
//=============================================================================
// Scene_Kamigami_Tutorial
// Description: Main System Core
//=============================================================================

function Scene_Kamigami_Tutorial() {
    this.initialize.apply(this, arguments);
}

Scene_Kamigami_Tutorial.prototype = Object.create(Scene_Kamigami_Duel.prototype);
Scene_Kamigami_Tutorial.prototype.constructor = Scene_Kamigami_Tutorial;
//////////////////////////// MAIN START //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : initialize - initiates the graphics
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.initialize = function () {
    Scene_Kamigami_Duel.prototype.initialize.call(this);
    this.changeTutorialVariables();
    this.createTutorialFade();
    this.createTutorialChibi();
    this.createTutorialEmitter();
    this.createTutorialText();
    this.changeTutorialPosition("middle")
};

//-----------------------------------------------------------------------------
// Function : create_board_map  
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.create_board_map = function (board) {
    this.board_map = [[[0, 0], [0, 0], [0, 0], [0, 0]], [[0, 0], [0, 0], [0, 0], [0, 0]], [[0, 0], [0, 0], [0, 0], [0, 0]], [[0, 0], [0, 0], [0, 0], [0, 0]]];
    this.board_map[0][0] = [634, 215];
    this.board_map[1][0] = [851, 215];
    this.board_map[2][0] = [1068, 215];
    this.board_map[3][0] = [1285, 215];
    this.board_map[0][1] = [634, 432];
    this.board_map[1][1] = [851, 432];
    this.board_map[2][1] = [1068, 432];
    this.board_map[3][1] = [1285, 432];
    this.board_map[0][2] = [634, 649];
    this.board_map[1][2] = [851, 649];
    this.board_map[2][2] = [1068, 649];
    this.board_map[3][2] = [1285, 649];
    this.board_map[0][3] = [634, 866];
    this.board_map[1][3] = [851, 866];
    this.board_map[2][3] = [1068, 866];
    this.board_map[3][3] = [1285, 866];
    this.boardState = new KamigamiBoard()

    this.initializeTutorialDecks();
};
//-----------------------------------------------------------------------------
// Function : createTutorialChibi - initiates the graphics
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.initializeTutorialDecks = function () {
    let deck = [23, 15, 3, 29, 7, 7, 3, 23, 23, 23, 17, 17, 17, 17, 16, 16, 16, 16, 13, 13, 13, 13, 11, 11, 11, 11, 15, 15, 15, 15, 3, 3, 3, 3, 6, 6, 18, 18, 18, 18, 2]
    this.player_cards = deck;
    this.player1Deck = new KamigamiDeckTutorial(this.player_cards, 0, this.cardDefinitions)


    let npcDeck = [45, 45, 45, 45, 45, 45, 45, 45, 45, 23, 17, 17, 17, 17, 16, 16, 16, 16, 13, 13, 13, 13, 11, 11, 11, 11, 15, 15, 15, 15, 3, 3, 3, 3, 6, 6, 18, 18, 18, 18, 61]
    this.npc_cards = npcDeck;
    this.player2Deck = new KamigamiDeckTutorial(this.npc_cards, 1, this.cardDefinitions)

    this.boardState.addValue(3, this.player2Deck.godCardValues)
    this.boardState.addValue(12, this.player1Deck.godCardValues)
    this.board_place = 3
    this.callCardDefinition(this.player2Deck.godCard, false, 1)
    this.board_place = 12
    this.callCardDefinition(this.player1Deck.godCard, false, 0)

    //this._hpWindow.write_hp(this.board_cards);
}

//-----------------------------------------------------------------------------
// Function : createTutorialChibi - initiates the graphics
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.createTutorialChibi = function () {
    this._chibiTutorial = new Sprite()
    this._chibiTutorial.bitmap = ImageManager.loadExtrasKamigami("chibiTutorial")
    this._chibiTutorial.y = 50
    this._chibiTutorial.opacity = 0
    this.addChild(this._chibiTutorial)
    //this._chibiTutorial.opacity = 0
    this._backMessageTutorial = new Sprite()
    this._backMessageTutorial.bitmap = ImageManager.loadExtrasKamigami("tutorialBack")
    let text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.how}")
    this._backMessageTutorial.header = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 48, fill: 0xFFFFFF, align: 'left' });
    this._backMessageTutorial.addChild(this._backMessageTutorial.header)
    this._backMessageTutorial.header.y = -180
    this._backMessageTutorial.header.x = 45
    this._backMessageTutorial.alpha = 0.7
    this._backMessageTutorial.anchor.y = 0.5
    this._backMessageTutorial.x = 450
    this._backMessageTutorial.scale.y = 0
    this.addChild(this._backMessageTutorial)

}
//-----------------------------------------------------------------------------
// Function : createTutorialEmitter - initiates the graphics
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.createTutorialEmitter = function () {
    this._centerTutorial = new Sprite_Card();
    this._centerTutorial.bitmap = ImageManager.loadTitle1("center_effects");
    this.addChild(this._centerTutorial);
    this._centerTutorial.anchor.x = 0.5;
    this._centerTutorial.anchor.y = 0.5;
    this._centerTutorial.opacity = 0
}


//////////////////////////// MAIN START //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : initialize - initiates the graphics
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.changeTutorialVariables = function () {
    this.turn = 0
    this.onTutorial = false
    this.onTutorialPhase = -1
    this.tutorialFrameCount = 0
    this.onTutorialError = false
    $dataKamigami.difficultySetting = 0
}

//-----------------------------------------------------------------------------
// Function : createTutorialText - initiates the graphics
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.createTutorialText = function () {
    let text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.keep}")
    this._tutorialText = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 36, fill: 0xFFFFFF, align: 'left' });
    this.addChild(this._tutorialText)
    this._tutorialText.alpha = 0
    this._tutorialText.x = 500
}
//-----------------------------------------------------------------------------
// Function : createTutorialFade - initiates the graphics
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.createTutorialFade = function () {
    this._fadeTutorialScreen = new Sprite();
    this._fadeTutorialScreen.bitmap = ImageManager.loadKamigami("shop_fade");
    this.addChild(this._fadeTutorialScreen);
    this._fadeTutorialScreen.opacity = 0;
}

//-----------------------------------------------------------------------------
// Function : update_opacity - updates initial opacity
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.update_opacity = function () {
    this.board_cards[3].opacity = 255;
    this.board_cards[12].opacity = 255;
    this._hpWindow.contentsOpacity = 255;
    this.phase = 1;
    AudioManager.playBgm({ name: "Tutorial", pan: 0, pitch: 100, volume: 90 });
};

//-----------------------------------------------------------------------------
// Function : createTutorialFade - initiates the graphics
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.update = function () {
    if (this._centerTutorial.opacity == 255) {
        AudioManager.playBgs({ name: "Tutorial_guide", pan: 0, pitch: 100, volume: 30 });
    } else {
        AudioManager.stopBgs();
    }



    if (this.onTutorialError) {
        this._centerTutorial.opacity = 0
        this.callTutorialExplanation();
        Scene_Base.prototype.update.call(this);
        if (TouchInput.isTriggered()) {
            this.onTutorialError = false
            this.onTutorial = false
        }
        return
    }
    this.tutorialFrameCount++

    switch (this.onTutorialPhase) {
        case -1:
            this.drawTutorial();
            break;
        case 0:
            this.mulliganTutorial();
            break;
        case 1:
            this.devotionTutorial();
            break
        case 2:
            this.startTurnTutorial();
            break
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
            this.mainPhaseTutorial();
            break;
        case 14:
            this.mainPlayTutorial();
            break;
        case 15:
            this.afterCastTutorial();
            break;
        case 16:
            this.passTurnTutorial();
            break;
        case 18:
            this.secondTurnTutorial();
            break;
        case 19:
            this.moveTutorial();
            break;
        case 20:
            this.afterMoveTutorial();
            break;
        case 21:
            this.zeusBoltTutorial();
            break;
        case 22:
            this.zeusBoltTutorialCast();
            break;
        case 23:
        case 24:
            this._centerTutorial.opacity = 255
            this._centerTutorial.scale.x = this._centerTutorial.scale.y = 1;
            this._centerTutorial.x = this.board_map[3][0][0]
            this._centerTutorial.y = this.board_map[3][0][1]
            this.gameEndTutorial();
            break;
        case 25:
            this.gameEndTutorial2();
            break;
        default:
            break;
    }
    if (this.onTutorial) {
        Scene_Base.prototype.update.call(this);
        if (this.onTutorialPhase == 0) {
            this.basicDuelAnimations();
        }
        this.callTutorialExplanation();
        return
    } else {
        this.closeTutorialExplanation();
    }
    Scene_Kamigami_Duel.prototype.update.call(this);
}
//-----------------------------------------------------------------------------
// Function : drawTutorial
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.drawTutorial = function () {
    let text = ""
    if (this.tutorialFrameCount == 40) {
        this.onTutorial = true
        text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.draw}")
        this._tutorialText.text = text
    }
    this._centerTutorial.opacity = 0
    if (this.tutorialFrameCount > 40 && TouchInput.isTriggered()) {
        this.onTutorialPhase = 0
        this.tutorialEmitter = fx.getParticleEmitter('card-summon-sub1');
        this.tutorialEmitter.init(this._centerTutorial, true, 1.2);
        this.tutorialFrameCount = 0
        this.onTutorial = false
    }


}


//-----------------------------------------------------------------------------
// Function : devotionTutorial
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.devotionTutorial = function () {
    this._centerTutorial.opacity = 0
    if (this.tutorialFrameCount == 200) {
        this.onTutorial = true
        let text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.devotionPhase}")
        this._tutorialText.text = text
        this.changeTutorialPosition("upper")
    }
    if (this.tutorialFrameCount > 200 && TouchInput.isTriggered()) {
        this.onTutorialPhase = 2
        this.tutorialFrameCount = 0
        this.onTutorial = false
    }
}

//-----------------------------------------------------------------------------
// Function : mainPhaseTutorial
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.mainPhaseTutorial = function () {
    //this._centerTutorial.opacity = 0

    if (this.tutorialFrameCount == 120) {
        this.onTutorial = true
        let text = ""

        switch (this.onTutorialPhase) {
            case 3:
                text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.mainPhase1}")
                this.show_big_card_extra_animation(3)
                this._big_card_front.euler.y = 0
                this._centerTutorial.x = 790
                this._centerTutorial.y = 250
                this._centerTutorial.scale.x = this._centerTutorial.scale.y = 0.5
                this.changeTutorialPosition("middle")
                break;
            case 4:
                text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.mainPhase2}")
                this.show_big_card_extra_animation(3)
                this._big_card_front.euler.y = 0
                this._centerTutorial.x = 1130
                this._centerTutorial.y = 250
                this._centerTutorial.scale.x = this._centerTutorial.scale.y = 0.5
                this.changeTutorialPosition("middle")
                break;
            case 5:
                text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.mainPhase3}")
                this.show_big_card_extra_animation(3)
                this._big_card_front.euler.y = 0
                this._centerTutorial.x = 1110
                this._centerTutorial.y = 650
                this._centerTutorial.scale.x = this._centerTutorial.scale.y = 0.7
                this.changeTutorialPosition("upper")
                break;
            case 6:
                text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.mainPhase4}")
                this.show_big_card_extra_animation(3)
                this._big_card_front.euler.y = 0
                this._centerTutorial.x = 810
                this._centerTutorial.y = 650
                this._centerTutorial.scale.x = this._centerTutorial.scale.y = 0.7
                this.changeTutorialPosition("upper")
                break;
            case 7:
                text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.mainPhase5}")
                this.show_big_card_extra_animation(3)
                this._big_card_front.euler.y = 0
                this._centerTutorial.x = 1130
                this._centerTutorial.y = 560
                this._centerTutorial.scale.x = this._centerTutorial.scale.y = 0.5
                this.changeTutorialPosition("upper")
                break;
            case 8:
                text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.mainPhase6}")
                this.show_big_card_extra_animation(3)
                this._big_card_front.euler.y = 0
                this._centerTutorial.x = 790
                this._centerTutorial.y = 560
                this._centerTutorial.scale.x = this._centerTutorial.scale.y = 0.5
                this.changeTutorialPosition("upper")
                break;
            case 9:
                text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.mainPhase7}")
                this.show_big_card_extra_animation(3)
                this._big_card_front.euler.y = 0
                this._centerTutorial.x = 960
                this._centerTutorial.y = 650
                this._centerTutorial.scale.x = this._centerTutorial.scale.y = 1
                this.changeTutorialPosition("upper")
                break;
            case 10:
                text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.mainPhase8}")
                this._centerTutorial.x = this._devotion_player1.x + this._devotion_player1.width / 2
                this._centerTutorial.y = this._devotion_player1.y + this._devotion_player1.height / 2
                this._centerTutorial.scale.x = this._centerTutorial.scale.y = 0.7
                this.changeTutorialPosition("upper")
                break;
            case 11:
                text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.mainPhase9}")
                this._centerTutorial.x = this._devotion_player2.x + this._devotion_player2.width / 2
                this._centerTutorial.y = this._devotion_player2.y + this._devotion_player2.height / 2
                this._centerTutorial.scale.x = this._centerTutorial.scale.y = 0.7
                this.changeTutorialPosition("bottom")
                break;
            case 12:
                text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.mainPhase10}")
                this._centerTutorial.x = this._gyplayer1.x + this._gyplayer1.width / 2
                this._centerTutorial.y = this._gyplayer1.y + this._gyplayer1.height / 2
                this._centerTutorial.scale.x = this._centerTutorial.scale.y = 1.2
                this.changeTutorialPosition("upper")
                break;
            case 13:
                text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.mainPhase11}")
                this._centerTutorial.x = this._cards_player_1_all[6].x
                this._centerTutorial.y = this._cards_player_1_all[6].y
                this._centerTutorial.scale.x = this._centerTutorial.scale.y = 1.2
                this.changeTutorialPosition("upper")
                break;
            default:
                break;
        }

        this._tutorialText.text = text

    }
    if (this.tutorialFrameCount > 120 && TouchInput.isTriggered()) {
        this.onTutorialPhase++
        this.tutorialFrameCount = 90
        this.onTutorial = false
    }
}

//-----------------------------------------------------------------------------
// Function : mainPlayTutorial
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.mainPlayTutorial = function () {
    this._centerTutorial.x = this._cards_player_1[0].x
    this._centerTutorial.y = this._cards_player_1[0].y
    this._centerTutorial.opacity = 255
    this._centerTutorial.scale.x = this._centerTutorial.scale.y = 2
    if (this.tutorialFrameCount == 120) {
        this.onTutorial = true
        let text = ""

        switch (this.onTutorialPhase) {
            case 14:
                text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.tutorialPlay1}")
                this.changeTutorialPosition("upper")
                break;
        }
        this._tutorialText.text = text
    }
    if (this.tutorialFrameCount > 120 && TouchInput.isTriggered()) {
        this.tutorialFrameCount = -3000
        this.onTutorial = false
    }
}
//-----------------------------------------------------------------------------
// Function : afterCastTutorial
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.afterCastTutorial = function () {
    if (this.tutorialFrameCount > 30 && TouchInput.isTriggered()) {
        this.tutorialFrameCount = 0
        this.onTutorialPhase = 16
        this.onTutorial = false
    }
};


//-----------------------------------------------------------------------------
// Function : moveTutorial
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.moveTutorial = function () {
    this._centerTutorial.opacity = 255
    this._centerTutorial.scale.x = this._centerTutorial.scale.y = 1;
    if (this.tutorialFrameCount == 30) {
        if (this.board_map[this.board_place % 4][Math.min(this.board_place / 4)]) {
            this._centerTutorial.x = this.board_map[this.board_place % 4][Math.min(this.board_place / 4)][0]
            this._centerTutorial.y = this.board_map[this.board_place % 4][Math.min(this.board_place / 4)][1]
        }

        this.onTutorial = true
        let text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.tutorialPlay5}")
        this._tutorialText.text = text
    }
    if (this.tutorialFrameCount > 30 && TouchInput.isTriggered()) {
        this.tutorialFrameCount = -900
        this.onTutorial = false
    }
};
//-----------------------------------------------------------------------------
// Function : afterMoveTutorial
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.afterMoveTutorial = function () {
    this._centerTutorial.x = this._passBtn.x + this.chatCommandSpriteView.x
    this._centerTutorial.y = this._passBtn.y + this.chatCommandSpriteView.y
    this._centerTutorial.scale.x = this._centerTutorial.scale.y = 0.5
    this._centerTutorial.opacity = 255
    if (this.tutorialFrameCount == 30) {
        this.onTutorial = true
        let text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.tutorialPlay6}")
        this._tutorialText.text = text
    }
    if (this.tutorialFrameCount > 30 && TouchInput.isTriggered()) {
        this.tutorialFrameCount = -900
        this.onTutorial = false
    }
};

//-----------------------------------------------------------------------------
// Function : zeusBoltTutorial
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.zeusBoltTutorial = function () {
    this._centerTutorial.x = this._cards_player_1[1].x
    this._centerTutorial.y = this._cards_player_1[1].y
    this._centerTutorial.opacity = 255
    this._centerTutorial.scale.x = this._centerTutorial.scale.y = 2
    if (this.tutorialFrameCount == 600) {
        this.onTutorial = true
        let text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.tutorialPlay7}")
        this._tutorialText.text = text
    }
    if (this.tutorialFrameCount > 600 && TouchInput.isTriggered()) {
        this.tutorialFrameCount = -200
        this.onTutorial = false
    }
};
//-----------------------------------------------------------------------------
// Function : zeusBoltTutorialCast
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.zeusBoltTutorialCast = function () {
    this._centerTutorial.opacity = 0
    if (this.tutorialFrameCount == 30) {
        this.onTutorial = true
        let text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.tutorialPlay8}")
        this._tutorialText.text = text
    }
    if (this.tutorialFrameCount > 30 && TouchInput.isTriggered()) {
        this.tutorialFrameCount = 0
        this.onTutorialPhase = 23
        this.onTutorial = false
    }
};

//-----------------------------------------------------------------------------
// Function : gameEndTutorial
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.gameEndTutorial = function () {
    if (this.tutorialFrameCount == 90 && this.onTutorialPhase == 23) {
        this.onTutorial = true
        let text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.tutorialPlay9}")
        this._tutorialText.text = text
        this.set_devotion(0, 200)
        this.changeTutorialPosition("bottom")
    }
    if (this.devotion_player1 < 15 && this.onTutorialPhase == 24) {
        this.onTutorial = true
        let text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.tutorialPlay10}")
        this._tutorialText.text = text
        this.set_devotion(0, 200)
        this.changeTutorialPosition("bottom")
    }
    if (this.tutorialFrameCount > 90 && TouchInput.isTriggered()) {
        this.tutorialFrameCount = 0
        this.onTutorialPhase = 24
        this.onTutorial = false
    }
};

//-----------------------------------------------------------------------------
// Function : startTurnTutorial
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.startTurnTutorial = function () {
    this._centerTutorial.opacity = 0
    if (this.tutorialFrameCount == 130) {
        this.onTutorial = true
        let text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.startPhase}")
        this._tutorialText.text = text
    }
    if (this.tutorialFrameCount > 130 && TouchInput.isTriggered()) {
        this.onTutorialPhase = 3
        this.tutorialFrameCount = 0
        this.onTutorial = false
    }
}
//-----------------------------------------------------------------------------
// Function : passTurnTutorial - callsTutorial
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.passTurnTutorial = function () {
    if (this.tutorialFrameCount == 30) {
        this.onTutorial = true
        let text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.tutorialPlay3}")
        this._tutorialText.text = text
        this._centerTutorial.x = this._passBtn.x + this.chatCommandSpriteView.x
        this._centerTutorial.y = this._passBtn.y + this.chatCommandSpriteView.y
        this._centerTutorial.scale.x = this._centerTutorial.scale.y = 0.5
        if (this._centerTutorial.y < 540) {
            this.changeTutorialPosition("bottom")
        } else {
            this.changeTutorialPosition("upper")
        }
    }
    if (this.tutorialFrameCount > 30 && TouchInput.isTriggered()) {
        this.tutorialFrameCount = -180
        this.onTutorial = false
    }
};
//-----------------------------------------------------------------------------
// Function : secondTurnTutorial - callsTutorial
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.secondTurnTutorial = function () {
    this._centerTutorial.x = this._cards_player_1[0].x
    this._centerTutorial.y = this._cards_player_1[0].y
    this._centerTutorial.opacity = 255
    this._centerTutorial.scale.x = this._centerTutorial.scale.y = 2
    if (this.tutorialFrameCount == 300) {
        this.onTutorial = true
        let text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.tutorialPlay4}")
        this._tutorialText.text = text
        this.changeTutorialPosition("upper")
    }
    if (this.tutorialFrameCount > 180 && TouchInput.isTriggered()) {
        this.tutorialFrameCount = -600
        this.onTutorial = false
    }
};


//-----------------------------------------------------------------------------
// Function : callTutorialExplanation - callsTutorial
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.mulliganTutorial = function () {
    if (this.extra_animations[0] && this.extra_animations[0][0] == 'MulliganPlayer') {
        this.onTutorial = true
        text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.keep}")
        this._tutorialText.text = text
        this._centerTutorial.x = this.keepBtn.x
        this._centerTutorial.y = this.keepBtn.y
    }
}


//-----------------------------------------------------------------------------
// Function : callTutorialExplanation - callsTutorial
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.closeTutorialExplanation = function () {
    if (this._tutorialText.alpha > 0) {
        this._tutorialText.alpha -= 0.1
        if (this._tutorialText.alpha < 0) {
            this._tutorialText.alpha = 0
        }
        return
    }
    if (this._fadeTutorialScreen.opacity > 0) {
        this._fadeTutorialScreen.opacity -= 10
        this._centerTutorial.opacity -= 15
        this._chibiTutorial.opacity -= 15
        if (this._backMessageTutorial.scale.y > 0) {
            this._backMessageTutorial.scale.y -= 0.1
            if (this._backMessageTutorial.scale.y < 0)
                this._backMessageTutorial.scale.y = 0
        }
    }
}


//-----------------------------------------------------------------------------
// Function : callTutorialExplanation - callsTutorial
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.callTutorialExplanation = function () {
    if (this._fadeTutorialScreen.opacity < 210) {
        if (this._fadeTutorialScreen.opacity == 0) {
            AudioManager.playSe({ name: "Tutorial_msg", pan: 0, pitch: 100, volume: 80 });
        }
        this._fadeTutorialScreen.opacity += 10
        this._centerTutorial.opacity += 15
        this._chibiTutorial.opacity += 15
        if (this._backMessageTutorial.scale.y < 1) {
            this._backMessageTutorial.scale.y += 0.05
            if (this._backMessageTutorial.scale.y > 1)
                this._backMessageTutorial.scale.y = 1
        }

        return
    }
    if (this._tutorialText.alpha < 0.8) {
        this._tutorialText.alpha += 0.1
        if (this._tutorialText.alpha > 0.8) {
            this._tutorialText.alpha = 0.8
        }
    }
}
//-----------------------------------------------------------------------------
// Function : changeTutorialPosition
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.changeTutorialPosition = function (position) {

    this._chibiTutorial.y = 0
    this._backMessageTutorial.y = 250
    this._tutorialText.y = 150
    switch (position) {
        case "middle":
            this._chibiTutorial.y += 280
            this._backMessageTutorial.y += 280
            this._tutorialText.y += 280
            break;
        case "bottom":
            this._chibiTutorial.y += 560
            this._backMessageTutorial.y += 560
            this._tutorialText.y += 560
            break;
    }
};

//-----------------------------------------------------------------------------
// Function : newMulligan
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.newMulligan = function () {
};
//-----------------------------------------------------------------------------
// Function : closeKeep
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.closeKeep = function () {
    Scene_Kamigami_Duel.prototype.closeKeep.call(this, ...arguments);
    this.onTutorial = false
    this.onTutorialPhase = 1
    this.tutorialFrameCount = 0
}

//-----------------------------------------------------------------------------
// Function : checkStartTurnEffects
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.checkStartTurnEffects = function (turn = this.turn) {
    Scene_Kamigami_Duel.prototype.checkStartTurnEffects.call(this, ...arguments);
}

//-----------------------------------------------------------------------------
// Function : proceed_cast 
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.proceed_cast = function () {
    Scene_Kamigami_Duel.prototype.proceed_cast.call(this, ...arguments);
    let text = ""
    if (this.onTutorialPhase == 14) {
        this.onTutorialPhase = 15;
        text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.tutorialPlay2}")
        this._tutorialText.text = text
        this.onTutorial = true
        this.tutorialFrameCount = 0
    }

    if (this.onTutorialPhase == 18) {
        this.onTutorialPhase = 19;
        text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.tutorialPlay5}")
        this._tutorialText.text = text
        this.onTutorial = true
        this.tutorialFrameCount = 0
        this.set_devotion(0, 5)
    }
    if (this.onTutorialPhase == 21 && this.turn == 0) {
        this.onTutorialPhase = 22;
        text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.tutorialPlay8}")
        this._tutorialText.text = text
        this.onTutorial = true
        this.tutorialFrameCount = 0
    }
};

//////////////////////////// PHASE 10 //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : proceed_pass_turn
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.proceed_pass_turn = function () {
    let tutorialTimes = [16, 17, 20]
    if (!tutorialTimes.includes(this.onTutorialPhase) && this.turn == 0) {
        this.onTutorial = true
        let text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.tutorialError2}")
        this._tutorialText.text = text
        this.changeTutorialPosition("middle")
        this.onTutorialError = true
        this.phase = 4
        return
    }
    Scene_Kamigami_Duel.prototype.proceed_pass_turn.call(this, ...arguments);
    if (this.onTutorialPhase != 21) {
        this.onTutorialPhase++
        this.tutorialFrameCount = 0
        this.onTutorial = false
    }

};
//-----------------------------------------------------------------------------
// Function : proceed_move
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.proceed_move = function () {
    if (this.onTutorialPhase != 19 && this.onTutorialPhase != 24) {
        if (this.devotion_player1 > 6) {
            this.onTutorial = true
            let text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.tutorialError1}")
            this._tutorialText.text = text
            this.changeTutorialPosition("middle")
            this.onTutorialError = true
        }
        return
    }
    Scene_Kamigami_Duel.prototype.proceed_move.call(this, ...arguments);
}


//-----------------------------------------------------------------------------
// Function : proceed_move_card
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.proceed_move_card = function () {
    Scene_Kamigami_Duel.prototype.proceed_move_card.call(this, ...arguments);
    if (this.onTutorialPhase == 19) {
        this.onTutorialPhase = 20
        this.tutorialFrameCount = 0
        this.onTutorial = false
    }
};

//-----------------------------------------------------------------------------
// Function : callEndGame - Ends the Game
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.callEndGame = function () {
    this.onTutorialPhase = 25
    this.tutorialFrameCount = 0
    this.onTutorial = false
    Scene_Kamigami_Duel.prototype.callEndGame.call(this, ...arguments);
}
//-----------------------------------------------------------------------------
// Function : gameEndTutorial2 - Ends the Game
//-----------------------------------------------------------------------------
Scene_Kamigami_Tutorial.prototype.gameEndTutorial2 = function () {
    this._centerTutorial.opacity = 0
    if (this.tutorialFrameCount == 60) {
        this.onTutorial = true
        let text = IAVRA.I18N.localize("#{DuelVocab.TutorialDescription.tutorialPlay11}")
        this._tutorialText.text = text
        this.changeTutorialPosition("middle")
    }
    if (this.tutorialFrameCount > 60 && TouchInput.isTriggered()) {
        this.tutorialFrameCount = 0
        this.onTutorial = false
        this.onTutorialPhase = 26
    }
}
