let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function showModal (pokemon) {
    let modalBody = $(".modal-body #pokemon-modal");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + "Name" + pokemon.name + "</h1>");
    let heightElement = $("<p>" + "Height" + pokemon.height + "</p>");
    let typesElement = $("<p>" + "Types" + pokemon.types.join(", ") + "</p>");

    modalTitle.appendChild(nameElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(typesElement);
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
  }).catch(function (e) {
    console.error(e);
  });
}

function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
      showModal(pokemon);
  });
}


    function addListItem(pokemon){
      let listPokemon = $('<div>').addClass('pokemon-div col-9 col-md-4 col-lg-3 border m-1 rounded-lg ' + pokemon.type);
     // let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      listpokemon.classList.add("list-group-item");
      // listpokemon.innerText = pokemon.name;
      let button = $('<button>').addClass('pokemon-button btn d-flex justify-content-between align-items-center')
            .attr('data-toggle', 'modal')
            .attr('data-target', '#pokemonModal');
      listpokemon.appendChild(button);
      $('.row').append(listPokemon)
      .addClass('justify-content-center');
      pokemonList.appendChild(listpokemon);
      button.click(function () {
        showDetails(pokemon);

    button.setAttribute('type', 'button');
    })
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