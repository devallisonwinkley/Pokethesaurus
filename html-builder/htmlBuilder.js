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

export function headerBuilder() {
  const headerContainer = document.createElement("header");
  headerContainer.className = "header-container";
  const imgLogo = document.createElement("img");
  imgLogo.className = "header-logo";
  const searchBar = document.createElement("input");
  searchBar.type = "text";
  searchBar.placeholder = "enter pokemon name here";

  imgLogo.src =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png";

  headerContainer.appendChild(imgLogo);
  headerContainer.appendChild(searchBar);

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
