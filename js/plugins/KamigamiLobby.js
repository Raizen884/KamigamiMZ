ImageManager.loadOnlineMenu = function (filename, hue) {
    return this.loadBitmap('img/online_menu/', filename, hue, true);
};

//=============================================================================
// KamigamiDecks
// Description: Deck Choice Scene
//=============================================================================


function Scene_Kamigami_Lobby() {
    this.initialize.apply(this, arguments);
}

Scene_Kamigami_Lobby.prototype = Object.create(Scene_Base.prototype);
Scene_Kamigami_Lobby.prototype.constructor = Scene_Kamigami_Lobby;

//-----------------------------------------------------------------------------
// Function : initialize - initiates the graphics
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    AudioManager.playBgm({ name: "Tutorial", pan: 0, pitch: 100, volume: 100 });
    this.createContainer();
    this.createVariables();
    this.createBackGround();
    this.createFakeCenter();
    this.createContainerGod();
    this.createGod();
    this.createBackGround2();
    this.createBackOptions();
    this.createTextOptions();
    this.createDeckList();
    this.createBackFriendList();

    this.createTexts();
    this.createAvatarBack();
    this.loadAvatar()
    if (!this.successLoad) {
        this.createDirectOptions();
        this.phase = 20;
        return;
    }

    this.createFriendTextList();
    this.createFriendsBar();
    this.createDeckBar();
    this.resetPositions();

    this.createDirectOptions();
    this.createTip();

};

//-----------------------------------------------------------------------------
// Function : createTip
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.createTip = function () {
    this.tipText = new PIXI.Text(new String(), { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0xffffff, align: 'left', dropShadow: true, dropShadowBlur: 4, dropShadowDistance: 2 });
    this.addChild(this.tipText)
    this.tipText.text = IAVRA.I18N.localize("#{DuelVocab.MenuText.tip04}")
    this.tipText.y = 1000
    this.tipText.x = Graphics.width / 2 - this.tipText.width / 2
    this.tipMovement = false
    this.tipText.alpha = 0
}

Scene_Kamigami_Lobby.prototype.createDirectOptions = function () {
    this.createBackgroundDirect();
    this.createBackOptionsDirect();
    this.createTextOptionsDirect();
    this.createNameInput();
    this.createJoinRoomText();
}
//-----------------------------------------------------------------------------
// Function : createJoinRoomText
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.createJoinRoomText = function () {
    let text = IAVRA.I18N.localize("#{DuelVocab.MenuText.lobbyJoin}")

    this.joinRoomText = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 36, fill: 0xffffff, align: 'left' });
    this.addChild(this.joinRoomText)
    this.joinRoomText.x = (Graphics.width - this.joinRoomText.width) / 2
    this.joinRoomText.y = 290
    this.joinRoomText.alpha = 0;
}




