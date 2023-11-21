const _lobbyMenu_initialize = Scene_Kamigami_Lobby.prototype.initialize
//-----------------------------------------------------------------------------
// Function : initialize - initiates the graphics
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.initialize = function () {
    _lobbyMenu_initialize.call(this);
    this.startInfoVariables();
    this.createFadeScreen();
    this.createPrizeMenuBG();
    this.createPrizes();
    this.createRanksInfo();
    this.createRanksText();
    this.createLobbyLine();
    this.createPrizeTexts();


};
Scene_Kamigami_Lobby.prototype.createPrizeTexts = function () {
    let text = IAVRA.I18N.localize("#{DuelVocab.MenuText.lobbyText2}")
    this._prizeMainText = new PIXI.Text(text, { fontFamily: 'GameFont', fontSize: 36, fill: 0xffffff, align: 'left', wordWrap: true, wordWrapWidth: 1400 });
    this.addChild(this._prizeMainText)
    this._prizeMainText.x = 250
    this._prizeMainText.y = 430
    this._prizeMainText.alpha = 0;

    this._prizeDescriptions = []
    for (let n = 0; n < 4; n++) {
        text = IAVRA.I18N.localize(`#{DuelVocab.MenuText.lobbyPrizes${n + 1}}`)
        this._prizeDescriptions[n] = new PIXI.Text(text, { fontFamily: 'GameFont', fontSize: 36, fill: 0xffffff, align: 'left', wordWrap: true, wordWrapWidth: 1400 });
        this.addChild(this._prizeDescriptions[n]);
        this._prizeDescriptions[n].x = 300 + n * 400 + (100 - this._prizeDescriptions[n].width / 2)
        this._prizeDescriptions[n].y = 880
        this._prizeDescriptions[n].alpha = 0;
    }
}
Scene_Kamigami_Lobby.prototype.createLobbyLine = function () {
    this._lobbyLine = new Sprite();
    this._lobbyLine.bitmap = ImageManager.loadOnlineMenu("lineLobby");
    this.addChild(this._lobbyLine);
    this._lobbyLine.anchor.x = 0.5;
    this._lobbyLine.x = Graphics.width / 2
    this._lobbyLine.y = 350;
    this._lobbyLine.opacity = 0
}
Scene_Kamigami_Lobby.prototype.createRanksText = function () {
    let text = IAVRA.I18N.localize("#{DuelVocab.MenuText.lobbyText1}")
    this._rankMainText = new PIXI.Text(text, { fontFamily: 'GameFont', fontSize: 36, fill: 0xffffff, align: 'left' });
    this.addChild(this._rankMainText)
    this._rankMainText.x = 250
    this._rankMainText.y = 130
    this._rankMainText.alpha = 0

    this._rankDescriptions = []
    for (let n = 0; n < 5; n++) {
        text = IAVRA.I18N.localize(`#{DuelVocab.MenuText.lobbyrank${n + 1}}`)
        this._rankDescriptions[n] = new PIXI.Text(text, { fontFamily: 'GameFont', fontSize: 28, fill: 0xffffff, align: 'left' });
        this.addChild(this._rankDescriptions[n]);
        this._rankDescriptions[n].x = 600 + n * 250 + (65 - this._rankDescriptions[n].width / 2)
        this._rankDescriptions[n].y = 300
        this._rankDescriptions[n].alpha = 0
    }
}


Scene_Kamigami_Lobby.prototype.createRanksInfo = function () {
    this._rankInfoImg = []
    this._rankArrows = []
    for (let n = 0; n < 5; n++) {
        this._rankInfoImg[n] = new Sprite();
        this._rankInfoImg[n].bitmap = ImageManager.loadOnlineMenu(`rank${n + 1}`);
        this.addChild(this._rankInfoImg[n]);
        this._rankInfoImg[n].scale.x = this._rankInfoImg[n].scale.y = 0.5;
        this._rankInfoImg[n].x = 600 + n * 250
        this._rankInfoImg[n].y = 150
        this._rankInfoImg[n].alpha = 0;
    }
    for (let n = 0; n < 4; n++) {
        this._rankArrows[n] = new Sprite();
        this._rankArrows[n].bitmap = ImageManager.loadOnlineMenu("prizeArrow");
        this.addChild(this._rankArrows[n]);
        this._rankArrows[n].x = 734 + n * 250
        this._rankArrows[n].y = 180
        this._rankArrows[n].alpha = 0;
    }
}


