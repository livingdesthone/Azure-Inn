const $ = id => document.getElementById(id);
const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset()*60000).toISOString().slice(0,10);
$('checkin').min = localDate;
$('checkout').min = localDate;
$('checkin').addEventListener('change', () => {
  $('checkout').min = $('checkin').value || localDate;
  if ($('checkout').value && $('checkout').value <= $('checkin').value) $('checkout').value = '';
});
$('year').textContent = new Date().getFullYear();
const dialog = $('request-dialog');
function showRequest(room='Any available room') {
  const start=$('checkin').value, end=$('checkout').value;
  if (!start || !end || end <= start) {
    alert('Please select a valid check-in and check-out date first.');
    return;
  }
  $('request-summary').textContent = `${room} · ${start} to ${end} · ${$('guests').value} guest(s).`;
  dialog.showModal();
}
$('availability-form').addEventListener('submit', e => { e.preventDefault(); showRequest(); });
document.querySelectorAll('[data-room]').forEach(link => link.addEventListener('click', e => {
  e.preventDefault(); $('booking').scrollIntoView({behavior:'smooth'}); showRequest(link.dataset.room);
}));
$('close-dialog').addEventListener('click', () => dialog.close());
const menuButton=document.querySelector('.menu-toggle'), nav=document.querySelector('.nav');
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));
