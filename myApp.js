
let express = require('express');
let bodyParser = require('body-parser')


let app = express();
console.log("Hello World")
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use((req,res,next)=>{
  console.log(`${req.method} ${req.path} - ${req.ip}`);
   next()
})

app.use("/public", express.static(__dirname + "/public"))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})


    app.get("/now",(req,res,next)=>{
    req.time = new Date().toString();
      next();
},
           (req,res)=>{
             res.json({time:req.time})
           })

app.get("/json",(req,res)=>{
  if (process.env['MESSAGE_STYLE'] == "uppercase") {
    res.json({"message":"HELLO JSON"})
  } else {
    res.json({"message":"Hello json"})
  }
   
})

app.get('/:word/echo',(req,res)=>{
  let {word}=req.params;
  res.json({echo:word})
})



app.post('/name',(req,res)=>{
  let {first,last}=req.body
  res.json({name: `${first} ${last}`})
})

app.get('/name',(req,res)=>{
  let {first,last}=req.query
  res.json({name: `${first} ${last}`})
})































module.exports = app;
