import React, { Component } from 'react';
import Word from '../components/Word';
import { connect } from 'react-redux';

class Words extends Component {

  renderWordComponent = () => {
    let arrWords = this.props.arrWords;
    return arrWords.map(word => {
      return (
        <div className="col-md-6 col-lg-4" key={word.id}>
            <Word word={word} onUpdateWord={this.updateWord}/>
        </div>
      )
    })
  }

  removeWord = word => {
    let { id } = word;
    this.props.onRemoveWord(id);
  }

  updateWord = word => {
    this.props.onUpdateWord(word);
  }

  render = () => {
    return (
      <div className="row mt-4">
        {this.renderWordComponent()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  arrWords: state.words.arrWords,
  newWord: state.words.word
});

const mapPropsToDispatch = (dispatch, props) => {
  return {
    onGetWords: () => {
      dispatch({ type: 'GET_WORDS' });
    },
    onRemoveWord: (id) => {
      dispatch({ type: 'REMOVE', id })
    },
    onUpdateWord: word => {
      dispatch({type: 'UPDATE', word});
    }
  }
}

export default connect(mapStateToProps, mapPropsToDispatch)(Words);
