import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import './Login.css';

import JSONRequests from 'libraries/JSONRequests';


function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //Navigate functions
    //Navigate to signup page
    function navigateToSignUp() {
        navigate("/signup"); // Navigate to sign up page
    }


    //Handle Login form-submission
    const handleLoginFormSubmit = (event) => {
        event.preventDefault(); // Prevents form submission default operation. Which is reloading the page
        console.log("submitting login form.");

    }




    return (
    <div className = "login-container">
        <h2>Login</h2>
        <form id="login-form" onSubmit={handleLoginFormSubmit}>
            <div className = "form-group">
                <label htmlFor="username">Username:</label>
                <input type = "text" id="username-txtfield" name = "username" value = {username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className = "form-group">
                <label htmlFor='password'>Password:</label>
                <input type = "password" id = "password" name = "password" value = {password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" id="login-btn">Login</button>
        </form>
        <button id="signup-btn" onClick={navigateToSignUp}>SignUp</button>
    </div>
    );
}

export default Login;
