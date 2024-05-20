"use strict";

/** 
* @class Structure with the ability to store the state of a liquid income entity
* @constructs LiquidIncome
* @param {int} id - liquid income id
* @param {string} name - liquid income name
* @param {string} taxName - liquid income tax discount percentage
* @param {string} taxAmount - liquid income tax discount amount
* @param {float} amount - liquid income amount anter tax
* @param {string} dateAdded - date when liquid income is added
* @param {string} lastEditDate - date when liquid income was last edited
*/
class LiquidIncome {
    constructor(income, tax, dateAdded, lastEditDate){
        this.name = income.name;
        this.taxName = tax.name;
        this.taxAmount = income.amount * (tax.percentage/100);
        this.amount = income.amount - this.taxAmount;
        this.dateAdded = dateAdded;
        this.lastEditDate = lastEditDate;
    }
}