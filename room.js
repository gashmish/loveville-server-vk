
function Room(room_id) {
  this.id = room_id;
  this.MAX_SIDE_PLAYERS = 12;
  this.boys = [];
  this.girls = [];
}

Room.prototype = { 
  
  constructor: Room,
  
  is_full : function () {
    return boys.length() == MAX_SIDE_PLAYERS &&
      girls.length() == MAX_SIDE_PLAYERS;
  },
  
  add_user : function (user_id, user_sex) {
    if (user_sex == 'boy') {
      return add_boy(user_id);
    }    
    if (user_sex == 'girl') {
      return add_girl(user_id);
    }    
    return false;
  },
    
  add_girl : function(user_id) {
    if (this.girls.length < MAX_SIDE_PLAYERS) {
      this.girls.push(user_id);
      return true;
    }
    return false;
  },
  
  add_boy : function (user_id) {   
    if (this.boys.length < MAX_SIDE_PLAYERS) {
      this.boys.push(user_id);
      return true;
    }
    return false;
  },
  
  activate : function () {
    
  },
  
  send_results : function () {
    
  },
  
  select_changed : function (user_id, selected_user_id) {
    
  }
};
