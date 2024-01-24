//=============================================================================
// Ignis Special Item Shop.js
//=============================================================================
"use strict"
/*:
 * @plugindesc Special Item Shop.
 * @author Raizen (Mauricio Pastana)
 
  * @param Card Creation
 * @type struct<CardCreation>[]
 
 * @help 
 
 * This is a plugin that adds a Special Shop Scene, 
 // * Special in a way that you can sell ANYTHING, even from 
 * other scripts given they have script calls for it.
 */

/*~struct~CardCreation:
* @param Name
* @type text
* @param Power
* @type number
* @param HP
* @type number
* @param addDevotion
* @type number
* @param costDevotion
* @type number
* @param moveCost
* @type number
* @param attackCost
* @type number
* @param specialType
* @type number
* @param attackType
* @type number
* @param Image_Big
* @type file
* @dir img/kamigami/
* @param Image_Player_1
* @type file
* @dir img/kamigami/
* @param Image_Player_2
* @type file
* @dir img/kamigami/
* @param card_description
* @type note
* @param effectArea
* @type number
* @param cardType
* @type number
* @param cardEffect
* @type number
* @param deity
* @type boolean
* @default true
* @param artist
* @type text
*/


var $dataKamigami = null;
//DataManager._databaseFiles.push({ name: '$dataTripleTriad', src: 'TripleTriad.json' });

var tt_alias_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function () {
    tt_alias_createGameObjects.call(this);
    $dataKamigami = new Game_Kamigami();
};

var tt_alias_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function () {
    var contents = tt_alias_makeSaveContents.call(this);
    contents.kamigami = $dataKamigami;
    return contents;
};

var tt_alias_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function (contents) {
    tt_alias_extractSaveContents.call(this, contents);
    $dataKamigami = contents.kamigami;

    //let clip = navigator.clipboard
    //clip.writeText($dataKamigami.card_list)
};


//=============================================================================
// Scene_Kamigami_Duel
// Description: Main System Core
//=============================================================================

function Scene_Kamigami_Duel() {
    this.initialize.apply(this, arguments);
}

Scene_Kamigami_Duel.prototype = Object.create(Scene_Base.prototype);
Scene_Kamigami_Duel.prototype.constructor = Scene_Kamigami_Duel;
//////////////////////////// MAIN START //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : initialize - initiates the graphics
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    $dataKamigami.isOnline = false;
    this.startAllMethods();
};

//-----------------------------------------------------------------------------
// Function : initialize - initiates the graphics
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.startAllMethods = function () {
    AudioManager.stopSe();
    AudioManager.stopBgs();
    this.initialize_classes();
    this.initialize_variables();
    this.initializeScoreKeep();

    this.create_board_map();
    this.create_background();

    this.createTurnImage()

    this.create_layers();

    this.createChatBox();
    this.create_mini_cards();
    this.create_decks();
    this.createWindowLayerDuel();
    this.create_hp_window();
    this.create_devotion();
    this.create_graveyard() //Temporary!
    this.createBoardEffects();
    this.create_fade();
    this.create_big_cards();
    this.create_attack_pics();
    this._hpWindow.write_hp(this.board_cards);
    this.board_light_slots = new Array(16);
    for (var i = 0; i < 16; i++) {
        this.add_single_light_slot(this.board_light_slots, i);
    }

    this.createDuelDescription();
    this.createSpecialCard3d();
    this.createSpecialGodCard();
    this.create_fake_center();
    this.createAnimatedText()

    this.createDestroyCamera();
    this.usingAI = true
    this.createMoveAttackImages();
    this.createGiveUpDialog()
    this.startOnlineTimer();
    this.createDevotionContainer();
};

//-----------------------------------------------------------------------------
// Function : load_parameters
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createDevotionContainer = function () {
    this.devotionContainer = new SContainer();
    this.addChild(this.devotionContainer);
};

//-----------------------------------------------------------------------------
// Function : startOnlineTimer - starts Online Timer
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.startOnlineTimer = function () {
}
Scene_Kamigami_Duel.prototype.createBoardEffects = function () {
    this._boardEffects = new Sprite();
    this._boardEffects.bitmap = ImageManager.loadTitle1("");
    this.addChild(this._boardEffects);
    this._boardEffects.opacity = 180
}


Scene_Kamigami_Duel.prototype.initializeScoreKeep = function () {
    $dataKamigami.duelData.forEach(element => {
        element[1] = 0
    })
}

Scene_Kamigami_Duel.prototype.createDestroyCamera = function () {
    this.cameraDestroy = new PIXI.projection.Camera3d();
    //this.cameraDestroy.position.set(Graphics.width / 2, Graphics.height / 2);
    this.cameraDestroy.setPlanes(1400, 180, 10000, false);
    this.addChild(this.cameraDestroy)
}
Scene_Kamigami_Duel.prototype.createAnimatedText = function () {
    this.effectText = new Sprite();
    this.effectText.bitmap = ImageManager.loadExtrasKamigami("effectTxt");
    this.addChild(this.effectText)
    this.effectText.opacity = 0
    this.effectText.anchor.x = this.effectText.anchor.y = 0.5
    this.devotionText = new Sprite();
    this.devotionText.bitmap = ImageManager.loadExtrasKamigami("devotionTxt");
    this.addChild(this.devotionText)
    this.devotionText.opacity = 0
    this.devotionText.anchor.x = this.devotionText.anchor.y = 0.5
}
Scene_Kamigami_Duel.prototype.create_graveyard = function () {

    this._gyplayer1 = new Sprite_Clickable();
    this._gyplayer1.bitmap = ImageManager.loadKamigami("graveyard_mock");
    this._gyplayer1.x = 50;
    this._gyplayer1.y = 805;
    this.cardContainer.addChildZ(this._gyplayer1, 0);
    this._gyplayer2 = new Sprite_Clickable();
    this._gyplayer2.bitmap = ImageManager.loadKamigami("graveyard_mock");
    this._gyplayer2.x = 1650;
    this._gyplayer2.y = 5;
    this.cardContainer.addChildZ(this._gyplayer2, 0);
}
//-----------------------------------------------------------------------------
// Function : load_parameters
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.create_layers = function () {
    this.cardContainer = new SContainer();
    this.addChild(this.cardContainer);
};

