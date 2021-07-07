import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  oneStock = () => {
    { console.log(this.props.stocks) }
    return (this.props.stocks.map((stock) => <Stock stock={stock} key={stock.id} onClick={this.props.onClickRemove} />))
  }
  
  render() {
    return (
      <div >
        <h2>My Portfolio</h2>
          {this.oneStock()}
      </div>
    );
  }

}

export default PortfolioContainer;
