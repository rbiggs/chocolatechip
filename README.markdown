---
ChocolateChip - A Compact JavaScript Framework for Mobile Webkit
---
 
 
ChocolateChip is a jQuery-like framework. It retains its small size by avoiding desktop and legacy browser support, choosing to support the latest standards in modern mobile browsers using Webkit.
 
Although it resembles jQuery it differs in that there is no object obfuscation when you get a node or a node collection. At any time you can switch to using regular JavaScript with ChocolateChip. For example, in ChocolateChip you get real "this" not $(this). ChocolateChip differs from jQuery in that it does not hide node results in an internal iterator. If you want one node, you use $(selector). If you want to get a collection of nodes you use $$(selector). $(selector) will always return the first match it finds. $(selector) will return a collection of all matches. ChocolateChip converts the collection to an array so that you can use array methods on it, such as forEach, map, indexOf, filter, etc.
 
    // Will only affect the first paragraph.
    $("p").css(" background-color: yellow; color: red; "); 
   
When you get a collection with $$(selector) you get back an array. You can act on all items in that array using Array.forEach() or Array.each(). The later is a convenience for typing less. Pass it an anonymous function, inside of which you define what you want to do with each item in the array. You can pass an alias as the anonymous function's parameter which will represent each item in the array during the iteration process.
 
    // Get all paragraphs (use "paragraph" as an alias for each array item):
    $$("p").forEach(function(paragraph) {
       paragraph.css("{ background-color: yellow; color: red; }"); 
    });
	// or: 
    $$("p").each(function(paragraph) {
       paragraph.css("{ background-color: yellow; color: red; }"); 
    });
 
##Be Ready When You Need To
 
ChocolateChip provides a convenient way to allow you to access the DOM when it is done loading but before it gets output to the screen. You use the $.ready method and pass it an anonymous function inside of which you put all the code you wish to execute:
 
	$.ready(function() {
		$$("li > a").forEach(function(link) {
    		link.css("display: inline-block; border: solid 1px red;");
        	link.bind("touchstart", function handleLink() {
				// Do something here.
        	});
       	});
    });
 
You can use a shorthand for as well by passing the anonymous function directly to the $() method:
 
    $(function() {
		$$("li > a").forEach(function(link) {
        	link.css({ display: "inline-block", border: "solid 1px red" });
        	link.bind("touchstart", function handleLink() {
            	// Do something here.
        	});
      	});
    });
 
##Handling Events
 
ChocolateChip allows you to bind events or delegate them. 

**Example:**
	// This code attaches touchstart event listeners to each list item:
    $("menu li").bind("touchstart", function() {
    	$(this.getAttribute("href")).setAttribute("ui-navigation-status", "current");	
    });
    // This code attaches an event listener to the menu to listen for 
    // touchstart events on the list items. There is only one event listener, unlike above.
    $("menu").delegate("li", "touchstart", function(item) {
    	$(item.getAttribute("href")).setAttribute("ui-navigation-status", "current");
    });
 
##ChocolateChip functions:
 
    $() // Get the first ocurrence of the selector
    $.extend() // ECMAScript5 Object extension
    $.$$() // This gets aliased to just $$ for convenience. Returns a collection of nodes
    $.noop() // An array that does nothing to use where a function is required.
    $.concat() // Creates a string from the arguments.
    $.make() // Create valid nodes from a string of markup.
    $.html() // Alias for $.make().
    $.processJSON() // This takes the result of an Ajax request for JSON and makes it available for processing.
    $.delay() // Allows you to delay the execution of a code block.
    $.defer() // Allows you to designate a block of code to be executed after other code.
    $.enclose() // Enclose the result of one method in another.
    $.compose() // Pass the results of one method to another and then another.
    $.loadEvent() // Chain blocks of code for execution during the body's onload event.
    $.DOMReadyList[] // An array of blocks of code to execute when DOMContentLoaded fires.
    $.executeWhenDOMReady() // A method to execute the DOMReadyList
    $.ready() // A method that executes a block of code when DOMContentLoaded fires.
    $.UIHideURLbar() // Hide the url bar.
    $.importScript() // Dynamically import an external script.
    $.localItem() // Get or set data in localStorage.
    $.deleteLocalItem() // Delete item from localStorage.
    $.clearLocalItems() // Delete all items from localStorage.
    $.templates() // 
    $.templateCache()
    $.template()
    $.UIUpdateOrientationChange()
    $.UIListenForWindowResize()
    Function.prototype.bind()
    
