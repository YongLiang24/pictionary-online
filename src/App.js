import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AnswerForm from './components/AnswerForm';
import GuessForm from './components/GuessForm';


class App extends Component {
  render() {
    return (
      <div >
        <AnswerForm />
        <GuessForm />


      </div>
    );
  }
}

export default App;
