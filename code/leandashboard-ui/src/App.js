//import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import About from './components/FooterLinks/About';
import ProjectsPage from './components/Projects/ProjectsPage';
import DashboardsPage from './components/Dashboards/DashboardsPage'
import DashboardPage from './components/Dashboard/DashboardPage'
import SettingsPage from './components/Settings/SettingsPage'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import AddWidgetPage from './components/Widgets/AddWigetPage';
import ProjectSettingsPage from './components/Projects/ProjectSettingsPage';
import ProfilePage from './components/Profile/ProfilePage'
import EnsureCredentials from './common/EnsureCredentials';
import UserContext, { createRepository } from './common/UserContext';
import useFetch from 'use-http'
import { useEffect, useState } from 'react'

function App() {
  const { get, post } = useFetch('http://localhost:3000/api', { credentials: "same-origin" })

  const userRepository = createRepository(get, post)
  const [userCredentials, setUserCredentials] = useState(userRepository.isLoggedIn())

  useEffect(() => {
    if (userCredentials) {
      post("/lean/login", userCredentials).then((response) => {
        if (response.statusCode === 200) {
          get(`/api/lean/users/${userCredentials.username}/roles`).then((res) => {
            sessionStorage.setItem('user-rbac', JSON.stringify(res))
          })
        } else {
          console.log('ERROR')
        }
      })
    }
  }, [])

  const currentSessionContext = {
    credentials: userCredentials,
    login: (username, password, remember, history) => {
      userRepository.login(username, password, remember, history, setUserCredentials)
    },
    logout: (history) => {
      userRepository.logout(history, setUserCredentials);
    }
  }
  return (
    <div className="App">
      <UserContext.Provider value={currentSessionContext}>
        < Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/signIn" component={SignIn}>
              {userCredentials && <Redirect to="/projects" />}
            </Route>
            <Route exact path="/signUp" component={SignUp} />
            <Route exact path="/about" component={About} />
            <Route exact path="/projects">
              <EnsureCredentials redirect="/signIn">
                <ProjectsPage />
              </EnsureCredentials>
            </Route>
            <Route exact path="/projects/:id/dashboards">
              <EnsureCredentials redirect="/signIn">
                <DashboardsPage />
              </EnsureCredentials>
            </Route>
            <Route exact path="/projects/:id/dashboards/:dashboardId">
              <EnsureCredentials redirect="/signIn">
                <DashboardPage />
              </EnsureCredentials>
            </Route>
            <Route exact path="/projects/:id/dashboards/:dashboardId/templates">
              <EnsureCredentials redirect="/signIn">
                <AddWidgetPage />
              </EnsureCredentials>
            </Route>
            <Route exact path="/projects/:id/settings">
              <EnsureCredentials redirect="/signIn">
                <ProjectSettingsPage />
              </EnsureCredentials>
            </Route>
            <Route exact path="/profile">
              <EnsureCredentials redirect="/signIn">
                <ProfilePage />
              </EnsureCredentials>
            </Route>
            <Route exact path="/settings">
              <EnsureCredentials redirect="/signIn">
                <SettingsPage />
              </EnsureCredentials>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div >
  )
}
export default App;

