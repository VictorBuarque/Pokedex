//Creating variables to call functions and methods
const pokemonList = document.getElementById('pokemonList');
const nextButton = document.getElementById('next');
const backButton = document.getElementById('back');
const limit = 1
let offset = 0;
const maxRecords = 151  
const minRecords = -20

function loadAbilities(offset, limit){
    // Convert the structure into HTML <li>
    function convertPokemonLi(pokemon) {
        return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
                    
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            <div class="description">
                <h3>Habilidades:</h3>
                <ol class="ability">
                    ${pokemon.abilities.map((ability) => `<li class="type ${ability}">${ability}</li>`).join(' ')}
                </ol>
            </div>
        </li>
        `;
    }
    //Calling pokeApi getPokemon()
    pokeApi.getPokemons(offset, limit).then(( pokemons = [] ) => {
        //Edit HTTP, Transform pokemons results in <li> in HTML and Concatenate this string with a empty space
        pokemonList.innerHTML += pokemons.map(convertPokemonLi).join(''); //need empty string
        }); 
    }
loadAbilities(offset, limit);

nextButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecords = offset +limit;
    if(qtdRecords >= maxRecords){ //Hidden Button if reach condition
        const newLimit = maxRecords - offset;
        loadAbilities(offset, newLimit);
        nextButton.style.display = 'none';
    } else {
        loadAbilities(offset, limit);
    }
    backButton.style.display = 'inline-block';
    clearPage(); // Clear the page after next button click
});

backButton.addEventListener('click', () => {
    offset -= limit;
    if (offset <= minRecords) { //Hidden Button if reach condition
        offset = minRecords;
        backButton.style.display = 'none'
    } else{
        loadAbilities(offset, limit);
    }
    nextButton.style.display = 'inline-block';
    clearPage();  // Clear the page after back button click
});

function clearPage() {
    const pokemonList = document.getElementById('pokemonList');
    pokemonList.innerHTML = ''; // Limpa o conteúdo da lista de Pokémon
}