class Vector {
    constructor(x=0,y=0)
    {
        this.matrix = [x,y];
    }
    add([x,y])
    //x,y for vector to add
    {
        this.matrix[0]+=x;
        this.matrix[1]+=y;
    }
    subtract([x,y])
    {
        this.matrix[0]-=x;
        this.matrix[1]-=y;
    }
    vector()
    {
        //console.log(this.matrix)
        return this.matrix;
    }
    get x(){
        return this.matrix[0]
    }
    get y()
    {
        return this.matrix[1];
    }
}
module.exports = {Vector};