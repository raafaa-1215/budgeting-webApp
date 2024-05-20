"use strict";

/** 
* @class Structure with the ability to store the state of a tax entity
* @constructs Tax
* @param {int} id - tax id
* @param {string} name - tax name
* @param {string} description - tax description
* @param {float} percentage - tax discount percentage
* @param {float} method - tax discount method (stacking or flat)
* @param {string} dateAdded - date when tax is added
* @param {string} lastEditDate - date when tax was last edited
*/
class Tax {
    constructor(name, description, percentage, method, dateAdded, lastEditDate){
        this.name = name;
        this.description = description;
        this.percentage = percentage;
        this.method = method;
        this.dateAdded = dateAdded;
        this.lastEditDate = lastEditDate;
    }
}