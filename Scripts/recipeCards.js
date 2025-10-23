import { recipes } from "./main.js";

let recipeCardHTML = ``;

recipes.forEach((recipe) => {
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
