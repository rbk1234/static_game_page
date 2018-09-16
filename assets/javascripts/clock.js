/* Handles Game time. Register all periodic functions with the clock's setInterval */

(function ($) {
    'use strict';

    var Clock = function() {};

    Clock.prototype = {

        init: function() {
            /*. Fallback support, window.requestAnimationFrame isn't fully supported by all browsers .*/
            window.requestFrame = (function () {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    function (c) {
                        window.setTimeout(c, 50);
                    };
            })();

            /*. Time based variables, all in milliseconds .*/
            this.now = Date.now() || (new Date).getTime(); // Current tick's time
            this.then = Date.now() || (new Date).getTime(); // Last tick's time
            this.delta = 0; // Time since last tick
            this.total = 0; // Total time elapsed
            this.periodicFns = {}; // functions to call periodically
        },

        // Register a function to be called every period (period should be in milliseconds).
        // The function will be called with parameters: (iterations, seconds)
        setInterval: function(key, fn, period) {
            this.periodicFns[key] = {
                fn: fn,
                period: period,
                current: period
            };
        },

        clearInterval: function(key) {
            delete this.periodicFns[key];
        },

        /*. Main clock function .*/
        run: function() {
            /*. Calculate time since last tick .*/
            this.now = Date.now() || (new Date).getTime(); // Get current time
            this.delta = this.now - this.then; // Get time since last tick
            this.then = this.now; // Reset last tick time
            this.total += this.delta;

            this._iteratePeriodicFns();

            /*. Run function again as soon as possible without lagging .*/
            window.requestFrame(Game.Util.makeCallback(this, this.run));
        },

        // A periodic function does not run every game loop, it runs every X milliseconds (to improve performance)
        _iteratePeriodicFns: function() {
            var self = this;

            Game.Util.iterateObject(this.periodicFns, function(key, periodicFn) {
                periodicFn.current += self.delta;
                if (periodicFn.current >= periodicFn.period) {
                    // TODO Calculate this without a while loop
                    var iterations = 0;
                    while (periodicFn.current >= periodicFn.period) {
                        iterations += 1;
                        periodicFn.current -= periodicFn.period;
                    }
                    periodicFn.fn(iterations, periodicFn.period);
                }
            });
        }
    };

    Game.Clock = new Clock();

}(jQuery));