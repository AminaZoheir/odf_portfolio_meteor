// var info = null;
if(Meteor.isClient){
  Template.adminAbout.onCreated(function(){
    console.log(this);
  });
  Template.adminAbout.rendered = function(){
    console.log('salah'+this.data);
    Meteor.call('getInfo',function(err, res){
      if(res){
        Session.set('info',res);
        console.log('a7a'+Session.get('info'));
        return;
      }
      console.log('l2a');
      Meteor.call('addIfNotExists', function(err, res){
        if(res)
          Session.set('info',res);
      });
  });
};
  Template.adminAbout.helpers({
    info: function(){
      return Session.get('info');
    },
    photo: function(){
      var info = Session.get('info');
      // console.log(info);
      console.log(Images.findOne({info:info._id}));
      console.log('zft');
      return Images.findOne({info: info._id}).url();
    }
  });

  Template.adminAbout.events({
    'click #add-button': function(event){
      var info = Session.get('info');
      info.phones.push({type:'Phone', number:''});
      Session.set('info',info);
      console.log(Session.get('info'));
    },
    'click .choose-type': function(event, template){
      this.type = event.target.innerHTML;
      var info = Session.get('info');
      console.log(this._index);
      info.phones[this._index] = this;
      Session.set('info',info);
      console.log(info);
      console.log(Session.get('info'));
      // console.log(Session.get('info'));
    },
    'change .choose-number': function(event){
      this.number = event.target.value;
      var info = Session.get('info');
      info.phones[this._index] = this;
      Session.set('info',info);
      // console.log(Session.get('info'));
    },
    'change #bio':function(event){
      var info = Session.get('info');
      info.bio = event.target.value;
      Session.set('info',info);
    },
    'change #mission': function(event){
      var info = Session.get('info');
      info.mission = event.target.value;
      Session.set('info',info);
    },
    'change #bg': function(event){
      var info = Session.get('info');
      info.bg = event.target.value;
      Session.set('info',info);
    },
    'change #history': function(event){
      var info = Session.get('info');
      info.history = event.target.value;
      Session.set('info',info);
    },
    'change #addr': function(event){
      var info = Session.get('info');
      info.address = event.target.value;
      Session.set('info',info);
    },
    'change #fb': function(event){
      var info = Session.get('info');
      info.fb = event.target.value;
      Session.set('info',info);
    },
    'change #tw': function(event){
      var info = Session.get('info');
      info.tw = event.target.value;
      Session.set('info',info);
    },
    'change #lin': function(event){
      var info = Session.get('info');
      info.lin = event.target.value;
      Session.set('info',info);
    },
    'change #inst': function(event){
      var info = Session.get('info');
      info.inst = event.target.value;
      Session.set('info',info);
    },
    'change #google': function(event){
      var info = Session.get('info');
      info.google = event.target.value;
      Session.set('info',info);
    },
    'change #add-photo': function(event){
      console.log(event.target.value);
    },
    'submit .adminform': function(event, template){
      event.preventDefault();
      var info = Session.get('info');
      console.log(info.phones);
      Info.update(info._id,{
        $set: {
           bio:info.bio, mission:info.mission, bg:info.bg, history:info.history,
           address:info.address, fb:info.fb, tw:info.tw, inst:info.inst, google:info.google,
           lin:info.lin, phones:info.phones
        }
      });

      var files =  event.target.photoupload.files;
      for (var i = 0, ln = files.length; i < ln; i++) {
        console.log('nila');
        var fileObj = Images.insert(files[i], function (err, fileObj) {
        });
        Images.update(fileObj._id,{
          $set: {info: info._id}
        });
        console.log(fileObj);
      }
      if(Images.find({info: info._id}).count()>1){
        console.log('da5al');
        Images.remove({_id: Images.findOne({info: info._id})._id},function(err, res){
          console.log(err);
        });
      }
    }
  });
}

if(Meteor.isServer){
  Meteor.methods({
    getInfo: function(){
      return Info.findOne({});
    },
    addIfNotExists: function(){
      return Info.insert({ bio:'', mission:'', bg:'', history:'', address:'', fb:'',
                  tw:'', inst:'', google:'', lin:'', phones:[{type:'Phone',number:''}]});
    }
  });
}
