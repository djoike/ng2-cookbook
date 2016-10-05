import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cookbook',
  template: `
  	<div class="container-fluid">
  		<div class="row">
  			<div class="col-sm-12">
          <a routerLink="/recipes">Recipes</a>
          <br />
          <a routerLink="/units">Units</a>
          <br />
          <a routerLink="/ingredient-metas">Ingredient metas</a>
          <br />
  				<router-outlet></router-outlet>
  			</div>
  		</div>
  	</div>
  	`
})
export class CookBookComponent {

}