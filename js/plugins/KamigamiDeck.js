/*:
* @plugindesc Special Item Shop.
* @author Raizen (Mauricio Pastana)

 * @param Enemy Creation
 * @type struct<EnemyCreation>[]

*/
/*~struct~EnemyCreation:
 * @param Name
 * @type text
 * @param Card List
 * @type number[]
 * @param God Card
 * @type number
 * @param X Position
 * @type number
 * @default 0
 * @param Y Position
 * @type number
 * @default 0
 * @param Requirement
 * @type text[]
*/
//-----------------------------------------------------------------------------
// Triple Triad Image Handler
//
// The scene class of the battle screen.

ImageManager.loadAlbum = function (filename, hue) {
    return this.loadBitmap('img/card_album/', filename, hue, true);
};

//=============================================================================
// KamigamiDecks
// Description: Deck Choice Scene
//=============================================================================


function Scene_Kamigami_Decks() {
    this.initialize.apply(this, arguments);
}

Scene_Kamigami_Decks.prototype = Object.create(Scene_Base.prototype);
Scene_Kamigami_Decks.prototype.constructor = Scene_Kamigami_Decks;

//-----------------------------------------------------------------------------
// Function : initialize - initiates the graphics
//-----------------------------------------------------------------------------
Scene_Kamigami_Decks.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    this.load_parameters();
    this.initialize_variables();
    this.create_background();
    this.createWindowLayer();
    this.create_Window();
    this.create_boosterPacks();
    this.create_cursor();
    this.create_buttons();
    this.update_deck_index(this.movement_boosters[3]);
};
//-----------------------------------------------------------------------------
// Function : draw_card
//-----------------------------------------------------------------------------
Scene_Kamigami_Decks.prototype.draw_card = function (index) {
    if (this.decks[index][1].length == 0)
        this._bigCard.configureGod("Back_Card");
    else {
        this._bigCard.bitmap = ImageManager.loadKamigami(JSON.parse(this.card_list[this.decks[index][1][0]])["Image_Big"]);
    }

    this.addChild(this._bigCard);
    this._bigCard.x = Graphics.width / 2 - 165;
};
Scene_Kamigami_Decks.prototype.create_Window = function () {
    this._deckInfo = new Window_Deck_Info();
    this.addWindow(this._deckInfo);
};

//-----------------------------------------------------------------------------
// Function : load_parameters
//-----------------------------------------------------------------------------
Scene_Kamigami_Decks.prototype.load_parameters = function () {
    this.card_list = JSON.parse(PluginManager.parameters('KamigamiDuel')['Card Creation']);
    AudioManager.playBgm({ name: "Magic Cards", pan: 0, pitch: 100, volume: 90 });
};
//-----------------------------------------------------------------------------
// Function : initialize_variables
//-----------------------------------------------------------------------------
Scene_Kamigami_Decks.prototype.initialize_variables = function () {
    this.phase = 0;
    this.movement_boosters_array = [96, 97, 98, 0, 1, 2, 3];
    this.movement_boosters = [96, 97, 98, 0, 1, 2, 3];
    this.movement_boosters_distance = 150;
    this.movement_boosters_center = Graphics.width / 2;
    this.frame_count = 0;
    this.decks_rotation = 0;
    this.decks = $dataKamigami.decks;
    this._bigCard = new Sprite();
};

//-----------------------------------------------------------------------------
// Function : initialize_variables
//-----------------------------------------------------------------------------
Scene_Kamigami_Decks.prototype.create_background = function () {
    this._backSprite = new Sprite();
    this._backSprite.bitmap = ImageManager.loadAlbum("album_back");
    this.addChild(this._backSprite);
};

//-----------------------------------------------------------------------------
// Function : create_boosterPacks
//-----------------------------------------------------------------------------
Scene_Kamigami_Decks.prototype.create_boosterPacks = function () {
    this.booster_imgs = new Array();
    for (var n = 0; n < 99; n++) {
        this.booster_imgs[n] = new Sprite();
        this.booster_imgs[n].bitmap = ImageManager.loadAlbum("deck_box_" + this.decks[n][0]);
        this.addChild(this.booster_imgs[n]);
        this.booster_imgs[n].x = 1500;
        this.booster_imgs[n].y = 550;
        this.booster_imgs[n].scale.x = 0;
        this.booster_imgs[n].scale.y = 0;
        this.booster_imgs[n].anchor.x = 0.5;
        this.booster_imgs[n].anchor.y = 0.5;
    }

};

