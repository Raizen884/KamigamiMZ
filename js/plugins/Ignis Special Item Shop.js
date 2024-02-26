//=============================================================================
// Ignis Special Item Shop.js
//=============================================================================

/*:
 * @plugindesc Special Item Shop.
 * @author Raizen (Mauricio Pastana)
 * @help 
 
 * This is a plugin that adds a Special Shop Scene, 
 // * Special in a way that you can sell ANYTHING, even from 
 * other scripts given they have script calls for it.
 */


//-----------------------------------------------------------------------------
// Triple Triad Image Handler
//
// The scene class of the battle screen.

ImageManager.loadIgnisShop = function (filename, hue) {
    return this.loadBitmap('img/ignis_shop/', filename, hue, true);
};


//=============================================================================
// TripleTriadScene
// Description: Main System Scene
//=============================================================================


function Scene_Ignis_Shop() {
    this.initialize.apply(this, arguments);
}

Scene_Ignis_Shop.prototype = Object.create(Scene_Base.prototype);
Scene_Ignis_Shop.prototype.constructor = Scene_Ignis_Shop;

//-----------------------------------------------------------------------------
// Function : initialize - initiates the graphics
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);

    this.load_parameters();
    this.create_variables();
    AudioManager.playBgm({ name: $dataKamigami.ShopMusic, pan: 0, pitch: 100, volume: 90 });
    this.create_background();
    this.create_displacement();
    this.create_shadow();

    this.createBoosters();
    this.create_background2();
    this.createMenuBack();
    this.createArrows();
    this.create_text_lights();
    this.write_texts();
    this.write_pic_texts();
    this.create_coin();
    this.createTip()
    
};

//-----------------------------------------------------------------------------
// Function : createTip
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.createTip = function () {
    this.tipText = new PIXI.Text(new String(), { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0xffffff, align: 'left', dropShadow: true, dropShadowBlur: 4, dropShadowDistance: 2 });
    this.addChild(this.tipText)
    this.tipText.text = IAVRA.I18N.localize("#{DuelVocab.MenuText.tip02}")
    this.tipText.y = 1000
    this.tipText.x = Graphics.width / 2 - this.tipText.width / 2
    this.tipMovement = false
    this.tipText.alpha = 0
}

//-----------------------------------------------------------------------------
// Function : create_variables
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.create_shadow = function () {
    this._boosterShadow = new Sprite();
    this._boosterShadow.bitmap = ImageManager.loadIgnisShop("booster01_shadow");
    this.addChild(this._boosterShadow);
    this._boosterShadow.anchor.x = 0.5;
    this._boosterShadow.anchor.y = 0.5;
    this._boosterShadow.x = Graphics.width / 2;
    this._boosterShadow.y = 960;
    this._boosterShadow.scale.x = 0;
    this._boosterShadow.scale.y = 0;
};
//-----------------------------------------------------------------------------
// Function : create_variables
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.create_variables = function () {
    this.phase = 0;
    this.frame_count = 0;
    this.bounce_pics = [0, 0, 0];
    this.index = 0;
    this.old_cursor = 0;
    this.move_booster = true;
    this.old_index = 0;
    this.coin_rotation_direction = true;
};
//-----------------------------------------------------------------------------
// Function : create_displacement
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.create_displacement = function () {
    this._displacement = new Sprite();
    this._displacement.bitmap = ImageManager.loadDisplacement("map7");
    this._displacement.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this._displacement.scale.set(2);
    this._displacement.anchor.set(0.5);
    this.addChild(this._displacement);
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this._displacement);
    this.filters = [this.displacementFilter];
    this.displacementFilter.scale.x = 0;
    this.displacementFilter.scale.y = 0;
    this.tl = new TimelineMax({ paused: true });
    this.tl.to(this.displacementFilter.scale, 8, { x: 0, y: -10000, ease: Expo.easeInOut });
    this.tl.timeScale(100);
    this.tl.play();
};
//-----------------------------------------------------------------------------
// Function : create_coin
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.create_coin = function () {
    this._coin = new Sprite();
    this._coin.bitmap = ImageManager.loadIgnisShop("coin");
    this.addChild(this._coin);
    this._coin.anchor.x = 0.5;
    this._coin.anchor.y = 0.5;
    this._coin.x = 1550;
    this._coin.y = 970;
    this._coin.opacity = 0;
};
//-----------------------------------------------------------------------------
// Function : create_text_lights
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.create_text_lights = function () {
    this.textBuyLight = new Sprite_Kami_ButtonLight(1, "shopmenu3", -100, 0xFF0000);
    this.addChild(this.textBuyLight);
    this.textReturnLight = new Sprite_Kami_ButtonLight(0, "shopmenu1", 70, 0xFF0000);
    this.addChild(this.textReturnLight);
    this.textPacksLight = new Sprite_Kami_ButtonLight(0, "shopmenu2", 70, 0xFF0000);
    this.addChild(this.textPacksLight);
    this.textBuyLight.opacity = 0; this.textReturnLight.opacity = 0; this.textPacksLight.opacity = 0;
}

