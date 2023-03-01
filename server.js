// Modules
require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const rootRoute = require("./routes/root")
const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/books");


// Constants
const app = express();
const corsOptions = require('./config/corsOptions')

//Middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(express.static("public"));

//Routes
app.use("/", rootRoute);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  }
  else if(req.accepts('json')){
    res.json({message:"404 Not Found"})
  }
  else{
    res.type('txt').send('404 Not Found');
  }
});


//connect to db
mongoose.set('strictQuery', true); 
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for request
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to db & listening for request on port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
