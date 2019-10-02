

const express = require("express")

const app = express() ;

const path = require("path");
const PORT = process.env.PORT || 5000 ;
// const routes = require("./routes/members")
// const members = require("./memberList")
const logger = require("./Log/logger")

app.use(express.json()) ;
app.use(express.urlencoded({extended: false}))

app.use(logger)
app.get("/hello",(req,res)=>{
res.send("<h1>Hello API World</h1>")
})

app.get("/index",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"))
})

// Set public folder statically
// This is how we can setup Page by default 
app.use(express.static(path.join(__dirname,"public")))

// Call Members List and post it

app.use("/api/member",require("./routes/members"))

app.listen(PORT,()=> {
    console.log(`Server has started on ${PORT}`);
    
})