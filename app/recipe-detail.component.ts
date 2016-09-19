import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Ingredient } from './object-classes/ingredient';
import { Recipe } from './object-classes/recipe';
import { RecipeService } from './services/recipe.service';

@Component({
	selector: 'recipe-detail',
	templateUrl: 'templates/components/recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
	recipe: Recipe;

	constructor(
		private recipeService: RecipeService,
		private route: ActivatedRoute
	){}

	ngOnInit(): void
	{
		this.route.params.forEach((params: Params) => {
			let id = +params['id'];
			this.recipeService.getRecipe(id)
			.then(recipe => this.recipe = recipe);
		});
	}
	goBack(): void
	{
		window.history.back();
	}

	save(): void
	{
		this.recipeService.updateRecipe(this.recipe).then(this.goBack);
	}
}