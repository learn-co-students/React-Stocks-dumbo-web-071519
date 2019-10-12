import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  state = {
    stocks: [],
    displayStocks: [],
    portfolioStocks: []
  };

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          stocks: data,
          displayStocks: data
        });
      });
  }

  filterStocks = event => {
    if (event.target.value !== "All") {
      this.setState({
        displayStocks: this.state.stocks.filter(
          stock => stock.type === event.target.value
        )
      });
    } else {
      this.setState({
        displayStocks: this.state.stocks
      });
    }
  };

  addPortfolio = stockid => {
    // console.log(this.state.portfolioStocks)
    if (this.state.portfolioStocks.includes(stockid)) {
      console.log("arrived");
    } else {
      this.setState({
        portfolioStocks: [...this.state.portfolioStocks, stockid]
      });
    }
  };

  removeItem = stock => {
    const newPortfolio = this.state.portfolioStocks.filter(
      s => s.id !== stock.id
    );
    this.setState({
      portfolioStocks: newPortfolio
    });
  };

  sortStocks = (sortBy) => {
   
    if(sortBy === "Alphabetically"){
      this.setState({displayStocks : this.state.displayStocks.sort((a,b) => a.name > b.name ? 1 : -1)})
    }else {
      this.setState({displayStocks : this.state.displayStocks.sort((a,b) => a.price > b.price ? -1 : 1)})
    }
  }

  render() {
    console.log(this.state.filterValue);

    return (
      <div>
        <SearchBar filterStocks={this.filterStocks} sortStocks = {this.sortStocks} />

        <div className="row">
          <div className="col-8">
            <StockContainer
              stock={this.state.displayStocks}
              addPortfolio={this.addPortfolio}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              portfolioStocks={this.state.portfolioStocks}
              removeItem={this.removeItem}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
