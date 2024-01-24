//-----------------------------------------------------------------------------
// Scene_Kamigami_Deck_Build Menu
//
// The scene class of the menu screen.

function Scene_Kamigami_Deck_Choose() {
    this.initialize.apply(this, arguments);
}

Scene_Kamigami_Deck_Choose.prototype = Object.create(Scene_Base.prototype);
Scene_Kamigami_Deck_Choose.prototype.constructor = Scene_Kamigami_Deck_Choose;

Scene_Kamigami_Deck_Choose.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this, ...arguments)
    type = $dataKamigami.arcMythology
    this.createVariables(type);
    this.createTable();
    this.createSpecialCard3d();

    this.createDecks();
    this.createGods(type);

    this.createBackChooseDeck();
    this.createButtons();
    this.createBigGods(type);
    this.createGodBackgrounds(type);
    this.createWhiteFlash();
    this.createSpecialCard3d_2();
    this.createAllDecksMini();
    this.createMainGodCard();
    this.createButtonsChoice();

};
Scene_Kamigami_Deck_Choose.prototype.createButtonsChoice = function () {
    this.chooseButtonBack = new Sprite()
    this.chooseButtonBack.bitmap = ImageManager.loadDeckBuild("chooseDeck")
    this.addChild(this.chooseButtonBack)
    this.chooseButtonBack.y = Graphics.height - 257
    this.chooseButtonBack.x = -800

    this.returnButtonBack = new Sprite()
    this.returnButtonBack.bitmap = ImageManager.loadDeckBuild("chooseBack")
    this.addChild(this.returnButtonBack)
    this.returnButtonBack.y = Graphics.height - 257
    this.returnButtonBack.x = Graphics.width - 703 + 800

    this.chooseButtonLight = new Sprite_Kami_ButtonLight(0, "deckchoose1", 70, 0xB600FF, 90);
    this.addChild(this.chooseButtonLight)
    this.chooseButtonLight.y = Graphics.height - 250
    this.chooseButtonLight.opacity = 0

    this.returnButtonLight = new Sprite_Kami_ButtonLight(1, "deckchoose2", -70, 0xB600FF, 90);
    this.addChild(this.returnButtonLight)
    this.returnButtonLight.y = Graphics.height - 250
    this.returnButtonLight.x = Graphics.width - 490
    this.returnButtonLight.opacity = 0
    this.chooseButton = new Sprite_Kami_Button(0, "deckchoose1", 70, 90);
    this.addChild(this.chooseButton)
    this.chooseButton.y = Graphics.height - 250
    this.chooseButton.opacity = 0

    this.returnButton = new Sprite_Kami_Button(1, "deckchoose2", -70, 90);
    this.addChild(this.returnButton)
    this.returnButton.y = Graphics.height - 250
    this.returnButton.x = Graphics.width - 490
    this.returnButton.opacity = 0
};

Scene_Kamigami_Deck_Choose.prototype.createAllDecksMini = function () {
    this.miniDecks = [[], [], []]
    for (let n = 0; n < 3; n++) {
        for (let m = 0; m < 40; m++) {
            let cardId = this.deckLists[n][m];
            this.miniDecks[n][m] = new SpriteStaticGod();
            this.miniDecks[n][m].configureGod(Game_Kamigami.convertedCardList[cardId].Image_Big, cardId)
            this.miniDecks[n][m].anchor.x = this.miniDecks[n][m].anchor.y = 0.5;

            this.specialCardCameraMini.addChild(this.miniDecks[n][m])
            this.miniDecks[n][m].convertSubtreeTo3d()
            this.miniDecks[n][m].scale3d.x = this.miniDecks[n][m].scale3d.y = 0.4
            this.miniDecks[n][m].anchor.x = this.miniDecks[n][m].anchor.y = 0.5
            this.miniDecks[n][m].opacity = 255;
        }
    };

};


Scene_Kamigami_Deck_Choose.prototype.createGodBackgrounds = function (type) {
    this.godsBackground = new Array(3);
    let godsBack
    switch (type) {
        case 0:
            godsBack = ["Fundo_Hades1", "Fundo_Ryujin", "Fundo_Sky2"];
            break;
        case 1:
            godsBack = ["Fundo_Underworld2", "Fundo_Desert2", "Fundo_Amaterasu"];
            break;
        case 2:
            godsBack = ["Fundo_Hel", "Fundo_AsgardOld", "Fundo_Sky2"];
            break;
        case 3:
            godsBack = ["Fundo_Hades1", "Fundo_Susano", "Fundo_Amaterasu"];
            break;
    }
    for (let n = 0; n < 3; n++) {
        this.godsBackground[n] = new Sprite();
        this.godsBackground[n].bitmap = ImageManager.loadPicture(godsBack[n])
        this.addChild(this.godsBackground[n])
        this.godsBackground[n].opacity = 0;
    }
};

