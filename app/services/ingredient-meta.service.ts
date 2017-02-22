import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { API_BASE_URL, API_KEY } from './api-url'; //This file is not in version control, contains a simple CONST string

import 'rxjs/add/operator/toPromise';

import { IngredientMeta } from '../object-classes/ingredient-meta';

@Injectable()
export class IngredientMetaService
{
	private ingredientMetasUrl = API_BASE_URL + '/ingredient-metas';
	private headers = new Headers({'Content-Type': 'application/json','Custom-Auth-String':API_KEY});
	private _metas;

	constructor(private http: Http){}

	getMetas(): Promise<IngredientMeta[]> {
		if(this._metas)
		{
			return Promise.resolve(this._metas);	
		}
		else
		{
			return this.refreshMetas();
		}
		
	}

	refreshMetas(): Promise<IngredientMeta[]> {
		return this.http.get(this.ingredientMetasUrl)
		.toPromise()
		.then((response)=> {
			let metas = response.json().ingredient_metas as IngredientMeta[];
			this._metas = metas;
			return metas;
		})
		.catch(this.handleError);
	}

	getMeta(id: number): Promise<IngredientMeta>
	{
		return this.getMetas().then(metas => metas.filter(meta=>meta.id==id)[0]);
	}

	getNewMeta(): Promise<IngredientMeta>
	{
		var meta = new IngredientMeta;
		meta.id = null;
		meta.name = "";
		meta.plural_name = "";

		return Promise.resolve(meta);	
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
		.then(()=> this._metas.push(meta))
		.then(()=> meta)
		.catch(this.handleError);
	}
	
	deleteMeta(id: number): Promise<void>
	{
		return this.http.delete(`${this.ingredientMetasUrl}/${id}`,{headers:this.headers})
		.toPromise()
		.then(()=> this._metas = this._metas.filter(m=>m.id!=id))
		.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
	}
}