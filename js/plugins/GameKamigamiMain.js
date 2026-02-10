var greenworks = null

function Game_Kamigami() {
    this.createGameVariables()
    this.createGameStatistics();
    this.currentMapMusic = false;
    this.Battlemusic = "Greek Confront"
    this.TitleMusic = "Kamigami - Main Theme"
    this.ShopMusic = "Magic Cards"
    this.boosterPacksMusic = "Magic Cards"
    this.selectDeckMusic = "Magic Cards"
    this.arcMythology = 0
    this.booster_packs = [false, false, false, false, false];
    this.onTutorial = false
    this.owned_booster_packs = [0, 0, 0, 0, 0];
    this.booster_pack_info = [["booster_pack", 150], ["booster_pack", 150], ["booster_pack", 150], ["booster_pack", 150], ["booster_pack", 150]];
    this.decks = new Array(99);
    this.allCards = new Array(450)
    this.allCards.fill(0)
    this.handicap = 0;
    this.onlineData = {
        highscoreList: [],
        totalExp: 0,
        selfRank: 999
    }
    for (let n = 0; n < 99; n++) {
        this.decks[n] = new Array(2)
        this.decks[n][0] = "??????"
        this.decks[n][1] = []
    }
    this.card_list = JSON.parse(PluginManager.parameters('KamigamiDuel')['Card Creation']);
    this.enemyName = ""
    this.transitionType = 0;
    this.chosenCivilization = 0;
    // AI Global Configuration
    this.cardEffectList = [102, 103, 110, 113, 112, 107]
    this.unlockedDuels = [false, false, false, false, false]
    //$gameVariables.setValue(2, 2)


    this.difficultySetting = 0;
    this.maxDifficulty  = 0;
    this.lastDifficulty = 0;
    var decks = JSON.parse(PluginManager.parameters('KamigamiDeck')['Enemy Creation']);
    this.duelInfo = new Array(decks.length);
    let singleDeck;
    let name = "";
    for (let n = 0; n < this.duelInfo.length; n++) {
        name = JSON.parse(decks[n])["Name"]
        this.duelInfo[n] = { wins: 0, losses: 0, enabled: false, name:name}
    }
    this.createCardList()
    this.createOptions()

};
Game_Kamigami.prototype.createOptions = function () {
    let lang = this.getLanguageSteam()
    this.gameOptions = {
       language: lang,
       maxParticles: 4000,
       cardEffects: true,
       tutorial: false,
       deck: false,
       firstScene: false,
       music: 100,
       se: 100
    }

}

Game_Kamigami.prototype.getLanguageSteam = function () {
    let gameLanguages = {
        "brazilian": "pt",
        "portuguese": "pt"
    }
    if (greenworks) {
        let language = greenworks.getCurrentGameLanguage();
        if (gameLanguages[language]) {
            return gameLanguages[language]
        }
    }
    return "en"
}


Game_Kamigami.prototype.createGameVariables = function () {
    this.hasChosenDeck = false;
    this.selectedDuelist = 0;
    this.selectedDeck = 0;
    this.chosenDeck = 0;
    this.luckyPack = 0;
};
Game_Kamigami.prototype.createGameStatistics = function () {
    this.duelRating = 3
    this.duelData = []
    this.duelData[0] = ["Damage Dealt", 300]
    this.duelData[1] = ["Damage Taken", 500]
    this.duelData[2] = ["Turns", 15]
    this.duelData[3] = ["Devotion You Generated", 430]
    this.duelData[4] = ["Devotion Opponent Generated", 335]
    this.duelData[5] = ["Devotion You Used", 420]
    this.duelData[6] = ["Devotion Opponent Used", 315]
    this.duelData[7] = ["Cards Played", 12]
    this.duelData[8] = ["Cards Drawn", 14]
    this.duelData[9] = ["Cards Destroyed", 12]
    this.duelData[10] = ["Cards Lost", 5]
}



Game_Kamigami.prototype.createCardList = function () {
    Game_Kamigami.convertedCardList = new Array()
    for (let n = 0; n < 450; n++) {
        let rank = Math.floor(n / 150)
        Game_Kamigami.convertedCardList.push(new KamigamiCard())
        Game_Kamigami.convertedCardList[n].loadCardDataRaw(this.card_list, n % 150, rank)
        if (rank > 0) {
            this.recalculateCardValues(Game_Kamigami.convertedCardList[n], rank)
        }
    }
};

Game_Kamigami.prototype.recalculateCardValues = function (card, rank) {
    if (card.cardType == 0) {
        card.addDevotion = Math.max(0, card.addDevotion - rank)
    } else {
        card.costDevotion = this.calculateNewCost(card, rank)
    }
};

Game_Kamigami.prototype.calculateNewCost = function (card, rank) {
    let cost = card.costDevotion
    let excludedCardIds = [52, 53, 55]
    if (!excludedCardIds.includes(card.cardId))
        cost += Math.floor(card.costDevotion / 6)
    cost += rank
    return cost

};




