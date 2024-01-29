//-----------------------------------------------------------------------------
// Triple Triad Image Handler
//
// The scene class of the battle screen.

ImageManager.loadPreDuel = function (filename, hue) {
    return this.loadBitmap('img/pre_battle/', filename, hue, true);
};


//-----------------------------------------------------------------------------
// Scene_Title
//
// The scene class of the title screen.

function Scene_Kamigami_PreDuel() {
    this.initialize.apply(this, arguments);
}

Scene_Kamigami_PreDuel.prototype = Object.create(Scene_Base.prototype);
Scene_Kamigami_PreDuel.prototype.constructor = Scene_Kamigami_PreDuel;

Scene_Kamigami_PreDuel.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
};

Scene_Kamigami_PreDuel.prototype.centerSprite = function (sprite) {
    sprite.x = Graphics.width / 2;
    sprite.y = Graphics.height / 2;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
};

Scene_Kamigami_PreDuel.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    AudioManager.stopBgm()
    this.create_variables()
    this.createGods()
    this.create_fake_center();
    this.createBackground()
    this.createExtraBackGround()

    this.createCameraCards()
    this.createLines()
    this.createNamesLine()
    this.createNames()
    this.createVersusImages()
    this.createSecondBackground()

    this.createThirdBG()
};

Scene_Kamigami_PreDuel.prototype.createExtraBackGround = function () {
    this._symbolImg = new Sprite();
    this._symbolImg.bitmap = ImageManager.loadPreDuel("centerSymbol");
    this._symbolImg.x = Graphics.width / 2
    this._symbolImg.y = Graphics.height / 2
    this._symbolImg.anchor.x = this._symbolImg.anchor.y = 0.5
    this.addChild(this._symbolImg);
    this._symbolImg.opacity = 0


    this._background1 = new Sprite();
    this._background1.bitmap = ImageManager.loadPreDuel("bg1");
    this.addChild(this._background1);
    this._background1.anchor.x = 1
    this._background1.x = Graphics.width / 2
    this._background1.scale.x = 0
    this._background2 = new Sprite();
    this._background2.bitmap = ImageManager.loadPreDuel("bg2");
    this._background1.anchor.x = 1
    this.addChild(this._background2);
    this._background2.x = Graphics.width / 2
    this._background2.scale.x = 0
};


SceneManager.snapForBackgroundFix = function () {
    SceneManager.snapForBackground();
};

Scene_Kamigami_PreDuel.prototype.createThirdBG = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    this.addChild(this._backgroundSprite);
}


