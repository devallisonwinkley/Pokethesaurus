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

export async function fetchDataSingleParam(data, propertyOne) {
  const dataList = [];

  try {
    const fetchPromises = data.map(async (element) => {
      const response = await fetch(element[propertyOne]);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    });

    const fetchedData = await Promise.all(fetchPromises);

    dataList.push(...fetchedData);

    return dataList;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function fetchDataDoubleParam(data, propertyOne, propertyTwo) {
  const dataList = [];

  try {
    const fetchPromises = data.map(async (element) => {
      const response = await fetch(element[propertyOne][propertyTwo]);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    });

    const fetchedData = await Promise.all(fetchPromises);

    dataList.push(...fetchedData);

    return dataList;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
