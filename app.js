 const express = require("express");
 const bodyParser = require("body-parser");
 const ejs = require('ejs')
 const date = require(__dirname + "/date.js")
 const app = express();
 let userinputs = []
 let workItems = []



 app.set('view engine', 'ejs');

 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(express.static("public"));

 let options = {
     async: true,
 }

 app.get("/", function(req, res) {


     let day = date.getdate();

     res.render("list", {
         listTitle: day,
         newListItems: userinputs,


     });
 });

 app.post("/", function(req, res) {

     let userinput = req.body.newItem
     if (req.body.list === "Work") {
         workItems.push(userinput);
         res.redirect("/work");
     } else {
         userinputs.push(userinput);

         res.redirect("/")

     }

 })

 app.get("/work", function(req, res) {

     res.render("list", {
         listTitle: "Work list",
         newListItems: workItems,
     })
 })
 app.get("/about", function(req, res) {
     res.render("about");
 })
 app.post("/work", function(req, res) {
     let item = req.body.newItem;

     workItems.push(item);
     res.redirect("/work");
 })


 app.listen(3000, function() {
     console.log("Server started at on port 3000")
 });