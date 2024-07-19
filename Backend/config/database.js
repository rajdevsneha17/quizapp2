const mongoose=require("mongoose");
require("dotenv").config();
const dbConnect=()=>{
    console.log('CONNECT:',process.env.DATABASE_URL);
    mongoose.connect(process.env.DATABASE_URL,{
    useNewURLParser:true,
    useUnifiedTopology:true,
    })
.then(()=>console.log("Db's connection successful"))
.catch((error)=>{
console.log("error",error);
process.exit(1);
});
}
module.exports=dbConnect;   