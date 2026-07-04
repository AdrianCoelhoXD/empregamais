// ==========================================
// ACESSIBILIDADE.JS - EmpregaMais
// Módulo de acessibilidade: fontes, temas,
// leitura de voz, painel e preferências
// ==========================================
// Depends on: dados.js (global data)
// Provides: font/theme/TTS functions for all modules
// ==========================================

// ==========================================
// FONT SIZE MANAGEMENT
// ==========================================

let fontSizePercent = 100; // 100% = 16px base
const FONT_MIN = 75;
const FONT_MAX = 200;
const FONT_STEP = 12.5; // 12.5% = 2px at base size

/**
 * Increases the base font size by one step.
 * Caps at FONT_MAX and shows a warning toast if already at max.
 */
function aumentarFonte() {
  if (fontSizePercent >= FONT_MAX) {
    mostrarToast('Tamanho máximo de fonte atingido', 'warning');
    return;
  }
  fontSizePercent += FONT_STEP;
  aplicarFonte();
}

/**
 * Decreases the base font size by one step.
 * Caps at FONT_MIN and shows a warning toast if already at min.
 */
function diminuirFonte() {
  if (fontSizePercent <= FONT_MIN) {
    mostrarToast('Tamanho mínimo de fonte atingido', 'warning');
    return;
  }
  fontSizePercent -= FONT_STEP;
  aplicarFonte();
}

/**
 * Resets the font size back to the default 100% (16px).
 */
function resetarFonte() {
  fontSizePercent = 100;
  aplicarFonte();
  mostrarToast('Fonte restaurada ao padrão', 'info');
}

/**
 * Applies the current fontSizePercent to the document root,
 * updates the display element, and persists to localStorage.
 */
function aplicarFonte() {
  const px = Math.round(16 * fontSizePercent / 100);
  document.documentElement.style.fontSize = px + 'px';
  const display = document.getElementById('font-size-display');
  if (display) display.textContent = fontSizePercent + '%';
  localStorage.setItem('em-font-size', fontSizePercent);
}

// ==========================================
// THEME MANAGEMENT
// ==========================================

const THEMES = [
  'theme-high-contrast',
  'theme-protanopia',
  'theme-deuteranopia',
  'theme-tritanopia',
  'theme-large-cursor',
  'theme-reduced-motion',
  'theme-large-spacing'
];

/**
 * Toggles an accessibility theme on/off.
 * Color-vision themes are mutually exclusive (only one active at a time).
 * @param {string} tema - Theme key without "theme-" prefix
 */
function alternarTema(tema) {
  const className = 'theme-' + tema;
  const body = document.body;
  const isActive = body.classList.contains(className);

  // Color-vision themes are mutually exclusive
  const colorThemes = [
    'theme-high-contrast',
    'theme-protanopia',
    'theme-deuteranopia',
    'theme-tritanopia'
  ];
  if (colorThemes.includes(className)) {
    colorThemes.forEach(function(t) { body.classList.remove(t); });
  }

  if (isActive) {
    body.classList.remove(className);
    mostrarToast('Tema desativado', 'info');
  } else {
    body.classList.add(className);
    const nomes = {
      'high-contrast': 'Alto Contraste',
      'protanopia': 'Protanopia',
      'deuteranopia': 'Deuteranopia',
      'tritanopia': 'Tritanopia',
      'large-cursor': 'Cursor Grande',
      'reduced-motion': 'Animações Desativadas',
      'large-spacing': 'Espaçamento Ampliado'
    };
    mostrarToast('Tema "' + (nomes[tema] || tema) + '" ativado', 'success');
  }

  // Sync UI button states and persist
  updateA11yButtonStates();
  salvarPreferenciasA11y();
}

/**
 * Convenience shortcut to toggle high-contrast theme.
 */
function alternarContraste() {
  alternarTema('high-contrast');
}

/**
 * Resets ALL accessibility settings to defaults:
 * removes themes, resets font, stops speech, clears storage.
 */
function resetarAcessibilidade() {
  THEMES.forEach(function(t) { document.body.classList.remove(t); });
  resetarFonte();
  pararLeitura();
  updateA11yButtonStates();
  localStorage.removeItem('em-a11y-themes');
  localStorage.removeItem('em-font-size');
  mostrarToast('Todas as configurações de acessibilidade foram restauradas', 'success');
}

/**
 * Syncs the active/inactive visual state of all a11y buttons
 * that have a data-theme attribute.
 */
