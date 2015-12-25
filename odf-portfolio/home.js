if(Meteor.isClient){
  Template.home.helpers({
    projects: function(){
      return Projects.find({ishome: true});
    },
    First: function(index){
      return index == 0;
    }
  });
	Template.home.rendered = function () {
		this.$('#home-carousel').carousel();
	};
}
