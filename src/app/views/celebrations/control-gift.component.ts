import { Component, OnInit } from '@angular/core';
import { ControlGiftService } from '../../services/controlgift/control-gift.service';
import { AssingGiftDto } from '../../services/controlgift/models/assing-gift-dto';
import { AssingGiftResult } from '../../services/controlgift/models/assing-gift-result';
import { ControlGiftDto } from '../../services/controlgift/models/control-gift-dto';
import { ControlGiftResult } from '../../services/controlgift/models/control-gift-result';
import { OfficesPlacesResult } from '../../services/controlgift/models/offices-places-result';

@Component({
  selector: 'app-control-gift',
  templateUrl: 'control-gift.component.html',
  styleUrls: ['control-gift.component.css'],
  providers: [ControlGiftService]
})
export class ControlGiftComponent implements OnInit {

  beneficiaryDto: ControlGiftDto = new ControlGiftDto();
  resultDatesBeneficiary: ControlGiftResult = new ControlGiftResult();
  officesPlacesRegionals: OfficesPlacesResult[] = [];
  officesPlacesDistricts: OfficesPlacesResult[] = [];
  assingGiftDto: AssingGiftDto = new AssingGiftDto();
  seeResponse = false;
  agencyType = true;
  isMsg = false;
  messageError = '';
  disabledForm = false;
  isCharging = false;
  dismissible = true;
  defaultAlerts: any[] = [
    {
      type: '',
      msg: ''
    },

  ];
  alerts = this.defaultAlerts;

  constructor(private service: ControlGiftService) { }

  ngOnInit(): void {
    this.service.getOffices().subscribe((resp: OfficesPlacesResult[]) => {
      this.officesPlacesRegionals = resp.filter(x => x.type === 1);
      this.officesPlacesDistricts = resp.filter(x => x.type === 2);
    });

  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  reset(): void {
    this.alerts = this.defaultAlerts;
  }

  setDefaultOffice() {
    this.assingGiftDto.officePlace = 0;
  }

  getDataBeneficiary() {
    this.reset();
    if (this.beneficiaryDto.typeSearch) {
      if (this.beneficiaryDto.documentNumber.trim() === '') {
        this.isMsg = true;
        this.messageError = "El campo cédula de identidad no puede estar vacío";
        this.alerts.forEach(x => x.type = 'danger');
        this.alerts.forEach(x => x.msg = this.messageError);
        return;
      }
      if (this.beneficiaryDto.documentNumber.length < 4) {
        this.isMsg = true;
        this.messageError = "El campo cédula de identidad debe contener mínimo 4 y máximo 10 caracteres";
        this.alerts.forEach(x => x.type = 'danger');
        this.alerts.forEach(x => x.msg = this.messageError);
        return;
      }
    } else {
      if (this.beneficiaryDto.name.trim() === '') {
        this.isMsg = true;
        this.messageError = "El campo nombre no puede estar vacío";
        this.alerts.forEach(x => x.type = 'danger');
        this.alerts.forEach(x => x.msg = this.messageError);
        return;
      }
    }

    this.service.getDatesBeneficiary(this.beneficiaryDto).subscribe((resp: ControlGiftResult) => {
      this.resultDatesBeneficiary = resp;
      if (resp.isOk) {
        this.seeResponse = true;
        this.assingGiftDto.beneficiaries = resp.details.map(x => x.beneficiaryId);
        this.assingGiftDto.haveBackpack = resp.haveBackPack;
        this.assingGiftDto.haveSchedule = resp.haveSchedule;
        this.assingGiftDto.observations = '';
        this.setDefaultOffice();
      } else {
        this.isMsg = true;
        this.messageError = resp.message;
        this.alerts.forEach(x => x.type = 'danger');
        this.alerts.forEach(x => x.msg = this.messageError);
      }
    });
  }

  resetForm() {
    this.seeResponse = false;
    this.isMsg = false;
    this.disabledForm = false;
    this.reset();
  }

  resetOptionSearch() {
    this.resetForm();
    this.assingGiftDto = new AssingGiftDto({
      officePlace: this.officesPlacesRegionals[0].id,
      haveBackpack: false, haveSchedule: false,
      observations: ''
    });
    this.resultDatesBeneficiary = new ControlGiftResult();
    this.beneficiaryDto = new ControlGiftDto({ typeSearch: this.beneficiaryDto.typeSearch });
  }

  assingGift() {
    this.reset();
    this.isCharging = true;
    if (this.assingGiftDto.officePlace === 0) {
      this.isMsg = true;
      this.messageError = "Debe seleccionar la Regional/Distrital";
      this.alerts.forEach(x => x.type = 'danger');
      this.alerts.forEach(x => x.msg = this.messageError);
      return;
    }
    if (this.assingGiftDto.observations.trim() === '') {
      this.isMsg = true;
      this.messageError = "El campo observaciones no puede estar vacio";
      this.alerts.forEach(x => x.type = 'danger');
      this.alerts.forEach(x => x.msg = this.messageError);
      return;
    }
    this.service.assingGift(this.assingGiftDto).subscribe((resp: AssingGiftResult) => {
      if (resp.isOk) {
        this.resetOptionSearch();
        this.isMsg = this.disabledForm = true;
        this.messageError = resp.message;
        this.alerts.forEach(x => x.type = 'success');
        this.alerts.forEach(x => x.msg = this.messageError);
      } else {
        this.isMsg = this.disabledForm = true;
        this.messageError = resp.message;
        this.alerts.forEach(x => x.type = 'danger');
        this.alerts.forEach(x => x.msg = this.messageError);
      }
      this.isCharging = false;
    });
  }
}

