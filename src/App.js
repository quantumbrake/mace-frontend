import React, { Component } from 'react';
import "./App.css";
import axios from "axios"
import { Input } from 'antd';
import { Table } from 'antd';

const { Search } = Input;

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
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      }
    ]
    if (Object.keys(this.state.tableContents).length === 0) {
      return <Table columns={columns} />
    } else {
      const tableItems = this.state.tableContents.details.map((detail, index) => (
        {
          key: toString(index),
          name: detail.name,

        }
      ))
      return <Table dataSource={tableItems} columns={columns} />
    }
  }
  render() {
    return (
    <div className="App">
      <header className="App-header">
      <Search
      placeholder="input search text"
      enterButton="Search"
      size="large"
      // suffix={suffix}
      onSearch={this.callApi}
    />
      <p>{ this.makeTable() }</p> 
      </header>
    </div>
    )
  };
}

export default App;