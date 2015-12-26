if(Meteor.isClient){
  Template.project.rendered = function(){
    var instance = this;
    Meteor.defer(function(){
      $(instance.firstNode).addClass("animating");
    });
  };
  Template.project.helpers({
    photo: function(){
      return Images.findOne({_id: this.mainphoto}).url();
    },
    edit: function(){
      return Session.get('edit');
    },
    currproj: function(){
      return (this._id == Session.get('currproj'));
    },
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
    }
  }); 
  Template.project.events({
    'click .delete-proj': function(event){
      // Meteor.call("deleteProject", this._id);
      var projId = this._id;
      var imgs = Images.find({project: projId}).fetch();
      var news = News.find({projId:projId}).fetch();
      for (var i = imgs.length - 1; i >= 0; i--) {
        Images.remove(imgs[i]._id);
      };
      for (var i = news.length - 1; i >= 0; i--) {
        News.remove(news[i]._id);
        var newsImgs = Images.find({news: news[i]._id}).fetch();
        for (var i = newsImgs.length - 1; i >= 0; i--) {
          Images.remove(newsImgs[i]._id);
        };
      };

      Projects.remove(projId);
    },
    'click .edit-proj': function(event){
      Session.set('edit', true);
      Session.set('currproj', this._id);
      Session.set('cat', this.category);
      Session.set('subcat', this.subcategory);
      Session.set('country', this.country);
    },
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
        var files =  event.target.photoupload.files;
        var index = Projects.find({}).count();

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
        // window.scrollTo(0, 0);
        // tempAlert("Project Added Successfully",2000);
      }
  }); 

  function getSubCategoryList(category){
    for(var i = 0;i<categories.length;i++){
      if(categories[i].name == category)
        return categories[i].sub;
    }
  }
}
