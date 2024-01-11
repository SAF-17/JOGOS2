let playerMoney;
let cardPurchaseAreaWidth;
let carta;


function drawBuyIU(){
    
    cardPurchaseAreaWidth = width / 7;
    // Top right rectangle with player money
  fill(255);
  rect(width * 0.85, height * 0.01, 200, 35);
  fill(0);
  textSize(18);
  textAlign(RIGHT, CENTER);
  text("Player Money: $" + playerMoney, width - 100, 30);

  drawCardPurchaseArea(width / 4 - cardPurchaseAreaWidth / 2, height / 2, "Buy Single Card");
  drawCardPurchaseArea((3 * width) / 4 - cardPurchaseAreaWidth / 2, height / 2, "Buy Three Cards");
  
}
function drawCardPurchaseArea(x, y, buttonText) {
  // Draw Card Image
  image(imagem_carta_frente, x + 20, y + 20, cardPurchaseAreaWidth - 40, (height / 3) - 60);

  // Buy Card Button
  fill(0, 255, 0); // Green color for the button
  rect(x + 20, y + (height / 3) - 40, cardPurchaseAreaWidth - 40, 40);
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(buttonText, x + cardPurchaseAreaWidth / 2, y + (height / 3) - 20);
}


function buySingleCard() {
  loadJSON(`/getRandomCard`, (data) => {
    if (data && data.length > 0) {
      carta = data;
      console.log(carta);

      // Adiciona a carta ao deck do usuário no backend
      const userId = 1; // Substitua pelo ID do usuário logado
      const idCartaPack = carta.id_carta; // Substitua pelo campo correto na tabela de cartas

      fetch('http://localhost:3000/addCardToDeck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          idCartaPack: idCartaPack,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.ack === 1) {
            console.log(`Carta ${carta.nome_carta} adicionada ao deck com sucesso!`);
          } else {
            console.log('Erro ao adicionar carta ao deck.');
          }
        })
        .catch(error => console.error('Erro ao adicionar carta ao deck:', error));
    } else {
      console.log('Erro ao obter carta aleatória.');
    }

    if (playerMoney >= 10) {
      playerMoney -= 10; // Deduz dinheiro pela compra
      console.log(`Bought a single card: ${carta.nome_carta}`);
    } else {
      console.log('Not enough money to buy a single card.');
    }
  });
}


function buyPackOfThreeCards() {
  // Implement logic for buying a pack of three cards
  if (playerMoney >= 25) {
    playerMoney -= 25; // Deduct money for the purchase
    console.log("Bought a pack of three cards!");
  } else {
    console.log("Not enough money to buy a pack of three cards.");
  }
}