Scene_Kamigami_PreDuel.prototype.create_fake_center = function () {
    this._center_sprite = new Sprite_Card();
    this._center_sprite.bitmap = ImageManager.loadTitle1("center_effects");
    this.addChild(this._center_sprite);
    this._center_sprite.x = Graphics.width / 2;
    this._center_sprite.y = Graphics.height / 2;
    //this.emitter = fx.getParticleEmitter('Versus');

};
//-----------------------------------------------------------------------------
// Function : create_variables
//-----------------------------------------------------------------------------
Scene_Kamigami_PreDuel.prototype.create_variables = function () {
    this.phase = 0
    this.frame_count = 0
    let deck = $dataKamigami.chosenDeck;



    this.god1 = Game_Kamigami.convertedCardList[$dataKamigami.decks[deck][1][40]].name
    if ($dataKamigami.onTutorial) {
        this.god1 = "Zeus"
    }
    if ($dataEnemyId !== false)
        this.god2 = $dataKamigami.duelInfo[$dataEnemyId].name
    else
        this.god2 = "Thor"
};
//-----------------------------------------------------------------------------
// Function : createGods
//-----------------------------------------------------------------------------
Scene_Kamigami_PreDuel.prototype.createGods = function () {


    this._leftBGGod = new Sprite();
    this._leftBGGod.bitmap = ImageManager.loadPreDuel("SideBack2");
    this.addChild(this._leftBGGod)
    this._leftBGGod.x = 262
    this._leftBGGod.opacity = 255
    this._leftBGGod.scale.x = 0;
    this._leftBGGod.anchor.x = 1
    this._rightBGGod = new Sprite();
    this._rightBGGod.bitmap = ImageManager.loadPreDuel("SideBack1");
    this.addChild(this._rightBGGod)
    this._rightBGGod.x = 1920 - 262
    this._rightBGGod.opacity = 255
    this._rightBGGod.anchor.x = 0
    this._rightBGGod.scale.x = 0;


    this.faceGod1 = new Sprite();
    this.faceGod1.bitmap = ImageManager.loadFace(this.god1);

    this.faceGod1.anchor.x = 0.5
    this.faceGod1.opacity = 255
    this.faceGod1.x = Graphics.width / 2 - 829
    this.addChild(this.faceGod1)
    this.faceGod2 = new Sprite();
    this.faceGod2.bitmap = ImageManager.loadFace(this.god2);

    this.faceGod2.opacity = 255
    this.faceGod2.x = Graphics.width / 2 + 829
    this.faceGod2.anchor.x = 0.5
    this.faceGod1.scale.x = 0
    this.faceGod2.scale.x = 0
    this.addChild(this.faceGod2)
    this.faceGod1.x += this.getCorrection(this.god1)
    this.faceGod2.x += this.getCorrection(this.god2)
};
//-----------------------------------------------------------------------------
// Function : getCorrection
//-----------------------------------------------------------------------------
Scene_Kamigami_PreDuel.prototype.getCorrection = function (godName) {
    switch (godName) {
        case "Poseidon":
            return -70
        case "Isis":
            return -90
        case "Ares":
            return -130
        case "Nymph":
            return 50
        case "Anubis":
            return 30
        case "Apophis":
            return -50
        case "Bast":
            return -90
        case "Leviathan":
            return 300
        case "Osiris":
            return 100
        case "Sphinx":
            return 100
        case "Freyja":
            return -200
        case "Heimdall":
            return 150
        case "Idun":
            return -50
        case "Skoll":
            return 150
        case "Fujin":
            return 100
        case "Inari Okami":
            return 250
        case "Kirin":
            return -200
        case "Raijin":
            return 50
        case "Uzume":
            return 100
        default:
            return 0
    }
}

//-----------------------------------------------------------------------------
// Function : createBackground
//-----------------------------------------------------------------------------
Scene_Kamigami_PreDuel.prototype.createBackground = function () {
    this._centerBG = new Sprite();
    this._centerBG.bitmap = ImageManager.loadPreDuel("CenterBack");
    this.addChild(this._centerBG)
    this._centerBG.anchor.x = this._centerBG.anchor.y = 0.5
    this._centerBG.x = 960
    this._centerBG.y = 540
    this._leftBG = new Sprite();
    this._leftBG.bitmap = ImageManager.loadPreDuel("SideBack2");
    this.addChild(this._leftBG)
    this._leftBG.x = 262
    this._leftBG.opacity = 255
    this._leftBG.scale.x = 0;
    this._leftBG.anchor.x = 1
    this._rightBG = new Sprite();
    this._rightBG.bitmap = ImageManager.loadPreDuel("SideBack1");
    this.addChild(this._rightBG)
    this._rightBG.x = 1920 - 262
    this._rightBG.opacity = 255
    this._rightBG.anchor.x = 0
    this._rightBG.scale.x = 0;
    //this._rightBG.rotation = Math.PI
};

