var chatInput = null
//-----------------------------------------------------------------------------
// Function : createChatBox
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createChatBox = function () {
    this.createChatVariables()
    this.createChatCommandsSpriteView()
    this.createChatSpriteView()
    this.createChatInput()
    this.createChatWindow()
    this.createChatSendBtn()
    this.createChatHideBtn()
    this.createChatShowBtn()
    this.createChatScrollBar()
    this.createChatUnreadBtn()
    this.create_options()
    this.createGiveUpBtn()
    if ($dataKamigami.chatHidden) {
        this.chatShow.opacity = 255
        this.chatHide.opacity = 0
    }
};
//-----------------------------------------------------------------------------
// Function : createGiveUpDialog
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createGiveUpDialog = function () {
    this._backMessageGiveUp = new Sprite()
    this._backMessageGiveUp.bitmap = ImageManager.loadExtrasKamigami("resignBox")
    let text = IAVRA.I18N.localize("#{DuelVocab.SkillsDescription.giveup}")
    this._backMessageGiveUp.header = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 60, fill: 0xFFFFFF, align: 'left' });
    this._backMessageGiveUp.addChild(this._backMessageGiveUp.header)
    this._backMessageGiveUp.header.y = -180
    this._backMessageGiveUp.header.x = -400
    this._backMessageGiveUp.alpha = 0.7
    this._backMessageGiveUp.anchor.y = this._backMessageGiveUp.anchor.x = 0.5
    this._backMessageGiveUp.x = Graphics.width / 2
    this._backMessageGiveUp.y = 400
    this.addChild(this._backMessageGiveUp)
    this._backMessageGiveUp.scale.y = 0

    this._messageGiveUpYes = new Sprite_Clickable()
    text = IAVRA.I18N.localize("#{DuelVocab.SkillsDescription.giveupyes}")

    this._messageGiveUpYes.bitmap = new Bitmap(200, 100)
    this._messageGiveUpYes.bitmap.fontSize = 100;
    this._messageGiveUpYes.bitmap.outlineWidth = 0;
    this._messageGiveUpYes.x = -300
    this._messageGiveUpYes.opacity = 140
    this._messageGiveUpYes.bitmap.drawText(text, 0, 0, 200, 100, 'right')
    this._backMessageGiveUp.addChild(this._messageGiveUpYes)

    this._messageGiveUpNo = new Sprite_Clickable()
    text = IAVRA.I18N.localize("#{DuelVocab.SkillsDescription.giveupno}")
    this._messageGiveUpNo.bitmap = new Bitmap(200, 100)
    this._messageGiveUpNo.bitmap.fontSize = 100;
    this._messageGiveUpNo.bitmap.outlineWidth = 0;
    this._messageGiveUpNo.opacity = 140
    this._messageGiveUpNo.bitmap.drawText(text, 0, 0, 200, 100, 'right')
    this._backMessageGiveUp.addChild(this._messageGiveUpNo)

}

//-----------------------------------------------------------------------------
// Function : createChatVariables
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createChatVariables = function () {
    this.player1Name = "YOU"
    if (greenworks) {
        this.player1Name = greenworks.getSteamId().screenName
    }
    this.player2Name = "OPPONENT"
}


