#ChocolateChip.js
    
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
    Version 1.3.4



&nbsp;

##Function: $

This method uses JavaScript's document.querySelector() method to get the designated node. It will always return the first match. To get more a collection of nodes, use the [$$](#$$) method. A selector is required as the main argument. A second optional argument may be passed as a context for the selector. This is useful where you want to limit where ChococlateChip searches for a node, such as only as a descendant of a particular document node, avoiding possible matches outside that node. Optionally, you may pass the window or document object. Please note that all methods that extend HTMLElement will not work with these objects as they lack the interface for that functionality. If no selector is supplied, $() will return the document root.

**Syntax:**

    $(selector);
    $(selector, context);
    $(function);
    $();

**Parameters:**

- selector: A string defining a valid CSS selector.
- context: A string defining a valid CSS selector or an actual node.
- function: A function to execute when the document's DOM is fully loaded.

**Returns:** 

A valid document node. If no argument is supplied it returns the document root. If a function is passed, determines if the document is loaded already. If it is, it returns the executed function, if it is not loaded, it added a listener for DOMContentLoaded

**Example:**

    var item = $("#item");
    var menuItems = $(".menu > li"); // Will return the first list item only.
    $("section > p:first-of-type").css("color: red; background-color: yellow; padding: 10px;");
    var list = $("ul", mainList);
    // Passing an anonymous function is the same as $.read(function() { // do stuff }).
    $(function() {
    	console.log("The page is loaded and ready to manipulate.");
    });
    // Get the document height:
    var height = $(document).css('height');
    var d = $() // returns the document object.




&nbsp;

##Function: $.extend

A method to extend the ChocolateChip's $ method. This uses EC5's Object.defineProperty to extend objects without polluting the object's prototype. For older browsers that don't support this feature of ECMAScript5, ChocolateChip uses a simpler method of object prototype chaining for compatibility. If you simply want to extend $ itself, you can just pass in the object without the target object.

**Syntax:**

    $.extend(object, {
        // object literal here.
    });
    // Exetend $ itself by passing only the object:
    $.extend({
    	// Stuff here.
    });

**Parameters:**

- The object to extend. In most cases this will be $ or HTMLElement.prototype.
- An object literal of properties to add to the object. These can be variables, array or methods.

**Example:**

    $.extend($, {
        saySomething : function ( msg ) {
            console.log("This is what I have to say: " + msg);
        }
    });
    $.saySomething("This is a pretty cool feature!");
    
    $.extend(HTMLElement.prototype, {
        sing : function ( lyrics ) {
            console.log(msg);
        }
    });
    $("p:first-of-type").sing("Even a paragraph can sing!");
	
	// Extend $ by only passing in the new properties:
	$.extend({
		saySomething : function ( msg ) {
			console.log("This is what I have to say: " + msg);
		}
	});



&nbsp;

##Variable: $.version

Version: 1.3.4

**Example:**

    console.log("The version is: " + $.version);


&nbsp;

##Variable: libraryName

A variable holding the name of this library: "ChocolateChip".

**Example:**

	if ($.libraryName !== "ChocolateChip") {
		console.log("You are using some other library than ChocolateChip.");
		return;
	}


&nbsp;

##Function: Array.each

