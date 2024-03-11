const express = require("express");
const app = express();
const mongo = require("./conn/conn");
const auth = require("./routes/auth");
const list = require("./routes/list");

app.use(express.json());

app.get("/", (req, res) =>{
  res.send("Hello from the server!");
});

app.use("/api/v1", auth);
app.use("/api/v2", list);


app.listen(8080, () =>{
  console.log("Server Started!");
});

