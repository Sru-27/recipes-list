import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
recipe:Recipe;
id : number;
  constructor(private recipeService : RecipeService,
              private route : ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    // want to react to changes in route params so use subscribe
    this.route.params
       .subscribe(
        (params : Params) => {
            this.id = +params['id'];
            this.recipe = this.recipeService.getRecipe(this.id);
        } // configuring route parameters
       );
  }

  onAddToShoppingList(){
       this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo : this.route});
    //this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id); // deleting a recipe
    this.router.navigate(['/recipes']); // redirecting the user after deleting a recipe
  }

}
