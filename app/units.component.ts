import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Unit } from './object-classes/unit';
import { UnitService } from './services/unit.service';

@Component({
	selector: 'units-list',
	templateUrl: 'templates/components/units.component.html'
})
export class UnitsComponent implements OnInit {
	units: Unit[];

	constructor(
		private unitService: UnitService,
		private router: Router
	){}

	ngOnInit(): void
	{
		this.getUnits();
	}

	getUnits():void
	{
		this.unitService.getUnits().then(units => this.units = units);
	}
	goToDetail(unit: Unit): void
	{
		this.router.navigate(['/units',unit.id]);
	}

	newUnit():void
	{
		this.router.navigate(['/units/new/']);
	}

	delete(unit: Unit): void
	{
		if(confirm("Are you sure you want to delete this unit?"))
		{
			this.unitService.deleteUnit(unit.id)
			.then(() => {
				this.units = this.units.filter(u => u!==unit);
			});
		}
	}
}