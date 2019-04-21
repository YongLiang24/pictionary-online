import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AnswerForm from './components/AnswerForm';
import GuessForm from './components/GuessForm';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  state={
    canvas: ''
  }
componentDidMount(){
  fetch("http://pictionaries.herokuapp.com/game")
  .then(resp =>resp.json())
  .then(json=>{
    console.log(json)
    this.setState({
      canvas: json[0].name
    })
  })
}

  render() {
    return (
      <div >
        <Router>
          <Route exact path="/" render={AnswerForm} />
          <Route exact path="/guess" render={GuessForm} />

        </Router>)

        <p>{this.state.canvas}</p>


      </div>
    );
  }
}

export default App;
