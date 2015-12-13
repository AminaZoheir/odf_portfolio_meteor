if(Meteor.isClient){
  Template.newsPage.helpers({
    photo: function(){
      return Images.findOne({_id: this.mainphoto}).url();
    }
  });
}
