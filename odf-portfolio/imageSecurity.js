if(Meteor.isClient){
	Template.about.rendered = function () {
		$('document').ready(function(){
		  $('img').contextmenu(function(e){
		    e.preventDefault();
		  })
		});
	};
	Template.mobileproject.rendered = function () {
		$('document').ready(function(){
		  $('img').contextmenu(function(e){
		    e.preventDefault();
		  })
		});
	};
	Template.news.rendered = function () {
		$('document').ready(function(){
		  $('img').contextmenu(function(e){
		    e.preventDefault();
		  })
		});
	};
	Template.newsPage.rendered = function () {
		$('document').ready(function(){
		  $('img').contextmenu(function(e){
		    e.preventDefault();
		  })
		});
	};
	Template.portfolio.rendered = function () {
		$('document').ready(function(){
		  $('img').contextmenu(function(e){
		    e.preventDefault();
		  })
		});
	};
	Template.projectPage.rendered = function () {
		$('document').ready(function(){
		  $('img').contextmenu(function(e){
		    e.preventDefault();
		  })
		});
	};
}