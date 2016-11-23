#callerJS

## What is it?

callerJS is a jQuery plugin and need it to work!

Use callerJS to call ajax and functions when you need

## Demo

See the Live Demo: http://code.pro.br/callerJSRepo/

## Introduction

With callerJS you can call by ajax and function your html partials when you want. You can call immediately or call by a trigger event.
The plugin callerJS use data attributes to configure your calls. See more in: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes

The list of possible data attributes are:

* data-call-cache //true or false, call url or function once
* data-call-fn //string of function to call
* data-call-httpverb //string POST or GET methods of url call.
* data-call-onevent //string of event: load or click or mouseenter or focus
* data-call-fn-onerror //string of function to callback on error (url)
* data-call-fn-onsuccess //string of function to callback on success (fn and url)
* data-call-target //string of id or class of element to render the content of call
* data-call-url //string of url to call by ajax

## Examples

### Init callerJS

```javascript
    $('.container').callerJS(); //init callerJS
```

### Call callerJS after init

```javascript
    $('.container').callerJS('call'); //call after init callerJS
```

### data-attributes

```
<div id="demo-url" data-call-target="#demo-url" data-call-onevent="load" data-call-cache="true" data-call-url="_partialDemoByUrl.html" class="panel-body">
</div>
```

```
<div class="panel-heading">
  <h2 class="panel-title" data-call-target="#demo-trigger" data-call-cache="true" data-call-onevent="mouseenter" data-call-url="_partialDemoByTrigger.html">Calling html by mouseenter! <small>mouseenter here.</small></h2>
</div>
<div id="demo-trigger" class="panel-body">
</div>
```
```
<div id="demo-fn" data-call-target="#demo-fn" data-call-onevent="hover" data-call-cache="true" data-call-fn="fnDemo()" class="panel-body">
</div>
```
```javascript
function fnDemo(){
  $('#demo-fn').load('_partialDemoByFn.html');
}
```
