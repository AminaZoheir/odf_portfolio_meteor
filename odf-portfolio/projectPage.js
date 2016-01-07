if(Meteor.isClient){
  Template.projectPage.helpers({
    photos: function(){
      return Images.find({project: this._id});
    },
    ishome: function(){
      var project = Projects.findOne({_id: this.project});
      return(project.mainphoto == this._id);
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
    },
    'click .delete-img': function(event){
      if (confirm('Are you sure?')) {
        Images.remove(this._id);
       } else {
           return false;
       }
    },
    'change .change-main': function(event, template){
      var selectedPhoto = template.find('input:radio[name=ismain]:checked').value;
      var project = Projects.findOne({_id: this.project});
      Projects.update(project._id,{
        $set: {mainphoto: selectedPhoto}
      });
    },
    'change .proj-align': function(event, template){
      var align = template.find('input:radio[name=proj-align]:checked').value;
      // var project = Projects.findOne({_id: this.project});
      var desc = this.desc.text;
      Projects.update(this._id,{
        $set: {desc:{text: desc, align: align}}
      });
    }
  });
}