**Syntx:**

    Array.each(function(item, index){ //code });

**Parameters:**

- a function to execute. The function takes two arguments, the item at that iteration (equavalent to "this"), and the numerical index of the iteration.

**Example:**

    



&nbsp;

##Function: Array.eq

This method is used on node collections returned by $$. It allows you to pick out a particular node from the collection based on its index. Counting starts from 0. So Array.eq(0) would be the first node in the collection. If a negative number is provided, it, the counting starts from the end of the collection using 1 as the first. In other words, Array.eq(-1) will return the last node in the collection.  Array.eq(-2) will return the next to the last, etc.

**Syntx:**

    Array.eq(0);

**Parameters:**

- A valid index number. This may be positive or negative.

**Returns:**

The index of the array. 

**Example:**

   var p = $$("p");
   p.eq(5).addClass("important");
   p.eq(-2).addClass("nearTheEnd");


&nbsp;

##Function: Array.is

**Syntx:**

    Array.is();

**Parameters:**

- A valid tag.
- A valid class name.
- A valid attribute.

**Returns:**

Returns an array of all nodes that match the argument.

**Example:**

    // Find all messages that are p tags:
    var msg = $$('.messages').is('p');
    // Find all li tags with the class "menu":
    var menuItems = $$('li').is('.menu');
    // Find all buttons with the attribute "disabled":
    var disabled = $$('button').is('[disabled]');

&nbsp;

##Function: Array.not

This method is the opposite of Array.is. It returns an array of all nodes that do not match the argument.

**Syntx:**

    Array.not();

**Parameters:**

- A valid tag.
- A valid class name.
- A valid attribute.

**Returns:**

Returns an array of all nodes that do not match the argument.

**Example:**

    // Find all messages that are not p tags:
    var msg = $$('.messages').not('p');
    // Find all li tags that do not have the class "menu":
    var menuItems = $$('li').is('.menu');
    // Find all buttons that are not disabled:
    var disabled = $$('button').not('[disabled]');




&nbsp;

##Function: Array.has

This method allows you to filter an array of nodes based on each node's child nodes. You can define the child nodes by tag, class or attribute. The match will return a node if at least one of its child nodes matches the argument.

**Syntx:**

    Array.has();

**Parameters:**

- A valid tag.
- A valid class name.
- A valid attribute.


**Returns:**

An array of nodes whose child node(s) match the argument.

**Example:**

    // Find all messages that contain a span tag:
    var msg = $$(".message").has("span");
    // Find all items with a child node of class "status":
    var complete = $$("p.tasks").has(".status");
    // Find all items with a disabled child node:
    var disabledItems = $$(".widget").has("[disabled]");


&nbsp;

##Function: Array.hasNot

This method allows you to filter an array of nodes based on each node's child nodes. You can define the child nodes by tag, class or attribute. The match will return a node if at least one of its child nodes does not match the argument.

**Syntx:**

    Array.hasNot();

**Parameters:**

- A valid tag.
- A valid class name.
- A valid attribute.

**Returns:**

An array of nodes whose child node(s) do not match the argument.

**Example:**

    // Find all messages that do not contain a span tag:
    var msg = $$(".message").hasNot("span");
    // Find all items without a child node of class "completed":
    var todo = $$("p.tasks").hasNot(".completed");
    // Find all items with a disabled child node:
    var disabledItems = $$(".widget").hasNot("[disabled]");




&nbsp;

##Function: Array.prependTo

This method inserts an array of nodes before the contents of the selector. If the selector has no children, the result is the same as an insertion. When prependTo iterates on an array, the default would normally be for the array's contents to be reverse after inserting. This is probably not what the user would expect, so prependTo automatically reverses an array before prepending so that the inserted nodes are in the same order as in the original array. If this is not the behavior you want, you can simply reverse the array before prepending it. 

**Syntx:**

    Array.prependTo(selector);


**Parameters:**

- Any valid selector.

**Example:**

   var arr = $.make('<li>One</li><li>Two</li><li>Three</li>');
   // Insert before whatever items are already in the list:
   arr.prependTo('ol');
   // or simply:
   $.make('<li>One</li><li>Two</li><li>Three</li>').prependTo('ol');


&nbsp;

##Function: Array.appendTo

This method insert an array of nodes after the contents of the selector. If the selector has no children, it is the same as an insertion.

**Syntx:**

    Array.appendTo(selector);

**Parameters:**

- Any valid selector.

**Example:**

   var arr = $.make('<li>Five</li><li>Six</li><li>Seven</li>');
   // Insert after whatever items are already in the list:
   arr.appendTo('ol');
   // or simply:
   $.make('<li>Five</li><li>Six</li><li>Seven</li>').appendTo('ol');





<a name="$$"></a> 


&nbsp;

##Function: $.$$ 

This method uses document.querySelectorAll to return a DOM collection as an array. $.$$() gets aliased as window.$$() so that you can uses it as just $$() instead of $.$$(). A second optional argument may be passed as a context for the selector. This is useful where you want to limit where ChococlateChip searches for nodes, such as only as a descendant of a particular document node, avoiding possible matches outside that node.

**Syntax:**

    $$(selector);
    $$(selector, context);
    
**Parameters:**

- A string defining a valid CSS selector.
- Context: A string defining a valid CSS selector or an actual node.

**Returns:**

An array of nodes comprising an element collection.

**Example:**

    var sections = $$("section");
    $$("section > p").forEach(function(p) {
        p.css("color: red; background-color: yellow; padding: 10px;");
    });





&nbsp;

##Function: $.noop

**Syntx:**

    $.noop();

**Example:**

    // Use where code expects a function:
    function doSomething(callback) {
    	console.log("We're doing something here.");
    	callback();
    }
    doSomething($.noop);




&nbsp;

##Function: $.concat

A method to create strings. Generally speaking, string concatenation is terribly inefficient. I'm talking about using the "+" operator with strings. The more pieces you add the more inefficient it becomes. In contrast, In contrast, collapsing an array into a string using Array.join() is very quick and efficient. $.concat uses this array method to concatenate strings efficiently. The method can take as arguments an array, or a comma separated series of strings (see Parameters below). In the case of a list of strings as arguments, it converts the arguments object into an array and joins it.

**Syntx:**

    $.concat(Array);
    $.concat(String, String, String, String);

**Parameters:**

- An array of strings to concatenate.
- A comma separated list of strings to concatenate.

**Returns:**

A string.

**Example:**

    var str1 = $.concat(['This',' ','an',' ','example',' ','of',' ','string',' ','concatenation','.']);
    var str2 = $.concat('This',' ','an',' ','example',' ','of',' ','string',' ','concatenation','.');




&nbsp;

##Function: $.isArray

A method to test if the argument is an array.

**Syntx:**

    $.isArray(Array);

**Parameters:**

- A valid array.

**Returns:**

A boolean true or false.

**Example:**

    // This returns true:
    var arr = $.isArray([]);



&nbsp;

##Function: $.isFunction

**Syntx:**

    $.isFunction(Function);

**Parameters:**

- A valid function.

**Returns:**

A boolean true or false.

**Example:**

    // This will return true:
    var func = $.isFunction($.noop);



&nbsp;

##Function: $.isObject

**Syntx:**

    $.isObject(Object);

**Parameters:**

- A valid object.

**Returns:**

A boolean true or false.

**Example:**

    // This returns true:
    var obj = $.isObject({});


&nbsp;

##Function: $.uuidNum

A method to create a random uuid number used by the cache to create a unique id for elements with cached data.




&nbsp;
		
##Function: $.makeUuid 

A method to create a unique id for elements that are getting data cached on them.  All it does is concatenate "chch_" to the uuid created by $.uuidNum.



&nbsp;
		
##Variable: $.uuid

This is used by the cache to create a unique id for elements that don't have one. Every time a new cache is stored on a node, the value of $.uuid gets increased.



&nbsp;
		
##Object: $.chch_cache

This object holds the cache and methods used by the cache for storing, retrieving and deleting data, and for storing events bound to nodes. Data gets stored on $.chch\_cache.data and events in $.chch_cache.events. You never need to do anything to use the event cache. It gets used internally by Element.bind() and Element.unbind(). Similarly, you access the data cache through Element.cache() and Element.uncache().

The cache's data object has the following members:

- keys: This is an array of keys used to identify their corresponding data.
- values: This is an array of data whose index corresponds to its identifying key in the keys array.
- set: Sets the key and value in the cache.
- get: Retrieves the value from the cache based on the key.
- hasKey: Returns a boolean.
- hasData: Returns a boolean.
- delete: A method to delete a key and value from their arrays.

You can inspect the keys and values of the data cache as follows:

    $.chch_cache.data.keys // returns an array of all keys in the data cache.
    $.chch_cache.data.keys[0] // returns only the first key in the data cache.
    $.chch_cache.data.values // returns an array of all values in data the cache.
    $.chch_cache.data.values[0] // returns the first value in the data cache.

The cache's events object has the following members:

- keys: This is an array of keys used to identify events bound to a node.
- values: This is an array of events whose index corresponds to its identifying key in the keys array.
- set: Sets the key and value in the event cache.
- hasKey: Returns a boolean.
- delete: A method to delete a key and value from their arrays.

You can inspect the keys and values of the event cache as follows:

	$.chch_cache.events.keys // returns an array of all keys in the events cache.
	$.chch_cache.events.keys[0] // returns only the first key in the events cache.
	$.chch_cache.events.values // returns an array of all values in the events cache.
	$.chch_cache.events.values[0] // returns the first value in the events cache.


&nbsp;

##Function: Element.cache

A method to cache data in relation to a DOM node. The data can be a variable, boolean, string, array, function, object or reference to another node. It uses an id to identify the node in the cache. If the node does not have an id, one is created using a uuid-based technique. This same method also serves to retrieve the data cache for a node when executed on a node without any parameters. A node can have only one cache. So, if there is already a cache stored for a node and you attempt to cache some other data, the previous data will be overridden. **When dealing with dynamic content that can be replaced at any given time, if you cache data on such nodes you'll need to uncache them before replacing them or you'll create a memory leak. The best approach in such a case is to cache the data on the parent node of the dynamic content.**


**Syntax:** 

    Element.chache(data);
    var data = Element.cache();

**Parameters:**

- data: a variable, string, array, object, function or reference to another node.
			
**Returns:**

    The node with the cache attached.

**Examples:**

    // Set a chache on a node:
    $('tableview').cache({item: 'milk', price: '$1.00'});
    // Retrieve the cache of a node:
    var data = $('tableview').cache(); // returns {item: 'milk', price: '$1.00'}
    // You can access the individual members of a cached object as follows:
    var item = $('tableview').cache().item; // returns 'milk'
    var price = $('tableview').cache().price // returns '$1.00'




&nbsp;

##Function: Element.uncache

A method to remove the cache from a node. This method gets called automatically when using Element.remove().

**Syntax:**

    Element.uncache();
    

**Returns:**

    The node without it's cache removed. If the node has no cache, it returns the node as normal.
    
**Examples:**

    $('tableview').uncache();
    



&nbsp;

##Function: Element.find

A method to get a node as the descendant of the element find is executed on. This will return the first match for the selector provided.

**Syntax:**

	var element = Element.find(selector);
	
**Returns:** 
	A single node.
	
**Example:**

	var main = $("#main");
	var menu = main.find(".menu"); // Get the first menu.
	var menu3 = main.find(".menu:nth-of-typ(3)"); // Get the third menu.
	var menuLast = main.find(".menu.last-of-type"); // Get the last menu.
	
	
	

&nbsp;

##Function: Element.findAll

A method to get a collection of nodes that are descendants of the element on which findAll is executed and which match the selector provided.

**Syntax:**

	var elements = Element.findAll(selector);

**Returns:**

	An array of nodes.
	
**Example:**

	var main = $("#main");
	var menus = main.find(".menu"); // Get all menus.
	// Or operate directly on the returned results:
	main.find(".menu").forEach(function(menu)) { 
		menu.css("display", "none");
	});



&nbsp;

##Function: Element.previous

This method returns the previous sibling of the element upon which it executes. This method is attached directly to the Element object.

**Syntax:**

    Element.previous();

**Returns:**

The previous sibling node. 

**Example:**

    var previousItem = $("#item").previous();

 


&nbsp;

##Function: Element.next

This method returns the next sibling of the element upon which it executes. This method is attached directly to the Element object.

**Syntax:**

    Element.next();

**Returns:**

The next sibling node. 

**Example:**

    var nextItem = $("#item").next();


 

&nbsp;

##Function: Element.first

A method to get the first child of an element while avoiding empty text nodes. This method is attached directly to the Element object.

**Syntax:**

    Element.first();

**Example:**

(start code)
$("#menu").first();
(end)


 

&nbsp;

##Function: Element.last

A method to get the last child of an element, while avoiding empty text nodes. This method is attached directly to the Element object.

**Syntax:**

    Element.last();

**Example:**

    $("#menu").last();


<a name="elementAncestor"></a>




&nbsp;

##Function: Element.childElements

A method to get all of the child nodes of an element. This will not include empty text nodes or comments. If a selector is passed as an argument, the child nodes will be filtered by that selector. 

**Syntx:**

    Element.childElements();

**Parameters:**

- Any valid selector: tag, class or attribute.

**Returns:**

An array of child nodes.

**Example:**

    // Get all child nodes of the element:
    var descendants = $('#main').childElements();
    // Get all child nodes that are paragraphs:
    var descendants = $('#main').childElements('p');
    // Get all child nodes that has a class 'fun':
    var descendants = $('#main').childElements('.fun');
    // Get all child nodes that are disabled:
    var disabledEls = $('#main').childElements('[disabled=disabled]');
   


&nbsp;

##Function: Element.kids

This is just a shortcut for Element.childElements.






&nbsp;

##Function: Element.siblings

A method to get the siblings of an element. This will not include empty text node or comments. If a selector is passed as an argument, the siblings will be filtered by that argument.

**Syntx:**

    Element.siblings();

**Parameters:**

- Any valid selector: tag, class or attribute.

**Returns:**

An array of sibling nodes.

**Example:**

    // Get all siblings of the element:
    var sibs = $('#menu').siblings();
    // Get all siblings that are paragraphs:
    var sibs = $('#menu').siblings('p');
    // Get all siblings that have a class 'fun':
    var sibs = $('#menu').siblings('.fun');
    // Get all siblings that do not have the class 'fun':
    var sibs = $('#menu').siblings().not('.fun');





&nbsp;

##Function: Element.ancestor

A method to retrieve an ancestor of a node. It can find an ancestor by numeric postion, tag, class or id. Besides class and id, no other attributes can be parsed and will throw an exception.

**Parameters:**

- value: Either a number, a class, an id or a tag.

**Syntax:** 

    Element.ancestor(selector)

**Returns:**

A matched ancestor node. 

**Example:**

    // Will return the third ancestor tag:
    var theAncestor = $("#someID").ancestor(3);
    // Will return the element with id of "#main" 
    // if it is an ancestor of "#someID":
    var theAncestor = $("#someID").ancestor("#main");
    // Will return an element with a class of ".myView" if
    // it is an ancestor of "#someID":
    var theAncestor = $("#someID").ancestor(".myView");
    // Will return a subview tag if it is an ancestor of "#someID":
    var theAncestor = $("#someID").ancestor("subview");




&nbsp;

##Function: Element.closest

This is a shortcut for ancestor. This is for those used to using the jQuery function of the same name and functionality.




&nbsp;

##Function: Elements.is

A method to test if the element matches the argument passed.

**Syntx:**

    Element.is(selector);

**Parameters:**

- A valid tag.
- A valid class name.
- A valid attribute.

**Returns:**

If the element matches the argument, it returns the element, otherwise it returns boolean false.

**Example:**

   // Return the element if its a paragraph:
   var p = $("#content").is('p');
   // Return the element if it has the class 'content':
   var content = $('article').is('.content');
   // Return the element if it has the atribute 'disabled':
   var disabled = $('button').is('[disabled]');



&nbsp;

##Function: Element.not

A method to test is the element does not match the argument passed.

**Syntx:**

    Element.not(selector)

**Parameters:**

- A valid tag.
- A valid class name.
- A valid attribute.

**Returns:**

If the element does not match the argument, it returns the element, otherwise it returns boolean false.

**Example:**

   // Return the element if it is not a paragraph:
   var notParagraph = $("#content").not('p');
   // Return the element if it does not have the class 'content':
   var notContent = $('article').not('.content');
   // Return the element if it has the atribute 'disabled':
   var enabled = $('button').not('[disabled]');




&nbsp;

##Function: Element.has

A method to test is the element has a child node that matches the argument.

**Syntx:**

    Element.has(selector);

**Parameters:**

- A valid tag.
- A valid class name.
- A valid attribute.

**Returns:**

If the element has a child node that matches the argument, it returns the element, otherwise it returns boolean false.

**Example:**

    // Return the element if it has a child node of this tag type:
    var p = $('#content').has('p');
    // Return the element if it has a child node with this class:
    var hasNewContent = $('#content').has('.new');
    // Return the element if it has a child node with this attribute:
    var somethingDisabled = $('#content').has('[disabled=disabled]');
    



&nbsp;

##Function: Element.hasNot

A method to test if the element does not have a child node that matches the argument.

**Syntx:**

    Element.hasNot(selector);

**Parameters:**

- A valid tag.
- A valid class name.
- A valid attribute.

**Returns:**

If the element has a child node that does not match the argument, it returns the element, otherwise it returns boolean false.

**Example:**

    // Return the element if it does not have a child node of this tag type:
    var p = $('#content').hasNot('p');
    // Return the element if it has a child node with this class:
    var doesntHaveNewContent = $('#content').hasNot('.new');
    // Return the element if it does not have a child node with this attribute:
    var notDisabled = $('#content').hasNot('[disabled=disabled]');



         

&nbsp;

##Function: $.make

This method creates nodes from a string of valid HTML passed as an argument. The result is an array of one or more nodes. By iterating this array you can insert them into a document. This method is attached directly to the $ object.

**Parameters:**

- A string defining nodes to create.
- An array of valid nodes existing in memory.

**Syntax:**

    $.make(string);

**Returns:**

A collection of new nodes. 

**Example:**

    var paragraph = $.make("<p>This is a paragraph</p>");



         

&nbsp;

##Function: $.html

This is an alias for $.make to represent what it does better.



 

&nbsp;

##Function: $.replace

A method to clone a node. If a boolean value that evaluates to true is passed as an argument, the method will clone the node and all its child nodes, otherwise it clones only the node itself. This method is attached directly to the Element object.

**Syntax:**

    $.replace(newNode, oldNode);

**Parameters:**

- newNode: A a node to with which to replace.
- oldNode: The node to be replaced.

**Example:**

    var newNode = $.make("<div>A new div</div>");
    $.replace(newNode, $("#menu"));
    


$nbsp;

##Function: $.require

Function to import an external script. The script can be on any domain without cross domain access issues.

**Syntax:**

   $.require(src, callback);
   
**Parameters:**

- src: A valid uri for a script.
- callback: an optional callback to execute when the script is fully loaded.

**Example:**

    $.require('scripts/importantScript.js', function() {
       // Do stuff with the variables, functions and objects 
       // in importantScripts.js
    });                
                     

&nbsp;

##Function: Element.empty

Remove all child nodes of an element. This method invokes the removeEvents method first to remove any attached events and thereby prevent memory leaks. This method is attached directly to the Element object.

**Syntax:**

    Element.empty();

**Example:**

    $("#item").empty();


 

&nbsp;

##Function: Element.clone

A method to clone a node. If a boolean value that evaluates to true is passed as an argument, the method will clone the node and all its child nodes, otherwise it clones only the node itself. This method is attached directly to the Element object.

**Syntax:**

    Element.clone();

**Parameters:**

- Any boolean value.

**Returns:** 

The clone of an element. 

**Example:**

    var menu = $("#menu").clone(true);


 

&nbsp;

##Function: Element.wrap

A method to wrap a node in markup. This method is attached directly to the Element object.

**Syntax:**

    Element.wrap(string);

**Parameters:**

- string: A string of valid HTML markup in which to encase the element.

**Example:**

    $("#menu").wrap("<nav id='main'></nav>");

                            
                             

&nbsp;

##Function: Element.unwrap

A method to unwrap a node by removing its parent node. It has a failsafe to stop removing nodes when it reaches the body tag.

**Syntax:**

    Element.unwrap();

**Example:**

    $("#menu").unwrap();


 

&nbsp;

##Function: Element.text

This method adds text to the target element, replacing whatever child nodes it might have. If no value is passed as an argument, the method returns the text value of all child nodes of the target element. This method is attached directly to the Element object.

**Syntax:**

    $(selector).text(string);
    $(selector).text(variable);
    $(selector).text();

**Parameters:**

- string: A string of text to add to an element.
- variable: A string of text to add to an element.

**Returns:**

The text nodes of the element. 

**Example:**

    $("#item").text("This is an example of added text.");
    var textValue = $("#item").text();


 

&nbsp;

##Function: Element.fill

Replace element's childNodes with content. This method is attached directly to the Element object.

**Syntax:**

    Element.fill(content);

**Example:**

    $("#item").fill("Something to say here.");


 

&nbsp;

##Function: Element.empty

Remove all child nodes of an element. This method invokes the removeEvents method first to remove any attached events and thereby prevent memory leaks. This method is attached directly to the Element object.

**Syntax:**

    Element.empty();

**Example:**

    $("#item").empty();


 

&nbsp;

##Function: Element.remove

Remove an element from the document. This method is attached directly to the Element object. This method automatically calls Element.uncache to first remove any data cached for this node.

**Syntax:**

    Element.remove();

**Example:**

    $("#item").remove();


 

&nbsp;

##Function: Element.insert

A method to insert a node or nodes at nth position in the child node collection of the element on which the method is being called. This can be the first position, the last position, or anywhere in between these. If no position is passed as an argument it defaults to last position. If the parent element has no child nodes, the method inserts the new element as the first child of the parent element. This method is attached directly to the Element object.

**Syntax:**

    $.insert( content, position );

**Parameters:**

- A valid node to insert into the child node collection of another node.
- A string of markup to insert.
- A string with a value for 'first' or 'last' for the position to insert.
- An integer indicating the position in the target element's child node collection at which to insert.

**Example:**

    $.itemNumber = 1;
    $$("p").forEach(function(item) { 
        item.insert( $.make("<span>Introductory Matter: " + $.itemNumber + " .</span>"), "first");
        ++$.itemNumber;
    });
    $.itemNumber = null;
    




&nbsp;

##Function: Element.html

This method is basically the same as doing Element.empty().insert(). It performs and Element.empty() on the element before inserting the content.

**Syntx:**

    Element.html(content);

**Parameters:**

- A valid node to insert into the child node collection of another node.
- A string of markup to insert.
- A string with a value for 'first' or 'last' for the position to insert.
- An integer indicating the position in the target element's child node collection at which to insert.


**Example:**    

    var arr = '<li>One</li><li>Two</li><li>Three</li>';
    $('ul').html(arr);
    // or:
    $('ul').html('<li>One</li><li>Two</li><li>Three</li>');


&nbsp;

##Function: Element.prepend

A method to prepend content to a node. The content can be a string of valid markup, an array of nodes, or a single node.

**Syntx:**

    Element.prepend(content);

**Parameters:**

- A valid node to insert.
- An array of nodes to insert.
- A string of markup to insert.

**Example:**    

    var newNode = $.make('<p>A new node!</p>');
    $('#content').prepend(newNode);
    // or:
    $('#content').prepend('<p>A new node!</p>');




&nbsp;

##Function: Element.append

A method to append content to a node. The content can be a string of valid markup, an array of node, or a single node.

**Syntx:**

    Element.append(content);

**Parameters:**

- A valid node to insert.
- An array of nodes to insert.
- A string of markup to insert.

**Example:**    

    var newNode = $.make('<p>A new node!</p>');
    $('#content').append(newNode);
    // or:
    $('#content').append('<p>A new node!</p>');





 

&nbsp;

##Function: Element.before

A method to insert content before the node upon which it operates. This method is attached directly to the Element object.

**Syntax:**

    Element.before(node);

**Parameters:**

- node: A valid node to insert before another node.

**Example:**

    $.itemNumber = 1;
    $$("p").forEach(function(item) { 
        item.before( $.make("<h1>Title " + $.itemNumber + "</h1>"));
        ++$.itemNumber;
    });
    $.itemNumber = null;


 

&nbsp;

##Function: Element.after

A method to insert content consisting of a node or nodes before the node upon which it operates. This method is attached directly to the Element object.

**Syntax:**

    Element.after(node);

**Parameters:**

- node: A valid node to insert before another node.

**Example:**

    $.itemNumber = 1;
    $$("p").forEach(function(item) { 
        item.after( $.make("<p>Addendum " + $.itemNumber + "</p>"));
        ++$.itemNumber;
    });
    $.itemNumber = null;



&nbsp;

##Function: Element.prepend

A method to insert content at the beginning of an element's child nodes. This is different from the result of Element.before, which places the content before the element. Prepend creates a new child node inside its element.

**Syntax:** 

	Element.prepend(node);

**Parameters:**

- node: A valid node to insert as the first child of the parent.

**Example:**

	var mainContent = $("#main .content");
	mainContent.prepend("<h2>This is important!</h2>");


&nbsp;

##Function: Element.append

**Syntax:**

	Elemnt.append(node);

**Parameters:**

- node: A valid node to insert as the last child of the parent.

**Example:**

	var mainContent = $("#main .content");
 	mainContent.append("<p class='finalNote'>Before you start downloading this file, make sure you have all the windows in your house open and that you have a quick and secure escape route available.</p>");




&nbsp;

##Function: Element.hasClass

Check an element to see if it has a particular class. This method is attached directly to the Element object.

**Syntax:**

    Element.hasClass(className);

**Parameters:**

- className: The name of the CSS class to check for.

**Example:**

    Element.hasClass("hover");


 

&nbsp;

##Function: Element.addClass

Add a class to an element. This method is attached directly to the Element object.

**Syntax:**

    Element.addClass(className);

**Parameters:**

- className: The name of the CSS class to add.

**Example:**

    $("#item").addClass("hover");


 

&nbsp;

##Function: Element.removeClass

Remove a class from an element. This method is attached directly to the Element object.

**Syntax:**

     Element.removeClass(className);

**Parameters:**

- className: The name of the CSS class to remove.

**Example:**

    $("#item").removeClass("hover");

                                    
                                    

&nbsp;

##Function: Element.disable

A method to disable an element by adding the "disable" class and preventing mouse or touch interaction.

**Example:**

    $("#myItem").disabled();




&nbsp;

##Function: Element.enable

A method to facilitate re-enabling an element that was disabled by removing the "disabled" class and allow mouse and touch interaction.

**Example:**

    $("#myItem").enable();


 

&nbsp;

##Function: Element.toggleClass

Toggle a class on and off an element, or toggle between two classes. This method is attached directly to the Element object.

**Syntax:**

    Element.toggleClass(className);
    Element.toggleClass(className, className);

**Parameters:**

- firstClassName: The name of the first class to toggle.
- secondClassName: The name of the second class to toggle.

**Example:**

    $("#item").toggleClass("hover");
    $("#item").toggleClass("selected", "unselected");


 

&nbsp;

##Function: Element.getTop

Get the precise top position of an element in relation to the top viewport.

**Syntax:**

    $(selector).getTop();

**Example:**

    $("#item").getTop();
    var button = $(".button");
    var buttonTop = button.getTop();

 

&nbsp;

##Function: Element.getLeft

Get the precise left position of an element in relation to the left viewport.

**Syntax:**

    $(selector).getLeft();

**Example:**

    $("#item").getLeft();
    var button = $(".button");
    var buttonTop = button.getLeft();


 

&nbsp;

##Function: Element.css

Add a CSS declaration directly to an element. If a boolean value that equates to true is passed as a second, optional argument, the method will replace whatever inline CSS values are presently existing on the element, otherwise it appends the CSS declaration to whatever is already there. This method is attached directly to the Element object.

**Syntax:**

    Element.css(property);
    Element.css(property, value);
    Element.css(string of properties/values);
    Element.css(object literal of properties/values);

**Parameters:**

- style declaration: A string of valid CSS property/values enclosed in quotes.
- property: A string defining a CSS property.
- value: A string defining a CSS property value to set on an element.
- an object literal of valid CSS property value pairs. (Hyphenated properties must be quoted, otherwise properties which are single words do not require quotes. Values that are not simple integers must be quoted.)

**Returns:**

CSS property value pairs as inline cssText or the computed value of a CSS property.

**Example:**

    $("#item").css("font", "bold 12pt/14pt Arial, Helvetica, Sans-serif");
    console.log($("#item").css("font-size"));
    $("#item").css("font-size: 24px; color: blue; background-color: red;");
	$("#item").css({"font-size":"24px", color:"blue", "background-color":"red"});

You can use Element.css to get the value of a CSS property by passing the quoted property as an argument. You simply pass in the normal CSS property. If it is a hyphenated property, pass it in like that. 

**Example:**
    
    var bkcolor = $("#item").css("background-color");
    console.log("This item's background color is: " + bkcolor);
    
**Note:** Be aware that all values returned in this way are strings, even if they appear to be numerical values, such as height, margin, etc. So, if you need to do arithmetic with a returned value, you'll need to convert it from a string to a number. You can do this using parseInt:

    var itemWidth = $("#item).css("width");
    itemWidth = parseInt(itemWidth);
    var leftPos = $.getLeft("#item");
    var distance = itemWidth + leftPos;
    console.log("The item has a total distance of: " + distance);


&nbsp;

##Function: String.capitalize

Method to capitalize the first letter of a string. This method is attached directly to the $ object.

**Syntax:**

    String.capitalize();

**Parameters:**

- string: A string to capitalize.

**Returns:**

A string with the first word capitalized, if a single word then its first letter is capitalized. 

**Example:**
    
    var name = "robert";
    name.capitalize(); // returns Robert


&nbsp;

##Function: String.capitalizeAll

Method to capitalize the first letter of a words in a string. This method is attached directly to the $ object.

**Syntax:**

    $.capitalizeAll(string);

**Parameters:**

- string: A string to capitalize.

**Returns:**

A string with all words capitalized. 

**Example:**

    var name = $.capitalize("get out now"); // returns Get Out Now


&nbsp;

##Function: String.camelize

This takes a string of hyphenated values, removes the hyphens and capitalizes the first left of each section except the first.

**Syntax:**

    String.camelize();
    
**Returns:**

A string with hyphens removed and the First letter of each section capitalized.

**Example:**

    var recipe = "recipes-cake-name";
    recipe.camelize() // Returns recipesCakeName


&nbsp;

##Function: String.deCamelize
 
**Syntax:**

    String.deCamelize();

**Returns:**

A string with hyphens replacing the camel case notation.

**Example:** 

    var recipe = "recipesCakeName";
    recipe.deCamelize(); //Returns recipes-cake-name



 

&nbsp;

##Function: Element.bind

A method to attach events to elements.

**Syntax:**

    Element.bind(event, function);

**Parameters:**

- event: A string representing valid event handler, such as "click".
- function: Either named or anonymous. Note that a bound event that uses an anonymous function cannot be unbound. See last example below for how to avoid this.

**Example:**

    var doSomething = function() {
        console.log("I'm doing it now.");
    };
    $("#doIt").bind("click", doSomething);
    // or:
    $(".stop").bind("touchend", function() {
    console.log("Time to put an end to this!");
        this.remove();
    });


 

&nbsp;

##Function: Element.unbind

A method to remove events from elements.

**Syntax:**

    Element.unbind(event, callback);

**Parameters:**

- event: Event A string representing valid event handler, such as "click".
- function: A named function executed by the event handler.

**Example:**

    $("#doIt").unbind("click", doSomething);


<a name="elementRemoveEvents"></a>


&nbsp;

##Function: Element.removeEvents

Remove events from an element. This method uses an array of events owned by the global $ object to know which events to remove. This method is invoked before removing any nodes from a document to prevent memory leaks. This method is attached directly to the Element object.

**Syntax:**

    Element.removeEvents();

**Example:**

    $("#item").removeEvents();


 

&nbsp;

##Function: Element.delegate

A method to create event delegation. It uses the Element.ancestor method to check the ancestors of the event target to determine whether to execute the event or not.

**Syntax:**

    Element.delegate(selector, event, callback);

**Parameters:**

- selector: A valid selector for the target element(s).
- event: An event to be fired on the element.
- function: A callback to be executed in relation to the target element.

**Example:**

    $("body").delegate("p", "click", function(element) {
        Element.css("background-color: yellow");
    });


To trap a tag with an attribute, you can use a conditional check inside your delegate assignment:

    $("app").delegate("button", "touch", function(item) {
        // Check for button with "ui-implements" attribute:
        if (item.getAttribute("ui-implements") === "back") {
            // Processing code goes here.
        }
    });

**See Also:**

[Element.ancestor](#elementAncestor)

[$.events](#$events)


 

&nbsp;

##Function: Element.trigger

A method to fire events on elements.

**Syntax:**

    Element.trigger(event);

**Parameters:**

- event: An event to be fired on the element.

**Example:**

    $("#importantButton").bind("click", function() {
        $("#link").trigger("click");
    });


 

&nbsp;

##Function: Element.anim

A method to implement CSS-based transition animations on elements.

**Syntax:**

    Element.anim(options, duration, easing);

**Parameters:**

- object literal: An object literal of key value pairs of CSS properties and values.
- time: integer or float A valid integer or float representing time.
- string: string A string defining an easing function for the animation.

**Example:**

    $("#animate").bind("click", function() {
        this.anim({"-webkit-transform": "rotate3d(30, 150, 200, 180deg) 
           scale(3) translate3d(-50%, -30%, 140%)", "opacity": .25, 
           "-webkit-transform-style" : "preserve-3d", "-webkit-perspective": 500}, 
           2, "ease-in-out");
    });


 

&nbsp;

##Function: $.delay

A method to delay the execution of a function.

**Syntax:**

    $.delay(function, time);

**Parameters:**

- function: A function to execute.
- time: integer or float A valid integer or float representing time in milliseconds for delay.

**Example:**

    $.delay(function() {
        console.log("This message is delayed by two seconds.");
    }, 2000);


 

&nbsp;

##Function: $.defer

A method to postpone the execution of a function until the callstack is clear.

**Syntax:**

    $.defer(function);

**Parameters:**

- function: A function to execute.

**Example:**

	$.defer(function() { 
		console.log("This comes after everything else!"); 
	});
	var squawk = function() {
		console.log('Squawk!');
	};
	squawk();
	console.log("Some other stuff");
	[1,1,1,1,1].forEach(function(item, idx) {
		console.log('Item: ', idx);
	});
	// The deferred console.log will be executed last.

 

&nbsp;

##Function: $.enclose

Method to enclose one method inside another. This method is attached directly to the $ object.

**Syntax:**

    $.enclose(function, function);

**Parameters:**

(The first function is the one to be enclosed, the second, the function that will enclose it.)

- function: The function to  be enclosed.
- function: The function that will enclose it.

**Returns:**

The result of the enclosed function with output for the enclosing function. 

**Example:**

	// hello will get enclose in saySomething.
	var hello = function(name) { return "Hello, " + name + "!"; };
	var saySomething = $.enclose(hello, function(func) {
		   return "Before I said, \"" + func("Stan") + "\" I thought about it for a while.";
	});
	console.log(saySomething());

 

&nbsp;

##Function: $.compose

Method to return the composition of several functions, where each function consumes the return value of the function that follows. This method is attached directly to the $ object. The last function on the right is passed to the previous function, all the way to the first on the left (see example below).

**Syntax:**

    $.capitalize(string);

**Parameters:**

- function: A function to pass as an argument.

**Returns:**

The result of the execution of each function passed as an argument. 

**Example:**

    var greet = function(name) { return "Hi there, " + name; };
    var exclaim  = function(statement) { return statement + "!"; };
    var remark = function(statement) { return statement + " You know I'm glad to see you."; };
    var welcome = $.compose(remark, greet, exclaim);
    console.log(welcome('Jeff')); // => Hi there, Jeff! You know I'm glad to see you.



<a name="$events"></a>


&nbsp;

##Array: $.events

An array of events to be removed before a node is deleted from a document. This array is attached directly to the $ object.

**See Also:**

[Element.removeEvents](#elementRemoveEvents)


 

&nbsp;

##Function: $.loadEvent

A method to chain load multiple functions to execute when the document finishes loading.

**Syntax:**

    $.loadEvent(callback);

**Parameters:**

- function:function A valid function to run when the document finishes loading.

**Example:**

    var myFunction = function () {
        return true;
    };
    $.loadEvent(myFunction());


<a name="$DOMReadyList"></a>


&nbsp;

##Array: $.DOMReadyList

An array of functions to execute when the document's DOM is ready for access. This is used by $.executeWhenDOMReady.

**See Also:**

[$.executeWhenDOMReady](#$executeWhenDOMReady)

[$.ready](#$ready)



<a name="$executeWhenDOMReady"></a>


&nbsp;

##Function: $.executeWhenDOMReady

A method to executing methods stored in $.DOMReadyList. This method is called by the $.ready method for executing chained blocks of code when the document fires the DOMContentLoaded event signaling that the document's DOM is ready for access. It readys the $.DOMReadyList array to see what code is stored there and executes it item by item. There is never a need for the user to execute this method as it is an auxilliary method for the $.ready() function.

**Syntax:**

    $.executeWhenDOMReady();

**See Also:**

[$.DOMReadyList](#$DOMReadyList)

[$.ready](#$ready)


<a name="$ready"></a>


&nbsp;

##Function: $.ready

Method to determine when the DOM is ready for manipulation and thereupon fire a block of code contained in an anonymous function passed to it as an argument. This method is attached directly to the $ object. If there are mulitple instances of this method, it's arguments will be chained and called sequentially with one registration of the DOMContentLoaded event. Before doing this though it checks to see if the document is already loaded. If it is, then no listener is added for the DOMContentLoaded event and instead it immediately executes its function.

**Syntax:**

    $.ready(function);
    
An alternate sytax is:

    $(function);

**Parameters:**

- function: An anonymous function or block of code to execute.

**Example:**

    $.ready(function() { 
        console.log("The document is ready for action!"); 
    });
    
This could be simplified to:

    $(function() {
        console.log("The document is ready for action!"); 
    });

You can also wrap the document object in $() as jQuery does for the same functionality:

    $(document).ready(function() {
    	console.log("The document is ready for action!"); 
    });

**See Also:**

[$.DOMReadyList](#$DOMReadyList)

[$.executeWhenDOMReady](#$executeWhenDOMReady)


 

&nbsp;

##Function: $.UIHideURLbar

A method to hide the browser's address bar. This is used at page load time and when the user navigates to different views. This is for use when a Web app is running in the mobile browser with an address bar. It's not necessary for Web apps installed on the mobile device's home screen.

**Syntax:**

    $.UIHideURLbar();

**Example:**

    $.UIHideURLbar();


 

&nbsp;

##Function: $.importScript

A method to import external scripts into the document. This method is attached directly to the $ object.

**Syntax:**

    $.importScript(URI);

**Parameters:**

- URI: A valid URI of the script to import into the document.

**Example:**

    $.importScript("https://bozo.com/scripts/myScript.js");


 
**Variables: iphone, ipad, ipod, android, webos, blackberry, touchEndabled, online, standalone**

Properties to determine device platform, network connection and standalone status.

**Syntax:**

    $.standalone // returns true or false

**Example:**

    if (!$.standalone) {
        alert("Please install this app before using.");
    }
    if($.iphone) {
        // Code for iPhone here
    } else if ($.ipad) {
        // Code for iPad here
    }
                                            
                    


&nbsp;

##Function: Element.xhr

A method to insert content into a node using The XMLHttpRequest object. This method is attached directly to the Element object.

**Syntax:**

    Element.xhr(URI);

**Parameters:**

- URI: A valid URI to import into the document and fill an element.
- Callback: A function to execute when the HTTPRequest is successful.

**Example:**

    $('#content').xhr('/data/customers.html');


 

&nbsp;

##Function: Element.xhrjson

A method to insert content into a node using The XMLHttpRequest object. This method is attached directly to the Element object.

**Syntax:**

    Element.xhrjson(URI);

**Parameters:**

- URI: A valid URI to import into the document and fill an element.
- options: An object literal mapping elements to json data.

**Example:**

    $('#content').xhrjson('/data/customers.js');


 

&nbsp;

##Function: Element.data

A method to get and set a dataset value on an element.

**Syntax:**

    Element.data(key);
    Element.data(key, value);

**Parameters:**

- key: A string defining the dataset key to access.
- value: A string defining the value to set the dataset key to.

**Example:**

    var customer = $('#customer').data('customer-name'); 
    $$(".customers").forEach(function(customer) {
        console.log(customer.data("customer-name"));
    }
    $("#shirt).data("shirt-size", "XXL"); // outputs data-shirt-size="XXL" on #shirt


 

&nbsp;

##Function: Element.removeData

A method to remove a dataset from an element.

**Syntax:**

    Element.removeData(key);

**Parameters:**

- key: A string defining the dataset key to remove.

**Example:**

    $("#shirt).removeData("shirt-size"); // removes data-shirt-size from #shirt

                                                    
                                                    

&nbsp;

##Function: $.localItem

Set a key/value pair to the browser's localStorage, or retrieve a key value. If you pass only a key, it returns the key's value if that key is present in localStorage. Otherwise, passing a key and a value will set these on localStorage.

**Syntax:**

    $.localItem(key, value)
    $.localItem(key)

**Parameters:**

- key: The key to retrieve from the browser's localStorage.
- key: A key to add to the browser's localStorage.
- value: A value to set to the key of the browser's localStorage.

**Example:**

    $.localItem("clientFirstName", "Robert");
    var clientFirstName = $.localItem("clientFirstName");
    console.log("The client's name is: " + clientFirstName");


&nbsp;

##Function: $.deleteLocalItem

Set a key/value pair to the browser's localstorage.

**Syntax:**

    $.deleteLocalItem(key)

**Parameters:**

- key: The key to remove from the browser's localStorage.

**Example:**

    $.deleteLocalItem("clientFirstName");


&nbsp;

##Function: $.clearLocalItems

A method to delete the localStorage. This requires no parameters and will completely remove the browser's localStorage for that domain. A new one can be create again at any time.

**Example:**

    $.clearLocalItem();


<a name="$templates"></a>


&nbsp;

##Variable: $.templates

An object that stores the templates you define. This is used by $.template. ChocolateChip-UI provides three ways of writing templates: JSP/ASP style tags, Mustache style (curly braces) and square brackets like Smarty. You can use whichever style you prefer, but the styles cannot be mixed up in the same template. However, different templates used in an app can have differ markup without a conflict. The tags allow you to mix in HTML markup with JavaScript to create dynamic templates for processing JSON data. Each style has two types of tags: one for executing JavaScript code and one for outputting the rendered value of a variable. The sets look like this:

**Example:**

In the example below, ingredients is an array in a JSON object. We're going to output the array items as list items in our template.

**JSP style tags:**

The delimiters for this are "<%" and "%>". You can include any JavaScript code you want to execute in the template inside these delimiters. To output the value of a variable, use "<%=" and "%>".

    var templates.ingredients =
        "<% /* Check if this recipe has ingredients: */ %>\
        <% if (!!recipe.ingredients) { %>\
            <ol class='ingredients'>\
                <% recipe.ingredients.forEach(function(ingredient) { %>\
                    <li><%= ingredient %></li>\
                <% }); %>\
            </ol>\
        <% } %>";

**Mustache style tags:**

The delimiters for this are "{{" and "}}". You can include any JavaScript code you want to execute in the template inside these delimiters. To output the value of a variable, use "${" and "}".

    var templates.ingredients =
        "{{ /* Check if this recipe has ingredients: */ }}\
        {{ if (!!recipe.ingredients) { }}\
            <ol class='ingredients'>\
                {{ recipe.ingredients.forEach(function(ingredient) { }}\
                    <li>${ ingredient }</li>\
                {{ }); }}\
            </ol>\
        {{ } }}";

**Square bracket style tags:**

The delimiters for this are "[[" and "]]". You can include any JavaScript code you want to execute in the template inside these delimiters. To output the value of a variable, use "$[" and "]".

    var templates.ingredients =
        "[[ /* Check if this recipe has ingredients: */ ]]\
        [[ if (!!recipe.ingredients) { ]]\
            <ol class='ingredients'>\
                [[ recipe.ingredients.forEach(function(ingredient) { ]]\
                    <li>$[ ingredient ]</li>\
                [[ }); ]]\
            </ol>\
        [[ } ]]";

**Nesting Templates:**

You can break down complex templates into manageable modules which you can nest. This allows you to update the nested templates separately from the parent, or the other way around. It's probably a good idea to name nested templates so that their name reflects their relation to the parent template they belong to. Here's how to do it. Just define the sub-templates the same way you would define a normal template, as a value on $.templates. Then, when building out the string for the parent template you concatenate the sub-template's variable. This would be something like this:

    $.templates.parent_child = 
    "<ol>\
    [[ ancestry.parent.child.forEach(function(child) { ]]\
        <li>$[ ancestry.parent.child.name ]</li>\
    [[ }); ]]\
    </ol>";
    
    $.templates.parent = 
    "<div>
        <p>$[ ancestry.parent.firstName ] $[ ancestry.parent.lastName ] </p>"
        + $templates.parent_child + 
    "</div>";

As you can see above, the parent_child template gets concatenated in the parent template. In the more complex example below, notice that I'm doing a conditional check to make sure the values that the nested templates depend on exist before outputting them in the parent template. Or you could put that conditional check in the nested template itself. Your call to make.

    /* The next two templates will be nested in $.templates.recipes: */
    $.templates.recipes_ingredients = 
        "<cellsubtitle>\
            <div>Ingredients</div>\
            <ul>\
                [[ recipe.ingredients.forEach(function(ingredient) { ]]\
                    <li>$[ ingredient ]</li>\
                [[ }); ]]\
            </ul>\
        </cellsubtitle>";
    $.templates.recipes_directions = 
        "<celldetail>\
            <div>Directions</div>\
            <ol>\
                [[ recipe.directions.forEach(function(direction) { ]]\
                    <li>$[ direction ]</li>\
                [[ }); ]]\
            </ol>\
        </celldetail>";
    /* The above two templates are nested in this template: */
    /* Before inserting the nested templates, we do a conditional check to make sure the current iteration of the JSON object has an ingredients and directions array: */
    $.templates.recipes = 
        "[[ recipes.forEach(function(recipe) { ]]\
            <tablecell class='ui-no-hover'>\
                <celltitle>$[ recipe.title ]</celltitle>\
                [[ /* A conditional check for recipe ingredients: */ ]]\
                [[ if (!!recipe.ingredients) { ]]"
                     + $.templates.recipes_ingredients +
                "[[ } ]]\
                [[ /* A conditional check for recipe directions: */ ]]\
                [[ if (!!recipe.directions) { ]]"
                    + $.templates.recipes_directions +
                "[[ } ]]\
            </tablecell>\
        [[ }); ]]";
            
See Also:

[$.template](#$template)


<a name="$template"></a>


&nbsp;

##Function: $.template

A method to parse a JavaScript template and populate it with JSON data. You define the template as a string (see [$.templates](#$templates) above) consisting of markup along with JavaScript enclosed in special delimiters. The $.template method parses the JSON object and passes it to the template, after which you can insert it where you wish.

**Syntax:**

    $.template(str, data);

**Parameters:**

- string: A string defining the template to use.
- data: JSON data to be mapped to elements in the template.

**Example:**

    var result = $.template("ingredients", data);
    $.ready(function() {
        $("#recipe").insert(result);
    });


One thing I want to point out in the above example, when you define a template with $.templates, such as $.templates.ingredients = "..." when you go to use the template in the $.template method, you don't need to use $.templates.ingredients, you can just give the name of the template, "ingredients" in this case. The $.template method already knows to retrieve the template from the $.templates object.

See Also:

[$.templates](#$templates)


&nbsp;

##Function: $.UIUpdateOrientationChange

A method for outputting a class on the body tag to identify the orientation of the mobile device when the device's orientation changes. In landscape mode it puts the class "landscape" on the body tag and in portrait mode it puts the "portrait" on the body tag. There can only be one or the other on the body tag at any given time. This class is to enable the use of styles based on the orientation of the device. You can create styles using these class as in the example below.

**Example:**

    body.portrait app > view {
        background-color: green;
    }
    body.landscape app > view {
        background-color: orange;
    }
    

&nbsp;

##Function: $.UIListenForWindowResize

A method for outputting a class on the body tag to identify the orientation of the mobile device when the window is resized. If in window is wider than it is tall, it outputs the class "landscape" on the body tag, and when it is taller than it is wide, it outputs "portrait" on to the body tag. This allows you to testing for orientation change on the desktop for landscape and portrait modes.

**Example:**

    body.portrait > view {
        background-color: green;
    }
    body.landscape > view {
        background-color: red;
    }
    
&nbsp;
                            
##Function: $.kvo

A method for set up key value observers for basic data binding. This allows you to register observers on UI elements to watch for a change in a value. This value could be that of some input or control or of an object. When the observed values change, the observers capture that change and update themselves automatically. In respect to MVC (model, view, controller) practice his allows you to decouple your models from your UI (views). This is especially useful for complex and interactive user interfaces. 

In the case of the following HTML we can put together an example in which we want the label to be aware of the value of the text input field:

**Example:**

    <input id="textinput" type="text">
    <br>
    <label id="labeltext">Doh!</label>
    <script>
    
    $(function() {
        var input = $("#textinput");
        var label = $("#labeltext");
        kvo.registerObserver(label, "text");
        //var currentValue = "Bozo;
        label.keyWillUpdate = function(object, key, currentValue, newValue) {
            if (newValue) {
                this.innerText = input.value;
            } else {
                this.innerText = currentValue;
            }
        };
        input.onkeyup = function() {
            kvo.set("text", this.value);
        };
    });
    </script>


&nbsp;

##Function: $.form2JSON

A method that converts form values to a JSON object. This can be converted to a string for sending to the server with a GET or POST request, or stored on the client side in localStorage or the client side SQLite database.

**Syntax:**

    $.form2JSON(selector, delimiter);
    
**Paramters:**

- selector: a valid selector for the form to be processed.
- delimiter: a character to use as a delimiter for the marking of JSON member relations in the form element's name values (see example below). This defaults to ".", but you can use any other character that suits your purposes.

For this method to work properly you must name all form elements that you want to retrieve so that they match the structure of the resulting JSON object you would like. You use "." to indicate the sub objects of the JSON object. For example, if your form was for signing up a user, you might have inputs with names such as 

    <form id="newUser"> 
        <input type="text" name="newUser.name.first"></input>
        <input type="text" name="newUser.name.last"></input>
        <input type="text" name="newUser.address.street"></input>
        <input type="text" name="newUser.address.city"></input>
        <input type="text" name="newUser.address.state"></input>
        <input type="text" name="newUser.address.zip"></input>
        <input type="text" name="newUser.phone"></input>
        <input type="text" name="newUser.email"></input>
    </form>
    <script>
        $("#main > navbar > uibutton[ui-implements=done]").bind("click", function() {
            var formData = $.form2JSON('#personalInfo');
            formData = JSON.stringify(formData);
            window.location = "ajax/template.html?" + formData;
        });
    </script>

This would result in a JSON object like this:

    {"newUser":
        {"name": 
            {"first": "someValueHere"},
            {"last": "someValueHere"}
        },
        {"address":
            {"street": "someValueHere"},
            {"city": "someValueHere"},
            {"state": "someValueHere"},
            {"zip": "someValueHere"}
        },
        {"phone": "someValueHere" },
        {"email": "someValueHere"}
    }
    
Disabled form elements or ones which have no value will be ignored.

If you need to create an array from something like a set of choices, you'll need to marke the name with brackets "[]" to indicate that it's an array:

    <div>Favorite food</div>
    <p>
        <label>Salad:</label>
        <input type="checkbox" name="user.favoriteFood[]" value="salad">
    </p>
    <p>
        <label>Pizza:</label>
        <input type="checkbox" name="user.favoriteFood[]" value="pizza">
    </p>
    <p>
        <label>Chicken:</label>
        <input type="checkbox" name="user.favoriteFood[]" value="chicken">
    </p>

If the user checks all three, this would produce:
    {"user": 
        {"favoriteFood":["salad","pizza","chicken"]}
    }

&nbsp;

##Function: Function.bind

Add bind capability to the Function object for versions of Webkit that don't support it.

**Syntax:**

    Function.bind(function, object);

**Example:**

    var greeter = {
        name: "greeter object",
        speaks: function() {
        constructGreeting = function(greeting) {
            console.log(greeting + " " + this.name);
        }.bind(this) // Bound to "greeter"
            constructGreeting("hello");
        }
    };
    greeter.speaks("hello");


 

&nbsp;

##Function: Element.UICheckForOverflow

Determines whether an element has content overflowing its bounds or not.

**Syntax:**
    Element.UICheckForOverflow();

**Returns:**

A boolean true or false.

**Example:**
                                                                        
    if($("tableview:first-of-type").UICheckForOverflow();) {
        // Handle scrolling.
    }

##Library compatibility

ChocolateChip now checks to see if the global $ exists. If it doesn't, it makes its $ and $$ available as objects of the window. But if the $ is already attached to the window, it checks to see if it has the property window.$.libraryName with a value of "ChocolateChip". If it does not, it sets its $ to window.$chocolatechip and its $$ to window.$$chocolatechip. This allows you to use ChocolateChip with other libraries that use $ and/or $$, such as jQuery, Prototype, Mootools, etc.

For this to work, you must load the other library before ChocolateChip. Then, instead of writing your code like:
	
	$.ready(function() {
		// ChocolateChip stuff here.
	});
		// or:
	$(function() {
		// ChocolateChip stuff here.
	});

You would need to enclose the ChocolateChip code inside an anonymous function and pass in the $chocolatechip and $$chocolatechip variables:

	// ChocolateChip code:
	(function($, $$) {
		$(function() {
			$("body").css("border: solid 4px red;");
			$$("p").forEach(function(p) {
				p.css("font-weight: bold");
			});
		});
	})($chocolatechip, $$chocolatechip);
	// jQuery code:
	$(function() {
		$("a").css({display: "block", "text-decoration": "none"});
	})