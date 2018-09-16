/* The only global variable. Cannot conflict with any variables from plugins.  */

var Game = { // jshint ignore:line
    addNamespace: function (namespace) {
        'use strict';
        var parts   = namespace.split("."),
            object  = this,
            i, len;

        for(i=0, len=parts.length; i < len; i++) {
            if(!object[parts[i]]) {
                object[parts[i]] = {};
            }
            object = object[parts[i]];
        }

        return object;
    }
};