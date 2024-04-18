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

    function showDetails(pokemon){
      console.log (pokemon)
}

    function addListItem(pokemon){
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);

      addButtonListener(button, pokemon);
    }

    function addButtonListener(button, pokemon) {
    button.addEventListener("click", function(){
      showDetails(pokemon);
    });
  }

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem
    };
  })();

pokemonRepository.add({ name: "Onyx", height: 8.8, types: ["rock", "ground"] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});