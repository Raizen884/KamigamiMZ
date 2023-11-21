//////////////////////////// PHASE 1 //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : proceedMulligan
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceedMulligan = function () {
    this.extra_animations.push(['Mulligan']);
    this.mulliganHandCount = 5;
};

//-----------------------------------------------------------------------------
// Function : playMulliganAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.playMulliganPlayer = function () {
    if (this.mullText.opacity < 255) {
        this.mullText.opacity += 10
        if (this.mullTextContent.alpha < 1) {
            this.mullTextContent.alpha += 0.05
            this.mullTextHeader.alpha += 0.05
            this.mullTextTurn.alpha += 0.05
        }

    }
    if (this.cardFade.opacity == 0) {
        for (let n = 0; n < 40; n++) {
            if (n < this.mulliganHandCount)
                this._cards_player_1_all[n].zOrder = 80 - n;

        }
        this.cardContainer.sortChildren();
    }
    if (this.cardFade.opacity < 255) {
        this.cardFade.opacity += 10
    }
    this.move_hand_to_play();
    if (this.mulliganBtn.opacity < 150)
    this.mulliganBtn.opacity += 10;
if (this.keepBtn.opacity < 150)
    this.keepBtn.opacity += 10;
    if (this.count_frames > 60) {
        this.updateMulliganButtons(); 
        return
    }

}
//-----------------------------------------------------------------------------
// Function : updateMulliganButtons
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.updateMulliganButtons = function () {
    let touchedCard = -1
    for (let n = 0; n < this._cards_player_1.length; n++) {
        if (this._cards_player_1[n].isMiniButtonTouched() && touchedCard == -1) {
            this._cards_player_1[n].opacity += 20
            this._big_card_front.opacity = 255
            this._big_card_front.configureGod(this.cardDefinitions.getCardAttribute(this.player_hand[n], "Image_Big"), this.player_hand[n])
            this.specialCardCamera.x = this._cards_player_1[n].x;
            this.specialCardCamera.y = this._cards_player_1[n].y;
            touchedCard = n
        } else {
            this._cards_player_1[n].opacity = Math.max(120, this._cards_player_1[n].opacity - 20)
        }

    }
    if (this.mulliganBtn.isMiniButtonTouched()) {
        this.mulliganBtn.opacity += 10;
        if (TouchInput.isTriggered()) {
            this.newMulligan();
            this._big_card_front.opacity = 0
        }
    }
    else {
        if (this.mulliganBtn.opacity > 150)
            this.mulliganBtn.opacity -= 10;
    }
    if (this.keepBtn.isMiniButtonTouched()) {
        this.keepBtn.opacity += 10;
        if (TouchInput.isTriggered()) {
            this._big_card_front.opacity = 0
            this.closeKeep();
        }
    }
    else {
        if (this.keepBtn.opacity > 150)
            this.keepBtn.opacity -= 10;
    }
}

//-----------------------------------------------------------------------------
// Function : closeKeep
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.closeKeepOpponent = function () {
    rotateArrayReverse(this._cards_player_2_Back_all, this.player2_graveyard.length)
    this.extra_animations.shift()
    this.extra_animations.unshift(['SendMullCardsDeck'])
    this.count_frames = 0;
}

