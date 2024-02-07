const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const port = 3000;

const app = express();
const ejs = require("ejs");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const items = [];
const workItems = [];

app.get("/", (req, res) => {
    
  const day =  date.getDate();

  res.render("list", {
    listTitle: day,
    newListItems: items,
  });
});

app.post("/", (req, res) => {
    
    item = req.body.newItem;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }


  console.log(item);
  

});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", (req, res) => {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
