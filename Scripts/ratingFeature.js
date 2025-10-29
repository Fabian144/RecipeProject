import { createApp } from "https://unpkg.com/vue@3.5.22/dist/vue.esm-browser.js";
import recipes from "./modules/fetchRecipeData.js";

const theApp = createApp({
  data() {
    return {
      recipes,
      starIcons: "",
      // votePerStar: 0,
      addedVote: 0,
      commentAmount: document.querySelectorAll("#commentList > .comment").length,
      stars: [
        { value: 1, isEmpty: true, isHovered: false, class: "fa-regular fa-star fa-xl" },
        { value: 2, isEmpty: true, isHovered: false, class: "fa-regular fa-star fa-xl" },
        { value: 3, isEmpty: true, isHovered: false, class: "fa-regular fa-star fa-xl" },
        { value: 4, isEmpty: true, isHovered: false, class: "fa-regular fa-star fa-xl" },
        { value: 5, isEmpty: true, isHovered: false, class: "fa-regular fa-star fa-xl" },
      ],
    };
  },

  computed: {
    eachStar() {
      this.stars.forEach((star) => {
        if (!star.isEmpty === true && star.value === this.addedVote) {
          star.class = "fa-solid fa-star fa-xl";
          this.addedVote = star.value;
        } else {
          star.class = "fa-regular fa-star fa-xl";
        }
      });

      return this.stars;
    },
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

        this.commentAmount = document.querySelectorAll("#commentList > .comment").length;
      }
    },

    // chosenStar(votePerStar, starIcon) {
    //   return starIcon.classList.contains(`${votePerStar}`);
    // },

    // hoverStars(votePerStar) {
    //   this.starIcons.forEach((starIcon) => {
    //     if (this.addedVote === 0 && this.chosenStar(votePerStar, starIcon)) {
    //       starIcon.classList.add("fa-solid");
    //     }
    //   });
    // },

    // stopHoverStars() {
    //   this.starIcons.forEach((starIcon) => {
    //     if (this.addedVote === 0) {
    //       starIcon.classList.remove("fa-solid");
    //     }
    //   });
    // },

    // logRating(votePerStar) {
    //   this.addedVote = votePerStar;

    // this.starIcons.forEach((starIcon) => {
    //   if (this.chosenStar(votePerStar, starIcon)) {
    //     starIcon.classList.add("fa-solid");
    //   } else {
    //     starIcon.classList.remove("fa-solid");
    //   }
    // });
    //   },
    // },
  },

  mounted() {
    // const icons = document.querySelectorAll(".fa-star");
    // icons.forEach((icon) => {
    //   this.votePerStar++;
    //   const votePerStar = this.votePerStar;

    //   icon.addEventListener("mouseover", () => this.hoverStars(votePerStar));
    //   icon.addEventListener("mouseout", this.stopHoverStars);
    //   icon.addEventListener("click", () => this.logRating(votePerStar));
    // });

    document.querySelector("#addComment").addEventListener("click", this.newRating);

    this.starIcons = document.querySelectorAll(".fa-star");
  },
});

theApp.mount("#rating-section");
