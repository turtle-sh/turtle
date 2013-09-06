var credentials = {
  key: "gcaf1UiVcLDhH1SUhLcnbw",
  secret: "h39lvSKNPb7ZRUcqu2BsMvP0Qgvzh63itZ2YsbMpI",
  request_token: "https://api.twitter.com/oauth/request_token"
}

message = {
  action: "",
  method: "POST",
  parameters: [
    ["oauth_consumer_key", credentials.key],
    ["oauth_consumer_secret", credentials.secret],
    ["oauth_consumer_signature_method", "HMAC-SHA1"],
    ["oauth_consumer_timestamp", ""],
    ["oauth_consumer_nonce", ""],
    ["oauth_consumer_signature", ""]
  ]
};
accessor = {
  consumerSecret: credentials.secret,
  tokenSecret: "requestsecret"
};
OAuth.setTimestampAndNonce(message);
OAuth.SignatureMethod.sign(message, accessor);
map = OAuth.getParameterMap(message.parameters);
data = {
  oauth_consumer_key: map.oauth_consumer_key,
  oauth_signature_method: map.oauth_signature_method,
  oauth_timestamp: map.oauth_timestamp,
  oauth_nonce: map.oauth_nonce,
  oauth_signature: map.oauth_signature,
  oauth_version: "1.0"
};
/*
$.ajax({
  method: "post",
  url: credentials.request_token,
  contentType: 'application/x-www-form-urlencoded',
  data: data
})
.done(function() {
  console.log(arguments);
}).fail(function() {
  console.log('fail', arguments);
}); */

//$.get(credentials.request_token, data);

var params = $.param(data);
var url = credentials.request_token + '?' + params;
console.log(url);
/* chrome.identity.launchWebAuthFlow({
  interactive: true,
  url: url
}, function() {
  console.log(arguments);
});*/



define({
  "expr": /^tweet/,
  "fn": function() {
    auth();
    
    //this.exit();
  }
});
