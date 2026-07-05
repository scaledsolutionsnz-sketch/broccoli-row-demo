// Broccoli Row — shared interactions
(function () {
  // intro overlay
  window.addEventListener('load', function () {
    var intro = document.getElementById('intro');
    if (intro) setTimeout(function () { intro.classList.add('hide'); }, 1500);
  });

  // scroll reveal
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // nav condense + mobile toggle
  var nav = document.querySelector('.nav-in');
  var burger = document.querySelector('.burger');
  if (burger && nav) burger.addEventListener('click', function () { nav.classList.toggle('open'); });
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () { if (nav) nav.classList.remove('open'); });
  });

  // hero rotator
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.hero-dots button');
  if (slides.length > 1) {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var i = 0;
    function go(n) {
      slides[i].classList.remove('active'); if (dots[i]) dots[i].classList.remove('active');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('active'); if (dots[i]) dots[i].classList.add('active');
    }
    dots.forEach(function (d, n) { d.addEventListener('click', function () { go(n); }); });
    if (!reduce) setInterval(function () { go(i + 1); }, 6000);
  }
})();
