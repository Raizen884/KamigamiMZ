ImageManager.loadAfterDuel = function (filename, hue) {
    return this.loadBitmap('img/after_duel/', filename, hue, true);
};

//-----------------------------------------------------------------------------
// Function : callEndGame - Ends the Game
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.callEndGame = function (turn, boardId) {

    this.phase = 12;
    this.gameOver = true;
    if (turn == 0) {
        $matchResult = false
    } else {
        $matchResult = true
    }

}
Scene_Kamigami_Duel.prototype.checkGameOver = function () {
    if (this.gameOver && this.extra_animations.length == 0) {
        this.phase = 12
    }
}
//-----------------------------------------------------------------------------
// Function : update_opacity - updates initial opacity
//-----------------------------------------------------------------------------
Scene_Kamigami_Duel.prototype.process_end_game = function () {
    SceneManager.snapForBackground()
    SceneManager.push(Scene_Kamigami_AfterDuel)
}



function Scene_Kamigami_AfterDuel() {
    this.initialize.apply(this, arguments);
}

Scene_Kamigami_AfterDuel.prototype = Object.create(Scene_Base.prototype);
Scene_Kamigami_AfterDuel.prototype.constructor = Scene_Kamigami_AfterDuel;
//////////////////////////// MAIN START //////////////////////////////////////
//-----------------------------------------------------------------------------
// Function : initialize - initiates the graphics
//-----------------------------------------------------------------------------
Scene_Kamigami_AfterDuel.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    this.createVariables();
    this.createContainerBack();
    this.createBackground();
    this.createFakeCenterBack();
    this.createFadeScreen();

    this.createGodImage();
    this.createFakeCenter();
    this.createSecondaryFade();
    this.createOptionsBack();
    this.createOptionsLight();
    this.createOptions();
    this.createVictoryText();
    this.createStatisticsText();
    this.createRatingText();
    this.startingPositions();
    this.createStars();
    this.createGoldGain();
};
//-----------------------------------------------------------------------------
// Function : createContainerBack
//-----------------------------------------------------------------------------
Scene_Kamigami_AfterDuel.prototype.createGoldGain = function () {
    let previousScene = "Scene_Map"//SceneManager._stack[SceneManager._stack.length - 2].name
    let goldGain = 75 + 100 * $dataKamigami.difficultySetting
    if (previousScene == "Scene_Map") {
        goldGain += 100
    }
    console.log("ONLINEEEE?", $dataKamigami.isOnline)
    goldGain += $dataKamigami.duelRating * 50
    if ($dataEnemyId !== false) {
        $gameParty.gainGold(goldGain);
    } else if ($dataKamigami.isOnline && $dataKamigami.duelData[2][1] >= 4) {
        goldGain = 75 + 100 * 3
        goldGain += $dataKamigami.duelRating * 50
        $gameParty.gainGold(goldGain);
    } else {
        goldGain = 0
    }
    $dataKamigami.isOnline = false;
    this.goldGain = goldGain
    this.createGoldImages()
}
//-----------------------------------------------------------------------------
// Function : createGoldImages
//-----------------------------------------------------------------------------
Scene_Kamigami_AfterDuel.prototype.createGoldImages = function () {
    this.goldBack = new Sprite()
    this.goldBack.bitmap = ImageManager.loadExtrasKamigami("resignBox")
    this.goldBack.anchor.x = this.goldBack.anchor.y = 0.5
    this.goldBack.x = Graphics.width / 2
    this.goldBack.y = Graphics.height / 2
    this.addChild(this.goldBack)
    this.goldBack.scale.y = 0
    this.goldCoin = new Sprite()
    this.goldCoin.bitmap = ImageManager.loadIgnisShop("coin")
    this.goldCoin.x = 850 - Graphics.width / 2
    this.goldCoin.y = 470 - Graphics.height / 2
    this.goldBack.addChild(this.goldCoin)

    let text = IAVRA.I18N.localize("#{DuelVocab.MenuText.afterDuel01}")
    this.textGold = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 72, fill: 0xffffff, align: 'left', width: 600 });
    this.textGold.x = - this.textGold.width / 2
    this.textGold.y = 390 - Graphics.height / 2
    this.textGold.alpha = 0.7
    this.goldBack.addChild(this.textGold)

    text = "x " + this.goldGain
    this.textQty = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 60, fill: 0xffffff, align: 'left', width: 600 });
    this.textQty.y = 490 - Graphics.height / 2
    this.textQty.alpha = 0.7
    this.goldBack.addChild(this.textQty)

    if ($dataEnemyId !== false && $dataKamigami.duelInfo[$dataEnemyId].enabled == false) {
        $dataKamigami.duelInfo[$dataEnemyId].enabled = true;
        text = $dataKamigami.duelInfo[$dataEnemyId].name + " " + IAVRA.I18N.localize("#{DuelVocab.MenuText.afterDuel02}")
        this.textDueler = new PIXI.Text(text, { fontFamily: 'Chau Philomene One', fontSize: 60, fill: 0xffffff, align: 'left', width: 600 });
        this.textDueler.y = 580 - Graphics.height / 2
        this.textDueler.x -= this.textDueler.width / 2
        this.textDueler.alpha = 0.7
        this.goldBack.addChild(this.textDueler)
        if (greenworks && $matchResult)
            greenworks.activateAchievement($dataKamigami.duelInfo[$dataEnemyId].name, function greeting(name) {
            })
    }
}

