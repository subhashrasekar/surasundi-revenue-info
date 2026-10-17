const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navWrap = document.querySelector('.nav-wrap');

menuToggle?.addEventListener('click', () => {
  const open = navWrap.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'मेन्यू बंद करा' : 'मेन्यू उघडा');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navWrap.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

function setupFilter(inputId, itemSelector, emptyId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const items = [...document.querySelectorAll(itemSelector)];
  const empty = emptyId ? document.getElementById(emptyId) : null;
  input.addEventListener('input', () => {
    const query = input.value.trim().toLocaleLowerCase('mr');
    let visible = 0;
    items.forEach(item => {
      const text = (item.innerText + ' ' + (item.dataset.search || '')).toLocaleLowerCase('mr');
      const match = text.includes(query);
      item.hidden = !match;
      if (match) visible++;
    });
    if (empty) empty.hidden = visible > 0;
  });
}

setupFilter('noticeSearch', '#noticeList .notice-item', 'noNotices');
setupFilter('villageSearch', '#villageGrid .village-card');
