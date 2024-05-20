document.addEventListener('DOMContentLoaded', function () {
    var loginBtn = document.getElementById('loginBtn');
    
    loginBtn.addEventListener('click', function (event) {
        if (!validateForm()) {
            event.preventDefault();
        } else {
            window.location.href = 'index.html';
        }
    });
    
    function validateForm() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        var isValid = true;

        if (username.trim() === '') {
            isValid = false;
            alert('Please enter your username.');
        } else if (!isValidUsername(username)) {
            isValid = false;
            alert('Please enter a valid username.\nNo offensive words are allowed.\nMust be at least 4 characters long.');
        } else {
            if (password.trim() === '') {
                isValid = false;
                alert('Please enter your password.');
            } else if (!isValidPassword(password)) {
                isValid = false;
                alert('Please enter a valid password.\nIt bust be between 6 to 15 characters and " or \' are allowed.');
            }
        }
        return isValid;
    }

    function isValidUsername(username) {
        var usernameRegex = /^\b(?!nigger|nigga|retarded\b)[a-zA-Z0-9_-]{4,20}\b$/;
        return usernameRegex.test(username);
    }

    function isValidPassword(password) {
        var passRegex = /^[^"']*.{6,15}[^"']*$/;
        return passRegex.test(password);
    }

});