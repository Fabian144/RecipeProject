async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

/*
Ovan går att använda i valfri .js fil om man importerar funktionen
Exempel:
fetchData("sökväg till json fil").then(valfriFunktion);
valfriFunktion() {
};
*/

export { fetchData };
