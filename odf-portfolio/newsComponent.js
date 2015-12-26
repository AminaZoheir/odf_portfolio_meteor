if(Meteor.isClient){
  Template.newsComponent.helpers({
    photo: function(){
      return Images.findOne({_id: this.mainphoto}).url();
    },
    shortdesc: function(){
      var desc = this.desc;
      if(desc.length > 200){
        return desc.substring(0, 200) + "..";
      }
      return desc;
    },
    edit: function(){
      return Session.get('edit');
    },
    currnews: function(){
      return (this._id == Session.get('currnews'));
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
    },
    projects: function(){
      if(Session.get("cat")){
        if(Session.get("subcat"))
          return Projects.find({category:Session.get("cat"), subcategory:Session.get("subcat")});
        return Projects.find({category:Session.get("cat")});
      }
      return Projects.find({category:'Interior', subcategory: getSubCategoryList('Interior')[0]});
    },
    sameProj: function(name){
      return(name == Session.get('project'));
    }
  });

  Template.newsComponent.events({
    'click .delete-news': function(event){
      if (confirm('Are you sure?')) {
           // Meteor.call("deleteProject", this._id);
        var newsId = this._id;
        var imgs = Images.find({news: newsId}).fetch();
        for (var i = imgs.length - 1; i >= 0; i--) {
          Images.remove(imgs[i]._id);
        };

        News.remove(newsId);
       } else {
           return false;
       }
    },
    'click .edit-news': function(event){
      console.log("Amina");
      Session.set('edit', true);
      Session.set('currnews', this._id);
      Session.set('cat', this.category);
      Session.set('subcat', this.subcategory);
      Session.set('country', this.country);
      console.log(this.projId);
      Session.set('project', this.projId);
    },
    'change .cat-admin': function(event){
      Session.set('cat', event.target.value);
      Session.set('subCat', getSubCategoryList(event.target.value)[0]);
    },
      'submit .adminform':function(event, template){
        event.preventDefault();
        var title = event.target.title.value;
        var desc = event.target.desc.value;
        var status = event.target.status.value;
        var cat = template.find('input:radio[name=optcat]:checked').value;
        var subcat = template.find('[name=optsubcat]').value;
        var ishome = template.find('[name=ishome]').checked;
        var country = template.find('[name=optcountry]').value;
        var files =  event.target.photoupload.files;
        var index = Projects.find({}).count();
        var proj = template.find('[name=optproj]').options[template.find('[name=optproj]').selectedIndex].getAttribute('projId');

        var news = News.update(Session.get('currproj'), {
          $set: {title: title,
          desc: desc,
          category: cat,
          subcategory: subcat,
          ishome: ishome,
          country: country,
          projId: proj,
          status: status}
        });
      for (var i = 0, ln = files.length; i < ln; i++) {

          var fileObj = Images.insert(files[i], function (err, fileObj) {
          });
          Images.update(fileObj._id,{
            $set: {project: Session.get('currnews')}
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
