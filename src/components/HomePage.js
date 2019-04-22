import React, { Component, Fragment } from 'react';
import { HashRouter, Route, Link } from "react-router-dom";
const HomePage = (props) => {

  return (
    <div id='playSelect'>
      <Link to="/guess">
        <div className='homeCard'>
          <h4>Play as a Guess Role</h4>
        </div>
      </Link>
      <Link to="/draw">
        <div className='homeCard'>
          <h4>Play as a Draw Role</h4>
        </div>
      </Link>
    </div>
  )
}
export default HomePage
