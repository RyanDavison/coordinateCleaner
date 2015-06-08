# coordinateCleaner
The Coordinate Cleaner is an AMD Dojo module that cleans input lat/lon coordinates and returns an 
array with the clean coordinates in decimal degree format or a callback function.

Coordinates are passed in as a comma or colon delimited string in the format:

"latitude,longitude" or "latitude:longitude"

Entries can be any combination of common formats including Decimal Degrees, Degrees Decimal-Minutes
and Degrees Minutes Decimal-Seconds.

Degrees, Minutes and Seconds should be separated by a space.

Currently the module only works for the NW hemisphere but that will be changed in a future version.

All symbols and letters will be removed by the module.
 
#Examples
Entering "39°, -108°" will output [39,-108] <br>
Entering "39 degrees, 108 degrees 24 Minutes" will output [39,-108.4]<br>
Entering "N39, W108 24" will output [39,-108.4]
