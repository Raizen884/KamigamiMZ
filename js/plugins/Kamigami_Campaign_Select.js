
function Scene_Kamigami_CampaignSelect() {
    this.initialize.apply(this, arguments);
}

Scene_Kamigami_CampaignSelect.prototype = Object.create(Scene_Base.prototype);
Scene_Kamigami_CampaignSelect.prototype.constructor = Scene_Kamigami_CampaignSelect;

Scene_Kamigami_CampaignSelect.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    this.createVariables();
    this.createBackMap();
    this.createBackFade();
    this.createGod();
    this.createBackOptions();
    this.createButtons();
    this.createDescriptions();
    this.createSelectionButtons();
};
//-----------------------------------------------------------------------------
// Function : updates - updates process
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.createVariables = function () {
    this.index = 0;
    this.phase = 0;
    this.configHue = [0, 260, 40, 90, 310];
    this.currentHue = 0;
}
//-----------------------------------------------------------------------------
// Function : updates - updates process
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.createBackMap = function () {
    let mapList = ["GreekCampaign", "EgyptCampaign", "NorseCampaign", "JapanCampaign", "BrazilCampaign"]
    this._backMap = new Array();
    this._backMap = new Sprite();
    this._backMap.bitmap = ImageManager.loadCampaign(mapList[this.index]);
    this.addChild(this._backMap);
    this._backMap.scale.y = this._backMap.scale.x = 0.5

}

//-----------------------------------------------------------------------------
// Function : updates - updates process
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.createGod = function () {
    this._bigGod = new Sprite();
    this._bigGod.bitmap = ImageManager.loadFace("ZeusF");
    this.addChild(this._bigGod);
}

//-----------------------------------------------------------------------------
// Function : createGod
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.createBackFade = function () {
    this._backFade = new Array();
    this._backFade = new Sprite();
    this._backFade.bitmap = ImageManager.loadCampaign("frontEffect");
    this.addChild(this._backFade);
}

