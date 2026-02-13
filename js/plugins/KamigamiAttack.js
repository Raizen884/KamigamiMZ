//-----------------------------------------------------------------------------
// Triple Triad Image Handler
//
// The scene class of the battle screen.

ImageManager.loadExtrasKamigami = function (filename, hue) {
    return this.loadBitmap('img/kami_attack/', filename, hue, true);
};

//-----------------------------------------------------------------------------
// Function : create_attack_pics
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.create_attack_pics = function () {
    // Test methods ERASE LATER
    this.create_3d_planes();
    this.attack_create_big_cards();
    this.attack_create_displacement();
    this.attack_create_displacement2();
    this.attack_create_gods();
    this.create_fake_center2();
    this.reset_all_pics_positions();
};
//-----------------------------------------------------------------------------
// Function : create_fake_center2
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.reset_all_pics_positions = function () {
    this.attack_god1.y = 740;
    this.attack_god1.x = 560;
    this.attack_god1.scale.x = 0.5;
    this.attack_god1.anchor.x = 0.5;
    this.attack_god1.anchor.y = 1;
    this.attack_god1.scale.y = 0.5;
    this.attack_god1.opacity = 0;
    this.attack_god2.y = 740;
    this.attack_god2.x = 1320;
    this.attack_god2.anchor.x = 0.5;
    this.attack_god2.anchor.y = 1;
    this.attack_god2.scale.x = -0.5;
    this.attack_god2.scale.y = 0.5;
    this.attack_god2.opacity = 0;
    this.turn == 0 ? this.attack_card1.x = 1300 : this.attack_card1.x = -1300;
    this.attack_card1.opacity = 255;
    this.attack_card1_flash.anchor.x = this.attack_card1.anchor.x = 0.5;
    this.attack_card1_flash.anchor.y = this.attack_card1.anchor.y = 0.8;

    this.attack_card2.anchor.x = 0.5;
    this.attack_card2.anchor.y = 0.8;
    this.attack_card2.x = 1300;
};
//-----------------------------------------------------------------------------
// Function : create_fake_center2
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.create_fake_center2 = function () {
    this._center_sprite2 = new Sprite_Card();
    this._center_sprite2.bitmap = ImageManager.loadTitle1("center_effects");
    this.addChild(this._center_sprite2);
    this._center_sprite2.x = Graphics.width / 2;
    this._center_sprite2.y = Graphics.width / 2;
    this._center_sprite2.anchor.x = 0.5;
    this._center_sprite2.anchor.y = 0.5;

};
//-----------------------------------------------------------------------------
// Function : create_displacement
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.attack_create_displacement = function () {
    this.containerAttack = new PIXI.Container();
    this.addChild(this.containerAttack);
    this._displacement = new Sprite();
    this._displacement.bitmap = ImageManager.loadDisplacement("map14");
    this._displacement.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this._displacement.scale.set(2);
    this._displacement.anchor.set(0.5);
    this.containerAttack.addChild(this._displacement);
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this._displacement);
    this.containerAttack.filters = [this.displacementFilter];
    this.displacementFilter.scale.x = 0;
    this.displacementFilter.scale.y = 0;
    this.tl = new TimelineMax({ paused: true });
    this.tl.to(this.displacementFilter.scale, 8, { x: 0, y: 10000, ease: Expo.easeInOut });
    //this.tl.to(this.camera, 0, { autoAlpha: 1, ease: Expo.easeInOut }, "+=1");
    this.tl.timeScale(5);
    this.tl.play();

};
//-----------------------------------------------------------------------------
// Function : create_displacement
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.attack_create_displacement2 = function () {
    this.containerAttack2 = new PIXI.Container();
    this.addChild(this.containerAttack2);
    this._displacement2 = new Sprite();
    this._displacement2.bitmap = ImageManager.loadDisplacement("map8");
    this._displacement2.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this._displacement2.scale.set(2);
    this._displacement2.anchor.set(0.5);
    this.containerAttack2.addChild(this._displacement2);
    this.displacementFilter2 = new PIXI.filters.DisplacementFilter(this._displacement2);
    this.containerAttack2.filters = [this.displacementFilter2];
    this.displacementFilter2.scale.x = 0;
    this.displacementFilter2.scale.y = 0;
    this.tl2 = new TimelineMax({ paused: true });
    this.tl2.to(this.displacementFilter2.scale, 8, { x: 0, y: 10000, ease: Expo.easeInOut });
    //this.tl.to(this.camera, 0, { autoAlpha: 1, ease: Expo.easeInOut }, "+=1");
    this.tl2.timeScale(5);
    this.tl2.play();
};
//-----------------------------------------------------------------------------
// Function : attack_create_gods
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.attack_create_gods = function () {
    this.attack_god1 = new Sprite_Card();
    this.attack_god1.bitmap = ImageManager.loadFace("Yuki Onna")
    this.containerAttack.addChild(this.attack_god1);

    this.attack_god2 = new Sprite_Card();
    this.attack_god2.bitmap = ImageManager.loadFace("Yuki Onna")
    this.containerAttack2.addChild(this.attack_god2);

};
//-----------------------------------------------------------------------------
// Function : attack_create_big_cards
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.attack_create_big_cards = function () {
    this.attack_card1_name = "big_zeus";
    this.attack_card1 = new SpriteGod();
    this.camera.addChild(this.attack_card1);
    this.attack_card1.convertTo3d();
    this.attack_card2 = new SpriteGod();
    this.camera.addChild(this.attack_card2);
    this.attack_card2.convertTo3d();


    this.attack_card1_flash = new Sprite_Card();
    this.attack_card1_flash.bitmap = ImageManager.loadKamigami("flash_card")
    this.camera.addChild(this.attack_card1_flash);
    this.attack_card1_flash.opacity = 0;

    this.attack_card1_mini_flash = new Sprite_Card();
    this.attack_card1_mini_flash.bitmap = ImageManager.loadKamigami("flash_mini")
    this.camera.addChild(this.attack_card1_mini_flash);
    this.attack_card1_mini_flash.opacity = 0;
    //this.attack_card1.euler.x = Math.PI / 5.5;
};

