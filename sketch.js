// Variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 25;
let raio = diametro / 2 ;

// Variaveis da Raquete

let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// Variaveis do Oponente

let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

let colidiu = false;

// Velocidade da Bolinha
  let VelocidadexBolinha = 5;
  let VelocidadeyBolinha = 5;

// placar do jogo
let meusPontos = 0;
let pontosdoOponente = 0;

// sons do jogo

let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentacaoBolinha();  
  verificacaoColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaminhaRaquete();
  //verificaColisaocomRaquete();
  //colisaoMinhaRaqueteBiblioteca();
  movimentaRaqueteOponente();
  //colisaoOponenteRaqueteBiblioteca();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  centralizaBolinha();
}

function mostraBolinha( ){
  circle(xBolinha, yBolinha, diametro)
}

  function movimentacaoBolinha(){
  xBolinha += VelocidadexBolinha;
  yBolinha += VelocidadeyBolinha;
  }

function verificacaoColisaoBorda() 
{if (xBolinha + raio> width ||
    xBolinha - raio <0) {
   VelocidadexBolinha *= -1;
 }
   if (yBolinha + raio > height ||
      yBolinha - raio < 0) {
     VelocidadeyBolinha *= -1;
   }}

function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura)
  
}

// Forma mais rustica
// function mostraRaqueteOponente(){
//  rect(xRaqueteOponente, yRaqueteOponente, //raqueteComprimento, raqueteAltura)
                        

function movimentaminhaRaquete(){
 if (keyIsDown(UP_ARROW))
    yRaquete -= 10;

  if(keyIsDown(DOWN_ARROW))
    yRaquete += 10;
}

function verificaColisaocomRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    VelocidadexBolinha *= -1;
    raquetada.play();
  }
  
}

function verificaColisaoRaquete(x, y){
  colidiu =
 collideRectCircle(x,y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {VelocidadexBolinha *= -1
                raquetada.play();
               }

}

function movimentaRaqueteOponente(){
//   if (keyIsDown(87))
//    yRaqueteOponente -= 10;

//  if(keyIsDown(83))
//    yRaqueteOponente += 10;
 
  
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 80;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
  
}

function calculaChanceDeErrar() {
  if (pontosdoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255)
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosdoOponente, 470, 26)
  
}

function marcaPonto(){
  if (xBolinha > 585){
    meusPontos +=1;
    ponto.play();
  }
  if (xBolinha < 15){
    pontosdoOponente +=1
    ponto.play();
  }
  
}

function centralizaBolinha(){
  if (xBolinha > 586){
    xBolinha = 300;
  }
  if (xBolinha < 14 ){
    xBolinha = 300;
  }  
}