//-----------------------------------------------------------------------------
// Function : createNameInput
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.createNameInput = function () {
    this.chatSpriteView = new Sprite_Clickable()
    this.chatSpriteView.bitmap = new Bitmap(400, 200)
    this.chatSpriteView.x = (Graphics.width - 430) / 2;
    this.chatSpriteView.y = 400
    this.chatSpriteView.opacity = 0
    this.addChild(this.chatSpriteView)
    this.chatInput = new PIXI.TextInput({
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
    this.chatInput.setInputStyle('fontFamily', 'Chau Philomene One')
    this.chatInput.setInputStyle('fontSize', 36 + 'px')
    this.chatInput.setInputStyle('fontWeight', 'normal')
    this.chatInput.setInputStyle('padding', 14 + 'px')
    this.chatInput.placeholder = 'Room!'

    this.chatInput.text = "";
    this.chatInput.alpha = 1;
    //chatInput.pivot.x = chatInput.width / 2
    //chatInput.pivot.y = chatInput.height / 2
    this.chatSpriteView.addChild(this.chatInput)
}
//-----------------------------------------------------------------------------
// Function : createBackgroundDirect - initiates and handles the connection
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.createBackgroundDirect = function () {
    this._fadeScreenDirect = new Sprite();
    this._fadeScreenDirect.bitmap = ImageManager.loadKamigami("shop_fade");
    this._fadeScreenDirect.opacity = 0;
    this.addChild(this._fadeScreenDirect)
};


//-----------------------------------------------------------------------------
// Function : createTextOptions
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.createTextOptionsDirect = function () {
    this.txtLightsDirect = new Array()
    let displacement
    for (let n = 0; n < 3; n++) {
        displacement = n % 2 == 0 ? 60 : -60
        let text;
        if (n == 2) {
            text = 'onlineMenuLobby1'
        } else {
            text = `lobbyDirect${n + 1}`
        }
        this.txtLightsDirect[n] = new Sprite_Kami_ButtonLight(n % 2, text, displacement, 0x00AF90);
        this.addChild(this.txtLightsDirect[n])
        if (Math.floor(n / 2) == 1) {
            this.txtLightsDirect[n].y = 1080 - 250
        } if (n % 2 == 1) {
            this.txtLightsDirect[n].x = 1920 - 500
        }
        this.txtLightsDirect[n].opacity = 0
    }

    this.txtButtonsDirect = new Array()
    for (let n = 0; n < 3; n++) {
        displacement = n % 2 == 0 ? 60 : -60
        if (n == 2) {
            text = 'onlineMenuLobby1'
        } else {
            text = `lobbyDirect${n + 1}`
        }
        this.txtButtonsDirect[n] = new Sprite_Kami_Button(n % 2, text, displacement);
        this.txtButtonsDirect[n].opacity = 190
        this.addChild(this.txtButtonsDirect[n])
        if (Math.floor(n / 2) == 1) {
            this.txtButtonsDirect[n].y = 1080 - 250
        } if (n % 2 == 1) {
            this.txtButtonsDirect[n].x = 1920 - 500
        }
        this.txtButtonsDirect[n].opacity = 0
    }
};


//-----------------------------------------------------------------------------
// Function : createBackOptions
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.createBackOptionsDirect = function () {
    let backNames = ['onlineBackFind', 'onlineBackDirect', 'onlineBackReturn']
    this.btnBackDirect = new Array()
    for (let n = 0; n < 3; n++) {
        this.btnBackDirect[n] = new Sprite_Clickable();
        this.btnBackDirect[n].bitmap = ImageManager.loadOnlineMenu(backNames[n])
        this.addChild(this.btnBackDirect[n])
        if (Math.floor(n / 2) == 1) {
            this.btnBackDirect[n].y = 1080 - 258
        } if (n % 2 == 1) {
            this.btnBackDirect[n].x = 1920 - 649
        }
        this.btnBackDirect[n].opacity = 0;
    }
};


Scene_Kamigami_Lobby.prototype.createFakeCenter = function () {
    this.centerSprite = new Sprite_Card();
    this.centerSprite.bitmap = ImageManager.loadTitle1("center_effects");
    this.container.addChild(this.centerSprite);
    this.centerSprite.x = Graphics.width / 2;
    this.centerSprite.y = Graphics.height / 2;

};
Scene_Kamigami_Lobby.prototype.createAvatarBack = function () {
    this._avatarGlow = new Sprite_Card()
    this._avatarGlow.bitmap = ImageManager.loadOnlineMenu("rankGlow")
    this.container.addChild(this._avatarGlow)
    this._avatarGlow.anchor.x = 0.5
    this._avatarGlow.anchor.y = 0.5
    this._avatarGlow.x = Graphics.width / 2
    this._avatarGlow.y = 137
    this._avatarGlow.opacity = 0;
}


//-----------------------------------------------------------------------------
// Function : createContainerGod
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.createContainerGod = function () {
    this.containerGod = new PIXI.Container();
    this.container.addChild(this.containerGod);
    this._displacementGod = new Sprite();
    this._displacementGod.bitmap = ImageManager.loadDisplacement("map14");
    this._displacementGod.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this._displacementGod.scale.set(2);
    this._displacementGod.anchor.set(0.5);
    this.containerGod.addChild(this._displacementGod);
    this.displacementFilterGod = new PIXI.filters.DisplacementFilter(this._displacementGod);
    this.containerGod.filters = [this.displacementFilterGod];
    this.displacementFilterGod.scale.x = 0;
    this.displacementFilterGod.scale.y = 0;
    this.tlGod = new TimelineMax({ paused: true });
    this.tlGod.to(this.displacementFilterGod.scale, 8, { x: 10000, y: 0, ease: Expo.easeInOut });
    //this.tl.to(this.camera, 0, { autoAlpha: 1, ease: Expo.easeInOut }, "+=1");
    this.tlGod.timeScale(5)
    this.tlGod.play()
};

//-----------------------------------------------------------------------------
// Function : resetPositions
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.resetPositions = function () {
    for (let n = 0; n < 4; n++) {
        this.txtButtons[n].opacity = 0
        if (n % 2 == 0) {
            this.btnBack[n].x -= 700
            this.txtButtons[n].x -= 700
        }
        else {
            this.btnBack[n].x += 700
            this.txtButtons[n].x += 700
        }
    }
    this.friendsList.scale.y = 0;
    this.cardOptionsDeck.scale.y = 0;
    this.godPic.y += 1000
    this.avatarImg.opacity = 0;
    this.rankFrame.rotation = 1;
    this.rankFrame.opacity = 0;
    this.nameText.x += 200
    this.nameText.opacity = 0;
    this.rankText.x -= 200
    this.rankText.opacity = 0;
    this.rankLevel.y -= 80
    this.rankLevel.opacity = 0;

    this.barDeck.opacity = 0;
    this.lineDeck.opacity = 0;
    this.lineFriends.opacity = 0;
    this.barFriends.opacity = 0;
    this.backFriendList.opacity = 0;
    this.friendsText.scale.y = 0;
    this.deckNameText.scale.y = 0;
};


//-----------------------------------------------------------------------------
// Function : createContainer
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.createContainer = function () {
    this.container = new PIXI.Container();
    this.addChild(this.container);
    this._displacement = new Sprite();
    this._displacement.bitmap = ImageManager.loadDisplacement("map7");
    this._displacement.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this._displacement.scale.set(2);
    this._displacement.anchor.set(0.5);
    this.container.addChild(this._displacement);
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this._displacement);
    this.container.filters = [this.displacementFilter];
    this.displacementFilter.scale.x = 0;
    this.displacementFilter.scale.y = 0;
    this.tl = new TimelineMax({ paused: true });
    this.tl.to(this.displacementFilter.scale, 8, { x: 0, y: -10000, ease: Expo.easeInOut });
    this.tl.gotoAndStop(10)
    this.tl.timeScale(4);
    this.tl.reverse();
};

//-----------------------------------------------------------------------------
// Function : createVariables
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.createVariables = function () {
    this.countFrames = 0;
    this.phase = 0;
    this.nextScene = 0;
    $dataKamigami.needsRoom = false;
    $dataKamigami.specificRoom = -1;
};
//-----------------------------------------------------------------------------
// Function : createBackGround
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.createBackGround = function () {
    this.background = new Sprite();
    this.background.bitmap = ImageManager.loadOnlineMenu("backgroud");
    this.container.addChild(this.background)
};

//-----------------------------------------------------------------------------
// Function : createBackGround2
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.createBackGround2 = function () {
    this.background2 = new Sprite();
    this.background2.bitmap = ImageManager.loadOnlineMenu("backgroud2");
    this.container.addChild(this.background2)
};
//-----------------------------------------------------------------------------
// Function : createBackOptions
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.createBackOptions = function () {
    let backNames = ['onlineBackFind', 'onlineBackDirect', 'onlineBackReturn', 'onlineBackChange']
    this.btnBack = new Array()
    for (let n = 0; n < 4; n++) {
        this.btnBack[n] = new Sprite_Clickable();
        this.btnBack[n].bitmap = ImageManager.loadOnlineMenu(backNames[n])
        this.container.addChild(this.btnBack[n])
        if (Math.floor(n / 2) == 1) {
            this.btnBack[n].y = 1080 - 258
        } if (n % 2 == 1) {
            this.btnBack[n].x = 1920 - 649
        }
    }
};
//-----------------------------------------------------------------------------
// Function : createTextOptions
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.createTextOptions = function () {
    this.txtLights = new Array()
    let displacement
    for (let n = 0; n < 4; n++) {
        displacement = n % 2 == 0 ? 60 : -60
        this.txtLights[n] = new Sprite_Kami_ButtonLight(n % 2, `onlineMenu${n + 1}`, displacement, 0x00AF90);
        this.container.addChild(this.txtLights[n])
        if (Math.floor(n / 2) == 1) {
            this.txtLights[n].y = 1080 - 250
        } if (n % 2 == 1) {
            this.txtLights[n].x = 1920 - 500
        }
        this.txtLights[n].opacity = 0
    }

    this.txtButtons = new Array()
    for (let n = 0; n < 4; n++) {
        displacement = n % 2 == 0 ? 60 : -60
        this.txtButtons[n] = new Sprite_Kami_Button(n % 2, `onlineMenu${n + 1}`, displacement);
        this.txtButtons[n].opacity = 190
        this.container.addChild(this.txtButtons[n])
        if (Math.floor(n / 2) == 1) {
            this.txtButtons[n].y = 1080 - 250
        } if (n % 2 == 1) {
            this.txtButtons[n].x = 1920 - 500
        }
    }
};

//-----------------------------------------------------------------------------
// Function : createDeckList
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.createDeckList = function () {
    this.cardOptionsDeck = new SpriteCardOptionsDeck();
    this.addChild(this.cardOptionsDeck)
    this.cardOptionsDeck.x = 1510
    this.cardOptionsDeck.mask.x = 1510
    this.cardOptionsDeck.mask.y = 340
    this.cardOptionsDeck.mask.height = 475
    this.cardOptionsDeck.scale.x = 0.8
    this.cardOptionsDeck.scale.y = 0.8
    this.cardOptionsDeck.y = 340
    this.loadDeck();
};

//-----------------------------------------------------------------------------
// Function : loadDeck
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.loadDeck = function () {
    let deck = $dataKamigami.decks[$dataKamigami.chosenDeck][1];
    for (let n = 0; n < deck.length; n++) {
        this.cardOptionsDeck.addCard(deck[n], 1)
    }
};

//-----------------------------------------------------------------------------
// Function : createGod
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.createGod = function () {
    let godId = $dataKamigami.decks[$dataKamigami.chosenDeck][1][40];
    let godName = Game_Kamigami.convertedCardList[godId].Name + "F"
    this.godPic = new Sprite();
    this.godPic.bitmap = ImageManager.loadFace(godName);
    this.containerGod.addChild(this.godPic);
    this.godPic.x = Graphics.width / 2;
    this.godPic.y = Graphics.height;
    this.godPic.anchor.x = 0.5;
    this.godPic.anchor.y = 1;
    this.godPic.scale.x = this.godPic.scale.y = 0.8
};
//-----------------------------------------------------------------------------
// Function : createBackFriendList
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.createBackFriendList = function () {
    this.backFriendList = new Sprite();
    this.backFriendList.bitmap = ImageManager.loadOnlineMenu("onlineList")
    this.container.addChild(this.backFriendList)
    this.backFriendList.anchor.y = 0.5;
    this.backFriendList.y = Graphics.height / 2
    this.backFriendList.x = 20
};

//-----------------------------------------------------------------------------
// Function : loadAvatar
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.loadAvatar = function () {
    let id = greenworks.getLargeFriendAvatar(greenworks.getSteamId().getRawSteamID())
    let millisecondsToWait = 5000;
    for (count = 0; count < 100; count++) {
        setTimeout(function () {
            // Whatever you want to do after the wait
        }, millisecondsToWait);
        id = greenworks.getLargeFriendAvatar(greenworks.getSteamId().getRawSteamID())
        if (id != -1) {
            break;
        }
    }
    this.rankFrame = new Sprite();
    this.rankFrame.bitmap = ImageManager.loadOnlineMenu("rank5")

    this.spinningCursor = new Sprite()
    this.spinningCursor.bitmap = ImageManager.loadOnlineMenu("spinningCursor")

    let imgSize;
    try {
        imgSize = greenworks.getImageSize(id)
    } catch (e) {
        this.successLoad = false;
        return;
    }
    let img = greenworks.getImageRGBA(id)
    this.loadAvatarImage(img, imgSize)

    this.container.addChild(this.rankFrame)
    this.rankFrame.anchor.x = 0.5;
    this.rankFrame.anchor.y = 0.5;
    this.rankFrame.x = Graphics.width / 2
    this.rankFrame.y = 140;
    this.successLoad = true;
    this.container.addChild(this.spinningCursor)
    this.spinningCursor.anchor.x = 0.5
    this.spinningCursor.anchor.y = 0.5
    this.spinningCursor.x = Graphics.width / 2
    this.spinningCursor.y = 134
}

//-----------------------------------------------------------------------------
// Function : createTexts
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.createTexts = function () {
    let name = greenworks.getSteamId().screenName;

    this.nameText = new Sprite();
    this.nameText.bitmap = new Bitmap(200, 40);
    this.nameText.bitmap.fontSize = 50;
    this.nameText.bitmap.outlineWidth = 0;
    this.nameText.bitmap.drawText(name, 0, 0, 200, 40, 'right')

    this.container.addChild(this.nameText)
    this.nameText.x = 600
    this.nameText.y = 60

    let deckName = $dataKamigami.decks[$dataKamigami.chosenDeck][0];
    this.deckNameText = new Sprite();
    this.deckNameText.bitmap = new Bitmap(400, 40);
    this.deckNameText.bitmap.fontSize = 50;
    this.deckNameText.bitmap.outlineWidth = 0;
    this.deckNameText.bitmap.drawText(deckName, 0, 0, 400, 40, 'left')

    this.container.addChild(this.deckNameText)
    this.deckNameText.x = 1530
    this.deckNameText.y = 290

    this.rankText = new Sprite();
    this.rankText.bitmap = new Bitmap(200, 40);
    this.rankText.bitmap.fontSize = 50;
    this.rankText.bitmap.outlineWidth = 0;
    this.rankText.bitmap.drawText("Rank:", 0, 0, 200, 40, 'left')

    this.container.addChild(this.rankText)
    this.rankText.x = 1120
    this.rankText.y = 60

    this.rankLevel = new Sprite();
    this.rankLevel.bitmap = new Bitmap(200, 40);
    this.rankLevel.bitmap.fontSize = 50;
    this.rankLevel.bitmap.outlineWidth = 0;
    this.rankLevel.bitmap.drawText("32", 0, 0, 200, 40, 'left')

    this.container.addChild(this.rankLevel)
    this.rankLevel.x = 1120
    this.rankLevel.y = 110
}
//-----------------------------------------------------------------------------
// Function : createFriendTextList
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.createFriendTextList = function () {
    this.friendsList = new SpriteDeckFriendList()
    this.addChild(this.friendsList)
    this.friendsList.x = 50
    this.friendsList.y = 320
    let text = IAVRA.I18N.localize("#{DuelVocab.MenuText.onlineMenuFriend}")
    this.friendsText = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0xffffff, align: 'left' });
    this.container.addChild(this.friendsText)
    this.friendsText.x = 50
    this.friendsText.y = 290
};
//-----------------------------------------------------------------------------
// Function : createFriendsBar
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.createFriendsBar = function () {
    this.lineFriends = new Sprite_Card();
    this.lineFriends.bitmap = ImageManager.loadOnlineMenu("lineFriends")
    this.container.addChild(this.lineFriends);
    this.lineFriends.anchor.x = this.lineFriends.anchor.y = 0.5
    this.lineFriends.x = 350
    this.lineFriends.y = 540

    this.barFriends = new Sprite_Card();
    this.barFriends.bitmap = ImageManager.loadOnlineMenu("barFriends")
    this.container.addChild(this.barFriends);
    this.barFriends.anchor.x = this.barFriends.anchor.y = 0.5
    this.barFriends.x = 350
    this.barFriends.y = 540
    let newScale = Math.min(1, (17 * 27) / (this.friendsList.getFriendsLength() * 27))
    this.barFriends.scale.y = newScale
    if (newScale < 1) {
        this.barFriends.y = 540 - (1 - this.barFriends.scale.y) * 231
    }

}
//-----------------------------------------------------------------------------
// Function : createDeckBar
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.createDeckBar = function () {
    this.lineDeck = new Sprite_Card();
    this.lineDeck.bitmap = ImageManager.loadOnlineMenu("lineDeck")
    this.container.addChild(this.lineDeck);
    this.lineDeck.anchor.x = this.lineDeck.anchor.y = 0.5
    this.lineDeck.x = 1900
    this.lineDeck.y = 580

    this.barDeck = new Sprite_Card();
    this.barDeck.bitmap = ImageManager.loadOnlineMenu("barDeck")
    this.container.addChild(this.barDeck);
    this.barDeck.anchor.x = this.barDeck.anchor.y = 0.5
    this.barDeck.x = 1900
    this.barDeck.y = 580

    let newScale = Math.min(1, (12 * 39.5) / (this.cardOptionsDeck.selectedCardOptions.length * 39.5))
    this.barDeck.scale.y = newScale
    if (newScale < 1) {
        this.barDeck.y = 580 - (1 - this.barDeck.scale.y) * 231
    }
}

