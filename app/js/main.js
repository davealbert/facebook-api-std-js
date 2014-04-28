// main.js

/*
 *  Stored in app/js/local.js
 *

   var facebook_settings = {
     app_id: "APP_ID"
   };

*/
var facebook_login_url = 'https://www.facebook.com/dialog/oauth?response_type=token&display=popup&client_id=' +
                           facebook_settings.app_id +
                           '&redirect_uri=http%3A%2F%2Flocalhost.local&scope=read_stream';

window.onload = function(){
   if (FB.get_access_token()) {
      //setInterval(FB.update_feed, 5000);
      document.getElementById('login').innerHTML = facebook_settings.access_token;
      FB.update_feed();
   } else {
      console.log('show login');
      document.getElementById('login-link').href = facebook_login_url;
   }

}


