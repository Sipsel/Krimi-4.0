import {init as geolocation} from './modules/geolocation';


const dialog_window = document.getElementById('dialog');
const overlay_window = document.getElementById("overlay");
const name_popup_window = document.getElementById("name-popup");
const fly_buttons = document.getElementById("fly-buttons");
const game_window = document.getElementById("game-window");

const video_window = document.getElementById('game-vid');


main()

export function main()
{
  // get gamestate
  let gamestate = parseInt(localStorage.getItem('gamestate'));


  console.log()
  if(isNaN(gamestate))
  {
    document.getElementById("fly-buttons").style.display = "none";
    
  }
  else if(gamestate == -1){
    dialog_window.style.display = 'none';
    overlay_window.style.display = "grid";
    name_popup_window.style.display = "grid";
    fly_buttons.style.display = "none";
    game_window.style.display = "none";
  }

  else if(gamestate == 0)
  {
    dialog_window.style.display = 'none';
    overlay_window.style.display = "none"
    name_popup_window.style.display = "none" 
    fly_buttons.style.display = "grid"

    geolocation()
  }
  else if(gamestate == 1)
  {
    dialog_window.style.display = 'grid';
    overlay_window.style.display = "grid";
    name_popup_window.style.display = "none";
    fly_buttons.style.display = "none";
    document.getElementById('dialog-text').children[0].innerHTML = "Glückwunsch!<br> Du hast den Fall gelöst";
    document.getElementById('dialog-button').remove();
    console.log("hello");
  }
}
exports.modules = {main};

let dialog_button = document.getElementById('dialog-button')
dialog_button.addEventListener('click',() =>{
  localStorage.setItem('gamestate',-1);
  main()
},false)


let element = document.getElementById('presseausweis-input-button');

element.addEventListener('click',user_input,false);

function user_input()
{
    let name = document.getElementById("presseausweis-input-name");
    document.getElementById("game-window").style.display = "grid";
    document.cookie = name.value;
    localStorage.setItem('gamestate',0);
    main();
}
