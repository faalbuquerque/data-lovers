
var URL = 'https://vanessayoshida.github.io/data-lovers/src/data/pokemon/pokemon.json';

var pokemonsComFetch;

fetch(URL, {
    method: 'GET'
})
.then(function(res) {
    // console.log(res);
    if(res.ok){
        return res.json();    
    }
})
.then( (res) => {
//     console.log('JSON=', res);
    window.pokemonsComFetch = res;
});


// console.log('MEUS POKEMONS=', pokemonsComFetch);