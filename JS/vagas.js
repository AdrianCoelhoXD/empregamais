// ==========================================
// VAGAS.JS - EmpregaMais
// Módulo de vagas: filtros, busca, renderização
// de cards e candidatura
// ==========================================
// Depends on: dados.js (vagas[]), acessibilidade.js (ouvirTexto, pararLeitura)
// Provides: carregarVagas, filtrarVagas, limparFiltros, candidatar, initSearchListeners
// ==========================================

// ==========================================
// INITIALIZATION
// ==========================================

/**
 * Entry point: populates filter dropdowns and renders all vagas.
 */
function carregarVagas() {
  popularFiltros();
  renderizarVagas(vagas);
}

// ==========================================
// FILTER POPULATION
// ==========================================

/**
 * Extracts unique bairros and areas from the vagas data
 * and populates the respective <select> elements.
 */
function popularFiltros() {
  var bairros = [];
  var areas = [];

  // Collect unique values
  vagas.forEach(function(v) {
    if (v.bairro && bairros.indexOf(v.bairro) === -1) bairros.push(v.bairro);
    if (v.area && areas.indexOf(v.area) === -1) areas.push(v.area);
  });

  bairros.sort();
  areas.sort();

  var filtroBairro = document.getElementById('filtro-bairro');
  var filtroArea = document.getElementById('filtro-area');

  if (filtroBairro) {
    filtroBairro.innerHTML = '<option value="">\u{1F4CD} Todos os bairros</option>';
    bairros.forEach(function(b) {
      filtroBairro.innerHTML += '<option value="' + b + '">' + b + '</option>';
    });
  }

  if (filtroArea) {
    filtroArea.innerHTML = '<option value="">\u{1F4BC} Todas as \u00e1reas</option>';
    areas.forEach(function(a) {
      filtroArea.innerHTML += '<option value="' + a + '">' + a + '</option>';
    });
  }
}

// ==========================================
// FILTERING LOGIC
// ==========================================

/**
 * Reads all filter inputs and renders the matching subset of vagas.
 */
function filtrarVagas() {
  var busca = (document.getElementById('search-vagas')?.value || '').toLowerCase().trim();
  var bairro = document.getElementById('filtro-bairro')?.value || '';
  var area = document.getElementById('filtro-area')?.value || '';
  var tipo = document.getElementById('filtro-tipo')?.value || '';
  var apenasEqualPCD = document.getElementById('filtro-pcd')?.checked || false;

  var resultado = vagas.filter(function(v) {
    // Text search across multiple fields
    if (busca) {
      var searchFields = (v.cargo + ' ' + v.empresa + ' ' + v.area + ' ' + v.bairro + ' ' + (v.descricao || '')).toLowerCase();
      if (searchFields.indexOf(busca) === -1) return false;
    }
    // Dropdown / checkbox filters
    if (bairro && v.bairro !== bairro) return false;
    if (area && v.area !== area) return false;
    if (tipo && v.tipo !== tipo) return false;
    if (apenasEqualPCD && !v.pcd) return false;
    return true;
  });

  renderizarVagas(resultado);
}

/**
 * Resets all filter inputs to their default values and re-renders all vagas.
 */
function limparFiltros() {
  var searchInput = document.getElementById('search-vagas');
  var filtroBairro = document.getElementById('filtro-bairro');
  var filtroArea = document.getElementById('filtro-area');
  var filtroTipo = document.getElementById('filtro-tipo');
  var filtroPcd = document.getElementById('filtro-pcd');

  if (searchInput) searchInput.value = '';
  if (filtroBairro) filtroBairro.value = '';
  if (filtroArea) filtroArea.value = '';
  if (filtroTipo) filtroTipo.value = '';
  if (filtroPcd) filtroPcd.checked = false;

  renderizarVagas(vagas);
  mostrarToast('Filtros limpos', 'info');
}

// ==========================================
// CARD RENDERING
// ==========================================

/**
 * Renders a list of vaga objects as accessible cards into the DOM.
 * @param {Array} lista - Array of vaga objects to render
 */
