let courseajax=(str)=>{
    let xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function (){
         if(this.readyState==4 && this.status==200)
         {
            let tblbody=document.getElementById("tblbody");
                tblbody.innerHTML="";
           let responseData=this.responseText;
           let jsonObj=JSON.parse(responseData);

            jsonObj.forEach((item,index)=>{
                 let row=document.createElement("tr");
                 let column=document.createElement("td");
                     column.innerHTML=""+(index+1);
                     row.appendChild(column);

                     column=document.createElement("td");
                     column.innerHTML=""+(item.cname);
                     row.appendChild(column);

                 column = document.createElement("td");
                column.innerHTML = `<a href="/delById?csid=${item.cid}"><i class="fa-solid fa-trash"></i></a>`;
                row.appendChild(column);

                column = document.createElement("td");
                column.innerHTML = `<a href="/updateByID?csid=${item.cid}"><i class="fa-solid fa-pen-to-square"></i></a>`;
                row.appendChild(column);

                     tblbody.appendChild(row);
            });

            }

            }
        
        xhttp.open("GET","/coursesearch?csname="+str,true);
         xhttp.send();
}