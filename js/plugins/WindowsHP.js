function Sprite_Card_Board() {
    this.initialize.apply(this, arguments);
}

Sprite_Card_Board.prototype = Object.create(Sprite.prototype);
Sprite_Card_Board.prototype.constructor = Sprite_Card_Board;

Sprite_Card_Board.prototype.initialize = function (position, boardState, cardDefinitions) {
    Sprite.prototype.initialize.call(this);
    this.boardState = boardState;
    this.cardPosition = position;
    this.cardDefinitions = cardDefinitions
    this.createBasicSprites()

}
Sprite_Card_Board.prototype.setNewBoardState = function (boardState) {
    this.boardState = boardState;
}

Sprite_Card_Board.prototype.createBasicSprites = function () {
    this.createPlayerIndication();
    this.createCardBase();
    this.createCardBackGround();
    this.createGauge();
    
    this.createCardForeground();
    this.createAttackBase();
    this.createAttackCostBase();
    this.createMovementBase();
    this.createHPBase();
    this.createDevotionBase()
    
}
Sprite_Card_Board.prototype.createPlayerIndication = function () {
    this.playerIndicationSprite = new Sprite();
    this.playerIndicationSprite.anchor.x = this.playerIndicationSprite.anchor.y = 0.5
    this.addChild(this.playerIndicationSprite);
}
Sprite_Card_Board.prototype.createAttackBase = function () {
    this.attackText = new PIXI.Text(new String(), { fontFamily: 'Chau Philomene One', fontSize: 26, fill: 0xffffff });
    this.addChild(this.attackText)
    this.attackText.x = -72
    this.attackText.y = 45
    this.attackText.anchor.x = 0.5
}
Sprite_Card_Board.prototype.createAttackCostBase = function () {
    this.attackCostText = new PIXI.Text(new String(), { fontFamily: 'Chau Philomene One', fontSize: 22, fill: 0xffffff });
    this.addChild(this.attackCostText)
    this.attackCostText.x = -75
    this.attackCostText.y = 5
    this.attackCostText.anchor.x = 0.5
}


Sprite_Card_Board.prototype.createMovementBase = function () {
    this.movementCostText = new PIXI.Text(new String(), { fontFamily: 'Chau Philomene One', fontSize: 22, fill: 0xffffff });
    this.addChild(this.movementCostText)
    this.movementCostText.x = 75
    this.movementCostText.y = 5
    this.movementCostText.anchor.x = 0.5
}

Sprite_Card_Board.prototype.createHPBase = function () {
    this.hpText = new PIXI.Text(new String(), { fontFamily: 'Chau Philomene One', fontSize: 26, fill: 0xffffff });
    this.addChild(this.hpText)
    this.hpText.x = 72
    this.hpText.y = 45
    this.hpText.anchor.x = 0.5
}


Sprite_Card_Board.prototype.createDevotionBase = function () {
    
    this.devotionText = new PIXI.Text(new String(), { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0xffffff, stroke: 0x000000, strokeThickness: 3 });
    this.addChild(this.devotionText)
    this.devotionText.y = 63
    this.devotionText.anchor.x = 0.5
}
Sprite_Card_Board.prototype.createCardBackGround = function () {

    this.cardBackGround = new Sprite()
    this.cardBackGround.anchor.x = this.cardBackGround.anchor.y = 0.5
    this.addChild(this.cardBackGround)
    this.cardBackGround.bitmap = ImageManager.loadKamigami("minicard_hp_bg");
}
Sprite_Card_Board.prototype.createCardForeground = function () {
    this.cardForeground = new Sprite()
    this.cardForeground.anchor.x = this.cardForeground.anchor.y = 0.5
    this.addChild(this.cardForeground)


}

Sprite_Card_Board.prototype.createCardBase = function () {
    this.cardBase = new Sprite()
    this.cardBase.anchor.x = this.cardBase.anchor.y = 0.5
    this.addChild(this.cardBase)
    this.cardBase.scale.x = this.cardBase.scale.y = 0.5
    this.cardBase.y = 28
}
Sprite_Card_Board.prototype.createGauge = function () {
    this.gaugeHP = new Sprite_Card_Gauge()
    this.addChild(this.gaugeHP);
    this.gaugeHP.anchor.x = this.cardBase.anchor.y = 0.5
    this.gaugeHP.x = 53
    this.gaugeHP.y = 37
}



