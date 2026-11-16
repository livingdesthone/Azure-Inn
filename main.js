
const $ = id => document.getElementById(id);

// Date setup
const today = new Date();
const localDate = new Date(
  today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().slice(0, 10);

$('checkin').min = localDate;
$('checkout').min = localDate;

$('checkin').addEventListener('change', () => {
  const start = $('checkin').value;
  $('checkout').min = start || localDate;

  if ($('checkout').value && $('checkout').value <= start) {
    $('checkout').value = '';
  }
});

// Footer year
$('year').textContent = new Date().getFullYear();

// Booking dialog
const dialog = $('request-dialog');
let selectedRoom = 'Any available room';

function showRequest(room = 'Any available room') {
  const start = $('checkin').value;
  const end = $('checkout').value;
  const guests = $('guests').value;

  if (!start || !end || end <= start) {
    alert('Please select valid check-in and check-out dates.');
    return;
  }

  selectedRoom = room;

  $('request-summary').textContent =
    `${room} · ${start} to ${end} · ${guests} guest(s).`;

  $('booking-message').textContent = '';
  $('booking-request-form').reset();

  dialog.showModal();
}

// Availability form
$('availability-form').addEventListener('submit', event => {
  event.preventDefault();
  showRequest();
});

// Room booking buttons
document.querySelectorAll('[data-room]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    $('booking').scrollIntoView({ behavior: 'smooth' });
    showRequest(link.dataset.room);
  });
});

// Close dialog
$('close-dialog').addEventListener('click', () => dialog.close());


// Mobile navigation
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});
