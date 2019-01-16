function spawnUser(){
  for (i=0;i<contribUsersList["content-order"].length;i++) {
    if(contribUsersList["content-order"][i]=="br"){
      document.getElementById("contrib-users-put").appendChild(document.createElement("br"));
    }else{
      var object = contribUsersList["content"][(contribUsersList["content-order"][i])];

      var crElmCU = document.createElement("a");crElmCU.className="contrib-user";crElmCU.href=object["link"];
      var crElmCUP = document.createElement("img");crElmCUP.src=("https://avatars3.githubusercontent.com/u/"+object["userid"]);
      var crElmCUN = document.createElement("div");crElmCUN.className="contrib-user-name";crElmCUN.innerHTML=object["username"];

      if(object["team"]=="1"){
        crElmCUP.className="contrib-user-pic contrib-user-pic-big"
      }else{crElmCUP.className="contrib-user-pic"}

      crElmCU.appendChild(crElmCUP);crElmCU.appendChild(crElmCUN);

      document.getElementById("contrib-users-put").appendChild(crElmCU);
    }
  }
