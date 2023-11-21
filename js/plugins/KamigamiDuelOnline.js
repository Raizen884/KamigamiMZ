//=============================================================================
// Scene_Kamigami_Duel_Online
// Description: Main Duel Online System
//=============================================================================


function Scene_Kamigami_Duel_Online() {
    this.initialize.apply(this, arguments);
}

Scene_Kamigami_Duel_Online.prototype = Object.create(Scene_Kamigami_Duel.prototype);
Scene_Kamigami_Duel_Online.prototype.constructor = Scene_Kamigami_Duel_Online;

//-----------------------------------------------------------------------------
// Function : initialize - initiates variables
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.initialize = function () {
    $dataKamigami.isOnline = true;
    this.waiting_for_second_player = true;
    this.turn = 0;
    this.count_frames = 0;
    this._herokuPing = 0;
    this.opponentsPlaysPile = new Array();
    Scene_Base.prototype.initialize.call(this);
    //Scene_Kamigami_Duel.prototype.initialize.call(this); 
    this.usingAI = false;
    $dataEnemyId = false;
    this.specialSkillsOnline = [20, 21, 22, 31, 35, 39, 40, 47, 48, 61, 101, 102, 104, 105, 108, 109, 110, 111, 112, 113, 114]
};

//------------------------------------------------ -----------------------------
// Function : starting_player defines starting_player
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.starting_player = function () {
    this.turn = 0;
};

//-----------------------------------------------------------------------------
// Function : create_connection - initiates and handles the connection
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.create_connection = function () {
    //this.webSocket = new WebSocket("ws://" + "localhost" + ":3000");
    this.webSocket = new WebSocket("ws://" + "kamigami-server.herokuapp.com" + ":80");
    //this.webSocket = new WebSocket("ws://" + JSON.parse(JSON.stringify($dataConnection["connectionUrl"])) + ":2345");
    this.webSocket.onopen = function (event) {
        //data = ["steamId", greenworks.getSteamId().steamId] 
        let data = ["entryConnection", greenworks.getSteamId().steamId, $dataKamigami.decks[$dataKamigami.chosenDeck][1], $dataKamigami.needsRoom, $dataKamigami.specificRoom]
        this.send(JSON.stringify(data));
    }
    this.webSocket.onclose = function (event) {
        let data = ["closeConnection", "923456789", $dataKamigami.decks[$dataKamigami.chosenDeck][1]]
        this.send(JSON.stringify(data));
        console.log("CLOSING 1")
        if (this.waiting_for_second_player) {
            SceneManager.goto(Scene_Main_Menu)
            return;
        }
        console.log("CLOSING 2")
        if (SceneManager._scene instanceof Scene_Kamigami_Duel_Online) {
            SceneManager._scene.phase = 12;
            $matchResult = false
        }
        if (SceneManager._scene instanceof Scene_Kamigami_Duel_Online && !SceneManager._scene.extra_animations) {
            SceneManager.goto(Scene_Main_Menu)
            return;
        }
        if (SceneManager._scene instanceof Scene_Kamigami_Duel_Online && SceneManager._scene.extra_animations[0] == "MulliganPlayer") {
            SceneManager._scene.extra_animations.shift();
            console.log(SceneManager._scene.extra_animations)
        }
        if (SceneManager._scene instanceof Scene_Kamigami_Duel_Online && SceneManager._scene.extra_animations[0] == "MulliganOpponent") {
            SceneManager._scene.extra_animations.shift();
            console.log(SceneManager._scene.extra_animations)
        }

    }
    this.webSocket.onmessage = function (event) {
        console.log("Incoming packet", event.data)
        if (event.data == "first player") {
            SceneManager._scene.starting_player()
        } else if (event.data.includes("online players")) {
            SceneManager._scene.changeOnlineUsers(event.data);
        } else if (event.data.includes("second player")) {
            SceneManager._scene.waiting_for_second_player = false
            SceneManager._scene.startMatch(event.data);
        } else if (event.data.includes("invalidRoom")) {
            SceneManager.pop();
        } else if (event.data.includes("StartingDeck")) {
            SceneManager._scene.setStartingDeck(event.data)
        } else if (event.data.includes("oppKeep")) {
            SceneManager._scene.proceedKeepOnline()
        } else if (event.data.includes("oppMulligan")) {
            SceneManager._scene.proceedMulliganOnline()
        } else if (event.data.includes("oppDiscardCard")) {
            SceneManager._scene.oppDiscardCard(event.data)
            return;
        } else if (event.data.includes("oppMessage")) {
            SceneManager._scene.oppMessage(event.data);
        } else if (event.data.includes("Timeout")) {
            if (SceneManager._scene.phase <= 3) {
                SceneManager._scene.proceedEndGame(1)
            } else {
                SceneManager._scene.proceedEndGame(0)
            }
        } else if (event.data.includes("oppConcede")) {
            if (SceneManager._scene.extra_animations && SceneManager._scene.extra_animations[0] && SceneManager._scene.extra_animations[0].includes('MulliganOpponent')) {
                SceneManager._scene.extra_animations.shift();
            }
        }
        if (event.data.includes("OppGod")) {
            SceneManager._scene.setOppGod(event.data);
        }
        SceneManager._scene.opponentsPlaysPile.push(event.data);
    }
    this.create_loading_images();
};
//-----------------------------------------------------------------------------
// Function :changeOnlineUsers
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.changeOnlineUsers = function (dataRaw) {
    let data = JSON.parse(dataRaw);
    if (this.textPlayersOnline) {
        if ($dataKamigami.needsRoom) {
            this.textPlayersOnline.text = this.textPlayersOnline.text.replace("?", data[2])
        } else {
            this.textPlayersOnline.text = this.textPlayersOnline.text.replace("?", data[1])
        }
    }
}

