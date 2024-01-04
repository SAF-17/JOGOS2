let playerField = [];
let enemyField = [];
let selectedCard = null;
let card = {
  "name": "x",
  "ATK":1,
  "DEF":1,
};

let campo=0;

function mousePressed() {
handleFieldClick(playerField, mouseX, mouseY, "player");
handleFieldClick(enemyField, mouseX, mouseY, "enemy");
  if(scene===3){
  // Check if Buy Single Card button is pressed
  if (
    mouseX > width / 4 - cardPurchaseAreaWidth / 2 + 20 &&
    mouseX < width / 4 - cardPurchaseAreaWidth / 2 + 20 + cardPurchaseAreaWidth - 40 &&
    mouseY > height / 2 + (height / 3) - 40 &&
    mouseY < height / 2 + (height / 3)
  ) {
    buySingleCard();
    loop();
  }

  // Check if Buy Pack of Three Cards button is pressed
  if (
    mouseX > (3 * width) / 4 - cardPurchaseAreaWidth / 2 + 20 &&
    mouseX < (3 * width) / 4 - cardPurchaseAreaWidth / 2 + 20 + cardPurchaseAreaWidth - 40 &&
    mouseY > height / 2 + (height / 3) - 40 &&
    mouseY < height / 2 + (height / 3)
  ) {
    buyPackOfThreeCards();
    loop();
  }}
}

function drawFields() {
drawField(playerField, color(0, 0, 255)); // Azul para o campo do jogador
drawField(enemyField, color(255, 0, 0)); // Vermelho para o campo do inimigo
}

function createFields() {
let tileWidth = width * 0.10;
let tileHeight = height * 0.15;
let rows = 3;
let cols = 6;

createField(playerField, rows, cols, tileWidth, tileHeight, width * 0.33, height * 0.51, true,campo=1,id_carta=2);
createField(enemyField, rows, cols, tileWidth, tileHeight, width * 0.33, height * 0.03, true,campo=3,id_carta=1);
}

function createField(field, rows, cols, tileWidth, tileHeight, initialX, initialY, hasInitialCard,campo) {
 
  for (let i = 0; i < rows; i++) {
  field[i] = [];
  for (let j = 0; j < cols; j++) {
    field[i][j] = new Tile(
      initialX + j * tileWidth,
      initialY + i * tileHeight,
      i,
      j,
      tileWidth,
      tileHeight,
      hasInitialCard && i  === rows -campo, // Adiciona uma carta apenas à última linha da matriz
      campo_teste = campo,
      //hasInitialCard && i === 0 // Check for the first row
    );
   
  } 
}
}

function drawField(field, cellColor) {
for (let i = 0; i < field.length; i++) {
  for (let j = 0; j < field[i].length; j++) {
    field[i][j].draw_Tile(cellColor);
  }
}
}
function handleFieldClick(field, x, y, fieldType) {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j].click_Tile(x, y)) {
        console.log("Clicked on", fieldType, "field at:", i, j);
        if (field[i][j].hasCard && selectedCard === null) {
          // Se a tile de origem tem uma carta e nenhuma carta está selecionada, apenas a seleciona
          selectedCard = { row: i, col: j, campo_teste: field[i][j].campo_teste };
          console.log("Selected card at:", i, j);
        } else if (selectedCard !== null) {
          // Se uma carta já está selecionada, move a carta para a nova posição
          if (i !== selectedCard.row || j !== selectedCard.col) {
            // Verifica se a carta está sendo movida para uma posição diferente da posição inicial
            

            if (field[i][j].campo_teste !== selectedCard.campo_teste) {// Verificação de ataque
              if(field[i][j].hasCard===false){// Se o campo selecionado não tivar carta do adversário

                console.log("Acerta numa carta")
              }else if(field[i][j].hasCard===true){//Se o campo onde selecionar tiver carta

                console.log("ATTACK TIME")
                
                //getCards();
                attackTIME();
              }
            }else if (field[i][j].campo_teste === selectedCard.campo_teste) {
              // Verifica se a origem e o destino estão no mesmo campo
              field[i][j].hasCard = true;
              field[selectedCard.row][selectedCard.col].hasCard = false;
              console.log("Moved card to:", i, j);
            
            }else {
              console.log("Card cannot move across fields.");
            }
          } else {
            console.log("Card stayed in the same position:", i, j);
          }
          selectedCard = null; // Limpa a carta selecionada
          // getCards()
          loop();
        }
      }
    }
  }
}


let cartas_user;

