// Best-effort content protection.
// This cannot stop screenshots or developer tools, but it blocks common casual save/copy actions.
document.addEventListener('contextmenu', (e) => {
  if (e.target.closest('img, .gallery, .hero-bg, .cat-card, .feature-strip')) e.preventDefault();
});

document.addEventListener('dragstart', (e) => {
  if (e.target.closest('img, .gallery, .hero-bg, .cat-card, .feature-strip')) e.preventDefault();
});

document.addEventListener('copy', (e) => {
  if (document.activeElement && document.activeElement.matches('input, textarea, [contenteditable="true"]')) return;
  if (window.getSelection && window.getSelection().toString().trim()) e.preventDefault();
});

document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  const modifier = e.ctrlKey || e.metaKey;
  if (modifier && ['c', 'u', 's'].includes(key)) {
    const active = document.activeElement;
    if (!active || !active.matches('input, textarea, [contenteditable="true"]')) {
      e.preventDefault();
    }
  }
});

document.body.classList.add('copy-protected');

document.querySelectorAll('img').forEach((img) => {
  img.setAttribute('draggable', 'false');
  img.setAttribute('decoding', 'async');
});
