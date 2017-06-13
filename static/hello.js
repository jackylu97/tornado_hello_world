$(document).ready(function() {
  $("#searchform").on("submit", function() {
    var user = $("#username").val();
    // var url = "https://api.github.com/users/" + user + "/repos?per_page=100";
    var repo_arr = [];
    var url = "https://api.github.com/users/" + user + "/repos?per_page=100";

    $.when(get_url(url, repo_arr)).then(create_html_from_list(repo_arr), function() {
      $("#list_repos").html("<span>Could not find the user you were looking for :(</span>");
    });

    return false;
  });

});

function get_url(url, repo_arr) {
  return $.get(url, function(result, textStatus, jqXHR) {
    for (var item in result) {
      repo_arr.push(result[item]);
    }
    var next = null;
    var link = jqXHR.getResponseHeader("Link");
    var rels = link.match(/"[^"]+"/g);
    var urls = link.match(/<[^>]+>/g);
    for (var i = 0; i < rels.length; i+=1) {
      if (rels[i] == "next") {
        next = urls[i];
      }
    }
    get_url(next, repo_arr);
  }).fail( function() {

  });
}

/*
$(document).ready(function() {
  $("#searchform").on("submit", function() {
        $.get()
    });

});
*/

// function get_repos(username, successCb, failureCb) {
//   var repo_arr = [];
//   $.get("https://api.github.com/users/" + username + "/repos?per_page=100", function(result) {
//     for (var item in result) {
//       repo_arr.push(result[item]);
//     }
//     successCb(repo_arr);
//   }).fail( function(result) {
//     repo_arr = null;
//     failureCb(result);
//   });
//   return repo_arr;
// }



function create_html_from_list(arr) {
  console.log(arr);
  var textarea = $("#list_repos");


  textarea.html("<span>Found!</span>");

  var unordered_list = $("<ul>");

  if (arr.length == 0) {
    unordered_list.append($("<span>").text("This user has no repositories"));
  }

  for (var item in arr) {
    var list_item = $("<li>");
    list_item.text(arr[item]["name"]);
    unordered_list.append(list_item);
  }
  textarea.append(unordered_list);
}
