"use strict";

/** 
* @class Structure with the ability to store the state of a expenses entity
* @constructs Budget
* @param {int} id - budget id
* @param {string} nameLiquidIncome - liquid income name
* @param {string} nameExpense - expenses name
* @param {float} budgetLeft - budget amount left
* @param {string} dateAdded - date when budget is added
*/
class Budget {
    constructor(liquidIncomeName, expenseName, liquidIncomeAmount, expenseAmount, dateAdded){
        this.nameLiquidIncome = liquidIncomeName;
        this.nameExpense = expenseName;
        this.budgetLeft = liquidIncomeAmount -expenseAmount;
        this.dateAdded = dateAdded;
    }
}