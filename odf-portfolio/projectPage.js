if(Meteor.isClient){
  Template.projectPage.helpers({
    photos: function(){
      return Images.find({project: this._id});

    //   for(var i = 0; i<objects.length; i++) {
    //     objects[i].index = i;
    //     console.log(index);
    // }

    // return objects;
    //   return _.map(self.array, function(value, index){
    // 		return {value: value, index: index};
  		// });
    },
    First: function(index){
      return index == 0;
    }
  });

  Template.projectPage.events({
    'click .proj-video': function(event){
      var video = event.target;
      if (video.paused == true) {
        video.play();
        var play = $(video).siblings('.proj-play');
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
        var play = $(video).siblings('.proj-play');
        var pause = $(video).siblings('.proj-pause');
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
    'ended .proj-video':function(event){
      var video = event.target;
        var play = $(video).siblings('.proj-play');
        $(play).fadeIn("slow");
    }
  });
}
