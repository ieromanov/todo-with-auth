import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { getTodos } from '../store/actions/todos'


class Home extends Component {
	componentDidMount() {
		this.props.getTodos()
	}

	render() {
		const { auth, todos } = this.props

		if (!auth.isAuth) return <Redirect to='/login' />

		return (
			<div>
				<h1>Todos</h1>
				<ul>
					{
						// ToDo
						todos.todos.map(todo => {
							return <li key={todo.id}>{todo.title}</li>
						})
					}
				</ul>
			</div>
		)
	}
}

Home.propTypes = {
	getTodos: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	todos: state.todos
})

export default connect(mapStateToProps, { getTodos })(withRouter(Home))