//-----------------------------------------------------------------------------
// Sprite_Cards
//
// The sprite for displaying a card in triple triad.

function Sprite_Card() {
    this.initialize.apply(this, arguments);
}

Sprite_Card.prototype = Object.create(Sprite.prototype);
Sprite_Card.prototype.constructor = Sprite_Card;

Sprite_Card.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this._touching = false;
    this._coldFrame = null;
    this._hotFrame = null;
    this._clickHandler = null;
    this._lastAnimation = null;
};

Sprite_Card.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this.updateFrame();
    this.processTouch();
};

Sprite_Card.prototype.startAnimation = function (animation, mirror, delay, rate = 2) {
    SceneManager._scene._spriteset.createAnimationSprite([this], animation, mirror, delay, rate)
    //
};

Sprite_Card.prototype.startAnimationMZ = function (animation, mirror, delay, rate = 2) {
    this._lastAnimation = new Sprite_Animation();
    this._lastAnimation.setup(this._effectTarget, animation, mirror, delay, rate);
    this.parent.addChild(this._lastAnimation);
    this._lastAnimation.y = 70;
    this._animationSprites.push(this._lastAnimation);
};
Sprite_Animation.prototype.setupMV = function (target, animation, mirror, delay, rate = 2) {
    this._target = target;
    this._animation = animation;
    this._mirror = mirror;
    this._delay = delay;
    if (this._animation) {
        this.remove();
        this.setSpecificRate(rate);
        this.setupDuration();
        this.loadBitmaps();
        this.createSprites();
    }
};
Sprite_Animation.prototype.setup = function(
    targets, animation, mirror, delay, previous
) {
    this._targets = targets;
    this._animation = animation;
    this._mirror = mirror;
    this._delay = delay;
    this._previous = previous;
    this._effect = EffectManager.load(animation.effectName);
    this._playing = true;
    const timings = animation.soundTimings.concat(animation.flashTimings);
    for (const timing of timings) {
        if (timing.frame > this._maxTimingFrames) {
            this._maxTimingFrames = timing.frame;
        }
    }
};

Sprite_Card.prototype.startAnimation3d = function (animation, mirror, delay, rate = 2) {
    var sprite = new Sprite_Animation();

    sprite.setup(this._effectTarget, animation, mirror, delay, rate);
    this.parent.parent.addChild(sprite);
    sprite.y = 70;
    this._animationSprites.push(sprite);
};

Sprite_Card.prototype.updateFrame = function () {
    var frame;
    if (this._touching) {
        frame = this._hotFrame;
    } else {
        frame = this._coldFrame;
    }
    if (frame) {
        this.setFrame(frame.x, frame.y, frame.width, frame.height);
    }
};

Sprite_Card.prototype.setColdFrame = function (x, y, width, height) {
    this._coldFrame = new Rectangle(x, y, width, height);
};

Sprite_Card.prototype.setHotFrame = function (x, y, width, height) {
    this._hotFrame = new Rectangle(x, y, width, height);
};

Sprite_Card.prototype.setClickHandler = function (method) {
    this._clickHandler = method;
};

Sprite_Card.prototype.callClickHandler = function () {
    if (this._clickHandler) {
        this._clickHandler();
    }
};

Sprite_Card.prototype.processTouch = function () {
    if (this.isActive()) {
        if (TouchInput.isTriggered() && this.isBeingTouched()) {
            this._touching = true;
        }
        if (this._touching) {
            if (TouchInput.isReleased() || !this.isBeingTouched()) {
                this._touching = false;
                if (TouchInput.isReleased()) {
                    this.callClickHandler();
                }
            }
        }
    } else {
        this._touching = false;
    }
};

Sprite_Card.prototype.processMiniTouch = function () {
    if (this.isActive()) {
        if (TouchInput.isTriggered() && this.isMiniButtonTouched()) {
            return true;
        }
        if (this._touching) {
            if (TouchInput.isReleased() || !this.isMiniButtonTouched()) {
                return false;
            }
        }
    } else {
        return false;
    }
};

