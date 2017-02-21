import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from './object-classes/recipe';
import { RecipeService } from './services/recipe.service';

@Component({
	selector: 'recipes-list',
	templateUrl: 'templates/components/recipes.component.html'
})
export class RecipesComponent implements OnInit {
	recipes: Recipe[];

	constructor(
		private recipeService: RecipeService,
		private router: Router
	){}

	ngOnInit(): void
	{
		this.getRecipes();
	}

	getRecipes():void
	{
		this.recipeService.getRecipes().then(recipes => this.recipes = recipes);
	}

	newRecipe():void
	{
		this.router.navigate(['/recipes/new/']);
	}

	goToDetail(recipe: Recipe): void
	{
		this.router.navigate(['/recipes',recipe.id]);
	}

	delete(recipe: Recipe): void
	{
		if(confirm("Are you sure you want to delete this recipe?"))
		{
			this.recipeService.deleteRecipe(recipe.id)
			.then(() => {
				this.recipes = this.recipes.filter(r => r!==recipe);
			});
		}
	}
}