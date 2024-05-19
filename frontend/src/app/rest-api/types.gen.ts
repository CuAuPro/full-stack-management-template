// This file is auto-generated by @hey-api/openapi-ts

export type SigninRequest = {
    username: string;
    password: string;
};

export type SigninResponse = {
    message?: string;
    token?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
};

export type SignupRequest = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
};

export type SignupResponse = {
    message?: string;
    userId?: string;
};

export type ChangePasswordRequest = {
    username: string;
    oldPassword: string;
    newPassword: string;
};

export type ChangePasswordResponse = {
    message?: string;
};

export type UserResponse = {
    username?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
};

export type ProductResponse = {
    id?: string;
    name?: string;
    price?: number;
};

export type PostAuthSigninData = {
    requestBody: SigninRequest;
};

export type PostAuthSigninResponse = SigninRequest;

export type PostAuthSignupData = {
    requestBody: SignupRequest;
};

export type PostAuthSignupResponse = SignupResponse;

export type PostAuthChangePasswordData = {
    requestBody: ChangePasswordRequest;
};

export type PostAuthChangePasswordResponse = ChangePasswordResponse;

export type GetApiHealthcheckResponse = unknown;

export type GetApiUsersResponse = Array<UserResponse>;

export type GetApiProductsResponse = Array<ProductResponse>;

export type $OpenApiTs = {
    '/auth/signin': {
        post: {
            req: PostAuthSigninData;
            res: {
                /**
                 * Successful login
                 */
                200: SigninRequest;
                /**
                 * Unauthorized
                 */
                401: unknown;
            };
        };
    };
    '/auth/signup': {
        post: {
            req: PostAuthSignupData;
            res: {
                /**
                 * User created
                 */
                201: SignupResponse;
                /**
                 * Invalid input
                 */
                400: unknown;
            };
        };
    };
    '/auth/change-password': {
        post: {
            req: PostAuthChangePasswordData;
            res: {
                /**
                 * Password change successful
                 */
                200: ChangePasswordResponse;
                /**
                 * Invalid input or password
                 */
                400: unknown;
            };
        };
    };
    '/api/healthcheck': {
        get: {
            res: {
                /**
                 * App is up and running
                 */
                200: unknown;
            };
        };
    };
    '/api/users': {
        get: {
            res: {
                /**
                 * A list of users
                 */
                200: Array<UserResponse>;
            };
        };
    };
    '/api/products': {
        get: {
            res: {
                /**
                 * A list of products
                 */
                200: Array<ProductResponse>;
            };
        };
    };
};