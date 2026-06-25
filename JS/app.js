function mostrarTela(id){

    document
    .querySelectorAll(".tela")
    .forEach(tela=>{

        tela.classList.add("hidden");

    });

    document
    .getElementById(id)
    .classList.remove("hidden");

}

window.onload = () => {

    carregarVagas();
    carregarCursos();
    carregarNotificacoes();

    if(typeof lucide !== "undefined"){
        lucide.createIcons();
    }

    setTimeout(()=>{

        alert(
        "Bem-vindo ao EmpregaMais.\n\nDeseja ativar recursos de acessibilidade?"
        );

    },800);

};