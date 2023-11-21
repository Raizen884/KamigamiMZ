ImageManager.loadCredits = function (filename, hue) {
    return this.loadBitmap('img/credits/', filename, hue, true);
};

//=============================================================================
// KamigamiDecks
// Description: Deck Choice Scene
//=============================================================================


function Scene_Kamigami_Credits() {
    this.initialize.apply(this, arguments);
}

Scene_Kamigami_Credits.prototype = Object.create(Scene_Base.prototype);
Scene_Kamigami_Credits.prototype.constructor = Scene_Kamigami_Credits;

//-----------------------------------------------------------------------------
// Function : initialize - initiates the graphics
//-----------------------------------------------------------------------------
Scene_Kamigami_Credits.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    this.createVariables();
    this.createBackGround()
    this.createFadeScreen();
    this.createCamera();
    this.createBackCards()
    this.createFlashCard();
    this.createCredits();
};
Scene_Kamigami_Credits.prototype.createCredits = function () {
    let text = IAVRA.I18N.localize("#{DuelVocab.MenuText.credits}")
    this.creditsText = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 84, fill: 0xFFFFFF, align: 'center', dropShadow: true, dropShadowBlur: 3, wordWrap: true, wordWrapWidth: 1600 });
    this.addChild(this.creditsText)
    this.creditsText.x = Graphics.width / 2 - this.creditsText.width / 2
    this.creditsText.y = 30
    this.creditsText.alpha = 0
}


Scene_Kamigami_Credits.prototype.createVariables = function () {
    this.countFrames = 0
    this.countCredits = 12
    this.currentCredits = 1
    this.phase = 0;
}


Scene_Kamigami_Credits.prototype.createFadeScreen = function () {
    this._fadeScreenSprite2 = new Sprite();
    this._fadeScreenSprite2.bitmap = ImageManager.loadKamigami("shop_fade");
    this.addChild(this._fadeScreenSprite2);
    this._fadeScreenSprite2.opacity = 140
}
//-----------------------------------------------------------------------------
// Function : createBackGround
//-----------------------------------------------------------------------------
Scene_Kamigami_Credits.prototype.createBackGround = function () {
    this._bg = []
    for (let n = 0; n < 4; n++) {
        this._bg[n] = new Sprite()
        this._bg[n].bitmap = ImageManager.loadCredits("background", n * 90 - 90)
        this.addChild(this._bg[n])
        this._bg[n].opacity = 0
    }

}
//-----------------------------------------------------------------------------
// Function : createCardContainer
//-----------------------------------------------------------------------------
Scene_Kamigami_Credits.prototype.createCardContainer = function () {
    this.mainContainer = new SContainer();
    this.addChild(this.mainContainer)
    this.mainContainer.convertTo3d();
}

//-----------------------------------------------------------------------------
// Function : createCamera
//-----------------------------------------------------------------------------
Scene_Kamigami_Credits.prototype.createCamera = function () {
    this.cameraCard = new PIXI.projection.Camera3d();
    this.cameraCard.position.set(Graphics.width / 2, Graphics.height / 2);
    this.cameraCard.setPlanes(1400, 180, 10000, false);
    //this.specialCardCamera.euler.x = Math.PI / 5.5;
    this.addChild(this.cameraCard);
};

//-----------------------------------------------------------------------------
// Function : createBackCards
//-----------------------------------------------------------------------------
Scene_Kamigami_Credits.prototype.createBackCards = function () {
    this._backCards = []
    for (let n = 0; n < 3; n++) {
        this._backCards[n] = new Sprite()
        this._backCards[n].bitmap = ImageManager.loadKamigami("Back_Card")
        this.cameraCard.addChild(this._backCards[n])
        this._backCards[n].anchor.x = this._backCards[n].anchor.y = 0.5
        this._backCards[n].x = n * 600 - 600
        this._backCards[n].y = 1080
        this._backCards[n].convertTo3d()
    }
}
//-----------------------------------------------------------------------------
// Function : createFlashCard
//-----------------------------------------------------------------------------
Scene_Kamigami_Credits.prototype.createFlashCard = function () {
    this.flashCard = new Sprite()
    this.flashCard.bitmap = ImageManager.loadKamigami("flash_card")
    this.cameraCard.addChild(this.flashCard)
    this.flashCard.anchor.x = this.flashCard.anchor.y = 0.5
    this.flashCard.convertTo3d()
    this.flashCard.opacity = 0

}

