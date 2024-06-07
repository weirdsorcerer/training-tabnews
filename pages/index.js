<!DOCTYPE html>
<html>
<head>
    <title>Button Example</title>
    <style>
        #displayText {
            margin-top: 20px;
            font-size: 20px;
            color: blue;
        }
    </style>
</head>
<body>

<button id="myButton">clika aki fi</button>
<div id="displayText"></div>

<script>
    document.getElementById("myButton").addEventListener("click", function() {
        document.getElementById("displayText").innerText = "coe";
    });
</script>

</body>
</html>
