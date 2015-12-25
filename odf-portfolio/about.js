if(Meteor.isClient){
  Template.about.helpers({
    info: function(){
      Meteor.call('getInfo',function(err, res){
        Session.set('info',res);
      });
      return Session.get('info');
    },
    photo: function(){
      return Images.findOne({info: Session.get('info')._id}).url();
    },
    sketches: function(){
      return Images.find({about: true});
    },
    First: function(index){
      return index == 0;
    }
  });
  Template.about.rendered = function () {
    this.$('#about-carousel').carousel();
  };
}
