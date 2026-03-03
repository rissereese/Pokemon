let input = null;
let pokemonAPIurl = null;
let pokemon = null;
const imgArr = ["teamImage1", "teamImage2", "teamImage3", "teamImage4"];
const selectedMoves = ["select1", "select2", "select3", "select4"];
const lists = ["list1", "list2", "list3", "list4"];

async function loadPokemonInfo(input, pokemonAPIurl) {
    let response = await fetch(pokemonAPIurl);
    if (!response.ok) {
        console.log("HTTP Error:", response.status);
        return;
    }
    let data = await response.json();
    return data;
}

async function findPokemonInfo(input) {
    input = document.getElementById("pokemonInput").value.trim().toLowerCase();
    pokemonAPIurl = 'https://pokeapi.co/api/v2/pokemon/' + input;
    pokemon = await loadPokemonInfo(input, pokemonAPIurl);
    displayPokemon(pokemon);
    pokemonSound(pokemon);
    pokemonMovesOptionList(pokemon);
}


function displayPokemon(pokemon) {
    document.getElementById("pokemonImage").src = pokemon.sprites.front_default;
}

function pokemonSound(pokemon) {
    document.getElementById("pokemonAudio").src = pokemon.cries.latest;
}

function pokemonMovesOptionList(pokemon) {

}

function findEmptyTeamSlot() {
    let link = "https://img.freepik.com/free-vector/camouflage-pattern-texture-pixel-gray-shades-background_1017-30109.jpg?semt=ais_rp_progressive&w=740&q=80";
    for (j = 0; j < 4; j++) {
        x = document.getElementById(imgArr[j]);
        if (x.src.includes(link)) {
            return j;
        }
    }
    return -1;
}

function getPokemonMoves() {
    let moves = [];
    for (let i = 0; i < 4; i++) {
        const move = document.getElementById(selectedMoves[i]).value;
        moves.push(move);
    }
    return moves;
}

async function addToTeam() {
    let j = 0;

    console.log("Pokemon: ", pokemon);
    j = findEmptyTeamSlot();
    if (j === -1) {
        console.log("Team is full.");
    }

    const img = document.getElementById(imgArr[j]);
    img.style.display = "block";
    img.src = pokemon.sprites.front_default;

    const ul = document.getElementById(lists[j]);
    ul.innerHTML = "";

    const moves = getPokemonMoves();
    moves.forEach(move => {
        const li = document.createElement("li");
        li.textContent = move;
        ul.appendChild(li);
    });
    ul.style.display = "block";
}