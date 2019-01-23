const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const path = require('path')

const users = require('./routes/user')
const todos = require('./routes/todos')

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log('Database is connected')
	})
	.catch(err => {
		console.log('Can not connect to the database:', err)
	})

const app = express()

app.use(cors())

app.use(passport.initialize())
require('./passport')(passport)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.use('/api/users', users)
app.use('/api/todos', todos)

app.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`)
})
