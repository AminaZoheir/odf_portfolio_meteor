if(Meteor.isClient){
  Template.newsPage.helpers({
    photos: function(){
    	console.log(Images.find({news: this._id}));
      return Images.find({news: this._id});
    },
    First: function(index){
      return index == 0;
    }
  });
}
