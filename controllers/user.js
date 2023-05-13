const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');

//Read (GET) one user (based off id)
//Only able to get one user because you don't want
//everyone having access to everyone elses info
const getOneUser = async (req, res) => {
    //#swagger.tags=['User']
    //#swagger.summary=Show a user's information
    //#swagger.description=Show user's email and hashed password
    try {
        if(ObjectId.isValid(req.params.id)) {
            const userId = new ObjectId(req.params.id);
            //Connect to books database in mongodb
            const dataBack = await mongodb
                .getDb()
                .db('books')
                .collection('user')
                .find({ _id: userId})
                .toArray();
                //Print list and error handling
                if (dataBack.length > 0) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json(dataBack[0]);
                } else {
                    res.status(400).json(dataBack.error || "Could not get information")
                }
        } else {
            res.status(400).json('Must use a valid id to see the information');
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

//Create (POST) a new user
const createUser = async (req, res) => {
    //#swagger.tags=['User']
    //#swagger.summary=Create a new user
    //#swagger.description=Enter user's email and password
    try{
        //New User Email and Password
        const email = req.body.email;
        const password = req.body.password;

        //Check if email already exists
        const doesExist = await mongodb
            .getDb()
            .db('books')
            .collection('user')
            .findOne({ email: email}) 
        if (doesExist) {
            res.status(409).send('Email already exists')
        }

        //Hash password
        const plainPassword = password;
        bcrypt.hash(plainPassword, 10)
            .then(function(hashedPassword) {
                const dataBack = mongodb
                    .getDb()
                    .db('books')
                    .collection('user')
                    .insertOne( {email: email, password: hashedPassword});
                //Error handling (successful post or error)
                if(dataBack.acknowledged) {
                    res.status(201).json(dataBack);
                } else {
                    res.status(500).json(dataBack.error || 'Sorry. User was not created.');
                }
            });

        //Compare password
        // function comparePassword(plainPassword, hash) {
        //     const result = bcrypt.compare(plainPassword, hash)
        //     return result;
        // }
    } catch (err) {
        res.status(500).json(err);
    }    
};

//Update (PUT) a users info
const updateUserInfo = async (req, res) => {
    //#swagger.tags=['User']
    //#swagger.summary=Update a user's information
    //#swagger.description=Enter new email/password
    try {
        if (ObjectId.isValid(req.params.id)) {
            const userId = new ObjectId(req.params.id);
            const email = req.body.email;
            const password = req.body.password;

            //Hash password
            const plainPassword = password;
            bcrypt.hash(plainPassword, 10)
                .then(function(hashedPassword) {
                    //Connect to books database in mongodb
                    const dataBack = mongodb
                        .getDb()
                        .db('books')
                        .collection('user')
                        .replaceOne({ _id: userId}, {email: email, password: hashedPassword});
                    console.log(dataBack.modifiedCount + 'document(s) were updated');
                    //Error handling (successful post or error)
                    if(dataBack.modifiedCount > 0) {
                        res.status(204).send(dataBack.modifiedCount + "document(s) were updated.");
                    } else {
                        res.status(500).json(dataBack.error || 'Sorry. New information could not be updated.');
                    }
                })
        } else {
            res.status(400).json('Must use a valid id to update information.')
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

//Delete (DELETE) a user
const deleteUser = async (req, res) => {
    //#swagger.tags=['User']
    //#swagger.summary=Delete user
    //#swagger.description=Delete user from database
    try {
        if (ObjectId.isValid(req.params.id)) {
            const userId = new ObjectId(req.params.id);
            //Connect to books database in mongodb
            const dataBack = await mongodb
                .getDb()
                .db('books')
                .collection('user')
                .deleteOne({ _id: userId}, true);
            console.log(dataBack.deletedCount + 'document(s) were deleted.');
            //Error handling (successful post or error)
            if(dataBack.acknowledged) {
                res.status(200).send(dataBack.deletedCount + "documents(s) were deleted.");
            } else {
                res.status(500).json(dataBack.error || 'Sorry. User information was not deleted.');
            }
        } else {
            res.status(400).json('Must provide a valid id to delete information.')
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { getOneUser, createUser, updateUserInfo, deleteUser};