const { Board,Board_player } = require("./classes");
const { Alertbox } = require("./ui");

var game;
var canvas = document.getElementById('labrinth');
var ctx = canvas.getContext("2d");

canvas.height = `${640}`;
canvas.width = `${640}`;

const alertbox = new Alertbox(document.getElementById('message-box'));

alertbox.change_box_text({'title':"Gewonnen!","text":"Sie haben das Labyrinth gelöst. Sie können nur wieder zur Karte zurück"});
alertbox.hide();

var last_time = 0;

start();
const board = new Board(20,20);
board.preload();
function mainloop(time)
{
    game = undefined;
    if(last_time!= 0)
    {   
        var dt = (time - last_time)/1000;
        //board.stroke_lines(ctx)
        
        board.play(ctx);
        if(
            (board.player.position.x == board.coin.position.x)
            &&
            (board.player.position.y == board.coin.position.y)
            
            )
        {
            board.play(ctx);
            stop();
            canvas.style.display = 'none';
            alertbox.display();
            return
        }
    }
    //console.log(dt);
    last_time = time;

    start();
}
function start() {
    if (!game) {
        game = window.requestAnimationFrame(mainloop);
    }
}

function stop() {
    if (game) {
       window.cancelAnimationFrame(game);
       game = undefined;
    }
}

document.body.onkeydown = (e) => {
    //console.log(e);
    if(e.key == "w")
    {
        board.player.velocity.add([0,-1]);
    }
    if(e.key == "s")
    {
        board.player.velocity.add([0,1]);
    }
    if(e.key == "a")
    {
        board.player.velocity.add([-1,0]);
    }
    if(e.key == "d")
    {
        board.player.velocity.add([1,0]);
    }
};