//-----------------------------------------------------------------------------
// Function : loadAvatarImage
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.loadAvatarImage = function (img, imgSize) {
    this.avatarImg = new Sprite()
    this.avatarImg.bitmap = new Bitmap(imgSize.width, imgSize.height)
    this.avatarImg.bitmap.createFromArray(img)
    this.container.addChild(this.avatarImg)
    this.avatarImg.anchor.x = 0.5
    this.avatarImg.anchor.y = 0.5
    this.avatarImg.x = Graphics.width / 2
    this.avatarImg.y = 137
};

//-----------------------------------------------------------------------------
// Function : update
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    this.countFrames++
    if (this.phase > 0)
        this.updateTipMovement()
    this.spinningCursor.rotation -= 0.1
    if (this.chatSpriteView.opacity == 255) {
        this.checkChatTrigger();
    }
    switch (this.phase) {
        case 0:
            this.startScene();
            break;
        case 2:
            this.mainUpdate();
            break;
        case 3:
            this.closeScene();
            break;
        case 4:
            this.goToNextScene();
            break;
        case 8:
            this.openDirectScene();
            break;
        case 9:
            this.updateDirectScene();
            break;
        case 10:
            this.updateDirectChoice();
            break;
        case 11:
            this.returnMainLobby();
            break;
        case 20:
            SceneManager.goto(Scene_Main_Menu);
            $dataKamigami.failedSteamInfo = true;
            break;
        default:
            break;
    }
};

