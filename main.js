let O = x => {
  return new OmegaNum(x); // Ignore
};

function Game() {
  this.pts = "0";
  this.layers = ["0"];
  this.clayer = 0;
}

var game = new Game();
var date = Date.now();
var pps;
var pending;
var diff;

function notate(x){
  if(O(x).lt("e12")){
    return O(x).floor().toNumber().toLocaleString();
  } else {
    return O(x).div(O(10).pow(O(x).log10().floor())).toNumber().toFixed(3) + "e" + O(x).log10().floor().toNumber().toLocaleString();
  }
} // Converts numbers to make them readable.

function calcPending(x){
  if(x == 0){
    return O(game.pts).div(10).sqrt().floor().toString();
  } else {
    return O(game.layers[x-1]).div(10).sqrt().floor().toString();
  }
} // Calculates pending Prestige points for a given layer.

function updateVars(){
  diff = (Date.now() - date)/1000; // Calculates difference between two ticks to generate income.
  pps = 1;
  for(var i = 0; i < game.layers.length; i++){
    pps = O(pps).mul(O(game.layers[i]).mul(O(2).pow(i)).add(1)).toString();
  } // Calculates points per second.
  pending = calcPending(game.clayer); // Sets pending Prestige points to the layer you're currently on.
  if(O(game.layers[game.layers.length-1]).gt(0)){
    game.layers.push("0");
  } // Adds a new layer when the last one has been reached.
  if(game.upgs == undefined && O(game.layers[0]).gte("e6")){
    game.upgs = -1;
  }
  game.pts = O(game.pts).add(O(diff).mul(pps)).toString(); // Increases points each tick.
  date = Date.now();
} // Updates many variables each tick.

function prestige(){
  if(O(pending).gt(0)){
    game.pts = "0";
    for(var i = 0; i < game.clayer; i++){
      game.layers[i] = "0";
    }
    game.layers[game.clayer] = O(game.layers[game.clayer]).add(pending).toString();
  }
} // Prestiges the layer you're currently on for the appropriate amount of points.

function back(){
  if(game.clayer > 0){
    game.clayer--;
  }
} // Goes back a layer.

function forward(){
  if(game.clayer+1 < game.layers.length){
    game.clayer++;
  }
} // Goes forward a layer.

function updateHTML(){
  document.getElementById("layer").textContent = game.clayer+1;
  document.getElementById("pts").textContent = notate(game.pts);
  document.getElementById("pps").textContent = notate(pps);
  document.getElementById("ppts").textContent = notate(game.layers[game.clayer]);
  document.getElementById("ppsmul").textContent = "×" + notate(O(game.layers[game.clayer]).mul(O(2).pow(game.clayer)).add(1));
  document.getElementById("pending").textContent = notate(pending);
} // Updates all changing HTML in the game.

function interval(){
  updateVars();
  updateHTML();
} // Does the game loop.

load();
setInterval(save,1000);
setInterval(interval,30);
