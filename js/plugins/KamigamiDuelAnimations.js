//-----------------------------------------------------------------------------
// Function : createTurnImage
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createTurnImage = function () {
    this.turnAnimation = new Sprite_Turn_Animation();
    this.addChild(this.turnAnimation)
}


//-----------------------------------------------------------------------------
// Function : createAllDevotionCrystals
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createAllDevotionCrystals = function (animation) {
    AudioManager.playSe({ name: "Devotion", pan: 0, pitch: 100, volume: 100 });
    for (n = 0; n < animation[3]; n++) {
        let last = this.devotionCrystals.length
        this.devotionCrystals.push(new Sprite)
        this.devotionCrystals[last].turn = animation[1]
        this.devotionCrystals[last].bitmap = ImageManager.loadExtrasKamigami("devotionLight")
        this.devotionCrystals[last].x = this.board_map[animation[2] % 4][parseInt(animation[2] / 4)][0] + Math.randomInt(120) - 60
        this.devotionCrystals[last].y = this.board_map[animation[2] % 4][parseInt(animation[2] / 4)][1] + Math.randomInt(120) - 60
        this.devotionCrystals[last].anchor.x = this.devotionCrystals[last].anchor.y = 0.5
        this.devotionContainer.addChild(this.devotionCrystals[last])
        this.devotionCrystals[last].opacity = 0
    }
}


//////////////////////////// MAIN UPDATE //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : execute_extra_animations
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.execute_extra_animations = function () {
    this.return_card_animation();
    if (this.extra_animations.length > 0) {
        this.updateShowInfoAction(-1)
        this.lock_move_cards = false
        this.animation_count_frames++;
        switch (this.extra_animations[0][0]) {
            case 'EndGame':
                this.callEndGame(this.extra_animations[0][1])
                this.extra_animations.shift()
                break;
            case 'Mulligan':
                this.playMulliganAnimation()
                break
            case 'MulliganPlayer':
                this.playMulliganPlayer()
                break
            case 'MulliganOpponent':
                this.playMulliganOpponent()
                break
            case 'MulliganPlayerConfirm':
                this.playMulliganPlayerConfirm()
                break
            case 'MulliganNPCConfirm':
                this.playMulliganNPCConfirm()
                break
            case 'KeepOnlineOpp':
                this.playKeepOnline()
                break
            case 'SendMullCardsDeck':
                this.sendMullCardDeck()
                break
            case 'Devotion':
                this.play_devotion_animation()
                break
            case 'Close_Devotion':
                this.play_close_devotion_animation()
                break
            case 'Draw_Player':
            case 'Draw_Opponent':
                this.proceed_draw_animation()
                break
            case 'Discard_Player':
            case 'Discard_Opponent':
                this.proceed_discard_animation()
                break
            case 'DiscardRandom':
                this.proceed_discard_random()
                break
            case 'DiscardFirst':
                this.proceed_discard_first()
                break
            case 'ChooseCardPlayer':
                this.proceed_choose_card_hand_animation()
                break
            case 'Cast_Card':
                this.update_attack_phase()
                break
            case 'Attack_Card':
                this.perform_attack();
                break
            case 'Special_Skill':
                this.perform_special_skill()
                break
            case 'Move_Card':
                this.proceed_move_card()
                break
            case 'Pass_Turn':
                this.pass_turn_online()
                break
            case 'Extra_Skills':
                this.perform_extra_skill()
                break
            case 'Effect_Card':
                this.performEffectCard()
                break
            case 'Loki_Effect':
                this.performLokiEffect()
                break
            case 'Send_Graveyard':
                this.sendCardGraveyardAnimation()
                break
            case 'ReturnGraveyard':
                this.returnGraveyardAnimation()
                break
            case 'SendGraveyardBig':
                this.sendCardGraveyardBigAnimation()
                break
            case 'Exile_Card':
                this.exileCardAnimation()
                break
            case 'Devotion_Set':
                this.setDevotionAnimation()
                break
            case 'ExileGraveyard':
                this.exileGraveyardAnimation()
                break
        }
        return true;
    }
    return false;
};

//-----------------------------------------------------------------------------
// Function : play_devotion_animation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.play_devotion_animation = function () {
    if (this._fade_screen.opacity < 150) {
        this._fade_screen.opacity += 5;
    }
    for (var n = 0; n < this.devotionCrystals.length; n++) {
        if (n == 0 || this.devotionCrystals[n - 1].opacity == 255) {
            this.devotionCrystals[n].rotation += 0.2
            this.devotionCrystals[n].opacity += 80
        }
    }
    if (this.animation_count_frames == 1) {
        this.createAllDevotionCrystals(this.extra_animations[0])
        if (this.devotionText.opacity == 0) {
            this.devotionText.x = 60
            this.devotionText.y = 540
        }

    }
    else if (this.devotionText.x < 960) {
        this.devotionText.x += (960 - this.devotionText.x) / 10 + 1
        this.devotionText.opacity += 10
        if (this.devotionText.x > 960) {
            this.devotionText.x = 960
        }
    }
    if (this.devotionCrystals.length == 0) {
        this.resetExtraAnimation();
        return;
    }
    if (this.devotionCrystals[this.devotionCrystals.length - 1].opacity == 255 && (this.devotionText.x >= 960 || (this.extra_animations[1] && this.extra_animations[1][0] == 'Devotion'))) {
        this.resetExtraAnimation();
    }
};

//-----------------------------------------------------------------------------
// Function : play_close_devotion_animation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.play_close_devotion_animation = function () {
    if (this.devotionText.opacity > 0) {
        this.devotionText.y -= (540 - this.devotionText.y) / 8 + 1
        this.devotionText.opacity -= 15
    }
    if (this.devotionCrystals.length == 0) {
        this._fade_screen.opacity -= 10
        if (this._fade_screen.opacity == 0) {
            this.resetExtraAnimation();
        }
        return
    }
    let count = 0
    let turn
    for (var n = 0; n < this.devotionCrystals.length; n++) {
        turn = this.devotionCrystals[n].turn
        this.devotionCrystals[n].rotation += 0.2
        if (n * 5 < this.animation_count_frames) {
            this.moveToDevotionPool(this.devotionCrystals[n], turn)
        }
        if (n * 5 + 30 < this.animation_count_frames) {
            this.devotionCrystals[n].opacity -= 20
        }
        if (n * 5 + 30 == this.animation_count_frames) {
            AudioManager.playSe({ name: "Devotion_points", pan: 0, pitch: 100, volume: 80 });
            this.set_devotion(turn, 1)
        }
        if (this.devotionCrystals[n].opacity == 0) {
            count++
        }
    }
    if (count == this.devotionCrystals.length) {
        for (var n = 0; n < this.devotionCrystals.length; n++) {
            this.removeChild(this.devotionCrystals[n])
        }
        this.devotionCrystals = []
    }
    // 
};

//-----------------------------------------------------------------------------
// Function : moveToDevotionPool
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.moveToDevotionPool = function (sprite, turn) {
    let pool = turn == 0 ? this._devotion_player1 : this._devotion_player2
    sprite.x += (pool.x - sprite.x + 100) / 10
    sprite.y += (pool.y - sprite.y + 40) / 10
}
//-----------------------------------------------------------------------------
// Function : show_big_card_extra_animation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.show_big_card_extra_animation = function (id) {
    this._big_card_front.configureGod(this.cardDefinitions.getCardAttribute(id, "Image_Big"), id, true)
    this._big_card_front.opacity = 255;
    this._big_card_front.euler.y = Math.PI / 2;
    this._big_card_front.euler.x = 0;
    this._big_card_front.x = 0;
    this._big_card_front.y = 0;
    this.specialCardCamera.y = Graphics.height / 2;
    this.specialCardCamera.x = Graphics.width / 2;
    this._big_card_front.rotation = 0
    this._big_card_front.scale.x = 1;
    this._big_card_front.scale.y = 1;
};

//-----------------------------------------------------------------------------
// Function : resetBigCard
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.resetBigCard = function () {
    this._big_card_front.opacity = 0
    this._big_card_front.euler.y = 0
    this._big_card_front.euler.x = 0
    this.specialCardCamera.y = 0
    this.specialCardCamera.x = 0
    this._big_card_front.scale.x = 1
    this._big_card_front.euler.y = 0
    this._big_card_front.scale.y = 1
};
//-----------------------------------------------------------------------------
// Function : play_devotion_animation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.resetExtraAnimation = function () {
    this.animation_count_frames = 0;
    this.extra_animations.shift();
    this.count_frames = 0;
    this.stopActionAnimation()
}
//-----------------------------------------------------------------------------
// Function : play_devotion_animation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.place_crystals = function (devotion) {
    devotion = Math.min(10, devotion)
    for (var n = 0; n < devotion; n++) {
        this.imgCrystals[n].opacity = 255;
        this.imgCrystals[n].x = this.crystalsPosition[n][0];
        this.imgCrystals[n].y = this.crystalsPosition[n][1];
    }
};

//============================================================================
//################# DRAW ANIMATIONS ##########################################
//============================================================================
//-----------------------------------------------------------------------------
// Function : return_card_animation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.return_card_animation = function () {
    for (var n = 0; n < this._cards_player_2.length; n++) {
        if (this.npc_card_read_for_hand[n] == true)
            this.set_final_card_hand_position(this._cards_player_2[n], n, 1)
    }
    if (this.lock_move_cards)
        return;
    for (var n = 0; n < this._cards_player_1.length; n++) {
        if (this.card_read_for_hand[n] == true)
            this.set_final_card_hand_position(this._cards_player_1[n], n, 0)
    }
};
//-----------------------------------------------------------------------------
// Function : proceed_draw_animation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceed_draw_animation = function () {
    this._fade_screen.opacity -= 10;
    if (this.extra_animations[0][0] == "Draw_Player")
        this.proceed_player_draw_animation();
    else
        this.proceed_npc_draw_animation();
    if (this.extra_animations.length == 0) {
        this.card_acceleration_y = 0;
        this.card_acceleration_x = -10;
        this.npc_card_acceleration_y = 0;
        this.npc_card_acceleration_x = -12;
        this.starting_draw = 1;
    }
};


