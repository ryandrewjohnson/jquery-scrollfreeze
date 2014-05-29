/**
 * @name jquery.scrollfreeze
 * @desc TBD
 * @author Ryan Johnson
 * @version 1.0.0
 *  
 *  Usage:
 *
 *  // init after document.ready
 *  $.scrollFreeze.init();
 *      
 *  // disable scrolling
 *  $.scrollFreeze.freeze();    
 *  
 *  // enable scrolling
 *  $.scrollFreeze.thaw();     
 *      
 *  // toggle scrolling
 *  $.scrollFreeze.toggle();        
 *      
 *      
 *  
 */
define(['jquery'], function ($) {
	
	
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

            initialized = false,
            isFrozen = false,
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
        		$win = $(window);
                $doc = $(document);

                __.bindEvents();
        	},
        	bindEvents: function () {
        		$win.on('mousewheel DOMMouseScroll', __.handleScroll);
			  	// $doc.on('mousewheel', __.handleScroll);
			  	$doc.on('keydown', __.handleKeys);
        	},
        	/*
        	unbindEvents: function () {
        		$win.off('mousewheel DOMMouseScroll', __.handleScroll);
			  	$doc.off('mousewheel', __.handleScroll);
			  	$doc.off('keydown', __.handleKeys);
        	},
        	*/
        	handleScroll: function (e) {
        		if (isFrozen) {
        			e.preventDefault();	
        		}
        		else {
        			$doc.trigger('userscroll.scrollfreeze');	
        		}
        	},
        	handleKeys: function (e) {
        		for (var key in keys) {
        			if (e.keyCode === keys[key]) {
        				if (isFrozen) {
        					e.preventDefault();	
        				}
        				else {
        					$doc.trigger('userscroll.scrollfreeze');	
        				}        				
            			return;
        			}
    			}
        	}
        };

        // PUBLIC FUNCTIONS
        publicAPI = {
     		init: __.init,
            toggle: function () {
            	isFrozen ? this.thaw() : this.freeze();
            },
            freeze: function () {    	
            	isFrozen = true;
            },
            thaw: function () {
            	isFrozen = false;
            }
        };

        return publicAPI;
    })();

});