//-----------------------------------------------------------------------------
// Function : initialize_variables
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.initialize_classes = function () {
    this.cardDefinitions = new KamigamiCardDefinitions()
};
//-----------------------------------------------------------------------------
// Function : initialize_variables
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.initialize_variables = function () {
    this.count_frames = 0;
    this.animation_count_frames = 0;
    this.phase = 0;
    this.player_cards = JSON.parse(JSON.stringify($dataKamigami.decks[$dataKamigami.chosenDeck][1]));
    if (this instanceof Scene_Kamigami_Duel_Online) {
        this.player_cards[40] = this.player_cards[40] % 150;
    }
    this.player1Deck = new KamigamiDeck(this.player_cards, 0, this.cardDefinitions)
    this.npc_cards = JSON.parse(JSON.stringify($dataKamigami.enemy_tt_cards));
    this.player2Deck = new KamigamiDeck(this.npc_cards, 1, this.cardDefinitions)
    this.player_hand = [];
    this.npc_hand = [];
    this.player1_graveyard = [];
    this.player2_graveyard = [];
    this.onlineDiscardPile = [];
    this.turn = Math.randomInt(2);
    this.index = 0;
    this.flashing_area = [];
    this.emitterAction = []
    this.movement_show_card = false;
    this.close_card = false;
    this.board_place = 0;
    this.devotion_player1 = 0;
    this.devotion_player2 = 0;
    this.card_acceleration_y = 80;
    this.card_acceleration_x = 30;
    this.npc_card_acceleration_x = -12;
    this.npc_card_acceleration_y = 0;
    this.card_read_for_hand = [];
    this.npc_card_read_for_hand = [];
    this.count_time = [];
    this.npc_count = 0;
    this.lock_move_cards = false;
    this.open_play_choices = false;
    this.attack_phase = 0;
    this.extra_animations = [];
    this.wait_light_animation = 0;
    this.starting_draw = 5; // MUDAR PARA 1!!!!
    this.skill_count_frames = 0;
    this.graveyardLimit = 960;
    this.bestPlay = []
    this.infoPositions = []
    this.devotionCrystals = []
    this.card_num = false
    this.parallelDevotionAnimations = []
};
//-----------------------------------------------------------------------------
// Function : create_background - creates background Images
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.create_background = function () {
    this._backSprite = new Sprite();
    this._backSprite.bitmap = ImageManager.loadKamigami("BOARD".concat($boardChoice));
    this.displacementFilterShockBG = new ShockwaveFilter();
    this.container = new SContainer();
    this.addChild(this.container)
    this.container.addChildZ(this._backSprite, 2);
    this.container.filters = [this.displacementFilterShockBG];
    this.displacementFilterShockBG.time = 6;
    this.displacementFilterShockBG.brightness = 0.9;
    this.displacementFilterShockBG.wavelength = 300;
    this._backSprite.opacity = 255;
};
//-----------------------------------------------------------------------------
// Function : create_decks
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.create_decks = function () {
    this._deck_cards = [];
    this.camera = new PIXI.projection.Camera3d();
    this.camera.position.set(Graphics.width / 2, Graphics.height / 2);
    this.camera.setPlanes(1400, 180, 10000, false);
    this.camera.x = 1740;
    this.camera.y = 900;
    this.cardContainer.addChildZ(this.camera, 50);
    for (var n = 0; n < 4; n++) {
        this._deck_cards[n] = new Sprite();
        this._deck_cards[n].bitmap = ImageManager.loadKamigami("Back_Card");
        //this.addChild(this._deck_cards[n]);
        this._deck_cards[n].scale.x = 0.4;
        this._deck_cards[n].scale.y = 0.4;
        this._deck_cards[n].anchor.y = 0.5;
        this._deck_cards[n].anchor.x = 0.5;
        this._deck_cards[n].opacity = 0;
        this._deck_cards[n].convertTo3d();
        this.camera.addChild(this._deck_cards[n]);
        if (n > 1) {
            this._deck_cards[n].rotation = Math.PI;
            this._deck_cards[n].y = -720;
            this._deck_cards[n].x = -1560;
        } else {
            this._deck_cards[n].y = 0;
            this._deck_cards[n].x = 0;
        }
    }
};
//-----------------------------------------------------------------------------
// Function : create_mini_cards - creates Card Images Images
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.create_mini_cards = function () {
    this.board_cards = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    this._cards_player_1 = [];
    this._cards_player_2 = [];
    this._cards_player_1_all = new Array(this.player_cards.length);
    this._cards_player_2_Back_all = new Array(this.player_cards.length);
    this.board_cards[12] = new Sprite_Card_Board(12, this.boardState, this.cardDefinitions);
    this.board_cards[12].loadCard(this.player1Deck.godCard, 0)
    this.turnAnimation.setGod1(this.board_cards[12])
    this.board_cards[12].x = this.board_map[0][3][0];
    this.board_cards[12].y = this.board_map[0][3][1];
    this.board_cards[12].opacity = 0;
    this.cardContainer.addChildZ(this.board_cards[12], 1);
    this.board_cards[12].anchor.x = 0.5;
    this.board_cards[12].anchor.y = 0.5;
    this.board_cards[3] = new Sprite_Card_Board(3, this.boardState, this.cardDefinitions);
    this.board_cards[3].loadCard(this.player2Deck.godCard, 1)
    this.turnAnimation.setGod2(this.board_cards[3])
    this.board_cards[3].x = this.board_map[3][0][0];
    this.board_cards[3].y = this.board_map[3][0][1];
    this.cardContainer.addChildZ(this.board_cards[3], 0);
    this.board_cards[3].anchor.x = 0.5;
    this.board_cards[3].anchor.y = 0.5;
    this.board_cards[3].opacity = 0;
    for (var i = 0; i < this.player_cards.length; i++) {
        this.add_single_mini_card_image(this._cards_player_2_Back_all, i, 2, i + 3);
        this.add_single_mini_card_image(this._cards_player_1_all, i, 1, i + 3);
    };
    this.cardContainer.sortChildren();
};
//-----------------------------------------------------------------------------
// Function : add_single_card_image - creates card single image
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.add_single_mini_card_image = function (card_pointer, index, type, zOrder = 3) {
    card_pointer[index] = new SpriteStaticGod();

    switch (type) {
        case 1:
            card_pointer[index].x = 1720 + index / 2;
            card_pointer[index].y = 880 + index / 2;
            break;
        case 2:
            card_pointer[index].x = 160 + index / 2;
            card_pointer[index].y = 160 + index / 2;
            card_pointer[index].rotation = Math.PI;
            break;
    }
    var card_name = "Back_Card";
    card_pointer[index].scale.x = 0.4;
    card_pointer[index].scale.y = 0.4;

    card_pointer[index].configureGod(card_name)
    card_pointer[index].opacity = 254;

    this.cardContainer.addChildZ(card_pointer[index], 46 - zOrder);
    card_pointer[index].anchor.x = 0.5;
    card_pointer[index].anchor.y = 0.5;
};
//-----------------------------------------------------------------------------
// Function : create_hp_window
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.create_hp_window = function () {
    this._hpWindow = new Window_hp_Kamigami();
};
//-----------------------------------------------------------------------------
// Function : create_board_map  
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.create_board_map = function (board) {
    this.board_map = [[[0, 0], [0, 0], [0, 0], [0, 0]], [[0, 0], [0, 0], [0, 0], [0, 0]], [[0, 0], [0, 0], [0, 0], [0, 0]], [[0, 0], [0, 0], [0, 0], [0, 0]]];
    this.board_map[0][0] = [634, 215];
    this.board_map[1][0] = [851, 215];
    this.board_map[2][0] = [1068, 215];
    this.board_map[3][0] = [1285, 215];
    this.board_map[0][1] = [634, 432];
    this.board_map[1][1] = [851, 432];
    this.board_map[2][1] = [1068, 432];
    this.board_map[3][1] = [1285, 432];
    this.board_map[0][2] = [634, 649];
    this.board_map[1][2] = [851, 649];
    this.board_map[2][2] = [1068, 649];
    this.board_map[3][2] = [1285, 649];
    this.board_map[0][3] = [634, 866];
    this.board_map[1][3] = [851, 866];
    this.board_map[2][3] = [1068, 866];
    this.board_map[3][3] = [1285, 866];
    this.boardState = new KamigamiBoard()
    this.boardState.addValue(3, this.player2Deck.godCardValues)
    this.boardState.addValue(12, this.player1Deck.godCardValues)
    this.board_place = 3
    this.callCardDefinition(this.player2Deck.godCard, false, 1)
    this.board_place = 12
    this.callCardDefinition(this.player1Deck.godCard, false, 0)
};
//-----------------------------------------------------------------------------
// Function : add_single_card_image - creates card single image
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.add_single_light_slot = function (slot_pointer, index) {
    slot_pointer[index] = new Sprite_Card();
    slot_pointer[index].x = this.board_map[index % 4][parseInt(index / 4)][0];
    slot_pointer[index].y = this.board_map[index % 4][parseInt(index / 4)][1];
    slot_pointer[index].bitmap = ImageManager.loadExtrasKamigami("attackIcon");
    slot_pointer[index].opacity = 255;
    this.addChild(slot_pointer[index]);
    slot_pointer[index].anchor.x = 0.5;
    slot_pointer[index].anchor.y = 0.5;
};

//-----------------------------------------------------------------------------
// Function : create_devotion
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.create_devotion = function () {
    this._devotion_player1 = new Sprite(new Bitmap(200, 80));
    this._devotion_player1.x = 1470;
    this._devotion_player1.y = 562;
    this._devotion_player1.bitmap.fontSize = 70;
    this._devotion_player1.bitmap.outlineWidth = 10;
    this._devotion_player1.bitmap.drawText("0", 0, 0, 200, 80, 'center');
    this.cardContainer.addChildZ(this._devotion_player1, 0);
    this._devotion_player2 = new Sprite(new Bitmap(200, 80));
    this._devotion_player2.x = 245;
    this._devotion_player2.y = 424;
    this._devotion_player2.bitmap.fontSize = 70;
    this._devotion_player2.bitmap.outlineWidth = 10;
    this._devotion_player2.bitmap.drawText("0", 0, 0, 200, 80, 'center');
    this.cardContainer.addChildZ(this._devotion_player2, 0);
};
//-----------------------------------------------------------------------------
// Function : createDevotionAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createDevotionAnimation = function () {
    this.emitterDevotion1 = fx.getParticleEmitter('devotion-dust');
    this.emitterDevotion1.init(this._devotion_player1, true, 1);
    this.emitterDevotion1.x = 100
    this.emitterDevotion1.y = 40

    this.emitterDevotion2 = fx.getParticleEmitter('devotion-dust2');
    this.emitterDevotion2.init(this._devotion_player2, true, 1);
    this.emitterDevotion2.x = 100
    this.emitterDevotion2.y = 40


}



