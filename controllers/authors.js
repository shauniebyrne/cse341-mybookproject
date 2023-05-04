const mongodb = require('../db/connect');
//const ObjectId = require('mongodb').ObjectId;

//Read (GET) list of authors
const getAuthorsList = async (req, res) => {
    //#swagger.tags=['Authors']
    //#swagger.summary=Shows list of all authors
    //#swagger.description=See a list of all authors in database 
    //Connect to books database in mongodb
    try {
        const dataBack = await mongodb
            .getDb()
            .db('books')
            .collection('authors')
            .find();
        dataBack.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
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
        //Check for successful POST or error
        if(dataBack.acknowledged) {
            res.status(201).json(dataBack)
        } else {
            res.status(500).json(dataBack.error || "Sorry. Could not add author's name to the list.");
        }
    } catch (err) {
        res.status(500).json(err);
    }

}

module.exports = { getAuthorsList, createAuthor};