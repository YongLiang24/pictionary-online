import React, { Component } from 'react';
import { HashRouter, Route, Link } from "react-router-dom";
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
      <HashRouter basename="/">
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/draw">Draw</Link></li>
            <li><Link to="/guess">Guess</Link></li>
          </ul>
          <hr />
          <Route exact path="/" />
          <Route path="/draw"
            render={(props)=>(
              <div>
                <AnswerForm />
                <h1>Testing routes</h1>
              </div>
            )}
          />

          <Route path="/guess"
            render={(props)=>(
              <div>
                <GuessForm />
                <h1>Testing Guess routes</h1>
              </div>
            )}
          />
        </div>
      </HashRouter>
    );
  }
}

export default App;
