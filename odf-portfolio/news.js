if(Meteor.isClient){
  Template.news.helpers({
    news: function(){
      return News.find({}, {sort: {createdAt: -1}});
    }
  });
}
