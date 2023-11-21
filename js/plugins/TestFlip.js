//=============================================================================
// TripleTriadScene
// Description: Main System Scene
//=============================================================================


function Scene_TestFlip() {
    this.initialize.apply(this, arguments);
}

Scene_TestFlip.prototype = Object.create(Scene_Base.prototype);
Scene_TestFlip.prototype.constructor = Scene_TestFlip;

//-----------------------------------------------------------------------------
// Function : initialize - initiates the graphics
//-----------------------------------------------------------------------------
Scene_TestFlip.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this)
    this.createBackground();
};

//-----------------------------------------------------------------------------
// Function : createBackground - initiates the graphics
//-----------------------------------------------------------------------------
Scene_TestFlip.prototype.createBackground = function () {
    this.background = new Sprite()
    this.background.bitmap = ImageManager.loadPicture("Fundo_City")
    this.addChild(this.background)
};

