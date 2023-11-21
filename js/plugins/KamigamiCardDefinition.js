/*:SKILL LIST:
1 - Zeus
2 - Amaterasu
3 - Isis
4 - Ra
5 - Poseidon
6 - Tsukiyomi
7 - Hades
8 - Thor
9 - Tupan
10 - Coaraci
11 - Jaci


14 - hermes
15 - nymph
16 - battle plan
17 - poseidon statue
18 - Aphrodite
19 - naiku
20 - Horus
21 - Sekhmet
22 - Serket
23 - Phoenix
24 - Kirin
25 - ryujin
26 - Skadi
27 - Freyja
28 - Yggdrasil
29 - Idun Tree
30 - Apollo
31 - Hera
32 - Demeter
33 - Hephaestus
34 - Zeus' Statue 
35 - Raijin
36 - Fujin
37 - Anubis
38 - Inari Okami
39 - Nachi Taisha
40 - Izumo Taisha
41 - Urd
42 - Mount Olympus
43 - Passage to Valhalla
44 - Great Desert
45 - Mummy
46 - Cyclops
47 - Suzano
48 - Osiris
49 - Phoenix Egg
50 - Baldr
51 - Valkyrie
52 - Nidhogg
53 - Sphinx's Statue
54 - Obelisk
55 - Hades Statue
56 - Bifrost
57 - Wall of Asgard
58 - Gleipnir
59 - Toshogu Shrine
60 - Pharaoh's Plague
61 - Ares
62 - Ningyo
63 - Fenrir
64 - Heimdall
65 - Toyatama
66 - Kuat/Iae
67 - Sume
68 - Iara
69 - Akuanduba
70 - Ruda
71 - Lobisomem
72 - Boto
73 - Cuca
74 - Boitata
75 - Curupira
76 - Full Moon
77 - Thunder Storm
78 - Sunlight
79 - Hunting Shrine



101 - Medusa
102 - Artemis
103 - Loki
104 - Idun
105 - Yuki Onna
107 - Izanami
108 - Chimera
109 - Izanagi
110 - Set
111 - Apophis
112 - Hel
113 - Tyr
114 - Odin
115 - Anhanga
116 - Ceuci
117 - Dark Forest

201 - Zeus' bolt
202 - Eclipse
203 - Everflowing Sun
204 - Everflowing Chalice
205 - The Plague
206 - Mjolnir's Storm
207 - Decimation
208 - Soul Extraction
209 - Calamity
210 - Earthquake
211 - Revive
212 - Idun's Apple
213 - Renew
214 - Path of the Ancient
215 - Rise of the pharaoh
216 - Flow of the Nile
217 - Seaquake
218 - Armageddon
219 - Call to Arms
220 - Loki's Trick
221 - Turn to Dust
222 - Time Reflow
223 - Giant's Throw
224 - Artemis' Arrow
225 - Heimdall's Warning
226 - Ragnarok
227 - For the Gods
228 - Atmospheric Form
229 - Rage of the gods
230 - Soul Exchange
231 - Hunting Spirits
232 - Invoke the spirits
233 - Firestorm
234 - Hunting Spear



*/

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// CARD DEFINITIONS /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

//-----------------------------------------------------------------------------
// Function : callCardDefinition - happens when a card with an effect is cast
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.callCardDefinition = function (cardId, AI, turn = this.turn, cardDefinions = this.cardDefinions) {
    this.tupanActivation = false
    var cardEffect = parseInt(this.cardDefinitions.getCardAttribute(cardId, "cardEffect"))
    switch (cardEffect) {
        case 1: // Zeus
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(this.board_place).boardId, 1, turn])
            break
        case 2: // Amaterasu
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(this.board_place).boardId, 2, turn])
            break
        case 3: // Isis
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(this.board_place).boardId, 3, turn])
            break
        case 5: // Poseidon
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 5, turn])
            break
        case 6: //Tsukiyomi
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 6, turn])
            break
        case 7: // Hades
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(this.board_place).boardId, 7, turn])
            break
        case 8: // Thor
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 8, turn])
            break
        case 9: //Tupan
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 9, turn])
            break
        case 10: // Coaraci
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 10, turn])
            break
        case 11: // Jaci
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 11, turn])
            break
        case 14: //Hermes
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 14, turn])
            break;
        case 15: // Nymph
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 15, turn])
            break;
        case 16: //Battle Plan
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 16, turn])
            break;
        case 17: // Poseidon Statue
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 17, turn])
            break;
        case 18: //Aphrodite
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 18, turn])
            break;
        case 19: //Naiku
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(this.board_place).boardId, 19, turn])
            break;
        case 20: //Horus
            this.extra_animations.push(['Effect_Card', cardId, 20, turn])
            break;
        case 21: // Sekhmet
            this.extra_animations.push(['Effect_Card', cardId, 21, turn])
            break;
        case 22: //Serket
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(this.board_place).boardId, 22, turn])
            break;
        case 24: // Kirin
            this.cardDefinitions.addNewStartTurnEffect([2, this.boardState.getValue(this.board_place).boardId, 24, turn])
            break;
        case 25: // Ryujin
            this.extra_animations.push(['Effect_Card', cardId, 25, turn])
            break;
        case 26: //Skadi
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 26, turn])
            break;
        case 27: // Freyja
            this.extra_animations.push(['Effect_Card', cardId, 27, turn])
            break
        case 28: //Yggdrasil
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 28, turn])
            break;
        case 29: // Idun Tree
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(this.board_place).boardId, 29, turn])
            break;
        case 30: //Apollo
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(this.board_place).boardId, 30, turn])
            break;
        case 31: // Hera
            this.extra_animations.push(['Effect_Card', cardId, 311, turn])
            break;
        case 32: //Hephaestus
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 32, turn])
            break;
        case 33: //Hephaestus
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 33, turn])
            break;
        case 34: // Zeus Statue
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(this.board_place).boardId, 34, turn])
            break;
        case 35: //Raijin
            this.extra_animations.push(['Effect_Card', cardId, 35, turn])
            break;
        case 36: // Fujin
            this.extra_animations.push(['Effect_Card', cardId, 36, turn, this.board_place])
            break
        case 37: //Anubis
            this.extra_animations.push(['Effect_Card', cardId, 37, turn])
            break
        case 39: // Nachi Taisha
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(this.board_place).boardId, 39, turn])
            break;
        case 40: // Izumo Taisha
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(this.board_place).boardId, 40, turn])
            break;
        case 41: // Urd
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(this.board_place).boardId, 41, turn])
            break
        case 42: // Mount Olympus
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 42, turn])
            break;
        case 43: // Passage to Valhalla
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 43, turn])
            break;
        case 44: // Great Desert
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(this.board_place).boardId, 44, turn])
            break
        case 46: // Cyclops
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 46, turn])
            break
        case 47: // Suzano
            this.extra_animations.push(['Effect_Card', cardId, 47, turn])
            break
        case 48: // Osiris
            this.extra_animations.push(['Effect_Card', cardId, 48, turn])
            break
        case 49: // Phoenix Egg
            this.cardDefinitions.addNewStartTurnEffect([6, this.boardState.getValue(this.board_place).boardId, 49, turn])
            break
        case 50: // Baldr
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 50, turn])
            break;
        case 51: // Valkyrie
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 51, turn])
            break
        case 52: // Nidhogg
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 52, turn])
            break
        case 53: // Sphinx Statue
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 53, turn])
            break
        case 54: // Obelisk
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(this.board_place).boardId, 54, turn])
            break
        case 55: // Hades Statue
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 55, turn])
            break
        case 56: // Bifrost
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 56, turn])
            break
        case 57: // Wall of Asgard
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 57, turn])
            break
        case 58: // Gleipnir
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 58, turn])
            break
        case 59: // Toshogu
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 59, turn])
            break
        case 60: // Pharaoh's Plague
            this.cardDefinitions.addNewEndTurnEffect([-1, this.boardState.getValue(this.board_place).boardId, 60, turn])
            break
        case 61: // Ares
            this.extra_animations.push(['Effect_Card', cardId, 61, turn])
            break
        case 62: // Ningyo
            this.extra_animations.push(['Effect_Card', cardId, 62, turn])
            this.extra_animations.push(['DiscardRandom', 1, turn == 0 ? 1 : 0, -1]);
            break
        case 64: // Heimdall
            this.extra_animations.push(['Effect_Card', cardId, 64, turn])
            this.flashing_area = []
            this.extra_animations.push(['ChooseCardPlayer', this.turn, 64]);
            this.phase = 4
            break
        case 65: // Toyatama
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(this.board_place).boardId, 65, turn])
            break
        case 66: // Kuat/Iae
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(this.board_place).boardId, 66, turn])
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 66, turn])
            break
        case 67: // Sume
            this.extra_animations.push(['Effect_Card', cardId, 67, turn])
            this.extra_animations.push(['DiscardRandom', 1, turn == 0 ? 1 : 0, -1]);
            this.extra_animations.push(['DiscardRandom', 1, turn == 0 ? 1 : 0, -1]);
            this.extra_animations.push(['DiscardRandom', 1, turn == 0 ? 1 : 0, -1]);
            break
        case 68: // Iara
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(this.board_place).boardId, 68, turn])
            break
        case 70: // Ruda
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 70, turn])
            break;
        case 71: // Lobisomem
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 71, turn])
            break
        case 72: // Boto
            this.extra_animations.push(['Effect_Card', cardId, 72, turn])
            break
        case 73: // Cuca
            this.extra_animations.push(['Effect_Card', cardId, 73, turn])
            break
        case 74: // Boitata
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(this.board_place).boardId, 74, turn])
            break
        case 76: // Full Moon
            this._weatherSprite.changeWeather("night")
            break;
        case 77: // Thunder Storm
            this._weatherSprite.changeWeather("storm")
            break;
        case 78: // Sunlight
            this._weatherSprite.changeWeather("day")
            break;
        case 79: // Hunting Shrine
            this.cardDefinitions.addNewStaticEffect([-1, this.boardState.getValue(this.board_place).boardId, 79, turn])
            break;
        case 201: // Zeus Bolt
            this.set_hp(this.board_place, -1000);
            break;
        case 202: // Eclipse
            this.set_hp(this.board_place, -1000);
            break;
        case 203: // Everflowing Sun
            this.player_proceed_draw(turn, 2)
            break;
        case 204: // Everflowing Chalice
            if (this.countPermanents(3) > 0)
                this.player_proceed_draw(turn, this.countPermanents(3))
            break;
        case 205: // The Plague
            this.changeHpAll(-10)
            break;

        case 206: // Mjolnir's Storm
            this.changeHpAllColumn(-10, this.board_place)
            break;
        case 207: // Decimation
            this.changeHpAllNotMain(-999)
            break;
        case 208: // Soul Extraction
            this.set_devotion(turn == 0 ? 1 : 0, -1000, true)
            break;
        case 209: // Calamity
            this.set_hp(this.board_place, -1000);
            break;
        case 210: // Earthquake
            this.changeHpAllMonuments(-1000)
            break;
        case 211: // Revive
            this.callReviveAI()
            break
        case 227: // For the Gods
            this.apply_for_the_gods(turn)
            break
        case 212: // Idun's Apple
            this.set_hp(this.board_place, 20);
            break;
        case 213: // Renew
            this.player_proceed_draw(turn, 1)
            this.player_proceed_discard(turn, 1, 213)
            break;
        case 214: // Path of the Ancient
            this.set_devotion(turn, 10, false, 207)
            break;
        case 215: // Rise of the pharaoh
            this.set_devotion(turn, 20, false, 207)
            break;
        case 216: // Flow of the Nile
            this.set_devotion(turn, 30, false, 207)
            break;
        case 217: // Seaquake
            this.changeHpAll(-30)
            break;
        case 218: //Armageddon
            this.changeHpAllNotMain(-999)
            this.changeHpAllMonuments(-1000)
            this.resetHelStatus()
            break
        case 219: // Call to Arms
            this.cardDefinitions.addNewStaticEffect([1, this.boardState.getValue(this.board_place).boardId, 219, turn])
            break
        case 231: // Hunting Spirits
            this.applyHuntingSpirits(this.board_place)
            break;
        case 220: //Loki's Trick
            this.cardDefinitions.apply_loki_trick(this.boardState, turn)
            break
        case 221: // Turn to Dust
            this.set_hp(this.board_place, -1000);
            break
        case 222: // Time Reflow
            this.callTimeReflowAI()
            break
        case 223: // Giant Throw
            this.apply_giant_throw(this.board_place)
            break
        case 224: // Artemis' Arrow
            this.set_hp(this.board_place, -20);
            break
        case 230: // Soul Exchange
            this.applySoulExchange()
            break;
        case 225: // Heimdall's Warning
            this.cardDefinitions.addNewStaticEffect([1, this.boardState.getValue(this.board_place).boardId, 225, turn])
            break
        case 226: // Ragnarok
            this.cardDefinitions.forceStaticRagnarok = true
            this.cardDefinitions.addNewStaticEffect([3, -1, 226, this.turn])
            break
        case 232: // Invoke the Spirits
            this.applyInvokeTheSpirits(turn)
            break;
        case 233: // Firestorm
            this.changeHpAll(-20)
            this.changeHpAllMonuments(-10)
            break;
        case 234: // Hunting Spear
            this.set_hp(this.board_place, -30);
            break;
    }
    if (this.cardDefinitions.forceStaticRagnarok && this.boardState.getValue(this.board_place).cardType == 1 && this.boardState.getValue(this.board_place).specialType == 2) {
        this.cardDefinitions.addNewStaticEffect([3, this.boardState.getValue(this.board_place).boardId, 226, turn])
    }
};
Scene_Kamigami_Duel.prototype.resetHelStatus = function () {
    for (let n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).cardEffect == 112) {
            let cardId = this.boardState.getValue(n).cardId
            let turn = this.boardState.getValue(n).turn
            let card = new KamigamiCard();
            let boardId = this.boardState.getValue(n).boardId
            card.loadCardData(cardId, turn)
            this.boardState.addValue(n, card, boardId)
        }
    }
    this._hpWindow.write_hp(this.board_cards)
}


