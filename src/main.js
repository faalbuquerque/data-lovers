window.onload= function(){
    showNamesPokemon()
    selectedPokemon()
}

function getNamesPokemon(){
    return POKEMON["pokemon"]
}

function showNamesPokemon(){

    let namesPokemon= document.getElementById("names-pokemon")
    namesPokemon.innerHTML= `
    ${getNamesPokemon().map((names)=> `
        <option value="${names['id']}" class="list-pokemon">
             ${names['name']}
        </option>
    `).join("")}
   `
}


function selectedPokemon(){
    let pokemoneEl = document.getElementById("names-pokemon")
    let pokemonId = pokemoneEl.options[pokemoneEl.selectedIndex].value;
  
    let result = POKEMON['pokemon'].filter(pokemon => pokemon.id == pokemonId);

    let showPokemon = document.getElementById('get-pokemon');
    showPokemon.innerHTML = ''
    showPokemon.innerHTML += `
        ${result.map( pokemon => `
            <p>Nome: ${pokemon.name}</p>
            <img src="${pokemon.img}">
            <p> Tipo: ${pokemon.type}</p>
            <p>Altura: ${pokemon.height}</p>
            <p>Peso: ${pokemon.weight}</p>
            <p>Candy: ${pokemon.candy}</p>
            <p>Quantidade de Candys: ${pokemon.candy_count}</p>
            <p>Ovo: ${pokemon.egg}</p>
            <p>Chance de encontrar: ${pokemon.spawn_chance}</p>
            <p>AVG Spawns: ${pokemon.avg_spawns}</p>
            <p>Encontrar jogadores: ${pokemon.spawn_time}</p>
            <p>Multiplicadores: ${pokemon.multipliers}</p>
            <p>Fraquezas: ${pokemon.weaknesses}</p>
            <p>Proxima evolucao: ${pokemon.next_evolution}</p>
        `).join("")}
    `
}