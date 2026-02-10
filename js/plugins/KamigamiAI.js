//////////////////////////// MAIN UPDATE //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : npc_main_phase - updates npc_plays
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.npc_main_phase = function () {
    this.choose_best_play()
}
//-----------------------------------------------------------------------------
// Function : npc_main_phase - updates npc_plays
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.startAllAIVariables = function () {
    this.usingAI = true
    this.npcAI = new KamigamiAIManagement()
    this.npcAI.setGodEffect(this.player2Deck.godCardEffect)
    this.npcAI.setOppGodEffect(this.player1Deck.godCardEffect)
    this.npcAI.setCardDefinitions(this.cardDefinitions)
    this.npcAI.setBoardState(this.boardState)
    this.npcAI.calculateAllBoardValues(this.boardState)
    this.devotionOpponent = 0
}

//////////////////////////// Base Calculations //////////////////////////////////////

//////////////////////////// PLAY CHOOSING //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : choose_best_play - selects best plays
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.choose_best_play = function () {
    this.startAllAIVariables()
    if (this.cardDefinitions.getExtraSkills().length > 0 || this.extra_animations.length > 0) {
        //this.chooseExtraSkillsTarget()
        return
    }
    if (this.npcAI.godCardEffect == 109 && this.npc_hand.length > 1) {
        this.devotion_player2 += this.npc_hand.length * 4 - 4
    }
    if (this.npcAI.godCardEffect == 115 && this.checkAnhangaGyDevotion()) {
        return;
    }
    this.npcAI.calculateAllGraveyardValues(this.player2_graveyard, this.boardState, this.npc_hand)
    this.npcAI.getAllCastPlays(this.npc_hand)
    this.npcAI.getAllAttackPlays(this.boardState)
    this.npcAI.getAllSkillsPlays(this.boardState)
    if (this.npcAI.godCardEffect == 109 && this.npc_hand.length > 1) {
        this.devotion_player2 -= this.npc_hand.length * 4 - 4
    }
    this.bestPlay = this.getBestPlay()
    if (this.bestPlay.length > 0) {
        var playNum = Math.randomInt(this.bestPlay.length)
        this.proceedAction(this.npcAI.allPlays[this.bestPlay[playNum]])
    } else {
        this.proceed_pass_turn()
    }
}
//////////////////////////// SKILL CHOOSING //////////////////////////////////////
Scene_Kamigami_Duel.prototype.chooseExtraSkillsTarget = function () {
    if (!this.usingAI)
        return
    this.startAllAIVariables()
    var cardEffect = this.cardDefinitions.getExtraSkills()[0][1]
    this.checkForSkillTargets()
    var boardPlace = -1
    switch (cardEffect) {
        case 20: // Horus
            boardPlace = this.AiBestBoardValue()
            break
        case 48: // Osiris
            boardPlace = this.AiBestBoardValue()
            break
        case 35: // Raijin
            boardPlace = this.AiBestBoardValue()
            break
        case 39: // Naichi Taisha
            boardPlace = this.AiBestBoardValue()
            break
        case 61: // Ares
            boardPlace = this.AiBestBoardValue()
            break
        case 31: // Hera
            boardPlace = this.AiBestBoardValueByHP()
            break
        case 21: // Sekhmet
            boardPlace = this.AiBestBoardValueByHP()
            break
        case 22: // Serket
            boardPlace = this.AiBestBoardValueByHP()
            break
        case 68: // Iara
            boardPlace = this.AiBestBoardValueByHP()
            break
        case 72: // Boto
            boardPlace = this.AiBestBoardValue()
            break
        case 37: // Anubis
            this.startAllAIVariables()
            this.npcAI.calculateAllGraveyardValues(this.player2_graveyard, this.boardState, this.npc_hand)
            this.callReviveAI(37)
            boardPlace = -1
            break
    }

    if (boardPlace != -1) {
        this.addSkillAI(boardPlace)
    } else
        this.cardDefinitions.getExtraSkills().shift()


}
//-----------------------------------------------------------------------------
// Function : addSkillAI - adds Skill animation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.addSkillAI = function (boardPlace) {
    var data = JSON.parse(JSON.stringify(this.cardDefinitions.getExtraSkills()[0]))
    this.cardDefinitions.getExtraSkills().shift()
    this.cardDefinitions.extraSkills.unshift([data[0], data[1], 3, boardPlace]);
    this.attack_target = boardPlace
    this.cardEffect = data[1]
    this.set_hp(this.attack_target, Scene_Kamigami_Duel.prototype.special_skill_damage.call(this))
    this._hpWindow.write_hp(this.board_cards)
}
let testt;
//-----------------------------------------------------------------------------
// Function : AiBestBoardValue 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.AiBestBoardValue = function () {
    var value = 0
    var boardPlace = -1
    for (var n = 0; n < this.flashing_area.length; n++) {
        if (this.npcAI.boardValuesAI[this.flashing_area[n] % 4][parseInt(this.flashing_area[n] / 4)].playValue > value) {
            if (this.boardState.getValue(this.flashing_area[n]).cardEffect == 38 && boardPlace != -1) {
                continue
            }
            value = this.npcAI.boardValuesAI[this.flashing_area[n] % 4][parseInt(this.flashing_area[n] / 4)].playValue
            if (this.boardState.getValue(this.flashing_area[n]).cardEffect == 38) { value = 0 }
            boardPlace = this.flashing_area[n]
        }
    }
    return boardPlace
}
//-----------------------------------------------------------------------------
// Function : AiBestBoardValueByHP 
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.AiBestBoardValueByHP = function () {
    var value = -100
    var boardPlace = -1
    for (var n = 0; n < this.flashing_area.length; n++) {
        if (this.npcAI.boardValuesAI[this.flashing_area[n] % 4][parseInt(this.flashing_area[n] / 4)].playValue - this.boardState.getValue(this.flashing_area[n]).hp > value) {
            value = this.npcAI.boardValuesAI[this.flashing_area[n] % 4][parseInt(this.flashing_area[n] / 4)].playValue - this.boardState.getValue(this.flashing_area[n]).hp
            boardPlace = this.flashing_area[n]
        }
    }
    return boardPlace
}
//////////////////////////// PLAY CHOOSING //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : getBestPlay - selects best plays
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.getBestPlay = function () {
    var playValue = 1
    var index = []
    for (var n = 0; n < this.npcAI.allPlays.length; n++) {
        if (this.npcAI.allPlays[n].playValue > playValue) {
            playValue = this.npcAI.allPlays[n].playValue
            index = [n]
        } else if (this.npcAI.allPlays[n].playValue == playValue) {
            index.push(n)
        }
    }
    return index
}
//-----------------------------------------------------------------------------
// Function : proceedAction - selects best plays
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceedAction = function (playAction) {
    if (this.npcAI.godCardEffect == 109) {
        this.proceedNPCSkillIzanagi(playAction)
    }
    switch (playAction.actionType) {
        case 1: // Cast Type
            return this.proceedNPCCast(playAction)
        case 2: // Attack Type
            return this.proceedNPCAttack(playAction)
        case 3: // Skill Type
            return this.proceedNPCSkill(playAction)
        case 4: // Extra Type
            return this.proceedNPCExtra(playAction)
        case 5: // Izanami Type
            return this.proceedNPCExtraIzanami(playAction)
        case 6: // Loki Type
            return this.proceedNPCExtraLoki(playAction)
    }
}
//-----------------------------------------------------------------------------
// Function : proceedNPCCast - proceedsCast
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceedNPCCast = function (playAction) {
    if (this.extra_animations.length > 0 && this.extra_animations[this.extra_animations.length - 1][0] == 'Extra_Skills') {
        this.extra_animations.push(['Devotion_Set', this.turn, -playAction.costDevotion])
    } else {
        this.set_devotion(1, -playAction.costDevotion)
    }
    var cardEffect = this.cardDefinitions.getCardAttribute(playAction.cardId, "cardEffect")
    if (cardEffect == "45" && this.removeCardGraveyard(this.turn, playAction.cardId, 0)) {
        this.extra_animations.push(['Cast_Card', this.turn, playAction.cardId, playAction.selfCard, -1, false]);
    } else
        this.extra_animations.push(['Cast_Card', this.turn, playAction.cardId, playAction.selfCard, playAction.index]);
}
//-----------------------------------------------------------------------------
// Function : setDevotionAnimation
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.setDevotionAnimation = function () {
    this.set_devotion(this.extra_animations[0][1], this.extra_animations[0][2])
    this.resetExtraAnimation()
}

//-----------------------------------------------------------------------------
// Function : proceedNPCAttack - proceeds Movement & Attack
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceedNPCAttack = function (playAction) {
    var currentLocation = playAction.selfCard
    for (var b = 0; b < playAction.skillNum; b++) {
        console.log("BUFF_DEVOTION", playAction.buffs[b][5])
        this.extra_animations.push(['Devotion_Set', this.turn, -playAction.buffs[b][2]])
        this.extra_animations.push(['Cast_Card', this.turn, playAction.buffs[b][4], currentLocation, playAction.buffs[b][5]])
    }
    if (playAction.usingOdin) {
        this.extra_animations.push(['Extra_Skills', 1, 0, playAction.selfCard, playAction.godCardEffect, playAction.cardId]);
    }
    for (var n = 0; n < playAction.coordinates.length; n++) {
        switch (playAction.coordinates[n]) {
            case 'Up':
                this.extra_animations.push(['Move_Card', currentLocation, currentLocation - 4, -playAction.moveCost])
                currentLocation -= 4
                break
            case 'Down':
                this.extra_animations.push(['Move_Card', currentLocation, currentLocation + 4, -playAction.moveCost])
                currentLocation += 4
                break
            case 'Left':
                this.extra_animations.push(['Move_Card', currentLocation, currentLocation - 1, -playAction.moveCost])
                currentLocation -= 1
                break
            case 'Right':
                this.extra_animations.push(['Move_Card', currentLocation, currentLocation + 1, -playAction.moveCost])
                currentLocation += 1
                break
        }
    }
    for (var i = 0; i < playAction.attackNum; i++) {
        this.extra_animations.push(['Attack_Card', 1, currentLocation, playAction.oppCard, playAction.attackCost]);
        this.count_frames = 0;
    }
}
//-----------------------------------------------------------------------------
// Function : proceedNPCSkill - proceeds Movement & Attack
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceedNPCSkill = function (playAction) {
    var currentLocation = playAction.selfCard
    for (var n = 0; n < playAction.coordinates.length; n++) {
        switch (playAction.coordinates[n]) {
            case 'Up':
                this.extra_animations.push(['Move_Card', currentLocation, currentLocation - 4, -playAction.moveCost])
                currentLocation -= 4
                break
            case 'Down':
                this.extra_animations.push(['Move_Card', currentLocation, currentLocation + 4, -playAction.moveCost])
                currentLocation += 4
                break
            case 'Left':
                this.extra_animations.push(['Move_Card', currentLocation, currentLocation - 1, -playAction.moveCost])
                currentLocation -= 1
                break
            case 'Right':
                this.extra_animations.push(['Move_Card', currentLocation, currentLocation + 1, -playAction.moveCost])
                currentLocation += 1
                break
        }
    }
    for (var i = 0; i < playAction.attackNum; i++) {
        this.extra_animations.push(['Special_Skill', 1, currentLocation, playAction.oppCard, playAction.cardEffect, playAction.attackCost, true]);
        this.count_frames = 0;
    }
}
//-----------------------------------------------------------------------------
// Function : proceedNPCSkill - proceeds Movement & Attack
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceedNPCExtra = function (playAction) {
    this.extra_animations.push(['Extra_Skills', 1, -playAction.costDevotion, playAction.selfCard, playAction.cardEffect, playAction.cardId]);
}
//-----------------------------------------------------------------------------
// Function : proceedNPCSkill - proceeds Movement & Attack
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceedNPCExtraIzanami = function (playAction) {
    this.extra_animations.push(['Extra_Skills', 1, playAction.sacCard, playAction.killCard, playAction.cardEffect, playAction.cardId]);
}
//-----------------------------------------------------------------------------
// Function : proceedNPCSkill - proceeds Movement & Attack
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceedNPCExtraLoki = function (playAction) {
    this.extra_animations.push(['Extra_Skills', 1, -playAction.costDevotion, playAction.selfCard, playAction.cardEffect, playAction.oppCard, true]);
}
//-----------------------------------------------------------------------------
// Function : proceedNPCSkillIzanagi - proceeds Movement & Attack
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.proceedNPCSkillIzanagi = function (playAction) {
    var orderedCards = this.chooseExileCardIzanagi(playAction.cardId)
    var cardHandTemp = JSON.parse(JSON.stringify(this.npc_hand))
    let tempDevotion = this.devotion_player2
    for (var i = 0; tempDevotion < playAction.costDevotion; i++) {
        cardHandTemp.splice(orderedCards[i], 1)
        this.extra_animations.push(['Extra_Skills', 1, orderedCards[i], false, 109, playAction.cardId]);
        tempDevotion += 4
    }
    playAction.index = cardHandTemp.indexOf(playAction.cardId)
}
//-----------------------------------------------------------------------------
// Function : chooseExileCardIzanagi
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.chooseExileCardIzanagi = function (cardId) {

    var cardIndex = []
    for (var n = 0; n < this.npc_hand.length; n++) {
        if (this.npc_hand[n] == cardId) {
            cardIndex.push(n)
        } else {
            cardIndex.unshift(n)
        }
    }
    return cardIndex
}

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// KamigamiAIManagement Class /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// ---------------------------------------------------------
// This class holds all effects by the kamigami cards
// ---------------------------------------------------------
function KamigamiAIManagement() {
    this.initialize.apply(this, arguments);
}

