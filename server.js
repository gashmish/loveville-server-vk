
/* Init connection listening */
var http = require('http').createServer();
var io = require('socket.io').listen(http);
http.listen(process.env.C9_PORT);

var waiting_rooms = [];
var active_rooms = [];
var next_room_id = 0;

io.sockets.on('connection', function (client) {
    
  client.on('connect', function (data) {
    storage.get_user_stats(function (stats) {
      client.emit('user_stats', stats);
    });
  });
  
  client.on('charts', function (data) {
    storage.get_charts(function (charts) {
      client.emit('charts', charts);
    });
  });
  
  client.on('enter_room', function (data) {
    
    var set_client_room = function (room_id) {
      client.room_id = room_id;
      client.join(room_id);
    };
    
    var create_new_room = function () {
      var room = new Room(room_id++);
      waiting_rooms.push(room);
      return room;
    };

    var activate_room = function (index) {
      var room = waiting_rooms[index];
      waiting_rooms.splice(index, 1);
      active_rooms.push(room);
      
      //activate
    };
    
    for (var i = 0; i < waiting_rooms.length; i++) {
      if (waiting_rooms[i].add_user(data.user_id, data.user_sex)) {    
        set_client_room(waiting_rooms[i].id);      
        if (waiting_rooms[i].is_full()) {
           activate_room(i);
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
        rooms[client.room_id].count -= 1;
        find_room_and_disconnect_by_session_id(client.id);
        client.leave('room#'+client.room_id);
    }
    io.sockets.json.emit('list_of_rooms', get_list_of_rooms());
  });

});

console.log("Server started...");
