const form = document.getElementById('bookingForm');
const status = document.getElementById('formStatus');

if (form && status) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const honeypot = form.querySelector('#company');
    if (honeypot && honeypot.value.trim() !== '') return;

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const category = form.querySelector('#category').value;
    const date = form.querySelector('#date').value;
    const message = form.querySelector('#message').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !emailPattern.test(email)) {
      status.textContent = 'Please fill in your name and a valid email address.';
      return;
    }

    // This static site has no server endpoint, so do not falsely report a submission.
    // Open the user's email client with the enquiry pre-filled instead.
    const subject = `Photography enquiry — ${category}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Type of shoot: ${category}`,
      `Preferred date: ${date || 'Not specified'}`,
      '',
      'Enquiry:',
      message || 'No additional details provided.'
    ].join('\n');

    const mailto = `mailto:timelessbyo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    status.textContent = 'Your email app should open with the enquiry ready to send.';
  });
}
