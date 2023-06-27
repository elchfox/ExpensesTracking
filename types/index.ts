export interface IUser {
    id:string
    username:string
}
export interface IExpense {
    id?:string,
    userId?:string
    title:string
    amount:number,
    date:Date
}