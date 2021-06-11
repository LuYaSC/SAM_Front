export class AssingGiftDto {
  beneficiaries: number[] = [];
  haveBackpack: boolean = false;
  haveSchedule: boolean = false;
  officePlace: number = 0;
  observations: string = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