//-----------------------------------------------------------------------------
// Function : closeKeep
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.closeKeep = function () {
    AudioManager.playSe({ name: "Decision", pan: 0, pitch: 100, volume: 100 });
    this.keepBtn.bitmap = ""
    this.mulliganBtn.bitmap = ""
    this.cardFade.opacity = 0
    this.mullText.destroy()
    this.keepBtn.destroy()
    this.mullTextContent.destroy()
    this.mullTextHeader.destroy()
    this.mulliganBtn.destroy()
    this.mullTextTurn.destroy()
    rotateArrayReverse(this._cards_player_1_all, this.player1_graveyard.length)
    this.extra_animations.shift()
    this.extra_animations.unshift(['SendMullCardsDeck'])
    this.count_frames = 0;

}
//-----------------------------------------------------------------------------
// Function : sendMullCardDeck
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.sendMullCardDeck = function () {
    if (this.count_frames == 1) {
        this.fixAllDeckCards(1);
    }
    let limitgy = this.player1_graveyard.length;
    for (let n = 0; n < limitgy; n++) {
        this.sendCardBackDeck(this.player1_graveyard[n][1], this._cards_player_1_all[20], 0)
    }
    let limitgyOp = this.player2_graveyard.length;
    for (let n = 0; n < limitgyOp; n++) {
        this.sendCardBackDeck(this.player2_graveyard[n][1], this._cards_player_2_Back_all[20], 1)
    }
    if (this.count_frames >= 80) {
        for (let n = 0; n < limitgy; n++) {
            let temp = this.player1_graveyard.shift();
            this.player_cards.push(temp[0]);
            temp[1].bitmap = null
            temp[1].destroy()
        }
        for (let n = 0; n < limitgyOp; n++) {
            let temp = this.player2_graveyard.shift();
            this.npc_cards.push(temp[0]);
            temp[1].bitmap = null
            temp[1].destroy()
        }
        this.fixAllDeckCards(0);
        this.fixAllDeckCards(1);
        this.resetExtraAnimation();
        this.count_frames = 0;
    }

};
//-----------------------------------------------------------------------------
// Function : fixAllDeckCards
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.fixAllDeckCards = function (player) {
    if (player == 0) {
        for (let n = 0; n < 40; n++) {

            if (n >= this.player_hand.length) {
                this._cards_player_1_all[n].opacity = 255;
                this._cards_player_1_all[n].x = 1720 + n / 2;
                this._cards_player_1_all[n].y = 880 + n / 2;
                this._cards_player_1_all[n].zOrder = 46 - n;
            } else {
                this._cards_player_1_all[n].zOrder = 86 - n;
            }
        }
    } else {
        for (let n = 0; n < 40; n++) {
            this._cards_player_2_Back_all[n].zOrder = 46 - n;
            if (n >= this.npc_hand.length) {
                this._cards_player_2_Back_all[n].opacity = 254;
                this._cards_player_2_Back_all[n].x = 160 + n / 2;
                this._cards_player_2_Back_all[n].y = 160 + n / 2;
                this._cards_player_2_Back_all[n].scale.x = 0.4;
                this._cards_player_2_Back_all[n].scale.y = 0.4;
                this._cards_player_2_Back_all[n].rotation = Math.PI;
            }
        }
    }

    this.cardContainer.sortChildren();
}


//-----------------------------------------------------------------------------
// Function : sendCardBackDeck
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.sendCardBackDeck = function (card, deckCard, turn) {
    card.x -= (card.x - (deckCard.x)) / 20
    card.y -= (card.y - (deckCard.y)) / 20
    let finalRotation = 0;
    if (turn == 1) {
        finalRotation = Math.PI;
    }
    if (card.rotation > finalRotation) {
        card.rotation -= 0.1;
        if (card.rotation < finalRotation) {
            card.rotation = finalRotation;
        }
    }
    if (card.rotation < finalRotation) {
        card.rotation += 0.1;
        if (card.rotation > finalRotation) {
            card.rotation = finalRotation;
        }
    }
    if (this.count_frames >= 40)
        card.opacity -= 0;
}
//-----------------------------------------------------------------------------
// Function : newMulligan
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.newMulligan = function () {
    AudioManager.playSe({ name: "Decision", pan: 0, pitch: 100, volume: 100 });
    this.extra_animations.shift()
    this.extra_animations.unshift(['MulliganPlayerConfirm'])
    this.mullText.opacity = 0
    this.mullTextContent.alpha = 0
    this.mullTextHeader.alpha = 0
    this.keepBtn.opacity = 0;
    this.mulliganBtn.opacity = 0;
    this.mullTextTurn.alpha = 0;
};

//-----------------------------------------------------------------------------
// Function : playMulliganNPCConfirm
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.playMulliganNPCConfirm = function () {
    this.extra_animations.shift()
    this.extra_animations.unshift(['MulliganOpponent']);
    this.player_proceed_draw_before(1, this.npc_hand.length - 1);
    for (let a = 0; a < this.npc_hand.length; a++) {
        this.extra_animations.unshift(['DiscardFirst', 1, 1]);
    }

}
//-----------------------------------------------------------------------------
// Function : player_proceed_draw
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.player_proceed_draw_before = function (player, num) {
    this.cardFade.opacity = 0;
    if (player == 0) {
        this.mulliganHandCount += num
        for (var n = 0; n < num; n++) {
            this.extra_animations.unshift(['Draw_Player']);
        }
    }
    if (player == 1) {
        for (var n = 0; n < num; n++) {
            this.extra_animations.unshift(['Draw_Opponent']);
        }

    }
};
//-----------------------------------------------------------------------------
// Function : playMulliganPlayerConfirm
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.playMulliganPlayerConfirm = function () {
    this.extra_animations.shift()
    this.extra_animations.unshift(['MulliganPlayer']);
    this.player_proceed_draw_before(0, this.player_hand.length - 1);
    for (let a = 0; a < this.player_hand.length; a++) {
        this.extra_animations.unshift(['DiscardFirst', 1, 0]);
    }


}

