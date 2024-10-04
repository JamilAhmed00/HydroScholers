
var mapBounds = new L.LatLngBounds(
    new L.LatLng(90, -180),
    new L.LatLng(-90, 180)
);

var map = L.map('map', {
    center: [20, 0],    // center and zoom are initial settings for when the map loads
    zoom: 2,
    minZoom: 1,
    maxZoom: 11,
    crs: L.CRS.EPSG4326,   // WGS84 projection (Web Mercator is EPSG3857)
    maxBounds: mapBounds   // confining the map to stay within these bounds
});


var basemapLight = L.tileLayer.wms('https://geoservice.dlr.de/eoc/basemap/wms',
    {layers: 'basemap,baseoverlay', 
attribution: 'Basemap and Baseoverlay: Data <a href="https://openstreetmap.org" target="_blank">&copy; OpenStreetMap contributors</a> and <a href="https://geoservice.dlr.de/web/about#basemaps" target="_blank">others</a>, Rendering &copy <a href="https://www.dlr.de/eoc" target="_blank">DLR/EOC</a>'}).addTo(map) 

var basemapDark = L.tileLayer.wms('https://geoservice.dlr.de/eoc/basemap/wms',
    {layers: 'eoc:world_relief_bw,baseoverlay,tm:tm_world_borders',
attribution: 'Relief: <a href="https://www.dlr.de/eoc" target="_blank">DLR/EOC</a> | Baseoverlay: Data <a href="https://openstreetmap.org" target="_blank">&copy; OpenStreetMap contributors</a> and <a href="https://geoservice.dlr.de/web/about#basemaps" target="_blank">others</a>, Rendering &copy <a href="https://www.dlr.de/eoc" target="_blank">DLR/EOC</a>'})

var basemapImage = L.tileLayer.wms('https://geoservice.dlr.de/eoc/basemap/wms',
    {layers: 'blue_marble,liteoverlay', 
attribution: 'Blue Marble NG: <a href="https://openstreetmap.org" target="_blank"> NASA Earth Observatory</a> | Liteoverlay: Data by <a href="naturalearthdata.com" target="_blank"> Natural Earth</a>, Rendering &copy <a href="https://www.dlr.de/eoc" target="_blank">DLR/EOC</a>'})

document.getElementById('basemaps').value = 'Light';


function setBasemap() {
    let option = document.getElementById('basemaps').value;
    if (option == 'Light') {
        map.setMaxZoom(11);
        basemapImage.removeFrom(map);
        basemapDark.removeFrom(map);
        basemapLight.addTo(map);
    } else if (option == 'Dark') {
        map.setMaxZoom(11);
        basemapImage.removeFrom(map);
        basemapLight.removeFrom(map);
        basemapDark.addTo(map);
    } else {
        map.setMaxZoom(8);
        basemapLight.removeFrom(map);
        basemapDark.removeFrom(map);
        basemapImage.addTo(map);
   }
}
// links dropdown menu to setBasemap function
document.getElementById('basemaps').onchange = setBasemap



function animation() {
    document.getElementById("overlays").style.display = "none";
    document.getElementById("animation").style.display = "grid";
    document.getElementsByClassName('toggle')[0].style.display = "flex";
    document.getElementById("tab1").style.backgroundColor = "#ffffff";
    document.getElementById("tab2").style.backgroundColor = "#b3b1a6";
    document.getElementById("tab2").style.borderRight = "2px solid #888888";
}
function overlays() {
    document.getElementById("overlays").style.display = "grid";
    document.getElementById("animation").style.display = "none";
    document.getElementsByClassName("toggle")[0].style.display = "none";
    document.getElementById("tab1").style.backgroundColor = "#b3b1a6";
    document.getElementById("tab2").style.backgroundColor = "#ffffff";
    document.getElementById("tab2").style.borderRight = "none";
}



document.getElementById('monthly').checked = false;
document.getElementById("logscale").checked = false;
// 'disabling' the play button and slider until a range has been selected
document.getElementById('play').style.opacity = 0.6;
document.getElementById("slider").style.opacity = 0.6;
document.getElementById("slider").disabled = true;

