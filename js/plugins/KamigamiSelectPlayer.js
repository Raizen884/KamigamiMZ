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
    this.createVariables();
    this.createBackground();
    this.createBgPanels();
    this.createPlayersBlack();
    this.createPlayers();
    this.createButtonBack();
    this.createMenuLight();
    this.createMenuOptions();
    this.createText();
    this.createNameInput();
    this.createEditButton();
}
//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.createVariables = function () {
    this.phase = 0;
    this.selectedPlayer = 0;
    this.countFrame = 0;
}
//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.createBackground = function () {
    this._bg = new Sprite();
    this._bg.bitmap = ImageManager.loadSelectPlayer("background");
    this._bg.anchor.y = 0.5;
    this._bg.y = 540;
    this._bg.scale.y = 0
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
        this._bgPanels[n].x = 1200
    }
}

//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.createPlayersBlack = function () {

    this._playerContainer = new SContainer();
    this.addChild(this._playerContainer);
    this._playersBlack = new Array();
    for (let n = 0; n < 2; n++) {
        this._playersBlack[n] = new Sprite();
        this._playersBlack[n].bitmap = ImageManager.loadSelectPlayer(`player${n + 1}`);
        this._playersBlack[n].x = 2400 + n * 300
        this._playersBlack[n].filters = [new PIXI.filters.ColorOverlayFilter([0, 0, 0], [0, 0, 0], 0.001)];
        this._playersBlack[n].anchor.x = 0.5
        //this._players[n].filters[0].color = "#FFFFFF"
        this._playerContainer.addChild(this._playersBlack[n]);
    }
    this._playersBlack[1].scale.x = -1
}
//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.createPlayers = function () {
    this._players = new Array();
    for (let n = 0; n < 2; n++) {
        this._players[n] = new Sprite();
        this._players[n].bitmap = ImageManager.loadSelectPlayer(`player${n + 1}`);
        this._players[n].x = 1200
        this._players[n].anchor.x = 0.5
        //this._players[n].filters[0].color = "#FFFFFF"
        this._players[n].opacity = 0;
        this.addChild(this._players[n]);
    }
}
//-----------------------------------------------------------------------------
// Function : createMenuOptions
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.createMenuLight = function () {
    this._textSelectLight = new Sprite_Kami_ButtonLight(0, "selectPlayer1", 70, 0x19FF47);
    this.addChild(this._textSelectLight);
    this._textSelectLight.opacity = 0
    this._textSwitchLight = new Sprite_Kami_ButtonLight(0, "selectPlayer2", 70, 0x19FF47);
    this._textSwitchLight.y = 1080 - 257
    this._textSwitchLight.opacity = 0
    this.addChild(this._textSwitchLight);

};
//-----------------------------------------------------------------------------
// Function : createMenuOptions
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.createMenuOptions = function () {
    this._textSelect = new Sprite_Kami_Button(0, "selectPlayer1", 70);
    this.addChild(this._textSelect);
    this._textSelect.opacity = 0
    this._textSwitch = new Sprite_Kami_Button(0, "selectPlayer2", 70);
    this._textSwitch.y = 1080 - 257
    this.addChild(this._textSwitch);
    this._textSwitch.opacity = 0

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
    this._buttonBack[0].opacity = 0;
    this._buttonBack[1].opacity = 0;
    this._buttonBack[0].x = this._buttonBack[1].x = -600
}
//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.createText = function () {
    this._descriptionSelectPlayer = new PIXI.Text("", { fontFamily: 'GameFont', fontSize: 46, fill: 0xffffff, align: 'left', bold: true, dropShadow: true, dropShadowBlur: 6 });
    this._descriptionSelectPlayer.text = IAVRA.I18N.localize("#{DuelVocab.MenuText.selectPlayer}")
    this.addChild(this._descriptionSelectPlayer);
    this._descriptionSelectPlayer.y = 300
    this._descriptionSelectPlayer.x = 40
    this._descriptionSelectPlayer.alpha = 0
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
    chatInput.placeholder = 'Lilian'
    chatInput.x = 210
    chatInput.y = 500
    chatInput.text = "";
    chatInput.alpha = 0;
    chatInput.select();
    //chatInput.pivot.x = chatInput.width / 2
    //chatInput.pivot.y = chatInput.height / 2
    this.addChild(chatInput)
}

//-----------------------------------------------------------------------------
// Function : createEditButton
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.createEditButton = function () {
    this.btnEdit = new Sprite_Clickable();
    this.btnEdit.bitmap = ImageManager.loadSelectPlayer("btnEdit");
    this.addChild(this.btnEdit);
    this.btnEdit.x = 100
    this.btnEdit.y = 502
    this.btnEdit.opacity = 0;

}


//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    this.countFrame++;
    switch (this.phase) {
        case 0:
            this.enteringScene();
            break;

        case 1:
            this.updateMainScene();
            break;
        case 2:
            this.switchPlayers();
            break;
    }
}

