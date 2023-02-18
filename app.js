//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://admin-sourabh:admin@todolist.di4be0t.mongodb.net/toDoListDB");

const itemSchema = mongoose.Schema({
  item: String
});

const itemModel = mongoose.model("Item" , itemSchema);




app.get("/", function(req, res) {

const day = date.getDate();

itemModel.find({} , function(err , data){
    
     res.render("list", {listTitle: day, newListItems: data});
    });
});

app.post("/", function(req, res){

  const item = new itemModel( {item: req.body.newItem});;
  item.save();
  console.log("Successfully Inserted!");
  res.redirect("/");
});

app.post("/delete" , function(req , res){
    itemModel.findByIdAndRemove(req.body.checkbox , function(err){
      if(!err){
        console.log("Successfully Deleted!");
      }
      else{
        console.log(err);
      }
      res.redirect("/");
    })
})

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