//-----------------------------------------------------------------------------
// Function : write_pic_texts
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.write_pic_texts = function () {
    this.textInfo = new Array(5);
    for (var n = 0; n < 5; n++) {
        this.textInfo[n] = new Sprite_Kami_Button(1, `shopmenupack${n + 1}`, 0, 50);
        this.addChild(this.textInfo[n]);
        this.textInfo[n].x = 2140;
        this.textInfo[n].opacity = 0;
    }
    this.textBuy = new Sprite_Kami_Button(1, "shopmenu3", -100);
    this.textBuy.x = 1466 + 800;
    this.textBuy.y = 811;

    this.addChild(this.textBuy);
    this.textReturn = new Sprite_Kami_Button(0, "shopmenu1", 70);
    this.addChild(this.textReturn);
    this.textReturn.x = -800;
    this.textPacks = new Sprite_Kami_Button(0, "shopmenu2", 70);
    this.addChild(this.textPacks);
    this.textPacks.y = 871;
    this.textPacks.x = -800;
    this.textReturn.opacity = 0; this.textPacks.opacity = 0; this.textBuy.opacity = 0;
};
//-----------------------------------------------------------------------------
// Function : createArrows
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.createArrows = function () {
    this._arrowLeft = new Sprite_Clickable();
    this._arrowLeft.bitmap = ImageManager.loadIgnisShop("arrow_left");
    this.addChild(this._arrowLeft);
    this._arrowRight = new Sprite_Clickable();
    this._arrowRight.bitmap = ImageManager.loadIgnisShop("arrow_right");
    this.addChild(this._arrowRight);
    this._arrowLeft.x = 416;
    this._arrowLeft.y = 446;
    this._arrowLeft.opacity = 0;
    this._arrowRight.x = 1410;
    this._arrowRight.y = 446;
    this._arrowRight.opacity = 0;
};

//-----------------------------------------------------------------------------
// Function : createBoosters
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.createBoosters = function () {
    this._boosters = new Array(5);
    this.container = new Array(5);



    for (var n = 0; n < 5; n++) {
        this.container[n] = new PIXI.Container();
        this.container[n].filters = [new PIXI.filters.ColorOverlayFilter([1, 0, 0], [0, 0, 1], 0.001)];
        this.container[n].filters[0].color = "#FFFFFF"
        this.addChild(this.container[n]);
        console.log($dataKamigami.booster_packs[n])
        if ($dataKamigami.booster_packs[n]) {
            this.container[n].filters[0].enabled = false;
        }
        this._boosters[n] = new Sprite();
        this._boosters[n].bitmap = ImageManager.loadIgnisShop("booster" + (n + 1));
        this.container[n].addChild(this._boosters[n]);
        this._boosters[n].x = Graphics.width / 2;
        this._boosters[n].y = Graphics.height;
        this._boosters[n].anchor.x = 0.5;
        this._boosters[n].anchor.y = 0.5;
        this._boosters[n].scale.x = 0.65;
        this._boosters[n].scale.y = 0.65;
        this._boosters[n].opacity = 0;
        if (n != 0) {
            this._boosters[n].scale.x = 0.535;
            this._boosters[n].scale.y = 0.535;
        }
    }
};


//-----------------------------------------------------------------------------
// Function : load_parameters
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.load_parameters = function () {
    this.owned_booster_packs = $dataKamigami.owned_booster_packs;
    this.booster_pack_info = $dataKamigami.booster_pack_info;
};


