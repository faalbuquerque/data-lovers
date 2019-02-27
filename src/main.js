let selectType = document.getElementById("select-type");
let displayType = document.getElementById("display-type");
selectType.addEventListener("change", showTypePokemon);

function showTypePokemon(){
    let type = selectType.value;
    displayType.innerHTML = "";
    for (datas in POKEMON["pokemon"]){
        for (i in POKEMON["pokemon"][datas]["type"]){
            if (type === POKEMON["pokemon"][datas]["type"][i]){
                mostrar();      
            } 
        }  
    }      
}

function mostrar(){
    displayType.innerHTML += `
    <section class="pokemons-type">
        <div class="pokemon-type">
            <img src="${POKEMON["pokemon"][datas]["img"]}" class="poke-photo" />   
            <div class="text-name">
                <h3 class="poke-name">${POKEMON["pokemon"][datas]["name"]}</h3>
            </div>
            <div class="text-type">
                <p class="poke-type"> Tipo: ${POKEMON["pokemon"][datas]["type"].join(", ")}</p>
            </div>
        </div> 
    </section>        
    `
}