Scene_Kamigami_Deck_Choose.prototype.createMainGodCard = function () {
    this.godCard = new SpriteStaticGod()
    //this.godCard.configureGod(Game_Kamigami.convertedCardList[this.deckLists[this.deckChoice][40]].Image_Big, this.deckLists[this.deckChoice][40])

    this.specialCardCameraMini.addChild(this.godCard)
    this.godCard.anchor.x = this.godCard.anchor.y = 0.5
    this.godCard.convertSubtreeTo3d()
    this.godCard.y = 0
    this.specialCardCameraMini.euler.x = Math.PI / 2
};


Scene_Kamigami_Deck_Choose.prototype.createBigGods = function (type) {
    this.bigGods = new Array(3);
    let godNames
    switch (type) {
        case 0:
            godNames = ["Hades", "Poseidon", "Zeus"]
            break;
        case 1:
            godNames = ["Set", "Isis", "Ra"]
            break;
        case 2:
            godNames = ["Hel", "Odin", "Thor"]
            break;
        case 3:
            godNames = ["Izanami", "Izanagi", "Amaterasu"]
            break;
    }
    
    for (let index = 0; index < this.bigGods.length; index++) {
        this.bigGods[index] = new Sprite();
        this.bigGods[index].bitmap = ImageManager.loadFace(godNames[index])
        this.addChild(this.bigGods[index])
        this.bigGods[index].x = index * 500 - 500
        this.bigGods[index].opacity = 0;
    }

};
Scene_Kamigami_Deck_Choose.prototype.createWhiteFlash = function () {
    this.flashScreen = new Sprite();
    this.flashScreen.bitmap = new Bitmap(Graphics.width, Graphics.height);
    this.flashScreen.bitmap.fillRect(0, 0, Graphics.width, Graphics.height, 'rgba(255, 255, 255, 255)')
    this.addChild(this.flashScreen)
    this.flashScreen.opacity = 0;

    this.darkScreen = new Sprite();
    this.darkScreen.bitmap = new Bitmap(Graphics.width, Graphics.height);
    this.darkScreen.bitmap.fillRect(0, 0, Graphics.width, Graphics.height, 'rgba(0, 0, 0, 255)')
    this.addChild(this.darkScreen)
    this.darkScreen.opacity = 0;
};


Scene_Kamigami_Deck_Choose.prototype.createButtons = function () {
    this.buttons = new Array(3);
    for (let index = 0; index < this.buttons.length; index++) {
        this.buttons[index] = new Sprite_Card();
        this.buttons[index].bitmap = new Bitmap(300, 400)
        this.addChild(this.buttons[index])
        this.buttons[index].anchor.x = this.buttons[index].anchor.y = 0.5;
        this.buttons[index].x = index * 500 - 500 + Graphics.width / 2
        this.buttons[index].y = 300 + Graphics.height / 2
    }
};


Scene_Kamigami_Deck_Choose.prototype.createTable = function () {
    this.background = new Sprite()
    this.background.bitmap = ImageManager.loadPicture("Fundo_City")
    this.addChild(this.background)

    this.table = new Sprite()
    this.table.bitmap = ImageManager.loadDeckBuild("imgTable")
    this.addChild(this.table)
};


