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
    const imgHero = pokemonData[i].sprites.other.dream_world.front_default;
    const imgUrl = pokemonData[i].sprites.other.home.front_default;
    const imgSprite = pokemonData[i].sprites.front_default;

    const abilities = [];
    for (const item of pokemonData[i].abilities) {
      const ability = [item.ability.name, item.ability.url];
      abilities.push(ability);
    }

    const typeClass = [];
    for (const item of pokemonData[i].types) {
      typeClass.push(item.type.name);
    }

    const eggGroup = [];
    for (const item of speciesData[i].egg_groups) {
      if (item.name === "no-eggs") {
        eggGroup.push("none");
      } else {
        eggGroup.push(item.name);
      }
    }

    const pokemon = new PokemonCard(
      id,
      name,
      imgHero,
      imgUrl,
      imgSprite,
      description,
      eggGroup,
      typeClass,
      abilities
    );

    pokemonCardList.push(pokemon);
  });

  return pokemonCardList;
}

function PokemonCard(
  id,
  name,
  imgHero,
  imgUrl,
  imgSprite,
  description,
  eggGroup,
  typeClass,
  abilities
) {
  const _id = id;
  const _name = name;
  const _imgHero = imgHero;
  const _imgUrl = imgUrl;
  const _imgSprite = imgSprite;
  const _description = description;
  const _eggGroup = eggGroup;
  const _typeClass = typeClass;
  const _abilities = abilities;

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
    getImgHero() {
      return _imgHero;
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
    getAbilities() {
      return _abilities;
    },
  };
}
