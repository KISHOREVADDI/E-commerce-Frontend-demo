import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = { email: '', password: '' };

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  onLogin() {
    this.http.post('https://e-commerce-demo-4esx.onrender.com/api/auth/login', this.loginData).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        // Use AuthService to log in
        this.authService.login(response);

        if (response.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Invalid credentials');
      }
    });
  }
}
