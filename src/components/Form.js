import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlertService from '../services/alert.service';
import ValidationService from '../services/validation.service';

class Form extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentWord: this.props.currentWord
    }
  }

  change = (e, type) => {
    let val = e.target.value;
    this.setState((prevState, props) => {
      let currentWord  = Object.assign({}, prevState.currentWord);
      currentWord[type] = val;
      prevState.currentWord = currentWord;
      return prevState;
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    let { id } = this.state.currentWord;
    let { valid, errMsg } = this.checkValid();
    if(!valid) return AlertService.showAlertError('Field must be filled!!!', errMsg);
    if(!id) {
      let { currentWord } = this.state;
      currentWord.id = Date.now();
      currentWord.memorized = false;
      this.props.onAddWord(currentWord);
      AlertService.showAlertSuccess('Add Successfully!', '', 5000);
    }else{
      this.props.onUpdateWord(this.state.currentWord);
      AlertService.showAlertSuccess('Update Successfully!', '', 5000);
    }
  }

  checkValid = () => {
    let { en, vn } = this.state.currentWord;
    let valid = true;
    let errMsg = '';
    if(!ValidationService.checkNotEmpty(en)){
      valid = false;
      errMsg += 'Endlish must be filled!!';
    }
    if(!ValidationService.checkNotEmpty(vn)){
      valid = false;
      errMsg += 'Vietnamese must be filled!!';
    }
    return { valid, errMsg };
  }

  componentWillReceiveProps(props){
    this.setState({currentWord: props.currentWord})
  }

  render() {
    let { en, vn } = this.state.currentWord;
    return (
      <form action="" className="mt-3 border py-4 px-2" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Enter English..." className="form-control" value={en} onChange={(e) => {this.change(e, 'en')}}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Enter Vietnamese.." className="form-control" value={vn} onChange={(e) => {this.change(e, 'vn')}}/>
        </div>
        <button className="btn btn-warning btn-block">Save</button>
        <div className="clear-fix"></div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentWord: state.words.word
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddWord: (word) => {
      dispatch({type: 'ADD_WORD', word});
    },
    onUpdateWord: word => {
      dispatch({type: 'UPDATE', word});
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);