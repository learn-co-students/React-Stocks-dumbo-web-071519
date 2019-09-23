import React, { Component } from 'react';
import Header from './components/Header'
import MainContainer from './containers/MainContainer'

class App extends Component {
  render() {
    return (
      <div>
        {console.log('App')}
        <Header/>
        <MainContainer/>
      </div>
    );
  }
}

export default App;