////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// STATIC EFFECTS /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : apply_loki_trick - id 220 - cartas dos oponentes não podem se mover no prox turno
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.apply_loki_trick = function (boardState, turn) {
    for (var n = 0; n < 16; n++) {
        if (boardState.hasCard(n) && boardState.getValue(n).turn != turn && boardState.getValue(n).cardType != 3)
            this.addNewStaticEffect([2, boardState.getValue(n).boardId, 101])
    }
}
Scene_Kamigami_Duel.prototype.apply_giant_throw = function (board_place) {
    var n = board_place
    if (this.boardState.hasCard(n) && this.boardState.getValue(n).cardType != 3)
        this.set_hp(board_place, - 20)
    n = board_place + 1
    if (board_place % 4 < 3 && this.boardState.hasCard(n) && this.boardState.getValue(n).cardType != 3)
        this.set_hp(board_place + 1, - 20)
    n = board_place - 1
    if (board_place % 4 > 0 && this.boardState.hasCard(n) && this.boardState.getValue(n).cardType != 3)
        this.set_hp(board_place - 1, - 20)
    n = board_place - 4
    if (parseInt(board_place / 4) > 0 && this.boardState.hasCard(n) && this.boardState.getValue(n).cardType != 3)
        this.set_hp(board_place - 4, - 20)
    n = board_place + 4
    if (parseInt(board_place / 4) < 3 && this.boardState.hasCard(n) && this.boardState.getValue(n).cardType != 3)
        this.set_hp(board_place + 4, - 20)
}

Scene_Kamigami_Duel.prototype.applyHuntingSpirits = function (boardPlace) {
    this.boardState.getValue(boardPlace).attack += 10
}


//-----------------------------------------------------------------------------
// Function : apply_poseidon - id 5 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_poseidon = function (turn) {
    var moveCost = 0
    for (var n = 0; n < 16; n++) {
        if (this.boardState.isEmpty(n))
            continue
        if (this.boardState.getValue(n).turn == turn && this.boardState.getValue(n).specialType == 0 && this.boardState.getValue(n).cardType != 0) {
            moveCost -= 2
        }
    }
    return moveCost
}
//-----------------------------------------------------------------------------
// Function : applyCoaraci - id 10 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.applyCoaraci = function () {
    var baseCost = 0
    if (this._weatherSprite.weatherType() == 1) {
        baseCost = -(6 - this._weatherSprite.weatherTurns())
    }
    return baseCost
}



//-----------------------------------------------------------------------------
// Function : applyIae - id 5 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.applyIae = function (turn) {
    var moveCost = 0
    if (this._weatherSprite.weatherType() == 2)
        moveCost = -3
    return moveCost
}



//-----------------------------------------------------------------------------
// Function : apply_nymph - id 15 - adiciona 
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.apply_nymph = function (target) {
    if (target.specialType == 0 && target.cardType != 3)
        return 2
    return 0
}
//-----------------------------------------------------------------------------
// Function : apply_ruda - id 70 - adiciona 
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.apply_ruda = function (target) {
    if (target.specialType == 4 && target.cardType != 3)
        return 1
    return 0
}
//-----------------------------------------------------------------------------
// Function : apply_baldr - id 50 - adiciona 
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.apply_baldr = function (target) {
    if (target.specialType == 2 && target.cardType != 3)
        return 2
    return 0
}
//-----------------------------------------------------------------------------
// Function : apply_poseidon_statue - id 17 - adiciona 
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.apply_poseidon_statue = function (board_card) {
    if (board_card.specialType == 0)
        return -2
    return 0
}
//-----------------------------------------------------------------------------
// Function : apply_skadi - id 26 - adiciona 
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.apply_skadi = function (board_card) {
    if (board_card.specialType == 2)
        return -1
    return 0
}
//-----------------------------------------------------------------------------
// Function : apply_demeter - id 32 - adiciona 
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.apply_demeter = function (board_card) {
    if (board_card.specialType == 0)
        return -1;
    return 0;
};

//-----------------------------------------------------------------------------
// Function : apply_hephaestus - id 33 - adiciona 
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.apply_hephaestus = function (board_card) {
    if (board_card.specialType == 0 && board_card.cardType == 0)
        return -2
    return 0
}
//-----------------------------------------------------------------------------
// Function : apply_passage_valhalla - id 43 - adiciona 
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.apply_passage_valhalla = function (board_card) {
    if (board_card.specialType == 2 && board_card.cardType == 1)
        return -1000
    return 0
}
//-----------------------------------------------------------------------------
// Function : apply_bifrost - id 56 - adiciona 
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.apply_bifrost = function (board_card) {
    if (board_card.specialType == 2 && board_card.cardType != 3)
        return -1
    return 0
}

//-----------------------------------------------------------------------------
// Function : apply_hermes - id 14 - adiciona 
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.apply_hermes = function (board_card) {
    if (board_card.specialType == 0)
        return -1
    return 0
}

//-----------------------------------------------------------------------------
// Function : apply_huntingShrine - id 79 - adiciona 
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.apply_huntingShrine = function (board_card) {
    if (board_card.specialType == 4)
        return -1
    return 0
}


//-----------------------------------------------------------------------------
// Function : apply_nidhogg - id 52 - adiciona 
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.apply_nidhogg = function (turn) {
    var count = 0
    for (var n = 0; n < SceneManager._scene.player1_graveyard.length; n++) {
        if (this.getCardAttribute(SceneManager._scene.player1_graveyard[n][0], "specialType") == 2)
            count--
    }
    return count
}
//-----------------------------------------------------------------------------
// Function : applyAkuanduba - id 69 - adiciona 
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.applyAkuanduba = function (boardState, index, turn) {
    let attackValue = 0
    if (boardState.left(index) && boardState.left(index) != -1 && boardState.left(index).turn == turn && boardState.left(index).cardEffect == 69) {
        attackValue += 10
    }
    if (boardState.right(index) && boardState.right(index) != -1 && boardState.right(index).turn == turn && boardState.right(index).cardEffect == 69) {
        attackValue += 10
    }
    if (boardState.up(index) && boardState.up(index) != -1 && boardState.up(index).turn == turn && boardState.up(index).cardEffect == 69) {
        attackValue += 10
    }
    if (boardState.down(index) && boardState.down(index) != -1 && boardState.down(index).turn == turn && boardState.down(index).cardEffect == 69) {
        attackValue += 10
    }
    return attackValue
}

