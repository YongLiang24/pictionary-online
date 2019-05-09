import React from 'react';
import {Link } from "react-router-dom";
const HomePage = (props) => {

  return (
    <div id='playSelect'>
      <article id="home_article">Please note that Pictionary's drawing function does not work on mobile devices.<br/>Hold mouse click down while in the canvas drawing box to start drawing!<br/>The Guess page will receive drawing in real time.</article>
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
      <br/>
    </div>
  )
}
export default HomePage
