if(Meteor.isClient){
  Template.home.helpers({
    projects: function(){
      return Projects.find({ishome: true});
    },
    First: function(index){
      return index == 1;
    }
  });
}
