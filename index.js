var storeSeats = [];
var aldreadyBooked = 0;
function Init() {
    var myDiv1 = document.getElementsByClassName('myDiv1')[0];
    var myDiv2 = document.createElement("div");
    var tbl = document.createElement('table');
    tbl.style.paddingTop="20px";
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < 5; i++) {
      var tr = document.createElement('tr');
      for (var j = 0; j < 10; j++) {
          var td = document.createElement('td');
          
          var button = document.createElement("button");
          button.value = "hello";
          button.style.width = "100px";
          button.style.height = "80px";
          button.style.backgroundColor = "#e6e3dc";
          button.style.borderRadius="50%";
          button.style.fontFamily = "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif";
          button.onclick = f1;
          button.innerHTML =String.fromCharCode(65 + i) + "-"+ j.toString();
          button.style.fontSize = "20px";
          
          td.appendChild(button);
          tr.appendChild(td)
      }
      tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    myDiv2.appendChild(tbl);

    var confirmButton = document.createElement('button');
    confirmButton.style.width = "300px";
    confirmButton.style.height = "60px";
    confirmButton.style.backgroundColor = "#008CBA";
    confirmButton.style.color = "white";
    confirmButton.style.borderRadius= "20px";
    confirmButton.style.fontSize = "25px";
    confirmButton.innerHTML = "CONFIRM";
    confirmButton.onclick  = f2;
    var confirmDiv = document.createElement('div');
    confirmDiv.style.paddingLeft = "35%";
    confirmDiv.style.paddingTop = "20px";
    

    confirmDiv.appendChild(confirmButton);
    myDiv2.appendChild(confirmDiv);
    myDiv2.style.width  = "1000px";
    myDiv2.style.margin = "0 auto";
    myDiv1.appendChild(myDiv2);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "action.php", true);

    xhr.onreadystatechange = function() {

        if(xhr.readyState == 4 && xhr.status == 200) {
            var return_data = xhr.responseText;
            console.log(return_data);
            var resArr = JSON.parse(return_data); 
            var getButtons = document.getElementsByTagName("button");           
            for(var i=0;i<resArr.length;i++){
                for(var j=0;j<getButtons.length;j++){
                    if(resArr[i]==getButtons[j].innerHTML){
                        getButtons[j].style.color = "white";
                        getButtons[j].style.backgroundColor = "red";
                        getButtons[j].disabled = true;
                        storeSeats.push(getButtons[j].innerHTML);
                        aldreadyBooked = aldreadyBooked+1;
                    }
                }
           }
           
        }
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.send("json_string=" + (JSON.stringify(storeSeats)));
  }

  function f1(e){
      
      if(e.target.style.backgroundColor == "green"){
        e.target.style.backgroundColor = "#e6e3dc";
        e.target.style.color = "black";

        for( var i = 0; i < storeSeats.length; i++){ 
            if ( storeSeats[i] === e.target.innerHTML) {
              storeSeats.splice(i, 1); 
            }
         }
      }
      else{
        e.target.style.backgroundColor = "green";
        e.target.style.color = "white";
        storeSeats.push(e.target.innerHTML);
      }

      console.log(storeSeats);
  }

  function f2(e){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "action.php", true);

    xhr.onreadystatechange = function() {

        if(xhr.readyState == 4 && xhr.status == 200) {
            var return_data = xhr.responseText;
            console.log(return_data);
            var resArr = JSON.parse(return_data); 
            var getButtons = document.getElementsByTagName("button");           
            for(var i=0;i<resArr.length;i++){
                for(var j=0;j<getButtons.length;j++){
                    if(resArr[i]==getButtons[j].innerHTML){
                        getButtons[j].style.color = "white";
                        getButtons[j].style.backgroundColor = "red";
                        getButtons[j].disabled = true;
                    }
                }
           }
           
        }
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    if(storeSeats.length==0){
        alert("Please choose a seat");
    }
    else{
    xhr.send("json_string=" + (JSON.stringify(storeSeats)));
    confirm("Are You Sure to book selected seats..");
    }
}

Init();
