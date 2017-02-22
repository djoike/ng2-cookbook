import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { API_BASE_URL, API_KEY } from './api-url'; //This file is not in version control, contains a simple CONST string


import 'rxjs/add/operator/toPromise';

import { Recipe } from '../object-classes/recipe';

@Injectable()
export class RecipeService
{
	private recipesUrl = API_BASE_URL + '/recipes';
	//private recipesUrl = 'http://obscure-lowlands-14758.herokuapp.com/recipes';
	private headers = new Headers({'Content-Type': 'application/json','Custom-Auth-String':API_KEY});

	constructor(private http: Http){}

	getRecipes(): Promise<Recipe[]> {
		return this.http.get(this.recipesUrl)
		.toPromise()
		.then(response=> response.json().recipes as Recipe[])
		.catch(this.handleError);
	}

	getRecipe(id: number): Promise<Recipe>
	{
		return this.http.get(`${this.recipesUrl}/${id}`)
		.toPromise()
		.then(response=> response.json().recipes[0] as Recipe)
		.catch(this.handleError);
	}

	getNewRecipe(): Promise<Recipe>
	{
		var recipe = new Recipe;
		recipe.id = null;
		recipe.name = "";

		return Promise.resolve(recipe);	
	}

	updateRecipe(recipe: Recipe): Promise<Recipe>
	{
		var objToReturn = {recipes: [recipe]};
		
		return this.http.put(`${this.recipesUrl}/${recipe.id}`, JSON.stringify(objToReturn),{headers:this.headers})
		.toPromise()
		.then(()=> recipe)
		.catch(this.handleError);
	}

	createRecipe(recipe: Recipe): Promise<Recipe>
	{
		var objToReturn = {recipes: [recipe]};
		
		return this.http.post(`${this.recipesUrl}`, JSON.stringify(objToReturn),{headers:this.headers})
		.toPromise()
		.then((response)=> {
			recipe.id = response.json().id; 
			return recipe;
		})
		.catch(this.handleError);
	}
	
	deleteRecipe(id: number): Promise<void>
	{
		return this.http.delete(`${this.recipesUrl}/${id}`,{headers:this.headers})
		.toPromise()
		.then(()=> null)
		.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
	}
}