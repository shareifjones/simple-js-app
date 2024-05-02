let pokemonRepository = (function () {
  // let modalContainer = doucment.querySelector('#modal-container');
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function showModal (pokemon) {
    let modalTitle = $(".modal-title");
    let modalBody = $(".modal-body #pokemon-details");
    modalTitle.empty();
    modalBody.empty();

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let nameElement = $("<h1>" + "Name" + pokemon.name + "</h1>");
    let heightElement = $("<p>" + "Height" + pokemon.height + "</p>");
    let typesElement = $("<p>" + "Types" + pokemon.types.join(", ") + "</p>");

    modalTitle.appendChild(closeButtonElement);
    modalBody.appendChild(nameElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(typesElement);


    modalContainer.classList.add('is-visible');
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
}

let getAll = () => pokemonList;

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
  pokemonRepository.loadDetails(pokemon).then(function() {
    console.log(pokemon);
    showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
  });
}

function showModal(name, height, imageUrl) {
  let modalContainer = document.querySelector('#modal-container');
  
  //Clear all existing modal content
  modalContainer.innerText = ' ';

  let modal = document.createElement ('div');
  modal.classList.add('modal');

  //Add the new modal content
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = name;

  let contentElement = document.createElement('p');
  contentElement.innerText = 'Height: ' + height;

  let imageElement = document.createElement('img');
  imageElement.classList.add('image');
  imageElement.src = imageUrl;


  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modal.appendChild(imageElement)
  modalContainer.appendChild(modal);
  
  modalContainer.classList.add('is-visible');

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
}

function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
}


// function showDetails(pokemon) {
//   loadDetails(pokemon).then(function () {
//     showModal(pokemon);
//   });
// }

//   function hideModal(){
//     modalContainer.classList.remove('is-visible');
//   }

//   window.addEventListener('keydown', (e) => {
//     if (e.key === 'escape' &&
//     modalContainer.classList.contains(is-visible)) {
//       hideModal();
//     }
//   });
//   modalContainer.addEventListener('click', (e) => {
//     let target = e.target;
//     if (target === modalContainer){
//       hideModal();
//     }
//   });

//   document.querySelector('#show-modal').addEventListener
//   ('click', () => {
//     showModal(' ', ' ');
//   });

// })();




    function addListItem(pokemon){
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      listpokemon.classList.add("list-group-item");
      // listpokemon.innerText = pokemon.name;
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
      button.addEventListener("click", function(event) {
        showDetails(pokemon);

      // pokemonList.addEventListener("click", () => {
      //   pokemonRepository.showDetails(pokemon);
      //   $("#exampleModal").modal("show");
      // });
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