function updateA11yButtonStates() {
  document.querySelectorAll('.a11y-btn[data-theme]').forEach(function(btn) {
    var tema = 'theme-' + btn.dataset.theme;
    if (document.body.classList.contains(tema)) {
      btn.classList.add('a11y-btn--active');
    } else {
      btn.classList.remove('a11y-btn--active');
    }
  });
}

/**
 * Persists currently active themes to localStorage.
 */
function salvarPreferenciasA11y() {
  var activeThemes = THEMES.filter(function(t) {
    return document.body.classList.contains(t);
  });
  localStorage.setItem('em-a11y-themes', JSON.stringify(activeThemes));
}

/**
 * Loads saved font size and themes from localStorage on page load.
 */
function carregarPreferenciasA11y() {
  // Restore font size
  var savedFont = localStorage.getItem('em-font-size');
  if (savedFont) {
    fontSizePercent = parseFloat(savedFont);
    aplicarFonte();
  }

  // Restore themes
  var savedThemes = localStorage.getItem('em-a11y-themes');
  if (savedThemes) {
    try {
      var themes = JSON.parse(savedThemes);
      themes.forEach(function(t) { document.body.classList.add(t); });
      updateA11yButtonStates();
    } catch (e) {
      // Silently ignore corrupted data
    }
  }
}

// ==========================================
// TEXT-TO-SPEECH (TTS)
// ==========================================

/**
 * Reads aloud the text content of the currently visible section.
 */
function lerPagina() {
  pararLeitura();
  // Find the active (visible) section
  var activeSection = document.querySelector('.section:not(.section--hidden)');
  var texto = activeSection
    ? activeSection.innerText
    : document.getElementById('main-content').innerText;
  var fala = new SpeechSynthesisUtterance(texto);
  fala.lang = 'pt-BR';
  fala.rate = 0.9;
  speechSynthesis.speak(fala);
  mostrarToast('Leitura de voz iniciada', 'info');
}

/**
 * Stops any ongoing speech synthesis.
 */
function pararLeitura() {
  if (typeof speechSynthesis !== 'undefined') {
    speechSynthesis.cancel();
  }
}

/**
 * Reads a specific text string aloud.
 * @param {string} texto - The text to speak
 */
function ouvirTexto(texto) {
  pararLeitura();
  var fala = new SpeechSynthesisUtterance(texto);
  fala.lang = 'pt-BR';
  fala.rate = 0.9;
  speechSynthesis.speak(fala);
}

// ==========================================
// ACCESSIBILITY PANEL TOGGLE
// ==========================================

/**
 * Opens or closes the floating accessibility panel.
 * Manages aria attributes and focus.
 */
function toggleAccessibilityPanel() {
  var panel = document.getElementById('a11y-panel');
  var toggle = document.getElementById('accessibility-toggle');
  if (!panel || !toggle) return;

  var isHidden = panel.getAttribute('aria-hidden') === 'true';

  panel.setAttribute('aria-hidden', String(!isHidden));
  toggle.setAttribute('aria-expanded', String(isHidden));
  toggle.setAttribute(
    'aria-label',
    isHidden ? 'Fechar painel de acessibilidade' : 'Abrir painel de acessibilidade'
  );

  if (isHidden) {
    // Focus the first interactive element inside the panel
    var firstBtn = panel.querySelector('button, [tabindex="0"]');
    if (firstBtn) setTimeout(function() { firstBtn.focus(); }, 100);
  }
}

// ==========================================
// ONBOARDING HELPERS
// ==========================================

/**
 * Activates a recommended accessibility resource from onboarding.
 * @param {string} recurso - Resource key: 'high-contrast', 'large-font', or 'screen-reader'
 */
function ativarRecurso(recurso) {
  switch (recurso) {
    case 'high-contrast':
      alternarTema('high-contrast');
      break;
    case 'large-font':
      fontSizePercent = 125;
      aplicarFonte();
      mostrarToast('Fonte aumentada para 125%', 'success');
      break;
    case 'screen-reader':
      lerPagina();
      break;
    default:
      break;
  }
}

/**
 * Closes the onboarding modal, marks it as completed in localStorage,
 * and returns focus to the main content area.
 */
function fecharOnboarding() {
  var modal = document.getElementById('modal-onboarding');
  if (modal) {
    modal.setAttribute('aria-hidden', 'true');
  }
  localStorage.setItem('em-onboarding-done', 'true');
  // Return focus to main content
  var mainContent = document.getElementById('main-content');
  if (mainContent) mainContent.focus();
}