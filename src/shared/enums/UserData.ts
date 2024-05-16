export type CreateUser = {
    username: string,
    password: string,
    confirmPassword: string,
}

export type User = {
    id: number,
    lastName: string,
    name: string,
    middleName: string,
    username: string,
}