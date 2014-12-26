(function($, window, undefined) {
    "use strict";
    // TODO: handle RTL
    var ENTER_KC = 13, BACKSPACE_KC = 8, DELETE_KC = 46, //ARROWS
    DOWN_A = 40, UP_A = 38, LEFT_A = 37, RIGHT_A = 39;
    var defaults = {};
    $.fn.joinInputs = function jq_fn_joinInputs(options) {
        var $this = $(this).filter(":input, textarea"), length = $this.length;
        options = $.extend({}, defaults, options);
        if (options.debug) {
            console.log("$ applying `joinInputs` to " + length + " elements");
        }
        $this.on("keydown", keydown);
        function keydown(e) {
            return handleKey(e);
        }
        function handleKey(e) {
            var keyCode = e.keyCode, $target = $(e.target), selectionStart = e.target.selectionStart, selectionEnd = e.target.selectionEnd, selectionLength = selectionEnd - selectionStart, isInput = e.target.nodeName === "INPUT";
            // exclude cases when some text was selected
            if (selectionLength) return true;
            if (options.debug) {
                console.log(selectionStart, selectionEnd, selectionLength, $target.val().length);
            }
            // Crabby left
            if (// enter shouldn't work on textareas
            (isInput && keyCode === ENTER_KC || keyCode === RIGHT_A) && $target.val().length === selectionEnd) {
                // cut from current position
                // paste to next one
                return moveCrabby(1, e);
            }
            // Crabby right
            if ((keyCode === BACKSPACE_KC || keyCode === LEFT_A) && // cursor is at the beginning of the input
            selectionStart === 0) {
                return moveCrabby(-1, e);
            }
            // Moving down
            if (isInput && keyCode === DOWN_A) {
                return moveVertically(1, e);
            }
            if (!isInput && keyCode === DOWN_A && $target.val().length === selectionEnd) {
                return moveCrabby(1, e);
            }
            // Moving up
            if (isInput && keyCode === UP_A) {
                return moveVertically(-1, e);
            }
            if (!isInput && keyCode === UP_A && selectionStart === 0) {
                return moveCrabby(-1, e);
            }
        }
        function moveVertically(inc, e) {
            var next = getInput(inc, e);
            if (!next) return true;
            if (typeof options.focusHandler === "function") {
                options.focusHandler(next, e);
            } else {
                $(next).focus();
                moveCursor(next, e.target.selectionStart);
            }
            return false;
        }
        function moveCrabby(inc, e) {
            var next = getInput(inc, e);
            if (!next) return true;
            if (typeof options.focusHandler === "function") {
                options.focusHandler(next, e);
            } else {
                $(next).focus();
                moveCursor(next, inc === 1 ? 0 : -1);
            }
            return false;
        }
        function moveCursor(element, cursorPosition) {
            if (cursorPosition < 0) cursorPosition = $(element).val().length;
            if (options.debug) console.log("moving ", element, " to ", cursorPosition);
            setSelectionRange(element, cursorPosition, cursorPosition);
        }
        function setSelectionRange(element, start, end, direction) {
            if (element.setSelectionRange) {
                element.setSelectionRange(start, end, direction);
            } else if (element.createTextRange) {
                var range = element.createTextRange();
                range.collapse(true);
                range.moveEnd("character", end);
                range.moveStart("character", start);
                range.select();
            }
        }
        function getInput(inc, e) {
            var $t = $(e.target), index = $this.index($t), targetIndex = index + inc;
            if (targetIndex > length - 1 || targetIndex < 0) return false;
            return $this[targetIndex];
        }
    };
})(jQuery, window);