/**
 * PORTFOLIO TRACY LOUNDOU - LOGIQUE INTERACTIVE
 * Fichier : app.js
 * Fonctionnalités : Modales de projets, Copie presse-papiers, Navigation fluide,
 * Visualiseur de rythme, Formulaire avec mailto.
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectModals();
  initClipboardCopy();
  initContactForm();
  initNavigation();
  initMobileMenu();
});

/* ==========================================================================
   DONNÉES DÉTAILLÉES DES PROJETS RÉELS (Basées strictement sur le CV)
   ========================================================================== */
const projectDetails = {
  duer: {
    title: "Analyse des risques & Mise à jour du DUER",
    company: "SUNNEX Équipement — Aix-en-Provence",
    period: "Décembre 2024 — Janvier 2025",
    tags: ["QHSE", "DUER", "Cartographie des risques", "Santé au travail", "Conformité"],
    context: "SUNNEX Équipement souhaitait réévaluer la sécurité de ses postes de travail et actualiser son Document Unique d'Évaluation des Risques (DUER) conformément aux exigences légales et réglementaires en vigueur.",
    role: "Assistante de gestion — Mission QHSE",
    missions: [
      "Observation et analyse fine des postes de travail opérationnels et administratifs.",
      "Identification exhaustive des dangers physiques, ergonomiques et psychosociaux.",
      "Cotation des risques selon la matrice standard (Fréquence d'exposition × Gravité potentielle).",
      "Mise à jour intégrale du Document Unique d'Évaluation des Risques (DUER).",
      "Participation active à la démarche globale de prévention et de mise en conformité réglementaire."
    ],
    results: "Un Document Unique à jour, prêt pour les audits de conformité, et la formalisation d'un plan d'actions préventives priorisées pour réduire les risques d'accidents de travail.",
    tools: "Matrice d'évaluation des risques, Normes du Code du Travail, Suite bureautique."
  },

  sequen: {
    title: "Enquêtes terrain socioéconomiques & Étude d'impact",
    company: "SEQUEN (Cabinet d'étude environnementale) — Libreville, Gabon",
    period: "2023 (Stage de 3 mois)",
    tags: ["Environnement", "RSE", "Enquêtes terrain", "Données", "Sensibilisation"],
    context: "Dans le cadre de projets d'aménagement et de préservation environnementale, le cabinet SEQUEN mène des études d'impact socioéconomique et environnemental pour mesurer les retombées sur les écosystèmes et les populations locales.",
    role: "Technicienne QHSE (Stagiaire)",
    missions: [
      "Conduite d'enquêtes directes sur le terrain auprès des populations et des acteurs économiques locaux.",
      "Collecte rigoureuse des données environnementales et socio-économiques.",
      "Traitement statistique, structuration et restitution synthétique des données récoltées.",
      "Animation de séances de sensibilisation aux enjeux écologiques et de gestion durable des ressources."
    ],
    results: "Rapports d'enquêtes consolidés alimentant l'étude d'impact globale, et renforcement de l'adhésion des acteurs locaux aux bonnes pratiques écologiques.",
    tools: "Questionnaires de terrain, Outils de traitement de données statistiques, Guides de sensibilisation."
  },

  gestion: {
    title: "Gestion de la relation client-fournisseur & Rigueur documentaire",
    company: "SUNNEX Équipement — Aix-en-Provence",
    period: "Mai — Juin 2024",
    tags: ["GRCF", "Gestion documentaire", "Coordination interne", "Traçabilité"],
    context: "Pour assurer la fluidité de la chaîne d'approvisionnement et respecter les standards de qualité de service, SUNNEX Équipement nécessitait un suivi documentaire strict et une coordination renforcée.",
    role: "Assistante de gestion",
    missions: [
      "Gestion opérationnelle de la relation client-fournisseur (GRCF).",
      "Suivi administratif, vérification de la conformité des pièces et classement méthodique.",
      "Coordination transversale et communication quotidienne avec les interlocuteurs internes (achats, logistique, direction).",
      "Fiabilisation des bases de données et archivage sécurisé des flux documentaires."
    ],
    results: "Réduction des délais de traitement documentaire, renforcement de la traçabilité des échanges et consolidation de la qualité de relation avec les fournisseurs clés.",
    tools: "Outils de gestion commerciale (ERP), Tableurs de suivi, Procédures documentaires."
  }
};