//document.getElementById('StreamFlow').checked = false;
//document.getElementById('StreamFlow_slider').disabled = true;



var urlPrefix = "static/globalImages/monthly/SMI/";

/*getting the date of 5 days back from today*/
var today = new Date();
today.setDate(today.getDate() - 5);
var fiveDayBack = moment(today).format("DD-MMMM-YYYY");

document.getElementById("imageLabel").innerHTML = 'January-1900'; //to have a fixed date, the map-label will not change dynamically everyday

map.on('click', displayDygraph)
  
var overlayBounds = new L.LatLngBounds(
    new L.LatLng(84, -180),
    new L.LatLng(-56, 180));

/////////////////////// fiveDayBack
var SMI_Overlay = new L.ImageOverlay(urlPrefix + 'SMI-January-1900.png',
    overlayBounds, {
        opacity: 0.7,
        interactive: true,
}).addTo(map);


// Arrays storing values for the various overlay variables
var indices = {'SMI': 0};   // variable name : its index in the following arrays ; with StreamFlow: {'SMI': 0, 'StreamFlow': 1}
var imageOverlays = [SMI_Overlay];   // actual leaflet overlays ; with StreamFlow: [SMI_Overlay, StreamFlow_Overlay]
var prefixes = ['SMI-']; // prefixes of images in globalImages folder
var displayed = new Set();   // overlays that are being displayed at a given point
displayed.add(0);   // starts with SMI (index 0) being displayed



// create functions to toggle visibility of overlays
toggleSMI = toggleOverlay.bind(null, 'SMI');
//toggleStreamFlow = toggleOverlay.bind(null, 'StreamFlow');


// Toggles visibility of a given overlay variable
function toggleOverlay(variable) {
    // retrieve overlay and transparency slider
    let overlay = imageOverlays[indices[variable]];
    let opacity = document.getElementById(variable+"_slider");

    // enable overlay
    if (document.getElementById(variable).checked) {
        overlay.addTo(map);
        opacity.disabled = false;
        displayed.add(indices[variable]);

        opacity.oninput = function() {
            overlay.setOpacity(this.value / 10);
        }
    } else { // disable overlay
        overlay.removeFrom(map)
        opacity.disabled = true;
        displayed.delete(indices[variable]);
    }
}



// Set SMI to be displayed on load
document.getElementById("SMI_slider").style.display = "block"
document.getElementById("SMI_slider").onclick = function () {
    SMI_Overlay.setOpacity(this.value / 10);
}



// toggle whether day selector is visible based on value of daily/monthly toggle
document.getElementById('monthly').onchange = toggleDays
function toggleDays() {
    if (document.getElementById('monthly').checked) {
        document.getElementById('start_day').style.display = 'none';
        document.getElementById('end_day').style.display = 'none';
    } else {
        document.getElementById('start_day').style.display = 'inline-block';
        document.getElementById('end_day').style.display = 'inline-block';
    }
}



// popup button at the bottom-left of the screen which shows the attribution
function infoPopup() {
    let popup = document.getElementById("infoPopupText");
    popup.classList.toggle("show");
}


function instructionsPopup() {
    let popup = document.getElementById("instructionsPopupText");
    //popup.classList.toggle("show");
    popup.style.display = 'block'
}





function generateTimeValues() {

    // validateRange(), located in timePickers.js, verifies that start date is before end date
    let dates = validateRange();
    if (!dates) 
        alert("The Start Date must be before the End Date. Please change the date and try again.");

    // else, input is valid
    else {
        // creates an array 'timeValues' based on start-date and end-date
        if (document.getElementById('monthly').checked) {   // monthly
            var itr = moment.twix(dates[0], dates[1]).iterate("months");
            var formatStr = "MMMM-YYYY";
        }
        else {    // daily
            var itr = moment.twix(dates[0], dates[1]).iterate("days");
            var formatStr = "DD-MMMM-YYYY";
        }

        var timeValues = [];
        while (itr.hasNext()) {
            timeValues.push(itr.next().format(formatStr));
        }
        console.log(timeValues);
        return timeValues;
    }
}


