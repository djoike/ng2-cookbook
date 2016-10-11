import { Component, Input, OnInit } from '@angular/core';

import { Ingredient, IngredientShow } from './object-classes/ingredient';
import { IngredientService } from './services/ingredient.service';

@Component({
	selector: 'ingredients',
	templateUrl: 'templates/components/ingredients.component.html'
})
export class IngredientsComponent implements OnInit {
	ingredients: Ingredient[];
	
	@Input()
	recipeId: number;

	constructor(
		private ingredientService: IngredientService
		//private route: ActivatedRoute,
		//private router: Router
	){}

	ngOnInit(): void
	{
		
		this.ingredientService.getIngredients(this.recipeId)
		.then(ingredients => this.ingredients = ingredients)
		.then(() => this.populateIngredients());
	}

	populateIngredients(): void
	{
		this.ingredientService.populateIngredients(this.ingredients)
		.then(ingredients => this.ingredients = ingredients):
	}
}