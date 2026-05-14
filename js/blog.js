/* ============================================================
   UNLOCK EXPRESS — Blog JS
   Filtres + Pagination intelligente
   ============================================================ */

(function () {
  "use strict";

  // ── Sélecteurs ──────────────────────────────────────────────
  const filterButtons    = document.querySelectorAll(".filter-btn");
  const allCards         = [...document.querySelectorAll(".blog-card")];
  const grid             = document.querySelector(".blog-grid");
  const pagination       = document.querySelector(".pagination");
  const prevBtn          = document.querySelector(".page-btn.prev");
  const nextBtn          = document.querySelector(".page-btn.next");

  const ARTICLES_PER_PAGE = 9;
  let currentPage         = 1;
  let activeFilter        = "all";

  // ── Cartes filtrées (selon filtre actif) ────────────────────
  function getFilteredCards() {
    if (activeFilter === "all") return allCards;
    return allCards.filter(card =>
      card.dataset.category.split(" ").includes(activeFilter)
    );
  }

  // ── Affiche une page précise ─────────────────────────────────
  function showPage(page) {
    const filtered  = getFilteredCards();
    const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);

    // Clamp la page dans les limites valides
    currentPage = Math.max(1, Math.min(page, totalPages || 1));

    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    const end   = start + ARTICLES_PER_PAGE;

    // Masque toutes les cartes, puis affiche seulement la slice filtrée
    allCards.forEach(card => (card.style.display = "none"));
    filtered.forEach((card, i) => {
      card.style.display = (i >= start && i < end) ? "block" : "none";
    });

    renderPaginationNumbers(totalPages);
    updateNavButtons(totalPages);
  }

  // ── Génère les boutons de page dynamiquement ─────────────────
  function renderPaginationNumbers(totalPages) {
    // Supprime les anciens boutons numérotés (garde prev / next)
    pagination.querySelectorAll(".page-btn[data-page]").forEach(btn => btn.remove());

    const insertRef = nextBtn; // insère avant le bouton Suivant

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.className   = "page-btn" + (i === currentPage ? " active" : "");
      btn.dataset.page = i;
      btn.textContent  = i;
      btn.addEventListener("click", () => showPage(i));
      pagination.insertBefore(btn, insertRef);
    }
  }

  // ── Active / désactive Précédent & Suivant ───────────────────
  function updateNavButtons(totalPages) {
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;
  }

  // ── Toggle pagination (cachée si filtre actif ≠ "all") ───────
  function updatePaginationVisibility() {
    const filtered   = getFilteredCards();
    const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);
    const shouldShow = totalPages > 1;

    pagination.classList.toggle("display-none", !shouldShow);
  }

  // ── Filtres ──────────────────────────────────────────────────
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Mise à jour état actif
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      activeFilter = btn.dataset.filter;
      currentPage  = 1; // reset à la première page

      updatePaginationVisibility();
      showPage(1);
    });
  });

  // ── Précédent / Suivant ──────────────────────────────────────
  prevBtn.addEventListener("click", () => showPage(currentPage - 1));
  nextBtn.addEventListener("click", () => showPage(currentPage + 1));

  // ── Init ─────────────────────────────────────────────────────
  updatePaginationVisibility();
  showPage(1);

})();
