const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//Read (GET) all books in database
const getAllBooks = async (req, res, next) => {
    //Connect to books database
    const dataBack = await mongodb
        .getDb()
        .db('books')
        .collection('read')
        .find(); 
    //Print List     
    dataBack.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });  
};

//Read (GET) one book's info in database
const getOneBook = async (req, res, next) => {
    //Create new object based off id
    const BookId = new ObjectId(req.params.id);

    //Connect to books database
    const dataBack = await mongodb
        .getDb()
        .db('books')
        .collection('read')
        .find({ _id: BookId});
    //Print list
    dataBack.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json'),
        res.status(200).json(lists[0]);
    });
};

//Create (POST) new book info
const createBook = async (req, res, next) => {
    //New Book info
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        published: req.body.published,
        series: req.body.series,
        numberInSeries: req.body.numberInSeries,
        readAgain: req.body.readAgain,
    }
    //Connect to books database
    const dataBack = await mongodb
        .getDb()
        .db('books')
        .collection('read')
        .insertOne(newBook);
    //Check if POST worked or if error
    if(dataBack.acknowledged) {
        res.status(201).json(dataBack);
    } else {
        res.status(500).json(dataBack.error || 'Sorry. Could not add book information.');
    }
};

module.exports = { getAllBooks, getOneBook, createBook };