//-----------------------------------------------------------------------------
// Function : npc_main_phase - manages the opponent's plays!
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.startMatch = function (data) {
    var data = JSON.parse(data);
    this.startAllMethods();

    this.usingAI = false;
    this.turn = parseInt(data[1]);
};

//-----------------------------------------------------------------------------
// Function : set_devotion - updates initial opacity
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.set_devotion = function (player, quantity, allow_negative = false, animation = false) {
    let value = Scene_Kamigami_Duel.prototype.set_devotion.call(this, ...arguments);
    if (value) this._onlineTimer.resetTime();
    return value
}
//-----------------------------------------------------------------------------
// Function : npc_main_phase - manages the opponent's plays!
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.startOnlineTimer = function () {
    this._onlineTimer = new SpriteOnlineTimer();
    this.addChild(this._onlineTimer)
    this._onlineTimer.x = 550
    this._onlineTimer.y = Graphics.height / 2
}


//-----------------------------------------------------------------------------
// Function : update - updates board state
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.updateOnlineTimer = function () {
    if (this._onlineTimer.finishTime()) {
        if (this.phase == 3) {
            this._big_card_front.opacity = 0
            this._onlineTimer.resetTime()
            this.closeKeep();
        } else {
            this.resetBigCard()
            this._fade_screen.opacity = 0;
            this._fade_screen_2.opacity = 0;
            this.proceed_pass_turn();
        }

    }
}

//-----------------------------------------------------------------------------
// Function : oppMessage - receives chat message
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.oppMessage = function (data) {
    var data = JSON.parse(data);
    this.updateChatLog(`\n{player}: ${data[1]}`, 1)
};

//-----------------------------------------------------------------------------
// New Function : updateChatBox
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.updateChatBox = function (sender, message, clearInput = true) {
    let data = ["oppMessage", message]
    this.webSocket.send(JSON.stringify(data));
    Scene_Kamigami_Duel.prototype.updateChatBox.call(this, ...arguments);
}
//-----------------------------------------------------------------------------
// Function : setStartingDeck - sets the initial Deck
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.setStartingDeck = function (data) {
    var data = JSON.parse(data);
    this.serverDeck = data[1];
};


//-----------------------------------------------------------------------------
// Function : npc_main_phase - manages the opponent's plays!
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.npc_main_phase = function () {
    this.npc_plays();
};

//-----------------------------------------------------------------------------
// Function : npc_plays - manages the opponent's plays!
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.npc_plays = function () {
    this._herokuPing++;
    if (this._herokuPing >= 1200) {
        this.webSocket.send("[\"ping\"]");
        this._herokuPing = 0;
    }



    if (this.opponentsPlaysPile.length > 0) {
        if (this.opponentsPlaysPile[0].includes("oppCastCard")) {
            this.proceedCast(this.opponentsPlaysPile[0])
        }
        if (this.opponentsPlaysPile[0].includes("PassTurn")) {
            this.proceed_pass_turn()
        }
        if (this.opponentsPlaysPile[0].includes("selfDiscardCard")) {
            this.selfDiscardCard(this.opponentsPlaysPile[0])
        }
        if (this.opponentsPlaysPile[0].includes("oppMoveCard")) {
            this.proceedMovement(this.opponentsPlaysPile[0])
        }
        if (this.opponentsPlaysPile[0].includes("oppAttackCard")) {
            this.proceedAttack(this.opponentsPlaysPile[0])
        }
        if (this.opponentsPlaysPile[0].includes("oppEffectCard")) {
            this.proceedEffect(this.opponentsPlaysPile[0])
        }
        if (this.opponentsPlaysPile[0].includes("Invalid Play")) {
            this.proceedEndGame(0)
        }
        if (this.opponentsPlaysPile[0].includes("oppConcede")) {
            this.callEndGame(1, this.player2Deck.god)
        }
        if (this.opponentsPlaysPile[0].includes("oppConcede1")) {
            tthis.callEndGame(0, this.player1Deck.god)
        }
        this.opponentsPlaysPile.shift();
    };
};
//-----------------------------------------------------------------------------
// Function : proceedEndGame
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.proceedEndGame = function (turn = -1) {
    if (this.isEnding) {
        //return;
    }
    this.isEnding = turn
    console.log("GAME ENDING")
    this.extra_animations.push(["EndGame", turn])
    //this.callEndGame(turn)
};

//-----------------------------------------------------------------------------
// Function : oppDiscardCard - discards opponents card
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.oppDiscardCard = function (data) {
    var data = JSON.parse(data);
    this.onlineDiscardPile.push(data[2]);
    this.extra_animations.push(['Discard_Opponent', 1, data[1]]);
};


