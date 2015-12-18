if(Meteor.isClient){
  Template.adminNews.helpers({
    photos: function(){
      return Images.find({news: Session.get("currNews")});
    },
    subCats: function(){
      if(Session.get('currCat')){
       return getSubCategoryList(Session.get('currCat'));
      }
      return getSubCategoryList('Interior');
    },
    projects: function(){
      if(Session.get("currCat")){
        if(Session.get("currSubCat"))
          return Projects.find({category:Session.get("currCat"), subcategory:Session.get("currSubCat")});
        return Projects.find({category:Session.get("currCat")});
      }
      return Projects.find({category:'Interior', subcategory: getSubCategoryList('Interior')[0]});
    },
    choosemain: function(){
      return Session.get('done');
    }
  });
  Template.adminNews.events({
    'submit .adminform':function(event, template){
      event.preventDefault();
      var title = event.target.title.value;
      var desc = event.target.desc.value;
      var status = event.target.status.value;
      var cat = template.find('input:radio[name=optcat]:checked').value;
      var subcat = template.find('[name=optsubcat]').value;
      var country = template.find('[name=optcountry]').value;
      var files =  event.target.photoupload.files;
      var proj = template.find('[name=optproj]').options[template.find('[name=optproj]').selectedIndex].getAttribute('projId');

      var news = News.insert({
        title: title,
        desc: desc,
        category: cat,
        subcategory: subcat,
        country: country,
        createdAt: new Date(),
        projId: proj,
        status: status
      });

      Session.set("currNews", news);
    for (var i = 0, ln = files.length; i < ln; i++) {
        var fileObj = Images.insert(files[i], function (err, fileObj) {
        });
        Images.update(fileObj._id,{
          $set: {news: news}
        });
      }

      Session.set('done', true);
      event.target.title.value = "";
    },
    'change .cat-admin': function(event){
      Session.set('currCat', event.target.value);
      Session.set('currSubCat', getSubCategoryList(event.target.value)[0]);
    },
    'change #sel1': function(event){
      Session.set('currSubCat', event.target.value);
    },
    'change #sel3': function(event){
      console.log(event.target.options[event.target.selectedIndex].getAttribute('projId'));
    },
    'click .main-photo': function(event){
      var selectedphoto = event.target.name;
      News.update(Session.get('currNews'),{
        $set: {mainphoto: selectedphoto}
      });
      Session.set('done', false);
      Session.set('currNews', null);
    }
  });

  function getSubCategoryList(category){
    for(var i = 0;i<categories.length;i++){
      if(categories[i].name == category)
        return categories[i].sub;
    }
  }
}
