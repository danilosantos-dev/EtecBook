import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  checkEmail() {
    return this.loginForm.controls['email'].dirty && this.loginForm.hasError('required', 'email')
  }

  checkPassword() {
    return this.loginForm.controls['password'].dirty && this.loginForm.hasError('required', 'password')
  }

  onSubmit() {
    if (this.loginForm.valid) {
      //ENVIAR DADOS PARA A API
      console.log(this.loginForm.value)
    } else {
      //Disparo do erro
      this.validateAllFormFields(this.loginForm)
    }
  }

  //Percorre o formulario e valida os inputs caso estejam vazios
  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
