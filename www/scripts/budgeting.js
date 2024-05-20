"use strict";

/** 
* @class Structure with the ability to store the state of a expenses entity
* @constructs Budget
* @param {int} id - budget id
* @param {string} nameLiquidIncome - liquid income name
* @param {string} nameExpense - expenses name
* @param {float} budgetLeft - budget amount left
*/
class Budget {
    constructor(liquidIncome, expense){
        this.nameLiquidIncome = liquidIncome.name;
        this.nameExpense = expense.name;
        this.budgetLeft = liquidIncome.amount - expense.amount;
    }
}