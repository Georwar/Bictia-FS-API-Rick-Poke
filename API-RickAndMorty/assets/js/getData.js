//Obtenemos la API por medio de promesas

const API = "https://rickandmortyapi.com/api/character";

const getData = (api) => {
    return fetch(api)
        .then((response) => response.json())
        .then((json) => {
            llenarDatos(json), paginacion(json.info);
        })

        .catch((error) => {
            console.log("error", error);
        });
};

const llenarDatos = (data) => {
    let html = "";

    data.results.forEach((pj) => {
        html += ' <div class="col"';
        html += '<div class = "card" style = "width: 10rem;" > ';
        html += ` <img src="${pj.image}" class="card-img-top" alt="...">`;
        html += '<div class="card-body">';
        html += ` <h5 class="card-title">${pj.name}</h5>`;
        html += `<p class="card-text">Estatus: ${pj.status}</p>`;
        html += `<p class="card-text">Especie: ${pj.species}</p>`;
        html += `<p class="card-text">Genero: ${pj.gender}</p>`;
        html += "</div>";
        html += "</div>";
        html += "</div>";
    });

    document.getElementById("datosPersonajes").innerHTML = html;
};

const paginacion = (data) => {
    let prevDisable = "";
    let nextDisable = "";

    if (data.prev == null) {
        prevDisable = "disabled"
    }

    if (data.next == null) {
        nextDisable = "disabled"
    }



    let html = "";
    html += `<li class="page-item ${prevDisable}"><a class="page-link " onclick="getData('${data.prev}')">Previous</a></li>`;
    html += `<li class="page-item ${nextDisable}"><a class="page-link " onclick="getData('${data.next}')">Next</a></li>`;

    document.getElementById("paginacion").innerHTML = html;
};

//ejecuta Target data

getData(API);