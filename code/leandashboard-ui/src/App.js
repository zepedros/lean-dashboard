//import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import About from './components/FooterLinks/About';
import ProjectsPage from './components/Projects/ProjectsPage';
import UsersPage from './components/Users/UsersPage';
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
import {FormattedMessage} from 'react-intl'
import {IntlProvider } from "react-intl"
import English from "./i18n/messages/en-EN"
import Portuguese from "./i18n/messages/pt-PT"
import {I18nProvider,LOCALES} from './i18n'
import WidgetSettingsPage from './components/Dashboard/WidgetSettingsPage'

function App() {
  const { get, post } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })

  const userRepository = createRepository(get, post)
  const [userCredentials, setUserCredentials] = useState(userRepository.isLoggedIn())

  useEffect(() => {
    if (userCredentials?.password) {
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

  const local = navigator.language;

let lang;
if(local=== "en-en"){
  lang=English
}else{
  lang=Portuguese
}

  console.log(currentSessionContext.credentials)
  return (

    <I18nProvider locale={LOCALES.PORTUGUESE}>
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
            <Route exact path="/projects/:id/dashboards/:dashboardId/settings">
              <EnsureCredentials redirect="/signIn">
                <WidgetSettingsPage />
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
            <Route exact path="/users">
              <EnsureCredentials redirect="/signIn">
                <UsersPage />
              </EnsureCredentials>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div >
    </I18nProvider>
  )
}
export default App;

