import React, { Component, Fragment } from 'react';
const HEADERS = {'Content-Type': 'application/json', Accept: 'application/json'}

class GuessForm extends Component{
  constructor(){
    super()
    this.state={
      rejectedList: []
    }
  }

componentDidMount(){
  setInterval(this.updateRejectedList, 3000)
}

updateRejectedList = ()=>{
  fetch("https://pictionaries.herokuapp.com/game/1")
  .then(resp => resp.json())
  .then(json =>{
    this.setState({
      rejectedList: json.rejectList
    })

    if(json.is_won){
       alert('We have a winner, thank you for playing.')
       setTimeout(window.location.reload(), 4000)
     }
  })

}

handleGuessForm = (ev)=>{
  ev.preventDefault()
  console.log("ev.name", ev.target.guess.value)
  //const guessAction = ev.target.name
  const guess = ev.target.guess.value
  fetch("https://pictionaries.herokuapp.com/game/1", {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify({guess})
  })
}
  render(){
    return (
      <div>
        <div id='sendGuessForm'>
          <form onSubmit={this.handleGuessForm}>
            <label><strong>Send Guess:</strong>
              <input type='text' name='guess' required />
            </label>
            <input type='submit' value='Submit' />
          </form>
        </div>
        <h3>Wrong Answers:</h3>
        <ul id='rejectedGuessList'>
          {
            this.state.rejectedList.map((reject, index)=>{
              return <li key={index} style={{textDecoration: 'line-through'}}><strong>{reject}</strong></li>
            })
          }
        </ul>


      </div>
    )
  }

}
export default GuessForm