//-----------------------------------------------------------------------------
// Function : enteringScene
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.enteringScene = function () {
    if (this._bg.scale.y < 1) {
        this._bg.scale.y += 0.1
        if (this._bg.scale.y >= 1) {
            this._bg.scale.y = 1
        }
        this.countFrame = 0;
        return;
    }
    if (this._bgPanels[0].x > 0 && this.countFrame > 7) {
        this._bgPanels[0].x -= (this._bgPanels[0].x/10 + 1)
        if (this._bgPanels[0].x <= 0) {
            this._bgPanels[0].x = 0
        }
    }
    if (this._bgPanels[1].x > 0 && this.countFrame > 13) {
        this._bgPanels[1].x -= (this._bgPanels[1].x/10 + 1)
        if (this._bgPanels[1].x <= 0) {
            this._bgPanels[1].x = 0
        }
    }
    if (this._bgPanels[2].x > 0 && this.countFrame > 20) {
        this._bgPanels[2].x -= (this._bgPanels[2].x/10 + 1)
        if (this._bgPanels[2].x <= 0) {
            this._bgPanels[2].x = 0
        }
    }

    if (this._buttonBack[0].x < 0) {
        this._buttonBack[0].x += (-this._buttonBack[0].x/10 + 1)
        this._buttonBack[0].opacity += 15
        if (this._buttonBack[0].x >= 0) {
            this._buttonBack[0].x = 0;
        }
    }

    if (this._buttonBack[1].x < 0 && this.countFrame > 13) {
        this._buttonBack[1].x += (-this._buttonBack[1].x/10 + 1)
        this._buttonBack[1].opacity += 15
        if (this._buttonBack[1].x >= 0) {
            this._buttonBack[1].x = 0;
        }
    }

    if (this._playersBlack[0].x > 1200 && this.countFrame > 26) {
        this._playersBlack[0].x -= ((this._playersBlack[0].x - 1200)/10 + 1)
        if (this._playersBlack[0].x <= 1200) {
            this._playersBlack[0].x = 1200
        }
    }

    if (this._playersBlack[1].x > 1500 && this.countFrame > 35) {
        this._playersBlack[1].x -= ((this._playersBlack[1].x - 1500)/10 + 1)
        if (this._playersBlack[1].x <= 1500) {
            this._playersBlack[1].x = 1500
        }
    }
    if (this._textSelect.opacity < 180 && this.countFrame > 26){
        this._textSelect.opacity += 15
        if (this._textSelect.opacity > 180) {
            this._textSelect.opacity = 0
        }
    }
    if (this._textSwitch.opacity < 180 && this.countFrame > 35){
        this._textSwitch.opacity += 15
        if (this._textSwitch.opacity > 180) {
            this._textSwitch.opacity = 0
        }
    }

    if (this._players[0].opacity < 255 && this.countFrame > 55){
        this._players[0].opacity += 15
    }

    if (this.countFrame > 50 && this._descriptionSelectPlayer.alpha < 1) {
        this._descriptionSelectPlayer.alpha += 0.05
        if (this._descriptionSelectPlayer.alpha >= 1) {
            this._descriptionSelectPlayer.alpha = 1
        }
    }

    if (this.countFrame > 50 && chatInput.alpha < 1) {
        chatInput.alpha += 0.05
        if (chatInput.alpha >= 1) {
            chatInput.alpha = 1
        }
    }

    if (this.countFrame > 50 && this.btnEdit.opacity < 255) {
        this.btnEdit.opacity += 15
    }
    if (this.countFrame > 80) {
        this.phase = 1
    }

}

//-----------------------------------------------------------------------------
// Function : updateMainScene
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.updateMainScene = function () {
    if (this.btnEdit.isBeingTouched()) {
        this.btnEdit.opacity = 255;
    } else {
        this.btnEdit.opacity = 180
    }
    let btnHover = this.updateButtons();
    if (TouchInput.isTriggered()) {
        if (this.btnEdit.isBeingTouched()) {
            chatInput.select();
            return;
        }
        if (btnHover != 0)
            this.checkButton(btnHover);
    }
}

//-----------------------------------------------------------------------------
// Function : updateButtons
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.updateButtons = function () {
    let btnHover = 0
    if (this._textSelect.isButtonHovered() || this._textSelect.isBeingTouched()) {
        this._textSelectLight.opacity += 20;
        btnHover = 1;
    } else
        this._textSelectLight.opacity -= 20;
    if (this._textSwitch.isButtonHovered() || this._textSwitch.isBeingTouched()) {
        this._textSwitchLight.opacity += 20;
        btnHover = 2;
    } else
        this._textSwitchLight.opacity -= 20;
    return btnHover;
}
//-----------------------------------------------------------------------------
// Function : checkButton
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.checkButton = function (btnHover) {
    switch (btnHover) {
        case 1:
            
            break;
    
        case 2:
            this.phase = 2;
            this.countFrame = 0;
            this.selectedPlayer = 1 - this.selectedPlayer
            break;
    }
}

//-----------------------------------------------------------------------------
// Function : switchPlayers
//-----------------------------------------------------------------------------
Scene_Kamigami_Select_Player.prototype.switchPlayers = function () {
    let oldPlayer = this._players[1 - this.selectedPlayer]
    let newPlayer = this._players[this.selectedPlayer]
    let oldPlayerShadow = this._playersBlack[1 - this.selectedPlayer]
    let newPlayerShadow = this._playersBlack[this.selectedPlayer]
    if (oldPlayer.opacity > 0){
        oldPlayer.opacity -= 20
        this.countFrame = 0;
        return;
    }
    if (this.countFrame < 25) {
        oldPlayerShadow.x += (25 - this.countFrame)
        if (oldPlayerShadow.scale.x > -1) {
            oldPlayerShadow.scale.x -= 0.1
            if (oldPlayerShadow.scale.x < -1) {
                oldPlayerShadow.scale.x = -1
            }
        }
        if (newPlayerShadow.scale.x < 1) {
            newPlayerShadow.scale.x += 0.1
            if (newPlayerShadow.scale.x > 1) {
                newPlayerShadow.scale.x = 1
            }
        }
        newPlayerShadow.x -= (25 - this.countFrame)
        return;
    }
    if (newPlayer.opacity < 255){
        newPlayer.opacity += 20
        return;
    }
    if (chatInput.text == "") {
        if (this.selectedPlayer == 0) {
            chatInput.placeholder = "Lilian"
        }
        else {
            chatInput.placeholder = "Shaun"
        }
    }
    this.phase = 1;
}



