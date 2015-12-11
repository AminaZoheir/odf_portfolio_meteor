if(Meteor.isClient){
  Template.projectPage.helpers({
    photos: function(){
      return Images.find({project: this._id});
    //   return _.map(self.array, function(value, index){
    // 		return {value: value, index: index};
  		// });
    },
    notEqual: function(id1, id2){
      return id1 != id2;
    }
  });
}
