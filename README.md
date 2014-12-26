#jq-joined-text-entries

jQuery plugin to virtually join input-s and textarea-s in vertical navigation

See [example](http://kosich.github.io/jq-joined-text-entries/) or check `test/simple.html`, `test/textarea.html`, `test/two-sets.html`

Usage:

```javascript
$('form').find('.text-entry').joinTextEntries();
```

Theres only one parameter available: 
- `focusHandler :: function(HTMLElement, jQuery.Event)`. A function to handle the focus job. Will be called with two params:

    1 `next` -- element which should be focused

    2 `event` -- jQuery event, that was triggered

Example with `focusHandler`, which hides *switched from* element and shows *switched to* element:

```javascript
function handle(element, e){
    $( e.target ).hide()
    $( element ).show().focus();
}

$(':input').joinTextEntries({
    focusHandler : handle
}).filter(':not(:first)').hide();
```

**NOTE**: there's no way currently to trigger focus event on element, unless you are using your own `focusHandler`

**NOTE**: navigation is implemented only vertically (not grid or horizontal) in order how elements are stored in jQuery object
