if(Meteor.isClient){
  Template.contact.rendered = function(){
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: -34.397, lng: 150.644}
    });
    var geocoder = new google.maps.Geocoder();
    var address = '8 Dr. Hegazy Street, Agouza, Giza, Egypt';
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          width: 300 // zy fl .css file
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };
}
