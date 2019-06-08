const toRadian = require('./toRadian');

/**
 * @name distanceBetweenCoordinates
 * 
 * @param {number} lat1 Latitude of Location 1 
 * @param {number} long1 Longitude of Location 1 
 * @param {number} lat2 Latitude of Location 2
 * @param {number} long2 Longitude of Location 2
 * 
 * @description
 * Calculates the distance between two GPSCoordinates using haversine formula
 * 
 * @returns {number} Net Distance in kilometres
 * 
 * @author Nisheet Sharma <nisheet.sharma@live.in>
 */
function distanceBetweenCoordinates(lat1, long1, lat2, long2) {
    const EARTH_DIAMETER = 12742; // Km

    const latRadian1 = toRadian(lat1);
    const latRadian2 = toRadian(lat2);

    const latitudeDifference = latRadian2 - latRadian1;
    const longitudeDifference = toRadian(long1) - toRadian(long2);

    const a = (Math.sin(latitudeDifference / 2) ** 2) +
        Math.cos(latRadian1) * Math.cos(latRadian2) * (Math.sin(longitudeDifference / 2) ** 2);

    return EARTH_DIAMETER * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

module.exports = distanceBetweenCoordinates;