//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-sonali:Test123@cluster0.4md7t.mongodb.net/todolistDB");

//// ITEM SCHEMA////
//const itemsSchema = { name: String};
//const todoValidator=[validate({message: "you got no work"})]
const itemsSchema = {name: {type: String, required:true}};

const Item = mongoose.model("Item",itemsSchema);
//default items//

const item1 = new Item ({
  name:"science homework"
});

const item2 = new Item (
  {
    name:"buy milk"
  }
);

const item3 = new Item ({
name:"lab journals"
});

const defaultItems = [item1, item2, item3];


//custom list item schema//
const listSchema = {
  //name: String,
  name: {type: String, required: true},
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);



app.get("/", function(req, res) {

Item.find({}, function(err, foundItems)
{
    if(foundItems.length === 0)
    {
      Item.insertMany(defaultItems, function(err){
        if(err)
        {
          console.log(err);
        }
        else
        {
          console.log("success");
        }
      });
      res.redirect("/");
      }
    else{
      res.render("list", {listTitle:"Today", newListItems: foundItems});
    }

})
});

/////CUSTOM LIST//////
app.get("/:customListName", function(req, res)
{
  const customListName= _.capitalize(req.params.customListName);
  List.findOne({name: customListName}, function(err,foundList){
    if(!err)
    {
       if(!foundList){
         const list = new List({
           name: customListName,
           items:defaultItems
         });

         list.save();
         res.redirect("/" + customListName);
       }else{
         res.render("list", {listTitle:foundList.name, newListItems: foundList.items})
       }
    }
  });
});

// add new item//
app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

   const item = new Item ({
     name:itemName
   });


if(listName === "Today")
{
  item.save();
  res.redirect("/");
}else{
  //for custom list//
  List.findOne({name: listName}, function(err, foundList){
    foundList.items.push(item);
    foundList.save();
    res.redirect("/" + listName);
  })
}

});

//delete item//
app.post("/delete", function(req , res){

const checkedItemId = req.body.checkbox;
const listName = req.body.listName;
 if(listName === "Today") {
  Item.findByIdAndRemove(checkedItemId, function(err){
    if(!err)
    {
      console.log("successfully deleted");
      res.redirect("/");
    }
  });
} else{
  List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList)
{
  if(!err)
  {
    res.redirect("/" + listName);
  }
})
}
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
