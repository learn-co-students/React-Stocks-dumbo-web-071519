import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {
  
  renderPortfolioStocks = () => {
    // return this.props.portfolioStocks.map((stock) => console.log(stock))
    return this.props.portfolioStocks.map((stock,idx) => { return <Stock handleClick={this.props.handleClick} type={this.props.type} key={idx} stock={stock} /> })
  }



  render() {
    return (
      // <div onClick={e=>this.props.handleSell(e)}>
      <div>
        <h2>My Portfolio</h2>
          
            {this.renderPortfolioStocks()}
          
      </div>
    );
  }

}

export default PortfolioContainer;