//-----------------------------------------------------------------------------
// Function : write_texts
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.write_texts = function () {
    let ownedBoosterText = IAVRA.I18N.localize("#{DuelVocab.MenuOptions.shopmenu22sub}")
    ownedBoosterText = ownedBoosterText.replace("|x|",this.sumArray(this.owned_booster_packs))
    let coinsName = IAVRA.I18N.localize("#{DuelVocab.MenuOptions.shopmenucoins}")
    this._packs_owned = new Sprite(new Bitmap(800, 80));
    this._packs_owned.bitmap.fontSize = 30;
    this._packs_owned.bitmap.outlineWidth = 0;
    this._packs_owned.bitmap.drawText(ownedBoosterText, 0, 0, 800, 48, 'left');
    this.addChild(this._packs_owned);
    this._packs_owned.x = 90;
    this._packs_owned.y = 970;
    this._packs_owned.opacity = 0;
    this._gold_owned = new Sprite(new Bitmap(400, 80));
    this._gold_owned.bitmap.fontSize = 70;
    this._gold_owned.bitmap.outlineWidth = 0;
    this._gold_owned.opacity = 0;
    this._gold_owned.bitmap.drawText(0, 0, 0, 150, 48, 'right');
    this.addChild(this._gold_owned);
    this._gold_owned.x = 1600;
    this._gold_owned.y = 940;

    this._coinsName = new Sprite(new Bitmap(120, 80));
    this._coinsName.bitmap.fontSize = 50;
    this._coinsName.bitmap.outlineWidth = 0;
    this._coinsName.opacity = 0;
    this._coinsName.bitmap.drawText(coinsName, 0, 0, 120, 30, 'left');
    this.addChild(this._coinsName);
    this._coinsName.x = 1755;
    this._coinsName.y = 953;

    this._packs_price = new Sprite(new Bitmap(300, 80));
    this._packs_price.bitmap.fontSize = 36;
    this._packs_price.bitmap.outlineWidth = 0;
    this._packs_price.bitmap.drawText(this.booster_pack_info[0][1], 0, 0, 300, 48, 'right');
    this.addChild(this._packs_price);
    this._packs_price.x = 1470;
    this._packs_price.y = 320;
    this._packs_price.opacity = 0;

    this._discount_money = new Sprite(new Bitmap(100, 80));
    this._discount_money.bitmap.fontSize = 60;
    this._discount_money.bitmap.outlineWidth = 0;
    this._discount_money.opacity = 0;
    this._discount_money.x = 1650;
    this._discount_money.y = 980;
    this.addChild(this._discount_money);
};

//-----------------------------------------------------------------------------
// Function : write_texts
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.set_packs_owned = function (num) {
    this.owned_booster_packs[this.movement_array[2]] += num;
    this._packs_owned.bitmap.clear();
    this._packs_owned.bitmap.drawText(this.owned_booster_packs[this.movement_array[2]], 0, 0, 80, 48, 'left');

};

//-----------------------------------------------------------------------------
// Function : create_background - creates background Images
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.create_background = function () {
    this._backSprite = new Sprite();
    this._backSprite.bitmap = ImageManager.loadIgnisShop("store_bg");
    this.addChild(this._backSprite);
    this._backSprite2 = new Sprite();
    this._backSprite2.bitmap = ImageManager.loadIgnisShop("store_bg2");
    this.addChild(this._backSprite2);
    this._backSprite2.y = 810;
};
//-----------------------------------------------------------------------------
// Function : create_background2 - creates background Images
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.create_background2 = function () {
    this._backSprite3 = new Sprite();
    this._backSprite3.bitmap = ImageManager.loadIgnisShop("store_bg2");
    this.addChild(this._backSprite3);
    this._backSprite3.y = 810;
};
//-----------------------------------------------------------------------------
// Function : createMenuBack
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.createMenuBack = function () {
    this._backReturn = new Sprite(ImageManager.loadIgnisShop("backReturn"));
    this.addChild(this._backReturn);
    this._backOpen = new Sprite(ImageManager.loadIgnisShop("backOpen"));
    this.addChild(this._backOpen);
    this._backInfo = new Sprite(ImageManager.loadIgnisShop("backInfo"));
    this.addChild(this._backInfo);
    this._backBuy = new Sprite(ImageManager.loadIgnisShop("backBuy"));
    this.addChild(this._backBuy);
    this._backReturn.x = -800;
    this._backReturn.opacity = 0;
    this._backOpen.y = Graphics.height - 202;
    this._backOpen.x = - 800;
    this._backInfo.x = Graphics.width - 708 + 800;
    this._backBuy.x = Graphics.width - 708 + 800; this._backBuy.y = Graphics.height - 267;

    //this._backData.opacity = this._backStore.opacity = this._backBooster.opacity = this._backDeck.opacity = this._backDuel.opacity = this._backCampaign.opacity = 0;
};

//-----------------------------------------------------------------------------
// Function : update
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.update = function () {
    
    Scene_Base.prototype.update.call(this);
    if (this.phase > 0)
        this.updateTipMovement();
    for (let fastSkip = 0; fastSkip < 4; fastSkip++) {
        this.frame_count++;
        this.update_shadow(this.index);
        switch (this.phase) {
            case 0:
                this.update_menu_movements();
                break;
            case 1:
                this.update_booster_scale();
                this.update_booster_movement();
                this.update_cursor_movement();
                break;
            case 2:
                this.rotate_coin();
                this.update_booster_scale();
                this.proceed_booster_move();
                break;
            case 3:
                this.rotate_coin();
                this.update_buy();
                break;
            case 4:
                this.close_all_scenes();
                return;
        }
        if (!TouchInput.isLongPressed()) {
            break;
        }
    }
};

//-----------------------------------------------------------------------------
// Function : updateTipMovement
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.updateTipMovement = function () {
    if (this.tipMovement) {
        this.tipText.alpha -= 0.01
        if (this.tipText.alpha < 0.4) {
            this.tipMovement = false
        }
    } else {
        this.tipText.alpha += 0.01
        if (this.tipText.alpha > 0.8) {
            this.tipMovement = true
        }
    }
}