//-----------------------------------------------------------------------------
// Function : createBoardAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createBoardAnimation = function () {
    switch ($boardChoice) {
        case 1:
            this._boardEffects.opacity = 120
            this.greekWeather = Math.randomInt(2)
            this.greekWeatherCount = 0
            if (this.greekWeather == 0) {
                this._boardEffects.y = -200;
                this._boardEffects.x = Graphics.width / 2 - 50;
                this.emitterBoard = fx.getParticleEmitter('DuelMainGreek2');
                this.emitterBoard.init(this._boardEffects, true, 1);
            } else {
                this._boardEffects.y = Graphics.height / 2 - 50;
                this._boardEffects.x = Graphics.width / 2 - 50;
                this.emitterBoard = fx.getParticleEmitter('DuelMainGreek');
                this.emitterBoard.init(this._boardEffects, true, 1);
            }
            break;
        case 2:
            this._boardEffects.y = Graphics.height / 2;
            this.emitterBoard = fx.getEffectSequence('duel-egypt');
            this.emitterBoard.init(this._boardEffects, true, 1);
            break;
        case 3:
            this._boardEffects.x = Graphics.width / 2 - 100;
            this._boardEffects.y = 0
            this._boardEffects.opacity = 255
            this.emitterBoard = fx.getParticleEmitter('DuelMainNorse');
            this.emitterBoard.init(this._boardEffects, true, 1);
            break;
        case 4:
            this._boardEffects.x = Graphics.width / 2;
            this._boardEffects.y = 0
            this._boardEffects.opacity = 130
            this.emitterBoard = fx.getEffectSequence('duel-japanese');
            this.emitterBoard.init(this._boardEffects, true, 1);
    }

}

//-----------------------------------------------------------------------------
// Function : create_fade
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.create_fade = function () {
    this._fade_screen = new Sprite();
    this._fade_screen.bitmap = ImageManager.loadKamigami("shop_fade");
    this.addChild(this._fade_screen);
    this._fade_screen.opacity = 0;
    this._fade_screen_2 = new Sprite();
    this._fade_screen_2.bitmap = ImageManager.loadKamigami("dark_layer");
    this.addChild(this._fade_screen_2);
    this._fade_screen_2.opacity = 0;
};
//-----------------------------------------------------------------------------
// Function : create_mini_cards - creates Card Images Images
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.create_big_cards = function () {
    this.camera_big_card = new PIXI.projection.Camera3d();
    this.camera_big_card.position.set(Graphics.width / 2, Graphics.height / 2);
    this.camera_big_card.setPlanes(1000, 180, 10000, false);
    this.addChild(this.camera_big_card);
    this._big_card_front2 = new SpriteStaticGod();
    this._big_card_front2.anchor.x = 0.5;
    this._big_card_front2.anchor.y = 0.5;
    this.camera_big_card.addChild(this._big_card_front2);
};
//-----------------------------------------------------------------------------
// Function : create_fake_center
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.create_fake_center = function () {
    this._center_sprite = new Sprite_Card();
    this._center_sprite.bitmap = ImageManager.loadTitle1("center_effects");
    this.addChild(this._center_sprite);
    this._center_sprite.x = Graphics.width / 2;
    this._center_sprite.y = Graphics.width / 2;
    this._center_sprite.anchor.x = 0.5;
    this._center_sprite.anchor.y = 0.5;
};

//////////////////////////// MAIN UPDATE //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : update - updates board state
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.update = function () {
    this.checkGameOver()
    this.updateBoardCards()
    this.updateOnlineTimer()
    this.turnAnimation.update()
    Scene_Base.prototype.update.call(this);
    if (this.basicDuelAnimations()) {
        return;
    }

    if (this.onGiveUp) {
        this.updateGiveUpMenu()
        if (this.turn == 0 && this.phase >= 4 && this.phase != 12) {
            return
        }
    }
    if ($boardChoice == 1) {
        this.greekWeatherCount++
        if (this.greekWeatherCount == 6000)
            this.emitterBoard.stop()
        if (this.greekWeatherCount == 7000) {
            this.greekWeatherCount = 0
            this.changeGreekWeather()
        }

    }
    switch (this.phase) {
        case 0:
            this.update_opacity();
            break;
        case 1:
            this.createDevotionAnimation();
            this.spread_cards_initial();
            this.createBoardAnimation();
            break;
        case 3:
            this.upkeep();
            break;
        case 4:
            this._fade_screen_2.opacity -= 10;
            if (this.turn == 1) {
                this.npc_main_phase();
            } else {
                this.main_phase();
                this.hand_player_moving();
            }
            break;
        case 5:
            this.animate_big_card();
            break;
        case 6:
            this.show_move_options();
            break;
        case 7:
            this.proceed_cast();
            break;
        case 8:
            this.proceed_move();
            break;
        case 9:
            this.proceed_attack();
            break;
        case 10:
            this.proceed_pass_turn();
            break;
        case 11:
            this.update_graveyard()
            break
        case 12:
            this.process_end_game()
            break

    };

};
//-----------------------------------------------------------------------------
// Function : update - updates board state
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.updateOnlineTimer = function () {
}
//-----------------------------------------------------------------------------
// Function : changeGreekWeather
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.changeGreekWeather = function () {
    this.greekWeather = 1 - this.greekWeather
    if (this.greekWeather == 0) {
        this._boardEffects.opacity = 180
        this._boardEffects.y = -200;
        this._boardEffects.x = Graphics.width / 2 - 50;
        this.emitterBoard = fx.getParticleEmitter('DuelMainGreek2');
        this.emitterBoard.init(this._boardEffects, true, 1);
    } else {
        this._boardEffects.opacity = 120
        this._boardEffects.y = Graphics.height / 2 - 50;
        this._boardEffects.x = Graphics.width / 2 - 50;
        this.emitterBoard = fx.getParticleEmitter('DuelMainGreek');
        this.emitterBoard.init(this._boardEffects, true, 1);
    }
}

