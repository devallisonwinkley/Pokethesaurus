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

export async function fetchDataList(data) {
  const dataList = [];

  try {
    data.forEach(async (element) => {
      const response = await fetch(element.url);

      if (!response.ok) {
        // Handle non-successful responses
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      dataList.push(await response.json());
    });

    return dataList;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
