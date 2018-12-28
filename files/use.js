function fromB64(string) {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
    var octal = "";
    var digit;
    for (var index = 0; index < string.length; index ++) {
	digit = chars.indexOf(string[index]);
	octal += chars[digit >> 3] + chars[digit & 7]
    }
    return parseInt(octal, 8);
}

function project() {
    var code = String(window.location).split('#')[1];// gobo.cf/p#<id>
    var projectid = fromB64(code);
    window.location.replace("https://scratch.mit.edu/projects/" + projecct + "/");
}
function editor() {
    var code = String(window.location).split('#')[1];// gobo.cf/p/e#<id>
    var projectid = fromB64(code);
    window.location.replace("https://scratch.mit.edu/projects/" + projectid + "/#editor");
}
function topic() {
    var code = String(window.location).split('#')[1];// gobo.cf/d#<id>
    var topicid = fromB64(code);
    window.location.replace("https://scratch.mit.edu/discuss/topic/" + topicid + "/");
}
function studio() {
    var code = String(window.location).split('#')[1];// gobo.cf/s#<id>
    var studioid = fromB64(code);
    window.location.replace("https://scratch.mit.edu/studios/" + studioid + "/");
}
function topic() {
    var code = String(window.location).split('#')[1];// gobo.cf/d#<id>
    var topicid = fromB64(code);
    window.location.replace("https://scratch.mit.edu/discuss/topic/" + topicid + "/");
}
function user() {
    var code = String(window.location).split('#')[1];// gobo.cf/u#<username>
    window.location.replace("https://scratch.mit.edu/users/" + code + "/");
}