//-----------------------------------------------------------------------------
// Function : update - updates board state
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.updateBoardCards = function () {
    for (let n = 0; n < 16; n++) {
        if (this.board_cards[n] != -1) {
            this.board_cards[n].update()
        }
    }

}
//-----------------------------------------------------------------------------
// Function : update - updates board state
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.basicDuelAnimations = function () {
    this._big_card_front.update()
    if (this._big_card_front.hasInfoButtonTouched) {
        this._big_card_front.hasInfoButtonTouched = false;
        return true;
    }
    if (this.displacementFilterShockBG.time < 6)
        this.displacementFilterShockBG.time += 0.05;
    this.count_frames++;
    this.updateDescriptionText();
    this.executeParallelAnimations()
    if (this.execute_extra_animations())
        return true;
    if (this.executeExtraSkills())
        return true;
    return false;

}
//////////////////////////// PHASE 0 //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : update_opacity - updates initial opacity
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.update_opacity = function () {
    this.board_cards[3].opacity = 255;
    this.board_cards[12].opacity = 255;
    this._hpWindow.contentsOpacity = 255;
    this.phase = 1;
    AudioManager.playBgm({ name: $dataKamigami.Battlemusic, pan: 0, pitch: 100, volume: 90 });
};
//////////////////////////// PHASE 1 //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : spread_cards_initial
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.spread_cards_initial = function () {
    this.player_proceed_draw(0, 5);
    this.player_proceed_draw(1, 5);
    this.proceedMulligan();
    if (this.turn == 0)
        this.turnAnimation.setTurn(this.turn)
    else
        this.turnAnimation.setTurn(this.turn)
    this.phase = 3;
    this.needsFirstDevotion = true

}
//-----------------------------------------------------------------------------
// Function : setInitialDevotion
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.setInitialDevotion = function () {
    let devotion
    if (this.turn == 1) {
        devotion = Math.ceil(this.player1Deck.godCardValues.addDevotion / 2)
        this.extra_animations.push(['Devotion', 0, 12, devotion]);
    } else {
        devotion = Math.ceil(this.player2Deck.godCardValues.addDevotion / 2)
        this.extra_animations.push(['Devotion', 1, 3, devotion]);

    }
    if (this.usingAI) {
        if ($dataKamigami.handicap > 0) {
            this.extra_animations.push(['Devotion', 0, 12, $dataKamigami.handicap]);

        } else if ($dataKamigami.handicap < 0) {
            this.extra_animations.push(['Devotion', 1, 3, -$dataKamigami.handicap]);
        }
    }

};
//////////////////////////// PHASE 3 //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : upkeep
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.upkeep = function () {
    if (this.extra_animations.length > 0)
        return;
    if (this.needsFirstDevotion) {
        this.setInitialDevotion()
        this.needsFirstDevotion = false
    }
    this.add_upkeep_devotion();
    this.check_board_triggers();
    this._weatherSprite.rotateTurn();
    this.check_light_slot(-1);
    this.count_frames = 0;
    this._descriptionText.text = new String()
    this.phase = 4;
    this.turnAnimation.opacity = 255;
    this.oldPosition = -1

};
//-----------------------------------------------------------------------------
// Function : add_upkeep_devotion
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.add_upkeep_devotion = function () {
    let devotion = 0
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == this.turn) {
            devotion = this.boardState.getValue(n).addDevotion;
            this.extra_animations.push(['Devotion', this.turn, n, devotion]);
        }
    }
    this.extra_animations.push(['Close_Devotion', this.turn, n, devotion]);
};
//////////////////////////// PHASE 4 //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : hand_player_moving
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.hand_player_moving = function () {
    if (this.turn == 1)
        return false;
    if (this._cards_player_1.length == 0) {
        if (this._passBtn.isTriggered())
            this.phase = 10;
        return false;
    }

    if (this.phase == 5)
        return false;
    if (TouchInput.y > this._cards_player_1[this.index].y - 220 && this.count_frames > 1)
        return this.move_hand_to_play();
    else if (this.lock_move_cards && TouchInput.y > 150)
        this.move_hand_to_play()
    else
        return this.move_hide_hand();
};
//-----------------------------------------------------------------------------
// Function : move_hand_to_play
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.move_hand_to_play = function () {
    for (var n = 0; n < this._cards_player_1.length; n++)
        this.set_final_card_hand_position_play(this._cards_player_1[n], n);
    this.lock_move_cards = true;
    this.count_frames > 60 ? this.open_play_choices = true : this.open_play_choices = false;
    return true;
};
//-----------------------------------------------------------------------------
// Function : move_hide_hand
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.move_hide_hand = function () {
    this.open_play_choices = this.lock_move_cards = false;
    this.count_frames = 2;
    if (this.phase == 4)
        this._big_card_front.opacity = 0;
    if (this._passBtn.isTriggered())
        this.phase = 10;

    return false;
};
//-----------------------------------------------------------------------------
// Function : main_phase
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.main_phase = function () {
    this.lock_move_cards ? this.check_hand_card_trigger() : this.check_board_card_trigger();
};
//-----------------------------------------------------------------------------
// Function : main_phase
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.check_board_card_trigger = function () {
    var i = this.get_board_touch();
    for (var n = 0; n < this._cards_player_1.length; n++)
        this._cards_player_1[n].opacity += 10;
    if (i != -1 && this.boardState.hasCard(i)) {
        this.board_place = i;
        this._big_card_front.opacity = 255;
        this._big_card_front.configureGod(this.cardDefinitions.getCardAttribute(this.boardState.getValue(i).cardId, "Image_Big"), this.boardState.getValue(i).cardId);
        this.specialCardCamera.x = this.board_map[i % 4][parseInt(i / 4)][0];
        this.specialCardCamera.y = this.board_map[i % 4][parseInt(i / 4)][1];
        this._big_card_front.scale.x = 0.1;
        this._big_card_front.scale.y = 0.1;
        this.count_frames = 0;
        this.board_card_return = false;
        this.flashing_area = [];
        if (this.boardState.getValue(i).turn == 0)
            this.check_light_slot_action(i);
        this.phase = 5;
        this.moveImages.opacity = 0;
        this.attackImages.opacity = 0;
    }
    if (TouchInput.isTriggered()) {
        if (this._gyplayer1.isBeingTouched()) {
            this.graveyardLimit = 960
            this.player1_graveyard_show = this.player1_graveyard
            this.resetGraveyardPosition()
            this.phase = 11
            this.count_frames = 0;
            this.gyShowing = 1
        } else if (this._gyplayer2.isBeingTouched()) {
            this.graveyardLimit = 960
            this.player1_graveyard_show = this.player2_graveyard
            this.resetGraveyardPosition()
            this.phase = 11
            this.count_frames = 0;
            this.gyShowing = 2
        }
    }
};
//-----------------------------------------------------------------------------
// Function : resetGraveyardPosition
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.resetGraveyardPosition = function (opacity = 0) {
    this.onCastGraveyard = 0
    for (var n = 0; n < this.player1_graveyard_show.length; n++) {
        this.player1_graveyard_show[n][1].opacity = opacity
    }
}
//-----------------------------------------------------------------------------
// Function : check_hand_card_trigger
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.check_hand_card_trigger = function () {
    if (!this._cards_player_1[this.index]) { this._big_card_front.opacity = 0; return }
    var i = this.get_card_touch();
    if (i != -1 && (this.index != i || this._big_card_front.opacity == 0)) {
        this._big_card_front.opacity = 255;
        this.index = i;
        AudioManager.playSe({ name: "menu_select", pan: 0, pitch: 100, volume: 100 });
        this._big_card_front.configureGod(this.cardDefinitions.getCardAttribute(this.player_hand[this.index], "Image_Big"), this.player_hand[this.index])
    }
    this.specialCardCamera.x = this._cards_player_1[this.index].x;
    this.specialCardCamera.y = this._cards_player_1[this.index].y;
    this._big_card_front.rotation = this._cards_player_1[this.index].rotation;
    this._big_card_front.scale.x = 1
    this._big_card_front.scale.y = 1
    for (var n = 0; n < this._cards_player_1.length; n++) {
        if (this._cards_player_1[n].opacity > 100)
            this._cards_player_1[n].opacity -= 10;
    }
    this._cards_player_1[this.index].opacity += 20;
    if (TouchInput.isTriggered()) {
        this.extra_animations.length > 0 ? this.discard_card(i) : this.decision_card(i)
    };
};


//-----------------------------------------------------------------------------
// Function : discard_card
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.discard_card = function (i) {
    if (i != -1) {
        this.close_discard_animation()
    }
}

//-----------------------------------------------------------------------------
// Function : decision_card
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.decision_card = function (i) {
    if (i != -1) {
        this.board_place = i;
        this._cards_player_1[this.index].opacity = 0;
        this.phase = 5;
        this.check_light_slot(i);
        SoundManager.playCursor();
        this.count_frames = 0;
        this.board_card_return = true;
        this.has_cast_card = false;
        this.lock_move_cards = this.open_play_choices = false;
    }
}

//-----------------------------------------------------------------------------
// Function : get_board_touch
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.get_board_touch = function () {
    var infoHover = -1
    for (var i = 0; i < 16; i++) {
        if (this.board_light_slots[i].isFullButtonHovered())
            infoHover = i
        if (this.board_light_slots[i].isTriggered())
            return i;
    }
    this.updateShowInfoAction(infoHover)
    return -1;
};

//-----------------------------------------------------------------------------
// Function : get_card_touch - Gets the card by cursor
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.get_card_touch = function () {
    for (var i = this.player_hand.length - 1; i >= 0; i--)
        if (this._cards_player_1[i].isMiniButtonTouched())
            return i;
    return -1;
};

