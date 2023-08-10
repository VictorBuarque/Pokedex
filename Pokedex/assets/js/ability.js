//Creating variables to call functions and methods
const abilityList = document.getElementById('pokemons2');
const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('name');
const nextButton = document.getElementById('next');
const backButton = document.getElementById('back');
const limit = 1
let offset = 0;
const maxRecords = 151  
const minRecords = 0

function loadAbilities(pokemonName){
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
//Calling pokeApi getPokemonDetail()
    // Fetch the details of a specific Pokémon using its name
    pokeApi.getPokemonDetail({ url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}` })
        .then(pokemon => {
            // Convert the structure into HTML
            const pokemonHTML = convertPokemonLi(pokemon);
            pokemonList.innerHTML = pokemonHTML;
        })
        .catch(error => {
            console.error(error);
            pokemonList.innerHTML = '<p>Error loading Pokémon abilities.</p>';
        });
}
 
loadAbilities(pokemonName);

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


function clearPage() {
    const pokemonList = document.getElementById('pokemonList');
    pokemonList.innerHTML = ''; // Limpa o conteúdo da lista de Pokémon
}