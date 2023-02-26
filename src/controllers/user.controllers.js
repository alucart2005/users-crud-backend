const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const users = await User.findAll();
    return res.json(users)
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if(!user) return res.status(404).json({message: "User not found"});
    return res.json(user);
});

// This function creates a new user in the database. It will return a 201 status code if successful.
const create = catchError(async(req, res, next) => {
    const { first_name, last_name, email, password, birthday } = req.body;
    const user = await User.create({ first_name, last_name, email, password, birthday });
    return res.status(201).json({ user });
});

//This is a middleware function that catches any errors that are thrown in the function passed to it. 
//It then catches the error and sends it to the error handler. 
//If there is no error, it continues to the next middleware function. 
const remove = catchError(async(req, res) => {
    const userDeleted = await User.destroy({where: {id: req.params.id}});
    if(!userDeleted) return res.status(404).json({message: "User not found"});
    return res.sendStatus(204);
});

// This function will update a single user in the database.
// It will return the updated user.
// It takes the id of the user that will be updated as a parameter.
const update = catchError(async(req, res) => {
    const { id } = req.params;
    const userUpdated = await User.update(req.body, {where: {id}, returning: true});
    if(!userUpdated[0]) return res.status(404).json({message: "User not found"});
    return res.json(userUpdated[1][0]);
});

module.exports = {
    getAll,
    create,
    remove,
    update,
    getOne
}