//-----------------------------------------------------------------------------
// Function : updateTipMovement
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.updateTipMovement = function () {
    if (this.tipText) {
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
}
///////////////////////////////////////////////////////////////////////////////
////////////// PHASE 0 ///////////
///////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : startScene
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.startScene = function () {
    this.moveStartBackOptions();
    this.moveStartTextOptions();
    this.moveStartFriendList();
    this.moveStartDeckList();
    this.moveStartAvatar();
    if (this.countFrames == 160) {
        this.emitter = fx.getParticleEmitter('OnlineMenu');
        this.emitter.init(this.centerSprite, true, 2);
    }
    if (this.countFrames == 320) {
        this.phase = 2;
        this.countFrames = 0;
        for (let n = 0; n < 4; n++) {
            this.txtLights[n].x = this.txtButtons[n].x
        };
    }
};
//-----------------------------------------------------------------------------
// Function : moveStartBackOptions
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.moveStartBackOptions = function () {
    for (let n = 0; n < 4; n++) {
        if (this.countFrames < n * 30 + 90) {
            break;
        }
        if (n % 2 == 0) {
            this.btnBack[n].x -= (this.btnBack[n].x / 10) - 1
            this.btnBack[n].x = Math.min(this.btnBack[n].x, 0)
        }
        else {
            this.btnBack[n].x += ((1920 - 649 - this.btnBack[n].x) / 10) + 1
        }
    }
}
//-----------------------------------------------------------------------------
// Function : moveStartTextOptions
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.moveStartTextOptions = function () {
    for (let n = 0; n < 4; n++) {
        if (this.countFrames < n * 30 + 120) {
            break;
        }
        if (n % 2 == 0) {
            this.txtButtons[n].x -= (this.txtButtons[n].x / 10) - 1
            this.txtButtons[n].x = Math.min(this.txtButtons[n].x, 0)
            if (this.txtButtons[n].opacity < 160)
                this.txtButtons[n].opacity += 3
        }
        else {
            this.txtButtons[n].x -= ((this.txtButtons[n].x - (1920 - 500)) / 10) - 1
            if (this.txtButtons[n].opacity < 160)
                this.txtButtons[n].opacity += 3
        }
    }
}
//-----------------------------------------------------------------------------
// Function : moveStartFriendList
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.moveStartFriendList = function () {
    if (this.countFrames > 150)
        this.backFriendList.opacity += 10;
    if (this.countFrames > 180) {
        this.friendsText.scale.y += 0.05
        if (this.friendsText.scale.y > 1) {
            this.friendsText.scale.y = 1
        }
    }
    if (this.countFrames > 210) {
        this.friendsList.scale.y += 0.05
        if (this.friendsList.scale.y > 1) {
            this.friendsList.scale.y = 1
        }
        this.barFriends.opacity += 10
        this.lineFriends.opacity += 10
    }
};
//-----------------------------------------------------------------------------
// Function : moveStartDeckList
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.moveStartDeckList = function () {
    if (this.countFrames > 210) {
        this.deckNameText.scale.y += 0.05
        if (this.deckNameText.scale.y > 1) {
            this.deckNameText.scale.y = 1
        }
    }
    if (this.countFrames > 230) {
        this.cardOptionsDeck.scale.y += 0.04
        if (this.cardOptionsDeck.scale.y > 0.8) {
            this.cardOptionsDeck.scale.y = 0.8
        }
        this.barDeck.opacity += 10
        this.lineDeck.opacity += 10
    }


}
//-----------------------------------------------------------------------------
// Function : moveStartAvatar
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.moveStartAvatar = function () {
    if (this.countFrames < 100) {
        return
    }
    this.rankFrame.rotation -= (this.rankFrame.rotation / 50 + 0.01)
    if (this.rankFrame.rotation < 0) {
        this.rankFrame.rotation = 0
    }
    this.rankFrame.opacity += 10
    if (this.rankFrame.opacity == 255) {
        this.avatarImg.opacity += 8
    }
    if (this.avatarImg.opacity == 255) {
        this.nameText.x -= (this.nameText.x - 600) / 20 + 1
        if (this.nameText.x < 600) {
            this.nameText.x = 600
        }
        this.nameText.opacity += 8
    }
    if (this.nameText.opacity == 255) {
        this.rankText.x += (1120 - this.rankText.x) / 20 + 1
        if (this.rankText.x > 1120) {
            this.rankText.x = 1120
        }
        this.rankText.opacity += 8
    }
    if (this.rankText.opacity == 255) {
        this.rankLevel.y += (110 - this.rankLevel.y) / 20 + 1
        if (this.rankLevel.y > 110) {
            this.rankLevel.y = 110
        }
        this.rankLevel.opacity += 8
    }
    if (this.avatarImg.opacity == 255) {
        this.tlGod.reverse();
        this.godPic.y = Graphics.height
    }


};


///////////////////////////////////////////////////////////////////////////////
////////////// PHASE 2 ///////////
///////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : mainUpdate
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.mainUpdate = function () {
    if (TouchInput.isPressed()) {
        if (this.barDeck.isBeingTouched()) {
            this.moveDeckList = true
        } else if (this.barFriends.isBeingTouched()) {
            this.moveFriendList = true
        }
    } else {
        this.moveDeckList = this.moveFriendList = false
    }
    this.checkFriendList()
    this.checkDeckList()
    this.checkButtonHover()
    this.checkAvatarHover()
    if (TouchInput.isTriggered()) {
        this.checkButtonClick();
    }
};
//-----------------------------------------------------------------------------
// Function : checkButtonHover
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.checkAvatarHover = function () {
    if (this._avatarGlow.isBeingTouched()) {
        this._avatarGlow.opacity += 20
    } else {
        this._avatarGlow.opacity -= 20
    }
};


//-----------------------------------------------------------------------------
// Function : checkButtonHover
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.checkButtonHover = function () {
    for (let n = 0; n < 4; n++) {
        if (this.txtButtons[n].isBeingTouched()) {
            this.txtLights[n].opacity += 20
        } else {
            this.txtLights[n].opacity -= 20
        }

    }
};
//-----------------------------------------------------------------------------
// Function : checkDeckList
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.checkDeckList = function () {

    let minBar = 580 - (1 - this.barDeck.scale.y) * 231
    let maxBar = 580 + (1 - this.barDeck.scale.y) * 231
    if (!TouchInput.isPressed() && TouchInput.x > Graphics.width / 2) {
        this.barDeck.y += TouchInput.wheelY / 5;
        this.barDeck.y = Math.min(Math.max(this.barDeck.y, minBar), maxBar)
    }
    if (this.moveDeckList) {
        this.barDeck.y = Math.min(Math.max(TouchInput.y, minBar), maxBar)
    }

    let dif = this.barDeck.y - minBar
    let maxLen = Math.max(1, this.cardOptionsDeck.selectedCardOptions.length - 12)

    if (maxBar != minBar)
        this.cardOptionsDeck.y = 340 - (dif / (maxBar - minBar)) * 39.5 * maxLen

}
//-----------------------------------------------------------------------------
// Function : checkFriendList
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.checkFriendList = function () {
    let minBar = 540 - (1 - this.barFriends.scale.y) * 231
    let maxBar = 540 + (1 - this.barFriends.scale.y) * 231
    if (!TouchInput.isPressed() && TouchInput.x < Graphics.width / 2) {
        this.barFriends.y += TouchInput.wheelY / 5;
        this.barFriends.y = Math.min(Math.max(this.barFriends.y, minBar), maxBar)
    }
    if (this.moveFriendList) {
        this.barFriends.y = Math.min(Math.max(TouchInput.y, minBar), maxBar)
    }
    let dif = this.barFriends.y - minBar
    let maxLen = Math.max(1, this.friendsList.getFriendsLength() - 17)

    if (maxBar != minBar)
        this.friendsList.y = 320 - (dif / (maxBar - minBar)) * 27 * maxLen
}
//-----------------------------------------------------------------------------
// Function : checkButtonClick
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.checkButtonClick = function () {
    for (let index = 0; index < this.txtButtons.length; index++) {
        if (this.txtButtons[index].isBeingTouched()) {
            AudioManager.playSe({ name: "success", pan: 0, pitch: 95, volume: 100 });
            this.nextScene = index;
            this.phase = 3;
            this.countFrames = 0;
            if (index == 0 || index == 1) {
                this.phase = 4;
                this.countFrames = 240;
            }

            return;
        }
    }

    if (this._avatarGlow.isBeingTouched()) {
        this.phase = 5;
        this.countFrames = 0;
    }
}
///////////////////////////////////////////////////////////////////////////////
////////////// PHASE 3 ///////////
///////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : closeScene
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.closeScene = function () {
    for (let index = 0; index < this.txtButtons.length; index++) {
        if (this.nextScene == index && this.countFrames < 90) {
            this.txtLights[index].opacity = this.countFrames % 10 > 4 ? 255 : 0
        } else {
            this.txtLights[index].opacity -= 20;
        }
    }
    if (this.countFrames == 110) {
        this.phase = 4
        this.countFrames = 0
    }
}
///////////////////////////////////////////////////////////////////////////////
////////////// PHASE 4 ///////////
///////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : goToNextScene
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.goToNextScene = function () {
    if (this.countFrames < 240) {
        this.moveCloseAvatar();
        this.moveCloseDeckList();
        this.moveCloseFriendList();
        this.moveCloseTextOptions();
        this.moveCloseBackOptions();
        if (this.countFrames == 180) {
            this.tl.play()
        }
        return;
    }

    switch (this.nextScene) {
        case 3:
            SceneManager.push(Scene_Kamigami_Deck_Select)
            break;
        case 2:
            SceneManager.pop()
            break;
        case 1:
            this.phase = 8;
            this.countFrames = 0;
            break;

        case 0:
            SceneManager.snapForBackgroundFix()
            SceneManager.push(Scene_Kamigami_Duel_Online)
            break;
        default:
            break;
    }
}

//-----------------------------------------------------------------------------
// Function : moveStartAvatar
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.moveCloseAvatar = function () {
    if (this.nameText.opacity > 0) {
        this.nameText.x += this.countFrames / 5
        this.nameText.opacity -= 12
    }

    if (this.nameText.opacity == 0) {
        this.rankLevel.y -= (110 - this.rankLevel.y) / 20 + 1
        this.rankLevel.opacity -= 12
        if (this.rankLevel.y < 30)
            this.rankLevel.y = 30
    }

    if (this.rankLevel.opacity == 0) {
        this.rankText.x -= (1120 - this.rankText.x) / 10 + 1
        if (this.rankText.x < 620) {
            this.rankText.x = 620
        }
        this.rankText.opacity -= 12
    }

    if (this.rankText.opacity == 0)
        this.avatarImg.opacity -= 12

    if (this.avatarImg.opacity == 0) {
        this.rankFrame.rotation += (this.rankFrame.rotation / 10 + 0.01)
        this.rankFrame.opacity -= 14
    }

    if (this.avatarImg.opacity == 0) {
        this.tlGod.play();
    }


};
//-----------------------------------------------------------------------------
// Function : moveCloseDeckList
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.moveCloseDeckList = function () {

    if (this.countFrames > 90) {
        this.cardOptionsDeck.scale.y -= 0.06
        if (this.cardOptionsDeck.scale.y < 0) {
            this.cardOptionsDeck.scale.y = 0
        }
        this.barDeck.opacity -= 10
        this.lineDeck.opacity -= 10
    }
    if (this.countFrames > 70) {
        this.deckNameText.scale.y -= 0.07
        if (this.deckNameText.scale.y < 0) {
            this.deckNameText.scale.y = 0
        }
    }
}

//-----------------------------------------------------------------------------
// Function : moveCloseFriendList
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.moveCloseFriendList = function () {

    if (this.countFrames > 100) {
        this.friendsText.scale.y -= 0.05
        if (this.friendsText.scale.y < 0) {
            this.friendsText.scale.y = 0
        }
    }
    if (this.countFrames > 120) {
        this.friendsList.scale.y -= 0.05
        if (this.friendsList.scale.y < 0) {
            this.friendsList.scale.y = 0
        }
        this.barFriends.opacity -= 10
        this.lineFriends.opacity -= 10
    }
    if (this.countFrames > 140)
        this.backFriendList.opacity -= 10;
}

//-----------------------------------------------------------------------------
// Function : moveCloseTextOptions
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.moveCloseTextOptions = function () {
    for (let n = 0; n < 4; n++) {
        if (this.countFrames < (3 - n) * 20 + 120) {
            continue;
        }
        if (n % 2 == 0) {
            this.txtButtons[n].x -= (this.countFrames - ((3 - n) * 20 + 110)) / 2
            this.txtButtons[n].opacity -= 3
        }
        else {
            this.txtButtons[n].x += (this.countFrames - ((3 - n) * 20 + 110)) / 2
            this.txtButtons[n].opacity -= 3
        }
    }
}

//-----------------------------------------------------------------------------
// Function : moveCloseBackOptions
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.moveCloseBackOptions = function () {
    for (let n = 0; n < 4; n++) {
        if (this.countFrames < (3 - n) * 20 + 140) {
            continue;
        }
        if (n % 2 == 0) {
            this.btnBack[n].x -= (this.countFrames - ((3 - n) * 20 + 120)) / 2
            this.btnBack[n].opacity -= 5
        }
        else {
            this.btnBack[n].x += (this.countFrames - ((3 - n) * 20 + 120)) / 2
            this.btnBack[n].opacity -= 5
        }
    }
}

Bitmap.prototype.createFromArray = function (values) {
    var context = this._context;
    var imageData = context.getImageData(0, 0, this.width, this.height);
    var pixels = imageData.data;
    for (var i = 0; i < pixels.length; i += 4) {
        pixels[i] = values[i];
        pixels[i + 1] = values[i + 1];
        pixels[i + 2] = values[i + 2];
        pixels[i + 3] = values[i + 3];

    }
    context.putImageData(imageData, 0, 0);
    this._setDirty();
};


//-----------------------------------------------------------------------------
// SpriteDeckFriendList
//
// The sprite for displaying the friends list.

function SpriteDeckFriendList() {
    this.initialize.apply(this, arguments);
}

SpriteDeckFriendList.prototype = Object.create(Sprite.prototype);
SpriteDeckFriendList.prototype.constructor = SpriteDeckFriendList;

//-----------------------------------------------------------------------------
// Function : initialize - initiates the graphics
//-----------------------------------------------------------------------------
SpriteDeckFriendList.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this.friendsLength = 0;
    this.writeFriendsName();
    this.createMask();
}
//-----------------------------------------------------------------------------
// Function : createMask
//-----------------------------------------------------------------------------
SpriteDeckFriendList.prototype.createMask = function () {
    this.mask = new PIXI.Graphics();
    this.mask.beginFill();
    this.mask.x = 50
    this.mask.y = 320;
    //this.maskInside.anchor.x = this.maskInside.anchor.y = 0.5;
    this.mask.drawRect(0, 0, 600, 462);
    this.mask.endFill();
};
//-----------------------------------------------------------------------------
// Function : writeFriendsName - writes names
//-----------------------------------------------------------------------------
SpriteDeckFriendList.prototype.writeFriendsName = function () {
    this.friendsList = new PIXI.Text(new String(), { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0xffffff, align: 'left' });
    this.rankList = new PIXI.Text(new String(), { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0xffffff, align: 'right' });
    this.addChild(this.friendsList)
    this.addChild(this.rankList)
    let friends = $dataKamigami.onlineData.highscoreList;
    for (var i = 0; i < friends.length; ++i) {
        if (i > 0)
            this.friendsList.text += "\n"
        this.friendsList.text += $dataKamigami.onlineData.highscoreList[i].substring(0, 15)
        if (i > 0)
            this.rankList.text += "\n"
        this.rankList.text += (n + 1);
    }
    this.rankList.x = 220
    this.friendsLength = friends.length
};
SpriteDeckFriendList.prototype.getFriendsLength = function () {
    return this.friendsLength
}


