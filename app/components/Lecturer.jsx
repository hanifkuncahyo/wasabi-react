import React from 'react';
import { hashHistory, Link } from 'react-router';
import AltContainer from 'alt-container';
import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';
import SlideActions from '../actions/SlideActions';
import SlideStore from '../stores/SlideStore';
import SlideShow from './SlideShow.jsx';
import LocalVideo from './UserMediaLocal.jsx';
      //THIS PART IS ADDED BY GROUP 2 FOR LECTURERNOTE FEATURE
import LecturerNote from './LecturerNote.jsx';


export default class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      //THIS PART IS ADDED BY GROUP 2 FOR LECTURERNOTE FEATURE
      currentNoteIndex:0,
      currentNoteValue:null,
      noteText:[]
    };
  }
  componentDidMount() {
    var loggedInUser = UserStore.getState().loggedInUser;
    this.setState({user: loggedInUser});

    this.setState(SlideStore.getState())
    SlideStore.listen(this.changeSlideStore);

    SlideActions.subSlide({slideDeckId:this.props.params.deckId, user: loggedInUser});
    console.log('componentDidMount', this.state, SlideStore.getState());
    var noteText = ['This is note for title','This is note for slide 2','This is note for slide 3','This is note for slide 4','This is note for slide  5'];
    var value = noteText[0];
    this.setState({
      //THIS PART IS ADDED BY GROUP 2 FOR LECTURERNOTE FEATURE
      currentNoteIndex:0, 
      noteText : noteText,
      currentNoteValue:value
    });
  }
  componentWillUnmount() {
    SlideActions.unsubSlide(this.props.params.deckId);
    SlideStore.unlisten(this.changeSlideStore);
  }
  changeSlideStore = (state) => {
    this.setState(state);
  }

  render() {
    return (
      <div className="row">
        <AltContainer
          stores={{slides: SlideStore}}
        >
          <SlideShow
            onFirst={this.handleFirst}
            onPrev={this.handlePrev}
            onNext={this.handleNext}
            onLast={this.handleLast} />
        </AltContainer>
        <LecturerNote 
          noteText={this.state.noteText}
          currentNoteIndex={this.state.currentNoteIndex}
          currentNoteValue={this.state.currentNoteValue}
          saveLectureNote = {this.handleSaveLectureNoteClick}
          changeLectureNote= {this.handleChangeLectureNoteChange} />
        <LocalVideo />
        
      </div>
    );
  }

  // THIS METHOD IS ADDED BY GROUP 2 FOR LECTURERNOTE FEATURE
  handleLectureNoteChange = (index) => {
    var content = index;
    var noteText = this.state.noteText;
    var val = noteText[index];
    this.setState(
      {
        currentNoteIndex:content,
        currentNoteValue:val
      }
    )
  }

  // THIS METHOD IS ADDED BY GROUP 2 FOR LECTURERNOTE FEATURE
  handleChangeLectureNoteChange = (event) => {
        this.setState({currentNoteValue: event.target.value})
    }

  // THIS METHOD IS ADDED BY GROUP 2 FOR LECTURERNOTE FEATURE
  handleSaveLectureNoteClick = (event) => {
        var index = this.state.currentNoteIndex;
        var noteText = this.state.noteText;
        var value = this.state.currentNoteValue;
        noteText[index] = value;
        this.setState({noteText: noteText})
  }

  handleFirst = (event) => {
    if (this.state.slideNoLocal > 0 ) {
      SlideActions.changeSlideLocal({slideNoLocal: 0});
  // THIS PART IS ADDED BY GROUP 2 FOR LECTURERNOTE FEATURE
      this.handleLectureNoteChange(0);
      console.log('handleFirst', this.state);
    }
  }
  handlePrev = (event) => {
    if (this.state.slideNoLocal > 0) {
      SlideActions.changeSlideLocal({slideNoLocal: this.state.slideNoLocal -1});
  // THIS PART IS ADDED BY GROUP 2 FOR LECTURERNOTE FEATURE
      this.handleLectureNoteChange(this.state.slideNoLocal-1);
      console.log('handlePrev', this.state);
    }
  }
  handleNext = (event) => {
    if (this.state.slideNoLocal < this.state.slideDeckLength - 1) {
      SlideActions.changeSlideLocal({slideNoLocal: this.state.slideNoLocal + 1});
  // THIS PART IS ADDED BY GROUP 2 FOR LECTURERNOTE FEATURE
      this.handleLectureNoteChange(this.state.slideNoLocal+1);
      console.log('handleNext', this.state);
    }
  }
  handleLast = (event) => {
     if (this.state.slideNoLocal < this.state.slideDeckLength - 1 ) {
      SlideActions.changeSlideLocal({slideNoLocal: this.state.slideDeckLength - 1});
  // THIS PART IS ADDED BY GROUP 2 FOR LECTURERNOTE FEATURE
      this.handleLectureNoteChange(this.state.slideDeckLength - 1);
      console.log('handleLast', this.state);
    }
  }
}
