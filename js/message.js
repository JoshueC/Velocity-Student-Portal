$(document).ready(function(){
  $("li a.online-user").click(function() {
    var friend_name = $(this).text().split(/[\s]+/)[0];
    $(".direct-chat-name.pull-left").html(friend_name);
  })
});
