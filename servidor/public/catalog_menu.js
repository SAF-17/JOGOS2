let playerMoney = 100;
let cardAreaWidth;

function catalogUI() {

    cardAreaWidth = width / 10;
    textSize(24);
  fill(255);
  textAlign(CENTER, TOP);
  text('Catálogo de Cartas do Usuário', width / 3, 20);

  // Exibe as cartas do usuário
  textSize(18);
  fill(255);
  textAlign(LEFT, TOP);

  if (userServidor && userServidor.cards) {
    for (let i = 0; i < userServidor.cards.length; i++) {
      let card = userServidor.cards[i];
      let yPos = 50 + i * 30;
      text(`- ${card.nome}: ${card.descricao}`, 50, yPos);
      // Adapte conforme necessário para exibir outras informações da carta
    }
  } else {
    text('Nenhuma carta disponível.', 50, 50);
  }
}

