// Filtering
const buttons = document.querySelectorAll('.filter-list button');
const figures = document.querySelectorAll('#gallery figure');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    figures.forEach(fig => {
      fig.classList.toggle('hide', f !== 'all' && fig.dataset.cat !== f);
    });
  });
});

// Deep-link from homepage category cards (#weddings etc.)
const hash = decodeURIComponent(location.hash.slice(1));
if (hash) {
  const match = Array.from(document.querySelectorAll('.filter-list button'))
    .find((button) => button.dataset.filter === hash);
  if (match) match.click();
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
document.querySelectorAll('#gallery figure img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
  });
});
function closeLightbox() { lightbox.classList.remove('open'); lightboxImg.src = ''; }
const lightboxCloseBtn = document.getElementById('lightboxClose');
if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
}
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
