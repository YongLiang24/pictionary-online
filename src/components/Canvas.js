import React, { Component, Fragment } from 'react';

const HEADERS = {'Content-Type': 'application/json', Accept: 'application/json'}
class Canvas extends React.Component {
  constructor (props) {
    super(props);
    this.canvasRef = React.createRef()
    this.state = {
      canvas: false,
      ctx: false,
      drawingFlag: false,
      prevX: 0,
      currX: 0,
      prevY: 0,
      currY: 0,
      prevXArray: [],
      prevYArray: [],
      currXArray: [],
      currYArray: [],
      dot_flag: false,
      x: 'black',
      y: 2,
      width: 400, // make this a prop
      height: 400, // make this a prop
      emptyArray : []
    }
  }

  componentDidMount() {
    // getting ref to canvas html element w React ref, update state
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d')

    // set canvas width / height using hard-coded state
    canvas.width = this.state.width;
    canvas.height = this.state.height;

    this.setState(
      {canvas, ctx},
      // test data to fill the canvas w a rectangle
      () => {
        this.state.ctx.fillStyle = 'lightgray';
        this.state.ctx.fillRect(20, 20, this.state.canvas.width, this.state.canvas.height)}
    )
     setInterval(this.intervalCanvasDraw, 4000)

     const movement = {
       prevX: 1,
       isClear: "true"
     }
     fetch('http://pictionaries.herokuapp.com/canvas/1', {
       method: 'PATCH',
       headers: HEADERS,
       body: JSON.stringify(movement)
     })
     .then(resp => resp.json())
     .then(json=>{
       console.log('change currentGameId', json)
     })

  }

  intervalCanvasDraw = () =>{
    fetch('http://pictionaries.herokuapp.com/canvas')
    .then(resp => resp.json())
    .then(json =>{
      // console.log('the returned movement',json[0])
        for(let i=0; i < json[0].currXArray.length; i++) {
          this.state.ctx.beginPath();
          this.state.ctx.moveTo(json[0].prevXArray[i], json[0].prevYArray[i]);
          this.state.ctx.lineTo(json[0].currXArray[i], json[0].currYArray[i]);
          this.state.ctx.strokeStyle = this.state.x;
          this.state.ctx.lineWidth = this.state.y;
          this.state.ctx.stroke();
          this.state.ctx.closePath();
        }
    })
  }

  handleMouseMoves = (event, action) => {
    event.persist()
    this.findxy(action, event)
  }

  sendDrawData = () => {
    const movement = {
      currentGameId: this.props.gameId,
      prevXArray: this.state.prevXArray,
      prevYArray: this.state.prevYArray,
      currXArray: this.state.currXArray,
      currYArray: this.state.currYArray,
    }

    fetch('http://pictionaries.herokuapp.com/canvas/1', {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify(movement)
    })
  }

  findxy = (mouseAction, e) => {
    if (mouseAction == 'down') {
      this.setState(
        (state) => {return {
          prevX: state.currX,
          prevY: state.currY,
          currX: e.clientX - state.canvas.offsetLeft,
          currY: e.clientY - state.canvas.offsetTop,
          flag: true,
          dot_flag: true
        }},
        () => {
          if (this.state.dot_flag) {
            this.state.ctx.beginPath();
            this.state.ctx.fillStyle = this.state.x;
            this.state.ctx.fillRect(this.state.currX, this.state.currY, 2, 2);
            this.state.ctx.closePath();
            this.setState({dot_flag: false})
          }
        }
      )
    } else if (mouseAction == 'up') {
        this.setState({flag: false})
        this.sendDrawData()

    } else if (mouseAction == 'move' && this.state.flag) {
      this.setState(
        (state) => {
          return {
            prevX: state.currX,
            prevY: state.currY,
            currX: e.clientX - state.canvas.offsetLeft,
            currY: e.clientY - state.canvas.offsetTop,
          }
        },
        () => {
          this.draw()
        }
      )
    }
  }

  draw = () => {
    this.state.ctx.beginPath();
    this.state.ctx.moveTo(this.state.prevX, this.state.prevY);
    this.state.ctx.lineTo(this.state.currX, this.state.currY);
    this.state.ctx.strokeStyle = this.state.x; // update to not mutate state directly
    this.state.ctx.lineWidth = this.state.y; // update to not mutate state directly
    this.state.ctx.stroke();
    this.state.ctx.closePath();

    // store all
    const prevXArray = this.state.prevXArray.slice()
    prevXArray.push(this.state.prevX)
    const prevYArray = this.state.prevYArray.slice()
    prevYArray.push(this.state.prevY)
    const currXArray = this.state.currXArray.slice()
    currXArray.push(this.state.currX)
    const currYArray = this.state.currYArray.slice()
    currYArray.push(this.state.currY)

    this.setState({prevXArray, prevYArray, currXArray, currYArray})

  }


  handleClear = ()=>{
    const movement = {
      prevX: 1,
      isClear: "true"
    }
    fetch('http://pictionaries.herokuapp.com/canvas/1', {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify(movement)
    })
    .then(resp => resp.json())
    .then(json=>{
      console.log('change currentGameId', json)
    })

    setTimeout(window.location.reload(), 2000)
  }

  render() {
    if (this.props.isDrawing) {
      return (
        <Fragment>
          <canvas
            ref={this.canvasRef}
            onMouseMove={(event) => this.handleMouseMoves(event, 'move')}
            onMouseDown={(event) => this.handleMouseMoves(event, 'down')}
            onMouseUp={(event) => this.handleMouseMoves(event, 'up')}
            onMouseOut={(event) => this.handleMouseMoves(event, 'out')}
          />
          <button onClick={this.handleClear}>ClearImage</button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          {/* <ActionCableConsumer
            channel={{channel: 'CanvasDrawingsChannel', id:`${this.props.gameId}`}}
            onReceived={this.handleReceivedDrawing}
          /> */}
          <canvas
            ref={this.canvasRef}
          />
        </Fragment>
      )
    }
  }}

export default Canvas;
