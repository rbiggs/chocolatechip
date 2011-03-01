/** 
* 
||======================================================================||        
||                                                            _         ||       cZ8D) 
||   ___  _                   _        _          ___  _     (_)        ||      (O) /8\ 
||  / __|| |_   ___  ___  ___ | | __ _ | |_  ___  / __|| |_   _  ____   ||         /888\ 
|| | (__ | ' \ / _ \/ __|/ _ \| |/ _` ||  _|/ -_)| (__ | ' \ | ||  _ \  ||       /ZO88OZ\ 
||  \___||_||_|\___/\___|\___/|_|\__,_| \__|\___| \___||_||_||_|| .__/  ||     /$O88DD88O$\ 
||                                                              |_|     ||   (?IZNNNNNNNNZI?)  
||                                                                      ||    \:~==+??+==~:/   
||======================================================================||
   
* ChocolateChip
* A small, light JavaScript framework for mobile Web app development, providing the functionality necessary for creating professional HTML5/CSS3-based Web apps.
* 
* LICENSE: BSD
*
* Version 1.0.4
* 
* Copyright (c) 2010, Robert Biggs
* All rights reserved.

* Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Robert Biggs nor the names of any of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
* 
*/

(function() {
	
    var $ = function ( selector ) {
	
        this.collectionToArray = function ( collection ) {
            var array = [];
            var i = 0, len = collection.length;
            while ( i < len ) {
                array[i] = collection[i];
                i++;
            }
            return array;
        };
        var elem = this.collectionToArray(document.querySelectorAll(selector));
        if (elem.length == 1) {
            return elem[0];
        } else { 
            return this.collectionToArray(document.querySelectorAll(selector));
        }
    };
    
    $.version = "1.0.4";
    
    Element.prototype.previous = function ( ) {
        return this.previousElementSibling;
    };
    
    Element.prototype.next = function ( ) {
        return this.nextElementSibling;
    };
    
    Element.prototype.first = function ( ) {
        return this.firstElementChild;
    };
    
    Element.prototype.last = function ( ) {
        return this.lastElementChild;
    };
    
    Element.prototype.ancestorByTag = function ( selector ) {
        var p = this.parentNode;
        if (!p) {
            return false;
        }
        if (p.tagName.toLowerCase() == selector) {
            return p;
        } else {
            return p.ancestorByTag(selector);
        }
    };
    
    Element.prototype.ancestorByClass = function ( selector ) {
        var p = this.parentNode;
        if (!p) {
            return false;
        }
        if (p.hasClass(selector)) {
            return p;
        } else {
            return p.ancestorByClass(selector);
        }
    };
    
    $.make = function ( HTMLString ) {
        var nodes = [];
        var temp = document.createElement("div");
        temp.innerHTML = HTMLString;
        var i = 0;
        var len = temp.childNodes.length;
        while (i < len) {
            nodes[i] = temp.childNodes[i];
            i++;
        }
        return nodes;
    };  
    
    Element.prototype.empty = function ( ) {
        this.removeEvents();
        this.textContent = "";
    };
    
    Element.prototype.clone = function ( value ) {
        if (value === true || !value) {
            return this.cloneNode(true);
        } else {
            return this.cloneNode(false);
        }
    };
    
    Element.prototype.wrap = function ( string ) {
        var tempNode = $.make(string);
        tempNode = tempNode[0];
        var whichClone = this.clone(true);
        tempNode.appendChild(whichClone);
        this.after(tempNode, this);
        this.remove(this); 
    };
    
    $.replace = function ( newElem, oldElem ) {
         oldElem.parentNode.replaceChild(newElem, oldElem);
    };
    
    Element.prototype.unwrap = function ( ) {
        if (this.parentNode.nodeName === "BODY") {
            return false;
        }
        var element = this.clone(true);
        $.replace(element, this.parentNode);
    };
    
    Element.prototype.text = function ( value ) {
        if (!!value) {
            this.innerText = value;
        } else {
            return this.innerText;
        }
    };
    
    Element.prototype.fill = function ( content ) {
        this.empty();
        if (typeof content === "string") {
        	this.textContent = content;
        } else {
        	this.insert(content);
        }
    };
    
    Element.prototype.empty = function ( ) {
        this.removeEvents();
        this.textContent = "";
    };
    
    Element.prototype.remove = function ( ) {
        this.removeEvents();
        this.parentNode.removeChild(this);
    };
    
    Element.prototype.insert = function ( content, position ) {
        if (position === 1 || (typeof position === "string" && position === "first")) {
           if (typeof content === "string") {
                var c = $.make(content);
                var i = 0, len = c.length;
                while (i < len) {
                    this.insertBefore(c[i], this.firstElementChild);
                    i++;
                }
            } else {
                var i = 0, len = content.length;
                while (i < len) {
                    this.insertBefore(content[i], this.firstElementChild);
                    i++;
                }
            }
        } else if (!position || (typeof position === "string" && position === "last")) {
           if (typeof content === "string") {
                  var c = $.make(content);
                  var i = 0, len = c.length;
                  while (i < len) {
                    this.appendChild(c[i]);
                    i++;
                  }
              } else {
                  var i = 0, len = content.length;
                  while (i < len) {
                    this.appendChild(content[i]);
                    i++;
                  }
              }
        } else {
            var kids = this.children(el);
            if (typeof kids === "undefined") {
                if (typeof content === "string") {
                     var c = $.make(content);
                     var i = 0, len = c.length;
                     while (i < len) {
                        this.appendChild(c[i]);
                        i++;
                     }
                 } else {
                      var i = 0, len = content.length;
                      while (i < len) {
                         this.appendChild(content[i]);
                         i++;
                      }
                 } 
            } else {
                if (typeof content === "string") {
                    var c = $.make(content);
                    var i = 0, len = c.length;
                    while (i < len) {
                        this.insertBefore(c[i], this.children[position - 1]);
                        i++;
                    }
                } else {
                    var i = 0, len = content.length;
                    while (i < len) {
                        this.insertBefore(content[i], this.children[position - 1]);
                        i++;
                    }
                }
            }
        }
        return this;
    };
    
    Element.prototype.before = function ( content ) {
        if (content.constructor === Array) {
           var len = content.length;
           var i = 0; 
           while (i < len) {
               this.parentNode.insertBefore(content[i], this);
               i++;
           }
        } else {
           this.parentNode.insertBefore(content, this);
        }
    };
    
    Element.prototype.after = function ( content ) {
        var parent = this.parentNode;
        if (content.constructor === Array) {
            var i = 0, len = content.length;
            while (i < len) {
                if (this === parent.lastChild) {
                    parent.appendChild(content[i]);
                } else {
                    parent.insertBefore(content[i],this.nextSibling);
                }
                i++;
            }
        } else {
            if (content === this.lastChild) {
                parent.appendChild(content);
            } else {
                parent.insertBefore(content, this.next());
            }
        }
    };
    
    Element.prototype.hasClass = function ( className ) {
        return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(this.className);
    };
    
    Element.prototype.addClass = function ( className ) {
        if (!this.hasClass(className)) {
            this.className = [this.className, className].join(' ').replace(/^\s*|\s*$/g, "");
        }
    };
    
    Element.prototype.removeClass = function ( className ) {
        if (this.hasClass(className)) {
            var currentClasses = this.className;
            this.className = currentClasses.replace(new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)', 'g'), ' ').replace(/^\s*|\s*$/g, "");
        }
    };
    
    Element.prototype.toggleClass = function ( firstClassName, secondClassName ) {
            if (!secondClassName) {
                if (!this.hasClass(firstClassName)) {
                    this.addClass(firstClassName);
                } else {
                    this.removeClass(firstClassName);
                }
            } else if (secondClassName) {
                if (!this.hasClass(firstClassName)) {
                    this.addClass(firstClassName);
                    this.removeClass(secondClassName);
            } else {
                this.removeClass(firstClassName);
                this.addClass(secondClassName);
            }
        }
    };
    
    $.style = function ( element, property ) {
        return document.defaultView.getComputedStyle(element, null).getPropertyValue(property.toLowerCase());
    };
    $.getStyle = $.style;
    
    Element.prototype.css = function ( styles, replace ) {
        if (replace) {
            this.style.cssText = styles;
            return this;
        } else {
            this.style.cssText += ";" + styles;
            return this;
        }
    };
    
    Element.prototype.bind = function( event, callback ) {
        this.addEventListener(event, callback, false);
    };
    
    Element.prototype.unbind = function( event, callback ) {
        this.removeEventListener( event, callback, false );
    };
    
	Element.prototype.removeEvents = function ( ) {
		var i = 0, len = $.events.length;
		while (i < len) {
			this[$.events[i]] = null;
			i++;
		}
	};
	
    $.events = ['onmousedown', 'onmouseup', 'onmouseover', 'onmouseout', 'onclick', 'onmousemove', 'ondblclick', 'onerror', 'onresize', 'onscroll', 'onkeydown', 'onkeyup', 'onkeypress', 'onchange', 'onsubmit', 'onload', 'ontouchstart', 'ontouchmove', 'ontouchend', 'ontouchcancel', 'ongesturestart', 'ongesturechange', 'ongestureend', 'onorientationchange'];
    
    Element.prototype.delegate = function( selector, event, callback ) {
		this.bind(event, function(e) {
			var target = e.target;
			var elem = $(selector);
			if (!elem.length) {
				if (elem.isEqualNode(target)) {
					callback.call(this, {});
				}
			} else {
				elem.forEach(function(p) {
					if (p.isEqualNode(target)) {
						callback.call(this, {});
					} 
				});
			}
		});
	};
	
	$.loadEvent = function ( F ) {
		var oldonload = window.onload;
		if (typeof window.onload !== 'function') {
		   window.onload = F;
		} else {
		   window.onload = function () {
			  oldonload();
			  F();
		   };
		}
	};
	
    $.ready = function ( callback ) {
        document.addEventListener("DOMContentLoaded", callback, null);
    };
    
	Element.prototype.xhr = function ( url, options ) {
    	var o = options ? options : {};
		if (!!options) {
			if (!!options.successCallback) {
				o.callback = options.successCallback;
			}
		}
		var that   = this,
			request    = new XMLHttpRequest(),
			method = o.method || 'get',
			async  = o.async || false,           
			params = o.data || null,
			i = 0;
		request.queryString = params;
		request.open(method, url, async);
 
		if (o.headers) {
			for (; i<o.headers.length; i++) {
			  request.setRequestHeader(o.headers[i].name, o.headers[i].value);
			}
		}
		request.handleResp = (o.callback != null) ? o.callback : function() { 
			that.insert(this.responseText); 
		}; 
		function hdl(){ 
			if(request.status===0 || request.status==200 && request.readyState==4) { 	
				$.responseText = request.responseText;
				request.handleResp(); 
			} else {
				options.errorCallback();
			}
		}
		if(async) req.onreadystatechange = hdl;
		request.send(params);
		if(!async) hdl();
		return this;
    };
    
     Element.prototype.xhrjson = function ( url, options ) {
        if (options === "undefined") {
            return this;
        }
        var c = options.callback;
        if (typeof c != 'function') {
            c = function (x) {
                return x;
            };
        }
        var callback = function () {
            var o = eval('(' + this.responseText + ')');
            for (var prop in o) {
                $(options[prop]).fill(c(o[prop]));
            }
        };
        options.successCallback = callback;
        this.xhr(url, options);
        return this;
    };
    
	$.extend = function(obj, prop) {
	    if (!prop) {
		    prop = obj;
		    obj = this;
	    }
	    for (var i in prop) {
		    obj[i] = prop[i];
		}
		return obj;
	};
	
    $.hideURLbar = function() {
        window.scrollTo(0, 1);
    }; 
    
    $.importScript = function ( url ) {
    	var script = document.createElement("script");
    	script.setAttribute("type", "text/javascript");
    	script.setAttribute("src", url);
        $("body").appendChild(script);
    };
    
	$.extend({
    	iphone : /iphone/i.test(navigator.userAgent),
    	ipad : /ipad/i.test(navigator.userAgent),
    	ipod : /ipod/i.test(navigator.userAgent),
    	android : /android/i.test(navigator.userAgent),
    	webos : /weblos/i.test(navigator.userAgent),
    	blackberry : /blackberry/i.test(navigator.userAgent),
    	online :  navigator.onLine,
    	standalone : navigator.standalone
    });
    
	window.addEventListener("orientationchange", function() {
		if (window.orientation === 0 || window.orientation === 180) {
				$("body").removeClass("landscape");
				$("body").addClass("portrait");
				console.log($("body").className);
			$.hideURLbar();
		} else {
				$("body").removeClass("portrait");
				$("body").addClass("landscape");
				console.log($("body").className);
			$.hideURLbar();
		}
	}, false);
    
    // Make the ChocolateChip $() method available globally.
    window.$ = $;
    /* If, for whatever reason, you don't want to use $, you can define your own alias in the following manner:
    window.bubba = $;
    Then you can use it like this:
    bubba.ready(function() {
    	bubba("#anouncement").css("color: red");
    	bubba("li").forEach(function(item) {
    		item.bind("touchstart", function() {
    			item.addClass("touched");
    		});
    	});
    });
    NOTE: ChocolateChip will continue to use $ internally, and any external scripts that use $ will still work with your alias. Be aware, if you do this, you will need to update this alias each time you change to a different version of the ChocolateChip.js file.
    */
    // Backward compatibility for earlier versions of ChocolateChip.
    // This method's functionality was merged into $();
    window.$$ = $;
})(); 
