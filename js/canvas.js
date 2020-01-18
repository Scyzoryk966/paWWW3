var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var canvas1 = document.getElementById('imageCanvas');
var ctx1 = canvas1.getContext('2d');
var canvas2 = document.getElementById('imageDraw');
var src = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
var copy = src.createImageData(canvas1.width, canvas1.height)
copy.data.set(src.data);


function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas1.width = img.width;
            canvas1.height = img.height;
            canvas2.width = img.width;
            canvas2.height = img.height;
            ctx1.drawImage(img,0,0);
        };
        img.src = event.target.result;
        $('.uploadhide').hide(1000);
        $('canvas').css('max-height', $(document).height()*0.8);
        $('.afterUpload').show(1000);
    };
    reader.readAsDataURL(e.target.files[0]);
}

function grayScale() {
    var imgData = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var pixels  = imgData.data;
    for (var i = 0, n = pixels.length; i < n; i += 4) {
        var grayscale = pixels[i] * .3 + pixels[i+1] * .59 + pixels[i+2] * .11;
        pixels[i  ] = grayscale;        // red
        pixels[i+1] = grayscale;        // green
        pixels[i+2] = grayscale;        // blue
    }
    ctx1.putImageData(imgData, 0, 0);
}

function brighten() {
    var imgData = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var pixels  = imgData.data;
    for (var i = 0, n = pixels.length; i < n; i += 4) {
        var grayscale = pixels[i] * .3 + pixels[i+1] * .59 + pixels[i+2] * .11;
        pixels[i] += 10;        // red
        pixels[i+1] += 10;        // green
        pixels[i+2] += 10;        // blue
    }
    ctx1.putImageData(imgData, 0, 0);
}

function darken() {
    var imgData = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var pixels  = imgData.data;
    for (var i = 0, n = pixels.length; i < n; i += 4) {
        var grayscale = pixels[i] * .3 + pixels[i+1] * .59 + pixels[i+2] * .11;
        pixels[i] -= 10;        // red
        pixels[i+1] -= 10;        // green
        pixels[i+2] -= 10;        // blue
    }
    ctx1.putImageData(imgData, 0, 0);
}

function text() {
    var c = document.getElementById("imageDraw");
    var ctx = c.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillText($('#imgTxt').val(), 10, 50);
}

function resetOrg() {
    var c = document.getElementById("imageDraw");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, canvas2.width, canvas2.height);
}
function canvMerge(){
    var c = document.getElementById('imageOutput');
    var ctx = c.getContext('2d');
    c.width = canvas1.width;
    c.height = canvas1.height;
    ctx.drawImage(canvas1, 0, 0);
    ctx.drawImage(canvas2, 0, 0);
}
function downloadCanvas(){      // get canvas data
    canvMerge();
    var canvas = document.getElementById( 'imageOutput' );
    var image = canvas.toDataURL();        //create temporary link
    var tmpLink = document.createElement( 'a' );
    tmpLink.download = 'FiltrCanvas.png'; // set the name of the download file
    tmpLink.href = image;        // temporarily add link to body and initiate the download
    document.body.appendChild( tmpLink );
    tmpLink.click();
    document.body.removeChild( tmpLink );
}

function cancel(){
    $('.uploadhide').show(1000);
    $('.afterUpload').hide(1000);
    $('#imageLoader').val('')
}