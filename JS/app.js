// ==========================================
// APP.JS - EmpregaMais
// Arquivo principal: toasts, navegação,
// teclado, inicialização geral
// ==========================================
// Depends on: all other modules
// This file loads LAST and bootstraps the app.
// ==========================================

// ==========================================
// TOAST NOTIFICATION SYSTEM
// ==========================================

/**
 * Displays a toast notification at the bottom-right of the screen.
 * @param {string} mensagem - Message text
 * @param {string} tipo     - 'success' | 'error' | 'warning' | 'info'
 * @param {number} duracao  - Auto-dismiss time in ms (default 4000)
 */
function mostrarToast(mensagem, tipo, duracao) {
  tipo = tipo || 'info';
  duracao = duracao || 4000;

  var container = document.getElementById('toast-container');
  if (!container) return;

  var icons = {
    success: '\u2705',  // ✅
    error: '\u274C',    // ❌
    warning: '\u26A0\uFE0F', // ⚠️
    info: '\u2139\uFE0F'     // ℹ️
  };

  var titles = {
    success: 'Sucesso',
    error: 'Erro',
    warning: 'Aten\u00e7\u00e3o',
    info: 'Informa\u00e7\u00e3o'
  };

  var toast = document.createElement('div');
  toast.className = 'toast toast-' + tipo;
  toast.setAttribute('role', 'status');
  toast.innerHTML =
    '<span class="toast-icon" aria-hidden="true">' + (icons[tipo] || '\u2139\uFE0F') + '</span>' +
    '<div class="toast-content">' +
      '<div class="toast-title">' + (titles[tipo] || 'Informa\u00e7\u00e3o') + '</div>' +
      '<div class="toast-message">' + mensagem + '</div>' +
    '</div>' +
    '<button class="toast-close" onclick="this.parentElement.remove()" aria-label="Fechar notifica\u00e7\u00e3o">\u2715</button>';

  container.appendChild(toast);

  // Auto-dismiss with exit animation
  setTimeout(function() {
    toast.classList.add('toast-exit');
    setTimeout(function() { toast.remove(); }, 300);
  }, duracao);
}

// ==========================================
// NAVIGATION SYSTEM (SPA-STYLE)
// ==========================================

/**
 * Shows a section by ID and hides all others.
 * Updates both desktop and mobile nav active states.
 * Stops speech and announces navigation to screen readers.
 * @param {string} id - Section element ID
 */
function mostrarTela(id) {
  // Hide all sections
  document.querySelectorAll('.section').forEach(function(section) {
    section.classList.add('section--hidden');
  });

  // Show target section
  var target = document.getElementById(id);
  if (target) {
    target.classList.remove('section--hidden');
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update desktop navigation buttons
  document.querySelectorAll('.nav-btn').forEach(function(btn) {
    btn.classList.remove('nav-btn--active');
    if (btn.dataset.section === id) {
      btn.classList.add('nav-btn--active');
    }
  });

  // Update mobile navigation items
  document.querySelectorAll('.mobile-nav-item').forEach(function(btn) {
    btn.classList.remove('mobile-nav-item--active');
    if (btn.dataset.section === id) {
      btn.classList.add('mobile-nav-item--active');
    }
  });

  // Stop any ongoing speech synthesis
  pararLeitura();

  // Announce navigation change to screen readers
  if (target) {
    var title = target.querySelector('h2');
    if (title) {
      var announcement = document.createElement('div');
      announcement.className = 'sr-only';
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.textContent = 'Navegou para: ' + title.textContent;
      document.body.appendChild(announcement);
      setTimeout(function() { announcement.remove(); }, 1000);
    }
  }
}

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================

/**
 * Sets up global keyboard shortcuts:
 *  - Escape: close a11y panel / onboarding modal
 *  - Alt+1-5: quick section navigation
 *  - Alt+A: toggle accessibility panel
 */
function initKeyboardNav() {
  document.addEventListener('keydown', function(e) {
    // --- Escape: close panels / modals ---
    if (e.key === 'Escape') {
      var panel = document.getElementById('a11y-panel');
      if (panel && panel.getAttribute('aria-hidden') === 'false') {
        toggleAccessibilityPanel();
        return;
      }
      var modal = document.getElementById('modal-onboarding');
      if (modal && modal.getAttribute('aria-hidden') === 'false') {
        fecharOnboarding();
        return;
      }
    }

    // --- Alt+1-5: quick section navigation ---
    if (e.altKey && !e.ctrlKey && !e.shiftKey) {
      var navMap = {
        '1': 'home',
        '2': 'vagas',
        '3': 'perfil',
        '4': 'cursos',
        '5': 'notificacoes'
      };
      if (navMap[e.key]) {
        e.preventDefault();
        mostrarTela(navMap[e.key]);
      }
    }

    // --- Alt+A: toggle accessibility panel ---
    if (e.altKey && e.key.toLowerCase() === 'a') {
      e.preventDefault();
      toggleAccessibilityPanel();
    }
  });
}

// ==========================================
// APPLICATION INITIALIZATION
// ==========================================

window.addEventListener('DOMContentLoaded', function() {
  // 1. Load accessibility preferences first (font size, themes)
  carregarPreferenciasA11y();

  // 2. Initialize content sections
  carregarVagas();
  carregarCursos();
  carregarNotificacoes();

  // 3. Initialize profile form (submit handler, masks, load saved data)
  initPerfil();

  // 4. Initialize search/filter event listeners
  initSearchListeners();

  // 5. Initialize keyboard navigation shortcuts
  initKeyboardNav();

  // 6. Show onboarding modal for first-time visitors
  var onboardingDone = localStorage.getItem('em-onboarding-done');
  if (!onboardingDone) {
    setTimeout(function() {
      var modal = document.getElementById('modal-onboarding');
      if (modal) {
        modal.setAttribute('aria-hidden', 'false');
        // Focus the first interactive element in the modal
        var firstBtn = modal.querySelector('button');
        if (firstBtn) firstBtn.focus();
      }
    }, 1000);
  }

  // 7. Silently populate profile form if data exists in localStorage
  var savedPerfil = localStorage.getItem('em-perfil');
  if (savedPerfil) {
    try {
      var perfil = JSON.parse(savedPerfil);
      var fields = {
        'campo-nome': perfil.nome,
        'campo-cpf': perfil.cpf,
        'campo-telefone': perfil.telefone,
        'campo-email': perfil.email,
        'campo-deficiencia': perfil.deficiencia,
        'campo-experiencia': perfil.experiencia
      };
      Object.keys(fields).forEach(function(id) {
        var el = document.getElementById(id);
        if (el && fields[id]) el.value = fields[id];
      });
    } catch (e) {
      // Silently ignore corrupted profile data
    }
  }
});