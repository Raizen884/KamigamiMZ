//-----------------------------------------------------------------------------
// Scene_Main Menu
//
// The scene class of the menu screen.

function Scene_KamigameDemo() {
    this.initialize.apply(this, arguments);
}

Scene_KamigameDemo.prototype = Object.create(Scene_Base.prototype);
Scene_KamigameDemo.prototype.constructor = Scene_KamigameDemo;

Scene_KamigameDemo.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Function : update
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.update = function () {
    Scene_Base.prototype.create.call(this);
    this.updateArrowOpacity();
    this.updateConfirmButton();
};
//-----------------------------------------------------------------------------
// Function : updateConfirmButton
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.updateConfirmButton = function () {
    if (this.selectButton.isMiniButtonTouched()) {
        this.selectButton.opacity += 10;
        if (TouchInput.isTriggered()) {
            promptDeck = this.index + 1;
            promptDeck2 = Math.randomInt(13) + 1;
                SceneManager.goto(Scene_Title)
        }
    } else {
        if (this.selectButton.opacity > 130) {
            this.selectButton.opacity -= 10;
        }
    }
};
//-----------------------------------------------------------------------------
// Function : updateArrowOpacity
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.rotateGods = function (num) {
    this.index += num;
    if (this.index < 0) {
        this.index = 13;
    }
    if (this.index > 13) {
        this.index = 0;
    }
};
//-----------------------------------------------------------------------------
// Function : updateArrowOpacity
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.updateArrowOpacity = function () {
    if (this.arrowDown.isMiniButtonTouched()) {
        this.arrowDown.opacity += 10;
        if (TouchInput.isTriggered()) {
            this.rotateGods(-1);
            this.refreshGodInfo();
        }
    } else {
        if (this.arrowDown.opacity > 130) {
            this.arrowDown.opacity -= 10;
        }
    }
    if (this.arrowUp.isMiniButtonTouched()) {
        this.arrowUp.opacity += 10;
        if (TouchInput.isTriggered()) {
            this.rotateGods(1);
            this.refreshGodInfo();
        }
    } else {
        if (this.arrowUp.opacity > 130) {
            this.arrowUp.opacity -= 10;
        }
    }
};


//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this.databaseText = "";
    this.createDatabase();
    this.createVariables();
    this.createDemoText();
    this.createMiniatureCards();
    this.createArrows();
    this.createWindowLayer();
    this.createDescriptionText();
    this.createSelectButton();
};
//-----------------------------------------------------------------------------
// Function : createSelectButton
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.createSelectButton = function () {
    this.selectButton = new Sprite_Card()
    this.selectButton.bitmap = ImageManager.loadExtrasKamigami("Select")
    this.addChild(this.selectButton)
    this.selectButton.anchor.x = this.selectButton.anchor.y = 0.5
    this.selectButton.x = 1150
    this.selectButton.y = 860
};

//-----------------------------------------------------------------------------
// Function : createDatabase
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.createDatabase = function () {
    this.textDatabase = new Array(14);
    this.textDatabase[0] = this.loadHades();
    this.textDatabase[1] = this.loadPoseidon();
    this.textDatabase[2] = this.loadZeus();
    this.textDatabase[3] = this.loadIsis();
    this.textDatabase[4] = this.loadRa();
    this.textDatabase[5] = this.loadSet();
    this.textDatabase[6] = this.loadHel();
    this.textDatabase[7] = this.loadLoki();
    this.textDatabase[8] = this.loadOdin();
    this.textDatabase[9] = this.loadThor();
    this.textDatabase[10] = this.loadAmaterasu();
    this.textDatabase[11] = this.loadIzanagi();
    this.textDatabase[12] = this.loadIzanami();
    this.textDatabase[13] = this.loadTsukiyomi();
};

//-----------------------------------------------------------------------------
// Function : loadAmaterasu
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.loadAmaterasu = function () {
    let text = [];
    text.push("Japanese Goddess - Amaterasu")
    let databaseText = "Offensive - 3/10\nDefensive - 4/10\n"
    databaseText += "Synergy - 10/10\n\n"
    databaseText += "Amaterasu is the goddess of sun! On Kamigami she can generate\n"
    databaseText += "Huge amounts of devotion based on the number of cards drawn.\n"
    databaseText += "Use this to your advantage to create an enourmous advantage\n"
    databaseText += "over your opponents.\n"
    text.push(databaseText)
    return text;
};

