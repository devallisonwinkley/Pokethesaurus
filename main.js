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
    pokeListDetails,
    "species",
    "url"
  );
  console.log(pokeSpeciesData);
}

main();
