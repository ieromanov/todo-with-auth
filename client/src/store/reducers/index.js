import { combineReducers } from 'redux'

import errors from './errors'
import auth from './auth'
import todos from './todos'

export default combineReducers({
	errors,
	auth,
	todos
})
