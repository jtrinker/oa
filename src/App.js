import React from 'react';
import axios from 'axios';
import uuid from 'react-uuid';
import { Button, Card, Row, Col, Checkbox, ProgressBar } from 'react-materialize';
import './App.css';
import { buildEndpoint } from './helpers.js'

class Dashboard extends React.Component {
  state = {
    endPoint: '',
    stockData: [],
    isLoading: false,
    symbols: [],
    error: null
  }

  setTicker = (event) => {
    if (event.target.checked) {
      this.setState({
        symbols: [...this.state.symbols, event.target.value]
      });
    } else {
      let nextSymbols = [...this.state.symbols]; 
      let index = nextSymbols.indexOf(event.target.value);

      if (index !== -1) {
        nextSymbols.splice(index, 1);
        this.setState({ symbols: nextSymbols });
      }
    }
  }

  createEndpointUrl = () => {
    const tickerSymbols = this.state.symbols;
    const endPointUrl = buildEndpoint(tickerSymbols);
    this.setState({ endPoint: endPointUrl }, () => this.getStockData(this.state.endPoint));
  }

  async getStockData (url) {
    this.setState({ isLoading: true });
    try {
      const result = await axios.get(url);
      this.setState({
        stockData: result.data.data,
        isLoading: false
      }, () => {console.log(this.state.stockData)}) // view array output of data fetch
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }

  render() {
    return (
        <StockPicker bubbleTicker={this.setTicker} createEndpointUrl={this.createEndpointUrl} data={this.state.stockData} isLoading={this.state.isLoading} />
    )
  }
}

class StockPicker extends React.Component {
  toggleTicker = (event) => {
    this.props.bubbleTicker(event)
  }
  
  submitSymbols = () => {
    this.props.createEndpointUrl();
  }

  render () {
    if (this.props.isLoading) {
      return <ProgressBar />
    }
    const stockComponents = this.props.data.map((stock) => (
      <div className="col s4" key={uuid()}>
          <Stock 
            stock={stock}
          /> 
      </div>
    ));
    
    return (
      <div className="container stock-picker">
        <div className="row">
          <div className="col s4">
            <Checkbox label="spy" value="spy" className="ticker-check" onChange={this.toggleTicker} />
          </div>
          <div className="col s4 middle">
            <Checkbox label="goog" value="goog" className="ticker-check" onChange={this.toggleTicker} />
          </div>
          <div className="col s4 right">
            <Checkbox label="tlt" value="tlt" className="ticker-check" onChange={this.toggleTicker} />
          </div>
        </div>
        <div className="row">
          <Button small onClick={this.submitSymbols}>Get Ticker Data</Button>
        </div>
        <hr />
        <div className="row">
          {stockComponents}
        </div>
      </div>
    )
  }
}

class Stock extends React.Component {
  render () {
    return (
      <div>
            <h2>{this.props.stock.name}</h2>
            <p>Yesterday Close: <span>{this.props.stock.close_yesterday}</span></p>
            <p>1 Day Change: <span>{this.props.stock.day_change}</span></p>
            <p>Day High: <span>{this.props.stock.day_high}</span></p>
            <p>Day Low: <span>{this.props.stock.day_low}</span></p>
      </div>
    )
  }
}

export default Dashboard;
