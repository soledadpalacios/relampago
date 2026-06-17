let preguntas = [];
let preguntasRestantes = [];
let preguntaActual = null;

const audio = document.getElementById("audioPregunta");
const formulario = document.getElementById("formPregunta");
const mensaje = document.getElementById("mensaje");
const progreso = document.getElementById("progreso");
const btnResponder = document.getElementById("btnResponder");
const btnSiguiente = document.getElementById("btnSiguiente");

let totalPreguntas = 0;
let numeroPregunta = 0;

async function iniciar() {

    const respuesta = await fetch("preguntas.json");

    preguntas = await respuesta.json();

    preguntasRestantes = [...preguntas];

    totalPreguntas = preguntas.length;

    cargarPregunta();
}

function cargarPregunta() {

    mensaje.innerHTML = "";
    mensaje.className = "";

    btnSiguiente.style.display = "none";

    if (preguntasRestantes.length === 0) {

        document.querySelector(".contenedor").innerHTML = `
            <h1>🎉 ¡Terminaste!</h1>
            <p>Ya respondiste todos los audios.</p>
        `;

        return;
    }

    numeroPregunta++;

    progreso.textContent =
        `Pregunta ${numeroPregunta} de ${totalPreguntas}`;

    const indice =
        Math.floor(Math.random() * preguntasRestantes.length);

    preguntaActual = preguntasRestantes[indice];

    preguntasRestantes.splice(indice, 1);

    audio.src = preguntaActual.audio;

    formulario.innerHTML = "";

    preguntaActual.opciones.forEach((opcion, index) => {

        formulario.innerHTML += `
            <label class="opcion">
                <input
                    type="radio"
                    name="respuesta"
                    value="${opcion}">
                ${opcion}
            </label>
        `;
    });

}

btnResponder.addEventListener("click", () => {

    const seleccionada = document.querySelector(
        'input[name="respuesta"]:checked'
    );

    if (!seleccionada) {

        alert("Seleccioná una respuesta");

        return;
    }

    if (seleccionada.value === preguntaActual.correcta) {

        mensaje.innerHTML = "✅ ¡Correcto!";
        mensaje.className = "correcto";

    } else {

        mensaje.innerHTML = "❌ Incorrecto";
        mensaje.className = "incorrecto";

    }

    btnSiguiente.style.display = "inline-block";

});

btnSiguiente.addEventListener("click", () => {

    cargarPregunta();

});

iniciar();
