/*        
    pO)     
   6  /\
     /MM\
   /MMMMMM\
  /MMMMMMMM\
(((MMMMMMMM)))
 \:~==++==~:/    
       
ChocolateChip.js: tiny but delicious
A JavaScript library for mobile Web app development, providing the functionality 
necessary for creating professional HTML5/CSS3-based Web apps.

Copyright 2011 Robert Biggs: www.choclatechip-mobile.net
License: BSD
Version 1.1.1

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
		
		version : "1.1.1",
		
		
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
		
		ancestor : function( selector ) {
			var idCheck = new RegExp("^#");
			var classCheck = new RegExp("^.");
			var p = this.parentNode;
			if (!p) {
				return false;
			}
			if (typeof selector === "string") {
				selector.trim();
			}
			if (typeof selector === "number") {
				position = selector || 1;
				 for (var i = 1; i < position; i++) {
					 if (p.nodeName === "HTML") {
						 return p;
					 } else {
						 if (p != null) {
							 p = p.parentNode;
						 }
					 }
				 }	
				 return p;
			} else if (selector.substr(0,1) === "." ) {
				var newSelector = selector.split(".")[1];
				if (p.nodeName === "BODY") {
					return false;
				}
				if (p.hasClass(newSelector)) {
					return p;
				} else {
					return p.ancestor(selector);
				}
			} else if (selector.substr(0,1) === "#" ) {
				var newSelector = selector.split("#")[1];
				if (p.getAttribute("id") === newSelector) {
					return p;
				} else {
					return p.ancestor(selector);
				}
			} else { 
			   if (p.tagName.toLowerCase() === selector) {
				   return p;
			   } else {
				   return p.ancestor(selector);
			   } 
			}
		},		
		
		ancestorByTag : function ( selector ) {
			return this.ancestor(selector);
		},
		
		ancestorByClass : function ( selector ) {
			selector = "." + selector;
			return this.ancestor(selector);
		},
		
		ancestorByPosition : function ( position ) {
			return this.ancestor(position);
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
		},
		
		getTop : function() {
			var element = this;
			var pos = 0;
			while (element.offsetParent) {
				pos += element.offsetTop;
				element = element.offsetParent;
			}
			pos = pos + document.body.offsetTop;
			return pos;
		},
		
		getLeft : function(element) {
			var element = this;
			var pos = 0;
			while (element.offsetParent) {
				pos += element.offsetLeft;
				element = element.offsetParent;
			}
			pos = pos + document.body.offsetLeft;
			return pos;
		},
		
		css : function ( property, value ) {
			if (/{/.test(property) && /}/.test(property) && !value) {
				this.style.cssText += property.substring(1, property.length - 1);
			}
			if (!value) {
				return document.defaultView.getComputedStyle(this, null).getPropertyValue(property.toLowerCase());
			} else {
				this.style.cssText += property + ":" + value + ";";
				return this;
			} 
		}
    });
    
    $.extend(String.prototype, {
    	
		capitalize : function ( ) {
			var str = this;
			return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
		},
		
		capitalizeAll : function ( ) {
			str = this.split(" ");
			newstr = [];
			str.forEach(function(item) {
				newstr.push(item.capitalize());
			});
			return newstr.join(" ");
		}
    });
    
	$.extend(HTMLElement.prototype, {
		
		
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
			this.addEventListener(event, function(e) {
				var target = e.target;
				$$(selector, this).forEach(function(element) {
					if (element.isEqualNode(target)) {
						callback.apply(this, arguments);
					} else {
						try {
						   var ancestor = target.ancestor(selector);
						   if (element.isEqualNode(ancestor)) {
						   		e.stopPropagation();
						   		callback.call(this, ancestor);
						    }
						} catch(e) {}
					}
				});
			}, false);
		},
		
		trigger : function ( event ) {
			if( document.createEvent ) {
			  var evtObj = document.createEvent('Events');
			  evtObj.initEvent(event, true, false);
			  this.dispatchEvent(evtObj);
			}
		},
		
		anim : function ( options, duration, easing ) {
			var onEnd = null;
			var value = "-webkit-transition: all " + (duration + " " || ".5s ") + easing + ";" || "" + ";";
			for (prop in options) {
				if (prop === "onend") {
					onEnd = options[prop];
					this.bind("webkitTransitionEnd", function() {
						onEnd();
					});
				} else {
					value += prop + ":" + options[prop] + ";";
				}
			}
			this.css("{" + value + "}");
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
		
		DOMReadyList : [],
		
		executeWhenDOMReady : function ( ) {
			var listLen = $.DOMReadyList.length;
			var i = 0;
			while (i < listLen) {
				$.DOMReadyList[i]();
				i++;
			}
			$.DOMReadyList = null;
			document.removeEventListener('DOMContentLoaded', $.executeWhenDOMReady, false);
		},
		
		ready : function ( callback ) {
			if ($.DOMReadyList.length == 0) {
				document.addEventListener('DOMContentLoaded', $.executeWhenDOMReady, false);
			}
	
			$.DOMReadyList.push(callback);
		},
		
		UIHideURLbar : function() {
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
    	touchEnabled : ($.iphone || $.ipod || $.ipad || $.android),
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
		},
		
		data : function ( key, value ) {
			if (!!document.documentElement.dataset) {
				if (!value) {
					return this.dataset[key];
				} else {
					this.dataset[key] = value;
				}
			// Fallback for earlier versions of Webkit:
			} else {
				if (!value) {
					return this.getAttribute("data-" + key);
				} else {
					this.setAttribute("data-" + key, value);
				}
			}
		},
		
		removeData : function ( key ) {
			if (!!document.documentElement.dataset) {
				this.dataset[key] = null;
			// Fallback for earlier versions of Webkit:
			} else {
				this.removeAttribute("data-" + key);
			}
		}
    });

	$.extend($, {	
		
		setLocalStorage : function ( key, value ) {
			try {
				localStorage.setItem(key, value);
			} catch(e) {}
		},
			
		getLocalStorage : function ( key ) {
			try {
				localStorage.getItem(key);
			} catch(e) {}
		},
			
		deleteLocalStorage : function ( key ) {
			try {
				localStorage.removeItem(key);
			} catch(e) {}
		},
		
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
		}
	});
    
    if (window.$ === undefined) {
    	window.$ = $;
    	window.$$ = $.$$;
    } else {
    	window.__$ = $;
    	window.__$$ = $.$$;
    }
})(); 
$.ready(function() {

	if (window.innerHeight > window.innerWidth) {
		$("body").className="portrait";
		$.UIHideURLbar();
	} else {
		$("body").className="landscape";
		$.UIHideURLbar();
	}
	document.addEventListener("orientationchange", function() {
		if (window.orientation === 0 || window.orientation === 180) {
			$("body").removeClass("landscape");
			$("body").addClass("portrait");
			$.UIHideURLbar();
		} else {
			$("body").removeClass("portrait");
			$("body").addClass("landscape");
			$.UIHideURLbar();
		}
		$.UIHideURLbar();
	}, false);
	window.addEventListener("resize", function() {
		if (window.innerHeight > window.innerWidth) {
			$("body").removeClass("landscape");
			$("body").addClass("portrait");
			$.UIHideURLbar();
		} else {
			$("body").removeClass("portrait");
			$("body").addClass("landscape");
			$.UIHideURLbar();
		}
	}, false);
});

if (!Function.prototype.bind) {
  	Function.prototype.bind = function(func, obj) {
    	var args = Array.prototype.slice.call(arguments, 2);
    	return function() {
      	return func.apply(obj || {}, args.concat(Array.prototype.slice.call(arguments)));
    	};
  	};
}
