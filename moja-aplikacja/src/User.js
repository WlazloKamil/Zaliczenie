import React from 'react';
import {Button,Alert, ButtonToolbar, Row, Container, Col} from 'react-bootstrap';

import API from './utils/API';

export default class user extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSid = this.handleSid.bind(this);
  }
  handleSid(e){
    console.log(e.target.id)
    API.delete('/deluser/'+e.target.id).then(function(res) {
    }).then(this.componentDidMount());
    window.location.reload();
  }

  handleEdit(event){
    let json = {'id': event.target.id.value, 'firstName': event.target.imiedit.value, 'lastName': event.target.nazwedit.value, 'email': event.target.mailedit.value, 'nick':event.target.nickedit.value}
    console.log(json);  

    API.put('/put/'+event.target.id.value, json).then(function(res) {
      //alert(res)
    });
  }

  
  handleClick(e){
 // console.log(this.state.dane.find(x => x.id == e.target.id));
     var y = document.getElementById('editable');
var danee = this.state.dane.find(x => x.id == e.target.id);
console.log(danee.firstName) 

     if(y.style.display =='none'){
       y.style.display = 'block';
     }
     else{
      if(this.last_id == e.target.id || this.last_id == null){
       y.style.display = 'none';
      }
     }
    

    document.getElementById('imiedit').value = danee.firstName.toString();
    document.getElementById('nazwedit').value = danee.lastName.toString();
    document.getElementById('mailedit').value = danee.email.toString();
    document.getElementById('nickedit').value = danee.nick.toString();
    document.getElementById('id').value = danee.id.toString();
     this.last_id = e.target.id
  }

  handleSubmit(event) {
    event.preventDefault();
    let json = {'firstName': event.target.firstName.value, 'lastName': event.target.lastName.value, 'email': event.target.email.value, 'nick':event.target.nick.value}
    console.log(json);
    //JSON.parse(json);
   API.post('/post', json);
   window.location.reload();
  }

  state = {
    dane: [],
    
  }

  componentDidMount() {
    let last_id;
    API.get(`/user`)
      .then(res => {
        const dane = res.data;
        this.setState({ dane });
        console.log(res.data);
      })
  }
// modelkomp  modelproc    speedavg  memtotal  memfree  memused  battery  disk1  disk2
  render() {
    return (
      <div className="container">
        <h1>Lista użytkowników</h1>
        <table border ='5'>
        <tr><th>Imie</th><th>Nazwisko</th><th>Mail</th><th>Nick</th><th>Edytuj</th><th>Usuń</th></tr>
        {this.state.dane.map(x=><tr><td>{x.firstName}</td><td>{x.lastName}</td><td>{x.email}</td><td>{x.nick}</td><td><Button  onClick={this.handleClick} variant='warning'  id ={x.id} zmienne ={x} style={{width:'100%'}}>Edytuj</Button></td><td><Button  onClick={this.handleSid} variant='danger' id ={x.id} style={{width:'100%'}}>X</Button></td></tr>)}
        </table>
        <br></br>
        <div style={{display:'none'}} id='editable'>
        <h1>Edycja:</h1>
        <form onSubmit={this.handleEdit}>

        <div style={{width:'100%',height:'auto', float:'left'}}>
        Imie:<input id="imiedit" name="imiedit" type="text" />
        Nazwisko:<input id="nazwedit" name="nazwedit" type="text" />
        Mail:<input id="mailedit" name="mailedit" type="text" />
        Nick:<input id="nickedit" name="nickedit" type="text" />
        <input id='id' name='id' type='hidden' />
        </div>
  <br></br>
        <button>Edytuj</button>
      </form>
        </div>
        <br></br>
      <h1>Dodaj użytkownika</h1>
      <form onSubmit={this.handleSubmit}>

      <div style={{width:'200px',height:'auto'}}>
      Imie:<input id="firstName" name="firstName" type="text" /><br></br> 
      Nazwisko:<input id="lastName" name="lastName" type="text" /><br></br>
      Mail:<input id="email" name="email" type="text" /><br></br>
      Nick:<input id="nick" name="nick" type="text" /><br></br>
      </div>
<br></br>
      <button>Dodaj</button>
    </form>

      </div>
    )
  }
}
