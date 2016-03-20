if(Meteor.isClient){
  Template.projectPage.helpers({
    photos: function(){
      return Images.find({project: this._id}, {sort: {indexInProj: 1}});
    },
    ishome: function(){
      console.log(this);
      var project = Projects.findOne({_id: this.project});
      return(project.mainphoto == this._id);
    },
    isAlign: function(align){
      return(this.desc.align == align);
    },
    user: function(){
      if(Meteor.userId()){
        return true;
      }else{
        return false;
      }
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
      }else{
        video.pause();
        var play = $(video).siblings('.proj-play');
        var pause = $(video).siblings('.proj-pause');
        // play.attr('visible', true);
        $(pause).fadeIn("slow", function(){
          $(pause).fadeOut("slow");
          $(play).fadeIn("slow");
        });
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
    },
    'click .change-orient': function(event, template){
      if(this.portrait){
        Images.update(this._id,{
          $set: {portrait: false}
        });
      }else{ 
        Images.update(this._id,{
          $set: {portrait: true}
        });
      }
    },
    'keyup .index-form': function(event, template){
      console.log("Amina");
      console.log(this);
      Images.update(this._id,{
        $set: {indexInProj: event.target.value}
      });
    }
  });
}
