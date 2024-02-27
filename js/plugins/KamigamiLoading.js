





Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
        DataManager.setupEventTest();
        SceneManager.goto(Scene_Map);
    } else if (DataManager.isTitleSkip()) {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Loading);
    } else {
        this.startNormalGame();
    }
    this.resizeScreen();
    this.updateDocumentTitle();
};

Scene_Boot.prototype.startNormalGame = function() {
    this.checkPlayerLocation();
    DataManager.setupNewGame();
    SceneManager.goto(Scene_Loading);
    Window_TitleCommand.initCommandPosition();
};
//-----------------------------------------------------------------------------
// Scene_Title
//
// The scene class of the title screen.

function Scene_Loading() {
    this.initialize.apply(this, arguments);
}

Scene_Loading.prototype = Object.create(Scene_Base.prototype);
Scene_Loading.prototype.constructor = Scene_Loading;

Scene_Loading.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    this.needsLoading++
    if (this.needsLoading == 10) {
        this.loadAllGameImages();
        this.backBar.opacity = 255;
    }
    if (this.allFiles == this.loadedFiles) {
        Graphics._switchFullScreen();
       SceneManager.goto(Scene_Title)
    }
    this.loadingBar.scale.x = this.loadedFiles / this.allFiles

}
Scene_Loading.prototype.onLoadFailure = function () { 
}

Scene_Loading.prototype.onLoadSuccess = function () { 
}
//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Loading.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    
    this.createAllImages();

    DataManager.loadGame(1)
    .then(() => this.onLoadSuccess())
    .catch(() => this.onLoadFailure());
    if (!$dataKamigami.gameOptions.music) { $dataKamigami.gameOptions.music = 100 }
    if (!$dataKamigami.gameOptions.se) { $dataKamigami.gameOptions.se = 100 }
    IAVRA.I18N.language = $dataKamigami.gameOptions.language
    
    this.createParticleEffects();
    this._text = new PIXI.Text("", { fontFamily: 'GameFont', fontSize: 30, fill: 0xffffff, align: 'right', bold: true });
    this.addChild(this._text)
    this.needsLoading = 0;
    this.loadedFiles = 0;
    this.allFiles = 1;
    this._text.x = 800
    this._text.y = 500
}

Scene_Loading.prototype.createAllImages = function () {
    this.createLogoImage();
    this.createChibiImage();
    this.createLoadingBar();
}

Scene_Loading.prototype.createLogoImage = function () {
    this.logoDS = new Sprite();
    this.logoDS.bitmap = ImageManager.loadTitle1("DSLogo")
    this.logoDS.anchor.x = this.logoDS.anchor.y = 0.5
    this.logoDS.x = 960;
    this.logoDS.y = 200;
    this.addChild(this.logoDS)
}

Scene_Loading.prototype.createChibiImage = function () {
    this.chibi = new Sprite();
    this.chibi.bitmap = ImageManager.loadExtrasKamigami("chibiTutorial")
    this.chibi.x = 300;
    this.chibi.y = 400;

    this.addChild(this.chibi)
}

Scene_Loading.prototype.createLoadingBar = function () {
    this.backBar = new Sprite(new Bitmap(600, 20));
    this.backBar.bitmap.fillAll('rgba(142, 2, 0, 255)');
    this.addChild(this.backBar)
    this.backBar.x = 800
    this.backBar.y = 540
    this.backBar.opacity = 0;
    this.loadingBar = new Sprite(new Bitmap(600, 20));
    this.loadingBar.bitmap.fillAll('cyan');
    this.addChild(this.loadingBar)
    this.loadingBar.x = this.backBar.x
    this.loadingBar.y = this.backBar.y
    this.loadingBar.scale.x = 0;
}


Scene_Loading.prototype.loadAllGameImages = function () {
    let baseUrl = true ? 'img/' : 'www/img/';
    var fs = require('fs');
    let files = fs.readdirSync(baseUrl);
    let filesImg;
    files.splice(files.indexOf("pictures"), 1)
    this.allFiles = 0;
    for (let n = 0; n < files.length; n++) {
        filesImg = fs.readdirSync(baseUrl + files[n]);
        for (let m = 0; m < filesImg.length; m++) {
            if (!(filesImg[m].contains(".png") || filesImg[m].contains(".rpgmvp"))) {
                continue;
            }
            let fileName = filesImg[m].replace(".png", "").replace(".rpgmvp", "");
            
            ImageManager.loadBitmap('img/' + files[n] + "/", fileName, false, true).addLoadListener(() => {
                this.loadedFiles++;
                this._text.text = `Loading file: ${fileName}`;
            });
            this.allFiles++;
        }
    }
}


//-----------------------------------------------------------------------------
// Function : createParticleEffects
//-----------------------------------------------------------------------------
Scene_Loading.prototype.createParticleEffects = function () {
    PIXI.loader
        //.add('fx_settings', 'js/assets/default-bundle.json')
        .add('HeadingFont', 'fonts/Grenze-SemiBold.ttf')
        .add('fx_spritesheet', 'js/assets/revoltfx-spritesheet.json')
        .add('fx_settings', 'js/assets/Light.json')
        .add('example_spritesheet', 'js/assets/rfx-examples.json')
        .load(function (loader, resources) {

            //Init the bundle
            fx.initBundle(resources.fx_settings.data);
            fx.maxParticles = $dataKamigami.gameOptions.maxParticles
            app.ticker.add(function () {
                //Update the RevoltFX instance
                fx.update();
            });

        });
};