//-----------------------------------------------------------------------------
// Function : selfDiscardCard - discards your card
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.selfDiscardCard = function (data) {
    var data = JSON.parse(data);
    this.extra_animations.push(['DiscardRandom', 1, 0, data[1]]);
};

//-----------------------------------------------------------------------------
// Function : create_loading_images
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.create_loading_images = function () {
    this.createLoadingBackGround();
    this._fade_screen_loading = new Sprite();
    this._fade_screen_loading.bitmap = ImageManager.loadKamigami("shop_fade");
    this._fade_screen_loading.opacity = 0;
    this.addChild(this._fade_screen_loading);
    this.LoadingImage = new Sprite();
    this.LoadingImage.bitmap = new Bitmap(1000, 140);
    this.LoadingImage.anchor.x = this.LoadingImage.anchor.y = 0.5;
    this.LoadingImage.x = 960;
    this.LoadingImage.y = 340;
    this.LoadingImage.bitmap.outlineWidth = 0;
    this.LoadingImage.bitmap.fontSize = 120;
    this.LoadingImage.bitmap.textColor = "#FFFFFF";
    let text = IAVRA.I18N.localize("#{DuelVocab.MenuOptions.onlineMenuWaiting1}")
    this.LoadingImage.bitmap.drawText(text, 0, 0, 1000, 140);
    this.addChild(this.LoadingImage);
    this.loop_image = true;
    let textBase;
    if ($dataKamigami.needsRoom) {
        textBase = IAVRA.I18N.localize("#{DuelVocab.MenuOptions.onlineMenuWaiting3}")
    } else {
        textBase = IAVRA.I18N.localize("#{DuelVocab.MenuOptions.onlineMenuWaiting2}")
    }

    this.textPlayersOnline = new PIXI.Text(textBase, { fontFamily: 'Chau Philomene One', fontSize: 48, fill: 0xffffff, align: 'left' });
    this.textPlayersOnline.x = Graphics.width / 2 - this.textPlayersOnline.width / 2
    this.addChild(this.textPlayersOnline)
    this.textPlayersOnline.y = 200
    this.createLoadingImagesBars();
    this.createCancelButton();
};
//-----------------------------------------------------------------------------
// Function : createLoadingBackGround - sets opposing god card
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.createLoadingBackGround = function () {
    this.lobbyBg = new Sprite()
    this.lobbyBg.bitmap = SceneManager.backgroundBitmap();
    this.addChild(this.lobbyBg)
}
//-----------------------------------------------------------------------------
// Function : createCancelButton - sets opposing god card
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.createCancelButton = function () {
    this._cancelBack = new Sprite()
    this._cancelBack.bitmap = ImageManager.loadOnlineMenu("onlineBackCancel")
    this.addChild(this._cancelBack)
    this._cancelBack.y = Graphics.height - 258;
    this._cancelBack.opacity = 0

    this._cancelButtonLight = new Sprite_Kami_ButtonLight(0, `onlineMenuLobby1`, 60, 0x00AF90);
    this.addChild(this._cancelButtonLight)
    this._cancelButtonLight.y = Graphics.height - 258;
    this._cancelButtonLight.opacity = 0

    this._cancelButton = new Sprite_Kami_Button(0, `onlineMenuLobby1`, 60);
    this.addChild(this._cancelButton)
    this._cancelButton.y = Graphics.height - 258;
    this._cancelButton.opacity = 0
}


//-----------------------------------------------------------------------------
// Function : createLoadingImagesBars - sets opposing god card
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.createLoadingImagesBars = function () {
    this._loadingBack = new Sprite();
    this._loadingBack.bitmap = ImageManager.loadOnlineMenu("backSearchingCircle");
    this._loadingBack.anchor.x = this._loadingBack.anchor.y = 0.5;
    this.addChild(this._loadingBack)
    this._loadingBack.x = Graphics.width / 2
    this._loadingBack.y = 700;

    this._loadingBar = new Sprite();
    this._loadingBar.bitmap = ImageManager.loadOnlineMenu("searchingCircle");
    this._loadingBar.anchor.x = this._loadingBar.anchor.y = 0.5;
    this.addChild(this._loadingBar)
    this._loadingBar.x = Graphics.width / 2
    this._loadingBar.y = 700;
}

