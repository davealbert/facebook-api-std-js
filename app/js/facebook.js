var FB = {

   item_description: function(item) {
      var msg = ['message', 'story', 'caption'];
      var return_text = "";

      msg.forEach(function(m){
        if (typeof item[m] !== 'undefined') {
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
      return FB.paging_url || 'https://graph.facebook.com/me/home?access_token=' + FB.access_token;
   },

   update_status: function(status) {
      document.getElementById('login').innerHTML = status;
   },

   update_feed: function() {
      FB.update_status('Updating...')
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
         if (xhr.readyState == 4) {
            FB.display_feed(JSON.parse(xhr.response));
         }
      }
      xhr.open('GET', FB.next_url(), true);
      xhr.send(null);
   },

   display_feed: function (newdata) {
      console.log('display_feed',newdata);

      var feed_data =  '';
      newdata.data.forEach(function (item) {
         feed_data += '<li>' + FB.item_description(item) + '</li>';
      });
      document.getElementById('feed-data').innerHTML = feed_data + document.getElementById('feed-data').innerHTML;
      if (newdata && newdata.paging && newdata.paging.previous) {
         FB.paging_url = newdata.paging.previous;
      }

      FB.update_status('Waiting...')
   }

}
