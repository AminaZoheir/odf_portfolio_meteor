if(Meteor.isClient){
  Template.home.helpers({
    projects: function(){
      return Projects.find({ishome: true}, {sort: {index: 1}});
    },
    First: function(index){
      return index == 0;
    }
  });
	Template.home.rendered = function () {
		this.$('#home-carousel').carousel();
	};
}
