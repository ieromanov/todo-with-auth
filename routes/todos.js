const express = require('express')
const router = express.Router()
const passport = require('passport')

const genID = require('../helpers/genID')

const User = require('../model/User')

const validateCreatedTodoInput = require('../validation/todos')

router.get(
	'/get',
	passport.authenticate('jwt', { session: false }),
	(req, res) => res.status(200).json(req.user.todos)
)

router.post(
	'/create',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { userID, todo } = req.body
		const { errors, isValid } = validateCreatedTodoInput(todo)

		if(!isValid) return res.status(400).json(errors)

		todo.id = genID()
		User.findOneAndUpdate(
			{ _id: userID },
			{ $push: { "todos" : todo } },
			{ new: true },
			(err, user) => err ? res.status(400).json(err) : res.status(200).json(user.todos)
		)
	}
)

router.post(
	'/remove',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { userID, todoID } = req.body
		User.findOneAndUpdate(
			{ _id: userID },
			{ $pull: { todos: { id: todoID } } },
			{ new: true },
			(err, user) => err ? res.status(400).json(err) : res.status(200).json(user.todos)
		)
	}
)

router.post(
	'/removeAll',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { userID } = req.body
		User.findByIdAndUpdate(
			userID,
			{ $set: { todos: [] } },
			{ new: true },
			(err, user) => err ? res.status(400).json(err) : res.status(200).json(user.todos)
		)
	}
)

router.post(
	'/edit',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { userID, todo } = req.body
		User.updateOne(
			{ _id: userID, "todos.id": todo.id },
			{ $set: { "todos.$": todo } },
			(err, report) => err ? res.status(400).json(err) : null
		)
		User.findById(
			{ _id: userID },
			(err, user) =>{
				err ? res.status(400).json(err) : res.status(200).json(user.todos)
			}
		)
	}
)

module.exports = router;