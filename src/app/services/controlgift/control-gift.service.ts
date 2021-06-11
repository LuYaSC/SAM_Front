import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AssingGiftDto } from './models/assing-gift-dto';
import { ControlGiftDto } from './models/control-gift-dto';

@Injectable({
  providedIn: 'root'
})
export class ControlGiftService {
  private baseUrl = environment.url.controlGift;
  //private baseUrl = 'https://servicios.alliviapp.com:444/RecoverCaseSB/api/RecoverCase/';
  public httpHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ` + localStorage.getItem('ACCESS_TOKEN')
  });

  constructor(public http: HttpClient) { }

  getDatesBeneficiary(dto: ControlGiftDto) {
    const url = this.baseUrl + 'GetDatesBeneficiary';
    return this.http.post(url, dto, { headers: this.httpHeader });
  }

  assingGift(dto: AssingGiftDto) {
    const url = this.baseUrl + 'AssingGift';
    return this.http.post(url, dto, { headers: this.httpHeader });
  }

  getOffices() {
    const url = this.baseUrl + 'GetOffices';
    return this.http.post(url, '', { headers: this.httpHeader });
  }
}
