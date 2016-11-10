#callerJS

## What is it?

CallerJS is a jQuery plugin and need it to work!

Use Caller JS to call ajax and functions when you need

## Demo

See the Live Demo: [http://code.pro.br/callerJSRepo/]

## Introduction

With callerJS you can call by ajax and function your html partials when you want. You can call immediately or call by a trigger event.
The plugin callerJS use data attributes to configure your calls. See more in: [https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes]

The list of possible data attributes are:

* data-call-ajax-method //string POST or GET methods of url call
* data-call-fn //string of function to call
* data-call-immediate //true or false call url or function immediately
* data-call-into //string of id or class of elemento do render the url call
* data-call-once //true or false, call url or function once
* data-call-trigger //string of event: click or mouseenter or focus
* data-call-url //string of url to call by ajax
* data-call-callback //string of function to callback

## Examples

### Init callerJS

```javascript
    $('.container').callerJS(); //init callerJS
```javascript

### Call callerJS after init

```javascript
    $('.container').callerJS('call'); //call after init callerJS
```javascript

### data-attributes

```
<div id="demo-url" data-call-into="#demo-url" data-call-immediate="true" data-call-once="true" data-call-url="_partialDemoByUrl.html" class="panel-body">
</div>
```

```
<div class="panel-heading">
  <h2 class="panel-title" data-call-into="#demo-trigger" data-call-once="true" data-call-trigger="mouseenter" data-call-url="_partialDemoByTrigger.html">Calling html by mouseenter! <small>mouseenter here.</small></h2>
</div>
<div id="demo-trigger" class="panel-body">
</div>
```
```javascript
function fnDemo(){
  $('#demo-fn').load('_partialDemoByFn.html');
}
```javascript
