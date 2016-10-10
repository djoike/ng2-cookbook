import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import './rxjs-extensions';

import { routing } from './app.routing';


// App components
import { CookBookComponent }         from './cook-book.component';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail.component';
import { UnitsComponent } from './units.component';
import { UnitDetailComponent } from './unit-detail.component';
import { IngredientMetasComponent } from './ingredient-metas.component';
import { IngredientMetaDetailComponent } from './ingredient-meta-detail.component';
import { IngredientsComponent } from './ingredients.component';

//Services
import { RecipeService } from './services/recipe.service';
import { UnitService } from './services/unit.service';
import { IngredientMetaService } from './services/ingredient-meta.service';
import { IngredientService } from './services/ingredient.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    CookBookComponent,
    RecipesComponent,
    RecipeDetailComponent,
    UnitsComponent,
    UnitDetailComponent,
    IngredientMetasComponent,
    IngredientMetaDetailComponent,
    IngredientsComponent
  ],
  providers: [
    RecipeService,
    UnitService,
    IngredientMetaService,
    IngredientService
  ],
  bootstrap: [ CookBookComponent ]
})
export class AppModule {
}
