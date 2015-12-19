if(Meteor.isClient){
  Template.editProj.onCreated(function(){
    this.selectedProj = new ReactiveVar(null);
  });
  Template.editProj.helpers({
    projects: function(){
      return Projects.find({},{sort: {index: 1}});
    }
  });
  Template.editProj.events({
    'click .proj-edit-comp': function(event, template){
      event.preventDefault();
      console.log(this.index);
      if(template.selectedProj.get()){
        var newIndex = this.index;
        var oldIndex = template.selectedProj.get().index;
        var oldId = template.selectedProj.get()._id;
        Projects.update(oldId,{
          $set: {
            index: -1
          }
        });
        if(newIndex < oldIndex){
          for(var i = oldIndex - 1; i >= newIndex; i--){
             var proj = Projects.findOne({index: i});
             Projects.update(proj._id,{
               $set: {
                 index: i+1
               }
             });
          }
        }else{
          for(var i = oldIndex + 1; i <= newIndex; i++){
             var proj = Projects.findOne({index: i});
             Projects.update(proj._id,{
               $set: {
                 index: i-1
               }
             });
          }
        }
        Projects.update(oldId,{
          $set: {
            index: newIndex
          }
        });
        template.selectedProj.set(null);
        document.getElementsByClassName('selected-proj-edit')[0].classList.remove('selected-proj-edit');
      }else{
        template.selectedProj.set(this);
        event.currentTarget.firstElementChild.classList.add('selected-proj-edit');
      }
    }
  });
}
