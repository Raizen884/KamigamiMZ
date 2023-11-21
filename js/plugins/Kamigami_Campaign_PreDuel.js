

//-----------------------------------------------------------------------------
// Scene_Campaign_PreDuel 
//
// The scene class of the campaign map.

function Scene_Campaign_PreDuel() {
    this.initialize.apply(this, arguments);
}

Scene_Campaign_PreDuel.prototype = Object.create(Scene_Base.prototype);
Scene_Campaign_PreDuel.prototype.constructor = Scene_Campaign_PreDuel;
//////////////////////////// MAIN START //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : initialize - initiates the graphics
//-----------------------------------------------------------------------------
Scene_Campaign_PreDuel.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    this.createVariables()
    this.createBackCards()
};
Scene_Campaign_PreDuel.prototype.createVariables = function () {
    this.phase = 0
    this.countFrames = -1
}
Scene_Campaign_PreDuel.prototype.createBackCards = function () {
    this._backCards = new Array()
    this.camera = new PIXI.projection.Camera3d();
    this.camera.position.set(Graphics.width / 2, Graphics.height / 2);
    this.camera.setPlanes(400, 180, 10000, false);
    this.camera.x = 960;
    this.camera.y = 540;
    this.addChild(this.camera)
    for (let n = 0; n < 1; n++) {
        this._backCards[n] = new SpriteGod()
        this._backCards[n].configureGod("Back_Card");
        this._backCards[n].convertTo3d()
        this.camera.addChild(this._backCards[n])
        this._backCards[n].y = 1081
        this._backCards[0].euler.y = -0.40
    }
}
//-----------------------------------------------------------------------------
// Function : updates - updates process
//-----------------------------------------------------------------------------
Scene_Campaign_PreDuel.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    this.countFrames++
    switch (this.phase) {
        case 0:
            this.updateOpeningScene()
            break;
    }
}

Scene_Campaign_PreDuel.prototype.updateOpeningScene = function () {
    if (this.countFrames < 46)
        this._backCards[0].y -= 46 - this.countFrames
    if (this.countFrames > 10 && this.countFrames < 46)
        this._backCards[0].x -= (46 - this.countFrames)
    if (this.countFrames < 40)
        this._backCards[0].euler.y += 0.01
    if (this.countFrames >= 48 && this.countFrames < 58) {
        //this._backCards[0].euler.y = (3 - (this.countFrames % 6))/50
        this._backCards[0].scale.x -= 0.04
        this._backCards[0].scale.y -= 0.04
    }
}


