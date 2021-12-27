
class Alertbox
{
    constructor(target)
    {
        this.src = target;
    }
    change_box_text({title,text})
    {
        this.src.children[0].children[0].innerHTML = title;
        this.src.children[1].children[0].innerHTML = text;
    }
    display()
    {
        this.src.style.display = 'grid';
    }
    hide()
    {
        this.src.style.display = 'none';
    }
}

module.exports = {Alertbox};