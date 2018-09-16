/* Handles message logging (messages for the player; i.e. not to the console) */

(function($) {
    'use strict';

    var Log = function() {};

    Log.prototype = {
        //_dynamicScrolling: null, // If true, keeps the div scrolled to bottom

        _defaultConfig: {
            showTime: false,
            showGlow: false
        },

        init: function($container, config) {
            this._$container = $container;
            this._config = $.extend({}, this._defaultConfig, config);

            //this._dynamicScrolling = true;
            //
            //this._$container.off('scroll').on('scroll', function() {
            //    self._dynamicScrolling = false;
            //    var container = self._$container.get(0);
            //
            //    if (container.scrollTop + self._$container.height() >= container.scrollHeight) {
            //        self._dynamicScrolling = true;
            //    }
            //});
        },

        clear: function() {
            this._$container.empty();
        },

        logMessage: function(message) {
            if (this._config.showTime) {
                message = (Game.Clock.total / 1000).toFixed(3) + ': ' + message;
            }

            var $p = $('<p>')
                .addClass("log-paragraph")
                .text(message);

            //if (this._config.showGlow) {
            //    $p.addClass('glow');
            //
            //    window.setTimeout(function() {
            //        $p.removeClass('glow');
            //    }, 1000); // TODO Has to match glow animation
            //}

            this._$container.append($p);

            //if (this._dynamicScrolling) {
            //    var container = this._$container.get(0);
            //    container.scrollTop = container.scrollHeight;
            //}
        }

    };

    Game.Log = new Log();

}(jQuery));
