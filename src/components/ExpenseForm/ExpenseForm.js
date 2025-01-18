import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ExpenseForm.css';

import JSONRequests from 'libraries/JSONRequests';
import Expense from 'objects/Expense';

//Material UI imports
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

//Environment Variables
const backendURL = process.env.REACT_APP_Backend_URL; //Get Url of backend application by environment

const postExpenseMappingURL = process.env.REACT_APP_POST_EXPENSE; //Post URL for creating new expenses.
const putExpenseMappingURL = process.env.REACT_APP_PUT_EXPENSE; //PUT URL for updating an already existing expense.

const postCustomCategoryMappingURL = process.env.REACT_APP_POST_CUSTOMCATEGORY; //Post URL for creating new Custom Categories,
const deleteCustomCategoryByCategoryEntryIDMappingURL = process.env.REACT_APP_DELETE_CUSTOMCATEGORY_BY_CATEGORYENTRYID; //Delete URL for delete Custom Category by it's Category Entry ID 

const getExpensesByUseridMappingURL = process.env.REACT_APP_GET_CUSTOMCATEGORIES_BY_USERID; //Get URL for getting CustomCategories by Userid

function ExpenseForm() {

    //STATES
    const [currExpense, setCurrExpense] = useState();
    const [formSubmitBtnTxt, setFormSubmitBtnTxt] = useState('');
    const [formState, setFormState] = useState();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    //Modal related States
    const [isCustomCategoryModalOpen, setIsCustomCategoryModalOpen] = useState(false); //State the governs whether the modal will be displayed.
    const [isAddingCustomCategory, setIsAddingCustomCategory] = useState(false); //State that determines whether or not we're adding a custom category.
    const [isAddCustomCategoryTxtFldDisplayed, setIsAddCustomCategoryTxtFldDisplayed] = useState(false); //State the determines if the text field for entering new custom category is displayed or not.
    const [customCategory, setCustomCategory] = useState(); //State that holds the value of CustomCategory we're going to send.
    


    //States for the expense
    const [amount, setAmount] = useState();
    const [date, setDate] = useState();
    const [category, setCategory] = useState();
    const [description, setDescription] = useState();

    const [customCategories, setCustomCategories] = useState([]); //State to hold the user's custom categories.

    const [checkForCustomCategories, setCheckForCustomCategories] = useState(false); //This should trigger the effect to retrieve the custom categories.


    const navigate = useNavigate();
    const location = useLocation();
    const jsonRequests = new JSONRequests();

    //Location variables
    const {expense} = location.state || {};
    const {user} = location.state || {};
    console.log("Expense set on Expense Form:", expense);

    //URLs
    const createExpenseURL = backendURL + postExpenseMappingURL;
    var updateExpenseURL = "";
    if(expense != undefined) {
        updateExpenseURL = backendURL+putExpenseMappingURL+expense.expenseid;
    }

    const getCustomCategoriesByUseridURL = backendURL+getExpensesByUseridMappingURL+user.id;

    const createCustomCategoryURL = backendURL + postCustomCategoryMappingURL;
    
    

    // console.log("backendURL:", backendURL)
    // console.log("postExpenseMappingURL:", postExpenseMappingURL);
    // console.log("createExpenseURL:", createExpenseURL);


    //NAVIGATE FUNCTIONS
    //Navigate to dashboard
    function navigateToDashboard() {
        navigate("/dashboard", {state : {user : user}});
    }

    //EFFECTS
    //Use this effect to set the button text to 'add' when the page initially loads.
    useEffect(() => {
        console.log("effect on page start up.")
        if(expense === undefined) {
            setFormState("add");
            setFormSubmitBtnTxt("Add Expense");
        } else {
            setFormState("update");
            setFormSubmitBtnTxt("Update Expense");
            setAmount(expense.amount);
            setDate(expense.date);
            setCategory(expense.category);
            setDescription(expense.description);
        }
        // console.log("ExpenseForm FormState:", formState);

    }, []); //Empty Dependency Array means this effect will only run once the page loads 


    //Use this effect to handle post or request to backend to create or update expense for user.
    useEffect(() => {
        const createExpense = async () => {
            console.log("ExpenseForm FormState:", formState);
            console.log("isSubmitted:", isSubmitted);

            //Prevent execution before form submission
            if(isSubmitted == false) {
                return;
            }

            //Add Expense
            if(formState == "add") {
                try {
                    console.log("ExpenseForm Component sending data to backend to add expense.");
    
                    const postExpense = new Expense(-1, user.id, amount, date, category, description);
                    const fetchedExpense = await jsonRequests.sendPostRequest(createExpenseURL, postExpense);
    
                    if(fetchedExpense == null) {
                        console.log("fetchedExpense is null");
                        setIsSubmitted(false);
                        return;
                    }
    
                    //If the expense is created successfully, then we go back to the dashboard.
                    navigateToDashboard();
    
    
                } catch(error) {
                    console.error("There was an error from the ExpenseForm Component trying to send data to backend to add an expense", error);
                    setIsSubmitted(false); //Reset submission state
                }
            }

            if(formState == "update") {
                try {
                    console.log("ExpenseFrom Component sending data to backend to update expense.");

                    var postExpense = {
                        userid: user.id,
                        amount: amount,
                        date: date,
                        category: category,
                        description: description
                    };
                    console.log("postExpense:", postExpense);
                    
                    const fetchedExpense = await jsonRequests.sendPutRequest(updateExpenseURL, postExpense);

                    if(fetchedExpense == null) {
                        console.log("fetched Expense is null after update");
                        setIsSubmitted(false);
                        return;
                    }

                    //If the expense is updated successfully, then we go back to the dashboard.
                    navigateToDashboard();
                    
                } catch(error) {
                    console.error("There was an error from the ExpenseForm Component trying to send data to backend to update an expense", error);
                    setIsSubmitted(false); //Reset submission state
                }
            }
        }
        createExpense();

    }, [isSubmitted, formState]); //This effect will run when either isSubmitted or formState Changes

    
    //Use effect to retrieve the custom categories from the backend.
    useEffect (() => {
        const retrieveCustomCategories = async () => {
            console.log("Retrieving CustomCategories for userid:", user.id);

            try {

                const fetchedCustomCategories = await jsonRequests.sendGetRequest(getCustomCategoriesByUseridURL); //retrieve the custom categories of the user.

                console.log("fetchedCustomCategories:", fetchedCustomCategories);
                setCustomCategories(fetchedCustomCategories);

            } catch (error) {
                console.error("There was an error from the ExpenseForm Component trying to send data to the backend to retrieve the user's custom categories");

            } finally {
                setCheckForCustomCategories(false);
            }

        }
        retrieveCustomCategories();
    }, [checkForCustomCategories])

    //Use effect to add new Custom Category and send request to backend.
    useEffect (() => {
        const addCustomCategory = async () => {
            

            //end execution if isAddingCustomCategory is false.
            if(isAddingCustomCategory == false) {
                return;
            }

            try {
                console.log("ExpenseForm sending post request to backend to create new custom category.");

                //Create payload
                const customCategoryPayload = {
                    userid: user.id,
                    categoryName: customCategory
                };

                const response = await jsonRequests.sendPostRequest(createCustomCategoryURL, customCategoryPayload);

                console.log("Response from backend after sending request to create Custom Category: ", response);
            } catch(error) {
                console.error("There was an error in the ExpenseForm component when creating a new Custom Category");

            } finally {
                setIsAddingCustomCategory(false); //Set isAddingCustomCategory to false so it can be triggered true again later.
            }
        }
        addCustomCategory();

    }, [isAddingCustomCategory]) 

    //HANDLE FUNCTIONS
    //Handle function to handle submit form button being clicked.
    const handleExpenseFormSubmit = (event) => {
        event.preventDefault(); //Prevents form submission default operation. Which is reloading the page.
        setIsSubmitted(true); //Set isSubmitted to true to trigger the useEffect to send the post request to the backend.
    }

    //Handle function to handle return to dashboard input
    const handletoDashboardBtnClick = (event) => {
        event.preventDefault(); //Since this button is inside the form tag, the browser may try to interpret it as a button of type submit which causes the form to reset the page. Preventing it stops the page from sending a request to the backend.

        setIsSubmitted(false); //Set isSubmitted to true to trigger useEffect. Should have it end execution before sending fetch request.
        navigateToDashboard();
    }


    const handleCustomCategoryModalOpen = () => setIsCustomCategoryModalOpen(true);
    const handleCustomCategoryModalClose = () => setIsCustomCategoryModalOpen(false);

    //Handle function to handle adding a new category
    const handleManageCustomCategoriesClick = (event) => {
        event.preventDefault(); //Since this button is inside the form tag, it may be interpreted as a submit button which causes the form to reset the page. We'll prevent that from happening.
        console.log("ManageCustomCategoriesClick Category Click");
        handleCustomCategoryModalOpen();
    }

    const handleAddCustomCategoryBtnClick = (event) => {
        setIsAddCustomCategoryTxtFldDisplayed(true); //When the add CustomCategory button is clicked, we want to be able to display the text field.
    }

    const handleSubmitCustomCategoryBtnClick = (event) => {
        setIsAddCustomCategoryTxtFldDisplayed(false); //When we submit the Custom Category, the text field no long needs to be displayed so we can toggle it off.
        setIsAddingCustomCategory(true); //Trigger this state to trigger the effect to send post request to backend.
    }  

    const handleDeleteCustomCategoryBtnClick = (event) => {
        
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
                        {/*food, groceries, and entertainment are the three default categories */}
                        <option value="food">Food</option>
                        <option value="groceries">Groceries</option>
                        <option value="entertainment">Entertainment</option>
                        {/*Adding in the custom categories retrieved by user*/}
                        {customCategories.length > 0 ? (customCategories.map((customCategory) => (
                            <option value={customCategory.categoryName}>{customCategory.categoryName}</option>
                        ))) : (
                            <option value="travel">Travel</option>
                        )}
                    </select>
                    <button id="addCategory-btn" onClick={handleManageCustomCategoriesClick}>Manage Custom Categories</button>
                    <Modal id="customCategory-mdl" open={isCustomCategoryModalOpen} onClose={handleCustomCategoryModalClose}>
                        <Box id="modalselect-box"> {/* Box from Material UI. Used as a generic Container for grouping other components */}
                            <div id="modalselect-div">
                                <select id="modalCategory-select">
                                    {/*Adding in the custom categories retrieved by user*/}
                                    {customCategories.length > 0 ? (customCategories.map((customCategory) => (
                                        <option value={customCategory.categoryName}>{customCategory.categoryName}</option>
                                    ))) : (
                                        <option value="travel">Travel</option>
                                    )}
                                </select>
                            </div>
                            <div id="modalBtn-div">
                                <button id="addCustomCategory-btn" onClick={handleAddCustomCategoryBtnClick}>Add Custom Category</button>
                                <button id="delCustomCategory-btn" onClick={handleDeleteCustomCategoryBtnClick}>Delete Custom Category</button>
                            </div>
                            {isAddCustomCategoryTxtFldDisplayed && <div id="customCategoryTxtfld-div"> 
                                <label>Custom Category: </label>
                                <input type="text" id="customCategory-txtfld" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)}/>
                                <button id="addCustomCategory-btn" onClick={handleSubmitCustomCategoryBtnClick}>Submit Category</button>
                            </div>}
                        </Box>
                    </Modal>
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