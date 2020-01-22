var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var canvas1 = document.getElementById('imageCanvas');
var ctx1 = canvas1.getContext('2d');
var canvas2 = document.getElementById('imageDraw');

function copyFun() {
    var src = ctx1.getImageData(0, 0, canvas1.width, canvas1.height); //zrobić z tego "reset filtrów"
    var copy = ctx1.createImageData(src.width, src.height);
    for (var i = 0; i < copy.data.length; i++) {
        copy.data[i] = src.data[i];
    }
    return copy;
}

var copy = copyFun();
var copy2 = null;
var copy3 = null;
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
            copy = copyFun();

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
    //console.log(pixels);
    for (var i = 0, n = pixels.length; i < n; i += 4) {
        var grayscale = pixels[i] * .3 + pixels[i+1] * .59 + pixels[i+2] * .11;
        pixels[i] = grayscale;        // red
        pixels[i+1] = grayscale;        // green
        pixels[i+2] = grayscale;        // blue
    }
    ctx1.putImageData(imgData, 0, 0);
}

function border(){
    var c = document.getElementById("imageCanvas");
    var ctx = c.getContext("2d");
    var grd = ctx.createRadialGradient((canvas1.width)/2, (canvas1.height)/2, (canvas1.width)/7, (canvas1.width)/2, (canvas1.height)/2, (canvas1.height));
    grd.addColorStop(0, "rgba(0,0,0,0)");
    grd.addColorStop(1, "black");

// Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas1.width, canvas1.height);
}

function processSepia() {
    var r = [0, 0, 0, 1, 1, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 17, 18, 19, 19, 20, 21, 22, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 39, 40, 41, 42, 44, 45, 47, 48, 49, 52, 54, 55, 57, 59, 60, 62, 65, 67, 69, 70, 72, 74, 77, 79, 81, 83, 86, 88, 90, 92, 94, 97, 99, 101, 103, 107, 109, 111, 112, 116, 118, 120, 124, 126, 127, 129, 133, 135, 136, 140, 142, 143, 145, 149, 150, 152, 155, 157, 159, 162, 163, 165, 167, 170, 171, 173, 176, 177, 178, 180, 183, 184, 185, 188, 189, 190, 192, 194, 195, 196, 198, 200, 201, 202, 203, 204, 206, 207, 208, 209, 211, 212, 213, 214, 215, 216, 218, 219, 219, 220, 221, 222, 223, 224, 225, 226, 227, 227, 228, 229, 229, 230, 231, 232, 232, 233, 234, 234, 235, 236, 236, 237, 238, 238, 239, 239, 240, 241, 241, 242, 242, 243, 244, 244, 245, 245, 245, 246, 247, 247, 248, 248, 249, 249, 249, 250, 251, 251, 252, 252, 252, 253, 254, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255];
    var g = [0, 0, 1, 2, 2, 3, 5, 5, 6, 7, 8, 8, 10, 11, 11, 12, 13, 15, 15, 16, 17, 18, 18, 19, 21, 22, 22, 23, 24, 26, 26, 27, 28, 29, 31, 31, 32, 33, 34, 35, 35, 37, 38, 39, 40, 41, 43, 44, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 56, 57, 58, 59, 60, 61, 63, 64, 65, 66, 67, 68, 69, 71, 72, 73, 74, 75, 76, 77, 79, 80, 81, 83, 84, 85, 86, 88, 89, 90, 92, 93, 94, 95, 96, 97, 100, 101, 102, 103, 105, 106, 107, 108, 109, 111, 113, 114, 115, 117, 118, 119, 120, 122, 123, 124, 126, 127, 128, 129, 131, 132, 133, 135, 136, 137, 138, 140, 141, 142, 144, 145, 146, 148, 149, 150, 151, 153, 154, 155, 157, 158, 159, 160, 162, 163, 164, 166, 167, 168, 169, 171, 172, 173, 174, 175, 176, 177, 178, 179, 181, 182, 183, 184, 186, 186, 187, 188, 189, 190, 192, 193, 194, 195, 195, 196, 197, 199, 200, 201, 202, 202, 203, 204, 205, 206, 207, 208, 208, 209, 210, 211, 212, 213, 214, 214, 215, 216, 217, 218, 219, 219, 220, 221, 222, 223, 223, 224, 225, 226, 226, 227, 228, 228, 229, 230, 231, 232, 232, 232, 233, 234, 235, 235, 236, 236, 237, 238, 238, 239, 239, 240, 240, 241, 242, 242, 242, 243, 244, 245, 245, 246, 246, 247, 247, 248, 249, 249, 249, 250, 251, 251, 252, 252, 252, 253, 254, 255];
    var b = [53, 53, 53, 54, 54, 54, 55, 55, 55, 56, 57, 57, 57, 58, 58, 58, 59, 59, 59, 60, 61, 61, 61, 62, 62, 63, 63, 63, 64, 65, 65, 65, 66, 66, 67, 67, 67, 68, 69, 69, 69, 70, 70, 71, 71, 72, 73, 73, 73, 74, 74, 75, 75, 76, 77, 77, 78, 78, 79, 79, 80, 81, 81, 82, 82, 83, 83, 84, 85, 85, 86, 86, 87, 87, 88, 89, 89, 90, 90, 91, 91, 93, 93, 94, 94, 95, 95, 96, 97, 98, 98, 99, 99, 100, 101, 102, 102, 103, 104, 105, 105, 106, 106, 107, 108, 109, 109, 110, 111, 111, 112, 113, 114, 114, 115, 116, 117, 117, 118, 119, 119, 121, 121, 122, 122, 123, 124, 125, 126, 126, 127, 128, 129, 129, 130, 131, 132, 132, 133, 134, 134, 135, 136, 137, 137, 138, 139, 140, 140, 141, 142, 142, 143, 144, 145, 145, 146, 146, 148, 148, 149, 149, 150, 151, 152, 152, 153, 153, 154, 155, 156, 156, 157, 157, 158, 159, 160, 160, 161, 161, 162, 162, 163, 164, 164, 165, 165, 166, 166, 167, 168, 168, 169, 169, 170, 170, 171, 172, 172, 173, 173, 174, 174, 175, 176, 176, 177, 177, 177, 178, 178, 179, 180, 180, 181, 181, 181, 182, 182, 183, 184, 184, 184, 185, 185, 186, 186, 186, 187, 188, 188, 188, 189, 189, 189, 190, 190, 191, 191, 192, 192, 193, 193, 193, 194, 194, 194, 195, 196, 196, 196, 197, 197, 197, 198, 199];
    var noise = 20;
    var imageData = ctx1.getImageData(0,0,canvas1.width,canvas1.height);
    for (var i=0; i < imageData.data.length; i+=4) {
        imageData.data[i] = r[imageData.data[i]];
        imageData.data[i+1] = g[imageData.data[i+1]];
        imageData.data[i+2] = b[imageData.data[i+2]];
        if (noise > 0) {
            var noise = Math.round(noise - Math.random() * noise);
            for(var j=0; j<3; j++){
                var iPN = noise + imageData.data[i+j];
                imageData.data[i+j] = (iPN > 255) ? 255 : iPN;
            }
        }
    }
    ctx1.putImageData(imageData, 0, 0);
}


