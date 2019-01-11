import React, { PureComponent } from 'react'
import classNames from 'classnames'

class Card extends PureComponent {
	state = {
		title: '',
		description: '',
		done: false,
		editing: false
	}

	componentDidMount() {
		this.setState({
			title: this.props.title,
			description: this.props.description,
			done: this.props.done,
		})
	}

	handleInputChange = e => {
		const target = e.target
		this.setState({
			[target.name]: target.type === 'checkbox' ? target.checked : target.value,
		})
	}

	saveTodo = () => {
		const { title, description, done } = this.state
		const { id, editTodo } = this.props
		const todo = {
			id,
			title,
			description,
			done
		}
		
		editTodo(todo)
		this.setState({
			editing: false
		})
	}

	editMode = () => {
		const { title, description, done } = this.state
		return (
			<div className={classNames({
				"bg-dark": !done,
				"bg-success": done
			}, "card", "mb-3", "text-white")}>
				<div className="card-body">
					<input type="text" name="title" className="card-title form-control" value={title} onChange={this.handleInputChange}/>
					<textarea name="description" className="card-text form-control mb-3" rows="4" value={description} onChange={this.handleInputChange}/>
					<div className="form-group form-check">
						<input type="checkbox" className="form-check-input" id="todoDone" name="done" onChange={this.handleInputChange} checked={done}/>
						<label className="form-check-label" htmlFor="todoDone">Done</label>
					</div>
					<button className="btn btn-success mr-3" onClick={this.saveTodo}>Save</button>
					<button className="btn btn-danger" onClick={() => this.setState({editing: false})}>Сancel</button>
				</div>
			</div>
		)
	}

	readMode = () => {
		const { id, title, description, done, removeTodo } = this.props
		return (
			<div className={classNames({
				"bg-dark": !done,
				"bg-success": done
			}, "card", "mb-3", "text-white")}>
				<div className="card-body">
					<h5 className="card-title">{title}</h5>
					<p className="card-text">{description}</p>
					<button className="btn btn-danger mr-3" onClick={() => removeTodo(id)}>Delete</button>
					<button className="btn btn-success" onClick={() => this.setState({editing: true})}>Edit</button>
				</div>
			</div>
		)
	}

	render() {
		return (
			this.state.editing ? this.editMode() : this.readMode()
		)
	}
}

export default Card