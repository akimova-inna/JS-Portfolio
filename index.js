
document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth scroll for navbar links
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      const targetId = href.slice(1); // remove "#"
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 2. Search + filter by technology
  const searchInput = document.getElementById('projectSearch');
  const techFilter = document.getElementById('techFilter');
  const projectCards = document.querySelectorAll('.project-card');

  function applyFilters() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedTech = techFilter.value; // all | js | api

    projectCards.forEach((card) => {
      const titleEl = card.querySelector('.project-card__title');
      const descEl = card.querySelector('.project-card__description');

      const title = titleEl ? titleEl.textContent.toLowerCase() : '';
      const description = descEl ? descEl.textContent.toLowerCase() : '';
      const cardTech = (card.dataset.tech || '').toLowerCase();

      const matchesText =
        !searchText ||
        title.includes(searchText) ||
        description.includes(searchText);

      const matchesTech =
        selectedTech === 'all' || cardTech.includes(selectedTech);

      card.style.display = matchesText && matchesTech ? '' : 'none';
    });
  }

  if (searchInput && techFilter && projectCards.length) {
    searchInput.addEventListener('input', applyFilters);
    techFilter.addEventListener('change', applyFilters);
    applyFilters();
  }
});

