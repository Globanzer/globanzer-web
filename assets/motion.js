(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var cards = document.querySelectorAll("[data-parallax]");
  if (!cards.length || reduce.matches) return;

  var tick = function () {
    var mid = window.innerHeight * 0.5;
    for (var i = 0; i < cards.length; i += 1) {
      var el = cards[i];
      var box = el.getBoundingClientRect();
      var delta = (box.top + box.height * 0.5 - mid) * 0.11;
      el.style.transform = "translate3d(0," + delta.toFixed(1) + "px,0)";
    }
  };

  tick();
  window.addEventListener("scroll", tick, { passive: true });
  window.addEventListener("resize", tick);
})();
