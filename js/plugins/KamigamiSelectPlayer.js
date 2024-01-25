ImageManager.loadSelectPlayer = function (filename, hue) {
    return this.loadBitmap('img/player_select/', filename, hue, true);
};

//-----------------------------------------------------------------------------
// Scene_Title
//
// The scene class of the title screen.

function Scene_Kamigami_Select_Player() {
    this.initialize.apply(this, arguments);
}

Scene_Kamigami_Select_Player.prototype = Object.create(Scene_Base.prototype);
Scene_Kamigami_Select_Player.prototype.constructor = Scene_Kamigami_Select_Player;


//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    this.createBackground();
    this.createBgPanels();
    this.createPlayers();
    this.createButtonBack();
    this.createMenuLight();
    this.createMenuOptions();
    this.createText();
    this.createNameInput();
}
//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.createBackground = function () {
    this._bg = new Sprite();
    this._bg.bitmap = ImageManager.loadSelectPlayer("background");
    this.addChild(this._bg);
}

//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.createBgPanels = function () {
    this._bgPanels = new Array();
    for (let n = 0; n < 3; n++) {
        this._bgPanels[n] = new Sprite();
        this._bgPanels[n].bitmap = ImageManager.loadSelectPlayer(`bg_${n + 1}`);
        this.addChild(this._bgPanels[n]);
    }
}

//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.createPlayers = function () {
    this._playerContainer = new SContainer();
    this.addChild(this._playerContainer);
    this._players = new Array();
    for (let n = 0; n < 2; n++) {
        this._players[n] = new Sprite();
        this._players[n].bitmap = ImageManager.loadSelectPlayer(`player${n + 1}`);
        this._players[n].x = 600 + n * 300
        this._playerContainer.addChild(this._players[n]);
    }
    this._players[0].zOrder = 1
    this._playerContainer.sortChildren();
}
//-----------------------------------------------------------------------------
// Function : createMenuOptions
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.createMenuLight = function () {
    this._textSelectLight = new Sprite_Kami_ButtonLight(0, "selectPlayer1", 70);
    this.addChild(this._textSelectLight);
    this._textSwitchLight = new Sprite_Kami_ButtonLight(0, "selectPlayer2", 70);
    this._textSwitchLight.y = 1080 - 257
    this.addChild(this._textSwitchLight);

};
//-----------------------------------------------------------------------------
// Function : createMenuOptions
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.createMenuOptions = function () {
    this._textSelect = new Sprite_Kami_Button(0, "selectPlayer1", 70);
    this.addChild(this._textSelect);
    this._textSelect.opacity = 180
    this._textSwitch = new Sprite_Kami_Button(0, "selectPlayer2", 70);
    this._textSwitch.y = 1080 - 257
    this.addChild(this._textSwitch);
    this._textSwitch.opacity = 180

};
//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.createButtonBack = function () {
    this._buttonBack = new Array();
    this._buttonBack[0] = new Sprite();
    this._buttonBack[0].bitmap = ImageManager.loadSelectPlayer("backSelect");
    this.addChild(this._buttonBack[0]);

    this._buttonBack[1] = new Sprite();
    this._buttonBack[1].bitmap = ImageManager.loadSelectPlayer("backSwitch");
    this._buttonBack[1].y = 1080 - 257
    this.addChild(this._buttonBack[1]);

}
//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.createText = function () {
    this._descriptionSelectPlayer = new PIXI.Text("", { fontFamily: 'GameFont', fontSize: 46, fill: 0xffffff, align: 'left', bold: true, dropShadow: true, dropShadowBlur: 3});
    this._descriptionSelectPlayer.text = IAVRA.I18N.localize("#{DuelVocab.MenuText.selectPlayer}")
    this.addChild(this._descriptionSelectPlayer);
    this._descriptionSelectPlayer.y = 300
    this._descriptionSelectPlayer.x = 40
}

//-----------------------------------------------------------------------------
// Function : createNameInput
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.createNameInput = function () {
    chatInput = new PIXI.TextInput({
        input: {
            fontFamily: 'Arial',
            fontSize: '36px',
            padding: '12px',
            width: '430px',
            color: '#26272E'
        },
        box: {
            default: { fill: 0xE8E9F3, rounded: 12, stroke: { color: 0xCBCEE0, width: 3 } },
            focused: { fill: 0xE1E3EE, rounded: 12, stroke: { color: 0xABAFC6, width: 3 } },
            disabled: { fill: 0xDBDBDB, rounded: 12 }
        }
    })
    chatInput.setInputStyle('fontFamily', 'Chau Philomene One')
    chatInput.setInputStyle('fontSize', 36 + 'px')
    chatInput.setInputStyle('fontWeight', 'normal')
    chatInput.setInputStyle('padding', 14 + 'px')
    chatInput.placeholder = 'Player Name!'
    chatInput.x = 110
    chatInput.y = 10
    chatInput.text = "";
    chatInput.alpha = 0;
    //chatInput.pivot.x = chatInput.width / 2
    //chatInput.pivot.y = chatInput.height / 2
    this.addChild(chatInput)
}
//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
}

