//Obtenemos la API por medio de promesas

const API = "https://pokeapi.co/api/v2/pokemon?limit=30&offset=00";

const getData = (api) => {
    return fetch(api)
        .then((response) => response.json())
        .then((json) => {
            llenarDatos(json), paginacion(json);
        })

        .catch((error) => {
            console.log("error", error);
        });
};

const llenarDatos = (data) => {

    data.results.forEach((pj) => {
        const pokeURL = pj.url;
        return fetch(pokeURL)
            .then((response) => response.json())
            .then((json) => {
                card(json);
            })
            .catch((error) => {
                console.log("Error :", error);
            });
    });
};


const card = (json) => {

    let html = "";
    html += '<div class="col mt-5">';
    html += '<div class="card" style="width: 10rem;">';
    html += `<img src="${json.sprites.other.dream_world.front_default}" class="card-img-top" alt="...">`;
    html += '<div class="card-body">';
    html += `<h5 class = "card-title" >${json.name}</h5>`;
    html += `<p class="card-text">Altura :${json.height}</p>`;
    html += `<p class="card-text">Peso :${json.weight}</p>`;
    html += "</div>";
    html += "</div>";
    html += "</div>";

    document.getElementById("datosPersonajes").innerHTML = html;
}


const paginacion = (info) => {


    let html = "";
    html += `<li class="page-item ${info.previous ? "" : "disabled" }"><a class="page-link" onclick="getData('${info.previous}')">Previous</a></li>`;
    html += `<li class="page-item ${info.next ? "" : "disabled"}"><a class="page-link" onclick="getData('${info.next}')">Next</a></li>`;
    document.getElementById("paginacion").innerHTML = html;
};
//ejecuta Target data

getData(API);