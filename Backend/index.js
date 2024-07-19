const express=require("express")
const app=express()
const PORT=process.env.PORT||7007
const cors=require("cors")
app.use(
	cors())
app.use(express.json())

const routes=require("./routes/mainroutes")
app.use("/",routes)

app.listen(PORT,()=>{
console.log(`successfully running at ${PORT}`)
})

const dbconnect=require("./config/database")
dbconnect();

app.get("/",(req,res)=>{
    res.send("running")
})