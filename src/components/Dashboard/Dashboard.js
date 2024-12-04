import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import './Dashboard.css';


import JSONRequests from 'libraries/JSONRequests';
import Expense from 'objects/Expense';


function Dashboard() {

    //Test Expenses

    const expense1 = new Expense(997, -1,62.67, "2024-12-03", "Food", "This is a test expense hard-coded into the front-end. For testing purposes only");

    const expense2 = new Expense(998, -1, 43.49, "2024-12-03", "Entertainment", "This is a test expense hard-coded into the front-end. For testing purposes only");

    const expense3 = new Expense(999, -1, 24.95, "2024-12-03", "Groceries", "This is a test expense hard-coded into the front-end. For testing purposes only");


    //State variables
    const [expenses, setExpenses] = useState([]);

    //Use effectt to populate expenses initially
    useEffect(() => {
        const testExpenses = [expense1, expense2, expense3];
        setExpenses(testExpenses); //update state properly
    }, []); //Empty dependency array ensures this runs once

    /*
    const expenseArr = [];
    expenseArr.push(expense1, expense2, expense3);
    console.log("expenseArr.length:", expenseArr.length);
    */
    console.log("expenses.length:", expenses.length);
    
    return (
    <div id="dashboard-container">
        <h2>Expense Dashboard</h2>

        <table id = "expense-table">
            <thead>
                <tr> {/*Table row with all of the headers */}
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
    );
}

export default Dashboard;