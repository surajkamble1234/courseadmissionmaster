let mysql=require("mysql2");

  let conn=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"root",
  database:"admissionmaster"
});

conn.connect("",(err,result)=>{
 if(err){
  console.log("some problem")
 }else{
  console.log("database is connected")
 }
});

module.exports=conn;