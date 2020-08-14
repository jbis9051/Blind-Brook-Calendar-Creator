import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {kStringMaxLength} from "buffer";

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if(isSafari){
    const styleEl = document.createElement('style');
    styleEl.setAttribute("type", "text/css");
    styleEl.innerHTML = `
@media print {
    @page {
    size: A4;
    margin: 0;
}

html, body {
    width: 210mm;
    height: 100%;
}
}
`;
    document.querySelector('head')!.append(styleEl);

}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
