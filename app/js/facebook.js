var FB = {

   item_description: function(item) {
      var msg = ['message', 'story', 'caption'];
      var return_text = "";

      msg.forEach(function(m){
        if (return_text === "" && typeof item[m] !== 'undefined') {
            return_text = item[m];
        }
      });

      return return_text;
   },

   get_access_token: function () {
      try {
         var params = document.location.href.split('#')[1];
         params.split('&').forEach(function(p){
           var el = p.split('=');
           if (el[0] === 'access_token') {
             FB.access_token = el[1];
           }
         });
      } catch(e) {
         console.log('No access token: ', e.message);
         return false;
      }

      return true;
   },

   next_url: function() {
      return FB.paging_previous || 'https://graph.facebook.com/me/home?access_token=' + FB.access_token;
   },

   post_url: function() {
      return 'https://graph.facebook.com/me/feed?access_token=' + FB.access_token;
   },

   update_status: function(status) {
      document.getElementById('login').innerHTML = status;
   },

   update_feed: function(url, cb) {
      if (typeof url === 'undefined') {
        url = FB.next_url();
        FB.update_status('Updating...')
      }
      if (typeof cb === 'undefined') {
        cb = FB.display_feed;
      }
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
         if (xhr.readyState == 4) {
            cb(JSON.parse(xhr.response));
         }
      }
      xhr.open('GET', url, true);
      xhr.send(null);
   },

   display_feed: function (newdata, reverse_order) {
      console.log('display_feed',newdata);

      var feed_data =  '';
      newdata.data.forEach(function (item) {
         if (typeof item.picture === 'undefined') { item.picture = ""; }
         feed_data += '<div class="fb-item">' +
                        FB.item_description(item) +
                        '<p><img src="' + item.picture + '" /></p>' +
                        '<p><a class="fb-link" target="_blank" href="' + item.link + '">link</a></p>' +
                        '<div class="fb-author"><a href="http://facebook.com/' +
                        item.from.id +
                        '">' +
                        item.from.name +
                        '</a>' +
                        '<img src="http://graph.facebook.com/' + item.from.id + '/picture" />' +
                        '</div>' +
                      '</div>';
      });
      if (reverse_order) {
         document.getElementById('feed-data').innerHTML = document.getElementById('feed-data').innerHTML + feed_data ;
      } else {
         document.getElementById('feed-data').innerHTML = feed_data + document.getElementById('feed-data').innerHTML;
      }
      if (newdata && newdata.paging && newdata.paging.previous) {
         if (!reverse_order) {
            FB.paging_previous = newdata.paging.previous;
         }
         if (newdata.paging.next !== '') {
            console.log('next: ', newdata.paging.next);
            FB.paging_next = newdata.paging.next;
            document.getElementById('more').innerHTML = 'more';
         }
      }

      FB.update_status('<div class="fb-update" onclick="javasctipt:FB.update_feed();">Waiting...</div>')
   },

   show_more: function() {
      document.getElementById('more').innerHTML = '';
      FB.update_feed(FB.paging_next, function(data) {
         document.getElementById('feed-data').innerHTML += '<hr>';
         FB.display_feed(data, true);
      });
   },

   filter: function() {
      var text = document.getElementById('search-text').value;
      var items = document.getElementsByClassName('fb-item');

      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.innerHTML.indexOf(text) === -1 ) {
            item.className = 'fb-item hidden';
        } else {
            item.className = 'fb-item';
        }
      };
   },

   post: function() {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
         if (xhr.readyState == 4) {
            FB.postCB(JSON.parse(xhr.response));
         }
      }
      var status_text = document.getElementById('status-text').value;
      xhr.open('POST', FB.post_url(), true);
      xhr.send('message=' + status_text);
   },

   postCB: function(res) {
     console.log(res);
     var msg = document.getElementById('post-status-msg');
     msg.innerHTML = 'Your status has been posted';
     msg.className ='';

     setTimeout(function() {
       msg.className = 'hidden';
     }, 3000);
   }

}
