/** 
* 
* ChocolateChip
* A small, light JavaScript framework for mobile Web app development, providing the functionality necessary for creating professional HTML5/CSS3 based Web apps.
* 
* LICENSE: BSD
*
* Version: 1.0.3
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

(function( ){
	
	/** 
	* 
	* This method returns the first instance of the selector passed as an argument. This will later be passed out as a global object.
	*
	* @method
	* @param {String} A valid CSS selector.
	* @return {Element} First element found in the document.
	* 
	* ### $
	*
	* syntax:
	*
	*  $(selector);
	*
	* arguments:
	*
	* - string:string A string defining a valid CSS selector.
	* 
	* @return {Node} Returns first instance of the node indicated by selector. 
	* 
	* example:
	*
	*  var item = $("#item");
	*
	*/
	var $ = function ( selector ) {
		return document.querySelector(selector);
	};
	
	/** 
	* 
	* This is a function to convert an DOM node collection into an array. This is so you can use array extras like, forEach, map, slice, etc. The $$ method uses it. This method is attached directly to the $ object.
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
	
	$.collectionToArray = function ( collection ) {
		var array = [];
		var i = 0, len = collection.length;
		while ( i < len ) {
			array[i] = collection[i];
			i++;
		}
		return array;
	};
	
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
	*
	* arguments:
	*
	* - string:string A string defining a valid CSS selector.
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
	var $$ = function ( selector ) {
		return $.collectionToArray(document.querySelectorAll(selector));
	};
	
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
	Element.prototype.hasClass = function ( className ) {
		return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(this.className);
	};
	
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
	* @return {style} Returns computed style of element. 
	*
	* example:
	*
	*  $("#item").addClass("hover");
	*
	*/
	Element.prototype.addClass = function ( className ) {
		if (!this.hasClass(className)) {
			this.className = [this.className, className].join(' ').replace(/^\s*|\s*$/g, "");
		}
	};
	
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
	Element.prototype.removeClass = function ( className ) {
		if (this.hasClass(className)) {
			var currentClasses = this.className;
			this.className = currentClasses.replace(new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)', 'g'), ' ').replace(/^\s*|\s*$/g, "");
		}
	};
	
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
	Element.prototype.toggleClass = function ( firstClassName, secondClassName ) {
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
	};
	
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
	Element.prototype.remove = function ( ) {
		this.removeEvents();
		this.parentNode.removeChild(this);
	};
	
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
	Element.prototype.empty = function ( ) {
		this.removeEvents();
		this.textContent = "";
	};
	
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
	Element.prototype.removeEvents = function ( ) {
		var i = 0, len = $.events.length;
		while (i < len) {
			this[$.events[i]] = null;
			i++;
		}
	};
	
	/** 
	* 
	* Method to replace the contents/childNodes of an element with new content. This method is attached directly to the Element object.
	*
	* @method
	* @param {String} The content to insert in the element.
	* 
	* ### fill
	*
	* syntax:
	*
	*  $(selector).fill(content);
	*
	* arguments:
	*
	* - content:string the content to be inserted.
	* 
	* example:
	*
	*  $("#item").fill("New stuff here");
	*
	*/
	Element.prototype.fill = function ( content ) {
		this.empty();
		this.insert(content);
	};
	
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
	Element.prototype.text = function ( value ) {
		if (!!value) {
			this.innerText = value;
		} else {
			return this.innerText;
		}
	};
	
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
	$.make = function ( HTMLString ) {
		// Initialize array to hold DOMified child nodes.
		var nodes = [];
		// Create a temporary node to receive the text to convert.
		var temp = document.createElement("div");
		// Inject the string into the temporary node.
		temp.innerHTML = HTMLString;
		// Extract the DOM nodes out of the temporary node
		// into the nodes array.
		var i = 0, len = temp.childNodes.length;
		while (i < len) {
			nodes[i] = temp.childNodes[i];
			i++;
		}
		// Return the array of nodes.
		return nodes;
	};	
	
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
	*  $(selector).css(style declaration, boolean);
	*
	* arguments:
	*
	* - style:string A valid CSS property/value declaration to add to an element.
	* 
	* @return {Style} Returns CSS property value pairs as inline cssText. 
	* 
	* example:
	*
	*  $("#item").css("font: bold 12pt/14pt Arial, Helvetica, Sans-serif;");
	*  $("#item").css("background-color: red; true");
	*
	*/
	Element.prototype.css = function ( style, replace ) {
		if (!replace) {
			return this.style.cssText += ";" + style;
		} else {
			return this.style.cssText = style;
		}
	};
	
	/** 
	* 
	* Method to get the computed style of an element. This may be the inline style, or the style derived from stylesheet(s). This method is attached directly to the $ object.
	*
	* @method
	* @param {Element} The node from which a style value will be retrieved.
	* @param {CSS Property} A string defining the CSS property to retrieve.
	* 
	* ### $.getStyle
	*
	* syntax:
	*
	*  $.getStyle(element, property);
	*
	* arguments:
	*
	* - element:element A valid DOM node whose style will be retrieved.
	* - string:string A string defining a CSS property to query.
	* 
	* @return {style} Returns computed style of passed property owned by an element. 
	* 
	* example:
	*
	*  var kolor = $.getStyle($("#title"), "color");
	*
	*/
	$.getStyle = function ( element, property ) {
		return document.defaultView.getComputedStyle(element, null).getPropertyValue(property.toLowerCase());
	};
	
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
	Element.prototype.previous = function ( ) {
	   	return this.previousElementSibling;
	};
	
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
	Element.prototype.next = function ( ) {
	   	return this.nextElementSibling;
	};
	
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
	Element.prototype.ancestorTag = function ( selector ) {
		var p = this.parentNode;
		if (!p) {
			return false;
		}
		if (p.tagName.toLowerCase() == selector) {
			return p;
		} else {
			return p.ancestorTag(selector);
		}
	};
	
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
	Element.prototype.ancestorClass = function ( selector ) {
		var p = this.parentNode;
		if (!p) {
			return false;
		}
		if (p.className == selector) {
			return p;
		} else {
			return p.ancestorClass(selector);
		}
	};
	
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
	*  $.insert();
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
	Element.prototype.before = function ( content ) {
		// Check to see if content is an array.
		if (content.constructor === Array) {
		   var len = content.length;
		   // Iterate over the array and insert its indeces before the target element.
		   var i = 0; i < len;
		   while (i < len) {
		   	   this.parentNode.insertBefore(content[i], this);
		   	   i++;
		   }
		// If this is not an array but a reference to a DOM element,
		// we'll use the normal method on it.
		} else {
		   this.parentNode.insertBefore(content, this);
		}
    };
    
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
    Element.prototype.after = function ( content ) {
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
	};
	
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
	Element.prototype.clone = function ( value ) {
	 	if (value === true || !value) {
			return this.cloneNode(true);
		} else {
			return this.cloneNode(false);
		}
	};
	
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
	Element.prototype.wrap = function ( string ) {
    	var tempNode = $.make(string);
       	tempNode = tempNode[0];
        var whichClone = this.clone(true);
        tempNode.appendChild(whichClone);
        this.after(tempNode, this);
        this.remove(this); 
    };
    
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
    Element.prototype.unwrap = function ( ) {
	   	// To prevent deletion of the body tag when the target element
	   	// has no other parent, we check to see if the parent is the body tag.
	   	// If so, the method terminates.
	   	if (this.parentNode.nodeName === "BODY") {
		  	return false;
	   	}
	   	var element = this.clone(true);
	   	this.replace(element, this.parentNode);
	};
	
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
	Element.prototype.first = function() {
        return this.firstElementChild;
    };
    
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
    Element.prototype.last = function() {
        return this.lastElementChild;
    };
    
	/** 
	* 
	* A method to get a specific child node of an element. This method is attached directly to the Element object.
	*
	* @method
	* 
	* ### child
	*
	* syntax:
	*
	*  element.child();
	* 
	* arguments:
	*
	* - integer:integer An integer representing which child node to get. For child nodes numbering starts at 1.
	* 
	* example:
	*
	*  $("#menu").child();
	*
	*/
	Element.prototype.child = function ( position ) {
		return this.children[position - 1];
	};
	
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
	Element.prototype.bind = function( event, callback ) {
		this.addEventListener(event, callback, false);
	};
	
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
	*  $("#"doIt").unbind("click", doSomething);
	* 
	*/
	Element.prototype.unbind = function( event, callback ) {
		this.removeEventListener( event, callback, false );
	}
	
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
	
	/** 
	* 
	* An array to hold blocks of code to execute. This will be used by the $.loadPage method, which will be used by the $.ready method for executing blocks of code when the document is ready for manipulation by scripts. This method is attached directly to the $ object.
	* 
	* ### $.onload
	*
	*/
	$.onload = [];
	
	/** 
	* 
	* A helper method to execute multiple functions at the same time. It is used by the $.ready method to execute multiple blocks of code when the document is ready for manipulation by scripts. This method is attached directly to the $ object.
	*
	* ### $.loadPage
	*
	* syntax:
	*
	*  $.loadPage();
	* 
	* example:
	*
	*  $.loadPage();
	*
	*/
	$.loadPage = function ( ) {
		if (arguments.callee.done) {
			return false;
		}
		arguments.callee.done = true;
		var i = 0; len = $.onload.length;
		while (i < len) {
			$.onload[i]();
			i++;
		}
	};
	
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
	$.ready = function ( callback ) {
		this.onload.push(callback);
		if (document.addEventListener) {
			document.addEventListener("DOMContentLoaded", this.loadPage, null);
		}
	};
	
	/** 
	* 
	* An array of events to be removed before a node is deleted from a document. This array is attached directly to the $ object.
	* 
	* ### $.events
	*
	*/
	$.events = ['onmousedown', 'onmouseup', 'onmouseover', 'onmouseout', 'onclick', 'onmousemove', 'ondblclick', 'onerror', 'onresize', 'onscroll', 'onkeydown', 'onkeyup', 'onkeypress', 'onchange', 'onsubmit', 'onload', 'ontouchstart', 'ontouchmove', 'ontouchend', 'ontouchcancel', 'ongesturestart', 'ongesturechange', 'ongestureend', 'onorientationchange'];
	
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
	* 
	* example:
	*
	*   $('#content').xhr('/data/customers.html');
	*
	*/
	Element.prototype.xhr = function ( url, options ) {
		var opts = null;
		if (!options) {
			opts = {};
		} else {
			opts = options;
		}
		if (typeof options === "function") {
            opts = {};
            opts.callback = options;
        }
		var that = this;
		var request = new XMLHttpRequest();
		var method = opts.method || 'get';
		var async = opts.async || false;
		var params = opts.data || null;
		request.open(method, url, async);
		request.onload = (opts.callback != null) ? opts.callback : function () {
			that.fill(this.responseText);
		};
		request.send(params);
		return this;
	};
	
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
	Element.prototype.xhrjson = function ( url, options ) {
		if (options === "undefined") {
			return this;
		}
		var that = this;
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
		options.callback = callback;
		this.xhr(url, options);
		return this;
	};

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

	$.hideURLbar = function() {
		window.scrollTo(0, 1);
	}; 
	
	$.importScript = function ( url ) {
		$("body").insertAdjacentHTML("beforeEnd", "<script type='text/javascript' src='"+url+"'></script>");
	};
	
	/** 
	* 
	* A method to update the height and width of article and sections tags after the mobile device's orientation has changed. This is necessary because the device's viewport is not the same as the browser window, so that 100% does not result in what you would think it would.
	*
	* @method
	* 
	* ### updateOrientation
	*
	* syntax:
	*
	*  $.updateOrientation();
	* 
	* example:
	*
	*  $.updateOrientation();
	*
	*/
	$.updateOrientation = function() {
		var iphone = /iphone/i.test(navigator.userAgent);
		var ipad = /ipad/i.test(navigator.userAgent);
		var android = /android/i.test(navigator.userAgent);
		$$("article").forEach(function(article) {
			article.css("width: " + window.innerWidth + "px;");
		});
		if (iphone || ipad || android) {
			if (window.orientation === 0 || window.orientation === 180) {
				$$("article").forEach(function(article) {
					article.css("width: " + window.innerWidth + "px;");
				});
				$$("section").forEach(function(section) {
					section.css("width: " + window.innerWidth + "px;");
				});
				$.hideURLbar();
			} else {
				$$("article").forEach(function(article) {
					article.css("width: " + window.innerWidth + "px;");
				});
				$$("section").forEach(function(section) {
					section.css("width: " + window.innerWidth + "px;");
				});
				$.hideURLbar();
			} 
		}
	};
	
	/**
	*
	* Version of ChocolateChip.
	*/
	$.version = "1.0.1";
	
	/** 
	* 
	* Attach objects to the global window object.
	* 
	* ### window.$
	* ### window.$$
	*
	*/
	window.$ = $;
	window.$$ = $$;
})(); 

/**
* Initialization block for GUI components. ".button.back" implements automatic backwards navigation when the user clicks a back button. ".drilldown li" implements automatic forward navigation for drilling down into an application.
*/

$.ready(function() {
 	$$(".button.back").forEach(function(button) {
		button.bind("click", function() {
			var parent = navigation[navigation.length-1];
			navigation.pop();
			$(navigation[navigation.length-1]).addClass("current");
			$(parent).removeClass("current");
			$(navigation[navigation.length-1]).removeClass("reverse");
			$.hideURLbar();
		});
	});
	$$(".drilldown li").forEach(function(item) {
		item.bind("click", function() {
			$(navigation[navigation.length-1]).removeClass("current");
			$(navigation[navigation.length-1]).addClass("reverse");
			if (!$("#Home").hasClass("reverse")) {
				$("#Home").addClass("reverse");
			}
			$(this.getAttribute("rel")).addClass("current");
			navigation.push(this.getAttribute("rel"));
			$.hideURLbar(); 
		});
	}); 
 });