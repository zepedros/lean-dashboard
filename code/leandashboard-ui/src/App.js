import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import useFetch from 'use-http';
import './App.css';
import EnsureCredentials from './common/EnsureCredentials';
import UserContext, { createRepository } from './common/UserContext';
import DashboardPage from './pages/DashboardPage';
import WidgetSettingsPage from './pages/WidgetSettingsPage';
import DashboardsPage from './pages/DashboardsPage';
import About from './components/FooterLinks/About';
import Contact from './components/FooterLinks/Contact';
import PrivacyPolicy from './components/FooterLinks/PrivacyPolicy';
import Terms from './components/FooterLinks/Terms';
import HomePage from './pages/HomePage';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import ProfilePage from './pages/ProfilePage';
import ProjectSettingsPage from './pages/ProjectSettingsPage';
import ProjectsPage from './pages/ProjectsPage';
import SettingsPage from './pages/SettingsPage';
import UsersPage from './pages/UsersPage';
import AddWidgetPage from './pages/AddWigetPage';
import SlideShow from './components/Dashboard/SlideShowDashboard'
import { I18nProvider, LOCALES } from './i18n';

function App() {
  const { get, post } = useFetch(process.env.REACT_APP_API_FETCH_URI, { cachePolicy: "no-cache", credentials: "same-origin" })
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
  }, [get,post,userCredentials])

  const currentSessionContext = {
    credentials: userCredentials,
    login: (username, password, remember, history) => {
      userRepository.login(username, password, remember, history, setUserCredentials)
    },
    logout: (history) => {
      userRepository.logout(history, setUserCredentials);
    }
  }

  if(!localStorage.getItem("key")) localStorage.setItem("key",LOCALES.ENGLISH)

  return (
    <div className="App">
      <I18nProvider locale={localStorage.getItem("key")}>
        <UserContext.Provider value={currentSessionContext}>
          < Router>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/signIn" component={SignIn}>
                {userCredentials && <Redirect to="/projects" />}
              </Route>
              <Route exact path="/signUp" component={SignUp} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/terms" component={Terms} />
              <Route exact path="/privacyPolicy" component={PrivacyPolicy} />
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
              <Route exact path="/projects/:id/dashboards/:dashboardId/slideShow">
                <EnsureCredentials redirect="/signIn">
                  <SlideShow />
                </EnsureCredentials>
              </Route>
            </Switch>
          </Router>
        </UserContext.Provider>
      </I18nProvider>
    </div >
  )
}
export default App;

