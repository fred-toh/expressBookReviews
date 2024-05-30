const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  }
  return res.status(404).json({message: "Unable to register user."});
//   return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  new Promise((resolve, reject) => {
    try {
        resolve(res.send(JSON.stringify(books, null, 4)));
    } catch(err) {
        reject(err);
    }});
//   return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  new Promise((resolve, reject) => {
    try {
        const isbn = req.params.isbn;
        resolve(res.send(books[isbn]));
    } catch(err) {
        reject(err);
    }});
//   return res.status(300).json({message: "Yet to be implemented"});
 });

// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  //Write your code here
    try {
        const collection = [];
        await (()=>{
            const author = req.params.author;
            for (let [key, obj] of Object.entries(books)) {
                if (obj.author == author) {
                    collection.push(books[key]);
                }
            }    
        })();
        res.send(JSON.stringify(collection, null, 4));
    } catch(err) {
        console.log(err);
    }
//   return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  //Write your code here
    try {
        const collection = [];
        await (()=>{
            const title = req.params.title;
            for (let [key, obj] of Object.entries(books)) {
                if (obj.title == title) {
                    collection.push(books[key]);
                }
            }
        })();
        res.send(JSON.stringify(collection, null, 4));
    } catch(err) {
        console.log(err);
    }
//   return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
//   return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