KamigamiAIManagement.prototype.constructor = KamigamiAIManagement;

//-----------------------------------------------------------------------------
// Function : initialize
//-----------------------------------------------------------------------------
KamigamiAIManagement.prototype.initialize = function () {
    this.allPlays = []
    this.castIdList = []
    this.godCardEffect = 0
}
//-----------------------------------------------------------------------------
// Function : setGodEffect
//-----------------------------------------------------------------------------
KamigamiAIManagement.prototype.setGodEffect = function (cardEffect) {
    this.godCardEffect = cardEffect
}
//-----------------------------------------------------------------------------
// Function : setOppGodEffect
//-----------------------------------------------------------------------------
KamigamiAIManagement.prototype.setOppGodEffect = function (cardEffect) {
    this.oppGodCardEffect = cardEffect
}
//-----------------------------------------------------------------------------
// Function : calculates all cards on the board value
//-----------------------------------------------------------------------------
KamigamiAIManagement.prototype.calculateAllBoardValues = function (boardState) {
    this.boardValuesAI = [[false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]]
    for (var n = 0; n < 16; n++) {
        if (boardState.hasCard(n)) {
            this.boardValuesAI[n % 4][parseInt(n / 4)] = new NPC_AI()
            this.boardValuesAI[n % 4][parseInt(n / 4)].importBoardState(this.boardStateJSON)
            this.boardValuesAI[n % 4][parseInt(n / 4)].setTurn(boardState.getValue(n).turn)
            this.boardValuesAI[n % 4][parseInt(n / 4)].applyBoardValues(boardState.getValue(n).cardId, n, false, false)
            if (boardState.getValue(n).cardType == 0) {
                this.boardValuesAI[n % 4][parseInt(n / 4)].playValue -= 10
            }
        }
    }
}
//-----------------------------------------------------------------------------
// Function : calculates all cards on the board value
//-----------------------------------------------------------------------------
KamigamiAIManagement.prototype.calculateAllGraveyardValues = function (graveyard, boardState, npcHand) {
    this.graveyardValuesAI = []
    var gyCardEffects = [37, 222, 211]
    var postValues = []
    var cardEffect
    for (var n = 0; n < graveyard.length; n++) {
        cardId = graveyard[n][0]
        cardEffect = parseInt(this.cardDefinitions.getCardAttribute(cardId, "cardEffect"))
        if (this.castIdList.includes(cardId)) { continue }
        if (gyCardEffects.includes(cardEffect)) { if (cardEffect == 37) { postValues.unshift(graveyard[n]) } else postValues.push(graveyard[n]); continue }
        this.castIdList.push(cardId)
        costDevotion = parseInt(this.cardDefinitions.getCardAttribute(cardId, "costDevotion"))
        SceneManager._scene.check_light_slot(this.castIdList.length - 1, this.castIdList, boardState)
        for (var i = 0; i < SceneManager._scene.flashing_area.length; i++) {
            this.graveyardValuesAI[this.graveyardValuesAI.length] = new NPC_AI()
            this.graveyardValuesAI[this.graveyardValuesAI.length - 1].importCardDefinitions(this.cardDefinitionsJSON)
            this.graveyardValuesAI[this.graveyardValuesAI.length - 1].importBoardState(this.boardStateJSON)
            this.graveyardValuesAI[this.graveyardValuesAI.length - 1].setGodEffects(this.godCardEffect, this.oppGodCardEffect)
            this.graveyardValuesAI[this.graveyardValuesAI.length - 1].applyCast(cardId, npcHand.indexOf(cardId), costDevotion, SceneManager._scene.flashing_area[i], this.boardValuesAI, [])
            if (costDevotion <= SceneManager._scene.devotion_player2 && (npcHand.includes(cardId) || cardEffect == 45)) {
                this.allPlays.push(this.graveyardValuesAI[this.graveyardValuesAI.length - 1])
            }
        }
    }
    for (var n = 0; n < postValues.length; n++) {
        cardId = postValues[n][0]
        if (this.castIdList.includes(cardId)) { continue }
        this.castIdList.push(cardId)
        costDevotion = parseInt(this.cardDefinitions.getCardAttribute(cardId, "costDevotion"))
        SceneManager._scene.check_light_slot(this.castIdList.length - 1, this.castIdList, boardState)
        for (var i = 0; i < SceneManager._scene.flashing_area.length; i++) {
            this.graveyardValuesAI[this.graveyardValuesAI.length] = new NPC_AI()
            this.graveyardValuesAI[this.graveyardValuesAI.length - 1].importCardDefinitions(this.cardDefinitionsJSON)
            this.graveyardValuesAI[this.graveyardValuesAI.length - 1].importBoardState(this.boardStateJSON)
            this.graveyardValuesAI[this.graveyardValuesAI.length - 1].setGodEffects(this.godCardEffect, this.oppGodCardEffect)
            this.graveyardValuesAI[this.graveyardValuesAI.length - 1].applyCast(cardId, npcHand.indexOf(cardId), costDevotion, SceneManager._scene.flashing_area[i], this.boardValuesAI, this.graveyardValuesAI)
            if (costDevotion <= SceneManager._scene.devotion_player2 && npcHand.includes(cardId)) {
                this.allPlays.push(this.graveyardValuesAI[this.graveyardValuesAI.length - 1])
            }
        }
    }
}

//-----------------------------------------------------------------------------
// Function : setCardDefinitions
//-----------------------------------------------------------------------------
KamigamiAIManagement.prototype.setCardDefinitions = function (cardDefinitions) {
    this.cardDefinitions = cardDefinitions
    this.cardDefinitionsJSON = JSON.stringify(cardDefinitions)
}
//-----------------------------------------------------------------------------
// Function : setBoardState
//-----------------------------------------------------------------------------
KamigamiAIManagement.prototype.setBoardState = function (boardState) {
    this.boardState = boardState
    this.boardStateJSON = JSON.stringify(boardState)
}
//-----------------------------------------------------------------------------
// Function : getAllCastPlays
//-----------------------------------------------------------------------------
KamigamiAIManagement.prototype.getAllCastPlays = function (npcHand) {
    for (var n = 0; n < npcHand.length; n++) {
        this.addCastValues(npcHand, n)
    }
}
//-----------------------------------------------------------------------------
// Function : addCastValues
//-----------------------------------------------------------------------------
KamigamiAIManagement.prototype.addCastValues = function (npcHand, index) {
    if (this.castIdList.includes(npcHand[index])) { return }
    this.castIdList.push(npcHand[index])
    SceneManager._scene.check_light_slot(index, npcHand, this.boardState)
    var costDevotion
    for (var n = 0; n < SceneManager._scene.flashing_area.length; n++) {
        costDevotion = parseInt(this.cardDefinitions.getCardAttribute(npcHand[index], "costDevotion"))
        if (costDevotion <= SceneManager._scene.devotion_player2) {
            var i = this.allPlays.length
            this.allPlays.push(new NPC_AI())
            this.allPlays[i].importCardDefinitions(this.cardDefinitionsJSON)
            this.allPlays[i].importBoardState(this.boardStateJSON)
            this.allPlays[i].setGodEffects(this.godCardEffect, this.oppGodCardEffect)
            this.allPlays[i].applyCast(npcHand[index], index, costDevotion, SceneManager._scene.flashing_area[n], this.boardValuesAI, this.graveyardValuesAI)
        }
    }
}


//-----------------------------------------------------------------------------
// Function : getAllAttackPlays
//-----------------------------------------------------------------------------
KamigamiAIManagement.prototype.getAllAttackPlays = function (boardState) {
    var selfCards = []
    var oppCards = []
    var buffs = []
    var effect = -1
    for (var n = 0; n < 16; n++) {
        if (boardState.isEmpty(n))
            continue
        if (boardState.getValue(n).turn == 1) {
            if (boardState.getValue(n).cardType != 3)
                selfCards.push(n)
        } else {
            oppCards.push(n)
        }
    }
    var npcHand = SceneManager._scene.npc_hand
    for (var b = 0; b < npcHand.length; b++) {
        effect = this.hasBuffEffect(npcHand[b], b)
        if (effect != -1) {
            if (buffs.length == 0 || buffs[0][2] >= effect[2])
                buffs.push(effect)
            else
                buffs.unshift(effect)
        }
    }
    if (this.godCardEffect == 114) buffs.push([114, 1, 0, 2, 0])
    for (var s = 0; s < selfCards.length; s++) {
        for (var o = 0; o < oppCards.length; o++) {
            this.addAttackValues(JSON.parse(JSON.stringify(boardState)), selfCards[s], oppCards[o], buffs)
        }
    }
}
//-----------------------------------------------------------------------------
// Function : getAllAttackPlays
//-----------------------------------------------------------------------------
KamigamiAIManagement.prototype.hasBuffEffect = function (cardId, position) {
    var cardEffect = parseInt(SceneManager._scene.cardDefinitions.getCardAttribute(cardId, "cardEffect"))
    var costDevotion = parseInt(SceneManager._scene.cardDefinitions.getCardAttribute(cardId, "costDevotion"))
    switch (cardEffect) {
        case 219: // Call to Arms
            return [219, 0, costDevotion, false, cardId, position]
        case 225: // Heimdalls Warning
            return [225, 0, costDevotion, 2, cardId, position]
        case 231: // Hunting Spirits
            return [231, 0, costDevotion, false, cardId, position]
    }
    return -1
}

