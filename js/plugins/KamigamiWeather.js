//////////////////////////// MAIN START //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : initialize - initiates the graphics
//-----------------------------------------------------------------------------
const _scene_Weather_Initialize = Scene_Kamigami_Duel.prototype.initialize
Scene_Kamigami_Duel.prototype.initialize = function () {
    _scene_Weather_Initialize.call(this);
    this.startWeather();
};

Scene_Kamigami_Duel.prototype.startWeather = function () {
    this._weatherSprite = new Sprite_Kami_Weather();
    this._weatherSprite.x = 1500;
    this._weatherSprite.y = 800;
    this.addChild(this._weatherSprite)
}

//-----------------------------------------------------------------------------
// Sprite_Kami_Weather
//
// The sprite for displaying a card in triple triad.

function Sprite_Kami_Weather() {
    this.initialize.apply(this, arguments);
}

Sprite_Kami_Weather.prototype = Object.create(Sprite.prototype);
Sprite_Kami_Weather.prototype.constructor = Sprite_Kami_Weather;

Sprite_Kami_Weather.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this._weatherTurns = 0;
    this._weatherType = 0;
    this._baseSprite = new Sprite();
    this._baseSprite.bitmap = ImageManager.loadExtrasKamigami("");
    this.addChild(this._baseSprite);
    this.createWeatherText();
}

Sprite_Kami_Weather.prototype.changeWeather = function (weather) {
    let text = ""
    switch (weather) {
        case "storm":
            this._weatherType = 3
            text = "5 turns"
            this._baseSprite.bitmap = ImageManager.loadExtrasKamigami("weatherStorm");
            break;
        case "day":
            this._weatherType = 1
            text = "5 turns"
            this._baseSprite.bitmap = ImageManager.loadExtrasKamigami("weatherSun");
            break;
        case "night":
            this._weatherType = 2
            text = "5 turns"
            this._baseSprite.bitmap = ImageManager.loadExtrasKamigami("weatherNight");
            break;
        case "none":
            this._weatherType = 0
            text = ""
            this._baseSprite.bitmap = ImageManager.loadExtrasKamigami("");
            break;
    }
    this._weatherTurnsText.text = text;
    this._weatherTurns = 5;
}

Sprite_Kami_Weather.prototype.rotateTurn = function () {
    if (this._weatherTurns > 0) {
        this._weatherTurns--;
        this._weatherTurnsText.text = this._weatherTurns + " turns"
        if (this._weatherTurns <= 0) {
            this._weatherTurns = 0;
            this._weatherType = 0;
            this._weatherTurnsText.text = ""
            this._baseSprite.bitmap = ImageManager.loadExtrasKamigami("");
        }
    }

}

Sprite_Kami_Weather.prototype.weatherType = function () {
    return this._weatherType;
}

Sprite_Kami_Weather.prototype.weatherTurns = function () {
    return this._weatherTurns;
}

Sprite_Kami_Weather.prototype.update = function () {
    Sprite.prototype.update.call(this);
}

Sprite_Kami_Weather.prototype.createWeatherText = function () {
    let text = ""
    this._weatherTurnsText = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0xFFFFFF, align: 'left', stroke: "#00019F", strokeThickness: 2 });
    this.addChild(this._weatherTurnsText)
    this._weatherTurnsText.y = 0
    this._weatherTurnsText.x = 0
    this._weatherTurnsText.text = text;

}
const _scene_Weather_checkEndTurnEffects = Scene_Kamigami_Duel.prototype.checkEndTurnEffects
//-----------------------------------------------------------------------------
// Function : checkEndTurnEffects
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.checkEndTurnEffects = function (turn) {
    _scene_Weather_checkEndTurnEffects.call(this, ...arguments);
    if (this._weatherSprite.weatherType() == 1)
        this.checkDayTrigger(turn);
    if (this._weatherSprite.weatherType() == 3)
        this.checkStormTrigger(turn);
}


//-----------------------------------------------------------------------------
// Function : checkDayTrigger
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.checkDayTrigger = function (turn) {
    let devotion = 0;
    for (let n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == turn) {
            devotion++;
        }
    }
    this.set_devotion(turn, devotion)
}

//-----------------------------------------------------------------------------
// Function : checkStormTrigger
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.checkStormTrigger = function (turn) {
    let lowestCost = 100;
    let lowestCards = [];
    for (let n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).cardType != 0 && this.boardState.getValue(n).costDevotion <= lowestCost) {
            if (this.boardState.getValue(n).costDevotion == lowestCost) {
                lowestCards.push(n);
            } else {
                lowestCards = [n];
            }
            lowestCost = this.boardState.getValue(n).costDevotion
        }
    }
    for (let m = 0; m < lowestCards.length; m++) {
        this.set_hp(lowestCards[m], -10)
    }
}
//-----------------------------------------------------------------------------
// Function : checkNightTrigger
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.checkNightTrigger = function (card) {
    if (card.cardType == 2)
        return -1
    return 0
}
