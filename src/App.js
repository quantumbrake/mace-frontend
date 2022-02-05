import React, { Component } from 'react';
import "./App.css";
import { Button } from 'antd';
import axios from "axios"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableContents: {}
    }
    // This binding is necessary to make `this` work in the callback
    this.callApi = this.callApi.bind(this);  
    this.makeTable = this.makeTable.bind(this);  
  }
  callApi() {
    const baseUrl = 'https://mace-api-app.herokuapp.com'
    const website = '/website?website=https://based.cooking/apple-pie.html'
    axios.get(baseUrl + website)
      .then(response => this.setState({ tableContents: response.data }))
      .catch(err => console.log(err));
    console.log(this.state.tableContents)
  }
  makeTable() {
    if (Object.keys(this.state.tableContents).length === 0) {
      return <p> Empty table </p>
    } else {
      const tableItems = this.state.tableContents.details.map((detail) =>
      <li key={detail.name}>
        {detail.name}
      </li>
      )
      return tableItems
    }
  }
  render() {
    return (
    <div className="App">
      <header className="App-header">
      <Button onClick={this.callApi} type="primary">Button</Button>
      <p>{ this.makeTable() }</p> 
      </header>
    </div>
    )
  };
}

export default App;