//-----------------------------------------------------------------------------
// Function : createCamera
//-----------------------------------------------------------------------------
Scene_Kamigami_PreDuel.prototype.createCameraCards = function () {
    this.camera = new PIXI.projection.Camera3d();
    this.camera.position.set(Graphics.width / 2, Graphics.height / 2);
    this.camera.setPlanes(400, 180, 10000, false);
    this.camera.x = 960;
    this.camera.y = 540;
    this.addChild(this.camera)
    this.backCard = new SpriteGod()
    this.backCard.configureGod("Back_Card");
    this.backCard.convertTo3d()
    this.backCard.anchor.x = this.backCard.anchor.y = 0.5
    this.camera.addChild(this.backCard)
    this.backCard.y = 1080
    this.backCard.opacity = 0
};
//-----------------------------------------------------------------------------
// Function : createLines
//-----------------------------------------------------------------------------
Scene_Kamigami_PreDuel.prototype.createLines = function () {
    this._centerLine = new Sprite();
    this._centerLine.bitmap = ImageManager.loadPreDuel("linePreDuel");
    this.addChild(this._centerLine)
    this._centerLine.x = 959
    this._centerLine.y = 540
    this._centerLine.anchor.y = 0.5
    this._centerLine.opacity = 0
    this._centerLineGod1 = new Sprite();
    this._centerLineGod1.bitmap = ImageManager.loadPreDuel("linePreDuel");
    this.addChild(this._centerLineGod1)
    this._centerLineGod1.x = 959 - 700
    this._centerLineGod1.y = -1080
    this._centerLineGod1.opacity = 255
    this._centerLineGod2 = new Sprite();
    this._centerLineGod2.bitmap = ImageManager.loadPreDuel("linePreDuel");
    this.addChild(this._centerLineGod2)
    this._centerLineGod2.x = 959 + 700
    this._centerLineGod2.y = 1080
    this._centerLineGod2.opacity = 255
}
//-----------------------------------------------------------------------------
// Function : createNames
//-----------------------------------------------------------------------------
Scene_Kamigami_PreDuel.prototype.createNamesLine = function () {
    this._lineNameGod1 = new Sprite();
    this._lineNameGod1.bitmap = ImageManager.loadPreDuel("lineName");
    this.addChild(this._lineNameGod1)
    this._lineNameGod1.x = 260
    this._lineNameGod1.y = 900
    this._lineNameGod1.scale.x = 0
    this._lineNameGod2 = new Sprite();
    this._lineNameGod2.bitmap = ImageManager.loadPreDuel("lineName");
    this.addChild(this._lineNameGod2)
    this._lineNameGod2.x = 1920 - 260
    this._lineNameGod2.anchor.x = 1
    this._lineNameGod2.y = 280
    this._lineNameGod2.scale.x = 0
}
//-----------------------------------------------------------------------------
// Function : createNames
//-----------------------------------------------------------------------------
Scene_Kamigami_PreDuel.prototype.createNames = function () {
    this._godName1 = new Sprite(new Bitmap(900, 200));
    this._godName1.x = 260 - 300;
    this._godName1.y = 900 - 150;
    this._godName1.bitmap.fontSize = 120;
    //this._devotion_player1.bitmap.outlineWidth = 10;
    this._godName1.bitmap.drawText(this.god1, 0, 0, 900, 200, 'center');
    this.addChild(this._godName1);
    this._godName1.opacity = 0
    this._godName2 = new Sprite(new Bitmap(900, 200));
    this._godName2.x = 1920 - 260 + 300;
    this._godName2.anchor.x = 1
    this._godName2.y = 280 - 150;
    this._godName2.bitmap.fontSize = 120;
    //this._devotion_player1.bitmap.outlineWidth = 10;
    this._godName2.bitmap.drawText(this.god2, 0, 0, 900, 200, 'center');
    this.addChild(this._godName2);
    this._godName2.opacity = 0
}
//-----------------------------------------------------------------------------
// Function : createVersusImages
//-----------------------------------------------------------------------------
Scene_Kamigami_PreDuel.prototype.createVersusImages = function () {

    this.specialCardCamera = new PIXI.projection.Camera3d();
    this.specialCardCamera.position.set(Graphics.width / 2, Graphics.height / 2);
    this.specialCardCamera.setPlanes(400, 180, 10000, false);
    this.addChild(this.specialCardCamera);
    this.specialCardCamera.convertTo3d()
    this._versusV = new Sprite();
    this._versusV.bitmap = ImageManager.loadPreDuel("V");
    this.specialCardCamera.addChild(this._versusV)
    this._versusV.x = -50 - 600
    this._versusV.y = - 30 - 600
    this._versusV.anchor.x = this._versusV.anchor.y = 0.5
    this._versusV.convertTo3d()
    this._versusS = new Sprite();
    this._versusS.bitmap = ImageManager.loadPreDuel("S");
    this.specialCardCamera.addChild(this._versusS)
    this._versusS.anchor.x = this._versusV.anchor.y = 0.5
    this._versusS.x = 50 + 600
    this._versusS.y = 30 + 600
    this._versusS.opacity = this._versusV.opacity = 0
    this._versusS.convertTo3d()
}

