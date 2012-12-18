<!DOCTYPE html>
<html>
<head>
    <script src="libs/jquery-1.4.1-vsdoc.js" type="text/javascript"> </script>
    <script src="ArrayHelpers.js" type="text/javascript"> </script>
    <script src="Help.js" type="text/javascript"> </script>
    <script src="Triangle.js" type="text/javascript"> </script>
    <script src="Main.js" type="text/javascript"> </script>
    <meta charset="utf-8" />
    <title>Triangles!</title>
    <script type="text/javascript">


        var offset = { x: 50, y: 20 }; 
        $(function () {
            var main = new Main();
        });

    </script>
    <style>
        body {
            -webkit-user-select:none;
-moz-user-select:none;
        }
        
    </style>
</head>
<body>
    <center>
        <canvas id="cnvGameBoard" width="700" height="700"></canvas>
        <br />
        <textarea id="txtConsole" cols="75" rows="10" style="display: none;"></textarea>
    </center>
</body>
</html>
