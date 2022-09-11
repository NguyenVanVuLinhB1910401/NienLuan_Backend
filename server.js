const app = require("./app");
const config = require("./app/config");
const mongoose = require("mongoose");
const multer = require("multer");
//start server
async function startServer() {
    try {
        
        await mongoose.connect(config.db.uri, {}, () => {
            console.log("Connected");
        })
        
        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    } catch (err) {
        console.log("Cannot connect to the database", err);
        process.exit();
    }
}

startServer();