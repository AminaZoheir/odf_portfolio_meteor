if(Meteor.isClient){
  Template.editProj.onCreated(function(){
    this.selectedProj = new ReactiveVar(null);
  });
  Template.editProj.helpers({
    projects: function(){
      return Projects.find({},{sort: {index: 1}});
    },
    edit: function(){
      return Session.get('edit');
    },
    currproj: function(){
      return (this._id == Session.get('currproj'));
    }
  });
  Template.editProj.events({
    'click .proj-edit-comp': function(event, template){
      console.log(Session.get('edit'));
      if(! Session.get('edit')){
        event.preventDefault();
        console.log(this.index);
        if(template.selectedProj.get()){
          var newIndex = this.index;
          var oldIndex = template.selectedProj.get().index;
          var oldId = template.selectedProj.get()._id;
          var newId = this._id;
          Projects.update(newId,{
            $set: {
              index: oldIndex
            }
          });
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
}
  });
}
