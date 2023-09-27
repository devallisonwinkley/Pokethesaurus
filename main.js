import { fetchData, fetchDataList } from "./helpers/fetchData";
import "./style.css";

async function main() {
  const pokeList = [];
  const pokeListData = await fetchData(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
  );
  console.log(pokeListData);
  const pokeListDetails = await fetchDataList(pokeListData.results);
  console.log(pokeListDetails);
}

main();