//-----------------------------------------------------------------------------
// Function : apply_zeus - id 1 - adiciona 1 de devoção para cada unidade grega
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_zeus = function (boardState, turn = true) {
    var devotion = 0
    var AI = false
    if (turn === true)
        turn = this.turn
    else
        AI = true
    for (var n = 0; n < 16; n++) {
        if (boardState.isEmpty(n))
            continue
        if (boardState.getValue(n).turn == turn && boardState.getValue(n).specialType == 0 && boardState.getValue(n).cardType == 1) {
            devotion++
        }
    }
    if (AI) {
        return devotion
    } else
        this.set_devotion(this.turn, devotion, false, 242);
}

// Function : applyAnhanga - id 9 - adiciona 1 de devoção para cada unidade grega
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.applyAnhanga = function (turn) {
    let card = new KamigamiCard()
    let cardId
    if (turn == 0) {
        cardId = this.player1_graveyard[this.player1_graveyard.length - 1][0]
        card.loadCardData(cardId, 0)
        if (card.specialType == 4) {
            this.set_devotion(this.turn, Math.ceil(card.costDevotion / 4))
        } else {
            this.set_devotion(this.turn, 1)
        }
    } else {
        cardId = this.player2_graveyard[this.player2_graveyard.length - 1][0]
        card.loadCardData(cardId, 0)
        if (card.specialType == 4) {
            this.set_devotion(this.turn, Math.ceil(card.costDevotion / 4))
        } else {
            this.set_devotion(this.turn, 1)
        }
    }
}

//-----------------------------------------------------------------------------
// Function : apply_hel - id 112
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_hel = function (board_place, board_target) {
    var helCard = this.boardState.getValue(board_place)
    var sacCard = this.boardState.getValue(board_target)
    helCard.mhp += 10; helCard.hp += 10; helCard.moveCost = Math.max(1, helCard.moveCost - 1); helCard.attackCost = Math.max(1, helCard.attackCost - 1)
    helCard.addDevotion += sacCard.addDevotion
    this._hpWindow.write_hp(this.board_cards)
}
//-----------------------------------------------------------------------------
// Function : apply_thor - id 8
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_thor = function (turn, cardId) {
    for (var n = 0; n < this.cardDefinitions.staticEffects.length; n++) {
        if (this.cardDefinitions.getCardAttribute(cardId, "specialType") == "2" && this.cardDefinitions.staticEffects[n][3] == turn && this.cardDefinitions.staticEffects[n][2] == 8) {
            this.extra_animations.push(['Effect_Card', this.getCardIdByBoardId(this.cardDefinitions.staticEffects[n][1]), 8, turn])
        }
    }
}
//-----------------------------------------------------------------------------
// Function : applyTupan - id 9
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.applyTupan = function (turn = this.turn) {
    for (var n = 0; n < this.cardDefinitions.staticEffects.length; n++) {
        if (this.cardDefinitions.staticEffects[n][3] == turn && this.cardDefinitions.staticEffects[n][2] == 9) {
            if (!this.tupanActivation) {
                this.extra_animations.push(['Effect_Card', this.getCardIdByBoardId(this.cardDefinitions.staticEffects[n][1]), 9, turn])
                this.player_proceed_draw(this.turn, 1)
            }
            this.tupanActivation = true;
            return;
        }
    }

}

//-----------------------------------------------------------------------------
// Function : applyJaci - id 11
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.applyJaci = function (value, card, turn) {
    if (value < 0) {
        for (var n = 0; n < this.cardDefinitions.staticEffects.length; n++) {
            if (this.cardDefinitions.staticEffects[n][3] == turn && this.cardDefinitions.staticEffects[n][2] == 11) {
                value = Math.max(-card.mhp, value)
                value = value / 2
                this.set_hp(this.getBoardPositionById(this.cardDefinitions.staticEffects[n][1]), value)
                return value
            }
        }
    }
    return value
}


//-----------------------------------------------------------------------------
// Function : apply_hades - id 7 - adiciona 1 de devoção para cada unidade grega no cemiterio
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_hades = function (turn) {
    var devotion = 0
    if (turn === 0)
        for (var n = 0; n < this.player1_graveyard.length; n++) {
            if (this.cardDefinitions.getCardAttribute(this.player1_graveyard[n][0], "specialType") == 0 && this.cardDefinitions.getCardAttribute(this.player1_graveyard[n][0], "cardType") == 1)
                devotion++
        } else
        for (var n = 0; n < this.player2_graveyard.length; n++) {
            if (this.cardDefinitions.getCardAttribute(this.player2_graveyard[n][0], "specialType") == 0 && this.cardDefinitions.getCardAttribute(this.player2_graveyard[n][0], "cardType") == 1)
                devotion++
        }
    if (this.npc_AI) {
        return devotion
    } else
        this.set_devotion(turn, devotion);
}

//-----------------------------------------------------------------------------
// Function : apply_ra - id 4 - você pode conjurar unidades egipcias em qualquer lugar no campo
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_ra = function (turn, boardState) {
    if (boardState == null)
        boardState = this.boardState
    for (var n = 0; n < 16; n++) {
        if (boardState.hasCard(n) && boardState.getValue(n).cardEffect == 4 && boardState.getValue(n).turn == turn) {
            return true
        }
    }
    return false
}
//-----------------------------------------------------------------------------
// Function : apply_amaterasu - id 2 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_amaterasu = function (boardState, turn = true) {
    var devotion = 0;
    if (turn === true)
        turn = this.turn;
    for (var n = 0; n < 16; n++) {
        if (this.turn == 0)
            devotion = this.player_hand.length
        else
            devotion = this.npc_hand.length
    };
    if (this.npc_AI) {
        return devotion;
    } else
        this.set_devotion(this.turn, devotion, false, 232);
};

//-----------------------------------------------------------------------------
// Function : apply_isis - id 3 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_isis = function (boardState, turn = true) {
    let animation = $dataAnimations[194];
    let delay = 0;
    for (var n = 0; n < 16; n++) {
        if (boardState.isEmpty(n))
            continue;
        if (boardState.getValue(n).turn == this.turn && boardState.getValue(n).specialType == 1 && (boardState.getValue(n).cardType == 1 || boardState.getValue(n).cardType == 0)) {
            this.set_hp(n, 10)
            this.board_light_slots[n].startAnimation(animation, false, delay * 3, 1);
            delay += 1;
        }
    };
};
//-----------------------------------------------------------------------------
// Function : apply_phoenix_egg - id 49 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_phoenix_egg = function (effect) {
    var position = this.getBoardPositionById(effect[1])
    var card_name
    this.boardState.getValue(position).loadCardData(41, this.turn)
    if (this.turn == 0)
        card_name = this.cardDefinitions.getCardAttribute(this.boardState.getValue(position).cardId, "Image_Player_1")
    else
        card_name = this.cardDefinitions.getCardAttribute(this.boardState.getValue(position).cardId, "Image_Player_2")
    this.board_cards[position].loadCard(this.boardState.getValue(position).cardId, this.turn)
    this._hpWindow.write_hp(this.board_cards)
    let animation = $dataAnimations[134];
    this.board_light_slots[position].startAnimation(animation, false, 0, 1);
};

//-----------------------------------------------------------------------------
// Function : lokiSwapTargets
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.lokiSwapTargets = function (target1, target2) {
    if (target1 != target2) {
        var cardId = 59
        for (var n = 0; n < 16; n++) {
            if (this.boardState.hasCard(n) && this.boardState.getValue(n).cardEffect == 103 && this.boardState.getValue(n).turn == this.turn)
                cardId = this.boardState.getValue(n).cardId
        }
        this.extra_animations.unshift(['Loki_Effect', target1, target2])
        this.extra_animations.unshift(['Effect_Card', cardId, 103, this.turn])
    }
}
//-----------------------------------------------------------------------------
// Function : has_special_skill
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.has_special_skill = function (board_position) {
    var card = this.boardState.getValue(board_position);
    if (card.cardEffect > 100) {
        return true;
    }
};
//-----------------------------------------------------------------------------
// Function : check_card_skill_definition_area
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.check_card_skill_definition_area = function (board_position) {
    var card = this.boardState.getValue(board_position);
    switch (card.cardEffect) {
        case 101:// Medusa
            this.check_light_slot_skill_close(board_position);
            break;
        case 102: // Artemis
            this.check_light_slot_skill_far(board_position);
            break;
        case 103: // Loki
            this.check_light_all_creatures();
            break;
        case 104: // Idun
            this.check_light_all_player_creatures(board_position, this.turn);
            break;
        case 116: // Ceuci
            this.check_light_all_player_creatures(board_position, this.turn);
            break;
        case 105: //Yuki Onna
            this.flashingArea0();
            this.loadActionAnimation("special")
            break;
        case 107: //Izanami
            this.check_light_all_permanents_izanami(this.turn)
            break
        case 108: // Chimera
            this.flashing_area = []
            this.flashing_area.push(board_position);
            this.loadActionAnimation("special")
            break
        case 109: // Izanagi
            this.flashing_area = []
            this.extra_animations.push(['ChooseCardPlayer', this.turn, 109, card.cardId]);
            this.phase = 4
            break
        case 117: // Dark Forest
            this.flashing_area = []
            this.extra_animations.push(['ChooseCardPlayer', this.turn, 117, card.cardId, board_position]);
            this.phase = 4
            break
        case 110: // Set
            this.flashingAreaGraveyardCreature(card.cardId)
            break
        case 111: // Apophis
            this.check_light_all_player_creatures(board_position, this.turn == 0 ? 1 : 0);
            break
        case 112: // Hel
            this.check_light_all_player_creatures_not_turn(board_position, this.turn)
            break
        case 113: // Tyr
            this.flashing_area = []
            this.extra_animations.push(['ChooseCardPlayer', this.turn, 113]);
            this.phase = 4
            break
        case 114: // Odin
            this.check_light_all_player_creatures_odin(board_position, this.turn)
            break
        case 115: // Anhanga
            if (this.turn == 0 && this.player1_graveyard.length > 0) {
                this.extra_animations.push(['Effect_Card', card.cardId, 115, this.turn])
            } else if (this.turn == 1 && this.player2_graveyard.length > 0) {
                this.extra_animations.push(['Effect_Card', card.cardId, 115, this.turn])
            }
            break

    }
}
//-----------------------------------------------------------------------------
// Function : check_board_triggers
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.check_board_triggers = function () {
    this.checkStartTurnEffects(this.turn);

};

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// ACTIVE SKILLS /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : execute_special_skill
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.execute_special_skill = function (target) {
    this.cardEffect = this.boardState.getValue(this.board_place).cardEffect;
    if (this.set_devotion(0, - Math.max(0, this.getSkillCost(this.cardEffect)))) {
        SoundManager.playOk();
        this.extra_animations.push(['Special_Skill', this.turn, this.board_place, target, this.cardEffect]);
        this.attack_target = target
        this.attack_phase = 7;
        this.phase = 5;
    }
    else {
        SoundManager.playBuzzer();
        this.phase = 5;
    }
}
//-----------------------------------------------------------------------------
// Function : getSkillCost
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.getSkillCost = function (cardEffectId) {
    var costSkill = 0
    switch (cardEffectId) {
        case 101:// Medusa
            costSkill += 10; break
        case 102: // Artemis
            costSkill += 20; break
        case 103: // Loki
            costSkill += 0; break
        case 1030: // Loki
            costSkill += 5; break
        case 104: // Idun
            costSkill += 7; break
        case 105: // Yuki Onna
            costSkill += 20; break
        case 108: // Chimera
            costSkill += 9; break
        case 111: // Apophis
            costSkill += 10; break
        case 110: // Set
            costSkill += 20; break
        case 116: // Ceuci
            costSkill += 4; break
    }
    for (var n = 0; n < this.cardDefinitions.staticEffects.length; n++) {
        if (this.cardDefinitions.staticEffects[n][3] == this.turn && this.cardDefinitions.staticEffects[n][2] == 55) {
            costSkill -= 3
        }
    }
    return Math.max(0, costSkill);
};
//-----------------------------------------------------------------------------
// Function : skillDamage
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.skillDamage = function (cardEffect) {
    switch (cardEffect) {
        case 101: // Medusa
            return -10
        case 102: // Artemis
            return -50
        case 104: // Idun
            return 30
        case 116: // Ceuci
            return 20
        case 112: // Hel
            return -1000

    }
    return 0
}

