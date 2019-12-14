
import {getDistance} from 'geolib'; // get. Distance function from a library full of usewfull functions  when doing math on geo-coordinates
// See : https://www.npmjs.com/package/geolib

// ----------------------- Data structures and helper functions for doing the GeoFencing. This could/should of course go
//in a separate module. W ekeep it here as paert of teaching for now.

export let pointsOfInterest = []; // Making a place whewre we can hold on to our pints of interest. We don't know yet exactly how many pointsOfInterest we want when we start out

class pointOfInterest  // Defining our own 'type' : pointOfInterest. Every interestpoint has coords, radius, whatis, current distance
{
constructor(coords, radius, whatis)
{   
this.coords= coords; // Latitude and Longitude
this.radius = radius; // Radius in circle of interest
this.whatis = whatis; // Short txt to describe
// ***make something to hold an image on markers this.image = image;
this.currentDistance = 99999;  // Just put me as far as way as I can to begin with ...

};
}

//then you can add new point of interest with this function
function addPointOfInterest(lati,longi,radius, whatis) // Making it easier to add new pointOfInterest to pointsOfInterest
{
pointsOfInterest.push(new pointOfInterest({latitude:lati,longitude:longi},radius,whatis)) 

}

export function orderDistanceArray(currentCoords) // calculate distance from currentpos to all points of interest and sort pointsOfInterest array 
      //in ascending order of distance
{
pointsOfInterest.forEach(p=>  {p.currentDistance = getDistance(currentCoords, p.coords, accuracy = 1);});                             

pointsOfInterest.sort((p1,p2)=> 
{
if (p1.currentDistance  < p2.currentDistance ) {return -1;}
if (p1.currentDistance  > p2.currentDistance ) {return 1;}
return 0;
}
); // Standard in-place sorting of array in order of ascending distance to current location
// See documentation on sort with compare function here: 
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
}


export function initalizePointsOfInterest() // // Let throw four interesting places in here. Called when starting the show
{
/* Get coordinates by cut&paste from Google Maps :
Rundtårn : 55.681547,12.575751
Rosenborg:  55.685970,12.577291
Regensen: 55.681133,12.575229
Børsen: 55.676038,12.584014
*/
addPointOfInterest(55.685970,12.577291,20000,  'Æbletræ');
addPointOfInterest(55.681547,12.575751201,2000, 'Krydderurter');
addPointOfInterest(55.676038,12.584014,2000,'Svampe');
addPointOfInterest(55.673409, 12.579428,2000,'Jordbær');
};

