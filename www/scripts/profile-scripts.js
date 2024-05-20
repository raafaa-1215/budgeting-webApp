function enableEditProfile() {
    document.getElementById('username-input').removeAttribute('disabled');
    document.getElementById('password-input').removeAttribute('disabled');
    document.getElementById('submit-btn').removeAttribute('disabled');
    document.getElementById('edit-btn').style.display = "none";
    document.getElementById('cancel-btn').style.display = "flex";
}

function disableEditProfile() {
    document.getElementById('username-input').setAttribute('disabled', '');
    document.getElementById('password-input').setAttribute('disabled', '');
    document.getElementById('submit-btn').setAttribute('disabled', '');
    document.getElementById('edit-btn').style.display = "flex";
    document.getElementById('cancel-btn').style.display = "none";
}