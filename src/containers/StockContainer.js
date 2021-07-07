import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  oneStock=()=>{
    return (this.props.stocks.map((stock) => <Stock stock={stock} key={stock.id} onClick={this.props.onClickAdd}/>))
  }

  render() {
    return (

      <div>
        <h2>Stocks</h2>
        {
          this.oneStock()
          //render the list of stocks here
        }
        
      </div>
    );
  }

}

export default StockContainer;
