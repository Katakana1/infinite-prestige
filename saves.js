function save(){
	localStorage.setItem('ipres', btoa(JSON.stringify(game)));
}

function wipe(){
  game = new Game();
}

function load(){
  if(localStorage.getItem('ipres') != null){
	  game = JSON.parse(atob(localStorage.getItem('ipres')));
  }
}
