import { Component } from '@angular/core';

@Component({
  selector: 'cookbook',
  template: `
  	<div class="container-fluid">
  		<div class="row">
  			<div class="col-sm-12">
  				<router-outlet></router-outlet>
  			</div>
  		</div>
  	</div>
  	`
})
export class CookBookComponent {

}