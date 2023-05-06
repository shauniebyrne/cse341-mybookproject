const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//Read (GET) all books in database
const getAllBooks = async (req, res) => {
    //#swagger.tags=['Books Read']
    //#swagger.summary=Shows all books
    //#swagger.description=See a list of all books in database 
    try {
        //Connect to books database
        const dataBack = await mongodb
            .getDb()
            .db('books')
            .collection('read')
            .find()
            .toArray();
            //Print list and error handling
            if (dataBack.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(dataBack);
            } else {
                res.status(400).json(dataBack.error || "Could not get list of books")
            }
    } catch (err) {
        res.status(500).json(err);
    }
};

//Read (GET) one book's info in database
const getOneBook = async (req, res) => {
    //#swagger.tags=['Books Read']
    //#swagger.summary=Shows a selected books information
    //#swagger.description=See a books information from the database 
    try {
        if (ObjectId.isValid(req.params.id)) {
            //Create new object based off id
            const BookId = new ObjectId(req.params.id);

            //Connect to books database
            const dataBack = await mongodb
                .getDb()
                .db('books')
                .collection('read')
                .find({ _id: BookId})    
                .toArray();
                //Print list and error handling
                if (dataBack.length > 0) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json(dataBack[0]);
                } else {
                    res.status(400).json(dataBack.error || "Could not get books information")
                }
        } else {
            res.status(400).json('Must use a valid id to see the books information');
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

//Create (POST) new book info
const createBook = async (req, res) => {
    //#swagger.tags=['Books Read']
    //#swagger.summary=Add a book you read
    //#swagger.description=Add a new books information you read
    try {
        //New Book info
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            published: req.body.published,
            series: req.body.series,
            numberInSeries: req.body.numberInSeries,
            readAgain: req.body.readAgain
        }
        //Connect to books database
        const dataBack = await mongodb
            .getDb()
            .db('books')
            .collection('read')
            .insertOne(newBook);
        //Error handling (success or error)
        if(dataBack.acknowledged) {
            res.status(201).json(dataBack);
        } else {
            res.status(500).json(dataBack.error || 'Sorry. Could not add book information.');
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

//Update (PUT) an old authors name
const updateBookInfo = async (req, res) => {
    //#swagger.tags=['Books Read']
    //#swagger.summary=Update a books information
    //#swagger.description=Enter fix to books information
    try {
        if (ObjectId.isValid(req.params.id)) {
            const bookId = new ObjectId(req.params.id);
            const updatedInfo = {
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                published: req.body.published,
                series: req.body.series,
                numberInSeries: req.body.numberInSeries,
                readAgain: req.body.readAgain
            };
            //Connect to books database in mongodb
            const dataBack = await mongodb
                .getDb()
                .db('books')
                .collection('read')
                .replaceOne({ _id: bookId}, updatedInfo);
            console.log(dataBack.modifiedCount + 'document(s) were updated');
            //Error handling (successful post or error)
            if(dataBack.modifiedCount > 0) {
                res.status(204).send(dataBack.modifiedCount + "document(s) were updated.");
            } else {
                res.status(500).json(dataBack.error || 'Sorry. New information could not be updated.');
            }
        } else {
            res.status(400).json('Must use a valid id to update books information.')
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

//Delete (DELETE) an author
const deleteBook = async (req, res) => {
    //#swagger.tags=['Books Read']
    //#swagger.summary=Delete a book
    //#swagger.description=Delete a book from database
    try {
        if (ObjectId.isValid(req.params.id)) {
            const bookId = new ObjectId(req.params.id);
            //Connect to books database in mongodb
            const dataBack = await mongodb
                .getDb()
                .db('books')
                .collection('read')
                .deleteOne({ _id: bookId}, true);
            console.log(dataBack.deletedCount + 'document(s) were deleted.');
            //Error handling (successful post or error)
            if(dataBack.acknowledged) {
                res.status(200).send(dataBack.deletedCount + "documents(s) were deleted.");
            } else {
                res.status(500).json(dataBack.error || 'Sorry. Book information was not deleted.');
            }
        } else {
            res.status(400).json('Must provide a valid id to delete book.')
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { getAllBooks, getOneBook, createBook, updateBookInfo, deleteBook };