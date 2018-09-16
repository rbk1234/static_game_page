/* Statistics about the current game session */

(function ($) {
    'use strict';

    var Statistics = function() {};

    Statistics.prototype = {

        init: function() {
            this.playerDeaths = 0;
        }

    };

    Game.Statistics = new Statistics();

}(jQuery));