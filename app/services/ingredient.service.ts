import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { API_BASE_URL } from './api-url'; //This file is not in version control, contains a simple CONST string

import 'rxjs/add/operator/toPromise';

import { Unit } from '../object-classes/unit';
import { UnitService } from './unit.service';

import { IngredientMeta } from '../object-classes/ingredient-meta';
import { IngredientMetaService } from './ingredient-meta.service';

import { Ingredient, IngredientShow } from '../object-classes/ingredient';


@Injectable()
export class IngredientService
{
	private ingredientsUrl = API_BASE_URL + '/ingredients';
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(
		private http: Http,
		private unitService: UnitService,
		private ingredientMetaService: IngredientMetaService
	){}

	getIngredients(recipeId: number): Promise<Ingredient[]> {
		return this.http.get(this.ingredientsUrl+"?recipeid="+recipeId)
		.toPromise()
		.then(response=> response.json().ingredients as Ingredient[])
		.catch(this.handleError);
	}

	populateIngredients(ingredients: Ingredient[]): Promise<Ingredient[]> {

		for (let ingredient of ingredients)
		{
			ingredient.ingredient_show = new IngredientShow;

			this.populateUnitData(ingredient).then(unit => ingredient.ingredient_show.unit = unit);
			this.populateIngredientMetaData(ingredient).then(meta => ingredient.ingredient_show.ingredient_meta = meta);
		}
		
		return Promise.resolve(ingredients);
		
	}

	populateUnitData(ingredient: Ingredient): Promise<Unit> {
		var unit_id = ingredient.unit_id;
		return this.unitService.getUnit(unit_id).then(unit => unit as Unit);
	}

	populateIngredientMetaData(ingredient: Ingredient): Promise<IngredientMeta> {
		var meta_id = ingredient.ingredient_meta_id;
		return this.ingredientMetaService.getMeta(meta_id).then(meta => meta as IngredientMeta);
	}

	/*
	getNewMeta(): Promise<Ingredient>
	{
		return new Promise<Ingredient>((resolve, reject) => {
			var meta = new Ingredient;
			meta.id = null;
			meta.name = "";
			meta.plural_name = "";

			resolve(meta);
		});
	}

	updateMeta(meta: Ingredient): Promise<Ingredient>
	{
		var objToReturn = {ingredient_ingredients: [meta]}; 				// Webservice expects an array of ingredient_ingredients

		// Code for actual request
		return this.http.put(`${this.ingredientsUrl}/${meta.id}`, JSON.stringify(objToReturn),{headers:this.headers})
		.toPromise()
		.then(()=> meta)
		.catch(this.handleError);
	}

	createMeta(meta: Ingredient): Promise<Ingredient>
	{
		var objToReturn = {ingredient_ingredients: [meta]}; 				// Webservice expects an array of units
		// Code for actual request
		return this.http.post(`${this.ingredientsUrl}`, JSON.stringify(objToReturn),{headers:this.headers})
		.toPromise()
		.then(()=> this._ingredients.push(meta))
		.then(()=> meta)
		.catch(this.handleError);
	}
	
	deleteMeta(id: number): Promise<void>
	{
		return this.http.delete(`${this.ingredientsUrl}/${id}`,{headers:this.headers})
		.toPromise()
		.then(()=> this._ingredients = this._ingredients.filter(m=>m.id!=id))
		.catch(this.handleError);
	}
	*/
	private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
	}
}