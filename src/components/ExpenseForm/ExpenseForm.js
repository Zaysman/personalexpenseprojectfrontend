import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ExpenseForm.css';

import JSONRequests from 'libraries/JSONRequests';
import Expense from 'objects/Expense';

//Environment Variables
const backendURL = process.env.REACT_APP_Backend_URL; //Get Url of backend application by environment
const postExpenseMappingURL = process.env.REACT_APP_POST_EXPENSE; //Post URL for creating new expenses.

function ExpenseForm() {

    //States
    const [currExpense, setCurrExpense] = useState();
    const [formSubmitBtnTxt, setFormSubmitBtnTxt] = useState('');
    const [formState, setFormState] = useState();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [amount, setAmount] = useState();
    const [date, setDate] = useState();
    const [category, setCategory] = useState();
    const [description, setDescription] = useState();


    const navigate = useNavigate();
    const location = useLocation();
    const jsonRequests = new JSONRequests();

    //URLs
    const createExpenseURL = backendURL+postExpenseMappingURL;
    console.log("backendURL:", backendURL)
    console.log("postExpenseMappingURL:", postExpenseMappingURL);
    console.log("createExpenseURL:", createExpenseURL);

    //Location variables
    const {expense} = location.state || {};
    const {user} = location.state || {};
    console.log("Expense set on Expense Form:", expense);


    //NAVIGATE FUNCTIONS
    //Navigate to dashboard
    function navigateToDashboard() {
        navigate("/dashboard", {state : {user : user}});
    }

    //EFFECTS
    //Use this effect to set the button text to 'add' when the page initially loads.
    useEffect(() => {
        console.log("effect on page start up")
        if(expense === undefined) {
            setFormSubmitBtnTxt("Add Expense");
            setFormState("add");
        } else {
            setFormSubmitBtnTxt("Update Expense");
            setFormState("update");
        }
    }, []); //Empty Dependency Array means this effect will only run once the page loads 


    //Use this effect to handle post request to backend.
    useEffect(() => {
        const createExpense = async () => {

            //Prevent execution before form submission
            if(!isSubmitted) {
                return;
            }

            try {
                console.log("ExpenseForm Component sending data to backend");
                // console.log("Amount:", amount);
                // console.log("Date:", date);
                // console.log("Category:", category);
                // console.log("Description:", description);

                const postExpense = new Expense(-1, user.id, amount, date, category, description);
                console.log("postExpense:", postExpense);

                const fetchedExpense = await jsonRequests.sendPostRequest(createExpenseURL, postExpense);

                if(fetchedExpense == null) {
                    console.log("fetchedExpense is null");
                    setIsSubmitted(false);
                    return;
                }

                //If the expense is created successfully, then we go back to the dashboard.
                navigateToDashboard();


            } catch(error) {
                console.error("There was an error from the ExpenseForm Component trying to send data to backend", error);
                setIsSubmitted(false); //Reset submission state
            }
        }
        createExpense();

    }, [isSubmitted]);

    // //Use effect to set the addOrUpdateString to 'add' or 'update' based on entry string
    // useEffect((string) => {
    //     setFormSubmitBtnTxt(string);
    // }, [formSubmitBtnTxt]); //This effect will fire off when the formSubmitBtnTxt value is changed.


    //HANDLE FUNCTIONS
    //Handle function to handle submit form button being clicked.
    const handleExpenseFormSubmit = (event) => {
        event.preventDefault(); //Prevents form submission default operation. Which is reloading the page.
        setIsSubmitted(true); //Set isSubmitted to true to trigger the useEffect to send the post request to the backend.
        // console.log("Amount:", amount);
        // console.log("Date:", date);
        // console.log("Category:", category);
        // console.log("Description:", description);

        // const postExpense = new Expense(-1, user.id, amount, date, category, description);
        // console.log("postExpense:", postExpense);


    }

    //Handle function to handle return to dashboard input
    const handletoDashboardBtnClick = (event) => {
        navigateToDashboard();
    }


    return (
        <div id="expenseForm-container">
            <h2>Expense Form</h2>
            <form id="expense-form" onSubmit={handleExpenseFormSubmit}>
                <div className = "form-group">
                    <label>Amount:</label>
                    <input type="number" id="amount-input" name="amount" min="0" step="0.01" value = {amount}  onChange={(e) => setAmount(e.target.value)}/>
                </div>
                <div className = "form-group">
                    <label>Date:</label>
                    <input type="date" id="date-input" name="date" value = {date} onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div className = "form-group">
                    <label>Category:</label>
                    <select id="category-select" value = {category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="food">Food</option>
                        <option value="groceries">Groceries</option>
                        <option value="entertainment">Entertainment</option>
                    </select>
                </div>
                <div className = "form-group">
                    <label>Description:</label>
                    <textarea id="desc-txtarea" rows="4" cols="30" value = {description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <button type="submit" id="expenseSubmit-btn">{formSubmitBtnTxt}</button>
                <button id="toDashboard-btn" onClick={handletoDashboardBtnClick}>Return to Dashboard</button>
            </form>

        </div>
    );
}

export default ExpenseForm;