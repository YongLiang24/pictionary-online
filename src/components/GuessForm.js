import React, { Component, Fragment } from 'react';

const GuessForm = (props) => {

  return (
    <div>
      <form onSubmit={props.handleForm} name="guess">
        <label>New Guess:
          <input type='text' name='guess' required />
        </label>
        <input type='submit' value='Submit' />
      </form>
    </div>
  )
}
export default GuessForm