//-----------------------------------------------------------------------------
// Function : playMulliganAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.playMulliganOpponent = function () {
    if (this.checkIAMulligan()) {
        this.extra_animations.shift();
        this.extra_animations.unshift(['MulliganNPCConfirm'])
    } else {
        this.closeKeepOpponent()
    }

}
//-----------------------------------------------------------------------------
// Function : playMulliganAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.playMulliganAnimation = function () {
    this.count_frames = 0;
    this.animation_count_frames = 0;
    this.extra_animations.shift();
    if (this.turn == 1) {
        this.extra_animations.push(['MulliganOpponent']);
        this.extra_animations.push(['MulliganPlayer']);
    } else {
        this.extra_animations.push(['MulliganPlayer']);
        this.extra_animations.push(['MulliganOpponent']);
    }


    this.createMulliganButtons();
}

//-----------------------------------------------------------------------------
// Function : playMulliganAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createMulliganButtons = function () {

    this.cardFade = new Sprite();
    this.cardFade.bitmap = ImageManager.loadKamigami("dark_layer");
    this.cardContainer.addChildZ(this.cardFade, 60);
    this.cardFade.opacity = 0;
    this.cardContainer.sortChildren()

    this.mulliganBtn = new Sprite_Card();
    this.mulliganBtn.bitmap = ImageManager.loadExtrasKamigami("MulliganBtn")
    this.addChild(this.mulliganBtn)
    this.mulliganBtn.anchor.x = this.mulliganBtn.anchor.y = 0.5
    this.mulliganBtn.x = Graphics.width / 2 + 210
    this.mulliganBtn.y = 120;
    this.mulliganBtn.opacity = 0

    this.keepBtn = new Sprite_Card();
    this.keepBtn.bitmap = ImageManager.loadExtrasKamigami("KeepBtn")
    this.addChild(this.keepBtn)
    this.keepBtn.anchor.x = this.keepBtn.anchor.y = 0.5
    this.keepBtn.x = Graphics.width / 2 - 210
    this.keepBtn.y = 120;
    this.keepBtn.opacity = 0


    this.mullText = new Sprite();
    this.mullText.bitmap = ImageManager.loadExtrasKamigami("MulliganText")
    this.addChild(this.mullText)
    this.mullText.opacity = 0
    this.mullText.y = 900

    let text = ""
    text = IAVRA.I18N.localize("#{DuelVocab.SkillsDescription.mulliganHeader}")
    this.mullTextHeader = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 48, fill: 0xFFFFFF, align: 'center', dropShadow: true, dropShadowBlur: 3 });
    this.addChild(this.mullTextHeader)
    this.mullTextHeader.x = Graphics.width / 2 - this.mullTextHeader.width / 2
    this.mullTextHeader.y = 850
    this.mullTextHeader.alpha = 0

    text = IAVRA.I18N.localize("#{DuelVocab.SkillsDescription.mulliganText}")
    this.mullTextContent = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 36, fill: 0xFFFFFF, align: 'center', dropShadow: true, dropShadowBlur: 3, wordWrap: true, wordWrapWidth: 1600 });
    this.addChild(this.mullTextContent)
    this.mullTextContent.x = Graphics.width / 2 - this.mullTextContent.width / 2
    this.mullTextContent.y = 920
    this.mullTextContent.alpha = 0 
 
    if (this.turn == 0) 
        text = IAVRA.I18N.localize("#{DuelVocab.SkillsDescription.mulliganText2}")
    else
        text = IAVRA.I18N.localize("#{DuelVocab.SkillsDescription.mulliganText3}")
    this.mullTextTurn = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 36, fill: 0xFFFFFF, align: 'center', dropShadow: true, dropShadowBlur: 3, wordWrap: true, wordWrapWidth: 1600 });
    this.addChild(this.mullTextTurn)
    this.mullTextTurn.x = Graphics.width / 2 - this.mullTextTurn.width / 2
    this.mullTextTurn.y = 40
    this.mullTextTurn.alpha = 0 
};

