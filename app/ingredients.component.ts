import { Component, Input, OnInit, ElementRef, AfterViewInit } from '@angular/core';

import { Ingredient, IngredientShow } from './object-classes/ingredient';
import { IngredientService } from './services/ingredient.service';

import { Unit } from './object-classes/unit';
import { UnitService } from './services/unit.service';

import { IngredientMeta } from './object-classes/ingredient-meta';
import { IngredientMetaService } from './services/ingredient-meta.service';


declare var jQuery:any;

@Component({
	selector: 'ingredients',
	templateUrl: 'templates/components/ingredients.component.html'
})
export class IngredientsComponent implements OnInit, AfterViewInit {
	ingredients: Ingredient[];
	newIngredient: Ingredient = new Ingredient;
	validationMessage: string;

	@Input()
	recipeId: number;

	constructor(
		private ingredientService: IngredientService,
		private unitService: UnitService,
		private ingredientMetaService: IngredientMetaService,
		private elementRef: ElementRef
		//private route: ActivatedRoute,
		//private router: Router
	){}

	ngOnInit(): void
	{
		this.ingredientService.getIngredients(this.recipeId)
		.then(ingredients => this.ingredients = ingredients)
		.then(() => this.populateIngredients());
	}

	ngAfterViewInit(): void
	{
		var __this = this;

		// UNITS
		this.unitService.getUnits()
		.then(units => {
			jQuery(this.elementRef.nativeElement)
			.find('#unit_id')
			.typeahead({
				source:units, 
				fitToElement: true,
				afterSelect: function(obj){
					__this.newIngredient.unit_id = obj.id;
				}
			});
		});

		// INGREDIENT METAS
		this.ingredientMetaService.getMetas()
		.then(metas => {
			jQuery(this.elementRef.nativeElement)
			.find('#ingredient_meta_id')
			.typeahead({
				source:metas, 
				fitToElement: true,
				//addItem: {name: "Add this item", id: -1},
				afterSelect: function(obj){
					if(obj.id === -1)
					{
						console.log("add new item");
					}
					else
					{
						__this.newIngredient.ingredient_meta_id = obj.id;
					}
				}
			});
		});
	}

	addIngredient(): void
	{
		if(this.newIngredient.amount && this.newIngredient.ingredient_meta_id && this.newIngredient.unit_id)
		{
			this.validationMessage = "";
			this.newIngredient.recipe_id = this.recipeId;
			this.saveNewIngredient(this.newIngredient)
			.then(ingredient => this.ingredients.push(ingredient))
			.then(() => this.populateIngredients())
			.then(() => this.resetNewIngredient());
		}
		else
		{
			this.validationMessage = "Fill in all fields!";
		}
	}

	removeIngredient(ingredient: Ingredient): void {
		console.log("ingredient",ingredient,"id",ingredient.id);
		this.ingredientService.deleteIngredient(ingredient.id)
		.then(() => {
			this.ingredients = this.ingredients.filter(i => i!==ingredient);
		});
	}

	saveNewIngredient(ingredient: Ingredient): Promise<Ingredient>
	{
		return this.ingredientService.createIngredient(ingredient));
	}

	resetNewIngredient(): void
	{
		this.newIngredient = new Ingredient;
		var nativeElm = jQuery(this.elementRef.nativeElement);
		nativeElm.find('#ingredient_meta_id').val('');
		nativeElm.find('#unit_id').val('');
	}

	populateIngredients(): void
	{
		this.ingredientService.populateIngredients(this.ingredients)
		.then(ingredients => this.ingredients = ingredients);
	}

}