//-----------------------------------------------------------------------------
// Function : createContainerBack
//-----------------------------------------------------------------------------
Scene_Kamigami_AfterDuel.prototype.createContainerBack = function () {
    this.containerBack = new PIXI.Container();
    this.addChild(this.containerBack);
    this._displacementBack = new Sprite();
    this._displacementBack.bitmap = ImageManager.loadDisplacement("map7");
    this._displacementBack.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this._displacementBack.scale.set(2);
    this._displacementBack.anchor.set(0.5);
    this.containerBack.addChild(this._displacementBack);
    this.displacementFilterBack = new PIXI.filters.DisplacementFilter(this._displacementBack);
    this.containerBack.filters = [this.displacementFilterBack];
    this.displacementFilterBack.scale.x = 0;
    this.displacementFilterBack.scale.y = 0;
    this.tlBack = new TimelineMax({ paused: true });
    this.tlBack.to(this.displacementFilterBack.scale, 8, { x: 0, y: -10000, ease: Expo.easeInOut });
    //this.tl.to(this.camera, 0, { autoAlpha: 1, ease: Expo.easeInOut }, "+=1");
    this.tlBack.timeScale(5)

};
Scene_Kamigami_AfterDuel.prototype.calculateRating = function () {
    let rating = 0
    rating -= $dataKamigami.duelData[2][1] * 10 //Number of turns
    if ($dataKamigami.duelData[2][1] < 6) {
        rating -= (6 - $dataKamigami.duelData[2][1]) * 20
    }
    rating += ($dataKamigami.duelData[3][1] - $dataKamigami.duelData[4][1])
    rating += $dataKamigami.duelData[8][1] * 10
    rating += ($dataKamigami.duelData[9][1] - $dataKamigami.duelData[10][1]) * 10
    rating += $dataKamigami.duelData[0][1] - $dataKamigami.duelData[1][1]
    if (rating < -100) {
        rating = 0
    } else if (rating < 0) {
        rating = 1
    } else if (rating < 100) {
        rating = 2
    } else if (rating < 300) {
        rating = 3
    } else if (rating < 500) {
        rating = 4
    } else {
        rating = 5
    }
    $dataKamigami.duelRating = rating
    return rating
}

Scene_Kamigami_AfterDuel.prototype.createStars = function () {
    this.rating = this.calculateRating()
    this._starRatings = new Array(5)
    for (let n = 0; n < this._starRatings.length; n++) {
        this._starRatings[n] = new Sprite();
        this._starRatings[n].anchor.x = this._starRatings[n].anchor.y = 0.5
        if (n < this.rating) {
            this._starRatings[n].bitmap = ImageManager.loadAfterDuel("starRank")
        } else {
            this._starRatings[n].bitmap = ImageManager.loadAfterDuel("starShadow")
        }
        this._starRatings[n].y = 200
        this._starRatings[n].x = Graphics.width / 2 + (n - 2) * 80
        this.containerBack.addChild(this._starRatings[n])
        this._starRatings[n].opacity = 0
        this._starRatings[n].scale.y = 2
        this._starRatings[n].scale.x = 2
    }
}


