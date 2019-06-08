# Search Records in Lat-Long Radius

## Outputs records that are present within a particular radius of the provided GPS coordinates.

### Usage
```
const DUBLIN = {
    LAT: 53.339428,
    LONG: - 6.257664
};

const RADIUS = 100; //Km

const SearchFile = require('search-records-in-lat-long-radius');

SearchFile.search(DUBLIN.LAT, DUBLIN.LONG, RADIUS, 'customers.txt');
```

### For Records Sample - See `customers.txt`

##### Author : *Nisheet Sharma (nisheet.sharma@live.in)* 