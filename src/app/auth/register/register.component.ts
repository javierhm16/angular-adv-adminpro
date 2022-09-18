import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terms: [false, Validators.required],
  }, {
    validators: this.samePasswords('password', 'password2')
  });

  constructor(private fb: FormBuilder, private userSvc: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  createUser() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    // Creation
    this.userSvc.createUser(this.registerForm.value)
      .subscribe(
        res => {
          this.router.navigateByUrl('/');
        },
        err => {
          // En caso de error
          Swal.fire('Error', err.error.msg, 'error')
        }
      );
  }

  noValidField(field: string) {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false
    }
  }

  acceptTerms() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

  noValidPasswords() {
    if (this.registerForm.get('password')?.value !== this.registerForm.get('password2')?.value && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  samePasswords(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control: any = formGroup.get(pass1);
      const pass2Control: any = formGroup.get(pass2);

      if (pass1Control.value === pass2Control.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEquals: true })
      }
    }
  }

}
