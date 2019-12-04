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
    console.log(event.target.value);
    // copy symbols array and push event.target.value
    // this.setState({ symbols: nextSymbols });
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
  addTicker = (event) => {
    this.props.bubbleTicker(event)
  } 

  render () {
    return (
      <div className="col s12">
        <Checkbox label="spy" value="spy" className="ticker-check" onChange={this.addTicker} checked={this.isChecked} />
        <Checkbox label="vix" value="vix" className="ticker-check" onChange={this.addTicker} checked={this.isChecked} />
        <Checkbox label="tlt" value="tlt" className="ticker-check" onChange={this.addTicker} checked={this.isChecked} />

        <Button large>Get Ticker Data</Button>
      </div>
    )
  }
}

export default Dashboard;
