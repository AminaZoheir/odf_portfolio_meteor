if (Meteor.isClient) {
  var globalfiles = [];
  Template.editform.helpers({
    // projects: function(){
    //   if(Session.get("currCat")){
    //     if(Session.get("currSubCat"))
    //       return Projects.find({category:Session.get("currCat"), subcategory:Session.get("currSubCat")},{sort: {index: 1}});
    //     return Projects.find({category:Session.get("currCat")},{sort: {index: 1}});
    //   }
    //   return Projects.find({},{sort: {index: 1}});
    // },
    // edit: function(){
    //   return Session.get('edit');
    // },
    // currproj: function(){
    //   return (this._id == Session.get('currproj'));
    // },
    subCats: function(){
      if(Session.get('cat')){
       return getSubCategoryList(Session.get('cat'));
      }
      return getSubCategoryList('Interior');
    },
    sameCat: function(name){
      return(name == Session.get('cat'));
    },
    sameSub: function(name){
      return(name == Session.get('subcat'));
    },
    sameCountry: function(name){
      return(name == Session.get('country'));
    },
    phots: function(){
      return Images.find({project: this._id});
    }
  });

  Template.editform.events({
    // "click .parentCat": function(event){
    //   Session.set("currCat",event.target.innerHTML);
    //   Session.set("currSubCat",null);
    // },
    // "click .childCat": function(event){
    //   Session.set("currSubCat",event.target.innerHTML);
    // },
    'change .cat-admin': function(event){
      console.log("amina");
      Session.set('cat', event.target.value);
    },
      'submit .adminform':function(event, template){
        event.preventDefault();
        var title = event.target.title.value;
        var desc = event.target.desc.value;
        var cat = template.find('input:radio[name=optcat]:checked').value;
        var subcat = template.find('[name=optsubcat]').value;
        var ishome = template.find('[name=ishome]').checked;
        var country = template.find('[name=optcountry]').value;
        // var files =  event.target.photoupload.files;
        var index = Projects.find({}).count();
        var files = globalfiles;

        var project = Projects.update(Session.get('currproj'), {
          $set: {title: title,
          desc: desc,
          category: cat,
          subcategory: subcat,
          ishome: ishome,
          country: country}
        });
      for (var i = 0, ln = files.length; i < ln; i++) {

          var fileObj = Images.insert(files[i], function (err, fileObj) {
          });
          Images.update(fileObj._id,{
            $set: {project: Session.get('currproj')}
          });
      }
      Session.set('edit', false);
      Session.set('currproj', null);
      Session.set('cat', null);
      Session.set('subcat', null);
      Session.set('country', null);
      // var el =  document.getElementById('#editprojModal');
      // el.parentNode.removeChild(el);
        // window.scrollTo(0, 0);
        // tempAlert("Project Added Successfully",2000);
      },
      'click .close-edit':function(event){
        Session.set('edit', false);
        Session.set('currproj', null);
        Session.set('cat', null);
        Session.set('subcat', null);
        Session.set('country', null);
      },
      'change .projfile': function(event){
       var files =  event.target.files;
       for (var i = 0, ln = files.length; i < ln; i++) {
        globalfiles.push(files[i]);
          var reader = new FileReader();
          reader.onload = (function(theFile) {
            return function(e) {
              var span = document.createElement('a');
          span.innerHTML = ['<img class="new-photo" src="', e.target.result,
                            '" name="', i, '"/>'].join('');
          span.className = span.className + " col-md-2";
          document.getElementById('newphoto').insertBefore(span, null);
        };
      })(files[i]);
           reader.readAsDataURL(files[i]);
       }
    }
  });
  function getSubCategoryList(category){
    for(var i = 0;i<categories.length;i++){
      if(categories[i].name == category)
        return categories[i].sub;
    }
  }
}