//-----------------------------------------------------------------------------
// Function : getAllSkillsPlays
//-----------------------------------------------------------------------------
KamigamiAIManagement.prototype.getAllSkillsPlays = function (boardState) {
    var selfCards = []
    var oppCards = []
    for (var n = 0; n < 16; n++) {
        if (boardState.isEmpty(n))
            continue
        if (boardState.getValue(n).turn == 1) { selfCards.push(n) } else { oppCards.push(n) }
    }
    for (var s = 0; s < selfCards.length; s++) {
        let cardEffect = boardState.getValue(selfCards[s]).cardEffect
        if ($dataKamigami.cardEffectList.includes(cardEffect))
            for (var o = 0; o < oppCards.length; o++) {
                this.addSpecialValues(JSON.parse(JSON.stringify(boardState)), selfCards[s], oppCards[o], cardEffect)
            }
    }
}
//-----------------------------------------------------------------------------
// Function : addSpecialValues
//-----------------------------------------------------------------------------
KamigamiAIManagement.prototype.addSpecialValues = function (rawBoardState, selfCard, oppCard, cardEffect) {
    let closeCardEffects = [102]
    let farCardEffects = [110, 113, 112, 107]

    if (closeCardEffects.includes(cardEffect)) {
        let boardState = new KamigamiBoard()
        boardState.importFullTable(rawBoardState.boardState)
        var coordinates = this.find_path_ai([parseInt(selfCard / 4), selfCard % 4], [parseInt(oppCard / 4), oppCard % 4], boardState.get2dTable())
        var totalCost
        if (coordinates) {
            if (cardEffect == 102) {
                var dist = coordinates.length - 2
                coordinates.pop()
            }
            else
                var dist = coordinates.length - 1
            totalCost = this.calculateCostValueSkill(boardState, dist, selfCard, oppCard, cardEffect)
            if (totalCost[2] <= SceneManager._scene.devotion_player2) {
                var i = this.allPlays.length
                this.allPlays.push(new NPC_AI())
                coordinates.pop()
                this.allPlays[i].setGodEffects(this.godCardEffect, this.oppGodCardEffect)
                this.allPlays[i].applySpecialEffect(coordinates, boardState, selfCard, oppCard, totalCost[2], totalCost[0], totalCost[1], totalCost[3], this.boardValuesAI, cardEffect, totalCost[2] <= SceneManager._scene.devotion_player2)
            }
        }
    } else if (farCardEffects.includes(cardEffect)) {
        let boardState = new KamigamiBoard()
        boardState.importFullTable(rawBoardState.boardState)
        var totalCost
        totalCost = this.calculateCostValueSkill(boardState, 0, selfCard, oppCard, cardEffect)
        if (totalCost[1] <= SceneManager._scene.devotion_player2) {

            var i = this.allPlays.length
            this.allPlays.push(new NPC_AI())
            this.allPlays[i].setGodEffects(this.godCardEffect, this.oppGodCardEffect)
            this.allPlays[i].applyExtraEffect(coordinates, boardState, selfCard, oppCard, totalCost[2], totalCost[0], totalCost[1], totalCost[3], this.boardValuesAI, cardEffect, totalCost[2] <= SceneManager._scene.devotion_player2, this.graveyardValuesAI)
            this.allPlays[i].actionType = 4
            if (cardEffect == 107) { this.allPlays[i].actionType = 5 }
        }
    } else if (cardEffect == 103 && SceneManager._scene.boardState.hasCard(oppCard) && SceneManager._scene.boardState.getValue(oppCard).cardType != 3) {
        var totalCost
        totalCost = this.calculateCostValueSkill(SceneManager._scene.boardState, 0, selfCard, oppCard, cardEffect)
        if (totalCost[1] <= SceneManager._scene.devotion_player2) {
            for (var n = 0; n < 16; n++) {
                if (SceneManager._scene.boardState.hasCard(n) && SceneManager._scene.boardState.getValue(n).turn == 1 && SceneManager._scene.boardState.getValue(n).cardType != 3) {
                    let boardState = new KamigamiBoard()
                    boardState.importFullTable(rawBoardState.boardState)
                    var i = this.allPlays.length
                    this.allPlays.push(new NPC_AI())
                    this.allPlays[i].setGodEffects(this.godCardEffect, this.oppGodCardEffect)
                    this.allPlays[i].applyExtraEffect(coordinates, boardState, n, oppCard, totalCost[2], totalCost[0], totalCost[1], totalCost[3], this.boardValuesAI, cardEffect, totalCost[2] <= SceneManager._scene.devotion_player2, this.graveyardValuesAI)
                    this.allPlays[i].actionType = 6
                }

            }
        }
    }

}
//-----------------------------------------------------------------------------
// Function : addAttackValues
//-----------------------------------------------------------------------------
KamigamiAIManagement.prototype.addAttackValues = function (rawBoardState, selfCard, oppCard, buffs) {
    boardState = new KamigamiBoard()
    boardState.importFullTable(rawBoardState.boardState)
    var coordinates = this.find_path_ai([parseInt(selfCard / 4), selfCard % 4], [parseInt(oppCard / 4), oppCard % 4], boardState.get2dTable())
    var dist = coordinates.length - 1
    var totalCost
    var totalCostBuffs = []
    if (coordinates) {
        totalCost = this.calculateCostValue(boardState, dist, selfCard, oppCard)
        coordinates.pop()
        if (totalCost[2] <= SceneManager._scene.devotion_player2) {
            var i = this.allPlays.length
            this.allPlays.push(new NPC_AI())
            this.allPlays[i].setGodEffects(this.godCardEffect, this.oppGodCardEffect)
            this.allPlays[i].applyAttack(coordinates, boardState, selfCard, oppCard, totalCost[2], totalCost[0], totalCost[1], totalCost[3], this.boardValuesAI)
        }
        totalCostBuffs = this.calculateCostValueWithBuffs(boardState, dist, selfCard, oppCard, buffs)
        for (var n = 0; n < totalCostBuffs.length; n++) {
            if (totalCostBuffs[n][2] <= SceneManager._scene.devotion_player2) {
                var i = this.allPlays.length
                this.allPlays.push(new NPC_AI())
                this.allPlays[i].setGodEffects(this.godCardEffect, this.oppGodCardEffect)
                this.allPlays[i].applyBeforeSkills(buffs, totalCostBuffs[n][4], totalCostBuffs[n][5])
                this.allPlays[i].applyAttack(coordinates, boardState, selfCard, oppCard, totalCostBuffs[n][2], totalCostBuffs[n][0], totalCostBuffs[n][1], totalCostBuffs[n][3], this.boardValuesAI)

            }
        }
        //boardState.getValue(selfCard).specialType
    }

}
//-----------------------------------------------------------------------------
// Function : calculateCostValueWithBuffs
//-----------------------------------------------------------------------------
KamigamiAIManagement.prototype.applyJaciEffect = function (damage, specialType, cardType) {
    if (specialType == 4 && cardType != 0) {
        this.damageMultiplier = 5
        return damage / 2
    } else {
        return damage
    }
}
//-----------------------------------------------------------------------------
// Function : getJaciSpot
//-----------------------------------------------------------------------------
KamigamiAIManagement.prototype.getJaciSpot = function (boardState) {
    for (let n = 0; n < 16; n++) {
        if (boardState.hasCard(n) && boardState.getValue(n).turn == 0 && boardState.getValue(n).cardType == 0 && boardState.getValue(n).specialType == 4) {
            return n;
        }
    }
    return 0;
}

//-----------------------------------------------------------------------------
// Function : calculateCostValueWithBuffs
//-----------------------------------------------------------------------------
KamigamiAIManagement.prototype.calculateCostValueWithBuffs = function (boardState, distance, selfCard, oppCard, buffs) {
    var getTotalCost = 0
    var plays = []
    this.damageMultiplier = 10
    let getAttackDamage = this.cardDefinitions.apply_attack(boardState, selfCard, SceneManager._scene.turn)
    if (getAttackDamage == 0) { return [] }
    if (this.oppGodCardEffect == 11) getAttackDamage = this.applyJaciEffect(getAttackDamage, boardState.getValue(oppCard).specialType, boardState.getValue(oppCard).cardType)
    var getMoveCost = this.cardDefinitions.move_apply_effects(boardState.getValue(selfCard))
    var getAttackCost = this.cardDefinitions.attack_apply_effects(boardState.getValue(oppCard), boardState.getValue(selfCard), boardState)
    var getTotalMoveCost = getMoveCost * distance
    var attackNum = Math.ceil(boardState.getValue(oppCard).hp / getAttackDamage)
    if (this.oppGodCardEffect == 11) {
        let attackNumGod = Math.ceil(boardState.getValue(this.getJaciSpot(boardState)).hp / getAttackDamage)
        if (attackNumGod <= attackNum) {
            attackNum = attackNumGod
        }
    }
    getTotalCost = getTotalMoveCost + getAttackCost * attackNum
    var currentDevotion = 0
    var currentAttackNum
    plays.push([getMoveCost, getAttackCost, getTotalCost, attackNum, 0, false])
    for (var n = 0; n < buffs.length; n++) {
        if (buffs[n][0] != 114) {
            var currentAttackNum = Math.ceil(boardState.getValue(oppCard).hp / (getAttackDamage + (n + 1) * this.damageMultiplier))
            currentDevotion += buffs[n][2]
            if (currentAttackNum < attackNum) {
                plays.push([getMoveCost, getAttackCost, getTotalMoveCost + getAttackCost * currentAttackNum + currentDevotion, currentAttackNum, n + 1, false])
            }
        }
    }
    if (this.godCardEffect == 114 && boardState.getValue(selfCard).cardEffect != 114) {
        for (var n = 0; n < plays.length; n++) {
            var currentAttackNum = Math.ceil(boardState.getValue(oppCard).hp / ((getAttackDamage + (plays[n][4]) * this.damageMultiplier) * 2))
            if (currentAttackNum < plays[n][3]) {
                plays.push([plays[n][0], plays[n][1], getTotalMoveCost + getAttackCost * currentAttackNum + currentDevotion, currentAttackNum, plays[n][4], true])
            }
        }
    }
    plays.shift()
    return plays
}

//-----------------------------------------------------------------------------
// Function : calculateCostValue
//-----------------------------------------------------------------------------
KamigamiAIManagement.prototype.calculateCostValue = function (boardState, distance, selfCard, oppCard) {
    console.log(oppCard)
    let getTotalCost = 0
    let getAttackDamage = this.cardDefinitions.apply_attack(boardState, selfCard, SceneManager._scene.turn)
    if (getAttackDamage == 0) { return 1000 }
    if (this.oppGodCardEffect == 11) getAttackDamage = this.applyJaciEffect(getAttackDamage, boardState.getValue(oppCard).specialType, boardState.getValue(oppCard).cardType)
    var getMoveCost = this.cardDefinitions.move_apply_effects(boardState.getValue(selfCard))
    var getAttackCost = this.cardDefinitions.attack_apply_effects(boardState.getValue(oppCard), boardState.getValue(selfCard), boardState)
    getTotalCost += getMoveCost * distance
    var attackNum = Math.ceil(boardState.getValue(oppCard).hp / getAttackDamage)
    if (this.oppGodCardEffect == 11) {
        let attackNumGod = Math.ceil(boardState.getValue(this.getJaciSpot(boardState)).hp / getAttackDamage)
        if (attackNumGod <= attackNum) {
            attackNum = attackNumGod
        }
    }
    getTotalCost += getAttackCost * attackNum
    return [getMoveCost, getAttackCost, getTotalCost, attackNum]
}
//-----------------------------------------------------------------------------
// Function : calculateCostValueSkill
//-----------------------------------------------------------------------------
KamigamiAIManagement.prototype.calculateCostValueSkill = function (boardState, distance, selfCard, oppCard, cardEffect) {
    var getTotalCost = 0
    var getMoveCost = this.cardDefinitions.move_apply_effects(boardState.getValue(selfCard))
    var getSkillCost = SceneManager._scene.getSkillCost(cardEffect)
    if (SceneManager._scene.skillDamage(cardEffect) == 0) {
        getSingleCost = getSkillCost
        getTotalCost = getSkillCost
        var attackNum = 0
    } else {
        getTotalCost += getMoveCost * distance
        var attackNum = Math.ceil(boardState.getValue(oppCard).hp / -SceneManager._scene.skillDamage(cardEffect))
        getTotalCost += getSkillCost * attackNum
        var getSingleCost = getMoveCost * distance + getSkillCost
    }
    return [getMoveCost, getSingleCost, getTotalCost, attackNum]
}

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// KamigamiCardEffects Class /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// ---------------------------------------------------------
// This class holds all effects by the kamigami cards
// ---------------------------------------------------------
function NPC_AI() {
    this.initialize.apply(this, arguments);
}

NPC_AI.prototype.constructor = NPC_AI;

//-----------------------------------------------------------------------------
// Function : initialize
//-----------------------------------------------------------------------------
NPC_AI.prototype.initialize = function () {
    this.cardDefinitions
    this.boardState
    this.skillNum = 0
    this.turn = 1
}
//-----------------------------------------------------------------------------
// Function : setTurn
//-----------------------------------------------------------------------------
NPC_AI.prototype.setTurn = function (turn) {
    this.turn = turn
}