Scene_Kamigami_AfterDuel.prototype.createRatingText = function () {
    let ratingText = IAVRA.I18N.localize("#{DuelVocab.MenuOptions.afterDuelRating}")
    this._ratingText = new PIXI.Text(ratingText, {
        fontFamily: 'GameFont', fontSize: 140, fill: 0x00FF21, align: 'left',
        dropShadow: true,
        dropShadowAngle: 0,
        dropShadowBlur: 13,
        dropShadowColor: 0x008621,
        dropShadowDistance: 0
    });
    this.containerBack.addChild(this._ratingText)
    this._ratingText.anchor.x = 0.5
    this._ratingText.x = Graphics.width / 2
    this._ratingText.y = 30
    this._ratingText.alpha = 0;
}


Scene_Kamigami_AfterDuel.prototype.createFakeCenterBack = function () {
    this._centerSpriteBack = new Sprite_Card();
    this._centerSpriteBack.bitmap = ImageManager.loadTitle1("center_effects");
    this.containerBack.addChild(this._centerSpriteBack);
    this._centerSpriteBack.x = Graphics.width / 2;
    this._centerSpriteBack.y = Graphics.height / 2
};
Scene_Kamigami_AfterDuel.prototype.createFakeCenter = function () {
    this._centerSprite = new Sprite_Card();
    this._centerSprite.bitmap = ImageManager.loadTitle1("center_effects");
    this.containerBack.addChild(this._centerSprite);
    this._centerSprite.x = Graphics.width / 2;
    this._centerSprite.y = Graphics.height;
};

Scene_Kamigami_AfterDuel.prototype.createVariables = function () {
    this.phase = 0;
    this.countFrames = 0;
    this.closedGold = false;
};
Scene_Kamigami_AfterDuel.prototype.startingPositions = function () {
    this._backOptions[0].x -= 800
    this._backOptions[1].x += 800
    this._backOptions[2].x -= 800
    this._backOptions[3].x += 800
    for (let n = 0; n < 4; n++) {
        this._backOptionsText[n].opacity = 0
    }
    this._statiscsBackground.opacity = 0
    this._statistics.opacity = 0
    this._statistics.scale.y = 0
    this._victoryText.opacity = 0;
    this._fadeScreenSprite.opacity = 0
}


Scene_Kamigami_AfterDuel.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    this.containerBack.addChild(this._backgroundSprite);
};
Scene_Kamigami_AfterDuel.prototype.createFadeScreen = function () {
    this._fadeScreenSprite2 = new Sprite();
    this._fadeScreenSprite2.bitmap = ImageManager.loadKamigami("shop_fade");
    this.containerBack.addChild(this._fadeScreenSprite2);
    this._fadeScreenSprite2.opacity = 0


    this._fadeScreenSprite = new Sprite();
    this._fadeScreenSprite.bitmap = ImageManager.loadAfterDuel("whiteFade");
    this.containerBack.addChild(this._fadeScreenSprite);
    this._fadeScreenSprite.opacity = 200
}
Scene_Kamigami_AfterDuel.prototype.createGodImage = function () {
    this.container = new PIXI.Container();
    this.containerBack.addChild(this.container);
    this._displacement = new Sprite();
    this._displacement.bitmap = ImageManager.loadDisplacement("map8");
    this._displacement.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this._displacement.scale.set(1.5);
    this._displacement.anchor.set(0.5);
    this.container.addChild(this._displacement);
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this._displacement);
    this.container.filters = [this.displacementFilter];
    this.displacementFilter.scale.x = 0;
    this.displacementFilter.scale.y = 0;
    this.tl = new TimelineMax({ paused: true });
    this.tl.to(this.displacementFilter.scale, 8, { x: 0, y: 3000, ease: Expo.easeInOut });
    this.tl.gotoAndStop(100)
    this.tl.timeScale(4)
    //this.tl.play()

    let deck = $dataKamigami.chosenDeck;
    let god
    if ($matchResult)
        god = $dataKamigami.decks[deck][1][40]
    else
        god = $dataKamigami.enemy_tt_cards[40]
    let godName = Game_Kamigami.convertedCardList[god].name + "F"
    this._bigGod = new Sprite();
    this._bigGod.bitmap = ImageManager.loadFace(godName);
    this.container.addChild(this._bigGod);
    this._bigGod.scale.x = this._bigGod.scale.y = 0.9
    this._bigGod.anchor.x = 0.5
    this._bigGod.anchor.y = 1
    this._bigGod.y = Graphics.height
    this._bigGod.x = Graphics.width / 2
}
Scene_Kamigami_AfterDuel.prototype.createSecondaryFade = function () {
    this._statiscsBackground = new Sprite();
    this._statiscsBackground.bitmap = ImageManager.loadAfterDuel("statisticsBackground");
    this.containerBack.addChild(this._statiscsBackground);
}

