// Api Configuration
// Creating a object
const pokeApi = {};
                    //This is a default Params 
pokeApi.getPokemons = (offset = 0, limit =10) => { 
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    // Promises
    return fetch(url)
    .then(response => response.json())
    .then(jbody => jbody.results)  // Answer manipulation
    .catch(error => console.error(error))
}