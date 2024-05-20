"use strict";
/**
 * Function that will be executed when the page is fully loaded, creating the global variable "info" with an Information object
 * @memberof window
 * @params {Event} event - object that will represent the event
 * 
 */

window.onload = function (event) {
    var info = new Information();
    
    fetch('/data')
    .then(response => response.json())
    .then(jsonData => {
        const data = JSON.parse(jsonData);  
    
        const incomeData = data.IncomeData;
        for (let i=0; i < incomeData.length; i++) {
            info.addIncome(incomeData[i]);
        }
        const taxesData = data.TaxesData;
        for (let i=0; i < taxesData.length; i++) {
            info.addTax(taxesData[i]);
        }
        const liquidIncomeData = data.LiquidIncomeData;
        for (let i=0; i < liquidIncomeData.length; i++) {
            info.addLiquidIncome(liquidIncomeData[i]);
        }
        const expensesData = data.ExpensesData;
        for (let i=0; i < expensesData.length; i++) {
            info.addExpenses(expensesData[i]);
        }
        const budgetingData = data.BudgetingData;
        for (let i=0; i < budgetingData.length; i++) {
            info.addBudget(budgetingData[i]);
        }
    })
    .catch(error => console.error(error));

    console.log(info);
    window.info = info;
    info.generateLiquidIncomeTableHeader();
    info.generateExpensesTableHeader();
};

function tableLine(object, headerFormat) {
    var tr = document.createElement("tr");
    var tableCell = null;
    for (var property in object) {
        if ((object[property] instanceof Function))
            continue;
        if (headerFormat) {
            tableCell = document.createElement("th");
            tableCell.textContent = property[0].toUpperCase() + property.substr(1, property.length - 1);
        } else {
            tableCell = document.createElement("td");
            tableCell.textContent = object[property];
        }
        tr.appendChild(tableCell);
    }
    return tr;
};

function getTodaysDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
  
    month = (month < 10)? '0' + month : month;
    day = (day < 10)? '0' + day : day;
  
    return year + '-' + month + '-' + day;
}