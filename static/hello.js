$(document).ready(function() {
  $("#searchform").on("submit", function() {
        user = $(this).children()[0].value;
        repos = search(user);
        return false;
    });

});

function search(username) {
  rv = null
  rv = $.get("https://api.github.com/users/" + username + "/repos", function(result) {
    console.log(result);
    textarea = $("#list_repos");
    textarea.html("<span>Found!</span>");
    var to_add = $("<ul>");
    if($.isEmptyObject(result)) {
      to_add.append($("<span>").text("This user has no repositories"));
    }
    for (item in result) {
      list_item = $("<li>");
      list_item.text(result[item]["name"]);
      to_add.append(list_item);
    }
    textarea.append(to_add);
  }).fail( function(result) {
    textarea = $("#list_repos");
    textarea.html("<span>Could not find the user you were looking for :(</span>");
  })
}
