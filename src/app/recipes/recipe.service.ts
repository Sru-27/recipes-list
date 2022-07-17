import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()


export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();

private recipes:Recipe[]  =[
        new Recipe (
        'Pasta',
        'with bacon and tomato sauce',
        'https://i2.wp.com/dishesdelish.com/wp-content/uploads/2018/02/Bacon-Tomato-Pasta-Square-1.jpg',
        [
          new Ingredient('Bacon',5),
          new Ingredient('Canned Tomato',1),
          new Ingredient('Sphagetti',5),
          new Ingredient('Olive oil',1),
          new Ingredient('Garlic',1),
          new Ingredient('onion',2),
          new Ingredient('salt',1)
        ]),
        new Recipe ('Egg Masala',
        'Curry',
        'https://c.ndtvimg.com/2022-06/o2u67mso_egg-masala_625x300_08_June_22.jpg?im=FeatureCrop,algorithm=dnn,width=620,height=350',
        [
          new Ingredient('Boiled egg',4),
          new Ingredient('Ginger-garlic paste',1),
          new Ingredient('Chilli and turmeric powder',1),
          new Ingredient('cumin and coriander powder',1),
          new Ingredient('salt',1),
          new Ingredient('Onion',1),
          new Ingredient('Tomato',2)
        ])
      ];

      constructor(private slService : ShoppingListService){}

      getRecipes(){
        return this.recipes.slice(); // return direct reference to the array
        // slice will return the new array which is an exact copy of the one in the service file 
      }

      getRecipe(index:number) {
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients : Ingredient[]) {
         this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe:Recipe){
        this.recipes.push(recipe);  
        this.recipesChanged.next(this.recipes.slice()); 
      }

      updateRecipe(index:number,newRecipe:Recipe){
         this.recipes[index] = newRecipe;
         this.recipesChanged.next(this.recipes.slice()); 
      }

      deleteRecipe(index:number) {
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }
}