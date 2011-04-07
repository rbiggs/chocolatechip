---
title: ChocolateChip - A Compact JavaScript Framework for Mobile Webkit
---

#ChocolateChip.js - A Compact JavaScript Framework for Mobile Webkit

ChocolateChip is a jQuery-like framework. It retains its small size by avoiding desktop and legacy browser support, choosing to support the latest standards in modern mobile browsers using Webkit.

Although it resembles jQuery it differs in that there is no object obfuscation when you get a node or a node collection. At any time you can switch to using regular JavaScript with ChocolateChip. For example, in ChocolateChip you get real "this" not $(this). ChocolateChip differs from jQuery in that it does not hide node results in an internal iterator. If you want one node, you use $(selector). If you want to get a collection of nodes you use $$(selector). $(selector) will always return the first match it finds. $(selector) will return a collection of all matches. ChocolateChip converts the collection to an array so that you can use array methods on it, such as forEach, map, indexOf, filter, etc.

    // Will only affect the first paragraph.
    $("p").css("{ background-color: yellow; color: red; }"); 
  
When you get a collection with $$(selector) you get back an array. You can act on all items in that array using Array.forEach(). Pass an anonymous function inside of which you define what you want to do with each item in the array. You can pass an alias as the anonymous function's parameter which will represent each item in the array during the iteration process.

    // Get all paragraphs (use "paragraph" as an alias for each array item):
    $$("p").forEach(function(paragraph) {
       paragraph.css("{ background-color: yellow; color: red; }"); 
    });

##Be Ready When You Need To

ChocolateChip provides a convenient way to allow you to access the DOM when it is done loading but before it gets output to the screen. You use the $.ready method and pass it an anonymous function inside of which you put all the code you wish to execute:

    $.ready(function() {
       $$("li > a").forEach(function(link) {
        link.css("{ display: inline-block; border: solid 1px red; }");
        link.bind("touchstart", function handleLink() {
            // Do something here.
        });
       });
    });

You can use a shorthand for as well by passing the anonymous function directly to the $() method:

    $(function() {
      $$("li > a").forEach(function(link) {
        link.css("{ display: inline-block; border: solid 1px red; }");
        link.bind("touchstart", function handleLink() {
            // Do something here.
        });
      });
    });

##Handling Events

ChocolateChip allows you to bind events or delegate them. 

##ChocolateChip functions:

    $()
    $.extend() 
    $.collectionToArray()
    $.$$() // This gets alias to just $$ for convenience.
    $.make()
    $.processJSON()
    $.delay()
    $.defer()
    $.enclose()
    $.compose()
    $.loadEvent()
    $.DOMReadyList()
    $.executeWhenDOMReady()
    $.ready()
    $.UIHideURLbar()
    $.importScript()
    $.localItem()
    $.deleteLocalItem()
    $.clearLocalItems()
    $.templates()
    $.templateCache()
    $.template()
    $.UIUpdateOrientationChange()
    $.UIListenForWindowResize()
    Function.prototype.bind()

HTMLElement Extensions:

    HTMLElement.previous()
    HTMLElement.next()
    HTMLElement.first()
    HTMLElement.last()
    HTMLElement.ancestor()
    HTMLElement.ancestorByTag() // Deprecated, use HTMLElement.ancestor()
    HTMLElement.ancestorByClass() // Deprecated, use HTMLElement.ancestor()
    HTMLElement.ancestorByPosition() // Deprecated, use HTMLElement.ancestor()
    HTMLElement.clone()
    HTMLElement.wrap()
    HTMLElement.unwrap()
    HTMLElement.text()
    HTMLElement.fill()
    HTMLElement.empty()
    HTMLElement.remove()
    HTMLElement.insert()
    HTMLElement.before()
    HTMLElement.after()
    HTMLElement.hasClass()
    HTMLElement.addClass()
    HTMLElement.removeClass()
    HTMLElement.disable()
    HTMLElement.enable()
    HTMLElement.toggleClass()
    HTMLElement.getTop()
    HTMLElement.getLeft()
    HTMLElement.css()
    HTMLElement.bind()
    HTMLElement.unbind()
    HTMLElement.removeEvents()
    HTMLElement.delegate()
    HTMLElement.trigger()
    HTMLElement.anim()
    HTMLElement.xhr()
    HTMLElement.xhrjson()
    HTMLElement.data()
    HTMLElement.removeData()
    HTMLElement.UICheckForOverflow()

String methods:

    String.capitalize()
    String.capitalizeAll() 

Properties:

    $.events - an array
    $.iphone - a boolean
    $.ipad - a boolean
    $.ipod - a boolean
    $.android - a boolean
    $.webos - a boolean
    $.blackberry - a boolean
    $.touchEnabled - a boolean
    $.online - a boolean
    $.standalone - a boolean