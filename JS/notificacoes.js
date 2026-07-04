// ==========================================
// NOTIFICACOES.JS - EmpregaMais
// Módulo de notificações: renderização de
// cards com ícones, cores e leitura por voz
// ==========================================
// Depends on: dados.js (notificacoes[]), acessibilidade.js (ouvirTexto)
// Provides: carregarNotificacoes
// ==========================================

// ==========================================
// NOTIFICATION RENDERING
// ==========================================

/**
 * Renders the notifications list from the global `notificacoes` array.
 * Each card shows an icon by type, a colored left border, and
 * supports TTS for accessibility.
 */
function carregarNotificacoes() {
  var lista = document.getElementById('lista-notificacoes');
  if (!lista) return;

  // --- Empty state ---
  if (!notificacoes || notificacoes.length === 0) {
    lista.innerHTML =
      '<div class="empty-state">' +
        '<div class="empty-state-icon">\u{1F514}</div>' +
        '<p>Nenhuma notifica\u00e7\u00e3o no momento.</p>' +
      '</div>';
    return;
  }

  // --- Type → icon mapping ---
  var tipoIcons = {
    'vaga': '\u{1F4BC}',     // 💼
    'curso': '\u{1F393}',    // 🎓
    'sistema': '\u2699\uFE0F' // ⚙️
  };

  // --- Type → border color mapping ---
  var tipoColors = {
    'vaga': 'var(--emerald-500)',
    'curso': 'var(--primary-500)',
    'sistema': 'var(--slate-500)'
  };

  // --- Build card HTML ---
  lista.innerHTML = notificacoes.map(function(item) {
    var icon = tipoIcons[item.tipo] || '\u{1F514}';
    var borderColor = tipoColors[item.tipo] || 'var(--slate-300)';
    var lidaStyle = item.lida ? 'opacity:0.6;' : '';
    var novaTag = !item.lida
      ? '<span class="badge badge-pcd" style="margin-left:0.5rem;">Nova</span>'
      : '';

    // Escape text for the onclick TTS handler
    var ttsText = (item.titulo + '. ' + (item.mensagem || '')).replace(/'/g, "\\'").replace(/"/g, '&quot;');

    return (
      '<div class="card" role="listitem" style="margin-bottom:1rem;border-left:4px solid ' + borderColor + ';' + lidaStyle + '" tabindex="0">' +
        '<div class="card-body" style="display:flex;align-items:flex-start;gap:1rem;">' +
          '<span style="font-size:1.5rem;" aria-hidden="true">' + icon + '</span>' +
          '<div style="flex:1;">' +
            '<h3 style="font-weight:700;font-size:1rem;margin-bottom:0.25rem;">' +
              escapeHTMLNotif(item.titulo) + novaTag +
            '</h3>' +
            '<p style="color:var(--text-secondary);font-size:0.875rem;margin-bottom:0.5rem;">' +
              escapeHTMLNotif(item.mensagem || '') +
            '</p>' +
            '<span style="font-size:0.75rem;color:var(--slate-400);">' + escapeHTMLNotif(item.data || 'Recente') + '</span>' +
          '</div>' +
          '<button class="btn btn-sm btn-outline" onclick="ouvirTexto(\'' + ttsText + '\')"' +
            ' aria-label="Ouvir notifica\u00e7\u00e3o: ' + escapeHTMLNotif(item.titulo) + '">' +
            '\u{1F50A}' +
          '</button>' +
        '</div>' +
      '</div>'
    );
  }).join('');
}

// ==========================================
// UTILITY
// ==========================================

/**
 * Local HTML-escape helper (avoids dependency on vagas.js escapeHTML
 * which may not be loaded yet depending on script order edge cases).
 * @param {string} str
 * @returns {string}
 */
function escapeHTMLNotif(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}