Scene_Kamigami_Deck_Choose.prototype.createVariables = function (type) {

    this.phase = 0;
    this.countFrames = 0;
    this.deckLists = [];
    switch (type) {
        case 0:
            this.deckLists[0] = [267, 267, 251, 251, 268, 268, 268, 268, 254, 254, 254, 254, 248, 248, 243, 243, 259, 259, 259, 259, 256, 256, 256, 256, 266, 266, 266, 266, 255, 255, 255, 255, 258, 258, 258, 258, 257, 257, 257, 257, 120]
            this.deckLists[1] = [262, 262, 262, 262, 255, 255, 255, 255, 252, 252, 252, 252, 249, 249, 249, 249, 250, 250, 250, 250, 244, 244, 244, 244, 261, 261, 261, 261, 259, 259, 259, 259, 263, 263, 258, 258, 258, 258, 245, 245, 121]
            this.deckLists[2] = [269, 269, 247, 247, 247, 247, 263, 263, 263, 263, 257, 257, 257, 257, 256, 256, 256, 256, 253, 253, 253, 253, 251, 251, 251, 251, 255, 255, 255, 255, 243, 243, 243, 243, 246, 246, 258, 258, 258, 258, 122]
            break;
        case 1:
            this.deckLists[0] = [276, 276, 276, 276, 286, 286, 286, 286, 290, 290, 290, 290, 285, 285, 285, 285, 294, 294, 294, 294, 279, 279, 279, 279, 292, 292, 292, 292, 280, 280, 280, 280, 273, 273, 273, 273, 295, 295, 295, 295, 152]
            this.deckLists[1] = [283, 283, 283, 283, 284, 284, 284, 284, 277, 277, 277, 277, 274, 274, 274, 274, 290, 290, 290, 290, 279, 279, 279, 279, 289, 289, 289, 289, 296, 296, 296, 296, 265, 265, 265, 265, 286, 286, 286, 286, 150]
            this.deckLists[2] = [282, 282, 282, 282, 278, 278, 278, 278, 286, 286, 286, 286, 287, 287, 277, 277, 280, 280, 275, 275, 275, 275, 285, 285, 285, 285, 283, 283, 283, 283, 323, 323, 323, 323, 290, 290, 284, 284, 284, 284, 151]
            break;
        case 2:
            this.deckLists[0] = [305, 305, 305, 305, 304, 304, 304, 304, 310, 310, 310, 310, 306, 306, 306, 306, 308, 308, 308, 308, 307, 307, 307, 307, 312, 312, 312, 312, 315, 315, 315, 315, 311, 311, 311, 311, 317, 317, 317, 317, 178]
            this.deckLists[1] = [323, 323, 323, 323, 313, 313, 313, 313, 303, 303, 303, 303, 326, 326, 326, 326, 312, 312, 312, 312, 310, 310, 310, 308, 308, 308, 314, 314, 314, 314, 305, 305, 305, 305, 320, 320, 320, 320, 329, 329, 180]
            this.deckLists[2] = [320, 320, 320, 320, 302, 302, 302, 302, 310, 310, 310, 310, 314, 314, 314, 314, 307, 307, 307, 307, 306, 306, 306, 306, 319, 319, 319, 319, 321, 321, 317, 317, 322, 322, 318, 318, 304, 304, 304, 304, 181]
            break;
        case 3:
            this.deckLists[0] = [349, 349, 349, 349, 347, 347, 347, 347, 346, 346, 346, 346, 351, 351, 351, 351, 343, 343, 343, 343, 337, 337, 337, 337, 336, 336, 336, 336, 340, 340, 340, 340, 341, 341, 341, 341, 344, 344, 344, 344, 212]
            this.deckLists[1] = [350, 350, 350, 350, 346, 346, 346, 346, 355, 355, 355, 355, 354, 354, 354, 354, 334, 334, 342, 342, 342, 342, 338, 338, 338, 338, 340, 340, 340, 340, 343, 343, 343, 343, 352, 352, 349, 349, 349, 349, 211]
            this.deckLists[2] = [355, 355, 355, 355, 354, 354, 354, 354, 339, 339, 339, 339, 343, 343, 343, 343, 338, 338, 338, 338, 346, 346, 346, 346, 350, 350, 350, 350, 347, 347, 347, 347, 341, 341, 341, 341, 336, 336, 336, 336, 210]
            break;
    }


    this.map = []
    for (let n = 0; n < 12; n++) {
        this.map[n] = [];
        if (n % 6 <= 2) {
            this.map[n][0] = - (n % 3) * 200 - 400
        } else {
            this.map[n][0] = (2 - n % 3) * 200 + 400
        }
        if (Math.floor(n / 6) == 1) {
            this.map[n][1] = -200 - 150
        } else {
            this.map[n][1] = 200 - 150
        }
    }

    //this.deckChoice = 2;
    //this.setAllFinalPositions()
};

Scene_Kamigami_Deck_Choose.prototype.createSpecialCard3d = function () {
    this.specialCardCamera = new PIXI.projection.Camera3d();
    this.specialCardCamera.position.set(Graphics.width / 2, Graphics.height / 2);
    this.specialCardCamera.setPlanes(1400, 180, 10000, false);
    this.addChild(this.specialCardCamera);


    this.godsCardCamera = new PIXI.projection.Camera3d();
    this.godsCardCamera.position.set(Graphics.width / 2, Graphics.height / 2);
    this.godsCardCamera.setPlanes(1400, 180, 10000, false);
    this.addChild(this.godsCardCamera);
};

