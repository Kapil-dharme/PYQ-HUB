const mongoose = require("mongoose")
let connecturl =process.env.MONGODB_URI || "mongodb://localhost:27017/PYQ-HUB"
async function connecttoserver() {
    return await mongoose.connect(connecturl).then(() => console.log("mongodb connected")).catch((err) => console.log(err))
}
module.exports = { connecttoserver };