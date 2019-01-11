import axios from 'axios'
import {
	GET_ERRORS,
	GET_TODOS
} from './types'

export const getTodos = () => dispatch => {
	axios
		.get('/api/todos/get')
		.then(res => dispatch(updateTodosInState(res.data)))
		.catch(err => 
			dispatch({
				type: GET_ERRORS,
				payload: err,
			})
		)
}

export const postRequest = (url, data) => dispatch => {
	axios
		.post(`/api/todos/${url}`, data)
		.then(res => dispatch(updateTodosInState(res.data)))
		.catch(err => 
			dispatch({
				type: GET_ERRORS,
				payload: err,
			})
		)
}

export const updateTodosInState = todos => ({
	type: GET_TODOS,
	payload: todos
})