
let botao_menuWidth;
let batalhaBtn;
let centroVertical;
let centroHorizontal;
let distanciaButtonVertical;
let distanciaButtonHorizontal;


function drawMenuIU(){
  centroVertical= width/2;
  centroHorizontal= height/2;
  distanciaButtonVertical= width/10;
  distanciaButtonHorizontal= width/20;
  buttonBatalha();
  buttonLoja();


}

function buttonBatalha(){

                batalhaBtn = createButton('Batalha');
                batalhaBtn.position(centroVertical-distanciaButtonVertical, centroHorizontal- distanciaButtonHorizontal);
                batalhaBtn.style('background-color', '#a87a63');
                batalhaBtn.style('border', 'none');
                batalhaBtn.style('padding', '10px 20px');
                batalhaBtn.mousePressed(batalhaScene);

}
function batalhaScene(){
  scene=2;
  removeMENU();
  loop();
}

function buttonLoja(){

                lojaBtn = createButton('Loja');
                lojaBtn.position(centroVertical+distanciaButtonVertical, centroHorizontal- distanciaButtonHorizontal);
                lojaBtn.style('background-color', '#a87a63');
                lojaBtn.style('border', 'none');
                lojaBtn.style('padding', '10px 20px');
                lojaBtn.mousePressed(LojaScene);


}
function LojaScene(){
scene=3;
removeMENU();
loop();
}