//////////////////////////// PHASE 5 //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : update_opacity - updates initial opacity
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.animate_big_card = function () {
    if (this.return_fase_4) {
        if (this.play_return_card_animation()) {
            this.count_frames = 0;
            this.check_light_slot(-1)
            this._descriptionText.text = new String()
            this.phase = 4;
            this.oldPosition = -1
            this.return_fase_4 = false;
        }
    } else if (this.count_frames == 1) {
    } else if (this.move_play_card_final_position()) {
        this._fade_screen_2.opacity += 10;
    } else {
        this._big_card_front.changeEuler(this.specialCardCamera.x, this.specialCardCamera.y);
        if (this.wait_choice_card_graveyard) {
            this.phase = 11
            this.count_frames = 0
        }
        var l = this.get_board_touch();
        if (TouchInput.isTriggered()) {
            this.count_frames = 29;
            this.return_fase_4 = true;
            if (l != -1 && this.flashing_area.includes(l)) {
                if (this.board_card_return) {
                    this.board_place = l;
                    this.execute_cast();
                } else if (this.on_special_skill) {
                    this.execute_special_skill(l);
                    this.on_special_skill = false;
                } else {
                    this.flashing_area_can_attack(l) ? this.proceed_attack(l) : this.proceed_move(l);
                }
            } else if (l == this.board_place && !this.board_card_return) {
                this.on_special_skill = false;
                if (this.on_special_skill) {
                    this.check_light_slot(-1);
                    return;
                }
                this.return_fase_4 = false;
                this.proceed_special_skill(l);
                return;
            }
            this.on_special_skill = false;
            this.check_light_slot(-1);
        }
    }
};
//-----------------------------------------------------------------------------
// Function : play_return_card_animation - card return animation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.play_return_card_animation = function () {
    this._fade_screen_2.opacity -= 20;
    this._big_card_front.opacity -= 20;
    this._big_card_front.euler.y -= 0.064;
    if (this._fade_screen_2.opacity > 0)
        return false;
    this._big_card_front.euler.y = 0;
    this._big_card_front.euler.x = 0;
    this._big_card_front.opacity = 0;
    if (this.board_card_return && !this.has_cast_card) {
        this._cards_player_1[this.index].opacity = 255;
        this._cards_player_1[this.index].x = this.specialCardCamera.x;
        this._cards_player_1[this.index].y = this.specialCardCamera.y;
        this._cards_player_1[this.index].rotation = this._big_card_front.rotation;
        this._cards_player_1[this.index].scale.x = this._big_card_front.scale.x;
        this._cards_player_1[this.index].scale.y = this._big_card_front.scale.y;
    };
    return true;
};
//-----------------------------------------------------------------------------
// Function : update_opacity - updates initial opacity
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.execute_cast = function () {
    if (!this.set_devotion(0, - parseInt(this.cardDefinitions.getCardAttribute(this.player_hand[this.index], "costDevotion")))) {
        SoundManager.playBuzzer();
        return false;
    }
    this.extra_animations.push(['Cast_Card', this.turn, this.player_hand[this.index], this.board_place, this.index, true]);
    return true;
};
//-----------------------------------------------------------------------------
// Function : castConfirmation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.castConfirmation = function () {
    var castAnimation = this.extra_animations[0]
    let cardName = this.cardDefinitions.getCardAttribute(castAnimation[2], 'Name')
    //this.updateChatLog("\nLog - {player} casts " + cardName + " on slot " + (castAnimation[3] + 1))
    var discard = castAnimation[4] != -1
    if (this.board_cards[castAnimation[3]] == -1) {
        this.board_cards[castAnimation[3]] = new Sprite_Card_Board(castAnimation[3], this.boardState, this.cardDefinitions)
        this.board_cards[castAnimation[3]].anchor.x = 0.5;
        this.board_cards[castAnimation[3]].anchor.y = 0.5;
        this.cardContainer.addChildZ(this.board_cards[castAnimation[3]], 0)
    }
    if (parseInt(this.cardDefinitions.getCardAttribute(castAnimation[2], 'cardType')) != "2") {
        this.board_add_data_id(castAnimation, discard);
    } else {
        this.sendCardGraveyard(castAnimation[1], castAnimation[2]);
        if (castAnimation[1] == 0)
            this._cards_player_1[castAnimation[4]].configureGod("");
        else {
            if (this._cards_player_2[castAnimation[4]])
                this._cards_player_2[castAnimation[4]].configureGod("");
        }

    }
    if (discard && castAnimation[1] == 0) {
        this._cards_player_1[castAnimation[4]].destroy()
        this._cards_player_1.splice(castAnimation[4], 1);
        this.player_hand.splice(castAnimation[4], 1);
    } else if (discard && castAnimation[1] == 1) {
        if (this._cards_player_2[castAnimation[4]]) {
            this._cards_player_2[castAnimation[4]].destroy()
            this._cards_player_2.splice(castAnimation[4], 1);
            this.npc_hand.splice(castAnimation[4], 1);
        }

    }

    this.index = 0
    this.count_frames = 0;
    this.has_cast_card = true;

}

