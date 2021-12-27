const { toStringHDMS, createStringXY } = require("ol/coordinate");
const { Vector } = require("./physics");

class Board
{
    constructor(width,height,tile_map=[])
    {
        this.width = width;
        this.height = height;
        this.tile_map = tile_map;
        this.tile_size = (this.tile_map.tsize) ?this.tile_map.tsize :   32  ;
        this.assets = [];
    }
    add_asset(asset)
    {
        this.assets.push(asset);
    }
    stroke_assets(ctx)
    {
        this.assets.forEach(asset => asset.render(ctx,this.tile_size));
    }
    stroke_lines(ctx)
    {
        let result = [];
        for(let x = 0;x <this.width;x++){
            //console.log(x);
            for(let y = 0; y <=this.height;y++){
                //rectangle with text
                //this.tiles.push[x,y];
                ctx.rect(x*this.tile_size,y*this.tile_size,this.tile_size,this.tile_size);
                ctx.font = "10px bold arial";
                ctx.strokeText(`${x},${y-1}`,x*this.tile_size+8,y*this.tile_size-8);
                ctx.stroke();
            }
        }
    }
    preload()
    {
        this.add_asset(new Board_player('player',19,0,1,1,document.getElementById('detective')));
        this.add_asset(new Asset('coin',0,16,32,32,document.getElementById('coin')));
        this.player = this.assets[0];
        this.coin = this.assets[1];
        //console.log(this.player)
    }
    play(ctx)
    {
        ctx.clearRect(0, 0, this.width*this.tile_size, this.height*this.tile_size);
        this.stroke_assets(ctx);
        //this.stroke_lines(ctx);
        this.player.velocity.add([0,0]);
        this.player.move();
        //console.log(this.player.position.vector(),this.coin.position.vector());
        //console.log(this.player.position)
        this.player.render(ctx);
    }
}
class Asset {
    constructor(name, x, y, width, height,image)
    {
        this.name   =   name;
        this.position = new Vector(x,y);
        this.velocity = new Vector(0,0);
        this.width  =   width;
        this.height =   height;
        this.color  =   'blue';
        this.image = (image) ? image: "";
    }
    set_color(color)
    {
        this.color = color;
    }
    get x()
    {
        return this.position.x;
    }
    get y()
    {
        return this.position.y;
    }
    render(ctx,tile_size)
    {
        ctx.beginPath();
        ctx.drawImage(this.image,(this.x)*tile_size,(this.y)*tile_size,tile_size,tile_size);
        ctx.closePath();
        ctx.stroke();
    }
}

class Board_player extends Asset
{
    render(ctx,tile_size)
    {
        let color_before = ctx.fillStyle;
        ctx.beginPath();

        //console.log(this.x*tile_size,this.y*tile_size,tile_size)
        ctx.fillStyle = this.color;s
        //ctx.arc(,tile_size/2-2,0,2*Math.PI);
        ctx.drawImage(this.image,(this.x)*tile_size,(this.y)*tile_size,tile_size,tile_size);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = color_before;
    }
    move()
    {
        this.position.add(
            [this.velocity.x,
            this.velocity.y]
        );
        this.velocity.subtract(this.velocity.vector());
    }
}
module.exports = {Board,Board_player}