const mongoose = require("mongoose")
require('dotenv').config();
mongoose.connect(process.env.LOCAL_URL)
.then(() => {
    console.log("Connected to MongoDB");
})
    .catch(() => {
        console.log("Fsiled to connect");
    })


const logInSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role:
        {
            type: String,
            default: 'user',
            required:true
        }
    })

const collection = new mongoose.model("Collection", logInSchema);
module.exports = collection;
