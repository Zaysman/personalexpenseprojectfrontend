import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';


import JSONRequests from 'libraries/JSONRequests';
import Expense from 'objects/Expense';

//Environment Variables
const backendURL = process.env.REACT_APP_Backend_URL; //Get URL of backend application by environment
const getExpensesByUserIDMappingURL = process.env.REACT_APP_GET_EXPENSE_BY_USERID; //Get Mapping for retrieving expenses by user id.


function Dashboard() {

    //State variables
    const [expenses, setExpenses] = useState([]); //This state will handle the expenses that we retrieve from the backend.
    const [selectedExpenses, setSelectedExpenses] = useState([]); //This state will handle tracking what expenses are being selected.


    const navigate = useNavigate();
    const location = useLocation();
    const jsonRequests = new JSONRequests();

    //Check to see if variable is retrieved correctly from login or signup component
    const {user} = location.state || {};
    console.log("User on Dashboard:", user);

    //Test Expenses
    const expense1 = new Expense(997, -1,62.67, "2024-12-03", "Food", "This is a test expense hard-coded into the front-end. For testing purposes only");
    const expense2 = new Expense(998, -1, 43.49, "2024-12-03", "Entertainment", "This is a test expense hard-coded into the front-end. For testing purposes only");
    const expense3 = new Expense(999, -1, 24.95, "2024-12-03", "Groceries", "This is a test expense hard-coded into the front-end. For testing purposes only");


    //URLs
    const getExpensesByUserID = backendURL + getExpensesByUserIDMappingURL + user.id;


    //NAVIGATE FUNCTIONS
    function navigateToSummary() {
        navigate("/summary");
    }

    function navigateToLogin() {
        navigate("/login")
    }

    function navigateToExpenseForm() {
        navigate("/expenseform", {state: {user : user}});
    }

    function navigateToExpenseForm(expense) {
        navigate("/expenseform", {state : {user : user, expense : expense}});
    }


    //EFFECTS
    //Use effect to populate expenses to test display
    // useEffect(() => {
    //     const testExpenses = [expense1, expense2, expense3];
    //     const emptyExpenses = [];
    //     setExpenses(testExpenses); //update state properly
    //     //setExpenses(emptyExpenses);
    // }, []); //Empty dependency array ensures this runs once when the page loads initially
    // console.log("expenses.length:", expenses.length);

    //use effect to populate expenses from backend.
    useEffect(() => {
        const getExpensesFromBackend = async () => {

            try {
                console.log("Dashboard Component sending request for user expenses to backend");
    
                const fetchedExpenses = await jsonRequests.sendGetRequest(getExpensesByUserID);

                setExpenses(fetchedExpenses);

            } catch(error) {
                console.error("There was an error from the dashboard component trying to send a request to the backend");
            }
        }
        getExpensesFromBackend();
        
    }, []);


    //Use effect to handle the expenses being selected. Fires everytime selectedexpenses changes.
    useEffect(() => {
        console.log("Currently Selected expenses:", selectedExpenses);

    }, [selectedExpenses]);
    
    //HANDLE FUNCTIONS
    //Function to handle whenever a checkbox is updated
    const handleCheckboxChange = (expense) => {
        setSelectedExpenses((prevSelected) => {
            if(prevSelected.includes(expense)) {
                //If already selected, remove it
                const updatedSelection = prevSelected.filter((item) => item !== expense);
                console.log("Unselected:", expense);
                return updatedSelection;
            } else {
                //Otherwise, add it to the selection
                console.log("Selected:", expense);
                return [...prevSelected, expense];
            }
        })
    }

    //Function to select all checkboxes
    const handleSelectAllExpenses = () => {
        setSelectedExpenses([...expenses]); //Add all expenses to the selected list
    };

    //Function to deselect all checkboxes
    const handleUnselectAllExpenses = () => {
        setSelectedExpenses([]); //Clear the selected list
    };

    //Function to handle add expense press
    const handleAddExpenseBtn = () => {
        navigateToExpenseForm();
    }

    //Function to handle update expense press
    const handleUpdateExpenseBtn = (expense) => {
        //check to see if selected expenses current contains one element
        if(selectedExpenses.length !== 1) {
            console.log("Somehow, multiple expenses were selected and the update button was pressed. Returning.");
            return;
        }
        navigateToExpenseForm(selectedExpenses[0]);
    }

    const handleLogoutButtonPress = (event) => {
        navigateToLogin();
    }

    //computed state to determine if add button should be disabled
    const isAddDisabled = selectedExpenses.length > 0; //Add should be disabled if at least one radio button is enabled

    //Computed state to determine if add & update buttons should be disabled
    const isUpdateDisabled = selectedExpenses.length !== 1; //returns a boolean I presume

    //Computed state to determine if delete button should be disabled.
    const isDelDisabled = selectedExpenses.length == 0; //As long as any expense is selected, then the delete button should be enabled. Otherwise it should be disabled.
    
    return (
    <div id="dashboard-container">
        <h2>Expense Dashboard</h2>
        <div id="expenseTable-container">
            <table id = "expense-table">
                <thead>
                    <tr> {/*Table row with all of the headers */}
                        <th></th>
                        <th>Expense ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                {/*For each expense, we need to create a new row, and list each of the relevant attributes */} 
                {expenses.length > 0 ? (expenses.map((expense) => (
                    <tr key={expense.expenseid}>
                        <td><input type="checkbox" className="expense-checkbox" onChange={() => handleCheckboxChange(expense)} checked={selectedExpenses.includes(expense)}/></td> {/*The checked property dynamically sets the checkbox state*/}
                        <td><p>{expense.expenseid}</p></td>
                        <td>${expense.amount}</td>
                        <td>{expense.date}</td>
                        <td>{expense.category}</td>
                        <td>{expense.description}</td>
                    </tr>
                ))) : (
                <tr>
                    <td colSpan="5">No expenses to display</td>
                </tr>
            )}
            </tbody>
            </table>
        </div>
        <div id="expenseBtns-container">
            <button id="addExpense-Btn" type="button" disabled={isAddDisabled} onClick={handleAddExpenseBtn}>Add Expense</button>
            <button id="updateExpense-Btn" type="button" disabled={isUpdateDisabled} onClick={handleUpdateExpenseBtn}>Update Expense</button>
            <button id="delExpense-Btn" type="button" disabled={isDelDisabled}>Delete Expense(s)</button>

        </div>
        <div id = "selectionBtns-container">
            <button id="selectAllExpenses-Btn" onClick={handleSelectAllExpenses}>Select All Expenses</button>
            <button id="deselectAllExpenses-Btn" onClick={handleUnselectAllExpenses}>Unselect All Expenses</button>
        </div>
        <div id = "summaryBtn-container">
            <button id="toSummaryPage-btn" onClick={navigateToSummary}>To Summary Page</button>
        </div>
        <div id = "logoutbtn-container">
            <button id="logout-btn" onClick={handleLogoutButtonPress}>Log Out</button>
        </div>
    </div>
    );
}

export default Dashboard;