Sprite_Card_Board.prototype.calculateColor = function () {
    let baseColor
    if (this.turn == 0) {
        baseColor = 0x36F144
    } else {
        baseColor = 0xCA2323
    }
    return baseColor
}

Sprite_Card_Board.prototype.loadCard = function (cardId, turn) {
    let cardName
    let card = Game_Kamigami.convertedCardList[cardId]
    this.cardType = card.cardType
    cardName = card.Image_Big

    this.turn = turn
    this.hp = -1
    this.attack = -1
    this.attackCost = -1
    this.moveCost = -1
    this.mhp = card.mhp
    this.addDevotion = -1
    this.checkUpdatedValues()


    this.cardForeground.bitmap = ImageManager.loadKamigami(this.CheckCardType(cardId, card.isDeity));
    this.playerIndicationSprite.bitmap = ImageManager.loadKamigami("minicard_player" + (this.turn + 1));
    this.cardBase.bitmap = ImageManager.loadKamigami(cardName);
    this.gaugeHP.setMaxHP(card.mhp);
}
Sprite_Card_Board.prototype.CheckCardType = function (cardId, deity) {
    let cardRank = $dataKamigami.GetRankedCard(cardId);
    let cardName = ""
    switch (this.cardType) {
        case 0:
            cardName += "minicard_goddess_";
            break;
        case 1:
            if (deity)
                cardName += "minicard_deity_";
            else
                cardName += "minicard_creature_";
            break;
        case 2:
            cardName += "minicard_miracle_";
            break;
        case 3:
            cardName += "minicard_monument_";
            break;
    }
    switch (cardRank) {
        case 1:
            cardName += "b";
            break;
        case 2:
            cardName += "a";
            break;
        case 3:
            cardName += "s";
            break;
    }
    return cardName;

}

Sprite_Card_Board.prototype.updateMoveValues = function (position) {
    this.cardPosition = position
    this.checkUpdatedValues()
}

Sprite_Card_Board.prototype.checkUpdatedValues = function (turn = this.turn) {
    if (SceneManager._scene.turn == null) {
        turn = null
    }
    if (this.boardState.getValue(this.cardPosition) == -1) { return }
    if (this.hp != this.boardState.getValue(this.cardPosition).hp || this.mhp != this.boardState.getValue(this.cardPosition).mhp) {
        this.hp = this.boardState.getValue(this.cardPosition).hp
        this.mhp = this.boardState.getValue(this.cardPosition).mhp
        this.needsToUpdateGauge(this.hp)
        this.hpText.text = this.hp
    }
    let attack = this.cardDefinitions.apply_attack(this.boardState, this.cardPosition, turn)
    let attackCost = this.cardDefinitions.attack_apply_effects_no_target(this.boardState.getValue(this.cardPosition), turn)
    let movementCost = this.cardDefinitions.move_apply_effects(this.boardState.getValue(this.cardPosition), turn)
    if (this.attack != attack) {
        this.attack = attack
        this.attackText.text = this.attack
    }
    if (this.attackCost != attackCost) {
        this.attackCost = attackCost
        this.attackCostText.text = this.attackCost
    }

    if (this.movementCost != movementCost) {
        this.movementCost = movementCost
        this.movementCostText.text = this.movementCost
    }
    if (this.addDevotion != this.boardState.getValue(this.cardPosition).addDevotion) {
        this.addDevotion = this.boardState.getValue(this.cardPosition).addDevotion
        this.devotionText.text = this.addDevotion
    }
    if (this.cardType == 3) {
        this.attackText.text = "-"
        this.movementCostText.text = "-"
        this.attackCostText.text = "-"
    }

}
Sprite_Card_Board.prototype.needsToUpdateGauge = function (hp) {
    this.gaugeHP.updateHP(hp)
}

