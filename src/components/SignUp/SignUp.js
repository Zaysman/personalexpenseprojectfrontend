import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import './SignUp.css';
import JSONRequests from 'libraries/JSONRequests';

import User from 'objects/User';

//Environment Variables
const backendURL = process.env.REACT_APP_Backend_URL; //Get Url of backend application by environment
const postUsernameMappingURL = process.env.REACT_APP_POST_USER; //Get Mapping of post request to create user

function SignUp() {
    
    //States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [errorMessage, setErrorMessage] = useState(''); //State to track error message that prints when user fails to sign up

    const [user, setUser] = useState(null); //State of the user that logs in.

    const navigate = useNavigate();
    const jsonRequests = new JSONRequests();
    

    //URLs
    const postUserURL = backendURL+postUsernameMappingURL; //This is the url to access the user RestController and send a post request



    //NAVIGATION FUNCTIONS
    //Navigate to login page
    function navigateToLogin() {
        navigate("/login");
    }

    //Navigate to dashboard
    function navigateToDashboard() {
        navigate("/dashboard", {state : {user : user}});
    }


    //EFFECT FUNCTIONS
    //useEffect to sign up user for application
    useEffect(() => {
        const signUpUser = async () => {

            //Prevent execution before form submission
            if(!isSubmitted) {
                return;
            }

            try {
                console.log("Sign up Component sending post request to backend");

                //Check if Password and Confirm Password are the same. If not, then print error message, log, clear inputs, and return.
                if(password !== confirmPassword) {
                    console.log("Password and confirmPassword don't match");
                    setErrorMessage("Passwords do not match. Please try again.");
                    setIsSubmitted(false);
                    setPassword('');
                    setConfirmPassword('');
                    return;
                }


                //Build User Object to send.
                const userRequest = new User(-1, username, password, email); //We'll set id to negative one initially. We'll let the backend handle assigning the correct

                const fetchedUserData = await jsonRequests.sendPostRequest(postUserURL, userRequest); //Send post request to backend to create user.

                if(fetchedUserData === null) {
                    console.log("fetchedUserData is null");
                    setErrorMessage("Failed to retrieve data from backend, please try again.");
                    setIsSubmitted(false);
                    return;
                }

                //Perform null check on fetchedUserData.
                if(fetchedUserData !== null) { //If Fetched user is not null, then we set the user state to the fetched data.
                    setUser(fetchedUserData);
                }
                
            
            } catch (error) {
                console.log("There was an error from the Signup Component trying to send data to the backend");
                setIsSubmitted(false); //Reset submission State
            }

        }
        signUpUser(); //Call the method

    }, [isSubmitted]); //This effect triggers whenever 


    //useEffect to handle navigation to dashboard once sign up is successful
    useEffect(() => {
        if(user !== null) {
            navigateToDashboard();
        }

    }, [user, navigate])


    //HANDLE FUNCTIONS
    //Function that handles the user clicking the sign up button.
    const handleSignUpFormSubmit = async (event) => {
        event.preventDefault(); // Prevents default operation of a form submssion, which is reloading the page.
        setIsSubmitted(true); //Set isSubmitted to true to trigger use effect to send post request to back end.
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
        {errorMessage && <div id="errorMsg-container"><p id="errorMsg">{errorMessage}</p></div>} {/*Conditionally render error message */}
    
    
    </div>
    );
}

export default SignUp;
