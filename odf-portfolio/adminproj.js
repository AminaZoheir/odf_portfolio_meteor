if(Meteor.isClient){
  var globalfiles = [];
  var tempAlert = function (msg,duration)
    {
     var el = document.createElement("div");
     el.className="alertmessage";
     el.innerHTML = msg;
     el.onclick = function() {
      el.parentNode.removeChild(el);
      el =null;
     };
     setTimeout(function(){
      if(el != null){
        el.parentNode.removeChild(el);
      }
     },duration);
     document.body.appendChild(el);
    }
  Template.adminproj.helpers({
    subCats: function(){
      if(Session.get('cat')){
       return getSubCategoryList(Session.get('cat'));
      }
      return getSubCategoryList('Interior');
    }
  });
  Template.adminproj.events({
    'submit .adminform':function(event, template){
      event.preventDefault();
      var title = event.target.title.value;
      var desc = event.target.desc.value;
      var cat = template.find('input:radio[name=optcat]:checked').value;
      var subcat = template.find('[name=optsubcat]').value;
      var ishome = template.find('[name=ishome]').checked;
      var country = template.find('[name=optcountry]').value;
      var files = globalfiles;
      // var files =  event.target.photoupload.files;
      var index = Projects.find({}).count();

      var project = Projects.insert({
        title: title,
        desc: desc,
        category: cat,
        subcategory: subcat,
        ishome: ishome,
        country: country,
        createdAt: new Date(), // current time
        index: index
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

      // files = globalfiles.concat(jQuery.makeArray(files));
      // console.log(jQuery.makeArray(files));
    for (var i = 0, ln = files.length; i < ln; i++) {

        var fileObj = Images.insert(files[i], function (err, fileObj) {
        });
        Images.update(fileObj._id,{
          $set: {project: project}
        });
        files[i].obj=fileObj._id;
        var reader = new FileReader();
          reader.onload = (function(theFile) {
            return function(e) {
              if(e.target.result == mainphoto){
                Projects.update(project,{
                  $set: {mainphoto: theFile.obj}
                });
              }
        };
      })(files[i]);
           reader.readAsDataURL(files[i]);
    }
      template.find('[name=ishome]').checked=false;
      event.target.desc.value="";
      event.target.title.value = "";
      var oldImgs = document.getElementsByClassName('mainphoto-wrapper');
      for (var i = oldImgs.length - 1; i >= 0; i--) {
        oldImgs[i].parentNode.removeChild(oldImgs[i]);
      };
      globalfiles = [];
      window.scrollTo(0, 0);
      tempAlert("Project Added Successfully",2000);
    },
    'change .projfile': function(event){
       var files =  event.target.files;
       for (var i = 0, ln = files.length; i < ln; i++) {
        globalfiles.push(files[i]);
          var reader = new FileReader();
          reader.onload = (function(theFile) {
            return function(e) {
              var span = document.createElement('a');
          span.innerHTML = ['<img class="main-photo" src="', e.target.result,
                            '" name="', i, '"/>'].join('');
          span.className = span.className + " col-md-3 mainphoto-wrapper";
          document.getElementById('choosephoto').insertBefore(span, null);
        };
      })(files[i]);
           reader.readAsDataURL(files[i]);
       }
    },
    'change .cat-admin': function(event){
      Session.set('cat', event.target.value);
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

  Template.adminproj.onRendered(function(){
    $('.adminform').validate();
});

  function getSubCategoryList(category){
    for(var i = 0;i<categories.length;i++){
      if(categories[i].name == category)
        return categories[i].sub;
    }
  }
}
