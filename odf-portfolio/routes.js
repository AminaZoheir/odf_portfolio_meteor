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
// var handle;
// Tracker.autorun(function () {
//     // handle = Meteor.subscribe('company',{});
// });
Router.route('/adminAbout');
Router.route('/portfolio');
Router.route('/contact');
Router.route('/about');
Router.route('/news');
Router.route('/admin');
Router.route('/adminNews');