Scene_Kamigami_AfterDuel.prototype.createOptionsBack = function () {
    this._backOptions = new Array(4)
    let options = ["proceedBack", "statisticsBack", "rollUpBack", "rollDownBack"]
    for (let index = 0; index < this._backOptions.length; index++) {
        this._backOptions[index] = new Sprite();
        this._backOptions[index].bitmap = ImageManager.loadAfterDuel(options[index])
        this.containerBack.addChild(this._backOptions[index])
        this._backOptions[index].x = index % 2 == 0 ? 0 : Graphics.width - 704
        this._backOptions[index].y = Math.floor(index / 2) == 0 ? 0 : Graphics.height - 260
    }
}

Scene_Kamigami_AfterDuel.prototype.createOptions = function () {
    this._backOptionsText = new Array(4)
    for (let index = 0; index < this._backOptionsText.length; index++) {
        let displacement = index % 2 == 0 ? 70 : -120
        this._backOptionsText[index] = new Sprite_Kami_Button(index % 2, `afterDuelMenu${index + 1}`, displacement);
        this.containerBack.addChild(this._backOptionsText[index])
        this._backOptionsText[index].x = index % 2 == 0 ? 0 : Graphics.width - 430
        this._backOptionsText[index].y = Math.floor(index / 2) == 0 ? 0 : Graphics.height - 250
    }
}
Scene_Kamigami_AfterDuel.prototype.createOptionsLight = function () {
    this._backOptionsLight = new Array(4)
    for (let index = 0; index < this._backOptionsLight.length; index++) {
        let displacement = index % 2 == 0 ? 70 : -120
        this._backOptionsLight[index] = new Sprite_Kami_ButtonLight(index % 2, `afterDuelMenu${index + 1}`, displacement, 0xFF9035);
        this.containerBack.addChild(this._backOptionsLight[index])
        this._backOptionsLight[index].x = index % 2 == 0 ? 0 : Graphics.width - 430
        this._backOptionsLight[index].y = Math.floor(index / 2) == 0 ? 0 : Graphics.height - 250
        this._backOptionsLight[index].opacity = 0;
    }
}
Scene_Kamigami_AfterDuel.prototype.createVictoryText = function () {
    this._victoryText = new Sprite();
    let resultText = IAVRA.I18N.localize("#{DuelVocab.MenuOptions.afterDuelRating}")
    let resultTextPIXI
    if ($matchResult) {
        this._victoryText.bitmap = ImageManager.loadAfterDuel("victoryText")
        resultText = IAVRA.I18N.localize("#{DuelVocab.MenuOptions.afterDuelVictory}")
        resultTextPIXI = new PIXI.Text(resultText, {
            fontFamily: 'GameFont', fontSize: 140, fill: 0xFFFCDD, align: 'left',
            dropShadow: true,
            dropShadowAngle: 0,
            dropShadowBlur: 13,
            dropShadowColor: 0x98940C,
            dropShadowDistance: 0
        });
    }

    else {
        this._victoryText.bitmap = ImageManager.loadAfterDuel("defeatText")
        ratingText = IAVRA.I18N.localize("#{DuelVocab.MenuOptions.afterDuelDefeat}")
        resultTextPIXI = new PIXI.Text(ratingText, {
            fontFamily: 'GameFont', fontSize: 140, fill: 0xDF89FF, align: 'left',
            dropShadow: true,
            dropShadowAngle: 0,
            dropShadowBlur: 13,
            dropShadowColor: 0xBA00FF,
            dropShadowDistance: 0
        });

    }
    resultTextPIXI.anchor.x = 0.5
    resultTextPIXI.y = 80
    resultTextPIXI.x = -5
    this._victoryText.addChild(resultTextPIXI)
    this.containerBack.addChild(this._victoryText)
    this._victoryText.anchor.x = 0.5
    this._victoryText.x = Graphics.width / 2
}
Scene_Kamigami_AfterDuel.prototype.createStatisticsText = function () {
    this._statistics = new Sprite_DuelStatistics();
    this.addChild(this._statistics)
    this._statistics.anchor.x = 0.5
    this._statistics.y = 300

}


