if (false) {
    SceneManager.updateScene = function () {
        if (this._scene) {
            if (this._scene.isStarted()) {
                if (this.isGameActive()) {
                    this._scene.update();
                    this._scene.update();
                }
                if (Input.isPressed("space")) {
                    this._scene.update();
                    this._scene.update();
                    this._scene.update();
                    this._scene.update();
                }
            } else if (this._scene.isReady()) {
                this.onBeforeSceneStart();
                this._scene.start();
                this.onSceneStart();
            }
        }
    };
    //-----------------------------------------------------------------------------
    // Function : create
    //-----------------------------------------------------------------------------
    Scene_Loading.prototype.createOnlineData = function () {
        $dataKamigami.onlineData = {
            highscoreList: [],
            totalExp: 0,
            selfRank: 999
        }
    }
    //-----------------------------------------------------------------------------
    // Function : create
    //-----------------------------------------------------------------------------
    Scene_Loading.prototype.initialize = function () {
        Scene_Base.prototype.initialize.call(this);
        //Graphics._switchFullScreen();
        this.createAllImages();

        //DataManager.loadGame(1)

        this.createOnlineData();
        if (!$dataKamigami.gameOptions.music) { $dataKamigami.gameOptions.music = 100 }
        if (!$dataKamigami.gameOptions.se) { $dataKamigami.gameOptions.se = 100 }
        IAVRA.I18N.language = $dataKamigami.gameOptions.language

        this.createParticleEffects();
        this._text = new PIXI.Text("", { fontFamily: 'GameFont', fontSize: 30, fill: 0xffffff, align: 'right', bold: true });
        this.addChild(this._text)
        this.needsLoading = 0;
        this.loadedFiles = 0;
        this.allFiles = 1;
        this._text.x = 800
        this._text.y = 500
    }
    Scene_Loading.prototype.update = function () {
        Scene_Base.prototype.update.call(this);
        this.needsLoading++
        if (this.needsLoading == 10) {
            this.loadAllGameImages();
            this.backBar.opacity = 255;
            SceneManager.goto(Scene_Title)
        }
        if (this.allFiles == this.loadedFiles) {

        }
        this.loadingBar.scale.x = this.loadedFiles / this.allFiles

    }
    Spriteset_Base.prototype.findTargetSprite = function (target) {
        return target;
    };
    //-----------------------------------------------------------------------------
    // Function : create
    //-----------------------------------------------------------------------------
    Scene_Title.prototype.create = function () {
        Scene_Base.prototype.create.call(this);
        this._spriteset = new Spriteset_Base();
        this._spriteset._effectsContainer = this._spriteset._baseSprite;
        this.addChild(this._spriteset);
        // this._spriteset.addChild(this._spriteset._baseSprite);
        //Graphics._switchFullScreen();
        //this.loadAllGameImages();
        this.createVariables();
        this.createBackground();
        this.create_displacement();
        this.createlogo();
        this.createTouch();
        this.create_fake_center();
        //this.createParticleEffects();
        this._animationCount = 1
    };
    Scene_Title.prototype.update = function () {
        Scene_Base.prototype.update.call(this);
        this.kamigami_frame_count++;
        if (this._fakeCenter) {
            this._fakeCenter.update();
        }
        if (this.kamigami_frame_count == 10) {
            $dataEnemyId = 1
            this.addAllCards();
            this.addAllTestDecks();
            //$boardChoice = 4
            this.configureTestDecks();
            $dataKamigami.fastEnabled = true;
            $dataKamigami.enemy_tt_cards = new Array(41);
            $dataKamigami.enemy_tt_cards.fill(9)
            $dataKamigami.enemy_tt_cards[40] = 1;
            $dataKamigami.maxDifficulty = 2;
            $dataKamigami.difficultySetting = 0;
            $gameParty.gainGold(2000)
            $dataKamigami.booster_packs[0] = true
            $dataKamigami.booster_packs[1] = true
            //this._fakeCenter = new Sprite_Animation_EF();
            //this._fakeCenter.setup([this._logo2, this._logo1], $dataAnimationsEF[this._animationCount], false);
            //this.addChild(this._fakeCenter);
            //this._animationCount++
            //this.addAllTestDecks(); 
            //this.addBrazilTestDecks();
            $dataKamigami.chosenDeck = 1
            $dataKamigami.hasChosenDeck = true
            //let text =  new PIXI.Text(greenworks.getSteamId().steamId, { fontFamily: 'Chau Philomene One', fontSize: 60, fill: 0xc22424, align: 'left', stroke: "#000000", strokeThickness: 3 });
            //this.addChild(text)
            for (let n = 0; n < $dataKamigami.duelInfo.length; n++) {
                $dataKamigami.duelInfo[n].enabled = false
            }
            $dataKamigami.duelInfo[0] = { wins: 0, losses: 0, enabled: true, name: "Nymph" }
            //loadDeck("Anhanga")
            $dataKamigami.arcMythology = 2
            //$dataKamigami.gameOptions.language = "pt"
            //IAVRA.I18N.language = $dataKamigami.gameOptions.language
            //Graphics._switchFullScreen();
            //$dataKamigami.needsRoom = true;
            //SceneManager.goto(Scene_Kamigami_Deck_Build);
            //SceneManager.goto(Scene_Kamigami_CampaignSelect);
            //SceneManager.goto(Scene_Title);
            //SceneManager.goto(Scene_Kamigami_Select_Player);
            //console.log("Teste")
            //$dataKamigami.owned_booster_packs[1] = 20

        }
        //loadDeck("Amaterasu")

        switch (this.phase) {
            case 0:
                this.updateOpacity();
                break;
            case 1:
                this.updateWaitTap();
                break;
            case 2:
                this.proceedToMenu();
                break;
        }
    };

    Scene_Title.prototype.addAllCards = function () {
        $dataKamigami.allCards.fill(4)
        for (let n = 0; n < $dataKamigami.duelInfo.length; n++) {
            $dataKamigami.duelInfo[n].enabled = true
        }

    }


    Scene_Title.prototype.configureTestDecks = function () {
        $dataKamigami.chosenDeck = 0;
        $dataKamigami.decks[0] = ["TestDeck", []]
        for (let n = 0; n < 20; n++) {
            $dataKamigami.decks[0][1].push(130)
        }
        for (let n = 0; n < 20; n++) {

            //$dataKamigami.decks[0][1].push(119)
            $dataKamigami.decks[0][1].push(131)
        }
        $dataKamigami.decks[0][1].push(123)
    };
    Scene_Title.prototype.addAllTestDecks = function () {
        let decks = JSON.parse(PluginManager.parameters('KamigamiDeck')['Enemy Creation']);
        let singleDeck
        let deckNames = ["Poseidon", "Hades", "Zeus", "Set", "Isis", "Ra", "Odin", "Loki", "Thor", "Hel", "Izanagi", "Izanami", "Amaterasu", "Tusukuyomi", "Jaci", "Coaraci", "Tupan", "Anhanga"]
        let index = 1
        for (let n = 0; n < decks.length; n++) {

            singleDeck = JSON.parse(decks[n])
            if (!deckNames.includes(singleDeck["Name"])) {
                continue;
            }
            $dataKamigami.decks[index] = [singleDeck["Name"].concat(" and Friends"), []]
            let deckList = JSON.parse(singleDeck["Card List"])
            for (let m = 0; m < deckList.length; m++) {
                $dataKamigami.decks[index][1].push(parseInt(deckList[m]))
            }

            $dataKamigami.decks[index][1].push(parseInt(singleDeck["God Card"]))
            index++;
        }
    }
    Scene_Title.prototype.addBrazilTestDecks = function () {
        $dataKamigami.decks[1] = ["Tupan and Friends", []]
        $dataKamigami.decks[1][1] = []

        $dataKamigami.decks[index] = ["Coaraci and Friends", []]
        $dataKamigami.decks[index] = ["Jaci and Friends", []]
        $dataKamigami.decks[index] = ["Anhanga and Friends", []]
    }

    //-----------------------------------------------------------------------------
    // Function : create_connection - initiates and handles the connection
    //-----------------------------------------------------------------------------
    Scene_Kamigami_Duel_Online.prototype.create_connection = function () {
        this.webSocket = new WebSocket("wss://" + "localhost" + ":3000")

        //this.webSocket = new WebSocket("ws://" + "kamigami-server.herokuapp.com" + ":80");
        //this.webSocket = new WebSocket("ws://" + JSON.parse(JSON.stringify($dataConnection["connectionUrl"])) + ":2345");
        this.webSocket.onopen = function (event) {
            //data = ["steamId", greenworks.getSteamId().steamId] 
            let data = ["entryConnection", "923456789", $dataKamigami.decks[$dataKamigami.chosenDeck][1], $dataKamigami.needsRoom, $dataKamigami.specificRoom]
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

    const _debug_Duel_initialize_variables = Scene_Kamigami_Duel.prototype.initialize_variables
    //-----------------------------------------------------------------------------
    // Function : initialize_variables
    //-----------------------------------------------------------------------------
    Scene_Kamigami_Duel.prototype.initialize_variables = function () {
        _debug_Duel_initialize_variables.call(this, ...arguments)
        //this.turn = 0;
        //this.devotion_player1 = 1000;
    }

    const _debug_Duel_startAllMethods = Scene_Kamigami_Duel.prototype.startAllMethods
    //-----------------------------------------------------------------------------
    // Function : initialize_variables
    //-----------------------------------------------------------------------------
    Scene_Kamigami_Duel.prototype.startAllMethods = function () {
        _debug_Duel_startAllMethods.call(this, ...arguments)

        //this._stepsCreate = new Sprite_DuelExtras_Steps();
        //this._stepsCreate.x = 500
        //this._stepsCreate.y = 400
        //this.addChild(this._stepsCreate)
    }


    //-----------------------------------------------------------------------------
    // Function : npc_main_phase - manages the opponent's plays!
    //-----------------------------------------------------------------------------
    Scene_Kamigami_Duel_Online.prototype.startMatch = function (data) {
        var data = JSON.parse(data);
        this.startAllMethods();

        this.usingAI = false;
        this.turn = parseInt(data[1]);
        this.turn = 0;
    };

    Scene_Kamigami_Deck_Build.prototype.createFilter = function () {
        this.filter = {
            civilization: [false, false, false, false, true],
            rank: [true, false, false],
            type: [true, true, true, true, true, false]
        }
    };
    const _debug_Duel_spread_cards_initial = Scene_Kamigami_Duel.prototype.spread_cards_initial
    //-----------------------------------------------------------------------------
    // Function : spread_cards_initial
    //-----------------------------------------------------------------------------
    Scene_Kamigami_Duel.prototype.spread_cards_initial = function () {
        _debug_Duel_spread_cards_initial.call(this, ...arguments)
        //this._big_card_front.configureGod("bbr_tupan", 120);
    }
}


