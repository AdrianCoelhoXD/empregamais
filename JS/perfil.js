// ==========================================
// PERFIL.JS - EmpregaMais
// Módulo de perfil: formulário, validação,
// máscaras, gravação por voz, persistência
// ==========================================
// Depends on: acessibilidade.js (mostrarToast via app.js)
// Provides: initPerfil, carregarPerfil, gravarVoz
// ==========================================

// ==========================================
// INITIALIZATION
// ==========================================

/**
 * Initializes the profile form: submit handler, input masks,
 * and loads any previously saved profile data.
 */
function initPerfil() {
  var form = document.getElementById('form-perfil');
  if (!form) return;

  // ------------------------------------------
  // Form submission with validation
  // ------------------------------------------
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var nome = document.getElementById('campo-nome');
    var cpf = document.getElementById('campo-cpf');
    var telefone = document.getElementById('campo-telefone');
    var email = document.getElementById('campo-email');
    var deficiencia = document.getElementById('campo-deficiencia');
    var experiencia = document.getElementById('campo-experiencia');

    // Clear previous error highlights
    form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function(el) {
      el.style.borderColor = '';
    });

    var valid = true;

    if (!nome || !nome.value.trim()) {
      if (nome) nome.style.borderColor = 'var(--error)';
      valid = false;
    }
    if (!cpf || !cpf.value.trim()) {
      if (cpf) cpf.style.borderColor = 'var(--error)';
      valid = false;
    }
    if (!telefone || !telefone.value.trim()) {
      if (telefone) telefone.style.borderColor = 'var(--error)';
      valid = false;
    }
    if (!email || !email.value.trim() || !email.value.includes('@')) {
      if (email) email.style.borderColor = 'var(--error)';
      valid = false;
    }

    if (!valid) {
      mostrarToast('Preencha todos os campos obrigatórios', 'error');
      // Focus the first invalid field for accessibility
      var firstInvalid = form.querySelector('[style*="border-color"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Build profile object and persist
    var perfil = {
      nome: nome.value.trim(),
      cpf: cpf.value.trim(),
      telefone: telefone.value.trim(),
      email: email.value.trim(),
      deficiencia: deficiencia ? deficiencia.value : 'Nenhuma',
      experiencia: experiencia ? experiencia.value.trim() : '',
      salvoEm: new Date().toISOString()
    };

    localStorage.setItem('em-perfil', JSON.stringify(perfil));
    mostrarToast('Perfil salvo com sucesso! \u2705', 'success');
  });

  // ------------------------------------------
  // CPF mask: 000.000.000-00
  // ------------------------------------------
  var cpfInput = document.getElementById('campo-cpf');
  if (cpfInput) {
    cpfInput.addEventListener('input', function(e) {
      var v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 9) {
        v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
      } else if (v.length > 6) {
        v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
      } else if (v.length > 3) {
        v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
      }
      e.target.value = v;
    });
  }

  // ------------------------------------------
  // Phone mask: (00) 00000-0000
  // ------------------------------------------
  var telInput = document.getElementById('campo-telefone');
  if (telInput) {
    telInput.addEventListener('input', function(e) {
      var v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 6) {
        v = v.replace(/(\d{2})(\d{4,5})(\d{1,4})/, '($1) $2-$3');
      } else if (v.length > 2) {
        v = v.replace(/(\d{2})(\d{1,5})/, '($1) $2');
      }
      e.target.value = v;
    });
  }

  // Load any previously saved profile
  carregarPerfil();
  
  // Mostrar as candidaturas do usuário
  if (typeof renderizarCandidaturas === 'function') {
    renderizarCandidaturas();
  }
}

// ==========================================
// PROFILE LOADING
// ==========================================

/**
 * Loads a previously saved profile from localStorage
 * and populates the form fields.
 */
function carregarPerfil() {
  var saved = localStorage.getItem('em-perfil');
  if (!saved) {
    // No saved profile – nothing to do (skip toast to avoid noise on first visit)
    return;
  }

  try {
    var perfil = JSON.parse(saved);
    var nome = document.getElementById('campo-nome');
    var cpf = document.getElementById('campo-cpf');
    var telefone = document.getElementById('campo-telefone');
    var email = document.getElementById('campo-email');
    var deficiencia = document.getElementById('campo-deficiencia');
    var experiencia = document.getElementById('campo-experiencia');

    if (nome) nome.value = perfil.nome || '';
    if (cpf) cpf.value = perfil.cpf || '';
    if (telefone) telefone.value = perfil.telefone || '';
    if (email) email.value = perfil.email || '';
    if (deficiencia) deficiencia.value = perfil.deficiencia || 'Nenhuma';
    if (experiencia) experiencia.value = perfil.experiencia || '';

    mostrarToast('Perfil carregado com sucesso', 'success');
  } catch (e) {
    mostrarToast('Erro ao carregar perfil', 'error');
  }
}

// ==========================================
// VOICE RECORDING (SPEECH-TO-TEXT)
// ==========================================

/**
 * Uses the Web Speech API to record the user's voice
 * and append the transcribed text to the experience field.
 */
function gravarVoz() {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var statusEl = document.getElementById('gravacao-status');

  if (!SpeechRecognition) {
    mostrarToast('Seu navegador não suporta gravação por voz. Tente usar o Google Chrome.', 'error');
    return;
  }

  var reconhecimento = new SpeechRecognition();
  reconhecimento.lang = 'pt-BR';
  reconhecimento.continuous = false;
  reconhecimento.interimResults = false;

  mostrarToast('\u{1F3A4} Gravando... Fale agora!', 'info');
  if (statusEl) statusEl.textContent = 'Gravando. Fale agora.';

  reconhecimento.start();

  reconhecimento.onresult = function(e) {
    var texto = e.results[0][0].transcript;
    var experiencia = document.getElementById('campo-experiencia');
    if (experiencia) {
      experiencia.value += (experiencia.value ? ' ' : '') + texto;
    }
    mostrarToast('Texto adicionado com sucesso!', 'success');
    if (statusEl) statusEl.textContent = 'Gravação concluída.';
  };

  reconhecimento.onerror = function(e) {
    mostrarToast('Erro na gravação: ' + e.error, 'error');
    if (statusEl) statusEl.textContent = 'Erro na gravação.';
  };

  reconhecimento.onend = function() {
    if (statusEl) statusEl.textContent = '';
  };
}

// ==========================================
// CANDIDATURAS
// ==========================================

function renderizarCandidaturas() {
  var container = document.getElementById('lista-candidaturas');
  if (!container) return;

  var candidaturas = JSON.parse(localStorage.getItem('em-candidaturas') || '[]');
  
  if (candidaturas.length === 0) {
    container.innerHTML = '<p style="color:var(--text-secondary);">Você ainda não se candidatou a nenhuma vaga.</p>';
    return;
  }

  container.innerHTML = candidaturas.map(function(cargo) {
    return (
      '<div class="card" style="padding:1rem;">' +
        '<h4 style="font-weight:bold;margin-bottom:0.5rem;">' + cargo + '</h4>' +
        '<span class="badge badge-success" style="background:#d1fae5;color:#065f46;padding:4px 8px;border-radius:4px;font-size:12px;">\u2714 Candidatura Enviada</span>' +
      '</div>'
    );
  }).join('');
}