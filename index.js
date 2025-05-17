let express=require("express");
let db=require("./db");
let bodyParser=require("body-parser");
let app=express();

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.render("nav.ejs");
});

app.get("/newcourse",(req,res)=>{
  res.render("newcourse.ejs",{msg:" "});
});

app.get("/viewcourse",(req,res)=>{

  db.query("select * from course ",(err,result)=>{
          if(err)
          {
            
          }else{
            res.render("viewcourse.ejs",{data:result});
          }
  })

});

app.get("/delById",(req,res)=>{
  let csid=parseInt(req.query.csid.trim());
  db.query("delete from course where cid=?",[csid],(err,result)=>{
    db.query("select * from course ",(err,result)=>{
      if(err)
      {
        
      }else{
        res.render("viewcourse.ejs",{data:result});
      }
})

  });
});
app.get("/updateByID",(req,res)=>{
  let csid=parseInt(req.query.csid.trim());
  
  db.query("select * from course where cid=?",[csid],(err,result)=>{
     if(err){
              
     }else{
      res.render("updatecourse.ejs",{courseupdate:result});
     }
     
  });
});
app.post("/finalupdatedata",(req,res)=>{
 let{cid,cname}=req.body;
  db.query("update course set cname=? where cid=?",[cname,cid],(err,result)=>
{
  
  db.query("select * from course ",(err,result)=>{
          if(err)
          {
            
          }else{
            res.render("viewcourse.ejs",{data:result});
          }
  });
});
});

app.get("/coursesearch",(req,res)=>{
 let cname=req.query.csname;
 db.query("select * from course where cname like '%"+cname+"%' ",(err,result)=>{
  
      if(err){
          console.log("Error is: ",err);
          res.render("viewcourse.ejs");
      }
      else{
        res.json(result);
      }
    
 });
});

app.post("/save",(req,res)=>{
  let n=req.body.cname.trim();

   db.query("insert into course values('0',?)",[n],(err,result)=>{
        if(err)
        {
          
        }else{
          res.render("newcourse.ejs",{msg:"Course Add Successfully...."});

        }
   });
});

app.get("/newstudent",(req,res)=>{
  db.query("select * from course  ",(err,result) =>{
    if(err){
          res.send("err"+err);
    }else{
        res.render("addstudent.ejs", {coursedata: result,msg:""});
    }
 });
});

app.post("/savestudent",(req,res)=>{
  let {sname,semail,scontact,cid}=req.body;
  db.query("insert into student values('0',?,?,?,?)",[sname,semail,scontact,cid],(err,result)=>{
    db.query("select * from course  ",(err,result) =>{
      if(err){
            res.send("err"+err);
      }else{
          res.render("addstudent.ejs", {coursedata: result,msg:"save data successfully...."});
      }
   });
  });
});



app.get("/viewstudent",(req,res)=>{

  db.query("select s.sid,s.sname,s.semail,s.scontact,c.cname from course c join student s on c.cid=s.cid  ",(err,result) =>{
    if(err){
          res.send("err"+err);
    }else{
        res.render("viewstudent.ejs", {viewdata: result});
    }
 });

});
app.get("/delByIdStudent",(req,res)=>{
  let ssid=parseInt(req.query.ssid.trim());
  console.log(ssid);
  db.query("delete from student where sid=?",[ssid],(err,result)=>{
    db.query("select s.sid,s.sname,s.semail,s.scontact,c.cname from course c join student s on c.cid=s.cid  ",(err,result) =>{
      if(err){
            res.send("err"+err);
      }else{
          res.render("viewstudent.ejs", {viewdata: result});
      }
   });
  
  });

});

app.get("/updateByIdStudent",(req,res)=>{
 
  let ssid=parseInt(req.query.ssid);
   db.query("select * from student where sid=?",[ssid],(err,studentupdateresult)=>{
         if(err)
         {
          console.log(err);
         }

         db.query("select * from course ",(err,courseupdateresult)=>{
          if(err){
            console.log(err);
          }

          res.render("updatestudent.ejs",{upstudentdata:studentupdateresult,upcoursedata:courseupdateresult});
         });
   });
  
  });

  app.get("/search",(req,res)=>{
 let sname=req.query.val;
 db.query("select s.sname,s.semail,s.scontact,c.cname from student s join course c on s.cid=c.cid where sname like ? or  semail like ?  or cname like ? ",[`%${sname}%`,`%${sname}%`,`%${sname}%`],(err,result)=>{
   if(err){
    console.log(" problem"+err)
   }else{
     res.json(result);
   }
 })
});



 app.post("/finalupdatestudent",(req,res)=>{
  let {sid,sname,semail,scontact,cid}=req.body;
   db.query("update student set sname=?,semail=?,scontact=?,cid=? where sid=?",[sname,semail,scontact,cid,sid],(err,result)=>{
    db.query("select s.sid,s.sname,s.semail,s.scontact,c.cname from course c join student s on c.cid=s.cid  ",(err,result) =>{
      if(err){
            res.send("err"+err);
      }else{
          res.render("viewstudent.ejs", {viewdata: result});
      }
   });
   });
 });




app.get("/coursereport",(req,res)=>{
  let courseId=req.query.cid;
  db.query("select * from course",(err,courseupdateresult)=>{
    if(!courseId)
    {
     return res.render("coursewisestudent.ejs",{ccdata:courseupdateresult,ssdata:[],cid:null});
    }

    db.query("select s.sid,s.sname,s.semail,s.scontact,c.cname from course c join student s on c.cid=s.cid where c.cid=?",[courseId],(err,studentupdateresult)=>{
    
      res.render("coursewisestudent.ejs",{ccdata:courseupdateresult,ssdata:studentupdateresult,cid:courseId});
     
    });
  });
});
app.get("/delByIdreport",(req,res)=>{
  let srid=parseInt(req.query.srid.trim());
 db.query("delete from student where sid=?",[srid],(err,result)=>{
  let courseId=req.query.cid;
  db.query("select * from course",(err,courseupdateresult)=>{
    if(!courseId)
    {
     return res.render("coursewisestudent.ejs",{ccdata:courseupdateresult,ssdata:[],cid:null});
    }

    db.query("select s.sid,s.sname,s.semail,s.scontact,c.cname from course c join student s on c.cid=s.cid where c.cid=?",[courseId],(err,studentupdateresult)=>{
    
      res.render("coursewisestudent.ejs",{ccdata:courseupdateresult,ssdata:studentupdateresult,cid:courseId});
     
    });
  });
 });
});
app.get("/studentreport",(req,res)=>{
  let studentcourseid=req.query.cid;
  db.query("select * from course",(err,countstudentresult)=>{
    if(err)
    {
     console.log(err)
    }
    if(!studentcourseid){
      return res.render("studentcount.ejs",{countco:countstudentresult,countst:[],cid:null});
    }
    db.query("select count(*) as studentcount from student where cid=?",[studentcourseid],(err,studentcountresult)=>{
       if(err)
       {
        console.log(err)
       }

       res.render("studentcount.ejs",{countco:countstudentresult,countst:studentcountresult,cid:studentcourseid});
    });
   
  });
 
});




app.listen(4000,()=>{
  console.log("server started 4000");
});