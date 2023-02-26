const { getAll, create, remove, update, getOne } = require('../controllers/user.controllers');
const express = require('express');

const userRouter = express.Router();

userRouter.route("/")
		.get(getAll)
		.post(create);

userRouter.route("/:id")
		.delete(remove)
		.put(update)
		.get(getOne);

module.exports = userRouter;