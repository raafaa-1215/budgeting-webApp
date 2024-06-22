class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    constructor(username, email, password, joinDate) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.joinDate = joinDate;
    }
}

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = new User(username, password);

    fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');
    const joinDate = `${year}-${month}-${day}`;

    const user = new User(username, email, password, joinDate);

    fetch('/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
            console.error('Error:', error);
    });
});