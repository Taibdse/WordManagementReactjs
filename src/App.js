import React, { Component } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Filter from './components/Filter';
import Words from './components/Words';
import './App.css';

import { Provider } from 'react-redux';
import store from './stores/word.store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header/>
          <div className="container">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <Form/>
                <Filter/>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Words/>
              </div>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
