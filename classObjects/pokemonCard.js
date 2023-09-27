export function createPokemonCard(pokemonData, speciesData) {
  const pokemonCardList = [];

  pokemonData.forEach((element, i) => {
    const id = speciesData[i].id;
    const name = pokemonData[i].name;
    const description = speciesData[i].flavor_text_entries[0].flavor_text;
    const imgUrl = pokemonData[i].sprites.front_default;
    const typeClass = [];
    for (const item of pokemonData[i].types) {
      typeClass.push(item.type.name);
    }
    const pokemon = new PokemonCard(id, name, imgUrl, description, typeClass);

    pokemonCardList.push(pokemon);
  });

  return pokemonCardList;
}

function PokemonCard(id, name, imgUrl, description, typeClass) {
  let _id = id;
  let _name = name;
  let _imgUrl = imgUrl;
  let _description = description;
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
    getImage() {
      return _imgUrl;
    },
    getDescription() {
      return _description;
    },
  };
}
