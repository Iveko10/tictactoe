import React from 'react';
import './App.css';
import GameContainer from './components/GameContainer'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      round: 0,
      strategy: 0
    }
  }
  

  componentDidMount(){
    this.myInterval = setInterval(() => {
      this.setState(prevState => ({
        round: prevState.round + 1,
        strategy: Math.floor(Math.random() * 4) + 1,
      }))
    }, 2000)

    

  }
  
  componentWillUnmount(){
    clearInterval(this.myInterval);
  }
  
  render(){

    return (
      <div className="App" ref="game">
        <GameContainer round={this.state.round} playerStrategy={this.state.strategy} />
      </div>
    );
  }
  
}

export default App;
