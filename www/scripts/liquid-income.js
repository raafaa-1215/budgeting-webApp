"use strict";

/** 
* @class Structure with the ability to store the state of a liquid income entity
* @constructs LiquidIncome
* @param {int} id - liquid income id
* @param {string} name - liquid income name
* @param {string} taxName - liquid income tax discount percentage
* @param {float} taxAmount - liquid income tax discount amount
* @param {float} amount - liquid income amount after tax
* @param {string} dateAdded - date when liquid income is added
* @param {string} lastEditDate - date when liquid income was last edited
*/
class LiquidIncome {
    constructor(incomeName, taxName, incomeAmount, taxPercentage, dateAdded, lastEditDate){
        this.name = incomeName;
        this.taxName = taxName;
        this.taxAmount = incomeAmount * (taxPercentage/100);
        this.amount = incomeAmount - this.taxAmount;
        this.dateAdded = dateAdded;
        this.lastEditDate = lastEditDate;
    }
}