//-----------------------------------------------------------------------------
// Function : update
//-----------------------------------------------------------------------------
Scene_Kamigami_Credits.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    this.countFrames++
    switch (this.phase) {
        case 0:
            this.updateEntry();
            break;
        case 1:
            this.updateBackGround()
            this.updateCardEuler()
            this.updateChangeCredits()
            if (TouchInput.isTriggered()) {
                AudioManager.playSe({ name: "success", pan: 0, pitch: 95, volume: 100 });
                this.phase = 2
                this.countFrames = 0
                this.flashCard.opacity = 0
            }
            break;
        case 2:
            this.closeScene()
            break;
    }

};
//-----------------------------------------------------------------------------
// Function : updateEntry
//-----------------------------------------------------------------------------
Scene_Kamigami_Credits.prototype.updateEntry = function () {
    this._bg[0].opacity += 4
    if (this.creditsText.alpha < 0.7)
        this.creditsText.alpha += 0.02
    for (let n = 0; n < 3; n++) {
        if (this.countFrames < n * 30)
            break
        if (this._backCards[n].y > 0) {
            this._backCards[n].y -= this._backCards[n].y / 20 + 1

            if (this._backCards[n].y < 0) {
                this._backCards[n].y = 0
            }
        }
    }
    if (this._backCards[2].y == 0) {
        this.countFrames = 0
        this.phase = 1
    }
}
//-----------------------------------------------------------------------------
// Function : closeScene
//-----------------------------------------------------------------------------
Scene_Kamigami_Credits.prototype.closeScene = function () {
    for (let n = 0; n < 3; n++) {
        if (this.countFrames < 60 - n * 30)
            continue
        if (this._backCards[n].y < 1000) {
            this._backCards[n].y += (this.countFrames - (60 - n * 30))
            if (this._backCards[n].y > 1000) {
                this._backCards[n].y = 1000
            }
        }
        if (this._backCards[n].x != 0) {
            this._backCards[n].x -= this._backCards[n].x / 20 + 1
        }
    }
    if (this.countFrames > 120) {
        for (let n = 0; n < 4; n++) {
            this._bg[n].opacity -= 4
        }
        this.creditsText.alpha -= 0.02

    }
    if (this.countFrames > 240) {
        SceneManager.goto(Scene_Main_Menu)
    }

}




//-----------------------------------------------------------------------------
// Function : updateBackGround
//-----------------------------------------------------------------------------
Scene_Kamigami_Credits.prototype.updateBackGround = function () {
    let bgIndex = 0
    for (let n = 0; n < 4; n++) {
        if (this._bg[n].opacity == 0 || (n == 0 && this._bg[3].opacity != 0)) {
            continue
        }
        this._bg[n].opacity -= 1
        bgIndex = n == 3 ? 0 : n + 1
        this._bg[bgIndex].opacity += 1
        break;
    }
}
//-----------------------------------------------------------------------------
// Function : updateCardEuler
//-----------------------------------------------------------------------------
Scene_Kamigami_Credits.prototype.updateCardEuler = function () {
    let maxYEuler
    let maxXEuler
    let difEulerY
    let difEulerX
    for (let n = 0; n < 3; n++) {
        maxYEuler = -(TouchInput.x - Graphics.width / 2) / 1500
        difEulerY = this._backCards[n].euler.y - maxYEuler
        if (difEulerY > 0.1) {
            difEulerY = 0.1
        }
        if (difEulerY < -0.1) {
            difEulerY = -0.1
        }
        maxXEuler = (TouchInput.y - Graphics.height / 2) / 600
        difEulerX = this._backCards[n].euler.x - maxXEuler
        if (difEulerX > 0.1) {
            difEulerX = 0.1
        }
        if (difEulerX < -0.1) {
            difEulerX = -0.1
        }
        this._backCards[n].euler.y -= difEulerY
        this._backCards[n].euler.x -= difEulerX
    }
}
//-----------------------------------------------------------------------------
// Function : updateChangeCredits
//-----------------------------------------------------------------------------
Scene_Kamigami_Credits.prototype.updateChangeCredits = function () {
    if (Math.floor(this.countFrames / 60) < 1) {
        return
    }
    let flashIndex = (this.currentCredits - 1) % 3
    if (this.countFrames == 60) {
        this.flashCard.x = this._backCards[flashIndex].x
        this.flashCard.y = this._backCards[flashIndex].y
        this.isRevealing = true
    }
    this.flashCard.euler.x = this._backCards[flashIndex].euler.x
    this.flashCard.euler.y = this._backCards[flashIndex].euler.y
    if (this.flashCard.opacity < 255 && this.isRevealing) {
        this.flashCard.opacity += 20
        if (this.flashCard.opacity == 255) {
            this._backCards[flashIndex].bitmap = ImageManager.loadCredits("card" + this.currentCredits)
            this.isRevealing = false
        }
        return
    }
    if (this.flashCard.opacity > 0) {
        this.flashCard.opacity -= 20
    }
    if (this.flashCard.opacity == 0) {
        this.countFrames = 0
        this.currentCredits++
        if (this.currentCredits > this.countCredits) {
            this.currentCredits = 1
        }
    }
}