Scene_Kamigami_AfterDuel.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    this.countFrames++;
    switch (this.phase) {
        case 0:
            this.updateEntry();
            break;
        case 1:
            this.updateGoldEntry();
            break
        case 2:
            this.updateMain();
            break;
        case 3:
            this.updateEntryStatistics();
            break;
        case 4:
            this.updateStatistics();
            break;
        case 5:
            this.updateChoice();
            break;
        case 6:

            if (this._statistics.scale.y > 0) {
                this._statistics.scale.y -= 0.05
                if (this._statistics.scale.y < 0) {
                    this._statistics.scale.y = 0
                }
            }

            if (this.countFrames > 120) {
                SceneManager.pop();
                handleAfterMatch($matchResult)
            }
        default:
            break;
    }
};

Scene_Kamigami_AfterDuel.prototype.updateEntry = function () {
    if (this.countFrames < 30) {
        this._fadeScreenSprite2.opacity += 10
        this._fadeScreenSprite.opacity += 10
    }

    if (this.countFrames > 60 && this._fadeScreenSprite2.opacity > 190) {
        this._fadeScreenSprite2.opacity -= 2
        this._fadeScreenSprite.opacity -= 15
    }
    if (this.countFrames == 1) {
        this.tl.reverse();
    }
    if (this.countFrames == 60) {
        AudioManager.playMe({ name: "Victory", pan: 0, pitch: 100, volume: 100 });
        let bgmName = Math.max(this.rating, 1) + "_Stars"
        AudioManager.playBgm({ name: bgmName, pan: 0, pitch: 100, volume: 100 });
        //this.emitter = fx.getParticleEmitter('fairy-dust');
        //this.emitter.init(this._centerSpriteBack, true, 1);
    }
    if (this.countFrames == 90) {
        this.emitter2 = fx.getParticleEmitter('EndGameText2');
        this.emitter2.init(this._centerSprite, true, 3);
    }

    if (this.countFrames > 60 && this._backOptions[0].x < 0) {
        let dist = (this._backOptions[0].x * -1) / 20 + 1
        this._backOptions[0].x += dist
        this._backOptions[1].x -= dist
        if (this._backOptions[0].x > 0) {
            this._backOptions[0].x = 0
            this._backOptions[1].x = Graphics.width - 704
        }
    }
    if (this.countFrames > 80) {
        this._victoryText.opacity += 20
        if (this._backOptionsText[0].opacity < 180) {
            this._backOptionsText[0].opacity += 5
            this._backOptionsText[1].opacity += 5
        }

    }
    if (this.countFrames == 110) {
        this.phase = 1;
    }
}
Scene_Kamigami_AfterDuel.prototype.updateGoldEntry = function () {
    if (!$matchResult) {
        this.phase = 2;
        return
    }
    if (this.goldBack.scale.y < 1 && !this.closedGold) {
        this.goldBack.scale.y += 0.05
        if (this.goldBack.scale.y > 1) {
            this.goldBack.scale.y = 1
        }
        return;
    }
    if (this.closedGold) {
        if (this.goldBack.scale.y > 0) {
            this.goldBack.scale.y -= 0.05
            if (this.goldBack.scale.y < 0) {
                this.goldBack.scale.y = 0
            }
            if (this.goldBack.scale.y == 0) {
                this.phase = 2;
            }
            return;
        }
    }
    if (TouchInput.isTriggered()) {
        this.closedGold = true
    }

}

