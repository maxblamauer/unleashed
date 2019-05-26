var map;

function loadMapScenario() 
{
    map = new Microsoft.Maps.Map('#myMap', {
        credentials: key = 'AqWKTJKey8mvN99G6UVfxapnC5zFx4k_9AXpdmnLHUpwe0bqO2g7SywJpRcbPxGM'
    });

    //Request the user's location
    navigator.geolocation.getCurrentPosition(function (position) {
    var loc = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude);
        //Add a pushpin at the user's location.
        var pin = new Microsoft.Maps.Pushpin(loc, {
            icon: 'currentPos.png'
        });
        map.entities.push(pin);
        //Center the map on the user's location.
        map.setView({ center: loc, zoom: 15 });
    });

    renderPins(map, '');
}

function pushpinClicked(e) 
{
    //Make sure the infobox has metadata to display.
    if (e.target.metadata) 
    {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions(
            {
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        }); 
    }
} // end of load map scenario

function clearMap(map) 
{
    for (var i = map.entities.getLength() - 1; i >= 0; i--) {
        var pushpin = map.entities.get(i);
        if (pushpin instanceof Microsoft.Maps.Pushpin) {
            map.entities.removeAt(i);
        }
    }
}


function renderPins(map, filter) 
{
    clearMap(map);

    $.getJSON('burlington_parks.json').then(function(response) {

        for (var i = 0; i < response.features.length; i++)
        {
            var feature = response.features[i];
            var long = feature.geometry.rings[0][0][0];
            var lat = feature.geometry.rings[0][0][1];
            var name = feature.attributes.PARKNAME;
            var address = feature.attributes.ADDRESS;

            if (filter === 'hike' && feature.attributes.TYPE.indexOf('hike') === -1) {
                continue;
            }
            if (filter === 'dog' && feature.attributes.TYPE.indexOf('dog') === -1) {
                continue;
            }
            if (filter === 'plaground' && feature.attributes.TYPE.indexOf('playground') === -1) {
                continue;
            }

            var loc = new Microsoft.Maps.Location(
                lat,
                long);
            //Create an infobox at the center of the map but don't show it.
            infobox = new Microsoft.Maps.Infobox(loc, {
                visible: false
            });

            infobox.setMap(map);
            
            //Add a pushpin at the user's location.
            var pin = new Microsoft.Maps.Pushpin(loc);
            pin.metadata = {
                title: name,
                description: address
            }
            //Add a click event handler to the pushpin.
            Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);
            map.entities.push(pin);  
        }
    });
}

function hike()
{
    renderPins(map, 'hike');
}

function dog()
{
    renderPins(map, 'dog');
}

function playground()
{
    renderPins(map, 'playground');
}


function removeImages() {

    var width = document.body.clientWidth;

    if (width < 614)
    {
        $("#hikeImg").hide();
        $("#dogImg").hide();
        $("#parkImg").hide();

    }
    if (width > 614)
    {
        $("#hikeImg").show();
        $("#dogImg").show();
        $("#parkImg").show();

    }

}
$(window).resize(removeImages);    
$(document).ready(removeImages);

var news_id = null; // set news id to null

// function to getNews
function getNews() 
{
    // using AJAX to get the news from "getNews.php"
    $.get("getNews.php", { news_id: news_id }, function (data) 
    { 
        // Fill the table
        var rows = '';
        for(var i = 0; i < data.length; i++)
        {
            rows += "<tr><td>" + data[i].tweet + "</td></tr>\n";
        }
        $('tbody').append(rows);

        // Set news_id to the highest value
        var largestNumber = null; // set largest number to null
        for(var j = 0; j < data.length; j++)
        {
            // VALIDAE the largest number IS the largest number
            if (largestNumber == null || parseInt(data[j].news_id) > largestNumber) 
            {
                largestNumber = parseInt(data[j].news_id);
            }
        }

        // VALIDATES that the largest number is not 0
        if (largestNumber != null) 
        {
            news_id = largestNumber;
        }
    });

    setTimeout(getNews, 3000); // gets new news every three seconds


}
document.addEventListener('DOMContentLoaded', function()
{
    getNews(); 


    
});
