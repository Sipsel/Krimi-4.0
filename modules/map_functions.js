import { transform } from 'ol/proj';
'use strict';

export function CenterMap(map, long, lat) {
    console.log("Long: " + long + " Lat: " + lat);
    map.getView().setCenter(transform([long, lat], 'EPSG:4326', 'EPSG:3857'));
    
}

module.exports = {CenterMap};