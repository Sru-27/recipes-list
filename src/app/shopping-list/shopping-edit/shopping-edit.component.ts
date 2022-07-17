import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {
  @ViewChild('f') slForm : NgForm;

  subscription:Subscription;
  editMode = false;
  editedItemIndex : number;
  editedItem : Ingredient;

  constructor(private slService : ShoppingListService) { }

  ngOnInit() {
   this.subscription = this.slService.startedEditing
        .subscribe( 
          (index : number) => {
              this.editedItemIndex = index; // allowing selection of items in the list
              this.editMode = true;
              this.editedItem = this.slService.getIngredient(index);
              this.slForm.setValue({
                name : this.editedItem.name,
                amount : this.editedItem.amount 
              }) // loading the shopping list items into the form
          } 
          );
  }
  onSubmit(form:NgForm){ // adding the shopping list form
       const value = form.value;
       const newIngredient = new Ingredient(value.name,value.amount);
       if(this.editMode){
        this.slService.updateIngredient(this.editedItemIndex,newIngredient); // updating existing item
       } else {
        this.slService.addIngredient(newIngredient);
       }
       this.editMode=false;
       form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  } // allowing the user to clear the form

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
