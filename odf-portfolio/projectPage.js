if(Meteor.isClient){
  Template.projectPage.helpers({
    photos: function(){
      return Images.find({project: this._id});
    },
    photo: function(){
    	return Images.findOne({project: this_id});
    },
    notEqual: function(id1, id2){
      return id1 != id2;
    }
  });
}