//-----------------------------------------------------------------------------
// Function : create_buttons
//-----------------------------------------------------------------------------
Scene_Kamigami_Decks.prototype.create_buttons = function () {
    this._chooseDeckBtn = new Sprite_Clickable();
    this._chooseDeckBtn.bitmap = ImageManager.loadAlbum("ChooseDeck");
    this.addChild(this._chooseDeckBtn);
    this._chooseDeckBtn.x = 10;
    this._chooseDeckBtn.y = 40;
    this._editDeckBtn = new Sprite_Clickable();
    this._editDeckBtn.bitmap = ImageManager.loadAlbum("EditDeck");
    this.addChild(this._editDeckBtn);
    this._editDeckBtn.x = 10;
    this._editDeckBtn.y = 150;
    this._eraseDeckBtn = new Sprite_Clickable();
    this._eraseDeckBtn.bitmap = ImageManager.loadAlbum("EraseDeck");
    this.addChild(this._eraseDeckBtn);
    this._eraseDeckBtn.x = 10;
    this._eraseDeckBtn.y = 260;
    this._changeBoxBtn = new Sprite_Clickable();
    this._changeBoxBtn.bitmap = ImageManager.loadAlbum("ChangeBox");
    this.addChild(this._changeBoxBtn);
    this._changeBoxBtn.x = 10;
    this._changeBoxBtn.y = 370;
};
//-----------------------------------------------------------------------------
// Function : create_cursor
//-----------------------------------------------------------------------------
Scene_Kamigami_Decks.prototype.create_cursor = function () {
    this._leftCursor = new Sprite_Clickable();
    this._leftCursor.bitmap = ImageManager.loadAlbum("arrowLeft");
    this.addChild(this._leftCursor);
    this._leftCursor.x = 10;
    this._leftCursor.y = 520;
    this._leftCursor10 = new Sprite_Clickable();
    this._leftCursor10.bitmap = ImageManager.loadAlbum("arrowLeft10");
    this.addChild(this._leftCursor10);
    this._leftCursor10.x = 130;
    this._leftCursor10.y = 520;
    this._rightCursor = new Sprite_Clickable();
    this._rightCursor.bitmap = ImageManager.loadAlbum("arrowRight");
    this.addChild(this._rightCursor);
    this._rightCursor.x = 1020;
    this._rightCursor.y = 520;
    this._rightCursor10 = new Sprite_Clickable();
    this._rightCursor10.bitmap = ImageManager.loadAlbum("arrowRight10");
    this.addChild(this._rightCursor10);
    this._rightCursor10.x = 890;
    this._rightCursor10.y = 520;
};


//-----------------------------------------------------------------------------
// Function : update
//-----------------------------------------------------------------------------
Scene_Kamigami_Decks.prototype.update = function () {
    this.frame_count++;
    Scene_Base.prototype.update.call(this);
    switch (this.phase) {
        case 0:
            this.update_booster_movement();
            break;
        case 1:
            this.close_all_windows();
            break;
        case 2:
            this.proceed_buy_booster();
            break;
    }

};

//////////////////////////// PHASE 0 //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : update_booster_movement
//-----------------------------------------------------------------------------
Scene_Kamigami_Decks.prototype.update_booster_movement = function () {
    if (this.needs_move_boosters())
        return;
    if (this.decks_rotation > 0) {
        this.decks_rotation--;
        this.movement_boosters = this.rotate_array(this.movement_boosters, 1);
        this.movement_boosters_array = this.movement_boosters;
        this.update_deck_index(this.movement_boosters[3]);
        return;
    }
    else if (this.decks_rotation < 0) {
        this.decks_rotation++;
        this.movement_boosters = this.rotate_array(this.movement_boosters, -1);
        this.movement_boosters_array = this.movement_boosters;
        this.update_deck_index(this.movement_boosters[3]);
        return;
    }
    this.update_hover();
    if (TouchInput.isTriggered()) {
        if (this._changeBoxBtn._touching) {
            if (this.decks[this.movement_boosters[3]][0] < 6)
                this.decks[this.movement_boosters[3]][0]++;
            else
                this.decks[this.movement_boosters[3]][0] = 1;

            this.booster_imgs[this.movement_boosters[3]].bitmap = ImageManager.loadAlbum("deck_box_" + this.decks[this.movement_boosters[3]][0]);

        }
        if (this._leftCursor._touching) {
            this.movement_boosters = this.rotate_array(this.movement_boosters, -1);
            this.movement_boosters_array = this.movement_boosters;
            this.update_deck_index(this.movement_boosters[3]);
        }
        if (this._leftCursor10._touching) {
            this.decks_rotation = -10;
            this.movement_boosters_array = this.movement_boosters;
            this.update_deck_index(this.movement_boosters[3]);
        }
        if (this._rightCursor._touching) {
            this.movement_boosters = this.rotate_array(this.movement_boosters, 1);
            this.movement_boosters_array = this.movement_boosters;
            this.update_deck_index(this.movement_boosters[3]);
        }
        if (this._rightCursor10._touching) {
            this.decks_rotation = 10;
            this.movement_boosters_array = this.movement_boosters;
            this.update_deck_index(this.movement_boosters[3]);
        }
    }
};


