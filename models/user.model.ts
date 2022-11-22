export interface IUser {
    id?: string;
    email: string;
    name: string;
    password: string;
    token: string;
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