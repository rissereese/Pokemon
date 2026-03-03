let pokemon = null;
const imgArr = ["teamImage1", "teamImage2", "teamImage3", "teamImage4"];

async function loadPokemonInfo(input, pokemonAPIurl) {
    let response = await fetch(pokemonAPIurl);
    let data = await response.json();
    pokemon = data;
}

async function findPokemonInfo() {
    let input = document.getElementById("pokemonInput").value.trim().toLowerCase();
    const pokemonAPIurl = 'https://pokeapi.co/api/v2/pokemon/' + input;
    await loadPokemonInfo(input, pokemonAPIurl);
    displayPokemon(pokemon);
    pokemonSound(pokemon);
    pokemonMoves(pokemon);
}

function displayPokemon(pokemon) {
    document.getElementById("pokemonImage").src = pokemon.sprites.front_default;
}

function pokemonSound(pokemon) {
    document.getElementById("pokemonAudio").src = pokemon.cries.latest;
}

function pokemonMoves(pokemon) {
    
}

function addToTeam(x) {
    let i = 0;
    let img = document.getElementById(imgArr[0]);
    while (img.src == null || i > 4) {
        i++;
        img = document.getElementById(imgArr[i]);
    }
    img = displayPokemon(x);
}