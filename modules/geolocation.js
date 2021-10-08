import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import {Circle} from 'ol/geom';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Style} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import { fromLonLat} from 'ol/proj';

//third party

//bootstrap


//Class imports
import Player from './player';
//function imports
import { CenterMap } from './map_functions';

//debug data




export function init()
{
    const landmark = require('../data/points.json');
    console.log(landmark);
    const player = new Player(document.cookie,0,0);

    const circleFeature = new Feature({
        geometry: new Circle(fromLonLat([7.119001150131225, 50.983501986960526]), 80),
    });
  circleFeature.setStyle(
    new Style({
      renderer(coordinates, state) {
        const [[x, y], [x1, y1]] = coordinates;
        const ctx = state.context;
        const dx = x1 - x;
        const dy = y1 - y;
        const radius = Math.sqrt(dx * dx + dy * dy);

        const innerRadius = 0;
        const outerRadius = radius * 1.4;

        const gradient = ctx.createRadialGradient(
          x,
          y,
          innerRadius,
          x,
          y,
          outerRadius
        );
        gradient.addColorStop(0, 'rgba(255,0,0,0)');
        gradient.addColorStop(0.6, 'rgba(255,0,0,0.2)');
        gradient.addColorStop(1, 'rgba(255,0,0,0.8)');
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
        ctx.strokeStyle = 'rgba(255,0,0,1)';
        ctx.stroke();
      },
    })
  );

  var points = {features:[]};
  points.features.push(circleFeature);

  let point_source = new VectorSource(points);

  let points_layer = new VectorLayer({
    source:point_source
  });

  const view = new View({
    center: fromLonLat([7.119001150131225, 50.983501986960526]),
    zoom: 18,
  });

  const map = new Map({
    layers: [
      new TileLayer({
        source: new OSM(),
        visible: true,
      }),
    ],
    target: 'map',
    view: view,
    controls : [],
  });
  

  console.log(map.controls)

  map.addLayer(points_layer)




  update_position(player,map);

  CenterMap(map, landmark.FHDW.longitude,landmark.FHDW.latitude);


  //Navigator function
  function update_position(player,map)
  {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        player.set_position(position.coords.latitude, position.coords.longitude);
        console.log(player)
        CenterMap(map, player.latitude,player.longitude)
      },
      error => {console.log(error)}
      
    )
  };

}
module.exports = {init}