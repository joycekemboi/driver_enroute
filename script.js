 var map;

      var route = [
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

      function initMap() {
        var cood = {lat: -1.300355, lng: 36.773850};
        var pos = 0;
        var image = {
            url: 'car1.svg',
        };
        map = new google.maps.Map(document.getElementById('map'), {
          center: route[pos],
          zoom: 16
        });
        var marker = new google.maps.Marker({
          position: cood,
          map: map,
          icon: image,
          animation: google.maps.Animation.DROP
        });
        var path = new google.maps.Polyline({
          path: route,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        path.setMap(map);

        setInterval(()=>{
            pos++;
            if(pos <= route.length - 1){
                changeMarkerPosition(marker,route[pos]);
            }

            map.panTo(new google.maps.LatLng(route[pos].lat,route[pos].lng));
        },3000);
      }
      function animatedMove(marker, t, current, moveto) {
        var lat = current.lat();
        var lng = current.lng();

        var deltalat = (moveto.lat() - current.lat()) / 400;
        var deltalng = (moveto.lng() - current.lng()) / 400;

        var delay = 10 * t;
        for (var i = 0; i < 400; i++) {
            (function(ind) {
            setTimeout(
                function() {
                var lat = marker.position.lat();
                var lng = marker.position.lng();
                lat += deltalat;
                lng += deltalng;
                latlng = new google.maps.LatLng(lat, lng);
                marker.setPosition(latlng);
                }, delay * ind
            );
            })(i)
        }
      }
      function changeMarkerPosition(marker,pstn) {
            var latlng = new google.maps.LatLng(pstn.lat,pstn.lng);
            animatedMove(marker,.5, marker.position,latlng);
            // marker.setPosition(latlng);

        }