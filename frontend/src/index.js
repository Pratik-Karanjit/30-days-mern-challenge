import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import WowProject from './WowProject';
import { BrowserRouter } from "react-router-dom";
import DataFetchingComponent from './ProjectComponents/DataFetchingComponent';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
{/* <MyApp></MyApp> */}
{/* <DataFetchingComponent></DataFetchingComponent> */}
<I18nextProvider i18n={i18n}>
<WowProject></WowProject>
  </I18nextProvider>,
{/* <CustomComponent></CustomComponent> */}
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