function getCards(){
  loadJSON('/getCartas_USER/'+userServidor[0].id,(resposta)=>{

    cartas_user=resposta;

    if (cartas_user) {
      // Ciclo para percorrer o array cartas_user e armazenar cada valor
      for (let i = 0; i < cartas_user.length; i++) {
        let valor_id_Carta = cartas_user[i].id_carta; 
        let valor_att_Carta = cartas_user[i].attack_carta;
        console.log()
    
        // Faça algo com o valor, por exemplo, armazená-lo em outra variável ou realizar uma ação específica
        console.log('Valor da Carta:', valor_id_Carta);
        console.log('Atttack:', valor_att_Carta  );
      }
    } else {
      console.log('Cartas do usuário não carregadas. Certifique-se de chamar getCards antes de attackTIME.');
    }
    

 });
 
}

function attackTIME() {
  
  

  loadJSON('/getCartas_STATS/'+id_carta,(resposta)=>{

    cartas_stats=resposta;

    if (cartas_stats) {
      // Ciclo para percorrer o array cartas_user e armazenar cada valor
      for (let i = 0; i < cartas_stats.length; i++) {
        let valor_id_Carta = cartas_stats[i].id_carta; 
        let nome_carta = cartas_stats[i].nome_carta;
        let valor_att_Carta = cartas_stats[i].attack_carta;
        let valor_def_Carta = cartas_stats[i].defend_carta
        console.log()
    
        // Faça algo com o valor, por exemplo, armazená-lo em outra variável ou realizar uma ação específica
        console.log('Nome carta:', nome_carta);
        console.log('Attack:', valor_att_Carta);
        console.log('Defesa:', valor_def_Carta);
       
      }
    } else {
      console.log('Stats de defesa e ataque nao carregadas. Certifique-se de chamar getCards antes de attackTIME.');
    }

 });


// Verifica se cartas_user foi carregado

}

  // loadJSON('/getCartas_USER/'+userServidor[0].id,(resposta)=>{

  //   cartas_user=resposta;

    // console.log(cartas_user);
    // loop();

 //});


  // // Get the attack and defense values of each card
  // loadJSON('/getCartas', (dataDoServidor) => {
  //    cardList.forEach((card) => {
  //      // Find the card in the server data by id
  //      const serverCard = dataDoServidor.find((cardData) => cardData.id === card.id);
 
  //      if (serverCard) {
  //        // Update the attack and defense values of the card
  //        card.ATK = serverCard.attack_carta;
  //        card.DEF = serverCard.defend_carta;
  //      }
  //    });
 
  //    // Loop through all the cards
  //    for (let i = 0; i < cardList.length; i++) {
  //      for (let j = i + 1; j < cardList.length; j++) {
  //        // Compare the attack and defense values of each card
  //        if (cardList[i].ATK > cardList[j].ATK && cardList[i].DEF > cardList[j].DEF) {
  //          // Update the card data on the server side
  //          // Use a different API endpoint for this purpose
  //        }
  //      }
  //    }
  // });
 



class Tile {
constructor(x, y, tx, ty, w, h, hasCard,campo_teste,id_card) {
  this.x = x;
  this.y = y;
  this.tx = tx; //pos atual x
  this.ty = ty; //pos atual x
  this.w = w; // Largura do retângulo
  this.h = h; // Altura do retângulo
  this.img_costas = imagem_carta_costas;
  this.img_frente = imagem_carta_frente;
  this.hasCard = hasCard;
  this.campo_teste= campo_teste;// 1-azul , 3- vermelho
  this.id_card= id_card;
}

draw_Tile(cellColor) {
  fill(cellColor); // Use a cor passada como argumento
  rect(this.x, this.y, this.w, this.h);
  if (this.hasCard) {//cria carta
    if(this.tx == 2 && this.campo_teste== 1 || this.tx == 0 && this.campo_teste== 3 ){
    image(this.img_costas,this.x + this.w / 4, this.y + this.h / 4, this.w / 2, this.h /2);
    }else {
      image(this.img_frente,this.x + this.w / 4, this.y + this.h / 4, this.w / 2, this.h /2);
    }
    
  }
}

click_Tile(x, y) {
  if (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h) {
    return true;
  } else {
    return false;
  }
}
}

function getCartas(){

loadJSON('/getCartas',(dataDoServidor)=>{

  card.name=dataDoServidor[0].nome_carta;
  card.ATK=dataDoServidor[0].attack_carta;
  card.DEF=dataDoServidor[0].defend_carta;

  // console.log(dataDoServidor);
  // loop();
});}
