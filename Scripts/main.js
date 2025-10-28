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
    };
  },
  methods: {
    recipeRating(recipe) {
      return Math.round(recipe.rating[0].current_stars);
    },
  },
  mounted() {
    const icons = document.querySelectorAll(".fa-solid");
    icons.forEach((icon) => {
      if (icon.classList.contains("fa-regular")) {
        icon.classList.remove("fa-regular");
      }
    });
  },
});

theApp.mount("#recipe-card");
