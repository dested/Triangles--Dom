function Main() {


    var ctx = document.getElementById("cnvGameBoard").getContext('2d');

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    var width = 700;
    var height = 700;

    var firstSelected;

    var allTriangles = [];
    var triangles = [];
    document.getElementById('cnvGameBoard').addEventListener('contextmenu', function (_evt) {
        _evt.preventDefault();
    }, false);

    $('#cnvGameBoard').mousedown(function (_e) {
        fixMouse($('#cnvGameBoard')[0], _e);

        var selected;
        var l;
        switch (_e.which) {
            case 1:
                for (l = 0; l < allTriangles.length; l++) {
                    allTriangles[l].selected = allTriangles[l].highlightedNeighbors = allTriangles[l].neighbors = false;
                    if (allTriangles[l].inBounds(_e.x, _e.y)) {
                        (selected = allTriangles[l]).selected = true;

                    }
                }


                if (selected) {

                

                    if (!firstSelected || !firstSelected.isNeighbor(selected.x, selected.y)) {
                        firstSelected = selected;

                        selected.highlightNeighbors(triangles);

                    } else {

                        var c2 = firstSelected.color;
                        firstSelected.transitionTo(selected.color);
                        selected.transitionTo(c2);

                        selected.selected = false;
                        firstSelected = undefined;
                    }

                }


                break;
            case 3:
                var neighbors = [];

                for (l = 0; l < allTriangles.length; l++) {
                    allTriangles[l].neighbors = false;
                    if (allTriangles[l].inBounds(_e.x, _e.y)) {
                        neighbors = allTriangles[l].getLikeNeighbors(triangles);

                    }
                }


                for (var i = 0; i < neighbors.length; i++) {
                    neighbors[i].neighbors = true;


                }


                break;
            case 2:
                //middle click
                break;
            default:
                alert('You have a strange mouse');
        }


    });




    
    $('#cnvGameBoard').mousemove(function (_e) {//mobile???
        fixMouse($('#cnvGameBoard')[0], _e);
        for (var l = 0; l < allTriangles.length; l++) {
            allTriangles[l].glow = false;
            if (allTriangles[l].inBounds(_e.x, _e.y)) {
                allTriangles[l].glow = true;

            }
        }


    });


    init();

    setInterval(drawBoard, 1000 / 30);


    function init() {

        var boardWidth = 15;
        var boardHeight = 10;
        for (var x = 0; x < boardWidth; x++) {
            triangles[x] = [];
            for (var y = 0; y < boardHeight; y++) {
                var tri = new Triangle(x, y, (x + (y % 2 == 0 ? 1 : 0)) % 2 == 0, get_random_color());

                triangles[x][y] = tri;

                allTriangles.push(tri);
            }
        }
    }

    function drawBoard() {


        ctx.save();
        ctx.save();
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);
        ctx.restore();

        ctx.translate(offset.x, offset.y);

        var specials = [];
        var specials2 = [];
        var l;
        for (l = 0; l < allTriangles.length; l++) {
            if (allTriangles[l].selected || allTriangles[l].glow || allTriangles[l].neighbors ) {
                specials.push(allTriangles[l]);
            } else if (allTriangles[l].highlightedNeighbors) {
                specials2.push(allTriangles[l]);
            } else {
                allTriangles[l].draw(ctx);
            }
        }

        //drawing happens sequentially, and it will draw over our highlight, so we draw those last.
        for (l = 0; l < specials2.length; l++) { 
            specials2[l].draw(ctx);
        }
        for (l = 0; l < specials.length; l++) {
            specials[l].draw(ctx);
        }



        ctx.restore();

    }


}