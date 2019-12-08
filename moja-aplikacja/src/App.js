import React from 'react';
import {Button,Alert, ButtonToolbar, Row, Container, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dane from './Dane';
import Del from './Del';
import Stat from './Stat';
import User from './User';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  var perrmision
  if(localStorage.getItem('token')==null){
    localStorage.setItem('token','XYZ')
  }
  if(localStorage.getItem('token')== 'XYZ'){
    perrmision = 'Użytkownik'
  }
  else if (localStorage.getItem('token') == 'root'){
    perrmision = 'Admin'
  }
  function handleClick(e) {
   var loc = localStorage.getItem('token')
if(loc =='XYZ'){
  localStorage.setItem('token','root')
}
else if(loc =='root'){
  localStorage.setItem('token','XYZ')
}
window.location.reload()
  }
  return (
    <Router>
      <div>
        <nav style={{width:'100%'}}>
          <ul>
          
          <Link to="/">
            <Button variant="primary">
              Home
              </Button>
              </Link>
           
            
              <Link to="/dane">
              <Button variant="primary">
                Dane
                </Button>
                </Link>

                <Link to="/del">
                <Button variant="primary">
                  Usuwanie
                  </Button>
                  </Link>

                  <Link to="/stat">
                  <Button variant="primary">
                    Statystyka
                    </Button>
                    </Link>

                    <Link to="/user">
                    <Button variant="primary">
                      Użytkownicy 
                      </Button>
                      </Link>
                     <span style={{width:'450px', display:'block', float:'right', fontSize:'19pt'}}> twoje prawa to : {perrmision} <Button variant='info' style={{position:'absolute', right:'0px'}} onClick={handleClick}>Zmień prawa </Button></span>
          </ul>
         
        </nav>
        
        
        <Switch>
          <Route path="/dane">
            <Dane />
          </Route>
          
        </Switch>
        <Switch>
        <Route path="/del">
          <Del />
        </Route>
        
        </Switch>
        <Switch>
        <Route path="/stat">
          <Stat />
        </Route>
        </Switch>

        <Switch>
        <Route path="/user">
          <User />
        </Route>
    

      </Switch>
      </div>
    </Router>
  );
}

export default App;
