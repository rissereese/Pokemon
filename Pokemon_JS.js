
function displayPokemon(currPokemon) {
    document.getElementById("pokemonImage").src = currPokemon.sprites.front_default;
}

async function findPokemonInfo() {
    // let currPokemon = null;
    let pokemon = document.getElementById("pokemonInput").value.trim().toLowerCase();
    console.log(pokemon);

    const pokemonAPIurl = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;
    console.log(pokemonAPIurl);

    fetch(pokemonAPIurl)
        .then(response =>{
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            displayPokemon(data);
            // console.log(currPokemon);
        })
        .catch(error => {
            console.error('Error ', error);
        });
    
    // let form = 'https://pokeapi.co/api/v2/pokemon-form/' + pokemon;
    // console.log("currPokemon: " + currPokemon);
    // displayPokemon(currPokemon);
}