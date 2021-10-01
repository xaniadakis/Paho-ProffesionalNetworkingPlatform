export interface JWT {
    email: string;
    user_id: string;
    iat: string;
    exp: string;
}

export interface response {
    message: string;
    token: string;
    admin: string;
}