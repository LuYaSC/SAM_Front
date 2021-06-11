import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../../globals';
import { AuthService } from '../../services/auth/auth.service';
import { LoginDto } from '../../services/auth/models/login-dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  providers: [Globals],
})
export class LoginComponent {
  datesLogin: LoginDto = new LoginDto();
  isError = false;
  message = "";
  loading = false;
  loginInvalid = false;

  dismissible = true;
  defaultAlerts: any[] = [
    {
      type: 'danger',
      msg: this.message
    }
  ];
  alerts = this.defaultAlerts;

  constructor(
    private router: Router,
    private authService: AuthService,
    public globals: Globals
  ) {
    localStorage.removeItem("doctorName");
    localStorage.removeItem("doctorLastName");
  }

  ngOnInit(): void { }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  reset(): void {
    this.alerts = this.defaultAlerts;
  }


  Login() {
    this.reset();
    if (this.datesLogin.username === "" || this.datesLogin.password === "") {
      this.loginInvalid = true;
      this.message = "Los campos Usuario o contraseña no pueden estar vacios";
      this.alerts.forEach(x => x.msg = this.message);
      return;
    }
    this.loading = true;
    this.loginInvalid = false;
    this.authService.login(this.datesLogin).subscribe(
      (res: any) => {
        this.loading = false;
        this.globals.roles = this.authService.getRoles();
        if (localStorage.getItem("ROLES").includes("ADMIN")) {
          this.router.navigate(["/dashboard"]);
        } else {
          this.router.navigate(["/celebrations/control-gift"]);
        }
      },
      (error) => {
        this.loading = false;
        this.loginInvalid = true;
        this.message = error.error;
        this.alerts.forEach(x => x.msg = this.message);
      }
    );
  }
}
