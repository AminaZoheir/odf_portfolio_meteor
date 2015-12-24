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
       // Projects.remove({_id: this._id},function(err, res){
       //    console.log(err);
       //  });
    }
  }); 
}
