interface User {
    id: number,
    username: string,
    email: string,
    password: string,
}

interface PendingUser extends Omit<User, "password">{
    passwordHash: string;
};

type CreateUserDto = Omit<User, "id">;

export type { User, CreateUserDto, PendingUser};
