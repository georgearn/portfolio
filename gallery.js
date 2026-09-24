// Scroll reveal: .reveal elements fade in once as they enter the viewport.
document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded', function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  els.forEach(function (el) { io.observe(el); });
});

// Lightbox gallery for .screens image grids.
// Each .screens container becomes its own gallery. Click a screenshot to
// open it full-size, with prev/next and Escape/arrow-key navigation.
(function () {
  function initGallery(root) {
    var figures = Array.prototype.slice.call(root.querySelectorAll('figure'));
    if (!figures.length) return;

    var overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML =
      '<button class="lightbox-close" aria-label="Close"><i class="ph ph-x"></i></button>' +
      '<button class="lightbox-prev" aria-label="Previous screenshot"><i class="ph ph-arrow-left"></i></button>' +
      '<img class="lightbox-img lighten" src="" alt="">' +
      '<button class="lightbox-next" aria-label="Next screenshot"><i class="ph ph-arrow-right"></i></button>' +
      '<div class="lightbox-caption"></div>';
    document.body.appendChild(overlay);

    var imgEl = overlay.querySelector('.lightbox-img');
    var capEl = overlay.querySelector('.lightbox-caption');
    var idx = 0;

    function show(i) {
      idx = (i + figures.length) % figures.length;
      var fig = figures[idx];
      var thumb = fig.querySelector('img');
      var cap = fig.querySelector('figcaption');
      imgEl.src = thumb.getAttribute('src');
      imgEl.alt = thumb.getAttribute('alt') || '';
      capEl.textContent = cap ? cap.textContent : '';
      overlay.classList.add('open');
    }
    function close() {
      overlay.classList.remove('open');
    }

    figures.forEach(function (fig, i) {
      fig.addEventListener('click', function () { show(i); });
    });

    overlay.querySelector('.lightbox-close').addEventListener('click', close);
    overlay.querySelector('.lightbox-prev').addEventListener('click', function () { show(idx - 1); });
    overlay.querySelector('.lightbox-next').addEventListener('click', function () { show(idx + 1); });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    Array.prototype.forEach.call(document.querySelectorAll('.screens'), initGallery);
  });
})();
