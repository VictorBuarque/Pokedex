// Api Configuration
// Creating a object
const pokeApi = {};
// Creating a use model for api
function convertApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
  
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
    const [ability] = abilities;
    pokemon.abilities = abilities;
    pokemon.ability = ability;
    
  
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
  
    // // Getting moves
    // const moves = pokeDetail.moves.map((moveSlot) => moveSlot.move.name);
    // const [move] = moves;
    // pokemon.move = move;
    // pokemon.moves = moves;
  
    return pokemon;
}
// Get Details of pokemon
pokeApi.getPokemonDetail = (pokemon)=>{
    return fetch(pokemon.url)
        .then((response)=>response.json())
        .then(convertApiDetailToPokemon)
}
                    //This is a default Params 
pokeApi.getPokemons = (offset = 0, limit =20) => { 
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    // Promises
    return fetch(url)
    .then((response) => response.json()) //Convert response in JSON
    .then((jbody) => jbody.results)  // Answer manipulation for list
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //Require of details and convertin in JSON
    .then((detailRequest) => Promise.all(detailRequest)) //Waiting all requires
    .then((pokemonDetail) => pokemonDetail) //Details list of pokemons
    .catch(error => console.error(error))
};