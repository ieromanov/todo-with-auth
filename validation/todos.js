const validator = require('validator')
const isEmpty = require('../helpers/isEmpty')

module.exports = function validateCreatedTodoInput(data) {
	let errors = {}
	data.title = !isEmpty(data.title) ? data.title : ''
	data.description = !isEmpty(data.description) ? data.description : ''

	if(!validator.isLength(data.title, { min: 2, max: 60 })) {
		errors.title = 'Name must be between 2 to 60 chars'
	}
	
	if(validator.isEmpty(data.title)) {
		errors.title = 'Title field is required'
	}
	
	if(validator.isEmpty(data.description)) {
		errors.description = 'Description is required';
	}

	if(!validator.isLength(data.description, {min: 0, max: 100})) {
		errors.description = "Description can't have more 100 chars"
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}