Scene_Kamigami_AfterDuel.prototype.updateMain = function () {
    let btnHover = -1
    for (let n = 0; n < 2; n++) {
        if (this._backOptionsText[n].isBeingTouched()) {
            btnHover = n
            this._backOptionsLight[n].opacity += 20
        } else {
            this._backOptionsLight[n].opacity -= 20
        }
    }
    if (TouchInput.isTriggered()) {
        if (btnHover != -1)
            this.processChoise(btnHover);
        else {
            this.processChoise(0);
        }

    }

}


Scene_Kamigami_AfterDuel.prototype.updateStatistics = function () {
    let btnHover = -1
    for (let n = 0; n < 4; n++) {
        if (this._backOptionsText[n].isBeingTouched()) {
            if (n == 1) {
                continue
            }
            btnHover = n
            this._backOptionsLight[n].opacity += 20
        } else {
            this._backOptionsLight[n].opacity -= 20
        }
    }
    if (TouchInput.isTriggered()) {
        if (btnHover != -1)
            this.processChoise(btnHover);
        else {
            this.processChoise(0);
        }
    }
}

Scene_Kamigami_AfterDuel.prototype.processChoise = function (btnHover) {
    this.phase = 5;
    this.choice = btnHover
    this.countFrames = 0;
}

Scene_Kamigami_AfterDuel.prototype.updateChoice = function () {
    for (let n = 0; n < 4; n++) {
        if (n != this.choice) {
            this._backOptionsLight[n].opacity -= 20;
        } else {
            this._backOptionsLight[n].opacity = (5 - this.countFrames % 11) * 50
        }
    }
    if (this.countFrames > 20) {
        switch (this.choice) {
            case 2:
                this.countFrames = 0
                this._statistics.rotateInformation(1)
                this.phase = 4
                break;
            case 3:
                this.countFrames = 0
                this._statistics.rotateInformation(-1)
                this.phase = 4
                break;
        }

    }
    if (this.countFrames > 100) {
        switch (this.choice) {
            case 0:
                this.countFrames = 0
                this.tlBack.play()
                fx.stopAllEffects()
                this.phase = 6;
                break;
            case 1:
                this.countFrames = 0
                this.phase = 3
                break;

            default:
                break;
        }

    }
}

Scene_Kamigami_AfterDuel.prototype.updateEntryStatistics = function () {
    this.updateStarEntry();
    this._backOptionsText[1].opacity -= 10
    this._statiscsBackground.opacity += 10
    if (this._backOptionsText[1].opacity == 0) {
        this._backOptionsText[1].x = 1920
    }
    this._statistics.opacity += 10
    this._victoryText.opacity -= 10
    if (this._ratingText.alpha < 1)
        this._ratingText.alpha += 0.05
    this.ratin
    if (this._statistics.scale.y < 1) {
        this._statistics.scale.y += 0.02
        if (this._statistics.scale.y > 1) {
            this._statistics.scale.y = 1
        }
    }

    if (this.countFrames < 11) {
        for (let n = 0; n < 2; n++) {
            this._backOptionsLight[n].opacity -= 25
        }
    } else if (this._backOptions[2].x < 0) {
        let dist = (this._backOptions[2].x * -1) / 20 + 1
        this._backOptions[1].x += dist
        this._backOptions[2].x += dist
        this._backOptions[3].x -= dist
        if (this._backOptions[2].x > 0) {
            this._backOptions[2].x = 0
            this._backOptions[3].x = Graphics.width - 704
        }
    }
    if (this.countFrames > 20) {
        if (this._backOptionsText[2].opacity < 180) {
            this._backOptionsText[2].opacity += 5
            this._backOptionsText[3].opacity += 5
        }

    }
}
Scene_Kamigami_AfterDuel.prototype.updateStarEntry = function () {
    for (let n = 0; n < 5; n++) {
        if (this.countFrames > n * 20)
            this._starRatings[n].opacity += 10
        if (this._starRatings[n].opacity > 0 && this._starRatings[n].scale.x > 1) {
            this._starRatings[n].scale.x -= 0.05
            this._starRatings[n].scale.y -= 0.05
            if (this._starRatings[n].scale.x < 1) {
                this._starRatings[n].scale.x = 1
                this._starRatings[n].scale.y = 1
            }

        }
    }
    if (this._starRatings[4].scale.x == 1) {
        this.phase = 4;
    }
}





//-----------------------------------------------------------------------------
// SpriteDeckFriendList
//
// The sprite for displaying the friends list.

