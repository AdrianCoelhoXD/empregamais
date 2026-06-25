function carregarCursos(){

    const lista =
    document.getElementById(
    "listaCursos"
    );

    lista.innerHTML = "";

    cursos.forEach(curso=>{

        lista.innerHTML += `
        <div class="card p-6 mb-4">

            <h3 class="text-xl font-black">
                🎓 ${curso.titulo}
            </h3>

            <p class="text-slate-500 mt-2">
                Curso gratuito oferecido pela prefeitura.
            </p>

            <button class="btn-primary mt-4">
                Inscrever-se
            </button>

        </div>
        `;

    });

}