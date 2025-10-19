function favoritos() {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const root = document.getElementById("root");

    // Limpiar favoritos corruptos
    const favoritosLimpios = favoritos.filter(pokemon => 
        pokemon && (pokemon.url || (typeof pokemon === 'number') || pokemon.name)
    );
    
    if (favoritosLimpios.length !== favoritos.length) {
        localStorage.setItem("favoritos", JSON.stringify(favoritosLimpios));
        favoritos = favoritosLimpios;
    }

    if (favoritos.length === 0) {
        root.innerHTML = "<p>No hay favoritos guardados.</p>";
        return;
    }

    let listaHTML = "<div class='c-lista'>";
    
    favoritos.forEach(pokemon => {
        let id, nombre;
        
        if (pokemon && pokemon.url) {
            const urlParts = pokemon.url.split('/').filter(Boolean);
            id = urlParts[urlParts.length - 1];
            nombre = pokemon.name || 'Unknown';
        } else if (typeof pokemon === 'number') {
            id = pokemon;
            nombre = pokemones[pokemon - 1]?.name || 'Unknown';
        } else {
            return; // Saltar formato desconocido
        }

        listaHTML += `
            <div class="c-lista-pokemon poke-${id}" onclick="detalle('${id}')">
                <p>#${id}</p>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"
                     height="60" loading="lazy" alt="${nombre}">
                <p>${nombre}</p>
            </div>
        `;
    });
    
    listaHTML += "</div>";
    root.innerHTML = listaHTML;
}