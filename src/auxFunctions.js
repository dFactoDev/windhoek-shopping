import * as constants from './constants';

export function fetchPlaces(categoryIDs) {

  let todayDate = new Date();

  let categoriesString = categoryIDs.join(',');

  let fourSqrParamsObj = {
    client_id: constants.fourSqrID,
    client_secret: constants.fourSqrSecret,
    ll: constants.mapCenterLat + ',' + constants.mapCenterLng,
    intent: 'browse',
    radius: '4000',
    limit: constants.fourSqrLimit,
    v: todayDate.getFullYear().toString() + '1231',
    categoryId: categoriesString
  };

  const fourSqrURLParams = new URLSearchParams();

  Object.entries(fourSqrParamsObj).map((param) => {
    fourSqrURLParams.append(param[0], param[1]);
  });
  
  return new Promise((resolve, reject) => {

    fetch(constants.fourSqrUrl + fourSqrURLParams.toString())
    .then((response) => response.json())
    .then((json) => resolve(json.response.venues))
    .catch((err) => reject(err))
    });

}





