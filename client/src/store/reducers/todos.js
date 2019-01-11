import { GET_TODOS } from '../actions/types'

const initialState = {
	todos: []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_TODOS:
			return {
				...state,
				todos: action.payload,
			}
		default:
			return state
	}
}