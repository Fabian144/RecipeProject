import { recipes } from "./main.js";

let recipeCardHTML = ``;

recipes.forEach((recipe) => {
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

  recipeCardHTML += `<a class="recipe-card-link" href="./recipePage.html">

		<article class="recipe-card">
			<figure class="recipe-image-container">
				<img src="${recipe.image}" alt="${recipe.alt_text}">
			</figure>

			<div class="recipe-info-container">
				<h2 class="recipe-heading">
					${recipe.name}
				</h2>

				<div class="recipe-star-container">
					${starIconElements}
				</div>

				<p class="recipe-description">
					${recipe.description}
				</p>

			</div>

			<div class="recipe-detail-container">
				<hr>
				<p class="recipe-details">${recipe.ingredients.length} INGREDIENSER | ${recipe.cooking_time} MINUTER</p>
			</div>
			
		</article>
	</a>`;
});

document.body.innerHTML += recipeCardHTML;
