require('dotenv').config()
const express = require('express')
const{queryhandler}=require('./middlewares/querymiddlewares')
const{checkforauthentication,isAdmin}=require('./middlewares/auth')
const path = require('path')
const cookieparser=require('cookie-parser');
const {connecttoserver}=require("./services/connection")
const formroute=require("./routes/form")
const paperroute=require("./routes/paper")
const app = express()

//connection with the server
connecttoserver()

//acception form data
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//using cookieparser
app.use(cookieparser())

//using checkforauthentiaction
app.use(checkforauthentication('token'))

//handling all the query and the active case
app.use(queryhandler())

//serving the static files
app.use(express.static(path.resolve("./public")))

//home route
app.get("/",(req,res)=>{
res.render("home",{
admin:req.admin,
})
})

//route handling for browsepaper
app.use("/form",formroute)
app.use("/admin",isAdmin,paperroute)

//setting the view engine
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

//app listening
let port=process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Your app listening on port ${port}`)
})

