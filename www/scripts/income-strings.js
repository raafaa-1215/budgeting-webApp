"use strict";

/** 
* @class Structure with the ability to store the state of a income entity
* @constructs Income
* @param {int} id - income id
* @param {string} name - income name
* @param {string} description - income description
* @param {string} type - income type
* @param {string} source - income source
* @param {float} amount - income amount
* @param {string} payday - income payday
* @param {string} dateAdded - date when income is added
* @param {string} lastEditDate - date when income was last edited
*/
class Income {
    constructor(name, description, type, source, amount, payday, dateAdded, lastEditDate){
        this.name = name;
        this.description = description;
        this.type = type;
        this.source = source;
        this.amount = amount;
        this.payday = payday;
        this.dateAdded = dateAdded;
        this.lastEditDate = lastEditDate;
    }
}