//-----------------------------------------------------------------------------
// Function : special_skill_damage
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.special_skill_damage = function () {
    if (!this.extra_animations[0]) { return 0 }
    this.playCardAnimation(this.cardEffect, this.extra_animations[0][3])
    switch (this.cardEffect) {
        case 101: // Medusa
            this.cardDefinitions.addNewStaticEffect([2, this.boardState.getValue(this.extra_animations[0][3]).boardId, 101])
            return -10;
        case 102: // Artemis
            return -50;
        case 103: // Loki
            this.lokiFirstTarget = this.extra_animations[0][3]
            this.cardDefinitions.addExtraSkillById(this.boardState.getValue(this.extra_animations[0][3]).cardId, 103);
            return 0;
        case 104: // Idun
            return 30
        case 116: // Ceuci
            return 20
        case 105: //Yuki Onna
            this.apply_yuki_onna();
            return 0
        case 107: //Izanami
            this.cardDefinitions.addExtraSkillById(this.extra_animations[0][3], 107);
            return 0
        case 108: // Chimera
            this.apply_chimera(this.extra_animations[0][3]);
            return 0
        case 111: // Apophis
            this.cardDefinitions.removeEffectById(this.boardState.getValue(this.board_place).boardId)
            this.cardDefinitions.addNewStartTurnEffect([-1, this.boardState.getValue(this.board_place).boardId, 111, this.turn, this.boardState.getValue(this.extra_animations[0][3]).boardId])
            return 0
        case 112: // Hel
            this.apply_hel(this.board_place, this.extra_animations[0][3])
            return -1000
        case 114: // Odin
            for (var n = 0; n < this.cardDefinitions.staticEffects.length; n++) {
                if (this.cardDefinitions.staticEffects[n][1] == this.boardState.getValue(this.extra_animations[0][3]).boardId && this.cardDefinitions.staticEffects[n][2] == 114)
                    return 0
            }
            this.cardDefinitions.addNewStaticEffect([1, this.boardState.getValue(this.extra_animations[0][3]).boardId, 114])
            return 0
        case 115: // Anhanga
            return 0
    }
    return 0
};

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// SKILL AREAS /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : check_light_slot_skill_close
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.check_light_slot_skill_close = function (index) {
    this.flashing_area = [];
    if (this.boardState.left(index) && this.boardState.left(index) != -1 && this.boardState.left(index).turn != this.turn) {
        this.flashing_area.push(index - 1);
    }
    if (this.boardState.right(index) && this.boardState.right(index) != -1 && this.boardState.right(index).turn != this.turn) {
        this.flashing_area.push(index + 1);
    }
    if (this.boardState.up(index) && this.boardState.up(index) != -1 && this.boardState.up(index).turn != this.turn) {
        this.flashing_area.push(index - 4);
    }
    if (this.boardState.down(index) && this.boardState.down(index) != -1 && this.boardState.down(index).turn != this.turn) {
        this.flashing_area.push(index + 4);
    }
    this.loadActionAnimation("special")
};
//-----------------------------------------------------------------------------
// Function : check_light_slot_skill_far
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.check_light_slot_skill_far = function (index) {
    this.flashing_area = [];
    var tempIndex
    var turn = this.turn == 0 ? 1 : 0
    if (this.boardState.left(index)) {
        tempIndex = index - 1
        if (this.boardState.left(tempIndex) && this.boardState.left(tempIndex).turn == turn)
            this.flashing_area.push(tempIndex - 1)
        if (this.boardState.up(tempIndex) && this.boardState.up(tempIndex).turn == turn)
            this.flashing_area.push(tempIndex - 4)
        if (this.boardState.down(tempIndex) && this.boardState.down(tempIndex).turn == turn)
            this.flashing_area.push(tempIndex + 4)
    }
    if (this.boardState.right(index)) {
        tempIndex = index + 1
        if (this.boardState.right(tempIndex) && this.boardState.right(tempIndex).turn == turn)
            this.flashing_area.push(tempIndex + 1)
        if (this.boardState.up(tempIndex) && this.boardState.up(tempIndex).turn == turn)
            this.flashing_area.push(tempIndex - 4)
        if (this.boardState.down(tempIndex) && this.boardState.down(tempIndex).turn == turn)
            this.flashing_area.push(tempIndex + 4)
    }
    if (this.boardState.up(index) && this.boardState.up(index - 4) && this.boardState.up(index - 4).turn == turn)
        this.flashing_area.push(index - 8)
    if (this.boardState.down(index) && this.boardState.down(index + 4) && this.boardState.down(index + 4).turn == turn)
        this.flashing_area.push(index + 8)
    this.loadActionAnimation("special")
};
//-----------------------------------------------------------------------------
// Function : check_light_monument
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.check_light_monument = function (turn) {
    this.flashing_area = [];
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == turn && this.boardState.getValue(n).cardType == 3) {
            this.flashing_area.push(n);
        }
    }
    this.loadActionAnimation("special")
};
//-----------------------------------------------------------------------------
// Function : check_light_lowest_cost
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.check_light_lowest_cost = function (turn) {
    var lowest_cost = 100
    var lowest_cost_board_place = []
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == turn && this.boardState.getValue(n).cardType != 0) {
            var costDevotion = parseInt(this.cardDefinitions.getCardAttribute(this.boardState.getValue(n).cardId, "costDevotion"))
            if (costDevotion == lowest_cost) {
                lowest_cost = costDevotion
                lowest_cost_board_place.push(n)
            } else if (costDevotion < lowest_cost) {
                lowest_cost_board_place = []
                lowest_cost = costDevotion
                lowest_cost_board_place.push(n)
            }

        }
    }
    for (var n = 0; n < lowest_cost_board_place.length; n++)
        this.flashing_area.push(lowest_cost_board_place[n]);
    this.loadActionAnimation("special")
};

//-----------------------------------------------------------------------------
// Function : check_light_creature
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.check_light_creature = function (turn) {
    this.flashing_area = [];
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == turn && this.boardState.getValue(n).cardType != 3) {
            this.flashing_area.push(n);
        }
    }
    this.loadActionAnimation("special")
};
//-----------------------------------------------------------------------------
// Function : check_light_creature
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.check_light_permanent_no_god = function (turn) {
    this.flashing_area = [];
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == turn && this.boardState.getValue(n).cardType != 0) {
            this.flashing_area.push(n);
        }
    }
    this.loadActionAnimation("special")
};
//-----------------------------------------------------------------------------
// Function : check_light_creature
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.check_light_creature_no_god = function (turn) {
    this.flashing_area = [];
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == turn && this.boardState.getValue(n).cardType != 0 && this.boardState.getValue(n).cardType != 3) {
            this.flashing_area.push(n);
        }
    }
    this.loadActionAnimation("special")
};
//-----------------------------------------------------------------------------
// Function : check_light_all_creatures
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.check_light_all_creatures = function (excludedCreature) {
    this.flashing_area = [];
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).cardType != 3) {
            this.flashing_area.push(n);
        }
    }
    this.loadActionAnimation("special")
};
//-----------------------------------------------------------------------------
// Function : check_light_izanami
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.check_light_izanami = function (creatureId) {
    var id = this.boardState.getValue(creatureId).cardId
    var costDevotion = parseInt(this.cardDefinitions.getCardAttribute(id, "costDevotion"))
    var cardType = parseInt(this.cardDefinitions.getCardAttribute(id, "cardType"))
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn != this.turn && this.boardState.getValue(n).cardType == cardType && parseInt(this.cardDefinitions.getCardAttribute(this.boardState.getValue(n).cardId, "costDevotion")) < costDevotion) {
            this.flashing_area.push(n);
        }
    }
    this.loadActionAnimation("special")
}

