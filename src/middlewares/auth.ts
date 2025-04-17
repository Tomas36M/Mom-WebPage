import { Request, Response, NextFunction } from "express";

const auth = (req: Request, res: Response, next: NextFunction): void => {
    const {token} = req.headers;
    if(token === 'auth') next()
    else res.status(400).json({message: "Error, falta autenticacion"})
}

export default auth;
