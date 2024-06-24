class Budget {
    constructor(liquidIncomeId, expenseId) {
        this.liquidIncomeId = liquidIncomeId;
        this.expenseId = expenseId;
    }
}

const addBudgetForm = document.getElementById('addBudgetForm');
addBudgetForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const liquidIncomeId = document.getElementById('liquidIncomeId').value;
    const expenseId = document.getElementById('expenseId').value;

    const budget = new Budget(liquidIncomeId, expenseId);

    fetch('/taxes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(budget)
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
        console.error('Error:', error);
    });
});