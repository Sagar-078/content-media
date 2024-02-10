const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    // connect mongoo db by connect method
    mongoose.connect(process.env.MONGOOSE_URL)
    .then(console.log("DB connected successfully"))
    .catch((err) => {
        console.error("err while connecte DB");
        console.log(err);
        process.exit(1);
    })
}