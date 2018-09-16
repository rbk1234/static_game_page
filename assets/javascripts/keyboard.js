/* Handles keyboard input */
// TODO This needs to be fleshed out

(function($) {
    'use strict';

    var Keyboard = function() {};

    Keyboard.prototype = {

        init: function() {
            var self = this;

            this.keysDown = {};

            $(document).off('keydown').on('keydown', function(evt) {
                self.keysDown[evt.keyCode] = true;
            });

            $(document).off('keyup').on('keyup', function(evt) {
                delete self.keysDown[evt.keyCode];
            });
        },

        isKeyDown: function(keyCode) {
            return this.keysDown[keyCode];
        }
    };

    Game.Keyboard = new Keyboard();

}(jQuery));

