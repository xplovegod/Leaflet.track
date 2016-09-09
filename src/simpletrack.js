'use strict';

if (typeof module !== 'undefined') module.exports = simpletrack;

function simpletrack(canvas) {
    if (!(this instanceof simpletrack)) return new simpletrack(canvas);

    this._canvas = canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;

    this._ctx = canvas.getContext('2d');
    this._width = canvas.width;
    this._height = canvas.height;

    this._data = [];

    this.zr = null;

    this._animationPointIndex = 1;
}

simpletrack.prototype = {


    data: function(data) {
        this._data = data;
        return this;
    },

    add: function(point) {
        this._data.push(point);
        return this;
    },

    clear: function() {
        this._data = [];
        return this;
    },

    resize: function() {
        this._width = this._canvas.width;
        this._height = this._canvas.height;
    },

    azimuthAngle: function(x1, y1, x2, y2) {
        var dx, dy, angle = 0;
        var pi_value = Math.PI;
        dx = x2 - x1;
        dy = y2 - y1;
        if (x2 == x1) {
            angle = Math.PI / 2.0;
            if (y2 == y1) {
                angle = 0.0;
            } else if (y2 < y1) {
                angle = 3.0 * Math.PI / 2.0;
            }
        } else if ((x2 > x1) && (y2 > y1)) {
            angle = Math.atan(dx / dy);
        } else if ((x2 > x1) && (y2 < y1)) {
            angle = Math.PI / 2 + Math.atan(-dy / dx);
        } else if ((x2 < x1) && (y2 < y1)) {
            angle = Math.PI + Math.atan(dx / dy);
        } else if ((x2 < x1) && (y2 > y1)) {
            angle = 3.0 * pi_value / 2.0 + Math.atan(dy / -dx);
        }

        //return (angle * 180 / Math.PI); // 角度
        //return angle; // 方位角
        return angle;
    },

    draw: function(minOpacity) {
        var moduleThis = this;
        var points = this._data;
        var canvs = this._canvas;

        require.config({
            packages: [{
                name: 'zrender',
                location: '../../zrender-master/src',
                main: 'zrender'
            }]
        });

        require(
            [
                "zrender",
                "zrender/graphic/shape/Polyline",
                "zrender/graphic/shape/Line",
                'zrender/graphic/shape/Polygon',
                "zrender/graphic/shape/Star",
                "zrender/graphic/Image"
            ],
            function(zrender, PolylineShape, LineShape, PolygonShape, StarShape, ImageShape) {

                var carAnimator = function(points) {
                    var i = moduleThis._animationPointIndex;
                    var ang = moduleThis.azimuthAngle(points[i - 1][0], points[i - 1][1], points[i][0], points[i][1]);

                    var star = new ImageShape({
                        scale: [1, 1],
                        zlevel: 1,
                        style: {
                            x: -32,
                            y: -32,
                            image: '/Leaflet.track/images/car_up.png'
                        },
                        draggable: false,
                        hoverable: false,
                        rotation: ang,
                        origin: [0, 0],
                        position: points[i - 1]
                    });

                    moduleThis.zr.add(star);


                    star.animate("", false)
                        .when(2000, {
                            position: points[i]
                        })
                        .done(function() {
                            console.log(moduleThis._animationPointIndex);
                            star.stopAnimation();

                            moduleThis.zr.clearAnimation();

                            moduleThis._animationPointIndex++;

                            if (moduleThis._animationPointIndex <= points.length - 1) {
                                moduleThis.zr.remove(star);
                                carAnimator(points);
                            } else {
                                moduleThis._animationPointIndex = 1;
                            }
                        })
                        .start();
                };

                if (!moduleThis.zr) {
                    moduleThis.zr = zrender.init(canvs);
                } else {
                    moduleThis.zr.clear();
                    moduleThis.zr.clearAnimation();
                    moduleThis._ctx.clearRect(0, 0, moduleThis._width, moduleThis._height);
                }

                var polyline = new PolylineShape({
                    style: {
                        lineDash: [10, 10],
                        stroke: "rgba(255, 255, 0, 0.8)",
                        lineWidth: 4
                    },
                    shape: {
                        //smooth: 'spline',
                        points: points
                    }
                });

                moduleThis.zr.add(polyline);

                // 轨迹线动画
                polyline.animate('style', true)
                    .when(3000, {
                        lineDashOffset: -20
                    })
                    .start();

                // 节点箭头
                for (var i = points.length - 1; i >= 1; i--) {
                    var arrowPts = DrawArrow({
                        "x": points[i - 1][0],
                        "y": points[i - 1][1]
                    }, {
                        "x": points[i][0],
                        "y": points[i][1]
                    }, 15, 20);
                    var polygon = new PolygonShape({
                        shape: {
                            points: arrowPts
                        },
                        style: {
                            stroke: '#0f0',
                            fill: '#ff0000',
                            opacity: 0.4
                        }
                    });
                    moduleThis.zr.add(polygon);
                }

                carAnimator(points);

                moduleThis.zr.configLayer(1, {
                    motionBlur: true,
                    lastFrameAlpha: 0.8
                });

                moduleThis.zr.refresh();

            });
        return this;
    },


    _createCanvas: function() {
        /*        if (typeof document !== 'undefined') {
                    return document.createElement('canvas');
                } else {
                    // create a new canvas instance in node.js
                    // the canvas class needs to have a default constructor without any parameter
                    return new this._canvas.constructor();
                }*/
    }
};