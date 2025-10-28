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
  const data = await fetchData(`../data/recept.json`);
  return data.recipes;
}

// Innehåller en array med varje recept objekt inuti så att man enkelt kan använda recept datat var som helst
const recipes = await getRecipes();

export default recipes;
