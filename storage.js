var https = require('https');

require('./storage-config.js');

charts_key = 1000;
stats_key = 1001;

vk_api_url = 'api.vkontakte.ru';

Storage = function () {    
};

Storage.prototype = {
    constructor: Storage,
    get_charts: function(user_id, callback) {
	var stats = {"stats" : "test" };
	callback(stats);

	// this.get_data(charts_key, user_id, callback);
    },
    get_user_stats: function(user_id, callback) {
	var charts = {"chargs" : "test" };
	callback(charts);
	
        // this.get_data(stats_key, user_id, callback);
    },
    get_data: function(key, id, cb) {
        https.get({
            host: vk_api_url,
            path: '/method/storage.get?key=' + key + '&id=' + id + '&access_token=' + access_token
        }, function(res) {
            res.setEncoding('ascii');
            res.on('data', function (d) { 
                       var data = JSON.parse(d);

		       console.log(data);

                       try {
                           data = JSON.parse(data.response);
                       } catch (err) { console.log(err); data = ""; }

                       cb(data);
                   });
        }).on('error', function(e) {
            console.error(e);
        });
    },
    set_data: function(key, value, id, cb) {
        https.get({
            host: vk_api_url,
            path: '/method/storage.get?key=' + key + '&id=' + id + '&value=' + value + '&access_token=' + access_token
        }, function(res) {
            res.setEncoding('ascii');

            // res.on('data', cb);
        }).on('error', function(e) {
            console.error(e);
        });
    }
};