function renderizarVagas(lista) {
  var container = document.getElementById('lista-vagas');
  var countEl = document.getElementById('vagas-count');

  if (!container) return;

  // --- Empty state ---
  if (lista.length === 0) {
    container.innerHTML =
      '<div class="empty-state">' +
        '<div class="empty-state-icon">\u{1F50D}</div>' +
        '<p>Nenhuma vaga encontrada com esses filtros.</p>' +
        '<button class="btn btn-outline" onclick="limparFiltros()" style="margin-top:1rem;">Limpar filtros</button>' +
      '</div>';
    if (countEl) countEl.textContent = 'Nenhuma vaga encontrada';
    return;
  }

  // --- Count label ---
  if (countEl) {
    countEl.textContent =
      lista.length + ' vaga' + (lista.length !== 1 ? 's' : '') +
      ' encontrada' + (lista.length !== 1 ? 's' : '');
  }

  // --- Build cards ---
  container.innerHTML = lista.map(function(vaga) {
    var badgePcd = vaga.pcd ? '<span class="badge badge-pcd">\u267F PCD</span>' : '';
    var badgeTipo = vaga.tipo ? '<span class="badge badge-tipo">' + escapeHTML(vaga.tipo) + '</span>' : '';
    var badgeArea = '<span class="badge badge-area">' + escapeHTML(vaga.area) + '</span>';
    var badgeSalario = vaga.salario ? '<span class="badge badge-salario">' + escapeHTML(vaga.salario) + '</span>' : '';

    // Requisitos list
    var requisitosHTML = '';
    if (vaga.requisitos && vaga.requisitos.length > 0) {
      requisitosHTML =
        '<div class="card-vaga-info">' +
          '<strong style="font-size:0.8125rem;color:var(--text-primary);">Requisitos:</strong>' +
          vaga.requisitos.map(function(r) {
            return '<span class="card-vaga-info-item">\u2022 ' + escapeHTML(r) + '</span>';
          }).join('') +
        '</div>';
    }

    // Accessibility features (only for PCD vacancies)
    var acessibilidadeHTML = '';
    if (vaga.acessibilidade && vaga.acessibilidade.length > 0 && vaga.pcd) {
      acessibilidadeHTML =
        '<div class="card-vaga-info" style="margin-top:0.5rem;">' +
          '<strong style="font-size:0.8125rem;color:var(--emerald-700);">\u267F Acessibilidade:</strong>' +
          vaga.acessibilidade.map(function(a) {
            return '<span class="card-vaga-info-item" style="color:var(--emerald-600);">\u2713 ' + escapeHTML(a) + '</span>';
          }).join('') +
        '</div>';
    }

    // Build TTS description string (escaped for onclick attribute)
    var ttsText = vaga.cargo + ' na empresa ' + vaga.empresa + '. Bairro ' + vaga.bairro +
      '. \u00c1rea ' + vaga.area + '. Tipo ' + vaga.tipo + '. Sal\u00e1rio ' + (vaga.salario || 'a combinar') +
      '. ' + (vaga.descricao || '');
    var ttsTextEscaped = ttsText.replace(/'/g, "\\'").replace(/"/g, '&quot;');
    var cargoEscaped = vaga.cargo.replace(/'/g, "\\'").replace(/"/g, '&quot;');

    return (
      '<div class="card card-vaga" role="listitem" tabindex="0" aria-label="Vaga: ' + escapeHTML(vaga.cargo) + ' em ' + escapeHTML(vaga.empresa) + '">' +
        '<div class="card-body">' +
          '<div class="card-vaga-header">' +
            '<h3 class="card-vaga-title">' + escapeHTML(vaga.cargo) + '</h3>' +
            '<span class="badge badge-bairro">\u{1F4CD} ' + escapeHTML(vaga.bairro) + '</span>' +
          '</div>' +
          '<div class="card-vaga-badges">' +
            badgePcd + badgeTipo + badgeArea + badgeSalario +
          '</div>' +
          '<div class="card-vaga-info">' +
            '<span class="card-vaga-info-item">\u{1F3E2} ' + escapeHTML(vaga.empresa) + '</span>' +
            '<span class="card-vaga-info-item">\u{1F4C5} ' + escapeHTML(vaga.publicada || 'Recente') + '</span>' +
          '</div>' +
          '<p style="color:var(--text-secondary);font-size:0.875rem;margin:0.75rem 0;">' + escapeHTML(vaga.descricao || '') + '</p>' +
          requisitosHTML +
          acessibilidadeHTML +
          '<div class="card-vaga-actions">' +
            '<button class="btn btn-primary" onclick="candidatar(\'' + cargoEscaped + '\')" aria-label="Candidatar-se para ' + escapeHTML(vaga.cargo) + '">' +
              '\u2705 Candidatar-se' +
            '</button>' +
            '<button class="btn btn-outline btn-sm" onclick="ouvirTexto(\'' + ttsTextEscaped + '\')" aria-label="Ouvir descri\u00e7\u00e3o da vaga ' + escapeHTML(vaga.cargo) + '">' +
              '\u{1F50A} Ouvir' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }).join('');
}

// ==========================================
// APPLICATION / CANDIDATURA
// ==========================================

/**
 * Handles the "apply to job" action.
 * Requires a saved profile; redirects to profile page if missing.
 * @param {string} cargo - Job title
 */
function candidatar(cargo) {
  // Ensure the user has a saved profile first
  var perfil = localStorage.getItem('em-perfil');
  if (!perfil) {
    mostrarToast('Crie seu perfil antes de se candidatar!', 'warning');
    setTimeout(function() { mostrarTela('perfil'); }, 1500);
    return;
  }

  // Salvar a candidatura no localStorage
  var candidaturas = JSON.parse(localStorage.getItem('em-candidaturas') || '[]');
  if (candidaturas.indexOf(cargo) === -1) {
    candidaturas.push(cargo);
    localStorage.setItem('em-candidaturas', JSON.stringify(candidaturas));
  }

  mostrarToast('Candidatura para "' + cargo + '" enviada com sucesso! \u{1F389}', 'success');
  
  // Atualizar a lista de candidaturas no perfil se a função existir
  if (typeof renderizarCandidaturas === 'function') {
    renderizarCandidaturas();
  }
}

// ==========================================
// SEARCH LISTENERS (DEBOUNCED)
// ==========================================

var searchTimeout;

/**
 * Attaches event listeners for live search (debounced) and
 * instant filtering on select/checkbox changes.
 */
function initSearchListeners() {
  var searchInput = document.getElementById('search-vagas');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(filtrarVagas, 300);
    });
  }

  // Auto-filter on dropdown / checkbox change
  ['filtro-bairro', 'filtro-area', 'filtro-tipo', 'filtro-pcd'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', filtrarVagas);
    }
  });
}

// ==========================================
// UTILITY
// ==========================================

/**
 * Escapes HTML special characters to prevent XSS in rendered cards.
 * @param {string} str - Raw string
 * @returns {string} Escaped string safe for innerHTML
 */
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}