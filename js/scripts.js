let pokemonList = [
{
    name: "Charizard",
    height: 1.7,
    types: ["fire", "flying"]
},
{
    name: "Mewtwo",
    height: 2,
    types: "psychic"
},
{
    name: "Pikachu",
    height: 0.4,
    types: "electric"
}
];

pokemonList.forEach(function(pokemon) {
    document.write ("<p>" + pokemon.name + " " + "(height: " + pokemon.height + ")");
    if (pokemon.height >= 2)
    document.write (" Wow, thats big!" + "</p>")
});

let pokemonRepository = (function () {
    let pokemonList = [];
  
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    function getAll() {
      return pokemonList;
    }
  
    return {
      add: add,
      getAll: getAll
    };
  })();
