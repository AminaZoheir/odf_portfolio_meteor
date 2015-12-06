Projects = new Mongo.Collection("projects");

Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});

Router.route('/',{
  template: 'home'
});
Router.configure({
  layoutTemplate: 'main'
});
Router.route('/portfolio/:_id', {
    template: 'projectPage',
    data: function(){
      var currProj = this.params._id;
      return Projects.findOne({_id: currProj});
    }
});
Router.route('/portfolio');
Router.route('/contact');
Router.route('/about');
Router.route('/news');
Router.route('/admin');

if (Meteor.isClient) {

  // This code only runs on the client

  Template.portfolio.helpers({
    projects: function(){
      if(Session.get("currCat")){
        if(Session.get("currSubCat"))
          return Projects.find({category:Session.get("currCat"), subcategory:Session.get("currSubCat")});
        return Projects.find({category:Session.get("currCat")});
      }
      return Projects.find({});
    },

  });

  Template.registerHelper('isCurrCat', function(category){
    return Session.get("currCat") == category;
  });

  Template.registerHelper('categories', function(){
    return  [
                {name:"Architecture",sub:["Complexes","Hotels","Residential Buildings","Residential Compounds","Admin","Retail"]},
                {name:"Urban",sub:[]},
                {name:"Interior", sub:["Residential Private"]}
              ];
  });


  Template.subCategory.rendered = function(){
    var instance = this;
    Meteor.defer(function() {
      $(instance.firstNode).addClass("animating"); //use "instance" instead of "this"
    });
  };

  Template.portfolio.events({
    "click .parentCat": function(event){
      Session.set("currCat",event.target.innerHTML);
      Session.set("currSubCat",null);
    },
    "click .childCat": function(event){
      Session.set("currSubCat",event.target.innerHTML);
    }
  });

  Template.admin.helpers({
    photos: function(){
      return Images.find({project: Session.get("currProj")});
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
    }
  });

  Template.project.helpers({
    photo: function(){
      return Images.findOne({project: this._id}).url();
    }
  });

  Template.projectPage.helpers({
    photos: function(){
      return Images.find({project: this._id});
    }
  });

  Template.home.helpers({
    projects: function(){
      return Projects.find({ishome: true});
    }
  });

  Template.homeproject.helpers({
    photo: function(){
      return Images.findOne({project: this._id}).url();
    }
  });
  
}



if (Meteor.isServer) {
  Images.allow({
    'insert': function () {
      // add custom authentication code here
      return true;
    }
  });
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
