import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import './Login.css';

import JSONRequests from 'libraries/JSONRequests';

//Environment Variables
const backendURL = process.env.REACT_APP_Backend_URL; //Get Url of backend application by environment
const getUsernameMappingURL = process.env.REACT_APP_GET_USER_BY_USERNAME; //Get Mapping of getting User by username by environment


function Login() {
    //States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); //State to track error message that prints when user fails to login
    const [isSubmitted, setIsSubmitted] = useState(false); //State to track form submission
    const [user, setUser] = useState(null); //New State to track use.

    const navigate = useNavigate();
    const jsonRequests = new JSONRequests();

    //URLs
    const getUserByUsernameURL = backendURL+getUsernameMappingURL+username;

    //NAVIGATION FUNCTIONS
    //Navigate to signup page
    function navigateToSignUp() {
        navigate("/signup"); // Navigate to sign up page
    }

    function navigateToDashboard() {
        navigate("/dashboard", {state : {user: user}}); //Navigate to dashboard with the user
    }


    //EFFECTS FUNCTIONS
    //useEffect to login into application
    useEffect(() => {
        const loginUser = async () => {

            //Prevent execution before form submission
            if(!isSubmitted) {
                return;
            }

            try {
                console.log("Login Component sending data to backend");

                const fetchedUserData = await jsonRequests.sendGetRequest(getUserByUsernameURL); //Send request to backend to retrieve User object.

                //Perform username and password checks
                if(username !== fetchedUserData.username || password !== fetchedUserData.password) {
                    console.log("Usernames or passwords don't match");
                    setErrorMessage("The username or password entered was incorrect. Please try again.");
                    setIsSubmitted(false);
                    setPassword('');
                    return;
                }

                //If username and passwords match, navigate to the home screen
                console.log("Username and passwords match");
                setUser(fetchedUserData); //Change the state of user which should fire off the effect that navigates to the dashboard

            } catch(error) {
                console.error("There was an error from Login Component trying to send data to backend.", error);
                setErrorMessage('Login failed. There was an issue contacting the backend');
                setIsSubmitted(false); //Reset submission state
            }

        }
        loginUser(); //Call the method 

    }, [isSubmitted]); //This effect runs whenever isSubmitted is changed


    //useEffect to handle navigation to dashboard once login is successful
    useEffect(() => {
        if(user) { //Check to see if user is null, if not, then we navigate to dashboard.
            navigateToDashboard();
        }
    }, [user, navigate]);

    //HANDLE FUNCTIONS
    //Handle Login form-submission once login button is pressed.
    const handleLoginFormSubmit = (event) => {
        event.preventDefault(); // Prevents form submission default operation. Which is reloading the page.
        setIsSubmitted(true); //Set isSubmitted to true to trigger use effect to send data to the backend.
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
        {errorMessage && <div id="errorMsg-container"><p id="errorMsg">{errorMessage}</p></div>} {/*Conditionally render error message */}

    </div>
    );
}

export default Login;