//-----------------------------------------------------------------------------
// Function : proceed_player_draw_animation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceed_player_draw_animation = function () {
    if (this.card_num === false) {
        if (this.player1Deck.cardList.length == 0) {
            this.resetExtraAnimation()
            return
        }

        this.card_num = this._cards_player_1.length;
        this._cards_player_1[this.card_num] = this._cards_player_1_all[40 - this.player_cards.length];
        this._cards_player_1[this.card_num].opacity = 0;

        this._deck_cards[1].y = 880 - this._cards_player_1[this.card_num].y - this.player_cards.length / 2;
        this._deck_cards[1].x = 1720 - this._cards_player_1[this.card_num].x - this.player_cards.length / 2;

        this._deck_cards[0].x = this._deck_cards[1].x;
        this._deck_cards[0].y = this._deck_cards[1].y;

        let cardId = this.player_cards.shift();
        this.player_hand.push(cardId);
        this.count_time[this.card_num] = 0;

        this._deck_cards[1].opacity = 255;
        this._cards_player_1[this.card_num].configureGod(this.cardDefinitions.getCardAttribute(cardId, "Image_Big"), cardId);
        this.card_read_for_hand[this.card_num] = false;
        this.cardContainer.sortChildren();

    }
    if (this._cards_player_1[this.card_num].opacity < 255 && this._deck_cards[1].euler.y < Math.PI / 2) {
        this.card_acceleration_x += 0.3 + (0.6 * this.starting_draw);
        if (this.card_acceleration_x < 24)
            this.card_acceleration_y += (1.1 * this.starting_draw);
        else
            this.card_acceleration_y -= (1.5 * this.starting_draw);
        this._deck_cards[1].scale.y += 0.005 * this.starting_draw;
        this._deck_cards[1].euler.y += 0.08 * this.starting_draw;
        this._deck_cards[1].x -= this.card_acceleration_x;
        this._deck_cards[1].y -= this.card_acceleration_y;

    }
    else if (this._cards_player_1[this.card_num].opacity < 255) {
        this._deck_cards[1].opacity = 0;
        AudioManager.playSe({ name: "Card_Deal", pan: 0, pitch: 100, volume: 80 });
        this._cards_player_1[this.card_num].opacity = 255;
        this._cards_player_1[this.card_num].scale.x = 0;
        this._cards_player_1[this.card_num].y = 880 + this._deck_cards[1].y - this.player_cards.length / 2;
        this._cards_player_1[this.card_num].x = 1720 + this._deck_cards[1].x - this.player_cards.length / 2;

        //this._deck_cards[1].y = 0;

    }
    else if (this._cards_player_1[this.card_num].scale.x < 0.4) {
        this.card_acceleration_x += 1 * this.starting_draw;
        this.card_acceleration_y -= 1 * this.starting_draw;
        this._cards_player_1[this.card_num].x -= this.card_acceleration_x;
        this._cards_player_1[this.card_num].y -= this.card_acceleration_y;
        this._cards_player_1[this.card_num].scale.y = 0.4;
        this._cards_player_1[this.card_num].scale.x = Math.round((this._cards_player_1[this.card_num].scale.x + 0.02 * this.starting_draw) * 100) / 100;
    }
    else if (this._cards_player_1[this.card_num].scale.x < 1 && this.count_time[this.card_num] == 0) {
        this.card_acceleration_x -= 1 * this.starting_draw;
        this.card_acceleration_y -= 1 * this.starting_draw;
        this._cards_player_1[this.card_num].x -= this.card_acceleration_x;
        this._cards_player_1[this.card_num].y -= this.card_acceleration_y;
        this._cards_player_1[this.card_num].scale.x += 0.035;
        this._cards_player_1[this.card_num].scale.y += 0.035;
        if (this._cards_player_1[this.card_num].scale.x >= 1) {
            this._cards_player_1[this.card_num].scale.x = 1;
            this._cards_player_1[this.card_num].scale.y = 1;
        }
    }
    else {
        if (this.count_time[this.card_num] < 15 / this.starting_draw) {
            this.count_time[this.card_num]++;
            return;
        }
        this.count_time[this.card_num] = 60;
        this.card_read_for_hand[this.card_num] = true;
        if (this.starting_draw > 1) {
            this.card_acceleration_y = 80;
            this.card_acceleration_x = 30;
        } else {
            this.card_acceleration_y = 0;
            this.card_acceleration_x = -10;
        }
    }
    if (this.count_time[this.card_num] == 60) {
        this.cardContainer.sortChildren();
        this.resetExtraAnimation()
        this.card_num = false
        this.count_time = []

        this._deck_cards[1].scale.y = 0.4;
        this._deck_cards[1].euler.y = 0;
        this._deck_cards[1].scale.x = 0.4;
        this._deck_cards[1].x = 200;
        this._deck_cards[1].y = 200;
        this._deck_cards[0].opacity = 0;
    }
    if (this.player1Deck.cardList.length == 0) {
        this._deck_cards[0].opacity = 0;
    }
    return;
};
//-----------------------------------------------------------------------------
// Function : proceed_npc_draw_animation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceed_npc_draw_animation = function () {
    if (this.card_num === false) {
        if (this.player2Deck.cardList.length == 0) {
            this.resetExtraAnimation()
            return
        }
        this.card_num = this._cards_player_2.length;
        this._cards_player_2[this.card_num] = this._cards_player_2_Back_all[40 - this.npc_cards.length];
        this.npc_hand.push(this.npc_cards.shift());
    }
    if (this._cards_player_2[this.card_num].opacity < 255) {
        this._cards_player_2[this.card_num].x = 1740 + this._deck_cards[3].x;
        this._cards_player_2[this.card_num].y = 900 + this._deck_cards[3].y;
        this._cards_player_2[this.card_num].opacity = 255;
        this._cards_player_2[this.card_num].rotation = Math.PI;
        this.npc_card_read_for_hand[this.card_num] = false;
        if (this.starting_draw > 1) {
            this.npc_card_acceleration_y = 20;
            this.npc_card_acceleration_x = -20;
        } else {
            this.npc_card_acceleration_y = 0;
            this.npc_card_acceleration_x = -12;
        }
        this._cards_player_2[this.card_num].scale.x = 0.4;
        this._cards_player_2[this.card_num].scale.y = 0.4;
        this.npc_count = 0;
        AudioManager.playSe({ name: "Card_Deal", pan: 0, pitch: 100, volume: 80 });
    }
    else if (this.npc_count < 100) {
        if (this.npc_count < 51) {
            this.npc_card_acceleration_x += (0.7 * this.starting_draw);
            if (this.starting_draw > 1)
                this.npc_card_acceleration_x += 5;
            this.npc_card_acceleration_y += (0.1 * this.starting_draw);
        } else {
            this.npc_card_acceleration_x -= (0.6 * this.starting_draw);
            this.npc_card_acceleration_y -= (0.1 * this.starting_draw);
            if (this.npc_card_acceleration_x < 0)
                this.npc_count = 100;
        }

        this._cards_player_2[this.card_num].x += this.npc_card_acceleration_x;
        this._cards_player_2[this.card_num].y += this.npc_card_acceleration_y;
        this._cards_player_2[this.card_num].scale.x += (0.003 * this.starting_draw);
        this._cards_player_2[this.card_num].scale.y += (0.003 * this.starting_draw);
        this.npc_count += this.starting_draw;

    }
    else {
        this.cardContainer.sortChildren();
        this.resetExtraAnimation()
        this.npc_card_read_for_hand[this.card_num] = true;
        this.card_num = false
    }
    if (this.player2Deck.cardList.length == 0) {
        this._deck_cards[3].opacity = 0;
        this._deck_cards[2].opacity = 0;
    }
};