/* Called when user presses 'Update' button. Validates user-inputted dates, gets 
   array of time values requested by user, and generates any PNGs that don't exist yet.
   Then calls playAnimation(). */

var timeValues;   // global because accessed in setUpAnimation and playAnimation

function setUpAnimation() { 

    if (document.getElementById('monthly').checked) 
        urlPrefix = "static/globalImages/monthly/SMI/";
    else 
        urlPrefix = "static/globalImages/daily/SMI/";

    // creates the desired range of values based on user input for the start-date and end-date
    timeValues = generateTimeValues();
    // prevent from submission if end date precedes start date
    if (!timeValues) return false;  

    
    playAnimation()
}


function playAnimation() {  
    var slider = document.getElementById('slider');
    var imageLabel = document.getElementById('imageLabel');
    
    // enable play button
    document.getElementById('play').style.opacity = 1;
    document.getElementById('play').style.cursor = 'pointer';
    document.getElementById("slider").disabled = false;
    document.getElementById("slider").style.opacity = 1;
    
    // sets the maximum value of the slider using the length of the 'timeValues' array
    slider.max = "" + timeValues.length + "";

    document.getElementById('loadingMsg').style.display = 'none';  // remove 'Loading' message

    // sets initial image and label and moves slider to its start point
    imageLabel.innerHTML = timeValues[0];
    updateDisplay(0);
    slider.value = 1;

    play();   // play animation  
    toggleStartPause();    // toggle start/pause button display

    
    var playTimeOut;

    function play() {
        playTimeOut = setTimeout(function () {
            var val = slider.value;
            console.log(val);

            // if the 'slider thumb' reaches at the end of the slider, stops it
            if (val == slider.max) {
                clearTimeout(playTimeOut);
                toggleStartPause();
                
            } else {
                // change slider value, image label, overlay image url
                slider.value = Number(val) + 1;
                updateDisplay(Number(val));
                imageLabel.innerHTML = timeValues[Number(val)];
                play();
            }

        }, 1000);
    }

    slider.oninput = function () {
        updateDisplay(this.value - 1);
        imageLabel.innerHTML = timeValues[this.value - 1];
    };

    // calls the play() function when the play button is clicked
    document.getElementById('play').onclick = function () {

        if (slider.value == slider.max) {
            slider.value = 1;
            updateDisplay(0);
            imageLabel.innerHTML = timeValues[0];
        }

        // otherwise, plays starting from slider's current location
        play();
        toggleStartPause();
    };

    // links pause button to clearTimeout() to 'pause' the animation
    document.getElementById('pause').onclick = function () {
        clearTimeout(playTimeOut);
        toggleStartPause();
    };

}

function updateDisplay(timeIndex) {
    // loop through all variables that are displayed right now
    for (let index of displayed) {
        // reset its overlay's url to the new time
        let path = urlPrefix + prefixes[index] + timeValues[timeIndex]
        imageOverlays[index].setUrl(path + '.png');
    }
}

// Toggles start/pause button between its two images
function toggleStartPause() {
    pauseImg = document.getElementById('pause');
    playImg = document.getElementById('play');
    if (pauseImg.style.display === "block"){
        pauseImg.style.display = "none";
        playImg.style.display = "block";
    } else {
        playImg.style.display = "none";
        pauseImg.style.display = "block";
    }
}



