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
import Location from './classes';

//debug data






export function init()
{
    const landmark = require('../data/points.json');
    console.log(landmark);
    const player = new Player(document.cookie,0,0);

 
  const FHDW = new Location(7.119001150131225, 50.983501986960526,80);
  const kalk_oefen = new Location(7.1239567, 50.992851,80);
  const paper_creator = new Location(7.128342,50.9909029,80);
  const paper_factory = new Location(7.1201243,50.9890815,80);

  FHDW.feature.setStyle(location_style);
  kalk_oefen.feature.setStyle(location_style);
  paper_creator.feature.setStyle(location_style);
  paper_factory.feature.setStyle(location_style);

  var points = {features:[]};
  points.features.push(FHDW.feature);
  points.features.push(kalk_oefen.feature);
  points.features.push(paper_creator.feature);

  points.features.push(paper_factory.feature);


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
  

//ui input functions

const fhdw_button = document.getElementById('fly-to-fhdw');
const kalk_oefen_button = document.getElementById('fly-to-kalk_oefen');
const paper_creator_button = document.getElementById('fly-to-paper_creator');
const paper_factory_button = document.getElementById('fly-to-paper_factory');

const fhdw_video = document.getElementById('game-window-fhdw');
const kalk_oefen_video = document.getElementById('game-window-kalk_oefen');
const paper_creator_video = document.getElementById('game-window-paper_creator');
const paper_factory_video = document.getElementById('game-window-paper_mile');




let buttons = [];
buttons.push(fhdw_button,kalk_oefen_button,paper_creator_button,paper_factory_button);



fhdw_button.addEventListener("click", 
() =>
{
  flyTo(view,fromLonLat([FHDW.longitude, FHDW.latitude]),function(){});
  localStorage.setItem('curr_pos', 'fhdw');
  hide_elem_in_array(buttons,fhdw_button);
})
kalk_oefen_button.addEventListener("click", 
() =>
{
  flyTo(view,fromLonLat([kalk_oefen.longitude, kalk_oefen.latitude]),function(){});
  localStorage.setItem('curr_pos', 'kalk_oefen');
  hide_elem_in_array(buttons,kalk_oefen_button);
})
paper_creator_button.addEventListener("click", 
() =>
{
  flyTo(view,fromLonLat([paper_creator.longitude, paper_creator.latitude]),function(){});
  localStorage.setItem('curr_pos', 'paper_creator');
  hide_elem_in_array(buttons,paper_creator_button);
})
paper_factory_button.addEventListener("click", 
() =>
{
  flyTo(view,fromLonLat([paper_factory.longitude, paper_factory.latitude]),function(){});
  localStorage.setItem('curr_pos', 'paper_mill');
  hide_elem_in_array(buttons,paper_factory_button);
})

  map.addLayer(points_layer)
  update_position(player,map);
  CenterMap(map, landmark.FHDW.longitude,landmark.FHDW.latitude);





  //Navigator function
  function update_position(player,map)
  {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        player.set_position(50.9716611,7.0723504);
        console.log(player)
        CenterMap(map, player.latitude,player.longitude)
      },
      error => {console.log(error)}
      
    ,{enableHighAccuracy:true})
  };

}
module.exports = {init}


function flyTo(_view,location, done) {
  const duration = 10000;
  const zoom = _view.getZoom();
  let parts = 2;
  let called = false;
  document.getElementById('play-button').classList.add('no-display');
  function callback(complete) {
    
    --parts;
    if (called) {
      
      return;
    }
    if (parts === 0 || !complete) {
      called = true;
      document.getElementById('play-button').classList.remove('no-display');
      done(complete);
    }
  }
  _view.animate(
    {
      center: location,
      duration: duration,
    },
    callback
  );
  _view.animate(
    {
      zoom: zoom - 2,
      duration: duration / 2,
    },
    {
      zoom: zoom,
      duration: duration / 2,
    },
    callback
  );
  return true;
}


const location_style = new Style({
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



function hide_elem_in_array(_elems, _elem)
{
  _elems.forEach(elem =>
    {
      if(elem == _elem)
      {
        elem.classList.add('disabled');
      }
      else
      {
        elem.classList.remove('disabled');
      }
    }
    )
}