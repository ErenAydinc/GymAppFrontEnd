export class Login{
    id:number;
    accessToken:{
        token:string
        expiration:string
    }
    type:number
    userOperationClaims:[{
        userId:number,
        operationClaimId:number
        id:number
    }]
}