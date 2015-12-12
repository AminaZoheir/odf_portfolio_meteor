if(Meteor.isClient){
  Template.newsComponent.helpers({
    photo: function(){
      return Images.findOne({_id: this.mainphoto}).url();
    }
  });
}