if(Meteor.isClient){
  Template.newsComponent.helpers({
    photo: function(){
      return Images.findOne({_id: this.mainphoto}).url();
    },
    shortdesc: function(){
      var desc = this.desc;
      if(desc.length > 200){
        return desc.substring(0, 200) + "..";
      }
      return desc;
    }
  });

  Template.newsComponent.events({
    'click .delete-news': function(event){
      // Meteor.call("deleteProject", this._id);
      var newsId = this._id;
      var imgs = Images.find({news: newsId}).fetch();
      for (var i = imgs.length - 1; i >= 0; i--) {
        Images.remove(imgs[i]._id);
      };

      News.remove(newsId);
    }
  });
}
