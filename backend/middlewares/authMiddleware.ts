
import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, Deno.env.get("JWT_SECRET"), (err:any, user:any) => {
            if (err) {
                return res.status(403); // Forbidden
            }

            // Attach the user data to the request object
            req.user = user;

            // Pass control to the next middleware or route
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
}

