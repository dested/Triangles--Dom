/***********************************************
*
* Function    : getColor
*
* Parameters  :	start - the start color (in the form "RRGGBB" e.g. "FF00AC")
*			end - the end color (in the form "RRGGBB" e.g. "FF00AC")
*			percent - the percent (0-100) of the fade between start & end
*
* returns	  : color in the form "#RRGGBB" e.g. "#FA13CE"
*
* Description : This is a utility function. Given a start and end color and
*		    a percentage fade it returns a color in between the 2 colors
*
* Author	  : Open Source
*
*************************************************/
function getColor(_start, _end, _percent) {
    function hex2Dec(_hex) { return (parseInt(_hex, 16)); }
    function dec2Hex(_dec) { return (_dec < 16 ? "0" : "") + _dec.toString(16); }

    _start = _start.slice(1, 7);
    _end = _end.slice(1, 7);

    var r1 = hex2Dec(_start.slice(0, 2));
    var g1 = hex2Dec(_start.slice(2, 4));
    var b1 = hex2Dec(_start.slice(4, 6));

    var r2 = hex2Dec(_end.slice(0, 2));
    var g2 = hex2Dec(_end.slice(2, 4));
    var b2 = hex2Dec(_end.slice(4, 6));

    var pc = _percent / 100;

    var r = Math.floor(r1 + (pc * (r2 - r1)) + .5);
    var g = Math.floor(g1 + (pc * (g2 - g1)) + .5);
    var b = Math.floor(b1 + (pc * (b2 - b1)) + .5);

    return ("#" + dec2Hex(r) + dec2Hex(g) + dec2Hex(b));
}
/************************************************/

 
function fixMouse(_canvas, _e) {
    var element = _canvas, offsetX = 0, offsetY = 0;

    if (element.offsetParent) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }

    _e.x = _e.pageX - offsetX;
    _e.y = _e.pageY - offsetY;
}

var colors = ["#FF3700", "#7654FF", "#77FFB6", "#DAc42a", "#Ca2dFA"];
function get_random_color() {
    return colors[~ ~(Math.random() * (colors.length))];
}

function isPointInTriangle(_s, _a, _b, _c) {
    var asX = _s.x - _a.x;
    var asY = _s.y - _a.y;
    var sAb = (_b.x - _a.x) * asY - (_b.y - _a.y) * asX > 0;
    if ((_c.x - _a.x) * asY - (_c.y - _a.y) * asX > 0 == sAb) return false;
    if ((_c.x - _b.x) * (_s.y - _b.y) - (_c.y - _b.y) * (_s.x - _b.x) > 0 != sAb) return false;
    return true;
}

function log(_cont) {
    var console = $("#txtConsole");

    var text = console.val();

    console.val(text + _cont + "\n");

    console.scrollTop(
                    console[0].scrollHeight - console.height()
                );
}

