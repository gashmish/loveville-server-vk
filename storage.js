
Storage = function (room_id) {
    this.id = room_id;
    this.MAX_SIDE_PLAYERS = 12;
    this.PLAY_TIME = 60000;
    this.boys = [];
    this.girls = [];
};

Storage.prototype = {
  constructor: Storage,  
  
  get_charts : function (user_id, callback) {
    var charts = {"chargs" : "test" };
    callback(charts);
  },
  
  get_user_stats : function (user_id, callback) {
    var stats = {"stats" : "test" };
    callback(stats);
  }
  
};