import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  SearchOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import {
  Button,
  Layout,
  Space,
  Statistic,
  Row,
  Col,
  Input,
  Table,
  Card,
} from "antd";

const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;
const { Search, TextArea } = Input;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableContents: {},
      recipeInput: "",
    };
    // This binding is necessary to make `this` work in the callback
    this.callWebsiteApi = this.callWebsiteApi.bind(this);
    this.callPlainTextApi = this.callPlainTextApi.bind(this);
    this.makeTable = this.makeTable.bind(this);
  }
  callWebsiteApi(website_input) {
    const baseUrl = "https://mace-api-app.herokuapp.com/website?website=";
    let website = "https://based.cooking/apple-pie.html";
    if (website_input !== "") {
      website = website_input;
    }
    axios
      .get(baseUrl + website)
      .then((response) => this.setState({ tableContents: response.data }))
      .catch((err) => console.log(err));
  }
  callPlainTextApi(plaintext_input) {
    const baseUrl = "https://mace-api-app.herokuapp.com/textinput";
    axios
      .post(baseUrl, {
        contents: plaintext_input,
      })
      .then((response) => this.setState({ tableContents: response.data }))
      .catch((err) => console.log(err));
  }
  makeTable() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Emission (g)",
        dataIndex: "emission",
        key: "emission",
        render: (number) => number.toFixed(2),
        sorter: (a, b) => a.emission - b.emission,
        sortDirections: ["descend"],
      },
      {
        title: "Best match",
        dataIndex: "best_match",
        key: "best_match",
      },
      {
        title: "Score",
        dataIndex: "score",
        key: "score",
        render: (number) => number.toFixed(2),
        sorter: (a, b) => a.score - b.score,
        sortDirections: ["descend"],
      },
      {
        title: "Accepted",
        dataIndex: "accepted",
        key: "accepted",
        render: (pass) =>
          pass ? (
            <CheckCircleTwoTone twoToneColor="green" />
          ) : (
            <CloseCircleTwoTone twoToneColor="red" />
          ),
        filters: [
          {
            text: <CheckCircleTwoTone twoToneColor="green" />,
            value: true,
          },
          {
            text: <CloseCircleTwoTone twoToneColor="red" />,
            value: false,
          },
        ],
        onFilter: (value, record) => record.accepted === value,
      },
    ];
    if (Object.keys(this.state.tableContents).length === 0) {
      return <Table columns={columns} />;
    } else {
      const tableItems = this.state.tableContents.details.map((detail) => ({
        key: detail.name,
        name: detail.name,
        emission: detail.emission,
        best_match: detail.best_match,
        score: detail.score,
        accepted: detail.is_pass,
      }));
      let total_co2_amount = this.state.tableContents.total_co2.amount;
      let total_co2_header = "Total CO2";
      let total_co2_unit = this.state.tableContents.total_co2.unit;
      let result = (
        <div>
          <Row>
          <Col>
            <Table dataSource={tableItems} columns={columns} />
            </Col>
          </Row>
          <Row >
            <Col >
              <Card>
                <Statistic
                  title={total_co2_header}
                  value={total_co2_amount}
                  precision={2}
                  suffix={total_co2_unit}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
            </Col>
          </Row>
        </div>
      );
      return result;
    }
  }
  render() {
    return (
      <div className="App">
        <Layout style={{ minHeight: "100vh" }}>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Header>
              <Title className="App-header">Recipe CO2 estimator</Title>
            </Header>
            <Content>
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
                <Col offset={6} span={10}>
                  <Search
                    allowClear
                    placeholder="Recipe website"
                    enterButton="Search"
                    size="large"
                    onSearch={this.callWebsiteApi}
                  />
                </Col>
                <Row align="middle">
                  <Col offset={6} span={9}>
                    <TextArea
                      rows={8}
                      placeholder="Recipe plain text input"
                      maxLength={800}
                      onChange={(event) =>
                        this.setState({ recipeInput: event.target.value })
                      }
                    />
                  </Col>
                  <Col span={1}>
                    <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      size="large"
                      onClick={() =>
                        this.callPlainTextApi(this.state.recipeInput)
                      }
                    >
                      Search
                    </Button>
                  </Col>
                </Row>
                <Col offset={6} span={10}>{this.makeTable()}</Col>
              </Space>
            </Content>
          </Space>
        </Layout>
      </div>
    );
  }
}

export default App;