//-----------------------------------------------------------------------------
// Function : openDirectScene
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.openDirectScene = function () {
    if (this._fadeScreenDirect.opacity < 160) {
        this._fadeScreenDirect.opacity += 20
        return;
    }
    if (this.btnBack[0].opacity > 0) {
        for (let n = 0; n < 4; n++) {
            this.btnBack[n].opacity -= 20;
        }
    }
    if (this.txtButtons[0].opacity > 0) {
        for (let n = 0; n < 4; n++) {
            this.txtButtons[n].opacity -= 20;
        }
    }
    if (this.btnBackDirect[0].opacity < 255) {
        for (let n = 0; n < 3; n++) {
            this.btnBackDirect[n].opacity += 20;
        }
        return;
    }
    if (this.txtButtonsDirect[0].opacity < 160) {
        for (let n = 0; n < 3; n++) {
            this.txtButtonsDirect[n].opacity += 20;
        }
        return;
    }
    if (this.chatSpriteView.opacity < 255) {
        if (this.joinRoomText.alpha < 1)
            this.joinRoomText.alpha += 0.1
        this.chatSpriteView.opacity += 20
        return;
    }
    this.chatInput.select();
    this.phase = 9;
}


//-----------------------------------------------------------------------------
// Function : updateDirectScene - initiates and handles the connection
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.updateDirectScene = function () {
    this.checkDirectButtonHover();
    if (TouchInput.isTriggered()) {
        this.checkDirectButtonClick();
    }
    if (Input.isTriggered('ok')) {
        this.directNextScene = 1;
        this.phase = 10;
    };
}

