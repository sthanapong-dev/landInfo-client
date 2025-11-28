export interface LoginCredentials {
    usernameOrEmail: string;
    password: string;
}

export interface LoginResponse {
    msg: string;
    token: string;
    refreshToken: string;
}

export interface UserData {
    _id: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    primaryRole?: string;
    roles?: string[];
    permissions?: string[];
    lastLogin?: string;
}

export interface AuthResponse {
    msg: string;
    data: UserData[];
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface RefreshTokenResponse {
    token: string;
}
