if(Meteor.isClient){
  Template.contact.rendered = function(){
    Meteor.call('getInfo', function(err, res){
      if(res){
        console.log(res);
        Session.set('info',res);
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: {lat: -34.397, lng: 150.644}
        });
        var geocoder = new google.maps.Geocoder();
        var address = Session.get('info').address;
        console.log(address);
        console.log(Session.get('info'));
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
      }
    });
  };
  Template.contact.helpers({
    info: function(){
      return Session.get('info');
    },
    getPhoneType: function(type){
      switch(type) {
        case 'Mobile':
            return 'mobile-phone';
        case 'Phone':
            return 'phone-square';
        case 'Fax':
            return 'fax';
        default:
          return 'at';
    }
    }
  });
}