//-----------------------------------------------------------------------------
// Function : create_options
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.create_options = function () {
    this._passBtn = new Sprite_Card();
    this._passBtn.bitmap = ImageManager.loadExtrasKamigami("PassBtn");
    this._passBtn.anchor.x = 0.5;
    this._passBtn.anchor.y = 0.5;
    this._passBtn.x = 245;
    this._passBtn.y = -80;
    this.chatCommandSpriteView.addChild(this._passBtn)

    this._passBtn2 = new Sprite();
    this._passBtn2.bitmap = ImageManager.loadExtrasKamigami("PassBtn2");
    this._passBtn2.anchor.x = 0.5;
    this._passBtn2.anchor.y = 0.5;
    this._passBtn2.x = 245;
    this._passBtn2.y = -80;
    this._passBtn2.opacity = 0;
    this.chatCommandSpriteView.addChild(this._passBtn2)
};
//-----------------------------------------------------------------------------
// Function : create_options
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createGiveUpBtn = function () {
    this._giveUpBtn = new Sprite_Card();
    this._giveUpBtn.bitmap = ImageManager.loadExtrasKamigami("GiveUpBtn");
    this._giveUpBtn.anchor.x = 0.5;
    this._giveUpBtn.anchor.y = 0.5;
    this._giveUpBtn.x = 245;
    this._giveUpBtn.y = -30;
    this.chatCommandSpriteView.addChild(this._giveUpBtn)

    this._giveUpBtn2 = new Sprite();
    this._giveUpBtn2.bitmap = ImageManager.loadExtrasKamigami("GiveUpBtn2");
    this._giveUpBtn2.anchor.x = 0.5;
    this._giveUpBtn2.anchor.y = 0.5;
    this._giveUpBtn2.x = 245;
    this._giveUpBtn2.y = -30;
    this._giveUpBtn2.opacity = 0;
    this.chatCommandSpriteView.addChild(this._giveUpBtn2)
};
//-----------------------------------------------------------------------------
// Function : createChatCommandsSpriteView
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createChatCommandsSpriteView = function () {
    this.chatCommandSpriteView = new Sprite_Clickable()
    this.chatCommandSpriteView.bitmap = new Bitmap(395, 100)
    this.cardContainer.addChildZ(this.chatCommandSpriteView, -500);
    $dataKamigami.chatPosX = 1540
    $dataKamigami.chatPosY = 500
    if (!$dataKamigami.chatPosX) {
        $dataKamigami.chatPosX = 1550
        $dataKamigami.chatPosY = 500
    }
    this.chatCommandSpriteView.x = $dataKamigami.chatPosX
    this.chatCommandSpriteView.y = $dataKamigami.chatPosY

}
//-----------------------------------------------------------------------------
// Function : createChatSpriteView
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createChatSpriteView = function () {
    this.chatSpriteView = new Sprite_Clickable()
    this.chatSpriteView.bitmap = new Bitmap(395, 470)
    this.cardContainer.addChildZ(this.chatSpriteView, 500);
    this.chatSpriteView.x = $dataKamigami.chatPosX
    this.chatSpriteView.y = $dataKamigami.chatPosY
}
//-----------------------------------------------------------------------------
// Function : createChatInput
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createChatInput = function () {
    chatInput = new PIXI.TextInput({
        input: {
            fontFamily: 'Arial',
            fontSize: '36px',
            padding: '12px',
            width: '230px',
            color: '#26272E'
        },
        box: {
            default: { fill: 0xE8E9F3, rounded: 12, stroke: { color: 0xCBCEE0, width: 3 } },
            focused: { fill: 0xE1E3EE, rounded: 12, stroke: { color: 0xABAFC6, width: 3 } },
            disabled: { fill: 0xDBDBDB, rounded: 12 }
        }
    })
    chatInput.setInputStyle('fontFamily', 'Arial')
    chatInput.setInputStyle('fontSize', 20 + 'px')
    chatInput.setInputStyle('fontWeight', 'normal')
    chatInput.setInputStyle('padding', 14 + 'px')
    chatInput.placeholder = 'Let\'s Talk!'
    chatInput.x = 0
    chatInput.y = 330 + 50
    //chatInput.pivot.x = chatInput.width / 2
    //chatInput.pivot.y = chatInput.height / 2
    this.chatSpriteView.addChild(chatInput)
}
//-----------------------------------------------------------------------------
// Function : createChatWindow
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createChatWindow = function () {
    this.chatMessageWindow = new Sprite_Card()
    this.chatMessageWindow.bitmap = ImageManager.loadExtrasKamigami("chatWindow");
    this.chatSpriteView.addChild(this.chatMessageWindow)
    this.chatMessageWindow.y = 50
    this.chatMessages = new PIXI.Text('', { fontFamily: 'Chau Philomene One', fontSize: 24, fill: 0xffffff, align: 'left' });
    this.chatMasks = new PIXI.Graphics();
    this.chatMasks.beginFill();
    this.chatMasks.drawRect(0, 50, 360, 320);
    this.chatMasks.endFill();
    this.chatSpriteView.addChild(this.chatMasks)
    this.chatSpriteView.addChild(this.chatMessages)
    this.chatMessages.y = 30
    this.chatMessages.x = 5
    this.chatMessages.mask = this.chatMasks
    this.chatMessages.style.wordWrapWidth = 340
    this.chatMessages.style.wordWrap = true
}
//-----------------------------------------------------------------------------
// Function : createChatSendBtn
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createChatSendBtn = function () {
    this.chatSendButton = new Sprite_Card()
    this.chatSendButton.bitmap = ImageManager.loadExtrasKamigami("SendBtn");
    this.chatSpriteView.addChild(this.chatSendButton)
    this.chatSendButton.y = 330 + 75
    this.chatSendButton.x = 320
    this.chatSendButton.anchor.x = 0.5
    this.chatSendButton.anchor.y = 0.5
}
//-----------------------------------------------------------------------------
// Function : createChatUnreadBtn
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createChatUnreadBtn = function () {
    this.chatUnread = new Sprite_Card()
    this.chatUnread.bitmap = ImageManager.loadExtrasKamigami("chatNotify");
    this.chatCommandSpriteView.addChild(this.chatUnread)
    this.chatUnread.x = 280
    this.chatUnread.y = 3
    this.chatUnreadMessages = new PIXI.Text('', { fontFamily: 'Chau Philomene One', fontSize: 22, fill: 0xFFFFFF, align: 'center' });
    this.chatUnreadMessages.x = 290
    this.chatUnreadMessages.y = 8
    this.chatUnreadMessages.text = 0
    this.chatUnreadMessages.alpha = 0
    this.chatUnread.opacity = 0
    this.chatCommandSpriteView.addChild(this.chatUnreadMessages)
}
//-----------------------------------------------------------------------------
// Function : createChatHideBtn
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createChatHideBtn = function () {
    if (!$dataKamigami.chatHidden) {
        $dataKamigami.chatHidden = false
    }
    this.chatHidden = $dataKamigami.chatHidden
    this.chatHide = new Sprite_Card()
    this.chatHide.bitmap = ImageManager.loadExtrasKamigami("HideBtn");
    this.chatCommandSpriteView.addChild(this.chatHide)
    this.chatHide.x = 245
    this.chatHide.y = 20
    this.chatHide.anchor.x = this.chatHide.anchor.y = 0.5
}
//-----------------------------------------------------------------------------
// Function : createChatShowBtn
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createChatShowBtn = function () {
    this.chatShow = new Sprite_Card()
    this.chatShow.bitmap = ImageManager.loadExtrasKamigami("ShowBtn");
    this.chatCommandSpriteView.addChild(this.chatShow)
    this.chatShow.x = 245
    this.chatShow.y = 20
    this.chatShow.anchor.x = this.chatShow.anchor.y = 0.5
    this.chatShow.opacity = 0

    this.chatShow2 = new Sprite();
    this.chatShow2.bitmap = ImageManager.loadExtrasKamigami("ShowBtn2");
    this.chatShow2.anchor.x = 0.5;
    this.chatShow2.anchor.y = 0.5;
    this.chatShow2.x = 245;
    this.chatShow2.y = 20;
    this.chatShow2.opacity = 0;
    this.chatCommandSpriteView.addChild(this.chatShow2)
}