////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// DISCARD ANIMATION! //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : proceed_discard_random
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceed_discard_random = function () {
    if (this.extra_animations[0][2] == 0) {
        if (this._cards_player_1.length > 0) {
            var rand = Math.randomInt(this._cards_player_1.length)
            if (this.extra_animations[0][3] != -1) {
                rand = Math.min(this._cards_player_1.length - 1, this.extra_animations[0][3])
            }
            this.sendCardGraveyard(0, this.player_hand[rand]);
            let lastGyCard = this.player1_graveyard[this.player1_graveyard.length - 1]
            this.resetExtraAnimation()
            this.extra_animations.unshift(['SendGraveyardBig', lastGyCard[1], lastGyCard[2], lastGyCard[3], lastGyCard[4]])
            this.setCardAttributes(lastGyCard[1], this._cards_player_1[rand])
            this._cards_player_1[rand].destroy()
            this.removeChild(this._cards_player_1[rand])
            this._cards_player_1.splice(rand, 1);
            this.player_hand.splice(rand, 1);

        } else
            this.resetExtraAnimation()
    } else {
        if (this._cards_player_2.length > 0) {
            this.sendCardGraveyard(1, this.npc_hand[0])
            let lastGyCard = this.player2_graveyard[this.player2_graveyard.length - 1]
            this.resetExtraAnimation()
            this.extra_animations.unshift(['SendGraveyardBig', lastGyCard[1], lastGyCard[2], lastGyCard[3], lastGyCard[4]])
            this.setCardAttributes(lastGyCard[1], this._cards_player_2[0])
            this._cards_player_2[0].destroy();
            this.removeChild(this._cards_player_2[0])
            this._cards_player_2.splice(0, 1);
            this.npc_hand.splice(0, 1);
        } else
            this.resetExtraAnimation()
    }
}
//-----------------------------------------------------------------------------
// Function : proceed_choose_card_hand_animation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceed_choose_card_hand_animation = function () {
    if (this.extra_animations[0][1] == 0) {
        if (this.player_hand.length == 0) {
            this.resetExtraAnimation()
            return
        }
    } else {
        if (this.npc_hand.length == 0) {
            this.resetExtraAnimation()
            return
        }
    }
    if (this.extra_animations[0][1] == 0) {
        if (this._fade_screen.opacity < 150) {
            this._fade_screen.opacity += 10
            this._fade_screen_2.opacity -= 20
            if (this._fade_screen.opacity >= 150) {
                this.resetBigCard()
            }
            return
        }
        for (var n = 0; n < this._cards_player_1.length; n++)
            this.set_final_card_hand_position_play(this._cards_player_1[n], n);
        this.lock_move_cards = true;
        this.count_frames > 60 ? this.open_play_choices = true : this.open_play_choices = false;
        this.check_hand_card_trigger()
    } else {
        this.close_discard_animation_opponent();
    }

};
//-----------------------------------------------------------------------------
// Function : proceed_discard_animation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceed_discard_animation = function () {
    if (this.extra_animations[0][0] == "Discard_Player") {
        if (this._fade_screen.opacity < 150) {
            this._fade_screen.opacity += 10
            return
        }
        this.move_hand_to_play()
        this.check_hand_card_trigger()
    } else {
        this.close_discard_animation_opponent();
    }

};
//-----------------------------------------------------------------------------
// Function : close_discard_animation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.close_discard_animation = function () {
    if (this.extra_animations[0][0] == "ChooseCardPlayer") {
        switch (this.extra_animations[0][2]) {
            case 109: // Izanagi
                this.exileCard(this.turn, this.index, this.extra_animations[0][3])
                this.on_special_skill = false;
                break
            case 113: // Tyr
                var cardEffect = this.cardDefinitions.getCardAttribute(this.player_hand[this.index], "cardEffect")
                if (cardEffect == 63) {
                    this._cards_player_1[this.index].configureGod("")
                    this.sacrificeCard(this.board_place)
                    this.extra_animations.push(['Cast_Card', this.turn, this.player_hand[this.index], this.board_place, this.index, true]);
                    this.return_fase_4 = true;
                    this.on_special_skill = false;
                }
                break
            case 117: // Dark Forest
                this.exileCardDarkForest(this.turn, this.index, this.extra_animations[0][3], this.extra_animations[0][4])
                this.on_special_skill = false;
                break
            case 64: // Heimdall
                var specialType = this.cardDefinitions.getCardAttribute(this.player_hand[this.index], "specialType")
                var cardType = this.cardDefinitions.getCardAttribute(this.player_hand[this.index], "cardType")
                var cardEffect = this.cardDefinitions.getCardAttribute(this.player_hand[this.index], "cardEffect")
                if (specialType == 2 && cardType == 1 && cardEffect != 64) {
                    this.cardDefinitions.addExtraSkillById(this.player_hand[this.index], 64);
                }
                this.resetExtraAnimation()
                this._fade_screen.opacity = 0;
                return
        }
    } else {
        let cardEffect = this.extra_animations[0][2]
        this.sendCardGraveyard(this.turn, this.player_hand[this.index]);
        let lastGyCard = this.player1_graveyard[this.player1_graveyard.length - 1]
        this.resetExtraAnimation()
        this.extra_animations.unshift(['SendGraveyardBig', lastGyCard[1], lastGyCard[2], lastGyCard[3], lastGyCard[4]])
        this.setCardAttributes(lastGyCard[1], this._cards_player_1[this.index])
        this.sendCardDiscardOnline(this.player_hand[this.index], cardEffect, this.index);
        this._cards_player_1[this.index].destroy()
        this.removeChild(this._cards_player_1[this.index])
        this._cards_player_1.splice(this.index, 1);
        this.player_hand.splice(this.index, 1);
        this._fade_screen.opacity = 0;
        this.index = 0;
        return
    }
    this.resetExtraAnimation()
    this._fade_screen.opacity = 0;
    this.index = 0;
}
//-----------------------------------------------------------------------------
// Function : sendCardDiscardOnline
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.sendCardDiscardOnline = function (cardId) {

};

//-----------------------------------------------------------------------------
// Function : close_discard_animation_opponent
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.close_discard_animation_opponent = function () {
    console.log(this.onlineDiscardPile)
    if (this.usingAI) {
        this.chooseAIDiscardCard()
    } else if (this.onlineDiscardPile.length > 0 && this.onlineDiscardPile[0] == false) {
        this.onlineDiscardPile.shift();
    } else if (this.onlineDiscardPile.length > 0) {
        this.discardAnimation(this.onlineDiscardPile.shift())
    } else if (this.extra_animations[0][2]) {
        this.discardAnimation(this.extra_animations[0][2])

    }
    this.resetExtraAnimation()
}

//-----------------------------------------------------------------------------
// Function : discardAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.discardAnimation = function (cardId) {
    console.log("DISCARDING")
    this.sendCardGraveyard(1, cardId);
    let lastGyCard = this.player2_graveyard[this.player2_graveyard.length - 1]
    this.resetExtraAnimation()
    this.extra_animations.unshift(['SendGraveyardBig', lastGyCard[1], lastGyCard[2], lastGyCard[3], lastGyCard[4]])
    this.setCardAttributes(lastGyCard[1], this._cards_player_2[0])
    this._cards_player_2[0].destroy()
    this.removeChild(this._cards_player_2[0])
    this._cards_player_2.splice(0, 1);
    this.npc_hand.splice(0, 1);
    this.extra_animations.unshift('decoy')
};


////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// EXTRA SKILLS ANIMATION! //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : executeExtraSkills
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.executeExtraSkills = function () {
    if (this.cardDefinitions.getExtraSkills().length > 0) {
        switch (this.cardDefinitions.getExtraSkills()[0][2]) {
            case 0:
                if (this.turn != 0) {
                    this.cardDefinitions.getExtraSkills()[0][2] = 5;
                    this.chooseExtraSkillsTarget()
                    return false
                }
                this.cardDefinitions.getExtraSkills()[0][2] = this.checkForSkillTargets(this.cardDefinitions.getExtraSkills[0])
                break
            case 1:
                this.extraSkillAnimation()
                break
            case 2:
                this.extraSkillWaitClick()
                break
            case 3:
                this.skillEfectsAnimation()
                break
            case 5:
                this._fade_screen_2.opacity = 0;
                this._big_card_front.opacity = 0;
                this.cardDefinitions.removeSkill();
                this.stopActionAnimation()
                break
        }
        return true
    }
    else
        return false
};

//-----------------------------------------------------------------------------
// Function : checkForSkillTargets
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.checkForSkillTargets = function () {
    switch (this.cardDefinitions.getExtraSkills()[0][1]) {
        case 20: //Horus
            this.check_light_monument(this.getOppositeTurn())
            break
        case 21: // Sekhmet
            this.check_light_creature(this.getOppositeTurn())
            break
        case 22: // Serket
            this.check_light_creature(this.getOppositeTurn())
            break
        case 31: // Hera
            this.check_light_creature_no_god(this.getOppositeTurn())
            break
        case 35: //Raijin
            this.check_light_creature_no_god(this.getOppositeTurn())
            break
        case 39: //Nachi Taisha
            this.check_light_lowest_cost(this.getOppositeTurn())
            break
        case 48: // Osiris
            this.check_light_all_permanents(this.turn == 0 ? 1 : 0)
            break;
        case 61: //Ares
            this.check_light_creature_no_god(this.getOppositeTurn())
            break
        case 64: // Heimdall
            this.flashingArea1(this.boardState)
            this.loadActionAnimation("special")
            break
        case 68: //Iara
            this.check_light_lowest_cost(this.getOppositeTurn())
            break
        case 72: // Boto
            this.check_light_permanent_no_god(this.getOppositeTurn())
            break
        case 103: // Loki
            this.check_light_all_creatures();
            break;
        case 107: //Izanami
            this.check_light_izanami(this.cardDefinitions.getExtraSkills()[0][0])
            break
        default:
            this.flashingArea1(this.boardState)
            this.loadActionAnimation("cast")
            break

    }
    console.log("Flashing Points", this.flashing_area)
    this.animation_count_frames = 0;
    if (this.flashing_area.length == 0) {
        return 5;
    }
    else
        return 1;
};
//-----------------------------------------------------------------------------
// Function : extraSkillAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.extraSkillAnimation = function () {
    this.skill_count_frames++
    if (this._fade_screen_2.opacity < 255) {
        this._fade_screen_2.opacity += 20
        this.skill_count_frames = 0
    }
    if (this.skill_count_frames == 1) {
        if (this.cardDefinitions.getExtraSkills()[0][0] == -1) {
            this.cardDefinitions.removeSkill();
            return;
        }
        if (this.cardDefinitions.getExtraSkills()[0][1] == 107) {
            let cardId = this.boardState.getValue(this.cardDefinitions.getExtraSkills()[0][0]).cardId
            this.show_big_card_extra_animation(cardId)
        } else {
            this.show_big_card_extra_animation(this.cardDefinitions.getExtraSkills()[0][0])
        }

    } else if (this.skill_count_frames > 10 && this.skill_count_frames < 46) {
        this.specialCardCamera.x += (47 - this.skill_count_frames);
        //this._big_card_front.scale.x += 0.005;
        //this._big_card_front.scale.y += 0.005;
        this._big_card_front.euler.y += 0.015;
    } else if (this.skill_count_frames == 46) {
        if (this.turn == 0)
            this.cardDefinitions.getExtraSkills()[0][2] = 2;
        else
            this.cardDefinitions.getExtraSkills()[0][2] = 3;
    }

    else if (this._big_card_front.euler.y > 0) {
        this._big_card_front.euler.y -= 0.2
        if (this._big_card_front.euler.y <= 0) {
            this.skill_count_frames = 10
            this._big_card_front.euler.y = 0;
        }
    }
};

