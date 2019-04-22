import React, { Component, Fragment } from 'react';
const HEADERS = {'Content-Type': 'application/json', Accept: 'application/json'}

class GuessList extends Component{

  constructor(){
    super()
    this.state={
      guessList: []
    }
  }

  componentDidMount(){
    const isClear = true
    fetch("https://pictionaries.herokuapp.com/game/1", {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({isClear})
    })
    setInterval(this.updateGuessList, 3000)
  }

  updateGuessList = ()=>{
    fetch("https://pictionaries.herokuapp.com/game/1")
    .then(resp => resp.json())
    .then(json =>{
      this.setState({
        guessList: json.guesses
      })
      if(json.is_won){
         alert('We have a winner, thank you for playing.')
         setTimeout(window.location.reload(), 5000)
       }
    })


  }

  handleReject = (ev)=>{
    //console.log("button value:", ev.target.value)
    const guessText = ev.target.value
    fetch("https://pictionaries.herokuapp.com/game/1", {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({guessText})
    })
  }

  handleWinner =()=>{
    const isReject = true
    fetch("https://pictionaries.herokuapp.com/game/1", {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({isReject})
    })
  }

  render(){
    return(
      <div>
        <h2>Guesses:</h2>
        <ul>
          {
            this.state.guessList.map((guess, index)=>{
              return <li key={index}><strong>{guess}</strong> {" "}
                <button onClick={this.handleWinner}>Accept</button>
                {" "}
                <button onClick={this.handleReject} value={guess}>Reject</button>
              </li>
          })
        }
        </ul>
      </div>
    )
  }

}
export default GuessList