//-----------------------------------------------------------------------------
// Function : create_3d_planes
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.create_3d_planes = function () {
    this.camera = new PIXI.projection.Camera3d();
    this.camera.position.set(Graphics.width / 2, Graphics.height / 2);
    this.camera.setPlanes(1400, 180, 10000, false);
    this.camera.y = 800;
    //this.camera.euler.x = Math.PI / 5.5;
    //this.camera.euler.y = 1;
    //this.camera.euler.x = 1;
    this.addChild(this.camera);
};
//-----------------------------------------------------------------------------
// Function : createBackground
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.test_back = function () {
    this._testbg = new Sprite_Card();
    this._testbg.bitmap = ImageManager.loadExtrasKamigami("test")
    this.addChild(this._testbg);
};

//-----------------------------------------------------------------------------
// Function : update_attack_phase
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.update_attack_phase = function () {
    switch (this.attack_phase) {
        case 0:
            this.attack_phase = 1
            break
        case 1:
            this.increase_fade_attack_opacity();
            break;
        //case 1:
        //this.perform_attack();
        //break;
        //case 2:
        //this.attack_get_position();
        //break;
        //case 3:
        //this.attack_rotate_cards();
        //break;
        //case 4:
        //this.perform_attack();
        //break;
        case 5:
            this.perform_special();
            break;
        case 6:
            this.perform_special_flip();
            break;
        case 7:
            this.perform_special_skill();
            break;
    }
    this.return_card_animation();
};
//-----------------------------------------------------------------------------
// Function : attack_clash_big_cards
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.increase_fade_attack_opacity = function () {
    this._fade_screen.opacity += 5;
    if (this.turn == 0) {
        this._fade_screen_2.opacity -= 20;
        this._big_card_front.euler.y -= 0.064;
        if (this._big_card_front.euler.y < 0) {
            this._big_card_front.euler.y = 0;
        }
        this.specialCardCamera.x += this.count_frames * 5;
        this.specialCardCamera.y += this.count_frames;
        this._big_card_front.scale.x -= 0.02;
        this._big_card_front.scale.y -= 0.02;
    }
    else {

        if (this.extra_animations[0][4] != -1 && this._cards_player_2.length > this.extra_animations[0][4]) {
            this._cards_player_2[this.extra_animations[0][4]].y -= this.count_frames * 2;
            this._cards_player_2[this.extra_animations[0][4]].x -= this.count_frames * 3;
        }
    }
    if (this._fade_screen.opacity >= 200) {
        if (this.turn == 1 && this.extra_animations[0][4] != -1 && this._cards_player_2.length > this.extra_animations[0][4])
            this._cards_player_2[this.extra_animations[0][4]].configureGod("")
        //
        //this._cards_player_2.splice(this.extra_animations[0][4], 1);
        this.reset_all_pics_positions();
        this.count_frames = 0;
        this.attack_phase = 5;
        if (this.cardDefinitions.getCardList()[this.extra_animations[0][2]]["cardType"] == 1)
            this.attack_god1.bitmap = ImageManager.loadFace(this.cardDefinitions.getCardList()[this.extra_animations[0][2]]["Name"]);
    }

};
//-----------------------------------------------------------------------------
// Function : attack_clash_big_cards
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.attack_clash_big_cards = function () {
    if (this.attack_card1.x < -300) {
        this.attack_card1.x += this.count_frames * 3;
        this.attack_card2.x -= this.count_frames * 3;
        if (this.attack_card1.x > -300) {
            this._center_sprite.y -= 100;
            var animation = $dataAnimations[173];
            this._center_sprite.startAnimation(animation, false, 0);
            this.attack_card1.x = -276;
            this.attack_card2.x = 276;
            this.attack_phase = 2;
            this.count_frames = 0;
        }
    }

};

