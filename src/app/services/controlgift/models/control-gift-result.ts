export class ControlGiftResult {
  isOk: boolean;
  message: string;
  totalAports: number;
  haveBackPack: boolean;
  haveSchedule: boolean;
  details: DatesBeneficiary[] = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export class DatesBeneficiary {
  beneficiaryId: number;
  fullName: string;
  beneficiaryType: string;
  aports: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