Sprite_Card.prototype.isMiniButtonTouched = function () {
    var x = this.canvasToLocalX(TouchInput.x + parseInt((this.width / 2) * this.scale.x));
    var y = this.canvasToLocalY(TouchInput.y + parseInt((this.height / 2) * this.scale.y));
    return x >= 0 && y >= 0 && x < this.width * this.scale.x && y < this.height * this.scale.y;

};

Sprite_Card.prototype.is3dMiniButtonTouched = function () {
    var x = this.canvasToLocalX(TouchInput.x + parseInt((this.width / 2) * this.scale3d.x));
    var y = this.canvasToLocalY(TouchInput.y + parseInt((this.height / 2) * this.scale3d.y));
    return x >= 0 && y >= 0 && x < this.width * this.scale3d.x && y < this.height * this.scale3d.y;

};


Sprite_Card.prototype.isTriggered = function () {
    if (TouchInput.isTriggered() && this.isBeingTouched())
        return true;
};

Sprite_Card.prototype.isActive = function () {
    var node = this;
    while (node) {
        if (!node.visible) {
            return false;
        }
        node = node.parent;
    }
    return true;
};

Sprite_Card.prototype.isBeingTouched = function () {
    var x = this.canvasToLocalX(TouchInput.x + this.width / 2);
    var y = this.canvasToLocalY(TouchInput.y + this.height / 2);
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

Sprite_Card.prototype.isBeingTouchedOffset = function (offsetX = 0, offsetY = 0) {
    var x = this.canvasToLocalX(TouchInput.x + this.width / 2 + this.width * offsetX);
    var y = this.canvasToLocalY(TouchInput.y + this.height / 2 + this.height * offsetY);
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

Sprite_Card.prototype.isPixelTouched = function () {
    const touchPos = new Point(TouchInput.x, TouchInput.y);
        const localPos = this.worldTransform.applyInverse(touchPos);
    return this.bitmap.getAlphaPixel(localPos.x, localPos.y) != 0
}

Sprite_Card.prototype.canvasToLocalX = function (x) {
    var node = this;
    while (node) {
        x -= node.x;
        node = node.parent;
    }
    return x;
};

Sprite_Card.prototype.canvasToLocalY = function (y) {
    var node = this;
    while (node) {
        y -= node.y;
        node = node.parent;
    }
    return y;
};

function shuffle(array) {
    if (SceneManager._scene instanceof Scene_Kamigami_Duel_Online) {
        for (let i = array.length - 1; i >= 0; i--) {
            array[i] = SceneManager._scene.serverDeck[i]
        }
        return;
    }
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


TouchInput._onMouseMove = function (event) {
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    this._onMove(x, y);
    this.hover_x = x;
    this.hover_y = y;
};

Sprite_Card.prototype.isButtonHovered = function () {
    var x = this.canvasToLocalX(TouchInput.hover_x + parseInt(this.width / 4));
    var y = this.canvasToLocalY(TouchInput.hover_y + parseInt(this.height / 4));
    return x >= 0 && y >= 0 && x < this.width / 2 && y < this.height / 2;
};

Sprite_Card.prototype.isFullButtonHovered = function () {
    var x = this.canvasToLocalX(TouchInput.hover_x + parseInt(this.width / 2));
    var y = this.canvasToLocalY(TouchInput.hover_y + parseInt(this.height / 2));
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

Sprite_Clickable.prototype.isButtonHovered = function () {
    //var x = this.canvasToLocalX(TouchInput.hover_x);
    //var y = this.canvasToLocalY(TouchInput.hover_y);
    //return x >= 0 && y >= 0 && x < this.width && y < this.height;
    return false;
};


//-----------------------------------------------------------------------------
// Triple Triad Image Handler
//
// The scene class of the battle screen.

ImageManager.loadKamigami = function (filename, hue) {
    return this.loadBitmap('img/kamigami/', filename, hue, true);
};

//-----------------------------------------------------------------------------
// Triple Triad Image Handler
//
// The scene class of the battle screen.

ImageManager.loadDisplacement = function (filename, hue) {
    return this.loadBitmap('img/displacement/', filename, hue, true);
};

Scene_Base.prototype.sumArray = function (array) {
    var sum = 0;
    for (var n = 0; n < array.length; n++) {
        sum += array[n];
    }
    return sum;
};
const INF = 1e+100;
let tmpChanged = [], tmpOld = [];
let tmpArrivalCounter = 0;

function awesomeCompare(a, b) {
    if (a.zOrder > b.zOrder) return 1;
    if (a.zOrder < b.zOrder) return -1;
    if (a.arrivalOrder > b.arrivalOrder) return 1;
    if (a.arrivalOrder < b.arrivalOrder) return -1;
    return 0;
}

class SContainer extends PIXI.Container {
    ChangeChildZ(child, zOrder) {
        child.zOrder = zOrder || 0;

        // assign those vars whenever new element joins

        child.oldZOrder = INF;
        child.arrivalOrder = ++tmpArrivalCounter;
    }

    addChildZ(child, zOrder) {
        child.zOrder = zOrder || 0;

        // assign those vars whenever new element joins

        child.oldZOrder = INF;
        child.arrivalOrder = ++tmpArrivalCounter;

        super.addChild(child);
    }

    // you can call it every tick - its not heavy

    sortChildren() {
        const children = this.children;

        let len = children.length;
        for (let i = 0; i < len; i++) {
            const elem = children[i];

            if (elem.zOrder !== elem.oldZOrder) {
                tmpChanged.push(elem);
            } else {
                tmpOld.push(elem);
            }
            elem.oldZOrder = elem.zOrder;
        }

        if (tmpChanged.length === 0) {
            tmpOld.length = 0;
            return;
        }
        if (tmpChanged.length > 1) {
            tmpChanged.sort(awesomeCompare);
        }

        let j = 0, a = 0, b = 0;
        while (a < tmpChanged.length && b < tmpOld.length) {
            if (awesomeCompare(tmpChanged[a], tmpOld[b]) < 0) {
                children[j++] = tmpChanged[a++];
            } else {
                children[j++] = tmpOld[b++];
            }
        }
        while (a < tmpChanged.length) {
            children[j++] = tmpChanged[a++];
        }
        while (b < tmpOld.length) {
            children[j++] = tmpOld[b++];
        }

        tmpChanged.length = 0;
        tmpOld.length = 0;
    }
}

//-----------------------------------------------------------------------------
// Sprite_Cards
//
// The sprite for displaying a card in triple triad.

function Sprite_MoveCard() {
    this.initialize.apply(this, arguments);
}

Sprite_MoveCard.prototype = Object.create(Sprite.prototype);
Sprite_MoveCard.prototype.constructor = Sprite_MoveCard;

Sprite_MoveCard.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this.createArrows();
    this._moveFrame = 0;
    this._lastAngle = 0;
};
Sprite_MoveCard.prototype.createArrows = function () {
    this.arrows = new Array();
    for (let n = 0; n < 3; n++) {
        this.arrows[n] = new Sprite()
        this.arrows[n].bitmap = ImageManager.loadExtrasKamigami("moveArrow");
        this.arrows[n].anchor.x = this.arrows[n].anchor.y = 0.5
        this.addChild(this.arrows[n])
        this.arrows[n].x = n * 30
        this.updateArrowImage(this.arrows[n]);
    }

};

Sprite_MoveCard.prototype.update = function () {
    Sprite.prototype.update.call(this);
};
Sprite_MoveCard.prototype.updateArrowImage = function (arrow) {
    let pos = arrow.x;
    arrow.opacity = 255 - Math.abs(50 - pos) * 5
    arrow.scale.y = arrow.scale.x = 1 - Math.abs((50 - pos) / 50)
};

Sprite_MoveCard.prototype.moveArrowAnimation = function () {
    for (let n = 0; n < 3; n++) {
        this.arrows[n].x = n * 40 + this._moveFrame
        if (this.arrows[n].x > 120) {
            this.arrows[n].x -= 120;
        }
        this.updateArrowImage(this.arrows[n])
    };
    this._moveFrame++
    if (this._moveFrame > 120) {
        this._moveFrame -= 120;
    }
};

Sprite_MoveCard.prototype.rotateImage = function (imgPos) {
    if (this._lastAngle != imgPos) {
        this._lastAngle = imgPos
        this.opacity = 0;
        this.rotation = imgPos * Math.PI / 2
    }
}


//-----------------------------------------------------------------------------
// Sprite_Cards
//
// The sprite for displaying a card in triple triad.

function Sprite_AttackCard() {
    this.initialize.apply(this, arguments);
}

Sprite_AttackCard.prototype = Object.create(Sprite.prototype);
Sprite_AttackCard.prototype.constructor = Sprite_AttackCard;

Sprite_AttackCard.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this.createArrows();
    this._moveFrame = 0;
    this._lastAngle = 0;
};
Sprite_AttackCard.prototype.createArrows = function () {
    this.arrows = new Array();
    for (let n = 0; n < 3; n++) {
        this.arrows[n] = new Sprite()
        this.arrows[n].bitmap = ImageManager.loadExtrasKamigami("attackArrow");
        this.arrows[n].anchor.x = this.arrows[n].anchor.y = 0.5
        this.addChild(this.arrows[n])
        this.arrows[n].x = n * 40
        this.updateArrowImage(this.arrows[n]);
    }

};



Sprite_AttackCard.prototype.update = function () {
    Sprite.prototype.update.call(this);
};
Sprite_AttackCard.prototype.updateArrowImage = function (arrow,) {
};


Sprite_AttackCard.prototype.moveArrowAnimation = function () {
    this._moveFrame++
    for (let n = 0; n < 3; n++) {
        this.arrows[n].x += 3
        if (this.arrows[n].x < 120) {
            if (this.arrows[n].scale.x < 1) {
                this.arrows[n].scale.x += 0.03
                this.arrows[n].scale.y += 0.03
            }

            this.arrows[n].opacity += 10
        }
        if (this.arrows[n].x > 120) {
            if (this.arrows[n].scale.y > 0) {
                this.arrows[n].scale.y -= 0.1
                this.arrows[n].x = 120;
            }
            else {
                this.arrows[n].x = 0;
                this.arrows[n].scale.y = 0;
                this.arrows[n].scale.x = 0;
                this.arrows[n].opacity = 0;
            }
        }
    }
};

Sprite_AttackCard.prototype.rotateImage = function (imgPos) {
    if (this._lastAngle != imgPos) {
        this._lastAngle = imgPos
        this.opacity = 0;
        this.rotation = imgPos * Math.PI / 2
    }

}



SceneManager.changeScene = function() {
    if (this.isSceneChanging() && !this.isCurrentSceneBusy()) {
        if (this._scene) {
            this._scene.terminate();
            this.onSceneTerminate();
        }
        this._scene = this._nextScene;
        this._nextScene = null;
        if (this._scene) {
            this._scene.create();
            this.onSceneCreate();
            this._cantPush = false;
        }
        if (this._exiting) {
            this.terminate();
        }
    }
};

SceneManager.goto = function (sceneClass) {
    this._cantPush = true;
    if (sceneClass) {
        this._nextScene = new sceneClass();
    }
    if (this._scene) {
        this._scene.stop();
    }
};


SceneManager.pop = function () {
    this._cantPush = true;
    if (this._stack.length > 0) {
        this.goto(this._stack.pop());
    }
};


SceneManager.push = function (sceneClass) {
    if (this._cantPush) {
        return;
    }
    this._stack.push(this._scene.constructor);
    this.goto(sceneClass);
};



Sprite_Animation.prototype.setupRate = function () {
    this._rate = 2;
};

Sprite_Animation.prototype.setSpecificRate = function (rate) {
    this._rate = rate;
};

//-----------------------------------------------------------------------------
// Sprite_Turn_Animation
//
// The sprite for displaying a turn animation

function Sprite_Turn_Animation() {
    this.initialize.apply(this, arguments);
}

Sprite_Turn_Animation.prototype = Object.create(Sprite.prototype);
Sprite_Turn_Animation.prototype.constructor = Sprite_Turn_Animation;

Sprite_Turn_Animation.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this.cardGod1 = false;
    this.cardGod2 = false;

}
Sprite_Turn_Animation.prototype.setTurn = function (turn) {
    this.turn = turn;
    this.emitter = fx.getParticleEmitter('DuelMainTurn');
    this.emitter.init(this, true, 1);
}
Sprite_Turn_Animation.prototype.changeTurn = function (turn) {
    this.turn = turn
}
Sprite_Turn_Animation.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this.updateEmitter();
    if (this.card) {
        this.x = this.card.x;
        this.y = this.card.y;
    }

}

