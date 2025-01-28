// Define pokemonRepository object
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Function to show Pokemon details in modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');

    modalTitle.innerText = '';
    modalBody.innerText = '';

    let nameElement = document.createElement('h1');
    nameElement.innerText = capitalizeFirstLetter(pokemon.name);

    let heightElement = document.createElement('p');
    heightElement.innerText = "Height: " + pokemon.height + " m";

    let weightElement = document.createElement('p');
    weightElement.innerText = "Weight: " + pokemon.weight + " kg";

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;

    modalTitle.appendChild(nameElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(weightElement);
    modalBody.appendChild(imageElement);
  }

  return {
    add: function (pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function () {
      return pokemonList;
    },
    addListItem: function (pokemon) {
      let pokemonListElement = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      listItem.classList.add('list-group-item');

      let button = document.createElement('button');
      button.innerText = capitalizeFirstLetter(pokemon.name);
      button.classList.add('btn', 'btn-primary', 'pokemon-button');
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#pokemonModal');
      button.addEventListener('click', function () {
        showDetails(pokemon);
      });

      listItem.appendChild(button);
      pokemonListElement.appendChild(listItem);
    },
    loadDetails: function (pokemon) {
      return fetch(pokemon.detailsUrl).then(function (response) {
        return response.json();
      }).then(function (details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
      });
    }
  };
})();

// Add search functionality
document.addEventListener('DOMContentLoaded', function () {
  let searchBar = document.getElementById('search-bar');
  let pokemonListElement = document.querySelector('.pokemon-list');

  searchBar.addEventListener('input', function () {
    let searchTerm = searchBar.value.toLowerCase();

    // Clear the current list
    pokemonListElement.innerHTML = '';

    // Filter and display matching Pokémon
    pokemonRepository.getAll().forEach(function (pokemon) {
      if (pokemon.name.toLowerCase().includes(searchTerm)) {
        pokemonRepository.addListItem(pokemon);
      }
    });
  });
});
