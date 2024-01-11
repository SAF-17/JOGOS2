

//AUTHENTICATION VARIABLES---
let nameInput;
let passwordInput;
let name2Input;
let password2Input;
let loginBtn;
let registerBTN;
let changeBTN;
let userServidor;
//---------------------------

function login(){
    let name = nameInput.value();
    let password = passwordInput.value();

    let user= {
        "name":name,
        "password":password
    }
    httpPost('/login',user,'json',(respostaServidor)=>{

      if(respostaServidor.length>0){

       userServidor = respostaServidor[0];
          //remover campos login
        removeLogin();
        //mudar cena

       scene=1;
       console.log(userServidor);
       loop();//inicia o loop

       }else{
       alert("Login sem sucesso")    }

      });
}
function removeLogin(){

    //remover campos login
    nameInput.remove();
    passwordInput.remove();
    loginBtn.remove();
      //remover campos registo
    name2Input.remove();
    password2Input.remove();
    registerBTN.remove();
    changeBTN.remove();



}

function getUser(){

    loadJSON('/getUser',(dataDoServidor)=>{
      user.id=dataDoServidor[0].id;
      user.name=dataDoServidor[0].name;


      console.log(dataDoServidor);
    });}

function postUser(){
    let newUser = {
        name: name2Input.value(),
        password: password2Input.value()
      };



    httpPost('/postUser',newUser,'json', (respostaServidor)=>{

        console.log(respostaServidor)
        if(respostaServidor.ack==0){
          name2Input.value('');
          password2Input.value('');
          alert("Utilizador já existe");

          }else{
            name2Input.value('');
            password2Input.value('');
          alert("Registo com Sucesso")

         }
        console.log(newUser)


      });
}

 function login_registro() {
  createCanvas(windowWidth, windowHeight);
  background(backgroundImage);

    let formWidth = 550; // Largura do formulário
    let formHeight = 350; // Altura do formulário
    let formXcenter = width / 2; // Centralize horizontalmente
    let formYcenter = height / 5; // Centralize verticalmente
    let formX = (width - formWidth) / 2; // Centralize o formulário horizontalmente
    let formY = (height - formHeight) / 2; // Centralize o formulário verticalmente
    push();
    imagemLogo.resize(300, 0); // 200 pixels de largura, altura proporcional

    image(imagemLogo, formXcenter - imagemLogo.width / 2, formYcenter - imagemLogo.height / 2 -50 );


    textSize(100);
    fill(255); // Define a cor do preenchimento (fundo) do texto como branco
    stroke(0); // Define a cor do contorno (stroke) do texto como preto
    strokeWeight(7); // Define a largura do contorno

    textAlign(CENTER, CENTER);
    text("Divine Conflicts", formXcenter, formYcenter );

    pop();
    // Desenhe o retângulo cinza claro
    fill("#faf5d4"); // Cor cinza claro
    rect(formX, formY, formWidth, formHeight);



                  // Crie o formulário de login
                textSize(32);
                fill(0);
                text("Login", formX + formWidth/7, formY + 70);
                textSize(16);
                text("Name", formX + formWidth/10, formY + 130);
                nameInput = createInput('');
                nameInput.position(formX + formWidth/10, formY + 150);
                nameInput.size(150);

                text("Password", formX + formWidth/10, formY + 200);
                passwordInput = createInput('','password');
                passwordInput.position(formX + formWidth/10, formY + 220);
                passwordInput.size(150);

                loginBtn = createButton('Login');
                loginBtn.position(formX + formWidth/6, formY + 260);
                loginBtn.style('background-color', '#a87a63');
                loginBtn.style('border', 'none');
                loginBtn.style('padding', '10px 20px');
                loginBtn.mousePressed(login);

                  // Crie o formulário de registro
                textSize(32);
                fill(0);
                text("Register", formX + formWidth/2+formWidth/7, formY + 70);
                textSize(16);
                text("Name", formX + formWidth/2+formWidth/10, formY + 130);
                name2Input = createInput('');
                name2Input.position(formX + formWidth/2+formWidth/10, formY + 150);
                name2Input.size(150);

                text("Password", formX + formWidth/2+formWidth/10, formY + 200);
                password2Input = createInput('','password');
                password2Input.position(formX + formWidth/2+formWidth/10, formY + 220);
                password2Input.size(150);

                registerBTN = createButton('Register');
                registerBTN.position(formX + formWidth/2+formWidth/6, formY + 260);
                registerBTN.style('background-color', '#a87a63');
                registerBTN.style('border', 'none');
                registerBTN.style('padding', '10px 20px');
                registerBTN.mousePressed(postUser);


                //botão troca de form

                changeBTN = createButton('LOGIN/REGISTAR');
                changeBTN.position(formX+formWidth/3  , formHeight*2  );
                changeBTN.style('background-color', '#a87a63');
                changeBTN.style('border', 'none');
                changeBTN.style('padding', '10px 20px');
                changeBTN.mousePressed(esconder_log_reg);

    if(form_scene==true){ //Criar carta no register/ aparecer login

        image(imagem_carta_costas, formX + formWidth / 2, formY, formWidth / 2, formHeight);
        name2Input.remove();
        password2Input.remove();
        registerBTN.remove();



        // Exiba ou crie os elementos de login
        nameInput.show();
        passwordInput.show();
        loginBtn.show();



    }else if(form_scene==false){//Criar carta no login/aparecer register

            image(imagem_carta_costas, formX, formY, formWidth / 2, formHeight);

            nameInput.remove();
            passwordInput.remove();
            loginBtn.remove();

            // Exiba ou crie os elementos de registro
            name2Input.show();
            password2Input.show();
            registerBTN.show();
            }

}


function esconder_log_reg() {
  // Alterna entre as cenas de login e registro
  form_scene = !form_scene;

  // Limpa os campos de input
  nameInput.value('');
  passwordInput.value('');
  name2Input.value('');
  password2Input.value('');

  // Esconde ou mostra os elementos conforme necessário
  if (form_scene) { // Cena de login

    nameInput.show();
    passwordInput.show();
    loginBtn.show();


    name2Input.hide();
    password2Input.hide();
    registerBTN.hide();
  } else { // Cena de registro
    nameInput.hide();
    passwordInput.hide();
    loginBtn.hide();

    name2Input.show();
    password2Input.show();
    registerBTN.show();
  }

  changeBTN.remove();

  // Redesenha a tela
  redraw();

}


