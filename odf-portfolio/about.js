if(Meteor.isClient){
  Template.about.helpers({
    info: function(){
      Meteor.call('getInfo',function(err, res){
        Session.set('info',res);
      });
      return Session.get('info');
    }
  });
}
