import React, { Component, Fragment } from 'react';
import { HashRouter, Route, Link } from "react-router-dom";
const HomePage = (props) => {

  return (
    <div id='playSelect'>
      <div className='homeCard'>
        <Link to="/guess">
          <h4>Play as a Guess Role</h4>
        </Link>
      </div>
      <div className='homeCard'>
        <Link to="/draw">
          <h4>Play as a Draw Role</h4>
        </Link>
        </div>
    </div>
  )
}
export default HomePage
