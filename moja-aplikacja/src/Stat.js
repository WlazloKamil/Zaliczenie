import React from 'react';

import API from './utils/API';

export default class stat extends React.Component {
  state = {
    dane: [],
    
  }

  componentDidMount() {
    API.get(`/stat`)
      .then(res => {
        const dane = res.data.count;
        this.setState({ dane });
        console.log(res.data);
      })
  }
// modelkomp  modelproc    speedavg  memtotal  memfree  memused  battery  disk1  disk2
  render() {
    return (
      <div className="container">
        <h1>Statystyka</h1>
        <table border ='5'>
        <tr><th>nick</th><th>Rekordy</th></tr>
        {this.state.dane.map(x=><tr><td>{x.nick}</td><td>{x.count}</td></tr>)}
        </table>


      </div>
    )
  }
}
