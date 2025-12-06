const cards = document.getElementById('cards');
const statusBar = document.getElementById('status');
const reloadBtn = document.getElementById('reload');
const URL = 'https://jsonplaceholder.typicode.com/posts?_limit=8';

async function loadPosts() {
  statusBar.textContent = 'Загружаем данные...';
  statusBar.style.color = '';
  cards.innerHTML = '';

  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error(`Ошибка ответа ${response.status}`);
    const data = await response.json();
    statusBar.textContent = 'Готово';
    renderCards(data);
  } catch (error) {
    statusBar.textContent = 'Не удалось загрузить данные';
    statusBar.style.color = '#fca5a5';
    cards.innerHTML = `<p class="card">${error.message}</p>`;
  }
}

function renderCards(items) {
  cards.innerHTML = items
    .map(
      (item) => `
        <article class="card">
          <p class="eyebrow">ID: ${item.id}</p>
          <h3 class="card__title">${item.title}</h3>
          <p class="card__body">${item.body}</p>
        </article>
      `
    )
    .join('');
}

reloadBtn.addEventListener('click', loadPosts);
loadPosts();
