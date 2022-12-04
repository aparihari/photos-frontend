import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9.!#$%&"*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
          ),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user: any) => {
      if (!user) {
        this.router.navigate(['']);
      }
    });
  }

  public login() {
    this.authService.login(this.loginForm.value).subscribe(
      () => {
        this.router.navigateByUrl('/');
      },
      (err) => {
        this.errorMessage = err && err.error?.message;
      }
    );
  }

  public signUp() {
    this.router.navigateByUrl('/signup');
  }
}