var marker;  // marker for the location the user clicked
var g;
function displayDygraph(e) {

    // check that clicked point is within the bounds of the netCDF file
    if (!overlayBounds.contains(e.latlng)) {
        alert('Please click a point with latitude between -56 and 84 and longitude between -180 and 180.')
        return
    }

    // clears any previous marker and displays marker on clicked location
    if (marker) marker.removeFrom(map);
    marker = L.marker(e.latlng).addTo(map);

    // pans map to put marker in screen center
    map.panTo(e.latlng, {duration: 2});


    // sends http request to createCSV with lat and lng of click to generate time series graph
    fetch('/createCSV?lat='+e.latlng.lat+'&lon='+e.latlng.lng, {method: "GET"})
    .then(async response => {

        // gets csv file returned from /createCSV 
        let csv = await response.text();

        let graphContainer = document.getElementsByClassName('graph')[0];
        graphContainer.style.display = "block";

        // To close the graph when the x is clicked
        document.getElementById("graphX").onclick = function () {
            graphContainer.style.display = "none";
            marker.removeFrom(map); // removes marker from map
        };

        let lat = Math.round((parseFloat(e.latlng.lat) - 0.125) * 4);
        let lon = Math.round((parseFloat(e.latlng.lng) - 0.125) * 4);
        lat = (lat / 4) + 0.125;
        lon = (lon / 4) + 0.125;

        document.getElementById("latlng").value = lat + "," + lon; // stores lat/lon in html field
     
        colors = ['#FFFF00', '#FCD37F', '#FFAA00', '#E60000', '#730000', '#000000'];
        g = new Dygraph(
            document.getElementById("graphImage"), csv, {
            title: 'SMI for [' + lat + ', ' + lon + ']',
            
            logscale: document.getElementById("logscale").checked,
            legend: 'never',
            colors: colors,
            ylabel: 'Soil Moisture Index',
            drawGrid: true,
            fillGraph: true,
            series: {
                SMI: {
                    fillGraph: false,
                },
                Moderate: {
                    fillAlpha: 1,
                }
            },
            showRangeSelector: true,
            interactionModel: Dygraph.defaultInteractionModel,
            highlightCircleSize: 3,
            plugins: [Dygraph.Plugins.Unzoom],

            axisLabelFontSize: 12,
            axes: {
                y: {
                    valueFormatter: function (v_1) {
                        return v_1.toPrecision(2); // formatting of decimal places in the legend
                    },
                    axisLabelFormatter: function (v_3) {
                        return v_3.toPrecision(1); // formatting of decimal places in y-axis labels
                    }
                },
                x: { pixelsPerLabel: 50 }
            }
        }
        );
    });
    document.getElementById('moveGraph').onmousedown = mouseClick;
}


// Toggles dygraph y axis between log scale and linear scale
function logscale() {
    if (document.getElementById("logscale").checked) 
        g.updateOptions({logscale: true});
    else
        g.updateOptions({logscale: false});
}
// Inside globalDM.js

// Existing code...



// More existing code...


function mouseClick(e) {
    e.preventDefault()
    document.onmousemove = moveGraph;
    document.onmouseup = stopDragging;

    var graphObj = document.getElementById("timeGraph");
    var initialMouseX = e.clientX;
    var initialMouseY = e.clientY;

    if (!graphObj.style.right) {
        rightString = "0px";
    } else {
        rightString = graphObj.style.right;
    }

    if (!graphObj.style.bottom) {
        bottomString = "0px";
    } else {
        bottomString = graphObj.style.bottom;
    }
    if (!graphObj.style.left) {
        leftString = "0px";
    } else {
        leftString = graphObj.style.left;
    }
    if (!graphObj.style.top) {
        topString = "0px";
    } else {
        topString = graphObj.style.top;
    }

    var initialImageRight = parseInt(rightString);
    var initialImageBottom = parseInt(bottomString);

    function moveGraph(e) {
        var distX = initialMouseX - e.clientX;
        var distY = initialMouseY - e.clientY;

        // prevent from going off screen
        if (initialImageRight + distX < 0)
            graphObj.style.right = 0;
        else if (initialImageRight + distX > window.innerWidth - 500) {
            graphObj.style.right = window.innerWidth - graphObj.style.width;
        }
        else
            graphObj.style.right = (initialImageRight + distX) + "px";

        if (initialImageBottom + distY < 0) 
            graphObj.style.bottom = 0;
        else if (initialImageBottom + distY > window.innerHeight - 500) 
            graphObj.style.bottom = calc(.9*window.innerHeight - graphObj.style.height);
        else
            graphObj.style.bottom = (initialImageBottom + distY) + "px"; 
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