//-----------------------------------------------------------------------------
// Function : imports cardDefinitions
//-----------------------------------------------------------------------------
NPC_AI.prototype.importCardDefinitions = function (cardDefinitions) {
    //this.cardDefinitions = Object.assign({}, cardDefinitions)
    this.cardDefinitions = JSON.parse(cardDefinitions)
}
//-----------------------------------------------------------------------------
// Function : imports board state
//-----------------------------------------------------------------------------
NPC_AI.prototype.importBoardState = function (boardState) {
    //this.boardState = Object.assign({}, boardState)
    var rawBoardState = JSON.parse(boardState)
    this.boardState = new KamigamiBoard()
    this.boardState.importFullTable(rawBoardState.boardState)
}
//-----------------------------------------------------------------------------
// Function : applies values for casting cards
//-----------------------------------------------------------------------------
NPC_AI.prototype.applyBoardValues = function (cardId, boardSlot, casting, boardValuesAI, graveyardValuesAI) {
    this.defenseValue = this.calculateDefenseRate(cardId)
    this.cardId = cardId
    this.actionType = 1
    this.casting = casting
    this.distanceToEnemy = this.calculateDistanceEnemy(boardSlot)
    this.calculateValueRate(this.casting, boardValuesAI, graveyardValuesAI)
}
//-----------------------------------------------------------------------------
// Function : applies values for casting cards
//-----------------------------------------------------------------------------
NPC_AI.prototype.setGodEffects = function (cardEffect, oppCardEffect) {
    this.godCardEffect = cardEffect
    this.oppGodCardEffect = oppCardEffect
}
//-----------------------------------------------------------------------------
// Function : applies values for casting cards
//-----------------------------------------------------------------------------
NPC_AI.prototype.applyCast = function (cardId, index, costDevotion, boardSlot, boardValuesAI, graveyardValuesAI) {
    this.index = index
    this.costDevotion = costDevotion
    this.selfCard = boardSlot
    this.applyBoardValues(cardId, boardSlot, true, boardValuesAI, graveyardValuesAI)

}
//-----------------------------------------------------------------------------
// Function : calculates defense value
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateDefenseRate = function (cardId) {
    var hp = parseInt(SceneManager._scene.cardDefinitions.getCardAttribute(cardId, "HP"))
    if (SceneManager._scene.cardDefinitions.getCardAttribute(cardId, "cardType") == "3" || hp == 10) {
        return 0
    }
    if (hp > 20 || SceneManager._scene.cardDefinitions.getCardAttribute(cardId, "cardEffect") == "18")
        return 2
    return 1
}
//-----------------------------------------------------------------------------
// Function : calculates distance to Enemy Card
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateDistanceEnemy = function (boardSlot) {
    var dist = 0
    var xAxis = boardSlot % 4
    var yAxis = parseInt(boardSlot / 4)
    var xEnemy = 0
    var yEnemy = 0
    for (var n = 0; n < 16; n++) {
        xEnemy = n % 4
        yEnemy = parseInt(n / 4)
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn != this.turn) {
            dist = Math.max(dist, Math.abs(xEnemy - xAxis) + Math.abs(yEnemy - yAxis))
        }
    }
    return dist
}

//-----------------------------------------------------------------------------
// Function : applies values for attacking cards
//-----------------------------------------------------------------------------
NPC_AI.prototype.applySpecialEffect = function (coordinates, boardState, selfCard, oppCard, totalCost, moveCost, cardEffectCost, attackNum, boardValuesAI, cardEffect, multiSkill, graveyardValuesAI) {
    this.coordinates = coordinates
    this.boardState = boardState
    this.actionType = 3
    this.selfCard = selfCard
    this.cardEffect = cardEffect
    this.cardEffectCost = cardEffectCost
    this.oppCard = oppCard
    this.costDevotion = totalCost
    this.moveCost = moveCost
    this.attackNum = attackNum
    this.multiSkill = multiSkill
    this.calculateValueRate(false, boardValuesAI)
}
//-----------------------------------------------------------------------------
// Function : applies values for attacking cards
//-----------------------------------------------------------------------------
NPC_AI.prototype.applyExtraEffect = function (coordinates, boardState, selfCard, oppCard, totalCost, moveCost, cardEffectCost, attackNum, boardValuesAI, cardEffect, multiSkill, graveyardValuesAI) {
    this.coordinates = coordinates
    this.boardState = boardState
    this.actionType = 4
    this.selfCard = selfCard
    this.cardEffect = cardEffect
    this.cardEffectCost = cardEffectCost
    this.oppCard = oppCard
    this.costDevotion = totalCost
    this.moveCost = moveCost
    this.attackNum = attackNum
    this.multiSkill = multiSkill
    this.calculateValueRate(false, boardValuesAI, graveyardValuesAI)
}
//-----------------------------------------------------------------------------
// Function : applies values for attacking cards
//-----------------------------------------------------------------------------
NPC_AI.prototype.applyBeforeSkills = function (buffs, skillNum, odin) {
    this.buffs = buffs
    this.skillNum = skillNum
    this.usingOdin = odin
}

//-----------------------------------------------------------------------------
// Function : applies values for attacking cards
//-----------------------------------------------------------------------------
NPC_AI.prototype.applyAttack = function (coordinates, boardState, selfCard, oppCard, totalCost, moveCost, attackCost, attackNum, boardValuesAI) {
    this.coordinates = coordinates
    this.boardState = boardState
    this.actionType = 2
    this.selfCard = selfCard
    this.oppCard = oppCard
    this.costDevotion = totalCost
    this.moveCost = moveCost
    this.attackCost = attackCost
    this.attackNum = attackNum
    this.calculateValueRate(false, boardValuesAI)
}
//-----------------------------------------------------------------------------
// Function : calculates play value for all types
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateValueRate = function (casting, boardValuesAI, graveyardValuesAI) {
    this.playValue = 0
    switch (this.actionType) {
        case 1: // Cast Type
            this.calculateCastRate(casting, boardValuesAI, graveyardValuesAI)
            break
        case 2: // Attack Type
            this.calculateAttackRate(boardValuesAI)
            break
        case 3: // Special Skill Type
            this.calculateSpecialSkillRate(boardValuesAI)
            break
        case 4: // Extra Skill Type
            this.calculateExtraSkillRate(boardValuesAI, graveyardValuesAI)
            break
    }


}
//-----------------------------------------------------------------------------
// Function : calculates play value for casting cards
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateCastRate = function (casting, boardValuesAI, graveyardValuesAI) {
    var cardType = parseInt(SceneManager._scene.cardDefinitions.getCardAttribute(this.cardId, "cardType"))
    var cardEffect = parseInt(SceneManager._scene.cardDefinitions.getCardAttribute(this.cardId, "cardEffect"))
    if (cardType == 2) {
        var valueRate = this.getValueMiracleCast(cardEffect, boardValuesAI, graveyardValuesAI)
        var costDevotion = parseInt(SceneManager._scene.cardDefinitions.getCardAttribute(this.cardId, "costDevotion"))
        this.playValue = Math.max(0, valueRate - costDevotion)
    }
    else {
        var valueMomentRate = this.getValueMomentRate(casting, cardEffect, boardValuesAI, graveyardValuesAI)
        var costDevotion = 0
        var protectCard = 0
        var godEffectModifies = 0
        var permanentValue = this.calculatePermanentRate(this.cardId, cardEffect, boardValuesAI)
        if (casting) {
            godEffectModifies = this.calculateCastGodModifies(this.boardState)
            costDevotion = parseInt(SceneManager._scene.cardDefinitions.getCardAttribute(this.cardId, "costDevotion"))
            protectCard = this.calculateCardProtection(boardValuesAI, costDevotion, permanentValue)
        }
        this.playValue = Math.max(1, permanentValue + godEffectModifies + valueMomentRate + protectCard - costDevotion)
    }
}
//-----------------------------------------------------------------------------
// Function : calculates values for god effects
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateCastGodModifies = function (boardState) {
    var value = 0
    switch (this.godCardEffect) {
        case 5: // Poseidon
        case 112:
            return this.calculatePoseidonModifier(boardState)
    }
    return value
}


//-----------------------------------------------------------------------------
// Function : calculates values for moment effects
//-----------------------------------------------------------------------------
NPC_AI.prototype.getValueMomentRate = function (casting, cardEffect, boardValuesAI, graveyardValuesAI) {
    if (!casting)
        return 0
    var value = 0
    switch (cardEffect) {
        case 20: // Horus
            return this.calculateBoardCardRate(boardValuesAI, [3])
        case 24: // Kirin
            return this.calculateCardDrawers(SceneManager._scene.npc_hand.length)
        case 25: // Ryujin
            return this.calculateAIRyujin()
        case 21: // Sekhmet
            return this.calculateAIHera()
        case 31: // Hera
            return this.calculateAIHera()
        case 35: // Raijin
            return this.calculateBoardCardRate(boardValuesAI, [1])
        case 37:// Anubis
            return this.calculateAIAnubis(graveyardValuesAI)
        case 41: // Urd
            return parseInt(SceneManager._scene.player1_graveyard.length / 2)
        case 47: // Suzano
            return this.calculateAISuzano()
        case 48: // Osiris
            return this.calculateBoardCardRate(boardValuesAI, [1, 3])
        case 61: // Ares
            return this.calculateBoardCardRate(boardValuesAI, [1])
        case 62: // Ningyo
            return (SceneManager._scene.player_hand.length == 0 ? 0 : 4)
        case 67: // Sume
            return (Math.min(10, SceneManager._scene.player_hand.length * 3))
        case 64: // Heimdall
            return this.calculateAIHeimdall()
        case 72: // Boto
            return Math.floor(this.calculateBoardCardRate(boardValuesAI, [1, 3]) / 3)
        case 73: // Cuca
            return this.calculateRenew(SceneManager._scene.npc_hand)
        case 76: // Full Moon
            return 3
        case 77: // Thunderstorm
            return this.calculateAIThunderstorm(boardValuesAI)
        case 78: // Sunlight
            return this.calculateAISunlight(boardValuesAI)
    }
    return value
}
//-----------------------------------------------------------------------------
// Function : calculateAIThunderstorm
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAISunlight = function (boardValuesAI) {
    var playValue = 0
    for (var n = 0; n < 16; n++) {
        if (boardValuesAI[n % 4][parseInt(n / 4)]) {
            if (boardValuesAI[n % 4][parseInt(n / 4)].turn == 0) {
                playValue -= 3
            } else {
                playValue += 3
            }
        }
    }
    if (this.godCardEffect == 10) {
        playValue += 5
    }
    return playValue
}
//-----------------------------------------------------------------------------
// Function : calculateAIThunderstorm
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAIThunderstorm = function (boardValuesAI) {
    var playValue = -1
    var maxCost = 99
    for (var n = 0; n < 16; n++) {
        if (boardValuesAI[n % 4][parseInt(n / 4)] && boardValuesAI[n % 4][parseInt(n / 4)].costDevotion == maxCost && boardValuesAI[n % 4][parseInt(n / 4)].cardType != 0) {
            if (boardValuesAI[n % 4][parseInt(n / 4)] && boardValuesAI[n % 4][parseInt(n / 4)].turn == 0) {
                if (playValue == 0)
                    playValue = 5
            } else {
                if (playValue == 10)
                    playValue = 5
            }
        }
        if (boardValuesAI[n % 4][parseInt(n / 4)] && boardValuesAI[n % 4][parseInt(n / 4)].costDevotion < maxCost && boardValuesAI[n % 4][parseInt(n / 4)].cardType != 0) {
            if (boardValuesAI[n % 4][parseInt(n / 4)] && boardValuesAI[n % 4][parseInt(n / 4)].turn == 0) {
                playValue = 10
            } else {
                playValue = 0
            }
            maxCost = boardValuesAI[n % 4][parseInt(n / 4)].costDevotion
        }
    }
    return Math.max(0, playValue)
}
//-----------------------------------------------------------------------------
// Function : calculateBoardCardRate
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateBoardCardRate = function (boardValuesAI, cardTypeList) {
    var playValue = 0
    for (var n = 0; n < 16; n++) {
        if (boardValuesAI[n % 4][parseInt(n / 4)] && boardValuesAI[n % 4][parseInt(n / 4)].turn != this.turn && cardTypeList.includes(SceneManager._scene.boardState.getValue(n).cardType))
            playValue = Math.max(playValue, boardValuesAI[n % 4][parseInt(n / 4)].playValue)
    }
    return Math.max(0, playValue)
}

