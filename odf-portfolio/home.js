if(Meteor.isClient){
  Template.home.helpers({
    project: function(){
      return Projects.findOne({ishome: true});
    },
    photo: function(){
      return Images.findOne({project: Projects.findOne({ishome: true})._id}).url();
    },
    projects: function(){
      return Projects.find({ishome: true});
    },
    notEqual: function(id1, id2){
      return id1 != id2;
    }
  });
}