//-----------------------------------------------------------------------------
// Function : set_opp_god - sets opposing god card
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.setOppGod = function (data) {
    var data = JSON.parse(data);
    this.npc_cards = JSON.parse(JSON.stringify($dataKamigami.enemy_tt_cards));
    this.npc_cards[40] = data[1];
    $dataKamigami.enemy_tt_cards[40] = this.npc_cards[40]
    this.player2Deck = new KamigamiDeck(this.npc_cards, 1, this.cardDefinitions)
    this.boardState.addValue(3, this.player2Deck.godCardValues)
    this.cardContainer.removeChild(this.board_cards[3]);
    this.board_cards[3] = new Sprite_Card_Board(3, this.boardState, this.cardDefinitions);
    this.board_cards[3].loadCard(this.player2Deck.godCard, 1);
    this.turnAnimation.setGod2(this.board_cards[3])
    this.board_cards[3].x = this.board_map[3][0][0];
    this.board_cards[3].y = this.board_map[3][0][1];
    this.cardContainer.addChildZ(this.board_cards[3], 0);
    this.cardContainer.sortChildren();
    this.board_cards[3].anchor.x = 0.5;
    this.board_cards[3].anchor.y = 0.5;
    this.cardDefinitions.startTurnEffects = []
    this.cardDefinitions.staticEffects = []
    this.create_board_map();
    this.board_cards[3].setNewBoardState(this.boardState)
    this.board_cards[12].setNewBoardState(this.boardState)
    this._hpWindow.write_hp(this.board_cards);
    this.createOnlineBoard();

};
//-----------------------------------------------------------------------------
// Function : createOnlineBoard - casts opponents card
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.createOnlineBoard = function (data) {
    $boardChoice = this.player2Deck.godCardValues.specialType + 1;
    if ($boardChoice == 1) {
        $dataKamigami.Battlemusic = "Greek Confront"
    } else if ($boardChoice == 2) {
        $dataKamigami.Battlemusic = "Egyptian Confront"
    } else if ($boardChoice == 3) {
        $dataKamigami.Battlemusic = "Nordic Confront"
    } else {
        $dataKamigami.Battlemusic = "Japanese Confront"
    }
    this._backSprite.bitmap = ImageManager.loadKamigami("BOARD".concat($boardChoice));
    AudioManager.playBgm({ name: $dataKamigami.Battlemusic, pan: 0, pitch: 100, volume: 90 });
}


//-----------------------------------------------------------------------------
// Function : proceedCast - casts opponents card
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.proceedCast = function (data) {
    var data = JSON.parse(data);
    let cardEffect = this.cardDefinitions.getCardAttribute(parseInt(data[1]), "cardEffect");

    if (data[4] >= 0) {
        this.set_devotion(1, -data[4])
        this.extra_animations.push(['Cast_Card', 1, data[1], data[2], 0]);
        if (cardEffect == 64) {
            this.onlineDiscardPile = [false]
            //this.onlineDiscardPile.push(false)
            return;
        }
    }
    else {
        this.extra_animations.push(['Cast_Card', 1, data[1], data[2], -1, false])
        this.removeCardGraveyardByIndex(1, data[3])
    }

    if (data[3] != false) {
        if (cardEffect == 23 || cardEffect == 211 || cardEffect == 37 || cardEffect == 110 || cardEffect == 45) {
            this.removeCardGraveyard(1, data[3])
            this.extra_animations[this.extra_animations.length - 1][4] = -1
            //if (cardEffect == 37 || cardEffect == 110) {
            //this.extra_animations.pop();
            //}
            //this.extra_animations.push(['Cast_Card', 1, data[3], data[2], -1, false]);
        }
        else {
            this.onlineDiscardPile.push(data[3]);
        }
    }
};
//-----------------------------------------------------------------------------
// Function : proceedMovement - moves opponents card
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.proceedMovement = function (data) {
    var data = JSON.parse(data);
    this.extra_animations.push(['Move_Card', data[1], data[2], data[3]])
};
//-----------------------------------------------------------------------------
// Function : proceedAttack - attacks opponents card
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.proceedAttack = function (data) {
    var data = JSON.parse(data);
    this.count_frames = 0
    this.extra_animations.push(['Attack_Card', 1, data[1], data[2], data[3]])
};
//-----------------------------------------------------------------------------
// Function : proceedEffect - card Effect
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.proceedEffect = function (data) {

    var data = JSON.parse(data);
    this.count_frames = 0
    //this.extra_animations.push(['Extra_Skills', 1, devotion, target1, target2, effectId, cardId]);
    if (parseInt(data[3]) == 40) {
        data[4] = this.boardState.getValue(data[4]).cardId
        if (data[4] == undefined || data[4] == null) {
            data[4] = 0
        }
    }
    if (parseInt(data[3]) == 222) {
        let index = this.findGraveyardIndex(parseInt(data[1]))
        this.addCardFromGraveyardToHand(1, this.player2_graveyard[index], index);
        return;
    }

    if (parseInt(data[3]) == 31) {
        this.extra_animations.push(['Extra_Skills', 1, data[5], data[1], data[2], data[3], data[4]])
        return;
        //data[2] = 15 - data[2]
    }
    this.extra_animations.push(['Effect_Card', data[4], data[3], data[2]])
    if (parseInt(data[3]) == 109) {
        this.extra_animations.pop();
    }
    if (parseInt(data[3]) == 110) {
        this.set_devotion(1, -data[5])
        return
    }
    this.extra_animations.push(['Extra_Skills', 1, data[5], data[1], data[2], data[3], data[4]])
    if (parseInt(data[3]) == 103) {
        this.extra_animations.pop();
        this.extra_animations.pop();
        this.set_devotion(1, -data[5])
        this.lokiSwapTargets(data[1], data[2])
    }

    //this.extra_animations.push(['Extra_Skills', 1, -playAction.costDevotion, playAction.selfCard, playAction.cardEffect, playAction.cardId]);

};
//-----------------------------------------------------------------------------
// Function : findGraveyardIndex - card Effect
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.findGraveyardIndex = function (cardId) {
    let index = 0;
    for (var n = 0; n < this.player2_graveyard.length; n++) {
        if (this.player2_graveyard[n][0] == cardId) {
            index = n;
            break;
        }
    }
    return index;
}



