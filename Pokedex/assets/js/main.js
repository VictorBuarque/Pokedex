// Convert the structure into HTML <li>
function convertPokemonLi(pokemon) {
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.substring(1);
    }
    return `
    <li class="pokemon">
        <span class="number">#001</span>
        <span class="name">${pokemon.name.capitalize()}</span>
        <div class="detail">
            <ol class="types">
                <li class="type"></li>
                <li class="type"></li>
            </ol>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pokemon.name}">
        </div>
    </li>
    `;
}

const pokemonList = document.getElementById('pokemonList');

//Calling pokeApi getPokemon()
pokeApi.getPokemons().then(( pokemons = [] ) => {
    //Edit HTTP, Transform pokemons results in <li> in HTML and Concatenate this string with a empty space
    pokemonList.innerHTML += pokemons.map(convertPokemonLi).join(''); //need empty string
    }); 
    
                 
    //Exatamente a mesma função com menos verbosidade
    // const listItems = [];
    // for (let i = 0; i < pokemons.length; i++) {
    //     const pokemon = pokemons[i];
    //     listItems.push(convertPokemonLi(pokemon));
    // };