//-----------------------------------------------------------------------------
// Function : attack_get_position
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.attack_get_position = function () {
    if (this.count_frames < 18) {

        this.attack_card1.x -= (18 - this.count_frames);
        this.attack_card2.x += (18 - this.count_frames);
    } else {
        this.attack_phase = 3;
        this.count_frames = 0;
    }
    if (this.count_frames == 10)
        this.tl.reverse();
};
//-----------------------------------------------------------------------------
// Function : attack_rotate_cards
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.attack_rotate_cards = function () {
    if (this.count_frames < 23) {
        this.camera.euler.x += 0.005 * (23 - this.count_frames);
    }

    if (this.count_frames == 20) {
        this.tl2.reverse();
    }

    if (this.count_frames > 23) {
        this.attack_god1.opacity += 5;

    }
    if (this.count_frames == 20) {
        var animation = $dataAnimations[35];
        this._center_sprite2.startAnimation(animation, false, 0);
        this._center_sprite2.x = 560;
        this._center_sprite2.y = 770;
    }
    if (this.count_frames > 63) {

        this.attack_god2.opacity += 5;
    }
    if (this.count_frames == 60) {
        var animation = $dataAnimations[35];
        this._center_sprite.startAnimation(animation, false, 0);
        this._center_sprite.x = 1360;
        this._center_sprite.y = 770;
    }
    if (this.count_frames == 120) {
        this.count_frames = 0;
        this.attack_phase = 4;
    }

};

