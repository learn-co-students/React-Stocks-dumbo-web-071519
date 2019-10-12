import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {
          this.props.stock.map((stock,i) => <Stock stock = {stock} key = {i} addPortfolio = {this.props.addPortfolio}/>)
        }
      </div>
    );
  }

}

export default StockContainer;
