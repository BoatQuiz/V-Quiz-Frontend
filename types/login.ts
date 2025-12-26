export interface FormValues {
    username: string;
    password: string;
}

export interface LoginUserDto {
    Id: string;
    Username: string;
}

export interface RegisterUserDto {
    Id: string;
    Username: string;
}

export type LoginResult =
  | { success: true }
  | { success: false; message: string };
