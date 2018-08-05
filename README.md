# Windhoek Shopping
Windhoek Shopping is a web application listing different shops around the central Windhoek area in Namibia.
## Setup
Clone the repository then run:

`npm install`

Then start the server with:

`npm start`

The server runs the **development** environment on port 3000 by default and is accessible at `http://localhost:3000`
Note that the **Service Worker** is not implemented in the development enviroment.

The production site which includes optimized file sizes and the Service Worker is located under the `build` folder. You must serve the contents of this folder at the root `/` of your webserver.

## Usage
A menu is available on the left which provides the list of shops.
By default, all shops are listed. The list can be filtered by using the **Category** filter dropdown menu.
The menu can be closed with the top right carret button, especially useful for smaller screens.

On the right, a map of Windhoek is displayed and a marker is shown for each shop on the current list.

Either the name on the menu or the marker on the map can be clicked to display additional information regarding the selected shop.
Additional information includes its address, rating (if available) and a link to more info.

The map may be zoomed in and out using the mouse scroll buttons or using the `+` or `-` buttons in the bottom right corner. 
The map can also be switched to satelite view at the top right corner.

## Settings (for developers)

Under the `src` directory is a file called `constants.js`.
This file contains parameters used in the code. 

Particulary useful is the `fourSqrLimit`, which limits the amount of shops retrieved from [FourSquare](https://foursquare.com).
This setting is useful for performance or to prevent API queries from exceeding the limits.
If FourSquare *venue details* API quota is exceeded, `fourSqrFailSafe` can be set to `true` to allow the menu to still load all shops but without details such as ratings or FourSquare URLs. (The menu load fails by default if these details cannot be retrieved).

### Settings

```
// FourSquare
export const fourSqrID = "TVSFKD1EGP0KANAOVY40P3ZPMUYO1UQWKN0O1ZGMJY4S5B1Y";
export const fourSqrSecret = "IMMLPSIPYJ1BVGQY555XLME1WFJ5DG1YXYRARR0E4CQS35PL";
export const fourSqrLimit = "2";
export const fourSqrSearchUrl = "https://api.foursquare.com/v2/venues/search?";
export const fourSqrDetailsUrl = "https://api.foursquare.com/v2/venues"
export const searchRadius = "4000";
export const fourSqrFailSafe = false;

// Map 
export const mapCenterLat = -22.588409;
export const mapCenterLng = 17.080242;
export const mapInitZoom = 13;
export const mapType = 'roadmap';

export const googleAPIKey = 'AIzaSyC1iwismmqvzP5D4qeQcBVtfRVOTWHnXNc';
export const googleAPIUrlGC = 'https://maps.googleapis.com/maps/api/geocode/json?';
```
