  var map, marker;
// var startPos = [42.42679066670903, -83.29210638999939];
var startPos = [-1.300355, 36.773850];

var speed = 300; // km/h
var rotation = 0;
var delay = 5;


var coordinates = [
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


        ];


function animateMarker(marker, coords, km_h)
{
    //// console.log(marker.icon);
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

        var next = target + 1;
        var endLat = coords[next][0];
        var endLong = coords[next][1];


// console.log()

        var heading = google.maps.geometry.spherical.computeHeading(dest, marker.position);

        
var car = "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z";
// var icon = {
//   path: car,
        marker.setIcon({
            path: car,
            strokeColor: 'rgb(26, 127, 195)',
            strokeWeight: 3,
            scale: 0.6,
            rotation: google.maps.geometry.spherical.computeHeading(dest, marker.position)
          })


// }
        
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
               // console.log(lng);
                //// console.log(step);
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
  
    // 


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
        map: map
    });
    //// console.log(marker.position);
    google.maps.event.addListenerOnce(map, 'idle', function()
    {
        animateMarker(marker, coordinates, speed);
    });
}

initialize();