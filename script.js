menu=document.querySelector("ul");
desfoco=document.querySelector(".blur");
menu.style.transition="200ms linear"
capa=document.querySelector(".input")
input=document.querySelector("#foto")
const image = document.createElement('img');
var path="";

function toggler() {
    menu.classList.toggle("opened")
    desfoco.classList.toggle("desfocar")
    
}

const colorThief = new ColorThief();

    // Carrega a imagem
    
    image.crossOrigin = 'Anonymous'; // Permite carregar imagens de outros domínios
    image.src = "img/logo.png";

    input.addEventListener("change",(e)=>{
    
    elemento =document.getElementById("colors-container")
     elemento.style.display="flex"
     
    var existe=document.querySelectorAll(".color-box")
    existe.forEach(function (e) {
      e.remove()  
    })
   existe =null
  path=URL.createObjectURL(e.target.files[0])
   capa.style.backgroundImage="url("+path+")"
   image.src=path
   
   img=document.querySelector(".iconCamera")
   img.style.display="none"
}) 
    image.onload = function() {
    
      // Extrai a cor dominante da imagem
      const dominantColor = colorThief.getColor(image);

      // Extrai a paleta de cores da imagem
      const colorPalette = colorThief.getPalette(image);

      // Exibe as cores dominantes
      exibirCor('Cor dominante', dominantColor);

      // Exibe a paleta de cores
      colorPalette.forEach(function(color, index) {
        exibirCor('Cor ' + (index + 1), color);
      });
         };
    // Função para exibir uma cor na tela
    function exibirCor(nome, cor) {
      const colorBox = document.createElement('div');
      colorBox.style.backgroundColor = 'rgb(' + cor[0] + ', ' + cor[1] + ', ' + cor[2] + ')';
      colorBox.className = 'color-box';

      const colorLabel = document.createElement('p');
      function verificarCor(hex) {
  // Extrai os valores RGB da cor hexadecimal
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  // Calcula o brilho da cor
  var brilho = (r * 299 + g * 587 + b * 114) / 1000;
  // Define a cor do texto com base no brilho da cor de fundo
  if (brilho >= 128) { return true; } else { return false; }}
   const colorCode = document.createElement('p');
      colorCode.textContent = 'Hex: ' + rgbToHex(cor[0], cor[1], cor[2]);
var resultado =verificarCor(rgbToHex(cor[0], cor[1], cor[2]))
 if (resultado) {
     colorCode.style.color="black"
 }else{
     colorCode.style.color="white"
 } 
  const colorsContainer = document.getElementById('colors-container');
      colorsContainer.appendChild(colorBox);
      colorBox.appendChild(colorLabel);
      colorBox.appendChild(colorCode);
      colorBox.addEventListener("click",()=>{
     var input =document.createElement('input')
     input.style.display="block";
     document.body.appendChild(input)
     input.value=rgbToHex(cor[0], cor[1], cor[2])
      input.select()  
      document.execCommand('copy')
      input.remove()
        
        
      }) }
 
    function rgbToHex(r, g, b) {
      return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    // Função auxiliar para converter um componente de cor em hexadecimal
    function componentToHex(c) {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }
 btn=document.getElementById("limpar")
 btn.addEventListener("click",()=>{
     elemento =document.getElementById("colors-container")
     elemento.style.display="none"
     
 })
 var viewColor=document.getElementById("viewColor")
var r = document.getElementById('r');
 var g = document.getElementById('g');
 var b = document.getElementById('b');
function update() {
   var red=r.value
   var green =g.value 
   var blue=b.value 
var rgbColor = 'rgb(' + red + ', ' + green + ', ' + blue + ')';

    viewColor.style.backgroundColor=rgbColor
    rgb=document.getElementById('rgb')
   
    rgb.textContent=rgbColor
}
r.addEventListener("input", update )
g.addEventListener("input", update )
b.addEventListener("input", update )

/*câmera*/
const btnImage=document.querySelector(".iconCamera")

function live() {
    video=document.getElementById("video")
        sacar=document.getElementById("saca")
        ctx=canvas.getContext('2d')
        sacar.addEventListener("click",()=>{
        
     canvas.width=150
     canvas.height=200
     ctx.drawImage(video,0,0,canvas.width,canvas.height)
     const url=canvas.toDataURL('image/png');
     capa.style.backgroundImage="url("+url+")"
     const ct=new ColorThief();
     image.src=url
     image.onload=function () {
         const cores=ct.getPalette(image)
         elemento =document.getElementById("colors-container")
     elemento.style.display="flex"
     
     var existe=document.querySelectorAll(".color-box")
    existe.forEach(function (e) {
      e.remove()  
    })
     cores.forEach(function(color, index) {
        exibirCor('Cor ' + (index + 1), color);
      });
     }
        })
      navigator.mediaDevices.getUserMedia({video:true}).then((stream)=>{
         video.srcObject=stream
         video.play()
        }). catch((e)=>{
            console.log("erro"+e)
        })
         
           

}