//-----------------------------------------------------------------------------
// Function : extraSkillWaitClick
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.extraSkillWaitClick = function () {
    var i = this.get_board_touch();
    if (TouchInput.isTriggered()) {
        if (this.flashing_area.includes(i)) {
            this.cardDefinitions.getExtraSkills()[0][2] = 3;
            this.cardDefinitions.getExtraSkills()[0][3] = i;
        } else if (this.cardDefinitions.getExtraSkills()[0][4]) {
            this.cardDefinitions.getExtraSkills()[0][2] = 3;
            this.cardDefinitions.getExtraSkills()[0][3] = -1;
        }

    }

}
//-----------------------------------------------------------------------------
// Function : skillEfectsAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.skillEfectsAnimation = function () {
    this._fade_screen_2.opacity = 0;
    this._big_card_front.opacity = 0;
    this.resetBigCard();
    this.applySkillEffects(this.cardDefinitions.getExtraSkills()[0][3])
}

//-----------------------------------------------------------------------------
// Function : applySkillEffects
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.applySkillEffects = function (target) {
    this.playCardAnimation(this.cardDefinitions.getExtraSkills()[0][1], this.cardDefinitions.getExtraSkills()[0][3]);
    switch (this.cardDefinitions.getExtraSkills()[0][1]) {

        case 20: //Horus
            this.set_hp(target, -1000)
            break
        case 21: // Sekhmet
            this.set_hp(target, -10)
            break
        case 22: //Serket
            this.set_hp(target, -10)
            break
        case 31: // Hera
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(target).boardId, 31, this.turn])
            break
        case 35: //Raijin
            this.set_hp(target, -1000)
            break
        case 39: //Nachi Taisha   
            this.set_hp(target, -1000)
            break
        case 64: // Heimdall
            this.board_place = target
            this._cards_player_1[this.index].configureGod("")
            this.extra_animations.push(['Cast_Card', this.turn, this.player_hand[this.index], this.board_place, this.index, true]);
            break
        case 68: //Iara 
            this.set_hp(target, -10)
            break
        case 72: // Boto
            this.cardDefinitions.addNewStartTurnEffect([5, this.boardState.getValue(target).boardId, 72, this.turn])
            break
        case 103: // Loki
            if (this.lokiFirstTarget != target && this.set_devotion(0, - Math.max(0, this.getSkillCost(1030)))) {
                this.lokiSwapTargets(this.lokiFirstTarget, target);
            } else {
                SoundManager.playBuzzer()
            }
            this.phase = 4;
            break
        case 107: //Izanami
            this.set_hp(this.cardDefinitions.getExtraSkills()[0][0], -999)
            this.set_hp(target, -1000)
            break
        case 110: // Set
            if (this.cardDefinitions.getExtraSkills()[0][3] != -1 && this.set_devotion(this.turn, -this.getSkillCost(this.cardDefinitions.getExtraSkills()[0][1]))) {
                this.removeCardGraveyard(this.turn, this.cardDefinitions.getExtraSkills()[0][0])
                this.apply_revive(this.cardDefinitions.getExtraSkills()[0][0], target)
                this.return_fase_4 = true
            }
            break
        case 211: // Revive
            if (this.cardDefinitions.getExtraSkills()[0][3] != -1 && this.set_devotion(this.turn, - parseInt(this.cardDefinitions.getCardAttribute(this.onCastGraveyardCardId, "costDevotion")))) {
                this.removeCardGraveyard(this.turn, this.cardDefinitions.getExtraSkills()[0][0])
                this.apply_revive(this.cardDefinitions.getExtraSkills()[0][0], target, 54)
                this.getDiscardCardIndex(this.index)
                this.sendCardGraveyard(this.turn, this.onCastGraveyardCardId)
                this.return_fase_4 = true
            }

            break
        case 37: // Anubis
            if (this.cardDefinitions.getExtraSkills()[0][3] != -1) {
                this.removeCardGraveyard(this.turn, this.cardDefinitions.getExtraSkills()[0][0])
                if (this.turn == 0)
                    this.apply_revive(this.cardDefinitions.getExtraSkills()[0][0], target)
                this.return_fase_4 = true
            }
            break
        case 45: // Mummy
            if (this.cardDefinitions.getExtraSkills()[0][3] != -1 && this.set_devotion(this.turn, - parseInt(this.cardDefinitions.getCardAttribute(this.cardDefinitions.getExtraSkills()[0][0], "costDevotion")))) {
                this.removeCardGraveyard(this.turn, this.cardDefinitions.getExtraSkills()[0][0])
                this.apply_revive(this.cardDefinitions.getExtraSkills()[0][0], target)
                this.return_fase_4 = true
            }
            break
        case 23: // Phoenix
            if (this.cardDefinitions.getExtraSkills()[0][3] != -1 && this.set_devotion(this.turn, - parseInt(this.cardDefinitions.getCardAttribute(this.cardDefinitions.getExtraSkills()[0][0], "costDevotion")))) {
                this.removeCardGraveyard(this.turn, this.cardDefinitions.getExtraSkills()[0][0])
                this.apply_revive(this.cardDefinitions.getExtraSkills()[0][0], target)
                this.return_fase_4 = true
            }
            break
        case 48: // Osiris
            this.set_hp(target, -1000)
            break
        case 61: //Ares
            this.set_hp(target, -1000)
            break

    }
    this.cardDefinitions.getExtraSkills()[0][2] = 5
    this.flashing_area = [];
}
//-----------------------------------------------------------------------------
// Function : getReviveIndex
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.getDiscardCardIndex = function (index) {
    let oldSprite = this._cards_player_1.splice(index, 1);
    oldSprite.bitmap = "";
    this.player_hand.splice(index, 1);
}

//-----------------------------------------------------------------------------
// Function : proceed_move_card
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceed_move_card = function () {
    if (this.board_cards[this.extra_animations[0][1]] == -1) {
        console.log("MOVE!!", this.extra_animations[0])
        this.resetExtraAnimation()
        return
    }
    this.moveCardAnimation()
};
//-----------------------------------------------------------------------------
// Function : proceed_move_card
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.perform_extra_skill = function () {
    switch (this.extra_animations[0][4]) {
        case 103: // Loki
            if (this.extra_animations[0][6]) {
                this.set_devotion(this.extra_animations[0][1], -Math.max(0, this.getSkillCost(1030)))
                let target1 = this.extra_animations[0][3]
                let target2 = this.extra_animations[0][5]
                this.resetExtraAnimation()
                this.lokiSwapTargets(target1, target2);
                this.extra_animations.unshift(["Dummy"])
            }
            break
        case 109: // Izanagi
            this.exileCard(this.extra_animations[0][1], this.extra_animations[0][2], this.player2Deck.godCard)
            break
        case 117: // Dark Forest
            this.exileCardDarkForest(this.extra_animations[0][1], this.extra_animations[0][2], 141, this.extra_animations[0][4])
            break
        case 110: // Set
            this.set_devotion(this.extra_animations[0][1], this.extra_animations[0][2])
            this.resetExtraAnimation()
            this.extra_animations.unshift(["Dummy"])
            this.callReviveAI()
            break
        case 113: // Tyr
            this.sacrificeCard(this.extra_animations[0][3])
            var index = this.getTyrCard()
            this.extra_animations.push(['Cast_Card', this.turn, this.npc_hand[index], this.extra_animations[0][3], index, true]);
            this.return_fase_4 = true;
            this.on_special_skill = false;
            break
        case 112: // Hel
            var currentLocation = this.extra_animations[0][3]
            this.resetExtraAnimation()
            this.check_light_all_player_creatures_not_turn(currentLocation, this.turn)
            this.extra_animations.unshift(['Special_Skill', 1, currentLocation, this.flashing_area[0], 112, 0]);
            this.extra_animations.unshift(["Dummy"])
            this.board_place = currentLocation

            break
        case 114: // Odin
            //this._center_sprite.startAnimation(animation, false, 0);
            this.cardDefinitions.addNewStaticEffect([1, this.boardState.getValue(this.extra_animations[0][3]).boardId, 114])
            break
        case 107: // Izanami
            this.set_hp(this.extra_animations[0][2], -999)
            this.set_hp(this.extra_animations[0][3], -1000)
            break
        case 115: // Anhanga
            //this.applyAnhanga(this.turn)
            //this.removeTopCardGraveyard(this.turn)
            break

    }
    this.resetExtraAnimation()
}
//-----------------------------------------------------------------------------
// Function : loadActionAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.loadActionAnimation = function (type, index = -1) {
    this.stopActionAnimation()
    this.emitterAction = []
    if (this.turn == 1)
        return
    for (var n = 0; n < this.flashing_area.length; n++) {
        switch (type) {
            case "cast":
                this.emitterAction[n] = fx.getParticleEmitter('card-summon-sub1');
                this.setValuesInfo("cast", this.flashing_area[n])
                break
            case "action":
                if (this.boardState.hasCard(this.flashing_area[n])) {
                    this.emitterAction[n] = fx.getParticleEmitter('card-summon-sub3');
                    this.setValuesInfo("attack", this.flashing_area[n])
                } else {
                    this.emitterAction[n] = fx.getParticleEmitter('card-summon-sub2');
                    this.setValuesInfo("move", this.flashing_area[n])
                }
                break
            case "special":
                this.emitterAction[n] = fx.getParticleEmitter('card-summon-sub4');
                this.setValuesInfo("special", this.flashing_area[n])
                this.lock_move_cards = false;
                break

        }

        this.emitterAction[n].init(this.board_light_slots[this.flashing_area[n]], true, 1);
    }
    if (index != -1 && this.boardState.getValue(index).cardEffect >= 100) {
        //this.flashing_area.push(index)
        this.emitterAction.push(fx.getParticleEmitter('card-summon-sub4'));
        this.emitterAction[this.emitterAction.length - 1].init(this.board_light_slots[index], true, 1);
        this.setValuesInfo("special", index)
    }
}
//-----------------------------------------------------------------------------
// Function : stopActionAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.stopActionAnimation = function () {
    this.resetInfoValues()
    for (var n = this.emitterAction.length - 1; n >= 0; n--) {
        this.emitterAction[n].stop()
        this.emitterAction.pop()
    }

}