Scene_Kamigami_Deck_Choose.prototype.createSpecialCard3d_2 = function () {
    this.specialCardCameraMini = new PIXI.projection.Camera3d();
    this.specialCardCameraMini.position.set(Graphics.width / 2, Graphics.height / 2);
    this.specialCardCameraMini.setPlanes(1400, 180, 10000, false);
    this.addChild(this.specialCardCameraMini);

};
Scene_Kamigami_Deck_Choose.prototype.createDecks = function () {
    this.decks = [[], [], []]
    this.deckFinalRotation = [[], [], []]
    for (let n = 0; n < 3; n++) {
        for (let m = 0; m < 40; m++) {
            let cardId = this.deckLists[n][m];
            this.decks[n][m] = new SpriteStaticGod();
            this.decks[n][m].configureGod(Game_Kamigami.convertedCardList[cardId].Image_Big, cardId)
            this.decks[n][m].anchor.x = this.decks[n][m].anchor.y = 0.5;

            this.specialCardCamera.addChild(this.decks[n][m])
            this.decks[n][m].convertSubtreeTo3d()
            this.decks[n][m].x = n * 500 - 500
            this.decks[n][m].y = -m * 2 + 40 + 250
            this.decks[n][m].opacity = 1
            this.decks[n][m].scale3d.x = this.decks[n][m].scale3d.y = 0.5
            this.decks[n][m].euler.x = -1;
            this.decks[n][m].euler.z = Math.PI / 8 - Math.random() * Math.PI / 4
        }
    };
};
Scene_Kamigami_Deck_Choose.prototype.createGods = function () {
    this.godsCards = new Array(3)
    for (let n = 0; n < 3; n++) {
        let cardId = this.deckLists[n][40];
        this.godsCards[n] = new SpriteStaticGod();
        this.godsCards[n].configureGod(Game_Kamigami.convertedCardList[cardId].Image_Big, cardId);
        this.godsCards[n].anchor.x = this.godsCards[n].anchor.y = 0.5;

        this.specialCardCamera.addChild(this.godsCards[n])
        this.godsCards[n].convertSubtreeTo3d()
        this.godsCards[n].position3d.z = -100
        this.godsCards[n].scale3d.x = this.godsCards[n].scale3d.y = 2
        this.godsCards[n].opacity = 0

    }
    //this.resetGodCardPositions();
};

Scene_Kamigami_Deck_Choose.prototype.createBackChooseDeck = function () {
    this.backChooseDeck = new Sprite()
    this.backChooseDeck.bitmap = ImageManager.loadDeckBuild("backChooseDeck")
    this.addChild(this.backChooseDeck)
    this.backChooseDeck.y = -170;
    let chooseText = IAVRA.I18N.localize("#{DuelVocab.MenuText.deckChoose}")
    this.chooseDeckText = new PIXI.Text(chooseText, { fontFamily: 'Chau Philomene One', fontSize: 72, fill: 0xffffff, align: 'center' });
    this.chooseDeckText.x = Graphics.width / 2
    this.chooseDeckText.y = 50;
    this.chooseDeckText.anchor.x = 0.5
    this.addChild(this.chooseDeckText)
    this.chooseDeckText.alpha = 0;
    this.chooseDeckText.onAlpha = true;
};


Scene_Kamigami_Deck_Choose.prototype.update = function () {
    Scene_Base.prototype.update.call(this, ...arguments)
    this.countFrames++
    switch (this.phase) {
        case 0:
            this.placeAllCards();
            break;
        case 1:
            this.placeChooseDeck();
            break;
        case 2:
            this.deckSelecting();
            break;
        case 3:
            this.updateButtonHovers();
            break;
        case 4:
            this.updateClosingScene();
            break;
        default:
            break;
    }
};

