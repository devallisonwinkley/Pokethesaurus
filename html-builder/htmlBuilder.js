import { fetchData } from "../helpers/fetchData";

function cardBuilder(obj, view) {
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

  card.addEventListener("click", function () {
    console.log("click");
    view.updateView(obj);
  });

  return card;
}

function categoryBuilder(value, obj, view) {
  const categoryName = value[0].toUpperCase() + value.slice(1);

  const category = document.createElement("section");
  category.className = "category-section";
  const categoryLabel = document.createElement("h2");
  categoryLabel.textContent = categoryName + " Pokemons";
  const categoryDisplay = document.createElement("div");
  categoryDisplay.className = "category-content";

  category.appendChild(categoryLabel);
  category.appendChild(categoryDisplay);

  const selectedID = [];

  while (selectedID.length < 5) {
    const randomNumber = Math.floor(Math.random() * obj.length);
    if (!selectedID.includes(randomNumber)) {
      for (const item of obj[randomNumber].getType()) {
        if (item === value) {
          categoryDisplay.appendChild(cardBuilder(obj[randomNumber], view));
          console.log("card created");
          selectedID.push(randomNumber);
        }
      }
    }
  }

  return category;
}

export function headerBuilder(obj, view) {
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

  function showPokemonSearchList(textValue) {
    if (textValue.length > 0) {
      searchView.style.display = "flex";

      while (searchList.firstChild) {
        searchList.removeChild(searchList.firstChild);
      }

      let counter = 0;
      for (const pokemon of pokemonList) {
        if (counter < 7) {
          if (
            pokemon.getName().toLowerCase().startsWith(textValue.toLowerCase())
          ) {
            const itemList = document.createElement("li");
            itemList.className = "search-item";
            const itemImage = document.createElement("img");
            const itemName = document.createElement("p");
            const itemNumber = document.createElement("p");

            itemImage.src = pokemon.getSpriteImage();
            itemName.textContent = pokemon.getName();
            itemNumber.textContent = "#" + pokemon.getID();

            itemList.appendChild(itemImage);
            itemList.appendChild(itemName);
            itemList.appendChild(itemNumber);

            searchList.appendChild(itemList);

            itemList.addEventListener("click", function () {
              view.updateView(pokemon);
            });

            counter += 1;
          }
        } else {
          break;
        }
      }
    } else {
      searchView.style.display = "none";
    }
  }

  return headerContainer;
}

function heroBuilder(obj, view) {
  const hero = document.createElement("div");
  const divLeft = document.createElement("div");
  const featured = document.createElement("h1");
  const headerDiv = document.createElement("div");
  const PokemonID = document.createElement("h1");
  const PokemonName = document.createElement("h1");
  const divImg = document.createElement("div");
  const heroImg = document.createElement("img");
  const divRight = document.createElement("div");
  const description = document.createElement("p");
  const footer = document.createElement("div");
  const imgFooter = document.createElement("img");
  const footerLink = document.createElement("p");

  hero.className = "hero-container";
  headerDiv.className = "hero-header";
  divImg.className = "hero-image-container";
  divRight.className = "hero-right-container";
  divLeft.className = "hero-left-container";
  footer.className = "hero-footer-container";
  description.className = "hero-description";

  featured.textContent = "Featured Legendary:";
  PokemonName.textContent = obj.getName();
  PokemonID.textContent = "#" + obj.getID();
  heroImg.src = obj.getImage();
  description.textContent = obj.getDescription();
  imgFooter.src = obj.getSpriteImage();
  footerLink.textContent = "See more . . .";

  obj.getAbilities().forEach(async (element, i) => {
    const abilityData = await fetchData(element[1]);
    console.log(abilityData);

    const abilityContainer = document.createElement("div");
    abilityContainer.className = "ability-container";
    const abilityName = document.createElement("p");
    const abilityDescription = document.createElement("p");

    abilityName.textContent = "Ability " + (i + 1) + ": " + element[0];
    abilityDescription.textContent =
      abilityData.flavor_text_entries[0].flavor_text;

    abilityContainer.appendChild(abilityName);
    abilityContainer.appendChild(abilityDescription);
    divRight.appendChild(abilityContainer);
  });

  console.log(obj.stats);

  divImg.appendChild(heroImg);

  headerDiv.appendChild(PokemonName);
  headerDiv.appendChild(PokemonID);

  footer.appendChild(imgFooter);
  footer.appendChild(footerLink);

  divLeft.appendChild(featured);
  divLeft.appendChild(divImg);

  divRight.appendChild(headerDiv);
  divRight.appendChild(description);

  divRight.appendChild(footer);

  hero.appendChild(divLeft);
  hero.appendChild(divRight);

  footerLink.addEventListener("click", function () {
    view.updateView(obj);
  });

  return hero;
}

export function randomHeroBuilder(app, obj, view) {
  const legendaries = [151, 150, 146, 145, 144];

  const randomLegend = Math.floor(Math.random() * legendaries.length);

  for (let i = obj.length - 1; i > 142; i--) {
    if (obj[i].getID() == legendaries[randomLegend]) {
      app.appendChild(heroBuilder(obj[i], view));
      break;
    }
  }
}

