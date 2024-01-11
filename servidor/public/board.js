let playerField = [];
let enemyField = [];
let selectedCard = null;
let card = {
  "name": "x",
  "ATK":1,
  "DEF":1,
};
let PlayerCatalog=[];
let campo=0;
let numberOfCards=10;

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
PlayerHand();
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
          // if (i !== selectedCard.row || j !== selectedCard.col && field[i][j].campo_teste !== selectedCard.campo_teste ) {
          // L-> PARA VERIFICAR SE ESTÁ A ATACAR O CAMPO ENIMIGO(NÃO DEIXA ANDAR NA HORIZONTAL)

            if (i !== selectedCard.row || j !== selectedCard.col && field[i][j].campo_teste !== selectedCard.campo_teste ) {
            // Verifica se a carta está sendo movida para uma posição diferente da posição inicial
             if (field[i][j].campo_teste === selectedCard.campo_teste) {
              // Verifica se a origem e o destino estão no mesmo campo
              field[i][j].hasCard = true;
              field[selectedCard.row][selectedCard.col].hasCard = false;
              console.log("Moved card to:", i, j);
            } else {
              console.log("Card cannot move across fields.");
            }
          }if (field[i][j].campo_teste !== selectedCard.campo_teste && field[i][j].campo_teste !== selectedCard.campo_teste && field[i][j].hasCard === true){
            console.log("Attack TIME")
            console.log(selectedCard)

          }else {
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
  this.id_carta_campo=id_carta;
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

function PlayerHand(){
  loadJSON(`/getCartasAttributes_by_User/${userServidor.id}`, (data) => {
    if (data && data.length > 0) {
      // Armazena os dados das cartas na variável global
      cartasData = data;
      console.log(cartasData)
      
    } else {
      // Caso o usuário não tenha cartas, exiba uma mensagem
      textSize(18);
      fill(255);
      textAlign(LEFT, TOP);
      text('Nenhuma carta disponível.', 50, 50);
    }
  });
};

