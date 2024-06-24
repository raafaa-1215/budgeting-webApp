class Expense {
    constructor(name, description, type, amount, paymentDay) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.amount = amount;
        this.paymentDay = paymentDay;
    }

    constructor(id, name, description, type, amount, paymentDay) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.amount = amount;
        this.paymentDay = paymentDay;
    }
}
const addExpenseForm = document.getElementById('addExpenseForm');
addExpenseForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const type = document.getElementById('type').value;
    const amount = document.getElementById('amount').value;
    const paymentDay = document.getElementById('paymentDay').value;

    const expense = new Expense(name, description, type, amount, paymentDay);

    fetch('/expenses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(expense)
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

const editExpenseForm = document.getElementById('editExpenseForm');
editExpenseForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const type = document.getElementById('type').value;
    const amount = document.getElementById('amount').value;
    const paymentDay = document.getElementById('paymentDay').value;

    const expense = new Expense(id, name, description, type, amount, paymentDay);

    fetch('/expense/:id', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(expense)
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
        console.error('Error:', error);
    });
});