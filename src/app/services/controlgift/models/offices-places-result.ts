export class OfficesPlacesResult {
  id: number;
  description: string;
  type: number;
  descriptionType: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

