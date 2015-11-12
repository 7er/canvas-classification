Stuff = new Mongo.Collection("stuff");



if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    },
    classification: function () {
      return Stuff.findOne("classificationResults").classificationResults;
    }
  });

  Template.hello.events({
    'click button': function () {
      var canvas = $('#canvas')[0];
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0,0,200,200);
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(0, 0, 100, 50);
      var jpegDataUrl = canvas.toDataURL("image/png");
      //Stuff.update({_id: "drawing"}, {dataUrl:jpegDataUrl});
      Meteor.call("updateDrawing", jpegDataUrl);
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    drawingOrNull = Stuff.findOne({_id: "drawing"});
    if (!drawingOrNull) {
        Stuff.insert({_id: "drawing"});
    }
  });

  Meteor.methods({
    updateDrawing: function(jpegDataUrl) {
      console.log(jpegDataUrl);
      spawn = Npm.require('child_process').spawn;

      command = spawn('cat', []);
      command.stdin.write("asdfsjfasdkljf");
      command.stdin.end();
      var boundFunction = Meteor.bindEnvironment(function (data) {
        console.log('stdout: ' + data);
        Stuff.upsert("classificationResults", {classificationResults: data})
      }); // we have not provided an error callback
      command.stdout.setEncoding('utf8')
      command.stdout.on('data',  boundFunction);      
    }
  });
}

