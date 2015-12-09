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
    }
  });
}
