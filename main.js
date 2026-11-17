
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

const SUPABASE_FUNCTION_URL =
  'https://pwnvbwevovagdwbhzjdh.supabase.co/functions/v1/create-enquiry';

// Paste your keys locally. Never paste the service-role key here.
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_v1MRaXxB47Tpq1VXmVtSog_RFJj-X02Y';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3bnZid2V2b3ZhZ2R3Ymh6amRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ3NjYzOTcsImV4cCI6MjExMDM0MjM5N30.0XIybmw7A7nUORdRHsNugHBzu_MUpNCG4s477FwAgkA';

// Booking enquiry submission
$('booking-request-form').addEventListener('submit', async event => {
  event.preventDefault();

  const message = $('booking-message');
  const submitButton = $('submit-booking');
  const originalButtonText = submitButton.textContent;

  const enquiry = {
    guest_name: $('guest-name').value.trim(),
    guest_email: $('guest-email').value.trim(),
    guest_phone: $('guest-phone').value.trim(),
    check_in: $('checkin').value,
    check_out: $('checkout').value,
    guests: Number($('guests').value),
    special_requests: $('special-requests').value.trim()
  };

  if (
    !enquiry.check_in ||
    !enquiry.check_out ||
    enquiry.check_out <= enquiry.check_in
  ) {
    message.textContent = 'Please select valid check-in and check-out dates.';
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Sending enquiry...';
  message.textContent = '';

  try {
    const response = await fetch(SUPABASE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_PUBLISHABLE_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify(enquiry)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Unable to send your enquiry.');
    }

    message.textContent =
      `Thank you! Your enquiry has been received. Reference: ${result.reference}. Azure Inn will contact you.`;

    $('booking-request-form').reset();

  } catch (error) {
    console.error('Booking enquiry error:', error);
    message.textContent =
      error.message || 'Something went wrong. Please try again or contact the hotel directly.';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }

  message.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest'
  });
});

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
