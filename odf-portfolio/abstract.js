Projects = new Mongo.Collection("projects");

var imageStore = new FS.Store.GridFS("images");
Images = new FS.Collection("images", {
  stores: [imageStore]
});

News = new Mongo.Collection("news");

Company = new Mongo.Collection("company");

categories = [
            {name:"Architecture",sub:["Complexes","Hotels","Residential Buildings","Residential Compounds","Admin","Retail"]},
            {name:"Urban",sub:[]},
            {name:"Interior", sub:["Residential Private"]}
          ];

if (Meteor.isClient) {
  Template.registerHelper('isCurrCat', function(category){
    return Session.get("currCat") == category;
  });

  Template.registerHelper('isSubCat', function(subCat){
    return Session.get("currSubCat") == subCat;
  });

  Template.registerHelper('categories', function(){
    return categories;
  });
}

if (Meteor.isServer) {
  Images.deny({
   insert: function(){
   return false;
   },
   update: function(){
   return false;
   },
   remove: function(){
   return false;
   },
   download: function(){
   return false;
   }
   });
  Images.allow({
   insert: function(){
   return true;
   },
   update: function(){
   return true;
   },
   remove: function(){
   return true;
   },
   download: function(){
   return true;
   }
  });
  // Meteor.publish(“images”, function(){ return Images.find(); });
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
