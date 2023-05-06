const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//Read (GET) list of authors
const getAuthorsList = async (req, res) => {
    //#swagger.tags=['Authors']
    //#swagger.summary=Shows list of all authors
    //#swagger.description=See a list of all authors in database 
    try {
        //Connect to books database in mongodb
        const dataBack = await mongodb
            .getDb()
            .db('books')
            .collection('authors')
            .find()
            .toArray();
        //Print list and error handling
        if (dataBack.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(dataBack);
        } else {
            res.status(400).json(dataBack.error || "Could not get list of authors")
        }
    } catch(err) {
        res.status(500).json(err);
    }        
};

//Create (POST) a new author
const createAuthor = async (req, res) => {
    //#swagger.tags=['Authors']
    //#swagger.summary=Adds a new author to the list
    //#swagger.description=Enter the authors first and last name 
    try {
        const newAuthor = {
            name: req.body.name
        };
        //Connect to books database in mongodb
        const dataBack = await mongodb
            .getDb()
            .db('books')
            .collection('authors')
            .insertOne(newAuthor);
        //Error handling (successful post or error)
        if(dataBack.acknowledged) {
            res.status(201).json(dataBack)
        } else {
            res.status(500).json(dataBack.error || "Sorry. Could not add author's name to the list.");
        }
    } catch (err) {
        res.status(500).json(err);
    }

}

//Update (PUT) an old authors name
const updateAuthor = async (req, res) => {
    //#swagger.tags=['Authors']
    //#swagger.summary=Update an authors name
    //#swagger.description=Enter fix to authors name
    try {
        //Error handling for ObjectId
        if (ObjectId.isValid(req.params.id)) {
            const authorId = new ObjectId(req.params.id);
            const updatedInfo = {
                name: req.body.name
            };
            //Connect to books database in mongodb
            const dataBack = await mongodb
                .getDb()
                .db('books')
                .collection('authors')
                .replaceOne({ _id: authorId}, updatedInfo);
            console.log(dataBack.modifiedCount + 'document(s) were updated');
            //Error handling (successful post or error)
            if(dataBack.modifiedCount > 0) {
                res.status(204).send(dataBack.modifiedCount + "document(s) were updated.");
            } else {
                res.status(500).json(dataBack.error || 'Sorry. New information could not be updated.');
            }
        } else {
            res.status(400).json('Must use a valid id to update authors name.');
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

//Delete (DELETE) an author
const deleteAuthor = async (req, res) => {
    //#swagger.tags=['Authors']
    //#swagger.summary=Delete an author
    //#swagger.description=Delete an author from database
    try {
        if (ObjectId.isValid(req.params.id)) {
            const authorId = new ObjectId(req.params.id);
            //Connect to books database in mongodb
            const dataBack = await mongodb
                .getDb()
                .db('books')
                .collection('authors')
                .deleteOne({ _id: authorId}, true);
            console.log(dataBack.deletedCount + 'document(s) were deleted.');
            //Error handling (successful post or error)
            if(dataBack.acknowledged) {
                res.status(200).send(dataBack.deletedCount + "author(s) were deleted.");
            } else {
                res.status(500).json(dataBack.error || 'Sorry. Author was not deleted.');
            }
        } else {
            res.status(400).json('Must use a valid id to delete an author')
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { getAuthorsList, createAuthor, updateAuthor, deleteAuthor};