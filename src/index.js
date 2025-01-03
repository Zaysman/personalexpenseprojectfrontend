import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Install react-router-dom and perform the necessary imports
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


//Import Pages
import Login from 'components/Login/Login';
import SignUp from 'components/SignUp/SignUp';
import Dashboard from 'components/Dashboard/Dashboard';
import ExpenseForm from 'components/ExpenseForm/ExpenseForm';
import Summary from 'components/Summary/Summary';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path = "/" element = {<Login/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/signup" element = {<SignUp/>}/>
        <Route path = "/dashboard" element = {<Dashboard/>}/>
        <Route path = "/expenseform" element={<ExpenseForm/>}></Route>
        <Route path = "/summary" element={<Summary/>}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
/*
root.render(
  <React.StrictMode>

    <App />
  </React.StrictMode>
);
*/




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