//-----------------------------------------------------------------------------
// Function : check_light_all_permanents
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.check_light_all_permanents = function (turn) {
    this.flashing_area = [];
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == turn && this.boardState.getValue(n).cardType != 0) {
            this.flashing_area.push(n);
        }
    }
    this.loadActionAnimation("special")
};

//-----------------------------------------------------------------------------
// Function : check_light_all_permanents
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.check_light_all_permanents_izanami = function (turn) {
    this.flashing_area = [];
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == turn && this.boardState.getValue(n).cardType != 0 && this.boardState.getValue(n).specialType == 3) {
            this.flashing_area.push(n);
        }
    }
    this.loadActionAnimation("special")
};
//-----------------------------------------------------------------------------
// Function : check_light_all_player_creatures_not_turn
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.check_light_all_player_creatures_not_turn = function (board_position, turn) {
    this.flashing_area = [];
    for (var n = 0; n < 16; n++) {
        if (n == board_position)
            continue;
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == turn && this.boardState.getValue(n).specialType == 2 && this.boardState.getValue(n).cardType != 3 && !this.boardState.enteredThisTurn(n)) {
            this.flashing_area.push(n);
        }
    }
    this.loadActionAnimation("special")
};
//-----------------------------------------------------------------------------
// Function : check_light_all_player_creatures
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.check_light_all_player_creatures = function (board_position, turn) {
    this.flashing_area = [];
    for (var n = 0; n < 16; n++) {
        if (n == board_position)
            continue;
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == turn && this.boardState.getValue(n).cardType != 3) {
            this.flashing_area.push(n);
        }
    }
    this.loadActionAnimation("special")
};

//-----------------------------------------------------------------------------
// Function : check_light_all_player_creatures
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.check_light_all_player_creatures_odin = function (board_position, turn) {
    this.flashing_area = [];
    for (var n = 0; n < 16; n++) {
        if (n == board_position)
            continue;
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == turn && this.boardState.getValue(n).cardType != 3 && this.boardState.getValue(n).specialType == 2) {
            this.flashing_area.push(n);
        }
    }
    this.loadActionAnimation("special")
};
//-----------------------------------------------------------------------------
// Function : check_light_slot
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.check_light_slot = function (index, npc_hand = [], boardState = null) {
    this.stopActionAnimation()
    this.flashing_area = [];
    if (index == -1) {
        return;
    }

    if (this.player_hand.length == 0 && this.turn == 0)
        return;
    if (npc_hand.length == 0 && this.turn == 1)
        return;
    if (this.turn == 0)
        var effectArea = parseInt(this.cardDefinitions.getCardAttribute(this.player_hand[index], 'effectArea'));
    else
        var effectArea = parseInt(this.cardDefinitions.getCardAttribute(npc_hand[index], 'effectArea'));
    if (this.apply_ra(this.turn, boardState)) {
        if (this.turn == 0) {
            var specialType = parseInt(this.cardDefinitions.getCardAttribute(this.player_hand[index], 'specialType'));
            var cardType = parseInt(this.cardDefinitions.getCardAttribute(this.player_hand[index], 'cardType'));
        }
        else {
            var specialType = parseInt(this.cardDefinitions.getCardAttribute(npc_hand[index], 'specialType'));
            var cardType = parseInt(this.cardDefinitions.getCardAttribute(npc_hand[index], 'cardType'));
        }
        if (cardType == 1 && specialType == 1) {
            effectArea = 4;
        }
    }
    this.flashingAreaConfirm(index, npc_hand, boardState, effectArea)
};
//-----------------------------------------------------------------------------
// Function : flashingAreaConfirm
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.flashingAreaConfirm = function (index, npc_hand, boardState, effectArea) {
    switch (effectArea) {
        case 0:
            this.flashingArea0();
            break;
        case 1:
            this.flashingArea1(boardState);
            break;
        case 2:
            this.flashingArea2(boardState);
            break;
        case 3:
            this.flashingArea3(boardState);
            break;
        case 4:
            this.flashingArea4(boardState)
            break
        case 5:
            this.flashingArea_opposite_god(boardState)
            break;
        case 6:
            this.flashingAreaUnit(boardState)
            break
        case 7:
            this.flashingAreaGraveyardCreature(this.turn == 0 ? this.player_hand[index] : npc_hand[index])
            break
        case 8:
            this.flashingAreaMonument(boardState)
            break
        case 9:
            this.flashingAreaGraveyardMiracle(this.turn == 0 ? this.player_hand[index] : npc_hand[index])
            break
        case 10:
            this.flashingAreaOwnCreature(boardState)
            break
        case 11:
            this.flashingAreaUnitEnemy(boardState)
            break
    }
    this.loadActionAnimation("cast")
}
//-----------------------------------------------------------------------------
// Function : flashingArea0
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.flashingArea0 = function () {
    for (var n = 0; n < 16; n++) {
        this.flashing_area.push(n);
    }
};
//-----------------------------------------------------------------------------
// Function : flashingArea1
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.flashingArea1 = function (boardState) {
    if (boardState == null)
        boardState = this.boardState;
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == this.turn) {
            if (boardState.left(n) == -1)
                if (!this.flashing_area.includes(n - 1))
                    this.flashing_area.push(n - 1);
            if (boardState.up(n) == -1)
                if (!this.flashing_area.includes(n - 4))
                    this.flashing_area.push(n - 4);
            if (boardState.right(n) == -1)
                if (!this.flashing_area.includes(n + 1))
                    this.flashing_area.push(n + 1);
            if (boardState.down(n) == -1)
                if (!this.flashing_area.includes(n + 4))
                    this.flashing_area.push(n + 4);
        }
    }
};
//-----------------------------------------------------------------------------
// Function : flashingArea2 - Oponents deities
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.flashingArea2 = function (boardState) {
    if (boardState == null)
        boardState = this.boardState
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn != this.turn && (this.boardState.getValue(n).cardType == 1 || this.boardState.getValue(n).cardType == 4))
            this.flashing_area.push(n);
    }
};

//-----------------------------------------------------------------------------
// Function : flashingArea3 - Oponents permanents 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.flashingArea3 = function (boardState) {
    if (boardState == null)
        boardState = this.boardState
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn != this.turn && (this.boardState.getValue(n).cardType == 1 || this.boardState.getValue(n).cardType == 3 || this.boardState.getValue(n).cardType == 4))
            this.flashing_area.push(n);
    }
};

//-----------------------------------------------------------------------------
// Function : flashingArea4 - Free Area
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.flashingArea4 = function (boardState) {
    if (boardState == null)
        boardState = this.boardState
    for (var n = 0; n < 16; n++) {
        if (boardState.isEmpty(n))
            this.flashing_area.push(n);
    }
};
//-----------------------------------------------------------------------------
// Function : flashingArea_opposite_god
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.flashingArea_opposite_god = function (boardState) {
    if (boardState == null)
        boardState = this.boardState
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn != this.turn && this.boardState.getValue(n).cardType == 0)
            this.flashing_area.push(n);
    }
};
//-----------------------------------------------------------------------------
// Function : flashingAreaUnit
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.flashingAreaUnit = function (boardState) {
    if (boardState == null)
        boardState = this.boardState
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == this.turn && this.boardState.getValue(n).cardType != 3)
            this.flashing_area.push(n);
    }
};
//-----------------------------------------------------------------------------
// Function : flashingAreaUnitEnemy
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.flashingAreaUnitEnemy = function (boardState) {
    if (boardState == null)
        boardState = this.boardState
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn != this.turn && this.boardState.getValue(n).cardType != 3)
            this.flashing_area.push(n);
    }
};
//-----------------------------------------------------------------------------
// Function : flashingAreaMonument
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.flashingAreaMonument = function (boardState) {
    if (boardState == null)
        boardState = this.boardState
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn != this.turn && this.boardState.getValue(n).cardType == 3)
            this.flashing_area.push(n);
    }
};
//-----------------------------------------------------------------------------
// Function : flashingAreaGraveyardCreature
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.flashingAreaGraveyardCreature = function (card) {
    var cardType
    if (this.turn == 1) {
        this.flashing_area = [0]
        return
    }
    this.player1_graveyard_show = []
    var cardEffect = parseInt(this.cardDefinitions.getCardAttribute(card, 'cardEffect'))
    for (var n = 0; n < this.player1_graveyard.length; n++) {
        cardType = parseInt(this.cardDefinitions.getCardAttribute(this.player1_graveyard[n][0], 'cardType'))
        if (cardType == 1) {
            this.player1_graveyard_show.push(this.player1_graveyard[n])
        }
    }
    this.graveyardLimit = 700
    this.wait_choice_card_graveyard = true
    this.resetGraveyardPosition(150)

    this.gyShowing = 1
    this.onCastGraveyard = cardEffect
    this.onCastGraveyardCardId = card
}

//-----------------------------------------------------------------------------
// Function : flashingAreaGraveyardMiracle
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.flashingAreaGraveyardMiracle = function (card, turn = this.turn) {
    var cardType
    this.player1_graveyard_show = []
    if (this.turn == 1) {
        this.flashing_area = [0]
        return
    }
    var cardEffect = parseInt(this.cardDefinitions.getCardAttribute(card, 'cardEffect'))
    for (var n = 0; n < this.player1_graveyard.length; n++) {
        cardType = parseInt(this.cardDefinitions.getCardAttribute(this.player1_graveyard[n][0], 'cardType'))
        if (cardType == 2) {
            this.player1_graveyard_show.push(this.player1_graveyard[n])
        }
    }
    this.graveyardLimit = 700
    this.wait_choice_card_graveyard = true
    this.resetGraveyardPosition()
    this.gyShowing = 1
    this.onCastGraveyard = cardEffect
    this.onCastGraveyardCardId = card
}

