(function () {
  var song   = document.getElementById('song');
  var nameEl = document.getElementById('name');
  var muteBtn = document.getElementById('mute');
  var muted = false;

  // Try to autoplay as soon as the page opens.
  // Most browsers block this until the user taps something, so we also
  // play again when she taps "Open it".
  function playSong() {
    try {
      var p = song.play();
      if (p && typeof p.catch === 'function') { p.catch(function () {}); }
    } catch (e) {}
  }
  playSong();

  function hearts() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var em = ['💗', '💖', '💕', '🌸', '✨'];
    for (var i = 0; i < 22; i++) {
      (function (i) {
        setTimeout(function () {
          var h = document.createElement('span');
          h.className = 'heart';
          h.textContent = em[i % em.length];
          h.style.left = Math.random() * 95 + 'vw';
          h.style.fontSize = (18 + Math.random() * 20) + 'px';
          h.style.animationDuration = (4 + Math.random() * 3) + 's';
          h.style.webkitAnimationDuration = h.style.animationDuration;
          document.body.appendChild(h);
          setTimeout(function () { if (h.parentNode) h.parentNode.removeChild(h); }, 7500);
        }, i * 220);
      })(i);
    }
  }

  function openGift() {
    var n = nameEl.value.replace(/^\s+|\s+$/g, '');
    if (!n) { nameEl.focus(); return; }

    document.getElementById('hello').textContent = 'Hi ' + n + ' 💕 this is for you';
    document.getElementById('s1').className = 'screen';
    document.getElementById('s2').className = 'screen on';
    muteBtn.style.display = 'block';

    playSong();
    hearts();
    window.scrollTo(0, 0);
  }

  document.getElementById('open').addEventListener('click', openGift);
  nameEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) openGift();
  });

  muteBtn.addEventListener('click', function () {
    muted = !muted;
    song.muted = muted;
    muteBtn.textContent = muted ? '🔇' : '🔊';
    if (!muted) playSong();
  });
})();
