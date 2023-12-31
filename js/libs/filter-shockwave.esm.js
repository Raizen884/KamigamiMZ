/*!
 * @pixi/filter-shockwave - v3.1.0
 * Compiled Wed, 11 Mar 2020 20:38:18 UTC
 *
 * @pixi/filter-shockwave is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var Filter = PIXI.Filter;
var vertex = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";

var fragment = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\n\nuniform vec2 center;\n\nuniform float amplitude;\nuniform float wavelength;\n// uniform float power;\nuniform float brightness;\nuniform float speed;\nuniform float radius;\n\nuniform float time;\n\nconst float PI = 3.14159;\n\nvoid main()\n{\n    float halfWavelength = wavelength * 0.5 / filterArea.x;\n    float maxRadius = radius / filterArea.x;\n    float currentRadius = time * speed / filterArea.x;\n\n    float fade = 1.0;\n\n    if (maxRadius > 0.0) {\n        if (currentRadius > maxRadius) {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);\n    }\n\n    vec2 dir = vec2(vTextureCoord - center / filterArea.xy);\n    dir.y *= filterArea.y / filterArea.x;\n    float dist = length(dir);\n\n    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    vec2 diffUV = normalize(dir);\n\n    float diff = (dist - currentRadius) / halfWavelength;\n\n    float p = 1.0 - pow(abs(diff), 2.0);\n\n    // float powDiff = diff * pow(p, 2.0) * ( amplitude * fade );\n    float powDiff = 1.25 * sin(diff * PI) * p * ( amplitude * fade );\n\n    vec2 offset = diffUV * powDiff / filterArea.xy;\n\n    // Do clamp :\n    vec2 coord = vTextureCoord + offset;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    // No clamp :\n    // gl_FragColor = texture2D(uSampler, vTextureCoord + offset);\n\n    color.rgb *= 1.0 + (brightness - 1.0) * p * fade;\n\n    gl_FragColor = color;\n}\n";

/**
 * The ShockwaveFilter class lets you apply a shockwave effect.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/shockwave.gif)
 *
 * @class
 * @extends PIXI..Filter
 * @memberof PIXI.filters
 * @see {@link https://www.npmjs.com/package/@pixi/filter-shockwave|@pixi/filter-shockwave}
 * @see {@link https://www.npmjs.com/package/pixi-filters|pixi-filters}
 *
 * @param {PIXI.Point|number[]} [center=[0.5, 0.5]] See `center` property.
 * @param {object} [options] - The optional parameters of shockwave filter.
 * @param {number} [options.amplitude=0.5] - See `amplitude`` property.
 * @param {number} [options.wavelength=1.0] - See `wavelength` property.
 * @param {number} [options.speed=500.0] - See `speed` property.
 * @param {number} [options.brightness=8] - See `brightness` property.
 * @param {number} [options.radius=4] - See `radius` property.
 * @param {number} [time=0] - See `time` property.
 */
var ShockwaveFilter = /*@__PURE__*/(function (Filter) {
    function ShockwaveFilter(center, options, time) {
        if ( center === void 0 ) center = [0.0, 0.0];
        if ( options === void 0 ) options = {};
        if ( time === void 0 ) time = 0;

        Filter.call(this, vertex, fragment);

        this.center = center;

        if (Array.isArray(options)) {
            // eslint-disable-next-line no-console
            console.warn('Deprecated Warning: ShockwaveFilter params Array has been changed to options Object.');
            options = {};
        }

        options = Object.assign({
            amplitude: 30.0,
            wavelength: 160.0,
            brightness: 1.0,
            speed: 500.0,
            radius: -1.0,
        }, options);

        this.amplitude = options.amplitude;

        this.wavelength = options.wavelength;

        this.brightness = options.brightness;

        this.speed = options.speed;

        this.radius = options.radius;

        /**
         * Sets the elapsed time of the shockwave.
         * It could control the current size of shockwave.
         *
         * @member {number}
         */
        this.time = time;
    }

    if ( Filter ) ShockwaveFilter.__proto__ = Filter;
    ShockwaveFilter.prototype = Object.create( Filter && Filter.prototype );
    ShockwaveFilter.prototype.constructor = ShockwaveFilter;

    var prototypeAccessors = { center: { configurable: true },amplitude: { configurable: true },wavelength: { configurable: true },brightness: { configurable: true },speed: { configurable: true },radius: { configurable: true } };

    ShockwaveFilter.prototype.apply = function apply (filterManager, input, output, clear) {
        /**
         * There is no set/get of `time`, for performance.
         * Because in the most real cases, `time` will be changed in ever game tick.
         * Use set/get will take more function-call.
         */
        this.uniforms.time = this.time;

        filterManager.applyFilter(this, input, output, clear);
    };

    /**
     * Sets the center of the shockwave in normalized screen coords. That is
     * (0,0) is the top-left and (1,1) is the bottom right.
     *
     * @member {PIXI.Point|number[]}
     */
    prototypeAccessors.center.get = function () {
        return this.uniforms.center;
    };
    prototypeAccessors.center.set = function (value) {
        this.uniforms.center = value;
    };

    /**
     * The amplitude of the shockwave.
     *
     * @member {number}
     */
    prototypeAccessors.amplitude.get = function () {
        return this.uniforms.amplitude;
    };
    prototypeAccessors.amplitude.set = function (value) {
        this.uniforms.amplitude = value;
    };

    /**
     * The wavelength of the shockwave.
     *
     * @member {number}
     */
    prototypeAccessors.wavelength.get = function () {
        return this.uniforms.wavelength;
    };
    prototypeAccessors.wavelength.set = function (value) {
        this.uniforms.wavelength = value;
    };

    /**
     * The brightness of the shockwave.
     *
     * @member {number}
     */
    prototypeAccessors.brightness.get = function () {
        return this.uniforms.brightness;
    };
    prototypeAccessors.brightness.set = function (value) {
        this.uniforms.brightness = value;
    };

    /**
     * The speed about the shockwave ripples out.
     * The unit is `pixel/second`
     *
     * @member {number}
     */
    prototypeAccessors.speed.get = function () {
        return this.uniforms.speed;
    };
    prototypeAccessors.speed.set = function (value) {
        this.uniforms.speed = value;
    };

    /**
     * The maximum radius of shockwave.
     * `< 0.0` means it's infinity.
     *
     * @member {number}
     */
    prototypeAccessors.radius.get = function () {
        return this.uniforms.radius;
    };
    prototypeAccessors.radius.set = function (value) {
        this.uniforms.radius = value;
    };

    Object.defineProperties( ShockwaveFilter.prototype, prototypeAccessors );

    return ShockwaveFilter;
}(Filter));

//# sourceMappingURL=filter-shockwave.esm.js.map
