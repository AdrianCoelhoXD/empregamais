document
.getElementById("formPerfil")
?.addEventListener(
"submit",
function(e){

e.preventDefault();

const perfil = {

nome:nome.value,
cpf:cpf.value,
telefone:telefone.value,
email:email.value,
deficiencia:deficiencia.value,
experiencia:experiencia.value

};

localStorage.setItem(
"perfil",
JSON.stringify(perfil)
);

alert(
"Perfil salvo!"
);

}
);

function gravarVoz(){

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(!SpeechRecognition){

alert(
"Navegador não suporta."
);

return;

}

const reconhecimento =
new SpeechRecognition();

reconhecimento.lang = "pt-BR";

reconhecimento.start();

reconhecimento.onresult =
function(e){

document
.getElementById(
"experiencia"
).value +=
e.results[0][0].transcript;

};

}