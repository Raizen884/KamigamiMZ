
Scene_Kamigami_Duel.prototype.createDuelDescription = function () {
    this.createBackDuelDescription();
    this.createDuelTextDescription();

};

Scene_Kamigami_Duel.prototype.createBackDuelDescription = function () {
    this._descriptionBack = new Sprite_Clickable();
    this._descriptionBack.bitmap = ImageManager.loadKamigami("back_description");
    this.addChild(this._descriptionBack)
    this._descriptionBack.opacity = 0
}

Scene_Kamigami_Duel.prototype.createDuelTextDescription = function () {
    let text = IAVRA.I18N.localize("#{DuelVocab.SkillsDescription.movement}")
    this._descriptionText = new PIXI.Text("", { fontFamily: 'Grenze', fontSize: 60, fill: 0xffffff, align: 'center', fontWeight: "bold" });
    this.addChild(this._descriptionText)
    this._descriptionText.anchor.x = 0.5
    this._descriptionText.x = Graphics.width / 2
    this._descriptionText.text = new String()
}
Scene_Kamigami_Duel.prototype.updateDescriptionText = function () {
    if (this._descriptionText.text == "") {
        this._descriptionBack.opacity -= 10
        if (this._descriptionText.alpha > 0)
            this._descriptionText.alpha -= 0.05
    } else {
        this._descriptionBack.opacity += 10
        if (this._descriptionText.alpha < 1) {
            this._descriptionText.alpha += 0.05
            if (this._descriptionText.alpha > 1) {
                this._descriptionText.alpha = 1

            }
        }

    }
}
//-----------------------------------------------------------------------------
// Function : updateShowInfoAction
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.updateDescriptionOnTouch = function (position) {
    this.oldPosition = position
    let type = this.infoPositions[position]
    switch (type) {
        case "move":
            this.updateMoveDescription(position);
            break;
        case "attack":
            this.updateAttackDescription(position);
            break;
        case "cast":
            this.updateCastDescription(position);
            break;
        case "special":
            this.updateSpecialDescription(position);
            break;
        default:
            this._descriptionText.text = new String()
            break;
    }

}

//-----------------------------------------------------------------------------
// Function : updateMoveDescription
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.updateMoveDescription = function (position) {
    var applyMoveCost = this.cardDefinitions.move_apply_effects(this.boardState.getValue(this.board_place))
    let text = IAVRA.I18N.localize("#{DuelVocab.SkillsDescription.movement}")
    this._descriptionText.text = text.replace("|X|", applyMoveCost)
}

//-----------------------------------------------------------------------------
// Function : updateAttackDescription
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.updateAttackDescription = function (position) {
    var applyAttackCost = this.cardDefinitions.attack_apply_effects(this.boardState.getValue(position), this.boardState.getValue(this.board_place), this.boardState)
    var attackDamage = this.cardDefinitions.apply_attack(this.boardState, this.board_place, this.turn)
    let text = IAVRA.I18N.localize("#{DuelVocab.SkillsDescription.attack}")
    this._descriptionText.text = text.replace("|X|", applyAttackCost).replace("|Z|", attackDamage)
}

//-----------------------------------------------------------------------------
// Function : updateCastDescription
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.updateCastDescription = function (position) {
    let cardCost;
    if (this.cardDefinitions.getExtraSkills().length > 0) {
        switch (this.cardDefinitions.getExtraSkills()[0][1]) {
            case 110:
                cardCost = this.getSkillCost(this.cardDefinitions.getExtraSkills()[0][1])
                break;
            case 211:
                cardCost = parseInt(this.cardDefinitions.getCardAttribute(this.onCastGraveyardCardId, "costDevotion", position))
                break;
            case 37:
                cardCost = 0
                break;
            case 23:
            case 45:
                cardCost = parseInt(this.cardDefinitions.getCardAttribute(this.cardDefinitions.getExtraSkills()[0][0], "costDevotion", position))
                break;
            default:
                cardCost = parseInt(this.cardDefinitions.getCardAttribute(this.player_hand[this.index], "costDevotion", position))
                break;
        }
    } else {
        cardCost = parseInt(this.cardDefinitions.getCardAttribute(this.player_hand[this.index], "costDevotion", position))
    }

    let text = IAVRA.I18N.localize("#{DuelVocab.SkillsDescription.cast}")
    this._descriptionText.text = text.replace("|X|", cardCost)
}

//-----------------------------------------------------------------------------
// Function : updateSpecialDescription
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.updateSpecialDescription = function (position) {
    let cardEffect = this.boardState.getValue(this.board_place).cardEffect
    if (cardEffect == 103) { cardEffect *= 10 }
    let costSkill = this.getSkillCost(cardEffect)
    let text = IAVRA.I18N.localize("#{DuelVocab.SkillsDescription.special}")
    this._descriptionText.text = text.replace("|X|", costSkill)
}

