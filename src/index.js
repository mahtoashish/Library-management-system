
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const templatePath = path.join(__dirname, '../templates');
const collection=require("./mongodb");
const entry=require("../models/books")
require('dotenv').config();

// models
const books = require('../models/books'); // Importing the books model schema
const PORT = process.env.PORT || 3001;

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
        const { name, author, category, price, quantity } = req.body;
        const book = new books({ name, author, category, price, quantity });
        await book.save();
        console.log('saved');
        res.status(201).json(book); // Sending the created book object as JSON response
    } catch (err) {
        console.error('Error creating book', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/books', async (req, res) => {
    try {
        // Fetch all books from the database
        const allBooks = await books.find();
        
        // Sending the array of books as a JSON response
        console.log("Fetched");
        res.status(200).json(allBooks);
    } catch (err) {
        // Handling errors
        console.error('Error fetching books:', err);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(PORT, () => { console.log('Server is running on port 3001') });




