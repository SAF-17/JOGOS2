let img;
let user = {
    "name":"",
    "password":""
};

let backgroundImage;
let backgroundImage2;
let imagemLogo;
let scene=0;
let form_scene=true;
let executedOnce = false;

let imagem_carta_frente;
let imagem_carta_costas;

function preload(){ 
  backgroundImage = loadImage('https://cdn.discordapp.com/attachments/955519593160540230/1173660207394586634/1699892790487_.png?ex=6564c33e&is=65524e3e&hm=f4d5b17bff894f86b52f332cacf86b81f5d64d31246ad05991b6e433a6449724&');
  backgroundImage2 = loadImage('https://cdn.discordapp.com/attachments/955519593160540230/1173655327284134098/OIG.png?ex=656df933&is=655b8433&hm=b26c2e3045184843cf6f1c68e2b4d24eeb261ddcfa9a1a5d1582f19343c6e517&');
  imagemLogo = loadImage('https://cdn.discordapp.com/attachments/955519593160540230/1173697054430744597/Untitled-2.png?ex=6564e590&is=65527090&hm=9a5534344450309afb83cea86ed8d7de6dc6f3493ab074871203612329904bfe&');
  //imagem_carta = loadImage('https://media.discordapp.net/attachments/955519593160540230/1174034067537272982/711eda25308c65a7756751088866e181.jpg?ex=65661f6e&is=6553aa6e&hm=071145e645cf5706dd8612decd8e077e2f7c20ca77509f6bc03aa6912fe774a6&=&width=253&height=369');
  //imagem_frente = loadImage('https://media.discordapp.net/attachments/955519593160540230/1173684520726302730/OIG.png?ex=656e1463&is=655b9f63&hm=1a7dd8d351c040f852e1b5c7189b5a269c0d19c6324d179a39937e3d85be2981&=&format=webp&width=369&height=369');
  imagem_carta_frente = loadImage('/getImagem_carta_frente', () => {
    console.log('Image loaded successfully');
}, (error) => {
    console.error('Error loading image:', error);
});
  imagem_carta_costas = loadImage('/getImagem_carta_costas', () => {
    console.log('Image loaded successfully');
}, (error) => {
    console.error('Error loading image:', error);
});
  
  // getUser() Apresenta os utilizadores criados na consola
    }

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