//-----------------------------------------------------------------------------
// Function : move_play_card_final_position - updates initial opacity
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.move_play_card_final_position = function () {
    if (this.count_frames == 2) {
        let effect = 0
        if (this.index < this.player_hand.length) {
            let card = new KamigamiCard()
            if (this._big_card_front.oldId) {
                card.loadCardData(this._big_card_front.oldId, 0)
                effect = card.cardEffect
            }

        }
        if (effect == 211 || effect == 222 || effect == 110) {
            this.graveyardCardCorrection = 1400
        } else {
            this.graveyardCardCorrection = 0
        }

        this.dif_x = (270 - this.specialCardCamera.x) + this.graveyardCardCorrection;
        this.dif_y = (400 - this.specialCardCamera.y);
        this.dif_scale_x = 1 - this._big_card_front.scale.x;
        this.dif_scale_y = 1 - this._big_card_front.scale.y;
    }
    if (this.count_frames >= 30) {
        this.specialCardCamera.x = 270 + this.graveyardCardCorrection;
        this.specialCardCamera.y = 400;
        this._big_card_front.rotation = 0
        return false;
    } else {
        if (this._big_card_front.rotation > 0) {
            this._big_card_front.rotation -= 0.05;
            if (this._big_card_front.rotation < 0)
                this._big_card_front.rotation = 0;
        };
        if (this._big_card_front.rotation < 0) {
            this._big_card_front.rotation += 0.05;
            if (this._big_card_front.rotation > 0)
                this._big_card_front.rotation = 0;
        };
        //this._big_card_front.euler.y += 0.032;
        this._big_card_front.scale.x += this.dif_scale_x / 434 * (31 - this.count_frames);
        this._big_card_front.scale.y += this.dif_scale_y / 434 * (31 - this.count_frames);
        this.specialCardCamera.x += this.dif_x / 434 * (31 - this.count_frames);
        this.specialCardCamera.y += this.dif_y / 434 * (31 - this.count_frames);
    }
    return true;
};
//////////////////////////// PHASE 8 //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : proceed_move 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceed_move = function (l) {
    if (l != -1) {
        var apply_move = this.cardDefinitions.move_apply_effects(this.boardState.getValue(this.board_place))
        if (this.boardState.isEmpty(l) && this.flashing_area.includes(l) && this.set_devotion(0, - Math.max(0, apply_move))) {
            SoundManager.playOk();
            this.extra_animations.push(['Move_Card', this.board_place, l])
            this.phase = 5;
            return true;
        }
        else {
            SoundManager.playBuzzer();
            this.phase = 5;
            return false;
        }
    }
    return false;
};
//-----------------------------------------------------------------------------
// Function : check_light_slot_action
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.check_light_slot_action = function (index) {
    this.flashing_area = [];
    if (this.boardState.getValue(index).cardType == 3) {
        return;
    }
    if (this.boardState.left(index) && (this.boardState.left(index) == -1 || this.boardState.left(index).turn != this.turn)) {
        this.flashing_area.push(index - 1);
    }
    if (this.boardState.right(index) && (this.boardState.right(index) == -1 || this.boardState.right(index).turn != this.turn)) {
        this.flashing_area.push(index + 1);
    }
    if (this.boardState.up(index) && (this.boardState.up(index) == -1 || this.boardState.up(index).turn != this.turn)) {
        this.flashing_area.push(index - 4);
    }
    if (this.boardState.down(index) && (this.boardState.down(index) == -1 || this.boardState.down(index).turn != this.turn)) {
        this.flashing_area.push(index + 4);
    }
    this.loadActionAnimation("action", index)
};
//////////////////////////// PHASE 9 //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : proceed_special_skill
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceed_special_skill = function (l) {
    if (this.has_special_skill(l) && this.boardState.getValue(l).turn == 0) {
        this.on_special_skill = true;
        SoundManager.playOk();
        this.check_special_skill_area(l);
    }
    else {
        this.return_fase_4 = true;
        SoundManager.playBuzzer();
        this.phase = 5;
        this.check_light_slot(-1);
    }
};
//-----------------------------------------------------------------------------
// Function : check_special_skill_area
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.check_special_skill_area = function (l) {
    this.check_card_skill_definition_area(l);
};
//-----------------------------------------------------------------------------
// Function : proceed_attack
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceed_attack = function (l) {
    var apply_attack = this.cardDefinitions.attack_apply_effects(this.boardState.getValue(l), this.boardState.getValue(this.board_place), this.boardState)
    if (this.set_devotion(0, - Math.max(0, apply_attack))) {
        this.attack_target = l;
        this.extra_animations.push(['Attack_Card', this.turn, this.board_place, this.attack_target]);
        this.count_frames = 0;
        this.phase = 5;
        return true;
    }
    else {
        SoundManager.playBuzzer();
        this.phase = 5;
        this.check_light_slot(this.index);
        return false;
    }
};
//-----------------------------------------------------------------------------
// Function : flashing_area_can_attack
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.flashing_area_can_attack = function (index) {
    return this.boardState.hasCard(index) && this.boardState.getValue(index).turn != this.turn;
};
//////////////////////////// PHASE 10 //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : proceed_pass_turn
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceed_pass_turn = function () {
    $dataKamigami.duelData[2][1] += 1
    this.checkEndTurnEffects(this.turn);
    if (this.turn == 0) {
        this.turn = 1;
        this.turnAnimation.changeTurn(this.turn)
    }
    else {
        this.turn = 0;
        this.turnAnimation.changeTurn(this.turn)
    }

    this.player_proceed_draw(this.turn, 1);

    this.count_frames = 0;
    this.phase = 3;

};
//////////////////////////// AUX FUNCTIONS! //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : update_opacity - updates initial opacity
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.set_devotion = function (player, quantity, allow_negative = false, animation = false) {
    this.scoreDevotionWon(player, quantity, allow_negative)
    //if (this.phase != 3 && quantity > 0)
    //quantity = 0;
    if (player == 0) {
        if (this.devotion_player1 + quantity < 0 && !allow_negative)
            return false;
        this.devotion_player1 = Math.max(this.devotion_player1 + quantity, 0)
        this._devotion_player1.bitmap.clear();
        this._devotion_player1.bitmap.drawText(this.devotion_player1, 0, 0, 200, 80, 'center');
    } else if (player == 1) {
        if (this.devotion_player2 + quantity < 0 && !allow_negative)
            return false;
        this.devotion_player2 = Math.max(this.devotion_player2 + quantity, 0)
        this._devotion_player2.bitmap.clear();
        this._devotion_player2.bitmap.drawText(this.devotion_player2, 0, 0, 200, 80, 'center');
    } else
        if (this.devotion_player2 + quantity < 0 && !allow_negative)
            return false;
    if (animation && quantity != 0)
        this.playDevotionAnimation(player, animation);
    this.showDevotionAnimation(player, quantity);
    return true;
};
//-----------------------------------------------------------------------------
// Function : scoreDevotionWon
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.scoreDevotionWon = function (player, quantity) {
    if (quantity > 0)
        if (player == 0) {
            $dataKamigami.duelData[3][1] += quantity
        } else {
            $dataKamigami.duelData[4][1] += quantity
        }
    else if (this.turn == player) {
        if (player == 0 && this.devotion_player1 + quantity >= 0) {
            $dataKamigami.duelData[5][1] -= quantity
        } else if (player == 1 && this.devotion_player2 + quantity >= 0) {
            $dataKamigami.duelData[6][1] -= quantity
        }
    }
}


//-----------------------------------------------------------------------------
// Function : player_proceed_discard
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.player_proceed_discard = function (player, num, effectCard) {
    if (player == 0) {
        this.discard_animation_player = num
        if (this.player_hand.length > 0)
            this.extra_animations.push(['Discard_Player', num, effectCard]);
    } else {
        this.discard_animation_player = num
        if (this.npc_hand.length > 0)
            this.extra_animations.push(['Discard_Opponent', num, effectCard]);
    }
};
//-----------------------------------------------------------------------------
// Function : player_proceed_discard
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.player_proceed_discard_effect = function (player, num, effectCard) {
    this.extra_animations.shift()
    if (player == 0) {
        this.discard_animation_player = num
        if (this.player_hand.length > 0)
            this.extra_animations.unshift(['Discard_Player', num, effectCard]);
    } else {
        this.discard_animation_player = num
        if (this.npc_hand.length > 0)
            this.extra_animations.unshift(['Discard_Opponent', num, effectCard]);
    }
    this.extra_animations.unshift("decoy")
};


//-----------------------------------------------------------------------------
// Function : player_proceed_draw
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.player_proceed_draw = function (player, num) {
    if (player == 0) {
        $dataKamigami.duelData[8][1] += num
        for (var n = 0; n < num; n++) {
            this.extra_animations.push(['Draw_Player']);
        }
    }
    if (player == 1) {
        for (var n = 0; n < num; n++) {
            this.extra_animations.push(['Draw_Opponent']);
        }

    }
};
//-----------------------------------------------------------------------------
// Function : player_proceed_draw
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.player_proceed_draw_effect = function (player, num) {
    this.extra_animations.shift()
    if (player == 0) {
        for (var n = 0; n < num; n++) {
            this.extra_animations.unshift(['Draw_Player']);
        }
    }
    if (player == 1) {
        for (var n = 0; n < num; n++) {
            this.extra_animations.unshift(['Draw_Opponent']);
        }
    }
    this.extra_animations.unshift("decoy")
};
//-----------------------------------------------------------------------------
// Function : set_final_card_hand_position
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.set_final_card_hand_position = function (card, card_num, player) {
    var final_angle = this.get_final_position(player, card_num)[2] - card.rotation;
    var final_x = this.get_final_position(player, card_num)[0] - card.x;
    var card_acceleration_x = final_x / 20;
    var final_y = this.get_final_position(player, card_num)[1] - card.y;
    var card_acceleration_y = final_y / 20;
    card.x += card_acceleration_x;
    card.y += card_acceleration_y;
    card.rotation += final_angle / 20;
    if (Math.abs(card_acceleration_x) < 0.05 && Math.abs(card_acceleration_y) < 0.05) {
        card.x = this.get_final_position(player, card_num)[0];
        card.y = this.get_final_position(player, card_num)[1];
        return true;
    }
    var final_scale = card.scale.x - 0.6;
    final_scale /= 20;
    card.scale.x -= final_scale;
    card.scale.y -= final_scale;
    if (card.scale.y <= 0.6) {
        card.scale.x = 0.6;
        card.scale.y = 0.6;
    }
    return false;
};
//-----------------------------------------------------------------------------
// Function : set_final_card_hand_position
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.set_final_card_hand_position_play = function (card, card_num, hand_size = this._cards_player_1.length, limit = 960) {
    if (!card) { return }
    var final_angle = this.get_final_position_play(card_num, hand_size, limit)[2] - card.rotation;
    var final_x = this.get_final_position_play(card_num, hand_size, limit)[0] - card.x;
    var card_acceleration_x = final_x / 20;
    var final_y = this.get_final_position_play(card_num, hand_size, limit)[1] - card.y;
    var card_acceleration_y = final_y / 20;
    card.x += card_acceleration_x;
    card.y += card_acceleration_y;
    card.rotation += final_angle / 20;
    if (Math.abs(card_acceleration_x) < 0.05 && Math.abs(card_acceleration_y) < 0.05) {
        card.x = this.get_final_position_play(card_num, hand_size, limit)[0];
        card.y = this.get_final_position_play(card_num, hand_size, limit)[1];
        return true;
    }
    if (card.scale.x < 0.8) {
        card.scale.x += 0.05;
        card.scale.y += 0.05;
        if (card.scale.y > 0.8)
            card.scale.y = card.scale.x = 0.8;
    }
    if (card.scale.y > 0.8) {
        card.scale.x -= 0.05;
        card.scale.y -= 0.05;
        if (card.scale.y < 0.8)
            card.scale.y = card.scale.x = 0.8;
    }

    return false;
};

