if(Meteor.isClient){
  Template.contact.rendered = function(){
    Meteor.call('getInfo', function(err, res){
      if(res){
        console.log(res);
        Session.set('info',res);
        Session.set('country', res.contacts[0]);
        createMap(res.contacts[0].address);
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
            return 'phone';
        case 'Fax':
            return 'fax';
        default:
          return 'at';
        }
    },
    isEmail: function(type){
      return type == 'E-mail';
    },
    photo: function(){
      return Images.findOne({contact: true}).url();
    },
    currCountry: function(){
      return Session.get('country');
    },
    isCurrCountry: function(country){
      return (country == Session.get('country').country);
    }
  });
  Template.contact.events({
    'click .country-tab': function(event){
      var found = Session.get('info').contacts.filter(function(item) { return item.country === event.target.innerHTML; });
      Session.set('country',found[0]);
      createMap(found[0].address);
      $('#left-div-wrapper').hide();
      // $('#map-wrapper').show("slide", { direction: "left" }, 1000);
      $('#left-div-wrapper').slideDown("slow");
    }
  });
  function createMap(address){
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: -34.397, lng: 150.644}
    });
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          width: 350 // zy fl .css file
        });
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}
