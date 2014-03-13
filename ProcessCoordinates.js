//coordinates is passed as a latitude and longitude pair separated by a comma

function latLonComplete(coordinates) {
    var latD, lonD;
    var mycoords;
    if (coordinates) {  //coordinates comes from scraping the document.location.href and checking for variables passed in the url. if they are passed, use the coords else use user input coords
        latD = coordinates[0];
        lonD = coordinates[1];
    } else { //This begins code for checking the user input coords
        mycoords = document.getElementById("coords").value; //mycoords are the user input, comma separated lat and lon values
        if (mycoords === "") { //If the user hit the zoom to button without entering values, set mycoords to trigger the alerting if statement below
            mycoords = " , "; //This tricks the if statement below into believing there were two empty values (mycoords comes in as a single value and is split if it is valid)
        } else if (mycoords.match(/^[0-9]{2}(\s)*(\.)?([0-9]{1,2})?(\s)*(?:[0-9]+)??$/)) {// If there is one value entered but not a second one, set mycoords to trigger the proper if statement alert below
            mycoords = mycoords + "," //This tricks the if statement below into believing there is one coordinate but nothing for the second coordinate (mycoords comes in as a single value and is split if it is valid)
        }
        mycoords = mycoords.split(","); //If the user input two values for lat and lon, split them into separate lat and lon variables
        latD = mycoords[0].replace(/^\s+|\s+$/g, '');//Remove leading and trailing white space
        lonD = mycoords[1].replace(/^\s+|\s+$/g, '');//Remove leading and trailing white space
    }
    var latDproc, lonDproc, Dlat, Dlon, Mlat, Mlon, Slat, Slon;


    if (([latD, lonD].every(comp("")))) { //If the input box is empty when the zoom to button is clicked, present the following alert message
        alert("<div class='alertmessageIP alertmessage'>Please enter valid Latitude and Longitude values separated by a comma.<br><br>Examples:<br><br>39.27595,-108.547315</u><br><br>or<br><br>39 25 45.325,-108 28 15.22<br><br>Separate Degrees Minutes and Seconds with a space.</div>", "Coordinates Missing!");
    } else if (([latD, lonD].some(comp("")))) { //If only one coordinate value is input, present the following alert message
        alert("<div class='alertmessageIP alertmessage'>Please enter a value for both Latitude and Longitude!<br><br>Example:<br>	Lat: 39.27595<br>	Lon: -108.547315</div>");
    } else if (!([latD, lonD].some(comp("")))) { //If both coordinate values are present, proceed to make sure they are valid values
        if (latD.match(/[a-zA-Z!@#$%^&*()_+=\[\]{}?<>`~;:'"|\,\\]/g) || lonD.match(/[a-zA-Z\W\WC!@#$%^&*()_+=\[\]{}?<>`~;:'"|,\\]/g)) {
            latD = latD.replace(/[a-zA-Z!@#$%^&*()_+=\[\]{}?<>`~;:'"|,\\]/g, '').replace(/^\s+|\s+$/g, '');
            lonD = lonD.replace(/[a-zA-Z!@#$%^&*()_+=\[\]{}?<>`~;:'"|,\\]/g, '').replace(/^\s+|\s+$/g, '');
            document.getElementById("coords").value = latD + "," + lonD;
            //latD = document.getElementById("latYd39").value = latD.replace(/[a-zA-Z!@#$%^&*()_+=\[\]{}?<>`~;:'"|,\\]/g, '').replace(/^\s+|\s+$/g, '');
            //lonD = document.getElementById("lonXd108").value = lonD.replace(/[a-zA-Z!@#$%^&*()_+=\[\]{}?<>`~;:'"|,\\]/g, '').replace(/^\s+|\s+$/g, '');
        }
        if (latD.match(/^[0-9]{2}(\.)?(?:[0-9]+)??$/) && lonD.match(/^-?[0-9]{2,3}(\.)?(?:[0-9]+)??$/)) { //If the lat and lon values are decimal degrees then run doMath. No conversion required
            latD = latD;
            lonD = lonD;
            doMath(latD, lonD);
        } else if (latD.match(/^[0-9]{2}\s+[0-9]{1,2}(\.)?(?:[0-9]+)?$/) && lonD.match(/^-?[0-9]{2,3}\s+[0-9]{1,2}(\.)?(?:[0-9]+)?$/)) { //If the lat and lon values are degrees decimal minutes
            latD = latD.replace(/ +/g, " "); //Replace multiple white spaces with a singe white space
            lonD = lonD.replace(/ +/g, " "); //Replace multiple white spaces with a singe white space
            latDproc = latD.split(" "); //Split the lat variable based on space. This will create an array with format [degrees, decimal minutes]
            lonDproc = lonD.split(" "); //Split the lon variable based on space. This will create an array with format [degrees, decimal minutes]
            if (latDproc[1] > 60 && lonDproc[1] > 60) { //Check if minutes are greater than 60. If they are, fire the alert below which presents the error to the user for correction
                alert("<div class='alertmessageIP alertmessage'>Minutes entries must be 0-60. Please enter a number between 0 and 60 for minutes.</div><br><span class='span1'></span><span class='span2'></span><br><span class='span3'></span><span class='span4'>", "Data Entry Error");
                $('.span1').html("<b>Lat: </b>" + latDproc[0] + " ");
                $('.span2').css({ "color": "red" }).html("<u>" + latDproc[1] + "</u>");
                $('.span3').html("<b>Lon: </b>" + lonDproc[0] + " ");
                $('.span4').css({ "color": "red" }).html(lonDproc[1] + "</u>");
            } else if (lonDproc[1] > 60) { //Check if lon minutes are greater than 60. If they are, fire the alert below which presents the error to the user for correction
                alert("<div class='alertmessageIP alertmessage'>Longitude minutes must be 0-60. Please enter a number between 0 and 60 for minutes.</div><br><span class='span1'></span><span class='span2'></span>", "Data Entry Error");
                $('.span1').html("<b>Lon: </b>" + lonDproc[0] + " ");
                $('.span2').css({ "color": "red" }).html("<u>" + lonDproc[1] + "</u>");
            } else if (latDproc[1] > 60) { //Check if lat minutes are greater than 60. If they are, fire the alert below which presents the error to the user for correction
                alert("<div class='alertmessageIP alertmessage'>Latitude minutes must be 0-60. Please enter a number between 0 and 60 for minutes.</div><br><span class='span1'></span><span class='span2'></span>", "Data Entry Error");
                $('.span1').html("<b>Lat: </b>" + latDproc[0] + " ");
                $('.span2').css({ "color": "red" }).html("<u>" + latDproc[1] + "</u>");
            } else { //If the lat and lon degrees variable is 60 or below, convert the degrees and decimal minutes to float, calculate the decimal degree value and pass to doMath
                Dlat = parseFloat(latDproc[0]);
                Dlon = parseFloat(lonDproc[0]);
                Mlat = parseFloat(latDproc[1]);
                Mlon = parseFloat(lonDproc[1]);

                latD = (Mlat / 60.0) + (Dlat);
                lonD = (Mlon / 60.0) + (Dlon);

                doMath(latD, lonD);
            }
        } else if (latD.match(/^[0-9]{2}\s+[0-9]{1,2}\s+[0-9]{1,2}(\.)?(?:[0-9]+)?$/) && lonD.match(/^-?[0-9]{2,3}\s+[0-9]{1,2}\s+[0-9]{1,2}(\.)?(?:[0-9]+)?$/)) {//If the lat and lon values are degrees minutes decimal seconds
            latD = latD.replace(/  +/g, ' '); //Replace multiple white spaces with a singe white space
            lonD = lonD.replace(/  +/g, ' '); //Replace multiple white spaces with a singe white space
            latDproc = latD.split(" "); //Split the lat variable based on space. This will create an array with format [degrees, minutes, decimal seconds]
            lonDproc = lonD.split(" "); //Split the lon variable based on space. This will create an array with format [degrees, minutes, decimal seconds]
            if (latDproc[1] > 60 && lonDproc[1] > 60) { //Check if minutes are greater than 60. If they are, fire the alert below which presents the error to the user for correction
                alert("<div class='alertmessageIP alertmessage'>Minute entries must be 0-60. Please enter a number between 0 and 60 for minutes.</div><br><span class='span1'></span><span class='span2'></span><span class='span3'></span><br><br><span class='span4'></span><span class='span5'></span><span class='span6'></span>", "Data Entry Error");
                $('.span1').html("<b>Lat: </b>" + latDproc[0] + " ");
                $('.span2').css({ "color": "red" }).html("<u>" + latDproc[1] + "</u> ");
                $('.span3').html(latDproc[2]);
                $('.span4').html("<b>Lon: </b>" + lonDproc[0] + " ");
                $('.span5').css({ "color": "red" }).html("<u>" + lonDproc[1] + "</u> ");
                $('.span6').html(lonDproc[2]);
            } else if (latDproc[2] > 60 && lonDproc[2] > 60) {  //Check if seconds are greater than 60. If they are, fire the alert below which presents the error to the user for correction
                alert("<div class='alertmessageIP alertmessage'>Second entries must be 0-60. Please enter a number between 0 and 60 for minutes.</div><br><span class='span1'></span><span class='span2'></span><span class='span3'></span><br><span class='span4'></span><span class='span5'></span><span class='span6'></span>", "Data Entry Error");
                $('.span1').html("<b>Lat: </b>" + latDproc[0] + " ");
                $('.span2').html(latDproc[1] + " ");
                $('.span3').css({ "color": "red" }).html("<u>" + latDproc[2] + "</u>");
                $('.span4').html("<b>Lon: </b>" + lonDproc[0] + " ");
                $('.span5').html(lonDproc[1] + " ");
                $('.span6').css({ "color": "red" }).html("<u>" + lonDproc[2] + "</u>");
            } else if (latDproc[1] > 60) { //Check if lat minutes are greater than 60. If they are, fire the alert below which presents the error to the user for correction
                alert("<div class='alertmessageIP alertmessage'>Latitude minutes must be 0-60. Please enter a number between 0 and 60 for minutes.</div><br><span class='span1'></span><span class='span2'></span><span class='span3'></span>", "Data Entry Error");
                $('.span1').html("<b>Lat: </b>" + latDproc[0] + " ");
                $('.span2').css({ "color": "red" }).html("<u>" + latDproc[1] + "</u> ");
                $('.span3').html(latDproc[2]);
            } else if (lonDproc[1] > 60) { //Check if lon minutes are greater than 60. If they are, fire the alert below which presents the error to the user for correction
                alert("<div class='alertmessageIP alertmessage'>Longitude minutes must be 0-60. Please enter a number between 0 and 60 for minutes.</div><br><span class='span1'></span><span class='span2'></span><span class='span3'></span>", "Data Entry Error");
                $('.span1').html("<b>Lon: </b>" + lonDproc[0] + " ");
                $('.span2').css({ "color": "red" }).html("<u>" + lonDproc[1] + "</u> ");
                $('.span3').html(lonDproc[2]);
            } else if (latDproc[2] > 60) { //Check if lat seconds are greater than 60. If they are, fire the alert below which presents the error to the user for correction
                alert("<div class='alertmessageIP alertmessage'>Latitude seconds must be 0-60. Please enter a number between 0 and 60 for seconds.</div><br><span class='span1'></span><span class='span2'></span><span class='span3'></span>", "Data Entry Error");
                $('.span1').html("<b>Lat: </b>" + latDproc[0] + " ");
                $('.span2').html(latDproc[1] + " ");
                $('.span3').css({ "color": "red" }).html("<u>" + latDproc[2] + "</u>");
            } else if (lonDproc[2] > 60) { //Check if lon seconds are greater than 60. If they are, fire the alert below which presents the error to the user for correction
                alert("<div class='alertmessageIP alertmessage'>Longitude minutes must be 0-60. Please enter a number between 0 and 60 for minutes.</div><br><span class='span1'></span><span class='span2'></span><span class='span3'></span>", "Data Entry Error");
                $('.span1').html("<b>Lon: </b>" + lonDproc[0] + " ");
                $('.span2').html(lonDproc[1] + " ");
                $('.span3').css({ "color": "red" }).html("<u>" + lonDproc[2] + "</u>");
            } else {
                Dlat = parseFloat(latDproc[0]);
                Dlon = parseFloat(lonDproc[0]);
                Mlat = parseFloat(latDproc[1]);
                Mlon = parseFloat(lonDproc[1]);
                Slat = parseFloat(latDproc[2]);
                Slon = parseFloat(lonDproc[2]);

                latD = (((Slat / 60.0) + Mlat) / 60.0) + (Dlat);
                lonD = (((Slon / 60.0) + Mlon) / 60.0) + (Dlon);

                doMath(latD, lonD);
            }


        } else {
            alert("<div class='alertmessageIP alertmessage'>Please enter valid Latitude and Longitude values.<br><br>Examples:<br><br>	Lat: <u>39.27595</u><br>	Lon: <u>-108.547315</u><br>	or<br>Lat: <u>39</u> <u>25</u> <u>45.325</u><br>Lon: <u>-108</u> <u>28</u> <u>15.22</u><br><br>Separate Degrees Minutes and Seconds with a space.</div>", "Invalid Coordinates!");
        }
    }
}//End latLonComplete


//Use for comparing multiple node values at one time
function comp(val) {
    return function (x) {
        return x === val;
    }
}
