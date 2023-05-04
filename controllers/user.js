const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//Read (GET) one user (based off id)
const getOneUser = async (req, res) => {
    //#swagger.tags=['User']
    //#swagger.summary=Show a users information
    //#swagger.description=show users email and hashed password
    try {
        const UserId = new ObjectId(req.params.id);
        const dataBack = await mongodb
            .getDb()
            .db('books')
            .collection('user')
            .find({ _id: UserId});
        dataBack.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

//Create (POST) a new user
const createUser = async (req, res) => {
    //#swagger.tags=['User']
    //#swagger.summary=Create a new user
    //#swagger.description=Enter users email and password
    try{
        //New User Email and Password
        const newUser = {
            email: req.body.email,
            password: req.body.password
        };
        //Connect to database
        const resultBack = await mongodb
            .getDb()
            .db('books')
            .collection('user')
            .insertOne(newUser);
        if(resultBack.acknowledged) {
            res.status(201).json(resultBack);
        } else {
            res.status(500).json(resultBack.error || 'Sorry. User was not created.');
        }
    } catch (err) {
        res.status(500).json(err);
    }    
};

module.exports = { getOneUser, createUser};