Scene_Kamigami_Deck_Choose.prototype.placeAllCards = function () {
    for (let n = 0; n < 3; n++) {
        if (this.decks[0][0].opacity == 6) {
            AudioManager.playSe({ name: "Athena_3_Deck_Shuffle", pan: 0, pitch: 100, volume: 100 });
        }
        for (let m = 0; m < 40; m++) {
            if (this.decks[2][39].opacity == 255) {
                continue
            }
            if (this.countFrames < n * 40 + m) {
                continue
            }
            if (this.decks[n][m].euler.z > 0) {
                this.decks[n][m].euler.z -= 0.01
                if (this.decks[n][m].euler.z < 0) {
                    this.decks[n][m].euler.z = 0
                }
            }
            if (this.decks[n][m].euler.z < 0) {
                this.decks[n][m].euler.z += 0.01
                if (this.decks[n][m].euler.z > 0) {
                    this.decks[n][m].euler.z = 0
                }
            }

            this.decks[n][m].opacity += 5
            if (this.decks[2][39].opacity == 255) {
                this.countFrames = 0
                this.resetGodCardPositions();
            }
        }
    };

    if (this.decks[2][39].opacity == 255) {
        if (this.countFrames == 1) {
            AudioManager.playSe({ name: "Athena_3_Card_flip", pan: 0, pitch: 100, volume: 100 });
        }
        for (let n = 0; n < 3; n++) {
            if (this.countFrames < n * 30) {
                continue
            }
            if (this.godsCards[n].scale3d.y > 0.5) {
                this.godsCards[n].scale3d.y -= 0.05
                this.godsCards[n].scale3d.x -= 0.05
                if (this.godsCards[n].scale3d.y < 0.5) {
                    this.godsCards[n].scale3d.y = 0.5
                    this.godsCards[n].scale3d.x = 0.5
                }
                this.moveGodCard(n, this.countFrames - n * 30)
            }
            this.godsCards[n].opacity += 15

        }

        if (this.godsCards[2].scale3d.y == 0.5) {
            this.countFrames = 0
            AudioManager.playBgm({ name: $dataKamigami.ShopMusic, pan: 0, pitch: 100, volume: 90 });
            this.phase = 1;
        }

    }
};
Scene_Kamigami_Deck_Choose.prototype.moveGodCard = function (godId, frames) {
    switch (godId) {
        case 2:
            this.godsCards[godId].euler.x += 0.05;
            this.godsCards[godId].euler.z -= 0.01
            this.godsCards[godId].y += 30 - frames
            this.godsCards[godId].x -= 30 - frames
            break;

        case 1:
            this.godsCards[godId].euler.x -= 0.05;
            this.godsCards[godId].euler.z -= 0.01
            this.godsCards[godId].y += 30 - frames
            this.godsCards[godId].x += (30 - frames) / 2
            break;
        case 0:
            this.godsCards[godId].euler.x -= 0.05;
            this.godsCards[godId].euler.z -= 0.01
            this.godsCards[godId].x += 30 - frames
            this.godsCards[godId].y += 30 - frames
            break;
    }
};


Scene_Kamigami_Deck_Choose.prototype.resetGodCardPositions = function () {
    for (let n = 0; n < 3; n++) {
        switch (n) {
            case 2:
                this.godsCards[n].euler.x = 0 - 30 * 0.05;
                this.godsCards[n].euler.z = 0.3
                this.godsCards[n].euler.y = 0.5
                this.godsCards[n].x = n * 500 - 500 - 70 + 435
                this.godsCards[n].y = 260 - 435
                break;

            case 1:
                this.godsCards[n].euler.x = -0.2 + 30 * 0.05;;
                this.godsCards[n].euler.z = 0.2
                this.godsCards[n].euler.y = -0.3
                this.godsCards[n].x = n * 500 - 500 + 50 - 435 / 2
                this.godsCards[n].y = 270 - 435
                break;
            case 0:
                this.godsCards[n].euler.x = -0.5 + 30 * 0.05;
                this.godsCards[n].euler.z = 0.1
                this.godsCards[n].euler.y = -0.5
                this.godsCards[n].x = - 500 + 100 - 435
                this.godsCards[n].y = 260 - 435
                break;
        }
    }

};


