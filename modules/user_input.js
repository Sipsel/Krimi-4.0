const { main } = require("../main");

let element = document.getElementById('presseausweis-input-button')
element.addEventListener('click',user_input,false);

function user_input()
{
    let name = document.getElementById("presseausweis-input-name");
    document.cookie = name.value;
    main()
}
