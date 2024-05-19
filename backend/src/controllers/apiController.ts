import { Request, Response } from 'express';

import { AppContext } from "../app-context.js";

import { components } from '../routes/schema.js';


export const healthcheck = (req: Request, res: Response) => {
    try {
        res.status(200).send("OK");
    } catch (error) {
        res.status(400).send('Error');
    }
};

export const getUsers = (req: Request, res: Response) => {
    try {
        const appContext: AppContext | undefined = req.appContext;
        
        const data: components["schemas"]["UserResponse"][] = [
            { username: 'johndoe', firstName: 'John', lastName: 'Doe', role: 'user' },
            { username: 'janedoe', firstName: 'Jane', lastName: 'Doe', role: 'admin' },
        ];
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send('Error');
    }
};

export const getProducts = (req: Request, res: Response) => {
    try {
        const appContext: AppContext | undefined = req.appContext;
        const products: components["schemas"]["ProductResponse"][] = [
            { id: "1", name: 'Product 1', price: 19.99 },
            { id: "2", name: 'Product 2', price: 29.99 },
        ];
        res.status(200).json(products);
    } catch (error) {
        res.status(400).send('Error');
    }
};
