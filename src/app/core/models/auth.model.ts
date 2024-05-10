export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface ILoginResponse {
  message: string;
  data: {
    user: IUser;
  };
  token: string;
}
