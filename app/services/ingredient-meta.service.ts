import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { API_BASE_URL } from './api-url'; //This file is not in version control, contains a simple CONST string

import 'rxjs/add/operator/toPromise';

import { IngredientMeta } from '../object-classes/ingredient-meta';

@Injectable()
export class IngredientMetaService
{
	private ingredientMetasUrl = API_BASE_URL + '/ingredient-metas';
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http){}

	getMetas(): Promise<IngredientMeta[]> {
		return this.http.get(this.ingredientMetasUrl)
		.toPromise()
		.then(response=> response.json().ingredient_metas as IngredientMeta[])
		.catch(this.handleError);
	}

	getMeta(id: number): Promise<IngredientMeta>
	{
		return this.http.get(`${this.ingredientMetasUrl}/${id}`)
		.toPromise()
		.then(response=> response.json().ingredient_metas[0] as IngredientMeta)
		.catch(this.handleError);
	}

	getNewMeta(): Promise<IngredientMeta>
	{
		return new Promise<IngredientMeta>((resolve, reject) => {
			var meta = new IngredientMeta;
			meta.id = null;
			meta.name = "";
			meta.plural_name = "";

			resolve(meta);
		});
	}

	updateMeta(meta: IngredientMeta): Promise<IngredientMeta>
	{
		var objToReturn = {ingredient_metas: [meta]}; 				// Webservice expects an array of ingredient_metas

		// Code for actual request
		return this.http.put(`${this.ingredientMetasUrl}/${meta.id}`, JSON.stringify(objToReturn),{headers:this.headers})
		.toPromise()
		.then(()=> meta)
		.catch(this.handleError);
	}

	createMeta(meta: IngredientMeta): Promise<IngredientMeta>
	{
		var objToReturn = {ingredient_metas: [meta]}; 				// Webservice expects an array of units
		// Code for actual request
		return this.http.post(`${this.ingredientMetasUrl}`, JSON.stringify(objToReturn),{headers:this.headers})
		.toPromise()
		.then(()=> meta)
		.catch(this.handleError);
	}
	
	deleteMeta(id: number): Promise<void>
	{
		return this.http.delete(`${this.ingredientMetasUrl}/${id}`,{headers:this.headers})
		.toPromise()
		.then(()=> null)
		.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
	}
}