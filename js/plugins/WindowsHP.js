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
    this.createCardBase();
    this.createAttackBase();
    this.createAttackCostBase();
    this.createMovementBase();
    this.createHPBase();
    this.createDevotionBase()
    this.createGauge();
}
Sprite_Card_Board.prototype.createAttackBase = function () {
    this.attackText = new PIXI.Text(new String(), { fontFamily: 'Chau Philomene One', fontSize: 26, fill: 0xFFA69E });
    this.addChild(this.attackText)
    this.attackText.x = -58
    this.attackText.y = 55
    this.attackText.anchor.x = 0.5
}
Sprite_Card_Board.prototype.createAttackCostBase = function () {
    this.attackCostText = new PIXI.Text(new String(), { fontFamily: 'Chau Philomene One', fontSize: 26, fill: 0x6BFAFF });
    this.addChild(this.attackCostText)
    this.attackCostText.x = -58
    this.attackCostText.y = 55
    this.attackCostText.anchor.x = 0.5
    this.attackCostText.alpha = 0
}


Sprite_Card_Board.prototype.createMovementBase = function () {
    this.movementCostText = new PIXI.Text(new String(), { fontFamily: 'Chau Philomene One', fontSize: 26, fill: 0xffffff });
    this.addChild(this.movementCostText)
    this.movementCostText.x = 58
    this.movementCostText.y = 55
    this.movementCostText.anchor.x = 0.5
}

Sprite_Card_Board.prototype.createHPBase = function () {
    this.hpText = new PIXI.Text(new String(), { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0xffffff, stroke: 0x000000, strokeThickness: 2 });
    this.addChild(this.hpText)
    this.hpText.y = -85
    this.hpText.anchor.x = 0.5
}


Sprite_Card_Board.prototype.createDevotionBase = function () {
    this.devotionText = new PIXI.Text(new String(), { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0xffffff });
    this.addChild(this.devotionText)
    this.devotionText.y = 63
    this.devotionText.anchor.x = 0.5
}

Sprite_Card_Board.prototype.createCardBase = function () {
    this.cardBase = new Sprite()
    this.cardBase.anchor.x = this.cardBase.anchor.y = 0.5
    this.addChild(this.cardBase)
}
Sprite_Card_Board.prototype.createGauge = function () {
    this.frameCount = 122
    this.gaugeHP = new PIXI.Graphics();
    this.addChild(this.gaugeHP);

}

Sprite_Card_Board.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if (this.frameCount <= 61) {
        this.updateGauge()
    }
    this.updateAttack()
}
Sprite_Card_Board.prototype.updateAttack = function () {
    attackFrame = Graphics.frameCount % 600
    if (this.attackText.alpha < 1 && attackFrame > 0 && attackFrame < 300) {
        this.attackText.alpha += 0.05
        if (this.attackCostText.alpha > 0)
            this.attackCostText.alpha -= 0.05
    } else if (this.attackCostText.alpha < 1 && attackFrame > 300) {
        this.attackCostText.alpha += 0.05
        if (this.attackText.alpha > 0)
            this.attackText.alpha -= 0.05
    }

}


Sprite_Card_Board.prototype.updateGauge = function () {
    this.frameCount++
    this.currentGaugeHP += this.diffHP
    if (this.diffHP > 0) {
        if (this.currentGaugeHP > this.finalHP) {
            this.currentGaugeHP = this.finalHP
        }
    } else {
        if (this.currentGaugeHP < this.finalHP) {
            this.currentGaugeHP = this.finalHP
        }
    }
    let color = this.calculateColor()
    this.gaugeHP.clear()
    
    this.gaugeHP.lineStyle(6, color, 0.5)
    this.gaugeHP.arc(0, 0, 90, Math.PI * 5 / 6, this.currentGaugeHP);
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
    if (turn == 0) {
        cardName = card.Image_Player_1
    } else {
        cardName = card.Image_Player_2
    }
    this.turn = turn
    this.hp = -1
    this.attack = -1
    this.attackCost = -1
    this.moveCost = -1
    this.mhp = card.mhp
    this.addDevotion = -1
    this.checkUpdatedValues()


    this.loadFirstGauge()
    this.cardBase.bitmap = ImageManager.loadKamigami(cardName);
}
Sprite_Card_Board.prototype.loadFirstGauge = function () {
    this.frameCount = 0
    this.gaugeHP.lineStyle(6, 0xFF3232, 0.5);
    this.gaugeHP.arc(0, 0, 90, Math.PI * 5 / 6, Math.PI * 5 / 6);
    this.currentGaugeHP = Math.PI * 5 / 6
    this.finalHP = Math.PI * 13 / 6
    this.diffHP = (Math.PI * 13 / 6 - Math.PI * 5 / 6) / 60
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
        this.needsToUpdateGauge()
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
Sprite_Card_Board.prototype.needsToUpdateGauge = function () {
    this.frameCount = 0
    this.finalHP = (Math.PI * 13 / 6 - Math.PI * 5 / 6) * (this.hp / this.mhp) + Math.PI * 5 / 6
    this.diffHP = (this.finalHP - this.currentGaugeHP) / 60
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
    this._windowLayer.move(x, y, width, height);
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