Scene_Kamigami_Lobby.prototype.createPrizes = function () {
    this._prizesShadow = new Sprite();
    this._prizesShadow.bitmap = ImageManager.loadOnlineMenu("prizes");
    this.addChild(this._prizesShadow);
    this._prizesShadow.opacity = 0;
}


Scene_Kamigami_Lobby.prototype.createFadeScreen = function () {
    this._fadeScreen = new Sprite();
    this._fadeScreen.bitmap = ImageManager.loadKamigami("shop_fade");
    this.addChild(this._fadeScreen);
    this._fadeScreen.opacity = 0;
}
Scene_Kamigami_Lobby.prototype.createPrizeMenuBG = function () {
    this._prizeBG = new Sprite_Card();
    this._prizeBG.bitmap = ImageManager.loadOnlineMenu("prizesMenuBack");
    this.addChild(this._prizeBG);
    this._prizeBG.anchor.x = this._prizeBG.anchor.y = 0.5
    this._prizeBG.x = Graphics.width / 2
    this._prizeBG.y = Graphics.height / 2
    this._prizeBG.scale.y = 0
}


Scene_Kamigami_Lobby.prototype.startInfoVariables = function () {
    this.arrowMovement = false;
}


const _lobbyMenu_update = Scene_Kamigami_Lobby.prototype.update
//-----------------------------------------------------------------------------
// Function : update
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.update = function () {
    _lobbyMenu_update.call(this);
    //this.countFrames++
    switch (this.phase) {
        case 2:
            //this.mainArrowUpdate();
            break;
        case 5:
            this.openingMenu();
            break;
        case 6:
            this.waitingForActionPrize();
            break;
        case 7:
            this.closingMenu();
            break;
        default:
            break;
    }
};
//-----------------------------------------------------------------------------
// Function : openingMenu
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.openingMenu = function () {
    if (this._fadeScreen.opacity < 170) {
        this._fadeScreen.opacity += 10
    }


    if (this._prizeBG.scale.y < 1) {
        this._prizeBG.scale.y += 0.05
        if (this._prizeBG.scale.y > 1) {
            this._prizeBG.scale.y = 1
        }
        return;
    }
    this._prizesShadow.opacity += 10;
    this._lobbyLine.opacity += 10;
    if (this._rankMainText.alpha < 1) this._rankMainText.alpha += 0.04;
    if (this._prizeMainText.alpha < 1) this._prizeMainText.alpha += 0.04;

    this._rankInfoImg.forEach(element => {
        if (element.alpha < 1) element.alpha += 0.04;
    });
    this._rankDescriptions.forEach(element => {
        if (element.alpha < 1) element.alpha += 0.04;
    });
    this._rankArrows.forEach(element => {
        if (element.alpha < 1) element.alpha += 0.04;
    });

    this._prizeDescriptions.forEach(element => {
        if (element.alpha < 1) element.alpha += 0.04;
    });
    if (this._lobbyLine.opacity == 255) {
        this.phase = 6;
    }
}
//-----------------------------------------------------------------------------
// Function : waitingForActionPrize
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.waitingForActionPrize = function () {
    if (TouchInput.isTriggered()) {
        AudioManager.playSe({ name: "button", pan: 0, pitch: 100, volume: 250 });
        this.phase = 7;
    }
}

//-----------------------------------------------------------------------------
// Function : closingMenu
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.closingMenu = function () {

    this._prizesShadow.opacity -= 10;
    this._lobbyLine.opacity -= 10;
    if (this._rankMainText.alpha > 0) this._rankMainText.alpha -= 0.04;
    if (this._prizeMainText.alpha > 0) this._prizeMainText.alpha -= 0.04;

    this._rankInfoImg.forEach(element => {
        if (element.alpha > 0) element.alpha -= 0.04;
    });
    this._rankDescriptions.forEach(element => {
        if (element.alpha > 0) element.alpha -= 0.04;
    });
    this._rankArrows.forEach(element => {
        if (element.alpha > 0) element.alpha -= 0.04;
    });

    this._prizeDescriptions.forEach(element => {
        if (element.alpha > 0) element.alpha -= 0.04;
    });
    if (this._lobbyLine.opacity > 0) {
        return
    }
    if (this._prizeBG.scale.y > 0) {
        this._prizeBG.scale.y -= 0.05
        if (this._prizeBG.scale.y < 0) {
            this._prizeBG.scale.y = 0
        }
        return;
    }


    this._fadeScreen.opacity -= 10
    if (this._fadeScreen.opacity == 0) {
        this.phase = 2
    }
}