//-----------------------------------------------------------------------------
// Function : moveCardAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.moveCardAnimation = function () {
    if (this.animation_count_frames == 1) {
        this.board_cards[this.extra_animations[0][2]] = this.board_cards[this.extra_animations[0][1]];
        this.countTotalMovePixels = 0;
        AudioManager.playSe({ name: "Card_Move", pan: 0, pitch: 100, volume: 100 });
    }
    if (this.animation_count_frames <= 12) {
        let x = Math.floor(this.animation_count_frames / 5) * 4 * this.directionMoveValue(this.extra_animations[0][2], this.extra_animations[0][1], true);
        let y = Math.floor(this.animation_count_frames / 5) * 4 * this.directionMoveValue(this.extra_animations[0][2], this.extra_animations[0][1], false);
        this.board_cards[this.extra_animations[0][2]].x += x
        this.board_cards[this.extra_animations[0][2]].y += y
        this.countTotalMovePixels += x + y;
    } else if (this.animation_count_frames <= 31) {
        let x = Math.floor(7 - this.animation_count_frames / 5) * 4 * this.directionMoveValue(this.extra_animations[0][2], this.extra_animations[0][1], true)
        let y = Math.floor(7 - this.animation_count_frames / 5) * 4 * this.directionMoveValue(this.extra_animations[0][2], this.extra_animations[0][1], false)
        this.countTotalMovePixels += x + y;
        this.board_cards[this.extra_animations[0][2]].x += x
        this.board_cards[this.extra_animations[0][2]].y += y
    }
    else {
        let x = 5 * this.directionMoveValue(this.extra_animations[0][2], this.extra_animations[0][1], true)
        let y = 5 * this.directionMoveValue(this.extra_animations[0][2], this.extra_animations[0][1], false)
        this.board_cards[this.extra_animations[0][2]].x += x
        this.board_cards[this.extra_animations[0][2]].y += y
        this.board_cards[this.extra_animations[0][1]] = -1;
        this.boardState.addValue(this.extra_animations[0][2], JSON.parse(JSON.stringify(this.boardState.getValue(this.extra_animations[0][1]))), this.boardState.getValue(this.extra_animations[0][1]).boardId)
        this.boardState.cleanValue(this.extra_animations[0][1])

        this._hpWindow.moveCard(this.board_cards, this.extra_animations[0][2]);
        if (this.extra_animations[0][3]) {
            this.set_devotion(this.turn, this.extra_animations[0][3])
        }
        this.resetExtraAnimation()
    }



}

//-----------------------------------------------------------------------------
// Function : directionMoveValue
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.directionMoveValue = function (initial, final, onX = true) {
    if (initial == final - 4 && !onX) {
        return -1
    } else if (initial == final + 4 && !onX) {
        return 1
    } else if (initial == final - 1 && onX) {
        return -1
    } else if (initial == final + 1 && onX) {
        return 1
    }
    return 0
}
//-----------------------------------------------------------------------------
// Function : resetInfoValues
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.resetInfoValues = function () {
    this.infoPositions = []
}

//-----------------------------------------------------------------------------
// Function : setValuesInfo
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.setValuesInfo = function (type, position) {
    this.infoPositions[position] = type
}
//-----------------------------------------------------------------------------
// Function : setValuesInfo
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createMoveAttackImages = function (type) {
    this.moveImages = new Sprite_MoveCard()
    this.addChild(this.moveImages)
    this.moveImages.opacity = 0
    this.attackImages = new Sprite_AttackCard()
    this.addChild(this.attackImages)
    this.attackImages.opacity = 0

}
//-----------------------------------------------------------------------------
// Function : updateShowInfoAction
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.updateShowInfoAction = function (position) {

    let imgPos = -1;
    if (position + 1 == this.board_place)
        imgPos = 2
    else if (position - 4 == this.board_place)
        imgPos = 1
    else if (position + 4 == this.board_place)
        imgPos = 3
    else if (position - 1 == this.board_place)
        imgPos = 0
    this.checkMovementAnimation(position, imgPos)
    this.checkAttackAnimation(position, imgPos)
    if (this.oldPosition != position)
        this.updateDescriptionOnTouch(position)

}
//-----------------------------------------------------------------------------
// Function : checkMovementAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.checkMovementAnimation = function (position, imgPos) {
    if (this.infoPositions[position] == "move") {
        if (imgPos != -1) {
            this.moveImages.opacity += 20
            this.moveImages.moveArrowAnimation()
            this.moveImages.rotateImage(imgPos)
            this.fixMoveImagesPosition(position, imgPos)
        } else {
            this.moveImages.opacity -= 20
        }
    } else {
        this.moveImages.opacity -= 20
        if (this.moveImages.opacity > 0)
            this.moveImages.moveArrowAnimation()
    }
};

//-----------------------------------------------------------------------------
// Function : checkAttackAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.checkAttackAnimation = function (position, imgPos) {
    if (this.infoPositions[position] == "attack") {
        if (imgPos != -1) {
            this.attackImages.opacity += 20
            this.attackImages.moveArrowAnimation()
            this.attackImages.rotateImage(imgPos)
            this.fixAttackImagesPosition(position, imgPos)
        } else {
            this.attackImages.opacity -= 20
        }
    } else {
        this.attackImages.opacity -= 20
        if (this.attackImages.opacity > 0)
            this.attackImages.moveArrowAnimation()
    }
};


//-----------------------------------------------------------------------------
// Function : fixMoveImagesPosition
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.fixMoveImagesPosition = function (position, imgPos) {
    let xPos = this.board_map[position % 4][parseInt(position / 4)][0];
    let yPos = this.board_map[position % 4][parseInt(position / 4)][1]
    this.moveImages.x = xPos;
    this.moveImages.y = yPos;
    switch (imgPos) {
        case 0:
            this.moveImages.x -= 160
            break;
        case 1:
            this.moveImages.y -= 160
            break;
        case 2:
            this.moveImages.x += 160
            break;
        case 3:
            this.moveImages.y += 160
            break;

    }
}


//-----------------------------------------------------------------------------
// Function : fixAttackImagesPosition
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.fixAttackImagesPosition = function (position, imgPos) {
    let xPos = this.board_map[position % 4][parseInt(position / 4)][0];
    let yPos = this.board_map[position % 4][parseInt(position / 4)][1]
    this.attackImages.x = xPos;
    this.attackImages.y = yPos;
    switch (imgPos) {
        case 0:
            this.attackImages.x -= 160
            break;
        case 1:
            this.attackImages.y -= 160
            break;
        case 2:
            this.attackImages.x += 160
            break;
        case 3:
            this.attackImages.y += 160
            break;

    }
}

