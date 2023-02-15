import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  formSignUp: FormGroup;
  formSignUpSubmitted: boolean = false;
  formSignUpIsLoading: boolean = false;

  alertMessage: string = "";

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formSignUp = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  setCustomPlayClassToDiv(flagAdd: boolean): void {
    const element: HTMLElement | null = document.getElementById("alertContainer");

    if (flagAdd) {
      element?.classList.add('play');
    } else {
      element?.classList.remove('play');
    }
  }

  async callSignUpService(): Promise<void> {
    this.alertMessage = "";
    this.setCustomPlayClassToDiv(false);

    const ctrls = this.formSignUp.controls;
    const result = await this.authService.SignUp(ctrls['email'].value, ctrls['password'].value).catch(error => {
      this.alertMessage = error.message;
      this.setCustomPlayClassToDiv(true);
    });

    if (result) {
      /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
      this.authService.SendVerificationMail();
      this.authService.SetUserData(result.user);
      this.authService.afAuth.authState.subscribe((user) => {
        if (user) {
          this.router.navigate(['']);
        }
      });
    }

    this.formSignUpIsLoading = false;
    this.formSignUpSubmitted = false;
  }

  async signUpProcess(): Promise<void> {
    this.formSignUpSubmitted = true;
    if (this.formSignUp.invalid) return;

    this.formSignUpIsLoading = true;
    await this.callSignUpService();

    this.formSignUpSubmitted = false;
  }

  keyUpProcess(e: any) {
    this.formSignUpSubmitted = false;
  }
}
