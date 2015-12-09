if(Meteor.isClient){
  Template.admin.helpers({
    photos: function(){
      return Images.find({project: Session.get("currProj")});
    },
    subCats: function(){
      if(Session.get('currCat')){
       return getSubCategoryList(Session.get('currCat'));
      }
      return getSubCategoryList('Interior');
    }
  });
  Template.admin.events({
    'submit .adminform':function(event, template){
      event.preventDefault();
      var title = event.target.title.value;
      var desc = event.target.desc.value;
      var cat = template.find('input:radio[name=optcat]:checked').value;
      var subcat = template.find('[name=optsubcat]').value;
      var ishome = template.find('[name=ishome]').checked;
      var country = template.find('[name=optcountry]').value;
      var files =  event.target.photoupload.files;

      var project = Projects.insert({
        title: title,
        desc: desc,
        category: cat,
        subcategory: subcat,
        ishome: ishome,
        country: country,
        createdAt: new Date() // current time
      });

    Session.set("currProj", project);
    for (var i = 0, ln = files.length; i < ln; i++) {
        var fileObj = Images.insert(files[i], function (err, fileObj) {
        });
        Images.update(fileObj._id,{
          $set: {project: project}
        });
      }

      event.target.title.value = "";
    },
    'change .cat-admin': function(event){
      Session.set('currCat', event.target.value);
    }
  });

  function getSubCategoryList(category){
    for(var i = 0;i<categories.length;i++){
      if(categories[i].name == category)
        return categories[i].sub;
    }
  }
}
