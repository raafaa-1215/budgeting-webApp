class IncomeString {
    constructor(name, description, type, source, amount, payday) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.source = source;
        this.amount = amount;
        this.payday = payday;
    }

    constructor(id, name, description, type, source, amount, payday) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.source = source;
        this.amount = amount;
        this.payday = payday;
    }
}
const addIncomeStringsForm = document.getElementById('addIncomeStringsForm');
addIncomeStringsForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const type = document.getElementById('type').value;
    const source = document.getElementById('source').value;
    const amount = document.getElementById('amount').value;
    const payday = document.getElementById('payday').value;

    const incomeString = new IncomeString(name, description, type, source, amount, payday);

    fetch('/incomeStrings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(incomeString)
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

const editIncomeStringsForm = document.getElementById('editIncomeStringsForm');
editIncomeStringsForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const type = document.getElementById('type').value;
    const source = document.getElementById('source').value;
    const amount = document.getElementById('amount').value;
    const payday = document.getElementById('payday').value;

    const incomeString = new IncomeString(id, name, description, type, source, amount, payday);

    fetch('/incomeString/:id', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(incomeString)
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

