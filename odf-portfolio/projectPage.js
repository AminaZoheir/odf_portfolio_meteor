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
}