//-----------------------------------------------------------------------------
// Function : createChatScrollBar
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.createChatScrollBar = function () {
    this.scrollBarBack = new Sprite_Card()
    this.scrollBarBack.bitmap = ImageManager.loadExtrasKamigami("chatScrollBarBack");
    this.chatSpriteView.addChild(this.scrollBarBack)
    this.scrollBarBack.x = -5
    this.scrollBarBack.y = 210
    this.scrollBarBack.anchor.x = this.scrollBarBack.anchor.y = 0.5
    this.scrollBar = new Sprite_Card()
    this.scrollBar.bitmap = ImageManager.loadExtrasKamigami("chatScrollBar");
    this.chatSpriteView.addChild(this.scrollBar)
    this.scrollBar.x = -5
    this.scrollBar.y = 210
    this.scrollBar.anchor.x = this.scrollBar.anchor.y = 0.5
}

//////////////////////////// MAIN UPDATE //////////////////////////////////////
//-----------------------------------------------------------------------------
// Alias Function : update
//-----------------------------------------------------------------------------
var chatBox_Duel_update = Scene_Kamigami_Duel.prototype.update
Scene_Kamigami_Duel.prototype.update = function () {
    this.animateChatLoop()
    //return
    chatBox_Duel_update.call(this)
}
//-----------------------------------------------------------------------------
// New Function : animateLoop
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.animateChatLoop = function () {
    //TouchInput.wheelY
    this._passBtn2.opacity = this._passBtn.isButtonTouched() ? this._passBtn2.opacity + 20 : this._passBtn2.opacity - 20
    this._giveUpBtn2.opacity = this._giveUpBtn.isButtonTouched() ? this._giveUpBtn2.opacity + 20 : this._giveUpBtn2.opacity - 20
    this.chatShow2.opacity = this.chatShow.isButtonTouched() ? this.chatShow2.opacity + 20 : this.chatShow2.opacity - 20

    if (TouchInput.isPressed()) {
        if (this.scrollBar.isButtonTouched()) {
            this.moveScrollBar = true
        }
    }
    if (this.moveScrollBar) {
        var min = 210 - this.scrollBar.height * (1 - this.scrollBar.scale.y) / 2
        var max = 210 + this.scrollBar.height * (1 - this.scrollBar.scale.y) / 2
        this.scrollBar.y = Math.min(max, Math.max(min, TouchInput.y - this.chatSpriteView.y))
        if (this.scrollBar.scale.y < 1)
            this.chatMessages.y = (1 - (max - this.scrollBar.y) / (max - min)) * (370 - this.chatMessages.height)
        if (!TouchInput.isPressed()) this.moveScrollBar = false
    }
    if (this._giveUpBtn.isTriggered())
        this.onGiveUp = true
    if (this.chatHidden) {
        this.hideChatBox()
        if (TouchInput.isTriggered() && this.chatShow.isButtonTouched() && this.phase >= 4) {
            this.chatHidden = false
            $dataKamigami.chatHidden = false
            this.chatUnreadMessages.style.fill = "#3D3D3D"
            this.chatUnreadMessages.text = 0
            this.chatUnreadMessages.alpha = 0
            this.chatShow.opacity = 0
            this.chatHide.opacity = 255
            this.chatSpriteView.y = this.chatCommandSpriteView.y = Math.min(this.chatSpriteView.y, 1075 - this.chatSpriteView.height)
        }
        return
    } else {
        if (this.showChatBox())
            return
    }

    if (TouchInput.isTriggered()) {
        if (this.chatSendButton.isButtonTouched() && chatInput.text.length > 0) {
            this.updateChatBox(`\n${this.player1Name}: `, chatInput.text)
            return
        }
        if (this.chatSpriteView.isButtonTouched())
            chatInput.select()
        if (!this.chatHidden && this.chatHide.isButtonTouched()) {
            this.chatHidden = true
            $dataKamigami.chatHidden = true
            this.chatShow.opacity = 255
            this.chatHide.opacity = 0
        }
    }
    if (chatInput._hasFocus()) {
        if (Input.isTriggered("ok") && chatInput.text.length > 0) {
            this.updateChatBox(`\n${this.player1Name}: `, chatInput.text)
        }
    }
}

