//Creating variables to call functions and methods
const pokemonList = document.getElementById('pokemonList');
const nextButton = document.getElementById('next');
const backButton = document.getElementById('back');
const limit = 20
let offset = 0;

function loadPokemon(offset, limit){
    // Convert the structure into HTML <li>
    function convertPokemonLi(pokemon) {
        return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">${pokemon.number.toString().padStart(4, '0')}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
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

loadPokemon(offset, limit);

/*
     Função original:

     const listItems = [];
     for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        listItems.push(convertPokemonLi(pokemon));
     };

     A mesma função com menos verbosidade sem simplificar:

     pokeApi.getPokemons().then(( pokemons = [] ) => {
        const newList = pokemons.map((pokemon)) => {
            return convertPokemonLi(pokemon);
        });
     const newHTML = newList.join('');
     pokemonList.innerHTML += newHTML;    
     */
nextButton.addEventListener('click', () => {
    offset += limit;
    loadPokemon(offset, limit);
    clearPage(); // Limpa a página após o avanço
});

backButton.addEventListener('click', () => {
    offset -= limit;
    loadPokemon(offset, limit);
    clearPage(); // Limpa a página após o recuo
});

function clearPage() {
    const pokemonList = document.getElementById('pokemonList');
    pokemonList.innerHTML = ''; // Limpa o conteúdo da lista de Pokémon
}