//-----------------------------------------------------------------------------
// Function : perform_attack
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.perform_attack = function () {
    this.play_return_card_animation();
    if (this.count_frames == 1) {
        this.board_cards[this.extra_animations[0][2]].zOrder = 1;
        this.cardContainer.sortChildren();
        if (this.extra_animations[0][4]) {
            this.set_devotion(this.turn, -this.extra_animations[0][4])
        }
        let attackSE = "Card_hit_" + (Math.randomInt(2) + 1)
        AudioManager.playSe({ name: attackSE, pan: 0, pitch: 100, volume: 100 });
    }
    if (this.count_frames <= 5) {
        if (this.extra_animations[0][2] == this.extra_animations[0][3] - 1) {
            this.board_cards[this.extra_animations[0][2]].x -= this.count_frames * 5;
        } else if (this.extra_animations[0][2] == this.extra_animations[0][3] + 1) {
            this.board_cards[this.extra_animations[0][2]].x += this.count_frames * 5;
        } else if (this.extra_animations[0][2] == this.extra_animations[0][3] + 4) {
            this.board_cards[this.extra_animations[0][2]].y += this.count_frames * 5;
        } else if (this.extra_animations[0][2] == this.extra_animations[0][3] - 4) {
            this.board_cards[this.extra_animations[0][2]].y -= this.count_frames * 5;
        }
    }
    if (this.count_frames > 10 && this.count_frames <= 15) {
        if (this.extra_animations[0][2] == this.extra_animations[0][3] - 1) {
            this.board_cards[this.extra_animations[0][2]].x += (this.count_frames - 5) * 5;
        } else if (this.extra_animations[0][2] == this.extra_animations[0][3] + 1) {
            this.board_cards[this.extra_animations[0][2]].x -= (this.count_frames - 5) * 5;
        } else if (this.extra_animations[0][2] == this.extra_animations[0][3] + 4) {
            this.board_cards[this.extra_animations[0][2]].y -= (this.count_frames - 5) * 5;
        } else if (this.extra_animations[0][2] == this.extra_animations[0][3] - 4) {
            this.board_cards[this.extra_animations[0][2]].y += (this.count_frames - 5) * 5;
        }
    }
    if (this.count_frames == 16) {
        var animation = $dataAnimations[179];
        this.equalize_positions(this._center_sprite, this.board_cards[this.extra_animations[0][3]])
        this._center_sprite.startAnimation(animation, false, 0);
        this.set_hp(this.extra_animations[0][3], - this.cardDefinitions.apply_attack(this.boardState, this.extra_animations[0][2], this.turn), true, this.boardState.getValue(this.extra_animations[0][2]).cardId);
    }
    if (this.count_frames >= 16) {
        if (this.extra_animations[0][2] == this.extra_animations[0][3] - 1) {
            this.board_cards[this.extra_animations[0][2]].x -= (26 - this.count_frames) * 2.27;
        } else if (this.extra_animations[0][2] == this.extra_animations[0][3] + 1) {
            this.board_cards[this.extra_animations[0][2]].x += (26 - this.count_frames) * 2.27;
        } else if (this.extra_animations[0][2] == this.extra_animations[0][3] + 4) {
            this.board_cards[this.extra_animations[0][2]].y += (26 - this.count_frames) * 2.27;
        } else if (this.extra_animations[0][2] == this.extra_animations[0][3] - 4) {
            this.board_cards[this.extra_animations[0][2]].y -= (26 - this.count_frames) * 2.27;
        }
    }
    if (this.count_frames == 25) {
        this.board_cards[this.extra_animations[0][2]].zOrder = 0;
        this.board_cards[this.extra_animations[0][2]].x = this.board_map[this.extra_animations[0][2] % 4][parseInt(this.extra_animations[0][2] / 4)][0];
        this.board_cards[this.extra_animations[0][2]].y = this.board_map[this.extra_animations[0][2] % 4][parseInt(this.extra_animations[0][2] / 4)][1];
        this.resetExtraAnimation()
    }
};