//-----------------------------------------------------------------------------
// Function : calculates values to protect cards
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateCardProtection = function (boardValuesAI, costDevotion, permanentValue) {
    var protectionValue = 0
    if (this.selfCard % 4 > 0
        && boardValuesAI[(this.selfCard - 1) % 4][parseInt(this.selfCard / 4)]
        && boardValuesAI[(this.selfCard - 1) % 4][parseInt(this.selfCard / 4)].turn == this.turn) {
        protectionValue += 2
        if (boardValuesAI[(this.selfCard - 1) % 4][parseInt(this.selfCard / 4)].defenseValue >= 1)
            protectionValue -= 2
        else if (boardValuesAI[(this.selfCard - 1) % 4][parseInt(this.selfCard / 4)].playValue - costDevotion > permanentValue)
            protectionValue += 4
    }
    if (this.selfCard % 4 < 3
        && boardValuesAI[(this.selfCard + 1) % 4][parseInt(this.selfCard / 4)]
        && boardValuesAI[(this.selfCard + 1) % 4][parseInt(this.selfCard / 4)].turn == this.turn) {
        protectionValue += 2
        if (boardValuesAI[(this.selfCard + 1) % 4][parseInt(this.selfCard / 4)].defenseValue >= 1)
            protectionValue -= 2
        else if (boardValuesAI[(this.selfCard + 1) % 4][parseInt(this.selfCard / 4)].playValue - costDevotion > permanentValue)
            protectionValue += 4
    }
    if (parseInt(this.selfCard / 4) > 0
        && boardValuesAI[(this.selfCard) % 4][parseInt((this.selfCard - 4) / 4)]
        && boardValuesAI[(this.selfCard) % 4][parseInt((this.selfCard - 4) / 4)].turn == this.turn) {
        protectionValue += 2
        if (boardValuesAI[(this.selfCard) % 4][parseInt((this.selfCard - 4) / 4)].defenseValue >= 1)
            protectionValue -= 2
        else if (boardValuesAI[(this.selfCard) % 4][parseInt((this.selfCard - 4) / 4)].playValue - costDevotion > permanentValue)
            protectionValue += 4
    }
    if (parseInt(this.selfCard / 4) < 3
        && boardValuesAI[(this.selfCard) % 4][parseInt((this.selfCard + 4) / 4)]
        && boardValuesAI[(this.selfCard) % 4][parseInt((this.selfCard + 4) / 4)].turn == this.turn) {
        protectionValue += 2
        if (boardValuesAI[(this.selfCard) % 4][parseInt((this.selfCard + 4) / 4)].defenseValue >= 1)
            protectionValue -= 2
        else if (boardValuesAI[(this.selfCard) % 4][parseInt((this.selfCard + 4) / 4)].playValue - costDevotion > permanentValue)
            protectionValue += 4
    }
    return protectionValue
}

//-----------------------------------------------------------------------------
// Function : calculates play value for casting cards
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculatePermanentRate = function (cardId, cardEffect, boardValues) {
    var devotionGain = parseInt(SceneManager._scene.cardDefinitions.getCardAttribute(cardId, "addDevotion"))
    var valueStaticRate = this.calculateStaticRate(cardEffect, boardValues)
    var valueBoardSlot = this.calculateBoardValue()
    var cardName = SceneManager._scene.cardDefinitions.getCardAttribute(cardId, "Name")
    return devotionGain * 5 + valueBoardSlot + valueStaticRate
}
//-----------------------------------------------------------------------------
// Function : calculates static Values on board
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateStaticRate = function (cardEffect, boardValues) {
    switch (cardEffect) {
        case 14: // Hermes
            return 2
        case 15: // Nymph
            return 3
        case 16: // Battle Plan
            return 2
        case 17: // Poseidon Statue
            return 6
        case 19: // Naiku
            return this.calculateCardDrawers(SceneManager._scene.npc_hand.length, 2)
        case 22: // Serket
            return this.calculateAIHera()
        case 26: // Skadi
            return 5
        case 27: // Freyja
            return this.calculateAIFreyja()
        case 28: // Yggdrasil
            return 4
        case 29: // Idun Tree
            return 2
        case 30: // Apollo
            return 5
        case 32: // Demeter
            return 5
        case 33: // Hephaestus
            return this.calculateAIHephaestus()
        case 34: // Zeus' Statue
            return this.calculateAIZeusStatue()
        case 39: // Nachi Taicha
            return 10
        case 40: // Izumo Taicha
            return 5
        case 42: // Mount Olympus
            return 5
        case 43: // Passage to Valhalla
            return 20
        case 44: // Great Desert
            return this.calculateAIGreatDesert()
        case 46: // Cyclops
            return 5
        case 49: // Phoenix Egg
            return 8
        case 50: // Balder
            return 3
        case 51: // Valkyrie
            return 5
        case 52: // Nidhogg
            return 5
        case 53: // Sphinx's Statue
            return 5
        case 54: // Obelisk
            if (this.oppGodCardEffect == 11) {
                return 6
            }
            return 2
        case 55: // Hades Statue
            return 5
        case 56: // Bifrost
            return 2
        case 57: // Wall of Asgard
            return 3
        case 58: // Gleipnir
            return 5
        case 59: // Toshogu Shrine
            return 7
        case 60: // Pharaoh's Plague
            return this.calculateAIPlague()
        case 68: // Iara
            return 6
        case 69: // Akuanduba
            return 3
        case 70: // Ruda
            return 2
        case 74: // Boitata
            if (this.oppGodCardEffect == 11) {
                return 7
            }
            return 3
        case 79: // Hunting Shrine
            return 2
        case 101: // Artemis
            return 4
        case 105: // Yuki Onna
            return 4
        case 108: // Chimera
            return 2
        case 111: // Apophis
            return 4
        case 113: // Tyr
            return 5
        case 116: // Ceuci
            if (this.oppGodCardEffect == 11) {
                return 4
            }
            return 2
        case 140: // Dark Forest
            return this.calculateDarkForestPlay();
    }
    return 0
}

//-----------------------------------------------------------------------------
// Function : calculates value for boardSlots
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateBoardValue = function () {
    var value = 0
    switch (this.defenseValue) {
        case 0:
            value += this.distanceToEnemy * 2 - 4
            return value
        case 1:
            value += this.distanceToEnemy
            return value
        case 2:
            value += (6 - this.distanceToEnemy)
            return value
    }
}
//-----------------------------------------------------------------------------
// Function : calculates play value for skills
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateSpecialSkillRate = function (boardValuesAI) {
    if (this.boardState.getValue(this.oppCard).cardType == 0) {
        this.playValue = 999
        return
    }
    var valueRate = boardValuesAI[this.oppCard % 4][parseInt(this.oppCard / 4)].playValue
    this.playValue = Math.max(0, this.calculateSkillRate(valueRate))
    if (this.multiSkill && valueRate + this.calculateAgressiveRate() > this.playValue)
        this.playValue = Math.max(1, valueRate + this.calculateAgressiveRate())
    else
        this.attackNum = 1
}
//-----------------------------------------------------------------------------
// Function : calculates play value for extra skills
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateExtraSkillRate = function (boardValuesAI, graveyardValuesAI) {
    if (this.godCardEffect == 107) {
        var valueRate = this.calculateSkillRateIzanami(boardValuesAI)
    } else
        var valueRate = this.calculateSkillRate(boardValuesAI, graveyardValuesAI) - this.costDevotion
    this.playValue = Math.max(0, valueRate)
}
//-----------------------------------------------------------------------------
// Function : calculates play value for Izanami
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateSkillRateIzanami = function (boardValuesAI) {
    var selfCards = []
    var oppCards = []
    var bestValue = [-100, 0, 0]
    var actualValue = 0
    var sumValueOpp = 0
    var sumValueSelf = 0
    for (var n = 0; n < 16; n++) {
        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == 1) {
            sumValueSelf += boardValuesAI[n % 4][parseInt(n / 4)].playValue
        } else if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == 0)
            sumValueOpp += boardValuesAI[n % 4][parseInt(n / 4)].playValue

        if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == 1 && this.boardState.getValue(n).cardType != 0 && this.boardState.getValue(n).specialType == 3) {
            selfCards.push([n, boardValuesAI[n % 4][parseInt(n / 4)].playValue, this.boardState.getValue(n).costDevotion, this.boardState.getValue(n).cardType])
        } else if (this.boardState.hasCard(n) && this.boardState.getValue(n).turn == 0 && this.boardState.getValue(n).cardType != 0) {
            oppCards.push([n, boardValuesAI[n % 4][parseInt(n / 4)].playValue, this.boardState.getValue(n).costDevotion, this.boardState.getValue(n).cardType])
        }
    }
    for (var a = 0; a < selfCards.length; a++) {
        for (var b = 0; b < oppCards.length; b++) {
            if (selfCards[a][3] == oppCards[b][3] && selfCards[a][2] > oppCards[b][2]) {
                actualValue = - selfCards[a][1] + oppCards[b][1] + (sumValueSelf - sumValueOpp)
                if (actualValue > bestValue[0]) {
                    bestValue = [actualValue, selfCards[a][0], oppCards[b][0]]
                }
            }

        }
    }
    this.sacCard = bestValue[1]
    this.killCard = bestValue[2]
    this.actionType = 5
    return bestValue[0]
}

//-----------------------------------------------------------------------------
// Function : calculates play value for killing cards
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAttackRate = function (boardValuesAI) {
    if (this.boardState.getValue(this.oppCard).cardType == 0) {
        this.playValue = 999
        return
    }
    var valueRate = boardValuesAI[this.oppCard % 4][parseInt(this.oppCard / 4)].playValue
    for (var n = 0; n < this.skillNum; n++) {
        valueRate -= 2
        valueRate += parseInt((SceneManager._scene.devotion_player2 - this.costDevotion) / 2)
    }
    if (this.usingOdin) {
        valueRate -= 20
        valueRate += parseInt((SceneManager._scene.devotion_player2 - this.costDevotion) / 2)
    }
    this.playValue = Math.max(1, valueRate + this.calculateAgressiveRate(valueRate))

}

