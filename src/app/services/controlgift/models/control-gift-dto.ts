export class ControlGiftDto {
  typeSearch: boolean = true;
  documentNumber: string = '';
  name: string = '';
  firstLastName: string = '';
  secondLastName: string = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
