//import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import About from './components/FooterLinks/About';
import ProjectsPage from './components/Projects/ProjectsPage';
import DashboardsPage from './components/Dashboards/DashboardsPage'
import DashboardPage from './components/Dashboard/DashboardPage'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddWidgetPage from './components/Widgets/AddWigetPage';
import ProjectSettingsPage from './components/Projects/ProjectSettingsPage';



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
          <Route exact path="/projects" component={ProjectsPage} />
          <Route exact path="/projects/:id/dashboards" component={DashboardsPage} />
          <Route exact path="/projects/:id/dashboards/:dashboardId" component={DashboardPage} />
          <Route exact path="/projects/:id/dashboard/templates" component={AddWidgetPage} />
          <Route exact path="/projects/:id/settings" component={ProjectSettingsPage} />
        </Switch>
      </Router>
    </div>
  )
}
/*

*/
export default App;

