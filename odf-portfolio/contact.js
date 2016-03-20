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
    },
    'click .delete-country': function(event){
      var r = confirm("Are you sure you want to delete ?");
      if(r == true){
        var info = Session.get('info');
        var countryObj = info.contacts[event.target.getAttribute('country-index')];
        info.contacts.splice(info.contacts.indexOf(countryObj),1);
        Session.set('info',info);
        if(Session.get('country').country == countryObj.country){
          Session.set('country',info.contacts[0]);
        }
        Info.update(info._id,{
          $set:{
            contacts: info.contacts
          }
        });
      }
    },
    'click .delete-phone': function(event){
      var r = confirm("Are you sure you want to delete ?");
      if(r == true){
        var info = Session.get('info');
        var currCountry = Session.get('country');
        var index = 0;
        for(var i = 0;i<info.contacts.length;i++){
          if(info.contacts[i].country == currCountry.country){
            index = i;
            break;
          }
        }
        var phoneObj = currCountry.phones[event.target.getAttribute('phone-index')];
        currCountry.phones.splice(currCountry.phones.indexOf(phoneObj),1);
        Session.set('country',currCountry);
        info.contacts[index] = currCountry;
        Session.set('info',info);
        Info.update(info._id,{
          $set:{
            contacts: info.contacts
          }
        });
      }
    }
  });
  function createMap(address){
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: -34.397, lng: 150.644},
      key: "AIzaSyBhLWFmDj0B-mTrW5FqBOTZM3awnpFO5lU"
    });
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address, key: "AIzaSyBhLWFmDj0B-mTrW5FqBOTZM3awnpFO5lU"}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          width: 350 // zy fl .css file
          // key: "AIzaSyBhLWFmDj0B-mTrW5FqBOTZM3awnpFO5lU"
        });
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}