//-----------------------------------------------------------------------------
// Function : update_menu_movements
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.update_shadow = function (index) {
    shadow_mult = 1;
    if (this.phase == 2) {
        if (this._boosters[index].y == Graphics.height) {
            index = this.old_index;
            shadow_mult = this._boosters[index].scale.x * this._boosters[index].scale.x;
        }

    }
    this._boosterShadow.x = this._boosters[index].x;
    this._boosterShadow.y = 560 + this._boosters[index].scale.x * 400;
    if (this._boosters[index].scale.x > 0.65) {
        this._boosterShadow.scale.y = this._boosterShadow.scale.x = ((this._boosters[index].y - 200) / 340) * shadow_mult;
    }
    else {
        this._boosterShadow.scale.x = 0;
        this._boosterShadow.scale.y = 0;
    }

};
//////////////////////////// PHASE 0 //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : update_menu_movements
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.update_menu_movements = function () {
    if (this.frame_count == 1) {
        this.tl.timeScale(7);
        this.tl.reverse();
        this._boosters[1].x = 1924;
        this._boosters[4].x = -4;
        this._boosters[2].x = 2360;
        this._boosters[3].x = -440;
        this._boosters[1].y = this._boosters[2].y = this._boosters[3].y = this._boosters[4].y = 600;
    }
    if (this.textReturn.x < 0 && this.frame_count > 30) {
        this._backReturn.x -= (this._backReturn.x / 20 - 1);
        if (this.frame_count > 38) {
            if (this.textReturn.opacity < 165)
                this.textReturn.opacity += 3;
            this.textReturn.x -= (this.textReturn.x / 20 - 1);
        }
        if (this._backReturn.x >= 0)
            this._backReturn.x = 0;
        if (this.textReturn.x >= 0)
            this.textReturn.x = 0;

        this._backReturn.opacity += 7;
    }
    if (this.textPacks.x < 0 && this.frame_count > 50) {
        this._backOpen.x -= (this._backOpen.x / 20 - 1);
        if (this.frame_count > 58) {
            if (this.textPacks.opacity < 165) {
                this._packs_owned.opacity += 3
                this.textPacks.opacity += 3;
            }

            this.textPacks.x -= (this.textPacks.x / 20 - 1);
        }
        if (this._backOpen.x >= 0)
            this._backOpen.x = 0;
        if (this.textPacks.x >= 0)
            this.textPacks.x = 0;
        this._backOpen.opacity += 7;
    }
    if (this.textBuy.x > 1466 && this.frame_count > 70) {
        this._backBuy.x -= ((this._backBuy.x - (Graphics.width - 708)) / 20 + 1);
        if (this.frame_count > 78) {
            if (this.textBuy.opacity < 165)
                this.textBuy.opacity += 3;
            this.textBuy.x -= ((this.textBuy.x - 1466) / 20 + 1);
        }
        if (this._backBuy.x < Graphics.width - 708)
            this._backBuy.x = Graphics.width - 708;
        if (this.textBuy.x < 1466)
            this.textBuy.x = 1466;

        this._backBuy.opacity += 7;
    }
    if (this.textInfo[0].x > 1340 && this.frame_count > 90) {
        this._coin.opacity += 4;

        this._backInfo.x -= ((this._backInfo.x - (Graphics.width - 708)) / 20 + 1);
        if (this.frame_count > 98) {
            if (this.textInfo[0].opacity < 165) {
                this._gold_owned.opacity += 3;
                this.textInfo[0].opacity += 3;
                this._coinsName.opacity += 3;
            }
            this.textInfo[0].x -= ((this.textInfo[0].x - 1340) / 20 + 1);
        }
        if (this._backInfo.x < Graphics.width - 708)
            this._backInfo.x = Graphics.width - 708;
        if (this.textInfo[0].x < 1340)
            this.textInfo[0].x = 1340;
        this._boosters[1].opacity += 2;
        this._boosters[1].x -= ((this.textInfo[0].x - 1340) / 20 + 1) / 4;
        this._boosters[4].opacity += 2;
        this._boosters[4].x += ((this.textInfo[0].x - 1340) / 20 + 1) / 4;
        if (this._boosters[1].x < 1660)
            this._boosters[1].x = 1660;
        if (this._boosters[4].x > 260)
            this._boosters[4].x = 260;
        this._backInfo.opacity += 7;
        if (this._packs_price.opacity < 165)
            this._packs_price.opacity += 3;
    }
    if (this.frame_count > 110 && this.frame_count <= 150) {
        this.set_gold(parseInt(($gameParty.gold() * (this.frame_count - 110)) / 40));
    }
    if (this.frame_count == 150) {
        this.textBuyLight.x = this.textBuy.x;
        this.textBuyLight.y = this.textBuy.y;
        this.textPacksLight.x = this.textPacks.x;
        this.textPacksLight.y = this.textPacks.y;
        this.textReturnLight.x = this.textReturn.x;
        this.textReturnLight.y = this.textReturn.y;


    }
    if (this.frame_count > 40)
        this.update_booster_fall(0);
    if (this.frame_count > 90)
        this.update_booster_fall(1);
    if (this.frame_count > 60)
        this.update_booster_fall(2);
};