//-----------------------------------------------------------------------------
// Function : calculates play value for killing cards
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAgressiveRate = function (valueRate = 0) {
    switch (this.godCardEffect) {
        case 5: // Pòseidon
            if (this.boardState.getValue(this.selfCard).cardEffect == 5) {
                return valueRate - this.costDevotion
            }
            break;
        case 112:
            if (this.boardState.getValue(this.selfCard).cardEffect == 112) {
                return valueRate - this.costDevotion
            }
            break;
        case 2:
        case 8:
            return - parseInt(this.costDevotion / 4)

    }
    return - parseInt(this.costDevotion / 2)
}
//-----------------------------------------------------------------------------
// Function : calculates play value for killing cards
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateSkillRate = function (boardValuesAI, graveyardValuesAI) {
    switch (this.cardEffect) {
        case 102: // Artemis
            return - 100
        case 103: // Loki
            return this.calculateLokiSwap(boardValuesAI)
        case 101: // Medusa
            return boardValuesAI[this.oppCard % 4][parseInt(this.oppCard / 4)].playValue - this.cardEffectCost
        case 110: // Set
            return this.calculateAIAnubis(graveyardValuesAI)
        case 113: // Tyr
            return this.calculateTyr()
        case 112: // Hel
            return this.calculateAIHel()
        case 116: // Ceuci
            return this.calculateAICeuci()

    }
    return boardValuesAI[this.oppCard % 4][parseInt(this.oppCard / 4)].playValue - this.cardEffectCost * 2
}
//-----------------------------------------------------------------------------
// Function : calculates play value for loki's skill
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateLokiSwap = function (boardValuesAI) {
    let playValue = 0
    let skillCost = Math.max(0, SceneManager._scene.getSkillCost(1030))
    if (skillCost > SceneManager._scene.devotion_player2) {
        return -1
    }

    if (this.boardState.left(this.oppCard) && this.boardState.left(this.oppCard) != -1 && this.boardState.left(this.oppCard).turn == 0) {
        let cardSlot = this.oppCard - 1
        let totalCost = SceneManager._scene.npcAI.calculateCostValue(this.boardState, 0, this.selfCard, cardSlot)
        if (totalCost[2] + skillCost <= SceneManager._scene.devotion_player2)
            playValue = Math.max(playValue, boardValuesAI[cardSlot % 4][parseInt(cardSlot / 4)].playValue - parseInt((totalCost[2] + skillCost) / 2))
    }
    if (this.boardState.right(this.oppCard) && this.boardState.right(this.oppCard) != -1 && this.boardState.right(this.oppCard).turn == 0) {
        let cardSlot = this.oppCard + 1
        let totalCost = SceneManager._scene.npcAI.calculateCostValue(this.boardState, 0, this.selfCard, cardSlot)
        if (totalCost[2] + skillCost <= SceneManager._scene.devotion_player2)
            playValue = Math.max(playValue, boardValuesAI[cardSlot % 4][parseInt(cardSlot / 4)].playValue - parseInt((totalCost[2] + skillCost) / 2))
    }
    if (this.boardState.up(this.oppCard) && this.boardState.up(this.oppCard) != -1 && this.boardState.up(this.oppCard).turn == 0) {
        let cardSlot = this.oppCard - 4
        let totalCost = SceneManager._scene.npcAI.calculateCostValue(this.boardState, 0, this.selfCard, cardSlot)
        if (totalCost[2] + skillCost <= SceneManager._scene.devotion_player2)
            playValue = Math.max(playValue, boardValuesAI[cardSlot % 4][parseInt(cardSlot / 4)].playValue - parseInt((totalCost[2] + skillCost) / 2))
    }
    if (this.boardState.down(this.oppCard) && this.boardState.down(this.oppCard) != -1 && this.boardState.down(this.oppCard).turn == 0) {
        let cardSlot = this.oppCard + 4
        let totalCost = SceneManager._scene.npcAI.calculateCostValue(this.boardState, 0, this.selfCard, cardSlot)
        if (totalCost[2] + skillCost <= SceneManager._scene.devotion_player2)
            playValue = Math.max(playValue, boardValuesAI[cardSlot % 4][parseInt(cardSlot / 4)].playValue - parseInt((totalCost[2] + skillCost) / 2))
    }
    return playValue
}

//-----------------------------------------------------------------------------
// Function : Gets the board Value for certain card
//-----------------------------------------------------------------------------
NPC_AI.prototype.boardValue = function (boardSlot, okami = false) {
    if (okami && this.boardState.getValue(boardSlot).cardEffect == 38)
        return 0
    var totalValue = 1
    totalValue += this.boardState.getValue(boardSlot).addDevotion * 5
    totalValue += this.getStaticValue(this.boardState.getValue(boardSlot).cardEffect)
    return totalValue
}

//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Miracle
//-----------------------------------------------------------------------------
NPC_AI.prototype.getValueMiracleCast = function (cardEffect, boardValuesAI, graveyardValuesAI) {
    switch (cardEffect) {
        case 201: // Zeus Bolt
            return this.boardValue(this.selfCard, true)
        case 202: // Eclipse
            return this.boardValue(this.selfCard, true)
        case 203: // Everflowing Sun
            return this.calculateCardDrawers(SceneManager._scene.npc_hand.length, 2)
        case 204: // Everflowing Chalice 
            return this.calculateEverflowingChalice()
        case 205: // The Plague
            return this.calculateAIPlague() * 4
        case 206: // Mjolnir's Storm
            return this.calculateMjolnir(boardValuesAI, this.selfCard)
        case 207: // Decimation
            return this.calculateAIDecimation(boardValuesAI)
        case 208: // Soul Extraction
            return this.calculateAIGreatDesert()
        case 210: // Earthquake
            return this.calculateAIEarthquake(boardValuesAI)
        case 211: // Revive
            return this.calculateAIAnubis(graveyardValuesAI)
        case 212: // Idun's Apple
            return this.calculateIdun(this.selfCard)
        case 213: // Renew
            return this.calculateRenew(SceneManager._scene.npc_hand)
        case 222: // Time Reflow
            return this.calculateTimeReflow(graveyardValuesAI)
        case 209: // Calamity
        case 214: // Path of the Ancient
        case 215: // Rise of the pharaoh
        case 216: // Flow of the Nile
            return 999
        case 232: // Invoke the Spirits
            return this.calculateAIInvokeSpirits(SceneManager._scene.npc_hand.length)
        case 217: // Seaquake
            return this.calculateAISeaquake(boardValuesAI)
        case 218: // Armageddon
            return this.calculateAIArmageddon(boardValuesAI)
        case 220: // Loki's Trick
            return parseInt(this.calculateAIDecimation(boardValuesAI) / 6)
        case 221: // Turn to Dust
            return this.boardValue(this.selfCard)
        case 223: // Giant Throw
            return this.calculateAIGianThrow(boardValuesAI, this.selfCard)
        case 224: // Artemis' Arrow
            if (SceneManager._scene.boardState.getValue(this.selfCard).hp <= 20)
                return this.boardValue(this.selfCard)
            if (SceneManager._scene.devotion_player2 > 18 || this.godCardEffect == 3)
                return 1
        case 230: // Soul Exchange
            return this.calculateAIGreatDesert()
        case 233: // Firestorm
            return this.calculateAIFirestorm(boardValuesAI)
        case 234: // Hunting Spear
            if (SceneManager._scene.boardState.getValue(this.selfCard).hp <= 30)
                return this.boardValue(this.selfCard)
            if (SceneManager._scene.devotion_player2 > 23 || this.godCardEffect == 3)
                return 2
    }
    return 0
}
//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Static
//-----------------------------------------------------------------------------
NPC_AI.prototype.getStaticValue = function (cardEffect) {
    switch (cardEffect) {
        case 14: // Hermes
            return 4
        case 15: // Nymph
            return 4
        case 70: // Ruda
            return 2
        case 16: // Battle Plan
            return 4
        case 17: // Poseidon's Statue
            return 6
        case 19: // Naiku
            return 18
        case 22: // Serket
            return 8
        case 24: // Kirin
            return 1
        case 22: // Skadi
            return 4
        case 28: // Yggdrasil
            return 5
        case 29: // Idun Tree
            return 1
        case 30: // Apollo
            return 5
        case 32: // Demeter
            return 4
        case 33: // Hephaestus
            return 5
        case 34: // Zeus' Statue
            return 15
        case 39: // Naichi Taisha
            return 30
        case 40: // Izumo Taisha
            return 9
        case 41: // Urd
            return 5
        case 42: // Mount Olympus
            return 10
        case 43: // Passage to Valhalla
            return 12
        case 45: // Mummy
            return -3
        case 46: // Cyclops
            return 4
        case 49: // Phoenix Egg
            return 9
        case 50: // Balder
            return 4
        case 53: // Sphinx's Statue
            return 6
        case 55: // Hades' Statue
            return 6
        case 56: // Bifrost
            return 4
        case 57: // Wall of Asgard
            return 7
        case 58: // Gleipnir
            return 8
        case 59: // Toshogu Shrine
            return 9
        case 68: // Iara
            return 9
        case 69: // Akuanduba
            return 5
        case 70: // Ruda
            return 3
        case 74: // Boitata
            return 4
        case 79: // hunting Shrine
            return 4
        case 140: // Dark Forest
            return this.calculateDarkForestStatic();
    }
    return 0
}
//////////////////////////// PATH FINDER //////////////////////////////////////
KamigamiAIManagement.prototype.find_path_ai = function (startCoordinates, goalCoordinates, grid) {
    var distanceFromTop = startCoordinates[0];
    var distanceFromLeft = startCoordinates[1];

    // Each "location" will store its coordinates
    // and the shortest path required to arrive there
    var location = {
        distanceFromTop: distanceFromTop,
        distanceFromLeft: distanceFromLeft,
        path: [],
        status: 'Start'
    };

    // Initialize the queue with the start location already inside
    var queue = [location];

    // Loop through the grid searching for the goal
    while (queue.length > 0) {
        // Take the first location off the queue
        var currentLocation = queue.shift();

        // Explore North
        var newLocation = exploreInDirection(currentLocation, 'Up', grid, goalCoordinates);
        if (newLocation.status === 'Goal') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        // Explore East
        var newLocation = exploreInDirection(currentLocation, 'Right', grid, goalCoordinates);
        if (newLocation.status === 'Goal') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        // Explore South
        var newLocation = exploreInDirection(currentLocation, 'Down', grid, goalCoordinates);
        if (newLocation.status === 'Goal') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        // Explore West
        var newLocation = exploreInDirection(currentLocation, 'Left', grid, goalCoordinates);
        if (newLocation.status === 'Goal') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }
    }

    // No valid path found
    return false;

};

// This function will check a location's status
// (a location is "valid" if it is on the grid, is not an "obstacle",
// and has not yet been visited by our algorithm)
// Returns "Valid", "Invalid", "Blocked", or "Goal"
var locationStatus = function (location, goalCoordinates, grid) {
    var gridSize = grid.length;
    var dft = location.distanceFromTop;
    var dfl = location.distanceFromLeft;

    if (location.distanceFromLeft < 0 ||
        location.distanceFromLeft >= gridSize ||
        location.distanceFromTop < 0 ||
        location.distanceFromTop >= gridSize) {

        // location is not on the grid--return false
        return 'Invalid';
    } else if (dft === goalCoordinates[0] && dfl === goalCoordinates[1]) {
        return 'Goal';
    } else if (grid[dfl][dft] !== -1) {
        // location is either an obstacle or has been visited
        return 'Blocked';
    } else {
        return 'Valid';
    }
};


// Explores the grid from the given location in the given
// direction
var exploreInDirection = function (currentLocation, direction, grid, goalCoordinates) {
    var newPath = currentLocation.path.slice();
    newPath.push(direction);

    var dft = currentLocation.distanceFromTop;
    var dfl = currentLocation.distanceFromLeft;

    if (direction === 'Up') {
        dft -= 1;
    } else if (direction === 'Right') {
        dfl += 1;
    } else if (direction === 'Down') {
        dft += 1;
    } else if (direction === 'Left') {
        dfl -= 1;
    }

    var newLocation = {
        distanceFromTop: dft,
        distanceFromLeft: dfl,
        path: newPath,
        status: 'Unknown'
    };
    newLocation.status = locationStatus(newLocation, goalCoordinates, grid);

    // If this new location is valid, mark it as 'Visited'
    if (newLocation.status === 'Valid') {
        grid[newLocation.distanceFromLeft][newLocation.distanceFromTop] = 'Visited';
    }

    return newLocation;
};


// ==========================================================================
// #################### SPECIFIC CARDS AI CALCULATION #######################
// #################### PLAY VALUE CALCULATION ##############################
// ==========================================================================

//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Moment
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAIRyujin = function () {
    var value = 0
    var boardState = SceneManager._scene.boardState
    for (var n = 0; n < 16; n++) {
        if (boardState.hasCard(n) && boardState.getValue(n).turn == 0 && boardState.getValue(n).specialType != 3 && boardState.getValue(n).cardType != 3) {
            value += 2
            if (boardState.getValue(n).hp == 10) {
                value += 2
            }
        }
    }
    return value
}
//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Moment
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAIHera = function () {
    var value = 0
    var boardState = SceneManager._scene.boardState
    for (var n = 0; n < 16; n++) {
        if (boardState.hasCard(n) && boardState.getValue(n).turn == 0 && boardState.getValue(n).cardType != 2) {
            value = 5
            if (boardState.getValue(n).hp == 10) {
                return 10
            }
        }
    }
    return value
}



//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Moment
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAISuzano = function () {
    var value = 0
    var cardType
    var graveyard = SceneManager._scene.player2_graveyard
    for (var n = 0; n < graveyard.length; n++) {
        cardType = parseInt(SceneManager._scene.cardDefinitions.getCardAttribute(cardId, "cardType"))
        if (cardType == 2) {
            return 10
        }
    }
    return value
}
//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Extra
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateTyr = function () {
    for (var n = 0; n < SceneManager._scene.npc_hand.length; n++) {
        var cardEffect = SceneManager._scene.cardDefinitions.getCardAttribute(SceneManager._scene.npc_hand[n], "cardEffect")
        if (cardEffect == "63")
            return 950
    }
    return 0
}
//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Extra
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAIHel = function () {
    SceneManager._scene.check_light_all_player_creatures_not_turn(this.selfCard, this.turn)
    if (SceneManager._scene.flashing_area.length > 0)
        return 50
    else
        return 0
}

