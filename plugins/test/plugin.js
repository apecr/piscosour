'use strict';

var piscosour = require('../..'),
    Plugin = piscosour.Plugin;

var plug = new Plugin({
    description : "Test plugin",

    check : function(shot){
        shot.test_pluginAddon("Azucar!");
    },

    addons : {

        pluginAddon: function (name) {
            this.logger.info("Test addon executed", name);
        }
    }
});

module.exports = plug;