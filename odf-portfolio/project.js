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
       Projects.remove({_id: this._id},function(err, res){
          console.log(err);
        });
    }
  }); 
}