//-----------------------------------------------------------------------------
// Function : performEffectCard
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.performEffectCard = function () {
    let animation = this.extra_animations[0]
    if (this.animation_count_frames == 1) {
        this.show_big_card_extra_animation(animation[1]);
        this.effectText.x = 60
        this.effectText.y = 700
        this._center_sprite.x = 960
        this._center_sprite.y = 540
        //this._center_sprite.startAnimation($dataAnimations[132], false, 0);
    } else if (this._big_card_front.euler.y > 0) {
        this._big_card_front.euler.y -= 0.2
        if (this._big_card_front.euler.y <= 0) {
            this._big_card_front.euler.y = 0;
        }
        //this.resetExtraAnimation()
    } else if (this.effectText.x < 960) {
        this.effectText.x += (960 - this.effectText.x) / 10 + 1
        this.effectText.opacity += 10
        if (this.effectText.x >= 960) {
            AudioManager.playSe({ name: "Card_Swoosh", pan: 0, pitch: 100, volume: 80 });
            this.effectText.x = 960
        }
    } else if (this.effectText.opacity > 0) {
        this.specialCardCamera.y += (540 - this.effectText.y) / 8 + 1
        this.effectText.y -= (540 - this.effectText.y) / 8 + 1
        this.effectText.opacity -= 25
        this._big_card_front.opacity -= 25

    } else {
        this.effectText.opacity = 0
        this.callAfterEffects(animation)
        this.resetExtraAnimation()
        // SceneManager._scene.extra_animations[0] = ['Effect_Card', 2]
    }
}
//-----------------------------------------------------------------------------
// Function : callAfterEffects
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.callAfterEffects = function (animation) {
    let turn = this.turn
    switch (animation[2]) {
        case 115: // Anhanga
            this.applyAnhanga(this.turn)
            this.removeTopCardGraveyard(this.turn)
            break
        case 1: // Zeus
            this.apply_zeus(this.boardState);
            break
        case 2: // Amaterasu
            this.apply_amaterasu(this.boardState)
            break
        case 3: // Isis
            this.apply_isis(this.boardState)
            break
        case 7: // Hades
            this.apply_hades(turn)
            break;
        case 8: // Thor
            this.set_devotion(turn, 2)
            break
        case 22: // Serket
            this.cardDefinitions.addExtraSkillById(this.getCardIdByEffectId(animation[4]), 22)
            break;
        case 19: // Naiku
            this.player_proceed_draw_effect(turn, 1)
            break;
        case 24: // Kirin
            this.player_proceed_draw_effect(turn, 1)
            break;
        case 29: // Idun Tree
            this.apply_idunTree(turn)
            break
        case 74: // Boitata
            this.apply_boitata(turn)
            break
        case 30: // Apollo
            this.apply_apollo(turn)
            break
        case 31: // Hera
            if (this.getBoardPositionById(animation[4]) != -1) {
                this.equalize_positions(this._center_sprite, this.board_cards[this.getBoardPositionById(animation[4])])
                this._center_sprite.startAnimation($dataAnimations[146], false, 0, 1);
                this.set_hp(this.getBoardPositionById(animation[4]), -10)
            }
            break
        case 311: // Hera
            this.apply_hera(animation[1])
            break
        case 34: // Zeus Statue
            this.apply_zeus_statue(turn)
            break
        case 39: // Nachi Taisha
            this.cardDefinitions.addExtraSkillById(this.getCardIdByEffectId(animation[4]), 39)
            break;
        case 40: //Izumo Taisha
            this.player_proceed_discard_effect(turn, 1, 40)
            this.player_proceed_draw_effect(turn, 1)
            break;
        case 54: // Obelisk
            this.apply_obelisk(turn);
            break
        case 60: // Pharaoh's Plague
            this.changeHpAll(-10)
            this._center_sprite.x = 960
            this._center_sprite.y = 540
            this.sequence = fx.getEffectSequence('plague_sequence');
            this.sequence.init(this._center_sprite, true, 1);
            break
        case 65: // Toyatama
            let slot = this.getBoardPositionById(animation[4]);
            this.set_hp(slot, -10)
            this.board_light_slots[slot].startAnimation($dataAnimations[255], false, 0, 1);
            break
        case 66: // KuatIae
            this.applyKuat(turn)
            break
        case 68: // Iara
            this.cardDefinitions.addExtraSkillById(this.getCardIdByEffectId(animation[4]), 68)
            break;
        case 111: // Apophis
            this.set_hp(this.getBoardPositionById(animation[4]), -10)
            break
        case 25: // Ryujin
            this.apply_ryujin()
            break
        case 20: //Horus
            this.apply_horus(animation[1])
            break;
        case 21: // Sekhmet
            this.apply_sekhmet(animation[1])
            break;
        case 27: // Freyja
            this.apply_freyja()
            break
        case 73: //Cuca
            this.player_proceed_draw(turn, 1)
            this.player_proceed_discard(turn, 1, 73)
            break
        case 31: //Hera
            this.apply_hera(animation[1])
            break
        case 35: //Raijin
            this.apply_raijin(animation[1])
            break
        case 36: // Fujin
            this.apply_fujin(animation[4])
            break
        case 37: //Anubis
            if (this.turn == 0) {
                this.flashingAreaGraveyardCreatureAnubis(animation[1])
                this.loadActionAnimation("cast")
                this.phase = 11
                this.count_frames = 0
            } else {
                this.cardDefinitions.addExtraSkillById(animation[1], 37);
            }
            break
        case 41: // Urd
            this.apply_urd()
            break
        case 47: // Suzano
            this.apply_suzano(animation[1])
            break
        case 48: // Osiris
            this.cardDefinitions.addExtraSkillById(animation[1], 48);
            break
        case 61: // Ares
            this.cardDefinitions.addExtraSkillById(animation[1], 61);
            break
        case 72: // Boto
            this.apply_boto(animation[1])
            break;
        case 44: // Great Desert
            this.set_devotion(turn == 0 ? 1 : 0, -10, true)
            if (turn == 0) {
                this.equalize_positions(this._center_sprite2, this._devotion_player2)
            } else {
                this.equalize_positions(this._center_sprite2, this._devotion_player1)
            }
            this._center_sprite2.x += 100
            this._center_sprite2.y += 40
            this._center_sprite2.startAnimation($dataAnimations[281], false, 0, 1);
            break;
    }
}
//-----------------------------------------------------------------------------
// Function : sendCardGraveyardBigAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.sendCardGraveyardBigAnimation = function () {
    this._big_card_front.opacity = 0
    let card = this.extra_animations[0][1]
    card.x += (this.extra_animations[0][3] - card.x) / 10
    card.y += (this.extra_animations[0][4] - card.y) / 10
    card.rotation += (this.extra_animations[0][2] - card.rotation) / 10
    if (card.scale.x > 0.4) {
        card.scale.x -= 0.02
        card.scale.y -= 0.02
        if (card.scale.x < 0.4) {
            card.scale.x = 0.4
            card.scale.y = 0.4
        }
    }
    card.opacity += 8
    if (this.animation_count_frames > 30) { this.resetExtraAnimation() }
}
//-----------------------------------------------------------------------------
// Function : sendCardGraveyardAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.sendCardGraveyardAnimation = function () {
    //return
    let boardPlace = this.extra_animations[0][1]
    let id = this.extra_animations[0][3]

    if (this.animation_count_frames == 1) {
        var cardName = this.cardDefinitions.getCardAttribute(id, "Image_Big");
        this.createTempCard(cardName, boardPlace)
        let animation = $dataAnimations[235];
        this.board_light_slots[this.extra_animations[0][1]].startAnimation(animation, false, 0);
        this.extra_animations[0][4] = Math.random() * Math.PI - Math.PI / 2
        this.extra_animations[0][5] = Math.randomInt(50) - 25
        this.extra_animations[0][6] = Math.randomInt(50) - 25
    }
    if (this.board_cards[boardPlace].opacity > 0) {
        this.board_cards[boardPlace].opacity -= 10
    } else if (this.tempSprite.opacity < 255 && this.tempSprite.euler.y == 0) {
        this.tempSprite.opacity += 10
    } else if (this.animation_count_frames > 75) {
        if (this.tempSprite.euler.y < Math.PI / 2) {
            this.tempSprite.euler.y += 0.15
            this.tempSprite.scale.x = this.tempSprite.scale.y += 0.01
            if (this.tempSprite.euler.y >= Math.PI / 2) {
                this.tempSprite.euler.y = Math.PI / 2
                this.tempSprite.configureGod("Back_Card");
            }
        } else if (this.tempSprite.euler.y < Math.PI) {
            this.tempSprite.euler.y += 0.15
            if (this.tempSprite.euler.y >= Math.PI) {
                this.tempSprite.euler.y = Math.PI
            }

        } else if (this.tempSprite.euler.y < Math.PI * 3 / 2) {
            this.tempSprite.euler.y += 0.15
            if (this.tempSprite.euler.y >= Math.PI * 3 / 2) {
                this.tempSprite.euler.y = Math.PI * 3 / 2
                this.tempSprite.configureGod(this.cardDefinitions.getCardAttribute(id, "Image_Big"), id);
            }

        } else if (this.tempSprite.euler.y < Math.PI * 2) {
            this.tempSprite.euler.y += 0.15
            this.tempSprite.scale.x = this.tempSprite.scale.y -= 0.01
            if (this.tempSprite.euler.y >= Math.PI * 2) {
                this.tempSprite.euler.y = Math.PI * 2
            }

        }
        else {
            //this.tempSprite.bitmap = ImageManager.loadKamigami("");
            this.cameraDestroy.removeChild(this.tempSprite)
            this.tempSprite.destroy()
            this.sendCardGraveyard(this.extra_animations[0][2], id, this.extra_animations[0][4], this.cameraDestroy.x, this.cameraDestroy.y);
            this.resetExtraAnimation()
            return
        }

        if (this.extra_animations[0][2] == 0) {
            this.cameraDestroy.x += (this._gyplayer1.x - this.cameraDestroy.x + 140 + this.extra_animations[0][5]) / 14
            this.cameraDestroy.y += (this._gyplayer1.y - this.cameraDestroy.y + 140 + this.extra_animations[0][6]) / 14

        } else {
            this.cameraDestroy.x += (this._gyplayer2.x - this.cameraDestroy.x + 140 + this.extra_animations[0][5]) / 14
            this.cameraDestroy.y += (this._gyplayer2.y - this.cameraDestroy.y + 140 + this.extra_animations[0][6]) / 14
        }
        this.tempSprite.rotation += (this.extra_animations[0][4] - this.tempSprite.rotation) / 14
    }
}


//-----------------------------------------------------------------------------
// Function : sendCardGraveyardAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createTempCard = function (card_name, id) {
    this.tempSprite = new SpriteStaticGod()
    this.tempSprite.configureGod(card_name, id);
    this.tempSprite.convertTo3d()
    //this.tempSprite.convertSubtreeTo3d();
    this.cameraDestroy.addChild(this.tempSprite)
    this.tempSprite.scale.x = this.tempSprite.scale.y = 0.4
    this.tempSprite.anchor.x = this.tempSprite.anchor.y = 0.5
    this.cameraDestroy.x = this.board_light_slots[id].x
    this.cameraDestroy.y = this.board_light_slots[id].y
    this.tempSprite.opacity = 0
}