//-----------------------------------------------------------------------------
// Function : checkDirectButtonHover
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.checkDirectButtonHover = function () {
    for (let n = 0; n < 3; n++) {
        if (this.txtButtonsDirect[n].isBeingTouched()) {
            this.txtLightsDirect[n].opacity += 20
        } else {
            this.txtLightsDirect[n].opacity -= 20
        }

    }
};

//-----------------------------------------------------------------------------
// Function : checkDirectButtonClick
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.checkDirectButtonClick = function () {
    for (let n = 0; n < 3; n++) {
        if (this.txtButtonsDirect[n].isBeingTouched()) {
            AudioManager.playSe({ name: "success", pan: 0, pitch: 95, volume: 100 });
            this.directNextScene = n;
            this.phase = 10;
            if (n == 0) {
                for (let m = 0; m < 4; m++) {
                    this.btnBack[m].opacity = 0;
                }
                for (let m = 0; m < 4; m++) {
                    this.txtButtons[m].opacity = 0;
                }
            }
            return;
        }
    }

}

//-----------------------------------------------------------------------------
// Function : updateDirectChoice
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.updateDirectChoice = function () {
    switch (this.directNextScene) {
        case 0:
            $dataKamigami.needsRoom = true;
            SceneManager.snapForBackgroundFix()
            SceneManager.push(Scene_Kamigami_Duel_Online)
            break;
        case 1:
            let numRoom = parseInt(this.chatInput.text)
            if (isNaN(numRoom)) {
                this.phase = 11;
                return;
            }
            this.chatInput.text = "";
            $dataKamigami.specificRoom = numRoom;
            SceneManager.snapForBackgroundFix()
            SceneManager.push(Scene_Kamigami_Duel_Online)
            break;
        case 2:
            this.phase = 11;
            break;
    }
}