//-----------------------------------------------------------------------------
// Function : update_booster_fall
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.update_booster_fall = function (index) {
    if (index == 0) {
        if (this._arrowLeft.opacity <= 165) {
            this._arrowLeft.opacity += 5;
            if (this._arrowLeft.opacity > 165)
                this._arrowLeft.opacity = 165;
        }
    }
    if (index == 1) {
        this.move_booster_front(this.index);
    }
    if (index == 2) {
        if (this._arrowRight.opacity <= 165) {
            this._arrowRight.opacity += 5;
            if (this._arrowRight.opacity > 165)
                this._arrowRight.opacity = 165;
        }
    }
};

//////////////////////////// PHASE 1 //////////////////////////////////////

//-----------------------------------------------------------------------------
// Function : update_booster_scale
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.update_booster_scale = function () {
    for (var n = 0; n < 5; n++) {
        scale = this._boosters[n].x - Graphics.width / 2;
        scale = (1 - Math.abs(scale / 1500));
        if (scale < 0)
            scale = 0;
        this._boosters[n].scale.x = scale;
        this._boosters[n].scale.y = scale;
        this._boosters[n].opacity = scale * 255;
    }
};
//-----------------------------------------------------------------------------
// Function : update_cursor_movement
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.update_booster_movement = function () {
    this.float_image(this._boosters[this.index], 534, 546);
    this.rotate_coin();
};
//-----------------------------------------------------------------------------
// Function : update_cursor_movement
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.update_cursor_movement = function () {
    var btn_hover = 0;
    if (this.textReturn.isButtonHovered() || this.textReturn.isBeingTouched())
        btn_hover = 1;
    if (this.textPacks.isButtonHovered() || this.textPacks.isBeingTouched())
        btn_hover = 2;
    if (this.textBuy.isButtonHovered() || this.textBuy.isBeingTouched())
        btn_hover = 3;
    if (this._arrowLeft.isButtonHovered() || this._arrowLeft.isBeingTouched())
        btn_hover = 4;
    if (this._arrowRight.isButtonHovered() || this._arrowRight.isBeingTouched())
        btn_hover = 5;

    this.remove_all_buttons(btn_hover);
    if (TouchInput.isPressed() && btn_hover != 0) {
        this.count_decision = 0;
        this.btn_hover = btn_hover;
        if (btn_hover == 1 && TouchInput.isTriggered()) {
            AudioManager.playSe({ name: "success", pan: 0, pitch: 100, volume: 100 });
            this.phase = 4;
        }
        if (btn_hover == 2 && TouchInput.isTriggered()) {
            AudioManager.playSe({ name: "success", pan: 0, pitch: 100, volume: 100 });
            this.phase = 4;
        }
        if ((btn_hover == 4 || btn_hover == 5) && TouchInput.isTriggered())
            this.phase = 2;
        if (btn_hover == 3) {
            if ($gameParty.gold() >= this.booster_pack_info[this.index][1] && $dataKamigami.booster_packs[this.index])
                this.phase = 3;
            else
                AudioManager.playSe({ name: "beep", pan: 0, pitch: 100, volume: 200 });
        }

        this.old_index = this.index;
        this.frame_count = 0;
    }

};
//-----------------------------------------------------------------------------
// Function : rotate_coin
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.remove_all_buttons = function (btn) {
    if (btn != 1)
        this.textReturnLight.opacity -= 20;
    if (btn != 2)
        this.textPacksLight.opacity -= 20;
    if (btn != 3)
        this.textBuyLight.opacity -= 20;
    if (btn != 4 && this._arrowLeft.opacity > 165)
        this._arrowLeft.opacity -= 20;
    if (btn != 5 && this._arrowRight.opacity > 165)
        this._arrowRight.opacity -= 20;
    switch (btn) {
        case 1:
            this.textReturnLight.opacity += 20;
            break;
        case 2:
            this.textPacksLight.opacity += 20;
            break;
        case 3:
            this.textBuyLight.opacity += 20;
            break;
        case 4:
            this._arrowLeft.opacity += 20;
            break;
        case 5:
            this._arrowRight.opacity += 20;
            break;
    }
    if (this.old_cursor != btn) {
        this.old_cursor = btn;
        if (this.old_cursor != 0)
            AudioManager.playSe({ name: "menu_select", pan: 0, pitch: 100, volume: 100 });
    }

};
//-----------------------------------------------------------------------------
// Function : rotate_coin
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.rotate_coin = function () {
    if (this.coin_rotation_direction) {
        this._coin.scale.x -= 0.1;
        if (this._coin.scale.x <= -1) {
            this._coin.scale.x = -1;
            this.coin_rotation_direction = false;
        }
    } else {
        this._coin.scale.x += 0.1;
        if (this._coin.scale.x >= 1) {
            this._coin.scale.x = 1;
            this.coin_rotation_direction = true;
        }
    }

};
//-----------------------------------------------------------------------------
// Function : float_image
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.float_image = function (sprite, min, max) {
    var range = parseInt((max - min) / 2);
    var range_var = sprite.y - (min + range);
    if (range_var < 0)
        range_var *= -1;
    if (Graphics.frameCount % 1 == 0) {
        if (this.move_booster) {
            sprite.y -= 0.1 * (3.5 - range_var / 2);
            //sprite.scale.x -= 0.0001 * (3.5 - range_var/2);
            //sprite.scale.y -= 0.0001 * (3.5 - range_var/2);
            if (sprite.y <= min) {
                sprite.y = min;
                this.move_booster = false;
            }
        } else {
            sprite.y += 0.1 * (3.5 - range_var / 2);
            //sprite.scale.x += 0.0001 * (3.5 - range_var/2);
            //sprite.scale.y += 0.0001 * (3.5 - range_var/2);
            if (sprite.y >= max) {
                sprite.y = max;
                this.move_booster = true;
            }
        }

    }
};


