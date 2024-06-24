class Tax {
    constructor(name, description, percentage, method) {
        this.name = name;
        this.description = description;
        this.percentage = percentage;
        this.method = method;
    }
    
    constructor(id, name, description, percentage, method) {
        this.id = id
        this.name = name;
        this.description = description;
        this.percentage = percentage;
        this.method = method;
    }
}
const addTaxesForm = document.getElementById('addTaxesForm');
addTaxesForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const percentage = document.getElementById('percentage').value;
    const method = document.getElementById('method').value;

    const tax = new Tax(name, description, percentage, method);

    fetch('/taxes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(tax)
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

const editTaxForm = document.getElementById('editTaxForm');
editTaxForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const percentage = document.getElementById('percentage').value;
    const method = document.getElementById('method').value;

    const tax = new Tax(id, name, description, percentage, method);

    fetch('/tax/:id', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(tax)
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
        console.error('Error:', error);
    });
});