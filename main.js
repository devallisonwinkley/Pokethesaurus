import { createPokemonCard } from "./class-object/pokemonCard";
import {
  fetchData,
  fetchDataSingleParam,
  fetchDataDoubleParam,
} from "./helpers/fetchData";
import {
  headerBuilder,
  randomCategoryBuilder,
} from "./html-builder/htmlBuilder";
import "./style.css";

const app = document.getElementById("app");

async function main() {
  app.appendChild(headerBuilder());

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
  // console.log(pokeSpeciesData);

  const pokeEvolutionData = await fetchDataDoubleParam(
    pokeSpeciesData.results,
    "evolution_chain",
    "url"
  );
  //console.log(pokeEvolutionData);

  const pokemonCardList = createPokemonCard(
    pokeListDetails.results,
    pokeSpeciesData.results
  );

  // pokemonCardList.forEach((element) => {
  //   const card = cardBuilder(element);
  //   app.appendChild(card);
  // });

  randomCategoryBuilder(app, pokemonCardList);
}

main();
