////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// KamigamiBoard Class /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// ---------------------------------------------------------
// This class holds all board information
// ---------------------------------------------------------
function KamigamiBoard() {
    this.initialize.apply(this, arguments);
}

KamigamiBoard.prototype.constructor = KamigamiBoard;

//-----------------------------------------------------------------------------
// Function : initialize
//-----------------------------------------------------------------------------
KamigamiBoard.prototype.initialize = function () {
    this.boardState = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    this.boardId = 0
    this.limitBoardId = 0
}
//-----------------------------------------------------------------------------
// Function : startTurn
//-----------------------------------------------------------------------------
KamigamiBoard.prototype.startTurn = function () {
    this.limitBoardId = this.boardId
}
//-----------------------------------------------------------------------------
// Function : enteredThisTurn
//-----------------------------------------------------------------------------
KamigamiBoard.prototype.enteredThisTurn = function (position) {
    return this.boardState[position].boardId > this.limitBoardId
}
//-----------------------------------------------------------------------------
// Function : left
//-----------------------------------------------------------------------------
KamigamiBoard.prototype.left = function (position) {
    return position % 4 > 0 ? this.boardState[position - 1] : false
}
//-----------------------------------------------------------------------------
// Function : right
//-----------------------------------------------------------------------------
KamigamiBoard.prototype.right = function (position) {
    return position % 4 < 3 ? this.boardState[position + 1] : false
}
//-----------------------------------------------------------------------------
// Function : up
//-----------------------------------------------------------------------------
KamigamiBoard.prototype.up = function (position) {
    return parseInt(position / 4) > 0 ? this.boardState[position - 4] : false
}
//-----------------------------------------------------------------------------
// Function : down
//-----------------------------------------------------------------------------
KamigamiBoard.prototype.down = function (position) {
    return parseInt(position / 4) < 3 ? this.boardState[position + 4] : false
}

//-----------------------------------------------------------------------------
// Function : cleanValue
//-----------------------------------------------------------------------------
KamigamiBoard.prototype.cleanValue = function (position) {
    this.boardState[position] = -1
}

//-----------------------------------------------------------------------------
// Function : addValue
//-----------------------------------------------------------------------------
KamigamiBoard.prototype.addValue = function (position, value, boardId = false) {
    this.boardState[position] = value
    if (!boardId) {
        this.boardId++
        this.boardState[position].boardId = this.boardId
    } else {
        this.boardState[position].boardId = boardId
    }

}
//-----------------------------------------------------------------------------
// Function : hasCard
//-----------------------------------------------------------------------------
KamigamiBoard.prototype.hasCard = function (position) {
    if (position > 15) {
        return false
    }
    return this.boardState[position] != -1
}
//-----------------------------------------------------------------------------
// Function : isEmpty
//-----------------------------------------------------------------------------
KamigamiBoard.prototype.isEmpty = function (position) {
    return this.boardState[position] == -1
}
//-----------------------------------------------------------------------------
// Function : addValue
//-----------------------------------------------------------------------------
KamigamiBoard.prototype.getValue = function (position) {
    return this.boardState[position]
}
//-----------------------------------------------------------------------------
// Function : importFullTable
//-----------------------------------------------------------------------------
KamigamiBoard.prototype.importFullTable = function (fullTable) {
    this.boardState = fullTable
}
//-----------------------------------------------------------------------------
// Function : get2dTable
//-----------------------------------------------------------------------------
KamigamiBoard.prototype.get2dTable = function () {
    var table = [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]]
    for (var n = 0; n < 16; n++) {
        table[n % 4][parseInt(n / 4)] = this.boardState[n]
    }
    return table
}
//-----------------------------------------------------------------------------
// Function : findPlayerGod
//-----------------------------------------------------------------------------
KamigamiBoard.prototype.findPlayerGod = function (turn) {
    for (let n = 0; n < 16; n++) {
        if (this.boardState[n] == -1)
            continue
        if (this.boardState[n].turn == turn && this.boardState[n].cardType == 0){
            return n
        }
    }
    return -1
}
//-----------------------------------------------------------------------------
// Function : setHp //TODO - Passar do Scene para cá
//-----------------------------------------------------------------------------
KamigamiBoard.prototype.setHp = function (id, value, attacking = false) {
    if (id == -1 || value == 0) { return }
    if (value == -1000 && this.getValue(id).cardEffect == 38) { return }
    var hp = Math.max(this.getValue(id).hp + value, 0);
    hp = Math.min(this.getValue(id).mhp, hp);
    this.getValue(id).hp = hp;
    if (hp == 0 && this.getValue(id).cardType == 0) { this.callEndGame(this.getValue(id).turn) }
    if (hp == 0 && attacking) { this.apply_thor(this.turn) }
    if (hp == 0) {
        SceneManager._scene.extra_animations.push(['Send_Graveyard', id, this.getValue(id).turn, this.getValue(id).cardId])
        this.cardDefinitions.removeBoardCard(this.getValue(id))
        this.cleanValue(id)
        this.hpWindow.write_hp(this)
    }
    this.hpWindow.write_hp(this)
};


