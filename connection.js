const mongoose = require("mongoose");

//connect
async function connectMongoDb(url) {
    return mongoose.connect(url);
}

module.exports = {
    connectMongoDb,
}