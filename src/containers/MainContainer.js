import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'
import { timingSafeEqual } from 'crypto';

class MainContainer extends Component {
  state = {
    stocks: [],
    portfolioStocks: [],
    searchResults: [],
    filterBy: null,
    sortByAlphabetical: null,
    sortByPrice: null,
    selectedOption: ""
  }
  componentDidMount(){
    fetch(`http://localhost:3000/stocks`)
    .then(res=>res.json())
    .then(data=> {
      this.setState({
        ...this.state,
        stocks: data,
        searchResults: data
      })
    })
  }
  handleSortChange = (e) => {
    console.log("sort", e.target.value)
    //this.handleSortButtons(e.target.value)

    let oldState = this.state
    let unorderedStocks = this.state.searchResults 
    let sortedStocks = this.handleSort(e.target.value, unorderedStocks)

    this.setState({
      ...oldState,
      searchResults: sortedStocks,
      selectedOption: e.target.value
    }, () => { console.log("on sort", this.state) })
  }

  handleSort = (value, unorderedStocks) => {
    if (value === "Alphabetically" ) {
      return this.sortByAlphabetical(unorderedStocks)
    } else if (value === "Price") {
      return this.sortByPrice(unorderedStocks)
    } else {
      return unorderedStocks
    }
  }

  sortByAlphabetical = (unorderedStocks) => {
    return unorderedStocks.sort(function (a, b) {
      var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
      if (nameA < nameB) //sort string ascending
        return -1
      if (nameA > nameB)
        return 1
      return 0 //default return value (no sorting)
    })
  }

  sortByPrice = (unorderedStocks) => {
    return unorderedStocks.sort(function (a, b) {
      return a.price - b.price
    })
  }

  // handleFilterChange = (e) => {
  //   console.log("filter", e.target.value)
  // }

  handleFilterChange = (event) => {
    console.log("I am filtering by ", event.target.value)
    let oldState = this.state
    let filteredValue = event.target.value
    //event.target.value === "greased" ? filteredValue = true : filteredValue = false
    //console.log(filteredValue)

    this.setState({
      ...oldState,
      searchResults: this.filteredStocks(this.state.stocks, filteredValue),
    }, () => { console.log("on filter", this.state) })
  }

  filteredStocks = (stocks, value) => {
    let filteredStocks = []
    if (value === "null") {
      filteredStocks = this.state.stocks
    } else {
      filteredStocks = stocks.filter(
        (stock) => {
          return stock.type === value        }
      )
    }

    return this.handleSort(this.state.selectedOption, filteredStocks)
  }

  handleClick = (id, type) => {
    console.log("id", id)
    console.log(type)
    if (type === "purchase"){
      this.handlePurchase(id)
    } else if (type === "sell"){
      this.handleSell(id)
    }
  }

  handlePurchase = (id) => {
    console.log("handle purchase", id)
    let isAlreadyPurchased = this.state.portfolioStocks.find( (stock) => stock.id === id)
    if (isAlreadyPurchased){
      console.log("id is here bitch")
    }  else {
      this.setState({
        ...this.state,
        portfolioStocks: [...this.state.portfolioStocks, this.findByID(id)]
      }, () => console.log(this.state))
    }    
  }

  handleSell = (id) => {
    console.log("handle sell", id)
    let array = this.state.portfolioStocks
    let newArray = array.filter( (stock) => {
      stock.id !== id
    })

    this.setState({
      ...this.state,
      portfolioStocks: newArray
    },() => console.log(this.state))
  }

  findByID = (id) => {
    return this.state.stocks.find( (stock) => stock.id === id) 
  }

  render() {
    return (
      <div>
        <SearchBar selectedOption={this.state.selectedOption} filterBy={this.state.filterBy} handleSortChange={this.handleSortChange} handleFilterChange={this.handleFilterChange} />

          <div className="row">
            <div className="col-8">

            <StockContainer handleClick={this.handleClick} type="purchase" stocks={this.state.searchResults}/>

            </div>
            <div className="col-4">

            <PortfolioContainer handleClick={this.handleClick} type="sell" portfolioStocks={this.state.portfolioStocks}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
