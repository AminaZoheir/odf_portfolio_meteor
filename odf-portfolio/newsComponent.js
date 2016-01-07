if(Meteor.isClient){
  Template.newsComponent.helpers({
    photo: function(){
      return Images.findOne({_id: this.mainphoto});
    },
    shortdesc: function(){
      var desc = this.desc.text;
      if(desc.length > 200){
        return desc.substring(0, 200) + "..";
      }
      return desc;
    },
    
  });

  Template.newsComponent.events({
    'click .delete-news': function(event){
      if (confirm('Are you sure?')) {
           // Meteor.call("deleteProject", this._id);
        var newsId = this._id;
        var imgs = Images.find({news: newsId}).fetch();
        for (var i = imgs.length - 1; i >= 0; i--) {
          Images.remove(imgs[i]._id);
        };

        News.remove(newsId);
       } else {
           return false;
       }
    },
    'click .edit-news': function(event){
      Session.set('edit-news', true);
      Session.set('currnews', this._id);
      Session.set('cat-news', this.category);
      Session.set('subcat-news', this.subcategory);
      Session.set('country-news', this.country);
      Session.set('project-news', this.projId);
    }
  });
}
