const { Feature } = require("ol");
const { Circle } = require("ol/geom");
const { fromLonLat } = require("ol/proj");

module.exports = class Location
{
    constructor(_longitude,_latitude,_radius)
    {
        this.longitude = _longitude;
        this.latitude = _latitude; 

        this.feature = new Feature(
            {
                geometry: new Circle(fromLonLat([this.longitude, this.latitude]), _radius),
            }
        )
    }
    set_longitude(_longitude)
    {
        this.longitude = _longitude;
    }
    set_latitude(_latitude)
    {
        this.latitude = _latitude;
    }
    get Coordinates()
    {
        return [this.longitude,this.latitude];
    }
};
