import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from "react-intl";
import App from './App';
import English from "./i18n/messages/en-EN";
import Portuguese from "./i18n/messages/pt-PT";
import './index.css';
import reportWebVitals from './reportWebVitals';

const local = navigator.language;

let lang;
if (local === "en-en") {
  lang = English
} else {
  lang = Portuguese
}

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale={local} messages={Portuguese}>
      <App />
    </IntlProvider>
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
