/* Player settings that may be changed over the course of the game */

(function ($) {
    'use strict';

    var Settings = function() {};

    Settings.prototype = {

        init: function() {
            this.fontSize = 16;
        },

        fontHeight: function() {
            return this._config.fontSize;
        },

        // Having a width that is 3/5 of the height is standard for monospace text
        fontWidth: function() {
            return this.fontHeight() * 3.0 / 5.0;
        }
    };

    Game.Settings = new Settings();

}(jQuery));