# jquery.scrollfreeze

A simple jQuery plugin that allows you to easily disable(freeze) user scroll events on the window.

## Installation

Include script *after* the jQuery library:

```html
<script src="/path/to/jquery.scrollfreeze.js"></script>
```

The plugin can also be loaded as an AMD module.

## Usage

The plugin automatically initializes on document.ready, and requires no configuration except for one optional setting `useOverflow`, which I will explain shortly.

To disable(freeze) user scroll:

```javascript
$.scrollFreeze.freeze();
```

To renable(thaw) user scroll:

```javascript
$.scrollFreeze.thaw();
```

To toggle between disabled and enabled scroll:

```javascript
$.scrollFreeze.toggle();
```

By default `freeze` and `thaw` will only block user scroll events e.g. Mouse Wheel, arrow keys. The user still has the ability to use the scroll bar to scroll the page by default. To prevent this call the `useOverflow` method upon page load. 

```javascript
$.scrollFreeze.useOverflow();
```

To disable plugin, which essentially removes the event listenrs on the plugin:

```javascript
$.scrollFreeze.disable();
```

If you need to re-enable after disabling:

```javascript
$.scrollFreeze.enable();
```

Some convenience methods to retrieve state:

```javascript
$.scrollFreeze.isFrozen();
$.scrollFreeze.isEnabled();
```

## Examples

See the demo included for a simple example.

## Notes
* This was never intended for mobile use and therefore was never tested on mobile devices. Although it may work on mobile if `useOverflow` has been set.
* This script was created out of necessity when I was working on a single page application that automatically scrolled between sections. I needed to prevent the user's scroll events from interfering with the automated scrolling. 


## Author

[Ryan Johnson](https://github.com/ryandrewjohnson)