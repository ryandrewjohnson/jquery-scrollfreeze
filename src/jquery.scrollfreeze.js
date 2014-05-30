(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.scrollFreeze = (function() {
        
        /**
         * Private Props
         * @property {object}  __               - add private module functions here.
         * @property {object}  publicAPI        - add public functions here.
         */
        var __,                 
            publicAPI,
            $win,
            $doc,
            $body,

            initialized = false,
            isFrozen = false,
            activated = false,
            useOverflow = false,

            keys = {
                SPACEBAR: 32,
                PAGE_UP: 33,
                PAGE_DOWN: 34,
                ARROW_DOWN: 40,
                ARROW_UP: 38,
                END: 35,
                HOME: 36
            };

        // PRIVATE FUNCTIONS
        __ = {  
            init: function () {
                if (initialized) return;
                initialized = true;

                // set listners on document.ready
                $(function () {
                    $win = $(window);
                    $doc = $(document);
                    $body = $('body');

                    __.bindEvents();
                });
                
            },
            bindEvents: function () {
                if (activated) return;
                activated = true;

                // MozMousePixelScroll explained:
                // http://mzl.la/1kO0fJu and http://mzl.la/1kO0hRM
                $win.on('mousewheel DOMMouseScroll MozMousePixelScroll', __.handleScroll);
                // IE needs the listener on the doc instead of window
                $doc.on('mousewheel', __.handleScroll); 
                $doc.on('keydown', __.handleKeys);
            },
            unbindEvents: function () {
                if (!activated) return;
                activated = false;

                $win.off('mousewheel DOMMouseScroll MozMousePixelScroll', __.handleScroll);
                $doc.off('mousewheel', __.handleScroll);
                $doc.off('keydown', __.handleKeys);
            },
            handleScroll: function (e) {
                if (isFrozen) {
                    e.stopPropagation();
                    e.preventDefault();
                    return;
                }   
                
                $doc.trigger('userscroll.scrollfreeze');    
            },
            handleKeys: function (e) {

                for (var key in keys) {
                    if (e.keyCode === keys[key]) {
                        if (isFrozen) {
                            e.preventDefault(); 
                            return;
                        }
                        
                        $doc.trigger('userscroll.scrollfreeze');    
                        return;
                    }
                }
            },
            updateOverflow: function (hide) {
                if (useOverflow) {
                    var val = hide ? 'hidden' : 'visible';
                    $body.css('overflow', val);
                }
            }
        };

        // PUBLIC FUNCTIONS
        publicAPI = {
            useOverflow: function () {
                useOverflow = true;
            },
            isFrozen: function () {
                return isFrozen;
            },
            isEnabled: function () {
                return activated;
            },
            toggle: function () {
                isFrozen ? this.thaw() : this.freeze();
            },
            freeze: function () {       
                isFrozen = true;
                __.updateOverflow(true);
            },
            thaw: function () {
                isFrozen = false;
                __.updateOverflow(false);
            },
            enable: function () {
                __.bindEvents();
                if (isFrozen) __.updateOverflow(true);
            },
            disable: function () {
                __.unbindEvents();
                __.updateOverflow(false);
            }
        };

        __.init();

        return publicAPI;
    })();
}));