Scene_Kamigami_Decks.prototype.needs_move_boosters = function () {
    this.count_booster = 0;
    if (this.movement_boosters_array.length != 0) {
        for (var n = 0; n < this.movement_boosters_array.length; n++)
            this.move_boosters(this.movement_boosters_array[n], n);
        if (this.count_booster == 7) {
            this.movement_boosters_array = [];
        }
        return true;
    }
    return false;
};

//-----------------------------------------------------------------------------
// Function : move_boosters
//-----------------------------------------------------------------------------
Scene_Kamigami_Decks.prototype.move_boosters = function (boosterId, index) {
    var divider = 1;
    if (this.decks_rotation != 0)
        divider = 2;
    var absIndex = index - 3;
    var trueDist = this.movement_boosters_center + this.movement_boosters_distance * absIndex;
    if (this.booster_imgs[boosterId].x > trueDist) {
        this.booster_imgs[boosterId].x -= this.movement_boosters_distance / (10 / divider);
        if (this.booster_imgs[boosterId].x < trueDist)
            this.booster_imgs[boosterId].x = trueDist;
    }
    else if (this.booster_imgs[boosterId].x < trueDist) {
        this.booster_imgs[boosterId].x += this.movement_boosters_distance / (10 / divider);
        if (this.booster_imgs[boosterId].x > trueDist)
            this.booster_imgs[boosterId].x = trueDist;
    }
    var scale = (this.movement_boosters_center - this.booster_imgs[boosterId].x) / 400;
    if (scale < 0)
        scale *= -1;
    scale = 1 - scale;
    if (scale < 0)
        scale = 0;
    this.booster_imgs[boosterId].scale.x = scale;
    this.booster_imgs[boosterId].scale.y = scale;
    this.booster_imgs[boosterId].opacity = scale * 255;
    if (this.booster_imgs[boosterId].x == trueDist) {
        this.count_booster++;
    }
};

//-----------------------------------------------------------------------------
// Function : update_deck_index
//-----------------------------------------------------------------------------
Scene_Kamigami_Decks.prototype.update_deck_index = function (index) {
    this._deckInfo.write_deck_info(index);
    this.draw_card(index);
};


//////////////////////////// AUX FUNCTIONS //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : update_booster_movement
//-----------------------------------------------------------------------------
Scene_Kamigami_Decks.prototype.rotate_array = function (array, direction) {
    var new_array = new Array(7);
    if (direction == 1) {
        new_array[1] = array[0];
        new_array[2] = array[1];
        new_array[3] = array[2];
        new_array[4] = array[3];
        new_array[5] = array[4];
        new_array[6] = array[5];
        if (array[0] - 1 >= 0)
            new_array[0] = array[0] - 1;
        else
            new_array[0] = this.booster_imgs.length - 1;
        this.booster_imgs[new_array[0]].x = -60;
    }
    else {
        new_array[5] = array[6];
        new_array[4] = array[5];
        new_array[3] = array[4];
        new_array[2] = array[3];
        new_array[1] = array[2];
        new_array[0] = array[1];
        if (array[6] + 1 < this.booster_imgs.length)
            new_array[6] = array[6] + 1;
        else
            new_array[6] = 0;
        this.booster_imgs[new_array[6]].x = 1150;
    }
    return new_array;
};

