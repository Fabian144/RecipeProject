const { createApp } = Vue;

createApp({
  data() 
  {
    return {
      test123: '',
      recipeVar: '',
      recipeNameVar: '',
      cookTimeVar: '',
      //countDownVar: '',
      ingredientsVar: [],
      stepsVar: [],
      imageVar: '',
      //imageVarRefined: ''
      ingredientsAmountVar: 0,

    };
  },
  async mounted() 
  {
    const res = await fetch('./data/recept.json');
    const data = await res.json();
    const recipeData = data.recipes[0]; 
    /* -"0"kommer behövas bytas ut mot variabel, beroende på användares selection. 
    If-sats som väljer recept ifall det matchar json?
    - Lägga till throw, try, catch ifall något går fel vid fetch???
    */
    
    this.recipeVar = recipeData;
    this.recipeNameVar = recipeData.name;
    this.cookTimeVar = recipeData.cooking_time;
    this.ingredientsVar = recipeData.ingredients;
    this.stepsVar = recipeData.steps;
    this.imageVar = recipeData.image; //verkar inte funka
    this.ingredientsAmountVar = recipeData.ingredients.length;
    //this.imageVarRefined = `<img src="${this.imageVar}" alt="${this.imageVar}">`; // funkar inte :|
  },

  methods: 
  {

  },


}).mount('#app');
