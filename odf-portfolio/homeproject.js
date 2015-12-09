if(Meteor.isClient){
  Template.homeproject.helpers({
    photo: function(){
      return Images.findOne({project: this._id}).url();
    }
  });
}
