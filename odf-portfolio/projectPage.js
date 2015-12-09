if(Meteor.isClient){
  Template.projectPage.helpers({
    photos: function(){
      return Images.find({project: this._id});
    }
  });
}
