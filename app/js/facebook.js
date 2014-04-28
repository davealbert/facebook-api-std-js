function display_feed(newdata) {
   console.log('display_feed',newdata);

   var feed_data =  '';
   newdata.data.forEach(function (item) {
      feed_data += '<li>' + item.message + '</li>';
   });
   document.getElementById('feed-data').innerHTML = feed_data;
}

var FB = {
   get_access_token: function () {
      try {
         var params = document.location.href.split('#')[1];
         params.split('&').forEach(function(p){
           var el = p.split('=');
           if (el[0] === 'access_token') {
             facebook_settings.access_token = el[1];
           }
         });
      } catch(e) {
         console.log('No access token: ', e.message);
         return false;
      }

      return true;
   },
   update_feed: function() {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
         if (xhr.readyState == 4) {
            display_feed(JSON.parse(xhr.response));
         }
      }
      xhr.open('GET', 'https://graph.facebook.com/me/home?access_token=' + facebook_settings.access_token, true);
      xhr.send(null);
   }
}

