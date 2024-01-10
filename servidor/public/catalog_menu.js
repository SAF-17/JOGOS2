let cardAreaWidth;
let cartasData;
const cardsPerRow = 5; // Número de cartas por linha
const cardWidth = 150; // Largura de cada carta
const cardHeight = 180; // Altura de cada carta
let imagens = []; // Array para armazenar as imagens
let hoverIndex = -1; // Índice da carta sobre a qual o mouse está passando

function catalogIU() {
  buttonLoja();

  cardAreaWidth = width / 10;
  textSize(24);
  fill(0);
  textAlign(CENTER, TOP);
  text('Catálogo de Cartas do Utilizador', width / 3, 20);
  text(`Nome Utilizador: ${userServidor.nome}`, width - 300, 20);

  // Obtém as cartas e seus atributos do servidor
  loadJSON(`/getCartasAttributes_by_User/${userServidor.id}`, (data) => {
    if (data && data.length > 0) {
      // Armazena os dados das cartas na variável global
      cartasData = data;

      // Exibe as cartas e seus atributos
      for (let i = 0; i < cartasData.length; i++) {
        let carta = cartasData[i];

        // Coordenadas e tamanho do quadrado da carta
        const row = floor(i / cardsPerRow);
        const col = i % cardsPerRow;
        const x = 50 + col * (cardWidth + 20);
        const y = 50 + row * (cardHeight + 20);

        // Desenha quadrado da carta
        fill(200);
        rect(x, y, cardWidth, cardHeight);

        // Carrega a imagem dinamicamente durante o loop
        loadImage(`/img/${carta.nome_carta}.png`, (img) => {
          // Exibe a imagem da carta
          image(img, x, y, cardWidth, cardHeight);
        });

        // Verifica se o mouse está sobre a carta
        if (mouseOverCard(x, y, cardWidth, cardHeight)) {
          hoverIndex = i;
        }
      }

      // Exibe as informações da carta sobreposta à imagem
      if (hoverIndex !== -1) {
        displayCardDetails(cartasData[hoverIndex]);
      }
    } else {
      // Caso o usuário não tenha cartas, exiba uma mensagem
      textSize(18);
      fill(255);
      textAlign(LEFT, TOP);
      text('Nenhuma carta disponível.', 50, 50);
    }
  });
}

// Função para exibir os detalhes da carta sobreposta à imagem
function displayCardDetails(carta) {
  textSize(12);
  textAlign(LEFT, TOP);
  fill(200); // Cor de fundo para destacar as informações
  rect(50, 50, cardWidth * cardsPerRow + 20 * (cardsPerRow - 1), cardHeight + 20);

  fill(0); // Cor do texto
  text(`Nome: ${carta.nome_carta}`, 50, 50);
  text(`Attack: ${carta.attack_carta}`, 50, 70);
  text(`Defesa: ${carta.defend_carta}`, 50, 90);
  // Adapte conforme necessário para exibir outras informações da carta
}

// Função para verificar se o mouse está sobre uma carta
function mouseOverCard(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}
