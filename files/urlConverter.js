function shortenUrl(url){
  try{
    var split = url.split("/");
    var types = ["users", "projects", "studios", "discuss"];
    if (types.indexOf(split[3]) >= 0){
      if (split[3] == "discuss"){var id = split[5];}else{var id = split[4];}
      type = ["u","p","s","d"][types.indexOf(split[3])]
      if (type != "u"){id=base62.encode(id)}
      return("https://gobo.cf/" + type + "#" + id)
    }else{return("Unvalid URL")}
  }catch(err){
    return(err);
  }
}

function longUrl(url){
  var urlStarts =
  ["https://scratch.mit.edu/users/",
  "https://scratch.mit.edu/projects/",
  "https://scratch.mit.edu/studios/",
  "https://scratch.mit.edu/discuss/topic/"];
  return(urlStarts[["u","p","s","d"].indexOf(url.split("/")[3])] + base62.decode(url.split("/")[4]));
}

const base62 = {
  charset: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'
    .split(''),
  encode: integer => {
    if (integer === 0) {
      return 0;
    }
    let s = [];
    while (integer > 0) {
      s = [base62.charset[integer % 62], ...s];
      integer = Math.floor(integer / 62);
    }
    return s.join('');
  },
  decode: chars => chars.split('').reverse().reduce((prev, curr, i) =>
    prev + (base62.charset.indexOf(curr) * (62 ** i)), 0)
};
