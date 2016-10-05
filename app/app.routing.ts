import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail.component';
import { UnitsComponent } from './units.component';
import { UnitDetailComponent } from './unit-detail.component';
import { IngredientMetasComponent } from './ingredient-metas.component';
import { IngredientMetaDetailComponent } from './ingredient-meta-detail.component';

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/recipes',
		pathMatch: 'full'
	},
	{
		path: 'recipes',
		component: RecipesComponent
	},
	{
		path: 'recipes/:id',
		component: RecipeDetailComponent
	},
	{
		path: 'units',
		component: UnitsComponent
	},
	{
		path: 'units/:id',
		component: UnitDetailComponent
	},
	{
		path: 'units/new',
		component: UnitDetailComponent
	},
	{
		path: 'ingredient-metas',
		component: IngredientMetasComponent
	},
	{
		path: 'ingredient-metas/:id',
		component: IngredientMetaDetailComponent
	}
	,
	{
		path: 'ingredient-metas/new',
		component: IngredientMetaDetailComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);