
(function($) {

    var Canvas = function($canvas, config) {
        this._init($canvas, config);
    };
    Canvas.prototype = {

        _defaultConfig: {
            rows: 25,
            columns: 90
        },

        _init: function($canvas, config) {
            this.$canvas = $canvas;
            this._config = $.extend({}, this._defaultConfig, config);

            this.canvas = this.$canvas.get(0);
            this.context = this.canvas.getContext('2d');
            this._convertCanvasToHiDPI(this.width(), this.height());

            this.context.font = Game.Settings.fontHeight() + 'px monospace';
            this.context.fillStyle = "#3f3f3f";
        },

        clear: function() {
            this.context.clearRect(0, 0, this.width(), this.height());
        },

        drawImage: function(charArray, x, y) {
            if (Game.Constants.continuousDrawing) {
                x = Game.Util.defaultFor(x, 0);
                y = Game.Util.defaultFor(y, 0);
            }
            else {
                x = Game.Util.round(Game.Util.defaultFor(x, 0));
                y = Game.Util.round(Game.Util.defaultFor(y, 0));
            }

            var scaledX = x * Game.Settings.fontWidth();
            var scaledY = y * Game.Settings.fontHeight();
            scaledY += (Game.Settings.fontHeight() - 2); // Move down one row. Move up a tiny bit.

            // Draw one character at a time (inefficient)
            //for (var row = 0; row < charArray.length; row++) {
            //    for (var col = 0; col < charArray[row].length; col++) {
            //        this.context.fillText(
            //            charArray[row][col],
            //            scaledX + col * Game.Settings.fontWidth(),
            //            scaledY + row * Game.Settings.fontHeight()
            //        );
            //    }
            //}

            // Draw one line at a time
            for (var row = 0; row < charArray.length; row++) {
                this.context.fillText(
                    charArray[row],
                    scaledX,
                    scaledY + row * Game.Settings.fontHeight()
                )
            }
        },

        width: function() {
            return this._config.columns * Game.Settings.fontWidth();
        },

        height: function() {
            return this._config.rows * Game.Settings.fontHeight();
        },

        _convertCanvasToHiDPI: function(width, height, ratio) {
            if (!ratio) {
                // TODO Internet Explorer
                // https://stackoverflow.com/questions/22483296/html5-msbackingstorepixelratio-and-window-devicepixelratio-dont-exist-are-the
                var dpr = window.devicePixelRatio || 1;
                var bsr = this.context.webkitBackingStorePixelRatio ||
                    this.context.mozBackingStorePixelRatio ||
                    this.context.msBackingStorePixelRatio ||
                    this.context.oBackingStorePixelRatio ||
                    this.context.backingStorePixelRatio || 1;
                ratio = dpr / bsr;
            }

            this.canvas.width = width * ratio;
            this.canvas.height = height * ratio;
            this.canvas.style.width = width + "px";
            this.canvas.style.height = height + "px";
            this.context.setTransform(ratio, 0, 0, ratio, 0, 0);
        }

    };

    Game.namespace('Display').Canvas = Canvas;

}(jQuery));
