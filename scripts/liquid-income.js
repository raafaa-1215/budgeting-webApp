class LiquidIncome {
    constructor(incomeId, taxId) {
        this.incomeId = incomeId;
        this.taxId = taxId;
    }
}

const addLiquidIncomeForm = document.getElementById('addLiquidIncomeForm');
addLiquidIncomeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const incomeId = document.getElementById('incomeId').value;
    const taxId = document.getElementById('taxId').value;

    const liquidIncome = new LiquidIncome(incomeId, taxId);

    fetch('/taxes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(liquidIncome)
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
        console.error('Error:', error);
    });
});