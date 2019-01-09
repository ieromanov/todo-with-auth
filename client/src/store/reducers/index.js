import { combineReducers } from 'redux'

import errors from './errors'
import auth from './auth'

export default combineReducers({
	errors,
	auth,
})
