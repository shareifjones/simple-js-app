let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }
  

function showModal (pokemon) {

 let modalTitle = document.querySelector('.modal-title');
 let modalBody = document.querySelector('.modal-body');

 modalTitle.innerText = '';
 modalBody.innerText = '';

 let nameElement = document.createElement('h1');
 nameElement.innerText = pokemon.name;

 let heightElement = document.createElement('p');
 heightElement.innerText = "Height: " + pokemon.height;

 let weightElement = document.createElement('p');
 weightElement.innerText = "Weight: " + pokemon.weight;

 let imageElement = document.createElement('img');
 imageElement.classList.add('modal-image');
 imageElement.src = pokemon.imageUrl;

 let typesElement = document.createElement('p');
 typesElement.innerText = "Types: " + pokemon.types;

 modalTitle.appendChild(nameElement);
 modalBody.appendChild(heightElement);
 modalBody.appendChild(weightElement);
 modalBody.appendChild(imageElement);
 modalBody.appendChild(typesElement);
}


function addListItem(pokemon){

  let pokemonList = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  listItem.classList.add('group-list-item');
  button.innerText = pokemon.name;
  button.classList.add('pokemon-btn', 'btn');
  button.setAttribute('data-toggle', 'modal');
  button.setAttribute('data-target', '#pokemonModal');
  listItem.appendChild(button);
  pokemonList.appendChild(listItem);
  button.addEventListener('click', function (ev) {
    showDetails(pokemon);
});
}

function add(pokemon) {
  pokemonList.push(pokemon);
}


function getAll() {
  return pokemonList;
}

function loadList() {
  return fetch(apiUrl)
  .then(function (response) {
    return response.json();
  }).then(function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
      // console.log(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  })
}

function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
    item.weight = details.weight;
  }).catch(function (e) {
    console.error(e);
  });
}

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
  })();

pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
});