//-----------------------------------------------------------------------------
// Function : get_right_position
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.get_final_position = function (player, card_num) {
    var hand_size
    player == 0 ? hand_size = this._cards_player_1.length : hand_size = this._cards_player_2.length;
    if (hand_size % 2 == 1)
        var mid = parseInt((hand_size) / 2);
    else
        var mid = hand_size / 2 - 0.5;
    if (player == 0) {
        var right_x = (card_num - mid) * parseInt(600 / hand_size) + 960;
        var right_y = Math.abs(card_num - mid) * parseInt(100 / hand_size) + 1180;
        if (mid == card_num) {
            right_y += parseInt(50 / hand_size);
        }
        var right_angle = (card_num - mid) * (0.5 / hand_size)
    } else {
        right_x = (card_num - mid) * parseInt(600 / hand_size) + 960;
        right_y = - (Math.abs(card_num - mid) * parseInt(100 / hand_size) + 90);
        if (mid == card_num) {
            right_y -= parseInt(50 / hand_size);
        }
        var right_angle = Math.PI * player - (card_num - mid) * (0.5 / hand_size);
    }
    return [right_x, right_y, right_angle]
};
//-----------------------------------------------------------------------------
// Function : get_right_position
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.get_final_position_play = function (card_num, hand_size, limit = 960) {
    if (hand_size % 2 == 1)
        var mid = parseInt((hand_size) / 2);
    else
        var mid = hand_size / 2 - 0.5;
    var right_x = (card_num - mid) * parseInt((limit * 2 - 320) / hand_size) + limit;
    var right_y = 500;
    var right_angle = 0;
    return [right_x, right_y, right_angle]
};
//-----------------------------------------------------------------------------
// Function : set_hp
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.set_hp = function (id, value, attacking = false, cardId) {
    if (id == -1 || value == 0) { return }
    var boardState = this.boardState;
    console.log("Vida", value)
    if (boardState.getValue(id).specialType == 4 && boardState.getValue(id).cardType != 0) {
        value = this.applyJaci(value, boardState.getValue(id), boardState.getValue(id).turn)
    }
    console.log("Vida2", value)
    if (value == -1000 && boardState.getValue(id).cardEffect == 38) { return }
    this.scoreDamage(value, boardState.getValue(id).hp, boardState.getValue(id).turn)
    var hp = Math.max(boardState.getValue(id).hp + value, 0);
    hp = Math.min(boardState.getValue(id).mhp, hp);
    boardState.getValue(id).hp = hp;
    if (hp == 0 && boardState.getValue(id).turn == 1) { $dataKamigami.duelData[9][1] += 1 }
    if (hp == 0 && boardState.getValue(id).turn == 0) { $dataKamigami.duelData[10][1] += 1 }
    if (hp == 0 && boardState.getValue(id).cardType == 0) { this.callEndGame(boardState.getValue(id).turn, id) }
    if (hp == 0 && attacking) { this.apply_thor(this.turn, cardId) }
    if (hp == 0 && boardState.getValue(id).turn != this.turn && this.extra_animations[0] &&
        this.cardDefinitions.getCardAttribute(this.extra_animations[0][2], "cardType") == 2) { this.applyTupan() }
    if (hp == 0) {
        this.extra_animations.push(['Send_Graveyard', id, boardState.getValue(id).turn, boardState.getValue(id).cardId])
        this.cardDefinitions.removeBoardCard(this.boardState.getValue(id))
        this.boardState.cleanValue(id)
    }
    this._hpWindow.write_hp(this.board_cards)
};
//-----------------------------------------------------------------------------
// Function : scoreDamage
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.scoreDamage = function (damage, remainingHP, turn) {
    if (damage < 0) {
        damage *= -1
        if (turn == 1)
            $dataKamigami.duelData[0][1] += Math.min(damage, remainingHP)
        else
            $dataKamigami.duelData[1][1] += Math.min(damage, remainingHP)
    }

}


//-----------------------------------------------------------------------------
// Function : board_add_data
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.board_add_data_id = function (castAnimation, fromHand) {
    var cardId = castAnimation[2]
    var boardPlace = castAnimation[3]
    var index = castAnimation[4]
    this.boardState.addValue(boardPlace, new KamigamiCard())
    if (this.turn == 1) {
        this.boardState.getValue(boardPlace).loadCardData(cardId, 1)
        //if (fromHand)
        //this.board_cards[boardPlace] = this._cards_player_2[index];
    } else {
        this.boardState.getValue(boardPlace).loadCardData(cardId, 0)
        //this.board_cards[boardPlace] = this._cards_player_1[index];
    }
};
//-----------------------------------------------------------------------------
// Function : board_add_data
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.board_add_data = function (index, cardId = false) {
    this.boardState.addValue(this.board_place, new KamigamiCard())
    if (this.turn == 1) {
        this.boardState.getValue(this.board_place).loadCardData(cardId, 1)
        this.board_cards[this.board_place] = this._cards_player_2[index];
    } else {
        this.boardState.getValue(this.board_place).loadCardData(this.player_hand[this.index], 0)
        this.board_cards[this.board_place] = this._cards_player_1[this.index];
    }
};
//-----------------------------------------------------------------------------
// Function : equalize_positions
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.equalize_positions = function (sprite1, sprite2) {
    sprite1.x = sprite2.x
    sprite1.y = sprite2.y
};

//-----------------------------------------------------------------------------
// Function : getOppositeTurn
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.getOppositeTurn = function () {
    if (this.turn == 0)
        return 1
    else
        return 0
};

//////////////////////////// GRAVEYARD MANAGEMENT! //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : sacrificeCard
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.sacrificeCard = function (board_place) {
    this.set_hp(board_place, -1000)
}
//-----------------------------------------------------------------------------
// Function : exileCard
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.exileCard = function (turn, index, id) {
    this.resetExtraAnimation()
    this.extra_animations.unshift(["Exile_Card", turn, index, -1])
    this.extra_animations.unshift(["Effect_Card", id, 109, turn])
    this.extra_animations.unshift("decoy")
}
//-----------------------------------------------------------------------------
// Function : exileCard
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.exileCardDarkForest = function (turn, index, id, boardPosition) { 
    this.resetExtraAnimation()
    this.extra_animations.unshift(["Exile_Card", turn, index, boardPosition])
    this.extra_animations.unshift(["Effect_Card", id, 117, turn])
    this.extra_animations.unshift("decoy")
}
//-----------------------------------------------------------------------------
// Function : randomizeGySlot
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.randomizeGySlot = function (turn) {
    let rotation = Math.random() * Math.PI - Math.PI / 2
    if (turn == 0) {
        var x = Math.randomInt(50) - 25 + 140 + this._gyplayer1.x
        var y = Math.randomInt(50) - 25 + 140 + this._gyplayer1.y
    } else {
        var x = Math.randomInt(50) - 25 + 140 + this._gyplayer2.x
        var y = Math.randomInt(50) - 25 + 140 + this._gyplayer2.y
    }

    return [rotation, x, y]
}


