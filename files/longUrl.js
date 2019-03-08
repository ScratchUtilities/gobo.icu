const base64 = {
  charset: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".split(
    ""
  ),
  encode: integer => {
    if (integer === 0) {
      return "0";
    }
    let s = [];
    while (integer > 0) {
      s = [base64.charset[integer % 64], ...s];
      integer = Math.floor(integer / 64);
    }
    return s.join("");
  },
  decode: chars =>
    chars
      .split("")
      .reverse()
      .reduce(
        (prev, curr, i) => prev + base64.charset.indexOf(curr) * 64 ** i,
        0
      )
};

function longUrl(hash) {
  var urlStarts = {
    u: "https://scratch.mit.edu/users/",
    p: "https://scratch.mit.edu/projects/",
    e: "editor",
    s: "https://scratch.mit.edu/studios/",
    d: "https://scratch.mit.edu/discuss/topic/",
    o: "https://scratch.mit.edu/discuss/post/"
  };
  var type = urlStarts[hash[1]];
  if (type == "https://scratch.mit.edu/users/") {
    return type + hash.substring(2);
  } else {
    if (type == "editor") {
      return (
        "https://scratch.mit.edu/projects/" +
        base64.decode(hash.substring(2)) +
        "/editor"
      );
    } else {
      return type + base64.decode(hash.substring(2));
    }
  }
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "false";
}

const proxyName = "https://cors-anywhere.herokuapp.com/";

function request(URI, callback, error) {
  // we need a cors proxy.
  var fullURI = proxyName + URI;
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    console.log(URI, fullURI, this.status, xhr.responseText);
    if (this.status === 200) {
      callback(xhr.responseText);
    } else {
      error(this.status);
    }
  };
  xhr.open("GET", fullURI, true);
  xhr.send();
}

function preview(type, output) {
  document.getElementById("title").innerHTML = "Preview Page for " + output;
  var main = document.createElement("div");
  function finish() {
    var link = document.createElement("a");
    link.href = output;
    link.innerText = output;
    document.body.innerHTML = "";
    document.body.appendChild(main);
    document.body.appendChild(link);
  }
  switch (type) {
    case "u":
      request(
        "https://api." + output.substring(8),
        function(response) {
          var json = JSON.parse(response);
          main.innerText = json.username;
          main.appendChild(document.createElement("br"));
          var img = document.createElement("img");
          img.src = json.profile.images["90x90"];
          main.appendChild(img);
          var end = document.createElement("div");
          end.style = "white-space: pre;"; // allow multiple spaces in a row
          // end contents
          var bio = document.createElement("div");
          bio.innerText = json.profile.bio;
          end.appendChild(bio);
          var status = document.createElement("div");
          status.innerText = json.profile.status;
          end.appendChild(status);
          var country = document.createElement("div");
          country.innerText = "In " + json.profile.country;
          end.appendChild(country);
          //
          main.appendChild(end);
          finish();
        },
        function(status) {
          main.innerText = status;
          finish();
        }
      );
      break;
    case "p":
    case "e":
      request(
        "https://api." + output.substring(8),
        function(response) {
          var json = JSON.parse(response);
          main.innerText = json.title;
          main.appendChild(document.createElement("br"));
          var img = document.createElement("img");
          img.src = json.image;
          main.appendChild(img);
          var end = document.createElement("div");
          end.style = "white-space: pre;"; // allow multiple spaces in a row
          // end contents
          var author = document.createElement("div");
          author.innerText = "By " + json.author.username;
          end.appendChild(author);
          var instruct = document.createElement("div");
          instruct.innerText = json.instructions;
          end.appendChild(instruct);
          var describe = document.createElement("div");
          describe.innerText = json.description;
          end.appendChild(describe);
          var stats = document.createElement("div");
          stats.innerText =
            "" +
            json.stats.views +
            " views, " +
            json.stats.loves +
            " loves, " +
            json.stats.favorites +
            " favorites, " +
            json.stats.comments +
            " comments, " +
            json.stats.remixes +
            " remixes.";
          end.appendChild(stats);
          //
          main.appendChild(end);
          finish();
        },
        function(status) {
          main.innerHTML = status;
          finish();
        }
      );
      break;
    case "s":
      request(
        output,
        function(response) {
          var html = document.createElement("html");
          html.innerHTML = response;
          main.innerText = html.childNodes[0].childNodes[9].innerText.substring(
            17
          );
          main.appendChild(document.createElement("br"));
          var img = document.createElement("img");
          img.src =
            "//cdn2.scratch.mit.edu/get_image/gallery/" +
            output.substring(31) +
            "_480x360.png";
          main.appendChild(img);
          var end = document.createElement("div");
          end.style = "white-space: pre;"; // allow multiple spaces in a row
          // end contents
          var describe = document.createElement("div");
          describe.innerText =
            html.childNodes[2].childNodes[3].childNodes[5].childNodes[5].childNodes[1].childNodes[3].childNodes[9].childNodes[1].childNodes[1].childNodes[1].innerText;
          end.appendChild(describe);
          var intruct = document.createElement("div");
          instruct.innerText =
            html.childNodes[2].childNodes[3].childNodes[5].childNodes[5].childNodes[1].childNodes[3].childNodes[9].childNodes[1].childNodes[1].childNodes[3].innerText;
          end.appendChild(instruct);
          var followers = document.createElement("div");
          followers.innerText =
            html.childNodes[2].childNodes[3].childNodes[5].childNodes[5]
              .childNodes[3].childNodes[1].childNodes[1].childNodes[3]
              .childNodes[3].childNodes[1].innerText + " Followers";
          end.appendChild(followers);
          //
          main.appendChild(end);
          var list = document.createElement("ul");
          main.appendChild(list);
          request(
            "https://scratch.mit.edu/site-api/projects/in/" +
              output.substring(31) +
              "/1/",
            function(response) {
              list.innerHTML = response;
              finish();
            },
            function(status) {
              list.innerHTML = status;
              finish();
            }
          );
        },
        function(status) {
          main.innerText = status;
          finish();
        }
      );
      break;
  }
}

if (window.location.hash === "") {
  window.location.replace("./home/");
} else {
  var output = longUrl(window.location.hash);
  if (getCookie("preview") === "false") {
    window.location.replace(output);
  }
  preview(window.location.hash[1], output);
}
