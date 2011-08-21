require("./room.js");
require("./storage.js");

/* Init connection listening */
var http = require('http').createServer();
var io = require('socket.io').listen(http);
http.listen(process.env.C9_PORT);

var storage = new Storage();
var waiting_rooms = [];
var active_rooms = [];
var next_room_id = 0;

io.sockets.on('connection', function (client) {
  
  client.on('user_stats', function (data) {
    storage.get_user_stats(data.user_id, function (stats) {
      client.emit('user_stats', stats);
    });
  });
  
  client.on('charts', function (data) {
    storage.get_charts(data.user_id, function (charts) {
      client.emit('charts', charts);
    });
  });
  
  client.on('enter_room', function (data) {
    
    var set_client_room = function (room_id) {
      client.room_id = room_id;
      client.join(room_id);
    };
    
    var create_new_room = function () {
      var room = new Room(next_room_id++);
      waiting_rooms.push(room);
      return room;
    };

    var activate_room = function (room) {
      waiting_rooms.splice(waiting_rooms.indexOf(room), 1);
      active_rooms.push(room);
      
      // notify clients
      socket.broadcast.to('justin bieber fans').emit('new fan');
      io.sockets.in(room.id).emit('room_init', room.get_info());
      
      room.activate(function () {
        // notify clients
        io.sockets.in(room.id).emit('room_results', room.get_results());
        
        // remove room
        for (var i = 0; active_rooms[i] != room; i++) {
          active_rooms.slice(i,1);
          return;
        }
      });
    };
    
    for (var i = 0; i < waiting_rooms.length; i++) {
      if (waiting_rooms[i].add_user(data.user_id, data.user_sex)) {    
        set_client_room(waiting_rooms[i].id);      
        if (waiting_rooms[i].is_full()) {
           activate_room(waiting_rooms[i]);
        }
        return;
      }
    }
    
    var new_room = create_new_room();
    if (new_room.add_user(data.user_id, data.user_sex)) {
      set_client_room(new_room.id);
    }
  });

  client.on('select_changed', function (data) {
    rooms[client.room_id].select_changed(data.user_id, data.selected_user_id);
  });
    
  client.on('disconnect', function () {
    if (client.room_id) {
        client.leave(client.room_id);
    }
  });

});

console.log("Server started...");
