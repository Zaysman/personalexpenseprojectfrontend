import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import './SignUp.css';
import JSONRequests from 'libraries/JSONRequests';


function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const jsonRequests = new JSONRequests();

    //Navigation Methods
    function navigateToLogin() {
        navigate("/login");
    }



    const handleSignUpFormSubmit = async (event) => {
        event.preventDefault(); // Prevents default operation of a form submssion, which is reloading the page.
        console.log("Inside handleSignUpFormSubmit");

    }

    return (
    <div className = "signup-container">
        <h2>Sign Up</h2>
        <form id= "signup-form" onSubmit={handleSignUpFormSubmit}>
            <div className = "form-group">
                <label htmlFor="username">Username:</label>
                <input type = "text" id = "username" name = "username" value = {username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className = "form-group">
                 <label htmlFor="password">Password:</label>
                 <input type = "password" id = "password" name = "password" value = {password} onChange={(e) => setPassword(e.target.value)}/>    
            </div>
            <div className = "form-group">
                <label htmlFor = "confirmPassword">Confirm Password:</label>
                <input type="password" id = "confirmPassword" name = "confirmPassword" value = {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
            <div className = "form-group">
                <label htmlFor = "email">Email:</label>
                <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <button type="submit" id="signUpBtn">Sign Up</button>
        </form>
        <button type="submit" id="cancelBtn" onClick={navigateToLogin}>Cancel</button>
    </div>
    );
}

export default SignUp;