//-----------------------------------------------------------------------------
// New Function : updateChatBox
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.updateChatBox = function (sender, message, clearInput = true) {
    this.chatMessages.text += sender + message
    if (clearInput)
        chatInput.text = ""
    this.chatMessages.y = 370 - this.chatMessages.height
    this.updateScrollLength()
    if (this.chatHidden) {
        this.chatUnreadMessages.style.fill = "#9B3636"
        this.chatUnreadMessages.text = parseInt(this.chatUnreadMessages.text) + 1
        this.chatUnreadMessages.alpha = 1
        this.chatUnread.opacity = 255
    }
}
//-----------------------------------------------------------------------------
// New Function : updateChatBox
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.updateChatLog = function (message, turn = this.turn) {
    let playerName = turn == 0 ? this.player1Name : this.player2Name
    message = message.replace("{player}", playerName)
    this.chatMessages.text += message
    this.chatMessages.y = 370 - this.chatMessages.height
    this.updateScrollLength()
    if (this.chatHidden) {
        this.chatUnreadMessages.style.fill = "#9B3636"
        this.chatUnreadMessages.text = parseInt(this.chatUnreadMessages.text) + 1
        this.chatUnreadMessages.alpha = 1
        this.chatUnread.opacity = 255
    }
}
//-----------------------------------------------------------------------------
// New Function : hideChatBox
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.hideChatBox = function () {
    if (this.chatSpriteView.scale.y > 0) {
        this.chatSpriteView.scale.y -= 0.1
        if (this.chatSpriteView.scale.y < 0) {
            this.chatSpriteView.scale.y = 0
        }
    }
}
//-----------------------------------------------------------------------------
// New Function : showChatBox
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.showChatBox = function () {
    if (this.chatSpriteView.scale.y < 1) {
        this.chatSpriteView.scale.y += 0.1
        if (this.chatSpriteView.scale.y > 1) {
            this.chatSpriteView.scale.y = 1
        }
        return true
    }
    return false
}

