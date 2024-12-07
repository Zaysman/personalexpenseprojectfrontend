import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import './ExpenseForm.css';

import JSONRequests from 'libraries/JSONRequests';


function ExpenseForm() {

    const navigate = useNavigate();
    const [currExpense, setCurrExpense] = useState('');

    //EFFECTS

    //HANDLE FUNCTIONS
    const handleExpenseFormSubmit = (event) => {
        event.preventDefault(); //Prevents form submission default operation. Which is reloading the page.
    }

    const addOrUpdateString = "add";

    return (
        <div id="expenseForm-container">
            <h2>Expense Form</h2>
            <form id="expense-form" onSubmit={handleExpenseFormSubmit}>
                <div className = "form-group">
                    <label>Amount:</label>
                    <input type="number" id="amount-input" name="amount" min="0"/>
                </div>
                <div className = "form-group">
                    <label>Date:</label>
                    <input type="date" id="date-input" name="date"/>
                </div>
                <div className = "form-group">
                    <label>Category:</label>
                    <select id="category-select">
                        <option value="food">Food</option>
                        <option value="groceries">Groceries</option>
                        <option value="entertainment">Entertainment</option>
                    </select>
                </div>
                <div className = "form-group">
                    <label>Description:</label>
                    <textarea id="desc-txtarea" rows="4" cols="30"></textarea>
                </div>
                <div className = "form-group">
                    
                </div>
            </form>
        </div>
    );
}

export default ExpenseForm;