//-----------------------------------------------------------------------------
// Function : returnGraveyardAnimation 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.returnGraveyardAnimation = function () {
    for (var n = 0; n < this.player1_graveyard_show.length; n++) {
        if (this.extra_animations[0][2].includes(n))
            this.player1_graveyard_show[n][1].opacity = 0
        else
            this.player1_graveyard_show[n][1].opacity += 10
        this.player1_graveyard_show[n][1].x += (this.player1_graveyard_show[n][3] - this.player1_graveyard_show[n][1].x) / 10
        this.player1_graveyard_show[n][1].y += (this.player1_graveyard_show[n][4] - this.player1_graveyard_show[n][1].y) / 10
        this.player1_graveyard_show[n][1].rotation += (this.player1_graveyard_show[n][2] - this.player1_graveyard_show[n][1].rotation) / 10
        this.player1_graveyard_show[n][1].scale.x = this.player1_graveyard_show[n][1].scale.y -= 0.02
        if (this.player1_graveyard_show[n][1].scale.x <= 0.4) {
            this.player1_graveyard_show[n][1].scale.y = this.player1_graveyard_show[n][1].scale.x = 0.4
        }
    }
    if (this.animation_count_frames > 30) {
        this.resetExtraAnimation()
    }
}


//-----------------------------------------------------------------------------
// Function : exileCardAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.exileCardAnimation = function () {
    let id = this.extra_animations[0][2]
    if (this.animation_count_frames == 1) {
        this._big_card_front.opacity = 0
        this.tempSprite = new Sprite_Card()
        this.tempSprite.anchor.x = this.tempSprite.anchor.y = 0.5
        this.addChild(this.tempSprite)
        if (this.extra_animations[0][1] == 0) {
            this.tempSprite.bitmap = this._cards_player_1[id].bitmap
            this.setCardAttributes(this.tempSprite, this._cards_player_1[id])
            this.tempSprite.opacity = 255
            var animation = $dataAnimations[233]
            this.tempSprite.startAnimation(animation, false, 0)
            this._cards_player_1[id].destroy()
            this.removeChild(this._cards_player_1[id])
            this._cards_player_1.splice(id, 1);
            this.player_hand.splice(id, 1);
        } else {
            if (id > this._cards_player_2.length) {
                this.resetExtraAnimation()
                return;
            }
            this.tempSprite.bitmap = ImageManager.loadKamigami("Back_Card")
            this.setCardAttributes(this.tempSprite, this._cards_player_2[id])
            this.tempSprite.opacity = 255
            this._cards_player_2[id].destroy()
            this.removeChild(this._cards_player_2[id])
            this._cards_player_2.splice(id, 1);
            this.npc_hand.splice(id, 1);
        }
    }
    if (this.extra_animations[0][1] == 1 && this.tempSprite.y < 540) {
        this.tempSprite.y += (540 - this.tempSprite.y) / 10 + 2
        this.tempSprite.x += (960 - this.tempSprite.x) / 10 + 2
        this.tempSprite.rotation += (Math.PI - this.tempSprite.rotation) / 10
        if (this.tempSprite.y >= 540) {
            var animation = $dataAnimations[233]
            this.tempSprite.startAnimation(animation, false, 0)
        }
        return
    }
    this.tempSprite.opacity -= 10
    this.tempSprite.scale.x = this.tempSprite.scale.y -= 0.015
    if (this.tempSprite.scale.x <= 0) {
        this.tempSprite.bitmap = ""
        let boardPos = this.extra_animations[0][3]
        if (boardPos != -1) {
            if (this.boardState.hasCard(boardPos)) {
                this.boardState.getValue(boardPos).addDevotion += 1
                this._hpWindow.write_hp(this.board_cards)
            }
        } else {
            this.set_devotion(this.turn, 4, false, 207)
        }
        this.removeChild(this.tempSprite)
        this.resetExtraAnimation()
    }
}

// SPECIAL EFFECTS

//-----------------------------------------------------------------------------
// Function : performLokiEffect
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.performLokiEffect = function () {
    let animation = this.extra_animations[0]
    if (this.board_cards[animation[1]].opacity > 180) {
        this.board_cards[animation[1]].opacity -= 2
        this.board_cards[animation[2]].opacity -= 2
    }
    if (this.animation_count_frames % 2 == 0) {
        this.board_cards[animation[1]].x += this.animation_count_frames * 2
        this.board_cards[animation[2]].x += this.animation_count_frames * 2
    } else {
        this.board_cards[animation[1]].x -= this.animation_count_frames * 2
        this.board_cards[animation[2]].x -= this.animation_count_frames * 2
    }
    if (this.animation_count_frames == 40) {
        let anim = $dataAnimations[40];
        this._center_sprite.x = 960
        this._center_sprite.y = 540
        this._center_sprite.startAnimation(anim, false, 0);
    }
    if (this.animation_count_frames >= 50) {
        this.board_cards[animation[1]].x -= this.animation_count_frames
        this.board_cards[animation[2]].x -= this.animation_count_frames
        this.board_cards[animation[1]].opacity = this.board_cards[animation[2]].opacity = 255
        this.setLokiSwap(animation[1], animation[2])
        this.resetExtraAnimation()
    }
}
//-----------------------------------------------------------------------------
// Function : performLokiEffect
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.setLokiSwap = function (target1, target2) {
    var tmp = this.boardState.getValue(target1)
    var tmpImg = this.board_cards[target1]
    var tmpx = this.board_cards[target2].x
    var tmpy = this.board_cards[target2].y
    this.boardState.addValue(target1, this.boardState.getValue(target2), this.boardState.getValue(target2).boardId)
    this.boardState.addValue(target2, tmp, tmp.boardId)
    this.board_cards[target1] = this.board_cards[target2]
    this.board_cards[target2] = tmpImg
    this.board_cards[target1].x = this.board_cards[target2].x
    this.board_cards[target1].y = this.board_cards[target2].y
    this.board_cards[target2].x = tmpx
    this.board_cards[target2].y = tmpy
    this._hpWindow.moveCard(this.board_cards, target1);
    this._hpWindow.moveCard(this.board_cards, target2);
    this._hpWindow.write_hp(this.board_cards)
}

//-----------------------------------------------------------------------------
// Function : setCardAttributes
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.setCardAttributes = function (card1, card2) {
    card1.x = card2.x
    card1.y = card2.y
    card1.scale.x = card2.scale.x
    card1.scale.y = card2.scale.y
    card1.rotation = card2.rotation
    card1.opacity = card2.opacity
}

//-----------------------------------------------------------------------------
// Function : exileGraveyardAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.exileGraveyardAnimation = function () {
    let animation = this.extra_animations[0]
    this.phase = 4
    if (this.extra_animations[0][1] == 0) {
        if (this.player1_graveyard.length == 0) {
            this.resetExtraAnimation()
            return
        }
        var cardSprite = this.player1_graveyard[this.player1_graveyard.length - 1][1]
    }
    else {
        if (this.player2_graveyard.length == 0) {
            this.resetExtraAnimation()
            return
        }
        var cardSprite = this.player2_graveyard[this.player2_graveyard.length - 1][1]
    }
    if (this.animation_count_frames == 1) {
        var an = $dataAnimations[230];
        this._center_sprite.x = cardSprite.x
        this._center_sprite.y = cardSprite.y
        this._center_sprite.startAnimation(an, false, 0);
    }
    if (cardSprite.scale.x > 0) {
        cardSprite.scale.x -= 0.02
        cardSprite.scale.y -= 0.02
    }
    cardSprite.opacity -= 10
    if (cardSprite.opacity == 0) {
        cardSprite.bitmap = ""
        cardSprite.destroy()
        if (this.extra_animations[0][1] == 0) {
            this.player1_graveyard.pop()
        }
        else {
            this.player2_graveyard.pop()
        }
        this.resetExtraAnimation()
    }

}

//-----------------------------------------------------------------------------
// Function : playDevotionAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.playDevotionAnimation = function (player, animationId) {
    var animation = $dataAnimations[animationId];
    if (player == 0)
        this.equalize_positions(this._center_sprite2, this._devotion_player1)
    else
        this.equalize_positions(this._center_sprite2, this._devotion_player2)
    this._center_sprite2.x += this._devotion_player1.width / 2
    this._center_sprite2.y += this._devotion_player1.height / 2
    this._center_sprite2.startAnimation(animation, false, 0);
};

//-----------------------------------------------------------------------------
// Function : playDevotionAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.showDevotionAnimation = function (player, quantity) {
    if (quantity == 0) { return }
    let pos = this.parallelDevotionAnimations.length;
    this.parallelDevotionAnimations.push({ image: null, player: player, quantity: quantity, time: 0 })
    this.parallelDevotionAnimations[pos].image = new Sprite();
    this.parallelDevotionAnimations[pos].image.bitmap = new Bitmap(200, 80);
    this.parallelDevotionAnimations[pos].image.bitmap.fontSize = 64;
    this.parallelDevotionAnimations[pos].image.bitmap.outlineWidth = 0;
    this.addChild(this.parallelDevotionAnimations[pos].image);
    this.parallelDevotionAnimations[pos].image.opacity = 50;
    if (quantity > 0) {
        this.parallelDevotionAnimations[pos].image.bitmap.textColor = "#0FFF73";
        this.parallelDevotionAnimations[pos].image.bitmap.drawText("+".concat(quantity), 0, 0, 200, 80, 'left');
    } else if (quantity < 0) {
        this.parallelDevotionAnimations[pos].image.bitmap.textColor = "#FF0026";
        this.parallelDevotionAnimations[pos].image.bitmap.drawText(quantity, 0, 0, 200, 80, 'left');
    }
    if (player == 0) {
        this.parallelDevotionAnimations[pos].image.x = SceneManager._scene._devotion_player1.x + 140;
        this.parallelDevotionAnimations[pos].image.y = SceneManager._scene._devotion_player1.y + 10;

    } else {
        this.parallelDevotionAnimations[pos].image.x = SceneManager._scene._devotion_player2.x + 140;
        this.parallelDevotionAnimations[pos].image.y = SceneManager._scene._devotion_player2.y + 10;
    }
};

