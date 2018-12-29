function toB64(num) {
    var octal = num.toString(8);
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";// starts with chars for octal
    var result;
    var index;
    if (octal.length%2) {
	index = 1;
	result = octal[0];
    } else {
	index = 0;
	result = "";
    }
    while (index < octal.length) {
	result += chars[chars.indexOf(octal[index])*8+
			chars.indexOf(octal[index+1])];
	index += 2;
    }
    return result;
}
function create() {
    var link = document.getElementById("link").value;
    var text;
    if (link.substring(0, 24) == "https://scratch.mit.edu/") {
	var num;
	var users = false;
	var start;
	if (link.substring(24, 33) == "projects/") {
	    if (link.substring(link.length-8, link.length-1) == "/#editor") {
		num = parseInt(link.substring(33, link.length-42));
		start = "gobo.cf/p/e#";
	    } else {
		num = parseInt(link.substring(34, link.length-1));
		start = "gobo.cf/p#";
	    }
	} else if (link.substring(24, 38) == "discuss/topic/") {
	    num = parseInt(link.substring(38, link.length-1));
	    start = "gobo.cf/d#";
	} else if (link.substring(24, 32) == "studios/") {
	    num = parseInt(link.substring(32, link.length-1));
	    start = "gobo.cf/s#";
	} else if (link.substring(24, 30) == "users/") {
	    text = link.substring(30, link.length-1);
	    users = true;
	    start = "gobo.cf/u#";
	} else {
	    var result = document.getElementById("result");
	    result.href = link;
	    result.innerHTML = link;
	    document.getElementById("error").innerHTML = " is a common page";
	    return;
	}
	if (users) {
	    text = "http://" + start + text;// http is shorter and works
	} else {
	    text = "http://" + start + toB64(num);
	}
    } else {
	var result = document.getElementById("result");
	result.href = link;
	result.innerHTML = link;
	document.getElementById("error").innerHTML = " is not on scratch";
	return;
    }
    var result = document.getElementById("result");
    result.href = text;
    result.innerHTML = text;
    document.getElementById("error").innerHTML = "";
}
