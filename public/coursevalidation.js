let flag=true;
let namevalid=true;
function coursevalidation(str)
{
     flag=true;
     if(str.trim().length === 0)
     {
       flag=false;
     }else{
    let validatecourse=document.getElementById("cone");
    setTimeout(()=>{
     validatecourse.style.display="none";
     },3000);
    for(var i=0;i<str.length;i++)
    {
        let ch=str.charCodeAt(i);
     
        if((ch>=65&&ch<=90)||(ch>=97&&ch<=122)||ch==32)
        {
         flag=true;
          continue;
        }else{
         flag=false;
         break;
        }
    }

    if(flag)
    {
        validatecourse.style.color="green";
        validatecourse.innerHTML="valide name"

    }else{
        validatecourse.style.color="red";
        validatecourse.innerHTML="Invalide name"
         
    }
    return flag;
   }
  
}


function submitform()
{
    if(flag )
    { 
         return true;
    }else{
        let cc=document.getElementById("h")
        cc.innerHTML="plz Fill the Valid Data";
        cc.style.color="red";

        setTimeout(()=>{
         cc.style.display="none";
        },3000);
         return false;
         
    }
}

window.onload = function () {
    let msgSpan = document.getElementById("mess");
        msgSpan.style.color="green"
    if (msgSpan && msgSpan.innerHTML.trim() !== "") {
        setTimeout(() => {
            msgSpan.style.display = "none";
        }, 3000); // hide after 3 seconds
    }
};

