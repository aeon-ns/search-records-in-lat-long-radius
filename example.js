const DUBLIN = {
    LAT: 53.339428,
    LONG: - 6.257664
};

const RADIUS = 100; //Km

const SearchFile = require('./index');

SearchFile.search(DUBLIN.LAT, DUBLIN.LONG, RADIUS, 'customers.txt');