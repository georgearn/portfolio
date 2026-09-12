// Lightbox gallery for .screens image grids.
// Each .screens container becomes its own gallery — click a screenshot to
// open it full-size, with prev/next and Escape/arrow-key navigation.
(function () {
  function initGallery(root) {
    var figures = Array.prototype.slice.call(root.querySelectorAll('figure'));
    if (!figures.length) return;

    var overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML =
      '<button class="lightbox-close" aria-label="Close">&times;</button>' +
      '<button class="lightbox-prev" aria-label="Previous screenshot">&larr;</button>' +
      '<img class="lightbox-img lighten" src="" alt="">' +
      '<button class="lightbox-next" aria-label="Next screenshot">&rarr;</button>' +
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
      fig.querySelector('img').style.cursor = 'zoom-in';
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