//-----------------------------------------------------------------------------
// Function : flashingAreaGraveyardCreature
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.flashingAreaGraveyardCreatureAnubis = function (card) {
    var cardType
    this.player1_graveyard_show = []
    var cardEffect = parseInt(this.cardDefinitions.getCardAttribute(card, 'cardEffect'))
    var cardEffectTarget
    for (var n = 0; n < this.player1_graveyard.length; n++) {
        cardEffectTarget = parseInt(this.cardDefinitions.getCardAttribute(this.player1_graveyard[n][0], 'cardEffect'))
        cardType = parseInt(this.cardDefinitions.getCardAttribute(this.player1_graveyard[n][0], 'cardType'))
        if (cardType == 1 && cardEffectTarget != 37) {
            this.player1_graveyard_show.push(this.player1_graveyard[n])
        }
    }
    this.graveyardLimit = 700
    this.wait_choice_card_graveyard = true
    this.resetGraveyardPosition()
    this.gyShowing = 1
    this.onCastGraveyard = cardEffect
    this.onCastGraveyardCardId = card
}

//-----------------------------------------------------------------------------
// Function : flashingAreaOwnCreature - Own permanents 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.flashingAreaOwnCreature = function (boardState) {
    if (boardState == null)
        boardState = this.boardState
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == this.turn && (this.boardState.getValue(n).cardType == 1 || this.boardState.getValue(n).cardType == 0))
            this.flashing_area.push(n);
    }
};
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// KamigamiCardEffects Class /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// ---------------------------------------------------------
// This class holds all effects by the kamigami cards
// ---------------------------------------------------------
function KamigamiCardDefinitions() {
    this.initialize.apply(this, arguments);
}

KamigamiCardDefinitions.prototype.constructor = KamigamiCardDefinitions;
//-----------------------------------------------------------------------------
// Function : initialize
// turnEffects : [duration in turns(int), effect, boardCard]
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.initialize = function () {
    this.startTurnEffects = [];
    this.endTurnEffects = [];
    this.staticEffects = [];
    this.extraSkills = [];
    this.cardBoardId = 0;
};

//-----------------------------------------------------------------------------
// Function : addExtraSkill
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.addExtraSkill = function (cardId, cardEffectId, turn = 0, target = 0) {
    this.extraSkills.push([SceneManager._scene.boardState.getValue(cardId).cardId, cardEffectId, 0]);
};
//-----------------------------------------------------------------------------
// Function : addExtraSkill
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.addExtraSkillById = function (cardId, cardEffectId, turn = 0, target = 0) {
    this.extraSkills.push([cardId, cardEffectId, turn]);
};
//-----------------------------------------------------------------------------
// Function : addNewTurnEffect
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.getExtraSkills = function () {
    return this.extraSkills;
};
//-----------------------------------------------------------------------------
// Function : removeSkill
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.removeSkill = function () {
    this.extraSkills.shift()
};
//-----------------------------------------------------------------------------
// Function : removeSkill
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.emptySkill = function () {
    this.extraSkills = []
};
//-----------------------------------------------------------------------------
// Function : addNewTurnEffect
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.getCardList = function () {
    return Game_Kamigami.convertedCardList;
};
//-----------------------------------------------------------------------------
// Function : addNewTurnEffect
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.getCardAttribute = function (cardId, att, boardPlace = SceneManager._scene.board_place) {
    var card2 = Game_Kamigami.convertedCardList[cardId]

    var value = card2[att];
    if (value == undefined) {
        console.log("undefined", att)
    }
    if (att === "costDevotion") {
        value = parseInt(value)
        var temp = new KamigamiCard()
        temp.loadCardData(cardId, this.turn)
        value = this.cast_apply_effects(temp, boardPlace, value)
    }
    return value;
};


//-----------------------------------------------------------------------------
// Function : addNewTurnEffect
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.addNewStartTurnEffect = function (effect) {
    this.startTurnEffects.push(effect);
};
//-----------------------------------------------------------------------------
// Function : addNewEndTurnEffect
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.addNewEndTurnEffect = function (effect) {
    this.endTurnEffects.push(effect);
};
//-----------------------------------------------------------------------------
// Function : addNewStaticEffect
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.addNewStaticEffect = function (effect) {
    this.staticEffects.push(effect);
};
//-----------------------------------------------------------------------------
// Function : endTurn
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.endTurn = function () {
    this.forceStaticRagnarok = false
    var effects = []
    for (var n = 0; n < this.endTurnEffects.length; n++) {
        effects.push(this.endTurnEffects[n])
        this.endTurnEffects[n][0]--;
        if (this.endTurnEffects[n][0] == 0) {
            this.endTurnEffects.splice(n, 1);
            n--;
        }
    }
    var odin_kills = []
    for (var n = 0; n < this.staticEffects.length; n++) {
        this.staticEffects[n][0]--;
        if (this.staticEffects[n][0] == 0) {
            if (this.staticEffects[n][2] == 114) { // Odin{{
                odin_kills.push(SceneManager._scene.getBoardPositionById(this.staticEffects[n][1]))
            }
            if (this.staticEffects[n][2] == 226 && this.staticEffects[n][1] != -1) { // Odin{{
                odin_kills.push(SceneManager._scene.getBoardPositionById(this.staticEffects[n][1]))
            }
            this.staticEffects.splice(n, 1);
            n--;
        }
    }
    for (var n = 0; n < odin_kills.length; n++)
        SceneManager._scene.set_hp(odin_kills[n], -1000)
    return effects
};

//-----------------------------------------------------------------------------
// Function : startTurn
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.startTurn = function () {
    var effects = [];
    for (var n = 0; n < this.startTurnEffects.length; n++) {
        effects.push(this.startTurnEffects[n])
        this.startTurnEffects[n][0]--;
        if (this.startTurnEffects[n][0] == 0) {
            if (this.startTurnEffects[n][2] == 49) { // Phoenix Egg
                SceneManager._scene.extra_animations.push(['Effect_Card', SceneManager._scene.getCardIdByBoardId(effects[n][1]), effects[n][2], this.turn])
                SceneManager._scene.apply_phoenix_egg(this.startTurnEffects[n])
            }
            if (this.startTurnEffects[n][2] == 72) { // Boto
                SceneManager._scene.extra_animations.push(['Effect_Card', SceneManager._scene.getCardIdByBoardId(effects[n][1]), effects[n][2], this.turn])
                SceneManager._scene.set_hp(SceneManager._scene.getBoardPositionById(effects[n][1]), -999)
            }
            this.startTurnEffects.splice(n, 1);
            n--;
        }
    }
    return effects;
};
//-----------------------------------------------------------------------------
// Function : checkEndTurnEffects
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.checkEndTurnEffects = function (turn) {
    effects = this.cardDefinitions.endTurn()
    for (var n = 0; n < effects.length; n++) {
        switch (effects[n][2]) {
            case 60: // Pharaoh's Plague
                if (turn == effects[n][3])
                    this.extra_animations.push(['Effect_Card', this.getCardIdByBoardId(effects[n][1]), effects[n][2], this.turn])
                break
        }
    }
}
//-----------------------------------------------------------------------------
// Function : checkStartTurnEffects
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.checkStartTurnEffects = function (turn = this.turn) {
    if (this.npc_AI)
        return;
    effects = this.cardDefinitions.startTurn();
    this.boardState.startTurn()
    for (var n = 0; n < effects.length; n++) {
        if ((this.turn == 1) && this instanceof Scene_Kamigami_Duel_Online) {
            if (effects[n][2] == 40)
                continue;
        }
        switch (effects[n][2]) {

            case 1: // Zeus
            case 2: // Amaterasu
            case 3: // Isis
            case 7: // Hades
            case 19: // Naiku
            case 24: // Kirin
            case 29: // Idun Tree
            case 30: // Apollo
            case 34: // Zeus Statue
            case 40: // Izumo Taisha
            case 41: // Urd
            case 44: // Great Desert
            case 54: // Obelisk
            case 66: // Kuat/Iae
            case 74: // Boitata
                if (turn == effects[n][3])
                    this.extra_animations.push(['Effect_Card', this.getCardIdByBoardId(effects[n][1]), effects[n][2], this.turn])
                break
            case 31: // Hera
            case 39: // Nachi Taisha
            case 22: // Serket
            case 65: // Toyatama
            case 68: // Iara
                if (turn == effects[n][3])
                    this.extra_animations.push(['Effect_Card', this.getCardIdByBoardId(effects[n][1]), effects[n][2], this.turn, effects[n][1]])
                break
            case 111: // Apophis
                if (turn == effects[n][3])
                    this.extra_animations.push(['Effect_Card', this.getCardIdByBoardId(effects[n][1]), effects[n][2], this.turn, effects[n][4]])
                break
        }

    }
}

//-----------------------------------------------------------------------------
// Function : getBoardByBoardId
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.getBoardByBoardId = function (boardId) {
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).boardId == boardId) {
            return this.boardState.getValue(n)
        }
    }
    return -1;
}
//-----------------------------------------------------------------------------
// Function : getCardIdByBoardId
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.getCardIdByBoardId = function (boardId) {
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).boardId == boardId) {
            return this.boardState.getValue(n).cardId
        }
    }
    return -1;
}
//-----------------------------------------------------------------------------
// Function : getBoardPositionById
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.getBoardPositionById = function (boardId) {
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).boardId == boardId) {
            return n
        }
    }
    return -1;
}
//-----------------------------------------------------------------------------
// Function : getCardIdByEffectId
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.getCardIdByEffectId = function (effectId) {
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).boardId == effectId) {
            return this.boardState.getValue(n).cardId
        }
    }
    return -1;
}
//-----------------------------------------------------------------------------
// Function : getBoardPositionById
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.getTurnById = function (boardId) {
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).boardId == boardId) {
            return this.boardState.getValue(n).turn
        }
    }
    return 0;
}
//-----------------------------------------------------------------------------
// Function : apply_attack
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.apply_attack = function (boardState, boardPlace, turn) {
    var base_attack = boardState.getValue(boardPlace).attack
    for (var n = 0; n < this.staticEffects.length; n++) {
        switch (this.staticEffects[n][2]) {
            case 219: // Call To Arms
                if (boardState.getValue(boardPlace).boardId == this.staticEffects[n][1])
                    base_attack += 10
                break
            case 114: // Odin
                if (boardState.getValue(boardPlace).boardId == this.staticEffects[n][1])
                    base_attack *= 2
                break
            case 225: // Heimdall's Warning
                if (boardState.getValue(boardPlace).specialType == 2)
                    base_attack += 10
                break
            case 51: // Valkyrie
                if (this.staticEffects[n][3] == turn && boardState.getValue(boardPlace).cardEffect == 51)
                    base_attack += 10
                break
            case 71: //Lobisomem
                if (this.staticEffects[n][3] == turn && SceneManager._scene._weatherSprite.weatherType() == 2)
                    base_attack += 20
                break;
        }

    }
    if (boardState.getValue(boardPlace).specialType == 4)
        base_attack += this.applyAkuanduba(boardState, boardPlace, turn)
    return base_attack
}

