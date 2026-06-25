function carregarNotificacoes(){

    const lista =
    document.getElementById(
    "listaNotificacoes"
    );

    lista.innerHTML = "";

    notificacoes.forEach(item=>{

        lista.innerHTML += `
        <div class="card p-5 mb-4">

            <h3 class="font-bold">
                🔔 ${item.titulo}
            </h3>

            <p class="text-sm text-slate-500">
                Recebida hoje
            </p>

        </div>
        `;

    });

}