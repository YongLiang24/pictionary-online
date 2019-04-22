import React, { Component, Fragment } from 'react';
import { HashRouter, Route, Link } from "react-router-dom";
import './App.css';
import GuessList from './components/GuessList';
import GuessForm from './components/GuessForm';
import HomePage from './components/HomePage';
import Canvas from './components/Canvas';

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter basename="/">
          <Fragment>
            <div id='navBar'>
              <h1>Pictionary Online</h1>
              <h2 id='home'><Link to="/">Home</Link></h2>
              <hr />
            </div>
            <Route exact path="/"
              render={(props)=>(
                <div id='HomePage'>
                  <HomePage />
                </div>
              )}
            />

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
          </Fragment>
        </HashRouter>
      </div>
    );
  }
}

export default App;
