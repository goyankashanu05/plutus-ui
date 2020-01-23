import React from 'react';
import './App.css';
import Chart from './Component/Chart'
import EnterAddress from './Component/EnterAddress';
import axios from 'axios'
import { getDataArray } from './utils/prepareData';
import { FILTER_TODAY, FILTER_THIS_WEEK, FILTER_THIS_MONTH, FILTER_3_MONTH_AGO, FILTER_6_MONTH_AGO, FILTER_THIS_YEAR, ALL_DATA } from './utils/constants';
import { getStartEndDates } from './utils/filterDates';
import { css } from "@emotion/core";
// import { ClipLoader } from "react-spinners";
import SyncLoader from "react-spinners/SyncLoader";

const override = css`
display: block;
margin: 24% 45% auto;
border-color: red;
position: absolute;

`;

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      address: '',
      apiPath: process.env.PUBLIC_URL||'http://localhost:80/get-data/',
      apiData: {
        txs: []
      },
      loading: false,
      chartData: [],
      dateFilterValue: ''
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
      console.log("===api===", this.state.apiData)
      this.updateGraph(this.filterChartData(this.state.apiData));
    })
  }

  updateGraph = (data) => {
    let dataArray = getDataArray(data, this.state.address)
    console.log("===data===", dataArray)
    this.setState({
      loading: false,
      chartData: {
        labels: dataArray,
        datasets: [
          {
            showLine: true,
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            label: "Amount",
            fill: false,
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
    await axios.get(`${apiPath}${address}?page=${page}&pageSize=${pageSize}`)
      .then(response => {
        console.log("======response====", response.data)
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
      console.log('dateRange : ', dateRange)
      let data = this.filterChartDataByDates(this.state.apiData, dateRange)
      this.updateGraph(data);

    }
  }

  render() {
    return (
      <div className="App">
        <EnterAddress
          handleAddressEvent={this.handleAddressChange}
          handleSearch={this.handleSearch} />
        <select value={this.state.dateFilterValue} onChange={(event) => this.filerByTime(event)}>
          <option value={ALL_DATA} selected>All Data</option>
          <option value={FILTER_TODAY}>Last 24 Hours</option>
          <option value={FILTER_THIS_WEEK}>This Week</option>
          <option value={FILTER_THIS_MONTH}>This Month</option>
          <option value={FILTER_3_MONTH_AGO}>3 Months ago</option>
          <option value={FILTER_6_MONTH_AGO}>6 Months ago</option>
          <option value={FILTER_THIS_YEAR}>This year</option>
        </select>
        <SyncLoader
          css={override}
          size={30}
          margin={4}
          color="green"
          loading={this.state.loading}
        />
        <Chart chartData={this.state.chartData} />
      </div>
    );
  }
}

export default App;
