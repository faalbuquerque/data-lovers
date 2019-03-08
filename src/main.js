window.onload= function(){
    showNamesPokemon()
    selectedPokemon()
    showTypePokemon(selectType)
    showTypePokemon(selectWeaknesses)
}

let selectType = document.querySelector("#select-type")
let displayType = document.querySelector("#display-type")
let selectWeaknesses = document.querySelector("#select-weaknesses")
let displayWeaknesses = document.querySelector("#display-weaknesses")
let order = document.querySelector("#order")
let orderWeak = document.querySelector("#order-weak")

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
    let pokemoneEl= document.getElementById("names-pokemon")
    let showPokemon= document.getElementById("display-name")

    pokemoneEl.addEventListener("change", () => {
    selectedPokemon('name', pokemoneEl, showPokemon);
    });

    let pokemonId= pokemoneEl.options[pokemoneEl.selectedIndex].value;
    let result= POKEMON['pokemon'].filter(pokemon => pokemon.id == pokemonId);
    let nextEvolution = result.map((pokemon) => {return pokemon["next_evolution"] ? pokemon["next_evolution"][0].name : 'Sem evolução'});

    showPokemon.innerHTML= ''
    showPokemon.innerHTML+= `
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
            <p>Proxima evolucao: ${nextEvolution} </p>
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

order.addEventListener("change", () => {
    enjoin()
})

orderWeak.addEventListener("change", () => {
    enjoin()
})

let sectionFilterType, sectionFilterWeaknesses, categorySectionFilter;

function enjoin(){
    let arrayOrder;
    if (categorySectionFilter === "type"){
        arrayOrder = orderBy(order.value, sectionFilterType)
    }
    else if (categorySectionFilter === "weaknesses"){
        arrayOrder = orderBy(orderWeak.value, sectionFilterWeaknesses)
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
}

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

//Agrupei todas as funcoes de eventos de telas aqui:

document.querySelector("#btn-voltar").style.display = "none";

document.querySelector("#show-type").style.display = "none";
document.querySelector("#show-order-weak").style.display = "none";


let btnBack = document.getElementById("btn-voltar");
btnBack.addEventListener("click", function(){
    document.location.reload(true);
    });

let hidenName= document.querySelector("#section-names")  
hidenName.addEventListener("change", () => {
    hideScreenName();
    });

function hideScreenName(){
    selectType.style.display = "none";
    document.querySelector("#section-weaknesses").style.display = "none";
    document.querySelector("#section-types").style.display = "none";
    document.querySelector(".imagem-box-name").style.display = "none";
    document.querySelector(".text-box-name").style.display = "none";
    document.querySelector("#btn-voltar").style.display = "block";
    document.getElementById("btn-curiosities").style.display = "none";
}


selectType.addEventListener("change", () => {
    sectionFilterType = selectedPokemonFrom('type', selectType, displayType)
    categorySectionFilter = "type"
    hideScreenType()
    });

selectWeaknesses.addEventListener("change", () => {
    sectionFilterWeaknesses = selectedPokemonFrom('weaknesses', selectWeaknesses, displayWeaknesses)
    categorySectionFilter = "weaknesses"
    hideScreenWeaknesses()
})

function hideScreenType(){
    document.querySelector("#show-type").style.display = "block";
    document.querySelector("#section-names").style.display = "none";
    document.querySelector("#section-weaknesses").style.display = "none";
    document.querySelector(".imagem-box-types").style.display = "none";
    document.querySelector(".text-box-types").style.display = "none";
    document.querySelector("#btn-voltar").style.display = "block";
    document.getElementById("btn-curiosities").style.display = "none";
    
}

function hideScreenWeaknesses(){
    document.querySelector("#show-order-weak").style.display = "block";
    document.querySelector("#section-names").style.display = "none";
    document.querySelector("#section-types").style.display = "none";
    //as classes estavam com nome errado
    document.querySelector(".imagem-box-weaknesses").style.display = "none";
    document.querySelector(".text-box-weaknesses").style.display = "none";
    document.querySelector("#btn-voltar").style.display = "block";
    document.getElementById("btn-curiosities").style.display = "none";
}

document.getElementById("curiosities").style.display = "none";

//funcoes de tela da parte de curiosidades:
let curiosities = document.getElementById("btn-curiosities");
curiosities.addEventListener("click", () => {
    hideScreenAll();
    });

function hideScreenAll(){
    selectType.style.display = "none";
    document.querySelector("#section-names").style.display = "none";
    document.querySelector("#section-types").style.display = "none";
    document.querySelector("#section-weaknesses").style.display = "none";
    document.querySelector(".imagem-box-name").style.display = "none";
    document.querySelector(".imagem-box-types").style.display = "none";
    document.querySelector(".imagem-box-weaknesses").style.display = "none";
    document.querySelector(".text-box-name").style.display = "none";
    document.querySelector(".text-box-types").style.display = "none";
    document.querySelector(".text-box-weaknesses").style.display = "none";
    document.querySelector("#btn-voltar").style.display = "block";
    document.getElementById("curiosities").style.display = "block";
    document.getElementById("btn-curiosities").style.display = "none";
}