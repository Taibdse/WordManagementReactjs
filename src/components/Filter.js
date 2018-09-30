import React, { Component } from 'react';
import { connect } from 'react-redux';

class Filter extends Component {

  filterWordByMem = (e) => {
    let { value } = e.target;
    this.props.onFilterWords(value);
  }

  render() {
    return (
      <select class="form-control mt-4" onChange={this.filterWordByMem}>
        <option value="SHOW_ALL">SHOW ALL</option>
        <option value="SHOW_MEMORIZED">SHOW MEMORIZED</option>
        <option value="SHOW_NOT_MEMORIZED">SHOW NOT MEMORIZED</option>
      </select>
    );
  }
}

const mapPropsToDispatch = (dispatch, props) => {
  return {
    onFilterWords: (filterType) => {
      dispatch({type: 'FILTER_WORDS', filterType })
    }
  }
}

export default connect(null, mapPropsToDispatch)(Filter);