//-----------------------------------------------------------------------------
// Function : set_gold
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.set_gold = function (gold) {
    this._gold_owned.bitmap.clear();
    this._gold_owned.bitmap.fontSize = 70;
    this._gold_owned.bitmap.outlineWidth = 0;
    this._gold_owned.bitmap.drawText(gold, 0, 0, 150, 48, 'right');
};

//////////////////////////// PHASE 2 //////////////////////////////////////

//-----------------------------------------------------------------------------
// Function : proceed_booster_move
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.proceed_booster_move = function () {
    if (this.frame_count == 1) {
        this.get_booster_y = this._boosters[this.index].y;
        if (this.btn_hover == 4)
            this.change_index(1);
        else
            this.change_index(-1);
        this._packs_price.bitmap.clear();
        this._packs_price.bitmap.drawText(this.booster_pack_info[this.index][1], 0, 0, 300, 48, 'right');
        return;
    }
    if (this.btn_hover == 4)
        this.move_booster_boosters(1);
    else
        this.move_booster_boosters(-1);
    this.swap_text_info(this.index);
};
//-----------------------------------------------------------------------------
// Function : swap_text_info
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.swap_text_info = function (index) {
    for (var n = 0; n < 5; n++) {
        if (n == index || this.textInfo[n].x == 2140)
            continue
        this.textInfo[n].x += ((this.textInfo[n].x - 1340) / 6 + 1);
        this.textInfo[n].opacity -= 8;
        if (this.textInfo[n].x >= 2140)
            this.textInfo[n].x = 2140;
    }
    if (this.textInfo[index].x > 1340) {
        this.textInfo[index].x -= ((this.textInfo[index].x - 1340) / 6 + 1);
        if (this.textInfo[index].opacity < 165)
            this.textInfo[index].opacity += 6;
        if (this.textInfo[index].x < 1340)
            this.textInfo[index].x = 1340;
    }

};


//-----------------------------------------------------------------------------
// Function : move_booster_boosters
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.move_booster_boosters = function (direction) {
    for (var n = 0; n < 5; n++) {
        if (direction == 1)
            this._boosters[n].x -= (40 - this.frame_count);
        else
            this._boosters[n].x += (40 - this.frame_count);
        this.move_y_booster(this._boosters[n], n == this.index);
        if (this._boosters[n].x > 2360)
            this._boosters[n].x -= 3500;
        if (this._boosters[n].x < -440)
            this._boosters[n].x += 3500;
        if (direction == -1 && this._boosters[this.index].x >= 960) {
            this._boosters[this.index].x = 960;
            this.phase = 1;
        }
        if (direction == 1 && this._boosters[this.index].x <= 960) {
            this._boosters[this.index].x = 960;
            this.phase = 1;
        }
    }


};

//-----------------------------------------------------------------------------
// Function : move_y_booster
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.move_y_booster = function (sprite, center) {
    if (center) {
        sprite.y -= (40 - this.frame_count) / 10;
        sprite.y = Math.max(this.get_booster_y, sprite.y);
    }
    else {
        sprite.y += (40 - this.frame_count) / 10;
        sprite.y = Math.min(600, sprite.y);
    }
};
//-----------------------------------------------------------------------------
// Function : get_booster_position
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.get_booster_position = function (ind) {
    ind = this.index - ind;
    if (ind > 2)
        ind -= 5;
};

