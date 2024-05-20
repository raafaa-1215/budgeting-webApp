"use strict";

/** 
* @class 
* @constructs Informacao 
* @property {string} id - id do elemento HTML que contém a informação.
* @property {Income[]} incomeStrings - Array of objects of type Income, to store all income strings in our system
* @property {Tax[]} taxes - Array of objects of type Tax, to store all taxes in our system
* @property {LiquidIncome[]} liquidIncome - Array of objects of type LiquidIncome, to store all liquid income in our system
* @property {Expense[]} expenses - Array of objects of type Expense, to store all expenses in our system
* @property {Budget[]} budgeting - Array of objects of type Budget, to store all budgeting in our system
*/
class Information {
    constructor() {
        this.incomeStringsArray = [];     
        this.taxesArray = [];
        this.liquidIncomeArray = [];
        this.expensesArray = [];
        this.budgetingArray = [];
    }

    /* Income strings functions */
    addIncome(income) {
        this.incomeStringsArray.push(new Income(income.name, income.description, income.type, income.source, parseFloat(income.amount), income.payday, income.dateAdded, income.lastEditDate));
        let incomeTable = document.getElementById('income-strings-table');
        if(incomeTable != null){
            let incometr = this.incomeStringsArray[this.incomeStringsArray.length-1];
            let tr = tableLine(incometr, false);
            incomeTable.appendChild(tr);
        } 
    }

    generateIncomeTableHeader() {
        let incomeTable = document.getElementById('income-strings-table');
        let header = tableLine(new Income(), true); 
        incomeTable.appendChild(header);
    }

    /* Taxes functions */
    addTax(tax) {
        this.taxesArray.push(new Tax(tax.name, tax.description, parseFloat(tax.percentage), tax.method, tax.dateAdded, tax.lastEditDate));
        let taxTable = document.getElementById('taxes-table');
        if(taxTable != null){
            let taxtr = this.taxesArray[this.taxesArray.length-1];
            let tr = tableLine(taxtr, false);
            taxTable.appendChild(tr);
        }
    }

    generateTaxesTableHeader() {
        let taxTable = document.getElementById('taxes-table');
        let header = tableLine(new Tax(), true); 
        taxTable.appendChild(header);
    }

    /* Liquid income functions */
    addLiquidIncome(liquidIncome) {
        this.liquidIncomeArray.push(new LiquidIncome(liquidIncome.name, liquidIncome.taxName, parseFloat(liquidIncome.incomeAmount), parseFloat(liquidIncome.taxPercentage), liquidIncome.dateAdded, liquidIncome.lastEditDate));
        let liquidIncomeTable = document.getElementById('liquid-income-table');
        if(liquidIncomeTable != null){
            let liquidIncometr = this.liquidIncomeArray[this.liquidIncomeArray.length-1];
            let tr = tableLine(liquidIncometr, false);
            liquidIncomeTable.appendChild(tr);
        }
    }

    generateLiquidIncomeTableHeader() {
        let liquidIncomeTable = document.getElementById('liquid-income-table');
        let header = tableLine(new LiquidIncome(), true); 
        liquidIncomeTable.appendChild(header);
    }

    generateLiquidIncomeOptions() {
        let incomeSelect = document.getElementById('income-string-select');
        incomeSelect.innerHTML = "";
        for(let i=0; i < this.incomeStringsArray.length; i++){
            let incomeString = this.incomeStringsArray[i];
            let option = document.createElement('option');
            option.textContent = incomeString.name;
            option.setAttribute('value', incomeString.name);
            incomeSelect.appendChild(option); 
        }
        let taxSelect = document.getElementById('tax-select');
        taxSelect.innerHTML = "";
        for(let i=0; i<this.taxesArray.length; i++){
            let tax = this.taxesArray[i];
            let option = document.createElement('option');
            option.textContent = tax.name;
            option.setAttribute('value', tax.name);
            taxSelect.appendChild(option); 
        }
    }

    /* Expenses functions */
    addExpenses(expense) {
        this.expensesArray.push(new Expense(expense.name, expense.description, expense.type, parseFloat(expense.amount), expense.paymentDay, expense.dateAdded, expense.lastEditDate));
        let expensesTable = document.getElementById('expenses-table');
        if(expensesTable != null){
            let expensetr = this.expensesArray[this.expensesArray.length-1];
            let tr = tableLine(expensetr, false);
            expensesTable.appendChild(tr);
        }
    }
    
    generateExpensesTableHeader() {
        let expensesTable = document.getElementById('expenses-table');
        let header = tableLine(new Expense(), true); 
        expensesTable.appendChild(header);
    }

    /* Budgeting functions */
    addBudget(budget) {
        this.budgetingArray.push(new Budget(budget.liquidIncomeName, budget.expenseName, parseFloat(budget.liquidIncomeAmount), parseFloat(budget.expenseAmount), budget.dateAdded));
        let budgetTable = document.getElementById('budgeting-table');
        if(budgetTable != null){
            let budgettr = this.budgetingArray[this.budgetingArray.length-1];
            let tr = tableLine(budgettr, false);
            budgetTable.appendChild(tr);
        }
    }

    generateBudgetTableHeader() {
        let budgetTable = document.getElementById('budgeting-table');
        let header = tableLine(new Budget(), true); 
        budgetTable.appendChild(header);
    }

    /* Auxiliary functions */
    getTodaysDate() {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
      
        month = (month < 10)? '0' + month : month;
        day = (day < 10)? '0' + day : day;
      
        return year + '-' + month + '-' + day;
    }

}

