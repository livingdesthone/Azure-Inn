const $ = (id) => document.getElementById(id);
const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0,10);
$('checkin').min = localDate;
$('checkout').min = localDate;
$('checkin').addEventListener('change', () => {
  $('checkout').min = $('checkin').value || localDate;
  if ($('checkout').value && $('checkout').value <= $('checkin').value) $('checkout').value = '';
});
$('year').textContent = new Date().getFullYear();

const dialog = $('request-dialog');
function showRequest(room = 'Any available room') {
  const inDate = $('checkin').value || 'Not selected';
  const outDate = $('checkout').value || 'Not selected';
  const guests = $('guests').value;
  $('request-summary').textContent = `${room} · ${inDate} to ${outDate} · ${guests} guest(s).`;
  dialog.showModal();
}
$('availability-form').addEventListener('submit', (event) => {
  event.preventDefault();
  if ($('checkout').value <= $('checkin').value) {
    alert('Please choose a check-out date after your check-in date.');
    return;
  }
  showRequest();
});
document.querySelectorAll('[data-room]').forEach(link => {
  link.addEventListener('click', () => showRequest(link.dataset.room));
});
$('close-dialog').addEventListener('click', () => dialog.close());

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
