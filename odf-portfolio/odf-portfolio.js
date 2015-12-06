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
    }

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
      
      return Session.get("files");
    }
  });
  Template.admin.events({
    'change .fileInput': function(event, template){
      Session.set("files", event.target.files);
    },
    'submit .adminform':function(event){
      event.preventDefault();

      var title = event.target.title.value;
      var desc = event.target.desc.value;
      var cat = event.target.optcat.value;
      var subcat = event.target.optsubcat.value;

      console.log(title);
      console.log(desc);
      // console.log(optcat);
      // console.log(optsubcat);
      console.log(Session.get("files"));

      // Insert a task into the collection

      // var task = Tasks.insert({

      //   text: text,

      //   createdAt: new Date() // current time

      // });

      // for (var i = 0, ln = files.length; i < ln; i++) {
      //   var fileObj = Uploads.insert(files[i], function (err, fileObj) {
      //     // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      //   });
      //   Uploads.update(fileObj._id,{
      //     $set: {task: task}
      //   });
      // }
      event.target.title.value = "";
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
