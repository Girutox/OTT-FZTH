import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  formLoginSubmitted: boolean = false;
  formLoginIsLoading: boolean = false;

  testImage: string = "assets/background-service.jpg";

  alertMessage: string = "";

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formLogin = this.formBuilder.group({
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

  async callSignInService(): Promise<void> {
    this.alertMessage = "";
    this.setCustomPlayClassToDiv(false);

    const ctrls = this.formLogin.controls;
    const result = await this.authService.SignIn(ctrls['email'].value, ctrls['password'].value).catch(error => {
      this.alertMessage = error.message;
      this.setCustomPlayClassToDiv(true);
    });

    if (result) {
      this.authService.SetUserData(result.user);
      this.authService.afAuth.authState.subscribe((user) => {
        if (user) {
          this.router.navigate(['landing/home']);
        }
      });
    }

    this.formLoginIsLoading = false;
    this.formLoginSubmitted = false;
  }

  async logInProcess(): Promise<void> {
    this.formLoginSubmitted = true;
    if (this.formLogin.invalid) return;

    this.formLoginIsLoading = true;
    await this.callSignInService();
  }

  keyUpProcess(e: any) {
    this.formLoginSubmitted = false;
  }
}
