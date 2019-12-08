import React from 'react';

import API from './utils/API';
import {Button,Alert, ButtonToolbar, Row, Container, Col} from 'react-bootstrap';
export default class dell extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
  }
  state = {
    dane: []
  }
  handleClick(e){
  console.log(e.target.id)
  API.delete('/del/'+e.target.id).then(function(res) {
  }).then(this.componentDidMount());
  window.location.reload();
}

  componentDidMount() {
    API.get(`/get`)
      .then(res => {
        const dane = res.data;
        const uzy = res.data
        this.setState({ dane });
        console.log(uzy);
      })
  }
// modelkomp  modelproc    speedavg  memtotal  memfree  memused  battery  disk1  disk2
  render() {
    return (
      <div className="container">
        <h1>Dane</h1>
        <table border='4'>
     <tr> <th style={{width:"850px"}}>MODEL</th><th style={{width:"850px"}}>Procesor</th><th>Taktowanie</th><th>Pamięć RAM</th><th>Używana pamięć</th> <th>Wolna pamięć</th> <th>Pojemność dysku 1</th><th>Pojemność dysku 2</th><th>Bateria</th><th>Usuń</th></tr>
         { this.state.dane.map(dane => <tr><td>{dane.modelkomp}</td><td>{dane.modelproc}</td><td>{dane.speedavg}</td><td>{dane.memtotal} Gb</td><td>{dane.memused} Gb</td><td>{dane.memfree} Gb</td><td>{dane.disk1} Gb</td><td>{dane.disk2} Gb</td><td>{dane.battery}%</td><td><Button  onClick={this.handleClick} variant='danger' id ={dane.id} style={{width:'100%'}}>X</Button></td></tr>)}

       </table>
      </div>
    )
  }
}
    