//-----------------------------------------------------------------------------
// Function : loadHades
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.loadHades = function () {
    let text = [];
    text.push("Greek God - Hades")
    let databaseText = "Offensive - 8/10\nDefensive - 1/10\n"
    databaseText += "Synergy - 9/10\n\n"
    databaseText += "Hades is the underworld god! On Kamigami he can generate\n"
    databaseText += "extra devotion according to the number of cards in your graveyard.\n"
    databaseText += "This makes Hades extremely powerful on the late game!\n"
    databaseText += "Fill your graveyard to create immensive pressure on the opponent.\n"
    text.push(databaseText)
    return text;
};


//-----------------------------------------------------------------------------
// Function : loadPoseidon
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.loadPoseidon = function () {
    let text = [];
    text.push("Greek Goddess - Poseidon")
    let databaseText = "Offensive - 8/10\nDefensive - 4/10\n"
    databaseText += "Synergy - 6/10\n\n"
    databaseText += "Poseidon is the goddess of the sea! With her powerful trident\n"
    databaseText += "Poseidon enjoys joing the battle! Poseidon gets stronger with\n"
    databaseText += "each greek permanent you control, once a certain amount of \n"
    databaseText += "permanents is on the battlefield, she becomes unstoppable!.\n"
    text.push(databaseText)
    return text;
};

//-----------------------------------------------------------------------------
// Function : loadZeus
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.loadZeus = function () {
    let text = [];
    text.push("Greek Goddess - Zeus")
    let databaseText = "Offensive - 10/10\nDefensive - 1/10\n"
    databaseText += "Synergy - 6/10\n\n"
    databaseText += "Zeus is the goddess of the Sky! Zeus is very anger tempered,\n"
    databaseText += "using every greek force you have, Zeus grants you more devotion.\n"
    databaseText += "Swarm the battlefield and create huge early game threats that\n"
    databaseText += "your opponents won't even be ready for!\n"
    text.push(databaseText)
    return text;
};

//-----------------------------------------------------------------------------
// Function : loadIsis
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.loadIsis = function () {
    let text = [];
    text.push("Egyptian Goddess - Isis")
    let databaseText = "Offensive - 2/10\nDefensive - 8/10\n"
    databaseText += "Synergy - 7/10\n\n"
    databaseText += "Isis is the goddess of Life and magic! Isis heals all egyptian\n"
    databaseText += "units. That means any damage your units take will eventually be\n"
    databaseText += "worn away! This gives a huge battle advantage and makes massive\n"
    databaseText += "battlefield damages one sided!\n"
    text.push(databaseText)
    return text;
};

//-----------------------------------------------------------------------------
// Function : loadRa
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.loadRa = function () {
    let text = [];
    text.push("Egyptian Goddess - Ra")
    let databaseText = "Offensive - 7/10\nDefensive - 5/10\n"
    databaseText += "Synergy - 7/10\n\n"
    databaseText += "Ra is the goddess of Sun and Creation! Ra disconciders the casting\n"
    databaseText += "rule. Which means any place on the battlefield can be dominated by\n"
    databaseText += "Ra's army! With this there are no gaps between permanents any more.\n"
    databaseText += "This makes Ra both good at attacking and defending!\n"
    text.push(databaseText)
    return text;
};

//-----------------------------------------------------------------------------
// Function : loadSet
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.loadSet = function () {
    let text = [];
    text.push("Egyptian Goddess - Set")
    let databaseText = "Offensive - 8/10\nDefensive - 2/10\n"
    databaseText += "Synergy - 8/10\n\n"
    databaseText += "Set is the god of Chaos! Set doesn't care if he uses the undead\n"
    databaseText += "to fight for him. This enables a lot of recursion with the \n"
    databaseText += "graveyard! Using the right cards, Set can enable huge deities\n"
    databaseText += "to enter the battlefield turns before they would normally enter!\n"
    text.push(databaseText)
    return text;
};

//-----------------------------------------------------------------------------
// Function : loadHel
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.loadHel = function () {
    let text = [];
    text.push("Norse Goddess - Hel")
    let databaseText = "Offensive - 7/10\nDefensive - 5/10\n"
    databaseText += "Synergy - 5/10\n\n"
    databaseText += "Hel is the goddess of the dead! Hel doesn't actually care for\n"
    databaseText += "the living. She uses their life to improve her abilities!\n"
    databaseText += "With enough sacrifices, Hel can rule the battlefield!\n"
    databaseText += "Once your opponents notice how powerful she is, it will be too late.\n"
    text.push(databaseText)
    return text;
};