//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Extra
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAICeuci = function () {
    //TODO
    return 0
}

//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Moment
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAIAnubis = function (graveyardValuesAI) {
    var value = 0
    var cardType
    for (var n = 0; n < graveyardValuesAI.length; n++) {
        cardType = SceneManager._scene.cardDefinitions.getCardAttribute(graveyardValuesAI[n].cardId, "cardType")
        if (cardType == 1) {
            costDevotion = parseInt(SceneManager._scene.cardDefinitions.getCardAttribute(graveyardValuesAI[n].cardId, "costDevotion"))
            value = Math.max(value, costDevotion + graveyardValuesAI[n].playValue)
        }
    }
    SceneManager._scene.flashingArea1(this.boardState)
    if (SceneManager._scene.flashing_area.length == 0)
        return 0
    return value
}
//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Moment
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAIHeimdall = function () {
    var value = 0
    var costDevotion
    var npcHand = SceneManager._scene.npc_hand
    for (var n = 0; n < npcHand.length; n++) {
        var specialType = SceneManager._scene.cardDefinitions.getCardAttribute(npcHand[n], "specialType")
        var cardType = SceneManager._scene.cardDefinitions.getCardAttribute(npcHand[n], "cardType")
        var cardEffect = parseInt(SceneManager._scene.cardDefinitions.getCardAttribute(npcHand[n], "cardEffect"))
        if (specialType == 2 && cardType == 1 && cardEffect != 64) {
            costDevotion = SceneManager._scene.cardDefinitions.getCardAttribute(npcHand[n], "costDevotion")
            if (costDevotion >= this.costDevotion)
                costDevotion += 5
            value = Math.max(value, costDevotion * 2)

        }
    }
    return value
}

//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Static
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAIFreyja = function () {
    var value = 0
    var boardState = SceneManager._scene.boardState
    for (var n = 0; n < 16; n++) {
        if (boardState.hasCard(n) && boardState.getValue(n).turn == this.turn && boardState.getValue(n).specialType == 2 && boardState.getValue(n).cardType != 3) {
            value += 4
        }
    }
    return value
}
//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Static
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAIHephaestus = function () {
    var value = 0
    var boardState = SceneManager._scene.boardState
    for (var n = 0; n < 16; n++) {
        if (boardState.hasCard(n) && boardState.getValue(n).turn == this.turn && boardState.getValue(n).specialType == 0 && boardState.getValue(n).cardType == 0) {
            return 5
        }
    }
    return value
}
//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Static
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAIZeusStatue = function () {
    var value = 0
    var boardState = SceneManager._scene.boardState
    for (var n = 0; n < 16; n++) {
        if (boardState.hasCard(n) && boardState.getValue(n).turn == this.turn && boardState.getValue(n).specialType == 0 && boardState.getValue(n).cardType != 3) {
            value += 5
        }
    }
    return value
}
//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Static
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAIGreatDesert = function () {
    return SceneManager._scene.devotion_player1 - SceneManager._scene.devotion_player2
}
//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Miracle
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAIPlague = function () {
    var value = 0
    var boardState = SceneManager._scene.boardState
    for (var n = 0; n < 16; n++) {
        if (boardState.hasCard(n)) {
            if (boardState.getValue(n).turn == this.turn && boardState.getValue(n).cardType != 3) {
                if (this.godCardEffect != 3)
                    value -= 2
                if (boardState.getValue(n).hp == 10)
                    value -= 2
            } else if (boardState.getValue(n).turn != this.turn && boardState.getValue(n).cardType != 3) {
                value += 4
                if (boardState.getValue(n).hp == 10)
                    value += 4
            }
        }
    }
    return value
}



//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Miracle
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateDarkForestPlay = function () {
    var value = 0
    value = SceneManager._scene.npc_hand.length * 2;
    return value
}

//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Miracle
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateDarkForestStatic = function () {
    var value = 0
    return value
}


//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Miracle
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAIFirestorm = function (boardValuesAI) {
    var value = 0
    var boardState = SceneManager._scene.boardState
    for (var n = 0; n < 16; n++) {
        if (boardState.hasCard(n)) {
            if (boardState.getValue(n).turn == this.turn) {
                value -= parseInt(boardValuesAI[n % 4][parseInt(n / 4)].playValue / 2)
                if (boardState.getValue(n).hp <= 20 && boardState.getValue(n).cardType != 3) {
                    value -= parseInt(boardValuesAI[n % 4][parseInt(n / 4)].playValue / 2)
                    if (boardState.getValue(n).cardType == 0) {
                        return -999
                    }
                }
                if (boardState.getValue(n).hp <= 10 && boardState.getValue(n).cardType == 3) {
                    value -= parseInt(boardValuesAI[n % 4][parseInt(n / 4)].playValue / 2)
                }
            } else if (boardState.getValue(n).turn != this.turn) {
                value += parseInt(boardValuesAI[n % 4][parseInt(n / 4)].playValue / 2)
                if (boardState.getValue(n).hp <= 20 && boardState.getValue(n).cardType != 3) {
                    value += parseInt(boardValuesAI[n % 4][parseInt(n / 4)].playValue / 2)
                    if (boardState.getValue(n).cardType == 0) {
                        value += 999
                    }
                }
                if (boardState.getValue(n).hp <= 10 && boardState.getValue(n).cardType == 3) {
                    value += parseInt(boardValuesAI[n % 4][parseInt(n / 4)].playValue / 2)
                }
            }
        }
    }
    return value
}


//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Miracle
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAISeaquake = function (boardValuesAI) {
    var value = 0
    var boardState = SceneManager._scene.boardState
    for (var n = 0; n < 16; n++) {
        if (boardState.hasCard(n)) {
            if (boardState.getValue(n).turn == this.turn && boardState.getValue(n).cardType != 3) {
                value -= parseInt(boardValuesAI[n % 4][parseInt(n / 4)].playValue / 2)
                if (boardState.getValue(n).hp <= 30) {
                    value -= parseInt(boardValuesAI[n % 4][parseInt(n / 4)].playValue / 2)
                    if (boardState.getValue(n).cardType == 0) {
                        return -999
                    }
                }
            } else if (boardState.getValue(n).turn != this.turn && boardState.getValue(n).cardType != 3) {
                value += parseInt(boardValuesAI[n % 4][parseInt(n / 4)].playValue / 2)
                if (boardState.getValue(n).hp <= 30) {
                    value += parseInt(boardValuesAI[n % 4][parseInt(n / 4)].playValue / 2)
                    if (boardState.getValue(n).cardType == 0) {
                        value += 999
                    }
                }
            }
        }
    }
    return value
}
//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Miracle
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAIArmageddon = function (boardValuesAI) {
    var value = SceneManager._scene.npc_hand.length * 2
    var boardState = SceneManager._scene.boardState
    for (var n = 0; n < 16; n++) {
        if (boardState.hasCard(n)) {
            if (boardState.getValue(n).turn == this.turn && boardState.getValue(n).cardType != 0) {
                value -= boardValuesAI[n % 4][parseInt(n / 4)].playValue
            } else if (boardState.getValue(n).turn != this.turn && boardState.getValue(n).cardType != 0) {
                value += boardValuesAI[n % 4][parseInt(n / 4)].playValue
            }
        }
    }
    return value
}
//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Miracle
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAIDecimation = function (boardValuesAI) {
    var value = 0
    var boardState = SceneManager._scene.boardState
    for (var n = 0; n < 16; n++) {
        if (boardState.hasCard(n)) {
            if (boardState.getValue(n).turn == this.turn && boardState.getValue(n).cardType == 1) {
                value -= boardValuesAI[n % 4][parseInt(n / 4)].playValue
            } else if (boardState.getValue(n).turn != this.turn && boardState.getValue(n).cardType == 1) {
                value += boardValuesAI[n % 4][parseInt(n / 4)].playValue
            }
        }
    }
    return value
}
//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Miracle
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAIEarthquake = function (boardValuesAI) {
    var value = 0
    var boardState = SceneManager._scene.boardState
    for (var n = 0; n < 16; n++) {
        if (boardState.hasCard(n)) {
            if (boardState.getValue(n).turn == this.turn && boardState.getValue(n).cardType == 3) {
                value -= boardValuesAI[n % 4][parseInt(n / 4)].playValue
            } else if (boardState.getValue(n).turn != this.turn && boardState.getValue(n).cardType == 3) {
                value += boardValuesAI[n % 4][parseInt(n / 4)].playValue
            }
        }
    }
    return value
}
//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Miracle
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateMjolnir = function (boardValuesAI, n) {
    var value = 0
    while (n - 4 >= 0) { n -= 4 }
    var boardState = SceneManager._scene.boardState
    for (n; n < 16; n += 4) {
        if (boardState.hasCard(n) && boardState.getValue(n).cardType != 3) {
            if (boardState.getValue(n).turn == 0)
                value += boardState.getValue(n).hp > 10 ? Math.floor(boardValuesAI[n % 4][parseInt(n / 4)].playValue / 4) : boardValuesAI[n % 4][parseInt(n / 4)].playValue
            else
                value -= boardState.getValue(n).hp > 10 ? Math.floor(boardValuesAI[n % 4][parseInt(n / 4)].playValue / 4) : boardValuesAI[n % 4][parseInt(n / 4)].playValue
        }
    }
    return value
}
//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Miracle
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAIGianThrow = function (boardValuesAI, n) {
    var value = 0
    var boardState = SceneManager._scene.boardState
    if (boardState.getValue(n).cardType == 1) {
        if (boardState.getValue(n).turn == 0)
            value += boardState.getValue(n).hp > 20 ? Math.floor(boardValuesAI[n % 4][parseInt(n / 4)].playValue / 2) : boardValuesAI[n % 4][parseInt(n / 4)].playValue
        else
            value -= boardState.getValue(n).hp > 20 ? Math.floor(boardValuesAI[n % 4][parseInt(n / 4)].playValue / 2) : boardValuesAI[n % 4][parseInt(n / 4)].playValue
    }
    if (boardState.up(n) && boardState.up(n).cardType == 1) {
        if (boardState.up(n).turn == 0)
            value += boardState.up(n).hp > 20 ? Math.floor(boardValuesAI[(n - 4) % 4][parseInt((n - 4) / 4)].playValue / 2) : boardValuesAI[(n - 4) % 4][parseInt((n - 4) / 4)].playValue
        else
            value -= boardState.up(n).hp > 20 ? Math.floor(boardValuesAI[(n - 4) % 4][parseInt((n - 4) / 4)].playValue / 2) : boardValuesAI[(n - 4) % 4][parseInt((n - 4) / 4)].playValue
    }
    if (boardState.down(n) && boardState.down(n).cardType == 1) {
        if (boardState.down(n).turn == 0)
            value += boardState.down(n).hp > 20 ? Math.floor(boardValuesAI[(n + 4) % 4][parseInt((n + 4) / 4)].playValue / 2) : boardValuesAI[(n + 4) % 4][parseInt((n + 4) / 4)].playValue
        else
            value -= boardState.down(n).hp > 20 ? Math.floor(boardValuesAI[(n + 4) % 4][parseInt((n + 4) / 4)].playValue / 2) : boardValuesAI[(n + 4) % 4][parseInt((n + 4) / 4)].playValue
    }
    if (boardState.left(n) && boardState.left(n).cardType == 1) {
        if (boardState.left(n).turn == 0)
            value += boardState.left(n).hp > 20 ? Math.floor(boardValuesAI[(n - 1) % 4][parseInt((n - 1) / 4)].playValue / 2) : boardValuesAI[(n - 1) % 4][parseInt((n - 1) / 4)].playValue
        else
            value -= boardState.left(n).hp > 20 ? Math.floor(boardValuesAI[(n - 1) % 4][parseInt((n - 1) / 4)].playValue / 2) : boardValuesAI[(n - 1) % 4][parseInt((n - 1) / 4)].playValue
    }
    if (boardState.right(n) && boardState.right(n).cardType == 1) {
        if (boardState.right(n).turn == 0)
            value += boardState.right(n).hp > 20 ? Math.floor(boardValuesAI[(n + 1) % 4][parseInt((n + 1) / 4)].playValue / 2) : boardValuesAI[(n + 1) % 4][parseInt((n + 1) / 4)].playValue
        else
            value -= boardState.right(n).hp > 20 ? Math.floor(boardValuesAI[(n + 1) % 4][parseInt((n + 1) / 4)].playValue / 2) : boardValuesAI[(n + 1) % 4][parseInt((n + 1) / 4)].playValue
    }

    return value
}

