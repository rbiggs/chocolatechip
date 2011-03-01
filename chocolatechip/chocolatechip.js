/** 
* 
||======================================================================||        
||                                                            _         ||       cZ8D) 
||   ___  _                    _        _          ___  _    (_)        ||      (O) /8\ 
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
* Version: 1.0.9
* 
* Copyright (c) 2010, Robert Biggs
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
*
* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Robert Biggs nor the names of any of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
* 
*/

(function() {

	/** 
	* 
	* This method uses querySelectorAll to the designated node or nodes. In the case of a singular node, it returns just that node. If there are more than one matching elements, it returns a DOM collection as an array. It uses a private method $.collectionToArray to convert the collection of nodes into an array.
	*
	* @method
	* @param {String} A valid CSS selector.
	* @return {Array} An array of nodes comprising an element collection.
	* 
	* ### $
	*
	* syntax:
	*
	*  $(selector);
	*  $(selector, context);
	*
	* arguments:
	*
	* - selector:string A string defining a valid CSS selector.
	* - context:string A string defining a valid CSS selector or an actual node.
	* 
	* @return {Node} Returns the node found by querySelectorAll. 
	* 
	* example:
	*
	*  var item = $("#item");
	*  var menuItems = $(".menu > li");
	*  $("section > p:first-of-type").css("color: red; background-color: yellow; padding: 10px;");
	*  var list = $("ul", mainList);
	*
	*/
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
	};
	
	
	/** 
	* 
	* A method to extend the ChocolateChip's $ method. This uses EC5's Object.defineProperty to extend objects without
	*
	* @method
	* 
	* ### extend
	*
	* syntax:
	*
	*  $.extend(object, {
	       // object literal here.
	   });
	*
	* arguments:
	*
	* - Object: The object to extend. In most cases this will be $ or HTMLElement.prototype.
	* - Object Literal: A object literal of properties to add to ChocolateChip. These can be values or methods.
	*
	* example:
	*
	*  $.extend($, {
	       saySomething : function ( msg ) {
	           console.log("This is what I have to say: " + msg);
	       }
	   });
	   $.saySomething("This is a pretty cool feature!");
	*
	*  $.extend(HTMLElement.prototype, {
	       sing : function ( lyrics ) {
	           console.log(msg);
	       }
	   });
	   $("p:first-of-type").sing("Even a paragraph can sing!");
	*/
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
		/**
		* The version of ChocolateChip
		*/
		version : "1.0.9",
		
		/** 
		* 
		* This is a function to convert an DOM node collection into an array. This is so you can use array extras like, forEach, map, slice, etc.
		*
		* @method
		* @param {NodeList} The node collection to convert into an array.
		* @return {Array} An array of nodes in an element collection.
		* 
		* ### collectionToArray
		*
		* syntax:
		*
		*  $.collectionToArray(NodeList);
		*
		* arguments:
		*
		* - NodeList:HTMLCollection A collection of nodes to convert into an array.
		* 
		* @return {Array} Returns array of nodes in an HTMLElement collection. 
		* 
		* example:
		*
		*  var p = document.getElementsByTagName("p");
		*  var pArray = $.collectionToArray(p);
		*
		*/
		collectionToArray : function ( collection ) {
			var array = [];
			var i = 0, len = collection.length;
			while ( i < len ) {
				array[i] = collection[i];
				i++;
			}
			return array;
		},
		/** 
		* 
		* This method uses querySelectorAll to return a DOM collection as an array. It employs the method $.collectionToArray to convert the collection of nodes into an array. This will later be passed out as a global object.
		*
		* @method
		* @param {String} A valid CSS selector.
		* @return {Array} An array of nodes comprising an element collection.
		* 
		* ### $$
		*
		* syntax:
		*
		*  $$(selector);
		*  $$(selector, context);
		*
		* arguments:
		*
		* - string:string A string defining a valid CSS selector.
	    * - context:string A string defining a valid CSS selector or an actual node.
		* 
		* @return {Array} Returns array of nodes found by querySelectorAll. 
		* 
		* example:
		*
		*  var sections = $$("section");
		*  $$("section > p").forEach(function(p) {
				p.css("color: red; background-color: yellow; padding: 10px;");
		   });
		*
		*/
		
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
		/** 
		* 
		* This method return the previous sibling of the element upon which it executes. This method is attached directly to the Element object.
		*
		* @method
		* 
		* ### previous
		*
		* syntax:
		*
		*  $(selector).previous();
		* 
		* @return {Node} Returns previous sibling node. 
		* 
		* example:
		*
		*  var previousItem = $("#item").previous();
		*
		*/
		previous : function ( ) {
			return this.previousElementSibling;
		},
		
		/** 
		* 
		* This method return the next sibling of the element upon which it executes. This method is attached directly to the Element object.
		*
		* @method
		* 
		* ### next
		*
		* syntax:
		*
		*  $(selector).next();
		* 
		* @return {Node} Returns next sibling node. 
		* 
		* example:
		*
		*  var nextItem = $("#item").next();
		*
		*/
		next : function ( ) {
			return this.nextElementSibling;
		},
		
		/** 
		* 
		* A method to get the first child of an element while avoiding empty text nodes. This method is attached directly to the Element object.
		*
		* @method
		* 
		* ### first
		*
		* syntax:
		*
		*  element.first();
		* 
		* example:
		*
		*  $("#menu").first();
		*
		*/
		first : function ( ) {
			return this.firstElementChild;
		},
		
		/** 
		* 
		* A method to get the last child of an element, while avoiding empty text nodes. This method is attached directly to the Element object.
		*
		* @method
		* 
		* ### last
		*
		* syntax:
		*
		*  element.last();
		* 
		* example:
		*
		*  $("#menu").last();
		*
		*/
		last : function ( ) {
			return this.lastElementChild;
		},
		
		/** 
		* 
		* This method return the first ancestor to match the tag passed as an argument. This method is attached directly to the Element object.
		*
		* @method
		* 
		* ### ancestorTag
		*
		* syntax:
		*
		*  Element.ancestorTag(selector);
		* 
		* @return {Node} Returns matched ancestor node. 
		* 
		* example:
		*
		*  var ancestor = $("#item").ancestorTag("article");
		*
		*/
		ancestorByTag : function ( selector ) {
			try {
				var p = this.parentNode;
				if (!p) {
					return false;
				}
				if (p.tagName.toLowerCase() == selector) {
					return p;
				} else {
					return p.ancestorByTag(selector);
				}
			} catch(e) { return false; }
		},
		
		/** 
		* 
		* This method return the first ancestor to match the class passed as an argument. This method is attached directly to the Element object.
		*
		* @method
		* 
		* ### ancestorClass
		*
		* syntax:
		*
		*  Element.ancestorClass(selector);
		* 
		* @return {Node} Returns matched ancestor node. 
		* 
		* example:
		*
		*  var ancestor = $("#item").ancestorClass("generic class");
		*
		*/
		ancestorByClass : function ( selector ) {
			try {
				var p = this.parentNode;
				if (!p) {
					return false;
				}
				if (p.hasClass(selector)) {
					return p;
				} else {
					return p.ancestorByClass(selector);
				}
			} catch(e) { return false; }
		},
		
		/** 
		* 
		* This method return the first ancestor to match the position passed as an argument. This method is attached directly to the Element object. If no position is supplied, the method returns the immediate ancestor. If the position is greater than the actual number of ancestors, the method returns the body tag as the topmost ancestor.
		*
		* @method
		* 
		* ### ancestorByPosition
		*
		* @param {Integer} An integer indicating the position of the ancestor to find.
		*
		* syntax:
		*
		*  Element.ancestorByPosition(position);
		* 
		* arguments:
		*
		* - Integer:Integer An integer indicating the position of the ancestor to find.
		*
		* @return {Node} Returns matched ancestor node. 
		* 
		* example:
		*
		*  var ancestor = $("#item").ancestorByPosition(3);
		*
		*/
		ancestorByPosition : function ( position ) {
			try {
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
			} catch(e) { return false; }
		}
    });
    
	$.extend($, {
		/** 
		* 
		* This method creates nodes from a string of valid HTML passed as an argument. The result is an array of one or more nodes. By iterating this array you can insert them into a document. This method is attached directly to the $ object.
		*
		* @method
		* @param {String} A string defining nodes to create.
		* @return {Array} An array of valid nodes existing in memory.
		* 
		* ### $.make
		*
		* syntax:
		*
		*  $.make(string);
		*
		* arguments:
		*
		* - string:string A string defining a node or nodes to be created.
		* 
		* @return {Collection} Returns collection of new nodes. 
		* 
		* example:
		*
		*  var paragraph = $.make("<p>This is a paragraph</p>");
		*
		*/
		make : function ( HTMLString ) {
			// Initialize array to hold DOMified child nodes.
			var nodes = [];
			// Create a temporary node to receive the text to convert.
			var temp = document.createElement("div");
			// Inject the string into the temporary node.
			temp.innerHTML = HTMLString;
			// Extract the DOM nodes out of the temporary node
			// into the nodes array.
			var i = 0;
			var len = temp.childNodes.length;
			while (i < len) {
				nodes[i] = temp.childNodes[i];
				i++;
			}
			// Return the array of nodes.
			return nodes;
		},
		
		/** 
		* 
		* A method to clone a node. If a boolean value that evaluates to true is passed as an argument, the method will clone the node and all its child nodes, otherwise it clones only the node itself. This method is attached directly to the Element object.
		*
		* @method
		* @param {boolean} A boolean value.
		* 
		* ### replace
		*
		* syntax:
		*
		*  $.replace(newNode, oldNode);
		*
		* arguments:
		*
		* - newNode: Node A a node to with which to replace.
		* - oldNode: Node The node to be replaced.
		* 
		* example:
		*
		*  var newNode = $.make("<div>A new div</div>");
		*  $.replace(newNode, $("#menu"));
		*
		*/
		replace : function ( newElem, oldElem ) {
			 oldElem.parentNode.replaceChild(newElem, oldElem);
		}
    });
    
	$.extend(HTMLElement.prototype, {
		/** 
		* 
		* Remove all child nodes of an element. This method invokes the removeEvents method first to remove any attached events and thereby prevent memory leaks. This method is attached directly to the Element object.
		*
		* @method
		* 
		* ### empty
		*
		* syntax:
		*
		*  $(selector).empty();
		* 
		* example:
		*
		*  $("#item").empty();
		*
		*/
		empty : function ( ) {
			this.removeEvents();
			this.textContent = "";
		},
		
		/** 
		* 
		* A method to clone a node. If a boolean value that evaluates to true is passed as an argument, the method will clone the node and all its child nodes, otherwise it clones only the node itself. This method is attached directly to the Element object.
		*
		* @method
		* @param {boolean} A boolean value.
		* 
		* ### clone
		*
		* syntax:
		*
		*  element.clone();
		*
		* arguments:
		*
		* - boolean: boolean Any boolean value.
		* 
		* @return {Node} Returns a clone of an element. 
		* 
		* example:
		*
		*  var menu = $("#menu").clone(true);
		*
		*/
		clone : function ( value ) {
			if (value === true || !value) {
				return this.cloneNode(true);
			} else {
				return this.cloneNode(false);
			}
		},
		
		/** 
		* 
		* A method to wrap a node in markup. This method is attached directly to the Element object.
		*
		* @method
		* @param {string} The markup with which to wrap the element.
		* 
		* ### wrap
		*
		* syntax:
		*
		*  element.wrap(string);
		*
		* arguments:
		*
		* - string: string A string of valid HTML markup in which to encase the element.
		* 
		* example:
		*
		*  $("#menu").wrap("<nav id='main'></nav>");
		*
		*/
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
		/** 
		* 
		* A method to unwrap a node by removing its parent node. This method is attached directly to the Element object.
		*
		* @method
		* 
		* ### unwrap
		*
		* syntax:
		*
		*  element.unwrap();
		* 
		* example:
		*
		*  $("#menu").unwrap();
		*
		*/
		unwrap : function ( ) {
			// To prevent deletion of the body tag when the target element
			// has no other parent, we check to see if the parent is the body tag.
			// If so, the method terminates.
			if (this.parentNode.nodeName === "BODY") {
				return false;
			}
			var element = this.cloneNode(true);
			$.replace(element, this.parentNode);
		},
		
		/** 
		* 
		* This method adds text to the target element, replacing whatever child nodes it might have. If no value is passed as an argument, the method returns the text value of all child nodes of the target element. This method is attached directly to the Element object.
		*
		* @method
		* @param {String} The text to add to the element.
		* @param {Varaible} A variable containing the text to add to the element.
		* 
		* ### text
		*
		* syntax:
		*
		*  $(selector).text(string);
		*  $(selector).text(variable);
		*  $(selector).text();
		*
		* arguments:
		*
		* - string:string A string of text to add to an element.
		* - variable:string A string of text to add to an element.
		* 
		* @return {String} Returns the text nodes of the element. 
		* 
		* example:
		*
		*  $("#item").text("This is an example of added text.");
		*  var textValue = $("#item").text();
		*
		*/
		text : function ( value ) {
			if (!!value) {
				this.innerText = value;
			} else {
				return this.innerText;
			}
		},
		
		/** 
		* 
		* Replace element's childNodes with content. This method is attached directly to the Element object.
		*
		* @method
		* @param {element} The element to insert.
		* 
		* ### fill
		*
		* syntax:
		*
		*  $(selector).fill(content);
		* 
		* example:
		*
		*  $("#item").fill(content);
		*
		*/
		fill : function ( content ) {
			this.empty();
			if (typeof content === "string") {
				this.textContent = content;
			} else {
				this.insert(content);
			}
		},
		
		/** 
		* 
		* Remove all child nodes of an element. This method invokes the removeEvents method first to remove any attached events and thereby prevent memory leaks. This method is attached directly to the Element object.
		*
		* @method
		* 
		* ### empty
		*
		* syntax:
		*
		*  $(selector).empty();
		* 
		* example:
		*
		*  $("#item").empty();
		*
		*/
		empty : function ( ) {
			this.removeEvents();
			this.textContent = "";
		},
		
		/** 
		* 
		* Remove an element from the document. This method is attached directly to the Element object.
		*
		* @method
		* 
		* ### remove
		*
		* syntax:
		*
		*  $(selector).remove();
		* 
		* example:
		*
		*  $("#item").remove();
		*
		*/
		remove : function ( ) {
			this.removeEvents();
			this.parentNode.removeChild(this);
		},
		
		/** 
		* 
		* A method to insert a node or nodes at nth position in the child node collection of the element on which the method is being called. This can be the first position, the last position, or anywhere in between these. If no position is passed as an argument it defaults to last position. If the parent element has no child nodes, the method inserts the new element as the first child of the parent element. This method is attached directly to the Element object.
		*
		* @method
		* @param {node} The node to insert.
		* @param {integer or string} The position at which to insert.
		* 
		* ### $.insert
		*
		* syntax:
		*
		*  $.insert( content, position );
		*
		* arguments:
		*
		* - node:node A valid node to insert into the child node collection of another node.
		* - string: string A string with a value for first or last position for insertion.
		* - integer: integer An integer indicating the position in the target element's child node collection at which to insert.
		* 
		* example:
		*
		*  
		*   $.itemNumber = 1;
			$$("p").forEach(function(item) { 
			   item.insert( $.make("<span>Introductory Matter: " + $.itemNumber + " .</span>"), "first");
			   ++$.itemNumber;
			});
			$.itemNumber = null;
		*
		*/
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
		
		/** 
		* 
		* A method to insert content before the node upon which it operates. This method is attached directly to the Element object.
		*
		* @method
		* @param {node} The node to insert.
		* 
		* ### before
		*
		* syntax:
		*
		*  element.before(node);
		*
		* arguments:
		*
		* - node:node A valid node to insert before another node.
		* 
		* example:
		*
		*   $.itemNumber = 1;
			$$("p").forEach(function(item) { 
			   item.before( $.make("<h1>Title " + $.itemNumber + "</h1>"));
			   ++$.itemNumber;
			});
			$.itemNumber = null;
		*
		*/
		before : function ( content ) {
			// Check to see if content is an array.
			if (content.constructor === Array) {
			   var len = content.length;
			   // Iterate over the array and insert its indeces before the target element.
			   var i = 0; 
			   while (i < len) {
				   this.parentNode.insertBefore(content[i], this);
				   i++;
			   }
			// If this is not an array but a reference to a DOM element,
			// we'll use the normal method on it.
			} else {
			   this.parentNode.insertBefore(content, this);
			}
		},
		
		/** 
		* 
		* A method to insert content consisting of a node or nodes before the node upon which it operates. This method is attached directly to the Element object.
		*
		* @method
		* @param {node} The node to insert after.
		* 
		* ### after
		*
		* syntax:
		*
		*  element.after(node);
		*
		* arguments:
		*
		* - node:node A valid node to insert before another node.
		* 
		* example:
		*
		*   $.itemNumber = 1;
			$$("p").forEach(function(item) { 
			   item.after( $.make("<p>Addendum " + $.itemNumber + "</p>"));
			   ++$.itemNumber;
			});
			$.itemNumber = null;
		*
		*/
		after : function ( content ) {
			// Find the parent of the node after which to insert the content.
			var parent = this.parentNode;
			// Check to see if content is an array.
			if (content.constructor === Array) {
				// Find the parent of the node after which the content will be inserted.
				var i = 0, len = content.length;
				while (i < len) {
					// If the element after which we are inserting
					// is the last child of its parent, we'll use
					// the append method on the element's parent.
					if (this === parent.lastChild) {
						parent.appendChild(content[i]);
					// Otherwise we'll insert it before the element.
					} else {
						parent.insertBefore(content[i],this.nextSibling);
					}
					i++;
				}
			// If this is not an array but a reference to a DOM element,
			// we'll use normal methods on it.
			} else {
				// If the element which we are inserting
				// is the last child of its parent, we'll use
				// the append method on the element's parent.
				if (content === this.lastChild) {
					parent.appendChild(content);
				// Otherwise we'll insert it before the element.
				} else {
					parent.insertBefore(content, this.next());
				}
			}
		},
		
		/** 
		* 
		* Check an element to see if it has a particular class. This method is attached directly to the Element object.
		*
		* @method
		* @param {String} The className to check for.
		* 
		* ### hasClass
		*
		* syntax:
		*
		*  $(selector).hasClass(className);
		*
		* arguments:
		*
		* - className:string the name of the CSS class to check for.
		* 
		* example:
		*
		*  $("#item").hasClass("hover");
		*
		*/
		hasClass : function ( className ) {
			return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(this.className);
		},
		
		/** 
		* 
		* Add a class to an element. This method is attached directly to the Element object.
		*
		* @method
		* @param {String} The className to add.
		* 
		* ### addClass
		*
		* syntax:
		*
		*  $(selector).addClass(className);
		*
		* arguments:
		*
		* - className:string the name of the CSS class to add.
		* 
		* example:
		*
		*  $("#item").addClass("hover");
		*
		*/
		addClass : function ( className ) {
			if (!this.hasClass(className)) {
				this.className = [this.className, className].join(' ').replace(/^\s*|\s*$/g, "");
			}
		},
		
		/** 
		* 
		* Remove a class from an element. This method is attached directly to the Element object.
		*
		* @method
		* @param {String} The className to remove.
		* 
		* ### removeClass
		*
		* syntax:
		*
		*  $(selector).removeClass(className);
		*
		* arguments:
		*
		* - className:string the name of the CSS class to remove.
		* 
		* example:
		*
		*  $("#item").removeClass("hover");
		*
		*/
		removeClass : function ( className ) {
			if (this.hasClass(className)) {
				var currentClasses = this.className;
				this.className = currentClasses.replace(new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)', 'g'), ' ').replace(/^\s*|\s*$/g, "");
			}
		},
		
		/** 
		* 
		* Toggle a class on and off an element, or toggle between two classes. This method is attached directly to the Element object.
		*
		* @method
		* @param {String} The first className to toggle.
		* @param {String} The second className to toggle.
		* 
		* ### toggleClass
		*
		* syntax:
		*
		*  $(selector).toggleClass(className);
		*  $(selector).toggleClass(className, className);
		*
		* arguments:
		*
		* - firstClassName:string the name of the first class to toggle.
		* - secondClassName:string the name of the second class to toggle.
		* 
		* example:
		*
		*  $("#item").toggleClass("hover");
		*  $("#item").toggleClass("selected", "unselected");
		*
		*/
		toggleClass : function ( firstClassName, secondClassName ) {
			// If only one class was supplied,
				if (!secondClassName) {
					// if the element does not yet have it,
					if (!this.hasClass(firstClassName)) {
						// add it to the element.
						this.addClass(firstClassName);
					} else {
						// Otherwise, if the element does have
						// the class already, remove it.
						this.removeClass(firstClassName);
					}
				// If a second class was supplied,
				} else if (secondClassName) {
					// check to see if the element already has this first one.
					if (!this.hasClass(firstClassName)) {
						// If it does not, ad the first class.
						this.addClass(firstClassName);
						// Just in case, remove the second class.
						this.removeClass(secondClassName);
				// Otherwise, if the fist class is found,
				} else {
					// remove it and add the second class.
					this.removeClass(firstClassName);
					this.addClass(secondClassName);
				}
			}
		},
		
		/** 
		* 
		* Get the precise top position of an element in relation to the top viewport.
		*
		* @method
		* 
		* ### getTop
		*
		* syntax:
		*
		*  $(selector).getTop();
		*
		* example:
		*
		*  $("#item").getTop();
		*  var button = $(".button");
		*  var buttonTop = button.getTop();
		*
		*/
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
		
		/** 
		* 
		* Get the precise left position of an element in relation to the left viewport.
		*
		* @method
		* 
		* ### getLeft
		*
		* syntax:
		*
		*  $(selector).getLeft();
		*
		* example:
		*
		*  $("#item").getLeft();
		*  var button = $(".button");
		*  var buttonTop = button.getLeft();
		*
		*/
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
		
		/** 
		* 
		* Add a CSS declaration directly to an element. If a boolean value that equates to true is passed as a second, optional argument, the method will replace whatever inline CSS values are presently existing on the element, otherwise it appends the CSS declaration to whatever is already there. This method is attached directly to the Element object.
		*
		* @method
		* @param {String} The className to remove.
		* @param {Boolean} A true value will cause any existing inline styles to be replace by the string of CSS styles. This is optional.
		* 
		* ### css
		*
		* syntax:
		*
		*  $(selector).css(style declaration, property, value);
		*
		* arguments:
		*
		* - style declaration:string A string of valid CSS property/values enclosed in curly braces and quotes.
		* - property:string A string defining a CSS property.
		* - value:string A string defining a CSS property value to set on an element.
		* 
		* @return {Style Declaration} Returns CSS property value pairs as inline cssText. 
		* @return {CSSStyleDeclaration} Returns the computed value of a CSS property.
		* 
		* example:
		*
		*  $("#item").css("font", "bold 12pt/14pt Arial, Helvetica, Sans-serif");
		*  console.log($("#item").css("font-size"));
		*  $("#item").css("{font-size: 24px; color: blue; background-color: red;}");
		*
		*/
		css : function ( property, value ) {
			if (/{/.test(property) && /}/.test(property) && !value) {
				// Remove curly braces from style declaration.
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
    
		/** 
		* 
		* Method to capitalize the first letter of a string. This method is attached directly to the $ object.
		*
		* @method
		* @param {String} The string to capitalize.
		* 
		* ### $.capitalize
		*
		* syntax:
		*
		*  $.capitalize(string);
		*
		* arguments:
		*
		* - string:string A string to capitalize.
		* 
		* @return {string} Returns the capitalized version of a string. 
		* 
		* example:
		*
		*  var name = $.capitalize("robert"); // returns Robert
		*
		*/
		capitalize : function ( ) {
			var str = this;
			return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
		},
		
		/** 
		* 
		* Method to capitalize the first letter of a words in a string. This method is attached directly to the $ object.
		*
		* @method
		* @param {String} The string to capitalize.
		* 
		* ### $.capitalize
		*
		* syntax:
		*
		*  $.capitalize(string);
		*
		* arguments:
		*
		* - string:string A string to capitalize.
		* 
		* @return {string} Returns the capitalized version of a string. 
		* 
		* example:
		*
		*  var name = $.capitalize("get out now"); // returns Get Out Now
		*
		*/
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
		
		/** 
		* A method to attach events to elements.
		*
		* @method
		* 
		* ### bind
		*
		* syntax:
		*
		*  element.bind(event, function);
		*
		* arguments:
		* 
		*  - event: Event A string representing valid event handler, such as "click".
		*  - function: Function A function, either named or anonymous. Note that a bound event that uses an anonymous function cannot be unbound. See last example below for how to avoid this.
		* 
		* example:
		*
		*  var doSomething = function() {
			  console.log("I'm doing it now.");
		   };
		   $("#doIt").bind("click", doSomething);
		* or:
		   $(".stop").bind("touchend", function() {
			  console.log("Time to put an end to this!");
			  this.remove();
		   });
		*
		*/
		bind : function( event, callback ) {
			this.addEventListener(event, callback, false);
		},
		
		/** 
		* A method to remove events from elements.
		*
		* @method
		* 
		* ### unbind
		*
		* syntax:
		*
		*  element.unbind(event, callback);
		*
		* arguments:
		* 
		*  - event: Event A string representing valid event handler, such as "click".
		*  - function: Function A named function executed by the event handler.
		* 
		* example:
		*
		*  $("#doIt").unbind("click", doSomething);
		* 
		*/
		unbind : function( event, callback ) {
			this.removeEventListener( event, callback, false );
		},
	  
		/** 
		* 
		* Remove events from an element. This method uses an array of events owned by the global $ object to know which events to remove. This method is invoked before removing any nodes from a document to prevent memory leaks. This method is attached directly to the Element object.
		*
		* @method
		* @param {String} The className to add.
		* 
		* ### removeEvents
		*
		* syntax:
		*
		*  $(selector).removeEvents();
		* 
		* example:
		*
		*  $("#item").removeEvents();
		*
		*/
		removeEvents : function ( ) {
			var i = 0, len = $.events.length;
			while (i < len) {
				this[$.events[i]] = null;
				i++;
			}
		},
		
		/** 
		* A method to create event delegation.
		*
		* @method
		* 
		* ### delegate
		*
		* syntax:
		*
		*  element.delegate(selector, event, callback);
		*
		* arguments:
		* 
		*  - selector: A valid selector for the target element(s).
		*  - event: An event to be fired on the element.
		*  - function: A callback to be executed in relation to the target element.
		* 
		* example:
		*
		*  $("body").delegate("p", "click", function(element) {
				element.css("background-color: yellow");
		   });
		* 
		*/
		delegate : function ( selector, event, callback ) {
			this.addEventListener(event, function(e) {
				var target = e.target;
				$$(selector).forEach(function(element) {
					if (element.isEqualNode(target)) {
						callback.call(this, target);
					} else {
						try {
						   while (!target.isEqualNode(element)) {
							   target = target.parentNode;
						   }
						   e.stopPropagation();
						   callback.call(this, target);
						} catch(e) { }
					}
				},false);
			});
		},
		
		/** 
		* A method to fire events on elements.
		*
		* @method
		* 
		* ### trigger
		*
		* syntax:
		*
		*  element.trigger(event);
		*
		* arguments:
		* 
		*  - event: An event to be fired on the element.
		* 
		* example:
		*
		*  $("#importantButton").bind("click", function() {
	           $("#link").trigger("click");
		   });
		* 
		*/
		trigger : function ( event ) {
			if( document.createEvent ) {
			  var evtObj = document.createEvent('Events');
			  evtObj.initEvent(event, true, false);
			  this.dispatchEvent(evtObj);
			}
		},
		
		/** 
		* A method to implement CSS-based transition animations on elements.
		*
		* @method
		* 
		* ### anim
		*
		* syntax:
		*
		*  element.anim(options, duration, easing);
		*
		* arguments:
		* 
		*  - object literal: An object literal of key value pairs of CSS properties and values.
		*  - time: integer or float A valid integer or float representing time.
		*  - string: string A string defining an easing function for the animation.
		* 
		* example:
		*
		*  $("#animate").bind("click", function() {
			   this.anim({"-webkit-transform": "rotate3d(30, 150, 200, 180deg) scale(3) translate3d(-50%, -30%, 140%)", "opacity": .25, "-webkit-transform-style" : "preserve-3d", "-webkit-perspective": 500}, 2, "ease-in-out");
		});
		* 
		*/
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
		
		/** 
		* A method to delay the execution of a function.
		*
		* @method
		* 
		* ### delay
		*
		* syntax:
		*
		*  $.delay(function, time);
		*
		* arguments:
		* 
		*  - function: A function to execute.
		*  - time: integer or float A valid integer or float representing time in milliseconds for delay.
		* 
		* example:
		*
		*  $.delay(function() {
		       console.log("This message is delayed by two seconds.");
		   }, 2000);
		* 
		*/
		delay : function ( fnc, time ) {
			var argv = Array.prototype.slice.call(arguments, 2);
    		return setTimeout(function() { 
    			return fnc.apply(fnc, argv); 
    		}, time);
		},
		
		/** 
		* A method to postpone the execution of a function until the callstack is clear.
		*
		* @method
		* 
		* ### defer
		*
		* syntax:
		*
		*  $.defer(function);
		*
		* arguments:
		* 
		*  - function: A function to execute.
		* 
		* example:
		*
		*  $.defer(function() { 
			   console.log("This comes before Squawk!"); 
		   });
		* 
		*/
		defer : function ( fnc ) {
			return $.delay.apply($, [fnc, 1].concat(Array.prototype.slice.call(arguments, 1)));
		},
		
		/** 
		* 
		* Method to capitalize the first letter of a words in a string. This method is attached directly to the $ object.
		*
		* @method
		* @param {Function} The function to enclose.
		* @param {Function} The function which will enclose.
		* 
		* ### $.enclose
		*
		* syntax:
		*
		*  $.enclose(function, enclosure);
		*
		* arguments:
		*
		* - function:function A function to enclose.
		* - function:function A function with which to enclose.
		* 
		* @return {function} Returns the result of the enclosed function with output for the enclosing function. 
		* 
		* example:
		*
		*  var hello = function(name) { return "Hello, " + name + "!"; };
		   hello = $.enclose(hello, function(func) {
  			   return "Before I said, \"" + func("Stan") + "\" I thought about it for a while.";
		   });
		*
		*/
		enclose : function(func, enclosure) {
		  	return function() {
				var args = [func].concat(Array.prototype.slice.call(arguments));
				return enclosure.apply(enclosure, args);
		  	};
		},
		
		/** 
		* 
		* Method to return the composition of several functions, where each function consumes the return value of the function that follows. This method is attached directly to the $ object.
		*
		* @method
		* @param {Function} A function to pass as an argument.
		* @param {Function} A second function to pass as an argument.
		* 
		* ### $.compose(function, function, etc.)
		*
		* syntax:
		*
		*  $.capitalize(string);
		*
		* arguments:
		*
		* - function:function A function to pass as an argument.
		* 
		* @return {function} Returns the result of the execution of each function passed as an argument. 
		* 
		* example:
		*
		*  var greet    = function(name) { return "Hi there, " + name; };
		   var exclaim  = function(statement) { return statement + "!"; };
		   var remark = function(remark) { return remark + " You know I'm glad to see you."; };
		   var welcome = $.compose(remark, greet, exclaim);
		   console.log(welcome('Jeff')); // => Hi there, Jeff! You know I'm glad to see you.
		*
		*/
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
		
		/** 
		* 
		* An array of events to be removed before a node is deleted from a document. This array is attached directly to the $ object.
		* 
		* ### $.events
		*
		*/
		events : ['onmousedown', 'onmouseup', 'onmouseover', 'onmouseout', 'onclick', 'onmousemove', 'ondblclick', 'onerror', 'onresize', 'onscroll', 'onkeydown', 'onkeyup', 'onkeypress', 'onchange', 'onsubmit', 'onload', 'ontouchstart', 'ontouchmove', 'ontouchend', 'ontouchcancel', 'ongesturestart', 'ongesturechange', 'ongestureend', 'onorientationchange'],
		
		/** 
		* 
		* A method to chain load multiple functions to execute when the document finishes loading.
		*
		* @method
		* @param {Function} The node to insert.
		* 
		* ### $.loadEvent
		*
		* syntax:
		*
		*  $.loadEvent();
		*
		* arguments:
		*
		* - function:function A valid function to run when the document finishes loading.
		* 
		* example:
		*
		*  var myFunction = function () {
				return true;
		   };
		*  $.loadEvent(myFunction());
		*
		*/
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
		
		/** 
		* 
		* Array of functions to execute when the document's DOM is ready for access.
		*
		*/
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
		
		/** 
		* 
		* Method to determine when the DOM is ready for manipulation and thereupon fire a block of code contained in an anonymous function passed to it as an argument. This method is attached directly to the $ object.
		*
		* @method
		* @param {Function} An anonymous function to execute.
		* 
		* ### text
		*
		* syntax:
		*
		*  $.ready(function);
		*
		* arguments:
		*
		* - function:function An anonymous function of block code to execute.
		* 
		* example:
		*
		*  $.ready(function() { 
			   console.log("The document is ready for action!"); 
		   });
		*
		*/
		ready : function ( callback ) {
			if ($.DOMReadyList.length == 0) {
				document.addEventListener('DOMContentLoaded', $.executeWhenDOMReady, false);
			}
	
			$.DOMReadyList.push(callback);
		},
		
		/** 
		* 
		* A method to hide the browser's address bar. This is used at page load time and when the user navigates to different views.
		*
		* @method
		* 
		* ### hideURLbar
		*
		* syntax:
		*
		*  $.hideURLbar();
		*
		* example:
		*
		*  $.hideURLbar();
		*
		*/
		hideURLbar : function() {
			window.scrollTo(0, 1);
		},
		
		/** 
		* 
		* A method to import external scripts into the document. This method is attached directly to the $ object.
		*
		* @method
		* 
		* ### importScript
		*
		* syntax:
		*
		*  $.importScript(URI);
		*
		* arguments:
		*
		* - URI:URI A valid URI of the script to import into the document.
		*
		* example:
		*
		*  $.importScript("https://bozo.com/scripts/myScript.js");
		*
		*/
		importScript : function ( url ) {
			var script = document.createElement("script");
			script.setAttribute("type", "text/javascript");
			script.setAttribute("src", url);
			$("head").appendChild(script);
		},
    
		/** 
		* 
		* Properties to determine device platform, network connection and standalone status.
		*
		* syntax: 
		*  $.standalone // returns true or false
		*
		* example:
		*  if (!$.standalone) {
			   alert("Please install this app before using.");
		   }
		*
		*/
	
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
		/** 
		* 
		* A method to insert content into a node using The XMLHttpRequest object. This method is attached directly to the Element object.
		*
		* @method
		* @param {URI} The URI to insert.
		* @param {integer or string} The position at which to insert.
		* 
		* ### xhr
		*
		* syntax:
		*
		*  element.xhr(URI);
		*
		* arguments:
		*
		* - URI:URI A valid URI to import into the document and fill an element.
		* - Callback:Callback A function to execute when the HTTPRequest is successful.
		* 
		* example:
		*
		*   $('#content').xhr('/data/customers.html');
		*
		*/
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
		
		/** 
		* 
		* A method to insert content into a node using The XMLHttpRequest object. This method is attached directly to the Element object.
		*
		* @method
		* @param {URI} The URI to insert.
		* @param {integer or string} The position at which to insert.
		* 
		* ### xhrjson
		*
		* syntax:
		*
		*  element.xhrjson(URI);
		*
		* arguments:
		*
		* - URI:URI A valid URI to import into the document and fill an element.
		* - options:object literal An object literal mapping elements to json data.
		* 
		* example:
		*
		*  
		*   $('#content').xhrjson('/data/customers.js');
		*
		*/
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
		
		/** 
		* 
		* A method to get and set a dataset value on an element.
		*
		* @method
		* @param {key} The dataset key to access.
		* @param {value} The value to set the dataset to.
		* 
		* ### data
		*
		* syntax:
		*
		*  element.data(key);
		*  element.data(key, value);
		*
		* arguments:
		*
		* - key:key A string defining the dataset key to access.
		* - value:value A string defining the value to set the dataset key to.
		* 
		* example:
		*
		*  
		*   var customer = $('#customer').data('customer-name'); 
		*   $$(".customers").forEach(function(customer) {
		        console.log(customer.data("customer-name"));
		    }
		*   $("#shirt).data("shirt-size", "XXL"); // outputs data-shirt-size="XXL" on #shirt
		*
		*/
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
		
		/** 
		* 
		* A method to remove a dataset from an element.
		*
		* @method
		* 
		* ### removeData
		*
		* syntax:
		*
		*  element.removeData(key);
		*
		* arguments:
		*
		* - key:key A string defining the dataset key to remove.
		* 
		* example:
		*  
		*   $("#shirt).removeData("shirt-size"); // removes data-shirt-size from #shirt
		*
		*/
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
		
  		// JavaScript Micro Template
		// John Resig - http://ejohn.org/ - MIT Licensed
		
		/** 
		* 
		* A cache for templates to be used later. Is used by 
		*
		*/
		jsmtCache : {},
		
		/** 
		* 
		* A method to parse a JavaScript Micro Template and populate it with JSON data.
		*
		* @method
		* @param {String} The template to parse.
		* @param {JSON} The data to parse for the template.
		* 
		* ### xhrjson
		*
		* template:
		*
		*  $.template(str, data);
		*
		* arguments:
		*
		* - string:String A string defining the template to use.
		* - JSON:object literal JSON data to be mapped to elements in the template.
		* 
		* example:
		*
		*  var result = $.template("tpl_1", data);
		*  $.ready(function() {
		*     $("#tpl_1_output").insert(result);
		*  });
		*
		*/
        template : function tmpl(str, data) {
        	var err = "";
        	try {
				// Figure out if we're getting a template, or if we need to
				// load the template - and be sure to cache the result.
				var fn = !/\W/.test(str) ?
				$.jsmtCache[str] = $.jsmtCache[str] ||
				$.template(document.getElementById(str).innerHTML) : 
				// Generate a reusable function that will serve as a template
				// generator (and which will be cached).
				new Function("obj", "var p = [];" +
				// Introduce the data as local variables using with(){}
				"with (obj) { p.push('" +
				// Convert the template into pure JavaScript
				str.replace(/[\r\t\n]/g, " ")
				.replace(/'(?=[^#]*#>)/g, "\t")
				.split("'").join("\\'")
				.split("\t").join("'")
				.replace(/<%=(.+?)%>/g, "',$1,'")
				.split("<%").join("');")
				.split("%>").join("p.push('")
				+ "');}return p.join('');");
				// Provide some basic currying to the user
				return data ? fn(data) : fn;
			} catch (e) {
				err = e.message;
			}
			//return err.htmlEncode();
		}
	});
	
	/** 
	* 
	* A method to track the mobile device's orientation, whether in portrait or landscape mode.
	This is attached directly to the window object and requires no initialization by the user.
	The method outputs a class of "portrait" or "landscape" to the body tag, depending on the orientation of the device. This allows the user to specific specific CSS styles based on the device's orientation.
	*
	*/
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
    
    /**
    *
    * Make the ChocolateChip $() and $.$$() methods available globally.
    * If there is already a $() variable in the global space, ChocolateChip
    * aliases them as __$(). To make it easier to use the $.$$() method, we 
    * alias it as $$().
    *
    */
    if (window.$ === undefined) {
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