import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginDto } from './models/login-dto';
import { HttpHeaders, HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtResponse } from './models/jwt-response';
import { TokenDecodeDto } from './models/token-decode-dto';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  base_url = environment.url.auth;
  authSubject = new BehaviorSubject(false);
  public token = '';
  //getTokenDto: GetTokenDto = new GetTokenDto();
  private roles: string[] = [];
  public httpHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    //Authorization: `Bearer ` + localStorage.getItem('ACCESS_TOKEN')
  });

  constructor(public http: HttpClient) { }

  login(dto: LoginDto): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.base_url + 'login',
      dto).pipe(tap(
        (res: any) => {
          if (res) {
            let decode: TokenDecodeDto = jwt_decode(res.token);
            this.saveToken(res.token, decode.exp);
            this.saveDecodeToken(decode);
            localStorage.setItem('ROLES', JSON.stringify(decode.roles));
          }
        },
      ));
  }


  logout(): void {
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('ESPIRES_IN');
    localStorage.removeItem('LOGIN_STATUS');
    localStorage.removeItem('USER_NAME');
    localStorage.removeItem('ROLES');
  }

  private saveToken(token: string, espiresIn: number): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('ESPIRES_IN', espiresIn + '');
    localStorage.setItem('LOGIN_STATUS', '1');
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }
    return this.token;
  }

  public getRoles() {
    return this.roles;
  }

  private saveDecodeToken(decode: TokenDecodeDto): void {
    localStorage.setItem('userName', decode.userName);
  }

  chekLoginStatus(): boolean {
    const loginCookie = localStorage.getItem('LOGIN_STATUS');
    const expiresIn = localStorage.getItem('ESPIRES_IN');

    if (loginCookie === '1') {

      if (expiresIn === undefined) {
        return false;
      }

      const date = new Date(0);
      const tokenExpDate = date.setUTCSeconds(Number(expiresIn));

      if (tokenExpDate.valueOf() > new Date().valueOf()) {
        return true;
      }

      localStorage.removeItem('LOGIN_STATUS');
      return false;
    }
    return false;
  }

}