//-----------------------------------------------------------------------------
// Function : attack_apply_effects
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.attack_apply_effects_no_target = function (boardCard, turn) {
    var attackCost = boardCard.attackCost
    for (var n = 0; n < this.staticEffects.length; n++) {
        if (this.staticEffects[n][1] == boardCard.boardId) {
            switch (this.staticEffects[n][2]) {
                case 101: //Medusa
                    return 9999;
            }
        }
        switch (this.staticEffects[n][2]) {
            case 16: //Battle Plan
                if (this.staticEffects[n][3] == turn)
                    attackCost -= 1
                break
            case 26: //Skadi
                if (this.staticEffects[n][3] == turn)
                    attackCost += this.apply_skadi(boardCard)
                break
            case 32: //Demeter
                if (this.staticEffects[n][1] != boardCard.boardId && this.staticEffects[n][3] == turn)
                    attackCost += this.apply_demeter(boardCard)
                break
            case 33: //Hephaestus
                if (this.staticEffects[n][3] == turn)
                    attackCost += this.apply_hephaestus(boardCard)
                break
            case 57: // Wall of Asgard
                if (this.staticEffects[n][3] != turn)
                    attackCost += 2
                break
        }
    }
    return Math.max(attackCost, 1)
};

//-----------------------------------------------------------------------------
// Function : attack_apply_effects
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.attack_apply_effects = function (target, boardCard, boardState) {
    var attackCost = boardCard.attackCost
    for (var n = 0; n < this.staticEffects.length; n++) {
        if (this.staticEffects[n][1] == target.boardId) {
            switch (this.staticEffects[n][2]) {
                case 18: //Aphrodite
                    return 9999;
            }

        } else if (this.staticEffects[n][1] == boardCard.boardId) {
            switch (this.staticEffects[n][2]) {
                case 101: //Medusa
                    return 9999;
            }
        }
        switch (this.staticEffects[n][2]) {
            case 10: // Coaraci
                if (this.staticEffects[n][1] == boardCard.boardId && this.staticEffects[n][3] == SceneManager._scene.turn)
                    attackCost += SceneManager._scene.applyCoaraci();
                break;
            case 15: // Nymph
                if (this.staticEffects[n][3] != SceneManager._scene.turn)
                    attackCost += this.apply_nymph(target)
                break
            case 16: //Battle Plan
                if (this.staticEffects[n][3] == SceneManager._scene.turn)
                    attackCost -= 1
                break
            case 26: //Skadi
                if (this.staticEffects[n][3] == SceneManager._scene.turn)
                    attackCost += this.apply_skadi(boardCard)
                break
            case 32: //Demeter
                if (this.staticEffects[n][1] != boardCard.boardId && this.staticEffects[n][3] == SceneManager._scene.turn)
                    attackCost += this.apply_demeter(boardCard)
                break
            case 33: //Hephaestus
                if (this.staticEffects[n][3] == SceneManager._scene.turn)
                    attackCost += this.apply_hephaestus(boardCard)
                break
            case 50: // Baldr
                if (this.staticEffects[n][3] != SceneManager._scene.turn)
                    attackCost += this.apply_baldr(target)
                break
            case 57: // Wall of Asgard
                if (this.staticEffects[n][3] != SceneManager._scene.turn)
                    attackCost += 2
                break
            case 70: //Ruda
                if (this.staticEffects[n][3] != SceneManager._scene.turn)
                    attackCost += this.apply_ruda(target)
                break
        }
    }
    return Math.max(attackCost, 1)
};
//-----------------------------------------------------------------------------
// Function : move_apply_effects
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.move_apply_effects = function (boardCard, turn = SceneManager._scene.turn) {
    var moveCost = boardCard.moveCost
    for (var n = 0; n < this.staticEffects.length; n++) {
        if (this.staticEffects[n][1] == boardCard.boardId) {
            switch (this.staticEffects[n][2]) {
                case 101: //Medusa
                    return 9999;
                case 5: // Poseidon
                    if (this.staticEffects[n][3] == turn)
                        moveCost += SceneManager._scene.apply_poseidon(turn);
                    break;
                case 10: // Coaraci
                    if (this.staticEffects[n][3] == turn)
                        moveCost += SceneManager._scene.applyCoaraci();
                    break;
                case 66: //Iae
                    if (this.staticEffects[n][3] == turn)
                        moveCost += SceneManager._scene.applyIae(turn);
                    break;
            }
        }
        switch (this.staticEffects[n][2]) {
            case 17: // Poseidon Statue
                if (this.staticEffects[n][3] == turn)
                    moveCost += this.apply_poseidon_statue(boardCard, this.staticEffects[n][3])
                break;
            case 14: //Hermes
                if (this.staticEffects[n][3] == turn)
                    moveCost += this.apply_hermes(boardCard)
                break;
            case 43: // Passage to Valhalla
                if (this.staticEffects[n][3] == turn)
                    moveCost += this.apply_passage_valhalla(boardCard, this.staticEffects[n][3])
                break;
            case 52: // Nidhogg
                if (this.staticEffects[n][3] == turn && boardCard.cardEffect == "52")
                    moveCost += this.apply_nidhogg(turn)
                break
            case 56: // Bifrost
                if (this.staticEffects[n][3] == turn)
                    moveCost += this.apply_bifrost(boardCard)
                break
            case 58: // Gleipnir
                if (this.staticEffects[n][3] != turn)
                    moveCost += 2
                break
            case 79: // Hunting Shrine
                if (this.staticEffects[n][3] == turn)
                    moveCost += this.apply_huntingShrine(boardCard)
                break;
        }
    }
    return Math.max(moveCost, 1)
};
//-----------------------------------------------------------------------------
// Function : cast_apply_effects
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.cast_apply_effects = function (card, board_place, devotion) {
    for (var n = 0; n < this.staticEffects.length; n++) {
        switch (this.staticEffects[n][2]) {
            case 28: // Yggdrasil
                if (this.staticEffects[n][3] == SceneManager._scene.turn)
                    devotion += SceneManager._scene.apply_yggdrasil(board_place, card, this.staticEffects[n][1]);
                break
            case 6: //Tsukiyomi
                if (this.staticEffects[n][3] == SceneManager._scene.turn)
                    devotion += this.apply_tsukiyomi(card);
                break
            case 42: // Mount Olympus
                if (this.staticEffects[n][3] == SceneManager._scene.turn)
                    devotion += SceneManager._scene.apply_mount_olympus(card);
                break
            case 46: //Cyclops
                if (this.staticEffects[n][3] == SceneManager._scene.turn)
                    devotion += this.apply_cyclops(card);
                break
            case 53: // Sphinx Statue
                if (this.staticEffects[n][3] == SceneManager._scene.turn)
                    devotion += SceneManager._scene.apply_sphinx_statue(card);
                break
            case 226: // Ragnarok
                if (this.staticEffects[n][3] == SceneManager._scene.turn)
                    devotion += SceneManager._scene.apply_ragnarok(board_place, card, this.staticEffects[n][1]);
                break
            case 59: //Toshogu
                if (this.staticEffects[n][3] == SceneManager._scene.turn)
                    devotion--
                break
        }
    }
    if (SceneManager._scene._weatherSprite.weatherType() == 2)
        devotion += this.checkNightTrigger(card);
    return Math.max(devotion, 1)
};

//-----------------------------------------------------------------------------
// Function : removeBoardCard
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.removeBoardCard = function (boardCard) {
    for (var n = 0; n < this.startTurnEffects.length; n++) {
        if (this.startTurnEffects[n][1] == boardCard.boardId) {
            this.startTurnEffects.splice(n, 1);
            n--;
        }
    }
    for (var n = 0; n < this.endTurnEffects.length; n++) {
        if (this.endTurnEffects[n][1] == boardCard.boardId) {
            this.endTurnEffects.splice(n, 1);
            n--;
        }
    }
    for (var n = 0; n < this.staticEffects.length; n++) {
        if (this.staticEffects[n][1] == boardCard.boardId) {
            this.staticEffects.splice(n, 1);
            n--;
        }
    }
};

//-----------------------------------------------------------------------------
// Function : removeEffectById
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.removeEffectById = function (effectId) {
    for (var n = 0; n < this.startTurnEffects.length; n++) {
        if (this.startTurnEffects[n][1] == effectId) {
            this.startTurnEffects.splice(n, 1);
            n--;
        }
    }
    for (var n = 0; n < this.endTurnEffects.length; n++) {
        if (this.endTurnEffects[n][1] == effectId) {
            this.endTurnEffects.splice(n, 1);
            n--;
        }
    }
    for (var n = 0; n < this.staticEffects.length; n++) {
        if (this.staticEffects[n][1] == effectId) {
            this.staticEffects.splice(n, 1);
            n--;
        }
    }
};
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// AUX FUNCTIONS /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : countPermanents 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.countPermanents = function (specialType) {
    var count = 0;
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == this.turn && this.boardState.getValue(n).specialType == specialType)
            count++;
    }
    return count;
};


////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// EXTRA SKILLS! //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : apply_yuki_onna - id 105 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_yuki_onna = function () {
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn != this.turn && this.boardState.getValue(n).cardType != 3)
            this.set_hp(n, -10);
    }
};
//-----------------------------------------------------------------------------
// Function : apply_chimera - id 108 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_chimera = function (board_place) {
    this.board_place = board_place
    while (board_place % 4 > 0)
        board_place -= 1;
    for (var n = 0; n < 4; n++) {
        if (this.board_place == board_place) {
            board_place++
            continue;
        }
        if (this.boardState.getValue(board_place) != -1 && this.boardState.getValue(board_place).cardType != 3)
            this.set_hp(board_place, -10);
        board_place++
    }
};

