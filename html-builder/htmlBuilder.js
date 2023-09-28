export function cardBuilder(obj) {
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

export function categoryBuilder(app) {
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

  randomType.forEach((element) => {
    const category = document.createElement("section");
    category.className = "category-section " + element;
  });

  return randomType;
}
