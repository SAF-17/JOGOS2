let playerMoney = 100;
let cardPurchaseAreaWidth;



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
  // Implement logic for buying a single card
  if (playerMoney >= 10) {
    playerMoney -= 10; // Deduct money for the purchase
    console.log("Bought a single card!");
  } else {
    console.log("Not enough money to buy a single card.");
  }
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