interface User {
    id: number,
    username: string,
    email: string,
    password: string,
}

type CreateUserDto = Omit<User, "id">;

export type { User, CreateUserDto};
