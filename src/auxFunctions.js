import * as Const from './constants';

function _convertFQData(venuesArray) {
  // returns fetched FourSquare data array to object with only required details.

  let venuesObj = {};

  for (let venue of venuesArray){
    try {
      venuesObj[venue.id] = {
        name: venue.name,
        lat: venue.location.lat,
        lng: venue.location.lng,
        categoryId: venue.categories[0].id
      }
    }
    catch(err) {
      // if exception due to incomplete info, ignore and continue
      continue;
    }
  };

  return venuesObj;
}


export function fetchPlaces(categoryIDs) {

  let todayDate = new Date(); 
  let catString = categoryIDs.join(',');

  let query = 
    Const.fourSqrSearchUrl + 
    `&client_id=${Const.fourSqrID}` +
    `&client_secret=${Const.fourSqrSecret}` +
    `&ll=${Const.mapCenterLat},${Const.mapCenterLng}` +
    `&intent=browse` +
    `&radius=${Const.searchRadius}` +
    `&limit=${Const.fourSqrLimit}` +
    `&v=${todayDate.getFullYear().toString()}1231` +
    `&categoryId=${catString}`;

  return new Promise((resolve, reject) => {
    fetch(query)
    .then((response) => response.json())
    .then((json) => resolve(_convertFQData(json.response.venues)))
    .catch((err) => reject(err))
    });

}

function _fetchFQDetails(venueId) {
    
  let todayDate = new Date();

  let url = 
    `${Const.fourSqrDetailsUrl}/${venueId}?`+ 
    `client_id=${Const.fourSqrID}` +
    `&client_secret=${Const.fourSqrSecret}` +
    `&v=${todayDate.getFullYear().toString()}1231`;

  return new Promise((resolve, reject) => {
    fetch(url)
    .then(response => response.json())
    .then(json => {
      const {code, errorDetail} = json.meta;
      code >= 400 
        ? reject(`Foursquare API error ${code}: ${errorDetail}`)
        : resolve(json.response.venue);
    })
    .catch(err => reject(err))
  });
}

export function addFQDetails(venuesObj) {
  
  return new Promise((resolve, reject) => {
    
    // get a promise for each venue to be queried
    const promises = 
      Object.keys(venuesObj).map( 
        (venue) => {
          return (
            _fetchFQDetails(venue)
              .then( details => {
                let venueDetails = {};
                let {url, shortUrl, rating, ratingColor} = details;
                venueDetails[venue] = {
                  website: url || shortUrl, 
                  rating: rating || '', 
                  ratingCol: '#' + ratingColor || '#FFFFFF' 
                }  
                return venueDetails;
              })
              .catch( err => { if(!Const.fourSqrFailSafe) reject(err) })
          )
        }
      )

    // execute query for each venue
    Promise.all(promises)
    .then( venueDetails => {
      //add each venue's details object to one object
      let venuesWithDetails = {};
      for(let item of venueDetails) {
        Object.assign(venuesWithDetails, item);
      }
      //add the details of each venue to the original venues object
      for(let id in venuesObj) {
        Object.assign(venuesObj[id], venuesWithDetails[id]);
      }
      //return the amended oject with all venues and their details
      resolve(venuesObj);
    })
    .catch( err => reject(err))
  })
}

export function loadGoogleAPI() {

  // solution partly derived from https://stackoverflow.com/questions/48493960/using-google-map-in-react-component

  return new Promise ((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${Const.googleAPIUrlMap}key=${Const.googleAPIKey}`;
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => {
      resolve();
    });
    script.addEventListener('error', () => {
      reject();
    });
    document.body.appendChild(script);
  });

}

export function addGoogleAddresses(venuesObj) {
 
  return new Promise((resolve, reject) => {

    // a promise for each venue to be queried
    const promises = 
      Object.keys(venuesObj).map( 
        (venue) => {
          let query = 
            `${Const.googleAPIUrlGC}` +
            `latlng=${venuesObj[venue].lat},${venuesObj[venue].lng}` +
            `&key=${Const.googleAPIKey}`

          return fetch(query)
                  .then( response => response.json())
                  .then( (json) => {
                    let venueAddress = {};
                    let formatted_address;
                    json.results[0]
                      ? {formatted_address} = json.results[0]
                      : formatted_address = '';
                    venueAddress[venue] = {
                      address: formatted_address
                    }  
                    return venueAddress;
                  })
                  .catch( (err) => {
                    console.log('Google API failed: ' + err);
                    reject(err);
                  })
        }
      )
    
    // run the query for each venue
    Promise.all(promises)
      .then( addresses => { 
        // add the addresses of each venue to an object
        let venuesWithAddr = {};
        for(let item of addresses) {
          Object.assign(venuesWithAddr, item);
        }
        // add the addresses to the original venues object
        for(let id in venuesObj) {
          Object.assign(venuesObj[id], venuesWithAddr[id]);
        }
        // return ammended object containing addresses
        resolve(venuesObj);
      })
      .catch( err => reject(err))
  })
}






