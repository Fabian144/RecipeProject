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

async function getRecipes() {
  const data = await fetchData(`./data/recept.json`);
  return data.recipes;
}

const recipes = await getRecipes();

// Variabeln ovan är en array med varje recept objekt inuti

export { recipes };
