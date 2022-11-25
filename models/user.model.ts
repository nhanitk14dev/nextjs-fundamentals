export interface IUser {
    id?: number;
    email: string;
    password: string;
    name?: string;
    address?: string;
    token?: string;
    isLoggedIn?: boolean
}

export const UserPropDefault: IUser = {
    email: '',
    name: '',
    password: '',
    token: '',
    isLoggedIn: false
}

export type SignUpFormTypes = {
    name: string,
    email: string,
    password: string
}

export type LoginTypes = {
    email: string,
    password: string
}

export type UserResponseTypes = {
    user?: IUser,
    message?: string
}