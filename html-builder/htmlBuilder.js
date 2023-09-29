function cardBuilder(obj) {
  const card = document.createElement("article");
  const cardHeader = document.createElement("section");
  const cardBody = document.createElement("section");
  const cardFooter = document.createElement("section");

  const id = document.createElement("h3");
  id.textContent = "#" + obj.getID();

  const groupContainer = document.createElement("div");
  groupContainer.className = "group-container";
  for (const item of obj.getGroup()) {
    const group = document.createElement("p");
    group.className = "card-group " + item;
    group.textContent = item;
    groupContainer.appendChild(group);
  }

  cardHeader.appendChild(id);
  cardHeader.appendChild(groupContainer);

  const cardImage = document.createElement("img");
  cardImage.classList = "card-img";
  cardImage.src = obj.getImage();

  const typeContainer = document.createElement("div");
  typeContainer.className = "type-container";

  for (const item of obj.getType()) {
    const group = document.createElement("p");
    group.className = "type-group " + item;
    group.textContent = item;
    typeContainer.appendChild(group);
  }

  cardBody.appendChild(cardImage);
  cardBody.appendChild(typeContainer);

  const name = document.createElement("h2");
  name.textContent = obj.getName();

  const description = document.createElement("p");
  description.textContent = obj.getDescription();

  cardFooter.appendChild(name);
  cardFooter.appendChild(description);

  card.className = "card-container";
  cardHeader.className = "card-header";
  cardBody.className = "card-body";
  cardFooter.className = "card-footer";

  card.appendChild(cardHeader);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);

  return card;
}

function categoryBuilder(value, counter, obj) {
  const category = document.createElement("section");
  category.className = "category-section " + value + " " + counter;
  const categoryLabel = document.createElement("h2");
  categoryLabel.textContent = value + " pokemons";
  const categoryDisplay = document.createElement("div");
  categoryDisplay.className = "category-content";

  const pokemonName = Array.from(document.querySelectorAll("h2"));

  function capitalize(pokemonName) {
    for (var i = 0; i < pokemonName.length; i++) {
      pokemonName[i].textContent = pokemonName[i].textContent.toUpperCase();
    }
  }

  capitalize(pokemonName);

  category.appendChild(categoryLabel);
  category.appendChild(categoryDisplay);

  const selectedID = [];

  while (selectedID.length < 5) {
    const randomNumber = Math.floor(Math.random() * obj.length);
    if (!selectedID.includes(randomNumber)) {
      for (const item of obj[randomNumber].getType()) {
        if (item === value) {
          categoryDisplay.appendChild(cardBuilder(obj[randomNumber]));
          console.log("card created");
          selectedID.push(randomNumber);
        }
      }
    }
  }

  return category;
}

export function headerBuilder(obj) {
  const pokemonList = obj;
  const headerContainer = document.createElement("header");
  headerContainer.className = "header-container";
  const imgLogo = document.createElement("img");
  imgLogo.className = "header-logo";
  const searchTextContainer = document.createElement("div");
  searchTextContainer.className = "search-text-container";
  const searchBar = document.createElement("input");
  searchBar.type = "text";
  searchBar.placeholder = "Find your Pokémon!";

  imgLogo.src = "/mp2-logo.png";

  searchTextContainer.appendChild(searchBar);

  headerContainer.appendChild(imgLogo);
  headerContainer.appendChild(searchTextContainer);

  const searchView = document.createElement("div");
  searchView.className = "search-view-container";
  const searchList = document.createElement("ul");

  searchTextContainer.appendChild(searchView);

  searchView.appendChild(searchList);

  searchBar.addEventListener("keyup", function (event) {
    showPokemonSearchList(searchBar.value, event);
  });

  function showPokemonSearchList(textValue, keyValue) {
    if (textValue.length > 0) {
      searchView.style.display = "flex";

      while (searchList.firstChild) {
        searchList.removeChild(searchList.firstChild);
      }

      pokemonList.forEach((element) => {
        if (
          element.getName().toLowerCase().startsWith(textValue.toLowerCase())
        ) {
          const itemList = document.createElement("li");
          itemList.className = "search-item";
          const itemImage = document.createElement("img");
          const itemName = document.createElement("p");
          const itemNumber = document.createElement("p");

          itemImage.src = element.getSpriteImage();
          itemName.textContent = element.getName();
          itemNumber.textContent = element.getID();

          itemList.appendChild(itemImage);
          itemList.appendChild(itemName);
          itemList.appendChild(itemNumber);

          searchList.appendChild(itemList);
        }
      });
    } else {
      searchView.style.display = "none";
    }
  }

  return headerContainer;
}

export function randomCategoryBuilder(app, obj) {
  const pokemonType = [
    "grass",
    "poison",
    "fire",
    "flying",
    "water",
    "normal",
    "electric",
    "ground",
    "fighting",
    "psychic",
    "rock",
    "bug",
  ];

  const randomType = [];
  while (randomType.length < 5) {
    const randomNumber = Math.floor(Math.random() * pokemonType.length);
    if (!randomType.includes(pokemonType[randomNumber])) {
      randomType.push(pokemonType[randomNumber]);
    }
  }

  randomType.forEach((element, i) => {
    let counter;
    if (i === 0) {
      counter = "zero";
    } else if (i === 1) {
      counter = "one";
    } else if (i === 2) {
      counter = "two";
    } else if (i === 3) {
      counter = "three";
    } else if (i === 4) {
      counter = "four";
    }
    app.appendChild(categoryBuilder(element, counter, obj));
    console.log("category created");
  });
}
