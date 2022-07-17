import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit , OnDestroy{
  ingredients: Ingredient[] ;
  // store the subscription in some property and clean it up when we leave the component
  private igChangeSub : Subscription;

  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients=this.slService.getIngredients();
   this.igChangeSub = this.slService.ingredientsChanged.subscribe((ingredients : Ingredient[]) => {
      this.ingredients = ingredients;// to get the new ingredients in the list
    });

 // onIngredientAdded(ingredient:Ingredient){
//  this.ingredients.push(ingredient);
//  }

  }

  onEditItem(index:number){
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}