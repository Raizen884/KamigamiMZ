
//-----------------------------------------------------------------------------
// Sprite_Cards
//
// The sprite for displaying a card in triple triad.

function Sprite_DuelExtras_Steps() {
    this.initialize.apply(this, arguments);
}

Sprite_DuelExtras_Steps.prototype = Object.create(Sprite.prototype);
Sprite_DuelExtras_Steps.prototype.constructor = Sprite_DuelExtras_Steps;

Sprite_DuelExtras_Steps.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this.addSteps();
    this.addX();
    this.startVariables();
}
Sprite_DuelExtras_Steps.prototype.startVariables = function () {
    this._xOpacity = false;
    this._step1Mov = true;
    this._step2Mov = false;
}
Sprite_DuelExtras_Steps.prototype.addSteps = function () {
    this._steps1 = new Sprite()
    this._steps1.bitmap = ImageManager.loadExtrasKamigami("steps")
    this.addChild(this._steps1)
    this._steps1.anchor.x = this._steps1.anchor.y = 0.5
    this._steps1.y = -40
    this._steps1.x = 20
    this._steps2 = new Sprite()
    this._steps2.bitmap = ImageManager.loadExtrasKamigami("steps_2")
    this.addChild(this._steps2)
    this._steps2.anchor.x = this._steps2.anchor.y = 0.5
    this._steps2.y = 40
    this._steps2.x = -20
}
Sprite_DuelExtras_Steps.prototype.addX = function () {
    this._xSign = new Sprite()
    this._xSign.bitmap = ImageManager.loadExtrasKamigami("xis")
    this.addChild(this._xSign)
    this._xSign.anchor.x = this._xSign.anchor.y = 0.5
}


Sprite_DuelExtras_Steps.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if (this._xOpacity) {
        this._xSign.opacity += 5;
        if (this._xSign.opacity >= 255) {
            this._xOpacity = false
        }
    } else {
        this._xSign.opacity -= 5;
        if (this._xSign.opacity <= 105) {
            this._xOpacity = true
        }
    }
    if (this._step1Mov) {
        this.walkStep1()
    } else {
        this.disappearStep1()
    }
    if (this._step2Mov) {
        this.walkStep2()
    } else {
        this.disappearStep2()
    }
}

Sprite_DuelExtras_Steps.prototype.disappearStep1 = function () {
    this._steps1.opacity -= 10
    if (this._steps1.opacity == 0) {
        this._step1Mov = true
        this._steps1.y = -40
        this._steps1.x = 20
    }
}

Sprite_DuelExtras_Steps.prototype.disappearStep2 = function () {
    this._steps2.opacity -= 10
    if (this._steps2.opacity == 0) {
        this._step2Mov = true
        this._steps2.y = 0
        this._steps2.x = 20
    }
}

Sprite_DuelExtras_Steps.prototype.walkStep1 = function () {
    if (this._steps1.opacity < 255) {
        this._steps1.opacity += 10
        return
    }
    this._steps1.y += 1
    this._steps1.x -= 1
    if (this._steps1.x < -20) {
        this._step1Mov = false;
    }
}
Sprite_DuelExtras_Steps.prototype.walkStep2 = function () {
    if (this._steps2.opacity < 255) {
        this._steps2.opacity += 10
        return
    }
    this._steps2.y += 1
    this._steps2.x -= 1
    if (this._steps2.x < -20) {
        this._step2Mov = false;
    }
}