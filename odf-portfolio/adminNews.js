if(Meteor.isClient){
  var tempAlert = function (msg,duration)
    {
     var el = document.createElement("div");
     el.className="alertmessage";
     el.innerHTML = msg;
     el.onclick = function() {
      el.parentNode.removeChild(el);
     };
     setTimeout(function(){
      if('null' != el){
        el.parentNode.removeChild(el);
      }
     },duration);
     document.body.appendChild(el);
    }
  Template.adminNews.helpers({
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
      var mainphoto = null;
      var imgs = document.getElementsByClassName('main-photo');
      for (var i = imgs.length - 1; i >= 0; i--) {
        if(imgs[i].getAttribute('selected')=="true"){
          mainphoto = imgs[i].src;
        }
      };

      if(mainphoto == null){
        if(imgs.length > 0){
          mainphoto = imgs[0].src;
        }
      }

    for (var i = 0, ln = files.length; i < ln; i++) {

        var fileObj = Images.insert(files[i], function (err, fileObj) {
        });
        Images.update(fileObj._id,{
          $set: {news: news}
        });
        files[i].obj=fileObj._id;
        var reader = new FileReader();
          reader.onload = (function(theFile) {
            return function(e) {
              if(e.target.result == mainphoto){
                News.update(news,{
                  $set: {mainphoto: theFile.obj}
                });
              }
        };
      })(files[i]);
           reader.readAsDataURL(files[i]);
    }

      event.target.desc.value="";
      event.target.title.value = "";
      var oldImgs = document.getElementsByClassName('mainphoto-wrapper');
      for (var i = oldImgs.length - 1; i >= 0; i--) {
        oldImgs[i].parentNode.removeChild(oldImgs[i]);
      };
      window.scrollTo(0, 0);
      tempAlert("News Added Successfully",2000);
    },
    'change .newsfile': function(event){
       var files =  event.target.files;
       for (var i = 0, ln = files.length; i < ln; i++) {
          var reader = new FileReader();
          reader.onload = (function(theFile) {
            return function(e) {
              var span = document.createElement('a');
          span.innerHTML = ['<img class="main-photo" src="', e.target.result,
                            '" name="', i, '"/>'].join('');
                            span.className = span.className + " col-md-3 mainphoto-wrapper";
          document.getElementById('choosephotonews').insertBefore(span, null);
        };
      })(files[i]);
           reader.readAsDataURL(files[i]);
       }
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
      var img = event.target;
      img.setAttribute('selected', true);
      var imgs = document.getElementsByClassName('main-photo');
      for (var i = imgs.length - 1; i >= 0; i--) {
        if(imgs[i] != img){
          imgs[i].setAttribute('selected', false);
        }
      };
    }
  });

  function getSubCategoryList(category){
    for(var i = 0;i<categories.length;i++){
      if(categories[i].name == category)
        return categories[i].sub;
    }
  }
  Template.adminNews.onRendered(function(){
    $('.adminform').validate();
});
}