export function PokemonViewBuilder() {
  const pokemonView = document.createElement("div");
  const viewFilter = document.createElement("div");
  const viewDisplay = document.createElement("div");
  const rightDisplay = document.createElement("div");
  const viewGroup = document.createElement("div");
  const imgGroup = document.createElement("img");
  const containerGroup = document.createElement("div");
  const viewStats = document.createElement("div");
  const stats = document.createElement("h3");
  const hp = document.createElement("p");
  const attack = document.createElement("p");
  const defense = document.createElement("p");
  const specialAttack = document.createElement("p");
  const specialDefense = document.createElement("p");
  const speed = document.createElement("p");
  const viewAbility = document.createElement("div");
  const leftDisplay = document.createElement("div");
  const pokemonName = document.createElement("p");
  const viewMainDisplay = document.createElement("div");
  const imgMain = document.createElement("img");
  const viewType = document.createElement("div");

  const description = document.createElement("p");

  rightDisplay.className = "left-view";
  pokemonView.className = "view-container";
  viewFilter.className = "view-filter";
  viewGroup.className = "view-group-container";
  containerGroup.className = "group-container";
  viewDisplay.className = "view-display-container";
  viewStats.className = "view-stats";
  stats.className = "stat-title";

  leftDisplay.className = "right-view";
  viewMainDisplay.className = "view-main";
  description.className = "view-description";

  viewGroup.appendChild(imgGroup);
  viewGroup.appendChild(containerGroup);

  viewStats.appendChild(stats);
  viewStats.appendChild(hp);
  viewStats.appendChild(attack);
  viewStats.appendChild(defense);
  viewStats.appendChild(specialAttack);
  viewStats.appendChild(specialDefense);
  viewStats.appendChild(speed);

  rightDisplay.appendChild(viewGroup);
  rightDisplay.appendChild(viewStats);
  rightDisplay.appendChild(viewAbility);

  viewMainDisplay.appendChild(imgMain);
  viewMainDisplay.appendChild(viewType);

  leftDisplay.appendChild(pokemonName);
  leftDisplay.appendChild(viewMainDisplay);

  viewDisplay.appendChild(leftDisplay);
  viewDisplay.appendChild(rightDisplay);
  viewDisplay.appendChild(description);

  pokemonView.appendChild(viewFilter);
  pokemonView.appendChild(viewDisplay);

  stats.textContent = "Stats";
  hp.textContent = "HP: 0";
  attack.textContent = "Attack: 0";
  defense.textContent = "Defense: 0";
  specialAttack.textContent = "SP: 0";
  specialDefense.textContent = "SD: 0";
  speed.textContent = "Speed: 0";

  const updateView = (obj) => {
    pokemonView.style.display = "block";
    pokemonName.textContent = "# " + obj.getID() + ": " + obj.getName();

    imgMain.src = obj.getImage();

    while (viewType.firstChild) {
      viewType.removeChild(viewType.firstChild);
    }
    for (const item of obj.getType()) {
      const group = document.createElement("p");
      group.className = "type-group " + item;
      group.textContent = item;
      viewType.appendChild(group);
    }

    imgGroup.src = obj.getSpriteImage();

    while (viewGroup.firstChild) {
      viewGroup.removeChild(viewGroup.firstChild);
    }
    for (const item of obj.getGroup()) {
      const group = document.createElement("p");
      group.className = "card-group " + item;
      group.textContent = item;
      viewGroup.appendChild(group);
    }

    hp.textContent = "HP: " + obj.stats.getHp();
    attack.textContent = "Attack: " + obj.stats.getAttack();
    defense.textContent = "Defense: " + obj.stats.getDefense();
    specialAttack.textContent = "SP: " + obj.stats.getSpecialAttack();
    specialDefense.textContent = "SD: " + obj.stats.getSpecialDefense();
    speed.textContent = "Speed: " + obj.stats.getSpeed();

    while (viewAbility.firstChild) {
      viewAbility.removeChild(viewAbility.firstChild);
    }
    obj.getAbilities().forEach(async (element, i) => {
      const abilityData = await fetchData(element[1]);
      console.log(abilityData);

      const abilityContainer = document.createElement("div");
      abilityContainer.className = "ability-container";
      const abilityName = document.createElement("p");
      const abilityDescription = document.createElement("p");

      abilityName.textContent = "Ability " + (i + 1) + ": " + element[0];
      abilityDescription.textContent =
        abilityData.flavor_text_entries[0].flavor_text;

      abilityContainer.appendChild(abilityName);
      abilityContainer.appendChild(abilityDescription);
      viewAbility.appendChild(abilityContainer);
    });

    description.textContent = obj.getDescription();
  };

  viewFilter.addEventListener("click", () => {
    pokemonView.style.display = "none";
  });

  return {
    pokemonView,
    updateView,
  };
}

export function randomCategoryBuilder(app, obj, view) {
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
    app.appendChild(categoryBuilder(element, obj, view));
    console.log("category created");
  });
}
