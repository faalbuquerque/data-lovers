let selectType = document.getElementById("select-type");
selectType.addEventListener("change", showTypePokemon);

function getPokemons(){
    return POKEMON["pokemon"];
}

function showTypePokemon(){
    let type = selectType.value;
    console.log(type);
    let displayType = document.getElementById("display-type");
    for (datas in POKEMON["pokemon"]){
        for (i in POKEMON["pokemon"][datas]["types"]){
            if (type === POKEMON["pokemon"][datas]["types"]["Grass"]){
            displayType.innerHTML = `
            ${getPokemons().map((poke) => `
            <div class="pokemon-this-type">
                <img src="${poke["img"]}" class="poke-photo" />   
                <div class="text-name">
                    <h3 class="poke-name">${poke["name"]}</h3>
                </div>
                <div class="text-type">
                    <p class="poke-type">${poke["type"][0]}</p>
                </div>
            </div>            
            `).join("")}
            `
            }
        }
    }        
}

//     for (datas in POKEMON[pokemon]){
//         for (i in POKEMON[pokemon][datas]["types"]){
//             displayType.innerHTML = `
            
//             `           let img = createElement("img");
//             img.src = POKEMON[pokemon][datas]["types"][i]["img"];
//         }
//     }

// }