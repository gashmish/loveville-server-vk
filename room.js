
Room = function (room_id) {
    this.id = room_id;
    this.MAX_SIDE_PLAYERS = 2;
    this.ROUND_DURATION = 5000;
    this.boys = [];
    this.girls = [];
    this.selection = {};
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
 
  activate : function (callback) {    
    var selection = this.selection;
    var first_boy = this.boys[0];
    var first_girl = this.girls[0];
    
    this.boys.forEach(function(boy) {
      selection[boy] = first_girl;
    });
    
    this.girls.forEach(function(girl) {
      selection[girl] = first_boy;
    });
    
    setTimeout(callback, this.ROUND_DURATION);
  },
  
  get_info : function () {
    return {
      "boys" : this.boys,
      "girs" : this.girls,
      "round_duration" : this.ROUND_DURATION
    };
  },
  
  get_results : function () {
    var pairs = [];
    var selection = this.selection;
    this.boys.forEach(function(boy) {
      var girl = selection[boy];
      if (selection[girl] == boy) {
        pairs.push({
          "boy" : boy,
          "girl" : girl
        });
    }});
    
    console.log(selection);
    
    return {
      "pairs" : pairs
    };
  },
  
  get_shepherds : function () {
      return { "boys": this.boys, "girls": this.girls };
  },

  select_changed : function (user_id, selected_user_id) {
    this.selection[user_id] = selected_user_id; 
  }
};
