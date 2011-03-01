//  ChocolateChip = A Mobile Framework
//  Robert Biggs 2010
//  License: BSD

//  Version: Beta

//  Utility methods:

//  Check and element to see if it has a particular class.
Element.prototype.hasClassName = function ( className ) {
  return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(this.className);
};
//  Add a class to an element.
Element.prototype.addClassName = function ( className ) {
  if (!this.hasClassName(className)) {
    this.className = [this.className, className].join(' ').replace(/^\s*|\s*$/g, "");
  }
};
//  Remove a class from an element.
Element.prototype.removeClassName = function ( className ) {
  if (this.hasClassName(className)) {
    var currentClasses = this.className;
    this.className = currentClasses.replace(new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)', 'g'), ' ').replace(/^\s*|\s*$/g, "");
  }
};
//  Toggle a class name on an element. 
Element.prototype.toggleClassName = function ( firstClassName, secondClassName ) {
	var firstClassCheck = new RegExp("(^|\\s)" + firstClassName + "(\\s|$)");
	var secondClassCheck = new RegExp("(^|\\s)" + secondClassName + "(\\s|$)");
	// If only one class was supplied,
		if (!secondClassCheck) {
			// if the element does not yet have it,
		   	if (!firstClassName.test(this.className)) {
			  	// add it to the element.
			  	this.addClassName(firstClassName);
		   	} else {
			  	// Otherwise, if the element does have
			  	// the class already, remove it.
			  	this.removeClassName(firstClassName);
			}
		// If a second class was supplied,
		} else if (secondClassName) {
			// check to see if the element already has it.
		   	if (!secondClassName.test(this.className)) {
			  	// If it does not, remove remove the first class.
			  	this.removeClassName(firstClassName);
			  	// Then add the second class.
			  	this.addClassName(secondClassName);
			// Otherwise, if the second class is found,
		} else {
			// remove it and add the first class.
			this.removeClassName(secondClassName);
			this.addClassName(firstClassName);
		}
	}
};
// Get text of node.
Element.prototype.text = function () {
	var elem;
	var t = "";
	// If an element was passed, get it's children,
	// otherwise assume it's an array
	elem = this.childNodes || this;
	// Look through all child nodes
	for (var i = 0; i < elem.length; i++) {
		// If it's not an element, append its text value
		// Otherwise, recurse through all the element's children.
		t += elem[i].nodeType != 1 ? elem[i].nodeValue : this.text(elem[i].childNodes);
	}
	// Return the matched text
	return t;
};
// Get style of node.
Element.prototype.getStyle = function(property) {
	return document.defaultView.getComputedStyle(this, "").getPropertyValue(property);
};
// Used to delete and element.
Element.prototype.remove = function() {
	this.parentNode.removeChild(this);
};
// Used to empty an element of its child nodes
Element.prototype.empty = function() {
	this.childNodes.foreach(function(elem) {
		elem.remove();
	});
};
// Used for fill and element with content.
Element.prototype.fill = function() {

};
// Used to insert elements inside another element
// at various positions: first, last, nth position.
Element.prototype.insert = function() {

};

(function() {
	// Returns first found instance of selector.
	// Useful for finding IDs, or single instances of selectors.
	var $ = function( selector ) {
		return document.querySelector(selector);
	}
	// Returns a collection of found nodes.
	var $$ = function( selector ) {
		return document.querySelectorAll(selector);
	};
	var ChocolateChip = function() {};
	// Create DOM nodes from a string of HTML.
	ChocolateChip.prototype = {
		make : function (htmlString) {
			// Initialize array to hold DOMified child nodes.
			var nodes = [];
			// Create a temporary node to receive the text to convert.
			var temp = document.createElement("div");
			// Inject the string into the temporary node.
			temp.innerHTML = htmlString;
			// Extract the DOM nodes out of the temporary node
			// into the nodes array.
			var len = temp.childNodes.length;
			for (var i = 0; i < len; i++) {
				nodes[i] = temp.childNodes[i];
			}
			// Return the array of nodes.
			return nodes;
		},
        // Methods for determining when the DOM is ready for access
        onload: [],
        // Method to fire multiple functions:
        loadPage: function () {
            if (arguments.callee.done) {
                return false;
            }
            arguments.callee.done = true;
            for (i = 0; i < ChocolateChip.prototype.onload.length; i++) {
                ChocolateChip.prototype.onload[i]();
            }
        },
        ready: function (callback) {
            this.onload.push(callback);
            document.addEventListener("DOMContentLoaded", this.loadPage, null);
        }		
	}
	window.cc = new ChocolateChip();
})();