const rotateArrayReverse = function (nums, k) {

    for (let i = 0; i < k; i++) {
        nums.push(nums.shift());
    }

    return nums;
}
//-----------------------------------------------------------------------------
// Function : fixMulliganPosition
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.fixMulliganPosition = function (sprite, type) {
    sprite.zOrder -= 40;
    switch (type) {
        case 1:
            sprite.x = 1720;
            sprite.y = 880;
            break;
        case 2:
            sprite.x = 935;
            sprite.y = 79;
            break;
    }
    sprite.scale.x = 0.4;
    sprite.scale.y = 0.4;
    sprite.opacity = 0;
    sprite.rotation = 0;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
};



//-----------------------------------------------------------------------------
// Function : proceed_discard_first
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceed_discard_first = function () {
    if (this.extra_animations[0][2] == 0) {
        if (this._cards_player_1.length > 0) {
            var rand = 0
            this.sendCardMull(0, this.player_hand[rand]);
            let lastGyCard = this.player1_graveyard[this.player1_graveyard.length - 1]
            this.resetExtraAnimation()
            this.extra_animations.unshift(['SendGraveyardBig', lastGyCard[1], lastGyCard[2], lastGyCard[3], lastGyCard[4]])
            this.setCardAttributes(lastGyCard[1], this._cards_player_1[rand])
            this.fixMulliganPosition(this._cards_player_1[rand], 1)
            this._cards_player_1[rand].configureGod("Back_Card");
            this._cards_player_1[rand].opacity = 0;
            this._cards_player_1[rand].zOrder -= 40;
            this._cards_player_1.splice(rand, 1);
            this.player_hand.splice(rand, 1);

        } else
            this.resetExtraAnimation()
    } else {
        if (this._cards_player_2.length > 0) {
            this.sendCardMull(1, this.npc_hand[0]);
            let lastGyCard = this.player2_graveyard[this.player2_graveyard.length - 1]
            this.resetExtraAnimation()
            this.extra_animations.unshift(['SendGraveyardBig', lastGyCard[1], lastGyCard[2], lastGyCard[3], lastGyCard[4]])
            this.setCardAttributes(lastGyCard[1], this._cards_player_2[0])
            this._cards_player_2[0].opacity = 0;
            this._cards_player_2.splice(0, 1);
            this.npc_hand.splice(0, 1);
        } else
            this.resetExtraAnimation()
    }

}

//-----------------------------------------------------------------------------
// Function : sendCardMull
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.sendCardMull = function (turn, id, rotation = null, x = 0, y = 0) {
    if (rotation == null)
        [rotation, x, y] = this.randomizeMulliganSlot(turn)
    var gyImage = new SpriteStaticGod()
    gyImage.configureGod("Back_Card")
    gyImage.anchor.x = gyImage.anchor.y = 0.5
    gyImage.scale.x = gyImage.scale.y = 0.4
    gyImage.x = x
    gyImage.y = y
    gyImage.rotation = rotation
    this.cardContainer.addChildZ(gyImage, 2)
    var gyCards = [id, gyImage, rotation, x, y]
    if (turn == 0) {
        this.player1_graveyard.push(gyCards)
    } else {
        this.player2_graveyard.push(gyCards)
    }
};
//-----------------------------------------------------------------------------
// Function : randomizeMulliganSlot
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.randomizeMulliganSlot = function (turn) {
    let rotation = Math.random() * Math.PI - Math.PI / 2 + turn * Math.PI
    if (turn == 0) {
        var x = Math.randomInt(50) - 25 + Graphics.width / 2
        var y = Math.randomInt(50) - 25 + Graphics.height / 2 + 200
    } else {
        var x = Math.randomInt(50) - 25 + Graphics.width / 2
        var y = Math.randomInt(50) - 25 + Graphics.height / 2 - 200
    }
    return [rotation, x, y]
}


const rotateArray1 = function (nums, k) {

    for (let i = 0; i < k; i++) {
        nums.unshift(nums.pop());
    }

    return nums;
}

