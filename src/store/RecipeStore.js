import { action, makeObservable, observable, autorun } from 'mobx';
import { RECIPE_SEARCH_URL } from '../constants';

class RecipeStore {
    // Default State
    recipes = []

    constructor(recipes) {
        makeObservable(this, {
            recipes: observable,
            updateRecipes: action       
        });
        autorun(this.logRecipeDetails);
    }

    logRecipeDetails = () => {
        console.log(`Recipe length:`, this.recipes?.length);
    }

    queryRecipes = (searchQuery) => {
        fetch(`${RECIPE_SEARCH_URL}${searchQuery}`).then(res => res.json()).then(res => {
            this.updateRecipes(res)
        })
    }

    updateRecipes = (res) => {
        if (res?.hits)
            this.recipes = res?.hits
        else
            this.recipes = []
    }

}

export default RecipeStore;