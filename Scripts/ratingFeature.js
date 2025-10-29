import { createApp } from "https://unpkg.com/vue@3.5.22/dist/vue.esm-browser.js";
import recipes from "./modules/fetchRecipeData.js";

const theApp = createApp({
  data() {
    return {
      recipes,
      addedVote: 0,
      commentAmount: document.querySelectorAll("#commentList > .comment").length,
      stars: [
        { voteValue: 1, class: `${this.empty()}` },
        { voteValue: 2, class: `${this.empty()}` },
        { voteValue: 3, class: `${this.empty()}` },
        { voteValue: 4, class: `${this.empty()}` },
        { voteValue: 5, class: `${this.empty()}` },
      ],
    };
  },

  methods: {
    empty() {
      return "fa-regular fa-star fa-xl";
    },

    filled() {
      return "fa-solid fa-star fa-xl";
    },

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

        this.commentAmount = document.querySelectorAll("#commentList > .comment").length;
      }
    },

    hoverStars(chosenIcon) {
      if (this.addedVote === 0) {
        this.stars.forEach((starIcon) => {
          if (starIcon.voteValue <= chosenIcon.voteValue) {
            starIcon.class = this.filled();
          } else {
            starIcon.class = this.empty();
          }
        });
      }
    },

    hoverStarsOff() {
      if (this.addedVote === 0) {
        this.stars.forEach((starIcon) => {
          starIcon.class = this.empty();
        });
      }
    },

    logRating(chosenIcon) {
      if (this.addedVote !== chosenIcon.voteValue) {
        this.addedVote = chosenIcon.voteValue;

        this.stars.forEach((starIcon) => {
          if (starIcon.voteValue < this.addedVote) {
            starIcon.class = this.filled();
          } else {
            starIcon.class = this.empty();
          }
        });

        chosenIcon.class = this.filled();
      } else {
        this.addedVote = 0;
        this.stars.forEach((starIcon) => {
          starIcon.class = this.empty();
        });
      }
    },
  },

  mounted() {
    const commentButton = document.querySelector("#addComment");
    commentButton.addEventListener("click", this.newRating);
  },
});

theApp.mount("#rating-section");
