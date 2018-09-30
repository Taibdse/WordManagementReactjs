import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import AlertService from '../services/alert.service';

class Word extends Component {

  remove = async () => {
    let sure = await AlertService.showAlertConfirm('Are you sure?', '');
    if(!sure) return;
    this.props.onRemoveWord(this.props.word.id);
    AlertService.showAlertSuccess('Delete Successfully!', '', 5000);
  }

  showWordEdit = () => {
    this.props.onShowWordOnEditForm(this.props.word);
  }

  switchMemorized = () => {
    this.props.onSwitchMemorized(this.props.word);
  }

  render() {
    let { en, vn, memorized } = this.props.word;
    let className = 'btn-success';
    if(!memorized) className = 'btn-warning';
    return (
      <div className="card mt-3">
        <div className="card-header">
          <h4>{en}</h4>
        </div>
        <div className="card-body">
          <h5>{memorized ? '-----' : vn}</h5>
          <button className={"btn mt-2 " + className} onClick={this.switchMemorized}>{memorized ? 'Memorized' : 'Not memorized'}</button>
          <button className="btn btn-primary ml-2 mt-2" onClick={this.showWordEdit}>Edit</button>
          <button className="btn btn-danger ml-2 mt-2" onClick={this.remove}>Remove</button>
        </div>
      </div>
    );
  }
}

const mapPropsToDispatch = (dispatch, props) => {
  return {
    onShowWordOnEditForm: word => {
      dispatch({type: 'SHOW_WORD_EDIT', word})
    },
    onSwitchMemorized: word => {
      dispatch({type: 'SWITCH_MEMORIZED', word});
    },
    onRemoveWord: id => {
      dispatch({ type: 'REMOVE', id })
    },
  }
}

export default connect(null, mapPropsToDispatch)(Word);