//-----------------------------------------------------------------------------
// Function : sendCardGraveyard
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.sendCardGraveyard = function (turn, id, rotation = null, x = 0, y = 0) {
    if (rotation == null)
        [rotation, x, y] = this.randomizeGySlot(turn)
    var card_name = this.cardDefinitions.getCardAttribute(id, "Image_Big")
    var gyImage = new SpriteStaticGod()
    gyImage.configureGod(card_name, id)
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
// Function : removeCardGraveyard
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.removeTopCardGraveyard = function (turn) {
    // TODO - Animation
    this.extra_animations.push(['ExileGraveyard', turn, 1])
}

//-----------------------------------------------------------------------------
// Function : removeCardGraveyard
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.removeCardGraveyard = function (turn, id, index = 0) {
    var countIndex = -1
    this.onlineGYIndex = -1
    if (turn == 0) {
        for (var n = 0; n < this.player1_graveyard.length; n++) {
            if (this.player1_graveyard[n][0] == id) { countIndex++ }
            if (countIndex == index) {
                this.player1_graveyard[n][1].bitmap = ""
                this.player1_graveyard[n][1].opacity = 0
                this.player1_graveyard[n][1].destroy()
                this.removeChild(this.player1_graveyard[n][1])
                this.player1_graveyard.splice(n, 1);
                this.onlineGYIndex = n;
                return true
            }

        }
    } else
        for (var n = 0; n < this.player2_graveyard.length; n++) {
            if (this.player2_graveyard[n][0] == id) { countIndex++ }
            if (countIndex == index) {
                this.player2_graveyard[n][1].opacity = 0
                this.player2_graveyard[n][1].destroy()
                this.removeChild(this.player2_graveyard[n][1])
                this.player2_graveyard.splice(n, 1);
                return true
            }

        }
    return false
};

//-----------------------------------------------------------------------------
// Function : removeCardGraveyard
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.removeCardGraveyardByIndex = function (turn, index) {
    if (turn == 0) {
        this.player1_graveyard[index][1].bitmap = ""
        this.player1_graveyard[index][1].opacity = 0
        this.player1_graveyard[index][1].destroy()
        this.removeChild(this.player1_graveyard[index][1])
        this.player1_graveyard.splice(index, 1);
    } else {
        this.player2_graveyard[index][1].bitmap = ""
        this.player2_graveyard[index][1].opacity = 0
        this.player2_graveyard[index][1].destroy()
        this.removeChild(this.player2_graveyard[index][1])
        this.player2_graveyard.splice(index, 1);
    }
};

//-----------------------------------------------------------------------------
// Function : removeCardGraveyard
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.removeCardGraveyardNotImage = function (turn, id, index) {
    if (turn == 0) {
        this.player1_graveyard.splice(index, 1);
    } else
        this.player2_graveyard.splice(index, 1);
    return false
};

//-----------------------------------------------------------------------------
// Function : update_graveyard
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.update_graveyard = function () {
    if (this.player1_graveyard_show.length == 0) {
        this.close_graveyard_phase()
        return
    }
    for (var n = 0; n < this.player1_graveyard_show.length; n++) {
        this.set_final_card_hand_position_play(this.player1_graveyard_show[n][1], n, this.player1_graveyard_show.length, this.graveyardLimit);
    }
    if (this.count_frames < 15) {
        for (var n = 0; n < this.player1_graveyard_show.length; n++)
            this.player1_graveyard_show[n][1].opacity += 10;
    } else if (this.count_frames >= 60) {
        this.wait_for_click_gy_card()
    }
}
//-----------------------------------------------------------------------------
// Function : close_graveyard_phase
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.close_graveyard_phase = function (cardsIncluded = []) {
    this.resetBigCard()
    this.check_light_slot(-1)
    this._descriptionText.text = new String()
    this.phase = 4
    this.oldPosition = -1
    this.wait_choice_card_graveyard = false
    this._fade_screen_2.opacity = 0
    this.extra_animations.push(['ReturnGraveyard', this.gyShowing, cardsIncluded])

}
//-----------------------------------------------------------------------------
// Function : sendCardGraveyard
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.wait_for_click_gy_card = function () {
    var i = this.get_card_touch_graveyard();
    if (i != -1) {
        this._big_card_front2.opacity = 255;
        //AudioManager.playSe({ name: "menu_select", pan: 0, pitch: 100, volume: 100 });
        this._big_card_front2.configureGod(this.cardDefinitions.getCardAttribute(this.player1_graveyard_show[i][0], "Image_Big"), this.player1_graveyard_show[i][0]);
        this._big_card_front2.x = this.player1_graveyard_show[i][1].x - 960;
        this._big_card_front2.y = this.player1_graveyard_show[i][1].y - 540;
        this._big_card_front2.rotation = this.player1_graveyard_show[i][1].rotation;
        this._big_card_front2.scale.x = this.player1_graveyard_show[i][1].scale.x;
        this._big_card_front2.scale.y = this.player1_graveyard_show[i][1].scale.y;
    } else {
        this._big_card_front2.opacity = 0;
    }
    if (TouchInput.isTriggered()) {
        this._big_card_front2.opacity = 0
        if (i != -1 && this.gyShowing == 1) {
            var cardEffect = parseInt(this.cardDefinitions.getCardAttribute(this.player1_graveyard_show[i][0], "cardEffect"));
            if (this.onCastGraveyard != 0) {
                this.callEffectGraveyard(i)
                this.close_graveyard_phase([i])
                return
            } else if (cardEffect == 45) {
                this.onCastGraveyard = 45
                this.callEffectGraveyard(i)
                this.close_graveyard_phase([i])
                return
            } else if (cardEffect == 23) {
                this.onCastGraveyard = 23
                this.callEffectGraveyard(i)
                this.close_graveyard_phase([i])
                return
            }

        }
        this.close_graveyard_phase()
    }
}
//-----------------------------------------------------------------------------
// Function : callEffectGraveyard 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.callEffectGraveyard = function (i) {
    var effectArea = parseInt(this.cardDefinitions.getCardAttribute(this.player1_graveyard_show[i][0], "effectArea"));
    this.flashingAreaConfirm(0, this.npc_hand, this.boardState, effectArea)
    switch (this.onCastGraveyard) {
        case 211: // Revive
            this.cardDefinitions.addExtraSkillById(this.player1_graveyard_show[i][0], 211);
            this.cardDefinitions.getExtraSkills()[0][4] = true
            break
        case 37: // Anubis
            this.cardDefinitions.addExtraSkillById(this.player1_graveyard_show[i][0], 37);
            this.cardDefinitions.getExtraSkills()[0][4] = true
            break
        case 45: // Mummy
            this.cardDefinitions.addExtraSkillById(this.player1_graveyard_show[i][0], 45);
            this.cardDefinitions.getExtraSkills()[0][4] = true
            break
        case 23: // Phoenix
            this.cardDefinitions.addExtraSkillById(this.player1_graveyard_show[i][0], 23);
            this.cardDefinitions.getExtraSkills()[0][4] = true
            break
        case 222: // Time Reflow
            if (this.set_devotion(this.turn, - parseInt(this.cardDefinitions.getCardAttribute(this.player_hand[this.index], "costDevotion")))) {
                this.addCardFromGraveyardToHand(this.turn, this.player1_graveyard_show[i], i, this.player_hand[this.index])
                this.extra_animations.push(['ReturnGraveyard', this.gyShowing, [i]]);
                this.extra_animations.push(['Cast_Card', this.turn, this.player_hand[this.index], this.board_place, this.index, true]);
                this.return_fase_4 = true
            }
            break
        case 47: // Suzano
            this.addCardFromGraveyardToHand(this.turn, this.player1_graveyard_show[i], i)
            break
        case 110: // Set
            this.cardDefinitions.addExtraSkillById(this.player1_graveyard_show[i][0], 110);
            this.cardDefinitions.getExtraSkills()[0][4] = true
            break
    }
    this.on_special_skill = false;
}
//-----------------------------------------------------------------------------
// Function : addCardFromGraveyardToHand - Gets a card from the gy to hand
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.addCardFromGraveyardToHand = function (turn, gyCard, index) {
    let i
    if (turn == 0) {
        i = this.player1_graveyard.indexOf(gyCard)
        this.player_hand.push(gyCard[0])
        this.fixZOrder(gyCard[1], 0)
        this._cards_player_1.push(gyCard[1])

    } else {
        i = this.player2_graveyard.indexOf(gyCard)
        this.npc_hand.push(gyCard[0])
        this._cards_player_2.push(gyCard[1])
        gyCard[1].configureGod("Back_Card")
        gyCard[1].opacity = 255
    }
    this.removeCardGraveyardNotImage(turn, gyCard[0], i);
}
//-----------------------------------------------------------------------------
// Function : fixZOrder
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.fixZOrder = function (gyCard, player) {
    let zOrder = 0
    if (player == 0) {
        if (this._cards_player_1.length > 0) {
            zOrder = this._cards_player_1[this._cards_player_1.length - 1].zOrder - 1
        } else {
            zOrder = this._cards_player_1_all[40 - this.player_cards.length].zOrder
        }
    }
    gyCard.zOrder = zOrder
}


//-----------------------------------------------------------------------------
// Function : get_card_touch_graveyard - Gets the card by cursor
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.get_card_touch_graveyard = function () {
    for (var i = 0; i < this.player1_graveyard_show.length; i++)
        if (this.player1_graveyard_show[i][1].isBeingTouched())
            return i;
    return -1;
};