//-----------------------------------------------------------------------------
// Function : change_index
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.change_index = function (ind) {
    this.index += ind;
    if (this.index < 0)
        this.index = 4;
    if (this.index > 4)
        this.index = 0;
};

//-----------------------------------------------------------------------------
// Function : move_booster_front
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.move_booster_front = function (index) {
    if (this._boosters[index].y > 340 && this._boosters[index].scale.x == 0.65) {
        this._boosters[index].y -= 30;
        this._backSprite3.opacity = 255;
        this._boosters[index].opacity = 255;
        if (this._boosters[index].y < 340) {
            this._backSprite3.opacity = 0;
            this._boosters[index].y = 340;
        }
        this.move_booster = true;
        return;
    }


    this._boosters[index].opacity = 255;
    this._boosters[index].scale.x += 0.02;
    this._boosters[index].scale.y += 0.02;
    this._boosters[index].y -= ((this._boosters[index].y - 540) / 10);
    if (this._boosters[index].y >= 540) {
        this.bounce_pics[1] = 2;
        this._boosters[index].y = 540;
        this.phase = 1;
    }

    if (this._boosters[index].scale.x >= 1) {
        this._boosters[index].scale.x = 1;
        this._boosters[index].scale.y = 1;
        this._boosters[index].y -= ((this._boosters[index].y - 540) / 15 - 0.1);
    }
};
//-----------------------------------------------------------------------------
// Function : move_booster_back
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.move_booster_back = function (index) {
    if (this._boosters[index].scale.x == 1) {
        mov = Math.abs(((this._boosters[index].y - 540) / 15 - 0.1));
        if (mov <= 1)
            mov = 1;
        this._boosters[index].y -= mov;
        if (this._boosters[index].y < 400) {
            this._boosters[index].scale.x -= 0.02;
            this._boosters[index].scale.y -= 0.02;
        }
    } else {
        this._boosters[index].scale.x -= 0.02;
        this._boosters[index].scale.y -= 0.02;

        if (this._boosters[index].scale.x <= 0.65) {
            this._boosters[index].scale.x = 0.65;
            this._boosters[index].scale.y = 0.65;
            this._backSprite3.opacity = 255;
            this._boosters[index].y += 30;
        } else
            this._boosters[index].y -= ((this._boosters[index].y - 540) / 10);
        if (this._boosters[index].y >= Graphics.height) {
            this._backSprite3.opacity = 0;
            this._boosters[index].opacity = 0;
            this._boosters[index].y = Graphics.height;
        }
    }
};

//////////////////////////// PHASE 3 //////////////////////////////////////

//-----------------------------------------------------------------------------
// Function : update_buy
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.update_buy = function () {
    if (this.frame_count == 1) {
        AudioManager.playSe({ name: "System_buying", pan: 0, pitch: 100, volume: 100 });
        this._boosters_buy = new Sprite();
        this._boosters_buy.bitmap = ImageManager.loadIgnisShop("booster" + (this.index + 1));
        this._boosters_buy.x = this._boosters[this.index].x;
        this._boosters_buy.y = this._boosters[this.index].y;
        this._boosters_buy.anchor.x = 0.5;
        this._boosters_buy.anchor.y = 0.5;
        this.addChild(this._boosters_buy);
        this._boosters[this.index].x = Graphics.width / 2;
        this._boosters[this.index].y = Graphics.height;
        this._boosters[this.index].anchor.x = 0.5;
        this._boosters[this.index].anchor.y = 0.5;
        this._boosters[this.index].scale.x = 0.65;
        this._boosters[this.index].scale.y = 0.65;
        this._backSprite3.opacity = 255;
        this.owned_booster_packs[this.index]++;
        this._packs_owned.bitmap.clear();
        this._packs_owned.bitmap.drawText("You own " + this.sumArray(this.owned_booster_packs) + " packs!", 0, 0, 800, 48, 'left');
        this._discount_money.bitmap.drawText("-" + this.booster_pack_info[this.index][1], 0, 0, 100, 48, 'right');
        this._discount_money.opacity = 165;
        $gameParty.loseGold(this.booster_pack_info[this.index][1]);
        return;
    }
    if (this.frame_count < 41) {
        this.set_gold($gameParty.gold() + parseInt(this.booster_pack_info[this.index][1] / 40 * (40 - (this.frame_count))));
    }

    this.jump_coin();
    this._boosters_buy.y += this.frame_count;
    this._boosters_buy.x -= this.frame_count / 2;
    this.shake_booster();
    this.move_booster_front(this.index);
    if (this.phase == 1) {
        this._discount_money.bitmap.clear();
        this._boosters_buy.opacity = 0;
    }
};
//-----------------------------------------------------------------------------
// Function : jump_coin
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.jump_coin = function () {
    this._coin.y += (this.frame_count - 15);
    if (this._coin.y >= 970)
        this._coin.y = 970;
};
//-----------------------------------------------------------------------------
// Function : shake_booster
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.shake_booster = function () {
    if (this.frame_count % 12 == 0)
        this._boosters_buy.rotation += 0.01;
    else if (this.frame_count % 12 == 1)
        this._boosters_buy.rotation += 0.01;
    else if (this.frame_count % 12 == 2)
        this._boosters_buy.rotation += 0.01;
    else if (this.frame_count % 12 == 3)
        this._boosters_buy.rotation -= 0.01;
    else if (this.frame_count % 12 == 4)
        this._boosters_buy.rotation -= 0.01;
    else if (this.frame_count % 12 == 5)
        this._boosters_buy.rotation -= 0.01;
    else if (this.frame_count % 12 == 6)
        this._boosters_buy.rotation -= 0.01;
    else if (this.frame_count % 12 == 7)
        this._boosters_buy.rotation -= 0.01;
    else if (this.frame_count % 12 == 8)
        this._boosters_buy.rotation -= 0.01;
    else if (this.frame_count % 12 == 9)
        this._boosters_buy.rotation += 0.01;
    else if (this.frame_count % 12 == 10)
        this._boosters_buy.rotation += 0.01;
    else {
        this._boosters_buy.rotation += 0.01;
    }

};