Scene_Kamigami_Deck_Choose.prototype.placeChooseDeck = function () {
    if (this.backChooseDeck.y < 0) {
        this.backChooseDeck.y += (-this.backChooseDeck.y) / 20 + 1
        return
    }
    if (this.backChooseDeck.y > 0) {
        this.backChooseDeck.y = 0
    }
    if (this.chooseDeckText.onAlpha) {
        this.chooseDeckText.alpha += 0.01
        if (this.chooseDeckText.alpha >= 1.0) {
            this.chooseDeckText.onAlpha = false;
        }
    } else {
        this.chooseDeckText.alpha -= 0.01
        if (this.chooseDeckText.alpha <= 0.5) {
            this.chooseDeckText.onAlpha = true;
        }
    }
    for (let index = 0; index < 3; index++) {
        if (this.buttons[index].isBeingTouched()) {
            if (this.bigGods[index].opacity == 0) {
                AudioManager.playSe({ name: "menu_select", pan: 0, pitch: 95, volume: 100 });
            }
            if (this.bigGods[index].opacity < 150)
                this.bigGods[index].opacity += 5
            if (TouchInput.isTriggered()) {
                AudioManager.playSe({ name: "success", pan: 0, pitch: 95, volume: 100 });
                this.deckChoice = index;
                this.phase = 2;
                this.godCard.configureGod(Game_Kamigami.convertedCardList[this.deckLists[this.deckChoice][40]].Image_Big, this.deckLists[this.deckChoice][40])

                this.setAllFinalPositions();
                return;
            }

        } else {
            this.bigGods[index].opacity -= 5
        }
    }


};
Scene_Kamigami_Deck_Choose.prototype.setAllFinalPositions = function () {
    let mapIndex = 0
    let cardNum = 0
    let n = this.deckChoice;
    this.finalPositions = []
    for (let m = 39; m >= 0; m--) {
        this.finalPositions[m] = [this.map[mapIndex][0] + cardNum * 20, this.map[mapIndex][1] + cardNum * 10]
        if (m > 0)
            if (this.deckLists[n][m] != this.deckLists[n][m - 1]) {
                mapIndex++
                cardNum = 0;
            } else {
                cardNum++
            }
    };
};



Scene_Kamigami_Deck_Choose.prototype.deckSelecting = function () {
    if (this.godCard.opacity == 255 && this.flashScreen.opacity < 255) {
        this.flashScreen.opacity += 10
        if (this.flashScreen.opacity == 255) {
            this.godCard.opacity = 254;
            this.godsBackground[this.deckChoice].opacity = 255;
	    AudioManager.playSe({ name: "Athena_Main_Card_flip", pan: 0, pitch: 100, volume: 90 });
        }
        return;
    }
    if (this.flashScreen.opacity > 0) {
        this.flashScreen.opacity -= 10;
        return;
    }
    if (this.darkScreen.opacity < 150) {
        this.darkScreen.opacity += 10
    }
    if (this.specialCardCameraMini.euler.x > 0) {
        this.specialCardCameraMini.euler.x -= 0.05;
        if (this.specialCardCameraMini.euler.x < 0) {
            this.specialCardCameraMini.euler.x = 0
        }
        this.countFrames = 0
        return;
    }
    if (this.chooseButtonBack.x < 0) {
        let dist = (-this.chooseButtonBack.x / 20) + 1
        this.chooseButtonBack.x += dist
        this.returnButtonBack.x -= dist
        if (this.chooseButton.opacity < 170) {
            this.chooseButton.opacity += 10
            this.returnButton.opacity += 10
        }
        if (this.chooseButtonBack.x > 0) {
            this.chooseButtonBack.x = 0
            this.returnButtonBack.x = Graphics.width - 703
        }

    }
    this.positionAllMiniCards()
};

Scene_Kamigami_Deck_Choose.prototype.positionAllMiniCards = function () {
    let deck = this.miniDecks[this.deckChoice]
    let count = 0;
        if (this.countFrames == 1)  {
	   AudioManager.playSe({ name: "Athena_Choosen_Deck", pan: 0, pitch: 95, volume: 100 });
	   return
	}
    for (let n = 0; n < 40; n++) {
        if (n * 3 > this.countFrames) {
	    return
        }
        if (deck[n].x < this.finalPositions[n][0]) {
            deck[n].x += (this.finalPositions[n][0] - deck[n].x) / 20 + 1
	    if (deck[n].x > this.finalPositions[n][0]) {
                deck[n].x = this.finalPositions[n][0]
            }
        }
        if (deck[n].x > this.finalPositions[n][0]) {
            deck[n].x += (this.finalPositions[n][0] - deck[n].x) / 20 - 1
            if (deck[n].x < this.finalPositions[n][0]) {
                deck[n].x = this.finalPositions[n][0]
            }
        }
        if (deck[n].y < this.finalPositions[n][1]) {
            deck[n].y += (this.finalPositions[n][1] - deck[n].y) / 20 + 1
            if (deck[n].y > this.finalPositions[n][1]) {
                deck[n].y = this.finalPositions[n][1]
            }
        }
        if (deck[n].y > this.finalPositions[n][1]) {
            deck[n].y += (this.finalPositions[n][1] - deck[n].y) / 20 - 1
            if (deck[n].y < this.finalPositions[n][1]) {
                deck[n].y = this.finalPositions[n][1]
            }
        }
        if (deck[n].x == this.finalPositions[n][0] && deck[n].y == this.finalPositions[n][1]) {
            count++
        }
        deck[n].euler.x = (this.finalPositions[n][0] / deck[n].x) - 1
        deck[n].euler.y = (this.finalPositions[n][1] / deck[n].y) - 1
    }
    if (count == 40) {
        this.phase = 3;
    }
};

