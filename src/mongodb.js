const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/Library")
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
