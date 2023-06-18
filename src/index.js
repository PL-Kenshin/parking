import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { isExpired, decodeToken  } from "react-jwt";
import Dashboard from './components/dashboard';
import LoginForm from './components/loginForm';
import SignupForm from './components/signupForm';
import Admin from './components/admin';
import socketIO from 'socket.io-client'
const socket = socketIO.connect("http://localhost:4000")

const root = ReactDOM.createRoot(document.getElementById('root'));
const user = decodeToken(localStorage.getItem('token'));

socket.on('userBanned', (username) => {
  if(username===user.username){
    localStorage.removeItem('token')
    alert('You have been banned')
    setTimeout(() => {
      window.location.assign('/')
    }, 3000);
  }
})

root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard socket={socket}/>} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="signup" element={isExpired(localStorage.getItem("token")) ? <SignupForm socket={socket} /> : <Navigate to="/" />} />
          <Route path="login" element={isExpired(localStorage.getItem("token")) ? <LoginForm socket={socket} /> : <Navigate to="/" />} />
          <Route path="admin" element={!isExpired(localStorage.getItem('token')) &&  user?.isAdmin? <Admin socket={socket}/> : <Navigate to="/" />}/>
        </Route>
      </Routes>

    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
