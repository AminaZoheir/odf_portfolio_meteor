Projects = new Mongo.Collection("projects");

var imageStore = new FS.Store.GridFS("images");
Images = new FS.Collection("images", {
  stores: [imageStore]
});

News = new Mongo.Collection("news");
Info = new Mongo.Collection('info');

categories = [
            {name:"Architecture",sub:["Complexes","Hotels","Residential","Compounds","Admin","Retail"]},
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

  UI.registerHelper('indexedArray', function(context, options) {
    if (context) {
      return context.map(function(item, index) {
        item._index = index;
        return item;
      });
    }
  });
}

if (Meteor.isServer) {
  Images.allow({
   insert: function(userId){
   return userId;
   },
   update: function(userId){
   return userId;
   },
   remove: function(userId){
   return userId;
   },
   download: function(userId){
   return true;
   }
  });

  Projects.allow({
   insert: function(userId){
   return userId;
   },
   update: function(userId){
   return userId;
   },
   remove: function(userId){
   return userId;
   }
  });

  News.allow({
   insert: function(userId){
   return userId;
   },
   update: function(userId){
   return userId;
   },
   remove: function(userId){
   return userId;
   }
  });

  Info.allow({
   insert: function(userId){
   return userId;
   },
   update: function(userId){
   return userId;
   },
   remove: function(userId){
   return userId;
   }
  });
  // Meteor.publish(“images”, function(){ return Images.find(); });
  Meteor.startup(function () {
    // process.env.MAIL_URL = 'smtp://AminaZoheir:Abc123..@smtp.sendgrid.net:587';
    // code to run on server at startup
  });
}

Meteor.methods({
  addProject: function (title, desc, cat, subcat, ishome, country, index, files) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Projects.insert({
      title: title,
      desc: desc,
      category: cat,
      subcategory: subcat,
      ishome: ishome,
      country: country,
      createdAt: new Date(), // current time
      index: index
    });
  },
  deleteProject: function (projId) {
    Projects.remove(projId);
    var imgs = Images.find({project: projId}).fetch();
    var news = News.find({proj:projId}).fetch();
    for (var i = imgs.length - 1; i >= 0; i--) {
      Images.remove(imgs[i]._id);
    };
    for (var i = news.length - 1; i >= 0; i--) {
      News.remove(news[i]._id);
    };
    // var news = News.find({proj:projId});
    // for (var i = news.length - 1; i >= 0; i--) {
    //   Meteor.call("deleteNews", news[i]._id);
    // };
  },
  deleteNews: function(newsId){
    News.remove(newsId);
    // Images.remove({news: newsId});
    var imgs = Images.find({project: projId}).fetch();
    for (var i = imgs.length - 1; i >= 0; i--) {
      Images.remove(imgs[i]._id);
    };
  },
  addFirstUser: function(){
    if(Meteor.users.find().fetch().length <= 0){
      Accounts.createUser({
        email: 'amina.zoheir@gmail.com',
        password: '123123123'
      });
    }
  }
});
