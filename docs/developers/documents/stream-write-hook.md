---
title: stream-write-hook
name: stream-write-hook
type: plugins
layout: api_doc.html
---
# Plugins: stream-write-hook


### Intercepts any stream flow in order to be able to manage the information inside.

This way you can capture all the output of any stream and do whatever you want with it. The way to do this has two stages:

#### 1. Start intercepting the stream

At any place in yor code is posible to intercept any stream the only thing you have to do is use streamWriteHook method:

```
   let capture = &#39;&#39;;
   this.streamWriteHook(process.stdout, function(chunk, encoding, cb) {
     capture += stripcolorcodes(chunk.toString(encoding));
   });
```

(*) stripcolorcodes() is used to deleting all coloured characters from stream. 
  
Capture will contain all from content of process.stdout

#### 2. Stop intercepting the stream.

Is necesary to do release all system resources, so do this:

```
   this.streamWriteUnhook(process.stdout);
```

### Addons:

#### this.streamWriteHook

starts the hook

| Param | Description |
| --- | --- |
|stream |Stream to be hooked |
|cb |Function to call each time chunk is append to stream |

#### this.streamWriteUnhook

stops the hook

| Param | Description |
| --- | --- |
|stream |Stream to be Unhooked |




