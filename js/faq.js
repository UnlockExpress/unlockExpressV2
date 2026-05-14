/**
 * faq.js — Unlock Express
 * Accordion FAQ + navigation par catégorie + menu mobile
 */

(function () {
  'use strict';

  /* ─── Utilitaires ──────────────────────────────────────── */

  /** Ferme une card accordion */
  function closeCard(card) {
    const answer = card.querySelector('.faq-answer');
    if (!answer) return;
    answer.classList.remove('view');
    card.classList.remove('display');
  }

  /** Ouvre une card accordion (ferme les autres dans le même grid) */
  function openCard(card) {
    const grid = card.closest('.faq-grid');
    if (grid) {
      grid.querySelectorAll('.faq-card.display').forEach(openCard => {
        if (openCard !== card) closeCard(openCard);
      });
    }
    const answer = card.querySelector('.faq-answer');
    if (!answer) return;
    answer.classList.add('view');
    card.classList.add('display');
  }

  /** Toggle une card */
  function toggleCard(card) {
    card.classList.contains('display') ? closeCard(card) : openCard(card);
  }

  /* ─── Accordion ────────────────────────────────────────── */
  function initAccordion() {
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
        const card = question.closest('.faq-card');
        if (card) toggleCard(card);
      });

      // Accessibilité clavier
      question.setAttribute('role', 'button');
      question.setAttribute('tabindex', '0');
      question.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const card = question.closest('.faq-card');
          if (card) toggleCard(card);
        }
      });
    });
  }

  /* ─── Navigation par catégorie ─────────────────────────── */
  function faqDisplay(elementId) {
    // Masque tous les containers
    document.querySelectorAll('.faq-show .container').forEach(c => {
      c.classList.add('none');
      // Ferme tous les accordions du container caché
      c.querySelectorAll('.faq-card.display').forEach(closeCard);
    });

    // Affiche le container ciblé
    const target = document.querySelector(elementId);
    if (target) target.classList.remove('none');
  }

  // Exposée globalement car appelée en inline onclick dans le HTML
  window.faqDisplay = faqDisplay;

  /* ─── Liens de navigation ──────────────────────────────── */
  function initNavLinks() {
    const links = document.querySelectorAll('.faq-links a');

    links.forEach(link => {
      link.addEventListener('click', () => {
        // Retire l'état actif de tous les liens
        links.forEach(a => a.classList.remove('active'));
        // Active le lien cliqué
        link.classList.add('active');
        // Ferme le menu mobile si ouvert
        closeMobileMenu();
      });
    });
  }

  /* ─── Menu mobile ───────────────────────────────────────── */
  const menuBtn   = document.querySelector('.menu');
  const faqLinks  = document.querySelector('.faq-links');

  function closeMobileMenu() {
    faqLinks?.classList.remove('block');
    menuBtn?.setAttribute('aria-expanded', 'false');
  }

  function openMobileMenu() {
    faqLinks?.classList.add('block');
    menuBtn?.setAttribute('aria-expanded', 'true');
  }

  function initMobileMenu() {
    if (!menuBtn || !faqLinks) return;

    menuBtn.setAttribute('aria-label', 'Ouvrir la navigation');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('role', 'button');
    menuBtn.setAttribute('tabindex', '0');

    menuBtn.addEventListener('click', () => {
      faqLinks.classList.contains('block') ? closeMobileMenu() : openMobileMenu();
    });

    menuBtn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        faqLinks.classList.contains('block') ? closeMobileMenu() : openMobileMenu();
      }
    });

    // Ferme le menu en cliquant ailleurs
    document.addEventListener('click', e => {
      if (!menuBtn.contains(e.target) && !faqLinks.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  /* ─── Init ──────────────────────────────────────────────── */
  function init() {
    initAccordion();
    initNavLinks();
    initMobileMenu();
  }

  // Lance l'init dès que le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