Sprite_Turn_Animation.prototype.updateEmitter = function () {
    if (this.turn == 0 && this.cardGod1) {
        this.x = this.cardGod1.x;
        this.y = this.cardGod1.y;
    } else if (this.turn == 1 && this.cardGod2) {
        this.x = this.cardGod2.x;
        this.y = this.cardGod2.y;
    }

}


Sprite_Turn_Animation.prototype.setGod1 = function (sprite) {
    this.cardGod1 = sprite;

}
Sprite_Turn_Animation.prototype.setGod2 = function (sprite) {
    this.cardGod2 = sprite

}

//-----------------------------------------------------------------------------
// Sprite_Cards
//
// The sprite for displaying a card in triple triad.

function Sprite_Kami_Button(position, jsonText, spacing, mainFontSize) {
    this.initialize.apply(this, arguments);
}

Sprite_Kami_Button.prototype = Object.create(Sprite_Clickable.prototype);
Sprite_Kami_Button.prototype.constructor = Sprite_Kami_Button;

Sprite_Kami_Button.prototype.initialize = function (position, jsonText, spacing = 0, mainFontSize = 78) {
    Sprite_Clickable.prototype.initialize.call(this);
    this.createTexts(position, jsonText, spacing, mainFontSize);
    this.bitmap = new Bitmap(487, 200)
}
Sprite_Kami_Button.prototype.createTexts = function (position, jsonText, spacing, mainFontSize) {
    let text = IAVRA.I18N.localize("#{DuelVocab.MenuOptions." + jsonText + "}")
    this.mainText = new PIXI.Text(text, { fontFamily: 'GameFont', fontSize: mainFontSize, fill: 0xffffff, align: 'right', bold: true });
    this.addChild(this.mainText)
    if (position == 1)
        this.mainText.x -= this.mainText.width - 487
    this.mainText.x += spacing
    this.mainText.y += 45
    text = IAVRA.I18N.localize("#{DuelVocab.MenuOptions." + jsonText + "sub" + "}")
    this.mainTextSub = new PIXI.Text(text, { fontFamily: 'GameFont', fontSize: 30, fill: 0xffffff, align: 'right', bold: true });
    this.addChild(this.mainTextSub)
    if (position == 1)
        this.mainTextSub.x -= this.mainTextSub.width - 487
    this.mainTextSub.y += 120 + mainFontSize - 78
    this.mainTextSub.x += spacing
}