function Sprite_DuelStatistics() {
    this.initialize.apply(this, arguments);
}

Sprite_DuelStatistics.prototype = Object.create(Sprite.prototype);
Sprite_DuelStatistics.prototype.constructor = Sprite_DuelStatistics;

//-----------------------------------------------------------------------------
// Function : initialize - initiates the graphics
//-----------------------------------------------------------------------------
Sprite_DuelStatistics.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this.count = 0
    this.createStatisticsList();
}
//-----------------------------------------------------------------------------
// Function : createMask
//-----------------------------------------------------------------------------
Sprite_DuelStatistics.prototype.createMask = function () {
    this.mask = new PIXI.Graphics();
    this.mask.beginFill();
    this.mask.x = 50
    this.mask.y = 320;
    //this.maskInside.anchor.x = this.maskInside.anchor.y = 0.5;
    this.mask.drawRect(0, 0, 600, 462);
    this.mask.endFill();
};
//-----------------------------------------------------------------------------
// Function : createStatisticsList - creates statisticsList
//-----------------------------------------------------------------------------
Sprite_DuelStatistics.prototype.createStatisticsList = function () {
    this.statisticsText = new Array();
    this.statisticsData = new Array();
    this.textLines = new Array();
    $dataKamigami.duelData.forEach(element => {
        let n = this.statisticsText.length
        let elementName = IAVRA.I18N.localize(`#{DuelVocab.MenuText.afterDuelStat${n + 1}}`)
        this.statisticsText[n] = new PIXI.Text(elementName, { fontFamily: 'Chau Philomene One', fontSize: 48, fill: 0xffffff, align: 'left', width: 600 });
        this.statisticsData[n] = new PIXI.Text(element[1], { fontFamily: 'Chau Philomene One', fontSize: 48, fill: 0xFFC97A, align: 'right' });
        this.textLines[n] = new Sprite();
        this.textLines[n].bitmap = ImageManager.loadAfterDuel("textLine")
        this.addChild(this.statisticsData[n])
        this.addChild(this.statisticsText[n])
        this.addChild(this.textLines[n])

        this.statisticsData[n].anchor.x = 1
        this.statisticsText[n].y = n * 60
        this.statisticsText[n].x = 500
        this.statisticsText[n].alpha = 0
        this.statisticsData[n].y = n * 60
        this.statisticsData[n].x = 1400
        this.statisticsData[n].alpha = 0
        this.textLines[n].x = 500
        this.textLines[n].y = n * 60 + 350
        this.textLines[n].opacity = 0

    });
};
//-----------------------------------------------------------------------------
// Function : rotateInformation
//-----------------------------------------------------------------------------
Sprite_DuelStatistics.prototype.rotateInformation = function (direction) {
    if (direction > 0) {
        rotateArray1(this.statisticsText, 1)
        rotateArray1(this.statisticsData, 1)
        rotateArray1(this.textLines, 1)
    } else {
        rotateArrayReverse(this.statisticsText, 1)
        rotateArrayReverse(this.statisticsData, 1)
        rotateArrayReverse(this.textLines, 1)
    }
}
//-----------------------------------------------------------------------------
// Function : update
//-----------------------------------------------------------------------------
Sprite_DuelStatistics.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this.updateOptions(this.statisticsText, 0);
    this.updateOptions(this.statisticsData, 0);
    this.updateOptions(this.textLines, 50);
}
//-----------------------------------------------------------------------------
// Function : updateOptions
//-----------------------------------------------------------------------------
Sprite_DuelStatistics.prototype.updateOptions = function (array, y) {
    let size = array.length
    for (let n = 0; n < size; n++) {
        if (n < 3) {
            array[n].alpha = Math.min(1, array[n].alpha + 0.03)

        }
        else {
            let calc = 1 - n / (size - 3)
            array[n].alpha = Math.min(calc, array[n].alpha + 0.03)
        }
        if (array[n].y < n * 60 + y) {
            array[n].y += 3
        } else if (array[n].y > n * 60 + y) {
            array[n].y -= 3
        }
        if (n == size - 1) {
            array[n].y = n * 60 + y
        } else if (n == 0 && array[n].y > 300) {
            array[n].y = y
        }
    }
}


// ERASE
var $matchResult = false