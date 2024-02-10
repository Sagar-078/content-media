const express = require("express")
const app = express();
const cors = require("cors");
const db = require("./config/database");
const contentrouter = require("./routes/contentrouter");


require("dotenv").config();
// define Port
const PORT = process.env.PORT || 4000;

app.use(
    cors({
        origin: "*",
    })
);

// middle ware
app.use(express.json());

// connect with db
db.connect();

// mount the rout
app.use("/api/v1/content-media", contentrouter);

// listen port 
app.listen(PORT, () => {
    console.log(`app is listing at ${PORT}`);
})