//-----------------------------------------------------------------------------
// Function : loadLoki
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.loadLoki = function () {
    let text = [];
    text.push("Norse Goddess - Loki")
    let databaseText = "Offensive - ??/10\nDefensive - ??/10\n"
    databaseText += "Synergy - ??/10\n\n"
    databaseText += "Loki is the goddess of trickery! Loki swaps the orders\n"
    databaseText += "of permanents on the battlefield. She can attack, defend, \n"
    databaseText += "using the mess Loki creates will destroy both offensive \n"
    databaseText += "and defensive your opponents!\n"
    text.push(databaseText)
    return text;
};

//-----------------------------------------------------------------------------
// Function : loadOdin
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.loadOdin = function () {
    let text = [];
    text.push("Norse Goddess - Odin")
    let databaseText = "Offensive - 9/10\nDefensive - 3/10\n"
    databaseText += "Synergy - 3/10\n\n"
    databaseText += "Odin is a war god of wisdom! Odin can lend huge power\n"
    databaseText += "to any norse on the battle! This is temporary so using\n"
    databaseText += "it at the right moments will allow you to dominate your\n"
    databaseText += "opponents!\n"
    text.push(databaseText)
    return text;
};

//-----------------------------------------------------------------------------
// Function : loadThor
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.loadThor = function () {
    let text = [];
    text.push("Norse Goddess - Thor")
    let databaseText = "Offensive - 9/10\nDefensive - 3/10\n"
    databaseText += "Synergy - 3/10\n\n"
    databaseText += "Thor is the goddess of thunder! Thor lends you more\n"
    databaseText += "devotion as the battle progresses! Using the Norse's war\n"
    databaseText += "spirit, attack your opponent relentlessly and Thor will\n"
    databaseText += "reward you!\n"
    text.push(databaseText)
    return text;
};

//-----------------------------------------------------------------------------
// Function : loadIzanagi
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.loadIzanagi = function () {
    let text = [];
    text.push("Japanese Goddess - Izanagi")
    let databaseText = "Offensive - 6/10\nDefensive - 6/10\n"
    databaseText += "Synergy - 7/10\n\n"
    databaseText += "Izanagi is the god of creation! Izanagi can create huge\n"
    databaseText += "amounts of devotion using your resources! This allows\n"
    databaseText += "incredibly strong cards hitting the battlefield turns\n"
    databaseText += "earlier!\n"
    text.push(databaseText)
    return text;
};

//-----------------------------------------------------------------------------
// Function : loadIzanami
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.loadIzanami = function () {
    let text = [];
    text.push("Japanese Goddess - Izanami")
    let databaseText = "Offensive - 2/10\nDefensive - 10/10\n"
    databaseText += "Synergy - 5/10\n\n"
    databaseText += "Izanami is the goddess of death! Izanami sacrifices her\n"
    databaseText += "own permanents to decimate the opponents permanents!\n"
    databaseText += "She doesn't care what she has to sacrifice as long as\n"
    databaseText += "her opponent is hopeless on an empty board.\n"
    text.push(databaseText)
    return text;
};

//-----------------------------------------------------------------------------
// Function : loadTsukiyomi
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.loadTsukiyomi = function () {
    let text = [];
    text.push("Japanese Goddess - Tsukiyomi")
    let databaseText = "Offensive - 3/10\nDefensive - 9/10\n"
    databaseText += "Synergy - 4/10\n\n"
    databaseText += "Tsukiyomi is the goddess of the moon! Tsukiyomi enables\n"
    databaseText += "your miracles to be more efficient! This allows for more\n"
    databaseText += "efficient resource trade with your opponents. Can your\n"
    databaseText += "opponent keep up with the amount of miracles Tsukiyomi has?\n"
    text.push(databaseText)
    return text;
};

//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.createVariables = function () {
    this.index = 0;
};

//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.createDemoText = function () {
    this.infoImage = new Sprite();
    this.infoImage.bitmap = new Bitmap(1920, 600);
    this.infoImage.bitmap.outlineWidth = 0;
    this.infoImage.bitmap.fontSize = 40;
    this.infoImage.bitmap.textColor = "#86C9A3";
    this.infoImage.bitmap.drawText("Kamigami Demo - Choose a deck to play", 0, 0, 1920, 100, 'center');
    this.infoImage.bitmap.drawText("Deck building will be available on the full version", 0, 0, 1920, 200, 'center');
    this.addChild(this.infoImage)
};

