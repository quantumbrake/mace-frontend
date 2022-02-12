import React, { Component } from 'react';
import "./App.css";
import axios from "axios"
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { Statistic, Row, Col, Input, Table, Card } from 'antd';

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
  callApi(website_input) {
    const baseUrl = 'https://mace-api-app.herokuapp.com/website?website='
    let website = 'https://based.cooking/apple-pie.html'
    if (website_input !== '') {
      website = website_input
    }
    axios.get(baseUrl + website)
      .then(response => this.setState({ tableContents: response.data }))
      .catch(err => console.log(err));
  }
  makeTable() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Emission (g)",
        dataIndex: "emission",
        key: "emission",
        render: number => number.toFixed(2),
        sorter: (a, b) => a.emission - b.emission,
        sortDirections: ['descend'],
      },
      {
        title: "Best match",
        dataIndex: "best_match",
        key: "best_match"
      },
      {
        title: "Score",
        dataIndex: "score",
        key: "score",
        render: number => number.toFixed(2),
        sorter: (a, b) => a.score - b.score,
        sortDirections: ['descend'],
      },
      {
        title: "Accepted",
        dataIndex: "accepted",
        key: "accepted",
        render: pass => pass ? <CheckCircleTwoTone twoToneColor="green" /> : <CloseCircleTwoTone twoToneColor="red"/>,
        filters: [
          {
            text: <CheckCircleTwoTone twoToneColor="green" />,
            value: true,
          },
          {
            text: <CloseCircleTwoTone twoToneColor="red"/>,
            value: false,
          }
        ],
        onFilter: (value, record) => record.accepted === value,
      }
    ]
    if (Object.keys(this.state.tableContents).length === 0) {
      return <Table columns={columns} />
    } else {
      const tableItems = this.state.tableContents.details.map((detail, index) => (
        {
          key: toString(index),
          name: detail.name,
          emission: detail.emission,
          best_match: detail.best_match,
          score: detail.score,
          accepted: detail.is_pass,                
        }
      ))
      console.log(this.state.tableContents)
      let total_co2_amount = this.state.tableContents.total_co2.amount
      let total_co2_header = "Total CO2"
      let total_co2_unit = this.state.tableContents.total_co2.unit
      let result = <div>
        <Row>
        <Table dataSource={tableItems} columns={columns} />
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Card>
            <Statistic title={total_co2_header} value={total_co2_amount} 
            precision={2} suffix={total_co2_unit} valueStyle={{ color: '#3f8600' }}/>
            </Card>
          </Col>
        </Row>
        </div>
      return result
    }
  }
  render() {
    return (
    <div className="App">
      <header className="App-header">
      <Search
      allowClear
      placeholder="Recipe website"
      enterButton="Search"
      size="large"
      onSearch={this.callApi}
    />
      <p>{ this.makeTable() }</p> 
      </header>
    </div>
    )
  };
}

export default App;