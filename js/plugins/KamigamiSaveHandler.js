
function resetCampaign() {
    $gameSwitches = new Game_Switches();
    $gameVariables = new Game_Variables();
    $gameSelfSwitches = new Game_SelfSwitches();
    $gameMap = new Game_Map();
    $gamePlayer.reserveTransfer($dataSystem.startMapId,
        $dataSystem.startX, $dataSystem.startY);
    Graphics.frameCount = 0;
    DataManager.saveGame(1)
    SceneManager.goto(Scene_Kamigami_Credits)
};

function handleAfterMatch(result) {
    if (result || !$dataKamigami.gameOptions.tutorial) {
        if ($dataEnemyId && $dataKamigami.needsToUpdateScore) {
            $dataKamigami.duelInfo[$dataEnemyId].wins++
        }
        SceneManager.pop();

    } else {
        if ($dataEnemyId && $dataKamigami.needsToUpdateScore) {
            $dataKamigami.duelInfo[$dataEnemyId].losses++
            DataManager.saveGame(1);
        }
        DataManager.setupNewGame();
        DataManager.loadGame(1)
        //$gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
        SceneManager.goto(Scene_Main_Menu)
    }
};
var $dataEnemyId
var $boardChoice = 1
function loadDeck(deckName, difficulty = false) {

    $dataKamigami.onTutorial = false
    let handicap = false
    $dataKamigami.handicap = 0;
    //return
    if (difficulty !== false) {
        $dataKamigami.needsToUpdateScore = true
    } else {
        $dataKamigami.needsToUpdateScore = false
        difficulty = $dataKamigami.maxDifficulty;
        if (difficulty == 0)
            handicap = true;
    }
    DataManager.saveGame(1)
    $dataKamigami.difficultySetting = difficulty
    if (deckName == "hidden") {
        $dataKamigami.enemy_tt_cards = [13, 13, 13, 13, 15, 15, 15, 15, 19, 19, 19, 19, 35, 35, 35, 35, 50, 50, 50, 50, 38, 38, 38, 38, 72, 72, 72, 72, 97, 97, 97, 97, 103, 103, 103, 103, 106, 106, 106, 106, 61]
        SceneManager.snapForBackgroundFix()
        SceneManager.push(Scene_Kamigami_PreDuel)
        return
    }
    if (deckName == "Tutorial") {
        $dataKamigami.enemy_tt_cards = [13, 13, 13, 13, 15, 15, 15, 15, 19, 19, 19, 19, 35, 35, 35, 35, 50, 50, 50, 50, 38, 38, 38, 38, 72, 72, 72, 72, 97, 97, 97, 97, 103, 103, 103, 103, 106, 106, 106, 106, 61]
        $dataKamigami.onTutorial = true
        SceneManager.snapForBackgroundFix()
        $dataEnemyId = false;
        SceneManager.push(Scene_Kamigami_PreDuel);
        return
    }


    var decks = JSON.parse(PluginManager.parameters('KamigamiDeck')['Enemy Creation']);
    for (var n = 0; n < decks.length; n++) {
        let singleDeck = JSON.parse(decks[n])
        $dataKamigami.enemyName = singleDeck["Name"]
        if (singleDeck["Name"] == deckName) {
            $dataEnemyId = n;
            if (handicap && n < 3) {
                $dataKamigami.handicap = 3 - n
            }
            $dataKamigami.enemy_tt_cards = JSON.parse(singleDeck["Card List"])
            $dataKamigami.enemy_tt_cards.push(parseInt(singleDeck["God Card"]))
            $boardChoice = Game_Kamigami.convertedCardList[$dataKamigami.enemy_tt_cards[40]].specialType + 1
            configureDeckLevel(n, singleDeck["Name"])

            switch (singleDeck["Name"]) {
                case "Poseidon":
                case "Hades":
                case "Zeus":
                case "Athena":
                    $dataKamigami.Battlemusic = "Greek Final Confront"
                    break
                case "Isis":
                case "Set":
                case "Ra":
                    $dataKamigami.Battlemusic = "Egyptian Final Confront"
                    break
                case "Odin":
                case "Loki":
                case "Hel":
                case "Thor":
                case "Dagandr":
                    $dataKamigami.Battlemusic = "Nordic Final Confront"
                    break
                case "Tsukuyomi":
                case "Amaterasu":
                case "Izanami":
                case "Izanagi":
                    $dataKamigami.Battlemusic = "Japanese Final Confront"
                    break
                default:
                    if ($boardChoice == 1) {
                        $dataKamigami.Battlemusic = "Greek Confront"
                    } else if ($boardChoice == 2) {
                        $dataKamigami.Battlemusic = "Egyptian Confront"
                    } else if ($boardChoice == 3) {
                        $dataKamigami.Battlemusic = "Nordic Confront"
                    } else {
                        $dataKamigami.Battlemusic = "Japanese Confront"
                    }

                    break
            }
            SceneManager.snapForBackgroundFix()
            SceneManager.push(Scene_Kamigami_PreDuel)
            return
        }


    }
}

function configureDeckLevel(deckIndex, name) {
    let deckLevel = Math.floor(deckIndex * 1.5) + $dataKamigami.difficultySetting * 40
    if ($dataKamigami.difficultySetting == 2) {
        $dataKamigami.handicap = -3
    }
    switch (name) {
        case "Poseidon":
        case "Hades":
        case "Zeus":
        case "Isis":
        case "Set":
        case "Ra":
        case "Odin":
        case "Loki":
        case "Hel":
        case "Thor":
        case "Tsukuyomi":
        case "Amaterasu":
        case "Izanami":
        case "Izanagi":
        case "Athena":
        case "Dagandr":
            if ($dataKamigami.difficultySetting == 0) {
                deckLevel += 10;
            }
            if ($dataKamigami.difficultySetting == 1) {
                deckLevel += 100;
                $dataKamigami.handicap = -2
            }
            if ($dataKamigami.difficultySetting == 2) {
                $dataKamigami.handicap = -5
            }
            break
    }


    for (let c = 0; c < $dataKamigami.enemy_tt_cards.length; c++) {
        if (c >= deckLevel) {
            $dataKamigami.enemy_tt_cards[c] = parseInt($dataKamigami.enemy_tt_cards[c]) + 300
        } else if (c + 40 > deckLevel) {
            $dataKamigami.enemy_tt_cards[c] = parseInt($dataKamigami.enemy_tt_cards[c]) + 150
        }

    }

};
