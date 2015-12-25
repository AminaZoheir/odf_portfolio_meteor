if(Meteor.isClient){
  Template.project.rendered = function(){
    var instance = this;
    Meteor.defer(function(){
      $(instance.firstNode).addClass("animating");
    });
  };
  Template.project.helpers({
    photo: function(){
      return Images.findOne({_id: this.mainphoto}).url();
    },
    edit: function(){
      return Session.get('edit');
    },
    currproj: function(){
      return (this._id == Session.get('currproj'));
    },
    subCats: function(){
      if(Session.get('cat')){
       return getSubCategoryList(Session.get('cat'));
      }
      return getSubCategoryList('Interior');
    }
  }); 
  Template.project.events({
    'click .delete-proj': function(event){
      // Meteor.call("deleteProject", this._id);
      var projId = this._id;
      var imgs = Images.find({project: projId}).fetch();
      var news = News.find({projId:projId}).fetch();
      for (var i = imgs.length - 1; i >= 0; i--) {
        Images.remove(imgs[i]._id);
      };
      for (var i = news.length - 1; i >= 0; i--) {
        News.remove(news[i]._id);
        var newsImgs = Images.find({news: news[i]._id}).fetch();
        for (var i = newsImgs.length - 1; i >= 0; i--) {
          Images.remove(newsImgs[i]._id);
        };
      };

      Projects.remove(projId);
    },
    'click .edit-proj': function(event){
      Session.set('edit', true);
      Session.set('currproj', this._id);
    },
    'change .cat-admin': function(event){
      console.log("amina");
      Session.set('cat', event.target.value);
    }
  }); 

  function getSubCategoryList(category){
    for(var i = 0;i<categories.length;i++){
      if(categories[i].name == category)
        return categories[i].sub;
    }
  }
}