//-----------------------------------------------------------------------------
// Function : update - updates the loading images
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.update = function () {
    if (this.waiting_for_second_player) {
        if (this.count_frames == 0) {
            this.create_connection();
        }
        this._herokuPing++;
        if (this._herokuPing >= 1200) {
            this.webSocket.send("[\"ping\"]");
            this._herokuPing = 0;
        }
        this._loadingBar.rotation -= 0.2;
        this._cancelBack.opacity += 10;
        if (this._fade_screen_loading.opacity < 200)
            this._fade_screen_loading.opacity += 10;
        if (this._cancelButton.opacity < 170)
            this._cancelButton.opacity += 10;
        this.checkHoverCancelButton();
        this.count_frames++;
        if (this.count_frames == 1)
            return;
        if (this.loop_image) {
            this.LoadingImage.opacity -= 7;
            if (this.LoadingImage.opacity == 0) {
                this.loop_image = false;
            }
        } else {
            this.LoadingImage.opacity += 7;
            if (this.LoadingImage.opacity == 255) {
                this.loop_image = true;
            }
        }
        Scene_Base.prototype.update.call(this);
        return;
    } else if (this._fade_screen_loading.opacity > 0) {
        this._fade_screen_loading.opacity -= 15;
        this.LoadingImage.opacity -= 15;
        if (this._fade_screen_loading.opacity == 0) {
            this.removeChild(this.LoadingImage);
            this.removeChild(this._fade_screen_loading);
            this.removeChild(this._cancelBack);
            this.removeChild(this._cancelButton);
            this.removeChild(this._cancelButtonLight);
            this.removeChild(this._loadingBack);
            this.removeChild(this._loadingBar);
            this.removeChild(this.textPlayersOnline);
            this.LoadingImage.destroy()
            this._fade_screen_loading.destroy()
            this._cancelBack.destroy()
            this._cancelButton.destroy()
            this._cancelButtonLight.destroy()
            this._loadingBack.destroy()
            this._loadingBar.destroy()
            this.textPlayersOnline.destroy()

            this.count_frames = 0;
            this.waiting_for_second_player = false;

        }
        return;
    }
    Scene_Kamigami_Duel.prototype.update.call(this);
};
//-----------------------------------------------------------------------------
// Function : checkHoverCancelButton
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.checkHoverCancelButton = function () {
    if (this._cancelButton.isButtonTouched()) {
        this._cancelButtonLight.opacity += 20
        if (TouchInput.isTriggered()) {
            SceneManager.pop();
        }
    } else
        this._cancelButtonLight.opacity -= 20
}


//-----------------------------------------------------------------------------
// Function : perform_extra_skill
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.perform_extra_skill = function () {
    let target = this.extra_animations[0][3]
    let target2 = this.extra_animations[0][4]
    let devotion = this.extra_animations[0][2]
    let data
    this.playCardAnimation(this.extra_animations[0][5], target)
    this.set_devotion(1, -devotion)
    switch (this.extra_animations[0][5]) {
        case 20: // Online - Horus
            this.set_hp(target, -1000)
            this.resetExtraAnimation()
            break;
        case 21: // Online - Sekhmet
            this.set_hp(target, -10)
            this.resetExtraAnimation()
            break;
        case 22: // Online - Serket
            this.set_hp(target, -10)
            this.resetExtraAnimation()
            break;
        case 31: // Online - Hera
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(target).boardId, 31, 1])
            this.resetExtraAnimation()
            break;
        case 35: // Online - Raijin
            this.set_hp(target, -1000)
            this.resetExtraAnimation()
            break;
        case 39: // Online - Nachi Taisha
            this.set_hp(target, -1000)
            this.resetExtraAnimation()
            break;
        case 40: // Online - Izumo Taisha 
            this.resetExtraAnimation()
            this.extra_animations.unshift(['Discard_Opponent', 1, target]);
            break;
        case 47: // Online - Suzano
            this.resetExtraAnimation()
            this.addCardFromGraveyardToHand(this.turn, this.player2_graveyard[target], target)
            break;
        case 48: // Online - Osiris
            this.set_hp(target, -1000)
            this.resetExtraAnimation()
            break;
        case 61: // Online - Ares
            this.set_hp(target, -1000)
            this.resetExtraAnimation()
            break;
        case 101: // Medusa 
            this.cardDefinitions.addNewStaticEffect([2, this.boardState.getValue(target).boardId, 101])
            this.set_hp(target, -10)
            this.resetExtraAnimation()
            break;
        case 102: // Artemis
            this.set_hp(target, -50)
            this.resetExtraAnimation()
            break;
        case 104: // Idun
            this.set_hp(target, 30)
            this.resetExtraAnimation()
            break;
        case 116: // Ceuci
            this.set_hp(target, 20)
            this.resetExtraAnimation()
            break;
        case 105: // Yuki Onna
            this.apply_yuki_onna();
            this.resetExtraAnimation()
            break;
        case 107: // Izanami
            this.set_hp(target, -999)
            this.set_hp(target2, -1000)
            this.resetExtraAnimation()
            break;
        case 108: // Chimera
            this.apply_chimera(target);
            this.resetExtraAnimation()
            break;
        case 109: // Izanagi
            this.exileCard(1, target, 91)
            this.resetExtraAnimation()
            break;
        case 110: // Set
            let cardId = this.extra_animations[0][6]
            this.resetExtraAnimation()
            this.removeCardGraveyard(1, cardId)
            this.apply_revive(cardId, target2)
            break;

        case 111: // Apophis
            this.cardDefinitions.removeEffectById(this.boardState.getValue(target2).boardId)
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(target2).boardId, 111, this.turn, this.boardState.getValue(target).boardId])
            this.resetExtraAnimation()
            break;
        case 112: // Hel
            this.apply_hel(target2, target)
            this.resetExtraAnimation()
            this.set_hp(target, -999)
            break;
        case 113: // Tyr
            this.sacrificeCard(target)
            this.extra_animations.push(['Cast_Card', 1, target2, target, 0, true]);
            this.resetExtraAnimation()
            break;
        case 114: // Odin
            this.cardDefinitions.addNewStaticEffect([1, this.boardState.getValue(target).boardId, 114])
            this.resetExtraAnimation()
            break
    }
}


