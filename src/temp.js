<Row>
              <Col span={24}>
                <Row >
                  <Col offset={6} span={10}>
                    <Search
                      allowClear
                      placeholder="Recipe website"
                      enterButton="Search"
                      size="large"
                      onSearch={this.callWebsiteApi}
                    />
                  </Col>
                </Row>
                <Row justify="space-around" align="middle">
                  <Col offset={6} span={10}>
                    <TextArea
                      rows={8}
                      placeholder="Recipe plain text input"
                      maxLength={80}
                      onChange={(event) =>
                        this.setState({ recipeInput: event.target.value })
                      }
                    />
                  </Col>
                  <Col span={1}>
                    <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      onClick={() =>
                        this.callPlainTextApi(this.state.recipeInput)
                      }
                    >
                      Search
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>