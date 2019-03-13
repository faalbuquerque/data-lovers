window.onload = () => {
    
    let url = 'https://raw.githubusercontent.com/VanessaYoshida/data-lovers/master/src/data/pokemon/pokemon.json';

    let pokemonsComFetch;

    fetch(url, {
        method: 'GET'
    })
    .then(function(res) {
        if(res.ok){
            return res.json();    
        }
    })
    .then( (res) => {
        window.pokemonsComFetch = res;
        showNamesPokemon();
        selectedPokemon();
        showTypePokemon(selectType);
        showTypePokemon(selectWeaknesses);
        hideScreenNone();
        graphic();
    });
}

let getPokemons = () => {
    return pokemonsComFetch.pokemon;
}

let namesPokemon = document.querySelector("#names-pokemon");
let selectType = document.querySelector("#select-type");
let displayType = document.querySelector("#display-type");
let selectWeaknesses = document.querySelector("#select-weaknesses");
let displayWeaknesses = document.querySelector("#display-weaknesses");
let order = document.querySelector("#order");
let orderWeak = document.querySelector("#order-weak");


let getOrderedPokemonByNames = () => {
    return getPokemons().sort((a, b) => {
        if (a.name > b.name){
            return 1;
        }
        if (a.name < b.name){
            return -1;
        }
        return 0;
    });
}

let showNamesPokemon = () => {
    namesPokemon.innerHTML += `
        ${getOrderedPokemonByNames().map((pokemon) => `
            <option value="${pokemon["id"]}" class="list-pokemon">
                ${pokemon["name"]}
            </option>
        `).join("")}
    `
}

let selectedPokemon = () => {
    let showPokemon = document.querySelector("#display-name");
    namesPokemon.addEventListener("change", () => {
        selectedPokemon("name", namesPokemon, showPokemon);
    });
    let pokemonId = namesPokemon.options[namesPokemon.selectedIndex].value;
    let result = getPokemons().filter(pokemon => pokemon.id == pokemonId);
    let nextEvolution = result.map((pokemon) => {return pokemon["next_evolution"] ? pokemon["next_evolution"][0].name : "Sem evolução"});
    let multipliers = result.map((pokemon) => {return pokemon["multipliers"]===null ? "Sem multiplicadores" : pokemon["multipliers"].join(" e ")});
    let candys = result.map((pokemon) => {return pokemon["candy"]==="None" ? "Não possui candys" : pokemon["candy"]});
    let egg = result.map((pokemon) => {return pokemon["egg"]==="Not in Eggs" ? "Não aparece em ovos" : pokemon["egg"]});

    showPokemon.innerHTML= ""
    showPokemon.innerHTML+= `
        ${result.map( pokemon => `
        <div class="pokemon-names">
            <img class="poke-photo" src="${pokemon.img}">
            <h3 class="poke-name">${pokemon.name}</h3>
            <p><b>Nº Pokedex:</b> #${pokemon.num}</p>
            <p><b>Tipo:</b>${pokemon.type.join(", ")}</p>
            <p><b>Altura:</b> ${pokemon.height}</p>
            <p><b>Peso:</b> ${pokemon.weight}</p>
            <p><b>Tipo de Candy:</b> ${candys}</p>    
            ${pokemon.candy_count ? "<p><b>Quantidade de Candys: </b>" + pokemon.candy_count + "</p>" : ""}
            <p><b>Ovo:</b> ${egg}</p>
            <p><b>Chance de Spawn: </b>${pokemon.spawn_chance}</p>
            <p><b>AVG Spawns:</b> ${pokemon.avg_spawns}</p>
            <p><b>Tempo de Spawn:</b> ${pokemon.spawn_time}</p>
            <p><b>Multiplicadores:</b> ${multipliers}</p>
            <p><b>Fraquezas:</b> ${pokemon.weaknesses.join(", ")}</p>
            <p><b>Próxima evolução:</b> ${nextEvolution} </p>
        </div>
        `).join("")}
    `
}

