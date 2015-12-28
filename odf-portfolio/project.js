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
    }
  }); 
  Template.project.events({
    'click .delete-proj': function(event){
      if (confirm('Are you sure?')) {
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
       } else {
           return false;
       }
    },
    'click .edit-proj': function(event){
      Session.set('edit', true);
      Session.set('currproj', this._id);
      Session.set('cat', this.category);
      Session.set('subcat', this.subcategory);
      Session.set('country', this.country);
    }
  }); 


  // Template.portfolio.rendered = function () {
    
  // };
}
