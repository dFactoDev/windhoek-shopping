import * as constants from './constants';

export function fetchPlaces(categoryIDs) {

  let todayDate = new Date();

  let categoriesString = categoryIDs.join(',');

  let fourSqrParamsObj = {
    client_id: constants.fourSqrID,
    client_secret: constants.fourSqrSecret,
    ll: constants.mapCenterLat + ',' + constants.mapCenterLng,
    intent: 'browse',
    radius: constants.searchRadius,
    limit: constants.fourSqrLimit,
    v: todayDate.getFullYear().toString() + '1231',
    categoryId: categoriesString
  };

  const fourSqrURLParams = new URLSearchParams();

  Object.entries(fourSqrParamsObj).map((param) => {
    fourSqrURLParams.append(param[0], param[1]);
  });
  
  return new Promise((resolve, reject) => {

    fetch(constants.fourSqrSearchUrl + fourSqrURLParams.toString())
    .then((response) => response.json())
    .then((json) => resolve(json.response.venues))
    .catch((err) => reject(err))
    });

}

export function getFQDetails(venuesObj) {

  function fetchDetails(venueId) {
    
    let todayDate = new Date();

    let url = `${constants.fourSqrDetailsUrl}/${venueId}?`+ 
      `client_id=${constants.fourSqrID}` +
      `&client_secret=${constants.fourSqrSecret}` +
      `&v=${todayDate.getFullYear().toString()}1231`;
  
    return new Promise((resolve, reject) => {
      fetch(url)
      .then(response => response.json())
      .then(json => {
        const {code, errorDetail} = json.meta;
        if(code >= 400) reject(`API error ${code}: ${errorDetail}`);
        resolve(json.response.venue)
      })
      .catch(err => reject(err))
    });
  }
  
  return new Promise((res, rej) => {
    Promise.all(Object.keys(venuesObj).map( (venue) => {

      return fetchDetails(venue)
              .then( details => {
                let venueDetails = {};
                let {url, shortUrl, rating, ratingColor} = details;
                venueDetails[venue] = {
                  website: url ? url : shortUrl, 
                  rating: rating ? rating : '', 
                  ratingCol: ratingColor ? '#' + ratingColor : '#FFFFFF' 
                }  
                return venueDetails;
              })
              .catch( err => rej(err))
    }))
    .then( venueDetails => {
      let venueObjWithDetails = {};
      for(let item of venueDetails) {
        Object.assign(venueObjWithDetails, item);
      }
      res(venueObjWithDetails);
    })
    .catch( err => rej(err))
  })
}

export function addFQDetails(details, venuesObj) {
  for(let id in venuesObj) {
    Object.assign(venuesObj[id], details[id]);
  }
  return venuesObj;
}

export function getGoogleAddresses(venuesObj) {
  return new Promise((res, rej) => {
    Promise.all(Object.keys(venuesObj).map( (venue) => {

      return fetch(`${constants.googleAPIUrlGC}` +
                    `latlng=${venuesObj[venue].lat},${venuesObj[venue].lng}` +
                    `&key=${constants.googleAPIKey}`)

              .then( response => response.json())

              .then( (json) => {
                let venueAddress = {};
                venueAddress[venue] = {
                  address: json.results[0].formatted_address
                }  
                return venueAddress;
              })

              .catch( (err) => {
                console.log('Google API failed:' + err);
              })
    }))
    .then( addresses => { 
      let venuesObjWithAddr = {};
      for(let item of addresses) {
        Object.assign(venuesObjWithAddr, item);
      }
      res(venuesObjWithAddr);
    })
    .catch( err => rej(err))
  })

}

export function addAddresses(addresses, venuesObj) {
  for(let id in venuesObj) {
    Object.assign(venuesObj[id], addresses[id]);
  }
  return venuesObj;
}

export function venuesArrToObj(venuesArray) {
  // returns fetched FourSquare data array to object 

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