Scene_Kamigami_Deck_Choose.prototype.updateButtonHovers = function () {
    if (this.returnButton.isBeingTouched()) {
        if (this.returnButtonLight.opacity == 0) {
            AudioManager.playSe({ name: "menu_select", pan: 0, pitch: 95, volume: 100 });
        }
        this.returnButtonLight.opacity += 15
        if (TouchInput.isTriggered()) {
            AudioManager.playSe({ name: "Cancel1", pan: 0, pitch: 95, volume: 100 });
            this.btnChoice = 1;
            this.phase = 4
            this.countFrames = 0
        }
    } else {
        this.returnButtonLight.opacity -= 15
    }
    if (this.chooseButton.isBeingTouched()) {
        if (this.chooseButtonLight.opacity == 0) {
            AudioManager.playSe({ name: "menu_select", pan: 0, pitch: 95, volume: 100 });
        }
        this.chooseButtonLight.opacity += 15
        if (TouchInput.isTriggered()) {
            AudioManager.playSe({ name: "Athena_Deck_Choose", pan: 0, pitch: 95, volume: 100 });
            AudioManager.stopBgm();
	    this.btnChoice = 0;
            this.phase = 4
            this.countFrames = 0
        }
    } else {
        this.chooseButtonLight.opacity -= 15
    }
    let cardChoice = 40
    for (let n = 0; n < 40; n++) {
        if (this.miniDecks[this.deckChoice][n].is3dMiniButtonTouched()) {
            cardChoice = n
        }
    }
    this.refreshBigCard(cardChoice)
};

Scene_Kamigami_Deck_Choose.prototype.refreshBigCard = function (cardChoice) {
    let deckList = this.deckLists[this.deckChoice]
    let bigCard = Game_Kamigami.convertedCardList[deckList[cardChoice]].Image_Big
    if (this.godCard.bigName != bigCard) {
        this.godCard.bigName = bigCard
        this.godCard.configureGod(bigCard, deckList[cardChoice])
    }
};


Scene_Kamigami_Deck_Choose.prototype.updateClosingScene = function () {
    if (this.btnChoice == 0) {
        if (this.countFrames < 60) {
            if (this.countFrames % 10 < 5) {
                this.chooseButtonLight.opacity += 50
            } else {
                this.chooseButtonLight.opacity -= 50
            }
            return
        }

    }
    if (this.btnChoice == 0) {
        this.closeSceneConfirm();
    } else {
        this.backDeckChoiceScreen();
    }
    this.chooseButton.opacity -= 10;
    this.returnButton.opacity -= 10;
    this.chooseButtonLight.opacity -= 10;
    this.returnButtonLight.opacity -= 10;
    if (this.chooseButtonBack.x > -800) {
        let frame = this.countFrames
        if (this.btnChoice == 0) {
            frame -= 60
        }
        this.chooseButtonBack.x -= frame
        this.returnButtonBack.x += frame
        return;
    }
    if (this.darkScreen.opacity > 0) {
        this.darkScreen.opacity -= 10
        return
    }
    if (this.specialCardCameraMini.euler.x != Math.PI / 2) {
        return
    }
    if (this.flashScreen.opacity < 255 && this.godsBackground[this.deckChoice].opacity == 255) {
        this.flashScreen.opacity += 10
        if (this.flashScreen.opacity == 255) {
            this.godsBackground[this.deckChoice].opacity = 0
        }
        return
    }
    if (this.flashScreen.opacity > 0) {
        this.flashScreen.opacity -= 10
        if (this.flashScreen.opacity == 0) {
            this.phase = 1
        }
    }
};

