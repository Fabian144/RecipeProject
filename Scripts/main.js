// Nedan skapar en array med varje recept objekt inuti och sparar det i en variabel
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

// Nedan är en funktion som lägger stjärnikon element in en variabel med rätt utseende (klasser) beroende på receptets omdöme
function recipeStarElements(recipe) {
	const stars = Math.round(recipe.rating[0].current_stars); // Rundar omdömet upp eller ner
	let starArray = new Array(); // En array som ska representera stjärnorna

	for (let i = 0; i < stars; i++) { // Lägger till siffran 1 i arrayen lika många gånger som omdömes värdet
		starArray.push(1);
	}

	for (let i = 0; i < 5 - stars; i++) { // Lägger till siffran 0 i arrayen tills arrayen innehåller 5 värden
		starArray.push(0);
	}

	recipe.starArray = starArray; // Lägger in arrayen i varje recept objekt

	let starIconElements = ``; // Variabel som ska inehålla element med stjärnikoner

	recipe.starArray.forEach((number) => { // Loopar igenom arrayen som lagts in i varje recept objekt
		number === 1
			? (starIconElements += `<i class="fa-solid fa-star fa-xl"></i>`) // Lägger till en ifylld stjärna i element variabeln för varje etta i arrayen
			: (starIconElements += `<i class="fa-regular fa-star fa-xl"></i>`); // Lägger till en icke ifylld stjärna i element variabeln för varje nolla i arrayen
	});

	return starIconElements;
}

export { recipes, recipeStarElements };
