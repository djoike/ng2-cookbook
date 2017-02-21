import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Recipe } from './object-classes/recipe';
import { RecipeService } from './services/recipe.service';

@Component({
	selector: 'recipe-detail',
	templateUrl: 'templates/components/recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
	recipe: Recipe;
	isNewRecipe: boolean = false;

	constructor(
		private recipeService: RecipeService,
		private route: ActivatedRoute,
		private router: Router
	){}

	ngOnInit(): void
	{
		this.route.params.forEach((params: Params) => {
			let id = +params['id'];
			if(id)
			{
				console.log("a");
				this.recipeService.getRecipe(id)
				.then(recipe => this.recipe = recipe);
			}
			else
			{
				console.log("b");
				this.isNewRecipe = true;
				this.recipeService.getNewRecipe()
				.then(recipe => this.recipe = recipe);
			}
		});
	}
	goBack(): void
	{
		this.router.navigate(['/recipes']);
	}

	save(): void
	{
		if(this.isNewRecipe)
		{
			this.recipeService.createRecipe(this.recipe).then((recipe) => {
				this.recipe = recipe;
				this.isNewRecipe = false;
			});	
		}
		else
		{
			this.recipeService.updateRecipe(this.recipe).then(()=>this.goBack());	
		}
		
	}
}