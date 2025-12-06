const STORAGE_KEY = 'lab3-routes';
const tableBody = document.getElementById('table-body');
const form = document.getElementById('route-form');
const fields = Array.from(form.querySelectorAll('input'));

const defaultRows = [
  { city: 'Амстердам', email: 'canals@travel.io', phone: '+31 555 10 10' },
  { city: 'Прага', email: 'castle@travel.io', phone: '+420 555 11 22' },
  { city: 'Берлин', email: 'museum@travel.io', phone: '+49 555 33 44' },
  { city: 'Копенгаген', email: 'harbor@travel.io', phone: '+45 555 66 77' }
];

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [...defaultRows];
  } catch (e) {
    console.warn('Не удалось прочитать localStorage, используем дефолт', e);
    return [...defaultRows];
  }
}

function writeStorage(rows) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
}

let rows = readStorage();

function renderTable() {
  tableBody.innerHTML = '';
  rows.forEach((row, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.city}</td>
      <td>${row.email}</td>
      <td>${row.phone}</td>
      <td><button class="delete" data-index="${index}">Удалить</button></td>
    `;
    tableBody.appendChild(tr);
  });
}

function clearErrors() {
  form.querySelectorAll('.form__error').forEach((el) => (el.textContent = ''));
  fields.forEach((field) => field.classList.remove('invalid'));
}

function showError(field, message) {
  const error = form.querySelector(`[data-error-for="${field.id}"]`);
  field.classList.add('invalid');
  if (error) error.textContent = message;
}

function validate() {
  clearErrors();
  let valid = true;

  fields.forEach((field) => {
    if (!field.value.trim()) {
      showError(field, 'Заполните поле');
      valid = false;
    }
  });

  const emailField = document.getElementById('email');
  const emailPattern = /.+@.+\..+/i;
  if (emailField.value && !emailPattern.test(emailField.value.trim())) {
    showError(emailField, 'Невалидный email');
    valid = false;
  }

  return valid;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!validate()) return;

  const newRow = fields.reduce((acc, field) => {
    acc[field.name] = field.value.trim();
    return acc;
  }, {});

  rows.push(newRow);
  writeStorage(rows);
  renderTable();
  form.reset();
  clearErrors();
});

tableBody.addEventListener('click', (event) => {
  const btn = event.target.closest('button.delete');
  if (!btn) return;
  const index = Number(btn.dataset.index);
  rows.splice(index, 1);
  writeStorage(rows);
  renderTable();
});

renderTable();

// Слайдер
const track = document.getElementById('slides');
const slides = Array.from(track.children);
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let current = 0;
let timerId;

function setSlide(index) {
  current = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${current * 100}%)`;
}

function startAuto() {
  clearInterval(timerId);
  timerId = setInterval(() => setSlide(current + 1), 5000);
}

prev.addEventListener('click', () => {
  setSlide(current - 1);
  startAuto();
});

next.addEventListener('click', () => {
  setSlide(current + 1);
  startAuto();
});

startAuto();