//-----------------------------------------------------------------------------
// Function : apply_ryujin - id 25 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_ryujin = function () {
    let animation = $dataAnimations[254];
    let delayCount = 0;
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).specialType != 3 && this.boardState.getValue(n).cardType != 3) {
            this.board_light_slots[n].startAnimation(animation, false, delayCount, 1);
            this.set_hp(n, -10);
            delayCount += 4;
        }

    }
};
//-----------------------------------------------------------------------------
// Function : apply_freyja - id 27 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_freyja = function () {

    let animation = $dataAnimations[188];
    let aniCount = 0;

    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).specialType == 2 && this.boardState.getValue(n).cardType != 3 && this.boardState.getValue(n).turn == this.turn) {
            this.boardState.getValue(n).mhp += 10
            this.set_hp(n, 10)
            this.board_light_slots[n].startAnimation(animation, false, aniCount * 10, 1);
            aniCount++;
        }
    }
};
//-----------------------------------------------------------------------------
// Function : apply_revive - id 211 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_revive = function (cardId, board_place) {
    this.board_place = board_place
    this.extra_animations.push(['Cast_Card', this.turn, cardId, this.board_place, -1, false]);
};
//-----------------------------------------------------------------------------
// Function : apply_horus - id 20 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_horus = function (cardId) {
    this.cardDefinitions.addExtraSkillById(cardId, 20);
};

//-----------------------------------------------------------------------------
// Function : apply_suzano - id 47 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_suzano = function (cardId) {
    this.flashingAreaGraveyardMiracle(cardId, this.turn)
    this.loadActionAnimation("cast")
    this.phase = 11
    this.count_frames = 0
};


//-----------------------------------------------------------------------------
// Function : apply_sekhmet - id 21 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_sekhmet = function (cardId) {
    this.cardDefinitions.addExtraSkillById(cardId, 21);
};
//-----------------------------------------------------------------------------
// Function : apply_boto - id 72 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_boto = function (cardId) {
    this.cardDefinitions.addExtraSkillById(cardId, 72);
};
//-----------------------------------------------------------------------------
// Function : apply_raijin - id 35 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_raijin = function (cardId) {
    this.cardDefinitions.addExtraSkillById(cardId, 35);
};
//-----------------------------------------------------------------------------
// Function : apply_urd - id 41 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_urd = function () {
    this.removeTopCardGraveyard(this.turn == 0 ? 1 : 0)
};

//-----------------------------------------------------------------------------
// Function : apply_fujin - id 36 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_fujin = function (board_place) {

    if (board_place % 4 < 2 && this.boardState.hasCard(board_place + 1) && this.boardState.isEmpty(board_place + 2)) {
        this.extra_animations.push(['Move_Card', board_place + 1, board_place + 2])
    }
    if (board_place % 4 > 1 && this.boardState.hasCard(board_place - 1) && this.boardState.isEmpty(board_place - 2)) {
        this.extra_animations.push(['Move_Card', board_place - 1, board_place - 2])
    }
    if (parseInt(board_place / 4) > 1 && this.boardState.hasCard(board_place - 4) && this.boardState.isEmpty(board_place - 8)) {
        this.extra_animations.push(['Move_Card', board_place - 4, board_place - 8])
    }
    if (parseInt(board_place / 4) < 2 && this.boardState.hasCard(board_place + 4) && this.boardState.isEmpty(board_place + 8)) {
        this.extra_animations.push(['Move_Card', board_place + 4, board_place + 8])
    }
};

//-----------------------------------------------------------------------------
// Function : apply_hera - id 31 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_hera = function (cardId) {
    this.cardDefinitions.addExtraSkillById(cardId, 31);
};

//-----------------------------------------------------------------------------
// Function : apply_apollo - id 30 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_apollo = function (turn) {
    devotion = 0;
    for (var n = 0; n < 16; n++) {
        if (this.boardState.isEmpty(n))
            continue;
        if (this.boardState.getValue(n).turn == turn && this.boardState.getValue(n).specialType == 0 && (this.boardState.getValue(n).cardType == 3)) {
            devotion += 1;
        }
    };
    this.set_devotion(turn, devotion, false, 242)
};
//-----------------------------------------------------------------------------
// Function : apply_idunTree - id 29 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_idunTree = function (turn) {
    let animation = $dataAnimations[190];
    let delayCount = 0;
    for (var n = 0; n < 16; n++) {
        if (this.boardState.isEmpty(n))
            continue;
        if (this.boardState.getValue(n).turn == turn && this.boardState.getValue(n).specialType == 2 && (this.boardState.getValue(n).cardType != 3)) {
            this.set_hp(n, 10)
            this.board_light_slots[n].startAnimation(animation, false, delayCount * 8, 1);
            delayCount++
        }
    };
};

//-----------------------------------------------------------------------------
// Function : apply_boitata - id 74 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_boitata = function (turn) {
    let animation = $dataAnimations[190];
    let delayCount = 0;
    for (var n = 0; n < 16; n++) {
        if (this.boardState.isEmpty(n))
            continue;
        if (this.boardState.getValue(n).turn == turn && this.boardState.getValue(n).specialType == 4 && (this.boardState.getValue(n).cardType != 3)) {
            this.set_hp(n, 10)
            this.board_light_slots[n].startAnimation(animation, false, delayCount * 8, 1);
            delayCount++
        }
    };
};



//-----------------------------------------------------------------------------
// Function : apply_obelisk - id 54 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_obelisk = function (turn) {
    for (var n = 0; n < 16; n++) {
        if (this.boardState.isEmpty(n))
            continue;
        if (this.boardState.getValue(n).turn == turn && this.boardState.getValue(n).cardType == 0) {
            this.set_hp(n, 20)
            let animation = $dataAnimations[278];
            this.board_light_slots[n].startAnimation(animation, false, 0, 1);
        }
    };
};

//-----------------------------------------------------------------------------
// Function : apply_yggdrasil - id 28 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_yggdrasil = function (board_place, card, boardId) {
    var n = this.getBoardPositionById(boardId)
    if ((board_place == n + 1 && n % 4 < 3) || (board_place == n - 1 && n % 4 > 0) || board_place == n + 4 || board_place == n - 4) {
        if (parseInt(card.specialType) == 2) {
            return -1
        }
    }
    return 0
};
//-----------------------------------------------------------------------------
// Function : apply_ragnarok - id 226 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_ragnarok = function (board_place, card, boardId) {
    if (parseInt(card.specialType) == 2 && parseInt(card.cardType) == 1) { return -1000 } else { return 0 }
};
//-----------------------------------------------------------------------------
// Function : apply_mount_olympus - id 42 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_mount_olympus = function (card) {
    if (parseInt(card.specialType) == 0) { return -2 } else { return 0 }
};
//-----------------------------------------------------------------------------
// Function : apply_sphinx_statue - id 53 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_sphinx_statue = function (card) {
    if (parseInt(card.specialType) == 1) { return -1 } else { return 0 }
};
//-----------------------------------------------------------------------------
// Function : apply_tsukiyomi - id 6 - adiciona 
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.apply_tsukiyomi = function (card) {
    var devotion = 0;
    if (card.cardType == 2)
        devotion--
    if (card.cardType == 2 && card.specialType == 3)
        devotion--
    return devotion
};
//-----------------------------------------------------------------------------
// Function : apply_cyclops - id 46 - adiciona 
//-----------------------------------------------------------------------------
KamigamiCardDefinitions.prototype.apply_cyclops = function (card) {
    if (card.cardType == 3) { return -2 } else { return 0 }
};

//-----------------------------------------------------------------------------
// Function : apply_zeus_statue - id 34 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_zeus_statue = function (turn) {
    var devotion = 0
    for (var n = 0; n < 16; n++) {
        if (this.boardState.isEmpty(n))
            continue;
        if (this.boardState.getValue(n).turn == turn && this.boardState.getValue(n).specialType == 0 && this.boardState.getValue(n).cardType != 3) {
            devotion++;
        }
    }
    this.set_devotion(turn, devotion, false, 242)
};
//-----------------------------------------------------------------------------
// Function : applyKuat - id 34 - adiciona 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.applyKuat = function (turn) {
    if (this._weatherSprite.weatherType() == 1)
        this.set_devotion(turn, 1, false, 242)
};


//-----------------------------------------------------------------------------
// Function : changeHpAll
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.changeHpAll = function (damage) {
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).cardType != 3)
            this.set_hp(n, damage);
    }
};
//-----------------------------------------------------------------------------
// Function : changeHpAllColumn
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.changeHpAllColumn = function (damage, target) {
    while (target > 3)
        target -= 4;
    for (var n = target; n < 16; n += 4) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).cardType != 3)
            this.set_hp(n, damage);
    }
};

//-----------------------------------------------------------------------------
// Function : changeHpAll
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.changeHpAllNotMain = function (damage) {
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).cardType != 0 && this.boardState.getValue(n).cardType != 3)
            this.set_hp(n, damage);
    }
};

//-----------------------------------------------------------------------------
// Function : changeHpAll
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.changeHpAllMonuments = function (damage) {
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).cardType == 3)
            this.set_hp(n, damage);
    }
};

//-----------------------------------------------------------------------------
// Function : apply_for_the_gods
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.apply_for_the_gods = function (turn) {
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).cardType == 1 && this.boardState.getValue(n).turn == turn) {
            this.set_devotion(turn, this.boardState.getValue(n).costDevotion)
            this.set_hp(n, -999)
        }
    }
};

//-----------------------------------------------------------------------------
// Function : soulExchange
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.applySoulExchange = function () {
    let player2Devotion = this.devotion_player1 - this.devotion_player2
    let player1Devotion = this.devotion_player2 - this.devotion_player1
    this.set_devotion(0, player1Devotion)
    this.set_devotion(1, player2Devotion)
};

//-----------------------------------------------------------------------------
// Function : applyInvokeTheSpirits
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.applyInvokeTheSpirits = function (turn) {
    if (turn == 0) {
        this.set_devotion(0, this.player_hand.length)
    } else {
        this.set_devotion(1, this.npc_hand.length)
    }
};
