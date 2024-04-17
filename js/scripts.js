var pokemonRepository = (function () {
  let repository = [
{
    name: "Charizard",
    height: 1.7,
    types: ["fire", "flying"],
},
{
    name: "Mewtwo",
    height: 2,
    types: ["psychic"],
},
{
    name: "Pikachu",
    height: 0.4,
    types: ["electric"],
  },
];
  
function add(pokemon) {
  if (
    typeof pokemon === "object" &&
    "name" in pokemon &&
    "height" in pokemon &&
    "types" in pokemon
  ) {
    repository.push(pokemon);
  } else {
    console.log("pokemon is not correct");
  }
}
    function getAll() {
      return repository;
    }

    function addListItem(pokemon){
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
    }
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem
    };
  })();

pokemonRepository.add({ name: "Charizard", height: 1.7, types: ["fire", "flying"] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});