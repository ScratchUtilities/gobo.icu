function shortenUrl(url) {
    var split = url.split("/");
    // do you know what dictionarries are for?
    var types = {"users": "u", "projects": "p", "studios": "s", "discuss": "d"};
    var id;
    if (types.indexOf(split[3]) >= 0) {
	if (split[3] == "discuss") {
	    id = split[5];
	} else {
	    id = split[4];
	}
	var type = types[split[3]]//split[3][0]//["u", "p", "s", "d"][types.indexOf(split[3])];
	if (type != "u") {
	    id = base62.encode(id);
	}
	if (type == "p" && split[5] == "editor") {
	    return "https://gobo.cf/e#" + id;
	} else {
	    return "https://gobo.cf/" + type + "#" + id;
	}
    } else {
	return "Invalid URL";//it's invalid, not unvalid.
    }
}

function longUrl(url) {
    var urlStarts = [
	"u": "https://scratch.mit.edu/users/",
	"p": "https://scratch.mit.edu/projects/",
	"e": "editor",
	"s": "https://scratch.mit.edu/studios/",
	"d": "https://scratch.mit.edu/discuss/topic/"
    ];
    var data = url.split("/");
    var type = urlStarts[data[3]];
    if (type == "https://scratch.mit.edu/users/") {
	return type + data[4].replace("#", "");
    } else {
	if (type == "editor") {
	    return (
		"https://scratch.mit.edu/projects/" +
		    base62.decode(data[4].replace("#", "")) +
		    "/editor"
	    );
	} else {
	    return type + base62.decode(data[4].replace("#", ""));
	}
    }
}

const base62 = {
    charset: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".split(
	""
    ),
    encode: integer => {
	if (integer === 0) {
	    return "0";
	}
	let s = [];
	while (integer > 0) {
	    s = [base62.charset[integer % 62], ...s];
	    integer = Math.floor(integer / 62);
	}
	return s.join("");
    },
    decode: chars =>
	chars
	.split("")
	.reverse()
	.reduce(
            (prev, curr, i) => prev + base62.charset.indexOf(curr) * 62 ** i,
            0
	)
};
