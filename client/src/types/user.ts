export type User = {
    displayName: string,
    email: string,
    id: string,
    imageUrl?: string,
    token: string
}

export type LoginCreds = {
    email: string,
    password: string
}

export type RegisterCreds = {
    displayName: string,
    email: string,
    password: string
}