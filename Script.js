const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const totalBalance = document.getElementById('total-balance');
const incomeTotal = document.getElementById('income-total');
const expenseTotal = document.getElementById('expense-total');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function renderTransactions() {
    transactionList.innerHTML = '';
    let income = 0;
    let expenses = 0;

    transactions.forEach((transaction, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${transaction.description}: $${transaction.amount}</span>
            <div>
                <button onclick="editTransaction(${index})">Edit</button>
                <button onclick="deleteTransaction(${index})">Delete</button>
            </div>
        `;
        transactionList.appendChild(li);

        if (transaction.amount < 0) {
            expenses += Math.abs(transaction.amount);
        } else {
            income += transaction.amount;
        }
    });

    incomeTotal.textContent = income.toFixed(2);
    expenseTotal.textContent = expenses.toFixed(2);
    totalBalance.textContent = (income - expenses).toFixed(2);
}

function addTransaction(e) {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    
    transactions.push({ description, amount });
    updateLocalStorage();
    renderTransactions();
    transactionForm.reset();
}

function editTransaction(index) {
    const transaction = transactions[index];
    document.getElementById('description').value = transaction.description;
    document.getElementById('amount').value = transaction.amount;
    deleteTransaction(index);
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateLocalStorage();
    renderTransactions();
}

transactionForm.addEventListener('submit', addTransaction);
renderTransactions();
