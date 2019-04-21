import React, { Component } from 'react';
import { HashRouter, Route, Link } from "react-router-dom";
import AnswerForm from './components/AnswerForm';
import GuessForm from './components/GuessForm';
import HomePage from './components/HomePage';

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
          <h2>Pictionary Online</h2>
          <Link to="/">Home</Link>
          <hr />
          <Route exact path="/"
            render={(props)=>(
              <div>
                <HomePage />
              </div>
            )}
          />
          <Route path="/draw"
            render={(props)=>(
              <div>
                <AnswerForm />

              </div>
            )}
          />

          <Route path="/guess"
            render={(props)=>(
              <div>
                <GuessForm />
                
              </div>
            )}
          />
        </div>
      </HashRouter>
    );
  }
}

export default App;
