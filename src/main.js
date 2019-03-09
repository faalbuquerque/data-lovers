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

let sectionFilterType, sectionFilterWeaknesses, categorySectionFilter;


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
    else if (pokemonsFromType.length > 0){
    let pokemonsFound = document.querySelector("#pokemons-found-" + categorySelect);
    pokemonsFound.innerHTML = pokemonsFromType.length
    return pokemonsFromType;
    }
}

order.addEventListener("change", () => {
    enjoin()
})

orderWeak.addEventListener("change", () => {
    enjoin()
})

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
    document.getElementById("section-types").classList.add("section-types2");
    
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

//Logica do grafico

const types = []

POKEMON.pokemon.map(pokemon => pokemon.type).map(item =>
    item.forEach(type => {
      types.push(type)
    }))

const typesCount = {}


for (var i = 0; i < types.length; ++i) {
   
    if (!typesCount[types[i]]) {
      typesCount[types[i]] = 0;
    }
  
    ++typesCount[types[i]];
    
  }
  
  
  const displayMedia = document.querySelector("#display-media")
  
  Object.keys(typesCount).forEach(key => {
    displayMedia.innerHTML += `<p>${key}: ${typesCount[key]}</p>`
  });

// codigo do grafico
Highcharts.chart('container', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Qual Tipo tem mais pokémons'
    },
    subtitle: {
      text: 'Dados dos 151 pokemóns da Região de Kanto'
    },
    xAxis: {
      categories: arrayType,
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Quantidade'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Tokyo',
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    }]
  });