import { createApp } from "https://unpkg.com/vue@3.5.22/dist/vue.esm-browser.js";
import recipes from "./modules/fetchRecipeData.js";

const theApp = createApp({
  data() {
    return {
      recipes: recipes,
      vote: 1,
    };
  },
  methods: {
    newRating(newVote) {
      const recipeHeading = document.querySelector(".recipe_title").innerText;
      const recipe = recipes.filter((recipe) => recipe.name === recipeHeading)[0];
      console.log("This vote: " + newVote);

      let currentRating = recipe.rating[0].current_stars;
      let currentVotes = recipe.rating[1].total_votes;

      const newRating = (currentRating * currentVotes + newVote) / (currentVotes + 1);

      recipe.rating[0].current_stars = newRating;
      recipe.rating[1].total_votes++;
      console.log(
        "New average rating: " + recipe.rating[0].current_stars,
        "New total votes: " + recipe.rating[1].total_votes
      );
    },
  },
  mounted() {
    const icons = document.querySelectorAll(".recipe-star-container > i");
    icons.forEach((icon) => {
      const vote = this.vote++;
      icon.addEventListener("click", () => this.newRating(vote));
    });
  },
});

theApp.mount("#rating-section");
