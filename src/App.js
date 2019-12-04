import React from 'react';
import axios from 'axios';
import { Button, Card, Row, Col, Checkbox } from 'react-materialize';
import './App.css';
import { buildEndpoint } from './helpers.js'

class Dashboard extends React.Component {
  state = {
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

  render() {
    return (
      <div className="container">
        <div className="row">
          <StockPicker bubbleTicker={this.setTicker} />
        </div>
      </div>
    )
  }
}

class StockPicker extends React.Component {
  toggleTicker = (event) => {
    this.props.bubbleTicker(event)
  } 

  render () {
    return (
      <div className="col s12">
        <Checkbox label="spy" value="spy" className="ticker-check" onChange={this.toggleTicker} />
        <Checkbox label="vix" value="vix" className="ticker-check" onChange={this.toggleTicker} checked={this.isChecked} />
        <Checkbox label="tlt" value="tlt" className="ticker-check" onChange={this.toggleTicker} checked={this.isChecked} />

        <Button large>Get Ticker Data</Button>
      </div>
    )
  }
}

export default Dashboard;