//-----------------------------------------------------------------------------
// Function : executeParallelAnimations
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.executeParallelAnimations = function () {
    if (this.parallelDevotionAnimations.length > 0) {
        this.playDevotionValues();
    }
};
//-----------------------------------------------------------------------------
// Function : executeParallelAnimations
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.playDevotionValues = function () {
    for (let devImg of this.parallelDevotionAnimations) {
        devImg.time += 1;
        if (devImg.time < 25)
            devImg.image.opacity += 8;
        if (devImg.time > 25) {
            devImg.image.opacity -= 10;
            if (devImg.quantity > 0)
                devImg.image.y -= (devImg.time - 25);
            else
                devImg.image.y += (devImg.time - 25);
            if (devImg.image.opacity == 0) {
                this.removeChild(this.parallelDevotionAnimations[0].image);
                this.parallelDevotionAnimations.shift();
            }
        }
    }
}


//-----------------------------------------------------------------------------
// Function : playCardAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.playCardAnimation = function (effectId, target) {
    let animation
    switch (effectId) {
        case 20: // Horus
            animation = $dataAnimations[2];
            this.equalize_positions(this._center_sprite, this.board_cards[target])
            this._center_sprite.startAnimation(animation, false, 0);
            break;
        case 21: // Sekhmet
            animation = $dataAnimations[59];
            this.equalize_positions(this._center_sprite, this.board_cards[target])
            this._center_sprite.startAnimation(animation, false, 0);
            break;
        case 22: //Serket
            animation = $dataAnimations[59];
            this.equalize_positions(this._center_sprite, this.board_cards[target])
            this._center_sprite.startAnimation(animation, false, 0);
            break;
        case 31: // Hera
            animation = $dataAnimations[146];
            this.equalize_positions(this._center_sprite, this.board_cards[target])
            this._center_sprite.startAnimation(animation, false, 0, 1);
            break;
        case 35: //Raijin
            animation = $dataAnimations[2];
            this.equalize_positions(this._center_sprite, this.board_cards[target])
            this._center_sprite.startAnimation(animation, false, 0);
            break;
        case 39: //Raijin
            animation = $dataAnimations[2];
            this.equalize_positions(this._center_sprite, this.board_cards[target])
            this._center_sprite.startAnimation(animation, false, 0);
            break
        case 64: // Heimdall
            animation = $dataAnimations[2];
            this.equalize_positions(this._center_sprite, this.board_cards[target])
            this._center_sprite.startAnimation(animation, false, 0);
            break
        case 48: // Osiris
            animation = $dataAnimations[2];
            this.equalize_positions(this._center_sprite, this.board_cards[target])
            this._center_sprite.startAnimation(animation, false, 0);
            break;
        case 61: //Ares
            animation = $dataAnimations[2];
            this.equalize_positions(this._center_sprite, this.board_cards[target])
            this._center_sprite.startAnimation(animation, false, 0);
            break;
        case 68: // Iara
            animation = $dataAnimations[256];
            this.equalize_positions(this._center_sprite, this.board_cards[target])
            this._center_sprite.startAnimation(animation, false, 0);
            break
        case 72: //Boto
            animation = $dataAnimations[250];
            this.equalize_positions(this._center_sprite, this.board_cards[target])
            this._center_sprite.startAnimation(animation, false, 0);
            break;
        case 101: // Medusa
            animation = $dataAnimations[269];
            this.equalize_positions(this._center_sprite, this.board_cards[target])
            this._center_sprite.startAnimation(animation, false, 0, 1);
            break;
        case 102: // Artemis
            animation = $dataAnimations[29];
            this.equalize_positions(this._center_sprite, this.board_cards[target])
            this._center_sprite.startAnimation(animation, false, 0);
            break;
        case 104: // Idun
            animation = $dataAnimations[42];
            this.equalize_positions(this._center_sprite, this.board_cards[target])
            this._center_sprite.startAnimation(animation, false, 0);
            break
        case 116: // Ceuci
            animation = $dataAnimations[42];
            this.equalize_positions(this._center_sprite, this.board_cards[target])
            this._center_sprite.startAnimation(animation, false, 0);
            break
        case 105: //Yuki Onna
            animation = $dataAnimations[283];
            for (n = 0; n < 16; n++) {
                this.board_light_slots[n].startAnimation(animation, false, n * 3, 1);
            }
            break
        case 108: // Chimera
            animation = $dataAnimations[234];
            let newTarget = target
            while (newTarget % 4 != 0) {
                newTarget -= 1;
            }
            for (n = newTarget; n < newTarget + 4; n++) {
                if (n != target)
                    this.board_light_slots[n].startAnimation(animation, false, n * 8 - newTarget * 8 + 8, 2);
                else
                    this.board_light_slots[n].startAnimation($dataAnimations[230], false, 0, 2);
            }

            break
            break
        case 111: // Apophis
            animation = $dataAnimations[198];
            this.equalize_positions(this._center_sprite, this.board_cards[target])
            this._center_sprite.startAnimation(animation, false, 0, 1);
            break
        case 112: // Hel
            animation = $dataAnimations[271];
            this.equalize_positions(this._center_sprite, this.board_cards[target])
            this._center_sprite.startAnimation(animation, false, 0, 1);
            break
        case 114: // Odin
            animation = $dataAnimations[210];
            this.equalize_positions(this._center_sprite, this.board_cards[target])
            this._center_sprite.startAnimation(animation, false, 0, 1);
            break

        case 201: // Zeus' Bolt
            animation = $dataAnimations[220];
            this.board_light_slots[target].startAnimation(animation, false, 0, 1);
            break
        case 202: // Eclipse
            animation = $dataAnimations[228];
            this.board_light_slots[target].startAnimation(animation, false, 0, 1);
            break
        case 208: // Soul Extraction
            animation = $dataAnimations[56];
            if (this.turn == 1) {
                this._center_sprite.x = this._devotion_player1.x + 100
                this._center_sprite.y = this._devotion_player1.y + 40
            } else {
                this._center_sprite.x = this._devotion_player2.x + 100
                this._center_sprite.y = this._devotion_player2.y + 40
            }

            this._center_sprite.startAnimation(animation, false, 0);
            break
        case 209: // Calamity
            animation = $dataAnimations[225];
            this.board_light_slots[target].startAnimation(animation, false, 0);
            break
        case 212: // Idun's Apple
            animation = $dataAnimations[193];
            this.board_light_slots[target].startAnimation(animation, false, 0);
            break
        case 219: // Call to Arms
            animation = $dataAnimations[53];
            this.board_light_slots[target].startAnimation(animation, false, 0);
            break
        case 224: // Artemis Arrow
            animation = $dataAnimations[29];
            this.board_light_slots[target].startAnimation(animation, false, 0);
            break
        case 223: // Giant's Throw
            animation = $dataAnimations[282];
            this.board_light_slots[target].startAnimation(animation, false, 0, 1);
            if (target - 4 >= 0)
                this.board_light_slots[target - 4].startAnimation(animation, false, 3, 1);
            if (target + 4 <= 15)
                this.board_light_slots[target + 4].startAnimation(animation, false, 9, 1);
            if (target % 4 > 0)
                this.board_light_slots[target - 1].startAnimation(animation, false, 6, 1);
            if (target % 4 < 3)
                this.board_light_slots[target + 1].startAnimation(animation, false, 12, 1);
            break
        case 221: // Turn To Dust
            animation = $dataAnimations[217];
            this.board_light_slots[target].startAnimation(animation, false, 0);
            break
        case 206: // Mjolnir's Storm
            animation = $dataAnimations[242];
            for (n = 0; n < 4; n++) {
                if (target + n * 4 > 15) {
                    target -= 16
                }
                this.board_light_slots[target + n * 4].startAnimation(animation, false, target + n * 4, 2);
            }
            break
        case 226: // Ragnarok
            this._center_sprite.x = 960
            this._center_sprite.y = 540
            animation = $dataAnimations[120];
            this._center_sprite.startAnimation(animation, false, 0);
            break
        case 207: // Decimation
            this._center_sprite.x = 960
            this._center_sprite.y = 540
            animation = $dataAnimations[109];
            this._center_sprite.startAnimation(animation, false, 0);
            break
        case 210: // Earthquake
            animation = $dataAnimations[280];
            for (n = 0; n < 16; n++) {
                this.board_light_slots[n].startAnimation(animation, false, n * 3, 1);
            }

            break
        case 217: // Seaquake
            animation = $dataAnimations[253];
            for (n = 0; n < 16; n++) {
                this.board_light_slots[n].startAnimation(animation, false, n * 3, 1);
            }

            break
        case 218: // Armageddon
            animation = $dataAnimations[268];
            for (n = 0; n < 16; n++) {
                this.board_light_slots[n].startAnimation(animation, false, n * 3, 1);
            }

            break
        case 222: // Time Reflow
            this._center_sprite.x = 960
            this._center_sprite.y = 540
            animation = $dataAnimations[44];
            this._center_sprite.startAnimation(animation, false, 0);
            break
        case 225: // Heimdall's Warning
            animation = $dataAnimations[51];
            let delayCount = 0
            for (n = 0; n < 16; n++) {
                if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == this.turn && this.boardState.getValue(n).specialType == 2 && this.boardState.getValue(n).cardType != 3) {
                    this.board_light_slots[n].startAnimation(animation, false, delayCount * 4, 2);
                    delayCount++;
                }
            }
            break
        case 227: // For The Gods
            animation = $dataAnimations[284];
            let delayCount2 = 0;
            for (n = 0; n < 16; n++) {
                if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == this.turn && this.boardState.getValue(n).cardType == 1) {
                    this.board_light_slots[n].startAnimation(animation, false, delayCount2 * 4, 2);
                    delayCount2++;
                }
            }
            break
        case 220: // Loki's Trick
            this._center_sprite.x = 960
            this._center_sprite.y = 540
            animation = $dataAnimations[63];
            this._center_sprite.startAnimation(animation, false, 0);
            break
    }
}