function brightes(value) {
    var imgData = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var pixels  = imgData.data;
    for (var i = 0, n = pixels.length; i < n; i += 4) {
        pixels[i] += value;        // red
        pixels[i+1] += value;        // green
        pixels[i+2] += value;        // blue
    }
    ctx1.putImageData(imgData, 0, 0);
}

function contrastImage(contrast){
    var imgData = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var d  = imgData.data;
    contrast = (contrast/100) + 1;
    var intercept = 128 * (1 - contrast);
    for(var i=0;i<d.length;i+=4){
        d[i] = d[i]*contrast + intercept;
        d[i+1] = d[i+1]*contrast + intercept;
        d[i+2] = d[i+2]*contrast + intercept;
    }
    ctx1.putImageData(imgData, 0, 0);
}

function Saturation(value){
    ctx1.filter = "saturate("+value+")";
    ctx1.drawImage(ctx1.canvas,0,0);
}

$(document).on('input change', '#customRange1', function() {
    var value = ($(this).val());
    if(value>0){
        resetBgnd();
        brightes(Math.abs(value));
    }
    else if (value<0){
        resetBgnd();
        brightes(0-Math.abs(value));
    }
    copy2 = copyFun();
});

$(document).on('input change', '#customRange2', function() {
    var value = ($(this).val());
    console.log(value);
    if(value>0){
        resetBright();
        contrastImage(Math.abs(value));
    }
    else if (value<0){
        resetBright();
        contrastImage(0-Math.abs(value));
    }
    copy3 = copyFun();
});

$(document).on('input change', '#customRange3', function() {
    var value = ($(this).val());
    resetSaturate();
    Saturation(value);
});

function resetBgnd() {
    ctx1.putImageData(copy, 0, 0);
}

function resetBright() {
    if(copy2 == null)
    {
        resetBgnd()
    }
    else
    {
        ctx1.putImageData(copy2, 0, 0);
    }
}

function resetSaturate(){
    if (copy3 == null) {
        resetBright();
    }
    else{
        ctx1.putImageData(copy3, 0, 0);
    }
}

function text() {
    var c = document.getElementById("imageDraw");
    var ctx = c.getContext("2d");
    var rozmiar = document.getElementById("customRange4").value;
    var kolor = document.getElementById("txtcolor").value;
    ctx.font = "bold "+rozmiar+"px Arial";
    ctx.fillStyle = kolor;
    ctx.fillText($('#imgTxt').val(), document.getElementById("txtX").value, document.getElementById("txtY").value);
}

function heartDraw(x, y) {
    var c = document.getElementById("imageDraw");
    var ctx = c.getContext("2d");
    ctx.lineWidth = 2;

    drawBezierCurve(x, y, x, y - 30, x - 50, y - 30, x - 50, y, "#C0392B");
    drawBezierCurve(x - 50, y, x - 50, y + 30, x, y + 35, x, y + 60, "#C0392B");
    drawBezierCurve(x, y + 60, x, y + 35, x + 50, y + 30, x + 50, y, "#C0392B");
    drawBezierCurve(x + 50, y, x + 50, y - 30, x, y - 30, x, y, "#C0392B");


    function drawBezierCurve(x0, y0, x1, y1, x2, y2, x3, y3, color) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    function fillShape(fillStyle, strokeStyle) {
        if (fillStyle) {
            ctx.fillStyle = fillStyle;
            ctx.fill();
        }
        if (strokeStyle) {
            ctx.strokeStyle = strokeStyle;
            ctx.stroke();
        }
    }

}

function heart() {
    var ilosc = document.getElementById("customRange5").value;
    for(var i = 0 ; i<ilosc; i++)
    {
        heartDraw(Math.floor(Math.random() * Math.max(canvas1.width, canvas1.height)), Math.floor(Math.random() * Math.max(canvas1.width, canvas1.height)));
    }
}

function resetAdd() {
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