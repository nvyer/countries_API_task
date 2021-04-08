const username = document.querySelector('#username-input');
const password = document.querySelector('#password-input');
const loginBtn = document.querySelector('#login-button');
const LoginWarningSign = document.querySelector('#login-warning');
const passwordWarningSign = document.querySelector('#password-warning');
const form = document.querySelector('.form');

let user = {
    username: null,
    password: null,
    favorites: []
};

username.onblur = () => {
    if (username.value.length < 5) {
        LoginWarningSign.classList.remove('hidden');
    } else {
        LoginWarningSign.classList.add('hidden');
    }
};

password.onblur = () => {
    if (password.value.length < 5) {
        passwordWarningSign.classList.remove('hidden');
    } else {
        passwordWarningSign.classList.add('hidden');
    }
};


loginBtn.addEventListener('click', () => {
    if (LoginWarningSign.classList.contains('hidden') && passwordWarningSign.classList.contains('hidden')) {
        if ((username.value !== '' && password.value !== '')) {
            user.username = username.value;
            user.password = password.value;
            localStorage.setItem('currentUser',JSON.stringify(user))
            loginBtn.href = '../main_page/main.html';
        }
    }
});