//-----------------------------------------------------------------------------
// Function : createMiniatureCards
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.createMiniatureCards = function () {
    this.godCard = new Sprite_Clickable();
    this.godCard.x = -25
    this.godCard.y = 200
    this.addChild(this.godCard)
    this.loadAmaterasu();
};
//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.createDescriptionText = function () {
    this.descriptionText = new Window_Base(450, 200, 1400, 800);
    this.addWindow(this.descriptionText)

    this.infoGoddess = new Sprite();
    this.infoGoddess.bitmap = new Bitmap(1920, 600);
    this.infoGoddess.bitmap.outlineWidth = 0;
    this.infoGoddess.bitmap.fontSize = 50;
    this.infoGoddess.bitmap.textColor = "#FF0048";
    this.addChild(this.infoGoddess)
    this.refreshGodInfo();
};
//-----------------------------------------------------------------------------
// Function : createArrows
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.createArrows = function () {
    this.arrowUp = new Sprite_Card()
    this.arrowUp.bitmap = ImageManager.loadIgnisShop("arrow_left")
    this.arrowUp.rotation = Math.PI / 2
    this.arrowUp.x = 200
    this.arrowUp.y = 160
    this.arrowUp.anchor.x = this.arrowUp.anchor.y = 0.5;
    this.addChild(this.arrowUp)
    this.arrowDown = new Sprite_Card()
    this.arrowDown.bitmap = ImageManager.loadIgnisShop("arrow_left")
    this.arrowDown.rotation = Math.PI / 2 * 3
    this.arrowDown.anchor.x = this.arrowDown.anchor.y = 0.5;
    this.arrowDown.x = 200
    this.arrowDown.y = 900
    this.addChild(this.arrowDown)
};


//-----------------------------------------------------------------------------
// Function : refreshGodInfo
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.refreshGodInfo = function () {
    this.loadCard();
    this.descriptionText.contents.clear();
    this.infoGoddess.bitmap.clear();
    this.descriptionText.drawTextEx(this.textDatabase[this.index][1], 0, 100)
    this.infoGoddess.bitmap.drawText(this.textDatabase[this.index][0], 300, 200, 1620, 100, 'center');

};

//-----------------------------------------------------------------------------
// Function : loadCard
//-----------------------------------------------------------------------------
Scene_KamigameDemo.prototype.loadCard = function () {
    let cardNames = ["big_hades", "big_poseidon", "big_zeus", "big_isis", "big_ra", "big_set",
        "big_hel", "big_loki", "big_odin", "big_thor", "big_amaterasu", "big_izanagi", "big_izanami",
        "big_tsukiyomi"]
    this.godCard.bitmap = ImageManager.loadKamigami(cardNames[this.index]);
};



