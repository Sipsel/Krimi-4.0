const { main } = require("../main");

let element = document.getElementById('name-input-btn')
element.addEventListener('click',user_input,false);

function user_input()
{
    let name = document.getElementById("name-input");
    document.cookie = name.value;
    main()
}
