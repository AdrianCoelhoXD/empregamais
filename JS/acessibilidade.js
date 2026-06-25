let tamanhoFonte = 16;

function aumentarFonte(){

tamanhoFonte += 2;

document.body.style.fontSize =
tamanhoFonte + "px";

}

function diminuirFonte(){

tamanhoFonte -= 2;

document.body.style.fontSize =
tamanhoFonte + "px";

}

function alternarContraste(){

document.body.classList.toggle(
"alto-contraste"
);

}

function lerPagina(){

const texto =
document.body.innerText;

const fala =
new SpeechSynthesisUtterance(texto);

fala.lang = "pt-BR";

speechSynthesis.speak(fala);

}
function ouvirVaga(texto){

const fala =
new SpeechSynthesisUtterance(texto);

fala.lang="pt-BR";

speechSynthesis.speak(fala);

}