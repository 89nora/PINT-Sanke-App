import {getDistance} from 'geolib'; // get. Distance function from a library full of usewfull functions  when doing math on geo-coordinates
// See : https://www.npmjs.com/package/geolib


//Data structures and helper functions for doing the GeoFencing. 

export let pointsOfInterest = []; // Making a place where we can hold on to our points of interest. 

class pointOfInterest  // Defining our own 'type' : pointOfInterest. Every interestpoint has coords, radius, whatis, current distance
{
constructor(coords, radius, whatis)
{   
      this.coords= coords; // Latitude and Longitude
      this.radius = radius; // Radius in circle of interest
      this.whatis = whatis; // Short txt to describe
      this.currentDistance = 99999;  // Just put me as far as way as I can to begin with ...
};
}

//then you can add new point of interest with this function
export function addPointOfInterest(lati, longi, radius, whatis) {
      pointsOfInterest.push(new pointOfInterest({latitude: lati, longitude: longi}, radius, whatis))
}

// calculate distance from currentpos to all points of interest and sort pointsOfInterest array 
export function orderDistanceArray(currentCoords)
      //in ascending order of distance
{
pointsOfInterest.forEach(p=>  {p.currentDistance = getDistance(currentCoords, p.coords, accuracy = 1);});                             

pointsOfInterest.sort((p1,p2)=> {
      if (p1.currentDistance  < p2.currentDistance ) {return -1;}
      if (p1.currentDistance  > p2.currentDistance ) {return 1;}
      return 0;
      }
); 
// Standard in-place sorting of array in order of ascending distance to current location
// See documentation on sort with compare function here: 
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
}


export function initalizePointsOfInterest() {
      addPointOfInterest(55.685536,12.572966,2000, 'Botanisk Have');
      addPointOfInterest(55.700011, 12.569528,2000, 'Fælledparken Østerbro');
      addPointOfInterest(55.670802, 12.520449,2000, 'Søndermarken');
      addPointOfInterest(55.671907, 12.613360,2000, 'Amager Øst');
      addPointOfInterest(55.653841, 12.575903,2000, 'Monke-ringen');
};

