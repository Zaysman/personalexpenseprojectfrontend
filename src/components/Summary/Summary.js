import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import './Summary.css';


import JSONRequests from 'libraries/JSONRequests';

function Summary() {


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
                    <label>Year: </label>
                    <input type="number" id="year-input" name="year-input" min="0" max="9999"/>
                </div>
            </div>
            <div id="summaryBtns-container">
                <button>Calculate Summary</button>
            </div>


        </div>
    );

}

export default Summary;