import { Component } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-login.component',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
constructor(private authService: AuthService) {}
  onLogin() {
    this.authService.login();
  } 

}
