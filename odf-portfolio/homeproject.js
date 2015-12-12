if(Meteor.isClient){
  Template.homeproject.helpers({
    photo: function(){
      return Images.findOne({_id: this.mainphoto}).url();
    }
  });
}
