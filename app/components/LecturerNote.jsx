import React from 'react'
import { Link } from 'react-router'

export default class LecturerNote extends React.Component {
	render() {
		return(
		<div className="row">
			<div style={{backgroundColor:"#aaa", textAlign:"center", padding:"10px", width:"710px"}}>
				<textarea id="noter-text-area" name="textarea" value={this.props.currentNoteValue}
                          onChange={this.props.changeLectureNote.bind(this,event)}
                          style={{textAlign:"center", padding:"10px", width:"90%"}}>
                </textarea>
                <br/>
                <button onClick={this.props.saveLectureNote.bind(this,event)}> Save Note</button>
			</div>
		</div>
		)
	}
}