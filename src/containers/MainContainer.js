import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state={
    stocks: [],
    portfolio: [],
    filtered: [],
    selectedOption: '',
    sorted: []
  }

  componentDidMount(){
    console.log('ComponentDidMount')
    fetch('http://localhost:3000/stocks')
    .then(res=>res.json())
    .then(res=>{this.setState({
      stocks: res,
      filtered: res
    })})
    
  }

  onClickAdd=(stock)=>{
   this.setState({
      portfolio: [...this.state.portfolio, stock],
    //  filtered: [...this.state.portfolio, stock]
   })
  }
  onClickRemove = (stockToRemove) => {
    
   var arr =
      (this.state.portfolio.filter(function (stock) {
        return stock.id !== stockToRemove.id;
      }))
    this.setState({
      portfolio: arr
    })
  }

  filterHendler=(filterBy)=>{
   console.log('filterHendler')
   var filteredStocks = this.state.stocks.filter((stock=>{
      return stock.type === filterBy
    }))

    this.setState({
      filtered: filteredStocks
    })
   
  }

 sortHendler=(option)=>{

  
   //return this.state.sortChecked
   console.log(option)
   var sortBy = (option === 'Alphabetically' ?  'ticker' : 'price')
   var sorted=this.state.filtered
   console.log(sortBy)
   sorted.sort((a,b)=>{
    
     return ((a[sortBy] > b[sortBy] ? 1 : -1))
    
   })
   console.log(sorted)
   this.setState({
     selectedOption: option,
     filtered: sorted
   })
  //  var sortedPrice = this.state.filtered.sort((a, b) => {

  //    return a.price > b.price ? b : a

  //  })
 }


  render() {
    return (

      <div>

        <SearchBar filterHendler={this.filterHendler} selectedOption={this.state.selectedOption} sortHendler={this.sortHendler}/>
 
          <div className="row">
            <div className="col-8">

            <StockContainer onClickAdd={this.onClickAdd} stocks={this.state.filtered}/>

            </div>
            <div className="col-4">
             
            <PortfolioContainer onClickRemove={this.onClickRemove} stocks={this.state.portfolio} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
