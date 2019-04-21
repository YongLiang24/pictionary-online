import React, { Component, Fragment } from 'react';
import { HashRouter, Route, Link } from "react-router-dom";
const HomePage = (props) => {

  return (
    <div>
      <div className='homeCard'>
        <h4>Play as Guess</h4>
        <Link to="/guess">Guess</Link>
      </div>
      <div className='homeCard'>
        <h4>Play as Draw</h4>
        <Link to="/draw">Draw</Link>
      </div>
    </div>
  )
}
export default HomePage
