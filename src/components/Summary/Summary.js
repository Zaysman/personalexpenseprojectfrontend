import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import './Summary.css';


import JSONRequests from 'libraries/JSONRequests';
import Expense from 'objects/Expense';


function Summary() {

    const navigate = useNavigate();

    //Test Expenses
    const expense1 = new Expense(997, -1, 62.67, "2024-12-03", "Food", "This is a test expense hard-coded into the front-end. For testing purposes only.");
    const expense2 = new Expense(998, -1, 43.49, "2024-12-03", "Entertainment", "This is a test expense hard-coded into the front-end. For testing purposes only.");
    const expense3 = new Expense(999, -1, 24.95, "2024-12-03", "Groceries", "This is a test expense hard-coded into the front-end. For testing purposes only.");

    

    //State variables
    const [expenses, setExpenses] = useState([]); //This state will handle the expenses that were retrieved from the backend.
    const [expenseSum, setExpenseSum] = useState(); //This state will handle the 

    //Navigate functions
    

    //EFFECTS
    /*Populate expenses on page load*/
    useEffect(() => {
        const testExpenses = [expense1, expense2, expense3];
        const emptyExpenses = [];
        setExpenses(testExpenses); //update state properly
        //setExpenses(emptyExpenses);
    }, []); //Empty dependency array ensures this runs only once when the page loads initially

    //Populate expenseSum on page load
    useEffect(() => {
        const testExpenseSum = 131.11;
        setExpenseSum(testExpenseSum);
    }, []);


    //HANDLE FUNCTIONS

    return(
        <div id="summary-container">
            <h2> Generate Summary</h2>
            <h3>Monthly Summary</h3>
            <div id="month-container">
                <div className = "input-group">
                    <label>Month: </label>
                    <select> 
                        <option value="january">January</option>
                        <option value="february">February</option>
                        <option value="march">March</option>
                        <option value="april">April</option>
                        <option value="may">May</option>
                        <option value="june">June</option>
                        <option value="july">July</option>
                        <option value="august">August</option>
                        <option value="september">September</option>
                        <option value="october">October</option>
                        <option value="november">November</option>
                        <option value="december">December</option>
                    </select>
                </div>
                <div className = "input-group">
                    <label>Year:</label>
                    <input type="number" id="year-input" name="year-input" min="0000" max="9999"/>
                </div>
            </div>
            <div id="summaryBtns-container">
                <button>Calculate Summary</button>
            </div>
            <div id="expenseDisplay-container">
                <div className="input-group">
                    <label>Total:</label>
                    <label>${expenseSum}</label>
                </div>
            </div>

            <div id="expenseCategory-container">
                <table id="expenseCategory-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.length > 0 ? (expenses.map((expense) => (
                            <tr key={expense.expenseid}>
                                <td>{expense.category}</td>
                                <td>{expense.amount}</td>
                            </tr>

                        ))) : (
                            <tr>
                                <td colSpan="2">No expenses to display</td>
                            </tr>
                        )}
                        
                    </tbody>
                </table>

            </div>


        </div>
    );

}

export default Summary;