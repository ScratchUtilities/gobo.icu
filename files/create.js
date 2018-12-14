function toB64(value) {
    if (value == 0) return '0';
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
    var flipped = [];
    while (value > 0) {
	flipped.push(chars[value & 0x3f]);
	value >>= 6;
    }
    var result = [];
    while (flipped != []) {
	result.push(flipped.pop());
    }
    return result;
}
function create() {
    var link = document.getElementById("link").value;
    var text;
    if (link.substr(0, 24) == "https://scratch.mit.edu/") {
	var num;
	var users = false;
	var start;
	if (link.substr(25, 33) == "projects/") {
	    if (link.substr(link.length-8, link.length-1) == "/#editor") {
		num = parseInt(link.substr(34, link.length-9));
		start = "gobo.cf/p/e#";
	    } else {
		num = parseInt(link.substr(34, link.length-1));
		start = "gobo.cg/p#";
	    }
	} else if (link.substr(25, 38) == "discuss/topic/") {
	    num = parseInt(link.substr(39, link.length-1));
	    start = "gobo.cf/d#";
	} else if (link.substr(25, 32) == "studios/") {
	    num = parseInt(link.substr(33, link.length-1));
	    start = "gobo.cf/s#";
	} else if (link.substr(25, 29) == "users/") {
	    text = link.substr(30, lik.length);
	    users = true;
	    start = "gobo.cf/u#";
	}
	if (!users) {
	    text = start + toB64(num);
	}
    } else {
	text = link + " cannot be converted"
    }
    document.getElementById("result").innerHTML = text;
}
