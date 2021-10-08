
import {init as geolocation} from './modules/geolocation';

main()

export function main()
{
  if(document.cookie == "")
  {
    document.getElementById("overlay").style.display = "grid"
    document.getElementById("name-popup").style.display = "grid" 
  }
  else{
    document.getElementById("overlay").style.display = "none"
    document.getElementById("name-popup").style.display = "none" 
    geolocation()
  }

}
exports.modules = {main};


