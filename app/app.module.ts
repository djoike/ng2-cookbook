import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import './rxjs-extensions';

import { routing }              from './app.routing';


// App components
import { CookBookComponent }         from './cook-book.component';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail.component';
import { UnitsComponent } from './units.component';
import { UnitDetailComponent } from './unit-detail.component';

//Services
import { RecipeService } from './services/recipe.service';
import { UnitService } from './services/unit.service';

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
    UnitDetailComponent
  ],
  providers: [
    RecipeService,
    UnitService
  ],
  bootstrap: [ CookBookComponent ]
})
export class AppModule {
}
