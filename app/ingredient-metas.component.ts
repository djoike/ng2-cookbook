import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IngredientMeta } from './object-classes/ingredient-meta';
import { IngredientMetaService } from './services/ingredient-meta.service';

@Component({
	selector: 'ingredients-meta-list',
	templateUrl: 'templates/components/ingredient-metas.component.html'
})
export class IngredientMetasComponent implements OnInit {
	metas: IngredientMeta[];

	constructor(
		private ingredientsMetaService: IngredientMetaService,
		private router: Router
	){}

	ngOnInit(): void
	{
		this.getMetas();
	}

	getMetas():void
	{
		this.ingredientsMetaService.getMetas().then(metas => this.metas = metas);
	}
	goToDetail(meta: IngredientMeta): void
	{
		this.router.navigate(['/ingredient-metas',meta.id]);
	}

	newMeta():void
	{
		this.router.navigate(['/ingredient-metas/new/']);
	}

	delete(meta: IngredientMeta): void
	{
		if(confirm("Are you sure you want to delete this meta?"))
		{
			this.ingredientsMetaService.deleteMeta(meta.id)
			.then(() => {
				this.metas = this.metas.filter(m => m!==meta);
			});
		}
	}
}