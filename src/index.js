// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {BrowserRouter} from 'react-router-dom';

// // const router = createBrowserRouter([
// // {
// //   path : '/main',
// //   element :<MainCategories/>
// // },
// // {
// //   path : '/',
// //   element :<TopBanner/>
// // },
// // {
// //   path : '/navbar',
// //   element :<Navbar/>
// // },
// // {
// //   path : '/sub/:id',
// //   element :<SubCategories/>
// // },
// // ])

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
// <BrowserRouter>
// <App/>
// </BrowserRouter>


//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>      {/* ←  MUST wrap the whole tree */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
