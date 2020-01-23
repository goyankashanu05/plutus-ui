import React from 'react';
import styles from './App.module.css';
import logo from './plutus.png'
import Chart from './Component/Chart'
import EnterAddress from './Component/EnterAddress';
import axios from 'axios'
import { getDataArray } from './utils/prepareData';
import { getStartEndDates } from './utils/filterDates';
import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";
import { Navbar, Container } from 'react-bootstrap';
import SearchFilter from './Component/SearchFilter';
import { ALL_DATA } from './utils/constants';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

const override = css`
display: block;
border-color: red;
top: 50% !important;
position: absolute;
left: 50%;
transform: translate(0%, -15%);

`;

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      address: '',
      apiPath: process.env.API_PATH || 'http://47.89.27.192/api/v1/address/',
      apiData: {
        txs: []
      },
      loading: false,
      chartData: [],
      dateFilterValue: ALL_DATA
    }
  }

  handleAddressChange = (event) => {
    this.setState({
      address: event.target.value
    })
  }

  handleSearch = async () => {
    this.setState({ loading: true, apiData: { txs: [] } }, async () => {
      await this.getDetail()
      this.updateGraph(this.filterChartData(this.state.apiData));
    })
  }

  updateGraph = (data) => {
    let dataArray = getDataArray(data, this.state.address)
    this.setState({
      loading: false,
      chartData: {
        labels: dataArray,
        datasets: [
          {
            showLine: true,
            borderColor: "gray",
            backgroundColor: "rgba(0, 0, 0, 0)",
            pointBackgroundColor: "#55bae7",
            pointBorderColor: "#55bae7",
            pointHoverBackgroundColor: "#55bae7",
            pointHoverBorderColor: "#55bae7",
            label: "Amount",
            fill: true,
            data: dataArray
          }
        ]
      }
    })
  }

  getDetail = async () => {
    await this.getApiData(1, 1000);
    while (this.state.apiData.page < this.state.apiData.totalPages) {
      await this.getApiData(this.state.apiData.page + 1, this.state.apiData.itemsOnPage);
    }
  };

  getApiData = async (page, pageSize) => {

    const { address, apiPath, apiData } = this.state
    await axios.get(`${apiPath}${address}?page=${page}`)
      .then(response => {
        let data = response.data;
          data.txs = [...apiData.txs, ...data.txs];
          this.setState({
            apiData: data
          })
      })
  }

  filterChartData = (apiData) => {
    var filteredChartData = [];
    apiData.txs.forEach(function (data) {
      filteredChartData.push(data)
    })
    return filteredChartData;
  }

  filterChartDataByDates = (apiData, dateRange) => {
    var filteredChartData = [];
    apiData.txs.forEach(function (data) {
      if (data.time >= dateRange.startDate && data.time < dateRange.endDate)
        filteredChartData.push(data)
    })
    return filteredChartData;
  }

  filerByTime = (event) => {
    if (event.target.value === ALL_DATA) {
      let data = this.filterChartData(this.state.apiData)
      this.updateGraph(data);
    } else {
      this.setState({ dateFilterValue: event.target.value })
      const dateRange = getStartEndDates(event.target.value);
      let data = this.filterChartDataByDates(this.state.apiData, dateRange)
      this.updateGraph(data);

    }
  }

  render() {
    return (
      <div className="App">
        <Navbar className={styles.appNavBar} expand="lg">
          <Navbar.Brand href="#home">
            <img src={logo} className={styles.appNavBarImg} alt="logo"
            />
          </Navbar.Brand>

        </Navbar>
        {/* <Row >
          <Col sm={8}> */}
            <Row className={styles.searchRow}>
              <Col sm={2}> </Col>
              <Col sm={4}> <EnterAddress
                handleAddressEvent={this.handleAddressChange}
                handleSearch={this.handleSearch} /></Col>
              <Col sm={4}> <SearchFilter
                dateFilterValue={this.state.dateFilterValue}
                filerByTime={this.filerByTime}
              /></Col>
            </Row>
            <Container className={styles.appChart}>
              <FadeLoader
                css={override}
                size={30}
                margin={4}
                color="gray"
                loading={this.state.loading}
              />
              <Chart chartData={this.state.chartData} />
            </Container>
          {/* </Col>
          <Col sm={4}><div className={styles.appForm}>
            <iframe
              height="261"
              title="Embedded Wufoo Form"
              allowtransparency="true"
              frameBorder="0"
              scrolling="no"
              style={{ width: "100%", border: "none" }}
              src="https://leoncons.wufoo.com/embed/z1lvs4tm0c4wqwq/">
              <a href="https://leoncons.wufoo.com/forms/z1lvs4tm0c4wqwq/">Fill out my Wufoo form!</a>
            </iframe>
          </div></Col>
        </Row> */}

      </div>
    );
  }
}

export default App;
