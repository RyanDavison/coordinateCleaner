   function processCoords(latD, lonD) {
            

            if (!(latD === "" || lonD === "")) { //If both coordinate values are present, proceed to make sure they are valid values
                if (latD.match(/[a-zA-Z!@#$%^&*()_+=\[\]{}?<>`~;:'"|\,\\]/g) || lonD.match(/[a-zA-Z\W\WC!@#$%^&*()_+=\[\]{}?<>`~;:'"|,\\]/g)) {
                    latD = latD.replace(/[a-zA-Z!@#$%^&*()_+=\[\]{}?<>`~;:'"|,\\]/g, '').replace(/^\s+|\s+$/g, '');
                    lonD = lonD.replace(/[a-zA-Z!@#$%^&*()_+=\[\]{}?<>`~;:'"|,\\]/g, '').replace(/^\s+|\s+$/g, '');
                    id("coords").value = latD + "," + lonD;
                }
                if (latD.match(/^[0-9]{2}(\.)?(?:[0-9]+)??$/) && lonD.match(/^-?[0-9]{2,3}(\.)?(?:[0-9]+)??$/)) { //If the lat and lon values are decimal degrees. No conversion required
                    latD = latD;
                    lonD = lonD;
                    //Do something with your coordinates
                    SendCoordinatesToFunction(latD, lonD);
                } else if (latD.match(/^[0-9]{2}\s+[0-9]{1,2}(\.)?(?:[0-9]+)?$/) && lonD.match(/^-?[0-9]{2,3}\s+[0-9]{1,2}(\.)?(?:[0-9]+)?$/)) { //If the lat and lon values are degrees decimal minutes
                    latD = latD.replace(/ +/g, " "); //Replace multiple white spaces with a singe white space
                    lonD = lonD.replace(/ +/g, " "); //Replace multiple white spaces with a singe white space
                    latDproc = latD.split(" "); //Split the lat variable based on space. This will create an array with format [degrees, decimal minutes]
                    lonDproc = lonD.split(" "); //Split the lon variable based on space. This will create an array with format [degrees, decimal minutes]
                    if (latDproc[1] > 60 && lonDproc[1] > 60) { //Check if minutes are greater than 60. If they are, fire the alert below which presents the error to the user for correction
                        coordDialog.set("content", "<div class='alertmessageIP alertmessage'>Minute entries must be 0-60. Please enter a number between 0 and 60 for minutes.</div><br><b>Lat: </b>" + latDproc[0] + " <u style='color:red;'>" + latDproc[1] + "</u><br><b>Lon: </b>" + lonDproc[0] + " <u style='color:red;'>" + lonDproc[1] + "</u>" + ok);
                        coordDialog.show();
                    } else if (lonDproc[1] > 60) { //Check if lon minutes are greater than 60. If they are, fire the alert below which presents the error to the user for correction
                        coordDialog.set("content", "<div class='alertmessageIP alertmessage'>Longitude minutes must be 0-60. Please enter a number between 0 and 60 for minutes.</div><br><b>Lon: </b>" + lonDproc[0] + " <u style='color:red;'>" + lonDproc[1] + "</u>" + ok);
                        coordDialog.show();
                    } else if (latDproc[1] > 60) { //Check if lat minutes are greater than 60. If they are, fire the alert below which presents the error to the user for correction
                        coordDialog.set("content", "<div class='alertmessageIP alertmessage'>Latitude minutes must be 0-60. Please enter a number between 0 and 60 for minutes.</div><br><b>Lat: </b>" + latDproc[0] + " <u style='color:red;'>" + latDproc[1] + "</u>" + ok);
                        coordDialog.show();
                    } else { //If the lat and lon degrees variable is 60 or below, convert the degrees and decimal minutes to float, calculate the decimal degree
                        Dlat = parseFloat(latDproc[0]);
                        Dlon = parseFloat(lonDproc[0]);
                        Mlat = parseFloat(latDproc[1]);
                        Mlon = parseFloat(lonDproc[1]);

                        latD = (Mlat / 60.0) + (Dlat);
                        lonD = (Mlon / 60.0) + (Dlon);

                        //Do something with your coordinates
                        SendCoordinatesToFunction(latD, lonD);
                    }
                } else if (latD.match(/^[0-9]{2}\s+[0-9]{1,2}\s+[0-9]{1,2}(\.)?(?:[0-9]+)?$/) && lonD.match(/^-?[0-9]{2,3}\s+[0-9]{1,2}\s+[0-9]{1,2}(\.)?(?:[0-9]+)?$/)) { //If the lat and lon values are degrees minutes decimal seconds
                    latD = latD.replace(/  +/g, ' '); //Replace multiple white spaces with a singe white space
                    lonD = lonD.replace(/  +/g, ' '); //Replace multiple white spaces with a singe white space
                    latDproc = latD.split(" "); //Split the lat variable based on space. This will create an array with format [degrees, minutes, decimal seconds]
                    lonDproc = lonD.split(" "); //Split the lon variable based on space. This will create an array with format [degrees, minutes, decimal seconds]
                    if (latDproc[1] > 60 && lonDproc[1] > 60) { //Check if minutes are greater than 60. If they are, fire the alert below which presents the error to the user for correction
                        coordDialog.set("content", "<div class='alertmessageIP alertmessage'>Minute entries must be 0-60. Please enter a number between 0 and 60 for minutes.</div><br><b>Lat: </b>" + latDproc[0] + " <u style='color:red;'>" + latDproc[1] + "</u> " + latDproc[2] + "<br><br><b>Lon: </b>" + lonDproc[0] + " <u style='color:red;'>" + lonDproc[1] + "</u> " + lonDproc[2] + ok);
                        coordDialog.show();
                    } else if (latDproc[2] > 60 && lonDproc[2] > 60) { //Check if seconds are greater than 60. If they are, fire the alert below which presents the error to the user for correction
                        coordDialog.set("content", "<div class='alertmessageIP alertmessage'>Second entries must be 0-60. Please enter a number between 0 and 60 for seconds.</div><br><b>Lat: </b>" + latDproc[0] + " " + latDproc[1] + " <u style='color:red;'>" + latDproc[2] + "</u><br><b>Lon: </b>" + lonDproc[0] + " " + lonDproc[1] + " <u style='color:red;'>" + lonDproc[2] + "</u>" + ok);
                        coordDialog.show();
                    } else if (latDproc[1] > 60) { //Check if lat minutes are greater than 60. If they are, fire the alert below which presents the error to the user for correction
                        coordDialog.set("content", "<div class='alertmessageIP alertmessage'>Latitude minutes must be 0-60. Please enter a number between 0 and 60 for minutes.</div><br><b>Lat: </b>" + latDproc[0] + " <u style='color:red;'>" + latDproc[1] + "</u> " + latDproc[2] + ok);
                        coordDialog.show();
                    } else if (lonDproc[1] > 60) { //Check if lon minutes are greater than 60. If they are, fire the alert below which presents the error to the user for correction
                        coordDialog.set("content", "<div class='alertmessageIP alertmessage'>Longitude minutes must be 0-60. Please enter a number between 0 and 60 for minutes.</div><br><b>Lon: </b>" + lonDproc[0] + " <u style='color:red;'>" + lonDproc[1] + "</u> " + lonDproc[2] + ok);
                        coordDialog.show();
                    } else if (latDproc[2] > 60) { //Check if lat seconds are greater than 60. If they are, fire the alert below which presents the error to the user for correction
                        coordDialog.set("content", "<div class='alertmessageIP alertmessage'>Latitude seconds must be 0-60. Please enter a number between 0 and 60 for seconds.</div><br><b>Lat: </b>" + latDproc[0] + " " + latDproc[1] + " <u style='color:red;'>" + latDproc[2] + "</u>" + ok);
                        coordDialog.show();
                    } else if (lonDproc[2] > 60) { //Check if lon seconds are greater than 60. If they are, fire the alert below which presents the error to the user for correction
                        coordDialog.set("content", "<div class='alertmessageIP alertmessage'>Longitude minutes must be 0-60. Please enter a number between 0 and 60 for minutes.</div><br><b>Lon: </b>" + lonDproc[0] + " " + lonDproc[1] + " <u style='color:red;'>" + lonDproc[2] + "</u>" + ok);
                        coordDialog.show();
                    } else {
                        Dlat = parseFloat(latDproc[0]);
                        Dlon = parseFloat(lonDproc[0]);
                        Mlat = parseFloat(latDproc[1]);
                        Mlon = parseFloat(lonDproc[1]);
                        Slat = parseFloat(latDproc[2]);
                        Slon = parseFloat(lonDproc[2]);

                        latD = (((Slat / 60.0) + Mlat) / 60.0) + (Dlat);
                        lonD = (((Slon / 60.0) + Mlon) / 60.0) + (Dlon);

                        //Do something with your coordinates
                        SendCoordinatesToFunction(latD, lonD);
                    }
                } else {
                    coordDialog.set("content", "<div class='alertmessageIP alertmessage'>Please enter valid Latitude and Longitude values.<br><br>Examples:<br><br>	Lat: <u>39.27595</u><br>	Lon: <u>-108.547315</u><br>	or<br>Lat: <u>39</u> <u>25</u> <u>45.325</u><br>Lon: <u>-108</u> <u>28</u> <u>15.22</u><br><br>Separate Degrees Minutes and Seconds with a space.</div>" + ok);
                    coordDialog.show();
                }
            }
        }