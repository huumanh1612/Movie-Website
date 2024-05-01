const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click', () => {
  // Navigate to the signup page
  window.location.href = '/signup';
});

loginLink.addEventListener('click', () => {
  // Handle toggling between login and signup forms as before
  wrapper.classList.remove('active');
});
