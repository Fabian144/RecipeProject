import { createApp } from "https://unpkg.com/vue@3.5.22/dist/vue.esm-browser.js";
import fetchData from "./modules/fetchRecipeData.js";

async function getRecipes() {
  const data = await fetchData(`../data/recept.json`);
  return data.recipes;
}

const recipes = await getRecipes();

const theApp = createApp({
  data() {
    return {
      recipes: recipes,
      votePerStar: 0,
      addedVote: 0,
      commentAmount: document.querySelectorAll("#commentList > .comment").length,
    };
  },
  methods: {
    newRating() {
      const newCommentAmount = document.querySelectorAll("#commentList > .comment").length;

      if (this.addedVote > 0 && newCommentAmount > this.commentAmount) {
        const recipeHeading = document.querySelector(".recipe_title").innerText;
        const recipe = recipes.filter((recipe) => recipe.name === recipeHeading)[0];
        console.log("This vote: " + this.addedVote);

        let currentRating = recipe.rating[0].current_stars;
        let currentVotes = recipe.rating[1].total_votes;

        const newRating = (currentRating * currentVotes + this.addedVote) / (currentVotes + 1);

        recipe.rating[0].current_stars = newRating;
        recipe.rating[1].total_votes++;
        console.log(
          "New average rating: " + recipe.rating[0].current_stars,
          "New total votes: " + recipe.rating[1].total_votes
        );

        this.commentAmount++;
      }
    },

    hoverStars() {
      const starIcons = document.querySelectorAll(".fa-star");
      starIcons.forEach((starIcon) => {
        const starIconStyle = window.getComputedStyle(starIcon);
        if (starIconStyle.cursor == "pointer") {
          starIcon.classList.add("fa-solid");
        } else {
          starIcon.classList.remove("fa-solid");
        }
      });
    },

    logRating(vote) {
      this.addedVote = vote + 1;
    },
  },
  mounted() {
    const icons = document.querySelectorAll(".fa-star");
    icons.forEach((icon) => {
      const vote = this.votePerStar++;
      icon.addEventListener("mouseover", this.hoverStars);
      icon.addEventListener("click", () => this.logRating(vote));
    });

    document.querySelector("#addComment").addEventListener("click", this.newRating);
  },
});

theApp.mount("#rating-section");
