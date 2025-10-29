import { createApp } from "https://unpkg.com/vue@3.5.22/dist/vue.esm-browser.js";
import recipes from "./modules/fetchRecipeData.js";

const theApp = createApp({
  data() {
    return {
      recipes,
      stars: [{ rating: 1 }, { rating: 2 }, { rating: 3 }, { rating: 4 }, { rating: 5 }],
    };
  },
  methods: {
    recipeRating(recipe) {
      return Math.round(recipe.rating[0].current_stars);
    },
  },
});

theApp.mount("#recipe-card");
