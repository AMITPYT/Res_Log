const express = require("express");
require("./db");
const Routerss = require("./router/userrouter")
const Details = require("./router/Otherdetails")
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json());
// app.use(cors());
// app.use(express.json());

app.use(Routerss)
app.use(Details)


app.listen(port, () => {
    console.log(`connection is setup at localhost:${port}`)
})