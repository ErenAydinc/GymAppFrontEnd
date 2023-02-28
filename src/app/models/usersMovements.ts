import { MovementImage } from './movementImage';
export class UsersMovements{
    id:number
    userId:number
    movementId:number
    setNumber:number
    repetitionNumber:number
}

export class UsersMovementsDto{
    id:number
    userId:number
    movementId:number
    userName:string
    movementName:string
    movementImage:MovementImage[]
    setNumber:number
    repetitionNumber:number
    weight:number
}