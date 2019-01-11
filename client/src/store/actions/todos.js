import axios from 'axios'
import {
	GET_ERRORS,
	GET_TODOS,
	CREATE_TODO,
	REMOVE_TODO,
	REMOVE_ALL_TODOS
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

export const createTodo = (userID, todo) => dispatch => {
	axios
		.post('/api/todos/create', { userID, todo })
		.then(res => {
			dispatch(updateTodosInState(res.data))
			console.log(res.data)
		})
		.catch(err => 
			dispatch({
				type: GET_ERRORS,
				payload: err,
			})
		)
}

export const removeTodo = (userID, todoID) => dispatch => {
	axios
		.post('/api/todos/remove', userID, todoID)
		.then(res => dispatch(updateTodosInState(res.data)))
		.catch(err => 
			dispatch({
				type: GET_ERRORS,
				payload: err,
			})
		)
}

export const removeAllTodo = userID => dispatch => {
	axios
		.post('/api/todos/remove', userID)
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