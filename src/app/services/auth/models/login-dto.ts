export class LoginDto {
  username: string;
  password: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
