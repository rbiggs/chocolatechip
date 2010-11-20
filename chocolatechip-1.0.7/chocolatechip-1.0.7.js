/** 
* 
||======================================================================||        
||                                                            _         ||       cZ8D) 
||   ___  _                   _        _           ___  _    (_)        ||      (O) /8\ 
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

    var $ = function ( selector, context ) {
    	if (!!context) {
    		if (typeof context === "string") {
				return document.querySelector(context + " " + selector);
    		} else if (context.nodeType === 1) {
    			return context.querySelector(selector);
    		} 
    	} else {
    		return document.querySelector(selector);
    	}
		return document.querySelector(selector);
	};
	
    $.extend = function(obj, properties) {
		Object.keys(properties).forEach(function(prop) {
       		if (properties.hasOwnProperty(prop)) {
       			Object.defineProperty(obj, prop, {
       				value: properties[prop],
					writable: true,
					enumerable: false,
					configurable: true
       			});
       		}
       	});
	};
	
	$.extend($, {
		version : "1.0.7",
		
		collectionToArray : function ( collection ) {
			var array = [];
			var i = 0, len = collection.length;
			while ( i < len ) {
				array[i] = collection[i];
				i++;
			}
			return array;
		},
		
		$$ : function ( selector, context ) {
			if (!!context) {
				if (typeof context === "string") {
					return $.collectionToArray(document.querySelectorAll(context + " " + selector));
				} else if (context.nodeType === 1){
					return $.collectionToArray(context.querySelectorAll(selector));
				}
			} else {
				return $.collectionToArray(document.querySelectorAll(selector));
			}
		}
    });
    
	$.extend(HTMLElement.prototype, {
		previous : function ( ) {
			return this.previousElementSibling;
		},
		
		next : function ( ) {
			return this.nextElementSibling;
		},
		
		first : function ( ) {
			return this.firstElementChild;
		},
		
		last : function ( ) {
			return this.lastElementChild;
		},
		
		ancestorByTag : function ( selector ) {
			var p = this.parentNode;
			if (!p) {
				return false;
			}
			if (p.tagName.toLowerCase() == selector) {
				return p;
			} else {
				return p.ancestorByTag(selector);
			}
		},
		
		ancestorByClass : function ( selector ) {
			var p = this.parentNode;
			if (!p) {
				return false;
			}
			if (p.hasClass(selector)) {
				return p;
			} else {
				return p.ancestorByClass(selector);
			}
		},
		
		ancestorByPosition : function ( position ) {
			position = position || 1;
			var ancestor = this.parentNode;
            for (var i = 1; i < position; i++) {
            	if (ancestor.nodeName === "BODY") {
            		return ancestor;
            	} else {
					if (ancestor != null) {
						ancestor = ancestor.parentNode;
					}
				}
            }
            return ancestor;
		}
    });
    
	$.extend($, {
		make : function ( HTMLString ) {
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
		},
		
		replace : function ( newElem, oldElem ) {
			 oldElem.parentNode.replaceChild(newElem, oldElem);
		}
    });
    
	$.extend(HTMLElement.prototype, {
		empty : function ( ) {
			this.removeEvents();
			this.textContent = "";
		},
		
		clone : function ( value ) {
			if (value === true || !value) {
				return this.cloneNode(true);
			} else {
				return this.cloneNode(false);
			}
		},
		
		wrap : function ( string ) {
			var tempNode = $.make(string);
			tempNode = tempNode[0];
			var whichClone = this.clone(true);
			tempNode.appendChild(whichClone);
			this.after(tempNode, this);
			this.remove(this); 
		}
    });
    
	$.extend(HTMLElement.prototype, {
		unwrap : function ( ) {
			if (this.parentNode.nodeName === "BODY") {
				return false;
			}
			var element = this.cloneNode(true);
			$.replace(element, this.parentNode);
		},
		
		text : function ( value ) {
			if (!!value) {
				this.innerText = value;
			} else {
				return this.innerText;
			}
		},
		
		fill : function ( content ) {
			this.empty();
			if (typeof content === "string") {
				this.textContent = content;
			} else {
				this.insert(content);
			}
		},
		
		empty : function ( ) {
			this.removeEvents();
			this.textContent = "";
		},
		
		remove : function ( ) {
			this.removeEvents();
			this.parentNode.removeChild(this);
		},
		
		insert : function ( content, position ) {
			var c = "";
			if (typeof content === "string") {
				c = $.make(content);
			} else if (content.nodeType === 1) {
				c = [];
				c.push(content);
			} else {
				c = content;
			}
			var i = 0;
			var len = c.length;
			if (!position || position > (this.children.length + 1) || position === "last") {
				while (i < len) {
					this.appendChild(c[i]);
					i++;
				}
			} else if (position === 1 || position === "first") {
				while (i < len) {
					this.insertBefore(c[i], this.firstElementChild);
					i++;
				}
			} else {
				while (i < len) {
					this.insertBefore(c[i], this.children[position - 1]);
					i++;
				}
			}
		},
		
		before : function ( content ) {
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
		},
		
		after : function ( content ) {
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
		},
		
		hasClass : function ( className ) {
			return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(this.className);
		},
		
		addClass : function ( className ) {
			if (!this.hasClass(className)) {
				this.className = [this.className, className].join(' ').replace(/^\s*|\s*$/g, "");
			}
		},
		
		removeClass : function ( className ) {
			if (this.hasClass(className)) {
				var currentClasses = this.className;
				this.className = currentClasses.replace(new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)', 'g'), ' ').replace(/^\s*|\s*$/g, "");
			}
		},
		
		toggleClass : function ( firstClassName, secondClassName ) {
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
		}
    });
    
	$.extend($, {
		style : function ( element, property ) {
			return document.defaultView.getComputedStyle(element, null).getPropertyValue(property.toLowerCase());
		}
    });
    
    $.extend(String.prototype, {
    	
		capitalize : function ( ) {
			var str = this;
			return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
		},
		
		capitalizeAll : function ( ) {
			var str = this.split(" ");
			newstr = [];
			newstr.forEach(function(item) {
				newstr.push(item.capitalize());
			});
			return newstr.join(" ");
		}
    });
    
	$.extend(HTMLElement.prototype, {
		css : function ( styles, replace ) {
			if (replace) {
				this.style.cssText = styles;
				return this;
			} else {
				this.style.cssText += ";" + styles;
				return this;
			}
		},
	   
		bind : function( event, callback ) {
			this.addEventListener(event, callback, false);
		},
		
		unbind : function( event, callback ) {
			this.removeEventListener( event, callback, false );
		},
	  
		removeEvents : function ( ) {
			var i = 0, len = $.events.length;
			while (i < len) {
				this[$.events[i]] = null;
				i++;
			}
		},
		
		delegate : function ( selector, event, callback ) {
			this.bind(event, function(e) {
				var target = e.target;
				$$(selector).forEach(function(element) {
					if (element.isEqualNode(target)) {
						callback.call(this, target);
					} 
				});
			});
		},
		
		trigger : function ( event ) {
			if( document.createEvent ) {
			  var evtObj = document.createEvent('Events');
			  evtObj.initEvent(event, true, false);
			  this.dispatchEvent(evtObj);
			}
		},
		
		anim : function ( options, duration, easing ) {
			var value = "-webkit-transition: all " + (duration + " " || ".5s ") + easing + ";" || "" + ";";
			for (prop in options) {
				value += prop + ":" + options[prop] + ";";
			}
			this.css(value);
		}
	});
	$.extend($, {
		
		delay : function ( fnc, time ) {
			var argv = Array.prototype.slice.call(arguments, 2);
    		return setTimeout(function() { 
    			return fnc.apply(fnc, argv); 
    		}, time);
		},
		
		defer : function ( fnc ) {
			return $.delay.apply($, [fnc, 1].concat(Array.prototype.slice.call(arguments, 1)));
		},
		
		enclose : function(func, enclosure) {
		  	return function() {
				var args = [func].concat(Array.prototype.slice.call(arguments));
				return enclosure.apply(enclosure, args);
		  	};
		},
		
		compose : function() {
		  	var funcs = Array.prototype.slice.call(arguments);
		  	return function() {
				var args = Array.prototype.slice.call(arguments);
				for (var i=funcs.length-1; i >= 0; i--) {
			  		args = [funcs[i].apply(this, args)];
				}
				return args[0];
		  	};
		},
		
		events : ['onmousedown', 'onmouseup', 'onmouseover', 'onmouseout', 'onclick', 'onmousemove', 'ondblclick', 'onerror', 'onresize', 'onscroll', 'onkeydown', 'onkeyup', 'onkeypress', 'onchange', 'onsubmit', 'onload', 'ontouchstart', 'ontouchmove', 'ontouchend', 'ontouchcancel', 'ongesturestart', 'ongesturechange', 'ongestureend', 'onorientationchange'],
		
		loadEvent : function ( F ) {
			var oldonload = window.onload;
			if (typeof window.onload !== 'function') {
			   window.onload = F;
			} else {
			   window.onload = function () {
				  oldonload();
				  F();
			   };
			}
		},
		
		ready : function ( callback ) {
			document.addEventListener("DOMContentLoaded", callback, false);
		},
		
		hideURLbar : function() {
			window.scrollTo(0, 1);
		},
		
		importScript : function ( url ) {
			var script = document.createElement("script");
			script.setAttribute("type", "text/javascript");
			script.setAttribute("src", url);
			$("head").appendChild(script);
		},
	
    	iphone : /iphone/i.test(navigator.userAgent),
    	ipad : /ipad/i.test(navigator.userAgent),
    	ipod : /ipod/i.test(navigator.userAgent),
    	android : /android/i.test(navigator.userAgent),
    	webos : /webos/i.test(navigator.userAgent),
    	blackberry : /blackberry/i.test(navigator.userAgent),
    	online :  navigator.onLine,
    	standalone : navigator.standalone
    });
    
	$.extend(HTMLElement.prototype, {
		xhr : function ( url, options ) {
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
		},
		
		xhrjson : function ( url, options ) {
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
		}
    });

	$.extend($, {	
		
		jsmtCache : {},
		
        template : function tmpl(str, data) {
        	var err = "";
        	try {
				var fn = !/\W/.test(str) ?
				$.jsmtCache[str] = $.jsmtCache[str] ||
				$.template(document.getElementById(str).innerHTML) : 
				new Function("obj", "var p = [];" +
				"with (obj) { p.push('" +
				str.replace(/[\r\t\n]/g, " ")
				.replace(/'(?=[^#]*#>)/g, "\t")
				.split("'").join("\\'")
				.split("\t").join("'")
				.replace(/<%=(.+?)%>/g, "',$1,'")
				.split("<%").join("');")
				.split("%>").join("p.push('")
				+ "');}return p.join('');");
				return data ? fn(data) : fn;
			} catch (e) {
				err = e.message;
			}
			return err.htmlEncode();
		}
	});
	
	window.addEventListener("orientationchange", function() {
		if (window.orientation === 0 || window.orientation === 180) {
				$("body").removeClass("landscape");
				$("body").addClass("portrait");
			$.hideURLbar();
		} else {
				$("body").removeClass("portrait");
				$("body").addClass("landscape");
			$.hideURLbar();
		}
	}, false);
    if ((!window.$) && (!window.$$)) {
    	window.$ = $;
    	window.$$ = $.$$;
    } else {
    	window.__$ = $;
    	window.__$$ = $.$$;
    }
})(); 

if (!Function.prototype.bind) {
  	Function.prototype.bind = function(func, obj) {
    	var args = Array.prototype.slice.call(arguments, 2);
    	return function() {
      	return func.apply(obj || {}, args.concat(Array.prototype.slice.call(arguments)));
    	};
  	};
}