//-----------------------------------------------------------------------------
// Sprite_Cards
//
// The sprite for displaying a card in triple triad.

function Sprite_Kami_ButtonLight(position, jsonText, spacing, color, mainFontSize) {
    this.initialize.apply(this, arguments);
}

Sprite_Kami_ButtonLight.prototype = Object.create(Sprite_Clickable.prototype);
Sprite_Kami_ButtonLight.prototype.constructor = Sprite_Kami_ButtonLight;

Sprite_Kami_ButtonLight.prototype.initialize = function (position, jsonText, spacing, color, mainFontSize = 78) {
    Sprite_Clickable.prototype.initialize.call(this);
    this.createTexts(position, jsonText, spacing, color, mainFontSize);
    this.bitmap = new Bitmap(487, 200)
}
Sprite_Kami_ButtonLight.prototype.createTexts = function (position, jsonText, spacing, color, mainFontSize) {
    let text = IAVRA.I18N.localize("#{DuelVocab.MenuOptions." + jsonText + "}")
    this.mainText = new PIXI.Text(text, { fontFamily: 'GameFont', fontSize: mainFontSize, fill: color, align: 'right', bold: true, dropShadowColor: color, dropShadowBlur: 10, dropShadow: true, dropShadowDistance: 0, padding: 14 });
    this.addChild(this.mainText)
    if (position == 1)
        this.mainText.x -= this.mainText.width - 487
    this.mainText.x += spacing
    this.mainText.y += 45
    text = IAVRA.I18N.localize("#{DuelVocab.MenuOptions." + jsonText + "sub" + "}")
    this.mainTextSub = new PIXI.Text(text, { fontFamily: 'GameFont', fontSize: 30, fill: color, align: 'right', bold: true, dropShadowColor: color, dropShadowBlur: 10, dropShadow: true, dropShadowDistance: 0, padding: 14 });
    this.addChild(this.mainTextSub)
    if (position == 1)
        this.mainTextSub.x -= this.mainTextSub.width - 487
    this.mainTextSub.x += spacing
    this.mainTextSub.y += 120 + mainFontSize - 78
}

