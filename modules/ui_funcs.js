function previewimage(param){
    var reader = new FileReader()
    reader.onload = function (e){
        document.getElementById("presseausweis-input-bild").setAttribute("src",e.target.result)
        document.getElementById("presseausweis-input-bild").style.display="block"
    }
    reader.readAsDataURL(param.files[0]);
  }
  function setImage(){
    var image = document.getElementById("preview")
    canvas.width = image.width
    canvas.height = image.height
    
    context.drawImage(image,0,0,image.width,image.height)
    document.getElementById("preview").style.display = "none"
}
