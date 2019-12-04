import React from 'react';
import axios from 'axios';
import { Button, Card, Row, Col, Checkbox } from 'react-materialize';
import './App.css';
import { buildEndpoint } from './helpers.js'

class Dashboard extends React.Component {
  state = {
    endPoint: '',
    stockData: [],
    symbols: []
  }

  setTicker = (event) => {
    if (event.target.checked) {
      this.setState({
        symbols: [ ...this.state.symbols, event.target.value]
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
    this.setState({ endPoint: endPointUrl });
  }

  render() {
    return (
        <StockPicker bubbleTicker={this.setTicker} createEndpointUrl={this.createEndpointUrl} />
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
    return (
      <div className="container stock-picker">
        <div className="row">
          <div className="col s4">
            <Checkbox label="spy" value="spy" className="ticker-check" onChange={this.toggleTicker} />
          </div>
          <div className="col s4 middle">
            <Checkbox label="vix" value="vix" className="ticker-check" onChange={this.toggleTicker} />
          </div>
          <div className="col s4 right">
            <Checkbox label="tlt" value="tlt" className="ticker-check" onChange={this.toggleTicker} />
          </div>
        </div>
        <div className="row">
          <Button small onClick={this.submitSymbols}>Get Ticker Data</Button>
        </div>
      </div>
    )
  }
}

export default Dashboard;
