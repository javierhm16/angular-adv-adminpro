import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare let google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  email!: string;

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(private router: Router, private fb: FormBuilder, private userSvc: UserService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';

    // Google SignIn
    google.accounts.id.initialize({
      client_id: "802868024772-iddmsc1gbuicgca0k0erl7lgm0vl1nj3.apps.googleusercontent.com",
      callback: (res: any) => {
        const token = res.credential;
        this.loginGoogle(token);
      }
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  login() {
    this.userSvc.login(this.loginForm.value)
      .subscribe(
        res => {
          if (this.loginForm.get('remember')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value)
          } else {
            localStorage.removeItem('email');
          };

          this.router.navigateByUrl('/')
        }
        ,
        err => {
          // En caso de error
          Swal.fire('Error', err.error.msg, 'error')
        }
      )

    // this.router.navigateByUrl('/')
  }

  rememberButton(remember: any, email: any) {
    if (remember) {
      localStorage.setItem('email', email)
    } else {
      localStorage.removeItem('email');
    }
  }

  loginGoogle(token: string) {
    this.userSvc.loginGoogle(token).subscribe(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/');
      })
    });
  }

}
