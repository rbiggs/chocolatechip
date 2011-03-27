/*
ChocolateChip-UI
Copyright 2011 Robert Biggs: www.chocolatechip-ui.com
License: BSD
Version: 1.1.4
*/
(function(){var $=function(a,b){if(!!b){if(typeof b==="string"){return document.querySelector(b+" "+a)}else if(b.nodeType===1){return b.querySelector(a)}}else{if(typeof a==="function"){$.ready(function(){a.call(a)})}else{return document.querySelector(a)}}};$.extend=function(a,b){if(!Object.keys){if(!b){b=a;a=this}for(var i in b){a[i]=b[i]}return a}else{Object.keys(b).forEach(function(p){if(b.hasOwnProperty(p)){Object.defineProperty(a,p,{value:b[p],writable:true,enumerable:false,configurable:true})}})}};$.extend($,{version:"1.1.4",collectionToArray:function(a){var b=[];var i=0,len=a.length;while(i<len){b[i]=a[i];i++}return b},$$:function(a,b){if(!!b){if(typeof b==="string"){return $.collectionToArray(document.querySelectorAll(b+" "+a))}else if(b.nodeType===1){return $.collectionToArray(b.querySelectorAll(a))}}else{return $.collectionToArray(document.querySelectorAll(a))}},make:function(a){var b=[];var c=document.createElement("div");c.innerHTML=a;var i=0;var d=c.childNodes.length;while(i<d){b[i]=c.childNodes[i];i++}return b},replace:function(a,b){b.parentNode.replaceChild(a,b)},processJSON:function(a){var b=document.createElement("script");b.setAttribute("type","text/javascript");b.insert(a);$("head").insert(b,"last")}});$.extend(HTMLElement.prototype,{previous:function(){return this.previousElementSibling},next:function(){return this.nextElementSibling},first:function(){return this.firstElementChild},last:function(){return this.lastElementChild},ancestor:function(a){var b=new RegExp("^#");var c=new RegExp("^.");var d=null;var e=null;var p=this.parentNode;if(!p){return false}if(typeof a==="string"){a.trim()}if(typeof a==="number"){d=a||1;for(var i=1;i<d;i++){if(p.nodeName==="HTML"){return p}else{if(p!=null){p=p.parentNode}}}return p}else if(a.substr(0,1)==="."){e=a.split(".")[1];if(p.nodeName==="BODY"){return false}if(p.hasClass(e)){return p}else{return p.ancestor(a)}}else if(a.substr(0,1)==="#"){e=a.split("#")[1];if(p.getAttribute("id")===e){return p}else{return p.ancestor(a)}}else{if(p.tagName.toLowerCase()===a){return p}else{return p.ancestor(a)}}},ancestorByTag:function(a){return this.ancestor(a)},ancestorByClass:function(a){a="."+a;return this.ancestor(a)},ancestorByPosition:function(a){return this.ancestor(a)},clone:function(a){if(a===true||!a){return this.cloneNode(true)}else{return this.cloneNode(false)}},wrap:function(a){var b=$.make(a);b=b[0];var c=this.clone(true);b.appendChild(c);this.after(b,this);this.remove(this)},unwrap:function(){if(this.parentNode.nodeName==="BODY"){return false}var a=this.cloneNode(true);$.replace(a,this.parentNode)},text:function(a){if(!!a){this.innerText=a}else{return this.innerText}},fill:function(a){this.empty();if(typeof a==="string"){this.textContent=a}else{this.insert(a)}},empty:function(){this.removeEvents();this.textContent=""},remove:function(){this.removeEvents();this.parentNode.removeChild(this)},insert:function(a,b){var c="";if(typeof a==="string"){c=$.make(a)}else if(a.nodeType===1){c=[];c.push(a)}else{c=a}var i=0;var d=c.length;if(!b||b>(this.children.length+1)||b==="last"){while(i<d){this.appendChild(c[i]);i++}}else if(b===1||b==="first"){while(i<d){this.insertBefore(c[i],this.firstElementChild);i++}}else{while(i<d){this.insertBefore(c[i],this.children[b-1]);i++}}},before:function(a){if(a.constructor===Array){var b=a.length;var i=0;while(i<b){this.parentNode.insertBefore(a[i],this);i++}}else{this.parentNode.insertBefore(a,this)}},after:function(a){var b=this.parentNode;if(a.constructor===Array){var i=0,len=a.length;while(i<len){if(this===b.lastChild){b.appendChild(a[i])}else{b.insertBefore(a[i],this.nextSibling)}i++}}else{if(a===this.lastChild){b.appendChild(a)}else{b.insertBefore(a,this.next())}}},hasClass:function(a){return new RegExp('(?:^|\\s+)'+a+'(?:\\s+|$)').test(this.className)},addClass:function(a){if(!this.hasClass(a)){this.className=[this.className,a].join(' ').replace(/^\s*|\s*$/g,"")}},removeClass:function(a){if(this.hasClass(a)){var b=this.className;this.className=b.replace(new RegExp('(?:^|\\s+)'+a+'(?:\\s+|$)','g'),' ').replace(/^\s*|\s*$/g,"")}},disable:function(){this.addClass("disabled");this.css("{cursor: default;}");this.preventDefault()},enable:function(){this.removeClass("disabled");this.css("{cursor: pointer;}")},toggleClass:function(a,b){if(!b){if(!this.hasClass(a)){this.addClass(a)}else{this.removeClass(a)}}else if(b){if(!this.hasClass(a)){this.addClass(a);this.removeClass(b)}else{this.removeClass(a);this.addClass(b)}}},getTop:function(){var a=this;var b=0;while(a.offsetParent){b+=a.offsetTop;a=a.offsetParent}b=b+document.body.offsetTop;return b},getLeft:function(a){var a=this;var b=0;while(a.offsetParent){b+=a.offsetLeft;a=a.offsetParent}b=b+document.body.offsetLeft;return b},css:function(a,b){if(/\{/.test(a)&&/\}/.test(a)&&!b){this.style.cssText+=a.substring(1,a.length-1)}if(!b){return document.defaultView.getComputedStyle(this,null).getPropertyValue(a.toLowerCase())}else{this.style.cssText+=a+":"+b+";";return this}},bind:function(a,b){this.addEventListener(a,b,false)},unbind:function(a,b){this.removeEventListener(a,b,false)},removeEvents:function(){var i=0,len=$.events.length;while(i<len){this[$.events[i]]=null;i++}},delegate:function(d,f,g){this.addEventListener(f,function(e){var c=e.target;$.$$(d,this).forEach(function(a){if(a.isSameNode(c)){g.apply(this,arguments)}else{try{var b=c.ancestor(d);if(a.isSameNode(b)){e.stopPropagation();g.call(this,b)}}catch(e){}}})},false)},trigger:function(a){if(document.createEvent){var b=document.createEvent('Events');b.initEvent(a,true,false);this.dispatchEvent(b)}},anim:function(a,b,c){var d=null;var e="-webkit-transition: all "+(b+" "||".5s ")+c+";"||""+";";for(var f in a){if(f==="onend"){d=a[f];this.bind("webkitTransitionEnd",function(){d()})}else{e+=f+":"+a[f]+";"}}this.css("{"+e+"}")},xhr:function(a,b){var o=b?b:{};if(!!b){if(!!b.successCallback){o.callback=b.successCallback}}var c=this,request=new XMLHttpRequest(),method=o.method||'get',async=o.async||false,params=o.data||null,i=0;request.queryString=params;request.open(method,a,async);if(o.headers){for(;i<o.headers.length;i++){request.setRequestHeader(o.headers[i].name,o.headers[i].value)}}request.handleResp=(o.callback!=null)?o.callback:function(){c.insert(this.responseText)};function hdl(){if(request.status===0||request.status==200&&request.readyState==4){$.responseText=request.responseText;request.handleResp()}else{b.errorCallback()}}if(async)request.onreadystatechange=hdl;request.send(params);if(!async)hdl();return this},xhrjson:function(b,d){if(d==="undefined"){return this}var c=d.callback;if(typeof c!='function'){c=function(x){return x}}var e=function(){var o=eval('('+this.responseText+')');for(var a in o){$(d[a]).fill(c(o[a]))}};d.successCallback=e;this.xhr(b,d);return this},data:function(a,b){if(!!document.documentElement.dataset){if(!b){return this.dataset[a]}else{this.dataset[a]=b}}else{if(!b){return this.getAttribute("data-"+a)}else{this.setAttribute("data-"+a,b)}}},removeData:function(a){if(!!document.documentElement.dataset){this.dataset[a]=null}else{this.removeAttribute("data-"+a)}},UICheckForOverflow:function(){var a=this.css("overflow");if(!a||a==="visible"){this.style.overflow="hidden"}var b=this.clientWidth<this.scrollWidth||this.clientHeight<this.scrollHeight;this.css("overflow",a);return b}});$.extend(String.prototype,{capitalize:function(){var a=this;return a.charAt(0).toUpperCase()+a.substring(1).toLowerCase()},capitalizeAll:function(){var b=this.split(" ");var c=[];b.forEach(function(a){c.push(a.capitalize())});return c.join(" ")}});$.extend($,{delay:function(a,b){var c=Array.prototype.slice.call(arguments,2);return setTimeout(function(){return a.apply(a,c)},b)},defer:function(a){return $.delay.apply($,[a,1].concat(Array.prototype.slice.call(arguments,1)))},enclose:function(b,c){return function(){var a=[b].concat(Array.prototype.slice.call(arguments));return c.apply(c,a)}},compose:function(){var b=Array.prototype.slice.call(arguments);return function(){var a=Array.prototype.slice.call(arguments);for(var i=b.length-1;i>=0;i--){a=[b[i].apply(this,a)]}return a[0]}},events:['onmousedown','onmouseup','onmouseover','onmouseout','onclick','onmousemove','ondblclick','onerror','onresize','onscroll','onkeydown','onkeyup','onkeypress','onchange','onsubmit','onload','ontouchstart','ontouchmove','ontouchend','ontouchcancel','ongesturestart','ongesturechange','ongestureend','onorientationchange'],loadEvent:function(F){var a=window.onload;if(typeof window.onload!=='function'){window.onload=F}else{window.onload=function(){a();F()}}},DOMReadyList:[],executeWhenDOMReady:function(){var a=$.DOMReadyList.length;var i=0;while(i<a){$.DOMReadyList[i]();i++}$.DOMReadyList=null;document.removeEventListener('DOMContentLoaded',$.executeWhenDOMReady,false)},ready:function(a){if($.DOMReadyList.length===0){document.addEventListener('DOMContentLoaded',$.executeWhenDOMReady,false)}$.DOMReadyList.push(a)},UIHideURLbar:function(){window.scrollTo(0,1)},importScript:function(a){var b=document.createElement("script");b.setAttribute("type","text/javascript");b.setAttribute("src",a);$("head").appendChild(b)},iphone:/iphone/i.test(navigator.userAgent),ipad:/ipad/i.test(navigator.userAgent),ipod:/ipod/i.test(navigator.userAgent),android:/android/i.test(navigator.userAgent),webos:/webos/i.test(navigator.userAgent),blackberry:/blackberry/i.test(navigator.userAgent),touchEnabled:("createTouch"in document),online:navigator.onLine,standalone:navigator.standalone,localItem:function(a,b){try{if(!b){try{var b=localStorage.getItem(a);if(b[0]==="{"){b=JSON.parse(b)}return b}catch(e){}}if(typeof b==="object"){b=JSON.stringify(b)}localStorage.setItem(a,b)}catch(e){if(e==="QUOTA_EXCEEDED_ERR"){console.error('Quota exceeded for localStorage!')}}},deleteLocalItem:function(a){try{localStorage.removeItem(a)}catch(e){}},clearLocalItems:function(){localStorage.clear()},templates:{},templateCache:{},template:function(c,d){if($.templates[c]){var c=$.templates[c]}else{var c=c}var e='var p=[],print=function(){p.push.apply(p,arguments);};'+'with(obj||{}){p.push(\''+c.replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/<%=([\s\S]+?)%>/g,function(a,b){return"',"+b.replace(/\\'/g,"'")+",'"}).replace(/<%([\s\S]+?)%>/g||null,function(a,b){return"');"+b.replace(/\\'/g,"'").replace(/[\r\n\t]/g,' ')+"p.push('"}).replace(/\r/g,'\\r').replace(/\n/g,'\\n').replace(/\t/g,'\\t')+"');} return p.join('');";var f=new Function('obj',e);return d?f(d):f},UIUpdateOrientationChange:function(){var a=$("body");document.addEventListener("orientationchange",function(){if(window.orientation===0||window.orientation===180){a.removeClass("landscape");a.addClass("portrait");$.UIHideURLbar()}else{a.removeClass("portrait");a.addClass("landscape");$.UIHideURLbar()}$.UIHideURLbar()},false)},UIListenForWindowResize:function(){var a=$("body");window.addEventListener("resize",function(){if(window.innerHeight>window.innerWidth){a.removeClass("landscape");a.addClass("portrait");$.UIHideURLbar()}else{a.removeClass("portrait");a.addClass("landscape");$.UIHideURLbar()}},false)}});if(window.$===undefined){window.$=$;window.$$=$.$$}else{window.__$=$;window.__$$=$.$$}})();$.ready(function(){$.UIUpdateOrientationChange();$.UIListenForWindowResize()});if(!Function.prototype.bind){Function.prototype.bind=function(a,b){var c=Array.prototype.slice.call(arguments,2);return function(){return a.apply(b||{},c.concat(Array.prototype.slice.call(arguments)))}}}