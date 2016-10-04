import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';


import { IngredientMeta } from './object-classes/ingredient-meta';
import { IngredientMetaService } from './services/ingredient-meta.service';

@Component({
	selector: 'ingredient-meta-detail',
	templateUrl: 'templates/components/ingredient-meta-detail.component.html'
})
export class IngredientMetaDetailComponent implements OnInit {
	meta: IngredientMeta;
	isNewMeta: boolean = false;

	constructor(
		private ingredientsMetaService: IngredientMetaService,
		private route: ActivatedRoute,
		private router: Router
	){}

	ngOnInit(): void
	{
		this.route.params.forEach((params: Params) => {
			let id = +params['id'];
			if(id)
			{
				this.ingredientsMetaService.getMeta(id)
				.then(meta => this.meta = meta);
			}
			else
			{
				this.isNewMeta = true;
				this.ingredientsMetaService.getNewMeta()
				.then(meta => this.meta = meta);
			}
		});
	}
	goBack(): void
	{
		this.router.navigate(['/ingredient-metas']);
	}

	save(): void
	{
		if(this.isNewMeta)
		{
			this.ingredientsMetaService.createMeta(this.meta).then(() => this.goBack());
		}
		else
		{
			this.ingredientsMetaService.updateMeta(this.meta).then(() => this.goBack());
		}
	}
}