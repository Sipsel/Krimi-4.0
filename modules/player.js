'use strict';

module.exports = class Player {
    constructor(name,longitude,latitude)
    {  
        this.name = name;
        this.longitude = longitude; //x 
        this.latitude = latitude; //y
    }
    set_position(longitude,latitude)
    {
        console.log(longitude,latitude)
        this.longitude = longitude;
        this.latitude = latitude;
    }
    get position()
    {
        return [this.latitude,this.longitude]
    }
}