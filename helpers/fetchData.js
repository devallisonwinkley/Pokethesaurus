export async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Handle non-successful responses
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function fetchDataSingleParam(data, paramOne) {
  const dataList = new DataObject();

  try {
    const fetchPromises = data.map(async (element) => {
      const response = await fetch(element[paramOne]);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    });

    const fetchedData = await Promise.all(fetchPromises);

    dataList.results.push(...fetchedData);
    dataList.count = dataList.results.length;

    return dataList;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function fetchDataDoubleParam(data, paramOne, paramTwo) {
  const dataList = new DataObject();

  try {
    const fetchPromises = data.map(async (element) => {
      const response = await fetch(element[paramOne][paramTwo]);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    });

    const fetchedData = await Promise.all(fetchPromises);

    dataList.results.push(...fetchedData);
    dataList.count = dataList.results.length;

    return dataList;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function DataObject() {
  return { results: [], count: 0 };
}
