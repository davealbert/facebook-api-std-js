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
                           '&redirect_uri=http%3A%2F%2Flocalhost.local&scope=user_about_me';

window.onload = function(){
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
   }

   if (typeof facebook_settings.access_token === 'undefined') {
      document.getElementById('login-link').href = facebook_login_url;
   } else {
      document.getElementById('login').innerHTML = facebook_settings.access_token;
   }
}


