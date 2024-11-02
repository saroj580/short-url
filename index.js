const express = require("express");
const { connectMongoDb } = require("./connection");

const app = express();
const PORT = 8000;

//importing
const urlRoute = require("./routes/route");  // No curly braces
//connection 
connectMongoDb("mongodb://127.0.0.1:27017/Short-URL")
    .then(() => console.log("MongoDb connected"))
    .catch((err) => console.log("Error while connecting Mongodb", err));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes 
app.use("/url", urlRoute);

app.listen(PORT, () =>{
    console.log(`server started at http://localhost:${PORT}`);
})