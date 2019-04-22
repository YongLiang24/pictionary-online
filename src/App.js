import React, { Component } from 'react';
import { HashRouter, Route, Link } from "react-router-dom";

import GuessList from './components/GuessList';
import GuessForm from './components/GuessForm';
import HomePage from './components/HomePage';
import Canvas from './components/Canvas';

class App extends Component {
  state={
    canvas: ''
  }
componentDidMount(){
  fetch("https://pictionaries.herokuapp.com/game")
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
          <container>
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
          </container>
          <Route path="/draw"
            render={(props)=>(
              <div>
                <Canvas isDrawing={true} />
                <GuessList />

              </div>
            )}
          />

          <Route path="/guess"
            render={(props)=>(
              <div>
                <Canvas isDrawing={false} />
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
