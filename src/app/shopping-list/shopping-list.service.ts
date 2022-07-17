import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
  private ingredients: Ingredient[] =[
        new Ingredient('Bacon',1),
        new Ingredient('Canned tomato',1),
      ]; 

      getIngredients(){
        return this.ingredients.slice();
      }

      getIngredient(index:number){
           return this.ingredients[index];
      }

      addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
      
      addIngredients(ingredients : Ingredient[]){
      this.ingredients.push(...ingredients); // array can push only single object so using spread operator
      this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index:number,newIngredient:Ingredient){
      this.ingredients[index]=newIngredient;
      this.ingredientsChanged.next(this.ingredients.slice());
    } //updating existing item

    deleteIngredient(index:number){
      this.ingredients.splice(index,1);
      this.ingredientsChanged.next(this.ingredients.slice());
    } // allowing the deletion of shopping list item
}