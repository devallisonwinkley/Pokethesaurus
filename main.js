import { createPokemonCard } from "./classObjects/pokemonCard";
import {
  fetchData,
  fetchDataSingleParam,
  fetchDataDoubleParam,
} from "./helpers/fetchData";
import "./style.css";

async function main() {
  const pokeList = [];
  const pokeListData = await fetchData(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
  );
  console.log(pokeListData);

  const pokeListDetails = await fetchDataSingleParam(
    pokeListData.results,
    "url"
  );
  console.log(pokeListDetails);

  const pokeSpeciesData = await fetchDataDoubleParam(
    pokeListDetails.results,
    "species",
    "url"
  );
  console.log(pokeSpeciesData);

  const pokeEvolutionData = await fetchDataDoubleParam(
    pokeSpeciesData.results,
    "evolution_chain",
    "url"
  );
  console.log(pokeEvolutionData);

  const pokemonCardList = createPokemonCard(
    pokeListDetails.results,
    pokeSpeciesData.results
  );

  pokemonCardList.forEach((element) => {
    console.log(
      element.getID() +
        ":" +
        element.getName() +
        ": " +
        element.getDescription() +
        "\n" +
        element.getType()
    );
  });
}

main();
