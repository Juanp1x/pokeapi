async function conexion(Unfiltro) {   // ← faltaba async
    if (Unfiltro == "All") {
        // si quiero todos los pokemones
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokes}`);
        const data = await res.json();
        return data.results;
    } else {
        // los quiero por tipo
        const res = await fetch(`https://pokeapi.co/api/v2/type/${Unfiltro}`);
        const data = await res.json();
        const pokemonesTipo = [];
        for (let i = 0; i < data.pokemon.length; i++) {
            pokemonesTipo.push(data.pokemon[i].pokemon);
        }
        return pokemonesTipo;
    }
}

let pokemones = [];
let totalPokes = 1025;

async function conexionLista() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokes}`);
    const data = await res.json();
    return data.results;
}

async function General() {
    if (pokemones.length === 0) {
        pokemones = await conexion("All");
    }
    
    Home();
    console.log(pokemones[2].name);
}


async function FiltroConexion(filtroelegido) {   // ← faltaba async
    let pokesfiltrados = await conexion(filtroelegido);  // ← faltaba let
    document.getElementById("la-lista").innerHTML = "";
    let listaFiltro = GenerarLista(pokesfiltrados);      // ← faltaba let
    document.getElementById("la-lista").innerHTML = listaFiltro;
}
