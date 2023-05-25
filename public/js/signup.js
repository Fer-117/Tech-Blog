const signupFormHandler = async (event) => {
  event.preventDefault();

  const user = document.querySelector('#user-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  console.log(user);
  console.log(password);

  if (user && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ name: user, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.log(response);
      alert('Failed to sign up.');
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