**Array Extension:**
	
	[].each() // Iterate over an array:
	  
	// In the example below, item will be equal to each the value of each index of the array.
	// idx will be equal to the integer value of the array index, starting from 0.
	var arr = ["item 1", "item 2", "item 3", "item 4", "item 5"];
	arr.each(function(item, idx) {
		console.log("Item " + ++idx + " is: " + item);
	});
	
    [].eq(integer) // Return a specific index of an array.
    
    $$("li").eq(3);
    
    [].is() // Return all indices that match the argument.
    [].not() // Return all indices that do not match the argument.
    [].has() // Return all indices whose child nodes match the argument.
    [].hasNot() // Return all indices whose child nodes do not match the argument.
    [].prependTo() // Prepends the array of nodes to the argument.
    [].appendTo() // Appends the array of nodes to the argument.

**Object Extension:**

	Object.each() // Iterate over the object's keys.
	
	var obj = {"i-1": "item 1", "i-2":"item 2", "i-3":"item 3", "another-one":"item 4", "something-else":"item 5"};
	obj.each(function(key, value) {
		$("ol").append("<li>" + value + "</li>");
	}); 
**HTMLElement Extensions:**
 
    HTMLElement.previous() // Get the previous node.
    HTMLElement.next() // Get the next node.
    HTMLElement.first() // Get the first node of a set of siblings.
    HTMLElement.last() // Get the last node of a set of siblings.
    HTMLElement.childElements() // Get the child nodes that match the argument.
    HTMLElement.kids() // Same as HTMLElement.childElements().
    HTMLElement.siblings() // Get an element's siblings that match the argument.
    HTMLElement.ancestor() // Get an ancestor node base on class, id, tag, attribute or position.
    HTMLElement.closest() // Same as HTMLElement.ancestor().
    HTMLElement.is() //  Returns the element if it matches the argument.
    HTMLElement.not() // Returns the element if it does not match the argument.
    HTMLElement.has() // Returns the element if a child node matches the argument.
    HTMLElement.hasNot() // Returns the element if a child node does not match the argument.
    HTMLElement.clone() // Clone a node and/or its descendant nodes.
    HTMLElement.wrap() // Wrap markup around a node.
    HTMLElement.unwrap() // Unwarp markup from around a node.
    HTMLElement.text() // Get the text of a node.
    HTMLElement.fill() // Fill a node with text or markup.
    HTMLElement.empty() // Delete all child nodes of an element.
    HTMLElement.remove() // Delete a node from the document.
    HTMLElement.insert() // Insert a node into the document at designate place.
    HTMLElement.html() // Replace the node's content with new content.
    HTMLElement.prepend() // Insert content before the first child of the element.
    HTMLElement.append() // Insert content after the last child of the element.
    HTMLElement.before() // Insert content before designated node.
    HTMLElement.after() // Insert content after dsignated node.
    HTMLElement.hasClass() // Returns true or false.
    HTMLElement.addClass() // Adds the provided class to a node.
    HTMLElement.removeClass() // Removes the provided class from a node.
    HTMLElement.disable() // Sets the "disabled" attribute on a node.
    HTMLElement.enable() // Removes the "disabled" attribute from a node.
    HTMLElement.toggleClass() // Toggles a class or between two provided class.
    HTMLElement.getTop() // Returns the top of the node relative to the document.
    HTMLElement.getLeft() // Returns the left relative to the document.
    HTMLElement.css() // Get or set the style of an element.
    HTMLElement.bind() // Bind an event on an element.
    HTMLElement.unbind() // Remove an event from an element.
    HTMLElement.removeEvents() // Remove all events from the node and its descendants.
    HTMLElement.delegate() // Create an event delegate to trapping events on dynamic content.
    HTMLElement.trigger() // Trigger the designated event on an element.
    HTMLElement.anim() // Create a CSS-based transition.
    HTMLElement.xhr() // Make an Ajax request.
    HTMLElement.xhrjson() // Do basic JSON binding.
    HTMLElement.data() // Set data attributes on an element.
    HTMLElement.removeData() // Remove a data attribute from an element.
    HTMLElement.UICheckForOverflow() // Check for content overflow on an element.
 
**String methods:**
 
    String.capitalize() // Capitalize the first letter of a string. 
    String.capitalizeAll() // Capitalize all letters of a string.
 
**Properties:**
 
    $.events - an array
    $.iphone - a boolean
    $.ipad - a boolean
    $.ipod - a boolean
    $.android - a boolean
    $.webos - a boolean
    $.blackberry - a boolean
    $.touchEnabled - a boolean
    $.userAction - "click" on desktop, "touchstart" on mobile
    $.online - a boolean
    $.standalone - a boolean