//////////////////////////// PHASE 5 //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : perform_special
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.perform_special = function () {
    if (this.count_frames == 15) {
        AudioManager.playSe({name: "Invo_carta_girando", pan: 0, pitch: 100, volume: 100});
    }
    this.attack_card1.euler.y -= 0.112;
    if (this.attack_card1.euler.y < - Math.PI * 3 / 2) {
        this.attack_card1.euler.y += Math.PI * 2;
    }
    if (this.attack_card1.euler.y < - Math.PI / 2) {
        if (this.currentBitmap != "Back") {
            this.attack_card1.configureGod("Back_Card")
            this.currentBitmap = "Back"
        }

    } else {
        if (this.currentBitmap != "God") {
            this.attack_card1.configureGod(this.cardDefinitions.getCardList()[this.extra_animations[0][2]]["Image_Big"], this.extra_animations[0][2]);
            this.attack_card1.y = -200
            this.currentBitmap = "God"
        }
    }
    if (this.turn == 0) {
        if (this.attack_card1.x > -580) {
            if (this.attack_card1.x < 0)
                this.reverse_special = true;
            this.attack_card1.x -= (40 - this.count_frames) * 2;
        }
    } else {
        if (this.attack_card1.x < 280) {
            if (this.attack_card1.x > 200)
                this.reverse_special = true;
            this.attack_card1.x += (40 - this.count_frames) * 2;
        }
    }
    if (this.turn == 0) {
        if (this.reverse_special && this.attack_card1.x > 0) {
            this.attack_phase = 6;
            this.attack_card1.x = 0;
            this.attack_card2.opacity = 0;
            this.attack_card1.euler.y = 0;
            this.count_frames = 0;
            this.currentBitmap = ""
        }
    } else {
        if (this.reverse_special && this.attack_card1.x < 0) {
            this.attack_phase = 6;
            this.attack_card1.x = 0;
            this.attack_card2.opacity = 0;
            this.attack_card1.euler.y = 0;
            this.count_frames = 0;
            this.currentBitmap = ""
        }
    }

};
//////////////////////////// PHASE 6 //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : perform_special_flip
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.needs_special_animation = function () {
    return this.cardDefinitions.getCardList()[this.extra_animations[0][2]]["cardId"] < 120 && this.cardDefinitions.getCardList()[this.extra_animations[0][2]]["cardType"] == 1 && this.cardDefinitions.getCardList()[this.extra_animations[0][2]]["costDevotion"] > 15
};
//-----------------------------------------------------------------------------
// Function : perform_special_flip
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.perform_special_flip = function () {
    if (this.count_frames == 15) {
        this.attack_god1.x += 400;
        this.tl.reverse();
        
    }
    if (this.count_frames < 31)
        return;

    if (this.count_frames < 53 && this.needs_special_animation())
        this.camera.euler.x += 0.005 * (53 - this.count_frames);
    if (this.count_frames > 53 && this.needs_special_animation()) {
        this.attack_god1.opacity += 5;

    }

    if (this.count_frames == 55) {

        if (this.needs_special_animation()) {
            var animation = $dataAnimations[174];
            this._center_sprite2.x = 960;
            this._center_sprite2.y = 700;
            this._center_sprite2.startAnimation(animation, false, 0);
        } else {
            this.tl.play();
            this.count_frames = 200;
        }
    }
    if (this.count_frames >= 200 && this.count_frames < 220) {
        this.attack_card1_flash.opacity += 20;
        this.attack_card1_flash.x = this.attack_card1.x;
        this.attack_card1_flash.y = this.attack_card1.y + 204;
    }
    if (this.count_frames == 135) {
        this.tl.play();
    }
    if (this.count_frames == 220) {
        AudioManager.playSe({ name: "Invoc_carta_tabuleiro", pan: 0, pitch: 100, volume: 100 });
        this.emitter = fx.getParticleEmitter('Card-Explosion');
        this.emitter.init(this._center_sprite, true, 1);
        this._center_sprite.x = 960;
        this._center_sprite.y = 540;
        this.attack_card1_flash.opacity = 0;
        this.mini_cast_card = new Sprite_Card();
        //this.mini_cast_card.bitmap = ImageManager.loadKamigami(this.cardDefinitions.getCardList()[this.extra_animations[0][2]]["Image_Big"]);
        this.camera.addChild(this.mini_cast_card);
        this.mini_cast_card.convertTo3d();
        this.attack_card1_mini_flash.x = this.mini_cast_card.x = (this.board_map[this.extra_animations[0][3] % 4][parseInt(this.extra_animations[0][3] / 4)][0] - 960);
        this.attack_card1_mini_flash.y = this.mini_cast_card.y = (this.board_map[this.extra_animations[0][3] % 4][parseInt(this.extra_animations[0][3] / 4)][1] - 540 - 260);
        this.attack_card1_mini_flash.anchor.x = this.mini_cast_card.anchor.x = 0.5;
        this.attack_card1_mini_flash.anchor.y = this.mini_cast_card.anchor.y = 0.5;
        this.attack_card1_mini_flash.scale.x = this.mini_cast_card.scale.x = 1;
        this.attack_card1_mini_flash.scale.y = this.mini_cast_card.scale.y = 1;
        this.mini_cast_card.opacity = 0;
        this.attack_card1.opacity = 0;
    }
    if (this.count_frames == 210) {
        this.callPreMiracleAnimation()
    }
    if (this.count_frames >= 180 && this.count_frames < 203 && this.needs_special_animation())
        this.camera.euler.x += 0.005 * (180 - this.count_frames);
    if (this.cardDefinitions.getCardAttribute(this.extra_animations[0][2], "cardType") != 2) {
        if (this.count_frames == 270) {
            this.emitter2 = fx.getParticleEmitter('Card-Explosion-sub1');
            this.emitter2.init(this._center_sprite2, true, 1);
            this._center_sprite2.x = this.mini_cast_card.x + 960;
            this._center_sprite2.y = this.mini_cast_card.y + 800;
        }
        if (this.count_frames > 280 && this.count_frames < 295) {
            this.attack_card1_mini_flash.opacity += 20;
        }
        if (this.count_frames > 295 && this.count_frames < 310) {
            this.mini_cast_card.opacity += 20;
            this.attack_card1_mini_flash.opacity -= 20;
        }
        if (this.count_frames == 290) {
            this.displacementFilterShockBG.center = [this.mini_cast_card.x + 960, this.mini_cast_card.y + 720];
            this.displacementFilterShockBG.time = 0;
        }
    } else {
        if (this.count_frames == 270) {
            this.callMiracleAnimation()
        }
    }

    if (this.count_frames >= 310) {
        this.attack_god1.opacity -= 25;
        if (this.attack_god1.opacity == 0) {
            if (this.attack_card1.opacity <= 0) {
                this._fade_screen.opacity -= 20;
                if (this._fade_screen.opacity == 0) {
                    this.castConfirmation()
                    this.attack_phase = 0;
                    this.proceed_cast()
                    this.resetExtraAnimation()
                    this.attack_card1.scale.x = 1;
                    this.attack_card1.scale.y = 1;
                    this.reverse_special = false;
                    this._hpWindow.write_hp(this.board_cards);
                    this.camera.euler.x = 0;
                    this.camera.removeChild(this.mini_cast_card);
                }

            }
        }
    }

};
//-----------------------------------------------------------------------------
// Function : callPreMiracleAnimation 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.callPreMiracleAnimation = function () {
    let cardEffect = parseInt(this.cardDefinitions.getCardAttribute(this.extra_animations[0][2], "cardEffect"))
    let target = this.extra_animations[0][3]

    switch (cardEffect) {
        case 205: // The Plague
            this._center_sprite.x = 960
            this._center_sprite.y = 540
            this.sequence = fx.getEffectSequence('plague_sequence');
            this.sequence.init(this._center_sprite, true, 1);
            break
    }
}