//////////////////////////// PHASE 4 //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : updateDecision
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.updateDecision = function () {
    switch (this.btn_hover) {
        case 1:
            if (this.count_decision % 2 == 0) {
                this.textReturnLight.opacity += 51;
                if (this.textReturnLight.opacity == 255)
                    this.count_decision++;
            }

            else {
                this.textReturnLight.opacity -= 51;
                if (this.textReturnLight.opacity == 0)
                    this.count_decision++;
            }

            break;
        case 2:
            if (this.count_decision % 2 == 0) {
                this.textPacksLight.opacity += 51;
                if (this.textPacksLight.opacity == 255)
                    this.count_decision++;
            }

            else {
                this.textPacksLight.opacity -= 51;
                if (this.textPacksLight.opacity == 0)
                    this.count_decision++;
            }
            break;
        case 3:

            break;
        case 4:

            break;
        case 5:

            break;
    }

};
//-----------------------------------------------------------------------------
// Function : close_all_scenes
//-----------------------------------------------------------------------------
Scene_Ignis_Shop.prototype.close_all_scenes = function () {
    if (this.count_decision < 15) {
        this.updateDecision();
        this.frame_count = 0;
        return;
    }
    this.textReturnLight.opacity -= 20;
    this.textPacksLight.opacity -= 20;
    this._coin.opacity -= 15;
    this.move_booster_back(this.index);
    for (var n = 0; n < 5; n++) {
        if (this.index == n)
            continue;
        this._boosters[n].opacity -= 10;
        if (this._boosters[n].x > 960)
            this._boosters[n].x += (this.frame_count)
        if (this._boosters[n].x < 960)
            this._boosters[n].x -= (this.frame_count)
    }
    this._arrowLeft.opacity -= 5;
    this._arrowRight.opacity -= 5;
    if (this.frame_count > 10) {
        for (var n = 0; n < 5; n++) {
            this.textInfo[n].x += (this.frame_count - 10);
            this.textInfo[n].opacity -= 10;
        }
        this._packs_price.opacity -= 10;
        this._backInfo.opacity -= 10;
        this._backInfo.x += (this.frame_count - 10);
    }
    if (this.frame_count > 30) {
        this._backBuy.opacity -= 10;
        this._gold_owned.opacity -= 10;
        this._coinsName.opacity -= 10;
        this.textBuy.opacity -= 10;
        this.textBuy.x += (this.frame_count - 30);
        this._backBuy.x += (this.frame_count - 30);
    }
    if (this.frame_count > 50) {
        this._backOpen.opacity -= 10;
        this.textPacks.opacity -= 10;
        this._packs_owned.opacity -= 10;
        this._packs_owned.x -= (this.frame_count - 50);
        this._backOpen.x -= (this.frame_count - 50);
        this.textPacks.x -= (this.frame_count - 50);
    }
    if (this.frame_count > 70) {
        this._backReturn.opacity -= 10;
        this.textReturn.opacity -= 10;
        this._backReturn.x -= (this.frame_count - 70);
        this.textReturn.x -= (this.frame_count - 70);

    }
    if (this.frame_count == 80) {
        this.tl.play();
    }
    if (this.frame_count == 115) {
        if (this.btn_hover == 1)
            SceneManager.goto(Scene_Main_Menu);
        else
            SceneManager.goto(Scene_Kamigami_Booster);
    }
};