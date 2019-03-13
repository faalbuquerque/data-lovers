
// var url = 'https://vanessayoshida.github.io/data-lovers/src/data/pokemon/pokemon.json';
// var url = 'https://github.com/VanessaYoshida/data-lovers/blob/master/src/data/pokemon/pokemon.json';
var url = 'https://raw.githubusercontent.com/VanessaYoshida/data-lovers/master/src/data/pokemon/pokemon.json';

var pokemonsComFetch;

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
});
