if(Meteor.isClient){
  Template.newsComponent.helpers({
    photo: function(){
      return Images.findOne({news: this._id}).url();
    }
  });
}