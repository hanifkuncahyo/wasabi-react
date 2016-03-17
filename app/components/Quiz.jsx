import React from 'react'
import { Link } from 'react-router'

export default class Quiz extends React.Component {
	render() {
		return(
			<div>
				<div>
					{this.props.quizText}
				</div>
				<div>
					{this.props.quizChoices.map(
						(c,i) => {
						return (
								<div key = {i} onClick={this.props.quizHandleAnswer.bind(this,c,i)}>{c}</div>
							)
						}
					)
				}
				</div>
			</div>
		)
	}
}