import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Ingredient } from './object-classes/ingredient';
import { Unit } from './object-classes/unit';
import { UnitService } from './services/unit.service';

@Component({
	selector: 'unit-detail',
	templateUrl: 'templates/components/unit-detail.component.html'
})
export class UnitDetailComponent implements OnInit {
	unit: Unit;
	isNewUnit: boolean = false;

	constructor(
		private unitService: UnitService,
		private route: ActivatedRoute,
		private router: Router
	){}

	ngOnInit(): void
	{
		this.route.params.forEach((params: Params) => {
			let id = +params['id'];
			if(id)
			{
				this.unitService.getUnit(id)
				.then(unit => this.unit = unit);
			}
			else
			{
				this.isNewUnit = true;
				this.unitService.getNewUnit()
				.then(unit => this.unit = unit);
			}
		});
	}
	goBack(): void
	{
		this.router.navigate(['/units']);
	}

	save(): void
	{
		if(this.isNewUnit)
		{
			this.unitService.createUnit(this.unit).then(() => this.goBack());
		}
		else
		{
			this.unitService.updateUnit(this.unit).then(() => this.goBack());
		}
	}

	pluralChange(newValue): void
	{
		this.unit.triggers_plural = +newValue;
	}
}