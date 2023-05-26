import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  checkName() {
    return this.registerForm.controls['name'].dirty && this.registerForm.hasError('required', 'name')
  }

  checkEmail() {
    return this.registerForm.controls['email'].dirty && this.registerForm.hasError('required', 'email')
  }

  checkEmailValid() {
    return this.registerForm.controls['email'].dirty && this.registerForm.hasError('email', 'email')
  }

  checkPassword() {
    return this.registerForm.controls['password'].dirty && this.registerForm.hasError('required', 'password')
  }

  checkPasswordValid() {
    return this.registerForm.controls['password'].dirty && this.registerForm.hasError('minlength', 'password')
  }

  onSubmit() {
    if (this.registerForm.valid) {
      //ENVIA OS DADOS PARA A API
      console.log(this.registerForm.value)
    } else {
      this.validateAllFormFields(this.registerForm)
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