//-----------------------------------------------------------------------------
// Function : close_discard_animation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.close_discard_animation = function () {
    if (this.extra_animations[0][2] == 113) {
        var cardEffect = this.cardDefinitions.getCardAttribute(this.player_hand[this.index], "cardEffect")
        if (cardEffect == 63) {
            data = ["effectCard", []]
            data[1] = [this.getOppositeSide(this.board_place), this.player_hand[this.index], 113, this.boardState.getValue(this.board_place).cardId, this.index]
            this.webSocket.send(JSON.stringify(data));

        }

    }
    Scene_Kamigami_Duel.prototype.close_discard_animation.call(this, ...arguments);

}

//-----------------------------------------------------------------------------
// Function : applySkillEffects
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.applySkillEffects = function (target) {
    let data = ["effectCard", []]
    let effectId = this.cardDefinitions.getExtraSkills()[0][1]
    let cardId = this.cardDefinitions.getExtraSkills()[0][0]
    if (this.specialSkillsOnline.includes(effectId)) {
        data[1] = [this.getOppositeSide(this.cardDefinitions.getExtraSkills()[0][3]), this.getOppositeSide(this.board_place), effectId, cardId]
        this.webSocket.send(JSON.stringify(data));
    }
    if (effectId == 64) {
        data = ["playCard", [this.player_hand[this.index], target, 64, this.index]]
        this.webSocket.send(JSON.stringify(data));
    }
    if (effectId == 107) {
        data = ["effectCard", []]
        data[1] = [this.getOppositeSide(target), this.getOppositeSide(this.cardDefinitions.getExtraSkills()[0][0]), 107, cardId]
        this.webSocket.send(JSON.stringify(data));
    }
    return Scene_Kamigami_Duel.prototype.applySkillEffects.call(this, ...arguments);
}
//-----------------------------------------------------------------------------
// Function : lokiSwapTargets
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.lokiSwapTargets = function (target1, target2) {
    if (this.turn == 0 && target1 != target2) {
        let data = ["effectCard", []]
        data[1] = [this.getOppositeSide(target1), this.getOppositeSide(target2), 103, this.boardState.getValue(this.board_place).cardId]
        this.webSocket.send(JSON.stringify(data));
    }
    Scene_Kamigami_Duel.prototype.lokiSwapTargets.call(this, ...arguments)
}

//-----------------------------------------------------------------------------
// Function : special_skill_damage
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.special_skill_damage = function () {
    let data = ["effectCard", []]
    if (this.specialSkillsOnline.includes(this.cardEffect)) {
        data[1] = [this.getOppositeSide(this.extra_animations[0][3]), this.getOppositeSide(this.board_place), this.cardEffect, this.boardState.getValue(this.board_place).cardId]
        this.webSocket.send(JSON.stringify(data));
    }
    return Scene_Kamigami_Duel.prototype.special_skill_damage.call(this, ...arguments);
};

//-----------------------------------------------------------------------------
// Function : execute_cast - executes castCommand
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.execute_cast = function () {
    if (Scene_Kamigami_Duel.prototype.execute_cast.call(this, ...arguments)) {
        let effectId = this.cardDefinitions.getCardAttribute(this.player_hand[this.index], "cardEffect");
        if ([213].includes(parseInt(effectId))) {
            this.castOnlineId = this.player_hand[this.index]
            this.castOnlineIndex = this.index
            return;
        }
        let data = ["playCard", [this.player_hand[this.index], this.board_place, false, this.index]]
        this.webSocket.send(JSON.stringify(data));
    }
};

//-----------------------------------------------------------------------------
// Function : proceed_move 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.proceed_move = function (l) {
    var apply_move = this.cardDefinitions.move_apply_effects(this.boardState.getValue(this.board_place))
    if (Scene_Kamigami_Duel.prototype.proceed_move.call(this, ...arguments)) {
        let data = ["moveCard", [this.board_place, l, -apply_move]]
        this.webSocket.send(JSON.stringify(data));
    }
};

Scene_Kamigami_Duel_Online.prototype.getOppositeSide = function (boardSlot) {
    return 15 - boardSlot
};

//-----------------------------------------------------------------------------
// Function : pass_turn_online
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.pass_turn_online = function () {
    this.cardDefinitions.emptySkill()
    this.resetExtraAnimation()
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
}


