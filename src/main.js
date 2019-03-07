window.onload= function(){
    showNamesPokemon()
    selectedPokemon()
    showTypePokemon(selectType)
    showTypePokemon(selectWeaknesses)
}

//Parte do codigo para esconder as telas de acordo com o select, falta fazer os botoes!
let selectType = document.querySelector("#select-type")
let displayType = document.querySelector("#display-type")
let selectWeaknesses = document.querySelector("#select-weaknesses")
let displayWeaknesses = document.querySelector("#display-weaknesses")
let order = document.querySelector("#order")
document.querySelector("#btn-exit-name").style.display = "none"

function hideScreenName(){
    document.querySelector("#section-types").style.display = "none"
    document.querySelector("#section-weaknesses").style.display = "none"
    document.querySelector(".imagem-box").style.display = "none"
    document.querySelector(".text-select-box").style.display = "none"
    document.querySelector("#btn-exit-name").style.display = "block"
}

function hideScreenType(){
    document.querySelector("#show-type").classList.remove("hide")
    document.querySelector("#order").classList.remove("hide")
    document.querySelector("#img-type").classList.add("hide")   
    document.querySelector("#text-type").classList.add("hide") 
    document.querySelector("#section-names").classList.add("hide") 
    document.querySelector("#section-weaknesses").classList.add("hide")   
}

function hideScreenWeaknesses(){
    document.querySelector("#section-names").style.display = "none"
    document.querySelector("#section-types").style.display = "none"
    document.querySelector("#img-weaknesses").classList.add("hide")   
    document.querySelector("#text-weaknesses").classList.add("hide") 
}
//Acaba aqui


function getOrderedPokemonByNames(){
    return POKEMON.pokemon.sort((a, b) => {
        if (a.name > b.name){
            return 1;
        }
        if (a.name < b.name){
            return -1;
        }
        return 0;
    });
}

function showNamesPokemon(){
    let namesPokemon= document.querySelector("#names-pokemon")

    namesPokemon.innerHTML += `
    ${getOrderedPokemonByNames().map((pokemon)=> `
        <option value="${pokemon['id']}" class="list-pokemon">
             ${pokemon['name']}

        </option>
    `).join("")}
   `
}

function selectedPokemon(){
    let pokemoneEl = document.querySelector("#names-pokemon")
    let pokemonId = pokemoneEl.options[pokemoneEl.selectedIndex].value
  
    let result = POKEMON['pokemon'].filter(pokemon => pokemon.id == pokemonId)

    let nextEvolution = POKEMON.pokemon["next_evolution"] ? POKEMON.pokemon["next_evolution"][0].name : 'Sem evolução'
    
    let showPokemon = document.querySelector("#display-name")
    showPokemon.innerHTML = ''
    showPokemon.innerHTML += `
        ${result.map( pokemon => `
            <img src="${pokemon.img}">
            <p>Nome: ${pokemon.name}</p>
            <p>Nº Pokedex: #${pokemon.num}</p>
            <p>Tipo: ${pokemon.type}</p>
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
            <p>Proxima evolucao: ${nextEvolution}</p>
        `).join("")}
        `
}

let arrayType = [];

POKEMON.pokemon.map((pokemon) => {
    pokemon.type.map((type) => {
        if(!arrayType.includes(type)){
            arrayType.push(type);
        }
    })
})

function showTypePokemon(category){
    for(i in arrayType){
        category.innerHTML += `
            <option value="${arrayType[i]}" class="list-pokemon">
             ${arrayType[i]}
            </option>    
        `
    }
}

var sectionFilterType, sectionFilterWeaknesses, categorySectionFilter;


selectType.addEventListener("change", () => {
sectionFilterType = selectedPokemonFrom('type', selectType, displayType)
categorySectionFilter = "type"
hideScreenType()
});

selectWeaknesses.addEventListener("change", () => {
    sectionFilterWeaknesses = selectedPokemonFrom('weaknesses', selectWeaknesses, displayWeaknesses)
    categorySectionFilter = "weaknesses"
})

function selectedPokemonFrom(categorySelect, dataSelect, displayTag){
    displayTag.innerHTML = ""
    let pokemonsFromType = POKEMON.pokemon.filter(
        (pokemon) => {
            let typeFilter = pokemon[categorySelect].filter(
                (type) => {
                    return type === dataSelect.value
                }
            );
            if(typeFilter.length > 0){
                showPokemon(pokemon, displayTag)
                return true
            }
        }
    );
    if (pokemonsFromType.length === 0) {
        displayTag.innerHTML += `
        <p> Nenhum pokémon encontrado </p>
        `
    }
    return pokemonsFromType;
}


function showPokemon(pokemon, tagById){
    let nextEvolution = pokemon["next_evolution"] ? pokemon["next_evolution"][0].name : 'Sem evolução'

    tagById.innerHTML += `
                <section class="pokemons-type">
                    <div class="pokemon-type">
                        <img src="${pokemon.img}" class="poke-photo" />   
                        <div class="text-name">
                            <h3 class="poke-name">${pokemon.name}</h3>
                        </div>
                        <div class="text-type">
                            <p> Nº Pokedex: #${pokemon.num}</p>
                            <p class="poke-type"> Tipo: ${pokemon.type.join(", ")}</p>
                            <p> Qtd de Candys para evoluir: ${pokemon.candy_count}</p>
                            <p>Chance de encontrar: ${pokemon.spawn_chance}</p>
                            <p> Fraquezas: ${pokemon.weaknesses.join(", ")}</p>
                            <p> Próxima(s) Evolução(ões): ${nextEvolution}</p>
                        </div>
                    </div> 
                </section>        
                `
}

order.addEventListener("change", () => {
    let arrayOrder;
    if (categorySectionFilter === "type"){
        arrayOrder = orderBy(order.value, sectionFilterType)
    }
    else if (categorySectionFilter === "weaknesses"){
        arrayOrder = orderBy(order.value, sectionFilterWeaknesses)
    }
    displayType.innerHTML = ""
    displayWeaknesses.innerHTML = ""
    for (item of arrayOrder){
        if (categorySectionFilter === "type"){
            showPokemon(item, displayType)
        }
        else if (categorySectionFilter === "weaknesses"){
            showPokemon(item, displayWeaknesses)
        }
    }
    });

function orderBy(choiceOrder, section){
    let choice = choiceOrder;

    if (choice === "name-A-Z"){
        return section.sort((a, b) => {
            if (a.name > b.name){
                return 1;
            }
            if (a.name < b.name){
                return -1;
            }
            return 0;
        });
    }
    else if (choice === "name-Z-A"){
        return section.sort((a, b) => {
            if (a.name < b.name){
                return 1;
            }
            if (a.name > b.name){
                return -1;
            }
            return 0;
        });
    }
    else if (choice === "id"){
        return section.sort((a, b) => {
        if (a.id > b.id){
            return 1;
        }
        if (a.id < b.id){
            return -1;
        }
        return 0;
    });
    }
}

let btnBack = document.querySelector("#btn-exit-name")
btnBack.addEventListener("click", function(){
    document.location.reload(true)
    });