/* ==========================================================================
   1. GESTION DES MODALES PROJETS
   ========================================================================== */
function initProjectModals() {
  const overlay = document.getElementById('projectModalOverlay');
  const closeBtn = document.getElementById('modalCloseBtn');
  const modalContent = document.getElementById('modalDynamicContent');
  const detailButtons = document.querySelectorAll('[data-project-target]');

  if (!overlay || !modalContent) return;

  function openModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    modalContent.innerHTML = `
      <div class="modal-meta-row">
        <span class="badge badge-tag">${escapeHTML(data.company)}</span>
        <span class="badge badge-gold">${escapeHTML(data.period)}</span>
      </div>

      <h3 style="font-size: 1.4rem; font-weight: 800; color: var(--c-text-main); margin-bottom: 0.5rem;">
        ${escapeHTML(data.title)}
      </h3>
      <p style="font-size: 0.92rem; font-weight: 700; color: var(--c-primary); margin-bottom: 1.5rem;">
        Rôle : ${escapeHTML(data.role)}
      </p>

      <div class="modal-section-block">
        <h4>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          Contexte de la mission
        </h4>
        <p>${escapeHTML(data.context)}</p>
      </div>

      <div class="modal-section-block">
        <h4>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
          Actions réalisées & Méthodologie
        </h4>
        <ul>
          ${data.missions.map(m => `<li>${escapeHTML(m)}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-highlight-box">
        <h5>Résultats concrets obtenus</h5>
        <p>${escapeHTML(data.results)}</p>
      </div>

      <div class="modal-section-block" style="margin-top: 1.25rem;">
        <h4 style="font-size: 0.88rem; color: var(--c-text-light);">Outils & Références mobilisés</h4>
        <p style="font-size: 0.86rem; color: var(--c-text-muted);">${escapeHTML(data.tools)}</p>
      </div>
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-project-target');
      openModal(targetId);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   2. COPIE RAPIDE DANS LE PRESSE-PAPIER + TOAST
   ========================================================================== */
function initClipboardCopy() {
  const copyButtons = document.querySelectorAll('[data-copy-value]');
  const toast = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy-value');
      const label = btn.getAttribute('data-copy-label') || "Information";

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`${label} copié dans le presse-papiers !`);
        }).catch(() => {
          fallbackCopyText(textToCopy, label);
        });
      } else {
        fallbackCopyText(textToCopy, label);
      }
    });
  });

  function fallbackCopyText(text, label) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`${label} copié dans le presse-papiers !`);
    } catch (err) {
      showToast(`${label} : ${text}`);
    }
    document.body.removeChild(textArea);
  }

  function showToast(message) {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

/* ==========================================================================
   3. GESTION DU FORMULAIRE DE CONTACT
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactDirectForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName')?.value || '';
    const email = document.getElementById('formEmail')?.value || '';
    const subject = document.getElementById('formSubject')?.value || 'Prise de contact - Alternance QHSE';
    const message = document.getElementById('formMessage')?.value || '';

    // Construction de l'URL mailto pour une ouverture directe et fiable dans le client mail du recruteur
    const mailtoRecipient = "tracyloundou@gmail.com";
    const mailtoSubject = encodeURIComponent(`[Alternance QHSE] ${subject} - ${name}`);
    const mailtoBody = encodeURIComponent(
      `Bonjour Tracy,\n\n${message}\n\nCordialement,\n${name}\nEmail : ${email}`
    );

    const mailtoUrl = `mailto:${mailtoRecipient}?subject=${mailtoSubject}&body=${mailtoBody}`;
    window.location.href = mailtoUrl;

    // Feedback visuel de confirmation
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `✓ Client mail ouvert !`;
      submitBtn.style.backgroundColor = `#2e7d32`;
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.backgroundColor = '';
      }, 4000);
    }
  });
}

/* ==========================================================================
   4. NAVIGATION FLUIDE ET LIENS ACTIFS AU DÉFILEMENT
   ========================================================================== */
function initNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. MENU MOBILE
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuToggle');
  const navLinksContainer = document.getElementById('navLinksContainer');

  if (!menuBtn || !navLinksContainer) return;

  menuBtn.addEventListener('click', () => {
    navLinksContainer.classList.toggle('mobile-open');
  });

  // Fermer le menu lors d'un clic sur un lien
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('mobile-open');
    });
  });
}

/* Utilitaire anti-injection XSS pour le HTML dynamique */
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
