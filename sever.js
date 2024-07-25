const express = require('express');
const app = express();
 require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send("Welcome to our hotel  ")
})





const personRoutes= require('./routes/personRoute');
const menuItemRoutes=require('./routes/menuItemRoutes');

app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes)

// single line comment
app.listen(4000, () => {
  console.log("Server on port 3000");
})