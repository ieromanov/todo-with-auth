import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { getTodos, createTodo } from '../store/actions/todos'


class Home extends Component {
	state = {
		title: '',
		description: '',
		done: false,
	}

	componentDidMount() {
		this.props.getTodos()
	}

	handleInputChange = e => {
		const target = e.target
		this.setState({
			[target.name]: target.type === 'checkbox' ? target.checked : target.value,
		})
	}

	handleSubmit = e => {
		e.preventDefault()
		const { createTodo, auth } = this.props
		const { title, description, done } = this.state
		const userID = auth.user.id
		const todo = {
			title,
			description,
			done
		}
		createTodo(userID, todo)
	}

	render() {
		const { auth, todos } = this.props

		if (!auth.isAuth) return <Redirect to='/login' />

		return (
			<div className="container">
				<h1>Todos</h1>

				<form onSubmit={this.handleSubmit} className="mb-5">
					<h2>Create todo</h2>
					<div className="form-group">
						<label htmlFor="todoTitle">Todo title</label>
						<input type="text" className="form-control" id="todoTitle" placeholder="Title..." name="title" value={this.state.title} onChange={this.handleInputChange}/>
					</div>
					<div className="form-group">
						<label htmlFor="todoDescription">Example textarea</label>
						<textarea className="form-control" id="todoDescription" rows="4" name="description" value={this.state.description} onChange={this.handleInputChange}></textarea>
					</div>
					<div className="form-group form-check">
						<input type="checkbox" className="form-check-input" id="todoDone" name="done" onChange={this.handleInputChange} checked={this.state.done}/>
						<label className="form-check-label" htmlFor="todoDone">Done</label>
					</div>
					<button type="submit" className="btn btn-primary">
						Create
					</button>
				</form>

				<h2>Todo list</h2>
				<div className="card-columns">
					{
						// ToDo
						todos.todos.map(todo => {
							const { id, title, description } = todo
							return (
								<div className="card mb-3 text-white bg-dark" key={id}>
									<div className="card-body">
										<h5 className="card-title">{title}</h5>
										<p className="card-text">{description}</p>
										<button href="#" className="btn btn-danger">Delete</button>
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}
}

Home.propTypes = {
	getTodos: PropTypes.func.isRequired,
	createTodo: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	todos: state.todos
})

export default connect(mapStateToProps, { getTodos, createTodo })(withRouter(Home))