//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.createBackOptions = function () {
    this._buttonBack = new Array();
    this._buttonBack[0] = new Sprite();
    this._buttonBack[0].bitmap = ImageManager.loadCampaign("cancelDuel");
    this.addChild(this._buttonBack[0]);
    //this._buttonBack[0].y = 1080 - 257

    this._buttonBack[1] = new Sprite();
    this._buttonBack[1].bitmap = ImageManager.loadCampaign("chooseDuel");
    this._buttonBack[1].y = 1080 - 257

    this.addChild(this._buttonBack[1]);
    this._buttonBack[2] = new Sprite();
    this._buttonBack[2].bitmap = ImageManager.loadCampaign("campaignDesc2");

    this.addChild(this._buttonBack[2]);
    this._buttonBack[2].x = 1920 - 703

    this._buttonBack[3] = new Sprite();
    this._buttonBack[3].bitmap = ImageManager.loadCampaign("campaignDesc");

    this.addChild(this._buttonBack[3]);
    this._buttonBack[3].y = 1080 - 497
    this._buttonBack[3].x = 1920 - 703
}
//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.createButtons = function () {
    this._textReturn = new Sprite_Kami_Button(0, "selectCampaign1", 90);
    this.addChild(this._textReturn);
    //this._textReturnLight.opacity = 0
    this._textSelect = new Sprite_Kami_Button(0, "selectCampaign2", 90);
    this._textSelect.y = 1080 - 257
    //this._textSelectLight.opacity = 0
    this.addChild(this._textSelect);

    this._textReturnLight = new Sprite_Kami_ButtonLight(0, "selectCampaign1", 90, 0x19FF47);
    this.addChild(this._textReturnLight);
    this._textReturnLight.opacity = 0
    this._textSelectLight = new Sprite_Kami_ButtonLight(0, "selectCampaign2", 90, 0x19FF47);
    this._textSelectLight.y = 1080 - 257
    this._textSelectLight.opacity = 0
    this.addChild(this._textSelectLight);
}
//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.createDescriptions = function () {
    this._descriptionHeader1 = new PIXI.Text("", { fontFamily: 'GameFont', fontSize: 48, fill: 0xffffff, align: 'left'});
    this._descriptionHeader1.text = IAVRA.I18N.localize("#{DuelVocab.Campaign.preCampaignStory}")
    this.addChild(this._descriptionHeader1);
    this._descriptionHeader1.y = 20
    this._descriptionHeader1.x = 1920 - 340

    this._descriptionMythology = new PIXI.Text("", { fontFamily: 'GameFont', fontSize: 32, fill: 0xffffff, align: 'right', 
        wordWrap: true,
        wordWrapWidth: 350});
    this._descriptionMythology.text = IAVRA.I18N.localize("#{DuelVocab.Campaign.japanStory}")
    this.addChild(this._descriptionMythology);
    this._descriptionMythology.y = 100
    this._descriptionMythology.x = 1920 - 20
    this._descriptionMythology.anchor.x = 1;

    this._descriptionHeader2 = new PIXI.Text("", { fontFamily: 'GameFont', fontSize: 48, fill: 0xffffff, align: 'left'});
    this._descriptionHeader2.text = IAVRA.I18N.localize("#{DuelVocab.Campaign.preCampaignStrategy}")
    this.addChild(this._descriptionHeader2);
    this._descriptionHeader2.y = 680 - 80
    this._descriptionHeader2.x = 1920 - 340

    this._descriptionStrategy = new PIXI.Text("", { fontFamily: 'GameFont', fontSize: 32, fill: 0xffffff, align: 'right', 
        wordWrap: true,
        wordWrapWidth: 350});
    this._descriptionStrategy.text = IAVRA.I18N.localize("#{DuelVocab.Campaign.japanStrategy}")
    this.addChild(this._descriptionStrategy);
    this._descriptionStrategy.y = 680
    this._descriptionStrategy.x = 1920 - 20
    this._descriptionStrategy.anchor.x = 1;
    //this._descriptionMythology.alpha = 0
}
//-----------------------------------------------------------------------------
// Function : createSelectionButtons
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.createSelectionButtons = function () {
    this._selectButtons = new Array();
    let symbols = ["Greek", "Egypt", "Norse", "Japan", "Brazil"]
    for (let n = 0; n < 5; n++) {
        this._selectButtons[n] = new Sprite();
        this._selectButtons[n].bitmap = ImageManager.loadCampaign("selectedMito");
        this._selectButtons[n].anchor.x = 0.5;
        this._selectButtons[n].anchor.y = -2.5;
        this._selectButtons[n].x = Graphics.width/2;
        this._selectButtons[n].y = Graphics.height/2;
        this._selectButtons[n].rotation = (2 - n) * 0.85;
        this._selectButtons[n].mythoText = new PIXI.Text("", { fontFamily: 'GameFont', fontSize: 48, fill: 0xffffff, align: 'center'});
        this._selectButtons[n].mythoText.y = 420
        this._selectButtons[n].mythoText.alpha = 0.7
        this._selectButtons[n].mythoText.anchor.x = 0.5;
        this._selectButtons[n].addChild(this._selectButtons[n].mythoText)
        this._selectButtons[n].mythoText.text = IAVRA.I18N.localize(`#{DuelVocab.Campaign.mythology${n + 1}}`)
        this._selectButtons[n].mythoSymbol = new Sprite();
        this._selectButtons[n].mythoSymbol.bitmap = ImageManager.loadCampaign(symbols[n]);
        this._selectButtons[n].mythoSymbol.anchor.x = 0.5;
        this._selectButtons[n].mythoSymbol.y = 480
        this._selectButtons[n].addChild(this._selectButtons[n].mythoSymbol)
        this.addChild(this._selectButtons[n])
        this._selectButtons[n].setHue(this.configHue[n])
    }
}

//-----------------------------------------------------------------------------
// Function : updates - updates process
//-----------------------------------------------------------------------------
Scene_Kamigami_CampaignSelect.prototype.update = function () {
    switch (this.phase) {
        case 0:

            break;
        case 1:

            break;
        default:
            break;
    }
}


//