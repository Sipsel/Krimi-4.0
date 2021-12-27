const { main } = require("../main");

var play_button = document.getElementById('play-button');



play_button.addEventListener("click",() => {
    
    let curr_pos = localStorage.getItem('curr_pos');
    let games_completed = JSON.parse(localStorage.getItem('games-completed'));



    console.log(`game-window-${curr_pos}`);
    var active_video = document.getElementById(`game-window-${curr_pos}`);

    play_button.classList.add('no-display');
    active_video.classList.remove('no-display');

    active_video.children[0].play();

    Array.from(document.getElementsByClassName('game-video')).forEach(video =>
        {
            video.addEventListener('ended', myHandler, false);
        });


    //check if game is finished

    if(games_completed == null )
    {
        games_completed = [];
        games_completed.push(curr_pos);
        localStorage.setItem('games-completed',JSON.stringify(games_completed));
    }
    else if(games_completed != null && !(games_completed.includes(curr_pos)))
    {
        games_completed.push(curr_pos);
        localStorage.setItem('games-completed',JSON.stringify(games_completed));
    }

    
    function myHandler(e) {
        let videos = Array.from(document.getElementsByClassName('game-video'));

        videos.forEach(video =>
            {
                video.parentElement.classList.add('no-display');
            })
        let games_completed = JSON.parse(localStorage.getItem('games-completed'));
        if(games_completed.length == 4)
        {
            localStorage.setItem('gamestate',1);
        }
        main();
    }
})