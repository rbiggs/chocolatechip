<h1 id="chocolatechipjs">ChocolateChip.js</h1>

<pre><code>   pO\     
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
Version 1.1.2
</code></pre>

<p>&nbsp;</p>

<h2 id="function_">Function: $</h2>

<p>This method uses JavaScript&#8217;s document.querySelector() method to get the designated node. It will always return the first match. To get more a collection of nodes, use the <a href="#$$">$$</a> method. A selector is required as the main argument. A second optional argument may be passed as a context for the selector. This is useful where you want to limit where ChococlateChip searches for a node, such as only as a descendant of a particular document node, avoiding possible matches outside that node.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$(selector);
$(selector, context);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>selector: A string defining a valid CSS selector.</li>
<li>context: A string defining a valid CSS selector or an actual node.</li>
</ul>

<p><strong>Returns:</strong> </p>

<p>A valid document node.</p>

<p><strong>Example:</strong></p>

<pre><code>var item = $("#item");
var menuItems = $(".menu &gt; li"); // Will return the first list item only.
$("section &gt; p:first-of-type").css("color: red; background-color: yellow; padding: 10px;");
var list = $("ul", mainList);
</code></pre>

<p>&nbsp;</p>

<h2 id="function_extend">Function: $.extend</h2>

<p>A method to extend the ChocolateChip&#8217;s $ method. This uses EC5&#8217;s Object.defineProperty to extend objects without polluting the object&#8217;s prototype. For older browsers that don&#8217;t support this feature of ECMAScript5, ChocolateChip uses a simpler method of object prototype chaining for compatibility.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$.extend(object, {
    // object literal here.
});
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>The object to extend. In most cases this will be $ or HTMLElement.prototype.</li>
<li>An object literal of properties to add to the object. These can be variables, array or methods.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>$.extend($, {
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
</code></pre>

<p>&nbsp;</p>

<h2 id="variable_version">Variable: $.version</h2>

<p>Version: 1.1.2</p>

<p><strong>Example:</strong></p>

<pre><code>console.log("The version is: " + $.version);
</code></pre>

<p><a name="collectionToArray"></a></p>

<p>&nbsp;</p>

<h2 id="function_collectiontoarray">Function: $.collectionToArray</h2>

<p>This is a function to convert an DOM node collection into an array. This is so you can use array extras like, forEach, map, slice, etc.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$.collectionToArray(NodeList);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>The node collection to convert into an array.</li>
</ul>

<p><strong>Returns</strong></p>

<p>An array of nodes in an HTMLElement collection. </p>

<p><strong>Example:</strong></p>

<pre><code>var p = document.getElementsByTagName("p");
var pArray = $.collectionToArray(p);

var elem = $("#myList");
var listitems = $.collectionToArray(elem.children);
    listitems.forEach(function(item) {
    // Process code here.
}
</code></pre>

<p><strong>See Also:</strong></p>

<p><a href="#$$">$.$$</a></p>

<p><a name="$$"></a> </p>

<p>&nbsp;</p>

<h2 id="function_">Function: $.$$</h2>

<p>This method uses document.querySelectorAll to return a DOM collection as an array. It employs the method $.collectionToArray to convert the collection of nodes into an array. This will later be passed out as a global object. It also uses the $.collectionToArray method to convert and HTMLCollection into an array. $.$$() gets aliased as window.$$() so that you can uses it as just $$() instead of $.$$(). A second optional argument may be passed as a context for the selector. This is useful where you want to limit where ChococlateChip searches for nodes, such as only as a descendant of a particular document node, avoiding possible matches outside that node.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$$(selector);
$$(selector, context);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>A string defining a valid CSS selector.</li>
<li>Context: A string defining a valid CSS selector or an actual node.</li>
</ul>

<p><strong>Returns:</strong></p>

<p>An array of nodes comprising an element collection.</p>

<p><strong>Example:</strong></p>

<pre><code>var sections = $$("section");
$$("section &gt; p").forEach(function(p) {
    p.css("color: red; background-color: yellow; padding: 10px;");
});
</code></pre>

<p><strong>See Also:</strong></p>

<p>[$.collectionToArray #collectionToArray]</p>

<p>&nbsp;</p>

<h2 id="variable_body">Variable: $.body</h2>

<p>This variable holds a reference to the body tag. This is a shortcut for accessing the body tag so you don&#8217;t have to waste processing time getting the body tag with <em>$.(&#8220;body&#8221;)</em>. See below.</p>

<p><strong>Example:</strong></p>

<pre><code>$.body.toggleClass("portrait", "landscape");
console.log($.body.className);
</code></pre>

<p>&nbsp;</p>

<h2 id="variable_app">Variable: $.app</h2>

<p>This variable holds a reference to the app tag. It is a shortcut for accessing the app tag so you don&#8217;t have to waste processing time getting the body tag with <em>$.(&#8220;app&#8221;)</em>. See below:</p>

<p><strong>Example:</strong></p>

<pre><code>$.app.delegate("uibutton", "touchstart", executeMyFavFunc);
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementprevious">Function: Element.previous</h2>

<p>This method returns the previous sibling of the element upon which it executes. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.previous();
</code></pre>

<p><strong>Returns:</strong></p>

<p>The previous sibling node. </p>

<p><strong>Example:</strong></p>

<pre><code>var previousItem = $("#item").previous();
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementnext">Function: Element.next</h2>

<p>This method returns the next sibling of the element upon which it executes. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.next();
</code></pre>

<p><strong>Returns:</strong></p>

<p>The next sibling node. </p>

<p><strong>Example:</strong></p>

<pre><code>var nextItem = $("#item").next();
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementfirst">Function: Element.first</h2>

<p>A method to get the first child of an element while avoiding empty text nodes. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.first();
</code></pre>

<p><strong>Example:</strong></p>

<p>(start code)
$(&#8220;#menu&#8221;).first();
(end)</p>

<p>&nbsp;</p>

<h2 id="function_elementlast">Function: Element.last</h2>

<p>A method to get the last child of an element, while avoiding empty text nodes. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.last();
</code></pre>

<p><strong>Example:</strong></p>

<pre><code>$("#menu").last();
</code></pre>

<p><a name="elementAncestor"></a></p>

<p>&nbsp;</p>

<h2 id="function_elementancestor">Function: Element.ancestor</h2>

<p>A method to retrieve an ancestor of a node. It can find an ancestor by numeric postion, tag, class or id. Besides class and id, no other attributes can be parsed and will throw an exception.</p>

<p><strong>Parameters:</strong></p>

<ul>
<li>value: Either a number, a class, an id or a tag.</li>
</ul>

<p><strong>Syntax:</strong> </p>

<pre><code>Element.ancestor(selector)
</code></pre>

<p><strong>Returns:</strong></p>

<p>A matched ancestor node. </p>

<p><strong>Example:</strong></p>

<pre><code>// Will return the third ancestor tag:
var theAncestor = $("#someID").ancestor(3);
// Will return the element with id of "#main" 
// if it is an ancestor of "#someID":
var theAncestor = $("#someID").ancestor("#main");
// Will return an element with a class of ".myView" if
// it is an ancestor of "#someID":
var theAncestor = $("#someID").ancestor(".myView");
// Will return a subview tag if it is an ancestor of "#someID":
var theAncestor = $("#someID").ancestor("subview");
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementancestorbytag">Function: Element.ancestorByTag</h2>

<p>This is an alias to Element.ancestor included for backwards compatibility with earlier versions of ChocolateChip (1.1.0 or less).</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.ancestorByTag(selector);
</code></pre>

<p><strong>Returns:</strong></p>

<p>A matched ancestor node. </p>

<p><strong>Example:</strong></p>

<p>(start code)
var ancestor = $(&#8220;#item&#8221;).ancestorByTag(&#8220;article&#8221;);
(end)</p>

<p>See Also:</p>

<p><a href="#elementAncestor">Element.ancestor</a></p>

<p><a name=&#8221;elementAncestor&#8221;</a></p>

<p>&nbsp;</p>

<h2 id="function_elementancestorbyclass">Function: Element.ancestorByClass</h2>

<p>This is an alias to Element.ancestor included for backwards compatibility with earlier versions of ChocolateChip (1.1.0 or less).</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.ancestorByClass(selector);
</code></pre>

<p><strong>Returns:</strong></p>

<p>A matched ancestor node. </p>

<p><strong>Example:</strong></p>

<pre><code>var ancestor = $("#item").ancestorByClass("generic class");
</code></pre>

<p><strong>See Also:</strong></p>

<p><a href="#elementAncestor">Element.ancestor</a></p>

<p>&nbsp;</p>

<h2 id="function_elementancestorbyposition">Function: Element.ancestorByPosition</h2>

<p>This is an alias to Element.ancestor included for backwards compatibility with earlier versions of ChocolateChip (1.1.0 or less).</p>

<p><strong>Parameters:</strong> </p>

<p>An integer indicating the position of the ancestor to find.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.ancestorByPosition(position);
</code></pre>

<p><strong>Returns:</strong></p>

<p>A matched ancestor node. </p>

<p><strong>Example:</strong></p>

<pre><code>// Returns the third ancestor
var ancestor = $("#item").ancestorPosition(3);
</code></pre>

<p><strong>See Also:</strong></p>

<p><a href="#elementAncestor">Element.ancestor</a></p>

<p>&nbsp;</p>

<h2 id="function_make">Function: $.make</h2>

<p>This method creates nodes from a string of valid HTML passed as an argument. The result is an array of one or more nodes. By iterating this array you can insert them into a document. This method is attached directly to the $ object.</p>

<p><strong>Parameters:</strong></p>

<ul>
<li>A string defining nodes to create.</li>
<li>An array of valid nodes existing in memory.</li>
</ul>

<p><strong>Syntax:</strong></p>

<pre><code>$.make(string);
</code></pre>

<p><strong>Returns:</strong></p>

<p>A collection of new nodes. </p>

<p><strong>Example:</strong></p>

<pre><code>var paragraph = $.make("&lt;p&gt;This is a paragraph&lt;/p&gt;");
</code></pre>

<p>&nbsp;</p>

<h2 id="function_replace">Function: $.replace</h2>

<p>A method to clone a node. If a boolean value that evaluates to true is passed as an argument, the method will clone the node and all its child nodes, otherwise it clones only the node itself. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$.replace(newNode, oldNode);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>newNode: A a node to with which to replace.</li>
<li>oldNode: The node to be replaced.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>var newNode = $.make("&lt;div&gt;A new div&lt;/div&gt;");
$.replace(newNode, $("#menu"));
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementempty">Function: Element.empty</h2>

<p>Remove all child nodes of an element. This method invokes the removeEvents method first to remove any attached events and thereby prevent memory leaks. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.empty();
</code></pre>

<p><strong>Example:</strong></p>

<pre><code>$("#item").empty();
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementclone">Function: Element.clone</h2>

<p>A method to clone a node. If a boolean value that evaluates to true is passed as an argument, the method will clone the node and all its child nodes, otherwise it clones only the node itself. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.clone();
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>Any boolean value.</li>
</ul>

<p><strong>Returns:</strong> </p>

<p>The clone of an element. </p>

<p><strong>Example:</strong></p>

<pre><code>var menu = $("#menu").clone(true);
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementwrap">Function: Element.wrap</h2>

<p>A method to wrap a node in markup. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.wrap(string);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>string: A string of valid HTML markup in which to encase the element.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>$("#menu").wrap("&lt;nav id='main'&gt;&lt;/nav&gt;");
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementunwrap">Function: Element.unwrap</h2>

<p>A method to unwrap a node by removing its parent node. It has a failsafe to stop removing nodes when it reaches the body tag.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.unwrap();
</code></pre>

<p><strong>Example:</strong></p>

<pre><code>$("#menu").unwrap();
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementtext">Function: Element.text</h2>

<p>This method adds text to the target element, replacing whatever child nodes it might have. If no value is passed as an argument, the method returns the text value of all child nodes of the target element. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$(selector).text(string);
$(selector).text(variable);
$(selector).text();
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>string: A string of text to add to an element.</li>
<li>variable: A string of text to add to an element.</li>
</ul>

<p><strong>Returns:</strong></p>

<p>The text nodes of the element. </p>

<p><strong>Example:</strong></p>

<pre><code>$("#item").text("This is an example of added text.");
var textValue = $("#item").text();
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementfill">Function: Element.fill</h2>

<p>Replace element&#8217;s childNodes with content. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.fill(content);
</code></pre>

<p><strong>Example:</strong></p>

<pre><code>$("#item").fill("Something to say here.");
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementempty">Function: Element.empty</h2>

<p>Remove all child nodes of an element. This method invokes the removeEvents method first to remove any attached events and thereby prevent memory leaks. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.empty();
</code></pre>

<p><strong>Example:</strong></p>

<pre><code>$("#item").empty();
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementremove">Function: Element.remove</h2>

<p>Remove an element from the document. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.remove();
</code></pre>

<p><strong>Example:</strong></p>

<pre><code>$("#item").remove();
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementinsert">Function: Element.insert</h2>

<p>A method to insert a node or nodes at nth position in the child node collection of the element on which the method is being called. This can be the first position, the last position, or anywhere in between these. If no position is passed as an argument it defaults to last position. If the parent element has no child nodes, the method inserts the new element as the first child of the parent element. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$.insert( content, position );
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>A valid node to insert into the child node collection of another node.</li>
<li>A string with a value for first or last position for insertion.</li>
<li>An integer indicating the position in the target element&#8217;s child node collection at which to insert.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>$.itemNumber = 1;
$$("p").forEach(function(item) { 
    item.insert( $.make("&lt;span&gt;Introductory Matter: " + $.itemNumber + " .&lt;/span&gt;"), "first");
    ++$.itemNumber;
});
$.itemNumber = null;
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementbefore">Function: Element.before</h2>

<p>A method to insert content before the node upon which it operates. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.before(node);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>node: A valid node to insert before another node.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>$.itemNumber = 1;
$$("p").forEach(function(item) { 
    item.before( $.make("&lt;h1&gt;Title " + $.itemNumber + "&lt;/h1&gt;"));
    ++$.itemNumber;
});
$.itemNumber = null;
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementafter">Function: Element.after</h2>

<p>A method to insert content consisting of a node or nodes before the node upon which it operates. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.after(node);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>node: A valid node to insert before another node.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>$.itemNumber = 1;
$$("p").forEach(function(item) { 
    item.after( $.make("&lt;p&gt;Addendum " + $.itemNumber + "&lt;/p&gt;"));
    ++$.itemNumber;
});
$.itemNumber = null;
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementhasclass">Function: Element.hasClass</h2>

<p>Check an element to see if it has a particular class. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.hasClass(className);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>className: The name of the CSS class to check for.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>Element.hasClass("hover");
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementaddclass">Function: Element.addClass</h2>

<p>Add a class to an element. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.addClass(className);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>className: The name of the CSS class to add.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>$("#item").addClass("hover");
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementremoveclass">Function: Element.removeClass</h2>

<p>Remove a class from an element. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code> Element.removeClass(className);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>className: The name of the CSS class to remove.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>$("#item").removeClass("hover");
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementdisable">Function: Element.disable</h2>

<p>A method to disable an element by adding the &#8220;disable&#8221; class and preventing mouse or touch interaction.</p>

<p><strong>Example:</strong></p>

<pre><code>$("#myItem").disabled();
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementenable">Function: Element.enable</h2>

<p>A method to facilitate re-enabling an element that was disabled by removing the &#8220;disabled&#8221; class and allow mouse and touch interaction.</p>

<p><strong>Example:</strong></p>

<pre><code>$("#myItem").enable();
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementtoggleclass">Function: Element.toggleClass</h2>

<p>Toggle a class on and off an element, or toggle between two classes. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.toggleClass(className);
Element.toggleClass(className, className);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>firstClassName: The name of the first class to toggle.</li>
<li>secondClassName: The name of the second class to toggle.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>$("#item").toggleClass("hover");
$("#item").toggleClass("selected", "unselected");
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementgettop">Function: Element.getTop</h2>

<p>Get the precise top position of an element in relation to the top viewport.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$(selector).getTop();
</code></pre>

<p><strong>Example:</strong></p>

<pre><code>$("#item").getTop();
var button = $(".button");
var buttonTop = button.getTop();
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementgetleft">Function: Element.getLeft</h2>

<p>Get the precise left position of an element in relation to the left viewport.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$(selector).getLeft();
</code></pre>

<p><strong>Example:</strong></p>

<pre><code>$("#item").getLeft();
var button = $(".button");
var buttonTop = button.getLeft();
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementcss">Function: Element.css</h2>

<p>Add a CSS declaration directly to an element. If a boolean value that equates to true is passed as a second, optional argument, the method will replace whatever inline CSS values are presently existing on the element, otherwise it appends the CSS declaration to whatever is already there. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.css(style declaration, property, value);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>style declaration:string A string of valid CSS property/values enclosed in curly braces and quotes.</li>
<li>property:string A string defining a CSS property.</li>
<li>value:string A string defining a CSS property value to set on an element.</li>
<li>A true value will cause any existing inline styles to be replace by the string of CSS styles. This is optional.</li>
</ul>

<p><strong>Returns:</strong></p>

<p>CSS property value pairs as inline cssText or the computed value of a CSS property.</p>

<p><strong>Example:</strong></p>

<pre><code>$("#item").css("font", "bold 12pt/14pt Arial, Helvetica, Sans-serif");
console.log($("#item").css("font-size"));
$("#item").css("{font-size: 24px; color: blue; background-color: red;}");
</code></pre>

<p>You can use Element.css to get the value of a CSS property by passing the quoted property as an argument. You simply pass in the normal CSS property. If it is a hyphenated property, pass it in like that. </p>

<p><strong>Example:</strong></p>

<pre><code>var bkcolor = $("#item").css("background-color");
console.log("This item's background color is: " + bkcolor);
</code></pre>

<p><strong>Note:</strong> Be aware that all values returned in this way are strings, even if they appear to be numerical values, such as height, margin, etc. So, if you need to do arithmetic with a returned value, you&#8217;ll need to convert it from a string to a number. You can do this using parseInt:</p>

<pre><code>var itemWidth = $("#item).css("width");
itemWidth = parseInt(itemWidth);
var leftPos = $.getLeft("#item");
var distance = itemWidth + leftPos;
console.log("The item has a total distance of: " + distance);
</code></pre>

<p>&nbsp;</p>

<h2 id="function_stringcapitalize">Function: String.capitalize</h2>

<p>Method to capitalize the first letter of a string. This method is attached directly to the $ object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$.capitalize(string);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>string: A string to capitalize.</li>
</ul>

<p><strong>Returns:</strong></p>

<p>A string with the first word capitalized, if a single word then its first letter is capitalized. </p>

<p><strong>Example:</strong></p>

<pre><code>var name = $.capitalize("robert"); // returns Robert
</code></pre>

<p>&nbsp;</p>

<h2 id="function_stringcapitalizeall">Function: String.capitalizeAll</h2>

<p>Method to capitalize the first letter of a words in a string. This method is attached directly to the $ object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$.capitalizeAll(string);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>string: A string to capitalize.</li>
</ul>

<p><strong>Returns:</strong></p>

<p>A string with all words capitalized. </p>

<p><strong>Example:</strong></p>

<pre><code>var name = $.capitalize("get out now"); // returns Get Out Now
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementbind">Function: Element.bind</h2>

<p>A method to attach events to elements.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.bind(event, function);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>event: A string representing valid event handler, such as &#8220;click&#8221;.</li>
<li>function: A function, either named or anonymous. Note that a bound event that uses an anonymous function cannot be unbound. See last example below for how to avoid this.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>var doSomething = function() {
    console.log("I'm doing it now.");
};
$("#doIt").bind("click", doSomething);
// or:
$(".stop").bind("touchend", function() {
console.log("Time to put an end to this!");
    this.remove();
});
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementunbind">Function: Element.unbind</h2>

<p>A method to remove events from elements.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.unbind(event, callback);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>event: Event A string representing valid event handler, such as &#8220;click&#8221;.</li>
<li>function: Function A named function executed by the event handler.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>$("#doIt").unbind("click", doSomething);
</code></pre>

<p><a name="elementRemoveEvents"></a></p>

<p>&nbsp;</p>

<h2 id="function_elementremoveevents">Function: Element.removeEvents</h2>

<p>Remove events from an element. This method uses an array of events owned by the global $ object to know which events to remove. This method is invoked before removing any nodes from a document to prevent memory leaks. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.removeEvents();
</code></pre>

<p><strong>Example:</strong></p>

<pre><code>$("#item").removeEvents();
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementdelegate">Function: Element.delegate</h2>

<p>A method to create event delegation. It uses the Element.ancestor method to check the ancestors of the event target to determine whether to execute the event or not.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.delegate(selector, event, callback);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>selector: A valid selector for the target element(s).</li>
<li>event: An event to be fired on the element.</li>
<li>function: A callback to be executed in relation to the target element.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>$("body").delegate("p", "click", function(element) {
    Element.css("background-color: yellow");
});
</code></pre>

<p>To trap a tag with an attribute, you can use a conditional check inside your delegate assignment:</p>

<pre><code>$("app").delegate("button", "touch", function(item) {
    // Check for button with "ui-implements" attribute:
    if (item.getAttribute("ui-implements") === "back") {
        // Processing code goes here.
    }
});
</code></pre>

<p><strong>See Also:</strong></p>

<p><a href="#elementAncestor">Element.ancestor</a></p>

<p><a href="#$events">$.events</a></p>

<p>&nbsp;</p>

<h2 id="function_elementtrigger">Function: Element.trigger</h2>

<p>A method to fire events on elements.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.trigger(event);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>event: An event to be fired on the element.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>$("#importantButton").bind("click", function() {
    $("#link").trigger("click");
});
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementanim">Function: Element.anim</h2>

<p>A method to implement CSS-based transition animations on elements.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.anim(options, duration, easing);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>object literal: An object literal of key value pairs of CSS properties and values.</li>
<li>time: integer or float A valid integer or float representing time.</li>
<li>string: string A string defining an easing function for the animation.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>$("#animate").bind("click", function() {
    this.anim({"-webkit-transform": "rotate3d(30, 150, 200, 180deg) 
       scale(3) translate3d(-50%, -30%, 140%)", "opacity": .25, 
       "-webkit-transform-style" : "preserve-3d", "-webkit-perspective": 500}, 
       2, "ease-in-out");
});
</code></pre>

<p>&nbsp;</p>

<h2 id="function_delay">Function: $.delay</h2>

<p>A method to delay the execution of a function.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$.delay(function, time);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>function: A function to execute.</li>
<li>time: integer or float A valid integer or float representing time in milliseconds for delay.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>$.delay(function() {
    console.log("This message is delayed by two seconds.");
}, 2000);
</code></pre>

<p>&nbsp;</p>

<h2 id="function_defer">Function: $.defer</h2>

<p>A method to postpone the execution of a function until the callstack is clear.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$.defer(function);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>function: A function to execute.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>$.defer(function() { 
    console.log("This comes before Squawk!"); 
});
</code></pre>

<p>&nbsp;</p>

<h2 id="function_enclose">Function: $.enclose</h2>

<p>Method to capitalize the first letter of a words in a string. This method is attached directly to the $ object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$.enclose(function, enclosure);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>function:function A function to enclose.</li>
<li>function:function A function with which to enclose.</li>
</ul>

<p><strong>Returns:</strong></p>

<p>The result of the enclosed function with output for the enclosing function. </p>

<p><strong>Example:</strong></p>

<pre><code>var hello = function(name) { return "Hello, " + name + "!"; };
hello = $.enclose(hello, function(func) {
    return "Before I said, \"" + func("Stan") + "\" I thought about it for a while.";
});
</code></pre>

<p>&nbsp;</p>

<h2 id="function_compose">Function: $.compose</h2>

<p>Method to return the composition of several functions, where each function consumes the return value of the function that follows. This method is attached directly to the $ object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$.capitalize(string);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>function:function A function to pass as an argument.</li>
</ul>

<p><strong>Returns:</strong></p>

<p>The result of the execution of each function passed as an argument. </p>

<p><strong>Example:</strong></p>

<pre><code>var greet = function(name) { return "Hi there, " + name; };
var exclaim  = function(statement) { return statement + "!"; };
var remark = function(remark) { return remark + " You know I'm glad to see you."; };
var welcome = $.compose(remark, greet, exclaim);
console.log(welcome('Jeff')); // =&gt; Hi there, Jeff! You know I'm glad to see you.
</code></pre>

<p><a name="$events"></a></p>

<p>&nbsp;</p>

<h2 id="array_events">Array: $.events</h2>

<p>An array of events to be removed before a node is deleted from a document. This array is attached directly to the $ object.</p>

<p><strong>See Also:</strong></p>

<p><a href="#elementRemoveEvents">Element.removeEvents</a></p>

<p>&nbsp;</p>

<h2 id="function_loadevent">Function: $.loadEvent</h2>

<p>A method to chain load multiple functions to execute when the document finishes loading.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$.loadEvent(callback);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>function:function A valid function to run when the document finishes loading.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>var myFunction = function () {
    return true;
};
$.loadEvent(myFunction());
</code></pre>

<p><a name="$DOMReadyList"></a></p>

<p>&nbsp;</p>

<h2 id="array_domreadylist">Array: $.DOMReadyList</h2>

<p>An array of functions to execute when the document&#8217;s DOM is ready for access. This is used by $.executeWhenDOMReady.</p>

<p><strong>See Also:</strong></p>

<p><a href="#$executeWhenDOMReady">$.executeWhenDOMReady</a></p>

<p><a href="#$ready">$.ready</a></p>

<p><a name="$executeWhenDOMReady"></a></p>

<p>&nbsp;</p>

<h2 id="function_executewhendomready">Function: $.executeWhenDOMReady</h2>

<p>A method to executing methods stored in $.DOMReadyList. This method is called by the $.ready method for executing chained blocks of code when the document fires the DOMContentLoaded event signaling that the document&#8217;s DOM is ready for access. It readys the $.DOMReadyList array to see what code is stored there and executes it item by item. There is never a need for the user to execute this method as it is an auxilliary method for the $.ready() function.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$.executeWhenDOMReady();
</code></pre>

<p><strong>See Also:</strong></p>

<p><a href="#$DOMReadyList">$.DOMReadyList</a></p>

<p><a href="#$ready">$.ready</a></p>

<p><a name="$ready"></a></p>

<p>&nbsp;</p>

<h2 id="function_ready">Function: $.ready</h2>

<p>Method to determine when the DOM is ready for manipulation and thereupon fire a block of code contained in an anonymous function passed to it as an argument. This method is attached directly to the $ object. If there are mulitple instances of this method, it&#8217;s arguments will be chained and called sequentially with one registration of the DOMContentLoaded event.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$.ready(function);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>function:function An anonymous function or block of code to execute.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>$.ready(function() { 
    console.log("The document is ready for action!"); 
});
</code></pre>

<p><strong>See Also:</strong></p>

<p><a href="#$DOMReadyList">$.DOMReadyList</a></p>

<p><a href="#$executeWhenDOMReady">$.executeWhenDOMReady</a></p>

<p>&nbsp;</p>

<h2 id="function_uihideurlbar">Function: $.UIHideURLbar</h2>

<p>A method to hide the browser&#8217;s address bar. This is used at page load time and when the user navigates to different views. This is for use when a Web app is running in the mobile browser with an address bar. It&#8217;s not necessary for Web apps installed on the mobile device&#8217;s home screen.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$.UIHideURLbar();
</code></pre>

<p><strong>Example:</strong></p>

<pre><code>$.UIHideURLbar();
</code></pre>

<p>&nbsp;</p>

<h2 id="function_importscript">Function: $.importScript</h2>

<p>A method to import external scripts into the document. This method is attached directly to the $ object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$.importScript(URI);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>URI: A valid URI of the script to import into the document.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>$.importScript("https://bozo.com/scripts/myScript.js");
</code></pre>

<p><strong>Variables: iphone, ipad, ipod, android, webos, blackberry, touchEndabled, online, standalone</strong></p>

<p>Properties to determine device platform, network connection and standalone status.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$.standalone // returns true or false
</code></pre>

<p><strong>Example:</strong></p>

<pre><code>if (!$.standalone) {
    alert("Please install this app before using.");
}
if($.iphone) {
    // Code for iPhone here
} else if ($.ipad) {
    // Code for iPad here
}
</code></pre>

<p>&nbsp;</p>

<p><a name="xhr"></a></p>

<h2 id="function_elementxhr">Function: Element.xhr</h2>

<p>A method to insert content into a node using The XMLHttpRequest object. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.xhr(URI);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>URI: A valid URI to import into the document and fill an element.</li>
<li>Callback: A function to execute when the HTTPRequest is successful.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>$('#content').xhr('/data/customers.html');
</code></pre>

<p><strong>See Also:</strong></p>

<p><a href="#processJSON">$.processJSON</a></p>

<p><a href="#template">$.template</a></p>

<p><a href="#templates">$.templates</a></p>

<p><a href="#templateCache">$.templateCache</a></p>

<p>&nbsp;</p>

<h2 id="function_elementxhrjson">Function: Element.xhrjson</h2>

<p>A method to insert content into a node using The XMLHttpRequest object. This method is attached directly to the Element object.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.xhrjson(URI);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>URI: A valid URI to import into the document and fill an element.</li>
<li>options: An object literal mapping elements to json data.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>$('#content').xhrjson('/data/customers.js');
</code></pre>

<p>$nbsp;</p>

<p><a name="processJSON"></a></p>

<h2 id="function_processjson">Function: $.processJSON</h2>

<p>A method to process the result of an Ajax call for a JSON file. Because an Ajax call always returns a string, this method creates a script tag, inserts the returned JSON data into it and then inserts the script into the document&#8217;s head tag, forcing the browser to evaluate the string as JavaScript. From then on the JSON data will be available to your scripts. Because of this injection method, any script that need to access the returned JSON data need to be chained in execution by putting them in a separate ready block after the one in which the Ajax call was made. See below.</p>

<p><strong>Example:</strong></p>

<pre><code>$.ready(function() {
    // Make an Ajax request for JSON data.
    var data = null;
    $.app.xhr("customers.json", {
        successCallback: function() {
            data = $.responseText;
            $.processJSON(data);
        }
    });
    // Define the template "customers and store it in $.templates:
    $.templates.customers = 
    "&lt;% for (var i = 0; i &lt; customers.length; i++) { %&gt;\
        &lt;tablecell&gt;\
            &lt;celltitle&gt;&lt;%= customers[i].firstName %&gt; &lt;%= customers[i].lastName %&gt;&lt;/celltitle&gt;\
            &lt;cellsubtitle&gt;&lt;%= customers[i].address  %&gt;&lt;/cellsubtitle&gt;\
            &lt;celldetail&gt;&lt;%= customers[i].description %&gt;&lt;/celldetail&gt;\
        &lt;/tablecell&gt;\
    &lt;%  } %&gt;";
});
/*
    The following block is necessary to allow the XHR request to complete and inject the JSON file into the document's head. This act causes the browser to parse the JSON object into memory as a readable JSON object, otherwise it would remain a string and we would not be able to parse it for data.
*/
$.ready(function() {
    // Process the template of $.template.customers" with JSON data in the variable "data".
    // This is read from an Ajax call to an external JSON object in json.json.
    $.templateCache.customers = $.template("customers", data);
    // insert the results of the parsed template into the tableview."
    $("view#main tableview:first-of-type").insert($.templateCache.customers);
});
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementdata">Function: Element.data</h2>

<p>A method to get and set a dataset value on an element.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.data(key);
Element.data(key, value);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>key: A string defining the dataset key to access.</li>
<li>value: A string defining the value to set the dataset key to.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>var customer = $('#customer').data('customer-name'); 
$$(".customers").forEach(function(customer) {
    console.log(customer.data("customer-name"));
}
$("#shirt).data("shirt-size", "XXL"); // outputs data-shirt-size="XXL" on #shirt
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementremovedata">Function: Element.removeData</h2>

<p>A method to remove a dataset from an element.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Element.removeData(key);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>key: A string defining the dataset key to remove.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>$("#shirt).removeData("shirt-size"); // removes data-shirt-size from #shirt
</code></pre>

<p>&nbsp;</p>

<h2 id="function_localitem">Function: $.localItem</h2>

<p>Set a key/value pair to the browser&#8217;s localStorage, or retrieve a key value. If you pass only a key, it returns the key&#8217;s value if that key is present in localStorage. Otherwise, passing a key and a value will set these on localStorage.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$.localItem(key, value)
$.localItem(key)
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>key: The key to retrieve from the browser&#8217;s localStorage.</li>
<li>key: A key to add to the browser&#8217;s localStorage.</li>
<li>value: A value to set to the key of the browser&#8217;s localStorage.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>$.localItem("clientFirstName", "Robert");
var clientFirstName = $.localItem("clientFirstName");
console.log("The client's name is: " + clientFirstName");
</code></pre>

<p>&nbsp;</p>

<h2 id="function_deletelocalitem">Function: $.deleteLocalItem</h2>

<p>Set a key/value pair to the browser&#8217;s localstorage.</p>

<p><strong>Syntax:</strong></p>

<pre><code>$.deleteLocalItem(key)
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>key: The key to remove from the browser&#8217;s localStorage.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>$.deleteLocalItem("clientFirstName");
</code></pre>

<p>&nbsp;</p>

<h2 id="function_clearlocalitems">Function: $.clearLocalItems</h2>

<p>A method to delete the localStorage. This requires no parameters and will completely remove the browser&#8217;s localStorage for that domain. A new one can be create again at any time.</p>

<p><strong>Example:</strong></p>

<pre><code>$.clearLocalItem();
</code></pre>

<p>&nbsp;</p>

<p><a name="templates"></a></p>

<h2 id="variable_templates">Variable: $.templates</h2>

<p>A cache for unprocessed template for use later. At app load time you can define templates to use or read them from localStorage and store them here to process when you need them. You can use back slashes to create new lines so that you can visually format your template to make it easier to see how they will render when output.</p>

<p><strong>Example:</strong></p>

<pre><code>$.templates.customers = 
"&lt;% for (var i = 0; i &lt; customers.length; i++) { %&gt;\
    &lt;tablecell&gt;\
        &lt;celltitle&gt;&lt;%= customers[i].firstName %&gt; &lt;%= customers[i].lastName %&gt;&lt;/celltitle&gt;\
        &lt;cellsubtitle&gt;&lt;%= customers[i].address  %&gt;&lt;/cellsubtitle&gt;\
        &lt;celldetail&gt;&lt;%= customers[i].description %&gt;&lt;/celldetail&gt;\
    &lt;/tablecell&gt;\
&lt;%  } %&gt;";
$.templates.recipes = 
"&lt;% for (var i = 0; i &lt; recipes.length; i++) { %&gt;\
    &lt;tablecell&gt;\
        &lt;celltitle&gt;&lt;%= recipes[i].recipeName %&gt; &lt;%= users[i].lastName %&gt;&lt;/celltitle&gt;\
        &lt;cellsubtitle&gt;&lt;%= recipes[i].recipeDescription  %&gt;&lt;/cellsubtitle&gt;\
        &lt;celldetail&gt;&lt;%= recipes[i].recipeIngredients %&gt;
            &lt;ul&gt;
                &lt;% for (var k = 0, rLen = recipes[i].ingredients; k &lt; rlen; k++) { %&gt;
                    &lt;li&gt;&lt;%= recipes[i].indredients[k] %&gt;&lt;/li&gt;
                %&gt;
            &lt;/ul&gt;
        &lt;/celldetail&gt;\
    &lt;/tablecell&gt;\
&lt;%  } %&gt;";
</code></pre>

<p>Having defined and stored the above templates, you can use them to process the result of a JSON Ajax request as follows.</p>

<p><strong>Example:</strong></p>

<pre><code>$.ready(function() {
    // Make an Ajax request for JSON data.
    var data = null;
    $.app.xhr("customers.json", {
        successCallback: function() {
            data = $.responseText;
            $.processJSON(data);
        }
    });
});
$.ready(function() {
    // Process the template of $.template.customers" with JSON data in the variable "data".
    // This is read from an Ajax call to an external JSON object in json.json.
    $.templateCache.customers = $.template("customers", data);
    // insert the results of the parsed template into the tableview."
    $("#main tableview:first-of-type").insert($.templateCache.customers);
});
</code></pre>

<p>&nbsp;</p>

<p><a name="templateCache"></a></p>

<h2 id="variable_templatecache">Variable: $.templateCache</h2>

<p>A cache for processed templates which can be used later to save processing time. </p>

<p>See Also:</p>

<p><a href="#$template">$.template</a></p>

<p><a name="$template"></a></p>

<p>&nbsp;</p>

<h2 id="function_template">Function: $.template</h2>

<p>A method to parse a JavaScript Micro Template and populate it with JSON data. This is based on John Resig&#8217;s JavaScript micro template: <a href="http://ejohn.org/">ejohn.org</a></p>

<p><strong>Syntax:</strong></p>

<pre><code>$.template(str, data);
</code></pre>

<p><strong>Parameters:</strong></p>

<ul>
<li>string: A string defining the template to use. (You could also pass a string defining a template cached in the $.templates object.)</li>
<li>data: JSON data to be mapped to elements in the template.</li>
</ul>

<p><strong>Example:</strong></p>

<pre><code>var result = $.template("foodTemplate", data);
$.ready(function() {
    $("#foodTableview").insert(result);
});
</code></pre>

<p><strong>See Also:</strong></p>

<p><a href="#templates">$.templates</a></p>

<p><a href="#templateCache">$.templateCache</a></p>

<p><a href="#xhr">Element.xhr</a></p>

<p>&nbsp;</p>

<h2 id="function_uiupdateorientationchange">Function: $.UIUpdateOrientationChange</h2>

<p>A method for outputting a class on the body tag to identify the orientation of the mobile device when the device&#8217;s orientation changes. In landscape mode it puts the class &#8220;landscape&#8221; on the body tag and in portrait mode it puts the &#8220;portrait&#8221; on the body tag. There can only be one or the other on the body tag at any given time. This class is to enable the use of styles based on the orientation of the device. You can create styles using these class as in the example below.</p>

<p><strong>Example:</strong></p>

<pre><code>body.portrait app &gt; view {
    background-color: green;
}
body.landscape app &gt; view {
    background-color: orange;
}
</code></pre>

<p>&nbsp;</p>

<h2 id="function_uilistenforwindowresize">Function: $.UIListenForWindowResize</h2>

<p>A method for outputting a class on the body tag to identify the orientation of the mobile device when the window is resized. If in window is wider than it is tall, it outputs the class &#8220;landscape&#8221; on the body tag, and when it is taller than it is wide, it outputs &#8220;portrait&#8221; on to the body tag. This allows you to testing for orientation change on the desktop for landscape and portrait modes.</p>

<p><strong>Example:</strong></p>

<pre><code>body.portrait &gt; view {
    background-color: green;
}
body.landscape &gt; view {
    background-color: red;
}
</code></pre>

<p>&nbsp;</p>

<h2 id="function_functionbind">Function: Function.bind</h2>

<p>Add bind capability to the Function object for versions of Webkit that don&#8217;t support it.</p>

<p><strong>Syntax:</strong></p>

<pre><code>Function.bind(function, object);
</code></pre>

<p><strong>Example:</strong></p>

<pre><code>var greeter = {
    name: "greeter object",
    speaks: function() {
    contructGreeting = function(greeting) {
        console.log(greeting + " " + this.name);
    }.bind(this) // Bound to "greeter"
        contructGreeting("hello");
    }
};
greeter.speaks("hello");
</code></pre>

<p>&nbsp;</p>

<h2 id="function_elementuicheckforoverflow">Function: Element.UICheckForOverflow</h2>

<p>Determines whether an element has content overflowing its bounds or not.</p>

<p><strong>Syntax:</strong>
    Element.UICheckForOverflow();</p>

<p><strong>Returns:</strong></p>

<p>A boolean true or false.</p>

<p><strong>Example:</strong></p>

<pre><code>if($("tableview:first-of-type").UICheckForOverflow();) {
    // Handle scrolling.
}
</code></pre>
