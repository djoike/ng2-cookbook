import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { API_BASE_URL } from './api-url'; //This file is not in version control, contains a simple CONST string

import 'rxjs/add/operator/toPromise';

import { Unit } from '../object-classes/unit';

@Injectable()
export class UnitService
{
	private unitUrl = API_BASE_URL + '/unit-data';
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http){}

	getUnits(): Promise<Unit[]> {
		return this.http.get(this.unitUrl)
		.toPromise()
		.then(response=> response.json().unit_data as Unit[])
		.catch(this.handleError);
	}

	getUnit(id: number): Promise<Unit>
	{
		return this.http.get(`${this.unitUrl}/${id}`)
		.toPromise()
		.then(response=> response.json().unit_data[0] as Unit)
		.catch(this.handleError);
	}

	getNewUnit(): Promise<Unit>
	{
		return new Promise<Unit>((resolve, reject) => {
			var unit = new Unit;
			unit.id = null;
			unit.name = "";
			unit.short = "";
			unit.triggers_plural = 0;
			unit.is_headline = false;

			resolve(unit);
		});
	}

	updateUnit(unit: Unit): Promise<Unit>
	{
		var objToReturn = {unit_data: [unit]}; 				// Webservice expects an array of units

		// Code for actual request
		return this.http.put(`${this.unitUrl}/${unit.id}`, JSON.stringify(objToReturn),{headers:this.headers})
		.toPromise()
		.then(()=> unit)
		.catch(this.handleError);
	}

	createUnit(unit: Unit): Promise<Unit>
	{
		var objToReturn = {unit_data: [unit]}; 				// Webservice expects an array of units
		// Code for actual request
		return this.http.post(`${this.unitUrl}`, JSON.stringify(objToReturn),{headers:this.headers})
		.toPromise()
		.then(()=> unit)
		.catch(this.handleError);
	}
	
	deleteUnit(id: number): Promise<void>
	{
		return this.http.delete(`${this.unitUrl}/${id}`,{headers:this.headers})
		.toPromise()
		.then(()=> null)
		.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
	}
}