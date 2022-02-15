const mongoose = require('mongoose');
const url = `mongodb+srv://MeemikRoy:RobhikRoy@cluster0.8uzz4.mongodb.net/Airothon?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const dbConn = mongoose.connection;

dbConn.on("error", console.error.bind(console, "Connection Error"));
dbConn.on("open", function () {
    console.log("DB Connection Successful");
})

module.exports = dbConn;