//-----------------------------------------------------------------------------
// Function : proceed_pass_turn
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.proceed_pass_turn = function () {
    this._onlineTimer.resetTime();
    if (this.turn == 0) {
        let data = ["passTurn", []]
        this.webSocket.send(JSON.stringify(data));
        Scene_Kamigami_Duel.prototype.proceed_pass_turn.call(this, ...arguments);
    } else {
        this.extra_animations.push(["Pass_Turn"]);
    }


};


//-----------------------------------------------------------------------------
// Function : proceed_attack
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.proceed_attack = function (l) {
    if (Scene_Kamigami_Duel.prototype.proceed_attack.call(this, ...arguments)) {
        let data = ["attackCard", [this.board_place, this.attack_target, -2]]
        this.webSocket.send(JSON.stringify(data));
    }
};

//-----------------------------------------------------------------------------
// Function : sendCardDiscardOnline
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.sendCardDiscardOnline = function (cardId, cardEffect, index) {
    let data
    switch (cardEffect) {
        case 213: // Renew Discard online
            data = ["playCard", [this.castOnlineId, this.board_place, cardId, this.castOnlineIndex, index]]
            this.webSocket.send(JSON.stringify(data));
            break;
        case 40: // Izumo Taisha discard Online
            data = ["effectCard", [cardId, index, cardEffect, this.getOppositeSide(this.board_place)]]
            this.webSocket.send(JSON.stringify(data));
            break;
        default:
            break;
    }
};
//-----------------------------------------------------------------------------
// Function : player_proceed_discard
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.player_proceed_discard_effect = function (player, num, effectCard) {
    if (this.turn == 0) {
        Scene_Kamigami_Duel.prototype.player_proceed_discard_effect.call(this, ...arguments);
    }
};

//-----------------------------------------------------------------------------
// Function : apply_revive - id 211 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.apply_revive = function (cardId, board_place, originalId = false) {
    Scene_Kamigami_Duel.prototype.apply_revive.call(this, ...arguments);
    if (originalId) {
        data = ["playCard", [originalId, this.board_place, false, this.index]]
        this.webSocket.send(JSON.stringify(data));
    }
    if (this.onlineGYIndex != -1) {
        data = ["playCard", [cardId, this.board_place, cardId, this.onlineGYIndex]]
        this.webSocket.send(JSON.stringify(data));
    }
};

//-----------------------------------------------------------------------------
// Function : addCardFromGraveyardToHand - Gets a card from the gy to hand
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.addCardFromGraveyardToHand = function (turn, gyCard, index, castId = 0) {
    let data;
    if (castId != 0) {
        data = ["playCard", [castId, 0, false, this.index]]
        this.webSocket.send(JSON.stringify(data));
    }
    if (turn == 0) {
        data = ["effectCard", [gyCard[0], null, 222, index]]
        this.webSocket.send(JSON.stringify(data));
    }
    Scene_Kamigami_Duel.prototype.addCardFromGraveyardToHand.call(this, ...arguments);
}

//-----------------------------------------------------------------------------
// Function : exileCard
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.exileCard = function (turn, index, id) {
    if (this.turn == 0) {
        data = ["effectCard", [index, null, 109, id]]
        this.webSocket.send(JSON.stringify(data));
    }
    Scene_Kamigami_Duel.prototype.exileCard.call(this, ...arguments);
}

//-----------------------------------------------------------------------------
// Function : proceed_discard_random
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.proceed_discard_random = function (discard = false) {
    if (this.extra_animations[0][3] == -1) {
        this.resetExtraAnimation()
        return
    } else {
        Scene_Kamigami_Duel.prototype.proceed_discard_random.call(this, ...arguments);
    }
}



// MULLIGAN ONLINE

//-----------------------------------------------------------------------------
// Function : playMulliganAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.playMulliganOpponent = function () {
    for (let n = 0; n < this.extra_animations.length; n++) {
        if (this.extra_animations[n][0] == "MulliganNPCConfirm") {
            this.extra_animations.splice(n, 1);
            this.extra_animations.unshift(["MulliganNPCConfirm"])
            break;
        }
    };
    for (let n = 0; n < this.extra_animations.length; n++) {
        if (this.extra_animations[n][0] == "KeepOnlineOpp") {
            this.removeAllMulligansOnline();
        }
    };
}
//-----------------------------------------------------------------------------
// Function : removeAllMulligansOnline
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.removeAllMulligansOnline = function () {
    for (let n = 0; n < this.extra_animations.length; n++) {
        if (this.extra_animations[n][0] == "MulliganOpponent") {
            this.extra_animations.splice(n, 1);
            n--;
        }
    };

}

//-----------------------------------------------------------------------------
// Function : playMulliganAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.proceedMulliganOnline = function () {
    this.extra_animations.push(['MulliganNPCConfirm'])
    return;

}
//-----------------------------------------------------------------------------
// Function : playKeepOnline
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.playKeepOnline = function () {
    for (let n = 0; n < this.extra_animations.length; n++) {
        if (this.extra_animations[n][0] == "MulliganOpponent") {
            this.extra_animations.splice(n, 1);
            n--
        }
    };
    this.closeKeepOpponent()
}


