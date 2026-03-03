let input = null;
let pokemonAPIurl = null;
let pokemon = null;

const imgArr = ["teamImage1", "teamImage2", "teamImage3", "teamImage4"];
const selectList = ["PM1", "PM2", "PM3", "PM4"];
const lists = ["list1", "list2", "list3", "list4"];
const rows = ["row1", "row2", "row3", "row4"];

async function loadPokemonInfo(pokemonAPIurl) {
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
    if (input === "" || input < 1 || input > 151) {
        window.alert("Please enter a valid input. Either enter the name or an integer [1 to 151]");
        return;
    }
    if (input)
    pokemonAPIurl = 'https://pokeapi.co/api/v2/pokemon/' + input;
    pokemon = await loadPokemonInfo(pokemonAPIurl);
    displayPokemon(pokemon);
    pokemonSound(pokemon);
    listAllPokemonMoves(pokemon);
}

function displayPokemon(pokemon) {
    document.getElementById("pokemonImage").src = pokemon.sprites.front_default;
}

function pokemonSound(pokemon) {
    document.getElementById("pokemonAudio").src = pokemon.cries.latest;
}

function listAllPokemonMoves(pokemon) {
    let select = null;
    for (let i = 0; i < 4; i++) {
        select = document.getElementById(selectList[i]);
        select.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.textContent = "Select a move";
        defaultOption.value = "";
        select.appendChild(defaultOption);
        
        pokemon.moves.forEach(movObj => {
            const option = document.createElement("option");
            option.textContent = movObj.move.name;
            option.value = movObj.move.name;
            select.appendChild(option);
        });
    }
   
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

function getSelectedPokemonMoves() {
    let movesList = [];
    for (let i = 0; i < 4; i++) {
        const move = document.getElementById(selectList[i]).value;
        movesList.push(move);
    }
    return movesList;
}

async function addToTeam() {
    let j = 0;
    document.getElementById("teamCol").style.display = "flex";

    j = findEmptyTeamSlot();
    if (j === -1) {
        window.alert("Team is full. Max. number is four members.");
        console.log("Team is full.");
    }

    const img = document.getElementById(imgArr[j]);
    img.style.display = "inline-block";
    img.src = pokemon.sprites.front_default;

    const ul = document.getElementById(lists[j]);
    ul.innerHTML = "";

    const movesList = getSelectedPokemonMoves();
    movesList.forEach(move => {
        const li = document.createElement("li");
        li.textContent = move;
        ul.appendChild(li);
    });
    ul.style.display = "inline-block";
}