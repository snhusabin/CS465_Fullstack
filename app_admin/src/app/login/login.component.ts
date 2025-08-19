import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formError = '';
  credentials = { name: '', email: '', password: '' };

  constructor(private router: Router, private auth: AuthenticationService) {}

  ngOnInit(): void {}

  onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password || !this.credentials.name) {
      this.formError = 'All fields are required, please try again';
      return;
    }
    this.doLogin();
  }
  private doLogin(): void {
    this.auth.login(this.credentials.email, this.credentials.password).subscribe({
      next: () => this.router.navigate(['']),
      error: () => this.formError = 'Login failed, please try again'
    });
}
}