//-----------------------------------------------------------------------------
// Function : update_hover_opacity
//-----------------------------------------------------------------------------
Scene_Kamigami_Decks.prototype.update_hover = function () {
    var btn = 0;
    if (this._chooseDeckBtn.isButtonHovered()) {
        if (this._chooseDeckBtn.opacity <= 170)
            SoundManager.playCursor();
        this._chooseDeckBtn.opacity += 10;
        btn = 1;
    }
    if (this._editDeckBtn.isButtonHovered()) {
        if (this._editDeckBtn.opacity <= 170)
            SoundManager.playCursor();
        this._editDeckBtn.opacity += 10;
        btn = 2;
    }
    if (this._eraseDeckBtn.isButtonHovered()) {
        if (this._eraseDeckBtn.opacity <= 170)
            SoundManager.playCursor();
        this._eraseDeckBtn.opacity += 10;
        btn = 3;
    }
    if (this._changeBoxBtn.isButtonHovered()) {
        if (this._changeBoxBtn.opacity <= 170)
            SoundManager.playCursor();
        this._changeBoxBtn.opacity += 10;
        btn = 4;
    }
    if (this._leftCursor.isButtonHovered()) {
        if (this._leftCursor.opacity <= 170)
            SoundManager.playCursor();
        this._leftCursor.opacity += 10;
        btn = 5;
    }
    if (this._leftCursor10.isButtonHovered()) {
        if (this._leftCursor10.opacity <= 170)
            SoundManager.playCursor();
        this._leftCursor10.opacity += 10;
        btn = 6;
    }
    if (this._rightCursor.isButtonHovered()) {
        if (this._rightCursor.opacity <= 170)
            SoundManager.playCursor();
        this._rightCursor.opacity += 10;
        btn = 7;
    }
    if (this._rightCursor10.isButtonHovered()) {
        if (this._rightCursor10.opacity <= 170)
            SoundManager.playCursor();
        this._rightCursor10.opacity += 10;
        btn = 8;
    }
    this.update_hover_opacity(btn);
};
//-----------------------------------------------------------------------------
// Function : update_hover_opacity
//-----------------------------------------------------------------------------
Scene_Kamigami_Decks.prototype.update_hover_opacity = function (btn) {
    if (btn != 1) {
        if (this._chooseDeckBtn.opacity > 170)
            this._chooseDeckBtn.opacity -= 10;
    }
    if (btn != 2) {
        if (this._editDeckBtn.opacity > 170)
            this._editDeckBtn.opacity -= 10;
    }
    if (btn != 3) {
        if (this._eraseDeckBtn.opacity > 170)
            this._eraseDeckBtn.opacity -= 10;
    }
    if (btn != 4) {
        if (this._changeBoxBtn.opacity > 170)
            this._changeBoxBtn.opacity -= 10;
    }
    if (btn != 5) {
        if (this._leftCursor.opacity > 170)
            this._leftCursor.opacity -= 10;
    }
    if (btn != 6) {
        if (this._leftCursor10.opacity > 170)
            this._leftCursor10.opacity -= 10;
    }
    if (btn != 7) {
        if (this._rightCursor.opacity > 170)
            this._rightCursor.opacity -= 10;
    }
    if (btn != 8) {
        if (this._rightCursor10.opacity > 170)
            this._rightCursor10.opacity -= 10;
    }
};



function Window_Deck_Info() {
    this.initialize.apply(this, arguments);
}

Window_Deck_Info.prototype = Object.create(Window_Base.prototype);
Window_Deck_Info.prototype.constructor = Window_Deck_Info;

Window_Deck_Info.prototype.initialize = function () {
    var width = Graphics.width - 740;
    var height = 500;
    Window_Base.prototype.initialize.call(this, 740, 0, width, height);
    this.write_deck_info(0);
};


Window_Deck_Info.prototype.write_deck_info = function (index) {
    this.contents.clear();
    this.drawText("Deck Number :", 5, this.lineHeight() * 2);
    this.drawText("S Cards     :", 5, this.lineHeight() * 4);
    this.drawText("A Cards     :", 5, this.lineHeight() * 5);
    this.drawText("B Cards     :", 5, this.lineHeight() * 6);
    this.drawText("Units       :", 5, this.lineHeight() * 7);
    this.drawText("Spells      :", 5, this.lineHeight() * 8);
    this.drawText("Monuments   :", 5, this.lineHeight() * 9);
    this.drawText("Devotion avg:", 5, this.lineHeight() * 10);
    this.drawText(index + 1, 0, this.lineHeight() * 2, this.width - 40, 'right');
    if ($dataKamigami.decks[index][1].length == 0) {
        this.drawText("No saved deck", 0, 0);
        this.drawText("???", 0, this.lineHeight() * 4, this.width - 40, 'right');
        this.drawText("???", 0, this.lineHeight() * 5, this.width - 40, 'right');
        this.drawText("???", 0, this.lineHeight() * 6, this.width - 40, 'right');
        this.drawText("???", 0, this.lineHeight() * 7, this.width - 40, 'right');
        this.drawText("???", 0, this.lineHeight() * 8, this.width - 40, 'right');
        this.drawText("???", 0, this.lineHeight() * 9, this.width - 40, 'right');
        this.drawText("???", 0, this.lineHeight() * 10, this.width - 40, 'right');
    }
    else {
        this.drawText($dataKamigami.decks[index][1][1], 0, 0);
    }
    //this.drawText(this.card_list["Rules"], -20, 0, this.width, 'center');
    //this.contents.fontSize = 24;
    //this.drawText(this.card_list["Plus"], 0, this.lineHeight());
    //this.drawTextEx(JSON.parse(this.card_list["One"]), 0, this.lineHeight() * 9);



};

Window_Base.prototype.drawIcon = function (iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
};