//-----------------------------------------------------------------------------
// Function : callMiracleAnimation 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.callMiracleAnimation = function () {
    let cardEffect = parseInt(this.cardDefinitions.getCardAttribute(this.extra_animations[0][2], "cardEffect"))
    let target = this.extra_animations[0][3]
    this.playCardAnimation(cardEffect, target);
}
//-----------------------------------------------------------------------------
// Function : proceed_cast 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceed_cast = function () {
    this.scoreCastQuantity();
    var mini_cardId = this.boardState.getValue(this.extra_animations[0][3]).cardId
    var turn = this.boardState.getValue(this.extra_animations[0][3]).turn
    if (this.cardDefinitions.getCardAttribute(this.extra_animations[0][2], "cardType") != 2) {
        this.place_mini_card_field(mini_cardId, turn, this.extra_animations[0][3])
    }
    if (this.turn == 0)
        this.phase = 5;
    else
        this.phase = 4;
    this.check_light_slot(-1);
    this.board_place = this.extra_animations[0][3]
    this.callCardDefinition(this.extra_animations[0][2]);
};
//-----------------------------------------------------------------------------
// Function : scoreCastQuantity 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.scoreCastQuantity = function () {
    if (this.turn == 0)
        $dataKamigami.duelData[7][1] += 1
}


//-----------------------------------------------------------------------------
// Function : proceed_cast 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.place_mini_card_field = function (mini_cardId, turn, boardPlace) {
    this.board_cards[boardPlace].x = this.board_map[boardPlace % 4][parseInt(boardPlace / 4)][0];
    this.board_cards[boardPlace].y = this.board_map[boardPlace % 4][parseInt(boardPlace / 4)][1];
    this.board_cards[boardPlace].scale.x = 1;
    this.board_cards[boardPlace].scale.y = 1;
    this.board_cards[boardPlace].opacity = 255;
    this.board_cards[boardPlace].rotation = 0;
    this.board_cards[boardPlace].loadCard(mini_cardId, turn)
    this.board_cards[boardPlace].zOrder = 0;
    this.cardContainer.sortChildren();
}
//-----------------------------------------------------------------------------
// Function : animate_cast
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.animate_cast = function () {
    return false;
};
//-----------------------------------------------------------------------------
// Function : perform_special_skill
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.perform_special_skill = function () {
    this.attack_phase = 0
    this.cardEffect = this.extra_animations[0][4]
    this.set_hp(this.extra_animations[0][3], this.special_skill_damage())
    if (this.extra_animations[0][6]) {
        this.set_devotion(1, -this.getSkillCost(this.cardEffect))
    }
    this.resetExtraAnimation()
    this._fade_screen_2.opacity = 0
    this._big_card_front.euler.y = 0
    this.on_special_skill = false
    this.return_fase_4 = false
    this._hpWindow.write_hp(this.board_cards)

    this.check_light_slot(-1);
};
