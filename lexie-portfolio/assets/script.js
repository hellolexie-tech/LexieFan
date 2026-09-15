// Split hero statement into word spans and stagger their reveal.
(function () {
  const target = document.querySelector('[data-splittext]');
  if (!target) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Walk child nodes so we preserve inline .accent spans.
  let i = 0;
  const wrapNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      const parts = node.textContent.split(/(\s+)/);
      parts.forEach((part) => {
        if (part.trim() === '') {
          frag.appendChild(document.createTextNode(part));
        } else {
          const span = document.createElement('span');
          span.className = 'hero-word';
          span.style.setProperty('--i', i++);
          if (reduce) { span.style.animation = 'none'; span.style.opacity = 1; }
          span.textContent = part;
          frag.appendChild(span);
        }
      });
      node.replaceWith(frag);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      [...node.childNodes].forEach(wrapNode);
    }
  };

  [...target.childNodes].forEach(wrapNode);
})();

// Card media: subtle parallax-free intersection reveal (progressive enhancement).
(function () {
  if (!('IntersectionObserver' in window)) return;
  const cards = document.querySelectorAll('.card');
  if (!cards.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.2,.7,.2,1)';
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  cards.forEach((c) => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(16px)';
    io.observe(c);
  });
})();