//-----------------------------------------------------------------------------
// New Function : updateScrollLength
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.updateScrollLength = function () {
    this.scrollBar.scale.y = Math.min(1, 370 / this.chatMessages.height)
    this.scrollBar.y = 210 + this.scrollBar.height * (1 - this.scrollBar.scale.y) / 2
}

//-----------------------------------------------------------------------------
// New Function : updateGiveUpMenu
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.updateGiveUpMenu = function () {
    if (this.closeGiveUpMenu) {
        if (this._backMessageGiveUp.scale.y > 0) {
            this._backMessageGiveUp.scale.y -= 0.05
            if (this._backMessageGiveUp.scale.y <= 0) {
                this._backMessageGiveUp.scale.y = 0
                this.onGiveUp = false
                this.closeGiveUpMenu = false
            }
            return;
        }
    }
    if (this._backMessageGiveUp.scale.y < 1) {
        this._backMessageGiveUp.scale.y += 0.05
        if (this._backMessageGiveUp.scale.y > 1) {
            this._backMessageGiveUp.scale.y = 1
        }
        return;
    }

    if (this._messageGiveUpYes.isButtonTouched()) {
        this._messageGiveUpYes.opacity += 20
        if (TouchInput.isTriggered()) {
            let id = this.boardState.findPlayerGod(0)
            this.onGiveUp = false
            if (id != -1)
                this.set_hp(id, -10000)
        }
    } else {
        if (this._messageGiveUpYes.opacity > 150)
            this._messageGiveUpYes.opacity -= 20
    }

    if (this._messageGiveUpNo.isButtonTouched()) {
        this._messageGiveUpNo.opacity += 20
        if (TouchInput.isTriggered()) {
            this.closeGiveUpMenu = true;
        }
    } else {
        if (this._messageGiveUpNo.opacity > 150)
            this._messageGiveUpNo.opacity -= 20
    }
}


//-----------------------------------------------------------------------------
// Function rewrite : _shouldPreventDefault
//-----------------------------------------------------------------------------
Input._shouldPreventDefault = function (keyCode) {
    if (chatInput && chatInput._hasFocus())
        return false;
    switch (keyCode) {
        //case 8:     // backspace
        case 33:    // pageup
        case 34:    // pagedown
        case 37:    // left arrow
        case 38:    // up arrow
        case 39:    // right arrow
        case 40:    // down arrow
            return true;
    }
    return false;
};