//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Miracle
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateIdun = function (boardSlot) {
    return parseInt((boardState.getValue(boardSlot).mhp - boardState.getValue(boardSlot).hp) / 2)
}
//-----------------------------------------------------------------------------
// Function : calculates card value by cardType - Miracle
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateTimeReflow = function (graveyardValuesAI) {
    var value = 0
    var cardType
    for (var n = 0; n < graveyardValuesAI.length; n++) {
        cardType = SceneManager._scene.cardDefinitions.getCardAttribute(graveyardValuesAI[n].cardId, "cardType")
        if (cardType == 2 && graveyardValuesAI[n].playValue > value) {
            value = graveyardValuesAI[n].playValue
        }
    }
    return value
}
//-----------------------------------------------------------------------------
// Function : calculates card value for Invoke
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateAIInvokeSpirits = function (handSize) {
    let value = 0
    if (handSize > 4) {
        value = (handSize - 4) * (handSize - 4)
    }
    return value
}


//-----------------------------------------------------------------------------
// Function : calculates card value for renew
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateRenew = function (npcHand) {
    var value = 5
    var specialValues = 0
    for (var n = 0; n < npcHand.length; n++) {
        var cardType = SceneManager._scene.cardDefinitions.getCardAttribute(npcHand[n], "cardType")
        var costDevotion = SceneManager._scene.cardDefinitions.getCardAttribute(npcHand[n], "costDevotion")
        var cardEffect = SceneManager._scene.cardDefinitions.getCardAttribute(npcHand[n], "cardEffect")
        if (this.godCardEffect == 7 && cardType == 1) { // Hades
            specialValues = 10
        }
        if (cardType == 1) {
            specialValues = Math.max(specialValues, parseInt(costDevotion / 2))
        }
        if (cardEffect == 211) { // Revive
            value = 10
        }
    }

    return value + specialValues
}
//-----------------------------------------------------------------------------
// Function : calculates chalice
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateEverflowingChalice = function () {
    var count = 0
    var boardState = SceneManager._scene.boardState
    for (var n = 0; n < 16; n++) {
        if (boardState.hasCard(n)) {
            if (boardState.getValue(n).turn == this.turn && boardState.getValue(n).specialType == 3) {
                count++
            }
        }
    }
    var value = this.calculateCardDrawers(SceneManager._scene.npc_hand.length, count)
    return value
}

// ==========================================================================
// #################### CARD DEFINITIONS FOR AI #######################
// #################### PLAY VALUE CALCULATION ##############################
// ==========================================================================
//-----------------------------------------------------------------------------
// Function : callTimeReflowAI
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.callTimeReflowAI = function () {
    var value = 0
    var cardId = 0
    var index = 0
    if (this.bestPlay.length > 0) {
        for (var n = 0; n < this.npcAI.graveyardValuesAI.length; n++) {
            cardType = SceneManager._scene.cardDefinitions.getCardAttribute(this.npcAI.graveyardValuesAI[n].cardId, "cardType")
            if (cardType == 2 && this.npcAI.graveyardValuesAI[n].playValue > value) {
                value = this.npcAI.graveyardValuesAI[n].playValue
                cardId = this.npcAI.graveyardValuesAI[n].cardId
            }
        }
        for (var i = 0; i < this.player2_graveyard.length; i++) {
            if (this.player2_graveyard[i][0] == cardId) {
                index = i
            }
        }
        this.addCardFromGraveyardToHand(this.turn, this.player2_graveyard[index], index)
    }
}
//-----------------------------------------------------------------------------
// Function : callReviveAI
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.callReviveAI = function (cardEffect = -1) {
    var value = 0
    var cardId = 0
    var index = 0
    var cardSlot = 0
    var foundCard = false
    if (this.bestPlay.length > 0) {
        for (var n = 0; n < this.npcAI.graveyardValuesAI.length; n++) {
            cardType = SceneManager._scene.cardDefinitions.getCardAttribute(this.npcAI.graveyardValuesAI[n].cardId, "cardType")
            cardEffectGy = SceneManager._scene.cardDefinitions.getCardAttribute(this.npcAI.graveyardValuesAI[n].cardId, "cardEffect")
            if (cardType == 1 && this.npcAI.graveyardValuesAI[n].playValue > value && cardEffectGy != cardEffect) {
                value = this.npcAI.graveyardValuesAI[n].playValue
                cardId = this.npcAI.graveyardValuesAI[n].cardId
                cardSlot = this.npcAI.graveyardValuesAI[n].selfCard
                foundCard = true
            }
        }
        for (var i = 0; i < this.player2_graveyard.length; i++) {
            if (this.player2_graveyard[i][0] == cardId) {
                index = i
            }
        }
        if (foundCard) {
            this.board_place = cardSlot
            this.removeCardGraveyard(this.turn, this.player2_graveyard[index][0], 0)
            this.extra_animations.push(['Cast_Card', this.turn, cardId, cardSlot, -1, false]);
        }
    }
}

// ==========================================================================
// #################### MAIN GOD CARD MODIFIER #######################
// #################### PLAY VALUE CALCULATION ##############################
// ==========================================================================
//-----------------------------------------------------------------------------
// Function : calculates values for god effects
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculatePoseidonModifier = function (boardState) {

    if (this.boardState.left(this.selfCard) && this.boardState.left(this.selfCard).cardType == 0 && this.boardState.left(this.selfCard).turn == 1) {
        return -3
    } else if (this.boardState.right(this.selfCard) && this.boardState.right(this.selfCard).cardType == 0 && this.boardState.right(this.selfCard).turn == 1) {
        return -3
    } else if (this.boardState.up(this.selfCard) && this.boardState.up(this.selfCard).cardType == 0 && this.boardState.up(this.selfCard).turn == 1) {
        return -3
    } else if (this.boardState.down(this.selfCard) && this.boardState.down(this.selfCard).cardType == 0 && this.boardState.down(this.selfCard).turn == 1) {
        return -3
    }
    return 3
}
//-----------------------------------------------------------------------------
// Function : calculates values for card Drawing based on god effects
//-----------------------------------------------------------------------------
NPC_AI.prototype.calculateCardDrawers = function (npcHandSize, drawQty = 1) {
    var godModifier = 0
    if (drawQty >= SceneManager._scene.player2Deck.cardList.length) {
        return 0
    }
    if (this.godCardEffect == 2) {
        return Math.max(0, 12 - npcHandSize + drawQty * 3)
    }
    if (this.godCardEffect == 109) {
        if (drawQty > 2) {
            drawQty += 4
        }
        return drawQty * 4
    }
    return Math.max(0, 27 - npcHandSize * 5 + drawQty * 2)
}


//-----------------------------------------------------------------------------
// Function : calculates values for card discarding
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.chooseAIDiscardCard = function () {
    if (this.extra_animations[0][2] == 64) {
        var bestDiscardCard = this.getHeimdallCard()
        return
    }
    var bestDiscardCard = 0
    var discardValue = 0
    for (var n = 0; n < this.npc_hand.length; n++) {
        var costDevotion = parseInt(this.cardDefinitions.getCardAttribute(this.npc_hand[n], "costDevotion"))
        var cardType = parseInt(this.cardDefinitions.getCardAttribute(this.npc_hand[n], "cardType"))
        var specialType = parseInt(this.cardDefinitions.getCardAttribute(this.npc_hand[n], "specialType"))
        if (cardType == 1 && costDevotion > discardValue) {
            if (this.npcAI.godCardEffect == 115 && (discardValue <= this.devotion_player2 || specialType != 4)) {
                continue;
            }
            bestDiscardCard = n; discardValue = costDevotion
        }
    }
    if (discardValue == 0)
        bestDiscardCard = Math.randomInt(this.npc_hand.length)

    this.sendCardGraveyard(1, this.npc_hand[bestDiscardCard]);
    let lastGyCard = this.player2_graveyard[this.player2_graveyard.length - 1]
    this.resetExtraAnimation()
    this.extra_animations.unshift(['SendGraveyardBig', lastGyCard[1], lastGyCard[2], lastGyCard[3], lastGyCard[4]])
    this.setCardAttributes(lastGyCard[1], this._cards_player_2[bestDiscardCard])
    this._cards_player_2[bestDiscardCard].destroy();
    this._cards_player_2.splice(bestDiscardCard, 1);
    this.npc_hand.splice(bestDiscardCard, 1);
    this.extra_animations.unshift('decoy')
}

//-----------------------------------------------------------------------------
// Function : getHeimdallCard
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.getHeimdallCard = function () {
    var maxValue = -1
    var cardChosen = -1
    for (var n = 0; n < this.npc_hand.length; n++) {
        var specialType = parseInt(this.cardDefinitions.getCardAttribute(this.npc_hand[n], "specialType"))
        var cardType = parseInt(this.cardDefinitions.getCardAttribute(this.npc_hand[n], "cardType"))
        var costDevotion = parseInt(this.cardDefinitions.getCardAttribute(this.npc_hand[n], "costDevotion"))
        var cardEffect = parseInt(this.cardDefinitions.getCardAttribute(this.npc_hand[n], "cardEffect"))
        if (specialType == 2 && cardType == 1 && costDevotion > maxValue && cardEffect != 64) {
            maxValue = costDevotion
            cardChosen = n
        }
    }
    this.flashingArea1(this.boardState);
    var slot = Math.randomInt(this.flashing_area.length)
    if (cardChosen != -1 && this.flashing_area.length > 0) {
        this.board_place = this.flashing_area[slot]
        this._cards_player_2[cardChosen].bitmap = ImageManager.loadKamigami("")
        this.extra_animations.push(['Cast_Card', this.turn, this.npc_hand[cardChosen], this.flashing_area[slot], cardChosen, true]);
    }
}

//-----------------------------------------------------------------------------
// Function : getTyrCard
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.getTyrCard = function () {
    for (var n = 0; n < this.npc_hand.length; n++) {
        var cardEffect = parseInt(this.cardDefinitions.getCardAttribute(this.npc_hand[n], "cardEffect"))
        if (cardEffect == 63) {
            return n
        }
    }
}

//-----------------------------------------------------------------------------
// Function : checkIAMulligan
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.checkIAMulligan = function () {
    if ([2, 109].includes(this.player2Deck.godCardEffect) || this.npc_hand.length < 4) {
        return false;
    }
    if ($dataKamigami.difficultySetting == 0) {
        return false;
    }
    let extraDevotion = 0;

    if (this.turn == 0) {
        extraDevotion += Math.ceil(this.player2Deck.godCardValues.addDevotion / 2)
    }
    extraDevotion += -$dataKamigami.handicap
    let cardDevotion = 0;
    let cardType = 0;
    let turnDevotion = parseInt(this.cardDefinitions.getCardAttribute(this.player2Deck.godCard, "addDevotion")) + extraDevotion
    for (let n = 0; n < this.npc_hand.length; n++) {
        cardDevotion = parseInt(this.cardDefinitions.getCardAttribute(this.npc_hand[n], "costDevotion"))
        cardType = parseInt(this.cardDefinitions.getCardAttribute(this.npc_hand[n], "cardType"))
        if ((cardType == 1 || cardType == 3) && cardDevotion <= turnDevotion) {
            return false;
        }
    }
    return true;
};



//-----------------------------------------------------------------------------
// Function : checkAnhangaGyDevotion - checksGraveyardAnhanga
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.checkAnhangaGyDevotion = function () {
    if (this.player2_graveyard.length > 0) {
        this.extra_animations.push(['Effect_Card', 123, 115, this.turn])
        this.extra_animations.push(['Extra_Skills', 1, true, false, 115, true]);
        return true;
    }
    return false;
}

