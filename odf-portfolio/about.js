if(Meteor.isClient){
  Template.about.helpers({
    info: function(){
      Meteor.call('getInfo',function(err, res){
        Session.set('info',res);
      });
      return Session.get('info');
    },
    photo: function(){
      return Images.findOne({info: Session.get('info')._id}).url();
    },
    sketches: function(){
      return Images.find({about: true});
    },
    First: function(index){
      return index == 0;
    }
  });
  Template.about.rendered = function () {
    this.$('#about-carousel').carousel();
  };

  Template.about.events({
    'change .bio-align': function(event, template){
      var info = Session.get('info');
      var align = template.find('input:radio[name=bio-align]:checked').value;
      var bio = info.bio.text;
      Info.update(info._id,{
        $set: {bio:{text: bio, align: align}}
      });
    },
    'change .mission-align': function(event, template){
      var info = Session.get('info');
      var align = template.find('input:radio[name=mission-align]:checked').value;
      var mission = info.mission.text;
      Info.update(info._id,{
        $set: {mission:{text: mission, align: align}}
      });
    },
    'change .bg-align': function(event, template){
      var info = Session.get('info');
      console.log(info);
      var align = template.find('input:radio[name=bg-align]:checked').value;
      console.log(align);
      var bg = info.bg.text;
      Info.update(info._id,{
        $set: {bg:{text: bg, align: align}}
      });
    },
    'change .history-align': function(event, template){
      var info = Session.get('info');
      console.log(info);
      var align = template.find('input:radio[name=history-align]:checked').value;
      console.log(align);
      var history = info.history.text;
      Info.update(info._id,{
        $set: {history:{text: history, align: align}}
      });
    }
  });
}