Scene_Boot.prototype.start = function () {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
        DataManager.setupEventTest();
        SceneManager.goto(Scene_Map);
    } else {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_KamigameDemo);
        Window_TitleCommand.initCommandPosition();
    }
    this.updateDocumentTitle();
};
var promptDeck;
var promptDeck2;
//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Title.prototype.create = function () {
    //kamigamiAliasCreate.call(this);
    kamigamiAliasCreate.call(this);
    //return
    //var promptDeck = prompt("Insira o deck para você jogar :D\n1 - Zeus* \n2 - Poseidon* \n3 - Hades* \n4 - Amaterasu \n5 - Izanami* \n6 - Tsukuyomi* \n7 - Izanagi \n8 - Ra \n9 - Isis \n10 - Set    \n11 - Odin \n12 - Thor \n13 - Loki \n14 - Hel \n15 - Izanagi \n * IA oponente implementada :D", "1");
    //var promptDeck = prompt("Insira o deck para você jogar :D, vai de 1 até 14", "1");
    //var promptDeck = "13"
    switch (promptDeck.toString()) {
        case "0": //TestDecks
            $dataKamigami.self_tt_cards = []
            for (var n = 0; n < 20; n++) {
                $dataKamigami.self_tt_cards.push(65)
            }
            for (var n = 0; n < 20; n++) {
                $dataKamigami.self_tt_cards.push(64)
            }
            $dataKamigami.self_tt_cards.push(1)
            break
        case "3": //Zeus
            $dataKamigami.self_tt_cards = [29, 29, 7, 7, 7, 7, 23, 23, 23, 23, 17, 17, 17, 17, 16, 16, 16, 16, 13, 13, 13, 13, 11, 11, 11, 11, 15, 15, 15, 15, 3, 3, 3, 3, 6, 6, 18, 18, 18, 18, 2]
            break
        case "2": // Poseidon
            $dataKamigami.self_tt_cards = [22, 22, 22, 22, 15, 15, 15, 15, 12, 12, 12, 12, 9, 9, 9, 9, 10, 10, 10, 10, 4, 4, 4, 4, 21, 21, 21, 21, 19, 19, 19, 19, 23, 23, 18, 18, 18, 18, 5, 5, 1]
            break
        case "1": //Hades
            $dataKamigami.self_tt_cards = [116, 116, 116, 116, 5, 5, 5, 5, 14, 14, 14, 14, 8, 8, 3, 3, 19, 19, 19, 19, 108, 108, 108, 108, 54, 54, 54, 54, 15, 15, 15, 15, 18, 18, 18, 18, 17, 17, 17, 17, 0]
            break
        case "11": //Amaterasu
            $dataKamigami.self_tt_cards = [115, 115, 115, 115, 114, 114, 114, 114, 99, 99, 99, 99, 103, 103, 103, 103, 98, 98, 98, 98, 106, 106, 106, 106, 110, 110, 110, 110, 107, 107, 107, 107, 101, 101, 101, 101, 96, 96, 96, 96, 90]
            break
        case "13": //Izanami
            $dataKamigami.self_tt_cards = [109, 109, 109, 109, 107, 107, 107, 107, 106, 106, 106, 106, 111, 111, 111, 111, 103, 103, 103, 103, 97, 97, 97, 97, 96, 96, 96, 96, 100, 100, 100, 100, 101, 101, 101, 101, 104, 104, 104, 104, 92]
            break
        case "14": //Tsukuyomi
            $dataKamigami.self_tt_cards = [100, 100, 29, 29, 29, 29, 69, 69, 26, 26, 25, 25, 25, 25, 84, 84, 106, 106, 106, 106, 107, 107, 107, 107, 110, 110, 110, 110, 118, 118, 118, 118, 103, 103, 103, 103, 57, 57, 113, 113, 93] //93
            break
        case "12": //Izanagi
            $dataKamigami.self_tt_cards = [110, 110, 110, 110, 106, 106, 106, 106, 115, 115, 115, 115, 114, 114, 114, 114, 94, 94, 102, 102, 102, 102, 98, 98, 98, 98, 100, 100, 100, 100, 103, 103, 103, 103, 112, 112, 109, 109, 109, 109, 91]
            break
        case "5": //Ra
            $dataKamigami.self_tt_cards = [42, 42, 42, 42, 38, 38, 38, 38, 46, 46, 46, 46, 47, 47, 37, 37, 40, 40, 35, 35, 35, 35, 45, 45, 45, 45, 43, 43, 43, 43, 83, 83, 83, 83, 50, 50, 44, 44, 44, 44, 31]
            break
        case "4": //Isis
            $dataKamigami.self_tt_cards = [43, 43, 43, 43, 44, 44, 44, 44, 37, 37, 37, 37, 34, 34, 34, 34, 50, 50, 50, 50, 39, 39, 39, 39, 49, 49, 49, 49, 56, 56, 56, 56, 25, 25, 25, 25, 46, 46, 46, 46, 30]
            break
        case "6": //Set    
            $dataKamigami.self_tt_cards = [116, 116, 116, 116, 46, 46, 46, 46, 50, 50, 50, 50, 20, 20, 20, 20, 54, 54, 54, 54, 39, 39, 39, 39, 108, 108, 108, 108, 40, 40, 40, 40, 33, 33, 33, 33, 7, 7, 55, 55, 32]
            break
        case "9": //Odin
            $dataKamigami.self_tt_cards = [83, 83, 83, 83, 73, 73, 73, 73, 63, 63, 63, 63, 86, 86, 86, 86, 72, 72, 72, 72, 70, 70, 70, 68, 68, 68, 74, 74, 74, 74, 65, 65, 65, 65, 80, 80, 80, 80, 89, 89, 60]
            break
        case "10": //Thor
            $dataKamigami.self_tt_cards = [80, 80, 80, 80, 62, 62, 62, 62, 70, 70, 70, 70, 74, 74, 74, 74, 67, 67, 67, 67, 66, 66, 66, 66, 79, 79, 79, 79, 81, 81, 77, 77, 82, 82, 78, 78, 64, 64, 64, 64, 61]
            break
        case "8": //Loki
            $dataKamigami.self_tt_cards = [70, 70, 70, 70, 62, 62, 62, 62, 72, 72, 72, 72, 80, 80, 80, 80, 76, 76, 73, 73, 73, 73, 63, 63, 63, 63, 84, 84, 87, 87, 64, 64, 82, 82, 82, 82, 71, 71, 71, 71, 59]
            break
        case "7": //Hel
            $dataKamigami.self_tt_cards = [65, 65, 65, 65, 64, 64, 64, 64, 70, 70, 70, 70, 66, 66, 66, 66, 68, 68, 68, 68, 67, 67, 67, 67, 72, 72, 72, 72, 75, 75, 75, 75, 71, 71, 71, 71, 77, 77, 77, 77, 58]
            break
        case "15": //Izanagi
            $dataKamigami.self_tt_cards = [110, 110, 110, 110, 106, 106, 106, 106, 52, 52, 52, 52, 114, 114, 114, 114, 100, 100, 102, 102, 102, 102, 98, 98, 98, 98, 118, 118, 118, 118, 103, 103, 103, 103, 112, 112, 111, 111, 111, 111, 91]
            break
        case "16": //Testing
            $dataKamigami.self_tt_cards = [13, 13, 13, 13, 15, 15, 15, 15, 19, 19, 19, 19, 35, 35, 35, 35, 50, 50, 50, 50, 38, 38, 38, 38, 72, 72, 72, 72, 97, 97, 97, 97, 103, 103, 103, 103, 106, 106, 106, 106, 1]
            break

    }

    //var promptDeck2 = prompt("Insira o deck para seu opp :D, vai de 1 até 14", "1");
    //var promptDeck2 = "13"
    switch (promptDeck2.toString()) {
        case "0": //TestDecks
            $dataKamigami.enemy_tt_cards = []
            for (var n = 0; n < 20; n++) {
                $dataKamigami.enemy_tt_cards.push(14)
            }
            for (var n = 0; n < 20; n++) {
                $dataKamigami.enemy_tt_cards.push(14)
            }
            $dataKamigami.enemy_tt_cards.push(1)
            break
        case "1": //Zeus OK
            $dataKamigami.enemy_tt_cards = [29, 29, 7, 7, 7, 7, 23, 23, 23, 23, 17, 17, 17, 17, 16, 16, 16, 16, 13, 13, 13, 13, 11, 11, 11, 11, 15, 15, 15, 15, 3, 3, 3, 3, 6, 6, 18, 18, 18, 18, 2]
            break
        case "2": // Poseidon OK
            $dataKamigami.enemy_tt_cards = [22, 22, 22, 22, 15, 15, 15, 15, 12, 12, 12, 12, 9, 9, 9, 9, 10, 10, 10, 10, 4, 4, 4, 4, 21, 21, 21, 21, 19, 19, 19, 19, 23, 23, 18, 18, 18, 18, 5, 5, 1]
            break
        case "3": //Hades OK
            $dataKamigami.enemy_tt_cards = [116, 116, 116, 116, 5, 5, 5, 5, 14, 14, 14, 14, 8, 8, 3, 3, 19, 19, 19, 19, 108, 108, 108, 108, 54, 54, 54, 54, 15, 15, 15, 15, 18, 18, 18, 18, 17, 17, 17, 17, 0]
            break
        case "4": //Amaterasu OK
            $dataKamigami.enemy_tt_cards = [115, 115, 115, 115, 114, 114, 114, 114, 99, 99, 99, 99, 103, 103, 103, 103, 98, 98, 98, 98, 106, 106, 106, 106, 110, 110, 110, 110, 107, 107, 107, 107, 101, 101, 101, 101, 96, 96, 96, 96, 90]
            break
        case "5": //Izanami OK
            $dataKamigami.enemy_tt_cards = [109, 109, 109, 109, 107, 107, 107, 107, 106, 106, 106, 106, 111, 111, 111, 111, 103, 103, 103, 103, 97, 97, 97, 97, 96, 96, 96, 96, 100, 100, 100, 100, 101, 101, 101, 101, 104, 104, 104, 104, 92]
            break
        case "6": //Tsukuyomi OK
            $dataKamigami.enemy_tt_cards = [100, 100, 29, 29, 29, 29, 69, 69, 26, 26, 25, 25, 25, 25, 84, 84, 106, 106, 106, 106, 107, 107, 107, 107, 110, 110, 110, 110, 118, 118, 118, 118, 103, 103, 103, 103, 57, 57, 113, 113, 93] //93
            break
        case "7": //Izanagi OK
            $dataKamigami.enemy_tt_cards = [110, 110, 110, 110, 106, 106, 106, 106, 115, 115, 115, 115, 114, 114, 114, 114, 94, 94, 102, 102, 102, 102, 98, 98, 98, 98, 100, 100, 100, 100, 103, 103, 103, 103, 112, 112, 109, 109, 109, 109, 91]
            break
        case "8": //Ra OK
            $dataKamigami.enemy_tt_cards = [42, 42, 42, 42, 38, 38, 38, 38, 46, 46, 46, 46, 47, 47, 37, 37, 40, 40, 35, 35, 35, 35, 45, 45, 45, 45, 43, 43, 43, 43, 83, 83, 83, 83, 50, 50, 44, 44, 44, 44, 31]
            break
        case "9": //Isis OK
            $dataKamigami.enemy_tt_cards = [43, 43, 43, 43, 44, 44, 44, 44, 37, 37, 37, 37, 34, 34, 34, 34, 50, 50, 50, 50, 39, 39, 39, 39, 49, 49, 49, 49, 56, 56, 56, 56, 25, 25, 25, 25, 46, 46, 46, 46, 30]
            break
        case "10": //Set OK  
            $dataKamigami.enemy_tt_cards = [116, 116, 116, 116, 46, 46, 46, 46, 50, 50, 50, 50, 20, 20, 20, 20, 54, 54, 54, 54, 39, 39, 39, 39, 108, 108, 108, 108, 40, 40, 40, 40, 33, 33, 33, 33, 7, 7, 55, 55, 32]
            break
        case "11": //Odin OK
            $dataKamigami.enemy_tt_cards = [83, 83, 83, 83, 73, 73, 73, 73, 63, 63, 63, 63, 86, 86, 86, 86, 72, 72, 72, 72, 70, 70, 70, 68, 68, 68, 74, 74, 74, 74, 65, 65, 65, 65, 80, 80, 80, 80, 89, 89, 60]
            break
        case "12": //Thor OK
            $dataKamigami.enemy_tt_cards = [80, 80, 80, 80, 62, 62, 62, 62, 70, 70, 70, 70, 74, 74, 74, 74, 67, 67, 67, 67, 66, 66, 66, 66, 79, 79, 79, 79, 81, 81, 77, 77, 82, 82, 78, 78, 64, 64, 64, 64, 61]
            break
        case "13": //Hel
            $dataKamigami.enemy_tt_cards = [65, 65, 65, 65, 64, 64, 64, 64, 70, 70, 70, 70, 66, 66, 66, 66, 68, 68, 68, 68, 67, 67, 67, 67, 72, 72, 72, 72, 75, 75, 75, 75, 71, 71, 71, 71, 77, 77, 77, 77, 58]
            break
        case "14": //Loki
            $dataKamigami.enemy_tt_cards = [70, 70, 70, 70, 62, 62, 62, 62, 72, 72, 72, 72, 80, 80, 80, 80, 76, 76, 73, 73, 73, 73, 63, 63, 63, 63, 84, 84, 87, 87, 64, 64, 82, 82, 82, 82, 71, 71, 71, 71, 59]
            break
        case "15": //Izanagi OK
            $dataKamigami.enemy_tt_cards = [110, 110, 110, 110, 106, 106, 106, 106, 52, 52, 52, 52, 114, 114, 114, 114, 100, 100, 102, 102, 102, 102, 98, 98, 98, 98, 118, 118, 118, 118, 103, 103, 103, 103, 112, 112, 111, 111, 111, 111, 91]
            break
        case "16": //Testing
            $dataKamigami.enemy_tt_cards = [13, 13, 13, 13, 15, 15, 15, 15, 19, 19, 19, 19, 35, 35, 35, 35, 50, 50, 50, 50, 38, 38, 38, 38, 72, 72, 72, 72, 97, 97, 97, 97, 103, 103, 103, 103, 106, 106, 106, 106, 61]
            break

    }

}

