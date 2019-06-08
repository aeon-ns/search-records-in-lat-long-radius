const fs = require('fs');
const BinarySearchTree = require('./BST');
const distanceBetweenCoordinates = require('./distanceBetweenCoordinates');

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