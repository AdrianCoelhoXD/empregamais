function carregarVagas(){

    const lista =
    document.getElementById(
    "listaVagas"
    );

    lista.innerHTML = "";

    vagas.forEach(vaga=>{

        lista.innerHTML += `
        <div class="card p-6 mb-5">

            <h3 class="text-2xl font-black">
                ${vaga.cargo}
            </h3>

            <p class="mt-2">
                🏢 ${vaga.empresa}
            </p>

            <p>
                📍 ${vaga.bairro}
            </p>

            <p>
                💼 ${vaga.area}
            </p>

            <div class="mt-5 flex flex-wrap gap-3">

                <button
                class="btn-primary"
                onclick="candidatar('${vaga.cargo}')">

                    Quero me candidatar

                </button>

                <button
                class="bg-slate-200 px-5 py-3 rounded-xl"
                onclick="ouvirVaga('${vaga.cargo}')">

                    🔊 Ouvir vaga

                </button>

            </div>

        </div>
        `;

    });

}

function candidatar(cargo){

    alert(
    `Candidatura enviada para ${cargo}`
    );

}

function filtrarVagas(){

    carregarVagas();

}