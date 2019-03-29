import React, { Component } from 'react';
// import * as images from './assets/images'
import './assets/css/App.css';
import Axios from 'axios'

const date =  new Date();

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: ''
    }
  }

  handleFetch = async event => {
  const response = await Axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://traf.nibss-plc.com.ng:7443/traf/ajax?command=website&action=detail&order=loadPOS&clientCode=NIBSS&txnSubCat=ALL`);
  this.setState({
    data: response.data.msg
  })
};

  componentDidMount(){
    this.handleFetch()
  }
  render() {
    return (
      <>
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-sm-5 py-2">
            <a className="navbar-brand text-uppercase" href="/#">Nibss</a>
            <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>{console.log(Object.entries(this.state.data))}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="nav navbar-nav menu_nav ml-auto mr-3 mt-3 mt-lg-0">
                <li className="nav-item active mx-2"><a className="nav-link" href="/#">{date.toLocaleTimeString()}</a></li>
                <li className="nav-item active mx-2"><a className="nav-link" href="/#">{date.toDateString()}</a></li>
              </ul>
            </div>
          </nav>
        </header>
        <section className="container-fluid">
          <div className="row">
            <div className="col-sm-4">
              <div className="card my-4">
                <div className="card-body my-auto">
                  <h2 className="card-title display-4">{this.state.data.entityName}</h2>
                  <h5 className="card-text mb-3">{this.state.data.txnCategory} Transaction</h5>
                  <p>Range Failure Rate Outward</p>
                  <h1>{this.state.data.rangeFailureRateOutward}</h1>
                  <p>Today Failure Rate Outward</p>
                  <h1>{this.state.data.todayFailureRateOutward}</h1>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="my-4 border-bottom">
                <span className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white position-sticky">Today</span>
                <ul className="list-group">
                  {Object.entries(this.state.data).filter( item => item[0].includes('today')).map((item, index)=> (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">{item[0].toString()} <span className="badge">{item[1].toString()}</span> </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="my-4 border-bottom">
                <span className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white">Current Time Range</span>
                <ul className="list-group">
                  {Object.entries(this.state.data).filter( item => item[0].includes('range')).map((item, index)=> (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">{item[0].toString()} <span className="badge">{item[1].toString()}</span> </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default App;
