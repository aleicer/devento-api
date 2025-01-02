export interface IUser {
    _id: string
    firstName: string
    lastName: string
    govId: string
    govIdType: string
    number: number
    countryCode: string
    email: string
    isActive: boolean
    password: string
    roles: string[]
    createdAt: Date
    updatedAt: Date
    __v: number
}
