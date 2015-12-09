if(Meteor.isClient){
  Template.subCategory.rendered = function(){
    var instance = this;
    Meteor.defer(function() {
      $(instance.firstNode).addClass("animating"); //use "instance" instead of "this"
    });
  };
}
