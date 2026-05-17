
export interface IRegisterPayload{
  name:string,
  email:string,
  password:string
}

export interface ILoginPayload{
  email:string,
  password:string
}

export interface ISentOtpPayload {
  email:string;
}
export interface IVerifyOtpPayload {
  email: string
  otp: string
}

export interface Auth {
  provider: string
  providerId: string
}


export interface IUserRegister {
  name: string
  email: string
  password: string
  role: string
  isDeleted: boolean
  isActive: string
  isVerified: boolean
  auths: Auth[]
  _id: string
  createdAt: string
  updatedAt: string
}

export interface IUserLogin {
  accessToken: string
  refreshToken: string
  user: IUserRegister
}

// Tour type
export interface ITourTypePayload{
  name:string,
}

// Tour Type Response
export interface ITourTypeResponse {
  name: string
  _id: string
  createdAt: string
  updatedAt: string
}
