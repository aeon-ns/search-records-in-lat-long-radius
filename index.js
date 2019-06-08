const BinarySearchTree = require('./BST');
const fs = require('fs');

/**
 * @private
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
    const EARTH_DIAMETER = 12742;

    const latRadian1 = toRadian(lat1);
    const latRadian2 = toRadian(lat2);

    const latitudeDifference = latRadian2 - latRadian1;
    const longitudeDifference = toRadian(long1) - toRadian(long2);

    const a = (Math.sin(latitudeDifference / 2) ** 2) +
        Math.cos(latRadian1) * Math.cos(latRadian2) * (Math.sin(longitudeDifference / 2) ** 2);

    return EARTH_DIAMETER * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * @private
 * @name toRadian
 * 
 * @param {number} degrees 
 * 
 * @description
 * Converts degrees to radians
 * 
 * @returns {number} Value in radians
 * 
 * @author Nisheet Sharma <nisheet.sharma@live.in>
 */
function toRadian(degrees) {
    return degrees * 0.017453292519943295;
}

/**
 * @name search
 * 
 * @param {number} latitude Latitude (GPS coordinates of area to search)
 * @param {number} longitude Longitude (GPS coordinates of area to search)
 * @param {number} radius Radius of area to search within in km
 * @param {string} filePath Path to input i.e customers records file
 * 
 * @description
 * Searches for records that fall within the specified area marked 
 * by the GPS co-ordinates & the radius provided.
 * 
 * @returns {BinarySearchTree} Records that match the criteria.
 * 
 * @author Nisheet Sharma <nisheet.sharma@live.in>
 */
function search(latitude, longitude, radius, filePath) {
    if (!latitude || !longitude || !radius || !filePath) {
        return console.error('Missing required arguments');
    }

    if (typeof latitude != 'number' || typeof longitude != 'number' || typeof radius != 'number' || typeof filePath != 'string') {
        return console.error('Invalid argument type');
    }

    try {

        fs.access(filePath, fs.constants.F_OK, (err) => {
            // Throw err if file does not exist
            if (err) throw err;
        });

        const lineReader = require('readline').createInterface({
            input: fs.createReadStream(filePath)
        });

        let recordsBST = new BinarySearchTree();

        lineReader.on('line', function (line) {
            let userRecord = JSON.parse(line);
            if (distanceBetweenCoordinates(
                latitude, longitude,
                userRecord.latitude, userRecord.longitude
            ) <= radius) {
                recordsBST.insert(userRecord.user_id, userRecord.name);
            }
        });

        lineReader.on('close', function () {
            recordsBST.traverse(function (key, value) {
                console.log(`USER_ID: ${key}\tNAME: ${value}`);
            });
        });

        return recordsBST;
        
    } catch (err) {
        console.error('Search Error: \n', err);
        return;
    }
}

module.exports = {
    search,
    BinarySearchTree
};