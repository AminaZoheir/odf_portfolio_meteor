if(Meteor.isClient){
  Template.newsPage.helpers({
    photos: function(){
      return Images.find({news: this._id});
    },
    ishome: function(){
      var news = News.findOne({_id: this.news});
      return(news.mainphoto == this._id);
    }
  });

  Template.newsPage.events({
    'click .news-video': function(event){
      var video = event.target;
      if (video.paused == true) {
        video.play();
        var play = $(video).siblings('.news-play');
        // play.attr('visible', true);
        $(play).fadeIn("slow", function(){
          $(play).fadeOut("slow");
        });
       //  setTimeout(function(){
       //    var play = $(video).siblings('.proj-play');
       //  play.attr('visible', false);
       // },1000);
        // var pause = $(video).siblings('.proj-pause');
        // pause.attr('visible', false);
      }else{
        video.pause();
        var play = $(video).siblings('.news-play');
        var pause = $(video).siblings('.news-pause');
        // play.attr('visible', true);
        $(pause).fadeIn("slow", function(){
          $(pause).fadeOut("slow");
          $(play).fadeIn("slow");
        });
        // var pause = $(video).siblings('.proj-pause');
        // pause.attr('visible', true);
        // var play = $(video).siblings('.proj-play');
        // play.attr('visible', false);
      }
    },
    'ended .news-video':function(event){
      var video = event.target;
        var play = $(video).siblings('.news-play');
        $(play).fadeIn("slow");
    },
    'click .delete-news-img': function(event){
      if (confirm('Are you sure?')) {
        Images.remove(this._id);
       } else {
           return false;
       }
    },
    'change .change-main-news': function(event, template){
      var selectedPhoto = template.find('input:radio[name=ismain]:checked').value;
      var news = News.findOne({_id: this.news});
      News.update(news._id,{
        $set: {mainphoto: selectedPhoto}
      });
    }
  });
}
