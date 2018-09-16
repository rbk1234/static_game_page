/* Game Constants. Constants should not be changed once game is running */

(function ($) {
    'use strict';

    var Constants = function() {};

    Constants.prototype = {

        init: function() {
            // Discreet vs. continuous drawing (discreet = snap to grid, continuous = smooth)
            this.continuousDrawing = true;

            // Note: needs to be higher than the max attack speed for game to function correctly
            this.levelUpdatesPerSecond = 15;
            this.levelDrawsPerSecond = 15;
            this.resourceUpdatesPerSecond = 1;
        }
    };

    Game.Constants = new Constants();

}(jQuery));