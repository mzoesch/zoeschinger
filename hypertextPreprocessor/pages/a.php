<script type="text/javascript">
    var HoverListener = {
        addElem: function(elem, callback, delay) {
            if (delay === undefined) {
                delay = 1000;
            }

            var hoverTimer;

            addEvent(elem, 'mouseover', function() {
                hoverTimer = setTimeout(callback, delay);
            });

            addEvent(elem, 'mouseout', function() {
                clearTimeout(hoverTimer);
            });
        },
    };

    function tester() {
        alert('hi');
    }

    //  Generic event abstractor
    function addEvent(obj, evt, fn) {
        if ('undefined' != typeof obj.addEventListener) {
            obj.addEventListener(evt, fn, false);
        } else if ('undefined' != typeof obj.attachEvent) {
            obj.attachEvent('on' + evt, fn);
        }
    }

    addEvent(window, 'load', function() {
        HoverListener.addElem(document.getElementById('test'), tester);
        HoverListener.addElem(
            document.getElementById('test2'),
            function() {
                alert('Hello World!');
            },
            2300
        );
    });
</script>



<div id="test">Will alert "hi" on hover after one second</div>
<div id="test2">Will alert "Hello World!" on hover 2.3 seconds</div>