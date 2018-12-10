/**
 * This have the keycode of the TvKeys.
 * @ {Objects}
 */
var tvKey = {};
/**
 * Contains the main tasks of the app.
 * @ {Object}
 */
var app = {
    /**
     * App initializations.
     */
    initialize: function() {       
        this.bindEvents();
    },
    /**
     * Bind all the common events that are required on startup.
     */
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    /**
     * Deviceready Even Handler.
     */
    onDeviceReady: function() {
        toast.inputdevice.getSupportedKeys(function(keys){
            for(var i = 0; i < keys.length; i++)
            {
                switch(keys[i].name) {
                    case 'ArrowUp':
                        tvKey.KEY_UP = keys[i].code;
                        break;
                }
            }
        });
        this.initGame();
    },
    initGame: function() {
        head.js(
            /*Third-party Libraries*/
            {Jquery: "js/lib/jquery-3.3.1.min.js"},
            /*Default Libraries*/
            {Player: "js/player.js"},
            {Settings: "js/settings.js"},
            /*Common functions*/
            {Common: "js/common.js"},
            {Init: "js/init.js"},
            /*Language management*/
            {LanguageConfig: "resources/language/languageConfig.js"},   

            function(){
            // Checks the language of the TV set.
            navigator.globalization.getPreferredLanguage(
                function (language) {
                    if (language.value.indexOf('es') > -1) {
                        $("body").addClass("LANG-ESP");
                        head.js({Esp: "js/resources/language/esp.js"});
                        window.LANGUAGE.current = window.LANGUAGE.ESP;                              
                    } else {
                        $("body").addClass("LANG-ENG");
                        head.js({Eng: "js/resources/language/eng.js"});
                        window.LANGUAGE.current = window.LANGUAGE.ENG;                  
                    }    
                }
            );               
            Utils.logger.log("/*----- All scripts has been loaded --------*/");
            player =  null;//new Player_NaCl(playerCallback, "resources/sounds/");
        });        
    }
};

app.initialize();