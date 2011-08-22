
Room = function (room_id) {
    this.id = room_id;
    this.MAX_SIDE_PLAYERS = 2;
    this.PLAY_TIME = 60000;
    this.boys = [];
    this.girls = [];
};

Room.prototype = { 
  
  constructor: Room,
  
  is_full : function () {
    return this.boys.length == this.MAX_SIDE_PLAYERS &&
      this.girls.length == this.MAX_SIDE_PLAYERS;
  },
  
  add_user : function (user_id, user_sex) {
    if (user_sex == 'boy') {
      return this.add_boy(user_id);
    }    
    if (user_sex == 'girl') {
      return this.add_girl(user_id);
    }    
    return false;
  },
    
  add_girl : function(user_id) {
    if (this.girls.length < this.MAX_SIDE_PLAYERS) {
      this.girls.push(user_id);
      return true;
    }
    return false;
  },
  
  add_boy : function (user_id) {   
    if (this.boys.length < this.MAX_SIDE_PLAYERS) {
      this.boys.push(user_id);
      return true;
    }
    return false;
  },
  
  activate : function (result_function) {
    setTimeout(result_function, this.PLAY_TIME);
  },
  
  get_info : function () {
    return {"info" : "test"};
  },
  
  get_results : function () {
    return {"result" : "test"};
  },
  
  get_shepherds : function () {
      return { "boys": this.boys, "girls": this.girls };
  },

  select_changed : function (user_id, selected_user_id) {
  }
};