//-----------------------------------------------------------------------------
// Function : playMulliganAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.proceedKeepOnline = function () {
    this.extra_animations.push(['KeepOnlineOpp'])
}
//-----------------------------------------------------------------------------
// Function : closeKeep
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.closeKeep = function () {
    let data = ["keep"]
    this.webSocket.send(JSON.stringify(data));
    Scene_Kamigami_Duel.prototype.closeKeep.call(this, ...arguments);
};

//-----------------------------------------------------------------------------
// Function : newMulligan
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.newMulligan = function () {
    let data = ["mulligan"]
    this.webSocket.send(JSON.stringify(data));
    this._onlineTimer.resetTime();
    Scene_Kamigami_Duel.prototype.newMulligan.call(this, ...arguments);
};
//-----------------------------------------------------------------------------
// Function : newMulligan
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel_Online.prototype.terminate = function () {
    Scene_Kamigami_Duel.prototype.terminate.call(this, ...arguments);
    this.webSocket.close();
};

//-----------------------------------------------------------------------------
// Sprite_Cards
//
// The sprite for displaying a card in triple triad.

function SpriteOnlineTimer() {
    this.initialize.apply(this, arguments);
}

SpriteOnlineTimer.prototype = Object.create(Sprite.prototype);
SpriteOnlineTimer.prototype.constructor = SpriteOnlineTimer;



//-----------------------------------------------------------------------------
// Function : SpriteOnlineTimer
//-----------------------------------------------------------------------------
SpriteOnlineTimer.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this.timer = 3600;
    this._rotationType = true;
    this.createBar();
    this.createBaseHud();
    this.createEmitter();
}
//-----------------------------------------------------------------------------
// Function : createEmitter
//-----------------------------------------------------------------------------
SpriteOnlineTimer.prototype.createEmitter = function () {
    this._emitterSprite = new Sprite();
    this._emitterSprite.bitmap = new Bitmap(0, 0)
    this.addChild(this._emitterSprite)
    this.emitter = fx.getParticleEmitter('hourglass');
    this.emitter.init(this._emitterSprite, true, 1);
}


//-----------------------------------------------------------------------------
// Function : finishTime
//-----------------------------------------------------------------------------
SpriteOnlineTimer.prototype.createBaseHud = function () {
    this._baseHud = new Sprite();
    this._baseHud.bitmap = ImageManager.loadOnlineMenu("hourglass")
    this.addChild(this._baseHud)
    this._baseHud.anchor.x = this._baseHud.anchor.y = 0.5;
}
//-----------------------------------------------------------------------------
// Function : finishTime
//-----------------------------------------------------------------------------
SpriteOnlineTimer.prototype.createBar = function () {
    this._bar = new Sprite();
    this._bar.bitmap = ImageManager.loadOnlineMenu("timeBar")
    this.addChild(this._bar)
    this._bar.x = 0
    this._bar.y = 0
    this._bar.anchor.y = 0.5
    this._bar.scale.y = 0.5
}
//-----------------------------------------------------------------------------
// Function : update
//-----------------------------------------------------------------------------
SpriteOnlineTimer.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if (this.timer > 0 && ((SceneManager._scene.turn == 0 && SceneManager._scene.phase >= 4) || this.onMulligan())) {

        if (Input.isPressed('space') || TouchInput.isRightPressed()) {
            this.timer++;
        }

        this.timer -= 2;
        this._bar.opacity = 180
        this._baseHud.opacity = 180
        this.emitter.x = this._bar.width * this._bar.scale.x - 10
        this._emitterSprite.opacity = 255
        this.rotateBase();
        this.updateHourGlassPosition();
    } else {
        this._bar.opacity = 0
        this._baseHud.opacity = 0
        this._emitterSprite.opacity = 0
    }
    this._bar.scale.x = this.timer / 3600
}
//-----------------------------------------------------------------------------
// Function : update
//-----------------------------------------------------------------------------
SpriteOnlineTimer.prototype.updateHourGlassPosition = function () {
    if (SceneManager._scene.lock_move_cards || SceneManager._scene.extra_animations.length > 0) {
        if (this.y > 80)
            this.y -= 10
    } else {
        if (this.y < Graphics.height / 2) {
            this.y += 10
        }
    }
}


//-----------------------------------------------------------------------------
// Function : rotateBase
//-----------------------------------------------------------------------------
SpriteOnlineTimer.prototype.rotateBase = function () {
    if (this._rotationType) {
        this._baseHud.rotation += 0.02
        if (this._baseHud.rotation > 0.2) {
            this._rotationType = false
        }
    } else {
        this._baseHud.rotation -= 0.02
        if (this._baseHud.rotation < -0.2) {
            this._rotationType = true
        }
    }

}


//-----------------------------------------------------------------------------
// Function : onMulligan
//-----------------------------------------------------------------------------
SpriteOnlineTimer.prototype.onMulligan = function () {
    return SceneManager._scene.extra_animations.length > 0 && SceneManager._scene.extra_animations[0][0] == "MulliganPlayer"
}


//-----------------------------------------------------------------------------
// Function : finishTime
//-----------------------------------------------------------------------------
SpriteOnlineTimer.prototype.finishTime = function () {
    return this.timer <= 0;
}
//-----------------------------------------------------------------------------
// Function : finishTime
//-----------------------------------------------------------------------------
SpriteOnlineTimer.prototype.resetTime = function () {
    this.timer = 3600;
}