Scene_Kamigami_Deck_Choose.prototype.closeSceneConfirm = function () {
    let frame = this.countFrames - 60
    let deck = this.miniDecks[this.deckChoice]
    let count = 0;
    for (let n = 0; n < 40; n++) {
        if (deck[n].x == 0 && deck[n].y == Graphics.height) {
            count++
            continue;
        }
        if (n > frame) {
            continue
        }
        if (deck[n].x < 0) {
            deck[n].x += (0 - deck[n].x) / 40 + 1
            if (deck[n].x > 0) {
                deck[n].x = 0
            }
        }
        if (deck[n].x > 0) {
            deck[n].x += (0 - deck[n].x) / 40 - 1
            if (deck[n].x < 0) {
                deck[n].x = 0
            }
        }
        if (deck[n].y < Graphics.height) {
            deck[n].y += (Graphics.height - deck[n].y) / 40 + 1
            if (deck[n].y > Graphics.height) {
                deck[n].y = Graphics.height
            }
        }

        deck[n].euler.x = (deck[n].x / 600)
        deck[n].euler.y += 0.01
    }
    if (count != 40) {
        return
    }
    if (this.godCard.scale3d.x > 0.4) {
        this.godCard.scale3d.x = this.godCard.scale3d.y -= 0.05
        this.specialFrame = 0;
        return
    }
    this.specialFrame++
    this.specialCardCameraMini.y += this.specialFrame
    if (this.specialCardCameraMini.y > Graphics.height + 300) {
        this.addNewDeck();
        $dataKamigami.gameOptions.deck = true
        SceneManager.pop()
        this.phase = 5;
    }
};

Scene_Kamigami_Deck_Choose.prototype.backDeckChoiceScreen = function () {
    let deck = this.miniDecks[this.deckChoice]
    let count = 0;
        if (this.countFrames == 10)  {
	   AudioManager.playSe({ name: "Athena_Deck_Shuffle", pan: 0, pitch: 100, volume: 100 });
	   return
	}
        if (this.countFrames == 80)  {
	   AudioManager.playSe({ name: "Athena_Main_Card_unflip", pan: 0, pitch: 100, volume: 100 });
	   return
	}
 
    for (let n = 0; n < 40; n++) {
        if (deck[n].x == 0 && deck[n].y == 0) {
            count++
	    continue;
        }
        if (deck[n].x < 0) {
            deck[n].x += (0 - deck[n].x) / 20 + 1
            if (deck[n].x > 0) {
                deck[n].x = 0
            }
        }
        if (deck[n].x > 0) {
            deck[n].x += (0 - deck[n].x) / 20 - 1
            if (deck[n].x < 0) {
                deck[n].x = 0
            }
        }
        if (deck[n].y < 0) {
            deck[n].y += (0 - deck[n].y) / 20 + 1
            if (deck[n].y > 0) {
                deck[n].y = 0
            }
        }
        if (deck[n].y > 0) {
            deck[n].y += (0 - deck[n].y) / 20 - 1
            if (deck[n].y < 0) {
                deck[n].y = 0
            }
        }

        deck[n].euler.x = (this.finalPositions[n][0] / deck[n].x) - 1
        deck[n].euler.y = (this.finalPositions[n][1] / deck[n].y) - 1
    }
    if (count != 40) {
        return
    }
    if (this.specialCardCameraMini.euler.x < Math.PI / 2) {
        this.specialCardCameraMini.euler.x += 0.1
        if (this.specialCardCameraMini.euler.x > Math.PI / 2) {
            this.specialCardCameraMini.euler.x = Math.PI / 2
            this.godCard.opacity = 255
        }
    }
};
Scene_Kamigami_Deck_Choose.prototype.addNewDeck = function () {
    let deckNames
    switch ( $dataKamigami.arcMythology) {
        case 0:
            deckNames = ["Hades Basic Deck", "Poseidon Basic Deck", "Zeus Basic Deck"]
            break;
        case 1:
            deckNames = ["Set Basic Deck", "Isis Basic Deck", "Ra Basic Deck"]
            break;
        case 2:
            deckNames = ["Hel Basic Deck", "Odin Basic Deck", "Thor Basic Deck"]
            break;
        case 3:
            deckNames = ["Izanami Basic Deck", "Izanagi Basic Deck", "Amaterasu Basic Deck"]
            break;
    }
    let availableSlot = -1
    for (n = 0 ; n < 99; n++){
        if ($dataKamigami.decks[n][1].length == 0) {
            availableSlot = n
            break;
        }
    }
    if (availableSlot != -1) {
        $dataKamigami.decks[availableSlot] = [deckNames[this.deckChoice], this.deckLists[this.deckChoice]]
    }
    
    for (let n = 0; n < 41; n++) {
        $dataKamigami.allCards[this.deckLists[this.deckChoice][n]]++;
    }
};


