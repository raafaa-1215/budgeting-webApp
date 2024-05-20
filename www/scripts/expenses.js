"use strict";

/** 
* @class Structure with the ability to store the state of a expenses entity
* @constructs Expenses
* @param {int} id - expenses id
* @param {string} name - expenses name
* @param {string} description - expenses description
* @param {string} type - expenses type
* @param {float} amount - expenses amount
* @param {string} paymentDay - expenses paymentDay
* @param {string} dateAdded - date when expenses is added
* @param {string} lastEditDate - date when expenses was last edited
*/
class Expenses {
    constructor(name, description, type, amount, paymentDay, dateAdded, lastEditDate){
        this.name = name;
        this.description = description;
        this.type = type;
        this.amount = amount;
        this.paymentDay = paymentDay;
        this.dateAdded = dateAdded;
        this.lastEditDate = lastEditDate;
    }
}