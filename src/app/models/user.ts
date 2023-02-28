import { ResponseModel } from './responseModel';
export interface User {
    id: number;
    password: string;
    firstName: string;
    lastName: string;
    email:string;
    accessToken:AccessToken
    type:number;
    timeZone:number;
    memberStartDate:string;
    memberEndDate:string;
  }

  export class AccessToken{
    token:string
  }

  