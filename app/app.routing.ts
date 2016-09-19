import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail.component';
import { UnitsComponent } from './units.component';
import { UnitDetailComponent } from './unit-detail.component';

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
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);