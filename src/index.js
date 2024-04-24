
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const templatePath = path.join(__dirname, '../templates');
const collection=require("./mongodb");

// models
const books = require('../models/books'); // Importing the books model schema

app.use(express.json());
app.set("view engine", 'hbs');
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("login");
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.post("/signup", async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            password: req.body.password
        }
        // Assuming 'books' is your model, insert data into MongoDB using Mongoose
        // const newBook = await books.create(data);
        await collection.insertMany([data])
        res.render("login"); // Assuming you want to render the login page after signup
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error"); // Sending an error response
    }
})

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });
        if (!check) {
            return res.send("User not found"); // User does not exist
        }
        if (check.password === req.body.password) {
            if (check.name === 'admin') {
                res.render("home");
            } else {
                res.render("user");
            }
        } else {
            res.send("Wrong password");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error"); // Sending an error response
    }
})

app.post('/books', async (req, res) => {
    try {
        const { title, author } = req.body;
        const book = new Book({ title, author });
        await book.save();
        res.status(201).json(book); // Sending the created book object as JSON response
    } catch (err) {
        console.error('Error creating book', err);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(3001, () => { console.log('Server is running on port 3001') });