//-----------------------------------------------------------------------------
// Function : returnMainLobby
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.returnMainLobby = function () {
    if (this.chatSpriteView.opacity > 0) {
        this.chatSpriteView.opacity -= 20
        if (this.joinRoomText.alpha > 0)
            this.joinRoomText.alpha -= 0.1
        return;
    }
    for (let n = 0; n < 3; n++) {
        this.txtLightsDirect[n].opacity -= 20;
    }
    if (this.btnBack[0].opacity < 255) {
        for (let n = 0; n < 4; n++) {
            this.btnBack[n].opacity += 20;
        }
        return;
    }
    if (this.txtButtonsDirect[0].opacity > 0) {
        for (let n = 0; n < 3; n++) {
            this.txtButtonsDirect[n].opacity -= 20;
        }
        return;
    }
    if (this.txtButtons[0].opacity < 255) {
        for (let n = 0; n < 4; n++) {
            this.txtButtons[n].opacity += 20;
        }
        return;
    }
    if (this.btnBackDirect[0].opacity > 0) {
        for (let n = 0; n < 3; n++) {
            this.btnBackDirect[n].opacity -= 20;
        }
        return;
    }
    if (this._fadeScreenDirect.opacity > 0) {
        this._fadeScreenDirect.opacity -= 20
        return;
    }
    this.phase = 2;
    this.countFrames = 0;
}


//-----------------------------------------------------------------------------
// Function : checkChatTrigger
//-----------------------------------------------------------------------------
Scene_Kamigami_Lobby.prototype.checkChatTrigger = function () {
    if (TouchInput.isTriggered()) {
        if (this.chatSpriteView.isBeingTouched()) {
            this.chatInput.select();
        }
    }
}