function Sprite_Card_Gauge() {
    this.initialize.apply(this, arguments);
}

Sprite_Card_Gauge.prototype = Object.create(Sprite.prototype);
Sprite_Card_Gauge.prototype.constructor = Sprite_Card_Gauge;

Sprite_Card_Gauge.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this.createBaseImages();
    this.createMask();
    this.currentHp = 0
    this.maxHp = 0
    this.gaugeHp = 0
}
Sprite_Card_Gauge.prototype.createBaseImages = function () {
    this.baseImage = new Sprite();
    this.baseImage.bitmap = ImageManager.loadKamigami("minicard_hp_bar");
    this.addChild(this.baseImage);
    
}
Sprite_Card_Gauge.prototype.createMask = function () {
    this.gaugeMask = new PIXI.Graphics();
    this.gaugeMask.beginFill();
    this.gaugeMask.drawRect(0, 0, 40, 40);
    this.gaugeMask.endFill();
    this.addChild(this.gaugeMask);
    this.baseImage.mask = this.gaugeMask;
    this.gaugeMask.y = 40;
    
}
Sprite_Card_Gauge.prototype.update = function () {
    if (this.gaugeHp != this.currentHp)
        this.updateHPValues();
}
Sprite_Card_Gauge.prototype.updateHPValues = function () {
    if (this.gaugeHp < this.currentHp) {
        this.gaugeHp++;
    } else {
        this.gaugeHp--;
    }
    this.updateGaugePosition();
}
Sprite_Card_Gauge.prototype.updateGaugePosition = function () {
    let posY = 40 - (this.gaugeHp * 40)/this.maxHp;
    this.gaugeMask.y = posY;
}

Sprite_Card_Gauge.prototype.setMaxHP = function (value) {
    this.maxHp = value
    this.currentHp = value
}
Sprite_Card_Gauge.prototype.updateHP = function (value) {
    this.currentHp = value
}



function Window_hp_Kamigami() {
    this.initialize.apply(this, arguments);
}

Window_hp_Kamigami.prototype.initialize = function () {
};

Window_hp_Kamigami.prototype.write_hp = function (boardCards) {
    for (var c = 0; c < 16; c++) {
        if (boardCards[c] != -1) {
            boardCards[c].checkUpdatedValues()
            //this.drawText(boardState.getValue(c).moveCost, 660 + ((c % 4) * 217), 235 + (parseInt(c / 4) * 217));
            //this.drawText(boardState.getValue(c).attack, 545 + ((c % 4) * 217), 235 + (parseInt(c / 4) * 217));
        }
    }

};
Window_hp_Kamigami.prototype.moveCard = function (boardCards, newPos) {
    boardCards[newPos].updateMoveValues(newPos)
};



Scene_Base.prototype.createWindowLayerDuel = function () {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    var x = (Graphics.width - width) / 2;
    var y = (Graphics.height - height) / 2;
    this._windowLayer = new WindowLayer();
    //this._windowLayer.move(x, y, width, height);
    this.cardContainer.addChildZ(this._windowLayer, 2);
};

Bitmap.prototype.fillPolygon = function (x, y, array, color) {
    var context = this._context;
    _testContext = context
    context.save();
    context.fillStyle = color;
    context.beginPath();

    //context.arc(100, 100, 100, 0, Math.PI * 2)
    //context.arc(100, 100, 80, 0, Math.PI * 2)

    //context.rect(0, 0, 100, 100);
    context.moveTo(0, 0)
    context.lineTo(0, 0);           // Create a starting point
    context.lineTo(200, 0);
    context.lineTo(0, 200);
    context.lineTo(200, 200);
    //context.arcTo(150, 0, 150, 150, 150); // Create an arc
    //context.lineTo(130, 150)
    //context.arcTo(130, 150, 130, 0, 130); // Create an arc
    //context.save();


    //context.arcTo(100, 100, 200, 200, 100)
    //context.stroke()



    context.closePath();


    context.fill();


    context.restore();
    this._setDirty();
};