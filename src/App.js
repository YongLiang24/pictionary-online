import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AnswerForm from './components/AnswerForm';
import GuessForm from './components/GuessForm';


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
        <AnswerForm />
        <GuessForm />
        <p>{this.state.canvas}</p>


      </div>
    );
  }
}

export default App;
