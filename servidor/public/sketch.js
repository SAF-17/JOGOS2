let img;
let user = {
    "name":"",
    "password":""
};

let backgroundImage;
let backgroundImage2;
let scene=0;
let form_scene=true;
let executedOnce = false;

let imagem_carta_frente;
let imagem_carta_costas;

function preload(){

  backgroundImage = loadImage('/img/background.png');
  backgroundImage2 = loadImage('/img/background2.png');
  imagemLogo = loadImage('/img/Logo.png');
  imagem_carta_costas = loadImage('/img/Verso.png');
  Afrodite = loadImage('/img/Afrodite.png');   
  Thor = loadImage('/img/Thor.png');   
  Susanoo = loadImage('/img/Susanoo.png');   
  Ra = loadImage('/img/Ra.png');   
  Tsukuyomi = loadImage('/img/Tsukuyomi.png');   
  Poseidon = loadImage('/img/Poseidon.png');   
  Odin = loadImage('/img/Odin.png');      
  Ares = loadImage('/img/Ares.png'); 
  Anubis = loadImage('/img/Anubis.png'); 
  Amaterasu = loadImage('/img/Amaterasu.png');

   
    }

  // getUser() Apresenta os utilizadores criados na consola
  

    function setup() {
      createCanvas(windowWidth, windowHeight);


    }


function draw(){

  if(scene==0){


    login_registro();

  }else if(scene==1){
    menuScene();

  }else if(scene==2){
  if (!executedOnce) {
        // Executa a ação apenas uma vez quando scene é igual a 2
        createFields();
        executedOnce = true;
      }gameScene();

  }else if(scene==3){

    buyMenuScene();
  }else if(scene==4){
    CatalogScene();

  }

  noLoop()//apenas deixa o draw correr 1 vez
}

function removeMENU(){
  lojaBtn.remove();
    batalhaBtn.remove();
}


function gameScene(){
  background(backgroundImage);
  drawFields();
}

function menuScene(){
  background(backgroundImage2);
  drawMenuIU();
}
function  buyMenuScene(){
  background(backgroundImage2);
  drawBuyIU();
}
function  CatalogScene(){
  background(backgroundImage);
  catalogIU();
}

