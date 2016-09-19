import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Ingredient } from './object-classes/ingredient';
import { Unit } from './object-classes/unit';
import { UnitService } from './services/unit.service';

@Component({
	selector: 'unit-detail',
	templateUrl: 'templates/components/unit-detail.component.html'
})
export class UnitDetailComponent implements OnInit {
	unit: Unit;

	constructor(
		private unitService: UnitService,
		private route: ActivatedRoute
	){}

	ngOnInit(): void
	{
		this.route.params.forEach((params: Params) => {
			let id = +params['id'];
			this.unitService.getUnit(id)
			.then(unit => this.unit = unit);
		});
	}
	goBack(): void
	{
		window.history.back();
	}

	save(): void
	{
		this.unitService.updateUnit(this.unit).then(this.goBack);
	}
}