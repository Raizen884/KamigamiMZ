////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// KamigamiCard Class /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// ---------------------------------------------------------
// This class holds all basic definitions by the kamigami cards
// ---------------------------------------------------------
function KamigamiCard() {
    this.initialize.apply(this, arguments);
}

KamigamiCard.prototype.constructor = KamigamiCard;

//-----------------------------------------------------------------------------
// Function : initialize
//-----------------------------------------------------------------------------
KamigamiCard.prototype.initialize = function () {
    this.loaded = false

}
//-----------------------------------------------------------------------------
// Function : loadCardData
//-----------------------------------------------------------------------------
KamigamiCard.prototype.loadCardDataRaw = function (cardList, id, rank) {
    this.cardId = id
    this.name = JSON.parse(cardList[id])["Name"];
    this.Name = this.name
    this.hp = parseInt(JSON.parse(cardList[id])["HP"]);
    this.HP = this.hp
    this.attack = parseInt(JSON.parse(cardList[id])["Power"]);
    this.attackCost = parseInt(JSON.parse(cardList[id])["attackCost"]);
    this.addDevotion = parseInt(JSON.parse(cardList[id])["addDevotion"]);
    this.moveCost = parseInt(JSON.parse(cardList[id])["moveCost"]);
    this.attackType = parseInt(JSON.parse(cardList[id])["attackType"]);
    this.cardType = parseInt(JSON.parse(cardList[id])["cardType"]);
    this.costDevotion = parseInt(JSON.parse(cardList[id])["costDevotion"]);
    this.mhp = this.hp;
    this.cardEffect = parseInt(JSON.parse(cardList[id])["cardEffect"]);
    this.specialType = parseInt(JSON.parse(cardList[id])["specialType"]);
    this.imageBig = JSON.parse(cardList[id])["Image_Big"];
    this.Image_Big = this.imageBig
    this.Image_Player_1 = JSON.parse(cardList[id])["Image_Player_1"];
    this.Image_Player_2 = JSON.parse(cardList[id])["Image_Player_2"];
    this.effectArea = parseInt(JSON.parse(cardList[id])["effectArea"]);
    this.isDeity = JSON.parse(cardList[id])["deity"] == "true";
    this.rank = rank
    this.artist = JSON.parse(cardList[id])["artist"];
}
//-----------------------------------------------------------------------------
// Function : loadCardData
//-----------------------------------------------------------------------------
KamigamiCard.prototype.loadCardData = function (id, turn) {
    this.cardId = id
    this.name = Game_Kamigami.convertedCardList[id].name;
    this.hp = Game_Kamigami.convertedCardList[id].hp
    this.attack = Game_Kamigami.convertedCardList[id].attack
    this.attackCost = Game_Kamigami.convertedCardList[id].attackCost
    this.addDevotion = Game_Kamigami.convertedCardList[id].addDevotion
    this.moveCost = Game_Kamigami.convertedCardList[id].moveCost
    this.attackType = Game_Kamigami.convertedCardList[id].attackType
    this.cardType = Game_Kamigami.convertedCardList[id].cardType
    this.costDevotion = Game_Kamigami.convertedCardList[id].costDevotion
    this.mhp = this.hp;
    this.cardEffect = Game_Kamigami.convertedCardList[id].cardEffect
    this.specialType = Game_Kamigami.convertedCardList[id].specialType
    this.imageBig = Game_Kamigami.convertedCardList[id].imageBig
    this.loaded = true
    this.turn = turn
    this.rank = Game_Kamigami.convertedCardList[id].imageBig
    this.isDeity = Game_Kamigami.convertedCardList[id].isDeity
    this.artist = Game_Kamigami.convertedCardList[id].artist
}
//-----------------------------------------------------------------------------
// Function : loadCardData
//-----------------------------------------------------------------------------
KamigamiCard.prototype.unloadCardData = function () {
    this.cardId = null
    this.hp = null
    this.attack = null
    this.attackCost = null
    this.addDevotion = null
    this.moveCost = null
    this.attackType = null
    this.cardType = null
    this.mhp = null
    this.cardEffect = null
    this.specialType = null
    this.costDevotion = null
    this.name = null
    this.imageBig = null
    this.loaded = false
    this.isDeity = null
}
//-----------------------------------------------------------------------------
// Function : setHp
//-----------------------------------------------------------------------------
KamigamiCard.prototype.setHp = function (value) {
    if (value > 0) {
        this.hp = Math.min(this.mhp, this.hp + value)
    } else {
        this.hp = Math.max(0, this.hp + value)
    }
}


////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// KamigamiDeck Class /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// ---------------------------------------------------------
// This class holds all basic definitions for the decks
// ---------------------------------------------------------
function KamigamiDeck() {
    this.initialize.apply(this, arguments);
}

KamigamiDeck.prototype.constructor = KamigamiDeck;

//-----------------------------------------------------------------------------
// Function : initialize
//-----------------------------------------------------------------------------
KamigamiDeck.prototype.initialize = function (cardList, turn, cardDefinitions) {
    this.cardList = cardList
    this.cardValues = []
    this.godCard = this.cardList.pop()
    this.godCardEffect = parseInt(cardDefinitions.getCardAttribute(this.godCard, "cardEffect"))
    this.godCardValues = new KamigamiCard()
    this.godCardValues.loadCardData(this.godCard, turn)
    shuffle(this.cardList);
    this.loadCardValues()
}

//-----------------------------------------------------------------------------
// Function : loadCardValues
//-----------------------------------------------------------------------------
KamigamiDeck.prototype.loadCardValues = function (turn) {
    for (var n = 0; n < 40; n++) {
        this.cardValues[n] = new KamigamiCard()
        this.cardValues[n].loadCardData(this.cardList[n], turn)
    }
}
//-----------------------------------------------------------------------------
// Function : drawCard
//-----------------------------------------------------------------------------
KamigamiDeck.prototype.drawCard = function () {
    return this.cardList.shift()
}