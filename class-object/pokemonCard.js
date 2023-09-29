export function createPokemonCard(pokemonData, speciesData) {
  const pokemonCardList = [];

  pokemonData.forEach((element, i) => {
    const id = speciesData[i].id;
    const name = pokemonData[i].name;
    let description = "";

    for (const item of speciesData[i].flavor_text_entries) {
      if (item.language.name === "en" && item.version.name === "red") {
        description = item.flavor_text.replace(/\n/g, " ").replace(/\f/g, " ");

        break;
      }
    }

    const imgUrl = pokemonData[i].sprites.other.home.front_default;
    const imgSprite = pokemonData[i].sprites.front_default;

    const typeClass = [];
    for (const item of pokemonData[i].types) {
      typeClass.push(item.type.name);
    }

    const eggGroup = [];
    for (const item of speciesData[i].egg_groups) {
      if (
        item.name === "water1" ||
        item.name === "water2" ||
        item.name === "water3"
      ) {
        eggGroup.push("water");
      } else if (item.name === "no-eggs") {
        eggGroup.push("none");
      } else {
        eggGroup.push(item.name);
      }
    }

    const pokemon = new PokemonCard(
      id,
      name,
      imgUrl,
      imgSprite,
      description,
      eggGroup,
      typeClass
    );

    pokemonCardList.push(pokemon);
  });

  return pokemonCardList;
}

function PokemonCard(
  id,
  name,
  imgUrl,
  imgSprite,
  description,
  eggGroup,
  typeClass
) {
  let _id = id;
  let _name = name;
  let _imgUrl = imgUrl;
  let _imgSprite = imgSprite;
  let _description = description;
  let _eggGroup = eggGroup;
  let _typeClass = typeClass;

  return {
    getID() {
      return _id;
    },
    getName() {
      return _name;
    },
    getType() {
      return _typeClass;
    },
    getGroup() {
      return _eggGroup;
    },
    getImage() {
      return _imgUrl;
    },
    getSpriteImage() {
      return _imgSprite;
    },
    getDescription() {
      return _description;
    },
  };
}
