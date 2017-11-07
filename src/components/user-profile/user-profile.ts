import { Component } from '@angular/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


/**
 * Generated class for the UserProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  text: string;

  constructor(public auth: AuthServiceProvider) { }
}
