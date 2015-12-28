if(Meteor.isClient){
  Template.news.helpers({
    news: function(){
      return News.find({}, {sort: {createdAt: -1}});
    },
    edit: function(){
      return Session.get('edit-news');
    },
    currnews: function(){
      return (this._id == Session.get('currnews'));
    },
    subCats: function(){
      if(Session.get('cat-news')){
       return getSubCategoryList(Session.get('cat-news'));
      }
      return getSubCategoryList('Interior');
    },
    sameCat: function(name){
      return(name == Session.get('cat-news'));
    },
    sameSub: function(name){
      return(name == Session.get('subcat-news'));
    },
    sameCountry: function(name){
      return(name == Session.get('country-news'));
    },
    projects: function(){
      if(Session.get("cat-news")){
        if(Session.get("subcat-news"))
          return Projects.find({category:Session.get("cat-news"), subcategory:Session.get("subcat-news")});
        return Projects.find({category:Session.get("cat-news")});
      }
      return Projects.find({category:'Interior', subcategory: getSubCategoryList('Interior')[0]});
    },
    sameProj: function(name){
      return(name == Session.get('project-news'));
    }
  });

	Template.news.events({
	'change .cat-admin': function(event){
      Session.set('cat-news', event.target.value);
      Session.set('subcat-news', getSubCategoryList(event.target.value)[0]);
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
      Session.set('edit-news', false);
      Session.set('currnews', null);
      Session.set('cat-news', null);
      Session.set('subcat-news', null);
      Session.set('country-news', null);
      },
      'click .close-edit-news': function(event){
      	Session.set('edit-news', false);
	    Session.set('currnews', null);
	    Session.set('cat-news', null);
	    Session.set('subcat-news', null);
	    Session.set('country-news', null);
      }
	});

	function getSubCategoryList(category){
	    for(var i = 0;i<categories.length;i++){
	      if(categories[i].name == category)
	        return categories[i].sub;
	    }
	}
}
