// ==========================================
// CURSOS.JS - EmpregaMais
// Módulo de cursos: renderização de cards,
// inscrição e leitura por voz
// ==========================================
// Depends on: dados.js (cursos[]), acessibilidade.js (ouvirTexto)
// Provides: carregarCursos, inscreverCurso
// ==========================================

// ==========================================
// COURSE RENDERING
// ==========================================

/**
 * Renders the courses list from the global `cursos` array
 * inside a responsive 2-column grid.
 */
function carregarCursos() {
  var lista = document.getElementById('lista-cursos');
  if (!lista) return;

  // --- Empty state ---
  if (!cursos || cursos.length === 0) {
    lista.innerHTML =
      '<div class="empty-state">' +
        '<div class="empty-state-icon">\u{1F393}</div>' +
        '<p>Nenhum curso dispon\u00edvel no momento.</p>' +
      '</div>';
    return;
  }

  // --- Modality icons ---
  var modalidadeIcons = {
    'Presencial': '\u{1F3EB}', // 🏫
    'Online': '\u{1F4BB}',     // 💻
    'H\u00edbrido': '\u{1F504}' // 🔄
  };

  // --- Build grid of cards ---
  lista.innerHTML =
    '<div class="grid grid-2">' +
    cursos.map(function(curso) {
      var icon = modalidadeIcons[curso.modalidade] || '\u{1F4DA}'; // 📚

      var acessivelBadge = curso.acessivel
        ? '<span class="badge badge-pcd">\u267F Acess\u00edvel</span>'
        : '';

      // Escape strings for onclick TTS handler
      var tituloEsc = (curso.titulo || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
      var descricaoEsc = (curso.descricao || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
      var modalidadeEsc = (curso.modalidade || 'presencial').replace(/'/g, "\\'");
      var duracaoEsc = (curso.duracao || '40 horas').replace(/'/g, "\\'");

      var ttsString =
        'Curso ' + tituloEsc + '. ' + descricaoEsc +
        '. Modalidade ' + modalidadeEsc +
        '. Dura\u00e7\u00e3o ' + duracaoEsc + '.';

      return (
        '<div class="card" role="listitem" tabindex="0" aria-label="Curso: ' + escapeHTMLCurso(curso.titulo) + '">' +
          '<div class="card-body">' +
            '<h3 style="font-size:1.125rem;font-weight:700;margin-bottom:0.75rem;">' +
              '\u{1F393} ' + escapeHTMLCurso(curso.titulo) +
            '</h3>' +
            '<p style="color:var(--text-secondary);font-size:0.875rem;margin-bottom:1rem;">' +
              escapeHTMLCurso(curso.descricao || 'Curso gratuito oferecido pela prefeitura.') +
            '</p>' +
            '<div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem;">' +
              acessivelBadge +
              '<span class="badge badge-area">' + icon + ' ' + escapeHTMLCurso(curso.modalidade || 'Presencial') + '</span>' +
              '<span class="badge badge-bairro">\u23F1 ' + escapeHTMLCurso(curso.duracao || '40 horas') + '</span>' +
            '</div>' +
            '<div style="display:flex;flex-wrap:wrap;gap:0.5rem;font-size:0.8125rem;color:var(--text-secondary);margin-bottom:1rem;">' +
              '<span>\u{1F4C5} In\u00edcio: ' + escapeHTMLCurso(curso.inicio || 'Em breve') + '</span>' +
              '<span>\u{1F465} ' + escapeHTMLCurso(String(curso.vagas_disponiveis || '?')) + ' vagas dispon\u00edveis</span>' +
            '</div>' +
            '<div style="display:flex;gap:0.75rem;flex-wrap:wrap;">' +
              '<button class="btn btn-primary btn-sm" onclick="inscreverCurso(\'' + tituloEsc + '\')">' +
                '\u2705 Inscrever-se' +
              '</button>' +
              '<button class="btn btn-outline btn-sm" onclick="ouvirTexto(\'' + ttsString + '\')"' +
                ' aria-label="Ouvir detalhes do curso ' + escapeHTMLCurso(curso.titulo) + '">' +
                '\u{1F50A} Ouvir' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('') +
    '</div>';
}

// ==========================================
// ENROLLMENT
// ==========================================

/**
 * Handles course enrollment action.
 * @param {string} titulo - Course title
 */
function inscreverCurso(titulo) {
  mostrarToast('Inscri\u00e7\u00e3o no curso "' + titulo + '" realizada com sucesso! \u{1F389}', 'success');
}

// ==========================================
// UTILITY
// ==========================================

/**
 * Local HTML-escape helper for course content.
 * @param {string} str
 * @returns {string}
 */
function escapeHTMLCurso(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}