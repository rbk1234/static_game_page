/* Handles resources and resource generation */

(function ($) {
    'use strict';

    var ResourceEngine = function() {};

    ResourceEngine.prototype = {

        init: function() {
            this._resources = {
                ore: {
                    name: 'Ore',
                    amount: 20,
                    rate: 1
                }
            };

            Game.Clock.setInterval(
                'updateResources',
                Game.Util.makeCallback(this, this._update),
                1000.0 / Game.Constants.resourceUpdatesPerSecond
            );
        },

        _update: function(iterations, period) {
            var seconds = iterations * period / 1000.0;

            Game.Util.iterateObject(this._resources, function(key, resource) {
                resource.amount += resource.rate * seconds;
            });
        },

        add: function(key, amount) {
            this._resources[key].amount += amount;
        }

    };

    Game.ResourceEngine = new ResourceEngine();

}(jQuery));