//-----------------------------------------------------------------------------
// Function : createSecondBackground
//-----------------------------------------------------------------------------
Scene_Kamigami_PreDuel.prototype.createSecondBackground = function () {
    this._boardBG = new Sprite();
    this._boardBG.bitmap = ImageManager.loadKamigami("BOARD".concat($boardChoice));
    //this._boardBG.bitmap = ImageManager.loadKamigami("Board");
    this.addChild(this._boardBG)
    this._boardBG.opacity = 0
    this._bottomBG = new Sprite();
    this._bottomBG.bitmap = ImageManager.loadPreDuel("BottomBack");
    this.addChild(this._bottomBG)
    this._bottomBG.anchor.x = 0.5
    this._bottomBG.x = 960
    this._bottomBG.y = 540
    this._bottomBG.opacity = 0
    this._topBG = new Sprite();
    this._topBG.bitmap = ImageManager.loadPreDuel("BottomBack");
    this.addChild(this._topBG)
    this._topBG.anchor.x = 0.5
    this._topBG.rotation = Math.PI
    this._topBG.x = 960
    this._topBG.y = 540
    this._topBG.opacity = 0

}

//-----------------------------------------------------------------------------
// Function : update
//-----------------------------------------------------------------------------
Scene_Kamigami_PreDuel.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    if (this._backgroundSprite.opacity > 0) {
        this._backgroundSprite.opacity -= 5
        return
    }
    this.frame_count++;
    switch (this.phase) {
        case 0:
            this.moveCardToPlace()
            break
        case 1:
            this.showGods()
            break
        case 2:
            this.showNames()
            break
        case 3:
            this.versusDuel()
            break
        case 4:
            this.hideAllPreDuel()
            break
        case 5:
            this.rotateLines()
            break
        case 6:
            this.showBoard()
            break
    }
};
/////////////////////////////////////////////////////////////////////////////
///////////////////////////   PHASE 0   /////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : moveCardToPlace
//-----------------------------------------------------------------------------
Scene_Kamigami_PreDuel.prototype.moveCardToPlace = function () {
    if (this.frame_count == 40) {
        AudioManager.playSe({ name: "Battle Intro", pan: 0, pitch: 100, volume: 100 });
    }
    if (this.frame_count < 60)
        return
    if (this.backCard.y > 0) {
        this.backCard.y -= this.backCard.y / 10 + 1
        this.backCard.opacity += 5
        if (this.backCard.y <= 0) {
            this.frame_count = 50
        }
    } else if (this.backCard.euler.y < Math.PI / 2) {
        this.backCard.euler.y += 0.1
        if (this.backCard.euler.y > Math.PI / 2) {
            this.backCard.euler.y = Math.PI / 2
            this._centerLine.opacity = 255
            this.phase = 1
            this.frame_count = 0
        }
    }
}
/////////////////////////////////////////////////////////////////////////////
///////////////////////////   PHASE 1   /////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : showGods
//-----------------------------------------------------------------------------
Scene_Kamigami_PreDuel.prototype.showGods = function () {
    if (this._background1.scale.x < 1) {
        this._background1.scale.x += 0.015
        this._background2.scale.x += 0.015
        if (this._background1.scale.x > 1) {
            this._background1.scale.x = 1
            this._background2.scale.x = 1
        }
    }
    this._symbolImg.opacity += 1
    this._symbolImg.rotation += Math.max((1 - this._background1.scale.x) / 5, 0.04)
    if (this._symbolImg.rotation > Math.PI * 2) {
        this._symbolImg.rotation -= Math.PI * 2
    }
    if (this._centerLineGod1.y < 0) {
        this._centerLineGod1.y -= this._centerLineGod1.y / 10 - 1
        this._centerLineGod2.y -= this._centerLineGod2.y / 10 - 1
        if (this._centerLineGod1.y >= 0) {
            this._leftBG.opacity = this._rightBG.opacity = this.faceGod1.opacity = this.faceGod2.opacity = 255
            this._centerLineGod1.y = this._centerLineGod2.y = 0
            //this.frame_count = 0
        }
    } else if (this._leftBG.scale.x < 1) {

        if (this._background1.scale.x == 1) {
            this._leftBG.scale.x += 0.05
            this._rightBG.scale.x += 0.05

        }
        if (this._leftBG.scale.x >= 1) {
            this.faceGod1.scale.x = 1
            this.faceGod2.scale.x = 1
            this._rightBGGod.scale.x = 1;
            this._leftBGGod.scale.x = 1;
        }
    } else if (this._leftBG.x > - 200 && this.frame_count > 10) {
        this._rightBG.x += (200 + this._leftBG.x) / 30 + 3
        this._leftBG.x -= (200 + this._leftBG.x) / 30 + 3
        if (this._leftBG.x <= - 200) {
            this.phase = 2
            this.frame_count = 0
        }
    }


    if (this.frame_count < 10) {
        return
    }
    if (this._centerLine.scale.y > 0) {
        this._centerLine.scale.y -= 0.05
    }





}
/////////////////////////////////////////////////////////////////////////////
///////////////////////////   PHASE 2   /////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : showNames
//-----------------------------------------------------------------------------
Scene_Kamigami_PreDuel.prototype.showNames = function () {
    if (this._symbolImg.rotation > 0) {
        this._symbolImg.rotation += 0.03
        if (this._symbolImg.rotation > Math.PI * 3 / 2) {
            this._symbolImg.rotation = 0
        }
    }
    if (this._lineNameGod1.scale.x < 1) {
        this._lineNameGod2.scale.x += (1 - this._lineNameGod1.scale.x) / 20 + 0.01
        this._lineNameGod1.scale.x += (1 - this._lineNameGod1.scale.x) / 20 + 0.01
    } else if (this._godName1.x < 260) {
        this._godName2.x -= (260 - this._godName1.x) / 20 + 1
        this._godName1.x += (260 - this._godName1.x) / 20 + 1
        if (this._godName1.opacity < 150) {
            this._godName1.opacity += 5
            this._godName2.opacity += 5
        }
        if (this._godName1.x >= 260) {
            this.frame_count = 0
            this.phase = 3

            //this.emitter.init(this._center_sprite, true, 2);
        }
    }
}
/////////////////////////////////////////////////////////////////////////////
///////////////////////////   PHASE 3   /////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : versusDuel
//-----------------------------------------------------------------------------
Scene_Kamigami_PreDuel.prototype.versusDuel = function () {
    let count = this.frame_count
    if (count == 25) {
        //this._center_sprite.startAnimation($dataAnimations[264], false, 0)
    }
    if (this._versusV.x < - 50) {
        this._versusV.x += count
        this._versusV.y += count
        if (this._versusV.x > - 50) {
            this._versusV.x = -50
            this._versusV.y = -30

        }
    }
    this._versusV.opacity += 5
    this._versusV.euler.x = 0.1 - (this._versusV.x / -50) * 0.1
    this._versusV.euler.y = 0.1 - (this._versusV.y / -30) * 0.1
    this._versusV.scale.x = this._versusV.scale.y = (this._versusV.x / -50)

    if (count > 10) {
        count -= 10
        if (this._versusS.x > 50) {
            this._versusS.x -= count
            this._versusS.y -= count
            if (this._versusS.x < 50) {
                this._versusS.x = 50
                this._versusS.y = 30

            }
        }
        this._versusS.opacity += 5
        this._versusS.euler.x = 0.1 - (this._versusS.x / 50) * 0.1
        this._versusS.euler.y = 0.1 - (this._versusS.y / 30) * 0.1
        this._versusS.scale.x = this._versusS.scale.y = (this._versusS.x / 50)
    }

    if (this._versusS.opacity == 255) {
        this.phase = 4;
        this.frame_count = 0

    }
}
/////////////////////////////////////////////////////////////////////////////
///////////////////////////   PHASE 4   /////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : hideAllPreDuel
//-----------------------------------------------------------------------------
Scene_Kamigami_PreDuel.prototype.hideAllPreDuel = function () {
    if (this._versusS.opacity > 0) {
        this._versusV.x -= this.frame_count
        this._versusS.x += this.frame_count
        this._versusV.opacity -= 9
        this._versusS.opacity -= 9
    }

    if (this._background1.scale.x > 0) {
        if (this._lineNameGod1.rotation > - Math.PI / 2) {
            this._godName1.rotation -= -(this._lineNameGod1.rotation / 12) + 0.01
            this._godName2.rotation -= -(this._lineNameGod1.rotation / 12) + 0.01
            this._lineNameGod2.rotation -= -(this._lineNameGod1.rotation / 12) + 0.01
            this._lineNameGod1.rotation -= -(this._lineNameGod1.rotation / 12) + 0.01
        }




        this._godName2.opacity -= 7
        this._godName1.opacity -= 7
        this._lineNameGod1.opacity -= 7
        this._lineNameGod2.opacity -= 7
        this._symbolImg.opacity -= 5
        if (this._leftBGGod.scale.x > 0) {
            this._leftBGGod.scale.x -= 0.08
            this._rightBGGod.scale.x -= 0.08
            if (this._leftBGGod.scale.x < 0) {
                this._leftBGGod.scale.x = 0
                this._rightBGGod.scale.x = 0
            }
        } else if (this._background1.scale.x > 0) {
            this._background1.scale.x -= 0.03
            this._background2.scale.x -= 0.03
            if (this._background1.scale.x < 0) {
                this._background1.scale.x = 0
                this._background2.scale.x = 0
            }
        }

    } else if (this._background1.scale.x == 0) {
        this._lineNameGod1.opacity = 0
        this._lineNameGod2.opacity = 0
        this._godName2.opacity = 0
        this._godName1.opacity = 0
        this._rightBG.x -= (200 + this._leftBG.x) / 10 + 3
        this._leftBG.x += (200 + this._leftBG.x) / 10 + 3

        if (this._leftBG.x >= 0) {
            this._leftBG.x = 0
            this._rightBG.x = 1920 - 262
            this.phase = 5
            this.frame_count = 0
            this.faceGod1.opacity = 0
            this.faceGod2.opacity = 0
            this._leftBG.opacity = 0
            this._rightBG.opacity = 0
            this._centerLineGod1.anchor.y = 0.5
            this._centerLineGod1.y = 542
            this._centerLineGod2.anchor.y = 0.5
            this._centerLineGod2.y = 539
        }
    }
}
/////////////////////////////////////////////////////////////////////////////
///////////////////////////   PHASE 5   /////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : rotateLines
//-----------------------------------------------------------------------------
Scene_Kamigami_PreDuel.prototype.rotateLines = function () {
    if (this._centerLineGod1.rotation > -Math.PI / 2) {
        this._centerLineGod1.x += this.frame_count * 2
        this._centerLineGod2.x -= this.frame_count * 2
        this._centerLineGod2.rotation += (Math.PI / 2 - this._centerLineGod1.rotation) / 20 + 0.01
        this._centerLineGod1.rotation -= (Math.PI / 2 - this._centerLineGod1.rotation) / 20 + 0.01
        if (this._centerLineGod1.rotation <= -Math.PI / 2) {
            this._centerLineGod1.rotation = -Math.PI / 2
            this._centerLineGod2.rotation = Math.PI / 2
            this.phase = 6
            this._bottomBG.opacity = 255
            this._topBG.opacity = 255
            this._boardBG.opacity = 255
            this.frame_count = 0
        }
    }
}
/////////////////////////////////////////////////////////////////////////////
///////////////////////////   PHASE 6   /////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : showBoard
//-----------------------------------------------------------------------------
Scene_Kamigami_PreDuel.prototype.showBoard = function () {
    if (this.frame_count < 120) {
        this._bottomBG.y += this.frame_count
        this._topBG.y -= this.frame_count
    } else {
        if ($dataKamigami.onTutorial) {
            $dataKamigami.onTutorial = false
            SceneManager.goto(Scene_Kamigami_Tutorial);
            return;
        }
        SceneManager.goto(Scene_Kamigami_Duel);
    }
}
