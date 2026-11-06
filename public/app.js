const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
  mobileMenu.hidden = true;
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileMenu.hidden = !open;
});
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileMenu.hidden) { closeMenu(); menuToggle.focus(); }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
matchMedia('(min-width: 601px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const grid = document.querySelector('#barber-grid');
const previous = document.querySelector('#previous-barbers');
const next = document.querySelector('#next-barbers');
const viewAll = document.querySelector('#show-all');
const progress = document.querySelector('.barber-track span');
function updateCarousel() {
  const maximum = grid.scrollWidth - grid.clientWidth;
  const fraction = maximum > 0 ? Math.max(0, Math.min(1, grid.scrollLeft / maximum)) : 0;
  previous.disabled = grid.scrollLeft < 5;
  next.disabled = grid.scrollLeft >= maximum - 5;
  const visible = Math.min(1, grid.clientWidth / grid.scrollWidth);
  progress.style.width = `${visible * 100}%`;
  progress.style.transform = `translateX(${visible ? fraction * (1 - visible) / visible * 100 : 0}%)`;
}
function scrollBarbers(direction) {
  const card = grid.querySelector('.barber-card');
  const stride = card.getBoundingClientRect().width + parseFloat(getComputedStyle(grid).columnGap);
  const count = Math.max(1, Math.floor(grid.clientWidth / stride));
  grid.scrollBy({ left: direction * stride * count, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}
previous.addEventListener('click', () => scrollBarbers(-1));
next.addEventListener('click', () => scrollBarbers(1));
viewAll.addEventListener('click', () => {
  const expanded = grid.classList.toggle('expanded');
  document.querySelector('.barbers-section').classList.toggle('all-shown', expanded);
  viewAll.setAttribute('aria-expanded', String(expanded));
  viewAll.innerHTML = expanded ? 'Show less <span aria-hidden="true">↖</span>' : 'View all 11 <span aria-hidden="true">↗</span>';
  grid.setAttribute('aria-label', expanded ? 'Our 11 barbers' : 'Our 11 barbers. Scroll horizontally to explore.');
  grid.scrollLeft = 0;
  updateCarousel();
});
grid.addEventListener('scroll', updateCarousel, { passive: true });
new ResizeObserver(updateCarousel).observe(grid);
grid.addEventListener('keydown', event => {
  if (event.target !== grid || grid.classList.contains('expanded')) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    scrollBarbers(event.key === 'ArrowRight' ? 1 : -1);
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
updateCarousel();
