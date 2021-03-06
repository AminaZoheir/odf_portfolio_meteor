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
Router.route('news/:_id',{
  template: 'newsPage',
  data: function(){
    var currNews = this.params._id;
    return News.findOne({_id: currNews});
  }
});
Router.route('/portfolio');
Router.route('/contact');
Router.route('/about');
Router.route('/news');
Router.route('/admin');
