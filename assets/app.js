
(() => {
  const toggle = document.querySelector('[data-sidebar-toggle]');
  if (toggle) toggle.addEventListener('click', () => document.body.classList.toggle('sidebar-open'));
  const input = document.querySelector('[data-search-input]');
  const results = document.querySelector('[data-search-results]');
  if (!input || !results) return;
  let index = [];
  fetch(document.body.dataset.searchIndex).then(r => r.json()).then(data => { index = data; });
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.hidden = true; results.innerHTML = ''; return; }
    const matches = index.filter(item => `${item.title} ${item.text}`.toLowerCase().includes(q)).slice(0, 12);
    const indexUrl = new URL(document.body.dataset.searchIndex, window.location.href);
    const siteBase = new URL('../', indexUrl);
    results.innerHTML = matches.length ? matches.map(item => `<a href="${new URL(item.path, siteBase).href}"><strong>${item.title}</strong><small>${item.text.slice(0, 90)}</small></a>`).join('') : '<span class="no-results">没有找到匹配词条</span>';
    results.hidden = false;
  });
  document.addEventListener('click', event => { if (!results.contains(event.target) && event.target !== input) results.hidden = true; });
})();
