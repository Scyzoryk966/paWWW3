var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var canvas1 = document.getElementById('imageCanvas');
var ctx1 = canvas1.getContext('2d');
var canvas2 = document.getElementById('imageDraw');
var ctx2 = canvas2.getContext('2d');

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
        $('.canvLayer').css('height', canvas1.height);
        $('.afterUpload').show(1000);
    };
    reader.readAsDataURL(e.target.files[0]);
}

function narysuj() {  // rysuje kółeczko, trzeba wymyślić jak to anulować...
    var c = document.getElementById("imageDraw");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();
}

function resetOrg() {
    var c = document.getElementById("imageDraw");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, canvas2.width, canvas2.height);
}

function downloadCanvas(){      // get canvas data
    var canvas = document.getElementById( 'imageCanvas' );
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