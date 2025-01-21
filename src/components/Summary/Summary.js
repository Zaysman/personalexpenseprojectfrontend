import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Summary.css';


import JSONRequests from 'libraries/JSONRequests';
import Expense from 'objects/Expense';

//Environment Variables
const backendURL = process.env.REACT_APP_Backend_URL; //Get Url of backend application by environment

const generateMonthyReportsMappingURL = process.env.REACT_APP_GENERATE_MONTHLY_REPORT; //Get URL for processing the monthly request

function Summary() {

    const navigate = useNavigate();
    const location = useLocation();
    const jsonRequests = new JSONRequests();

    //Location variables
    const {user} = location.state || {};
    console.log("User on Summary Page", user);

    //Test Expenses
    const expense1 = new Expense(997, -1, 62.67, "2024-12-03", "Food", "This is a test expense hard-coded into the front-end. For testing purposes only.");
    const expense2 = new Expense(998, -1, 43.49, "2024-12-03", "Entertainment", "This is a test expense hard-coded into the front-end. For testing purposes only.");
    const expense3 = new Expense(999, -1, 24.95, "2024-12-03", "Groceries", "This is a test expense hard-coded into the front-end. For testing purposes only.");

    
    //STATE variables
    const [expenses, setExpenses] = useState([]); //This state will handle the expenses that were retrieved from the backend.
    const [expenseSum, setExpenseSum] = useState(); //This state will handle the total sum of the expenses that are retrieved from the backend.


    const [isExpenseTableDisplayed, setIsExpenseTableDisplayed] = useState(false); //State the determines whether the table for 

    const [isGettingSummary, setIsGettingSummary] = useState(false); //This state tracks whether or not we retrieve data from the backend.

    //States for user input
    const [month, setMonth] = useState("january"); //State to hold the month value of the summary we're retrieving.
    const [year, setYear] = useState(); //State to hold the year value of the summary we're retrieving

    //URLs
    var generateMonthlyExpenseReportURL = backendURL + generateMonthyReportsMappingURL;

    //Navigate functions
    function navigateToDashboard() {
        navigate("/dashboard", {state: {user : user}});
    }

    //EFFECTS
    // /*Populate expenses on page load*/
    // useEffect(() => {
    //     const testExpenses = [expense1, expense2, expense3];
    //     const emptyExpenses = [];
    //     setExpenses(testExpenses); //update state properly
    //     //setExpenses(emptyExpenses);
    // }, []); //Empty dependency array ensures this runs only once when the page loads initially

    
    // //Populate expenseSum on page load
    // useEffect(() => {
    //     const testExpenseSum = 131.11;
    //     setExpenseSum(testExpenseSum);
    // }, []);

    //useEffect to retrieve data from backend.
    useEffect(() => {
        const getSummary = async () => {
            
            //end execution is isGettingSummary is false;
            if(isGettingSummary == false) {
                return;
            }

            try {
                console.log("Summary Component getting Salary");
                console.log("month:", month);
                console.log("year:", year);

                var monthCode = getMonthCode(month);

                if(monthCode == -1) {
                    console.log("Invalid MonthCode of -1 was detected. Ending Execution.")
                    return;
                }

                var summaryRequest = {
                    userid: user.id,
                    monthCode: monthCode,
                    year: year
                };

                console.log("Summary Request:", summaryRequest);

                //build the URL
                generateMonthlyExpenseReportURL = generateMonthlyExpenseReportURL + "/userid/" + user.id + "/month/" + monthCode + "/year/" + year;

                const fetchedMonthlyReport = await jsonRequests.sendGetRequest(generateMonthlyExpenseReportURL);

                if(fetchedMonthlyReport == null) {
                    console.log("fetchedMonthly report is null");
                    return;
                }

                console.log("fetchedMonthlyReport: ", fetchedMonthlyReport);

                for(let i = 0; i < fetchedMonthlyReport.listings.length; i++) {
                    fetchedMonthlyReport.listings[i].amount = formatDecimalValues(fetchedMonthlyReport.listings[i].amount);
                }

                setExpenses(fetchedMonthlyReport.listings); //Set the expenses to the listings from the report.
                setExpenseSum(formatDecimalValues(fetchedMonthlyReport.total)); //Set teh Expense total to the total value from the report. 

            } catch(error) {
                console.error("There was an error in the Summary Component sending the request for the monthly summary.");

            } finally {
                setIsGettingSummary(false); //Set isGettingSummary is false.
            }

        }
        getSummary();

    }, [isGettingSummary]);

    //Helper Function to convert month to month code
    function getMonthCode(month) {
        
        switch(month) {
            case "january":
                return 1;
                break;
            
            case "february":
                return 2;
                break;
            
            case "march":
                return 3;
                break;
            
            case "april":
                return 4;
                break;

            case "may":
                return 5;
                break;

            case "june":
                return 6;
                break;

            case "july":
                return 7;
                break;

            case "august":
                return 8;
                break;

            case "september":
                return 9;
                break;

            case "october":
                return 10;
                break;
            
            case "november":
                return 11;
                break;

            case "december":
                return 12;
                break;
            
            default:
                return -1;
                break;
        }
    }

    //Helper Function to format amounts to two places after the decimal
    function formatDecimalValues(decimalValue) {
        return decimalValue.toFixed(2);

    }

    //HANDLE FUNCTIONS
    const handlecalculateSummaryBtnClick = () => {
        setIsExpenseTableDisplayed(true); //Toggle this state to allow the table to displayed.
        setIsGettingSummary(true); //Change this state to trigger getting the summary data from the backend.
    }
    
    
    const handleToDashboardBtnClick = () => {
        navigateToDashboard();
    }


    return(
        <div id="summary-container">
            <h2>Generate Summary</h2>
            <h3>Monthly Summary</h3>
            <div id="month-container">
                <div className = "input-group">
                    <label>Month:</label>
                    <select id="month-select" value={month} onChange={(e) => {setMonth(e.target.value)}}> 
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
                    <input type="number" id="year-input" name="year-input" min="0000" max="9999" value={year} onChange={(e) => setYear(e.target.value)}/>
                </div>
            </div>
            <div id="summaryBtns-container">
                <button id="calculateSummary-btn" onClick={handlecalculateSummaryBtnClick}>Calculate Summary</button>
            </div>
            <div id="expenseDisplay-container">
                <div className="input-group">
                    <label>Total:</label>
                    <label>${expenseSum}</label>
                </div>
            </div>

            {isExpenseTableDisplayed && <div id="expenseCategory-container">
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
            </div>}
            <button id="navigateToDashboard-btn" onClick={handleToDashboardBtnClick}>Return To Dashboard</button>

        </div>
    );

}

export default Summary;