let showTypePokemon = (category) => {
    let arrayType = [];

    getPokemons().map((pokemon) => { pokemon.type.map((type) => {
            if(!arrayType.includes(type)){
                arrayType.push(type);
            }
        })
    })
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
    sectionFilterType = selectedPokemonFrom("type", selectType, displayType);
    categorySectionFilter = "type";
    hideScreenType();
});

selectWeaknesses.addEventListener("change", () => {
    sectionFilterWeaknesses = selectedPokemonFrom("weaknesses", selectWeaknesses, displayWeaknesses);
    categorySectionFilter = "weaknesses";
    hideScreenWeaknesses();
})

let selectedPokemonFrom = (categorySelect, dataSelect, displayTag) => {
    displayTag.innerHTML = "";
    let pokemonsFromType = getPokemons().filter(
        (pokemon) => {
            let typeFilter = pokemon[categorySelect].filter(
                (type) => {
                    return type === dataSelect.value;
                }
            );
            if(typeFilter.length > 0){
                showPokemon(pokemon, displayTag);
                return true;
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
    pokemonsFound.innerHTML = pokemonsFromType.length;
    return pokemonsFromType;
    }
}

order.addEventListener("change", () => {
    enjoin();
})

orderWeak.addEventListener("change", () => {
    enjoin();
})

let enjoin = () => {
    let arrayOrder;
    if (categorySectionFilter === "type"){
        arrayOrder = orderBy(order.value, sectionFilterType);
    }
    else if (categorySectionFilter === "weaknesses"){
        arrayOrder = orderBy(orderWeak.value, sectionFilterWeaknesses);
    }
    displayType.innerHTML = "";
    displayWeaknesses.innerHTML = "";
    for (item of arrayOrder){
        if (categorySectionFilter === "type"){
            showPokemon(item, displayType);
        }
        else if (categorySectionFilter === "weaknesses"){
            showPokemon(item, displayWeaknesses);
        }
    }
}

let orderBy = (choiceOrder, section) => {
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

let showPokemon = (pokemon, tagById) => {
    let nextEvolution = pokemon["next_evolution"] ? pokemon["next_evolution"][0].name : "Sem evolução";
    let multipliers = pokemon["multipliers"]===null ? "Sem multiplicadores" : pokemon["multipliers"].join(" e ");
    let candys = pokemon["candy"]==="None" ? "Não possui candys" : pokemon["candy"];
    let egg = pokemon["egg"]==="Not in Eggs" ? "Não aparece em ovos" : pokemon["egg"];

    tagById.innerHTML += `
                <section class="pokemons-type">
                    <div class="pokemon-type">
                        <img src="${pokemon.img}" class="poke-photo" />
                        <div class="text-name">
                            <h3 class="poke-name">${pokemon.name}</h3>
                        </div>
                        <div class="text-type">
                            <p><b> Nº Pokedex:</b> #${pokemon.num}</p>
                            <p class="poke-type"><b> Tipo:</b> ${pokemon.type.join(", ")}</p>
                            <p><b>Tipo de Candy:</b> ${candys}</p>    
                            ${pokemon.candy_count ? "<p><b>Quantidade de Candys: </b>" + pokemon.candy_count + "</p>" : ""}
                            <p><b>Ovo:</b> ${egg}</p>
                            <p><b>Chance de Spawn:</b> ${pokemon.spawn_chance}</p>
                            <p><b>Multiplicadores:</b> ${multipliers}</p>
                            <p><b>Fraquezas:</b> ${pokemon.weaknesses.join(", ")}</p>
                            <p><b>Próxima evolução:</b> ${nextEvolution} </p>
                        </div>
                    </div>
                </section>
                `
}

let hideScreenNone = () => {
    let items = ["#btn-voltar", "#btn-initial", "#show-type", "#show-order-weak", "#container", "#count-type", "#count-weaknesses", "#label-names", "#label-types", "#label-weaknesses"];
    for (item of items){
        document.querySelector(item).style.display = "none";
    }
}

document.querySelector("#btn-curiosities").style.display = "block";

let btnBack = document.querySelector("#btn-voltar");
btnBack.addEventListener("click", () => {
    document.location.reload(true);
});

let btnBackInital = document.querySelector("#btn-initial");
btnBackInital.addEventListener("click", () => {
    document.location.reload(true);
});

let hidenName = document.querySelector("#section-names");
hidenName.addEventListener("change", () => {
    hideScreenName();
});

let hideScreenName = () => {
    selectType.style.display = "none";
    let items = ["#section-weaknesses", "#section-types", ".imagem-box-name", ".text-box-name", "#btn-curiosities"];
    for (item of items){
        document.querySelector(item).style.display = "none";
    }
    document.querySelector("#btn-initial").style.display = "block";
    document.querySelector("#section-names").classList.add("section-types-background");
    document.querySelector("#label-names").style.display = "block";
}

selectType.addEventListener("change", () => {
    sectionFilterType = selectedPokemonFrom("type", selectType, displayType);
    categorySectionFilter = "type";
    hideScreenType();
});

selectWeaknesses.addEventListener("change", () => {
    sectionFilterWeaknesses = selectedPokemonFrom("weaknesses", selectWeaknesses, displayWeaknesses);
    categorySectionFilter = "weaknesses";
    hideScreenWeaknesses();
});

let hideScreenType = () => {
    let items = ["#section-names", "#section-weaknesses", ".imagem-box-types", ".text-box-types", "#btn-curiosities"];
    for (item of items){
        document.querySelector(item).style.display = "none";
    }
    document.querySelector("#show-type").style.display = "block";
    document.querySelector("#btn-voltar").style.display = "block";
    document.querySelector("#btn-initial").style.display = "block";
    document.querySelector("#section-types").classList.add("section-types-background");
    document.querySelector("#count-type").style.display = "block";
    document.querySelector("#label-types").style.display = "block";
}

let hideScreenWeaknesses = () => {
    let items = ["#section-names", "#section-types", ".imagem-box-weaknesses", ".text-box-weaknesses", "#btn-curiosities"];
    for (item of items){
        document.querySelector(item).style.display = "none";
    }
    document.querySelector("#show-order-weak").style.display = "block";
    document.querySelector("#btn-voltar").style.display = "block";
    document.querySelector("#btn-initial").style.display = "block";
    document.querySelector("#section-weaknesses").classList.add("section-types-background");
    document.querySelector("#count-weaknesses").style.display = "block";
    document.querySelector("#label-weaknesses").style.display = "block";
}

let curiosities = document.querySelector(".btn-curiosities");
curiosities.addEventListener("click", () => {
    hideScreenAll();
});

let hideScreenAll = () => {
    document.querySelector("#container").style.display = "block";
    selectType.style.display = "none";
    let items = ["#section-names", "#section-types", "#section-weaknesses", ".imagem-box-name", ".imagem-box-types", ".imagem-box-weaknesses", ".text-box-name", ".text-box-types", ".text-box-weaknesses", "#btn-curiosities"];
    for (item of items){
        document.querySelector(item).style.display = "none";
    }
    document.querySelector("#btn-initial").style.display = "block";
}

let graphic = () => {
const types = [];

getPokemons().map(pokemon => pokemon.type).map(item =>
    item.forEach(type => {
      types.push(type)
    }))

const typesCount = {};

for (var i = 0; i < types.length; ++i) {
    if (!typesCount[types[i]]) {
      typesCount[types[i]] = 0;
    }
    ++typesCount[types[i]];
}

let typesPokemons = [];
typesPokemons = Object.keys(typesCount);

let countTypes = [];
countTypes = Object.values(typesCount);

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
      categories: typesPokemons,
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Quantidade'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:18px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b> {point.y}</b></td></tr>',
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
      name: 'Tipos de Pokémons',
      data: countTypes
    }]
  });
}