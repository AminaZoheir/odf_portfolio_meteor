if(Meteor.isClient){
	Template.homeproject.helpers({
	    photo: function(){
	      	return Images.findOne({_id: this.mainphoto}).url();
	    },
	    indecies: function(){
	      	var arr = Array.apply(null, Array(Projects.find({ishome: true}).count()));
	      	return arr.map(function (x, i) { return i });
	    },
	    index: function(index1, index2){
	      	return index1 + "" == index2 + "";
	    }
	  });

    Template.home.events({
    'click .index': function(event, template){
	    var project = event.target.getAttribute('id');
	    Projects.update(project,{
	    	$set:{indexHome: event.target.innerHTML}
	    });
    }
  });
}