Sprite_Kami_ButtonLight.prototype.changeColor = function(newColor) {
    this.mainText.style.fill = newColor
    this.mainText.style.dropShadowColor = newColor
    this.mainTextSub.style.fill = newColor
    this.mainTextSub.style.dropShadowColor = newColor
}

const _kami_Scene_Map_terminate = Scene_Map.prototype.stop
Scene_Map.prototype.stop = function () {
    if (AudioManager._currentBgm)
        $dataKamigami.currentMapMusic = AudioManager._currentBgm.name;
    _kami_Scene_Map_terminate.call(this, ...arguments);
}
const _kami_Scene_Map_create = Scene_Map.prototype.create
Scene_Map.prototype.create = function () {
    _kami_Scene_Map_create.call(this, ...arguments);
    if ($dataKamigami.currentMapMusic) {
        AudioManager.playBgm({ name: $dataKamigami.currentMapMusic, pan: 0, pitch: 100, volume: 100 });
    }
}


const path = `img/system/Cursor.png`;

document.body.style.cursor = `url('${path}') ${0} ${0}, default`;



Graphics._onKeyDown = function (event) {
    if (event.altKey && event.keyCode == 13) {
        this._switchFullScreen();
    }
    if (!event.ctrlKey && !event.altKey) {
        switch (event.keyCode) {
            case 113:   // F2
                event.preventDefault();
                this._switchFPSMeter();
                break;
            case 114:   // F3
                event.preventDefault();
                this._switchStretchMode();
                break;
            case 115:   // F4
                event.preventDefault();
                this._switchFullScreen();
                break;
        }
    }
};

TouchInput._onRightButtonDown = function(event) {
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
        this._rightMousePressed = true;
        this._onCancel(x, y);
    }
};

/**
 * Checks whether the mouse button or touchscreen is currently pressed down.
 *
 * @static
 * @method isRightPressed
 * @return {Boolean} True if the mouse button or touchscreen is pressed
 */
 TouchInput.isRightPressed = function() {
    return this._rightMousePressed;
};

/**
 * @static
 * @method _onMouseUp
 * @param {MouseEvent} event
 * @private
 */
 TouchInput._onMouseUp = function(event) {
    if (event.button === 0) {
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        this._mousePressed = false;
        this._onRelease(x, y);
    } else if (event.button === 2) {
        this._rightMousePressed = false;
    }
};
