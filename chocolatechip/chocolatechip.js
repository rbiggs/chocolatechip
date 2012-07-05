/*      
    pO\     
   6  /\
     /OO\
    /OOOO\
  /OOOOOOOO\
 ((OOOOOOOO))
  \:~=++=~:/ 
      
ChocolateChip.js: It's tiny but delicious
A JavaScript library for mobile Web app development.
 
Copyright 2011 Robert Biggs: www.choclatechip-ui.com
License: BSD
Version 1.3.8
 
*/
 
(function() {
   var $ = function ( selector, context ) {
      if (typeof selector === 'undefined') {
         return document;
      }
      if (selector === window || selector === document) {
         return selector;
      }
      if (typeof selector === 'object' && selector.nodeType === 1) {
         return selector;
      }
      if (!!context) {
         if (typeof context === 'string') {
            return document.querySelector(context + ' ' + selector);
         } else if (context.nodeType === 1) {
            return context.querySelector(selector);
         } 
      } else if (typeof selector === 'function') {
         $.ready(function() {
            return selector.call(selector);
         });
      } else {
         return document.querySelector(selector);
      }
      return this;
   };
   
	$.extend = function(obj, prop) {
		if (Object.keys in window) {
			Object.keys(prop).forEach(function(p) {
				if (prop.hasOwnProperty(p)) {
					Object.defineProperty(obj, p, {
						value: prop[p],
						writable: true,
						enumerable: false,
						configurable: true
					});
				}
			});
		} else {
			if (!prop) {
				prop = obj;
				obj = this;
			}
			for (var i in prop) {
				obj[i] = prop[i];
			}
			return obj;
		}
		return this;
	};
   
   $.extend(Array.prototype, {
      each : Array.prototype.forEach,
      
      eq : function ( index ) {
         return index === -1 ? this.slice(index)[0] : this.slice(index, + index + 1)[0];
      },
      
      is : function ( arg ) {
         var items = [];
         this.each(function(item) {
            if (item.is(arg)) items.push(item);
         });
         if (items.length) return items;
         else return false;
      },
      
      not : function ( arg ) {
         var items = [];
         this.each(function(item) {
            if (!item.is(arg)) items.push(item);
         });
         if (items.length) return items;
         else return false;
      },
      
      has : function ( arg ) {
         var items = [];
         this.each(function(item) {
            if (item.has(arg)) items.push(item);
         });
         if (items.length) return items;
         else return false;
      },
      
      hasNot : function ( arg ) {
         var items = [];
         this.each(function(item) {
            if (item.hasNot(arg)) items.push(item);
         });
         if (items.length) return items;
         else return false;
      },
      
      prependTo : function ( selector ) {
         this.reverse();
         this.each(function(item) {
            $(selector).prepend(item);
         });
         return $(selector);
      },
      
      appendTo : function ( selector ) {
         this.each(function(item) {
            $(selector).append(item);
         });
         return $(selector);
      }
   });
   
   $.extend({
 
      version : '1.3.8',
      
      libraryName : 'ChocolateChip',
      
      slice : Array.prototype.slice,
      
      $$ : function ( selector, context ) {
         if (!!context) {
            if (typeof context === 'string') {
               return $.slice.apply(document.querySelectorAll(context + ' ' + selector));
            } else if (context.nodeType === 1) {
               return $.slice.apply(context.querySelectorAll(selector));
            }
         } else {
            return $.slice.apply(document.querySelectorAll(selector));
         }
      },
      
      make : function ( HTMLString ) {
         var temp = document.createElement('div');
         temp.innerHTML = HTMLString;
         return $.slice.apply(temp.childNodes);
      },
      
      html : function ( HTMLString ) {
         return this.make(HTMLString);
      },
       
      replace : function ( newElem, oldElem ) {
          oldElem.parentNode.replaceChild(newElem, oldElem);
      },
      
      require : function( src, callback ) {
         callback = callback || $.noop;
         var script = document.createElement('script');
         script.setAttribute('type', 'text/javascript');
         script.setAttribute('src', src);
         script.onload = script.onreadystatechange = function() {
            if (!script.readyState || script.readyState === 'complete') {
               callback.apply(callback, arguments);
            }
         };
         $('head').insert(script, 'last');
      },
       
      processJSON : function ( data ) {
         var script = document.createElement('script');
         script.setAttribute('type', 'text/javascript');
         var scriptID = $.UIUuid();
         script.setAttribute('id', scriptID);
         script.insert(data);
         $('head').insert(script, 'last');
         $.defer(function() {
            var id = '#' + scriptID;
            $(id).remove();
         });
      },
      
      noop : function ( ) { },
      
      concat : function ( args ) {
         return args instanceof Array ? args.join('') : $.slice.apply(arguments).join('');
      },
      
      isArray : function ( array ) {
         return Array.isArray( array );
      },
      
      isFunction : function ( fn ) {
         return Object.prototype.toString.call(fn) === '[object Function]';
      },
      
      isObject : function ( obj ) {
         return Object.prototype.toString.call(obj) === '[object Object]';
      },
      
      uuidNum : function ( ) {
         return ((1 + Math.random()) * 0x100000000);
      },
      
      makeUuid : function ( ) {
         return $.concat(["chch_",$.uuid]);
      },
      
      uuid : 0,
      
      chch_cache : {}
   });   
   
   $.uuid = $.uuidNum();
   
   $.chch_cache.data = {};
   
   $.chch_cache.events = {};
   
   $.extend($.chch_cache.data, {
   
      keys : [],
      
      values : [],
      
      set : function ( key, data ) {
         if (this.keys.indexOf(key) >= 0) {
            this.values[this.keys.indexOf(key)] = data;
         } else {
            this.keys.push(key);
            this.values.push(data);
         }
      },
      
      get : function ( key ) {
         return this.values[this.keys.indexOf(key)];
      },
      
      hasKey : function ( key ) {
         if (this.keys.indexOf(key) >= 0) return true;
         else return false;
      },
      
      hasData : function ( key ) {
         var idx = this.keys.indexOf(key);
         if (this.values[idx]) return true;
         else return false;
      },
      
      _delete : function ( key ) {
         var idx = this.keys.indexOf(key);
         this.keys[idx] = null;
         this.keys.splice(idx, idx + 1);
         this.values[idx] = null;
         this.values.splice(idx, idx + 1);
      }
   });
   
   $.extend($.chch_cache.events, {
   
      keys : [],
      
      values : [],
      
      set : function ( element, event, callback, capturePhase ) {
         var key;
         var eventValues;
         var whichCallback;
         var length = this.values.length > 0 ? this.values.length - 1 : 0;
         var values;
         if (!!element.id) {
            key = element.id;
         } else {
            ++$.uuid;
            key = $.makeUuid();
            element.setAttribute("id", key);
         }
         if (this.keys.indexOf(key) >= 0) {
            this.values[length].push([]);
            values = this.values[length];
            values.push(event);
            values.push(callback);
            values.push(capturePhase);
            element.addEventListener(event,callback,capturePhase);
         } else {
            this.keys.push(key);
            this.values.push([]);
            length = this.values.length-1;
            this.values[length].push([]);
            values = this.values[length];
            values[0].push(event);
            values[0].push(callback);
            values[0].push(capturePhase);
            element.addEventListener(event,callback,capturePhase);
         }
      },
      
      
      hasKey : function ( key ) {
         if (this.keys.indexOf(key) >= 0) return true;
         else return false;
      },
      
      _delete : function ( element, event, callback, capturePhase  ) {
         var idx = this.keys.indexOf(element);
         var nodeCache = this.keys;
         var nodeIdx = nodeCache[idx];
         var cache = this.values;
         var eventType = [];
         if (!element) {
            return;
         }
         if (typeof event === 'undefined') {
            cache[idx].each(function(item) {
               $("#"+element).removeEventListener(item[0], item[1], item[2]);
               $.chch_cache.events.keys.splice(idx, 1);
               cache[idx].splice(idx, 1);
            });
            cache.splice(idx, 1);
         }
         if (event && callback) {
            cache[idx].each(function(item) {
               if (item[0] === event) {
                  $('#'+element).removeEventListener(item[0], item[1], item[2]);
                  $.chch_cache.events.values.splice(idx, 1);
                  $.chch_cache.events.keys.splice(idx, 1);
               }
            });
         }
         if (event && typeof callback === 'undefined') {
            this.values[idx].each(function(item) {
               if (item[0] === event) {
                  $('#'+element).removeEventListener(item[0], item[1], item[2]);
                  $.chch_cache.events.values.splice(idx, 1);
                  $.chch_cache.events.keys.splice(idx, 1);
               }
            });
         }
      }
   });
   
   $.extend(Object.prototype, {
      each: function(callback) {
         for (key in this) {
            if(callback(key, this[key]) === false) { return this; }
         }
         return this;
      }
   });
   
   $.extend(HTMLElement.prototype, {
   
      cache : function ( data ) {
         if (!!data) {
            if (!!this.id) {
               $.chch_cache.data.set(this.id, data);
               return this;
            } else {
               ++$.uuid;
               this.setAttribute("id", $.makeUuid());
               $.chch_cache.data.set(this.id, data);
               return this;
            }
         } else {
            if (this.id) {
               if (!$.chch_cache.data.hasKey(this.id)) return false;
               return $.chch_cache.data.get(this.id);
            } else {
               return false;
            }
         }
      },
      
      uncache : function ( ) {
         var id = this.getAttribute('id');
         if (!$.chch_cache.data.hasKey(this.id)) {
            return this;
         }
         return $.chch_cache.data._delete(id);
      },
   
      find : function ( selector ) {
         return $(selector, this);
      },
      
      findAll : function ( selector ) {
         return $$(selector, this);
      },
          
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
      
      childElements : function ( selector ) {
         if (typeof selector === 'string') {
            return $.slice.apply(this.findAll(selector));
         } else {
            return $.slice.apply(this.children);
         }
      },
      
      kids : function( selector ) {
         return this.childElements(selector);
      },
      
      siblings: function(selector){
         var $this = this;
         var foundEls = [];
         if (!!selector) {
            $.slice.apply(this.parentNode.findAll(selector)).filter(function(el) { 
               if (el !== $this) {
                  foundEls.push(el); 
               }
            });
            return foundEls;
         } else {
            $.slice.apply(this.parentNode.children).filter(function(el) { 
               if (el !== $this) {
                  foundEls.push(el); 
               }
            });
            return foundEls;
         }
      },
    
      ancestor : function( selector ) {
         if (typeof selector === 'undefined') {
            return false;
         }
         var idCheck = new RegExp('^#');
         var classCheck = new RegExp('^.');
         var position = null;
         var newSelector = null;
         var p = this.parentNode;
         if (!p) {
            return false;
         }
         if (typeof selector === 'string') {
            selector.trim();
         }
         if (typeof selector === 'number') {
            position = selector || 1;
             for (var i = 1; i < position; i++) {
                if (p.nodeName === 'HTML') {
                   return p;
                } else {
                   if (p !== null) {
                      p = p.parentNode;
                   }
                }
             } 
             return p;
         } else if (selector.substr(0,1) === '.' ) {
            newSelector = selector.split('.')[1];
            if (p.nodeName === 'BODY') {
               return false;
            }
            if (p.hasClass(newSelector)) {
               return p;
            } else {
               return p.ancestor(selector);
            }
         } else if (selector.substr(0,1) === '#' ) {
            newSelector = selector.split('#')[1];
            if (p.getAttribute('id') === newSelector) {
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
      
      closest : this.ancestor,
      
      is : function ( arg ) {
         $this = this;
         if (typeof arg === 'string') {
            if (this.parentNode.findAll(arg).indexOf($this) >= 0) return this;
         } else if (typeof arg === 'function') {
            if (arg.call($this)) return this;
         } else if (arg.length) {
            if ($.slice.apply(arg).indexOf(this) !== -1) return this;
         } else if (arg.nodeType === 1) {
            if (this === arg) return this;
         } else {
            return false;
         }
      },
      
      not : function ( arg ) {
         if (!this.is(arg)) return this;
         else return false;
      },
      
      has : function ( arg ) {
         if (typeof arg === 'string') {
            if (this.find(arg)) {
               return this;
            }
         } else if (arg.nodeType === 1) {
            if ($.slice.apply(this.children).indexOf(arg)) {
               return this;
            }
         } else {
            return false;
         }
      },
      
      hasNot : function ( arg ) {
         if (!this.has(arg)) return this;
         else return false;
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
         return this;
      },
       
      unwrap : function ( ) {
         if (this.parentNode.nodeName === 'BODY') {
            return false;
         }
         var element = this.cloneNode(true);
         $.replace(element, this.parentNode);
         return this;
      },
       
      text : function ( value ) {
         if (!!value) {
            this.innerText = value;
            return this;
         } else {
            return this.innerText;
         }
      },
       
      fill : function ( content ) {
         this.empty();
         if (typeof content === 'string') {
            this.textContent = content;
         } else {
            this.insert(content);
         }
         return this;
      },
       
      empty : function ( ) {
         this.unbind();
         this.textContent = '';
         return this;
      },
       
      remove : function ( ) {
         this.unbind();
         this.uncache();
         this.parentNode.removeChild(this);
      },
       
      insert : function ( content, position ) {
         var c = '';
         if (typeof content === 'string') {
            c = $.make(content);
         } else if (content.nodeType === 1) {
            c = [];
            c.push(content);
         } else {
            c = content;
         }
         var i = 0;
         var len = c.length;
         if (!position || position > (this.children.length + 1) || position === 'last') {
            while (i < len) {
               this.appendChild(c[i]);
               i++;
            }
         } else if (position === 1 || position === 'first') {
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
         return this;
      },
      
      html : function ( content ) {
         this.empty().insert(content);
      },
      
      prepend : function ( content ) {
         if ($.isArray(content)) content.reverse();
         this.insert(content, 'first');
      },
      
      append : function ( content ) {
         this.insert(content, 'last');
      },
      
      before : function ( content ) {
         if (typeof content === 'string') {
            content = $.make(content);
         }
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
         return this;
      },
       
      after : function ( content ) {
         var parent = this.parentNode;
         if (typeof content === 'string') {
            content = $.make(content);
         }
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
            parent.appendChild(content);
         }
         return this;
      },
       
      hasClass : function ( className ) {
         return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(this.className);
      },
       
      addClass : function ( className ) {
         if (!this.hasClass(className)) {
            this.className = [this.className, className].join(' ').replace(/^\s*|\s*$/g, '');
            return this;
         }
      },
       
      removeClass : function ( className ) {
         if (this.hasClass(className)) {
            var currentClasses = this.className;
            this.className = currentClasses.replace(new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)', 'g'), ' ').replace(/^\s*|\s*$/g, '');
            return this;
         }
      },
       
      disable : function ( ) {
         this.addClass('disabled');
         this.css('{cursor: default;}');
         this.preventDefault();
         return this;
      },
       
      enable : function ( ) {
         this.removeClass('disabled');
         this.css('{cursor: pointer;}');
         return this;
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
         return this;
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
         element = this;
         var pos = 0;
         while (element.offsetParent) {
            pos += element.offsetLeft;
            element = element.offsetParent;
         }
         pos = pos + document.body.offsetLeft;
         return pos;
      },
       
      css : function ( property, value ) {
         if (property instanceof Object) {
            for (var key in property) {
               this.style[key] = property[key];
            }
         } else if (typeof property === 'string' && (/:/).test(property) && !value) {
            this.style.cssText += property;
         } else if (!value) {
            return document.defaultView.getComputedStyle(this, null).getPropertyValue(property.toLowerCase());
         } else if (value) {
            this.style.cssText += property + ':' + value + ';';
            return this;
         } else {
            return false;
         }
         return this;
      },
       
      bind : function( event, callback, capturePhase ) {
         capturePhase = capturePhase || false;
         $.chch_cache.events.set(this, event, callback, capturePhase);
         return this;
      },
         
      unbind : function( event, callback, capturePhase ) {
         if (!this.id || !$.chch_cache.events.hasKey(this.id)) {
            return this;
         }
         capturePhase = capturePhase || false;
         $.chch_cache.events._delete(this.id, event, callback, capturePhase);
         return this;
      },
       
      delegate : function ( selector, event, callback, capturePhase ) {
      	capturePhase = capturePhase || false;
         this.addEventListener(event, function(e) {
            var target = e.target;
            if (e.target.nodeType == 3) {
            	target = e.target.parentNode;
            }
            $.$$(selector, this).each(function(element) {
               if (element === target) {
                  callback.apply(this, arguments);
               } else {
                  try {
                     var ancestor = target.ancestor(selector);
                     if (element === ancestor) {
                        e.stopPropagation();
                        callback.call(this, ancestor);
                     }
                  } catch(err) {}
               }
            });
         }, capturePhase);
      },
       
      trigger : function ( event ) {
         if( document.createEvent ) {
           var evtObj = document.createEvent('Events');
           evtObj.initEvent(event, true, false);
           this.dispatchEvent(evtObj);
         }
      },
       
      anim : function ( options ) {
         var onEnd = null;
         var value = '-webkit-transition: all ' + (options.duration + ' ' || '.5s ') + (options.easing + ';') || 'linear;';
         for (var prop in options.values) {
            if (prop === 'onEnd') {
               onEnd = options.values[prop];
               this.bind('webkitTransitionEnd', onEnd());
            } else {
               value += prop + ':' + options.values[prop] + ';';
            }
         }
         this.css(value);
      },
      xhr : function ( url, options ) {
         var o = options ? options : {};
         var successCallback = null;
         var errorCallback = null;
         if (!!options) {
            if (!!options.successCallback || !!options.success) {
               successCallback = options.successCallback || options.success;
            }
         }
         var that = this,
            request     = new XMLHttpRequest(),
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
         request.handleResp = (successCallback !== null) ? successCallback : function() { 
            that.insert(this.responseText); 
         }; 
         function hdl(){ 
            if(request.status===0 || request.status==200 && request.readyState==4) {   
               $.responseText = request.responseText;
               request.handleResp(); 
            } else {
               if (!!options.errorCallback || !!options.error) {
                  var errorCallback = options.errorCallback || options.error;
                  errorCallback();
               }
            }
         }
         if(async) request.onreadystatechange = hdl;
         request.send(params);
         if(!async) hdl();
         return this;
      },
       
      xhrjson : function ( url, options ) {
            if (typeof options === 'undefined') {
                return this;
            }
            var c = options.successCallback;
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
            key = key.camelize();
            if (!value) {
               if (/\{/.test(value)) {
                  return JSON.parse(this.dataset[key]);
               } else {
                  return this.dataset[key];
               }
            } else {
               if (typeof value === 'object') {
                  this.dataset[key] = JSON.stringify(value);
               } else {
                  this.dataset[key] = value;
               }
            }
         // Fallback for earlier versions of Webkit:
         } else {
            if (!value) {
               if (/\{/.test(value)) {
                  return JSON.parse(this.getAttribute('data-' + key));
               } else {
                  return this.getAttribute('data-' + key);
               }
            } else {
               if (typeof value === 'object') {
                  this.setAttribute('data-' + key, JSON.stringify(value));
               } else {
                  this.setAttribute('data-' + key, value);
               }
            } 
         }
         return this;
      },
       
      removeData : function ( key ) {
         if (!!document.documentElement.dataset) {
            key = key.camelize();
            this.dataset[key] = null;
         // Fallback for earlier versions of Webkit:
         } else {
            this.removeAttribute('data-' + key);
         }
      },
 
      UICheckForOverflow : function (){
         var origOverflow = this.css('overflow');
         if ( !origOverflow || origOverflow === 'visible' ) {
            this.style.overflow = 'hidden';
         }
         var overflow = this.clientWidth < this.scrollWidth || 
            this.clientHeight < this.scrollHeight;
         this.css('overflow', origOverflow);
    
         return overflow;
      }      
   });
    
   $.extend(String.prototype, {
    
      capitalize : function ( ) {
         var str = this;
         return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
      },
       
      capitalizeAll : function ( ) {
         var str = this.split(' ');
         var newstr = [];
         str.each(function(item) {
            newstr.push(item.capitalize());
         });
         return newstr.join(' ');
      },
      camelize : function ( ) {
         return this.replace(/\-(.)/g, function(m, l){return l.toUpperCase();});
      },
      deCamelize : function ( ) {
         return this.replace(/([A-Z])/g, '-$1').toLowerCase();
      }
   });
    
    
   $.extend($, {
       
      delay : function ( fnc, time ) {
         fnc = fnc || $.noop;
         setTimeout(function() { 
            fnc.call(fnc); 
         }, time);
      },
       
      defer : function ( fnc ) {
         fnc = fnc || $.noop;
         return $.delay.apply($, [fnc, 1].concat($.slice.call(arguments, 1)));
      },
       
      enclose : function(func, enclosure) {
         return function() {
            var args = [func].concat($.slice.call(arguments));
            return enclosure.apply(enclosure, args);
         };
      },
       
      compose : function() {
         var funcs = $.slice.call(arguments);
         return function() {
            var args = $.slice.call(arguments);
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
      	 if (document.getElementsByTagName('body')[0]) {
      	 	callback();
      	 } else {
			 if ($.DOMReadyList.length === 0) {
				document.addEventListener('DOMContentLoaded', $.executeWhenDOMReady, false);
			 }
		
			 $.DOMReadyList.push(callback);
         }
      },
       
      UIHideURLbar : function() {
         window.scrollTo(0, 1);
      },
       
      importScript : $.require,
    
      iphone : /iphone/img.test(navigator.userAgent),
      ipad : /ipad/img.test(navigator.userAgent),
      ipod : /ipod/img.test(navigator.userAgent),
      ios : /ip(hone|od|ad)/img.test(navigator.userAgent),
      android : /android/img.test(navigator.userAgent),
      webos : /webos/img.test(navigator.userAgent),
      blackberry : /blackberry/img.test(navigator.userAgent),
      touchEnabled : ('createTouch' in document),
      online :  navigator.onLine,
      standalone : navigator.standalone,
      ios4 : navigator.userAgent.match(/OS 4/i),
      ios5 : navigator.userAgent.match(/OS 5/i),
      userAction : ($.touchEnabled ? 'touchstart' : 'click'),
      mobile : /mobile/img.test(navigator.userAgent),
      desktop : !(/mobile/img.test(navigator.userAgent)),
       
      localItem : function ( key, value ) {
         try {
            if (!value) {
               try {
                  value = localStorage.getItem(key);
                  if (value[0] === '{') {
                     value = JSON.parse(value);
                  }
                  return value;
               } catch(e) {}
            } 
            if (typeof value === 'object') {
               value = JSON.stringify(value);
            }
            localStorage.setItem(key, value);
         } catch(err) {
            if (e === 'QUOTA_EXCEEDED_ERR') {
               console.error('Quota exceeded for localStorage!');
            }
         } 
         return this;
      },
      deleteLocalItem : function ( key ) {
         try {
            localStorage.removeItem(key);
         } catch(e) {}
      },
      clearLocalItems : function ( ) {
         localStorage.clear();
      },
       
      templates : {},
       
      template : function(str, data) {
         if ($.ajaxStatus === null || $.ajaxStatus === false) {
            return data;
         }
         if ($.templates[str]) {
            str = $.templates[str];
         } else {
            str = str;
         }
         var tmpl = 'var p=[],print=function(){p.push.apply(p,arguments);};with(obj||{}){p.push(\''; 
         var regex1; 
         var regex2;
         if (/\{\{/.test(str) || (/$\{/).test(str)) {
            regex1 = /\$\{([\s\S]+?)\}/g;
            regex2 = /\{\{([\s\S]+?)\}\}/g;
         } else if (/\[\[/.test(str) || (/$\[/).test(str)) {
            regex1 = /\$\[([\s\S]+?)\]/g;
            regex2 = /\[\[([\s\S]+?)\]\]/g;
         } else if (/<%=/.test(str) || (/<%/).test(str)) {
            regex1 = /<%=([\s\S]+?)%>/g;
            regex2 = /<%([\s\S]+?)%>/g;
         }  
         tmpl +=
           str.replace(/\\/g, '\\\\')
             .replace(/'/g, "\\'")
             .replace(regex1, function(match, code) {
               return "'," + code.replace(/\\'/g, "'") + ",'";
             })
             .replace(regex2 || null, function(match, code) {
               return "');" + code.replace(/\\'/g, "'")
               .replace(/[\r\n\t]/g, ' ') + "p.push('";
             })
             .replace(/\r/g, '\\r')
             .replace(/\n/g, '\\n')
             .replace(/\t/g, '\\t') + "');} return p.join('');";
         var fn = new Function('obj', tmpl);
         return data ? fn(data) : fn;
      },
       
      UIUpdateOrientationChange : function ( ) {
         var body = $('body');
         if (window.innerWidth < window.innerHeight) {
            body.removeClass('landscape');
            body.addClass('portrait');
            $.UIHideURLbar();
         } else {
            body.removeClass('portrait');
            body.addClass('landscape');
            $.UIHideURLbar();
         }
         document.addEventListener('orientationchange', function() {
            if (window.orientation === 0 || window.orientation === 180) {
               body.removeClass('landscape');
               body.addClass('portrait');
               $.UIHideURLbar();
            } else {
               body.removeClass('portrait');
               body.addClass('landscape');
               $.UIHideURLbar();
            }
            $.UIHideURLbar();
         }, false);     
      },
       
      UIListenForWindowResize : function ( ) {
         var body = $('body');
         window.addEventListener('resize', function() {
            if (window.innerHeight > window.innerWidth) {
               body.removeClass('landscape');
               body.addClass('portrait');
               $.UIHideURLbar();
            } else {
               body.removeClass('portrait');
               body.addClass('landscape');
               $.UIHideURLbar();
            }
         }, false);
      },
      kvo : function () {
         // Register observers of a key for this object:
         this.registerObserver = function(observer, key) {
            if (typeof this.observers === 'undefined') {
               this.observers = {};
            }
            if (typeof this.observers[key] === 'undefined') {
               this.observers[key] = [observer];
            } else {
               this.observers[key].push(observer);
            }
         };
    
         // Set a value of this object, and inform observers of the assignment:
         this.set = function(key, value) {
            if (this.observers !== null && this.observers[key] !== null) {
               currentValue = this[key];
               this.observers[key].each(function(observer) {
                  observer.keyWillUpdate(this, key, currentValue, value);
               });
               this[key] = value;
            }
         };
      },
      form2JSON : function(rootNode, delimiter) {
         rootNode = typeof rootNode == 'string' ? $(rootNode) : rootNode;
         delimiter = delimiter || '.';
         var formValues = getFormValues(rootNode);
         var result = {};
         var arrays = {};
         
         function getFormValues(rootNode) {
            var result = [];
            var currentNode = rootNode.firstChild;
            while (currentNode) {
               if (currentNode.nodeName.match(/INPUT|SELECT|TEXTAREA/i)) {
                  result.push({ name: currentNode.name, value: getFieldValue(currentNode)});
               } else {
                  var subresult = getFormValues(currentNode);
                  result = result.concat(subresult);
               }
               currentNode = currentNode.nextSibling;
            }
            return result;
         }
         function getFieldValue(fieldNode) {
            if (fieldNode.nodeName === 'INPUT') {
               if (fieldNode.type.toLowerCase() === 'radio' || fieldNode.type.toLowerCase() === 'checkbox') {
                  if (fieldNode.checked) {
                     return fieldNode.value;
                  }
               } else {
                  if (!fieldNode.type.toLowerCase().match(/button|reset|submit|image/i)) {
                     return fieldNode.value;
                  }
               }
            } else {
               if (fieldNode.nodeName === 'TEXTAREA') {
                  return fieldNode.value;
               } else {
                  if (fieldNode.nodeName === 'SELECT') {
                     return getSelectedOptionValue(fieldNode);
                  }
               }
            }
            return '';
         }
         function getSelectedOptionValue(selectNode) {
            var multiple = selectNode.multiple;
            if (!multiple) {
               return selectNode.value;
            }
            if (selectNode.selectedIndex > -1) {
               var result = [];
               $$('option', selectNode).each(function(item) {
                  if (item.selected) {
                     result.push(item.value);
                  }
               });
               return result;
            }
         }    
         formValues.each(function(item) {
            var value = item.value;
            if (value !== '') {
               var name = item.name;
               var nameParts = name.split(delimiter);
               var currResult = result;
               for (var j = 0; j < nameParts.length; j++) {
                  var namePart = nameParts[j];
                  var arrName;
                  if (namePart.indexOf('[]') > -1 && j == nameParts.length - 1) {
                     arrName = namePart.substr(0, namePart.indexOf('['));
                     if (!currResult[arrName]) currResult[arrName] = [];
                     currResult[arrName].push(value);
                  } else {
                     if (namePart.indexOf('[') > -1) {
                        arrName = namePart.substr(0, namePart.indexOf('['));
                        var arrIdx = namePart.replace(/^[a-z]+\[|\]$/gi, '');
                        if (!arrays[arrName]) {
                           arrays[arrName] = {};
                        }
                        if (!currResult[arrName]) {
                           currResult[arrName] = [];
                        }
                        if (j == nameParts.length - 1) {
                           currResult[arrName].push(value);
                        } else {
                           if (!arrays[arrName][arrIdx]) {
                              currResult[arrName].push({});
                              arrays[arrName][arrIdx] = 
                              currResult[arrName][currResult[arrName].length - 1];
                           }
                        }
                        currResult = arrays[arrName][arrIdx];
                     } else {
                        if (j < nameParts.length - 1) { 
                           if (!currResult[namePart]) {
                              currResult[namePart] = {};
                           }
                           currResult = currResult[namePart];
                        } else {
                           currResult[namePart] = value;
                        }
                     }
                  }
               }
            }
         });
         return result;
      }  
   });
   
   $.extend(document, {
   	  ready : function(fn) {
   	  	  fn = fn || $.noop;
   	  	  if (document.getElementsByTagName('body')[0]) {
   	  	  	fn();
   	  	  } else {
   	  	  	$.ready(fn);
   	  	  }
   	  }
   });
   
   $.extend(Object.prototype, {
   	  key : function(idx) {
   	     var ret;
   	     var count = 0;
   	     for (key in this) {
   	     	if (idx === count) {
   	     		return ret = key;
   	     	} else {
   	     		count++;
   	     	}
   	     }
   	     if (ret) return ret;
   	  }
   });

   window.$chocolatechip = $;
   window.$$chocolatechip = $.$$;
   if (typeof window.$ === 'undefined') {
      window.$chocolatechip = window.$ = $;
      window.$$chocolatechip = window.$$ = $.$$;
   }
})(); 
$(function() {
   $.UIUpdateOrientationChange();
   $.UIListenForWindowResize();
});
 
if (!Function.prototype.bind) {
   Function.prototype.bind = function(func, obj) {
      var args = $.slice.call(arguments, 2);
      return function() {
      return func.apply(obj || {}, args.concat($.slice.call(arguments)));
      };
   };
}