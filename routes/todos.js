const express = require('express')
const router = express.Router()
const passport = require('passport')

const genID = require('../helpers/genID')

const User = require('../model/User')

router.get(
	'/get',
	passport.authenticate('jwt', { session: false }),
	(req, res) => res.json(req.user.todos)
)

router.post(
	'/create',
	(req, res) => {
		const { userID, todo } = req.body
		console.log(userID, todo)
		todo.id = genID()
		User.findOneAndUpdate(
			{ _id: userID },
			{ $push: { "todos" : todo } },
			{ new: true },
			(err, user) => {
				if (err) res.status(400).json(err)
				res.status(200).json(user.todos)
			}
		)
	}
)

router.post(
	'/remove',
	(req, res) => {
		const { userID, todoID } = req.body
		User.findOneAndUpdate(
			{ _id: userID },
			{ $pull: { todos: { id: todoID } } },
			{ new: true },
			(err, user) => {
				if (err) res.status(400).json(err)
				res.status(200).json(user.todos)
			}
		)
	}
)

router.post(
	'/removeAll',
	(req, res) => {
		const { userID } = req.body
		User.findOneAndUpdate(
			{ _id: userID },
			{ $set: { todos: [] } },
			{ new: true },
			(err, user) => {
				if (err) res.status(400).json(err)
				res.status(200).json(user.todos)
			}
		)
	}
)

module.exports = router;