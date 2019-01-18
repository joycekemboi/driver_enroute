  var map, marker;
// var startPos = [42.42679066670903, -83.29210638999939];
var startPos = [-1.300355, 36.773850];

var speed = 200; // km/h
var rotation = 0;
var delay = 10;


function animateMarker(marker, coords, km_h)
{
    // console.log(marker.icon);
    // marker.icon.rotation = rotation;



    var target = 0;
    var km_h = km_h || 50;
    coords.push([startPos[0], startPos[1]]);
    
    function goToPoint()
    {
        var lat = marker.position.lat();
        var lng = marker.position.lng();
        var step = (km_h * 1000 * delay) / 3600000; // in meters
        
        var dest = new google.maps.LatLng(
        coords[target][0], coords[target][1]);
        
        var distance =
        google.maps.geometry.spherical.computeDistanceBetween(
        dest, marker.position); // in meters


        var numStep = distance / step;

        var i = 0;
        var deltaLat = (coords[target][0] - lat) / numStep;
        var deltaLng = (coords[target][1] - lng) / numStep;

// console.log(lat);

            if(lat == -1.300355 || lat == -1.300184 || lat == -1.296193 || lat == -1.294048 ){
             url = 'car2.svg';
            }else if(lat == -1.299840 || lat == -1.298982 || lat == -1.297459 || lat == -1.296215 || lat == -1.293973 || lat == -1.293973 || lat == -1.292622){
             url = 'car4.svg';
            }else if(lat == -1.294252){
                url = 'car5.svg';

            }else{
                url = 'car3.svg';
            }
    // //     // console.log(coords[target][0]);
    marker.icon.url = url;

    // console.log(marker.icon.rotation)

        
        function moveMarker()
        {
            lat += deltaLat;
            lng += deltaLng;
            i += step;


            if (i < distance)
            {
                marker.setPosition(new google.maps.LatLng(lat, lng));
                setTimeout(moveMarker, delay);

            }
            else
            {   marker.setPosition(dest);
                target++;
                if (target == coords.length){ target = 0; }
                
                setTimeout(goToPoint, delay);
            }
        }
        moveMarker();
    }
    goToPoint();
}

function initialize()
{
    var myOptions = {
        zoom: 16,
        // center: new google.maps.LatLng(42.425175091823974, -83.2943058013916),
        center: new google.maps.LatLng(-1.296151, 36.777637),

        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  
    var icon = {
          url: 'car2.svg',
          size: new google.maps.Size(30, 32),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 1)
        };


    var flightPlanCoordinates = [
        {lat:-1.300355, lng:36.773850},
        {lat:-1.300184, lng:36.776811},
        {lat:-1.299840, lng:36.779386},
        {lat:-1.298897, lng:36.779407},
        {lat:-1.299004, lng:36.777841},
        {lat:-1.298982, lng:36.776811},
        {lat:-1.297459, lng:36.776747},
        {lat:-1.296193, lng:36.776726},
        {lat:-1.296097, lng:36.779236},
        {lat:-1.296151, lng:36.777637},
        {lat:-1.296215, lng:36.776693},
        {lat:-1.294252, lng:36.776586},
        {lat:-1.294048, lng:36.776790},
        {lat:-1.293973, lng:36.779118},
        {lat:-1.292622, lng:36.779075},
        {lat:-1.291844, lng:36.779049},
        {lat:-1.291879, lng:36.778389}
        ];
        var flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        flightPath.setMap(map);
    
    
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(startPos[0], startPos[1]),
        map: map,
        icon: icon
    });
    // console.log(marker.position);
    google.maps.event.addListenerOnce(map, 'idle', function()
    {
        animateMarker(marker, [
            // The coordinates of each point you want the marker to go to.
            // You don't need to specify the starting position again.
            [-1.300355, 36.773850], 
            [-1.300184, 36.776811], 
            [-1.299840, 36.779386], 
            [-1.298897, 36.779407], 
            [-1.299004, 36.777841], 
            [-1.298982, 36.776811], 
            [-1.297459, 36.776747], 
            [-1.296193, 36.776726], 
            [-1.296097, 36.779236], 
            [-1.296151, 36.777637],
            [-1.296215, 36.776693], 
            [-1.294252, 36.776586], 
            [-1.294048, 36.776790],
            [-1.293973, 36.779118], 
            [-1.292622, 36.779075], 
            [-1.291844, 36.779049], 
            [-1.291879, 36.778389]


        ], speed);
    });
}

initialize();