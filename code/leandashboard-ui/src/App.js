//import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import About from './components/FooterLinks/About';

import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import SideBar from 'react';



/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

function App() {
  return(
    <div className="App">
      < Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signIn" component={SignIn} />
          <Route exact path="/signUp" component={SignUp} />
          <Route exact path="/about" component={About} />
        </Switch>
      </Router>
    </div>
  )
}
/*

*/
export default App;

